"""Order Gate4 actions and enforce authority through the service adapter."""
from contextlib import contextmanager
from contextvars import ContextVar
from typing import TypedDict

_SERVER = ContextVar('gate4_hsm_server', default=None)

class AuthorityError(ValueError):
    def __init__(self,reason):
        super().__init__(reason)
        self.failure_class='budget' if reason=='action_budget_exhausted' else 'critical'

def authorize_action(action):
    backend=_SERVER.get()
    if backend is not None and backend.authorize_action(action) is not True:
        raise AuthorityError('current authority unavailable or revoked')

class Gate4State(TypedDict, total=False):
    version: int
    result: dict

def gate4_graph(backend, identity, prefix, action):
    # Lazy import keeps offline harness callers independent of the worker integration.
    from langgraph.graph import END, START, StateGraph

    def authorize(_state):
        begun=backend.client.post(backend.path,{**identity,'event':'BEGIN','expected_version':0,'idempotency_key':prefix+':begin'})
        if begun.get('execute') is not True:
            raise RuntimeError('Gate4 action already granted; operator reconciliation required')
        return {'version':begun['state']['version']}

    def check(_state):
        return {'result':action()}

    def receipt(state):
        result=state['result']
        backend.client.post(backend.path,{**identity,'event':'BLOCKED' if result['blocked'] else 'PASSED',
            'expected_version':state['version'],'idempotency_key':prefix+':result','result':result})
        return {}

    graph=StateGraph(Gate4State)
    graph.add_node('authorize',authorize)
    graph.add_node('static_check',check)
    graph.add_node('receipt',receipt)
    graph.add_edge(START,'authorize')
    graph.add_edge('authorize','static_check')
    graph.add_edge('static_check','receipt')
    graph.add_edge('receipt',END)
    # No retries: an unacknowledged action cannot safely be repeated.
    return graph.compile()

class RemoteGate4:
    def __init__(self,client,*,ticket_id,run_id,worker_id,lease_token,contract):
        if not isinstance(contract,dict) or not isinstance(contract.get('hash'),str) or not contract['hash']:
            raise AuthorityError('action_contract_unavailable')
        self.client=client
        self.path=f'/api/ai-board/worker/tickets/{ticket_id}/hsm'
        self.identity={'run_id':run_id,'worker_id':worker_id,'lease_token':lease_token,'contract_hash':contract['hash']}
        self.attempt=0

    def authorize_action(self,action):
        from urllib.error import HTTPError
        import json
        try:
            answer=self.client.post(self.path+'/authority',{**self.identity,'action':action})
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
        # Graph state contains results; keep it local unless a separate tracing
        # integration is explicitly configured and reviewed.
        with tracing_context(enabled=False):
            return gate4_graph(self,identity,prefix,action).invoke({},config={'recursion_limit':5})['result']

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
