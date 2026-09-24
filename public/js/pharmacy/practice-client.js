// =====================================================================
// Pharmacomm — phía trình duyệt: giữ định danh sinh viên + ghi hội thoại và
// thao tác 3D lên máy chủ NGAY khi phát sinh (yêu cầu #142, mục 5, 6, 14).
//
// Tách riêng khỏi simulation.js để phần mô phỏng 3D chỉ phải gọi 2 hàm
// logMessage()/logAction() — không phải biết gì về lưu trữ.
//
// Trạng thái phiên nằm ở sessionStorage → TẢI LẠI TRANG không mất phiên và
// không đánh số lại từ đầu (mục 14: "Không làm mất hội thoại khi tải lại
// trang"; số thứ tự trùng bị máy chủ bỏ qua nhờ ràng buộc UNIQUE).
// =====================================================================

import { ALL_DRUGS } from './catalog.js?v=ph0804';

const STUDENT_KEY = 'pharmacomm:student';   // localStorage — nhớ giữa các lượt
const STATE_KEY = 'pharmacomm:practice';    // sessionStorage — theo tab

const readJson = (store, key) => { try { return JSON.parse(store.getItem(key) || 'null'); } catch { return null; } };
const writeJson = (store, key, v) => { try { store.setItem(key, JSON.stringify(v)); } catch {} };

// ---- định danh sinh viên (mục 2) ------------------------------------
export function getStudent() {
  const s = readJson(localStorage, STUDENT_KEY);
  return s && s.studentCode && s.studentName && s.className ? s : null;
}
export function setStudent({ studentCode, studentName, className }) {
  // Mục 2: bỏ khoảng trắng thừa, mã sinh viên chuẩn hoá thành chữ in hoa.
  const s = {
    studentCode: String(studentCode || '').replace(/\s+/g, ' ').trim().toUpperCase(),
    studentName: String(studentName || '').replace(/\s+/g, ' ').trim(),
    className: String(className || '').replace(/\s+/g, ' ').trim(),
  };
  if (!s.studentCode || !s.studentName || !s.className) return null;
  writeJson(localStorage, STUDENT_KEY, s);
  return s;
}
export function clearStudent() { try { localStorage.removeItem(STUDENT_KEY); } catch {} }

// Vào bằng TÀI KHOẢN KHÁCH: không cần mã SV / họ tên / lớp — dùng cho người ghé
// thử phần mềm. Bài của khách vẫn được lưu và chấm bình thường, nhưng mang mã
// KHACH nên giảng viên lọc ra khỏi danh sách sinh viên thật dễ dàng. Danh tính
// khách do MÁY CHỦ áp lại (server/pharmacy-practice.js) — client không tự đặt tên.
export const GUEST_CODE = 'KHACH';
export function setGuest() {
  const g = { studentCode: GUEST_CODE, studentName: 'Khách', className: 'Khách', guest: true };
  writeJson(localStorage, STUDENT_KEY, g);
  return g;
}
export function isGuest() { return getStudent()?.guest === true; }

// ---- phiên thực hành -------------------------------------------------
let state = readJson(sessionStorage, STATE_KEY) || null;
const save = () => writeJson(sessionStorage, STATE_KEY, state);

export function getPracticeId() { return state?.practiceId || null; }
export function getPracticeState() { return state; }

// Tạo phiên thực hành mới. `guard` chống bấm nhiều lần tạo nhiều phiên (mục 14).
let creating = null;
export async function startPractice({ moduleId, chatSessionId }) {
  const st = getStudent();
  if (!st) throw new Error('Chưa có thông tin sinh viên.');
  // Cùng tình huống + phiên còn DỞ (chưa bấm "Kết thúc và chấm điểm") trong tab này → dùng lại.
  // req #227: phiên ĐÃ KẾT THÚC thì tuyệt đối không dùng lại — trước đây lượt sau lấy lại đúng mã lượt
  // cũ (bị khoá) nên hội thoại/thao tác không ghi được và trang kết quả hiện điểm lượt đầu.
  if (state && state.finished) endPracticeLocal();
  if (state && state.moduleId === moduleId && state.practiceId) return state.practiceId;
  if (creating) return creating;
  creating = (async () => {
    const r = await fetch('/api/pharmacy/practice/session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...st, moduleId, chatSessionId }),
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Không tạo được phiên thực hành.');
    state = { practiceId: d.sessionId, moduleId, msgOrder: 0, actOrder: 0, finished: false };
    save();
    return state.practiceId;
  })();
  try { return await creating; } finally { creating = null; }
}

export function endPracticeLocal() { state = null; try { sessionStorage.removeItem(STATE_KEY); } catch {} }

// Hàng đợi ghi: gửi TUẦN TỰ để số thứ tự luôn tăng dần và không chen nhau.
// Lỗi mạng ngắn hạn → thử lại 2 lần rồi bỏ qua (không chặn người học thao tác).
let chain = Promise.resolve();
function enqueue(fn) {
  chain = chain.then(fn).catch(() => {});
  return chain;
}
async function postRetry(url, body, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (r.ok) return true;
      if (r.status === 400 || r.status === 404 || r.status === 409) return false;  // lỗi cố định → thôi
    } catch {}
    await new Promise((s) => setTimeout(s, 400 * (i + 1)));
  }
  return false;
}

// Mục 5 — lưu ngay sau mỗi lượt trao đổi, không đợi kết thúc tình huống.
export function logMessage(speaker, content) {
  if (!state?.practiceId || state.finished) return;
  const order = state.msgOrder++;
  save();
  return enqueue(() => postRetry('/api/pharmacy/practice/message', {
    sessionId: state.practiceId, speaker, content, order,
  }));
}

// Bổ sung TÊN THUỐC và thông tin chuyên môn vào thao tác. Cảnh 3D chỉ gửi
// `drugId` nên nhật ký hiện mã trần ("otck-041") — mục 7 đặc tả yêu cầu ghi rõ
// tên đối tượng, hàm lượng, dạng bào chế, hạn dùng để giảng viên đọc hiểu ngay.
function enrich(payload) {
  const p = { ...(payload || {}) };
  const id = p.drugId || p.objectId;
  if (!id || p.drugName) return p;
  const d = ALL_DRUGS.find((x) => x.id === id);
  if (!d) return p;
  p.drugName = d.name || d.brand || id;
  if (d.strength && !p.strength) p.strength = d.strength;
  if (d.form && !p.form) p.form = d.form;
  if (d.expiry && !p.expiry) p.expiry = d.expiry;
  return p;
}

// Mục 6 — chỉ thao tác CÓ Ý NGHĨA đánh giá (không lưu chuột/camera/khung hình).
export function logAction(type, payload, result) {
  if (!state?.practiceId || state.finished) return;
  const order = state.actOrder++;
  save();
  const p = enrich(payload);
  return enqueue(() => postRetry('/api/pharmacy/practice/action', {
    sessionId: state.practiceId, type, payload: p, order, result: result || 'success',
  }));
}

// Mục 9 — kết thúc và chấm điểm. Đợi hàng đợi ghi trôi hết rồi mới khoá phiên,
// tránh mất lời thoại/thao tác cuối cùng.
export async function finishPractice() {
  if (!state?.practiceId) throw new Error('Chưa có phiên thực hành.');
  const id = state.practiceId;
  await chain;
  state.finished = true; save();
  const r = await fetch('/api/pharmacy/practice/finish', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId: id }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'Chấm điểm lỗi.');
  endPracticeLocal();   // req #227: lượt này xong — lượt sau phải tạo mã lượt MỚI
  // Máy chủ chỉ nhận việc rồi chấm ở nền (mất 60–120s) — trang kết quả sẽ tự
  // theo dõi tiến độ, ở đây không đợi.
  return { sessionId: id, status: d.status || 'scoring' };
}
