"""Reviewed provider candidates; no secrets in the catalog or route evidence."""
from __future__ import annotations

import json
import math
import time
from pathlib import Path
from urllib.parse import urlsplit

CATALOG = Path(__file__).resolve().parents[3] / 'server' / 'ai-board' / 'model-routing.json'
ROLES = {'gate1', 'gate25', 'gate3_light', 'gate3_heavy', 'gate4_review', 'classifier', 'embed', 'calibration', 'eval_judge'}
CAPABILITIES = {'json', 'logprobs', 'embedding'}


def _prefix(provider):
    return 'VLLM' if provider == 'vllm' else 'OLLAMA'


def _unique_strings(value, allowed=None):
    return (isinstance(value, list) and all(isinstance(item, str) for item in value)
            and len(value) == len(set(value)) and (allowed is None or not set(value) - allowed))


def _nonempty_string(value):
    return isinstance(value, str) and bool(value.strip())


def _unique_object(pairs):
    result = {}
    for name, value in pairs:
        if name in result:
            raise ValueError('Duplicate routing catalog field')
        result[name] = value
    return result


def validate_catalog(catalog):
    if (not isinstance(catalog, dict) or type(catalog.get('version')) is not int or catalog['version'] != 1
            or not isinstance(catalog.get('candidates'), dict) or not isinstance(catalog.get('roles'), dict)):
        raise ValueError('Invalid model routing catalog')
    if not isinstance(catalog.get('enabled'), bool) or not isinstance(catalog.get('api_enabled'), bool):
        raise ValueError('Invalid routing enabled flags')
    if set(catalog['roles']) - ROLES:
        raise ValueError('Unknown model routing role')
    for name, candidate in catalog['candidates'].items():
        if (not _nonempty_string(name) or not isinstance(candidate, dict)
                or not isinstance(candidate.get('provider'), str)
                or candidate['provider'] not in {'ollama', 'vllm', 'api'}
                or not _nonempty_string(candidate.get('model'))
                or not isinstance(candidate.get('enabled'), bool)
                or not _unique_strings(candidate.get('approved_roles'), ROLES)
                or not _unique_strings(candidate.get('capabilities'), CAPABILITIES)):
            raise ValueError('Invalid model candidate')
        for field in ('embedding_space', 'calibration_id'):
            if field in candidate and not _nonempty_string(candidate[field]):
                raise ValueError('Invalid candidate compatibility lock')
    for role, names in catalog['roles'].items():
        if (not _unique_strings(names)
                or any(name not in catalog['candidates'] for name in names)):
            raise ValueError('Invalid candidate pool')
    for field in ('embedding_space', 'classifier_calibration_id'):
        if field in catalog and not _nonempty_string(catalog[field]):
            raise ValueError('Invalid catalog compatibility lock')
    cooldown = catalog.get('endpoint_cooldown_s')
    if not isinstance(cooldown, (int, float)) or isinstance(cooldown, bool) or not math.isfinite(cooldown) or cooldown < 0:
        raise ValueError('Invalid endpoint cooldown')
    return catalog


class ModelRouter:
    def __init__(self, settings, catalog=None, *, clock=time.monotonic):
        if catalog is None:
            try:
                catalog = json.loads(CATALOG.read_text(encoding='utf8'), object_pairs_hook=_unique_object)
            except (OSError, ValueError):
                raise ValueError('Cannot read valid model routing catalog') from None
        self.catalog = validate_catalog(catalog)
        self.settings = dict(settings)
        self.clock, self.cooldowns = clock, {}

    @classmethod
    def from_env(cls, settings):
        return cls(settings) if str(settings.get('AI_BOARD_MODEL_ROUTING')).lower() == 'true' else None

    def candidates(self, role, *, exclude=()):
        if role not in ROLES:
            raise ValueError(f'Unknown model role: {role}')
        found = []
        for name in self.catalog['roles'].get(role, []):
            item = self.catalog['candidates'][name]
            provider = item['provider']
            if name in exclude or not item['enabled'] or role not in item['approved_roles']:
                continue
            if provider == 'vllm' and role == 'embed':
                continue  # vLLM classifier passes only via the logprobs + calibration_id locks below.
            # No API prompts until the real provider has an explicit adapter.
            if provider == 'api':
                continue
            if not self.settings.get(_prefix(provider) + '_URL') or self.cooldowns.get(provider, 0) > self.clock():
                continue
            self.endpoint(provider)
            capability = 'embedding' if role == 'embed' else 'logprobs' if role == 'classifier' else 'json'
            if capability not in item['capabilities']:
                continue
            if role == 'embed' and item.get('embedding_space') != self.catalog.get('embedding_space', 'bge-m3-v1'):
                continue
            if role == 'classifier' and item.get('calibration_id') != self.catalog.get('classifier_calibration_id', 'qwen35-4b-v1'):
                continue
            model = self.settings.get('GATE3_MODEL_HEAVY') if provider == 'vllm' and role == 'gate3_heavy' else None
            found.append({**item, 'model': model or item['model'], 'id': name})
        return found

    def endpoint(self, provider):
        url = str(self.settings.get(_prefix(provider) + '_URL') or '').strip().rstrip('/')
        return self.validate_endpoint(url)

    @staticmethod
    def validate_endpoint(url):
        try:
            parsed = urlsplit(url)
            valid = (parsed.scheme in {'http', 'https'} and bool(parsed.hostname)
                     and not parsed.username and not parsed.password and not parsed.query and not parsed.fragment)
            parsed.port  # Reject malformed ports before any request is sent.
        except ValueError:
            valid = False
        if not valid:
            raise ValueError('Invalid model provider endpoint') from None
        return url

    def reasoning(self, role):
        """Catalog `reasoning` map: roles whose vLLM calls run with thinking on (extra token allowance for the reasoning)."""
        return bool((self.catalog.get('reasoning') or {}).get(role))

    def reasoning_tokens(self):
        return int(self.catalog.get('reasoning_extra_tokens', 4096))

    def first(self, role, *, exclude=()):
        candidates = self.candidates(role, exclude=exclude)
        if not candidates:
            raise RuntimeError(f'No reviewed, compatible and available candidate for {role}')
        return candidates[0]

    def failed(self, candidate):
        self.cooldowns[candidate['provider']] = self.clock() + self.catalog.get('endpoint_cooldown_s', 60)

    def evidence(self, role, candidate, reason):
        return {'role': role, 'candidate': candidate['id'], 'provider': candidate['provider'], 'reason': reason}

    def client(self, candidate, template):
        from dataclasses import replace
        return replace(template, base_url=self.endpoint(candidate['provider']),
                       seckey=self.settings.get(_prefix(candidate['provider']) + '_SECKEY') or None, routing=None,
                       protocol='vllm' if candidate['provider'] == 'vllm' else 'ollama', vllm_url='')

    @staticmethod
    def role(gate, model, models, *, explicit=None, extra=None):
        if extra and extra.get('logprobs'):
            return 'classifier'
        if explicit:
            return explicit
        if gate == 2.5:
            return 'gate25'
        if gate == 4:
            return 'gate4_review'
        if gate == 3:
            return 'gate3_heavy' if model == models.gate3_model and model != models.gate3_model_light else 'gate3_light'
        return 'gate1'
