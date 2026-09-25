// Header dùng chung — logo Tizia bên trái, tài khoản đăng nhập bên phải.
// Bấm vào chip tài khoản → mở dialog hồ sơ (thông tin + nút Đăng xuất).
// Trang chỉ cần `<script type="module" src="./js/auth-header.js"></script>` là tự gắn.

import { bootstrapMe, currentUser, logout, updateProfile } from './auth.js';
import { PLAN_BADGES, USER_PLANS, effectivePlanId } from './plans.js';
// Gamify dành cho người học: Engagement HUD (Streak · Hearts · Daily Quest), onboarding 60s, pet đồng
// hành, điểm danh hằng ngày. Trang quản trị gắn <body data-no-gamify> để không nạp các module này.
if (document.body?.dataset?.noGamify === undefined) {
  import('./engagement-hud.js');
  import('./onboarding-60s.js');
  import('./pet-widget.js');
  import('./daily-login.js');
}
// i18n — auto-load bundle theo locale (vi/en/id).
import './i18n.js';
// TTS Reader — toggle 🔊 đọc to bài cho tiểu học.
import './tts-reader.js';
// Feature Gate — Progressive disclosure (locked → 🔒, mở dần theo journey)
import './feature-gate.js';

const ROLE_LABEL = {
  pupil:   { ico: '🎒', label: 'Học sinh' },
  student: { ico: '🎓', label: 'Sinh viên' },
  teacher: { ico: '👨‍🏫', label: 'Giảng viên' },
};

const CSS = `
  .ev-header {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; gap: 12px;
    padding: 10px 18px;
    background: rgba(15, 23, 42, 0.85);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(14px);
    color: white; font-family: 'Inter', system-ui, sans-serif;
    /* Một số trang đặt rule "header { max-width: 800px }" cho header riêng
       của trang — selector theo tag sẽ trúng luôn auth-header và bóp 800px.
       Reset cứng để auth-header luôn full-width, kệ trang đang style thế nào. */
    max-width: none; width: auto; box-sizing: border-box;
  }
  .ev-header .ev-brand-stack {
    display: inline-flex; flex-direction: column; align-items: flex-start; gap: 1px; line-height: 1.1;
  }
  .ev-header .ev-brand {
    display: inline-flex; align-items: center; gap: 10px;
    font-weight: 800; font-size: 19px; letter-spacing: -0.2px;
    color: white; text-decoration: none;
  }
  .ev-header .ev-brand .logo { font-size: 30px; line-height: 1; }
  .ev-header .ev-brand .name {
    background: linear-gradient(135deg, #ffffff 0%, #fbbf24 60%, #f97316 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .ev-header .ev-tagline {
    font-size: 12px; font-style: italic; opacity: 0.72; letter-spacing: 0.2px;
    margin-left: 40px; white-space: nowrap;
  }
  @media (max-width: 720px) { .ev-header .ev-tagline { display: none; } }
  .ev-header .ev-spacer { flex: 1; }

  /* Nút Quay lại + breadcrumb — chỉ hiện ở trang trong */
  .ev-header .ev-back {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
    cursor: pointer; color: #fff; font-size: 15px; font-family: inherit;
    transition: background 0.15s, border-color 0.15s, transform 0.12s;
  }
  .ev-header .ev-back:hover { background: rgba(255,255,255,0.16); border-color: rgba(251,191,36,0.55); transform: translateX(-1px); }
  .ev-header .ev-crumbs {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; opacity: 0.92; min-width: 0;
  }
  .ev-header .ev-crumbs a { color: inherit; text-decoration: none; opacity: 0.75; }
  .ev-header .ev-crumbs a:hover { color: #fbbf24; opacity: 1; text-decoration: underline; }
  .ev-header .ev-crumbs .sep { opacity: 0.45; }
  .ev-header .ev-crumbs .leaf {
    color: #fde68a; font-weight: 600;
    max-width: 38vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* Slot chứa chuông notification (do notifications-bell.js mount vào) */
  #ev-bell-slot { display: inline-flex; align-items: center; }
  /* Slot chứa engagement HUD (Streak · Hearts · Quest) — engagement-hud.js
     sẽ reparent .tz-eng-hud vào đây nếu slot tồn tại, để bar hiển thị inline
     trong header thay vì floating top-right. */
  #ev-eng-slot { display: inline-flex; align-items: center; }
  /* Slot chứa pet bubble — pet-widget.js sẽ reparent .tz-pet-bubble vào đây
     để gọn cùng các HUD khác. */
  #ev-pet-slot { display: inline-flex; align-items: center; }
  @media (max-width: 720px) {
    /* Trên mobile header đã chật — ẩn HUD inline, chỉ giữ nút chuông + tài khoản */
    #ev-eng-slot, #ev-pet-slot { display: none; }
  }

  /* Quick-link 5 mini-game / trải nghiệm trực quan — luôn hiện ở mọi trang.
     Trước đây chỉ ẩn trong "Khám phá thêm" cuối trang chủ, user không tìm thấy. */
  .ev-quicklinks { display: inline-flex; gap: 4px; padding: 0 4px; }
  .ev-quicklinks a {
    width: 30px; height: 30px; border-radius: 8px;
    display: inline-flex; align-items: center; justify-content: center;
    text-decoration: none; font-size: 17px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    transition: background 0.15s, border-color 0.15s, transform 0.12s;
  }
  .ev-quicklinks a:hover {
    background: rgba(251,191,36,0.18); border-color: rgba(251,191,36,0.55); transform: translateY(-1px);
  }
  @media (max-width: 720px) {
    .ev-quicklinks { gap: 2px; padding: 0 2px; }
    .ev-quicklinks a { width: 26px; height: 26px; font-size: 14px; }
    /* Trên mobile chỉ giữ 3 quick-link đầu để khỏi chen header */
    .ev-quicklinks a:nth-child(n+4) { display: none; }
  }

  .ev-user-wrap { position: relative; }
  .ev-header .ev-user {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 6px 12px 6px 6px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px; cursor: pointer; font-family: inherit; color: inherit;
    transition: background 0.15s, border-color 0.15s, transform 0.12s;
  }
  .ev-header .ev-user:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.22); }
  .ev-header .ev-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723;
    font-weight: 800; font-size: 13px;
  }
  .ev-header .ev-avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
  .ev-header .ev-user-text { display: flex; flex-direction: column; line-height: 1.15; text-align: left; }
  .ev-header .ev-user-name { font-size: 13px; font-weight: 700; }
  .ev-header .ev-user-meta { font-size: 10.5px; opacity: 0.7; }
  .ev-header .ev-caret { font-size: 10px; opacity: 0.6; margin-left: 1px; transition: transform 0.2s; }
  .ev-user-wrap.open .ev-caret { transform: rotate(180deg); }

  /* Dialog hồ sơ */
  .ev-profile {
    position: absolute; top: calc(100% + 10px); right: 0; z-index: 300;
    width: 280px; max-width: calc(100vw - 24px); padding: 18px;
    background: rgba(17,24,39,0.97); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px; box-shadow: 0 24px 60px rgba(0,0,0,0.55);
    backdrop-filter: blur(16px);
    opacity: 0; transform: translateY(-8px) scale(0.98); pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }
  .ev-user-wrap.open .ev-profile { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  .ev-profile .pf-head { display: flex; align-items: center; gap: 13px; }
  .ev-profile .pf-avatar {
    width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0;
    display: inline-flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723;
    font-weight: 800; font-size: 19px;
  }
  .ev-profile .pf-avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
  .ev-profile .pf-name { font-size: 16px; font-weight: 800; line-height: 1.2; }
  .ev-profile .pf-role { font-size: 12px; opacity: 0.75; margin-top: 3px; }
  .ev-profile .pf-rows { margin: 15px 0 14px; display: flex; flex-direction: column; gap: 9px; font-size: 12.5px; }
  .ev-profile .pf-row { display: flex; justify-content: space-between; gap: 12px; }
  .ev-profile .pf-row .k { opacity: 0.55; white-space: nowrap; }
  .ev-profile .pf-row .v { font-weight: 600; text-align: right; word-break: break-word; }
  .ev-profile .pf-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 0 0 13px; }
  .ev-profile .pf-actions { display: flex; gap: 8px; }
  .ev-profile .pf-btn {
    flex: 1; border: none; cursor: pointer; padding: 11px;
    border-radius: 11px; font-weight: 700; font-size: 13px; font-family: inherit;
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    transition: background 0.15s, transform 0.12s, border-color 0.15s;
  }
  .ev-profile .pf-edit-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.16); color: #fff; }
  .ev-profile .pf-edit-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-1px); }
  .ev-profile .pf-logout { background: #dc2626; color: #fff; }
  .ev-profile .pf-logout:hover { background: #ef4444; transform: translateY(-1px); }

  /* Chế độ sửa */
  .ev-profile .pf-edit { display: none; }
  .ev-profile.editing .pf-view { display: none; }
  .ev-profile.editing .pf-edit { display: block; }
  .ev-profile .pf-field { margin-bottom: 11px; }
  .ev-profile .pf-field label { display: block; font-size: 11.5px; opacity: 0.65; margin-bottom: 5px; }
  .ev-profile .pf-field input {
    width: 100%; padding: 9px 11px; border-radius: 9px;
    border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.96);
    color: #1f2937; font-size: 13.5px; font-family: inherit;
  }
  .ev-profile .pf-field input:focus { outline: 2px solid #fbbf24; }
  .ev-profile .pf-err {
    display: none; font-size: 12px; color: #fecaca;
    background: rgba(244,63,94,0.16); border: 1px solid rgba(244,63,94,0.4);
    border-radius: 8px; padding: 7px 9px; margin-bottom: 10px;
  }
  .ev-profile .pf-err.show { display: block; }

  .ev-header .ev-anon { font-size: 13px; opacity: 0.8; }
  .ev-header .ev-anon a { color: #fbbf24; text-decoration: none; font-weight: 700; }

  /* Plan badge (Free/Plus/Pro) — hiển thị cạnh tên trong chip user và trong dialog */
  .ev-plan-pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 1px 7px; border-radius: 7px;
    font-size: 10.5px; font-weight: 800; letter-spacing: .2px;
    margin-left: 6px; vertical-align: middle;
  }
  .ev-plan-cta {
    display: inline-block; margin-top: 12px; width: 100%;
    text-align: center; padding: 9px 12px; border-radius: 10px;
    background: linear-gradient(135deg, #a855f7, #ec4899); color: #fff;
    font-weight: 800; font-size: 12.5px; text-decoration: none;
    box-shadow: 0 4px 14px rgba(168,85,247,.35);
    transition: transform .12s, box-shadow .15s;
  }
  .ev-plan-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(168,85,247,.5); }
  .ev-plan-cta.muted { background: rgba(255,255,255,.08); color: #fff; box-shadow: none; }
  @media (max-width: 540px) {
    .ev-header { padding: 8px 12px; gap: 8px; }
    .ev-header .ev-brand .name { display: none; }
    .ev-header .ev-user-text { max-width: 120px; overflow: hidden; }
    .ev-header .ev-user-name { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
    .ev-header .ev-crumbs .crumb-home { display: none; }
    .ev-header .ev-crumbs .sep { display: none; }
    .ev-header .ev-crumbs .leaf { max-width: 42vw; }
    .ev-header .ev-back { width: 30px; height: 30px; }
  }
`;

function injectStyle() {
  if (document.getElementById('ev-header-css')) return;
  const s = document.createElement('style');
  s.id = 'ev-header-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

function initials(name) {
  return String(name || '?').trim().split(/\s+/).slice(-2).map(w => w[0]?.toUpperCase() || '').join('') || '?';
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function planPill(planId) {
  const b = PLAN_BADGES[planId] || PLAN_BADGES.free;
  return `<span class="ev-plan-pill" style="background:${b.bg};color:${b.color}" title="Gói cước hiện tại">${b.label}</span>`;
}

// Trang chủ = "/" hoặc "/index(.html)". Trang trong → có breadcrumb + nút back.
function isHomePage() {
  const p = location.pathname.replace(/\/+$/, '');
  if (p === '') return true;
  const last = p.split('/').pop() || '';
  return last === 'index' || last === 'index.html';
}

// Tên trang cho breadcrumb. Ưu tiên <body data-page-title>, fallback document.title
// (đã strip "· Tizia" / "Tizia ·" cho gọn).
function getPageTitle() {
  const explicit = document.body?.dataset?.pageTitle;
  if (explicit) return explicit;
  let t = (document.title || '').trim();
  t = t.replace(/\s*[·•|–—-]\s*Tizia\s*$/i, '').replace(/^Tizia\s*[·•|–—-]\s*/i, '');
  // Tiêu đề dài kiểu "Trường ảo — Mầm non · Tiểu học · …" → chỉ giữ phần đầu
  // trước em-dash để breadcrumb gọn. Trang muốn override hoàn toàn thì dùng
  // <body data-page-title="…">.
  const dashIdx = t.search(/\s+[—–]\s+/);
  if (dashIdx > 0) t = t.slice(0, dashIdx).trim();
  return t || 'Trang';
}

function breadcrumbHtml() {
  if (isHomePage()) return '';
  const title = esc(getPageTitle());
  // Logo Tizia (ev-brand) đã link về trang chủ → không cần thêm "🏠 Trang chủ"
  // trong breadcrumb (dư). Giữ nút ← cho thao tác "quay lại trang trước".
  return `
    <button class="ev-back" id="ev-back-btn" type="button" title="Quay lại trang trước" aria-label="Quay lại trang trước">←</button>
    <nav class="ev-crumbs" aria-label="Breadcrumb">
      <span class="leaf" aria-current="page">${title}</span>
    </nav>
  `;
}

function wireBackBtn(host) {
  const back = host.querySelector('#ev-back-btn');
  if (!back) return;
  back.addEventListener('click', () => {
    try {
      const ref = document.referrer && new URL(document.referrer);
      const sameOrigin = ref && ref.origin === location.origin && ref.pathname !== location.pathname;
      if (history.length > 1 && sameOrigin) {
        history.back();
        return;
      }
    } catch { /* ignore */ }
    location.href = './';
  });
}

function fmtExpire(ms) {
  if (!ms) return '';
  try {
    const d = new Date(ms);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch { return ''; }
}

// Quick-link "trải nghiệm trực quan" trên header. Mỗi entry có `audience`
// để lọc theo role + grade:
//   - 'all'      : hiện cho mọi user (kể cả guest)
//   - 'kid'      : chỉ HS Mầm non + Tiểu học (lớp 1-5) — game cấp Tiểu
//   - 'teen'     : HS THCS + THPT (lớp 6-12) — phù hợp tuổi teen
//   - 'k12'      : mọi HS phổ thông (lớp 1-12) — không hợp Sinh viên ĐH
//   - 'cs'       : liên quan CS/Tin học — Code Quest hợp HS THCS+THPT + SV CNTT
//   - 'sci'      : liên quan khoa học — Lab Hoá hợp HS từ Lớp 8+ + SV Y/Dược
// Sinh viên (role='student') ẨN hết các game 'kid' + 'k12'; chỉ thấy 'all'
// + 'cs' (nếu major CNTT) + 'sci' (nếu major Y/Dược/Hoá). Teacher thấy tất.
//
// Mobile chỉ hiện 3 quick-link đầu (CSS @media @ ev-quicklinks).
const QUICK_LINKS = [
  { href: '/cay-tri-thuc.html',     ic: '🌳', title: 'Cây Tri Thức của em',           audience: 'all'  },
  { href: '/bang-phong-than.html',  ic: '🏆', title: 'Bảng Phong Thần',               audience: 'all'  },
  { href: '/pet-tri-thuc.html',     ic: '🐉', title: 'Pet Tri Thức (Tiziamon)',        audience: 'k12'  },
  { href: '/bao-so-hoc.html',       ic: '⛈️', title: 'Bão Số Học (luyện tính)',       audience: 'kid'  },
  { href: '/lab-hoa-ao.html',       ic: '🧪', title: 'Lab Hoá Học Ảo',                audience: 'sci'  },
  { href: '/do-chu-ghep-van.html',  ic: '🔤', title: 'Đố Chữ Ghép Vần',               audience: 'kid'  },
  { href: '/ban-do-vn.html',        ic: '🗺️', title: 'Bản đồ Việt Nam Tri Thức',      audience: 'all'  },
  { href: '/pixel-art-studio.html', ic: '🎨', title: 'Pixel Art Studio',              audience: 'all'  },
  { href: '/code-quest.html',       ic: '🤖', title: 'Code Quest (lập trình kéo thả)', audience: 'cs'   },
];

// Ngành ĐH liên quan CS/khoa học — quyết định Code Quest / Lab Hoá có hiện không.
const CS_MAJORS  = new Set(['it', 'engineering']);
const SCI_MAJORS = new Set(['pharmacy', 'medicine', 'nursing', 'natural-sciences']);

function isAudienceMatch(audience, user) {
  if (audience === 'all') return true;
  if (!user) return audience === 'kid' || audience === 'k12'; // guest = HS demo
  if (user.role === 'teacher') return true;                   // GV thấy tất để demo
  if (user.role === 'pupil') {
    const g = Number(user.grade) || 0;
    if (audience === 'kid')  return g >= 0 && g <= 5;          // Mầm non (g=0) + Tiểu học
    if (audience === 'teen') return g >= 6 && g <= 12;
    if (audience === 'k12')  return g >= 0 && g <= 12;
    if (audience === 'cs')   return g >= 6;                    // THCS+ làm Code Quest OK
    if (audience === 'sci')  return g >= 8;                    // Lớp 8+ học Hoá
  }
  if (user.role === 'student') {
    const m = user.major || '';
    if (audience === 'cs')  return CS_MAJORS.has(m);
    if (audience === 'sci') return SCI_MAJORS.has(m);
    return false;                                              // SV không thấy game 'kid' / 'k12' / 'teen'
  }
  return false;
}

// User feedback (jun 2026): không nên surface 9 icon mini-game lên header —
// gây nhiễu, không phù hợp ngữ cảnh nghiêm túc. Thay vào đó nhúng vào từng
// building tương ứng trong school.html (xem space.html SPACES_<DOMAIN>).
// Hàm này giữ lại để future enable hoặc selective render (vd: link "Cây Tri
// Thức" cho mọi user vẫn hữu ích vì nó là dashboard cá nhân). Hiện return ''.
function quickLinksHtml(user) {
  // eslint-disable-next-line no-unused-vars
  void user;
  return '';
}

function isIndexPage() {
  const p = (location.pathname || '').replace(/\/+$/, '');
  return p === '' || p === '/index' || /\/index\.html?$/i.test(p);
}

function brandHtml() {
  const tagline = isIndexPage()
    ? '<span class="ev-tagline">The Intelligent Zone for Interactive Academy</span>'
    : '';
  return `<div class="ev-brand-stack"><a class="ev-brand" href="./"><span class="logo">🌌</span><span class="name">Tizia</span></a>${tagline}</div>`;
}

function render(host, user) {
  if (!user) {
    host.innerHTML = `
      ${brandHtml()}
      ${breadcrumbHtml()}
      <span class="ev-spacer"></span>
      ${quickLinksHtml(user)}
      <span id="ev-eng-slot"></span>
      <span id="ev-pet-slot"></span>
      <span id="ev-bell-slot"></span>
      <span class="ev-anon"><a href="login.html">Đăng nhập</a></span>
    `;
    wireBackBtn(host);
    document.dispatchEvent(new CustomEvent('ev-header-mounted'));
    return;
  }
  const r = ROLE_LABEL[user.role] || ROLE_LABEL.student;
  const ageStr = user.age != null ? ` · ${user.age}t` : '';
  const avatarInner = user.avatar_url
    ? `<img src="${esc(user.avatar_url)}" alt="" />`
    : initials(user.display_name);
  const emailRow = user.email
    ? `<div class="pf-row"><span class="k">Email</span><span class="v">${esc(user.email)}</span></div>` : '';
  const ageRow = user.age != null
    ? `<div class="pf-row"><span class="k">Tuổi</span><span class="v">${user.age}</span></div>` : '';
  // Trục 1+3: hiển thị Lớp/Ngành/Khoá/Trường tuỳ role
  const gradeRow = (user.role === 'pupil' && user.grade != null)
    ? `<div class="pf-row"><span class="k">Lớp</span><span class="v">${user.grade === 0 ? 'Mầm non' : 'Lớp ' + user.grade}</span></div>` : '';
  const majorRow = (user.role === 'student' && user.major)
    ? `<div class="pf-row"><span class="k">Ngành</span><span class="v">${esc(user.major)}</span></div>` : '';
  const cohortRow = (user.role === 'student' && user.cohort)
    ? `<div class="pf-row"><span class="k">Khoá</span><span class="v">${esc(user.cohort)}</span></div>` : '';
  const schoolRow = user.school_name
    ? `<div class="pf-row"><span class="k">Trường</span><span class="v">${esc(user.school_name)}</span></div>` : '';
  const planId = effectivePlanId(user);
  const planDef = USER_PLANS[planId];
  const planRow = `<div class="pf-row"><span class="k">Gói cước</span><span class="v">${planPill(planId)}</span></div>`;
  const expireRow = (planId !== 'free' && planId !== 'guest' && user.plan_expires_at)
    ? `<div class="pf-row"><span class="k">Hết hạn</span><span class="v">${fmtExpire(user.plan_expires_at)}</span></div>` : '';
  // CTA gói cước: giữ trung tính — không sparkle, không màu nổi, dòng nhỏ.
  // Tế nhị: không nhồi cảm giác "hệ thống vì lợi nhuận" ở header. Người dùng
  // chủ động click từ dropdown profile thì xem được.
  const planCta = `<a class="ev-plan-cta muted" href="pricing.html" style="font-size:12px;opacity:.65;font-weight:500">Gói cước & thanh toán</a>`;

  host.innerHTML = `
    ${brandHtml()}
    ${breadcrumbHtml()}
    <span class="ev-spacer"></span>
    ${quickLinksHtml(user)}
    <span id="ev-eng-slot"></span>
    <span id="ev-pet-slot"></span>
    <span id="ev-bell-slot"></span>
    <div class="ev-user-wrap" id="ev-user-wrap">
      <button class="ev-user" id="ev-user-btn" type="button" aria-haspopup="dialog" aria-expanded="false" title="Xem hồ sơ">
        <span class="ev-avatar">${avatarInner}</span>
        <span class="ev-user-text">
          <span class="ev-user-name">${esc(user.display_name)}${planPill(planId)}</span>
          <span class="ev-user-meta">${r.ico} ${r.label}${ageStr}</span>
        </span>
        <span class="ev-caret">▾</span>
      </button>
      <div class="ev-profile" role="dialog" aria-label="Hồ sơ tài khoản">
        <div class="pf-head">
          <span class="pf-avatar">${avatarInner}</span>
          <div>
            <div class="pf-name">${esc(user.display_name)}</div>
            <div class="pf-role">${r.ico} ${r.label}</div>
          </div>
        </div>

        <!-- Xem -->
        <div class="pf-view">
          <div class="pf-rows">
            <div class="pf-row"><span class="k">Tài khoản</span><span class="v">@${esc(user.username)}</span></div>
            <div class="pf-row"><span class="k">Vai trò</span><span class="v">${r.label}</span></div>
            ${gradeRow}
            ${majorRow}
            ${cohortRow}
            ${schoolRow}
            ${ageRow}
            ${emailRow}
            ${planRow}
            ${expireRow}
          </div>
          ${planCta}
          ${user.role === 'student'
            ? `<a class="ev-plan-cta" href="cv.html" style="background:linear-gradient(135deg,#0ea5e9,#22c55e);margin-top:10px">🪪 Xuất CV / Portfolio</a>`
            : ''}
          ${user.role === 'admin'
            ? `<a class="ev-plan-cta" href="admin.html" style="background:linear-gradient(135deg,#6366f1,#a855f7);margin-top:10px">Trang quản trị</a>`
            : ''}
          <div class="pf-divider" style="margin-top:14px"></div>
          <div class="pf-actions">
            <button class="pf-btn pf-edit-btn" id="ev-edit-btn" type="button">✏️ Chỉnh sửa</button>
            <button class="pf-btn pf-logout" id="ev-logout-btn" type="button">🚪 Đăng xuất</button>
          </div>
        </div>

        <!-- Sửa -->
        <form class="pf-edit" id="ev-edit-form">
          <div class="pf-err" id="ev-edit-err"></div>
          <div class="pf-field">
            <label>Tên hiển thị</label>
            <input id="ev-f-name" maxlength="60" required value="${esc(user.display_name)}" />
          </div>
          <div class="pf-field">
            <label>Tuổi</label>
            <input id="ev-f-age" type="number" min="3" max="100" inputmode="numeric" value="${user.age ?? ''}" />
          </div>
          <div class="pf-field">
            <label>Email (tuỳ chọn)</label>
            <input id="ev-f-email" type="email" maxlength="120" placeholder="ten@email.com" value="${esc(user.email || '')}" />
          </div>
          <div class="pf-actions">
            <button class="pf-btn pf-edit-btn" id="ev-cancel-btn" type="button">Huỷ</button>
            <button class="pf-btn pf-logout" id="ev-save-btn" type="submit" style="background:#16a34a">💾 Lưu</button>
          </div>
        </form>
      </div>
    </div>
  `;

  wireBackBtn(host);
  document.dispatchEvent(new CustomEvent('ev-header-mounted'));

  const wrap = host.querySelector('#ev-user-wrap');
  const btn = host.querySelector('#ev-user-btn');
  const profile = wrap.querySelector('.ev-profile');
  const close = () => { wrap.classList.remove('open'); profile.classList.remove('editing'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = wrap.classList.toggle('open');
    if (!open) profile.classList.remove('editing');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Click trong dialog không đóng; click ra ngoài / Esc → đóng.
  profile.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  host.querySelector('#ev-logout-btn')?.addEventListener('click', () => logout());

  // --- Chỉnh sửa hồ sơ ---
  host.querySelector('#ev-edit-btn')?.addEventListener('click', () => profile.classList.add('editing'));
  host.querySelector('#ev-cancel-btn')?.addEventListener('click', () => profile.classList.remove('editing'));
  const form = host.querySelector('#ev-edit-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errEl = host.querySelector('#ev-edit-err');
    const saveBtn = host.querySelector('#ev-save-btn');
    errEl.classList.remove('show');
    saveBtn.disabled = true; saveBtn.textContent = 'Đang lưu…';
    const res = await updateProfile({
      displayName: host.querySelector('#ev-f-name').value.trim(),
      age: Number(host.querySelector('#ev-f-age').value),
      email: host.querySelector('#ev-f-email').value.trim(),
    });
    if (res?.ok) {
      // Vẽ lại header với thông tin mới, mở lại dialog ở chế độ xem.
      render(host, res.user);
      host.querySelector('#ev-user-wrap')?.classList.add('open');
      host.querySelector('#ev-user-btn')?.setAttribute('aria-expanded', 'true');
    } else {
      errEl.textContent = res?.error || 'Lưu thất bại';
      errEl.classList.add('show');
      saveBtn.disabled = false; saveBtn.textContent = '💾 Lưu';
    }
  });
}

// Header phải sát cạnh trình duyệt. Nhiều trang set `body { padding: 24px 16px }`
// cho nội dung — nếu header là con của body thì bị đẩy vào trong. Đo padding
// của body rồi bù bằng margin âm để header tràn ra mép viewport, kệ trang đang
// padding bao nhiêu. Phải đo lại khi resize vì padding hay đổi theo @media.
function syncEdgeMargins(host) {
  if (!host || host.parentElement !== document.body) return;
  const cs = getComputedStyle(document.body);
  const pt = parseFloat(cs.paddingTop) || 0;
  const pl = parseFloat(cs.paddingLeft) || 0;
  const pr = parseFloat(cs.paddingRight) || 0;
  host.style.marginTop = pt ? `-${pt}px` : '';
  host.style.marginLeft = pl ? `-${pl}px` : '';
  host.style.marginRight = pr ? `-${pr}px` : '';
}

export async function mountAuthHeader() {
  if (document.body?.dataset?.noAuthHeader !== undefined) return null;
  try { if (window.top !== window.self) return null; } catch { /* cross-origin iframe */ return null; }
  injectStyle();
  // Cho phép trang định sẵn vị trí: <header id="auth-header"></header>; nếu không có
  // thì tự chèn vào đầu body.
  let host = document.getElementById('auth-header');
  if (!host) {
    host = document.createElement('header');
    host.id = 'auth-header';
    document.body.prepend(host);
  }
  host.className = 'ev-header';
  syncEdgeMargins(host);
  window.addEventListener('resize', () => syncEdgeMargins(host), { passive: true });
  // Vẽ tạm với cache (nếu có) để giảm nháy.
  const cached = currentUser();
  if (cached) render(host, cached);
  const user = await bootstrapMe({ redirectOnFail: false });
  render(host, user);
  syncEdgeMargins(host);
  return user;
}

// Auto-mount khi script được load.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAuthHeader);
} else {
  mountAuthHeader();
}
