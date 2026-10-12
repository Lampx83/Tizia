"""Actual LangGraph execution preserves the server's one-action grant boundary."""
import pytest
from repositories.server_hsm import RemoteGate4

class Service:
    def __init__(self):
        self.events=[]
        self.running=False
        self.fail_receipt=False
        self.deny=False

    def post(self,path,body):
        self.events.append(body)
        if self.deny:
            raise PermissionError('revoked')
        if body['event']=='BEGIN':
            execute=not self.running
            self.running=True
            return {'execute':execute,'state':{'version':1}}
        assert body['expected_version']==1
        if self.fail_receipt:
            raise ConnectionError('receipt acknowledgement lost')
        return {'state':{'version':2}}

def backend(service):
    return RemoteGate4(service,ticket_id=1,run_id=2,worker_id='test',lease_token='local',contract={'hash':'pin'})

@pytest.mark.parametrize('blocked',[False,True])
def test_graph_reports_actual_gate_result(blocked):
    service=Service()
    calls=[]
    result={'gate':4,'blocked':blocked,'issues':[]}
    assert backend(service).execute(lambda: calls.append(1) or result)==result
    assert calls==[1]
    assert [e['event'] for e in service.events]==['BEGIN','BLOCKED' if blocked else 'PASSED']
    assert {e['contract_hash'] for e in service.events}=={'pin'}

def test_revocation_prevents_action():
    service=Service(); service.deny=True
    calls=[]
    with pytest.raises(PermissionError):
        backend(service).execute(lambda: calls.append(1))
    assert not calls

def test_lost_receipt_cannot_replay_action_after_worker_restart():
    service=Service(); service.fail_receipt=True
    calls=[]
    action=lambda: calls.append(1) or {'gate':4,'blocked':False}
    with pytest.raises(ConnectionError):
        backend(service).execute(action)
    with pytest.raises(RuntimeError,match='reconciliation'):
        backend(service).execute(action)
    assert calls==[1]

def test_action_crash_does_not_invent_pass_or_retry():
    service=Service()
    def crash(): raise ValueError('checker crashed')
    with pytest.raises(ValueError,match='checker crashed'):
        backend(service).execute(crash)
    assert [e['event'] for e in service.events]==['BEGIN']
