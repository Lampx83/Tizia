// Per-school enrollment cho Tizia: mỗi tài khoản tại 1 thời điểm chỉ THAM GIA
// 1 trường. Module này:
//   - Đọc enrolled_domain của user hiện tại từ /api/auth/me (cached).
//   - Cung cấp modal "Chọn trường" (lần đầu) + "Đổi trường" (có cảnh báo reset).
//   - Helper canInteract(me, domain) — gate UI ở trường khác.
// BE chặn /api/* ghi nếu cross-domain.

import { DOMAIN_META } from './engine/domain.js';

let _meCache = null;
let _meFetchedAt = 0;
const ME_TTL_MS = 60_000;

export async function getMe(forceReload = false) {
  if (_meCache && !forceReload && Date.now() - _meFetchedAt < ME_TTL_MS) return _meCache;
  try {
    const r = await fetch('/api/auth/me', { credentials: 'include' });
    if (!r.ok) { _meCache = null; _meFetchedAt = Date.now(); return null; }
    const j = await r.json();
    _meCache = j.user || null;
    _meFetchedAt = Date.now();
    return _meCache;
  } catch { _meCache = null; return null; }
}

export async function enroll(domain) {
  const r = await fetch('/api/me/enroll', {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j.error || 'enroll_failed'), { status: r.status, body: j });
  if (_meCache) _meCache.enrolled_domain = j.enrolled_domain;
  return j;
}

export async function switchSchool(domain) {
  const r = await fetch('/api/me/switch-school', {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j.error || 'switch_failed'), { status: r.status, body: j });
  if (_meCache) _meCache.enrolled_domain = j.enrolled_domain;
  return j;
}

// Đồng bộ — user có được tương tác (làm bài, chơi game, lưu XP) tại `domain`?
// Admin bypass; user khác phải enrolled_domain == domain. Dùng để
// vô hiệu hoá nút submit/play khi ở trường không phải của mình.
export function canInteract(me, domain) {
  if (!me) return false;
  if (me.role === 'admin') return true;
  return !!me.enrolled_domain && me.enrolled_domain === domain;
}

// ── Modal Chọn/Đổi trường ──────────────────────────────────────────────
// mode='enroll': lần đầu (không có nút Huỷ → bắt buộc chọn).
// mode='switch': đổi trường, có cảnh báo reset + nút Huỷ.
export function showEnrollmentModal({ mode = 'enroll', current = null } = {}) {
  return new Promise((resolve, reject) => {
    const overlay = document.createElement('div');
    overlay.id = 'tizia-enroll-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const items = DOMAIN_META
      .filter(d => d.status !== 'locked' && d.enabled !== false)
      .map(d => `
        <button class="te-card" data-id="${d.id}" ${d.id === current ? 'data-current="1" disabled' : ''} style="--c:${d.accent}">
          <div class="te-ic">${d.icon}</div>
          <div class="te-body">
            <div class="te-name">${d.name}</div>
            <div class="te-sub">${d.tagline}</div>
          </div>
          ${d.id === current ? '<div class="te-cur">Hiện tại</div>' : ''}
        </button>
      `).join('');

    const warning = mode === 'switch' ? `
      <div class="te-warn">
        ⚠️ <b>Đổi trường = bắt đầu lại từ đầu</b> ở trường mới. XP, coin, level và kỹ năng độc lập theo từng trường. Tiến trình ở trường hiện tại <b>vẫn được lưu</b> — quay lại trường cũ sẽ khôi phục.
      </div>` : `
      <div class="te-warn warn-info">
        🎓 Mỗi tài khoản tại 1 thời điểm chỉ học ở <b>một trường</b>. Bạn vẫn tham quan được trường khác, nhưng chỉ <b>xem</b> — không làm bài, không chơi game, không tích XP.
      </div>`;

    overlay.innerHTML = `
      <style>
        #tizia-enroll-modal { position:fixed; inset:0; background:rgba(2,6,23,.86); z-index:99999; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); padding:24px; font-family:inherit; }
        #tizia-enroll-modal * { box-sizing:border-box; }
        #tizia-enroll-modal .te-shell { background:#fff; color:#0f172a; border-radius:20px; padding:24px 26px; max-width:780px; width:100%; max-height:90vh; overflow:auto; box-shadow:0 30px 80px rgba(0,0,0,.5); }
        #tizia-enroll-modal h3 { margin:0 0 6px; font-size:22px; font-weight:800; }
        #tizia-enroll-modal .te-lead { margin:0 0 14px; color:#475569; font-size:14px; }
        #tizia-enroll-modal .te-warn { background:#fef3c7; border:1px solid #fde68a; color:#92400e; padding:10px 13px; border-radius:11px; font-size:13px; margin-bottom:14px; line-height:1.55; }
        #tizia-enroll-modal .te-warn.warn-info { background:#dbeafe; border-color:#bfdbfe; color:#1e40af; }
        #tizia-enroll-modal .te-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:10px; }
        #tizia-enroll-modal .te-card { background:#fff; border:2px solid #e2e8f0; border-radius:13px; padding:12px 13px; text-align:left; cursor:pointer; display:flex; gap:10px; align-items:flex-start; transition:transform .12s, border-color .12s, box-shadow .12s; position:relative; font-family:inherit; }
        #tizia-enroll-modal .te-card:hover:not([disabled]) { border-color:var(--c); transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,.08); }
        #tizia-enroll-modal .te-card[data-current="1"] { background:#f1f5f9; border-color:#94a3b8; cursor:default; opacity:.85; }
        #tizia-enroll-modal .te-ic { font-size:28px; flex-shrink:0; }
        #tizia-enroll-modal .te-body { min-width:0; }
        #tizia-enroll-modal .te-name { font-weight:800; font-size:14px; }
        #tizia-enroll-modal .te-sub { font-size:11.5px; color:#64748b; margin-top:2px; line-height:1.4; }
        #tizia-enroll-modal .te-cur { position:absolute; top:8px; right:8px; background:#94a3b8; color:#fff; font-size:10px; font-weight:800; padding:2px 7px; border-radius:9px; letter-spacing:.5px; }
        #tizia-enroll-modal .te-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:14px; }
        #tizia-enroll-modal .te-btn { background:#e2e8f0; color:#0f172a; border:0; border-radius:10px; padding:9px 15px; font-weight:700; cursor:pointer; font-family:inherit; }
        #tizia-enroll-modal .te-loading { display:none; margin-top:13px; padding:10px; background:#fef9c3; border-radius:10px; font-size:13px; text-align:center; }
        #tizia-enroll-modal .te-loading.show { display:block; }
        #tizia-enroll-modal .te-error { display:none; margin-top:11px; padding:10px 13px; background:#fee2e2; border:1px solid #fecaca; color:#b91c1c; border-radius:10px; font-size:13px; }
        #tizia-enroll-modal .te-error.show { display:block; }
      </style>
      <div class="te-shell">
        <h3>${mode === 'switch' ? '🔄 Đổi trường đang học' : '🎓 Chọn trường bạn muốn học'}</h3>
        <p class="te-lead">${mode === 'switch' ? 'Chọn trường mới — tiến trình trường cũ vẫn lưu (ẩn) và sẽ khôi phục nếu quay về sau.' : 'Bạn cần chọn trường trước khi bắt đầu. Có thể đổi sau ở trang Năng lực.'}</p>
        ${warning}
        <div class="te-grid">${items}</div>
        <div class="te-loading">⏳ Đang lưu…</div>
        <div class="te-error"></div>
        <div class="te-actions">
          ${mode === 'switch' ? '<button class="te-btn" data-close>Huỷ</button>' : ''}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const loadingEl = overlay.querySelector('.te-loading');
    const errorEl = overlay.querySelector('.te-error');

    overlay.addEventListener('click', async (e) => {
      if (e.target.matches('[data-close]') || e.target === overlay) {
        if (mode === 'switch') {
          overlay.remove();
          reject(new Error('cancelled'));
        }
        return;
      }
      const card = e.target.closest('.te-card');
      if (!card || card.dataset.current === '1') return;
      const id = card.dataset.id;
      loadingEl.classList.add('show');
      errorEl.classList.remove('show');
      try {
        const res = mode === 'switch' ? await switchSchool(id) : await enroll(id);
        overlay.remove();
        resolve(res);
      } catch (err) {
        loadingEl.classList.remove('show');
        errorEl.textContent = err.body?.message || err.message || 'Lỗi không xác định';
        errorEl.classList.add('show');
      }
    });
  });
}

// ── View-only mode ───────────────────────────────────────────
// Khi user vào trường KHÔNG phải của mình:
//   - Banner đỏ ở giữa đầu trang nhắc "chỉ tham quan".
//   - CSS dim + chặn pointer-event mọi button/form/input KHÔNG có attr
//     `data-tizia-view-allowed` (cho phép nav back, đăng xuất, link).
//   - Override fetch(): mọi POST/PUT/DELETE/PATCH tới /api/* trả 403 view_only
//     ngay tại FE (BE đã chặn rồi — đây là lớp 2 tăng UX phản hồi).
// Admin & guest bypass. Element muốn loại trừ: thêm `data-tizia-view-allowed`.
//
// Trả Promise<{ canInteract: bool, mode: 'admin'|'home'|'view-only'|'guest' }>.
export async function applyViewOnlyGate(domain) {
  const me = await getMe();
  if (!me) return { canInteract: false, mode: 'guest' };
  if (me.role === 'admin') return { canInteract: true, mode: 'admin' };
  if (me.enrolled_domain === domain) return { canInteract: true, mode: 'home' };

  // Đang ở trường khác → view-only.
  document.documentElement.classList.add('tizia-view-only');

  // CSS dim/chặn các phần tử tương tác. Chỉ inject 1 lần.
  if (!document.getElementById('tizia-view-only-css')) {
    const st = document.createElement('style');
    st.id = 'tizia-view-only-css';
    st.textContent = `
      .tizia-view-only button:not([data-tizia-view-allowed]),
      .tizia-view-only input:not([data-tizia-view-allowed]):not([type="search"]),
      .tizia-view-only textarea:not([data-tizia-view-allowed]),
      .tizia-view-only select:not([data-tizia-view-allowed]),
      .tizia-view-only [type="submit"]:not([data-tizia-view-allowed]) {
        opacity: 0.42 !important;
        pointer-events: none !important;
        cursor: not-allowed !important;
      }
      .tizia-view-only form:not([data-tizia-view-allowed]) {
        opacity: 0.6 !important;
        pointer-events: none !important;
      }
      .tizia-view-banner {
        position: fixed; left: 50%; transform: translateX(-50%); top: 12px;
        z-index: 99998; background: linear-gradient(90deg,#dc2626,#ea580c);
        color: #fff; padding: 11px 19px; border-radius: 24px;
        font-size: 13px; font-weight: 800; line-height: 1.45;
        box-shadow: 0 8px 28px rgba(220,38,38,.5); max-width: 92vw; text-align: center;
        backdrop-filter: blur(6px);
      }
      .tizia-view-banner a { color: #fef9c3; text-decoration: underline; }
    `;
    document.head.appendChild(st);
  }

  if (!document.querySelector('.tizia-view-banner')) {
    const b = document.createElement('div');
    b.className = 'tizia-view-banner';
    b.innerHTML = `👀 Bạn đang tham quan trường khác. <a href="/school.html?domain=${encodeURIComponent(me.enrolled_domain)}">Về trường của bạn ↩</a>`;
    document.body.appendChild(b);
  }

  // Lớp 2: chặn FE fetch tới /api/* (POST/PUT/DELETE/PATCH). BE cũng
  // 403 nhưng FE intercept trả lỗi tức thì, không ping mạng.
  if (!window.__tiziaViewFetchPatched) {
    window.__tiziaViewFetchPatched = true;
    const orig = window.fetch.bind(window);
    window.fetch = function (input, init) {
      try {
        const url = typeof input === 'string' ? input : (input?.url || '');
        const method = (init?.method || input?.method || 'GET').toUpperCase();
        const isWriteApi = /^\/?api\//.test(url) && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
        // Cho phép switch-school / enroll / logout vẫn đi được.
        const isAllowedWrite =
          /\/api\/me\/(enroll|switch-school)\b/.test(url) ||
          /\/api\/auth\/(logout|login|register)\b/.test(url);
        if (isWriteApi && !isAllowedWrite) {
          return Promise.resolve(new Response(JSON.stringify({
            error: 'view_only', viewOnly: true,
            message: 'Bạn đang ở trường khác — không tương tác được.',
          }), { status: 403, headers: { 'Content-Type': 'application/json' } }));
        }
      } catch {}
      return orig(input, init);
    };
  }

  return { canInteract: false, mode: 'view-only', enrolledDomain: me.enrolled_domain };
}

// Auto-prompt khi vào trang chủ / vào trường: nếu user đã login + chưa enroll
// thì show modal. Admin bypass. Guest bỏ qua (handled bởi authGate).
export async function autoPromptEnrollIfNeeded() {
  const me = await getMe();
  if (!me) return null;
  if (me.role === 'admin') return me;
  if (!me.enrolled_domain) {
    try { await showEnrollmentModal({ mode: 'enroll' }); }
    catch { /* user không huỷ được modal enroll */ }
    return await getMe(true);
  }
  return me;
}
