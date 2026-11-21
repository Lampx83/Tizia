// Decision ledger rows the planner logs (model_first): clamp for storage and the admin card; never trusted as evidence.
const KINDS = new Set(['choose_file', 'new_file', 'placement', 'wiring', 'skip_alternative', 'ambiguity']);
const text = (value, cap) => String(value ?? '').slice(0, cap);

/** Bounded rows; malformed ones are dropped, not fatal. */
export function cleanLedger(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((d) => d && typeof d === 'object' && KINDS.has(d.decision) && typeof d.target === 'string').slice(0, 20).map((d) => ({
    decision: d.decision, target: text(d.target, 300), gate: Number.isInteger(d.gate) ? d.gate : 1,
    evidence: (Array.isArray(d.evidence) ? d.evidence : []).slice(0, 3).filter((e) => e && Number.isInteger(e.step_id)).map((e) => ({
      step_id: e.step_id,
      ...(typeof e.file === 'string' ? { file: text(e.file, 300) } : {}),
      ...(e.lines != null ? { lines: text(e.lines, 30) } : {}),
      ...(typeof e.tool_output_excerpt === 'string' ? { tool_output_excerpt: text(e.tool_output_excerpt, 400) } : {}),
    })),
    rejected: (Array.isArray(d.rejected) ? d.rejected : []).slice(0, 2).filter((r) => r && typeof r.target === 'string')
      .map((r) => ({ target: text(r.target, 300), reason: text(r.reason, 300) })),
    ...(Array.isArray(d.readings) && d.readings.length === 2 ? { readings: d.readings.map((r) => text(r, 200)) } : {}),
  }));
}

const LABEL = { choose_file: 'Chọn file', new_file: 'File mới', placement: 'Vị trí', wiring: 'Nối', skip_alternative: 'Bỏ phương án', ambiguity: 'Hai cách hiểu' };

/** One evidence-row text per decision for the approvals card. */
export function ledgerRows(rows) {
  return cleanLedger(rows).map((d) => ({
    source: `${LABEL[d.decision]} ${d.target}`,
    quote: [...d.evidence.map((e) => `bước ${e.step_id} cổng ${d.gate}${e.file ? ` ${e.file}${e.lines ? `:${e.lines}` : ''}` : ''}${e.tool_output_excerpt ? ` “${e.tool_output_excerpt}”` : ''}`),
      ...(d.readings ? [`${d.readings[0]} | ${d.readings[1]}`] : []),
      ...d.rejected.map((r) => `bỏ ${r.target}: ${r.reason}`)].join('; ') || 'không có bằng chứng',
  }));
}
