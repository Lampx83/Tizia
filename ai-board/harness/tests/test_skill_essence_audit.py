from evaluation import skill_essence_audit as audit


def test_audit_reports_missing_essence_terms_for_a_thin_default():
    row = audit.compare('default-test', 'Reproduce the failure first. Run the check.', {'reproduce': ['reproduce'], 'loop': ['feedback loop']})
    assert row['covered'] == ['reproduce']
    assert row['missing'] == ['loop']


def test_audit_source_word_count_and_default_word_count():
    row = audit.compare('x', 'one two', {})
    assert row['default_words'] == 2 and row['source_words'] == 0
