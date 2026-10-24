// ============================================================
// Multiplayer Presence — Trục C (campus đa người chơi)
// ============================================================
// WebSocket /ws-presence: mỗi client connect với session cookie → auth user.
// Client send {type:'move', x, y, dir, room} → server broadcast cho mọi
// client cùng room. Server cũng định kỳ broadcast snapshot toàn room.
//
// Throttle: client max 10 move/s. Idle disconnect sau 60s không có heartbeat.
// ============================================================

import { WebSocketServer } from 'ws';
import { getSession, getUserById } from '../../db.js';

const HEARTBEAT_MS = 20 * 1000;
const IDLE_TIMEOUT_MS = 60 * 1000;
const MOVE_RATE_LIMIT = 10;   // messages per second per client

// rooms: Map<roomId, Set<connection>>
const rooms = new Map();

function getCookie(req, name) {
  const raw = req.headers.cookie || '';
  for (const p of raw.split(';')) {
    const [k, ...rest] = p.trim().split('=');
    if (k === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

async function authConn(req) {
  // Cookie 'tizia_sid' (khớp COOKIE_NAME trong auth.js); fallback ?token=.
  const token = getCookie(req, 'tizia_sid') || new URL(req.url, 'http://x').searchParams.get('token');
  if (!token) return null;
  const session = await getSession(token);
  if (!session) return null;
  const user = await getUserById(session.user_id);
  return user ? { token, user } : null;
}

function joinRoom(roomId, conn) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(conn);
}
function leaveRoom(roomId, conn) {
  const set = rooms.get(roomId);
  if (!set) return;
  set.delete(conn);
  if (set.size === 0) rooms.delete(roomId);
}

function broadcast(roomId, payload, exceptConn = null) {
  const set = rooms.get(roomId);
  if (!set) return;
  const msg = JSON.stringify(payload);
  for (const c of set) {
    if (c === exceptConn) continue;
    if (c.ws.readyState === 1) {
      try { c.ws.send(msg); } catch {}
    }
  }
}

function roomSnapshot(roomId) {
  const set = rooms.get(roomId);
  if (!set) return [];
  return [...set].map(c => ({
    user_id: c.user.id,
    name: c.user.display_name || c.user.username,
    x: c.x ?? 0, y: c.y ?? 0, dir: c.dir || 'S',
    pet: c.pet || null,
    last_seen: c.lastSeen,
  }));
}

export function attachPresence(server) {
  const wss = new WebSocketServer({ noServer: true, path: '/ws-presence' });

  // prependListener để chạy TRƯỚC handler của room.js (cái cuối có else
  // socket.destroy()). Khi path khớp /ws-presence, ta xử lý + stop other handlers
  // bằng cách remove path khỏi req tạm thời? Đơn giản: handle ngay, các handler
  // sau nhận socket đã upgrade.
  server.prependListener('upgrade', (req, socket, head) => {
    const path = (req.url || '').split('?')[0];
    if (path === '/ws-presence') {
      wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
      // Stop propagation: ngăn handler khác chạm vào socket đã upgrade
      req._wsHandled = true;
    }
  });

  wss.on('connection', async (ws, req) => {
    const auth = await authConn(req);
    if (!auth) {
      const cookieRaw = req.headers.cookie || '(no cookie)';
      console.warn('[presence] auth failed, cookies:', cookieRaw.slice(0, 200));
      ws.send(JSON.stringify({ type: 'error', error: 'unauthorized' }));
      ws.close(); return;
    }
    const conn = {
      ws, user: auth.user, roomId: 'lobby',
      x: 0, y: 0, dir: 'S', pet: null,
      lastSeen: Date.now(),
      lastMoveAt: 0, moveCount: 0, moveWindowStart: Date.now(),
    };
    joinRoom(conn.roomId, conn);
    ws.send(JSON.stringify({
      type: 'hello',
      you: { user_id: conn.user.id, name: conn.user.display_name },
      room: conn.roomId,
      players: roomSnapshot(conn.roomId),
    }));
    broadcast(conn.roomId, {
      type: 'join', user_id: conn.user.id, name: conn.user.display_name,
    }, conn);

    ws.on('message', (data) => {
      conn.lastSeen = Date.now();
      let msg;
      try { msg = JSON.parse(data); } catch { return; }

      if (msg.type === 'join_room') {
        const newRoom = String(msg.room || 'lobby').slice(0, 40);
        if (newRoom === conn.roomId) return;
        leaveRoom(conn.roomId, conn);
        broadcast(conn.roomId, { type: 'leave', user_id: conn.user.id });
        conn.roomId = newRoom;
        joinRoom(conn.roomId, conn);
        ws.send(JSON.stringify({
          type: 'room', room: conn.roomId, players: roomSnapshot(conn.roomId),
        }));
        broadcast(conn.roomId, {
          type: 'join', user_id: conn.user.id, name: conn.user.display_name,
        }, conn);
        return;
      }

      if (msg.type === 'move') {
        const now = Date.now();
        if (now - conn.moveWindowStart > 1000) {
          conn.moveWindowStart = now; conn.moveCount = 0;
        }
        conn.moveCount += 1;
        if (conn.moveCount > MOVE_RATE_LIMIT) return; // silently drop
        conn.x   = Number.isFinite(msg.x)   ? Math.max(-1000, Math.min(1000, msg.x))   : conn.x;
        conn.y   = Number.isFinite(msg.y)   ? Math.max(-1000, Math.min(1000, msg.y))   : conn.y;
        conn.dir = ['N','S','E','W'].includes(msg.dir) ? msg.dir : conn.dir;
        if (msg.pet && typeof msg.pet === 'string' && msg.pet.length <= 32) {
          conn.pet = msg.pet;
        }
        broadcast(conn.roomId, {
          type: 'move', user_id: conn.user.id,
          x: conn.x, y: conn.y, dir: conn.dir, pet: conn.pet,
        }, conn);
        return;
      }

      if (msg.type === 'chat') {
        const text = String(msg.text || '').trim().slice(0, 200);
        if (!text) return;
        broadcast(conn.roomId, {
          type: 'chat', user_id: conn.user.id,
          name: conn.user.display_name, text,
        });
        return;
      }

      if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', t: Date.now() }));
      }
    });

    ws.on('close', () => {
      leaveRoom(conn.roomId, conn);
      broadcast(conn.roomId, { type: 'leave', user_id: conn.user.id });
    });
    ws.on('error', () => {});
  });

  // Heartbeat sweep: kick idle conns
  setInterval(() => {
    const now = Date.now();
    for (const [roomId, set] of rooms) {
      for (const c of set) {
        if (c.ws.readyState !== 1) {
          leaveRoom(roomId, c); continue;
        }
        if (now - c.lastSeen > IDLE_TIMEOUT_MS) {
          try { c.ws.close(1000, 'idle'); } catch {}
          leaveRoom(roomId, c);
          broadcast(roomId, { type: 'leave', user_id: c.user.id });
        }
      }
    }
  }, HEARTBEAT_MS);

  console.log('[presence] WebSocket server attached at /ws-presence');
}
