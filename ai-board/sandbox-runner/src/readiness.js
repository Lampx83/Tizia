/** Fail-closed runner readiness: ready only while kvm is usable and a microVM boots. */
/** `onFailure(code, error)` gets the raw cause for internal logs only; status never carries it. */
export function createReadiness({ checkKvm, bootProbe, now = Date.now, onFailure = () => {} }) {
  let current = { ready: false, code: 'not_checked' };
  let running = null;

  async function run() {
    const checked_at = now();
    try { checkKvm(); } catch (error) { onFailure('kvm_unavailable', error); return { ready: false, code: 'kvm_unavailable', checked_at }; }
    try { return { ready: true, checked_at, versions: await bootProbe() }; } catch (error) { onFailure('boot_failed', error); return { ready: false, code: 'boot_failed', checked_at }; }
  }

  function check() {
    running ??= run().then((result) => { current = result; return result; }).finally(() => { running = null; });
    return running;
  }

  return { check, status: () => current };
}
