"""Two-axis review skill: proposal stays unloaded, parses, lints, and leaves default review selection unchanged."""
import json
import subprocess
from pathlib import Path

import pytest

from runtime.root_allowance import root_scope
from services import context, default_skills
from test_admin_skills import CatalogClient

PROPOSAL = Path(__file__).resolve().parents[1] / 'skills' / 'proposed' / 'review-two-axes' / 'SKILL.md'
ROOT = Path(__file__).resolve().parents[3]


def test_proposal_parses_as_admin_review_skill():
    skill = default_skills.parse(PROPOSAL.read_text(encoding='utf-8'))
    assert skill.name == 'review-two-axes'
    assert skill.source == 'admin'
    assert skill.task_type == ('review',)
    assert skill.token_bound <= skill.max_tokens <= 1500


def test_proposal_passes_registry_lint():
    text = PROPOSAL.read_text(encoding='utf-8')
    result = subprocess.run(['node', '--input-type=module', '-e',
        "import fs from 'node:fs'; import {lintSkill} from './server/ai-board/services/skills.js'; process.stdout.write(JSON.stringify(lintSkill(fs.readFileSync(0,'utf8'), {name: 'review-two-axes'})));"],
        input=text.encode('utf-8'), capture_output=True, check=True, cwd=ROOT)
    assert json.loads(result.stdout)['ok']


def test_proposal_keeps_gate_output_shape():
    body = PROPOSAL.read_text(encoding='utf-8')
    assert 'verdict' in body and 'findings' in body and 'high' in body


def test_proposal_not_loaded_by_any_loader():
    assert 'review-two-axes' not in {s.name for s in default_skills.catalog()}
    assert 'review-two-axes' not in context.SKILLS


def test_review_selection_unchanged_while_disabled():
    selected = default_skills.select('gate4_review', {})
    assert [s.name for s in selected] == ['default-review']
    assert 'review-two-axes' not in default_skills.system_text(selected)
    assert default_skills.pin('gate4_review', {}) == default_skills.selection_pin(selected)


def review_row(name):
    text = f'---\nname: {name}\ndescription: Review rule\ntask_type: review\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Check access rules.\n'
    skill = default_skills.parse(text)
    return {'id': 1, 'version_id': 99, 'name': name, 'source': 'admin', 'version': 1, 'hash': skill.digest,
            'token_count': len(default_skills.admin_text(skill).encode('utf-8')), 'text': text}


def test_variant_enters_node_only_when_enabled(monkeypatch):
    monkeypatch.delenv('AI_BOARD_SKILL_VARIANT', raising=False)
    off, _ = default_skills.select_report('gate4_review', {})
    assert [s.name for s in off] == ['default-review']
    assert default_skills.review_axes_block(off) == ''
    off_pin = default_skills.selection_pin(off)

    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'review-two-axes')
    on, report = default_skills.select_report('gate4_review', {})
    assert [s.name for s in on] == ['default-review', 'review-two-axes']
    assert {'name': 'review-two-axes', 'reason': 'experiment variant (AI_BOARD_SKILL_VARIANT)'} in report['selected']
    assert 'ADMIN_SKILL name="review-two-axes"' in default_skills.review_axes_block(on)
    assert 'review-two-axes' not in default_skills.system_text(on)
    assert default_skills.selection_pin(on) != off_pin


def test_variant_is_uncounted_and_never_drops_admin_or_default(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'review-two-axes')
    with root_scope(CatalogClient([review_row('review-a')]), 1, {}):
        selected, report = default_skills.select_report('gate4_review', {})
    assert [s.name for s in selected] == ['default-review', 'review-a', 'review-two-axes']
    assert report['dropped'] == []


def test_variant_not_applied_to_other_roles(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'review-two-axes')
    selected, _ = default_skills.select_report('gate3_light', {'file': 'public/school.html'})
    assert 'review-two-axes' not in [s.name for s in selected]


def test_two_admin_skills_rejected_by_root_catalog():
    with root_scope(CatalogClient([review_row('review-a'), review_row('review-b')]), 1, {}):
        with pytest.raises(ValueError, match='invalid approved skill catalog'):
            default_skills.select_report('gate4_review', {})
