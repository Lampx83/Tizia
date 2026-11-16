'use client';

// ============================================================
// Spatial VoIP demo — port từ public/voice-demo.html.
// Mở trang trên 2+ tab/máy cùng mã phòng → 2 chấm thấy nhau trên bản đồ 10m×10m.
// Kéo chấm vàng (mình) lại gần chấm xanh (peer) → âm to dần; ra xa 12m → tắt.
// Push-to-talk: bấm-giữ nút "Nói".
//
// KHÔNG có content/DB: tên & vị trí peer đến từ signaling WebSocket
// /ws-orchestrate qua engine WebRTC. Engine đó (mesh, gain theo khoảng cách,
// mic) KHÔNG nhân bản sang code Next — import động runtime module gốc
// /js/spatial-voice.js (webpackIgnore, Next fallback-proxy phục vụ). Thao tác
// DOM của bản vanilla → React state + refs. Nền/màu là bản sắc riêng của trang
// → CSS scoped (styled-jsx) với hex gốc, ghi rõ ở risks.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';

// ---- Shape module legacy import động ----
type Pos = { x: number; y: number; z: number };
type Peer = {
  id: number;
  name: string;
  role: string;
  gain: number;
  pos: { x: number; y: number; z: number } | null;
};
type VoiceState = {
  connected: boolean;
  myId: number | null;
  muted: boolean;
  peers: Peer[];
};
type SpatialVoice = {
  onStateChange: (st: VoiceState) => void;
  connect: (opts: { roomCode: string; name: string; role?: string }) => Promise<void>;
  updatePosition: (pos: Pos) => void;
  muteSelf: (mute: boolean) => void;
  leave: () => void;
};
type VoiceMod = { spatialVoice: SpatialVoice };

// Import động runtime — webpackIgnore giữ path nguyên, tải từ origin đã proxy.
const dyn = <T,>(p: string): Promise<T> =>
  import(/* webpackIgnore: true */ /* @vite-ignore */ p) as Promise<T>;

export default function VoiceDemo() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [state, setState] = useState('⚫ Chưa kết nối');
  const [muted, setMuted] = useState(false); // true = đang nói (nút sáng)
  const [peers, setPeers] = useState<Peer[]>([]);
  const [you, setYou] = useState({ left: 50, top: 50 }); // % trên bản đồ

  const voiceRef = useRef<SpatialVoice | null>(null);
  const myPosRef = useRef<Pos>({ x: 5, y: 0, z: 5 }); // 5m,5m center
  const draggingRef = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Nạp engine + khôi phục tên/phòng đã lưu.
  useEffect(() => {
    try {
      setName(localStorage.getItem('voice.name') || 'HS' + Math.floor(Math.random() * 100));
      setRoom(localStorage.getItem('voice.room') || 'VOICE1');
    } catch {
      setName('HS' + Math.floor(Math.random() * 100));
      setRoom('VOICE1');
    }
    let alive = true;
    dyn<VoiceMod>('/js/spatial-voice.js')
      .then((mod) => {
        if (!alive) return;
        const sv = mod.spatialVoice;
        sv.onStateChange = (st) => setPeers(st.peers);
        voiceRef.current = sv;
      })
      .catch(() => {
        if (alive) setState('⚠ Không tải được engine giọng nói');
      });
    return () => {
      alive = false;
      try {
        voiceRef.current?.leave();
      } catch {}
    };
  }, []);

  // ---- Kéo chấm vàng (mình) ----
  const onPointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);
  useEffect(() => {
    window.addEventListener('pointerup', onPointerUp);
    return () => window.removeEventListener('pointerup', onPointerUp);
  }, [onPointerUp]);

  const onMapPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('#you')) draggingRef.current = true;
  };
  const onMapPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const map = mapRef.current;
    if (!map) return;
    const r = map.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    myPosRef.current = { x: px * 10, y: 0, z: py * 10 };
    setYou({ left: px * 100, top: py * 100 });
    voiceRef.current?.updatePosition(myPosRef.current);
  };

  // ---- Tham gia phòng ----
  const onJoin = async () => {
    const sv = voiceRef.current;
    if (!sv) return;
    const nm = name.trim() || 'HS';
    const rm = (room.trim() || 'VOICE1').toUpperCase();
    setRoom(rm);
    try {
      localStorage.setItem('voice.name', nm);
      localStorage.setItem('voice.room', rm);
    } catch {}
    setState('⏳ Đang xin quyền mic + kết nối…');
    try {
      await sv.connect({ roomCode: rm, name: nm, role: 'student' });
      setState('🟢 ' + rm);
      sv.updatePosition(myPosRef.current);
    } catch (e) {
      setState('⚠ ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  // ---- Push-to-talk ----
  const setMute = (m: boolean) => {
    setMuted(m);
    voiceRef.current?.muteSelf(!m);
  };

  const onLeave = () => {
    voiceRef.current?.leave();
    setState('⚫ Chưa kết nối');
  };

  return (
    <div className="vd-wrap">
      <div className="vd-head">
        <h1>🎙 Spatial VoIP demo</h1>
      </div>
      <p className="vd-tagline">
        Mở trang này trên 2+ tab/máy với cùng mã phòng → 2 chấm sẽ thấy nhau trên bản đồ. Kéo chấm
        vàng (mình) lại gần chấm xanh (HS khác) → âm thanh to dần. Kéo ra xa 12m → tắt hẳn.
      </p>

      <div className="vd-setup">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên" />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Mã phòng (vd VOICE1)"
        />
        <button className="join" onClick={onJoin}>
          📞 Tham gia
        </button>
        <button
          className={muted ? 'mute on' : 'mute'}
          onPointerDown={() => setMute(true)}
          onPointerUp={() => setMute(false)}
          onPointerLeave={() => setMute(false)}
        >
          {muted ? '🎤 Đang nói (thả để tắt)' : '🎤 Nói (push to talk)'}
        </button>
        <button className="leave" onClick={onLeave}>
          📵 Rời phòng
        </button>
        <div className="state">{state}</div>
      </div>

      <div className="vd-scene">
        <h3>🗺 Bản đồ phòng (10m × 10m)</h3>
        <div
          className="vd-canvas2d"
          ref={mapRef}
          onPointerDown={onMapPointerDown}
          onPointerMove={onMapPointerMove}
        >
          <div className="you-dot" id="you" style={{ left: `${you.left}%`, top: `${you.top}%` }}>
            🦊
          </div>
          {peers.map((p) =>
            p.pos ? (
              <div
                key={p.id}
                className={p.gain > 0.05 ? 'peer-dot speaking' : 'peer-dot'}
                style={{ left: `${(p.pos.x / 10) * 100}%`, top: `${(p.pos.z / 10) * 100}%` }}
              >
                <div className="ring" />
                {(p.name || 'P').slice(0, 2)}
                <div className="label">
                  {p.name} · {Math.round((p.gain || 0) * 100)}%
                </div>
                <div className="gain-bar">
                  <div style={{ width: `${Math.round((p.gain || 0) * 100)}%` }} />
                </div>
              </div>
            ) : null,
          )}
        </div>
        <div className="vd-info">
          💡 <b>Cách thử:</b> mở 2 tab cùng phòng, mỗi tab kéo chấm vàng để thay đổi vị trí mình.
          Theo dõi cột &quot;Gain&quot; ở từng peer — gain 0 = quá xa, gain 1 = sát. Bấm và giữ
          &quot;🎤 Nói&quot; để push-to-talk. Phải <code>https://</code> hoặc <code>localhost</code>{' '}
          để được cấp quyền mic.
        </div>
        <div className="vd-peer-list">
          {peers.map((p) => (
            <div key={p.id} className="peer-card">
              <div className="av">{p.role === 'teacher' ? '👩‍🏫' : '👤'}</div>
              <div className="info-text">
                <div className="name">{p.name}</div>
                <div className="meta">
                  vị trí {p.pos ? `(${p.pos.x.toFixed(1)},${p.pos.z.toFixed(1)})` : '—'} · gain{' '}
                  {Math.round((p.gain || 0) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .vd-wrap {
          max-width: 1100px;
          margin: 0 auto;
          color: white;
        }
        .vd-head {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .vd-head h1 {
          margin: 0;
          font-size: 26px;
          background: linear-gradient(135deg, #ffffff, #fbbf24, #f97316);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .vd-tagline {
          opacity: 0.85;
          max-width: 760px;
          line-height: 1.6;
          font-size: 14px;
          margin: 0 0 18px;
        }
        .vd-setup {
          display: flex;
          gap: 8px;
          margin-bottom: 18px;
          align-items: center;
          flex-wrap: wrap;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 12px 14px;
          border-radius: 12px;
        }
        .vd-setup input,
        .vd-setup button {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: white;
          font-family: inherit;
          font-size: 13px;
        }
        .vd-setup button {
          cursor: pointer;
        }
        .vd-setup .join {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #3e2723;
          font-weight: 700;
          border: none;
        }
        .vd-setup .leave {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.3);
        }
        .vd-setup .mute {
          background: rgba(255, 255, 255, 0.06);
          color: white;
        }
        .vd-setup .mute.on {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        .vd-setup .state {
          margin-left: auto;
          font-size: 12px;
          opacity: 0.85;
        }
        .vd-scene {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05));
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 18px;
          min-height: 480px;
          position: relative;
        }
        .vd-scene h3 {
          margin: 0 0 12px;
          font-size: 16px;
        }
        .vd-canvas2d {
          width: 100%;
          aspect-ratio: 16 / 10;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          position: relative;
          cursor: crosshair;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .vd-info {
          margin-top: 14px;
          font-size: 12px;
          opacity: 0.85;
          line-height: 1.55;
        }
        .vd-info :global(code) {
          background: rgba(255, 255, 255, 0.08);
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 11px;
        }
        .vd-peer-list {
          margin-top: 14px;
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
        .peer-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 10px 12px;
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .peer-card .av {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }
        .peer-card .info-text {
          font-size: 12px;
          line-height: 1.4;
        }
        .peer-card .info-text .name {
          font-weight: 600;
        }
        .peer-card .info-text .meta {
          opacity: 0.7;
          font-size: 11px;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
      <style jsx global>{`
        .vd-canvas2d .you-dot,
        .vd-canvas2d .peer-dot {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: -20px 0 0 -20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          transition:
            left 0.1s,
            top 0.1s;
        }
        .vd-canvas2d .you-dot {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #3e2723;
        }
        .vd-canvas2d .peer-dot {
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
        }
        .vd-canvas2d .peer-dot .label {
          position: absolute;
          top: 44px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          font-weight: 500;
          white-space: nowrap;
          background: rgba(15, 23, 42, 0.85);
          padding: 2px 8px;
          border-radius: 999px;
        }
        .vd-canvas2d .peer-dot .ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(16, 185, 129, 0.6);
          animation: vdRing 1.5s infinite;
          display: none;
        }
        .vd-canvas2d .peer-dot.speaking .ring {
          display: block;
        }
        @keyframes vdRing {
          0% {
            transform: scale(0.9);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        .vd-canvas2d .peer-dot .gain-bar {
          position: absolute;
          bottom: -10px;
          left: -4px;
          right: -4px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        .vd-canvas2d .peer-dot .gain-bar > div {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #fbbf24);
          transition: width 0.15s;
        }
      `}</style>
    </div>
  );
}
