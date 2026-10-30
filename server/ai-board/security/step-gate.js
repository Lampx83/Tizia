const BLOCKED = new Set(['waiting_authorization', 'human_owned', 'waiting_data']);

/** Orders of plan children that may run: queued, every dependency queued-runnable or done. */
export function runnableOrders(children) {
  const byOrder = new Map(children.map((child) => [Number(child.sequence), child]));
  const memo = new Map();
  const ok = (order) => {
    if (memo.has(order)) return memo.get(order);
    memo.set(order, false);
    const child = byOrder.get(order);
    const deps = child ? [].concat(typeof child.depends_on === 'string' ? JSON.parse(child.depends_on || '[]') : child.depends_on ?? []) : [];
    const result = !!child && !BLOCKED.has(child.status)
      && (child.status === 'queued' || child.status === 'done')
      && deps.every((dep) => byOrder.get(Number(dep))?.status === 'done' || ok(Number(dep)));
    memo.set(order, result);
    return result;
  };
  return [...byOrder.keys()].filter((order) => byOrder.get(order).status === 'queued' && ok(order)).sort((a, b) => a - b);
}

/** Root status + per-step gates when a plan mixes runnable and blocked steps; null when uniform. */
export function splitGates(gates) {
  const runnable = gates.some((gate) => gate.child === 'queued');
  return runnable && gates.some((gate) => gate.child !== 'queued')
    ? { status: 'planned', child: 'queued', reason: 'tier_split',
      note: 'Các bước an toàn được thực hiện; bước cần duyệt đã tách thành việc chờ quản trị viên hoặc con người.' }
    : null;
}
