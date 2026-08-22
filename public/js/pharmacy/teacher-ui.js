// Khu giảng viên Pharmacomm (req #143 mục 2). Chỉ là lớp hiển thị — MỌI quyền do
// máy chủ kiểm (requireTeacher → 403). Ẩn/hiện ở đây chỉ để dễ dùng, không phải
// biện pháp bảo mật: gõ thẳng URL API mà chưa đăng nhập vẫn bị 403.
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const api = async (path, opt) => {
  const r = await fetch(path, { credentials: 'same-origin', ...opt });
  let d = null; try { d = await r.json(); } catch {}
  return { ok: r.ok, status: r.status, data: d };
};
// Giờ Việt Nam (UTC+7) — đặc tả mục 14.
const vn = (ms) => {
  if (!ms) return '—';
  const d = new Date(Number(ms) + 7 * 3600 * 1000);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())} ${p(d.getUTCDate())}/${p(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
};
const dur = (ms) => ms ? `${Math.floor(ms / 60000)}p${String(Math.floor(ms % 60000 / 1000)).padStart(2, '0')}` : '—';
const statusPill = (s) => {
  const map = { completed: ['done', 'Đã chấm xong'], in_progress: ['run', 'Đang làm'], scoring: ['run', 'Đang chấm'], scoring_failed: ['fail', 'Chấm lỗi'] };
  const [cls, txt] = map[s] || ['', s || '—'];
  return `<span class="pill ${cls}">${esc(txt)}</span>`;
};

let ME = null;
let tab = 'classes';
const filters = { class: '', q: '', kind: 'STUDENT' };

// ---- đăng nhập ------------------------------------------------------
$('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('login-err').textContent = '';
  const r = await api('/api/pharmacy/teacher/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: $('u').value, password: $('p').value }),
  });
  if (!r.ok) { $('login-err').textContent = r.data?.error || 'Không đăng nhập được.'; return; }
  ME = r.data;
  showAdmin();
});

$('btn-out').addEventListener('click', async () => {
  await api('/api/pharmacy/teacher/logout', { method: 'POST' });
  location.reload();
});

// Chạy thử tình huống: mở đúng giao diện sinh viên. Máy chủ tự nhận ra cookie
// giảng viên và đánh dấu lượt là TEACHER_TEST, không lẫn vào dữ liệu sinh viên.
$('btn-try').addEventListener('click', () => { location.href = '/nha-thuoc-3d'; });

// ---- đổi mật khẩu ---------------------------------------------------
$('btn-pw').addEventListener('click', () => $('pw-box').classList.toggle('hide'));
$('pw-save').addEventListener('click', async () => {
  const msg = $('pw-msg');
  msg.className = 'err'; msg.textContent = '';
  const r = await api('/api/pharmacy/teacher/password', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldPassword: $('pw-old').value, newPassword: $('pw-new').value }),
  });
  if (!r.ok) { msg.textContent = r.data?.error || 'Không đổi được mật khẩu.'; return; }
  msg.className = 'ok'; msg.textContent = '✓ Đã đổi mật khẩu.';
  $('pw-old').value = $('pw-new').value = '';
});

// ---- khung quản lý --------------------------------------------------
function showAdmin() {
  $('login').classList.add('hide');
  $('admin').classList.remove('hide');
  $('who-name').textContent = ME.displayName || ME.username;
  if (ME.mustChangePassword) {
    $('pw-box').classList.remove('hide');
    $('pw-msg').className = 'err';
    $('pw-msg').textContent = 'Đây là mật khẩu tạm do hệ thống cấp — cô hãy đổi ngay.';
  }
  render();
}

document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x === b));
  tab = b.dataset.tab;
  render();
}));

async function render() {
  const p = $('panel');
  p.innerHTML = '<div class="empty">Đang tải…</div>';
  if (tab === 'classes') return renderClasses(p);
  if (tab === 'students') return renderStudents(p);
  if (tab === 'sessions') return renderSessions(p);
  if (tab === 'logs') return renderLogs(p);
}

async function renderClasses(p) {
  const r = await api('/api/pharmacy/teacher/classes');
  if (!r.ok) return p.innerHTML = `<div class="empty">${esc(r.data?.error || 'Lỗi tải dữ liệu')}</div>`;
  const rows = r.data.classes || [];
  if (!rows.length) return p.innerHTML = '<div class="empty">Chưa có lớp nào — chưa sinh viên nào thực hành.</div>';
  p.innerHTML = `
    <div class="note">Chỉ đếm lượt của <b>sinh viên</b>. Lượt chạy thử của giảng viên và lượt khách được tách riêng, không tính vào đây.</div>
    <table><thead><tr><th>Lớp</th><th>Số sinh viên</th><th>Số lượt</th><th>Gần nhất</th><th></th></tr></thead><tbody>
    ${rows.map((c) => `<tr class="click" data-class="${esc(c.class_name)}">
      <td><b>${esc(c.class_name)}</b></td><td>${c.so_sinh_vien}</td><td>${c.so_luot}</td>
      <td>${vn(c.gan_nhat)}</td><td style="text-align:right"><span class="pill">Xem sinh viên →</span></td></tr>`).join('')}
    </tbody></table>`;
  p.querySelectorAll('tr.click').forEach((tr) => tr.addEventListener('click', () => {
    filters.class = tr.dataset.class; filters.q = '';
    document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x.dataset.tab === 'students'));
    tab = 'students'; render();
  }));
}

function filterBar(showQ) {
  return `<div class="filters">
    <div class="f"><label>Lớp</label><input id="fl-class" value="${esc(filters.class)}" placeholder="Tất cả lớp" /></div>
    ${showQ ? `<div class="f"><label>Tìm (họ tên / mã SV)</label><input id="fl-q" value="${esc(filters.q)}" placeholder="VD: DH2101 hoặc Nguyễn" /></div>` : ''}
    <div class="f"><label>Loại lượt</label><select id="fl-kind">
      <option value="STUDENT">Sinh viên</option>
      <option value="TEACHER_TEST">Giảng viên chạy thử</option>
      <option value="GUEST">Khách dùng thử</option></select></div>
    <button class="btn sm" id="fl-go">Lọc</button>
    <button class="btn ghost sm" id="fl-csv">⬇️ Xuất CSV</button>
  </div>`;
}
function wireFilters() {
  const kind = $('fl-kind'); if (kind) kind.value = filters.kind;
  $('fl-go')?.addEventListener('click', () => {
    filters.class = $('fl-class')?.value.trim() || '';
    filters.q = $('fl-q')?.value.trim() || '';
    filters.kind = $('fl-kind')?.value || 'STUDENT';
    render();
  });
  $('fl-csv')?.addEventListener('click', () => {
    const qs = new URLSearchParams({ class: filters.class, kind: $('fl-kind')?.value || filters.kind });
    location.href = '/api/pharmacy/teacher/export.csv?' + qs;
  });
}

async function renderStudents(p) {
  const qs = new URLSearchParams({ class: filters.class, q: filters.q });
  const r = await api('/api/pharmacy/teacher/students?' + qs);
  if (!r.ok) return p.innerHTML = `<div class="empty">${esc(r.data?.error || 'Lỗi tải dữ liệu')}</div>`;
  const rows = r.data.students || [];
  p.innerHTML = filterBar(true) + (rows.length ? `
    <table><thead><tr><th>Mã SV</th><th>Họ và tên</th><th>Lớp</th><th>Số lượt</th><th>Điểm TB</th><th>Gần nhất</th><th></th></tr></thead><tbody>
    ${rows.map((s) => `<tr class="click" data-code="${esc(s.student_code)}">
      <td><b>${esc(s.student_code)}</b></td><td>${esc(s.student_name)}</td><td>${esc(s.class_name)}</td>
      <td>${s.so_luot}</td><td>${s.diem_tb ?? '—'}</td><td>${vn(s.gan_nhat)}</td>
      <td style="text-align:right"><span class="pill">Xem lượt →</span></td></tr>`).join('')}
    </tbody></table>` : '<div class="empty">Không có sinh viên nào khớp bộ lọc.</div>');
  wireFilters();
  p.querySelectorAll('tr.click').forEach((tr) => tr.addEventListener('click', () => {
    filters.student = tr.dataset.code;
    document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('on', x.dataset.tab === 'sessions'));
    tab = 'sessions'; render();
  }));
}

async function renderSessions(p) {
  const qs = new URLSearchParams({ class: filters.class, student: filters.student || '', kind: filters.kind });
  const r = await api('/api/pharmacy/teacher/sessions?' + qs);
  if (!r.ok) return p.innerHTML = `<div class="empty">${esc(r.data?.error || 'Lỗi tải dữ liệu')}</div>`;
  const rows = r.data.sessions || [];
  p.innerHTML = filterBar(false)
    + (filters.student ? `<div class="note">Đang lọc theo sinh viên <b>${esc(filters.student)}</b> — <a href="#" id="clr">bỏ lọc</a></div>` : '')
    + (rows.length ? `
    <table><thead><tr><th>Thời điểm</th><th>Mã SV</th><th>Họ và tên</th><th>Lớp</th><th>Tình huống</th><th>Thời gian</th><th>Điểm</th><th>Trạng thái</th><th></th></tr></thead><tbody>
    ${rows.map((s) => `<tr>
      <td>${vn(s.started_at)}</td><td><b>${esc(s.student_code)}</b></td><td>${esc(s.student_name)}</td>
      <td>${esc(s.class_name)}</td><td>${esc(s.scenario_code)}</td><td>${dur(s.duration_ms)}</td>
      <td><b>${s.total_score ?? '—'}</b></td><td>${statusPill(s.status)}</td>
      <td style="text-align:right"><a class="pill" href="/pharmacomm-ket-qua.html?session=${encodeURIComponent(s.session_id)}" target="_blank">Xem chi tiết →</a></td>
    </tr>`).join('')}
    </tbody></table>` : '<div class="empty">Không có lượt thực hành nào khớp bộ lọc.</div>');
  wireFilters();
  $('clr')?.addEventListener('click', (e) => { e.preventDefault(); filters.student = ''; render(); });
}

async function renderLogs(p) {
  const r = await api('/api/pharmacy/teacher/logs');
  if (!r.ok) return p.innerHTML = `<div class="empty">${esc(r.data?.error || 'Lỗi tải dữ liệu')}</div>`;
  const rows = r.data.logs || [];
  p.innerHTML = `<div class="note">Nhật ký các lần đăng nhập, xem và xuất dữ liệu (200 dòng gần nhất).</div>`
    + (rows.length ? `<table><thead><tr><th>Thời điểm</th><th>Tài khoản</th><th>Hành động</th><th>Chi tiết</th><th>IP</th></tr></thead><tbody>
    ${rows.map((l) => `<tr><td>${vn(l.created_at)}</td><td>${esc(l.username || '—')}</td>
      <td><span class="pill">${esc(l.action)}</span></td><td>${esc(l.detail || '')}</td><td>${esc(l.ip || '')}</td></tr>`).join('')}
    </tbody></table>` : '<div class="empty">Chưa có nhật ký.</div>');
}

// Đã đăng nhập sẵn (cookie còn hạn) → vào thẳng khu quản lý.
(async () => {
  const r = await api('/api/pharmacy/teacher/me');
  if (r.ok) { ME = r.data; showAdmin(); }
})();
