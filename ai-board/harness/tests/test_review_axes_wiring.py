"""Two-axis review skill wiring: off = review system prompt unchanged; on = one advisory block per review call."""
import pytest

import main
from gates import adversarial_review, reviewer_fix
from runtime import pipeline, prompt_roles
from runtime.budget import Budget
from services import context, default_skills
from test_adversarial_review import Models as ReviewModels, state
from test_reviewer_fix import FIX, Models as FixModels, fix, repo
from test_prompt_roles import FakeModels

BLOCK = 'ADMIN_SKILL name="review-two-axes"'


@pytest.fixture
def axes_on(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'review-two-axes')


@pytest.fixture
def axes_off(monkeypatch):
    monkeypatch.delenv('AI_BOARD_SKILL_VARIANT', raising=False)


def review_system(models):
    return models.calls[0]['extra']['system']


def test_variant_name_resolves_to_proposed_skill():
    assert 'review-two-axes' in context.VARIANT_FILES
    assert default_skills.parse(default_skills.REVIEW_AXES.read_text(encoding='utf-8')).name == 'review-two-axes'


def test_flag_off_review_system_is_unchanged(axes_off):
    expected = prompt_roles.SYSTEM + '\n\n' + default_skills.system_text(default_skills.select('gate4_review', {}))
    assert default_skills.review_axes_block() == ''
    models = ReviewModels({'verdict': 'pass', 'findings': []})
    adversarial_review.run(state(), main.Deps(models=models, notify=None), Budget())
    assert review_system(models) == expected
    assert BLOCK not in review_system(models)


def test_flag_on_adds_block_once_to_adversarial_review(axes_on):
    models = ReviewModels({'verdict': 'pass', 'findings': []})
    adversarial_review.run(state(), main.Deps(models=models, notify=None), Budget())
    system = review_system(models)
    assert system.count(BLOCK) == 1 and 'Request axis' in system
    assert 'DEFAULT SKILL default-review' in system


def test_flag_on_adds_block_once_to_reviewer_fix(tmp_path, axes_on):
    _, st = repo(tmp_path)
    models = FixModels(FIX)
    assert fix(models, st)['applied'] is True
    system = review_system(models)
    assert system.count(BLOCK) == 1 and 'DEFAULT SKILL default-review' in system


def test_flag_on_lists_review_variant_among_others_once(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'plan-from-request, review-two-axes')
    assert default_skills.review_axes_block().count(BLOCK) == 1


def test_flag_on_pipeline_review_role_adds_block_in_split_mode(monkeypatch, axes_on):
    monkeypatch.setenv('AI_BOARD_PROMPT_ROLE_SPLIT', '1')
    models = FakeModels([{'verdict': 'pass', 'findings': []}])
    pipeline.Deps(models=models, notify=None).call_model('m', 'untrusted diff', gate=4, budget=Budget(), role='gate4_review')
    assert models.calls[0]['extra']['system'].count(BLOCK) == 1


def test_other_variant_does_not_add_review_block(monkeypatch):
    monkeypatch.setenv('AI_BOARD_SKILL_VARIANT', 'plan-from-request')
    assert default_skills.review_axes_block() == ''


def test_oversized_proposal_is_refused(monkeypatch, tmp_path, axes_on):
    path = tmp_path / 'SKILL.md'
    path.write_text(default_skills.REVIEW_AXES.read_text(encoding='utf-8') + 'x' * 2000, encoding='utf-8')
    monkeypatch.setitem(default_skills.VARIANTS, 'review-two-axes', path)
    with pytest.raises(ValueError):
        default_skills.review_axes_block()
