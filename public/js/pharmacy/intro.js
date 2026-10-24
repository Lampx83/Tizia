// Màn hình giới thiệu "Pharmacomm" (CBS 20/07 #1) — hiện TRƯỚC khi vào nhà thuốc 3D.
// Giới thiệu phần mềm + mục tiêu học tập + DANH SÁCH TÌNH HUỐNG (thẻ). Người học bấm
// 1 thẻ → onPick(id) → startSimulation({ moduleId:id }).
//
// Self-contained: tự chèn <style> (dùng biến theme --card/--text… có sẵn ở cả trang
// Express lẫn Next, kèm màu dự phòng) nên KHÔNG phải sửa CSS ở 2 nơi. Dùng chung cho
// public/nha-thuoc-3d.html (Express) và web-next (Next) — 1 nguồn duy nhất.
import { SCENARIO_CARDS, SCENARIOS } from './scenarios.js?v=ph0924';
import { getStudent, setStudent, clearStudent, setGuest, isGuest } from './practice-client.js?v=ph0924';

// req #143: đã BỎ dải 4 ô "mục tiêu học tập" và phần mô tả dài dưới mỗi thẻ khỏi
// màn chọn tình huống theo yêu cầu của giảng viên — màn này chỉ còn danh sách tên
// tình huống để chọn, không hướng dẫn trước các bước bán thuốc.

function injectStyle() {
  if (document.getElementById('pharmacomm-intro-style')) return;
  const st = document.createElement('style');
  st.id = 'pharmacomm-intro-style';
  st.textContent = `
  .pc-intro { position: fixed; inset: 0; z-index: 3000; overflow: auto;
    background: var(--bg, #0f172a);
    background-image: radial-gradient(1200px 600px at 80% -10%, rgba(56,189,248,0.18), transparent 60%),
                      radial-gradient(1000px 500px at -10% 110%, rgba(13,148,136,0.16), transparent 60%);
    color: var(--text, #e2e8f0); font-family: 'Inter', system-ui, sans-serif;
    display: flex; align-items: flex-start; justify-content: center; padding: 32px 20px; }
  .pc-wrap { width: min(1080px, 100%); }
  .pc-brand { display: flex; align-items: center; gap: 14px; }
  .pc-logo { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; font-size: 28px;
    background: linear-gradient(135deg, var(--accent, #38bdf8), var(--accent-2, #0d9488)); color: #04121a; box-shadow: 0 8px 24px rgba(56,189,248,0.35); }
  .pc-title { margin: 0; font-size: 30px; font-weight: 800; letter-spacing: .2px; }
  .pc-title span { background: linear-gradient(90deg, var(--accent, #38bdf8), var(--green, #22c55e)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .pc-sub { margin: 3px 0 0; color: var(--muted, #94a3b8); font-size: 14px; }
  .pc-sec { margin: 26px 0 12px; font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .pc-sec small { color: var(--muted, #94a3b8); font-weight: 500; font-size: 12.5px; }
  .pc-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
  .pc-card { text-align: left; cursor: pointer; background: var(--card, #111827); border: 1px solid var(--border, #334155);
    border-radius: 16px; padding: 16px; color: inherit; font: inherit; display: flex; flex-direction: column; gap: 10px;
    transition: transform .12s ease, border-color .12s ease, box-shadow .12s ease; }
  .pc-card:hover, .pc-card:focus-visible { transform: translateY(-3px); border-color: var(--accent, #38bdf8);
    box-shadow: 0 12px 30px rgba(0,0,0,0.35); outline: none; }
  .pc-card-top { display: flex; align-items: center; gap: 10px; }
  .pc-card-ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; font-size: 24px; background: var(--card-h, #1e293b); flex: none; }
  .pc-card-code { font-weight: 800; font-size: 15px; }
  .pc-card-tag { font-size: 11px; color: var(--muted, #94a3b8); background: var(--card-h, #1e293b); border: 1px solid var(--border, #334155); padding: 1px 8px; border-radius: 999px; }
  .pc-card-title { font-weight: 700; font-size: 14.5px; line-height: 1.4; }
  .pc-card-go { margin-top: auto; align-self: flex-start; font-size: 12.5px; font-weight: 700; color: var(--accent, #38bdf8); }
  .pc-card:hover .pc-card-go { text-decoration: underline; }
  .pc-hist { font-size: 13px; color: var(--muted, #94a3b8); }
  .pc-ht { width: 100%; border-collapse: collapse; font-size: 12.5px; color: var(--text, #e2e8f0); }
  .pc-ht th, .pc-ht td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--border, #334155); }
  .pc-ht a { color: var(--accent, #38bdf8); }
  .pc-foot { margin: 22px 0 8px; color: var(--muted, #94a3b8); font-size: 12px; }
  /* Màn nhập thông tin sinh viên (#142 mục 2) — định danh tự khai, KHÔNG mật khẩu. */
  .pc-id { max-width: 520px; margin: 40px auto 0; background: var(--card, #111827);
    border: 1px solid var(--border, #334155); border-radius: 18px; padding: 26px 26px 22px; }
  .pc-id h2 { margin: 0 0 4px; font-size: 19px; font-weight: 800; letter-spacing: .4px; text-transform: uppercase; }
  .pc-id-sub { margin: 0 0 18px; color: var(--muted, #94a3b8); font-size: 12.5px; line-height: 1.55; }
  .pc-f { margin-bottom: 14px; }
  .pc-f label { display: block; font-size: 12.5px; font-weight: 700; margin-bottom: 6px; }
  .pc-f input { width: 100%; box-sizing: border-box; font: inherit; font-size: 14px; padding: 11px 13px;
    border-radius: 10px; border: 1px solid var(--border, #334155); background: var(--card-h, #1e293b); color: inherit; }
  .pc-f input:focus { outline: none; border-color: var(--accent, #38bdf8); }
  .pc-id-err { color: #f87171; font-size: 12.5px; min-height: 1.2em; margin: 2px 0 10px; }
  .pc-id-btn { width: 100%; cursor: pointer; font: inherit; font-size: 14.5px; font-weight: 800; color: #04121a;
    background: linear-gradient(135deg, var(--accent, #38bdf8), var(--green, #22c55e));
    border: 0; border-radius: 12px; padding: 13px 18px; letter-spacing: .3px; text-transform: uppercase; }
  .pc-id-btn:hover { filter: brightness(1.06); }
  /* Lối vào bằng tài khoản khách — nhẹ hơn nút chính để không lấn lối chuẩn (nhập mã SV). */
  .pc-id-or { display: flex; align-items: center; gap: 10px; margin: 14px 0 12px;
    color: var(--muted, #94a3b8); font-size: 12px; }
  .pc-id-or::before, .pc-id-or::after { content: ''; flex: 1; height: 1px; background: var(--border, #334155); }
  .pc-id-guest { width: 100%; cursor: pointer; font: inherit; font-size: 13.5px; font-weight: 700;
    color: inherit; background: transparent; border: 1px solid var(--border, #334155);
    border-radius: 12px; padding: 11px 16px; transition: border-color .12s, background .12s; }
  .pc-id-guest:hover { border-color: var(--accent, #38bdf8); background: var(--card-h, #1e293b); }
  .pc-id-guest small { display: block; margin-top: 3px; font-weight: 500; font-size: 11.5px; color: var(--muted, #94a3b8); }
  /* Thẻ danh tính hiển thị ở màn chọn tình huống (#142 mục 3). */
  .pc-who { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: 20px 0 0;
    background: var(--card, #111827); border: 1px solid var(--border, #334155); border-radius: 12px; padding: 11px 15px; font-size: 13px; }
  .pc-who b { font-weight: 800; }
  .pc-who .pc-who-sep { color: var(--muted, #94a3b8); }
  .pc-who button { margin-left: auto; cursor: pointer; font: inherit; font-size: 12.5px; color: inherit;
    background: var(--card-h, #1e293b); border: 1px solid var(--border, #334155); border-radius: 8px; padding: 6px 12px; }
  .pc-who button:hover { border-color: var(--accent, #38bdf8); }
  /* Ô gửi yêu cầu cho Ban điều hành AI (29/07): trang này trước đây KHÔNG có lối
     gửi yêu cầu — FAB gốc bị CSS ẩn, nút thay thế lại chèn vào header cũ nên bản
     Next không có. Đặt hẳn một ô ngay màn giới thiệu cho thầy cô/SV dễ thấy. */
  .pc-ask { margin-top: 26px; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
    background: linear-gradient(135deg, rgba(124,58,237,0.14), rgba(79,70,229,0.10));
    border: 1px solid rgba(124,58,237,0.45); border-radius: 16px; padding: 16px 18px; }
  .pc-ask-ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; font-size: 24px;
    background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; flex: none; }
  .pc-ask-txt { flex: 1 1 260px; }
  .pc-ask-h { font-weight: 700; font-size: 14.5px; }
  .pc-ask-d { color: var(--muted, #94a3b8); font-size: 12.5px; line-height: 1.55; margin-top: 4px; }
  .pc-ask-btn { cursor: pointer; font: inherit; font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap;
    background: linear-gradient(135deg, #7c3aed, #4f46e5); border: 0; border-radius: 10px; padding: 10px 16px;
    transition: transform .12s ease, filter .12s ease; }
  .pc-ask-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
  /* Màn CHỌN VAI TRÒ (req #143 mục 1): hai lối vào riêng biệt. */
  .pc-roles { max-width: 720px; margin: 40px auto 0; display: grid; gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .pc-role { text-align: left; cursor: pointer; font: inherit; color: inherit;
    background: var(--card, #111827); border: 1px solid var(--border, #334155);
    border-radius: 18px; padding: 24px 22px; display: flex; flex-direction: column; gap: 8px;
    transition: transform .12s, border-color .12s, box-shadow .12s; }
  .pc-role:hover { transform: translateY(-3px); border-color: var(--accent, #38bdf8);
    box-shadow: 0 14px 34px rgba(0,0,0,.35); }
  .pc-role-ic { font-size: 34px; }
  .pc-role-h { font-size: 17px; font-weight: 800; }
  .pc-role-d { color: var(--muted, #94a3b8); font-size: 12.5px; line-height: 1.55; }
  .pc-role-go { margin-top: 6px; font-size: 12.5px; font-weight: 700; color: var(--accent, #38bdf8); }
  @media (max-width: 560px) { .pc-title { font-size: 24px; } .pc-intro { padding: 20px 14px; } }
  `;
  document.head.appendChild(st);
}

// Màn CHỌN VAI TRÒ (req #143 mục 1) — màn hình ĐẦU TIÊN của phần mềm.
// Hai lối vào tách bạch: sinh viên chỉ khai thông tin (không mật khẩu), giảng viên
// phải đăng nhập. Sinh viên KHÔNG có cách nào chọn vai trò giảng viên từ đây —
// bấm sang bên kia vẫn phải có đúng tên đăng nhập + mật khẩu do máy chủ kiểm.
export function showRolePicker(onDone) {
  injectStyle();
  document.title = 'Pharmacomm — Nhà thuốc GPP 3D · Tizia';
  const overlay = document.createElement('div');
  overlay.className = 'pc-intro';
  overlay.innerHTML = `
    <div class="pc-wrap">
      <div class="pc-brand">
        <div class="pc-logo">⚕️</div>
        <div>
          <h1 class="pc-title"><span>Pharmacomm</span></h1>
          <p class="pc-sub">Phần mềm mô phỏng thực hành giao tiếp & bán thuốc tại nhà thuốc GPP</p>
        </div>
      </div>
      <div class="pc-roles">
        <button class="pc-role" type="button" data-role="student">
          <div class="pc-role-ic">🎓</div>
          <div class="pc-role-h">Sinh viên thực hành</div>
          <div class="pc-role-d">Khai họ tên, lớp và mã sinh viên rồi vào thực hành ngay. Không cần đăng ký tài khoản, không cần mật khẩu.</div>
          <span class="pc-role-go">Vào thực hành →</span>
        </button>
        <button class="pc-role" type="button" data-role="teacher">
          <div class="pc-role-ic">🧑‍🏫</div>
          <div class="pc-role-h">Giảng viên đăng nhập</div>
          <div class="pc-role-d">Xem lớp, danh sách sinh viên, lịch sử thực hành, hội thoại, thao tác 3D và điểm. Cần tên đăng nhập và mật khẩu.</div>
          <span class="pc-role-go">Đăng nhập →</span>
        </button>
      </div>
    </div>
  `;
  overlay.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-role]');
    if (!btn) return;
    if (btn.dataset.role === 'teacher') { location.href = '/pharmacomm-giang-vien.html'; return; }
    overlay.remove();
    showStudentForm(onDone);
  });
  document.body.appendChild(overlay);
}

export function showStudentForm(onDone) {
  injectStyle();
  document.title = 'Thông tin sinh viên — Pharmacomm · Tizia';
  const overlay = document.createElement('div');
  overlay.className = 'pc-intro';
  overlay.innerHTML = `
    <div class="pc-wrap">
      <div class="pc-brand">
        <div class="pc-logo">⚕️</div>
        <div>
          <h1 class="pc-title"><span>Pharmacomm</span></h1>
          <p class="pc-sub">Phần mềm mô phỏng thực hành giao tiếp & bán thuốc tại nhà thuốc GPP</p>
        </div>
      </div>
      <form class="pc-id" novalidate>
        <h2>Thông tin sinh viên</h2>
        <p class="pc-id-sub">Nhập thông tin để hệ thống ghi lại bài thực hành và chấm điểm cho đúng người. Không cần đăng ký tài khoản, không cần mật khẩu.</p>
        <div class="pc-f">
          <label for="pc-code">Mã sinh viên <span style="color:#f87171">*</span></label>
          <input id="pc-code" name="code" autocomplete="off" placeholder="VD: DH2101" />
        </div>
        <div class="pc-f">
          <label for="pc-name">Họ và tên <span style="color:#f87171">*</span></label>
          <input id="pc-name" name="name" autocomplete="name" placeholder="VD: Nguyễn Văn A" />
        </div>
        <div class="pc-f">
          <label for="pc-class">Lớp <span style="color:#f87171">*</span></label>
          <input id="pc-class" name="class" autocomplete="off" placeholder="VD: D5A" />
        </div>
        <div class="pc-id-err" data-err></div>
        <button class="pc-id-btn" type="submit">Vào thực hành</button>
        <div class="pc-id-or">hoặc</div>
        <button class="pc-id-guest" type="button" data-guest>👤 Vào bằng tài khoản khách
          <small>Dùng thử ngay, không cần nhập thông tin. Bài làm vẫn được chấm nhưng ghi tên “Khách”.</small>
        </button>
      </form>
    </div>
  `;
  const form = overlay.querySelector('form');
  const err = overlay.querySelector('[data-err]');
  overlay.querySelector('[data-guest]')?.addEventListener('click', () => {
    setGuest();
    overlay.remove();
    onDone();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = form.code.value, name = form.name.value, cls = form.class.value;
    // Mục 2: không cho tiếp tục nếu thiếu một trong ba thông tin.
    const missing = [!code.trim() && 'mã sinh viên', !name.trim() && 'họ và tên', !cls.trim() && 'lớp'].filter(Boolean);
    if (missing.length) { err.textContent = `Vui lòng nhập ${missing.join(', ')}.`; return; }
    if (!setStudent({ studentCode: code, studentName: name, className: cls })) {
      err.textContent = 'Thông tin chưa hợp lệ, bạn kiểm tra lại giúp nhé.'; return;
    }
    overlay.remove();
    onDone();
  });
  document.body.appendChild(overlay);
  overlay.querySelector('#pc-code')?.focus();
}

// showIntro({ moduleId, onPick }) — nếu URL đã chỉ định ?module=<id> hợp lệ thì BỎ QUA
// màn giới thiệu (deep-link vào thẳng tình huống). Ngược lại dựng màn chọn tình huống.
export function showIntro({ moduleId, onPick }) {
  const valid = moduleId && SCENARIOS && SCENARIOS[moduleId];
  const explicit = new URLSearchParams(location.search).has('module');
  // #142 mục 2: phải có định danh sinh viên TRƯỚC khi vào thực hành — kể cả khi
  // vào thẳng bằng ?module=… (nếu không sẽ không gắn được phiên với người học).
  // req #143: màn ĐẦU TIÊN là chọn vai trò (SV thực hành / GV đăng nhập).
  if (!getStudent()) { showRolePicker(() => showIntro({ moduleId, onPick })); return; }
  if (valid && explicit) { onPick(moduleId); return; }

  injectStyle();
  // Tiêu đề trang: bản Next đặt title chung "Tizia — Vũ trụ giáo dục ảo" nên yêu cầu
  // gửi từ đây không nói được là trang nào. Đặt tên thật để ngữ cảnh kèm theo rõ ràng.
  document.title = 'Pharmacomm — Nhà thuốc GPP 3D · Tizia';
  const cards = (SCENARIO_CARDS && SCENARIO_CARDS.length)
    ? SCENARIO_CARDS
    : Object.values(SCENARIOS || {}).map(s => ({ id: s.id, code: s.code || s.id, tag: s.npcRole || '', icon: '🧪', title: s.title, desc: s.setting }));

  const overlay = document.createElement('div');
  overlay.className = 'pc-intro';
  overlay.innerHTML = `
    <div class="pc-wrap">
      <div class="pc-brand">
        <div class="pc-logo">⚕️</div>
        <div>
          <h1 class="pc-title"><span>Pharmacomm</span></h1>
          <p class="pc-sub">Phần mềm mô phỏng thực hành giao tiếp & bán thuốc tại nhà thuốc GPP</p>
        </div>
      </div>

      <div class="pc-who">
        ${isGuest()
          ? `<span>👤 <b>Khách</b></span>
             <span class="pc-who-sep">·</span><span>Bài làm vẫn được chấm, nhưng ghi tên “Khách”.</span>
             <button type="button" data-switch>Nhập mã sinh viên</button>`
          : `<span>🎓 <b>${(getStudent()?.studentName) || ''}</b></span>
             <span class="pc-who-sep">·</span><span>Mã SV: <b>${(getStudent()?.studentCode) || ''}</b></span>
             <span class="pc-who-sep">·</span><span>Lớp: <b>${(getStudent()?.className) || ''}</b></span>
             <button type="button" data-switch>Đổi người học</button>`}
      </div>

      <div class="pc-sec">🎬 Chọn tình huống mô phỏng <small>· bấm một thẻ để bắt đầu</small></div>
      <div class="pc-cards">
        ${cards.map(c => `
          <button class="pc-card" type="button" data-id="${c.id}">
            <div class="pc-card-top">
              <div class="pc-card-ic">${c.icon || '🧪'}</div>
              <div>
                <div class="pc-card-code">${c.code || c.id}</div>
                ${c.tag ? `<span class="pc-card-tag">${c.tag}</span>` : ''}
              </div>
            </div>
            <div class="pc-card-title">${c.title || ''}</div>
            <span class="pc-card-go">▶ Bắt đầu thực hành</span>
          </button>`).join('')}
      </div>

      ${isGuest() ? '' : `<div class="pc-sec">🕘 Lịch sử thực hành của bạn <small>· mỗi lần thực hành là một lượt riêng, bấm để xem chi tiết</small></div><div id="pc-hist" class="pc-hist">Đang tải…</div>`}

      <div class="pc-ask">
        <div class="pc-ask-ic">🏛️</div>
        <div class="pc-ask-txt">
          <div class="pc-ask-h">Góp ý cho phần mềm này?</div>
          <div class="pc-ask-d">Gửi yêu cầu tới Ban điều hành AI: sửa lời thoại bệnh nhân, thêm tình huống mới, chỉnh thuốc hay báo lỗi. Yêu cầu tự kèm tên trang này để AI biết sửa đúng chỗ; kèm được cả ảnh chụp và file Word.</div>
        </div>
        <button class="pc-ask-btn" type="button" data-ask>✍️ Gửi yêu cầu</button>
      </div>

    </div>
  `;

  overlay.addEventListener('click', (e) => {
    // Nút gửi yêu cầu: bấm hộ vào FAB gốc (#sgf-fab) — nút đó bị CSS trang này ẩn
    // nhưng vẫn nằm trong DOM và click bằng script vẫn mở đúng modal Ban điều hành AI.
    // KHÔNG đóng màn giới thiệu để người dùng gửi xong còn chọn tình huống tiếp.
    if (e.target.closest('[data-switch]')) {
      clearStudent();
      overlay.remove();
      showStudentForm(() => showIntro({ moduleId, onPick }));
      return;
    }
    if (e.target.closest('[data-ask]')) {
      const fab = document.getElementById('sgf-fab');
      if (fab) fab.click();
      else alert('Chưa mở được ô gửi yêu cầu. Bạn thử tải lại trang giúp nhé.');
      return;
    }
    const btn = e.target.closest('.pc-card');
    if (!btn) return;
    const id = btn.dataset.id;
    overlay.remove();
    onPick(id);
  });

  document.body.appendChild(overlay);
  loadHistory(overlay);
}

// req #227: lịch sử ĐẦY ĐỦ các lượt (mới nhất trước), mỗi lượt một dòng riêng có mã lượt, giờ bắt đầu/kết thúc, điểm.
async function loadHistory(overlay) {
  const box = overlay.querySelector('#pc-hist');
  const st = getStudent();
  if (!box || !st) return;
  const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const vn = (ms) => { if (!ms) return '—'; const d = new Date(Number(ms) + 7 * 3600 * 1000), p = (n) => String(n).padStart(2, '0'); return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())} ${p(d.getUTCDate())}/${p(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`; };
  try {
    const r = await fetch('/api/pharmacy/practice/history?code=' + encodeURIComponent(st.studentCode));
    const d = await r.json();
    const items = d.items || [];
    if (!items.length) { box.textContent = 'Chưa có lượt thực hành nào.'; return; }
    box.innerHTML = `<table class="pc-ht"><thead><tr><th>Mã lượt</th><th>Tình huống</th><th>Bắt đầu</th><th>Kết thúc</th><th>Điểm</th></tr></thead><tbody>${items.map((s) => `<tr>
      <td><a href="/pharmacomm-ket-qua.html?session=${encodeURIComponent(s.session_id)}">${esc(String(s.session_id).slice(0, 8))}</a></td>
      <td>${esc(s.scenario_code)}</td><td>${vn(s.started_at)}</td><td>${vn(s.completed_at)}</td>
      <td>${s.status === 'completed' ? esc(s.total_score) : (s.status === 'in_progress' ? 'Chưa chấm' : esc(s.status))}</td></tr>`).join('')}</tbody></table>`;
  } catch { box.textContent = 'Không tải được lịch sử.'; }
}
