// Poll loop shared by admin pages: no request while the tab is hidden, a visible tab refreshes at once.
// `task` runs each tick; `delay()` returns the next wait in ms, or null to stop.
export function createPoll(task, delay) {
  let timer = null;
  let stopped = false;
  const clear = () => { clearTimeout(timer); timer = null; };
  const arm = () => {
    clear();
    const ms = stopped || document.hidden ? null : delay();
    if (ms != null) timer = setTimeout(run, ms);
  };
  async function run() {
    clear();
    if (!stopped && !document.hidden) await Promise.resolve().then(task).catch((e) => console.warn(e));
    arm();
  }
  const onVisibility = () => (document.hidden ? clear() : run());
  document.addEventListener('visibilitychange', onVisibility);
  return {
    arm,
    run,
    stop() {
      stopped = true;
      clear();
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}
