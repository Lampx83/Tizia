const esc=value=>String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function contractDiagram(contract,active=null) {
  if (!contract?.states || !contract.transitions) return '';
  const positions=new Map(contract.states.map((name,i)=>[name,{x:30+i*190,y:100}]));
  return `<svg viewBox="0 0 800 230" role="img" aria-label="Máy trạng thái ${esc(contract.parent.join(' → '))}">
    <rect x="5" y="5" width="790" height="220" rx="12" fill="none" stroke="currentColor"/>
    <text x="20" y="32" fill="currentColor">${esc(contract.parent[0])}</text>
    <rect x="15" y="45" width="770" height="165" rx="8" fill="none" stroke="currentColor"/>
    <text x="30" y="75" fill="currentColor">${esc(contract.parent.slice(1).join(' → '))}</text>
    ${contract.transitions.map(edge=>{const a=positions.get(edge.from),b=positions.get(edge.to);return `<path d="M${a.x+140} ${a.y+20} Q${(a.x+b.x+140)/2} ${edge.to==='Blocked'?45:120} ${b.x} ${b.y+20}" fill="none" stroke="currentColor"/><text x="${(a.x+b.x+140)/2}" y="${edge.to==='Blocked'?57:155}" text-anchor="middle" fill="currentColor">${esc(edge.event)} →</text>`;}).join('')}
    ${contract.states.map(name=>{const p=positions.get(name);return `<rect x="${p.x}" y="${p.y}" width="140" height="40" rx="6" fill="${name===active?'#17683d':'#f5f5f5'}" stroke="currentColor"/><text x="${p.x+70}" y="${p.y+25}" text-anchor="middle" fill="${name===active?'white':'#202020'}">${esc(name)}</text>`;}).join('')}
  </svg>`;
}

// Nodes the events prove were reached; nothing is drawn as visited on the strength of the spec alone.
export function visitedNodes(events = [], root = {}) {
  const seen = new Set();
  let attempts = 0;
  for (const e of events) {
    if (e.event_type === 'gate_started') {
      try {
        const d = JSON.parse(e.internal_detail);
        seen.add(`gate_${String(d.gate).replace('.', '_')}`);
        if (Number(d.gate) >= 3) seen.add('attempt_open');
        attempts = Math.max(attempts, Number(d.attempt) || 0);
      } catch { /* an unreadable event proves nothing */ }
    }
    if (e.event_type === 'plan_validated') seen.add('plan_ready');
    if (e.event_type === 'plan_blocked') seen.add('plan_stopped');
    if (e.event_type === 'pre_pr_verdict') { seen.add('attempt_close'); seen.add('repair_check'); seen.add('verdict'); }
  }
  if (attempts > 0) { seen.add('repair'); seen.add('repair_check'); }
  return seen;
}

const NODE_LABEL = { attempt_open: 'Mở lượt làm', attempt_close: 'Đóng lượt (dọn nhánh tạm)', repair_check: 'Có sửa lại không?', repair: 'Ghi lý do sửa',
  verdict: 'Kết luận', plan_ready: 'Plan sẵn sàng', plan_stopped: 'Plan bị dừng' };

export function renderGraph(graph, events = [], root = {}) {
  if (!graph?.nodes || !graph.edges) return '';
  const seen = visitedNodes(events, root);
  const label = (n) => NODE_LABEL[n.id] || (n.gate != null ? `Bước ${n.gate} · ${graph.names?.[n.gate] || ''}` : n.id);
  const rows = [['Lập kế hoạch', ['gate_1', 'gate_2', 'gate_2_5', 'plan_ready', 'plan_stopped']],
    ['Thực hiện', ['attempt_open', 'gate_3', 'gate_4', 'gate_5', 'gate_5_5', 'attempt_close']], ['Điều phối', ['repair_check', 'repair', 'verdict']]];
  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  return `<details class="blk" data-k="exec-graph"><summary><b>Đồ thị xử lý</b> · ${graph.nodes.length} nút · ${graph.edges.length} cạnh · ${esc(String(graph.hash).slice(0, 10))}</summary>
    <p class="meta">Cùng một đồ thị với bộ điều phối của worker (đọc từ hợp đồng chung). Nút xanh là nút các sự kiện đã chứng minh được đi qua; nút xám chưa tới.</p>
    ${rows.map(([title, ids]) => `<div class="graph-row"><span class="meta">${esc(title)}</span>${ids.filter((id) => byId.has(id)).map((id) => `<span class="graph-node ${seen.has(id) ? 'seen' : ''}" data-node="${esc(id)}">${esc(label(byId.get(id)))}</span>`).join('')}</div>`).join('')}
    <ul class="graph-edges">${graph.edges.map((e) => `<li><code>${esc(e.from)}</code> -${esc(e.on)}→ <code>${esc(e.to)}</code></li>`).join('')}</ul>
  </details>`;
}

export function renderHsm(hsm) {
  const states=hsm?.states || [];
  if (!states.length) return '<div class="blk meta">Lượt này chưa có state HSM Gate 4; tiến trình cũ vẫn hiển thị riêng.</div>';
  const latest=states.at(-1);
  return `<details class="blk" data-k="hsm-contract"><summary><b>Trạng thái thực thi Gate 4</b> · ${esc(latest.path.join(' → '))}</summary>
    <p class="meta">State được lưu bởi server · run ${esc(latest.run_id)} · attempt ${esc(latest.attempt)} · version ${esc(latest.version)}. Passed chỉ chứng nhận Gate 4, chưa phải phát hành.</p>
    ${contractDiagram(hsm.contract,latest.state)}
    ${states.map(s=>`<p>Run ${esc(s.run_id)} / attempt ${esc(s.attempt)}: <code>${esc(s.path.join(' → '))}</code>${s.result?.reason?` · ${esc(s.result.reason)}`:''}</p>`).join('')}
    ${hsm.events.filter(e=>!e.accepted).map(e=>`<p class="meta">Event ${esc(e.event)} bị từ chối: ${esc(e.reason)}</p>`).join('')}
  </details>`;
}
