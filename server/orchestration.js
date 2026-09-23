// ============================================================
// Teacher Orchestration (GAP 6) — WebSocket real-time room
// ============================================================
//
// Mỗi class code (vd: A3X9KL) có 1 room. Giáo viên + học sinh tham gia
// cùng room qua WS. Server giữ state:
//   - students[]   : danh sách HS online (id, name, location, status)
//   - teachers[]   : danh sách GV online
//   - pinnedTask   : task GV ghim (vd: "đang làm quiz Q3")
//   - lastBroadcast: tin nhắn cuối GV gửi
//
// Sự kiện từ HS:
//   join {role:'student', name, classCode}
//   location {page: 'quiz.html'} — khi đổi trang
//   progress {score, correct, total}
//   status {state: 'idle'|'working'|'done'|'stuck'}
//
// Sự kiện từ GV:
//   join {role:'teacher', name, classCode}
//   broadcast {text}  — tin nhắn hiện overlay HS
//   gather {target?: 'space'|'lobby'|url} — yêu cầu HS về 1 trang
//   pin-task {text}   — ghim task
//   open-quiz {quizId}
//   close-quiz
//   kick {studentId}
//
// HS nhận:
//   teacher-broadcast {text}
//   teacher-gather {target}
//   teacher-pinned {task}
//   teacher-quiz {quizId|null}
//
// GV nhận snapshot {students, teachers, pinnedTask, lastBroadcast}.
// ============================================================

import { WebSocketServer } from 'ws';
import { log } from './observability.js';
import { guardedSend, onMessageJSON, logSocketLifecycle } from './ws-safety.js';
import { sweepStaleConnections, HEARTBEAT_INTERVAL_MS } from './ws-heartbeat.js';

const PALETTE = ['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#06b6d4','#84cc16','#fbbf24','#a855f7'];

function nowSec() { return Math.floor(Date.now() / 1000); }

export function attachOrchestration(httpServer, basePath = '') {
  const wss = new WebSocketServer({ noServer: true });
  wss.on('error', (err) => log.error('[ws:orchestrate] server error', { err }));
  const rooms = new Map(); // classCode → { students, teachers, pinnedTask, lastBroadcast, openQuizId }
  let nextId = 1;

  function getRoom(code) {
    if (!rooms.has(code)) {
      rooms.set(code, {
        code,
        students: new Map(),
        teachers: new Map(),
        pinnedTask: null,
        lastBroadcast: null,
        openQuizId: null,
        createdAt: nowSec(),
      });
    }
    return rooms.get(code);
  }

  function snapshot(room) {
    const students = [...room.students.values()].map(p => ({
      id: p.id, name: p.name, color: p.color,
      page: p.page, status: p.status,
      score: p.score, correct: p.correct, total: p.total,
      joinedAt: p.joinedAt, lastSeen: p.lastSeen,
    }));
    const teachers = [...room.teachers.values()].map(t => ({
      id: t.id, name: t.name, color: t.color, joinedAt: t.joinedAt,
    }));
    return {
      code: room.code,
      students, teachers,
      pinnedTask: room.pinnedTask,
      lastBroadcast: room.lastBroadcast,
      openQuizId: room.openQuizId,
    };
  }

  const send = guardedSend;

  function broadcastToStudents(room, msg) {
    const data = JSON.stringify(msg);
    for (const s of room.students.values()) guardedSend(s.ws, data);
  }
  function broadcastToTeachers(room, msg) {
    const data = JSON.stringify(msg);
    for (const t of room.teachers.values()) guardedSend(t.ws, data);
  }
  function broadcastAll(room, msg) {
    broadcastToStudents(room, msg);
    broadcastToTeachers(room, msg);
  }

  wss.on('connection', (ws) => {
    const conn = {
      id: nextId++,
      ws,
      role: null,
      name: 'Ẩn danh',
      color: PALETTE[(nextId - 1) % PALETTE.length],
      classCode: null,
      page: null, status: 'idle',
      score: 0, correct: 0, total: 0,
      joinedAt: nowSec(), lastSeen: nowSec(),
    };
    logSocketLifecycle(ws, 'orchestrate', () => ({ connId: conn.id, classCode: conn.classCode }));

    onMessageJSON(ws, (msg) => {
      conn.lastSeen = nowSec();

      switch (msg.type) {
        case 'join': {
          const role = msg.role === 'teacher' ? 'teacher' : 'student';
          const classCode = String(msg.classCode || '').trim().toUpperCase().slice(0, 12);
          if (!classCode) {
            send(ws, { type: 'error', error: 'classCode required' });
            return;
          }
          conn.role = role;
          conn.classCode = classCode;
          conn.name = String(msg.name || '').trim().slice(0, 40) || (role === 'teacher' ? 'GV' : 'HS ' + conn.id);
          const room = getRoom(classCode);
          if (role === 'teacher') room.teachers.set(conn.id, conn);
          else room.students.set(conn.id, conn);

          send(ws, { type: 'welcome', you: { id: conn.id, color: conn.color, role }, snapshot: snapshot(room) });
          // Notify others
          if (role === 'student') {
            broadcastToTeachers(room, { type: 'student-join', student: studentDto(conn) });
          } else {
            broadcastToStudents(room, { type: 'teacher-join', teacher: { id: conn.id, name: conn.name, color: conn.color } });
          }
          // Catch-up pinned/broadcast
          if (room.pinnedTask) send(ws, { type: 'teacher-pinned', task: room.pinnedTask });
          if (room.lastBroadcast) send(ws, { type: 'teacher-broadcast', text: room.lastBroadcast.text, at: room.lastBroadcast.at });
          if (room.openQuizId) send(ws, { type: 'teacher-quiz', quizId: room.openQuizId });
          break;
        }

        case 'location': {
          if (conn.role !== 'student' || !conn.classCode) return;
          conn.page = String(msg.page || '').slice(0, 60);
          const room = getRoom(conn.classCode);
          broadcastToTeachers(room, { type: 'student-location', id: conn.id, page: conn.page });
          break;
        }

        case 'progress': {
          if (conn.role !== 'student' || !conn.classCode) return;
          conn.score = Number(msg.score) || 0;
          conn.correct = Number(msg.correct) || 0;
          conn.total = Number(msg.total) || 0;
          const room = getRoom(conn.classCode);
          broadcastToTeachers(room, { type: 'student-progress', id: conn.id, score: conn.score, correct: conn.correct, total: conn.total });
          break;
        }

        case 'status': {
          if (conn.role !== 'student' || !conn.classCode) return;
          conn.status = String(msg.state || 'idle').slice(0, 20);
          const room = getRoom(conn.classCode);
          broadcastToTeachers(room, { type: 'student-status', id: conn.id, status: conn.status });
          break;
        }

        case 'raise-hand': {
          if (conn.role !== 'student' || !conn.classCode) return;
          conn.status = 'raised';
          const room = getRoom(conn.classCode);
          broadcastToTeachers(room, { type: 'student-raise', id: conn.id, name: conn.name });
          break;
        }

        // ── Teacher commands ──
        case 'broadcast': {
          if (conn.role !== 'teacher' || !conn.classCode) return;
          const text = String(msg.text || '').slice(0, 280);
          if (!text) return;
          const room = getRoom(conn.classCode);
          room.lastBroadcast = { text, at: nowSec(), from: conn.name };
          broadcastAll(room, { type: 'teacher-broadcast', text, at: room.lastBroadcast.at, from: conn.name });
          break;
        }
        case 'gather': {
          if (conn.role !== 'teacher' || !conn.classCode) return;
          const target = String(msg.target || 'lobby').slice(0, 80);
          const room = getRoom(conn.classCode);
          broadcastToStudents(room, { type: 'teacher-gather', target, from: conn.name });
          break;
        }
        case 'pin-task': {
          if (conn.role !== 'teacher' || !conn.classCode) return;
          const text = String(msg.text || '').slice(0, 200);
          const room = getRoom(conn.classCode);
          room.pinnedTask = text || null;
          broadcastAll(room, { type: 'teacher-pinned', task: room.pinnedTask });
          break;
        }
        case 'open-quiz': {
          if (conn.role !== 'teacher' || !conn.classCode) return;
          const quizId = String(msg.quizId || '').slice(0, 80);
          const room = getRoom(conn.classCode);
          room.openQuizId = quizId || null;
          broadcastAll(room, { type: 'teacher-quiz', quizId: room.openQuizId });
          break;
        }
        case 'close-quiz': {
          if (conn.role !== 'teacher' || !conn.classCode) return;
          const room = getRoom(conn.classCode);
          room.openQuizId = null;
          broadcastAll(room, { type: 'teacher-quiz', quizId: null });
          break;
        }
        case 'kick': {
          if (conn.role !== 'teacher' || !conn.classCode) return;
          const studentId = Number(msg.studentId);
          const room = getRoom(conn.classCode);
          const s = room.students.get(studentId);
          if (s) {
            send(s.ws, { type: 'kicked', from: conn.name });
            try { s.ws.close(); } catch {}
          }
          break;
        }

        // ── Spatial VoIP signaling (GAP 7) ──
        // Pass-through WebRTC offer/answer/ice giữa các peer trong cùng room.
        // Each peer auto-pairs với mọi peer khác đã announce-voice (mesh).
        case 'voice-announce': {
          if (!conn.classCode) return;
          const room = getRoom(conn.classCode);
          conn.voiceOn = true;
          // Tell everyone else "we're broadcasting" — họ sẽ initiate offer tới conn.id
          const all = [...room.students.values(), ...room.teachers.values()];
          for (const p of all) {
            if (p.id !== conn.id && p.voiceOn) {
              send(p.ws, { type: 'voice-peer-joined', peerId: conn.id, peerName: conn.name, peerRole: conn.role });
            }
          }
          send(ws, {
            type: 'voice-peer-list',
            peers: all.filter(p => p.id !== conn.id && p.voiceOn)
              .map(p => ({ id: p.id, name: p.name, role: p.role })),
          });
          break;
        }
        case 'voice-leave': {
          if (!conn.classCode) return;
          conn.voiceOn = false;
          const room = getRoom(conn.classCode);
          const all = [...room.students.values(), ...room.teachers.values()];
          for (const p of all) {
            if (p.id !== conn.id) send(p.ws, { type: 'voice-peer-left', peerId: conn.id });
          }
          break;
        }
        case 'voice-signal': {
          // Forward SDP / ICE candidate to a specific peer
          if (!conn.classCode) return;
          const room = getRoom(conn.classCode);
          const targetId = Number(msg.targetId);
          const target = room.students.get(targetId) || room.teachers.get(targetId);
          if (target) {
            send(target.ws, {
              type: 'voice-signal',
              fromId: conn.id,
              fromName: conn.name,
              signal: msg.signal, // {kind:'offer'|'answer'|'ice', sdp/candidate}
            });
          }
          break;
        }

        // ── Spatial position (GAP 7) — emit để client tính volume attenuate ──
        case 'voice-position': {
          if (!conn.classCode) return;
          conn.voicePos = { x: +msg.x || 0, y: +msg.y || 0, z: +msg.z || 0 };
          const room = getRoom(conn.classCode);
          const all = [...room.students.values(), ...room.teachers.values()];
          for (const p of all) {
            if (p.id !== conn.id && p.voiceOn) {
              send(p.ws, { type: 'voice-position', peerId: conn.id, pos: conn.voicePos });
            }
          }
          break;
        }
      }
    });

    ws.on('close', () => {
      if (!conn.classCode) return;
      const room = rooms.get(conn.classCode);
      if (!room) return;
      // Voice cleanup
      if (conn.voiceOn) {
        const all = [...room.students.values(), ...room.teachers.values()];
        for (const p of all) if (p.id !== conn.id) send(p.ws, { type: 'voice-peer-left', peerId: conn.id });
      }
      if (conn.role === 'teacher') room.teachers.delete(conn.id);
      else room.students.delete(conn.id);
      if (conn.role === 'student') {
        broadcastToTeachers(room, { type: 'student-leave', id: conn.id });
      } else {
        broadcastToStudents(room, { type: 'teacher-leave', id: conn.id });
      }
      // GC room sau khi không ai vào trong 1 giờ
      if (room.students.size === 0 && room.teachers.size === 0) {
        setTimeout(() => {
          const r = rooms.get(conn.classCode);
          if (r && r.students.size === 0 && r.teachers.size === 0) rooms.delete(conn.classCode);
        }, 60 * 60 * 1000).unref();
      }
    });
  });

  // Heartbeat — kick zombies
  setInterval(() => {
    for (const room of rooms.values()) {
      sweepStaleConnections(room.students, (id) => broadcastToTeachers(room, { type: 'student-leave', id }));
      sweepStaleConnections(room.teachers, (id) => broadcastToStudents(room, { type: 'teacher-leave', id }));
    }
  }, HEARTBEAT_INTERVAL_MS).unref();

  function studentDto(p) {
    return {
      id: p.id, name: p.name, color: p.color,
      page: p.page, status: p.status,
      score: p.score, correct: p.correct, total: p.total,
      joinedAt: p.joinedAt, lastSeen: p.lastSeen,
    };
  }

  // Hook vào upgrade router (sẽ nối từ room.js)
  const PATH = basePath + '/ws-orchestrate';
  console.log(`[orchestrate] WS path = ${PATH}`);
  return { wss, PATH };
}
