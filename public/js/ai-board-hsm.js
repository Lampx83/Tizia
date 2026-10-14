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
