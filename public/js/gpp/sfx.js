// =====================================================================
// PHARMA CRUSH — âm thanh tổng hợp bằng WebAudio (không tải file ngoài, an
// toàn với CSP và không tốn băng thông). Mỗi hiệu ứng là vài nốt ngắn.
// Trình duyệt chặn phát tiếng trước khi người dùng chạm → khởi động ở lần
// tương tác đầu tiên.
// =====================================================================
let ctx = null, master = null, muted = false;

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.22;
  master.connect(ctx.destination);
  return ctx;
}
export function unlock() { const c = ensure(); if (c && c.state === 'suspended') c.resume(); }
export function setMuted(v) { muted = v; if (master) master.gain.value = v ? 0 : 0.22; }
export function isMuted() { return muted; }

/** 1 nốt: sóng + bao âm ADSR đơn giản. */
function note(freq, t0, dur, { type = 'sine', vol = 1, glide = 0 } = {}) {
  const c = ensure(); if (!c || muted) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (glide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * glide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dur + 0.02);
}
/** Tiếng ồn ngắn (nổ / whoosh). */
function noise(t0, dur, { vol = 0.5, hp = 400 } = {}) {
  const c = ensure(); if (!c || muted) return;
  const n = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = c.createBufferSource(); src.buffer = buf;
  const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp;
  const g = c.createGain(); g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(master);
  src.start(t0);
}

const now = () => (ensure() ? ctx.currentTime : 0);
const PENTA = [523.25, 587.33, 659.25,783.99, 880.0, 1046.5]; // Đô–Rê–Mi–Sol–La–Đô

export const sfx = {
  /** chọn 1 ô */
  tap()   { note(660, now(), 0.07, { type: 'triangle', vol: 0.5 }); },
  /** đổi chỗ hợp lệ */
  swap()  { const t = now(); note(520, t, 0.08, { type: 'triangle', vol: 0.45 });
            note(700, t + 0.05, 0.08, { type: 'triangle', vol: 0.4 }); },
  /** đổi chỗ sai → trượt về */
  wrong() { const t = now(); note(190, t, 0.16, { type: 'sawtooth', vol: 0.32, glide: 0.6 }); },
  /** ăn điểm — cao dần theo chuỗi combo */
  match(chain = 1) {
    const t = now(), base = Math.min(chain - 1, PENTA.length - 3);
    for (let i = 0; i < 3; i++) note(PENTA[base + i], t + i * 0.055, 0.16, { type: 'sine', vol: 0.55 });
    noise(t, 0.1, { vol: 0.16, hp: 1800 });
  },
  /** tạo được vật phẩm đặc biệt */
  special() { const t = now();
    [880, 1174.7, 1568].forEach((f, i) => note(f, t + i * 0.06, 0.24, { type: 'triangle', vol: 0.5 })); },
  /** vật phẩm phát nổ */
  boom()  { const t = now(); noise(t, 0.32, { vol: 0.5, hp: 250 });
            note(150, t, 0.3, { type: 'sawtooth', vol: 0.35, glide: 0.35 }); },
  /** ô rơi xuống */
  drop()  { const t = now(); note(320, t, 0.06, { type: 'sine', vol: 0.22, glide: 1.35 }); },
  /** sắp hết giờ */
  tick()  { note(1200, now(), 0.05, { type: 'square', vol: 0.22 }); },
  /** qua màn */
  win()   { const t = now();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, t + i * 0.11, 0.42, { type: 'triangle', vol: 0.6 })); },
  /** thua màn */
  lose()  { const t = now();
    [440, 392, 330, 262].forEach((f, i) => note(f, t + i * 0.13, 0.34, { type: 'sine', vol: 0.45 })); },
};
