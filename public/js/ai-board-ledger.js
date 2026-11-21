// Admin view of the planner's decision ledger: each decision with its evidence and rejected options; step links reuse the graph node click.
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const code = (v) => `<code>${esc(v)}</code>`;

export const DECISION_LABEL = { choose_file: 'Chọn file', new_file: 'File mới', placement: 'Vị trí', wiring: 'Nối', skip_alternative: 'Bỏ phương án', ambiguity: 'Hai cách hiểu' };
const nodeOf = (gate) => `gate_${String(gate ?? 1).replace('.', '_')}`;

/** Button that selects the gate's node in the graph; data-step marks the ReAct step to read there. */
export function stepLink(gate, step) {
  return `<button type="button" class="ledger-step" data-node="${esc(nodeOf(gate))}" data-step="${esc(step)}" title="Mở nhật ký bước ${esc(step)}">Bước ${esc(step)}</button>`;
}

function evidenceLine(e, gate) {
  const where = e.file ? `${code(e.lines ? `${e.file}:${e.lines}` : e.file)}` : '';
  const quote = e.tool_output_excerpt ? `<q>${esc(e.tool_output_excerpt)}</q>` : '';
  return `<li>${stepLink(gate, e.step_id)} ${where}${quote}</li>`;
}

function decisionItem(d) {
  const evidence = (d.evidence || []).map((e) => evidenceLine(e, d.gate));
  const readings = Array.isArray(d.readings) ? `<div class="meta">Hai cách hiểu: ${esc(d.readings[0])} <b>hoặc</b> ${esc(d.readings[1])}</div>` : '';
  const rejected = (d.rejected || []).map((r) => `<li>Đã bỏ ${code(r.target)}${r.reason ? `: ${esc(r.reason)}` : ''}</li>`);
  return `<li class="ledger-item"><div class="line1"><span class="tag st-idle">${esc(DECISION_LABEL[d.decision] || d.decision)}</span> ${code(d.target)}</div>${readings}`
    + `${evidence.length ? `<ul class="ledger-ev">${evidence.join('')}</ul>` : d.readings ? '' : '<div class="meta">Không kèm bằng chứng.</div>'}`
    + `${rejected.length ? `<ul class="ledger-rej">${rejected.join('')}</ul>` : ''}</li>`;
}

/** Gate 3 rows (tagged gate 3) from the latest gate_3 journal row; the file names the subtask each belongs to. */
export function gate3Decisions(journal) {
  const rows = (Array.isArray(journal) ? journal : []).filter((j) => j?.node === 'gate_3' && j.state?.ledger_gate3);
  const latest = rows.sort((a, b) => Number(a.created_at) - Number(b.created_at)).at(-1);
  return Object.values(latest?.state.ledger_gate3 || {}).flatMap((list) => (Array.isArray(list) ? list : []))
    .filter((d) => d && typeof d === 'object').map((d) => ({ ...d, gate: 3 }));
}

/** Ledger block for the request page; '' when there is none. gate3 titles it as the code gate's ledger. */
export function renderLedger(decisions, { gate3 = false } = {}) {
  const rows = Array.isArray(decisions) ? decisions.filter((d) => d && typeof d === 'object') : [];
  if (!rows.length) return '';
  return `<details class="g-ledger" data-k="${gate3 ? 'ledger3' : 'ledger'}" data-dopen><summary>Sổ quyết định${gate3 ? ' cổng 3' : ''} (${esc(rows.length)})</summary>`
    + `<p class="meta">Bằng chứng do harness kiểm: bước tồn tại, đã đọc file, dòng nằm trong phần đã đọc. Bằng chứng có đỡ quyết định không là việc của reviewer và admin.</p>`
    + `<ol class="ledger-list">${rows.map(decisionItem).join('')}</ol></details>`;
}
