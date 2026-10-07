"""Trusted startup in a fresh preview VM. Gate 5 retains its separate teardown."""
from __future__ import annotations
import copy
import json
import secrets
import subprocess
from os import environ as runtime_environment
from pathlib import Path
from gates import verify


def start(checkout: Path = Path('/workspace/checkout')) -> dict:
    if not hasattr(verify, '_app_env'):
        raise RuntimeError('PostgreSQL verification runtime required')
    runtime_environment['AI_BOARD_VERIFY_NETWORK'] = 'published'
    project, password = 'private-preview', secrets.token_hex(24)
    owned = json.loads(verify._override(project, password, checkout))
    owned['services']['tizia']['ports'] = ['127.0.0.1:8041:8041']
    for service in owned['services'].values():
        service.update(mem_limit='512m', cpus=0.75)
    compose_file = Path('/workspace/preview-compose.json')
    compose_file.write_text(json.dumps(owned), encoding='utf-8')
    empty = Path('/workspace/preview-empty-env')
    empty.write_text('', encoding='utf-8')
    command = ['docker', 'compose', '--env-file', str(empty), '-p', project, '-f', str(compose_file)]

    def run(args, timeout=240):
        return subprocess.run(command + args, check=True, capture_output=True, text=True, timeout=timeout).stdout

    config = json.loads(run(['config', '--format', 'json']))
    ports = config['services']['tizia'].get('ports', [])
    if len(ports) != 1 or str(ports[0].get('published')) != '8041' or ports[0].get('host_ip') != '127.0.0.1':
        raise RuntimeError('invalid private preview port')
    # Only the guest-local port differs from canonical PG verification. Each preview owns a VM.
    checked = copy.deepcopy(config)
    checked['services']['tizia']['ports'][0].pop('published', None)
    verify._validate_config(checked, project, password)
    try:
        run(['up', '--build', '-d', '--wait', '--wait-timeout', '120'])
        fixture = Path(verify.__file__).resolve().parent.parent / 'queue_fixture.mjs'
        run(['cp', str(fixture), 'tizia:/app/verify-queue.mjs'])
        run(['exec', '-T', 'tizia', 'node', '/app/verify-queue.mjs', 'seed'], timeout=30)
        session = json.loads(run(['exec', '-T', 'tizia', 'node', '/app/verify-queue.mjs', 'session'], timeout=30))
        return {'state': 'ready', 'test_session': session}
    except BaseException:
        run(['down', '-v', '--remove-orphans'], timeout=60)
        raise


if __name__ == '__main__':
    print(json.dumps(start()))
