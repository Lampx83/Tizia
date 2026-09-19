// Shared multiplayer room for the Metaverse mode.
// Server holds canonical state of medicines (positions + ownership + slot),
// players send cursor updates + grab/move/release/snap requests.

import { WebSocketServer } from 'ws';
import { attachOrchestration } from './orchestration.js';
import { log } from './observability.js';
import { guardedSend, onMessageJSON, logSocketLifecycle } from './ws-safety.js';
import { sweepStaleConnections, HEARTBEAT_INTERVAL_MS } from './ws-heartbeat.js';

const ROOM_MEDICINES = [
  { id: 'amox', name: 'AMOXICILLIN', category: 'Kháng sinh', color: '#43a047', dose: '500mg', form: 'Viên nang' },
  { id: 'asp',  name: 'ASPIRIN',     category: 'Tim mạch',   color: '#e53935', dose: '81mg',  form: 'Viên nén' },
  { id: 'sme',  name: 'SMECTA',      category: 'Tiêu hóa',   color: '#fb8c00', dose: '3g',    form: 'Bột pha' },
  { id: 'par',  name: 'PARACETAMOL', category: 'Giảm đau',   color: '#1e88e5', dose: '500mg', form: 'Viên nén' },
];

const ROOM_SLOTS = ROOM_MEDICINES.map((m, i) => ({
  id: 'slot-' + i,
  category: m.category,
  pos: { x: -3 + i * 2, y: 2.5, z: -2 },
}));

const PLAYER_COLORS = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16',
];

let nextId = 1;

function freshState() {
  // Initial medicine layout — sit on table inside the carton area
  // Categories shuffled so the visual order on table doesn't match slot order
  const shuffled = [...ROOM_MEDICINES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return {
    meds: shuffled.map((m, i) => ({
      ...m,
      pos: { x: -3 + i * 2, y: 1, z: 2 },
      ownerId: null,
      slotId: null,
    })),
    cartonOpen: false,
  };
}

// ============================================================
// RACE MODE — pairs 2 players, broadcasts each other's score
// ============================================================
const raceQueue = [];          // waiting players
const raceRooms = new Map();   // roomId → { players: [{ws,id,name}, ...], startedAt }
let raceRoomId = 1;
let racePlayerId = 1;

function raceSend(p, msg) { guardedSend(p.ws, msg); }
function raceBroadcast(room, msg, exceptId = null) {
  const data = JSON.stringify(msg);
  for (const p of room.players) if (p.id !== exceptId) guardedSend(p.ws, data);
}

function attachRaceWS(httpServer, basePath = '') {
  // noServer: true → caller routes upgrade events manually (so multiple WS
  // servers on same httpServer don't fight each other on shouldHandle().
  const wss = new WebSocketServer({ noServer: true });
  wss.on('error', (err) => log.error('[ws:race] server error', { err }));

  wss.on('connection', (ws) => {
    const player = { id: racePlayerId++, ws, name: 'Khách', score: 0, correct: 0, total: 0, finished: false, room: null };
    logSocketLifecycle(ws, 'race', { playerId: player.id });

    onMessageJSON(ws, (msg) => {
      if (msg.type === 'join') {
        player.name = String(msg.name || '').trim().slice(0, 32) || ('Khách ' + player.id);
        // Try to pair with someone in queue
        if (raceQueue.length > 0) {
          const opponent = raceQueue.shift();
          if (opponent.ws.readyState !== 1) {
            raceQueue.push(player); return raceSend(player, { type: 'waiting' });
          }
          const room = { id: raceRoomId++, players: [opponent, player], startedAt: Date.now() };
          opponent.room = player.room = room;
          raceRooms.set(room.id, room);
          // Notify both
          raceSend(opponent, { type: 'matched', opponentName: player.name, opponentId: player.id, youId: opponent.id, roomId: room.id });
          raceSend(player,   { type: 'matched', opponentName: opponent.name, opponentId: opponent.id, youId: player.id, roomId: room.id });
        } else {
          raceQueue.push(player);
          raceSend(player, { type: 'waiting' });
        }
      } else if (msg.type === 'progress' && player.room) {
        player.score = +msg.score || 0;
        player.correct = +msg.correct || 0;
        player.total = +msg.total || 0;
        raceBroadcast(player.room, {
          type: 'opponent', id: player.id, score: player.score, correct: player.correct, total: player.total,
        }, player.id);
      } else if (msg.type === 'finish' && player.room) {
        player.finished = true;
        player.score = +msg.score || player.score;
        player.correct = +msg.correct || player.correct;
        player.total = +msg.total || player.total;
        raceBroadcast(player.room, { type: 'opponent-finished', id: player.id, score: player.score });
        // Determine winner once both finish OR opponent timed out
        const allFinished = player.room.players.every(p => p.finished);
        if (allFinished) {
          const sorted = [...player.room.players].sort((a, b) =>
            (b.correct / b.total) - (a.correct / a.total) || b.score - a.score
          );
          const winnerId = sorted[0].id;
          for (const p of player.room.players) {
            raceSend(p, { type: 'race-over', winnerId, results: sorted.map(s => ({ id: s.id, name: s.name, score: s.score, correct: s.correct, total: s.total })) });
          }
          raceRooms.delete(player.room.id);
        }
      }
    });

    ws.on('close', () => {
      // Remove from queue
      const qi = raceQueue.indexOf(player);
      if (qi >= 0) raceQueue.splice(qi, 1);
      // Notify opponent if in a room
      if (player.room) {
        raceBroadcast(player.room, { type: 'opponent-left', id: player.id }, player.id);
        // Remove room — the lone player will get notified to bail out
        raceRooms.delete(player.room.id);
      }
    });
  });

  console.log(`[race] WebSocket server attached at ${basePath || ''}/ws-race`);
  return wss;
}

// ============================================================
// SẮC KÝ METAVERSE — shared lab room, each player has own bench
// ============================================================
function attachSackyMetaWS(httpServer, basePath = '') {
  const wss = new WebSocketServer({ noServer: true });
  wss.on('error', (err) => log.error('[ws:sacky] server error', { err }));
  const players = new Map(); // id → { id, ws, name, color, avatar }
  let nextSId = 1;

  function snapshot() {
    return {
      players: [...players.values()].map(p => ({
        id: p.id, name: p.name, color: p.color, avatar: p.avatar, step: p.step, score: p.score,
      })),
    };
  }
  function send(p, msg) { guardedSend(p.ws, msg); }
  function broadcast(msg, exceptId = null) {
    const data = JSON.stringify(msg);
    for (const p of players.values()) if (p.id !== exceptId) guardedSend(p.ws, data);
  }

  wss.on('connection', (ws) => {
    const id = nextSId++;
    const color = PLAYER_COLORS[(id - 1) % PLAYER_COLORS.length];
    const player = {
      id, ws, color,
      name: 'Học viên ' + id,
      avatar: { x: 0, y: 1.5, z: 0, rx: 0, ry: 0 },
      step: 1, score: 0,
    };
    players.set(id, player);
    logSocketLifecycle(ws, 'sacky', { playerId: id });

    onMessageJSON(ws, (msg) => {
      switch (msg.type) {
        case 'join': {
          if (typeof msg.name === 'string' && msg.name.trim()) {
            player.name = msg.name.trim().slice(0, 32);
          }
          send(player, { type: 'welcome', id, color, snapshot: snapshot() });
          broadcast({ type: 'join', player: { id, name: player.name, color, avatar: player.avatar, step: 1, score: 0 } }, id);
          break;
        }
        case 'avatar': {
          player.avatar = {
            x: +msg.x || 0, y: +msg.y || 0, z: +msg.z || 0,
            rx: +msg.rx || 0, ry: +msg.ry || 0,
          };
          broadcast({ type: 'avatar', id, ...player.avatar }, id);
          break;
        }
        case 'progress': {
          player.step = +msg.step || 1;
          player.score = +msg.score || 0;
          broadcast({ type: 'progress', id, step: player.step, score: player.score }, id);
          break;
        }
        case 'action': {
          broadcast({ type: 'action', id, name: String(msg.name || '').slice(0, 30) }, id);
          break;
        }
        case 'chat': {
          const text = String(msg.text || '').slice(0, 140);
          if (text) broadcast({ type: 'chat', id, name: player.name, color: player.color, text });
          break;
        }
      }
    });

    ws.on('close', () => {
      players.delete(id);
      broadcast({ type: 'leave', id });
    });
  });

  setInterval(() => {
    sweepStaleConnections(players, (id) => broadcast({ type: 'leave', id }));
  }, HEARTBEAT_INTERVAL_MS).unref();

  return wss;
}

// ============================================================
// COMPOUNDING LAB METAVERSE — shared pharmacy lab, each player has own bench
// ============================================================
function attachLabWS(httpServer, basePath = '') {
  const wss = new WebSocketServer({ noServer: true });
  wss.on('error', (err) => log.error('[ws:lab] server error', { err }));
  const players = new Map(); // id → { id, ws, name, color, cursor, recipeId, step, weight, beakerVol }
  let nextLId = 1;

  function snapshot() {
    return {
      players: [...players.values()].map(p => ({
        id: p.id, name: p.name, color: p.color,
        cursor: p.cursor, recipeId: p.recipeId, step: p.step,
        weight: p.weight, beakerVol: p.beakerVol,
      })),
    };
  }
  function send(p, msg) { guardedSend(p.ws, msg); }
  function broadcast(msg, exceptId = null) {
    const data = JSON.stringify(msg);
    for (const p of players.values()) if (p.id !== exceptId) guardedSend(p.ws, data);
  }

  wss.on('connection', (ws) => {
    const id = nextLId++;
    const color = PLAYER_COLORS[(id - 1) % PLAYER_COLORS.length];
    const player = {
      id, ws, color,
      name: 'Học viên ' + id,
      cursor: { x: 0, y: 1.1, z: 0.5 },
      recipeId: 'siro-paracetamol',
      step: 1, weight: 0, beakerVol: 0,
    };
    players.set(id, player);
    logSocketLifecycle(ws, 'lab', { playerId: id });

    onMessageJSON(ws, (msg) => {
      switch (msg.type) {
        case 'join': {
          if (typeof msg.name === 'string' && msg.name.trim()) player.name = msg.name.trim().slice(0, 32);
          if (typeof msg.recipeId === 'string') player.recipeId = msg.recipeId.slice(0, 40);
          send(player, { type: 'welcome', id, color, snapshot: snapshot() });
          broadcast({ type: 'join', player: {
            id, name: player.name, color, cursor: player.cursor,
            recipeId: player.recipeId, step: 1, weight: 0, beakerVol: 0,
          } }, id);
          break;
        }
        case 'cursor': {
          player.cursor = { x: +msg.x || 0, y: +msg.y || 0, z: +msg.z || 0 };
          broadcast({ type: 'cursor', id, ...player.cursor }, id);
          break;
        }
        case 'progress': {
          player.step = +msg.step || 1;
          player.weight = +msg.weight || 0;
          player.beakerVol = +msg.beakerVol || 0;
          if (typeof msg.recipeId === 'string') player.recipeId = msg.recipeId.slice(0, 40);
          broadcast({ type: 'progress', id, step: player.step, weight: player.weight, beakerVol: player.beakerVol, recipeId: player.recipeId }, id);
          break;
        }
        case 'action': {
          broadcast({ type: 'action', id, name: String(msg.name || '').slice(0, 40), reagent: String(msg.reagent || '').slice(0, 40) }, id);
          break;
        }
        case 'chat': {
          const text = String(msg.text || '').slice(0, 140);
          if (text) broadcast({ type: 'chat', id, name: player.name, color: player.color, text });
          break;
        }
      }
    });

    ws.on('close', () => {
      players.delete(id);
      broadcast({ type: 'leave', id });
    });
  });

  setInterval(() => {
    sweepStaleConnections(players, (id) => broadcast({ type: 'leave', id }));
  }, HEARTBEAT_INTERVAL_MS).unref();

  return wss;
}

// wsPriority 'append': registry.mountWsPlugins phải gọi httpServer.on('upgrade', …)
// (KHÔNG prependListener) cho onUpgrade trả về ở đây — đây là handler catch-all,
// chạy SAU presence/live-quiz (chúng dùng prependListener) như hành vi hiện tại.
export function attachRoom(httpServer, basePath = '') {
  const raceWss = attachRaceWS(httpServer, basePath);
  const sackyWss = attachSackyMetaWS(httpServer, basePath);
  const labWss = attachLabWS(httpServer, basePath);
  const orchestrate = attachOrchestration(httpServer, basePath);
  const wss = new WebSocketServer({ noServer: true });
  wss.on('error', (err) => log.error('[ws:room] server error', { err }));
  const players = new Map();   // id → { id, ws, name, color, cursor }
  let state = freshState();

  function snapshot() {
    return {
      players: [...players.values()].map(p => ({
        id: p.id, name: p.name, color: p.color, cursor: p.cursor,
      })),
      meds: state.meds,
      slots: ROOM_SLOTS,
      cartonOpen: state.cartonOpen,
    };
  }

  function send(p, msg) { guardedSend(p.ws, msg); }

  function broadcast(msg, exceptId = null) {
    const data = JSON.stringify(msg);
    for (const p of players.values()) if (p.id !== exceptId) guardedSend(p.ws, data);
  }

  wss.on('connection', (ws) => {
    const id = nextId++;
    const color = PLAYER_COLORS[(id - 1) % PLAYER_COLORS.length];
    const player = {
      id, ws, color,
      name: 'Khách ' + id,
      cursor: { x: 0, y: 1, z: 1, pinching: false },
    };
    players.set(id, player);
    logSocketLifecycle(ws, 'room', { playerId: id });

    onMessageJSON(ws, (msg) => {
      switch (msg.type) {
        case 'join': {
          if (typeof msg.name === 'string' && msg.name.trim()) {
            player.name = msg.name.trim().slice(0, 32);
          }
          send(player, { type: 'welcome', id, color, snapshot: snapshot() });
          broadcast({ type: 'join', player: { id, name: player.name, color, cursor: player.cursor } }, id);
          break;
        }
        case 'cursor': {
          player.cursor = {
            x: +msg.x || 0, y: +msg.y || 0, z: +msg.z || 0,
            pinching: !!msg.pinching,
          };
          broadcast({ type: 'cursor', id, ...player.cursor }, id);
          break;
        }
        case 'open-carton': {
          if (!state.cartonOpen) {
            state.cartonOpen = true;
            broadcast({ type: 'open-carton' });
          }
          break;
        }
        case 'grab': {
          const m = state.meds.find(x => x.id === msg.medId);
          if (m && !m.ownerId) {
            m.ownerId = id;
            m.slotId = null;
            broadcast({ type: 'grab', medId: m.id, ownerId: id });
          }
          break;
        }
        case 'move': {
          const m = state.meds.find(x => x.id === msg.medId);
          if (m && m.ownerId === id) {
            m.pos = { x: +msg.x || 0, y: +msg.y || 0, z: +msg.z || 0 };
            broadcast({ type: 'medpos', medId: m.id, pos: m.pos }, id);
          }
          break;
        }
        case 'release': {
          const m = state.meds.find(x => x.id === msg.medId);
          if (m && m.ownerId === id) {
            m.ownerId = null;
            broadcast({ type: 'release', medId: m.id, pos: m.pos });
          }
          break;
        }
        case 'snap': {
          const m = state.meds.find(x => x.id === msg.medId);
          const slot = ROOM_SLOTS.find(s => s.id === msg.slotId);
          if (m && slot && (m.ownerId === id || !m.ownerId)) {
            m.ownerId = null;
            m.slotId = slot.id;
            m.pos = { ...slot.pos };
            broadcast({ type: 'snap', medId: m.id, slotId: m.slotId, pos: m.pos });
          }
          break;
        }
        case 'reset': {
          state = freshState();
          broadcast({ type: 'reset', snapshot: snapshot() });
          break;
        }
      }
    });

    ws.on('close', () => {
      // Drop any locks held by this player
      for (const m of state.meds) {
        if (m.ownerId === id) m.ownerId = null;
      }
      players.delete(id);
      broadcast({ type: 'leave', id });
    });
  });

  // Heartbeat to detect zombie connections
  setInterval(() => {
    sweepStaleConnections(players, (id) => broadcast({ type: 'leave', id }));
  }, HEARTBEAT_INTERVAL_MS).unref();

  // Single upgrade listener routes to the right WS server by path.
  const ROOM_PATH = basePath + '/ws';
  const RACE_PATH = basePath + '/ws-race';
  const SACKY_PATH = basePath + '/ws-sacky';
  const LAB_PATH = basePath + '/ws-lab';
  const onUpgrade = (req, socket, head) => {
    const pathname = (req.url || '').split('?')[0];
    // Malformed upgrade (bad handshake headers, client abort mid-handshake…) emits
    // 'error' on the raw socket — không log ở đây thì mất luôn ngữ cảnh path nào.
    socket.on('error', (err) => log.warn('[ws:upgrade] socket error', { err, path: pathname }));
    if (pathname === ROOM_PATH) {
      wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
    } else if (pathname === RACE_PATH) {
      raceWss.handleUpgrade(req, socket, head, (ws) => raceWss.emit('connection', ws, req));
    } else if (pathname === SACKY_PATH) {
      sackyWss.handleUpgrade(req, socket, head, (ws) => sackyWss.emit('connection', ws, req));
    } else if (pathname === LAB_PATH) {
      labWss.handleUpgrade(req, socket, head, (ws) => labWss.emit('connection', ws, req));
    } else if (pathname === orchestrate.PATH) {
      orchestrate.wss.handleUpgrade(req, socket, head, (ws) => orchestrate.wss.emit('connection', ws, req));
    } else if (pathname === basePath + '/ws-presence') {
      // /ws-presence handled by attachPresence (registered separately, see
      // server/contexts/multiplayer/presence.js). KHÔNG destroy ở đây — để
      // listener của presence (prependListener) xử lý.
    } else if (pathname === basePath + '/ws-live') {
      // /ws-live handled by attachLiveQuiz (server/contexts/live-quiz).
    } else {
      socket.destroy();
    }
  };

  console.log(`[room] WebSocket server attached at ${basePath || ''}/ws`);
  return { onUpgrade };
}
