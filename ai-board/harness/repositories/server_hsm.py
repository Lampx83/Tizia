"""Order Gate4 actions and enforce authority through the service adapter."""
from contextlib import contextmanager
from contextvars import ContextVar

_SERVER = ContextVar('gate4_hsm_server', default=None)

# Cần admin duyệt manifest rồi chạy lại: không phải vi phạm ranh giới.
TRANSIENT_REASONS=('tool_manifest_not_approved','tool_manifest_unknown')

class AuthorityError(ValueError):
    def __init__(self,reason):
        super().__init__(reason)
        self.failure_class='budget' if reason=='action_budget_exhausted' else 'transient' if reason in TRANSIENT_REASONS else 'critical'

def authorize_action(action,**extra):
    backend=_SERVER.get()
    if backend is not None and backend.authorize_action(action,**extra) is not True:
        raise AuthorityError('current authority unavailable or revoked')

def register_tool_manifest(manifest):
    backend=_SERVER.get()
    register=getattr(backend,'register_tool_manifest',None)
    return register(manifest) if register else None

def gate4_sequence(backend, identity, prefix, action):
    begun=backend.client.post(backend.path,{**identity,'event':'BEGIN','expected_version':0,'idempotency_key':prefix+':begin'})
    if begun.get('execute') is not True:
        raise RuntimeError('Gate4 action already granted; operator reconciliation required')
    version=begun['state']['version']
    # No retries: an unacknowledged action cannot safely be repeated.
    result=action()
    backend.client.post(backend.path,{**identity,'event':'BLOCKED' if result['blocked'] else 'PASSED',
        'expected_version':version,'idempotency_key':prefix+':result','result':result})
    return result

class RemoteGate4:
    def __init__(self,client,*,ticket_id,run_id,worker_id,lease_token,contract):
        if not isinstance(contract,dict) or not isinstance(contract.get('hash'),str) or not contract['hash']:
            raise AuthorityError('action_contract_unavailable')
        self.client=client
        self.path=f'/api/ai-board/worker/tickets/{ticket_id}/hsm'
        self.identity={'run_id':run_id,'worker_id':worker_id,'lease_token':lease_token,'contract_hash':contract['hash']}
        self.attempt=0

    def register_tool_manifest(self,manifest):
        from urllib.error import HTTPError
        try:
            return self.client.post(self.path[:-len('/hsm')]+'/tool-manifest',{**self.identity,'manifest':manifest})
        except HTTPError:
            raise AuthorityError('tool_manifest_unavailable') from None

    def authorize_action(self,action,**extra):
        from urllib.error import HTTPError
        import json
        try:
            answer=self.client.post(self.path+'/authority',{**self.identity,'action':action,**extra})
            if not isinstance(answer,dict) or answer.get('authorized') is not True:
                raise AuthorityError('action_authority_unavailable')
        except HTTPError as error:
            try:
                reason=json.loads(error.read()).get('error','action_authority_unavailable')
            except (ValueError,AttributeError):
                reason='action_authority_unavailable'
            raise AuthorityError(reason) from None
        except Exception:
            raise AuthorityError('action_authority_unavailable') from None
        return True

    def execute(self,action):
        attempt=self.attempt
        self.attempt+=1
        identity={**self.identity,'attempt':attempt}
        prefix=f'hsm:{self.identity["run_id"]}:{attempt}'
        from langsmith import tracing_context
        # Gate results pass through the action; keep them out of tracing unless explicitly reviewed.
        with tracing_context(enabled=False):
            return gate4_sequence(self,identity,prefix,action)

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
