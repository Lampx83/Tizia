// ============================================================
// Suggestion FAB — nút "🏛️ Đề nghị" nổi ở mọi trang
// ============================================================
// Cho phép SV gửi đề nghị / góp ý / yêu cầu tính năng cho Ban điều
// hành AI ngay tại trang đang xem. Tự gắn URL + tiêu đề trang vào
// để AI có ngữ cảnh phản hồi. Sau khi gửi, modal cũng liệt kê các
// yêu cầu gần đây kèm phản hồi của AI ("✓ Đã làm" / "Tiếc là…").
//
// Tự mount vào mọi trang HTML qua middleware ở server/index.js — KHÔNG
// cần page sửa gì. Page muốn ẩn nút: thêm <body data-no-suggestion-fab>.
// Page muốn ép domain: window.SUGGESTION_DOMAIN = 'pharmacy'|'school'|'it'.
// ============================================================

import { getPlayerName } from './api.js';
import { renderRequestThread } from './request-thread.js';

const TYPES = [
  { v: 'game',   icon: '🎮', label: 'Thêm trò chơi / mini-game' },
  { v: 'theory', icon: '📖', label: 'Thêm lý thuyết / học liệu' },
  { v: 'lab',   icon: '🧪', label: 'Cải thiện phòng thí nghiệm / thực hành' },
  { v: 'skill', icon: '🎯', label: 'Luyện kỹ năng' },
  { v: 'other', icon: '💬', label: 'Góp ý / báo lỗi / khác' },
  { v: 'feature', icon: '✨', label: 'Chức năng mới (Ban làm bản nháp, bạn sửa tiếp)' },
];
const STATUS = {
  pending:   { label: 'Chờ duyệt',    cls: 'pending' },
  reviewing: { label: 'Đang làm',     cls: 'reviewing' },
  done:      { label: '✓ Hoàn thành', cls: 'done' },
  rejected:  { label: 'Chưa thực hiện', cls: 'rejected' },
  cancelled: { label: 'Đã hủy',       cls: 'cancelled' },
};

function inferDomain() {
  if (typeof window !== 'undefined' && window.SUGGESTION_DOMAIN) {
    return String(window.SUGGESTION_DOMAIN);
  }
  // Ưu tiên ?domain= trên URL (school.html?domain=secondary…) để khớp enrolled_domain
  try {
    const q = new URLSearchParams(location.search).get('domain');
    if (q) return String(q);
  } catch {}
  const p = (location.pathname || '').toLowerCase();
  if (/(^|\/)(it-|playground|cipher|sql|algo|code-lab|web-playground)/.test(p)) return 'it';
  if (/(pharmacy|pharma|nha-thuoc|compounding|sac-ky|dispense|antibiogram|ps\d|bao-che|herb-garden|titration|pediatric|iv-infusion|gmp|patient-sim|gc\d|calibration-curve|pk-curve|bp-measure|dilution|3d-shelf|2d-arcade|grapher|l[12]-)/.test(p)) return 'pharmacy';
  return 'school';
}

function pageContext() {
  const url = location.pathname + location.search;
  let title = document.title || '';
  title = title.replace(/\s*[·|—-]\s*Tizia.*$/i, '').trim();
  return { url, title };
}

function autoMount() {
  if (document.getElementById('sgf-root')) return;
  if (document.body?.dataset?.noSuggestionFab !== undefined) return;
  // Một số trang nhúng iframe — chỉ mount ở top frame để khỏi trùng nút
  try { if (window.top !== window.self) return; } catch { /* cross-origin, skip */ return; }
  injectStyles();
  const root = document.createElement('div');
  root.id = 'sgf-root';
  root.innerHTML = `
    <button id="sgf-fab" type="button" aria-label="Gửi đề nghị tới Ban điều hành AI"
            title="Gửi đề nghị cho Ban điều hành AI">
      <span class="sgf-fab-ico">🏛️</span>
      <span class="sgf-fab-lbl">Đề nghị</span>
    </button>
    <div id="sgf-modal" class="sgf-modal" hidden>
      <div class="sgf-backdrop" data-close></div>
      <div class="sgf-dialog" role="dialog" aria-modal="true" aria-labelledby="sgf-title">
        <div class="sgf-head">
          <div class="sgf-head-ico">🏛️</div>
          <div class="sgf-head-text">
            <h3 id="sgf-title">Ban điều hành AI</h3>
            <p>Trường do <b>AI điều hành</b> — gửi đề nghị, AI sẽ xem xét &amp;
               phản hồi. Yêu cầu được làm xong sẽ tick ✓ kèm lời nhắn.</p>
          </div>
          <button type="button" class="sgf-x" data-close aria-label="Đóng">✕</button>
        </div>

        <div id="sgf-pending" class="sgf-clar-banner" hidden role="status"></div>
        <div class="sgf-tabs" role="tablist">
          <button type="button" class="sgf-tab" role="tab" data-tab="new" aria-selected="true">✍️ Gửi đề nghị mới</button>
          <button type="button" class="sgf-tab" role="tab" data-tab="mine" aria-selected="false">📂 Của bạn
            <span class="sgf-tab-badge" id="sgf-tab-badge" hidden></span></button>
        </div>
        <div class="sgf-pane" id="sgf-pane-new" role="tabpanel">
        <section id="sgf-onboard" class="sgf-onboard" hidden aria-live="polite"></section>
        <form id="sgf-form" class="sgf-form">
          <label class="sgf-lab">Loại đề nghị
            <select id="sgf-type" class="sgf-in">
              ${TYPES.map(t => `<option value="${t.v}">${t.icon} ${t.label}</option>`).join('')}
            </select>
          </label>
          <label class="sgf-lab" id="sgf-folder-row" hidden>Gắn vào chức năng
            <select id="sgf-folder" class="sgf-in"><option value="">— Yêu cầu lẻ —</option></select>
          </label>
          <label class="sgf-lab">Tiêu đề <span class="sgf-req">*</span>
            <input id="sgf-title-in" class="sgf-in" maxlength="200"
                   placeholder="VD: Thêm dạng bài Toán có nhiều cách giải" />
          </label>
          <div class="sgf-folder-hint" id="sgf-folder-hint" hidden></div>
          <label class="sgf-lab">Mô tả chi tiết (tuỳ chọn) <span id="sgf-detail-count" style="opacity:.55;font-size:11px;float:right">0 / 10000</span>
            <textarea id="sgf-detail" class="sgf-in" rows="3" maxlength="10000"
                      placeholder="Càng cụ thể, AI càng dễ hiểu &amp; phản hồi đúng nhu cầu của bạn."></textarea>
          </label>

          <div class="sgf-attach">
            <label class="sgf-attach-row">
              <input type="checkbox" id="sgf-shot-check" />
              <span>📸 Đính kèm ảnh chụp <b>màn hình hiện tại</b> (Ban điều hành xem trực tiếp giao diện anh/chị đang gặp)</span>
            </label>
            <label class="sgf-attach-row sgf-file-row">
              <span class="sgf-attach-lbl">📎 Đính kèm file (ảnh / PDF / Word / Excel / PPT / CSDL .db / .sql — tối đa 50MB × 5 file):</span>
              <input type="file" id="sgf-file-in" multiple accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.db,.sqlite,.sqlite3,.sql,application/sql,application/x-sqlite3" />
            </label>
            <div class="sgf-attach-hint">💡 Có thể <b>kéo-thả</b> file vào khung này hoặc <b>dán ảnh</b> trực tiếp (Ctrl/⌘+V).</div>
            <div class="sgf-attach-list" id="sgf-attach-list"></div>
          </div>

          <div class="sgf-ctx" id="sgf-ctx"></div>
          <div class="sgf-bar">
            <span class="sgf-msg" id="sgf-msg"></span>
            <button type="submit" class="sgf-send" id="sgf-send">📨 Gửi tới Ban điều hành</button>
          </div>
        </form>
        </div>

        <div class="sgf-pane" id="sgf-pane-mine" role="tabpanel" hidden>
        <div class="sgf-folders" id="sgf-folders" hidden></div>
        <div id="sgf-clar-slot">
        <section id="sgf-clarify" class="sgf-clarify" hidden>
          <div class="sgf-clar-banner sgf-clar-live" role="status">🏛️ <span>Ban điều hành cần trao đổi thêm để làm rõ yêu cầu
            <b id="sgf-clar-title"></b></span></div>
          <div class="sgf-clar-log" id="sgf-clar-log" aria-live="polite"></div>
          <div class="sgf-clar-reply" id="sgf-clar-reply" hidden>
            <textarea id="sgf-clar-in" class="sgf-in" rows="2" maxlength="2000"
                      placeholder="Trả lời Ban điều hành… (Enter để gửi, Shift+Enter xuống dòng)"></textarea>
            <div class="sgf-bar"><span class="sgf-msg" id="sgf-clar-count"></span>
              <button type="button" class="sgf-send" id="sgf-clar-send">Trả lời</button></div>
          </div>
          <div class="sgf-clar-sum" id="sgf-clar-sum" hidden>
            <div class="sgf-ob-q">Ban hiểu yêu cầu của bạn như sau — đúng chưa?</div>
            <textarea id="sgf-clar-spec" class="sgf-in" rows="7" maxlength="4000" readonly></textarea>
            <div class="sgf-bar"><button type="button" class="sgf-chip" id="sgf-clar-edit">✏️ Sửa</button>
              <button type="button" class="sgf-send" id="sgf-clar-ok">✓ Đúng, gửi</button></div>
          </div>
          <div class="sgf-msg" id="sgf-clar-msg"></div>
        </section>
        </div>

        <div class="sgf-inbox">
          <div class="sgf-inbox-head">
            <span>Yêu cầu gần đây của bạn</span>
            <button type="button" class="sgf-reload" id="sgf-reload" title="Tải lại">↻</button>
          </div>
          <div class="sgf-inbox-list" id="sgf-inbox">Đang tải…</div>
        </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  bind(root);
}

function bind(root) {
  const fab = root.querySelector('#sgf-fab');
  const modal = root.querySelector('#sgf-modal');
  const form = root.querySelector('#sgf-form');
  const msg = root.querySelector('#sgf-msg');
  const sendBtn = root.querySelector('#sgf-send');
  const ctxBox = root.querySelector('#sgf-ctx');
  const inbox = root.querySelector('#sgf-inbox');

  // Live counter cho detail textarea (req #3 bị cụt ở 2000 chars trước đây →
  // giờ giới hạn 10000, hiển thị bộ đếm để SV biết khi nào sắp đầy).
  const detailInput = root.querySelector('#sgf-detail');
  const detailCount = root.querySelector('#sgf-detail-count');
  if (detailInput && detailCount) {
    const updateCount = () => {
      const n = detailInput.value.length;
      detailCount.textContent = `${n.toLocaleString('vi-VN')} / 10.000`;
      detailCount.style.color = n > 9000 ? '#dc2626' : n > 7000 ? '#f59e0b' : '';
    };
    detailInput.addEventListener('input', updateCount);
    updateCount();
  }

  const ctx = pageContext();
  ctxBox.innerHTML = `📍 <b>Trang đang xem:</b> ${escapeHtml(ctx.title || ctx.url)}
                      <span class="sgf-ctx-url">${escapeHtml(ctx.url)}</span>`;

  // ── Đính kèm: ảnh chụp màn hình + file ──
  // pendingFiles: file user chọn (File[]); pendingShot: true nếu tick checkbox
  // ảnh hiện tại. Cả 2 chỉ upload tại thời điểm submit (để tiết kiệm băng thông
  // nếu user thay đổi ý / bỏ tick). Mỗi attachment tối đa 8MB (BE giới hạn).
  const fileInput = root.querySelector('#sgf-file-in');
  const shotCheck = root.querySelector('#sgf-shot-check');
  const attachList = root.querySelector('#sgf-attach-list');
  const attachBox = root.querySelector('.sgf-attach');
  const MAX_FILES = 5;
  const MAX_BYTES = 50 * 1024 * 1024;         // 50MB/file (khớp giới hạn BE)
  const MAX_TOTAL = 120 * 1024 * 1024;        // 120MB tổng/đề nghị
  // Khớp whitelist BE (server/index.js) — lọc sớm phía client cho UX tốt hơn.
  // File dữ liệu .db/.sqlite/.sql nhận theo ĐUÔI (trình duyệt hay để type rỗng).
  const ALLOWED_MIME = new Set([
    'image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf',
    'text/plain', 'text/csv', 'application/zip',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
    'application/sql', 'application/x-sqlite3', 'application/vnd.sqlite3',
  ]);
  const ALLOWED_EXT = /\.(png|jpe?g|webp|gif|pdf|txt|csv|docx?|xlsx?|pptx?|zip|db|sqlite|sqlite3|sql)$/i;
  const isAllowed = f => ALLOWED_MIME.has(f.type) || ALLOWED_EXT.test(f.name || '');
  // pendingFiles[i] ↔ previewUrls[i] (object URL cho ảnh, null cho file khác).
  let pendingFiles = [];
  let previewUrls = [];

  function fileIcon(name) {
    const n = String(name || '').toLowerCase();
    if (/\.pdf$/.test(n)) return '📄';
    if (/\.(docx?|odt)$/.test(n)) return '📝';
    if (/\.(xlsx?|csv)$/.test(n)) return '📊';
    if (/\.pptx?$/.test(n)) return '📑';
    if (/\.zip$/.test(n)) return '🗜️';
    if (/\.txt$/.test(n)) return '📃';
    if (/\.(db|sqlite3?|sql)$/.test(n)) return '🗄️';
    return '📎';
  }
  function clearAttachments() {
    previewUrls.forEach(u => { if (u) URL.revokeObjectURL(u); });
    pendingFiles.length = 0;
    previewUrls.length = 0;
    shotCheck.checked = false;
    renderAttachList();
  }
  function renderAttachList() {
    const items = [];
    if (shotCheck.checked) items.push({ kind: 'screenshot', name: 'Ảnh chụp màn hình hiện tại' });
    pendingFiles.forEach((f, i) => items.push({
      kind: 'file', name: f.name, size: f.size, idx: i,
      isImg: /^image\//.test(f.type), url: previewUrls[i],
    }));
    if (!items.length) { attachList.innerHTML = ''; return; }
    attachList.innerHTML = items.map(it => {
      const sz = it.size != null ? ` <span class="sgf-attach-size">(${(it.size / 1024).toFixed(0)} KB)</span>` : '';
      const rm = it.kind === 'file'
        ? `<button type="button" class="sgf-attach-rm" data-rm-file="${it.idx}" title="Bỏ file">✕</button>`
        : `<button type="button" class="sgf-attach-rm" data-rm-shot="1" title="Bỏ ảnh chụp">✕</button>`;
      const thumb = it.kind === 'screenshot'
        ? `<span class="sgf-attach-ic">📸</span>`
        : (it.isImg && it.url
            ? `<img class="sgf-attach-thumb" src="${it.url}" alt="" />`
            : `<span class="sgf-attach-ic">${fileIcon(it.name)}</span>`);
      return `<div class="sgf-attach-it">${thumb}<span class="sgf-attach-nm">${escapeHtml(it.name)}${sz}</span>${rm}</div>`;
    }).join('');
  }
  // Thêm danh sách file (từ input / kéo-thả / dán). Gom mọi lỗi vào 1 thông báo.
  function addFiles(list) {
    const errs = [];
    for (const f of [...(list || [])]) {
      if (pendingFiles.length >= MAX_FILES) { errs.push(`tối đa ${MAX_FILES} file`); break; }
      if (!isAllowed(f)) { errs.push(`"${f.name}" sai định dạng`); continue; }
      if (f.size > MAX_BYTES) { errs.push(`"${f.name}" > ${Math.round(MAX_BYTES / 1048576)}MB`); continue; }
      if (pendingFiles.some(p => p.name === f.name && p.size === f.size)) { errs.push(`"${f.name}" đã thêm`); continue; }
      const total = pendingFiles.reduce((s, p) => s + p.size, 0) + f.size;
      if (total > MAX_TOTAL) { errs.push(`vượt tổng ${Math.round(MAX_TOTAL / 1048576)}MB`); continue; }
      pendingFiles.push(f);
      previewUrls.push(/^image\//.test(f.type) ? URL.createObjectURL(f) : null);
    }
    msg.textContent = errs.length ? '⚠️ Bỏ qua: ' + errs.join('; ') : '';
    renderAttachList();
  }

  shotCheck.addEventListener('change', renderAttachList);
  fileInput.addEventListener('change', () => { addFiles(fileInput.files); fileInput.value = ''; });
  attachList.addEventListener('click', e => {
    const btn = e.target?.closest?.('[data-rm-file],[data-rm-shot]');
    if (!btn) return;
    if (btn.dataset.rmFile != null) {
      const i = Number(btn.dataset.rmFile);
      if (previewUrls[i]) URL.revokeObjectURL(previewUrls[i]);
      pendingFiles.splice(i, 1); previewUrls.splice(i, 1); renderAttachList();
    } else if (btn.dataset.rmShot) { shotCheck.checked = false; renderAttachList(); }
  });

  // ── Kéo-thả file vào khung đính kèm ──
  ['dragenter', 'dragover'].forEach(ev => attachBox.addEventListener(ev, e => {
    e.preventDefault(); e.stopPropagation(); attachBox.classList.add('sgf-drag');
  }));
  ['dragleave', 'drop'].forEach(ev => attachBox.addEventListener(ev, e => {
    e.preventDefault(); e.stopPropagation();
    if (ev === 'dragleave' && attachBox.contains(e.relatedTarget)) return;
    attachBox.classList.remove('sgf-drag');
  }));
  attachBox.addEventListener('drop', e => {
    const files = e.dataTransfer?.files;
    if (files && files.length) addFiles(files);
  });

  // ── Dán ảnh từ clipboard (Ctrl/Cmd+V) khi modal mở ──
  // Chỉ bắt item dạng ảnh; dán text vào ô tiêu đề/mô tả vẫn hoạt động bình thường.
  modal.addEventListener('paste', e => {
    if (modal.hidden) return;
    const imgs = [];
    for (const it of (e.clipboardData?.items || [])) {
      if (it.kind === 'file' && /^image\//.test(it.type)) {
        const f = it.getAsFile();
        if (f) {
          const ext = (f.type.split('/')[1] || 'png').replace('jpeg', 'jpg');
          imgs.push(new File([f], `paste-${imgs.length + 1}-${f.size}.${ext}`, { type: f.type }));
        }
      }
    }
    if (imgs.length) { e.preventDefault(); addFiles(imgs); }
  });

  // Chụp màn hình hiện tại (DOM hiện tại, KHÔNG bao gồm modal Đề nghị + FAB).
  // Dùng html2canvas dynamic import từ CDN — chỉ tải khi user thật sự tick.
  // Trả về Blob image/png. Modal được ẩn tạm trước khi snapshot rồi hiện lại.
  async function captureScreenshot() {
    if (!window.html2canvas) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        s.onload = resolve;
        s.onerror = () => reject(new Error('Không tải được html2canvas'));
        document.head.appendChild(s);
      });
    }
    const modal = root.querySelector('#sgf-modal');
    const fab = root.querySelector('#sgf-fab');
    const prevModal = modal.hidden, prevFabDisp = fab.style.display;
    modal.hidden = true; fab.style.display = 'none';
    try {
      const canvas = await window.html2canvas(document.body, {
        useCORS: true, allowTaint: true, scale: Math.min(window.devicePixelRatio || 1, 2),
        backgroundColor: getComputedStyle(document.body).backgroundColor || '#fff',
        logging: false, ignoreElements: el => el.id === 'sgf-root' || el.classList?.contains('tizia-view-banner'),
      });
      return await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.9));
    } finally {
      modal.hidden = prevModal; fab.style.display = prevFabDisp;
    }
  }

  // Upload 1 file/blob qua /api/requests/attachments. Trả về meta {url,name,mime,size,kind}.
  async function uploadOne(blob, name, kind) {
    const r = await fetch('api/requests/attachments', {
      method: 'POST',
      headers: {
        'Content-Type': blob.type || 'application/octet-stream',
        'X-Filename': encodeURIComponent(name || 'attachment'),
        'X-Kind': kind,
        'X-CSRF-Token': await csrfToken(),
      },
      body: blob,
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.message || e.error || 'upload_failed');
    }
    return await r.json();
  }

  // ── Onboarding (1 lần, admin miễn): 3 câu chip trước yêu cầu đầu tiên ──
  const onboard = root.querySelector('#sgf-onboard');
  let onboardChecked = false;

  async function ensureOnboarding() {
    if (onboardChecked) return;
    try {
      const r = await fetch('api/ai-board/profile', { credentials: 'same-origin' });
      if (!r.ok) return; // chưa đăng nhập: lời nhắc đăng nhập có sẵn khi gửi
      onboardChecked = true;
      if ((await r.json()).needed) await showOnboarding();
    } catch { /* mạng lỗi: server vẫn chặn gửi bằng 428 */ }
  }

  async function showOnboarding() {
    const { DOMAIN_META } = await import('./engine/domain.js');
    const answers = { role: null, domain_expertise: [], tech_level: null };
    const chips = (q, items) => `<div class="sgf-chips" role="group" aria-label="${escapeHtml(q.label)}">${items.map(([v, text]) =>
      `<button type="button" class="sgf-chip" data-q="${q.key}" data-v="${escapeHtml(v)}" aria-pressed="false">${escapeHtml(text)}</button>`).join('')}</div>`;
    onboard.innerHTML = `
      <div class="sgf-ob-intro">👋 Lần đầu gặp Ban điều hành? Trả lời nhanh 3 câu để Ban hỏi lại đúng cách bạn quen.</div>
      <div class="sgf-ob-q">1. Bạn là</div>
      ${chips({ key: 'role', label: 'Bạn là' }, [['pupil', '🧒 Học sinh'], ['student', '🎓 Sinh viên'], ['teacher', '👩‍🏫 Giáo viên'], ['parent', '👪 Phụ huynh'], ['other', '🙂 Khác']])}
      <div class="sgf-ob-q">2. Lĩnh vực bạn am hiểu <span class="sgf-ob-hint">(chọn nhiều)</span></div>
      ${chips({ key: 'domain_expertise', label: 'Lĩnh vực am hiểu' }, DOMAIN_META.map(d => [d.id, `${d.icon || ''} ${d.shortName || d.name}`]))}
      <div class="sgf-ob-q">3. Bạn từng viết code / làm phần mềm chưa?</div>
      ${chips({ key: 'tech_level', label: 'Mức kỹ thuật' }, [['none', 'Chưa bao giờ'], ['some', 'Biết chút ít'], ['fluent', 'Thành thạo']])}
      <div class="sgf-ob-status" id="sgf-ob-status"></div>`;
    form.hidden = true;
    onboard.hidden = false;
    const status = onboard.querySelector('#sgf-ob-status');
    let timer = null;
    onboard.onclick = (e) => { // onclick, not addEventListener: a second showOnboarding replaces it
      const chip = e.target.closest('[data-q]');
      if (!chip) return;
      const { q, v } = chip.dataset;
      if (q === 'domain_expertise') {
        const on = !answers.domain_expertise.includes(v);
        answers.domain_expertise = on ? [...answers.domain_expertise, v] : answers.domain_expertise.filter(x => x !== v);
        chip.setAttribute('aria-pressed', String(on));
      } else {
        answers[q] = v;
        onboard.querySelectorAll(`[data-q="${q}"]`).forEach(b => b.setAttribute('aria-pressed', String(b === chip)));
      }
      clearTimeout(timer);
      const done = answers.role && answers.tech_level && answers.domain_expertise.length;
      status.textContent = done ? 'Đang lưu…' : '';
      // Đủ 3 câu thì tự lưu sau 1 nhịp (vẫn kịp chọn thêm lĩnh vực) — không cần nút bấm thêm.
      if (done) timer = setTimeout(() => saveOnboarding(answers, status), 1200);
    };
  }

  async function saveOnboarding(answers, status) {
    try {
      const { token } = await (await fetch('api/csrf', { credentials: 'same-origin' })).json();
      const r = await fetch('api/ai-board/profile', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
        body: JSON.stringify(answers),
      });
      if (!r.ok) throw new Error();
      onboard.hidden = true;
      form.hidden = false;
      msg.textContent = '✓ Cảm ơn! Giờ bạn có thể gửi đề nghị.';
      root.querySelector('#sgf-title-in')?.focus();
    } catch {
      status.textContent = '⚠️ Chưa lưu được — bấm lại một lựa chọn để thử lại.';
    }
  }

  // ── Làm rõ yêu cầu mơ hồ (ticket 06): Ban hỏi tối đa 5 câu, chữ hiện dần theo stream ──
  const clarifyBox = root.querySelector('#sgf-clarify');
  const clarLog = root.querySelector('#sgf-clar-log');
  const clarReply = root.querySelector('#sgf-clar-reply');
  const clarIn = root.querySelector('#sgf-clar-in');
  const clarSend = root.querySelector('#sgf-clar-send');
  const clarCount = root.querySelector('#sgf-clar-count');
  const clarSum = root.querySelector('#sgf-clar-sum');
  const clarSpec = root.querySelector('#sgf-clar-spec');
  const clarMsg = root.querySelector('#sgf-clar-msg');
  const pendingBox = root.querySelector('#sgf-pending');
  let clarifyId = null;
  let lastSummary = null;
  const paneNew = root.querySelector('#sgf-pane-new');
  const paneMine = root.querySelector('#sgf-pane-mine');
  const clarSlot = root.querySelector('#sgf-clar-slot');
  const tabBadge = root.querySelector('#sgf-tab-badge');

  function showTab(name) {
    root.querySelectorAll('[data-tab]').forEach(t => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
    paneNew.hidden = name !== 'new';
    paneMine.hidden = name !== 'mine';
  }
  root.querySelector('.sgf-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (tab) showTab(tab.dataset.tab);
  });

  // Phần trao đổi là phần mở rộng của đúng yêu cầu đó trong "Của bạn"; chưa có item thì đứng đầu danh sách.
  function mountClarify() {
    const host = clarifyId && inbox.querySelector(`[data-item="${clarifyId}"]`);
    (host || clarSlot).appendChild(clarifyBox);
  }
  function toggleClarify(id) {
    if (clarifyId === Number(id)) { clarifyBox.hidden = !clarifyBox.hidden; return; } // thu gọn, giữ nguyên hội thoại
    startClarify(id);
  }

  async function csrfToken() {
    const r = await fetch('api/csrf', { credentials: 'same-origin' });
    const { token } = await r.json();
    if (!token) throw new Error('csrf');
    return token;
  }

  function bubble(kind, text = '') {
    const el = document.createElement('div');
    el.className = `sgf-clar-msg sgf-clar-${kind}`;
    el.textContent = text;
    clarLog.appendChild(el);
    clarLog.scrollTop = clarLog.scrollHeight;
    return el;
  }

  function showStep(done) {
    clarReply.hidden = done.kind !== 'question';
    clarSum.hidden = done.kind !== 'summary';
    if (done.kind === 'question') {
      clarCount.textContent = `Câu ${done.asked}/${done.max}`;
      setTimeout(() => clarIn.focus(), 30);
    } else {
      lastSummary = done;
      clarSpec.value = done.text;
      clarSpec.readOnly = true;
      // Nút "Đúng, gửi" nằm cuối panel: cuộn tới để người dùng thấy ngay trên màn hình thấp.
      setTimeout(() => clarSum.scrollIntoView({ block: 'end', behavior: 'smooth' }), 30);
    }
  }

  async function startClarify(id, title) {
    clarifyId = Number(id);
    showTab('mine');
    pendingBox.hidden = true;
    clarifyBox.hidden = false;
    mountClarify();
    clarLog.innerHTML = '';
    clarMsg.textContent = '';
    root.querySelector('#sgf-clar-title').textContent = title ? `«${title}»` : '';
    try {
      const r = await fetch(`api/ai-board/requests/${clarifyId}/clarify`, { credentials: 'same-origin' });
      if (!r.ok) throw new Error();
      const data = await r.json();
      root.querySelector('#sgf-clar-title').textContent = `«${data.request.title}»`;
      for (const turn of data.turns) bubble(turn.kind === 'answer' ? 'me' : 'ai', turn.text);
      const last = data.turns.at(-1);
      if (!last || last.kind === 'answer') return runTurn();
      showStep({ kind: last.kind, text: last.text, asked: data.asked, max: data.max,
        complete: data.asked < data.max });
    } catch {
      clarMsg.textContent = '⚠️ Không mở được phần trao đổi — thử lại sau.';
    }
  }

  async function runTurn(answer) {
    clarReply.hidden = true;
    clarSum.hidden = true;
    clarMsg.textContent = '';
    if (answer !== undefined) bubble('me', answer);
    const out = bubble('ai');
    out.classList.add('sgf-typing');
    try {
      const r = await fetch(`api/ai-board/requests/${clarifyId}/clarify`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await csrfToken() },
        body: JSON.stringify(answer === undefined ? {} : { answer }),
      });
      if (!(r.headers.get('content-type') || '').includes('ndjson')) {
        const e = await r.json().catch(() => ({}));
        out.remove();
        clarMsg.textContent = '⚠️ ' + (e.message || 'Chưa gửi được — thử lại sau.');
        clarReply.hidden = false;
        if (answer !== undefined) { clarLog.lastChild?.remove(); clarIn.value = answer; }
        return;
      }
      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let done = null;
      for (;;) {
        const { value, done: end } = await reader.read();
        if (end) break;
        buffer += decoder.decode(value, { stream: true });
        let nl;
        while ((nl = buffer.indexOf('\n')) >= 0) {
          const event = JSON.parse(buffer.slice(0, nl));
          buffer = buffer.slice(nl + 1);
          if (event.t === 'delta') {
            out.classList.remove('sgf-typing');
            out.textContent += event.text;
            clarLog.scrollTop = clarLog.scrollHeight;
          } else if (event.t === 'done') done = event;
        }
      }
      out.classList.remove('sgf-typing');
      if (!done) throw new Error('stream');
      out.textContent = done.text; // bản đã qua guard của server là bản chuẩn
      showStep(done);
    } catch {
      out.remove();
      clarMsg.textContent = '⚠️ Lỗi mạng — thử lại sau.';
      clarReply.hidden = false;
    }
  }

  clarSend.addEventListener('click', () => {
    const answer = clarIn.value.trim();
    if (!answer) return;
    clarIn.value = '';
    runTurn(answer);
  });
  clarIn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); clarSend.click(); }
  });
  root.querySelector('#sgf-clar-edit').addEventListener('click', () => {
    clarSpec.readOnly = false;
    clarSpec.focus();
  });
  root.querySelector('#sgf-clar-ok').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    try {
      const r = await fetch(`api/ai-board/requests/${clarifyId}/clarify/confirm`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await csrfToken() },
        body: JSON.stringify({ spec: clarSpec.value, complete: lastSummary?.complete !== false }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.message || 'Chưa gửi được — thử lại sau.');
      clarifyBox.hidden = true;
      clarifyId = null;
      refreshPending();
      loadInbox();
    } catch (err) {
      clarMsg.textContent = '⚠️ ' + err.message;
    } finally {
      btn.disabled = false;
    }
  });

  // Yêu cầu còn chờ người gửi trả lời: FAB nhấp nháy + banner đầu panel.
  async function refreshPending() {
    try {
      const r = await fetch('api/ai-board/clarifications', { credentials: 'same-origin' });
      if (!r.ok) return;
      const { items } = await r.json();
      fab.classList.toggle('sgf-fab-ask', items.length > 0);
      tabBadge.hidden = !items.length;
      tabBadge.textContent = items.length;
      fab.title = items.length ? 'Ban điều hành đang chờ bạn trả lời' : 'Gửi đề nghị cho Ban điều hành AI';
      const first = items[0];
      pendingBox.hidden = !first || clarifyId !== null;
      if (first) {
        pendingBox.innerHTML = `🏛️ <span>Ban điều hành đang chờ bạn trả lời về <b>«${escapeHtml(first.title)}»</b></span>
          <button type="button" class="sgf-send" data-clarify="${first.id}">Trả lời ngay</button>`;
      }
    } catch { /* offline: không có nhắc */ }
  }
  pendingBox.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-clarify]');
    if (btn) toggleClarify(btn.dataset.clarify);
  });
  // Khách chưa đăng nhập không có yêu cầu nào để trả lời: khỏi gọi API mỗi lần xem trang.
  if (typeof getPlayerName === 'function' && getPlayerName()) refreshPending();

  const open = () => {
    modal.hidden = false;
    // Đang có câu Ban chờ trả lời → mở "Của bạn"; không thì mở form gửi mới.
    showTab(fab.classList.contains('sgf-fab-ask') ? 'mine' : 'new');
    if (!paneNew.hidden) setTimeout(() => root.querySelector('#sgf-title-in')?.focus(), 50);
    ensureOnboarding();
    refreshPending();
    loadInbox();
  };
  // Chuông thông báo trỏ tới #sgf-clarify-<id>: mở thẳng phần trao đổi của yêu cầu đó.
  // #sgf-thread-<id> (chuông bản nháp): mở panel, loadInbox tự bung thread đó.
  let openThreadId = null;
  const hashed = /^#sgf-(clarify|thread)-(\d+)$/.exec(location.hash);
  if (hashed) {
    if (hashed[1] === 'thread') openThreadId = hashed[2];
    open();
    showTab('mine');
    if (hashed[1] === 'clarify') startClarify(hashed[2]);
    history.replaceState(null, '', location.pathname + location.search);
  }
  const close = () => { modal.hidden = true; msg.textContent = ''; };

  fab.addEventListener('click', open);
  modal.addEventListener('click', e => {
    if (e.target?.dataset?.close !== undefined) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
  root.querySelector('#sgf-reload').addEventListener('click', loadInbox);

  let pendingRequestKey = null;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const type = root.querySelector('#sgf-type').value;
    const title = root.querySelector('#sgf-title-in').value.trim();
    const userDetail = root.querySelector('#sgf-detail').value.trim();
    if (title.length < 4) { msg.textContent = '⚠️ Tiêu đề quá ngắn (≥ 4 ký tự)'; return; }

    const detail = [
      `[Trang: ${ctx.title || '—'}] ${ctx.url}`,
      userDetail,
    ].filter(Boolean).join('\n');

    sendBtn.disabled = true;
    msg.textContent = 'Đang gửi…';
    try {
      // Upload attachments TRƯỚC khi POST request (để nhồi URL vào payload).
      const attachments = [];
      if (shotCheck.checked) {
        msg.textContent = 'Đang chụp màn hình…';
        try {
          const blob = await captureScreenshot();
          if (blob) {
            msg.textContent = 'Đang tải ảnh chụp…';
            const meta = await uploadOne(blob, 'screenshot.png', 'screenshot');
            attachments.push(meta);
          }
        } catch (e) {
          msg.textContent = '⚠️ Không chụp được màn hình: ' + (e.message || e);
          sendBtn.disabled = false;
          return;
        }
      }
      for (let i = 0; i < pendingFiles.length; i++) {
        const f = pendingFiles[i];
        msg.textContent = `Đang tải file ${i + 1}/${pendingFiles.length}: ${f.name}…`;
        try {
          const meta = await uploadOne(f, f.name, 'file');
          attachments.push(meta);
        } catch (e) {
          msg.textContent = `⚠️ Không tải được "${f.name}": ${e.message || e}`;
          sendBtn.disabled = false;
          return;
        }
      }

      msg.textContent = 'Đang gửi…';
      pendingRequestKey ||= crypto.randomUUID();
      const r = await fetch('api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': pendingRequestKey,
          'X-CSRF-Token': await csrfToken(),
          'X-AI-Board-Features': 'onboarding,clarify' }, // panel này có UI cho cả hai
        body: JSON.stringify({
          domain: inferDomain(), type, title, detail, attachments,
          folder_id: type !== 'feature' && folderSel.value ? Number(folderSel.value) : undefined,
          student: (typeof getPlayerName === 'function' && getPlayerName()) || 'Ẩn danh',
        }),
      });
      if (!r.ok) {
        const e2 = await r.json().catch(() => ({}));
        if (e2.viewOnly || e2.error === 'view_only') {
          msg.innerHTML = `⚠️ Bạn đang ở trường khác. <a href="/school.html?domain=${encodeURIComponent(e2.your_school || '')}" style="color:#fbbf24;text-decoration:underline">Về trường của bạn</a> để gửi đề nghị.`;
        } else if (e2.error === 'profile_required') {
          msg.textContent = '';
          onboardChecked = true;
          await showOnboarding();
        } else if (e2.needLogin) {
          msg.textContent = '⚠️ Hãy đăng nhập để gửi đề nghị.';
        } else if (e2.needEnroll) {
          msg.textContent = '⚠️ Hãy chọn trường để bắt đầu gửi đề nghị.';
        } else {
          msg.textContent = '⚠️ ' + (e2.message || e2.error || 'Không gửi được');
        }
        return;
      }
      const created = await r.json().catch(() => ({}));
      msg.textContent = '✓ Đã gửi! Theo dõi ở mục «Của bạn».';
      pendingRequestKey = null;
      if (created.clarify?.needed) {
        msg.textContent = '';
        startClarify(created.request_id, title);
        fab.classList.add('sgf-fab-ask');
      }
      root.querySelector('#sgf-title-in').value = '';
      root.querySelector('#sgf-detail').value = '';
      folderHint.hidden = true;
      if (detailCount) detailCount.textContent = '0 / 10.000';
      // Reset đính kèm để lần gửi sau bắt đầu sạch (revoke object URL tránh rò rỉ).
      clearAttachments();
      loadInbox();
      // AI quyết định nền sau ~1-3s → reload để hiện phản hồi
      setTimeout(loadInbox, 2500);
      setTimeout(loadInbox, 6000);
    } catch {
      msg.textContent = '⚠️ Lỗi mạng — thử lại sau.';
    } finally {
      sendBtn.disabled = false;
    }
  });

  // ── Folder chức năng (feature-folders ticket 04) ──
  const folderBox = root.querySelector('#sgf-folders');
  const folderRow = root.querySelector('#sgf-folder-row');
  const folderSel = root.querySelector('#sgf-folder');
  const folderHint = root.querySelector('#sgf-folder-hint');
  const typeSel = root.querySelector('#sgf-type');
  let myFolders = [];
  const FOLDER_STATE = { draft: 'chờ Ban duyệt', active: 'đang làm', awaiting_merge: 'chờ phát hành', released: 'đã phát hành',
    archived: 'đã lưu trữ' };

  function syncFolderRow() {
    folderRow.hidden = !myFolders.length || typeSel.value === 'feature';
    if (folderRow.hidden) folderSel.value = '';
  }
  typeSel.addEventListener('change', syncFolderRow);

  async function loadFolders() {
    try {
      const r = await fetch(`api/ai-board/folders?domain=${encodeURIComponent(inferDomain())}`, { credentials: 'same-origin' });
      if (!r.ok) { folderBox.hidden = true; return; }
      const { mine = [], school = [] } = await r.json();
      myFolders = mine.filter(f => f.state !== 'archived'); // lưu trữ rồi thì không gắn yêu cầu mới
      const keep = folderSel.value;
      folderSel.innerHTML = '<option value="">— Yêu cầu lẻ —</option>'
        + myFolders.map(f => `<option value="${f.id}">✨ ${escapeHtml(f.title)}</option>`).join('');
      folderSel.value = mine.some(f => String(f.id) === keep) ? keep : '';
      syncFolderRow();
      folderBox.hidden = !mine.length && !school.length;
      folderBox.innerHTML = `
        ${mine.length ? `<div class="sgf-inbox-head"><span>Chức năng của bạn</span></div>
          ${mine.map(f => `<div class="sgf-folder">
            <span class="sgf-folder-t">✨ ${escapeHtml(f.title)}</span>
            <span class="sgf-folder-m">${escapeHtml(FOLDER_STATE[f.state] || f.state)} · ${Number(f.requests)} yêu cầu</span>
            ${f.state === 'archived'
              ? `<button type="button" class="sgf-chip" data-folder-reopen="${f.id}">↺ Mở lại</button>`
              : `<button type="button" class="sgf-chip" data-folder-add="${f.id}">＋ Yêu cầu tiếp</button>
                 <button type="button" class="sgf-chip" data-folder-archive="${f.id}" title="Cất folder này để mở chỗ cho chức năng khác">Lưu trữ</button>`}
            ${f.has_change && f.state === 'active' ? `<button type="button" class="sgf-chip" data-folder-done="${f.id}" title="Bản nháp đã ổn: gửi Ban điều hành duyệt để phát hành">✓ Xong</button>` : ''}</div>`).join('')}` : ''}
        ${school.length ? `<div class="sgf-inbox-head"><span>Chức năng bạn khác đang làm</span></div>
          ${school.slice(0, 5).map(f => `<div class="sgf-folder">
            <span class="sgf-folder-t">✨ ${escapeHtml(f.title)}</span>
            <span class="sgf-folder-m">${escapeHtml(FOLDER_STATE[f.state] || f.state)}</span>
            <button type="button" class="sgf-chip" data-folder-vote="${f.id}" ${f.voted ? 'disabled' : ''}>👍 ${Number(f.votes)}</button></div>`).join('')}` : ''}`;
    } catch { folderBox.hidden = true; }
  }

  folderBox.addEventListener('click', async (e) => {
    const add = e.target.closest('[data-folder-add]');
    if (add) {
      if (typeSel.value === 'feature') typeSel.value = 'other';
      showTab('new');
      syncFolderRow();
      folderSel.value = add.dataset.folderAdd;
      root.querySelector('#sgf-title-in').focus();
      return;
    }
    const life = e.target.closest('[data-folder-archive], [data-folder-reopen]');
    if (life) {
      life.disabled = true;
      const [act, id] = life.dataset.folderArchive ? ['archive', life.dataset.folderArchive] : ['reopen', life.dataset.folderReopen];
      const r = await fetch(`api/ai-board/folders/${encodeURIComponent(id)}/${act}`, {
        method: 'POST', credentials: 'same-origin', headers: { 'X-CSRF-Token': await csrfToken() } }).catch(() => null);
      if (r?.ok) loadFolders();
      else {
        life.disabled = false;
        const e2 = r ? await r.json().catch(() => ({})) : {};
        life.textContent = e2.error === 'folder_limit' ? 'Đã đủ 3 chức năng đang mở' : 'Thử lại';
      }
      return;
    }
    const done = e.target.closest('[data-folder-done]');
    if (done) {
      done.disabled = true;
      const r = await fetch(`api/ai-board/folders/${encodeURIComponent(done.dataset.folderDone)}/done`, {
        method: 'POST', credentials: 'same-origin', headers: { 'X-CSRF-Token': await csrfToken() } }).catch(() => null);
      if (r?.ok) loadFolders(); else done.disabled = false;
      return;
    }
    const vote = e.target.closest('[data-folder-vote]');
    if (vote) {
      vote.disabled = true;
      const r = await fetch(`api/ai-board/folders/${encodeURIComponent(vote.dataset.folderVote)}/vote`, {
        method: 'POST', credentials: 'same-origin', headers: { 'X-CSRF-Token': await csrfToken() } }).catch(() => null);
      if (r?.ok) vote.textContent = `👍 ${(await r.json()).votes}`; else vote.disabled = false;
    }
  });

  // Gợi ý tất định: tiêu đề chung ≥ 2 từ có nghĩa với 1 folder của mình → hỏi có gắn vào không.
  const foldWords = (s) => new Set(String(s).normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/gi, 'd').toLowerCase()
    .split(/[^a-z0-9]+/).filter(w => w.length >= 3 && !['cho', 'cua', 'trang', 'them', 'nhung', 'duoc'].includes(w)));
  root.querySelector('#sgf-title-in').addEventListener('input', (e) => {
    const words = foldWords(e.target.value);
    const match = typeSel.value === 'feature' || folderSel.value ? null
      : myFolders.find(f => [...foldWords(f.title)].filter(w => words.has(w)).length >= 2);
    folderHint.hidden = !match;
    if (match) {
      folderHint.innerHTML = `Có vẻ thuộc chức năng «${escapeHtml(match.title)}». <button type="button" class="sgf-chip" data-hint-folder="${match.id}">Gắn vào</button>`;
    }
  });
  folderHint.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-hint-folder]');
    if (!btn) return;
    folderSel.value = btn.dataset.hintFolder;
    folderHint.hidden = true;
  });

  async function loadInbox() {
    loadFolders();
    clarSlot.appendChild(clarifyBox); // khỏi bị xoá theo innerHTML của danh sách
    inbox.textContent = 'Đang tải…';
    try {
      const dom = inferDomain();
      const r = await fetch(`api/requests?domain=${encodeURIComponent(dom)}&limit=50`);
      const data = await r.json();
      const me = (typeof getPlayerName === 'function' && getPlayerName()) || '';
      let items = (data.items || []);
      // Ưu tiên hiển thị của user; nếu chưa có gì thì hiện cái có phản hồi AI gần đây
      const mine = me ? items.filter(it => it.student === me) : [];
      const withReply = items.filter(it => it.admin_note && it.student !== me).slice(0, 3);
      const shown = (mine.length ? mine : withReply).slice(0, 8);
      if (!shown.length) {
        inbox.innerHTML = '<div class="sgf-empty">Chưa có yêu cầu nào. Hãy là người đầu tiên đề xuất cải tiến trang này! 🚀</div>';
        return;
      }
      inbox.innerHTML = shown.map(it => renderItem(it, me)).join('');
      mountClarify();
      // Hủy 2 bước: bấm lần 1 để xác nhận, lần 2 mới gửi (viewer không có confirm()).
      inbox.querySelectorAll('[data-req-cancel]').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!btn.dataset.armed) {
            btn.dataset.armed = '1';
            btn.textContent = 'Bấm lần nữa để hủy';
            return;
          }
          btn.disabled = true;
          btn.textContent = 'Đang hủy…';
          try {
            const csrfResponse = await fetch('api/csrf', { credentials: 'same-origin' });
            if (!csrfResponse.ok) throw new Error('Không hủy được, thử lại sau.');
            const { token } = await csrfResponse.json();
            if (!token) throw new Error('Không hủy được, thử lại sau.');
            const r = await fetch(`api/requests/${encodeURIComponent(btn.dataset.reqCancel)}/cancel`, {
              method: 'POST',
              headers: { 'X-CSRF-Token': token },
              credentials: 'same-origin',
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) throw new Error(data.error === 'request_closed' ? 'Yêu cầu đã đóng, không hủy được.' : 'Không hủy được, thử lại sau.');
            loadInbox();
          } catch (err) {
            btn.disabled = false;
            delete btn.dataset.armed;
            btn.textContent = err.message;
          }
        });
      });
      inbox.querySelectorAll('[data-clarify]').forEach(btn => {
        btn.addEventListener('click', () => toggleClarify(btn.dataset.clarify));
      });
      // "Thử cách khác": lượt hỏng → Ban lập kế hoạch mới (server chỉ nhận root hỏng của chính mình).
      inbox.querySelectorAll('[data-req-retry]').forEach(btn => {
        btn.addEventListener('click', async () => {
          btn.disabled = true;
          btn.textContent = 'Đang gửi…';
          const r = await fetch(`api/requests/${encodeURIComponent(btn.dataset.reqRetry)}/retry`, {
            method: 'POST', credentials: 'same-origin', headers: { 'X-CSRF-Token': await csrfToken().catch(() => '') },
          }).catch(() => null);
          if (r?.ok) { loadInbox(); return; }
          const e2 = await r?.json().catch(() => ({})) || {};
          btn.textContent = e2.message && e2.error === 'too_many_pending' ? e2.message : 'Chưa thử lại được, thử sau nhé.';
        });
      });
      // Chuông "xem ảnh" trỏ #sgf-thread-<id>: mở sẵn thread của yêu cầu đó.
      if (openThreadId) {
        inbox.querySelector(`[data-req-toggle="${openThreadId}"]`)?.click();
        openThreadId = null;
      }
      // Mỗi item mở rộng thành phiên trao đổi (thread) ngay trong modal.
      inbox.querySelectorAll('[data-req-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.reqToggle;
          const panel = inbox.querySelector(`#sgf-thread-${id}`);
          if (!panel) return;
          if (panel.hidden) {
            panel.hidden = false;
            renderRequestThread({ host: panel, requestId: id, me, onChange: loadInbox });
          } else { panel.hidden = true; panel.innerHTML = ''; }
        });
      });
    } catch {
      inbox.innerHTML = '<div class="sgf-empty">Không tải được — cần backend chạy.</div>';
    }
  }
}

// Vị trí trong hàng đợi công bằng (server tính theo đúng thứ tự worker nhận việc).
function queueLine(q) {
  if (!q) return '';
  if (q.deferred) return '<div class="sgf-it-queue">⏳ Hôm nay Ban đã làm nhiều việc cho bạn rồi — yêu cầu này sẽ được làm tiếp vào ngày mai.</div>';
  const min = Math.max(1, Math.round((q.eta_s || 0) / 60));
  return `<div class="sgf-it-queue">⏳ Đang xếp hàng: thứ ${Number(q.position)} · khoảng ${min} phút nữa tới lượt</div>`;
}

function renderItem(it, me = '') {
  const sm = STATUS[it.status] || STATUS.pending;
  const t = (TYPES.find(t => t.v === it.type) || TYPES[4]);
  const mine = me && it.student === me;
  const atts = Array.isArray(it.attachments) ? it.attachments : [];
  const attHtml = atts.length ? `
    <div class="sgf-it-att">
      ${atts.map(a => {
        const isImg = /^image\//.test(a.mime || '');
        const ic = a.kind === 'screenshot' ? '📸' : (isImg ? '🖼️' : '📎');
        if (isImg) {
          return `<a class="sgf-it-thumb" href="${escapeHtml(a.url)}" target="_blank" rel="noopener" title="${escapeHtml(a.name)}">
                    <img loading="lazy" src="${escapeHtml(a.url)}" alt="${escapeHtml(a.name)}" />
                  </a>`;
        }
        return `<a class="sgf-it-file" href="${escapeHtml(a.url)}" target="_blank" rel="noopener" download="${escapeHtml(a.name)}">${ic} ${escapeHtml(a.name)}</a>`;
      }).join('')}
    </div>` : '';
  return `
    <div class="sgf-it" data-item="${it.id}">
      <div class="sgf-it-line">
        <span class="sgf-it-ico">${t.icon}</span>
        <span class="sgf-it-title">${escapeHtml(it.title)}</span>
        <span class="sgf-it-st ${sm.cls}">${it.phase === 'clarifying' ? 'Chờ bạn trả lời' : sm.label}</span>
      </div>
      ${queueLine(it.queue)}
      ${attHtml}
      ${it.admin_note ? `<div class="sgf-it-note">🏛️ ${escapeHtml(it.admin_note)}</div>` : ''}
      ${mine && it.phase === 'clarifying'
        // Ban đang chờ trả lời: cùng nút trao đổi, nhấp nháy, mở thẳng phần làm rõ.
        ? `<button type="button" class="sgf-it-thread-btn sgf-it-ask" data-clarify="${it.id}">💬 Trả lời Ban điều hành</button>`
        : `<button type="button" class="sgf-it-thread-btn" data-req-toggle="${it.id}">
        💬 ${mine ? 'Trao đổi với Ban điều hành' : 'Xem trao đổi'}
      </button>`}
      ${mine && it.retry === 'retry'
        ? `<button type="button" class="sgf-it-thread-btn" data-req-retry="${it.id}" title="Ban lập kế hoạch mới cho yêu cầu này">🔄 Thử cách khác</button>` : ''}
      ${mine && it.retry === 'admin' ? '<div class="sgf-it-queue">🏛️ Đã chuyển quản trị viên</div>' : ''}
      ${mine && ['pending', 'reviewing'].includes(it.status)
        ? `<button type="button" class="sgf-it-cancel" data-req-cancel="${it.id}">Hủy yêu cầu</button>` : ''}
      <div class="sgf-it-thread" id="sgf-thread-${it.id}" hidden></div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const css = `
    #sgf-fab {
      position: fixed; left: 18px; bottom: 18px; z-index: 2147483000;
      width: 60px; height: 60px; border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0; border: 0; cursor: pointer;
      background: linear-gradient(135deg,#7c3aed,#4f46e5); color: #fff;
      font: 600 14px/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
      box-shadow: 0 8px 24px rgba(79,70,229,.45), 0 2px 6px rgba(0,0,0,.18);
      transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
    }
    #sgf-fab:hover { transform: scale(1.08); filter: brightness(1.05); box-shadow: 0 14px 30px rgba(79,70,229,.55); }
    #sgf-fab:active { transform: scale(1); }
    .sgf-fab-ico { font-size: 28px; line-height: 1; }
    .sgf-fab-lbl { display: none; }
    @media (max-width: 540px) {
      #sgf-fab { left: 12px; bottom: 12px; width: 54px; height: 54px; }
      .sgf-fab-ico { font-size: 24px; }
    }

    .sgf-modal { position: fixed; inset: 0; z-index: 2147483001; display: grid; place-items: center; }
    .sgf-modal[hidden] { display: none !important; }
    .sgf-backdrop { position: absolute; inset: 0; background: rgba(15,23,42,.55); backdrop-filter: blur(3px); }
    .sgf-dialog {
      position: relative; width: min(560px, calc(100vw - 24px)); max-height: calc(100vh - 36px);
      overflow: auto; background: #fff; color: #1f2937; border-radius: 16px;
      box-shadow: 0 30px 80px rgba(15,23,42,.45);
      font: 14px/1.5 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
    }
    .sgf-head { display: flex; gap: 12px; align-items: flex-start; padding: 18px 20px 8px; }
    .sgf-head-ico { font-size: 30px; line-height: 1; }
    .sgf-head-text { flex: 1; }
    .sgf-head-text h3 { margin: 0 0 4px; font-size: 17px; color: #1f1147; }
    .sgf-head-text p { margin: 0; font-size: 12.5px; color: #4b5563; }
    .sgf-x {
      border: 0; background: rgba(0,0,0,.05); color: #475569; width: 30px; height: 30px;
      border-radius: 8px; cursor: pointer; font-size: 14px;
    }
    .sgf-x:hover { background: rgba(0,0,0,.1); }

    .sgf-tabs { display: flex; gap: 4px; padding: 0 20px; border-bottom: 1px solid #e5e7eb; }
    .sgf-tab { flex: 1; padding: 9px 6px; border: 0; border-bottom: 2px solid transparent; background: none;
      font: inherit; font-size: 13px; color: #64748b; cursor: pointer; }
    .sgf-tab[aria-selected="true"] { border-bottom-color: #6366f1; color: #4338ca; font-weight: 700; }
    .sgf-tab-badge { display: inline-block; min-width: 18px; padding: 0 5px; border-radius: 9px; background: #f59e0b;
      color: #fff; font-size: 11px; font-weight: 700; line-height: 18px; }
    .sgf-pane { padding-top: 8px; }
    .sgf-pane[hidden], .sgf-tab-badge[hidden] { display: none; }
    .sgf-it .sgf-clarify { padding: 8px 0 0; margin-top: 8px; border-top: 1px dashed #c7d2fe; }
    .sgf-it .sgf-clar-live { display: none; } /* nằm trong đúng yêu cầu rồi: khỏi nhắc lại tiêu đề */
    #sgf-clar-slot > .sgf-clarify { padding: 0 20px 12px; }
    .sgf-form { display: flex; flex-direction: column; gap: 10px; padding: 8px 20px 14px; }
    .sgf-form[hidden], .sgf-onboard[hidden] { display: none; }
    .sgf-onboard { display: flex; flex-direction: column; gap: 8px; padding: 8px 20px 16px; }
    .sgf-ob-intro { padding: 10px 12px; border-radius: 10px; background: #eef2ff; color: #3730a3; font-size: 13px; }
    .sgf-ob-q { font-weight: 700; font-size: 13px; color: #1f1147; margin-top: 4px; }
    .sgf-ob-hint { font-weight: 400; color: #64748b; font-size: 12px; }
    .sgf-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .sgf-chip {
      border: 1px solid #c7d2fe; background: #fff; color: #3730a3; border-radius: 999px;
      padding: 6px 12px; font: 600 12.5px/1.2 inherit; cursor: pointer; min-height: 32px;
      transition: background .15s ease, transform .1s ease;
    }
    .sgf-chip:hover { background: #eef2ff; }
    .sgf-chip:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
    .sgf-chip[aria-pressed="true"] { background: linear-gradient(135deg,#7c3aed,#4f46e5); color: #fff; border-color: transparent; }
    .sgf-ob-status { min-height: 18px; font-size: 12.5px; color: #4338ca; }
    .sgf-clarify[hidden], .sgf-clar-banner[hidden], .sgf-clar-reply[hidden], .sgf-clar-sum[hidden] { display: none; }
    .sgf-clarify { display: flex; flex-direction: column; gap: 10px; padding: 8px 20px 16px; }
    .sgf-clar-banner {
      display: flex; align-items: center; gap: 10px; margin: 0 20px 8px; padding: 10px 12px; border-radius: 12px;
      background: linear-gradient(135deg,#fef3c7,#fde68a); color: #78350f; font-size: 13px;
      border: 1px solid #f59e0b; animation: sgf-slide-in .45s ease-out both, sgf-glow 2.4s ease-in-out 0.45s 3;
    }
    .sgf-clarify .sgf-clar-banner { margin: 0; }
    .sgf-clar-banner span { flex: 1; }
    .sgf-clar-banner .sgf-send { white-space: nowrap; }
    .sgf-clar-log { display: flex; flex-direction: column; gap: 8px; max-height: 42vh; overflow-y: auto; }
    /* Bản tóm tắt đã nằm trong ô bên dưới: thu nhỏ khung chat để nút xác nhận vừa màn hình. */
    .sgf-clarify:has(.sgf-clar-sum:not([hidden])) .sgf-clar-log { max-height: 20vh; }
    .sgf-clar-msg { max-width: 88%; padding: 8px 12px; border-radius: 14px; white-space: pre-wrap; font-size: 13.5px;
      animation: sgf-pop .25s ease-out both; }
    .sgf-clar-ai { align-self: flex-start; background: #eef2ff; color: #1e1b4b; border-bottom-left-radius: 4px; }
    .sgf-clar-me { align-self: flex-end; background: linear-gradient(135deg,#7c3aed,#4f46e5); color: #fff; border-bottom-right-radius: 4px; }
    .sgf-typing::after { content: '● ● ●'; letter-spacing: 2px; opacity: .6; animation: sgf-blink 1s steps(3, end) infinite; }
    .sgf-clar-reply, .sgf-clar-sum { display: flex; flex-direction: column; gap: 6px; }
    .sgf-it-thread-btn.sgf-it-ask {
      background: linear-gradient(135deg,#fbbf24,#f97316); color: #451a03; border-color: #f59e0b; font-weight: 700;
      animation: sgf-ring 1.6s ease-out infinite;
    }
    .sgf-it-thread-btn.sgf-it-ask:hover { filter: brightness(1.05); }
    #sgf-fab.sgf-fab-ask { animation: sgf-ring 1.6s ease-out infinite; }
    #sgf-fab.sgf-fab-ask::after {
      content: '!'; position: absolute; top: -2px; right: -2px; width: 20px; height: 20px; border-radius: 50%;
      background: #f59e0b; color: #fff; font: 800 13px/20px system-ui, sans-serif; text-align: center;
    }
    @keyframes sgf-ring { 0% { box-shadow: 0 0 0 0 rgba(245,158,11,.7), 0 8px 24px rgba(79,70,229,.45); }
      70% { box-shadow: 0 0 0 16px rgba(245,158,11,0), 0 8px 24px rgba(79,70,229,.45); }
      100% { box-shadow: 0 0 0 0 rgba(245,158,11,0), 0 8px 24px rgba(79,70,229,.45); } }
    @keyframes sgf-slide-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
    @keyframes sgf-glow { 50% { box-shadow: 0 0 0 4px rgba(245,158,11,.35); } }
    @keyframes sgf-pop { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: none; } }
    @keyframes sgf-blink { from { opacity: .2; } to { opacity: .8; } }
    @media (prefers-reduced-motion: reduce) {
      .sgf-chip { transition: none; }
      .sgf-clar-banner, .sgf-clar-msg, .sgf-typing::after, #sgf-fab.sgf-fab-ask, .sgf-it-ask { animation: none; }
    }
    .sgf-lab { display: flex; flex-direction: column; gap: 4px; font-size: 12.5px; color: #475569; font-weight: 600; }
    .sgf-req { color: #ef4444; }
    .sgf-in {
      width: 100%; box-sizing: border-box; padding: 9px 11px; border-radius: 9px;
      border: 1px solid #d1d5db; background: #fff; color: #1f2937; font: inherit;
    }
    .sgf-in:focus { outline: 2px solid #c7d2fe; border-color: #6366f1; }
    textarea.sgf-in { resize: vertical; min-height: 60px; }

    /* Attachments: ảnh chụp màn hình + file đính kèm */
    .sgf-attach { display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 9px; font-size: 12.5px; color: #475569; }
    .sgf-attach-row { display: flex; align-items: center; gap: 8px; cursor: pointer; line-height: 1.4; }
    .sgf-attach-row input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; flex-shrink: 0; }
    .sgf-attach-row b { color: #1f1147; }
    .sgf-file-row { flex-wrap: wrap; cursor: default; }
    .sgf-attach-lbl { font-weight: 600; }
    .sgf-file-row input[type="file"] { font-size: 12px; }
    .sgf-attach-hint { font-size: 11px; color: #64748b; padding: 0 2px; }
    .sgf-attach-hint b { color: #4338ca; font-weight: 700; }
    .sgf-attach.sgf-drag { border-color: #6366f1; border-style: solid; background: #eef2ff; box-shadow: 0 0 0 3px rgba(99,102,241,.15); }
    .sgf-attach.sgf-drag * { pointer-events: none; }
    .sgf-attach-list { display: flex; flex-direction: column; gap: 4px; }
    .sgf-attach-list:empty { display: none; }
    .sgf-attach-it { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #e5e7eb; border-radius: 7px; padding: 5px 8px; font-size: 12px; color: #1f2937; }
    .sgf-attach-thumb { width: 34px; height: 34px; object-fit: cover; border-radius: 5px; flex-shrink: 0; border: 1px solid #e5e7eb; }
    .sgf-attach-ic { font-size: 18px; width: 26px; text-align: center; flex-shrink: 0; }
    .sgf-attach-nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sgf-attach-size { opacity: .6; margin-left: 4px; }
    .sgf-attach-rm { margin-left: auto; border: 0; background: transparent; cursor: pointer; color: #ef4444; font-weight: 700; font-size: 13px; padding: 0 4px; flex-shrink: 0; }
    .sgf-attach-rm:hover { color: #b91c1c; }
    /* Hiển thị attachments trong inbox */
    .sgf-it-att { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .sgf-it-thumb { display: inline-block; border-radius: 6px; overflow: hidden; border: 1px solid #e5e7eb; line-height: 0; }
    .sgf-it-thumb img { display: block; max-width: 120px; max-height: 90px; object-fit: cover; }
    .sgf-it-file { display: inline-flex; align-items: center; gap: 4px; font-size: 11.5px; color: #4338ca; background: #eef2ff; padding: 3px 8px; border-radius: 6px; text-decoration: none; border: 1px solid #c7d2fe; }
    .sgf-it-file:hover { background: #e0e7ff; }

    .sgf-ctx {
      font-size: 11.5px; color: #475569; background: #f1f5f9; border-radius: 8px;
      padding: 7px 10px; line-height: 1.45;
    }
    .sgf-ctx-url { display: block; opacity: .65; font-family: ui-monospace,SFMono-Regular,Menlo,monospace; font-size: 11px; margin-top: 2px; word-break: break-all; }

    .sgf-bar { display: flex; align-items: center; gap: 10px; }
    .sgf-msg { font-size: 12.5px; color: #475569; margin-right: auto; }
    .sgf-send {
      padding: 9px 16px; border: 0; border-radius: 10px; cursor: pointer; font: 700 13.5px/1 inherit;
      background: linear-gradient(135deg,#fbbf24,#f97316); color: #1f1147;
    }
    .sgf-send:hover { filter: brightness(1.06); }
    .sgf-send:disabled { opacity: .55; cursor: wait; }

    .sgf-inbox { border-top: 1px solid #e5e7eb; padding: 12px 20px 18px; background: #f8fafc; border-radius: 0 0 16px 16px; }
    .sgf-inbox-head { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; color: #475569; font-weight: 700; margin-bottom: 8px; }
    .sgf-reload { border: 0; background: transparent; cursor: pointer; color: #6366f1; font-size: 15px; }
    .sgf-inbox-list { display: flex; flex-direction: column; gap: 7px; }
    .sgf-empty { font-size: 12.5px; color: #6b7280; text-align: center; padding: 10px 0; font-style: italic; }
    .sgf-it { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 9px 11px; }
    .sgf-it-line { display: flex; align-items: center; gap: 8px; }
    .sgf-it-queue { font-size: 12px; color: #6b7280; margin: 4px 0 2px; }
    .sgf-folders { padding: 0 20px 8px; }
    .sgf-folder { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid rgba(148,163,184,.25); font-size: 13px; }
    .sgf-folder-t { flex: 1; min-width: 0; font-weight: 600; overflow-wrap: anywhere; }
    .sgf-folder-m { font-size: 12px; color: #6b7280; white-space: nowrap; }
    .sgf-folder-hint { font-size: 12.5px; color: #92400e; background: #fef3c7; border-radius: 8px; padding: 6px 10px; margin: -4px 0 8px; }
    .sgf-it-ico { font-size: 14px; }
    .sgf-it-title { flex: 1; font-size: 13px; font-weight: 600; color: #1f2937; }
    .sgf-it-st { font-size: 11px; padding: 2px 8px; border-radius: 7px; font-weight: 700; white-space: nowrap; }
    .sgf-it-st.pending   { background: #e2e8f0; color: #475569; }
    .sgf-it-st.reviewing { background: #fde68a; color: #92400e; }
    .sgf-it-st.done      { background: #bbf7d0; color: #065f46; }
    .sgf-it-st.rejected  { background: #fecaca; color: #991b1b; }
    .sgf-it-st.cancelled { background: #e5e7eb; color: #6b7280; text-decoration: line-through; }
    .sgf-it-note {
      font-size: 12px; color: #1f2937; margin-top: 6px; padding: 6px 9px; border-radius: 8px;
      background: #fef3c7; border-left: 3px solid #f59e0b;
    }
    .sgf-it-thread-btn {
      margin-top: 7px; border: 1px solid #c7d2fe; background: #eef2ff; color: #4338ca;
      cursor: pointer; font: 700 11.5px/1 inherit; padding: 5px 10px; border-radius: 7px;
    }
    .sgf-it-thread-btn:hover { background: #e0e7ff; }
    .sgf-it-cancel {
      margin: 7px 0 0 6px; border: 1px solid #fecaca; background: #fff; color: #b91c1c;
      cursor: pointer; font: 700 11.5px/1 inherit; padding: 5px 10px; border-radius: 7px;
    }
    .sgf-it-cancel:hover, .sgf-it-cancel[data-armed] { background: #fee2e2; }
    .sgf-it-cancel:focus-visible, .sgf-it-thread-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
    .sgf-it-thread { margin-top: 8px; }
    .sgf-it-thread[hidden] { display: none; }

    @media (prefers-color-scheme: dark) {
      .sgf-dialog { background: #1e1b4b; color: #e5e7eb; }
      .sgf-head-text h3 { color: #fff; }
      .sgf-tabs { border-bottom-color: #312e81; }
      .sgf-tab { color: #94a3b8; }
      .sgf-tab[aria-selected="true"] { color: #c7d2fe; border-bottom-color: #818cf8; }
      .sgf-head-text p { color: #cbd5e1; }
      .sgf-x { background: rgba(255,255,255,.08); color: #cbd5e1; }
      .sgf-x:hover { background: rgba(255,255,255,.15); }
      .sgf-lab { color: #cbd5e1; }
      .sgf-ob-intro { background: #312e81; color: #e0e7ff; }
      .sgf-ob-q { color: #f1f5f9; }
      .sgf-ob-hint { color: #94a3b8; }
      .sgf-chip { background: #1a1740; color: #e0e7ff; border-color: #4338ca; }
      .sgf-chip:hover { background: #312e81; }
      .sgf-ob-status { color: #c7d2fe; }
      .sgf-clar-ai { background: #312e81; color: #e0e7ff; }
      .sgf-clar-banner { background: linear-gradient(135deg,#422006,#78350f); color: #fde68a; border-color: #b45309; }
      .sgf-in { background: #312e81; color: #f1f5f9; border-color: #4338ca; }
      .sgf-in:focus { outline-color: #818cf8; border-color: #a5b4fc; }
      .sgf-ctx { background: #312e81; color: #c7d2fe; }
      .sgf-inbox { background: #1a1740; border-top-color: #312e81; }
      .sgf-inbox-head { color: #cbd5e1; }
      .sgf-it { background: #312e81; border-color: #4338ca; }
      .sgf-it-title { color: #f1f5f9; }
      .sgf-it-note { background: #422006; color: #fde68a; border-left-color: #f59e0b; }
      .sgf-msg { color: #cbd5e1; }
      .sgf-attach { background: #1a1740; border-color: #4338ca; color: #cbd5e1; }
      .sgf-attach-row b { color: #fef3c7; }
      .sgf-attach-hint { color: #94a3b8; }
      .sgf-attach-hint b { color: #c7d2fe; }
      .sgf-attach.sgf-drag { background: #312e81; border-color: #818cf8; }
      .sgf-attach-it { background: #312e81; border-color: #4338ca; color: #f1f5f9; }
      .sgf-attach-thumb { border-color: #4338ca; }
      .sgf-it-file { background: #312e81; color: #c7d2fe; border-color: #4338ca; }
      .sgf-it-file:hover { background: #4338ca; }
      .sgf-it-thumb { border-color: #4338ca; }
      .sgf-it-thread-btn { background: #312e81; color: #c7d2fe; border-color: #4338ca; }
      .sgf-it-thread-btn:hover { background: #4338ca; }
      .sgf-it-cancel { background: #1e1b4b; color: #fca5a5; border-color: #7f1d1d; }
      .sgf-it-cancel:hover, .sgf-it-cancel[data-armed] { background: #450a0a; }
    }
  `;
  const st = document.createElement('style');
  st.setAttribute('data-injected', 'suggestion-fab');
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
}
