"""Two-axis review skill: proposal stays unloaded, parses, lints, and leaves default review selection unchanged."""
import json
import subprocess
from pathlib import Path

from services import context, default_skills

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
