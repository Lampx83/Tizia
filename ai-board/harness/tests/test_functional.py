import functional
from gates import verify


def test_queue_oracle_is_selected_from_request_not_candidate_tests():
    assert functional.select({'request_detail': 'Không hiện ETA khi worker tắt'}) == functional.QUEUE_PROBE
    assert functional.select({'request_detail': 'Đổi màu tiêu đề'}) is None
    assert functional.select({'request_title': 'Ẩn ETA', 'request_detail': 'Khi worker tắt'}) == functional.QUEUE_PROBE
    assert functional.select({'plan': {'goal':'worker ETA'}, 'request_goal':'worker ETA', 'request_detail':'Đổi màu nút'}) is None


def test_missing_oracle_never_claims_functional_success():
    assert functional.run('http://unused', None)['passed'] is False


def test_generated_tests_and_http_cannot_replace_independent_behavior(tmp_path, monkeypatch):
    from test_gate_5_verify import checkout, state, FakeRunner
    monkeypatch.setattr(verify, 'probe_http', lambda _: (200, b'// x\n'))
    out = verify.run(state(checkout(tmp_path)), runner=FakeRunner())
    assert out['blocked'] and out['failure_class'] == 'plan'
    assert out['evidence']['smoke_passed'] and out['evidence']['http_observed']
    assert not out['evidence']['functional']['passed']
