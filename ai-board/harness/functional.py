"""Harness-owned behavioral oracles. Candidate-authored tests are supplementary."""
import re
import unicodedata


QUEUE_PROBE = 'queue-worker-availability-v1'


def request_text(state):
    text = str(state.get('request_title') or '') + '\n' + str(state.get('request_detail') or '')
    text = unicodedata.normalize('NFD', text.lower())
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn').replace('đ', 'd')
    return text


def select(state):
    text = request_text(state)
    if 'worker' in text and re.search(r'\beta\b|uoc tinh|phut|estimate', text):
        return QUEUE_PROBE
    return None


def expected_targets(state):
    """Verified existing surfaces for the three reported regressions, not model-selected files."""
    text = request_text(state)
    if select(state):
        return {'public/js/suggestion-fab.js'}
    if re.search(r'copy|sao chep', text) and re.search(r'response|phan hoi', text):
        return {'public/js/request-thread.js'}
    if re.search(r'search|tim kiem', text) and re.search(r'activity|activities|hoat dong', text):
        return {'public/js/school-explore.js'}
    return set()


def run(base, probe_id, fixture=None):
    if probe_id != QUEUE_PROBE:
        return {'probe_id': None, 'passed': False, 'reason': 'No trusted behavioral oracle for this request'}
    if fixture is None:
        return {'probe_id': probe_id, 'passed': False, 'reason': 'Requester API and mounted UI fixture unavailable'}
    from playwright.sync_api import sync_playwright
    from gates.verify import _launch
    with sync_playwright() as p:
        browser = _launch(p)
        try:
            seed = fixture('seed')
            context = browser.new_context()
            context.add_cookies([{'name':'tizia_sid','value':seed['token'],'url':base,'httpOnly':True}])
            page = context.new_page()
            page.goto(base + '/school.html?domain=it', wait_until='domcontentloaded', timeout=20000)
            page.evaluate("async () => { const {setPlayerName} = await import('/js/api.js'); setPlayerName('Queue Verify'); await import('/js/suggestion-fab.js'); }")
            page.locator('#sgf-fab').click()
            page.locator('#sgf-root [data-tab="mine"]').click()
            observations = {}
            item = page.locator(f'[data-item="{seed["request_id"]}"]')
            for stage in ('offline','busy','stale','ready'):
                fixture(stage)
                data = page.request.get(base + '/api/requests?domain=it').json()
                request = next(r for r in data['items'] if r['id'] == seed['request_id'])
                queue = request.get('queue') or {}
                ready = stage in ('busy','ready')
                if queue.get('worker_ready') is not ready or (queue.get('eta_s') is None) == ready:
                    raise RuntimeError('Requester API reports incorrect worker availability: ' + stage)
                # Wait on the already open inbox, without reload or calling the renderer ourselves.
                if ready:
                    item.get_by_text(re.compile('phút nữa')).wait_for(timeout=12000)
                else:
                    item.get_by_text(re.compile('chưa thể ước tính')).wait_for(timeout=12000)
                    if 'phút nữa' in item.inner_text():
                        raise RuntimeError('Offline worker still has a queue ETA')
                observations[stage] = item.inner_text()[:1000]
            return {'probe_id':probe_id,'passed':True,'observations':observations,
                    'coverage':{'requester_api':True,'mounted_ui':True,'recovery':True},'reason':None}
        except Exception as error:
            return {'probe_id':probe_id,'passed':False,'reason':str(error)[:1000]}
        finally:
            browser.close()
