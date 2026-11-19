// Thẻ quyết định thống nhất cho admin: Hành động · Vì sao hỏi · Bằng chứng · Rủi ro · Lựa chọn.
// Thuần, tất định: chỉ dựng từ dữ liệu server đã lưu, không gọi model, không quyết định gì.
import { isSelfScope, levelRank } from '../elevation-context.js';

export const OPTION_LABEL = { approve: 'duyệt', reject: 'từ chối', edit: 'sửa rồi duyệt' };
const LEVEL_LABEL = { surface: 'bề mặt', protected: 'bảo vệ', core: 'lõi' };
const RISK_RANK = { low: 0, medium: 1, high: 2 };
const MAX_EVIDENCE = 12;
const QUOTE = 400;

const clip = (value, cap = QUOTE) => {
  const text = String(value ?? '').trim();
  return text.length > cap ? `${text.slice(0, cap - 1)}…` : text;
};
const option = (key, available, note = '', act = null) => ({ key, label: OPTION_LABEL[key], available: !!available, note, ...(act ? { act } : {}) });
const evidence = (items) => items.filter((item) => item && item.quote).slice(0, MAX_EVIDENCE)
  .map((item) => ({ source: clip(item.source, 160), quote: clip(item.quote) }));
const maxRisk = (...levels) => levels.reduce((top, level) => (RISK_RANK[level] > RISK_RANK[top] ? level : top), 'low');

// Path nhạy cảm theo tên: chỉ để admin thấy trên thẻ, không thay luật cổng nào.
const PATH_RISKS = [
  { re: /(^|\/)migrations?\/|\.sql$|(^|\/)server\/db(-core)?\.js$/i, label: 'migration/schema DB', reversible: false },
  { re: /(^|\/)(payment|billing|economy)(\/|\.|$)|wallet/i, label: 'đường tiền (thanh toán/ví)', reversible: false },
];
const pathRisk = (path) => PATH_RISKS.find((rule) => rule.re.test(String(path ?? '')));

/** Rủi ro của một tập path theo mức: core/migration/tiền = không hoàn tác, protected = cao, surface = thấp. */
export function scopeRisk(scope) {
  const rows = Array.isArray(scope) ? scope : [];
  const hits = rows.map((row) => pathRisk(row.path)).filter(Boolean);
  const top = rows.reduce((max, row) => (levelRank(row.level) > levelRank(max) ? row.level : max), 'surface');
  if (rows.some((row) => isSelfScope(row.path))) {
    return { reversible: false, level: 'high', note: 'Chạm vùng AI Board tự sửa; không bao giờ được cấp.' };
  }
  if (hits.length) {
    return { reversible: false, level: 'high', note: `Chạm ${[...new Set(hits.map((hit) => hit.label))].join(', ')}: không hoàn tác được sau khi chạy.` };
  }
  if (top === 'core') return { reversible: false, level: 'high', note: 'Phần lõi: ảnh hưởng toàn hệ thống, coi như không hoàn tác được.' };
  if (top === 'protected') return { reversible: true, level: 'high', note: 'Vùng bảo vệ: đổi qua PR, hoàn tác bằng revert nhưng phạm vi ảnh hưởng rộng.' };
  return { reversible: true, level: 'low', note: 'Chỉ bề mặt giao diện; hoàn tác được.' };
}

/** Context duyệt elevation (buildElevationContext) → thẻ. `grounding` = plan.grounding.evidence nếu có. */
export function elevationCard(context, { grounding = [] } = {}) {
  const scope = context?.elevation?.scope ?? [];
  const flags = context?.flags ?? {};
  const plan = context?.plan ?? {};
  const top = context?.elevation?.max_level ?? 'core';
  const action = [
    `Cấp quyền mức ${LEVEL_LABEL[top] || top} cho AI Board trên ${scope.length} path: ${scope.map((row) => `${row.path} (${LEVEL_LABEL[row.level] || row.level})`).join(', ') || '—'}.`,
    plan.goal ? `Kế hoạch: ${clip(plan.goal, 300)}` : '',
    ...(plan.steps ?? []).map((step) => `Bước ${step.order}: ${clip(step.title, 160)}${step.paths?.length ? ` → ghi ${step.paths.join(', ')}` : ''}`),
    'Duyệt thì kế hoạch được lập lại với đúng quyền này.',
  ].filter(Boolean).join('\n');
  const why = [
    ...[...new Set(scope.map((row) => row.level))].filter((level) => levelRank(level) > 0)
      .map((level) => `Path mức ${LEVEL_LABEL[level] || level} (${level}) cần quản trị viên cấp quyền`),
    flags.self_scope ? 'Chạm vùng AI Board tự sửa (ai-board/**, server/ai-board/**): luôn chặn' : '',
    flags.outside_request ? 'Có path không nêu trong yêu cầu và không có trong kế hoạch' : '',
    flags.scope_changed_since_request ? 'Phạm vi/plan_hash đổi sau lúc xin' : '',
    flags.level_above_plan ? 'Mức xin cao hơn mức capability trong kế hoạch' : '',
    flags.plan_missing ? 'Worker không gửi kèm bước kế hoạch' : '',
    context?.elevation?.reason ? `Lý do worker: ${clip(context.elevation.reason, 300)}` : '',
  ].filter(Boolean).join('\n');
  const ev = context?.evidence ?? {};
  const items = evidence([
    { source: `Yêu cầu #${context?.request?.id ?? '?'}`, quote: [context?.request?.title, context?.request?.excerpt].filter(Boolean).join(' — ') },
    ...(Array.isArray(grounding) ? grounding : []).map((g) => ({
      source: `${g.file}${g.line ? `:${g.line}` : ''}`, quote: g.quote || g.before || '' })),
    ...scope.map((row) => ({ source: `scope ${row.path}`, quote: [
      row.named_in_request ? 'có trong yêu cầu' : row.in_plan ? 'chỉ có trong kế hoạch' : 'không có trong yêu cầu/kế hoạch',
      row.plan_step ? `bước ${row.plan_step.order} ${row.plan_step.title}` : '',
      row.plan_tier ? `mức plan ${row.plan_tier}` : ''].filter(Boolean).join(' · ') })),
    { source: 'plan', quote: [ev.plan_hash_request || plan.plan_hash ? `hash ${String(ev.plan_hash_request || plan.plan_hash).slice(0, 12)}` : '',
      ev.revision_request != null ? `revision ${ev.revision_request}` : '',
      ev.plan_hash_current && ev.plan_hash_current !== ev.plan_hash_request ? `hiện tại ${String(ev.plan_hash_current).slice(0, 12)}` : '']
      .filter(Boolean).join(' · ') },
  ]);
  const risk = scopeRisk(scope);
  if (flags.outside_request || flags.scope_changed_since_request) risk.level = maxRisk(risk.level, 'medium');
  const narrowable = scope.length > 1 || scope.some((row) => levelRank(row.level) > levelRank('protected'));
  const pending = context?.elevation?.state === 'requested';
  return {
    kind: 'elevation', action, why, evidence: items, risk,
    options: [
      option('approve', pending && !flags.self_scope, flags.self_scope ? 'Vùng AI Board không được cấp.' : '', 'approve'),
      option('reject', pending, '', 'reject'),
      option('edit', pending && !flags.self_scope && narrowable,
        flags.self_scope ? 'Vùng AI Board không được cấp, kể cả khi bỏ bớt path.'
          : narrowable ? 'Chọn bớt path hoặc hạ lõi → bảo vệ; không nâng mức, không thêm path.'
            : 'Chỉ một path ở mức thấp nhất cần duyệt; không có gì để thu hẹp.', 'approve'),
    ],
  };
}

const NET_NOTE = 'Worker nhận quyết định theo call_id và chạy đúng URL/gói đã xin; muốn hẹp hơn thì từ chối kèm lý do để model xin lại.';

/** Một mục hàng đợi mạng (services/network-requests view) → thẻ. */
export function networkCard(item) {
  const pkg = item?.kind === 'package';
  const meta = item?.metadata ?? {};
  const scripts = Array.isArray(meta.install_scripts) ? meta.install_scripts : [];
  let host = '';
  try { host = pkg ? '' : new URL(String(item?.url)).host; } catch { host = ''; }
  const pending = item?.status === 'pending';
  return {
    kind: 'network_request',
    action: pkg
      ? `Cài gói npm ${item.name}@${item.version_range || 'latest'} vào bản nháp của run; phụ thuộc vào qua PR.`
      : `Gửi request mạng tới ${host || item?.url || '?'} (${clip(item?.url, 300)}); nội dung trả về đưa cho model.`,
    why: pkg
      ? 'Run cần gói npm chưa có trong package.json (network_request): mọi gói mới phải được quản trị viên duyệt.'
      : 'Run cần truy cập URL ngoài sandbox (network_request): mọi request mạng ra ngoài phải được quản trị viên duyệt.',
    evidence: evidence([
      { source: 'lý do của model', quote: item?.reason },
      ...(pkg ? [
        { source: 'metadata', quote: [meta.version && `phiên bản ${meta.version}`, meta.license && `giấy phép ${meta.license}`,
          meta.age_days != null && `${meta.age_days} ngày tuổi`, meta.weekly_downloads != null && `${meta.weekly_downloads} lượt tải/tuần`,
          meta.transitive_count != null && `${meta.transitive_count} gói phụ thuộc gián tiếp`].filter(Boolean).join(' · ') },
        { source: 'script cài đặt', quote: scripts.join(', ') },
      ] : []),
      { source: 'call_id', quote: item?.call_id },
    ]),
    risk: pkg
      ? (scripts.length
        ? { reversible: false, level: 'high', note: 'Gói có script cài đặt: chạy code ngay khi cài, không thu hồi được.' }
        : { reversible: true, level: 'medium', note: 'Phụ thuộc mới đi qua PR; gỡ được bằng revert.' })
      : { reversible: false, level: 'medium', note: 'Request đã gửi thì không thu hồi được; URL có thể mang dữ liệu ra ngoài.' },
    options: [option('approve', pending, '', 'approve'), option('reject', pending, 'Lý do từ chối không bắt buộc.', 'reject'),
      option('edit', false, NET_NOTE)],
  };
}

const HASH_NOTE = 'Băm cố định nội dung; sửa là phiên bản mới, worker phải báo lại để duyệt.';
const PENDING_REJECT = 'Bản chờ chưa chạy được; không có thao tác từ chối, để nguyên là không dùng.';

const hashOptions = (status) => [
  option('approve', status === 'pending', status === 'revoked' ? 'Đã thu hồi; không duyệt lại được.' : '', 'approve'),
  option('reject', status === 'approved', status === 'pending' ? PENDING_REJECT : status === 'approved' ? 'Từ chối = thu hồi; có hiệu lực ở hành động kế tiếp của worker.' : '', 'revoke'),
  option('edit', false, HASH_NOTE),
];

/** Một phiên bản manifest tool (tool-manifests list) → thẻ. */
export function manifestCard(m) {
  const tools = Array.isArray(m?.tools) ? m.tools : [];
  const writes = tools.filter((t) => t.effect === 'draft_write');
  return {
    kind: 'tool_manifest',
    action: `Cho worker chạy ${tools.length} tool của vòng sửa code theo manifest ${String(m?.manifest_hash ?? '').slice(0, 12)} (v${m?.version ?? '?'}): ${tools.map((t) => `${t.name} (${t.effect})`).join(', ')}.`,
    why: 'Manifest tool có băm chưa duyệt: worker chỉ chạy tool khi băm manifest đã được quản trị viên duyệt.',
    evidence: evidence([
      { source: 'báo bởi', quote: m?.reported_by },
      ...tools.map((t) => ({ source: `tool ${t.name}`, quote: `${t.effect}, trần ${t.max_arg_bytes} byte tham số / ${t.max_output_chars} ký tự kết quả / ${t.max_seconds} giây` })),
    ]),
    risk: { reversible: true, level: writes.length ? 'medium' : 'low',
      note: `${writes.length ? `${writes.length} tool ghi bản nháp; ` : ''}thu hồi được, có hiệu lực ở hành động kế tiếp.` },
    options: hashOptions(m?.status),
  };
}

/** Một phiên bản registry primitive check của gate 5 (check-registries list) → thẻ. */
export function registryCard(r) {
  const primitives = Array.isArray(r?.primitives) ? r.primitives : [];
  return {
    kind: 'check_registry',
    action: `Cho gate 5 chạy ${primitives.length} primitive check theo registry ${String(r?.registry_hash ?? '').slice(0, 12)} (v${r?.version ?? '?'}): ${primitives.join(', ')}.`,
    why: 'Registry primitive check có băm chưa duyệt: gate 5 chỉ chạy check khi băm registry đã được quản trị viên duyệt.',
    evidence: evidence([{ source: 'báo bởi', quote: r?.reported_by }, { source: 'primitive', quote: primitives.join(', ') }]),
    risk: { reversible: true, level: 'medium', note: 'Check quyết định qua/không qua gate 5; thu hồi được, có hiệu lực ở lượt kiểm tra kế tiếp.' },
    options: hashOptions(r?.status),
  };
}

// Phase chờ quản trị viên → luật đã dừng run + thao tác đã có sẵn (trang yêu cầu); không thêm cơ chế mới.
const WAITING = {
  budget_exhausted: { why: 'Hết ngân sách lượt chạy (budget_exhausted)', via: 'Gia hạn ngân sách', risk: 'medium' },
  root_allowance_exhausted: { why: 'Hết hạn mức của yêu cầu trong contract.json (root_allowance_exhausted)', via: '', risk: 'medium' },
  transient_blocked: { why: 'Lỗi hạ tầng thoáng qua sau hết lượt thử (transient_blocked)', via: 'Chạy lại ngay', risk: 'low' },
  critical_violation: { why: 'Vi phạm ranh giới an toàn (critical_violation)', via: 'Đối chiếu bước ghi chưa rõ', risk: 'high' },
  plan_unfit: { why: 'Kế hoạch không thực hiện được như đã viết (plan_unfit)', via: '', risk: 'medium' },
  partial: { why: 'Mới xong một phần kế hoạch (partial)', via: 'Tiếp tục', risk: 'low' },
  network_request: { why: 'Run cần mạng ngoài sandbox (network_request)', via: 'Duyệt từng yêu cầu mạng', risk: 'medium' },
  clarification_limit: { why: 'Hết số vòng hỏi làm rõ (clarification_limit)', via: '', risk: 'low' },
  reverify_conflict: { why: 'Ghép base mới bị xung đột (reverify_conflict)', via: '', risk: 'medium' },
  revert_ready: { why: 'Nhánh hoàn tác đã tạo, chờ con người merge (revert_ready)', via: '', risk: 'medium' },
  rollback_failed: { why: 'Hoàn tác chưa thực hiện được (rollback_failed)', via: '', risk: 'high' },
};
const AUTH_REASON = {
  'protected capability requires explicit admin authorization': { why: 'Kế hoạch chạm capability mức bảo vệ (protected): cần cho phép kế hoạch', via: 'Cho phép kế hoạch', risk: 'high' },
  elevation_pending: { why: 'AI Board đang xin quyền chạm mức bảo vệ/lõi (elevation_pending)', via: 'Thẻ quyền chờ duyệt', risk: 'high' },
  folder_not_approved: { why: 'Chức năng (folder) chưa được duyệt (folder_not_approved)', via: 'Duyệt chức năng', risk: 'medium' },
  data_step_pending: { why: 'Bước thay đổi dữ liệu chờ áp dụng (data_step_pending)', via: 'Xác nhận bước dữ liệu', risk: 'high' },
};
const GUARD = 'guard:';

/** Vé gốc đang chờ admin hoặc bị cờ intake human_review → thẻ chỉ đọc; null khi không có gì chờ. */
export function waitingCard(ticket, { tags = [], flagEvent = null } = {}) {
  const guards = tags.filter((tag) => String(tag).startsWith(GUARD)).map((tag) => tag.slice(GUARD.length));
  const labels = guards.filter((label) => label !== 'human_review');
  const flagged = guards.includes('human_review');
  const held = ticket?.status === 'human_owned';
  const rule = ticket?.status === 'waiting_admin' ? WAITING[ticket.phase]
    : ticket?.status === 'waiting_authorization' ? AUTH_REASON[ticket.internal_reason] ?? AUTH_REASON[ticket.phase] : null;
  const waiting = ['waiting_admin', 'waiting_authorization'].includes(ticket?.status);
  if (!waiting && !(flagged && held)) return null;
  const why = [
    waiting ? (rule?.why ?? `Vé chờ quản trị viên ở bước ${ticket.phase || '?'} (${ticket.status})`) : '',
    flagged ? `Intake gắn cờ human_review: ${labels.length ? labels.join(', ') : 'không rõ nhãn'}${labels.some((l) => /money|off_topic/.test(l)) ? ' (nhãn tiền/lạc đề)' : ''}` : '',
  ].filter(Boolean).join('\n');
  const via = waiting ? rule?.via : '';
  const level = maxRisk(rule?.risk ?? 'medium', flagged && labels.some((l) => /money|privileged|cheating/.test(l)) ? 'high' : 'low');
  return {
    kind: flagged && !waiting ? 'intake_review' : 'waiting_admin',
    action: `${waiting ? `Mở lại vé #${ticket.id} (${ticket.status}/${ticket.phase || '—'})${via ? ` bằng "${via}" trên trang yêu cầu` : ''}` : `Cho yêu cầu #${ticket?.source_request_id ?? '?'} đi tiếp dù intake gắn cờ`}. ${ticket?.public_note ? clip(ticket.public_note, 300) : ''}`.trim(),
    why,
    evidence: evidence([
      { source: 'lý do nội bộ', quote: ticket?.internal_reason },
      { source: 'intake_guard', quote: flagEvent },
      ...labels.map((label) => ({ source: `${GUARD}${label}`, quote: label.startsWith('model_') ? 'tín hiệu bộ phân loại (tham khảo)' : 'khớp từ điển chủ đề' })),
      { source: 'cảnh báo mở', quote: Number(ticket?.open_alerts) > 0 ? `${ticket.open_alerts} cảnh báo` : '' },
    ]),
    risk: { reversible: level !== 'high', level,
      note: level === 'high' ? 'Mở lại vùng/hành vi đã bị chặn; khó hoàn tác.' : 'Chỉ cho vé chạy tiếp; quyết định ghi vết, hoàn tác được.' },
    options: [
      option('approve', !!via, via ? `Thao tác "${via}" trên trang yêu cầu.` : 'Không có thao tác mở lại cho bước này; xem trang yêu cầu.'),
      option('reject', true, 'Trả lời → Từ chối: đóng yêu cầu và vé AI.'),
      option('edit', false, 'Không có bản duyệt hẹp hơn cho loại chờ này.'),
    ],
  };
}

/**
 * Kiểm phạm vi duyệt hẹp: `granted` ⊆ `requested` theo path, mức không vượt mức đã xin.
 * Trả [{path, level}] đã chuẩn hoá; ném Error có code khi sai.
 */
export function narrowScope(requested, granted) {
  const asked = new Map((Array.isArray(requested) ? requested : []).map((row) => [String(row.path), String(row.level)]));
  const list = Array.isArray(granted) ? granted : [];
  const fail = (code, message) => Object.assign(new Error(message), { code });
  if (!list.length) throw fail('elevation_scope_empty', 'narrowed scope needs at least one path');
  const out = new Map();
  for (const entry of list) {
    const path = String(typeof entry === 'string' ? entry : entry?.path ?? '');
    if (!asked.has(path)) throw fail('elevation_scope_widened', `path ${path} was not requested`);
    const level = String((typeof entry === 'string' ? null : entry?.level) ?? asked.get(path)).toLowerCase();
    if (!Object.hasOwn(LEVEL_LABEL, level) || levelRank(level) > levelRank(asked.get(path))) {
      throw fail('elevation_level_raised', `level for ${path} exceeds the requested level`);
    }
    out.set(path, level);
  }
  return [...out].map(([path, level]) => ({ path, level })).sort((a, b) => a.path.localeCompare(b.path));
}
