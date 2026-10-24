// ─────────────────────────────────────────────────────────────────────────
// TTS dùng chung cho web-next — ƯU TIÊN GIỌNG NEURAL SERVER (FPT.AI qua
// /api/tts, cache mp3 phía server) để mọi thiết bị nghe như nhau; nếu server
// chưa bật key (503) hoặc lỗi/autoplay bị chặn → FALLBACK Web Speech API với
// bộ chọn giọng THEO CHẤT LƯỢNG (không lấy "giọng đầu tiên" vốn hay là giọng
// compact robot).
//
// Xếp hạng giọng trình duyệt (cao → thấp):
//   1. "Natural/Online" neural (Edge: HoaiMy/NamMinh — rất tự nhiên)
//   2. "Google Tiếng Việt" (Chrome)
//   3. Enhanced/Premium cài máy (macOS)  4. thường; trừ điểm compact/eSpeak
// Kèm: chia câu khi text dài (né bug Chrome cắt ~15s), pitch mặc định 1.0.
// Bản vanilla tương ứng: public/js/engine/preschool-ui.js —
// đổi thuật toán thì đổi CẢ HAI nơi. Server: server/tts.js (FPT_TTS_API_KEY).
// ─────────────────────────────────────────────────────────────────────────

const cache: Record<string, SpeechSynthesisVoice | null> = {};

function rank(v: SpeechSynthesisVoice, langPrefix: string): number {
  const n = (v.name || '').toLowerCase();
  const lang = (v.lang || '').toLowerCase().replace('_', '-');
  let s = 0;
  if (!lang.startsWith(langPrefix)) return -1e9; // sai ngôn ngữ → loại
  if (/natural/.test(n)) s += 120;               // Edge neural
  else if (/online/.test(n)) s += 30;
  if (/google/.test(n)) s += 80;                 // Chrome Google TTS
  if (/enhanced|premium|siri/.test(n)) s += 40;  // giọng nâng cao cài máy
  if (/compact|espeak|eloquence/.test(n)) s -= 60;
  if (!v.localService) s += 10;                  // giọng cloud thường tốt hơn
  if (langPrefix === 'vi' && lang === 'vi-vn') s += 15;
  if (langPrefix === 'en' && (lang === 'en-us' || lang === 'en-gb')) s += 15;
  if (v.default) s += 3;
  return s;
}

/** Giọng trình duyệt tốt nhất cho ngôn ngữ ('vi' | 'en'). Cache; làm mới khi voiceschanged. */
export function pickVoice(langPrefix: 'vi' | 'en' = 'vi'): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === 'undefined') return null;
  if (cache[langPrefix] !== undefined) return cache[langPrefix];
  const all = speechSynthesis.getVoices();
  if (!all.length) return null; // chưa nạp xong — đừng cache
  const best = all
    .map((v) => [rank(v, langPrefix), v] as const)
    .sort((a, b) => b[0] - a[0])[0];
  cache[langPrefix] = best && best[0] > -1e9 ? best[1] : null;
  return cache[langPrefix];
}

if (typeof speechSynthesis !== 'undefined') {
  try {
    speechSynthesis.addEventListener('voiceschanged', () => {
      delete cache.vi;
      delete cache.en;
      pickVoice('vi');
    });
    pickVoice('vi');
  } catch {}
}

// ── Server TTS (FPT.AI) — probe 1 lần: 204 = bật, 503 = chưa có key ──────
let serverOK: boolean | null = null;
let probing: Promise<boolean> | null = null;
function probeServer(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (serverOK !== null) return Promise.resolve(serverOK);
  if (!probing) {
    probing = fetch('/api/tts?probe=1')
      .then((r) => (serverOK = r.status === 204))
      .catch(() => (serverOK = false)) as Promise<boolean>;
  }
  return probing;
}

// Chia câu để né bug Chrome cắt utterance dài (~15s) và ngắt nghỉ tự nhiên hơn.
function chunkText(text: string): string[] {
  if (text.length <= 200) return [text];
  const parts = text.match(/[^.!?…;:\n]+[.!?…;:\n]*/g) || [text];
  const out: string[] = [];
  let buf = '';
  for (const p of parts) {
    if ((buf + p).length > 200 && buf) {
      out.push(buf.trim());
      buf = p;
    } else buf += p;
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

export type SpeakOpts = {
  lang?: 'vi' | 'en';
  rate?: number;
  pitch?: number;
  cancel?: boolean;       // mặc định true — dừng câu đang đọc
  voice?: string;         // giọng FPT (banmai/lannhi/leminh/…) — chỉ áp cho server TTS
  onend?: () => void;
};

let gen = 0; // thế hệ phát âm — tăng khi cancel để huỷ chuỗi đang chạy
let currentAudio: HTMLAudioElement | null = null;

/** Dừng mọi phát âm (server audio + Web Speech). */
export function stopSpeaking() {
  gen += 1;
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
  } catch {}
  try {
    speechSynthesis.cancel();
  } catch {}
}

function playServerChunk(text: string, voice?: string): Promise<boolean> {
  return new Promise((resolve) => {
    const url = `/api/tts?text=${encodeURIComponent(text)}${voice ? `&voice=${encodeURIComponent(voice)}` : ''}`;
    const a = new Audio(url);
    currentAudio = a;
    a.onended = () => resolve(true);
    a.onerror = () => resolve(false);
    a.play().catch(() => resolve(false)); // autoplay bị chặn → fallback Web Speech
  });
}

function webSpeakChunks(chunks: string[], opts: SpeakOpts) {
  if (typeof speechSynthesis === 'undefined') return;
  const lang = opts.lang ?? 'vi';
  const v = pickVoice(lang);
  chunks.forEach((c, i) => {
    const u = new SpeechSynthesisUtterance(c);
    u.lang = lang === 'en' ? 'en-US' : 'vi-VN';
    u.rate = opts.rate ?? 0.95;
    u.pitch = opts.pitch ?? 1.0; // 1.0 — ép pitch cao làm giọng máy méo
    if (v) u.voice = v;
    if (i === chunks.length - 1 && opts.onend) u.onend = opts.onend;
    speechSynthesis.speak(u);
  });
}

/** Đọc to text. Bỏ emoji; server neural trước, fallback giọng trình duyệt. */
export function speak(text: string, opts: SpeakOpts = {}) {
  if (typeof window === 'undefined') return;
  try {
    const clean = String(text || '')
      .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!clean) return;
    if (opts.cancel !== false) stopSpeaking();
    const myGen = gen;
    const chunks = chunkText(clean);
    (async () => {
      // FPT chỉ có tiếng Việt — en luôn dùng Web Speech.
      const useServer = (opts.lang ?? 'vi') === 'vi' && (await probeServer());
      if (gen !== myGen) return; // đã bị cancel trong lúc probe
      if (!useServer) {
        webSpeakChunks(chunks, opts);
        return;
      }
      for (let i = 0; i < chunks.length; i++) {
        if (gen !== myGen) return;
        const ok = await playServerChunk(chunks[i], opts.voice);
        if (!ok) {
          if (gen !== myGen) return;
          webSpeakChunks(chunks.slice(i), opts); // lỗi giữa chừng → đọc nốt bằng Web Speech
          return;
        }
      }
      if (gen === myGen) opts.onend?.();
    })();
  } catch {}
}
