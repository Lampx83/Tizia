"""Gate4 adapter: the server grants the action and owns the state transition."""
from contextlib import contextmanager
from contextvars import ContextVar

_SERVER = ContextVar('gate4_hsm_server', default=None)

class RemoteGate4:
    def __init__(self,client,*,ticket_id,run_id,worker_id,lease_token,contract):
        self.client=client
        self.path=f'/api/ai-board/worker/tickets/{ticket_id}/hsm'
        self.identity={'run_id':run_id,'worker_id':worker_id,'lease_token':lease_token,'contract_hash':contract['hash']}
        self.attempt=0

    def execute(self,action):
        attempt=self.attempt
        self.attempt+=1
        identity={**self.identity,'attempt':attempt}
        prefix=f'hsm:{self.identity["run_id"]}:{attempt}'
        begun=self.client.post(self.path,{**identity,'event':'BEGIN','expected_version':0,'idempotency_key':prefix+':begin'})
        if begun.get('execute') is not True:
            # shortcut: unresolved Running needs HSM deep recovery; never replay an unacknowledged action.
            raise RuntimeError('Gate4 action already granted; operator reconciliation required')
        result=action()
        self.client.post(self.path,{**identity,'event':'BLOCKED' if result['blocked'] else 'PASSED',
            'expected_version':begun['state']['version'],'idempotency_key':prefix+':result','result':result})
        return result

@contextmanager
def server_scope(backend):
    token=_SERVER.set(backend)
    try:
        yield
    finally:
        _SERVER.reset(token)

def execute(action):
    backend=_SERVER.get()
    return backend.execute(action) if backend else action()
