// GPP 2D — client lưu trạng thái + gọi API /api/gpp/*.
// Định danh nghiên cứu giữ ở localStorage để không phải nhập lại mỗi lần vào.
const LS = 'gpp_participant_v1';

export const state = {
  participantId: null,
  sessionId: null,
  studentCode: null,
  yearLevel: null,
  className: null,
  studyGroup: null,
  unlocked: { 1: true, 2: false, 3: false, 4: false }, // Cấp 1 mở sẵn; mở dần theo mastery
  scores: {}, // level -> %
  testMode: false, // chế độ dùng thử: mở sẵn 4 cấp, không cần khai báo/đăng nhập
};

// Bật chế độ dùng thử — vào thẳng, mở hết cấp, không lưu nghiên cứu.
export function enterTestMode() {
  Object.assign(state, {
    studentCode: 'KHACH-TEST', className: null, yearLevel: 3, studyGroup: null,
    participantId: null, sessionId: 'test_' + Date.now().toString(36),
    testMode: true, offline: true,
    unlocked: { 1: true, 2: true, 3: true, 4: true },
  });
  saveLocal();
}

export function loadLocal() {
  try {
    const s = JSON.parse(localStorage.getItem(LS) || 'null');
    if (s && s.studentCode) Object.assign(state, s);
  } catch {}
}
export function saveLocal() {
  try {
    localStorage.setItem(LS, JSON.stringify({
      participantId: state.participantId, sessionId: state.sessionId,
      studentCode: state.studentCode, yearLevel: state.yearLevel,
      className: state.className, studyGroup: state.studyGroup,
      unlocked: state.unlocked, scores: state.scores, offline: state.offline, testMode: state.testMode,
    }));
  } catch {}
}

async function post(path, body) {
  const r = await fetch(path, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  return r.json().catch(() => ({ ok: false }));
}

export async function enroll({ studentCode, fullName, className, yearLevel, studyGroup }) {
  let res;
  try { res = await post('/api/gpp/enroll', { studentCode, fullName, className, yearLevel, studyGroup }); }
  catch { res = { ok: false }; }
  Object.assign(state, { studentCode, className, yearLevel, studyGroup });
  if (res && res.ok) {
    state.participantId = res.participantId; state.sessionId = res.sessionId; state.offline = false;
  } else {
    // Degrade graceful: vẫn cho luyện tập, tiến trình lưu ở máy; sẽ đồng bộ lại
    // khi server sẵn sàng (server tra participant theo mã SV nên không mất dấu).
    state.participantId = null; state.sessionId = 'local_' + Date.now().toString(36); state.offline = true;
  }
  saveLocal();
  return { ok: true, offline: !!state.offline };
}

// Nhật ký hệ thống — không chặn UI, nuốt lỗi mạng.
export function logEvent(ev) {
  try {
    post('/api/gpp/event', { ...ev, participantId: state.participantId, studentCode: state.studentCode, sessionId: state.sessionId });
  } catch {}
}

export async function completeLevel(payload) {
  const res = await post('/api/gpp/level-complete', {
    ...payload, participantId: state.participantId, studentCode: state.studentCode, sessionId: state.sessionId,
  });
  if (res.ok) {
    state.scores[payload.level] = res.score;
    if (res.passed && payload.level < 4) state.unlocked[payload.level + 1] = true;
    saveLocal();
  }
  return res;
}

export async function saveTest(payload) {
  return post('/api/gpp/test', {
    ...payload, participantId: state.participantId, studentCode: state.studentCode,
    sessionId: state.sessionId, yearLevel: state.yearLevel,
  });
}
export async function saveSurvey(payload) {
  return post('/api/gpp/survey', {
    ...payload, participantId: state.participantId, studentCode: state.studentCode, sessionId: state.sessionId,
  });
}
export async function aiScenario(level) {
  return post('/api/gpp/ai-scenario', { level });
}
export async function fetchProgress(studentCode) {
  const r = await fetch('/api/gpp/progress?studentCode=' + encodeURIComponent(studentCode));
  return r.json().catch(() => ({ ok: false }));
}
