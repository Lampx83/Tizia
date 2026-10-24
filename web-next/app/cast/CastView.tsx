'use client';

import { useEffect, useRef, useState } from 'react';

/* GAP 12 — Cast to Screen route (migrate từ public/cast.html)
 *
 * Mục đích: GV dán URL `/cast?target=space&room=X` lên máy chiếu lớp.
 * Trang chỉ hiển thị nội dung (iframe target) + 1 timer góc + room code,
 * KHÔNG có nút điều khiển → tránh HS đi qua bấm linh tinh.
 *
 * Query params:
 *   target=<file html không kèm .html>  vd: space, school, dashboard, herb-garden-3d
 *   room=<code 6 ký tự>                  optional — gán xuống iframe qua hash
 *   bare=1                                ẩn cả header + clock
 *   autoreload=<số giây>                  refresh iframe (mặc định 0 = tắt)
 *
 * Allowlist target để tránh open redirect / XSS.
 */
const ALLOWED = new Set([
  'space', 'school', 'dashboard', 'teacher',
  'metaverse', 'herb-garden-3d', '3d-shelf', '2d-arcade',
  'sac-ky-3d', 'sac-ky-meta', 'sac-ky-vr-web', 'compounding-lab',
  'PS15-gmp-factory', 'GC07-osce-championship', 'L3-3-tuong-tac',
  'L2-1-titration', 'PS01-er', 'antibiogram-2d', 'bp-measure',
  'calibration-curve', 'pk-curve', 'pediatric-dose', 'dilution',
  'dispense', 'iv-infusion', 'grapher', 'quiz', 'time-attack',
  'apps', 'assets', 'subject', 'module',
  'it-algo-viz', 'it-cipher-ctf', 'it-code-lab', 'it-sql-playground', 'it-web-playground',
  'bao-che-hub', 'sap-xep-hub',
]);

// Các trang target là HTML vanilla — vẫn phục vụ từ Express (không phải Next).
// Ở web-next trỏ thẳng gốc để iframe nạp đúng nội dung gốc.
function targetUrl(target: string, room: string): string {
  return '/' + encodeURIComponent(target) + '.html' + (room ? '#room=' + encodeURIComponent(room) : '');
}

export default function CastView() {
  const [ready, setReady] = useState(false);
  const [target, setTarget] = useState('');
  const [room, setRoom] = useState('');
  const [bare, setBare] = useState(false);
  const [autoreload, setAutoreload] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [clock, setClock] = useState('');

  // Picker state
  const [selValue, setSelValue] = useState('space');
  const [roomInput, setRoomInput] = useState('');

  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const startedAt = useRef<number>(Date.now());

  // Đọc query params (client-only vì bản gốc dùng location.search).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = (params.get('target') || '').trim();
    const r = (params.get('room') || '').trim().toUpperCase().slice(0, 12);
    const b = params.get('bare') === '1';
    const ar = Number(params.get('autoreload')) || 0;

    setRoom(r);
    setBare(b);
    setAutoreload(ar);

    if (!t || !ALLOWED.has(t)) {
      setShowPicker(true);
    } else {
      setTarget(t);
    }
    setReady(true);
  }, []);

  // Clock góc trái — GV biết bài đã chiếu bao lâu.
  useEffect(() => {
    if (!ready) return;
    startedAt.current = Date.now();
    const tick = () => {
      const s = Math.floor((Date.now() - startedAt.current) / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, '0');
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
      const sec = String(s % 60).padStart(2, '0');
      setClock('⏱ ' + h + ':' + m + ':' + sec + (room ? '  ·  ' + room : ''));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [ready, room]);

  // Autoreload iframe (chỉ khi >= 30 giây, y như bản gốc).
  useEffect(() => {
    if (!target || autoreload < 30) return;
    const base = targetUrl(target, room);
    const id = window.setInterval(() => {
      if (frameRef.current) {
        frameRef.current.src = base + (base.includes('?') ? '&' : '?') + 't=' + Date.now();
      }
    }, autoreload * 1000);
    return () => window.clearInterval(id);
  }, [target, room, autoreload]);

  function startCast() {
    const t = selValue;
    const r = roomInput.trim().toUpperCase();
    const q = new URLSearchParams({ target: t });
    if (r) q.set('room', r);
    window.location.search = '?' + q.toString();
  }

  if (!ready) return null;

  const targets = [...ALLOWED].sort();

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden font-sans" style={{ background: '#0f172a', color: 'white' }}>
      {!bare && (
        <div
          className="z-[100] flex flex-none items-center gap-[18px] px-7 py-4"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
        >
          <div className="text-[32px]">📺</div>
          <div>
            <div
              className="text-[22px] font-extrabold tracking-[0.3px]"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 60%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Tizia · Cast trình chiếu
            </div>
            <div className="hidden text-sm opacity-85 sm:block">
              {target ? 'Đang chiếu: ' + target + (room ? '  ·  phòng ' + room : '') : 'Đang khởi tạo…'}
            </div>
          </div>
          <div
            className="ml-auto rounded-full px-[14px] py-[6px] font-bold tabular-nums"
            style={{
              background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.5)',
              color: '#fbbf24',
            }}
          >
            {room || '—'}
          </div>
        </div>
      )}

      <div className="relative flex-1 overflow-hidden" style={{ background: '#000' }}>
        {showPicker ? (
          <div
            className="absolute inset-0 flex items-center justify-center p-8"
            style={{ background: 'radial-gradient(circle at 50% 40%, #1e293b 0%, #0f172a 70%)' }}
          >
            <div
              className="w-full max-w-[760px] rounded-2xl p-8"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h1 className="mb-[6px] text-[28px] font-semibold">📺 Cast trình chiếu</h1>
              <p className="mb-5 text-sm leading-relaxed opacity-85">
                Dán URL này lên máy chiếu lớp — học sinh sẽ thấy view sạch, không có nút điều khiển.
              </p>
              <label className="mb-[6px] mt-3 block text-[13px] opacity-85">Chọn nội dung cần chiếu</label>
              <select
                value={selValue}
                onChange={(e) => setSelValue(e.target.value)}
                className="w-full rounded-[10px] px-[14px] py-3 text-[15px]"
                style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.95)', color: '#1f2937' }}
              >
                {targets.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <label className="mb-[6px] mt-3 block text-[13px] opacity-85">
                Mã phòng (tuỳ chọn) — đồng bộ HS qua hash
              </label>
              <input
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="VD: A3X9KL"
                maxLength={12}
                className="w-full rounded-[10px] px-[14px] py-3 text-[15px]"
                style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.95)', color: '#1f2937' }}
              />
              <button
                onClick={startCast}
                className="mt-5 w-full cursor-pointer rounded-[10px] px-[18px] py-[14px] text-base font-bold hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', color: '#3e2723', border: 'none' }}
              >
                Bắt đầu chiếu
              </button>
              <div
                className="mt-5 rounded-[10px] px-4 py-3 text-[13px] leading-relaxed opacity-90"
                style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.3)' }}
              >
                💡 <b>Mẹo</b>: gắn <code>?bare=1</code> để ẩn cả header — vd{' '}
                <code>/cast?target=space&amp;room=A3X9&amp;bare=1</code>. Gắn <code>&amp;autoreload=60</code> để tự
                refresh mỗi 60 giây.
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={frameRef}
            src={targetUrl(target, room)}
            allow="camera; microphone; xr-spatial-tracking; fullscreen"
            allowFullScreen
            referrerPolicy="same-origin"
            className="absolute inset-0 h-full w-full border-0"
            style={{ background: '#000' }}
          />
        )}
      </div>

      {!bare && (
        <div
          className="fixed bottom-[18px] left-[18px] z-[200] rounded-full px-4 py-2 text-sm tabular-nums"
          style={{
            background: 'rgba(15,23,42,0.7)',
            color: 'white',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {clock}
        </div>
      )}
    </div>
  );
}
