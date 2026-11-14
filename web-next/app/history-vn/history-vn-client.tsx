'use client';

// ============================================================
// Gặp danh nhân Việt Nam — chat AI đóng vai nhân vật lịch sử/khoa học VN
// (port từ public/history-vn.html).
//
// CONTENT (danh sách nhân vật + persona) LẤY TỪ DB qua
//   GET /api/content/history-characters  → { items: [...] }
// KHÔNG hardcode nhân vật vào code. Object nhân vật đầy đủ (personality,
// expertise, knownFacts, suggestedOpener…) được gửi nguyên vẹn cho
//   POST /api/ai/history-chat  { character, history, message } → { reply }
// đúng như trang gốc (server dựng system prompt từ các field này).
//
// Thao tác DOM của trang vanilla chuyển sang React state + refs. TTS dùng
// SpeechSynthesis (vi-VN); mic dùng SpeechRecognition (webkit). Giao diện có
// bản sắc riêng (nền tối gradient tím + accent amber) → giữ hex gốc qua CSS
// scoped (styled-jsx), ghi rõ ở risks.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { speak as ttsSpeak } from '@/lib/tts';

type Character = {
  id: string;
  name: string;
  era?: string;
  role?: string;
  avatar?: string;
  color?: string;
  portrait?: string;
  grade?: string[];
  subject?: string;
  suggestedOpener?: string;
  quickQuestions?: string[];
  // Các field còn lại (personality, expertise, knownFacts…) được gửi nguyên
  // cho API chat; giữ ở dạng mở để không mất dữ liệu.
  [key: string]: unknown;
};

type ChatMsg = { role: 'user' | 'assistant'; content: string };
type Turn = {
  id: number;
  who: 'me' | 'bot';
  text: string;
  portrait?: string;
  thinking?: boolean;
  error?: boolean;
  speakable?: boolean;
};

function speak(t: string) {
  // Giọng chọn theo chất lượng (Natural/Google trước) — xem lib/tts.ts
  ttsSpeak(t, { rate: 1.0 });
}

export default function HistoryVnClient() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState<Character | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);

  const historyRef = useRef<ChatMsg[]>([]);
  const turnIdRef = useRef(0);
  const msgsRef = useRef<HTMLDivElement | null>(null);
  const micRef = useRef<any>(null);
  const thinkingRef = useRef(false);

  // Nạp danh sách nhân vật từ DB.
  useEffect(() => {
    let alive = true;
    fetch('/api/content/history-characters', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => {
        if (alive) setCharacters(Array.isArray(d?.items) ? d.items : []);
      })
      .catch(() => {
        if (alive) setCharacters([]);
      })
      .finally(() => {
        if (alive) setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Cuộn xuống cuối khi có lượt mới.
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  const pushTurn = useCallback((t: Omit<Turn, 'id'>): number => {
    const id = ++turnIdRef.current;
    setTurns((prev) => [...prev, { ...t, id }]);
    return id;
  }, []);

  const startChat = useCallback(
    (id: string) => {
      const c = characters.find((x) => x.id === id);
      if (!c) return;
      historyRef.current = [];
      turnIdRef.current = 0;
      setCurrent(c);
      setInput('');
      const opener = c.suggestedOpener || '';
      setTurns(
        opener
          ? [{ id: ++turnIdRef.current, who: 'bot', text: opener, portrait: c.portrait }]
          : [],
      );
      if (opener) historyRef.current.push({ role: 'assistant', content: opener });
    },
    [characters],
  );

  const backToPicker = useCallback(() => {
    setCurrent(null);
    setTurns([]);
    historyRef.current = [];
  }, []);

  const send = useCallback(
    (raw?: string) => {
      const c = current;
      if (thinkingRef.current || !c) return;
      const text = (raw ?? input).trim();
      if (!text) return;
      setInput('');
      pushTurn({ who: 'me', text });
      historyRef.current.push({ role: 'user', content: text });

      const botId = pushTurn({ who: 'bot', text: '...', portrait: c.portrait, thinking: true });
      thinkingRef.current = true;
      setThinking(true);

      fetch('/api/ai/history-chat', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: c,
          history: historyRef.current,
          message: text,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const reply = data?.reply || '...';
          setTurns((prev) =>
            prev.map((t) =>
              t.id === botId ? { ...t, text: reply, thinking: false, speakable: true } : t,
            ),
          );
          historyRef.current.push({ role: 'assistant', content: reply });
          speak(reply);
        })
        .catch((e: unknown) => {
          const msg = e instanceof Error ? e.message : String(e);
          setTurns((prev) =>
            prev.map((t) =>
              t.id === botId ? { ...t, text: '⚠ ' + msg, thinking: false, error: true } : t,
            ),
          );
        })
        .finally(() => {
          thinkingRef.current = false;
          setThinking(false);
        });
    },
    [current, input, pushTurn],
  );

  const toggleMic = useCallback(() => {
    const SR =
      (typeof window !== 'undefined' &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;
    if (!SR) {
      alert('Trình duyệt không hỗ trợ giọng nói.');
      return;
    }
    if (micRef.current) {
      micRef.current.stop();
      micRef.current = null;
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = 'vi-VN';
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + ' ' : '') + transcript);
    };
    rec.onend = () => {
      setListening(false);
      micRef.current = null;
    };
    micRef.current = rec;
    rec.start();
    setListening(true);
  }, []);

  const quickQuestions = useMemo(
    () => (current?.quickQuestions || []) as string[],
    [current],
  );

  return (
    <div className="hv-root">
      <div className="hv-head">
        <h1 className="hv-title">👤 Gặp danh nhân Việt Nam</h1>
      </div>

      {!current && (
        <div id="picker">
          <p className="hv-tagline">
            Trò chuyện thực với các nhân vật lịch sử và khoa học Việt Nam. AI đóng vai theo
            persona, biết về cuộc đời và lĩnh vực chuyên môn của họ. Phù hợp Lịch sử THCS lớp
            6-9, THPT lớp 10-12 và môn Toán/Sinh/Âm nhạc theo GDPT 2018.
          </p>
          {!loaded ? (
            <p className="hv-empty">Đang tải danh nhân…</p>
          ) : characters.length === 0 ? (
            <p className="hv-empty">Chưa có danh nhân nào.</p>
          ) : (
            <div className="hv-gallery">
              {characters.map((c) => (
                <div
                  key={c.id}
                  className="hv-char"
                  style={{ ['--char-color' as string]: c.color || '#fbbf24' }}
                  onClick={() => startChat(c.id)}
                >
                  <div className="hv-por">{c.portrait}</div>
                  <h3>{c.name}</h3>
                  <div className="hv-era">{c.era}</div>
                  <div className="hv-role">{c.role}</div>
                  <span className="hv-subj">{c.subject}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {current && (
        <div
          className="hv-scene"
          style={{ ['--char-color' as string]: current.color || '#fbbf24' }}
        >
          <div className="hv-scene-head">
            <div
              className="hv-por"
              style={{
                background: `linear-gradient(135deg, ${current.color || '#fbbf24'}, rgba(0,0,0,0.3))`,
              }}
            >
              {current.portrait}
            </div>
            <div className="hv-info">
              <div className="hv-name">{current.name}</div>
              <div className="hv-era">{current.era}</div>
              <div style={{ marginTop: 6 }}>
                <span className="hv-subj" style={{ background: current.color || '#fbbf24' }}>
                  {current.subject}
                </span>
              </div>
            </div>
            <div className="hv-actions">
              <button onClick={backToPicker}>← Đổi nhân vật</button>
            </div>
          </div>

          {quickQuestions.length > 0 && (
            <div className="hv-quick-q">
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="hv-scene-body" ref={msgsRef}>
            {turns.map((t) => (
              <div
                key={t.id}
                className={`hv-turn ${t.who}${t.thinking ? ' thinking' : ''}`}
              >
                <div className="hv-ava">{t.who === 'me' ? '👨🏻‍🎓' : t.portrait || '👤'}</div>
                <div className="hv-bub">
                  {t.text}
                  {t.speakable && (
                    <span
                      className="hv-speak"
                      onClick={() => speak(t.text)}
                      role="button"
                      title="Đọc"
                    >
                      {' '}
                      🔊
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hv-scene-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Hỏi nhân vật… (Enter để gửi)"
            />
            <button
              className={`hv-mic${listening ? ' listening' : ''}`}
              onClick={toggleMic}
              title="Nói"
              disabled={thinking}
            >
              🎤
            </button>
            <button className="hv-send" onClick={() => send()} disabled={thinking}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .hv-root {
          --accent: #fbbf24;
          --card: rgba(255, 255, 255, 0.06);
          --card-h: rgba(255, 255, 255, 0.12);
          --border: rgba(255, 255, 255, 0.12);
          color: white;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hv-head {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .hv-title {
          margin: 0;
          font-size: 28px;
          background: linear-gradient(135deg, #ffffff 0%, #fbbf24 60%, #f97316 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hv-tagline {
          opacity: 0.85;
          font-size: 14px;
          max-width: 800px;
          line-height: 1.6;
          margin: 0 0 22px;
        }
        .hv-empty {
          opacity: 0.7;
          font-size: 14px;
        }
        .hv-gallery {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        }
        .hv-char {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          position: relative;
          transition: transform 0.15s, border-color 0.15s, background 0.15s;
          overflow: hidden;
        }
        .hv-char::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--char-color);
          opacity: 0.06;
          z-index: 0;
        }
        .hv-char:hover {
          background: var(--card-h);
          transform: translateY(-3px);
          border-color: var(--char-color);
        }
        .hv-por {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--char-color), rgba(0, 0, 0, 0.3));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 50px;
          margin-bottom: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
        }
        .hv-char h3 {
          margin: 0 0 4px;
          font-size: 18px;
          position: relative;
          z-index: 1;
        }
        .hv-char .hv-era {
          font-size: 11px;
          opacity: 0.65;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .hv-role {
          font-size: 13px;
          opacity: 0.85;
          line-height: 1.45;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }
        .hv-subj {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--char-color);
          color: white;
          display: inline-block;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }
        .hv-scene {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0.02)
          );
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          min-height: 600px;
          display: grid;
          grid-template-rows: auto auto 1fr auto;
        }
        .hv-scene-head {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 18px 24px;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), transparent);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hv-scene-head .hv-por {
          width: 72px;
          height: 72px;
          font-size: 42px;
          margin-bottom: 0;
        }
        .hv-info .hv-name {
          font-weight: 700;
          font-size: 20px;
        }
        .hv-info .hv-era {
          font-size: 12px;
          opacity: 0.7;
        }
        .hv-actions {
          margin-left: auto;
          display: flex;
          gap: 8px;
        }
        .hv-actions button {
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.06);
          color: white;
          cursor: pointer;
          font-size: 13px;
        }
        .hv-scene-body {
          padding: 18px 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 60vh;
        }
        .hv-turn {
          display: flex;
          gap: 10px;
          max-width: 80%;
        }
        .hv-turn.bot {
          align-self: flex-start;
        }
        .hv-turn.me {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .hv-ava {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .hv-turn.bot .hv-ava {
          background: linear-gradient(135deg, var(--char-color), rgba(0, 0, 0, 0.3));
        }
        .hv-turn.me .hv-ava {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #3e2723;
        }
        .hv-bub {
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.55;
          white-space: pre-wrap;
        }
        .hv-turn.bot .hv-bub {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hv-turn.me .hv-bub {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #3e2723;
        }
        .hv-turn.bot.thinking .hv-bub {
          opacity: 0.6;
          font-style: italic;
        }
        .hv-speak {
          cursor: pointer;
          opacity: 0.65;
          margin-left: 6px;
          font-size: 12px;
        }
        .hv-speak:hover {
          opacity: 1;
        }
        .hv-quick-q {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          padding: 8px 24px;
        }
        .hv-quick-q button {
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(14, 165, 233, 0.15);
          border: 1px solid rgba(14, 165, 233, 0.3);
          color: #7dd3fc;
          cursor: pointer;
          font-family: inherit;
        }
        .hv-quick-q button:hover {
          background: rgba(14, 165, 233, 0.25);
        }
        .hv-scene-input {
          padding: 16px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .hv-scene-input textarea {
          flex: 1;
          resize: none;
          min-height: 40px;
          max-height: 100px;
          padding: 9px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
          color: white;
          font-family: inherit;
          font-size: 14px;
        }
        .hv-scene-input button {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 17px;
        }
        .hv-scene-input button:disabled {
          opacity: 0.55;
          cursor: default;
        }
        .hv-mic {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .hv-mic.listening {
          background: #ef4444;
        }
        .hv-send {
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #3e2723;
        }
      `}</style>
    </div>
  );
}
