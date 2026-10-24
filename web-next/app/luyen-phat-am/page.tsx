'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pickVoice } from '@/lib/tts';

// Câu luyện phát âm lấy TỪ DB qua /api/content/pronunciation (không hardcode).
// Shape API: { ok, collection, items: [ { easy:[{en,vi}], med:[...], hard:[...] } ] }
type Sentence = { en: string; vi: string };
type SentenceSet = { easy?: Sentence[]; med?: Sentence[]; hard?: Sentence[] };
type Level = 'easy' | 'med' | 'hard';

type DiffToken = { type: 'ok' | 'miss' | 'extra'; word: string };

// Chuẩn hoá text: lowercase, bỏ dấu câu.
function norm(s: string): string {
  return String(s || '').toLowerCase().replace(/[.,!?;:()'"]/g, '').replace(/\s+/g, ' ').trim();
}

// Diff cấp từ: 1 cho match, 0 cho miss/extra.
function compareWords(target: string, heard: string): { tokens: DiffToken[]; extras: DiffToken[]; scorePct: number } {
  const tw = norm(target).split(' ');
  const hw = norm(heard).split(' ');
  const used = new Array(hw.length).fill(false);
  let okCount = 0;
  const tokens: DiffToken[] = tw.map((t) => {
    const hi = hw.findIndex((h, i) => !used[i] && h === t);
    if (hi >= 0) { used[hi] = true; okCount++; return { type: 'ok', word: t }; }
    return { type: 'miss', word: t };
  });
  const extras: DiffToken[] = hw.filter((_, i) => !used[i]).map((w) => ({ type: 'extra', word: w }));
  const scorePct = Math.round((okCount / Math.max(1, tw.length)) * 100);
  return { tokens, extras, scorePct };
}

const LEVEL_OPTIONS: { value: Level; label: string }[] = [
  { value: 'easy', label: '🟢 Dễ — câu ngắn' },
  { value: 'med', label: '🟡 Vừa — câu thông dụng' },
  { value: 'hard', label: '🔴 Khó — câu phức' },
];

export default function LuyenPhatAm() {
  const [sentences, setSentences] = useState<SentenceSet>({});
  const [level, setLevel] = useState<Level>('easy');
  const [idx, setIdx] = useState(0);
  const [recognizing, setRecognizing] = useState(false);
  const [micUnsupported, setMicUnsupported] = useState(false);
  const [status, setStatus] = useState('Bấm 🎤 và đọc to câu trên');
  const [heard, setHeard] = useState<string | null>(null);
  const [diff, setDiff] = useState<DiffToken[]>([]);
  const [scorePct, setScorePct] = useState<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Fetch bộ câu từ DB.
  useEffect(() => {
    fetch('/api/content/pronunciation', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j) => setSentences((j.items || [])[0] || {}))
      .catch(() => setSentences({}));
  }, []);

  // Dò hỗ trợ Speech Recognition khi mount.
  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
    if (!w.SpeechRecognition && !w.webkitSpeechRecognition) setMicUnsupported(true);
  }, []);

  const list = useMemo<Sentence[]>(() => sentences[level] || [], [sentences, level]);
  const safeIdx = list.length ? ((idx % list.length) + list.length) % list.length : 0;
  const current: Sentence | null = list.length ? list[safeIdx] : null;

  // Đổi câu / đổi level → reset kết quả + status.
  const resetResult = useCallback(() => {
    setHeard(null);
    setDiff([]);
    setScorePct(null);
    setStatus('Bấm 🎤 và đọc to câu trên');
  }, []);

  useEffect(() => { resetResult(); }, [level, idx, resetResult]);

  function speakSentence() {
    if (!('speechSynthesis' in window) || !current) {
      if (!('speechSynthesis' in window)) alert('Trình duyệt không hỗ trợ phát âm.');
      return;
    }
    const u = new SpeechSynthesisUtterance(current.en);
    u.lang = 'en-US';
    u.rate = 0.92;
    const v = pickVoice('en'); // giọng en chọn theo chất lượng — lib/tts.ts
    if (v) u.voice = v;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function startRecord() {
    const w = window as unknown as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      SpeechRecognition?: any; webkitSpeechRecognition?: any;
    };
    if (!w.SpeechRecognition && !w.webkitSpeechRecognition) {
      setMicUnsupported(true);
      return;
    }
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;

    recognition.onstart = () => {
      setRecognizing(true);
      setStatus('🔴 Đang nghe… hãy đọc câu trên');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (e: any) => {
      setStatus('❌ Lỗi: ' + e.error);
    };
    recognition.onend = () => {
      setRecognizing(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const said = e.results[0][0].transcript as string;
      const target = current?.en || '';
      const { tokens, extras, scorePct: pct } = compareWords(target, said);
      setHeard(said);
      setDiff([...tokens, ...extras]);
      setScorePct(pct);
      setStatus(
        pct >= 80 ? '🎉 Tuyệt vời!' :
        pct >= 50 ? '👍 Khá ổn — luyện thêm chút nữa' :
        '💪 Cần luyện thêm — bấm 🔊 nghe lại',
      );
    };

    recognitionRef.current = recognition;
    try { recognition.start(); } catch (err) { setStatus('❌ ' + (err as Error).message); }
  }

  function stopRecord() {
    if (recognitionRef.current && recognizing) recognitionRef.current.stop();
  }

  const scoreClass =
    scorePct == null ? '' :
    scorePct >= 80 ? 'score-high' :
    scorePct >= 50 ? 'score-mid' : 'score-low';

  return (
    <div className="lpa">
      {/* Trang gốc có palette tím thương hiệu riêng (accent #a855f7). Giữ qua scoped CSS. */}
      <style jsx>{`
        .lpa { --text: #e5edf7; --muted: #94a3b8; color: var(--text);
          display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 8px 0 32px; }
        .lpa h1 { margin: 0; font-size: 22px; }
        .toolbar { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .toolbar select {
          font-family: inherit; background: rgba(255,255,255,.06); color: var(--text);
          border: 1px solid rgba(255,255,255,.12); padding: 8px 14px; border-radius: 9px; font-size: 13px;
        }
        .card {
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
          border-radius: 14px; width: 100%; max-width: 620px;
        }
        .target { padding: 28px; text-align: center; }
        .target .label { color: var(--muted); font-size: 12px; letter-spacing: .6px; text-transform: uppercase; }
        .target .sentence { font-size: 26px; line-height: 1.4; font-weight: 700; margin: 12px 0; }
        .target .translation { color: var(--muted); font-size: 14px; }
        .listen-btn {
          background: rgba(168,85,247,.18); border: 1px solid #a855f7; color: #a855f7;
          padding: 10px 18px; border-radius: 10px; font-size: 14px; cursor: pointer; margin-top: 14px; font-family: inherit;
        }
        .listen-btn:hover { background: #a855f7; color: #fff; }
        .record-area { padding: 24px; }
        .mic-btn {
          width: 88px; height: 88px; border-radius: 50%; border: 0; cursor: pointer;
          background: linear-gradient(135deg, #a855f7, #6366f1); color: #fff;
          font-size: 36px; display: block; margin: 0 auto 16px;
          box-shadow: 0 8px 28px rgba(168,85,247,.4); transition: transform .15s;
        }
        .mic-btn:hover { transform: scale(1.05); }
        .mic-btn.recording {
          background: linear-gradient(135deg, #ef4444, #f97316);
          animation: pulse 1.2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 28px rgba(239,68,68,.4); transform: scale(1); }
          50% { box-shadow: 0 8px 40px rgba(239,68,68,.6); transform: scale(1.08); }
        }
        .status { text-align: center; color: var(--muted); font-size: 14px; min-height: 20px; }
        .result { background: rgba(0,0,0,.25); border-radius: 11px; padding: 16px; margin-top: 14px; }
        .result .rlabel { color: var(--muted); font-size: 11px; letter-spacing: .5px; text-transform: uppercase; }
        .result .heard { font-size: 18px; margin: 6px 0 14px; }
        .score-box { display: flex; align-items: center; gap: 14px; }
        .score-circle {
          width: 78px; height: 78px; border-radius: 50%; display: grid; place-items: center;
          flex: none; font-size: 24px; font-weight: 800; border: 3px solid;
        }
        .score-circle.score-high { color: #10b981; border-color: #10b981; background: rgba(16,185,129,.1); }
        .score-circle.score-mid { color: #fbbf24; border-color: #fbbf24; background: rgba(251,191,36,.1); }
        .score-circle.score-low { color: #ef4444; border-color: #ef4444; background: rgba(239,68,68,.1); }
        .diff { flex: 1; font-size: 14px; line-height: 1.5; }
        .diff :global(.ok) { color: #10b981; }
        .diff :global(.miss) { color: #ef4444; text-decoration: line-through; }
        .diff :global(.extra) { color: #fbbf24; font-style: italic; }
        .nav { display: flex; gap: 10px; justify-content: center; }
        .nav button {
          font-family: inherit; padding: 10px 22px; border-radius: 10px; border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06); color: var(--text); cursor: pointer; font-size: 13.5px; font-weight: 600;
        }
        .nav button.primary { background: #a855f7; border: 0; color: #fff; }
        .warning {
          background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3);
          color: #fca5a5; padding: 10px 14px; border-radius: 8px; font-size: 13px; max-width: 620px;
        }
      `}</style>

      <h1>🎤 Luyện phát âm Tiếng Anh</h1>

      <div className="toolbar">
        <select
          value={level}
          onChange={(e) => { setLevel(e.target.value as Level); setIdx(0); }}
        >
          {LEVEL_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {micUnsupported && (
        <div className="warning">
          ⚠️ Trình duyệt không hỗ trợ Speech Recognition. Hãy dùng Chrome hoặc Edge.
        </div>
      )}

      <div className="card target">
        <div className="label">Câu mục tiêu</div>
        <div className="sentence">{current ? current.en : '…'}</div>
        <div className="translation">{current ? current.vi : '…'}</div>
        <button className="listen-btn" onClick={speakSentence}>🔊 Nghe mẫu</button>
      </div>

      <div className="card record-area">
        <button
          className={'mic-btn' + (recognizing ? ' recording' : '')}
          title="Bấm để bắt đầu/dừng"
          onClick={() => (recognizing ? stopRecord() : startRecord())}
        >
          🎤
        </button>
        <div className="status">{status}</div>
        {heard != null && (
          <div className="result">
            <div className="rlabel">Bạn vừa nói:</div>
            <div className="heard">{heard}</div>
            <div className="score-box">
              <div className={'score-circle ' + scoreClass}>
                {scorePct != null ? scorePct + '%' : '—'}
              </div>
              <div className="diff">
                {diff.map((t, i) => (
                  <span key={i} className={t.type}>{t.word}{i < diff.length - 1 ? ' ' : ''}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="nav">
        <button onClick={() => setIdx((v) => v - 1)}>← Câu trước</button>
        <button className="primary" onClick={() => setIdx((v) => v + 1)}>Câu tiếp →</button>
      </div>
    </div>
  );
}
