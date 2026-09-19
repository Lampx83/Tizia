// ============================================================
// Live Quiz Mode — Kahoot/Quizizz-style real-time multiplayer quiz
// ============================================================
// Flow:
// 1. Host (GV) tạo phòng từ 1 UGC quest hoặc câu hỏi tự chuẩn bị → server
//    trả về PIN 6 chữ số.
// 2. HS join bằng PIN + nickname (không cần đăng nhập).
// 3. Host nhấn "Bắt đầu" → server broadcast question 1, đếm ngược N giây.
// 4. Mỗi HS submit answer → server log thời gian + đúng/sai.
// 5. Sau timeout hoặc tất cả đã trả lời → server tính điểm (đúng + thưởng
//    nhanh) → broadcast leaderboard → chờ host next question.
// 6. Hết câu → final leaderboard + reward.
// ============================================================

import { WebSocketServer } from 'ws';
import { db } from '../../db.js';
import { requireAuth, getCurrentUser } from '../identity/auth.js';
import { log } from '../../observability.js';
import { guardedSend, onMessageJSON, logSocketLifecycle } from '../../ws-safety.js';

const TIME_PER_Q_MS = 20_000;     // 20s/câu
const TIME_BONUS_MAX = 500;       // điểm tối đa thưởng tốc độ
const POINT_BASE = 1000;

const rooms = new Map();          // pin → room state

db.exec(`
  CREATE TABLE IF NOT EXISTS live_rooms (
    pin           TEXT PRIMARY KEY,
    host_id       INTEGER NOT NULL,
    title         TEXT,
    questions     TEXT NOT NULL,    -- JSON
    status        TEXT NOT NULL DEFAULT 'lobby',  -- lobby | running | ended
    created_at    INTEGER NOT NULL,
    ended_at      INTEGER
  );
`);

function genPin() {
  // 6 chữ số, đảm bảo unique trong rooms map
  for (let i = 0; i < 50; i++) {
    const p = String(Math.floor(100000 + Math.random() * 900000));
    if (!rooms.has(p)) return p;
  }
  throw new Error('cannot_gen_pin');
}

function snapshot(room) {
  return {
    pin: room.pin,
    title: room.title,
    status: room.status,
    question_count: room.questions.length,
    current_q: room.currentQ,
    players: [...room.players.values()].map(p => ({
      id: p.id, name: p.name, score: p.score, answered: p.answered,
    })),
  };
}

function broadcast(room, payload, exceptId = null) {
  const msg = JSON.stringify(payload);
  for (const p of room.players.values()) if (p.id !== exceptId) guardedSend(p.ws, msg);
  guardedSend(room.hostWs, msg);
}

function leaderboard(room) {
  return [...room.players.values()]
    .map(p => ({ id: p.id, name: p.name, score: p.score, last_correct: !!p.lastCorrect }))
    .sort((a, b) => b.score - a.score);
}

function startQuestion(room) {
  const q = room.questions[room.currentQ];
  if (!q) return endRoom(room);
  room.qStartedAt = Date.now();
  for (const p of room.players.values()) {
    p.answered = false; p.lastCorrect = false;
  }
  broadcast(room, {
    type: 'question',
    index: room.currentQ,
    total: room.questions.length,
    text: q.text,
    options: q.options,       // KHÔNG include correct
    time_ms: TIME_PER_Q_MS,
  });
  // Auto-advance khi timeout
  clearTimeout(room.timer);
  room.timer = setTimeout(() => closeQuestion(room), TIME_PER_Q_MS + 500);
}

function closeQuestion(room) {
  const q = room.questions[room.currentQ];
  if (!q) return;
  // Tính điểm cuối cùng cho người chưa trả lời (0 điểm)
  broadcast(room, {
    type: 'question_end',
    index: room.currentQ,
    correct_index: q.correct,
    leaderboard: leaderboard(room),
  });
  room.currentQ += 1;
  // Host phải bấm next — nhưng auto-next sau 5s nếu host không bấm
  clearTimeout(room.timer);
  room.timer = setTimeout(() => {
    if (room.currentQ < room.questions.length) startQuestion(room);
    else endRoom(room);
  }, 5000);
}

function endRoom(room) {
  room.status = 'ended';
  clearTimeout(room.timer);
  broadcast(room, { type: 'end', leaderboard: leaderboard(room) });
  db.prepare(`UPDATE live_rooms SET status='ended', ended_at=? WHERE pin=?`)
    .run(Date.now(), room.pin);
  // Cleanup sau 5 phút
  setTimeout(() => rooms.delete(room.pin), 5 * 60_000);
}

function handleAnswer(room, playerId, optIndex) {
  if (room.status !== 'running') return;
  const p = room.players.get(playerId);
  if (!p || p.answered) return;
  const q = room.questions[room.currentQ];
  if (!q) return;
  p.answered = true;
  const elapsed = Date.now() - room.qStartedAt;
  const correct = Number(optIndex) === q.correct;
  if (correct) {
    const speed = Math.max(0, 1 - elapsed / TIME_PER_Q_MS);
    const points = POINT_BASE + Math.round(TIME_BONUS_MAX * speed);
    p.score += points;
    p.lastCorrect = true;
  }
  // Báo riêng cho HS này
  guardedSend(p.ws, { type: 'answer_ack', correct, score: p.score });
  // Báo host số người đã trả lời (không tiết lộ ai đúng)
  const ans = [...room.players.values()].filter(x => x.answered).length;
  guardedSend(room.hostWs, { type: 'answer_progress', answered: ans, total: room.players.size });
  // Tất cả đã trả lời → close sớm
  if ([...room.players.values()].every(x => x.answered)) {
    clearTimeout(room.timer);
    setTimeout(() => closeQuestion(room), 800);
  }
}

// ── HTTP routes ─────────────────────────────────────────────
export function attachLiveQuizHttp(router) {
  router.post('/api/live-quiz/create', requireAuth, (req, res) => {
    if (!['teacher', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'teacher_only' });
    }
    const b = req.body || {};
    let questions = Array.isArray(b.questions) ? b.questions : null;
    // Hỗ trợ tạo từ UGC quest id
    if (!questions && b.ugc_quest_id) {
      const row = db.prepare(`SELECT questions FROM ugc_quests WHERE id = ? AND status = 'published'`)
        .get(Number(b.ugc_quest_id));
      if (row) try { questions = JSON.parse(row.questions); } catch {}
    }
    if (!Array.isArray(questions) || questions.length < 1) {
      return res.status(400).json({ error: 'no_questions' });
    }
    // Validate + clean
    questions = questions.slice(0, 30).map(q => ({
      text: String(q.text || '').slice(0, 500),
      options: (Array.isArray(q.options) ? q.options : []).slice(0, 6).map(o => String(o).slice(0, 200)),
      correct: Math.max(0, Math.min((q.options?.length || 1) - 1, Number(q.correct) || 0)),
    })).filter(q => q.text && q.options.length >= 2);
    if (questions.length === 0) return res.status(400).json({ error: 'no_valid_questions' });

    const pin = genPin();
    const title = String(b.title || 'Live Quiz').slice(0, 100);
    const room = {
      pin, hostId: req.user.id, title, questions,
      status: 'lobby', currentQ: 0,
      players: new Map(),
      hostWs: null, qStartedAt: 0, timer: null,
    };
    rooms.set(pin, room);
    db.prepare(`INSERT INTO live_rooms (pin, host_id, title, questions, status, created_at)
                VALUES (?, ?, ?, ?, 'lobby', ?)`)
      .run(pin, req.user.id, title, JSON.stringify(questions), Date.now());
    res.json({ ok: true, pin, total: questions.length });
  });

  router.get('/api/live-quiz/:pin/info', (req, res) => {
    const room = rooms.get(req.params.pin);
    if (!room) return res.status(404).json({ error: 'not_found' });
    res.json({ title: room.title, total: room.questions.length, status: room.status, players: room.players.size });
  });
}

export const plugin = {
  name: 'live-quiz-http',
  mount(router) {
    attachLiveQuizHttp(router);
  },
};

// wsPriority 'prepend': registry.mountWsPlugins phải gọi httpServer.prependListener
// cho onUpgrade trả về ở đây — GIỮ NGUYÊN thứ tự chạy trước handler .on() của room.js.
export function attachLiveQuizWs(basePath = '') {
  // WebSocket route /ws-live
  const wss = new WebSocketServer({ noServer: true });
  wss.on('error', (err) => log.error('[ws:live-quiz] server error', { err }));
  const onUpgrade = (req, socket, head) => {
    const path = (req.url || '').split('?')[0];
    if (path === basePath + '/ws-live') {
      socket.on('error', (err) => log.warn('[ws:live-quiz] upgrade socket error', { err }));
      wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
    }
  };

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url, 'http://x');
    const pin = url.searchParams.get('pin');
    const role = url.searchParams.get('role');     // 'host' | 'player'
    const name = (url.searchParams.get('name') || 'Khách').slice(0, 24);
    const room = rooms.get(pin);
    if (!room) {
      guardedSend(ws, { type: 'error', error: 'room_not_found' });
      return ws.close();
    }
    if (role === 'host') {
      // Host phải là người tạo phòng (hoặc admin) — verify session cookie trên
      // upgrade request, không tin query param. WS same-origin tự gửi cookie.
      const u = getCurrentUser(req);
      if (!u || (u.id !== room.hostId && u.role !== 'admin')) {
        guardedSend(ws, { type: 'error', error: 'host_unauthorized' });
        return ws.close();
      }
      room.hostWs = ws;
      guardedSend(ws, { type: 'host_ack', snapshot: snapshot(room) });
    } else {
      // Player: gen id ngẫu nhiên, name từ query
      const pid = 'p' + Math.random().toString(36).slice(2, 10);
      const player = { id: pid, name, score: 0, answered: false, lastCorrect: false, ws };
      room.players.set(pid, player);
      guardedSend(ws, { type: 'joined', id: pid, snapshot: snapshot(room) });
      broadcast(room, { type: 'player_join', player: { id: pid, name } }, pid);
    }
    logSocketLifecycle(ws, 'live-quiz', { pin, role });

    onMessageJSON(ws, (msg) => {
      if (role === 'host') {
        if (msg.type === 'start' && room.status === 'lobby') {
          room.status = 'running';
          db.prepare(`UPDATE live_rooms SET status='running' WHERE pin=?`).run(pin);
          startQuestion(room);
        } else if (msg.type === 'next') {
          if (room.currentQ < room.questions.length) startQuestion(room);
          else endRoom(room);
        } else if (msg.type === 'end') {
          endRoom(room);
        }
      } else {
        if (msg.type === 'answer') {
          const pid = [...room.players.values()].find(p => p.ws === ws)?.id;
          if (pid) handleAnswer(room, pid, msg.opt);
        }
      }
    });
    ws.on('close', () => {
      if (role === 'host') room.hostWs = null;
      else {
        for (const [pid, p] of room.players) {
          if (p.ws === ws) {
            room.players.delete(pid);
            broadcast(room, { type: 'player_leave', id: pid });
            break;
          }
        }
      }
    });
  });

  console.log('[live-quiz] WebSocket /ws-live attached');
  return { onUpgrade };
}
