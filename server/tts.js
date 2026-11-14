// ============================================================
// TTS neural qua FPT.AI — proxy + cache đĩa
// ============================================================
// Giọng đọc Web Speech API phụ thuộc máy người dùng (Safari/Android thường
// robot). Endpoint này tổng hợp giọng neural tiếng Việt qua FPT.AI TTS v5 và
// CACHE mp3 theo (voice, text) trong DATA_DIR/tts-cache — câu hỏi mầm non lặp
// lại nhiều nên chi phí thực tế rất thấp; cache nằm trong volume /data nên
// sống qua rebuild image.
//
// Cấu hình (env):
//   FPT_TTS_API_KEY  — bắt buộc để bật. KHÔNG có → /api/tts trả 503, client
//                      (web-next/lib/tts.ts + public/js/…) tự fallback Web Speech.
//   FPT_TTS_VOICE    — giọng mặc định (banmai = nữ miền Bắc, hợp giáo dục).
//
// Public cho guest (mầm non chơi không đăng nhập) — được whitelist trong
// makeAuthGate; tự chống lạm dụng bằng rate-limit theo IP (cache hit không tính).
//
// FPT TTS v5: POST https://api.fpt.ai/hmi/tts/v5, header api-key/voice/speed,
// body = text thô; trả { async: <url mp3> } — file mp3 sẵn sàng sau ~0.5-2s,
// cần poll tới khi 200.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const FPT_URL = 'https://api.fpt.ai/hmi/tts/v5';
// Danh sách giọng FPT.AI hiện hành (Bắc: banmai/leminh/thuminh · Trung:
// myan/giahuy · Nam: lannhi/linhsan/minhquang/ngoclam)
const VOICES = new Set([
  'banmai', 'leminh', 'thuminh', 'myan', 'giahuy',
  'lannhi', 'linhsan', 'minhquang', 'ngoclam',
]);
const MAX_LEN = 500; // client đã chia câu ~200 ký tự; chặn text quá dài

// Rate-limit tổng hợp MỚI (không tính cache hit): 30 lượt/phút/IP.
const rlHits = new Map(); // ip → { n, resetAt }
function allowSynth(ip) {
  const now = Date.now();
  const cur = rlHits.get(ip);
  if (!cur || now > cur.resetAt) {
    rlHits.set(ip, { n: 1, resetAt: now + 60_000 });
    return true;
  }
  cur.n += 1;
  return cur.n <= 30;
}
// Dọn map mỗi 10 phút cho gọn bộ nhớ.
setInterval(() => {
  const now = Date.now();
  for (const [ip, v] of rlHits) if (now > v.resetAt) rlHits.delete(ip);
}, 600_000).unref?.();

export function attachTts(app) {
  const KEY = process.env.FPT_TTS_API_KEY || '';
  const DEFAULT_VOICE = VOICES.has(process.env.FPT_TTS_VOICE)
    ? process.env.FPT_TTS_VOICE
    : 'banmai';
  const CACHE_DIR = path.join(process.env.DATA_DIR || './data', 'tts-cache');

  app.get('/api/tts', async (req, res) => {
    // Probe: client hỏi "server TTS có bật không?" trước khi chuyển hướng phát âm.
    if (req.query.probe !== undefined) {
      return KEY ? res.status(204).end() : res.status(503).json({ error: 'tts_disabled' });
    }
    if (!KEY) return res.status(503).json({ error: 'tts_disabled' });

    const text = String(req.query.text || '').replace(/\s+/g, ' ').trim().slice(0, MAX_LEN);
    if (!text) return res.status(400).json({ error: 'empty' });
    const voice = VOICES.has(req.query.voice) ? req.query.voice : DEFAULT_VOICE;

    const hash = crypto.createHash('sha1').update(`${voice}|${text}`).digest('hex');
    const file = path.join(CACHE_DIR, `${hash}.mp3`);

    // Cache hit → trả ngay, cache trình duyệt vĩnh viễn (nội dung bất biến theo hash).
    if (fs.existsSync(file)) {
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.sendFile(path.resolve(file));
    }

    const ip = req.ip || req.socket?.remoteAddress || '?';
    if (!allowSynth(ip)) return res.status(429).json({ error: 'rate_limited' });

    try {
      const r = await fetch(FPT_URL, {
        method: 'POST',
        headers: { 'api-key': KEY, voice, speed: '' },
        body: text,
      });
      const j = await r.json().catch(() => null);
      const url = j && (j.async || j.data);
      if (!r.ok || !url) {
        console.warn('[tts] FPT lỗi:', r.status, j?.message || j?.error_desc || '');
        return res.status(502).json({ error: 'fpt_failed' });
      }
      // mp3 lên CDN sau một nhịp — poll tối đa ~8s.
      let buf = null;
      for (let i = 0; i < 16; i++) {
        const a = await fetch(url).catch(() => null);
        if (a && a.ok) {
          const ab = await a.arrayBuffer();
          if (ab.byteLength > 200) { buf = Buffer.from(ab); break; }
        }
        await new Promise((ok) => setTimeout(ok, 500));
      }
      if (!buf) return res.status(504).json({ error: 'fpt_timeout' });

      try {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
        fs.writeFileSync(file, buf);
      } catch (e) {
        console.warn('[tts] không ghi được cache:', e.message);
      }
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.send(buf);
    } catch (e) {
      console.warn('[tts] lỗi:', e.message);
      return res.status(502).json({ error: 'fpt_error' });
    }
  });
}
