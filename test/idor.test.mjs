// Lỗ hổng #2 (17/10/2026): /api/gpp/* và /api/pharmacy/* trả điểm, lớp, nhóm nghiên
// cứu, hội thoại theo mã SV/mã phiên mà KHÔNG cần đăng nhập; cùng kiểu tra cứu theo
// ID/tên không kiểm quyền (IDOR) ở lớp học, lượt làm bài, Codelab, adaptive…
// Sau bản vá: chưa đăng nhập hoặc sai chủ → bị từ chối; đúng chủ/GV/admin → chạy.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, loginAs, SKIP } from './helpers/server.mjs';

const GV_PW = 'test-gv-' + Math.random().toString(36).slice(2, 10);
let srv, svA, svB, svC, admin, gvT1, gvT2;

before(async () => {
  if (SKIP) return;
  srv = await startServer({ PHARMACOMM_TEACHER_PASSWORD: GV_PW });
  svA = await loginAs(srv, 'sv_a');
  svB = await loginAs(srv, 'sv_b');
  svC = await loginAs(srv, 'sv_c');
  admin = await loginAs(srv, 'quan_tri', { role: 'admin', age: 40 });
  gvT1 = await loginAs(srv, 'gv_t1', { role: 'teacher', age: 40 });
  gvT2 = await loginAs(srv, 'gv_t2', { role: 'teacher', age: 40 });
});
after(async () => { if (srv) await srv.stop(); });

// ───────────────────────────── GPP ─────────────────────────────
test('GPP: chưa đăng nhập bị chặn (trừ mở màn bằng mật khẩu)', { skip: SKIP }, async () => {
  const anon = srv.client();
  for (const [m, u] of [['get', '/api/gpp/progress?studentCode=SV001'], ['post', '/api/gpp/enroll'],
    ['post', '/api/gpp/level-complete'], ['post', '/api/gpp/test'], ['post', '/api/gpp/event']]) {
    const r = await anon[m](u, m === 'post' ? { studentCode: 'SV001' } : undefined);
    assert.equal(r.status, 401, u);
  }
  const unlock = await anon.post('/api/gpp/unlock-level', { password: 'sai', level: 3 });
  assert.equal(unlock.status, 401);
  assert.equal(unlock.json.needLogin, undefined, 'đây là sai mật khẩu, không phải cổng đăng nhập');
});

test('GPP: chủ mã SV xem/ghi được; người khác không', { skip: SKIP }, async () => {
  const e = await svA.post('/api/gpp/enroll', { studentCode: 'SV001', className: 'D1', yearLevel: 2, studyGroup: 'exp' });
  assert.equal(e.status, 200);
  const pid = e.json.participantId;
  const lc = await svA.post('/api/gpp/level-complete', { participantId: pid, level: 1, stepsTotal: 10, stepsPassed: 9 });
  assert.equal(lc.status, 200);
  const mine = await svA.get('/api/gpp/progress?studentCode=SV001');
  assert.equal(mine.json.participant.studentCode, 'SV001');
  assert.equal(mine.json.levels.length, 1);

  const other = await svB.get('/api/gpp/progress?studentCode=SV001');
  assert.equal(other.status, 200);
  assert.equal(other.json.participant, null, 'không lộ lớp/nhóm/điểm của SV khác');
  assert.deepEqual(other.json.levels, []);
  assert.equal((await svB.post('/api/gpp/enroll', { studentCode: 'SV001' })).status, 403);
  assert.equal((await svB.post('/api/gpp/level-complete', { participantId: pid, level: 2, stepsTotal: 1, stepsPassed: 1 })).status, 403);
  assert.equal((await svB.post('/api/gpp/test', { studentCode: 'SV001', nQuestions: 10, nCorrect: 10 })).status, 403);

  const adm = await admin.get('/api/gpp/progress?studentCode=SV001');
  assert.equal(adm.json.participant.studentCode, 'SV001');
  assert.equal((await svA.get('/api/gpp/export.csv')).status, 403);
  assert.equal((await admin.get('/api/gpp/export.csv')).status, 200);
});

test('GPP: nhận lại mã SV cũ (chưa có chủ) KHÔNG thấy dữ liệu cũ', { skip: SKIP }, async () => {
  const old = Date.now() - 86400e3;
  const { rows } = await srv.sql(
    `INSERT INTO gpp_participant (student_code, class_name, created_at, updated_at) VALUES ('SVCU', 'D9', $1, $1) RETURNING id`, [old]);
  await srv.sql(`INSERT INTO gpp_level_result (participant_id, level, passed, score, created_at) VALUES ($1, 1, 1, 95, $2)`, [rows[0].id, old]);
  assert.equal((await svC.post('/api/gpp/enroll', { studentCode: 'SVCU' })).status, 200);
  const p = await svC.get('/api/gpp/progress?studentCode=SVCU');
  assert.equal(p.json.participant.studentCode, 'SVCU');
  assert.deepEqual(p.json.levels, [], 'điểm cũ không lộ cho người vừa nhận mã');
  const a = await admin.get('/api/gpp/progress?studentCode=SVCU');
  assert.equal(a.json.levels.length, 1, 'quản trị vẫn thấy đủ');
});

// ─────────────────────────── PharmaComm ───────────────────────────
test('PharmaComm: chưa đăng nhập bị chặn', { skip: SKIP }, async () => {
  const anon = srv.client();
  assert.equal((await anon.post('/api/pharmacy/practice/session', { studentCode: 'SV101', studentName: 'A', className: 'D1', moduleId: 'otc01' })).status, 401);
  assert.equal((await anon.get('/api/pharmacy/practice/history?code=SV101')).status, 401);
  assert.equal((await anon.get('/api/pharmacy/practice/result/00000000-0000-0000-0000-000000000000')).status, 401);
  assert.equal((await anon.post('/api/pharmacy/session', { moduleId: 'otc01' })).status, 401);
  // khu giảng viên vẫn tự gác (403 chứ không phải cổng 401)
  assert.equal((await anon.get('/api/pharmacy/teacher/me')).status, 403);
});

test('PharmaComm: lịch sử/kết quả/ghi phiên chỉ của chủ; GV và admin xem được', { skip: SKIP }, async () => {
  const s = await svA.post('/api/pharmacy/practice/session', { studentCode: 'SV101', studentName: 'Sinh Vien A', className: 'D1', moduleId: 'otc01' });
  assert.equal(s.status, 200, s.text);
  const id = s.json.sessionId;
  assert.equal((await svA.post('/api/pharmacy/practice/message', { sessionId: id, speaker: 'student', content: 'Chào chị', order: 0 })).status, 200);

  const histA = await svA.get('/api/pharmacy/practice/history?code=SV101');
  assert.equal(histA.json.items.length, 1);
  assert.equal((await svA.get(`/api/pharmacy/practice/result/${id}`)).status, 200);

  const histB = await svB.get('/api/pharmacy/practice/history?code=SV101');
  assert.deepEqual(histB.json.items, [], 'B truyền mã SV của A cũng không thấy');
  assert.equal((await svB.get(`/api/pharmacy/practice/result/${id}`)).status, 404);
  assert.equal((await svB.post('/api/pharmacy/practice/message', { sessionId: id, speaker: 'student', content: 'chen', order: 1 })).status, 404);
  assert.equal((await svB.post('/api/pharmacy/practice/finish', { sessionId: id })).status, 404);
  const steal = await svB.post('/api/pharmacy/practice/session', { studentCode: 'SV101', studentName: 'Gia mao', className: 'D1', moduleId: 'otc01' });
  assert.equal(steal.status, 403, 'không dùng được mã SV đã gắn tài khoản khác');

  // Giảng viên PharmaComm (tài khoản riêng, không cần tài khoản Tizia)
  const gv = srv.client();
  const login = await gv.post('/api/pharmacy/teacher/login', { username: 'giangvien', password: GV_PW });
  assert.equal(login.status, 200, login.text);
  assert.equal((await gv.get(`/api/pharmacy/practice/result/${id}`)).status, 200);
  assert.equal((await gv.get('/api/pharmacy/practice/history?code=SV101')).json.items.length, 1);
  assert.equal((await admin.get(`/api/pharmacy/practice/result/${id}`)).status, 200);
});

test('Nhà thuốc 3D (phiên in-memory): chỉ chủ phiên đọc/ghi', { skip: SKIP }, async () => {
  const s = await svA.post('/api/pharmacy/session', { moduleId: 'otc01' });
  assert.equal(s.status, 200);
  const id = s.json.session.id;
  assert.match(id, /^s_[0-9a-f-]{36}$/, 'mã phiên là UUID');
  assert.equal((await svA.get(`/api/pharmacy/session/${id}`)).status, 200);
  assert.equal((await svB.get(`/api/pharmacy/session/${id}`)).status, 404);
  assert.equal((await svB.post('/api/pharmacy/action', { sessionId: id, type: 'pick_box' })).status, 404);
  assert.equal((await svB.post('/api/pharmacy/score', { sessionId: id })).status, 404);
});

// ───────────────────────── Lớp học / lượt làm bài ─────────────────────────
test('Lớp học: chỉ người tạo lớp (hoặc admin) xem thành viên, điểm, CSV', { skip: SKIP }, async () => {
  const c = await gvT1.post('/api/classes', { name: 'Lop Duoc 1' });
  assert.equal(c.status, 200);
  const code = c.json.code;
  await svA.post('/api/me/enroll', { domain: 'pharmacy' });
  const at = await svA.post('/api/attempts', { version: 'quiz', score: 80, correct: 8, total: 10, classCode: code });
  assert.equal(at.status, 200, at.text);

  for (const u of [`/api/classes/${code}/members`, `/api/classes/${code}/attempts`, `/api/classes/${code}/export.csv`,
    `/api/teacher/class/${code}/leaderboard`, `/api/skills/class/${code}`]) {
    assert.equal((await gvT2.get(u)).status, 403, 'GV khác: ' + u);
    assert.equal((await svB.get(u)).status, 403, 'SV: ' + u);
    assert.equal((await gvT1.get(u)).status, 200, 'GV tạo lớp: ' + u);
    assert.equal((await admin.get(u)).status, 200, 'admin: ' + u);
  }
  const members = await gvT1.get(`/api/classes/${code}/members`);
  assert.equal(members.json[0].player_name, 'sv_a');
  assert.ok(!(await gvT2.get('/api/classes')).json.some((x) => x.code === code), 'GV khác không thấy lớp');
  assert.ok((await gvT1.get('/api/classes')).json.some((x) => x.code === code));
  const info = await svB.get(`/api/classes/${code}`);
  assert.equal(info.status, 200, 'tra mã lớp để tham gia vẫn được');
  assert.equal(info.json.creator_user_id, undefined);

  // lượt làm bài theo tên người chơi
  assert.equal((await svB.get('/api/players/sv_a/attempts')).status, 403);
  assert.equal((await gvT2.get('/api/players/sv_a/attempts')).status, 403);
  assert.equal((await svA.get('/api/players/sv_a/attempts')).status, 200);
  assert.equal((await gvT1.get('/api/players/sv_a/attempts')).status, 200);
  assert.equal((await svB.get('/api/achievements?player=sv_a')).status, 403);
  assert.equal((await svA.get('/api/achievements')).status, 200);

  // toàn hệ thống
  assert.equal((await gvT1.get('/api/export.csv')).status, 403);
  assert.equal((await admin.get('/api/export.csv')).status, 200);
  assert.deepEqual((await gvT2.get('/api/recent')).json, []);
  assert.equal((await gvT1.get('/api/recent')).json.length, 1);
  assert.equal((await gvT1.get('/api/teacher/ai-prompts')).status, 403);
  assert.equal((await admin.get('/api/teacher/ai-prompts')).status, 200);
});

test('Adaptive: không đọc trạng thái học của người khác theo tên', { skip: SKIP }, async () => {
  assert.equal((await svB.get('/api/adaptive/learner/sv_a')).status, 403);
  assert.equal((await svA.get('/api/adaptive/learner/sv_a')).status, 200);
});

test('Tên hiển thị không được trùng người khác (chống mạo danh theo display_name)', { skip: SKIP }, async () => {
  const r = await svB.post('/api/auth/me', { displayName: 'sv_a', age: 20 });
  assert.equal(r.status, 409);
  assert.equal((await svB.post('/api/auth/me', { displayName: 'sv_b moi', age: 20 })).status, 200);
});
