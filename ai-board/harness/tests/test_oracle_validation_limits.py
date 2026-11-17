from runtime import limits


def test_oracle_validation_block_read_from_contract():
    ov = limits.oracle_validation()
    assert ov["min_labels"] >= 100
    assert 0.5 < ov["min_catch_wrong"] <= 1 and 0.5 < ov["min_accept_right"] <= 1
    assert ov["advisory_until_validated"] is True
