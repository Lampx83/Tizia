'use client';

// ============================================================
// negotiation — Mô phỏng đàm phán (Game Theory)
// Migrate từ public/negotiation.html (vanilla) sang Next.js client component.
// Kịch bản fetch từ DB qua /api/content/negotiation (KHÔNG hardcode content).
// Chat NPC qua /api/ai/negotiate, chấm điểm qua /api/ai/negotiate-grade.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { pickVoice } from '@/lib/tts';

// ── Kiểu dữ liệu kịch bản (khớp schema DB content_datasets 'negotiation') ──
type Stage = { id: string; name: string };
type FatalRule = { trigger: string; reason: string };
type BonusRule = { trigger: string; text: string };
type Scenario = {
  id: string;
  title: string;
  audience: string;
  domain: string;
  icon: string;
  color: string;
  youAre: string;
  npcRole: string;
  persona: string;
  stages: Stage[];
  openingLine: string;
  rubric: string[];
  bonusIf?: BonusRule[];
  fatalIf?: FatalRule[];
};

type ChatTurn = { role: 'user' | 'assistant'; content: string };
type Msg = { id: number; kind: 'npc' | 'you' | 'warn'; text: string; thinking?: boolean };

type GradeResult = {
  overallScore?: number;
  softSkills?: Record<string, number>;
  bonusHits?: string[];
  fatalsTriggered?: string[];
  overall?: string;
};

// Kiểu tối thiểu cho Web Speech API (chưa có trong lib DOM chuẩn của TS).
type SpeechRec = {
  lang: string;
  onresult: ((e: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechRecCtor = new () => SpeechRec;

// Bắc cầu adaptive engine (adaptive-bridge.js gắn window.EduAdaptive ở app cũ).
declare global {
  interface Window {
    EduAdaptive?: {
      event: (p: { skill: string; correct: boolean; domain?: string; context?: string }) => Promise<unknown>;
    };
    SpeechRecognition?: SpeechRecCtor;
    webkitSpeechRecognition?: SpeechRecCtor;
  }
}

const SOFT_SKILL_LABEL: Record<string, string> = {
  empathy: 'Đồng cảm',
  clarity: 'Rõ ràng',
  persuasion: 'Thuyết phục',
  professionalism: 'Chuyên nghiệp',
};

export default function NegotiationPage() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [stageIdx, setStageIdx] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [resultTitle, setResultTitle] = useState('');
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);

  const historyRef = useRef<ChatTurn[]>([]);
  const msgIdRef = useRef(0);
  const msgsEndRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<SpeechRec | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Tải kịch bản từ DB (không hardcode content).
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch('/api/content/negotiation', { credentials: 'same-origin' });
        if (r.ok) {
          const j = await r.json();
          if (alive) setScenarios((j.items as Scenario[]) || []);
        }
      } catch {
        /* offline — để danh sách rỗng */
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const pushMsg = useCallback((kind: Msg['kind'], text: string, thinkingFlag = false): number => {
    const id = ++msgIdRef.current;
    setMessages((m) => [...m, { id, kind, text, thinking: thinkingFlag }]);
    return id;
  }, []);

  const startSim = useCallback(
    (id: string) => {
      const sc = scenarios.find((s) => s.id === id) || null;
      if (!sc) return;
      historyRef.current = [];
      msgIdRef.current = 0;
      setCurrent(sc);
      setStageIdx(0);
      setResult(null);
      setMessages([{ id: ++msgIdRef.current, kind: 'npc', text: sc.openingLine }]);
      historyRef.current.push({ role: 'assistant', content: sc.openingLine });
    },
    [scenarios],
  );

  const backToList = useCallback(() => {
    setCurrent(null);
    setResult(null);
  }, []);

  const speak = useCallback((t: string) => {
    if (typeof speechSynthesis === 'undefined') return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'vi-VN';
    u.rate = 1.0;
    const v = pickVoice('vi'); // giọng chọn theo chất lượng — lib/tts.ts
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }, []);

  const send = useCallback(async () => {
    if (thinking || !current) return;
    const text = input.trim();
    if (!text) return;
    setInput('');
    pushMsg('you', text);
    historyRef.current.push({ role: 'user', content: text });

    // Kiểm tra bẫy fatal — cảnh báo tại chỗ.
    for (const f of current.fatalIf || []) {
      try {
        if (new RegExp(f.trigger, 'i').test(text)) {
          pushMsg('warn', '⚠ ' + f.reason);
          break;
        }
      } catch {
        /* regex lỗi → bỏ qua */
      }
    }

    // Tự tiến giai đoạn mỗi ~3 lượt (heuristic như bản gốc).
    let nextStage = stageIdx;
    if (historyRef.current.length % 6 === 0 && stageIdx < current.stages.length - 1) {
      nextStage = stageIdx + 1;
      setStageIdx(nextStage);
    }

    const tId = pushMsg('npc', '...', true);
    setThinking(true);
    try {
      const res = await fetch('/api/ai/negotiate', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: current.id,
          persona: current.persona,
          role: current.npcRole,
          stage: current.stages[nextStage]?.id,
          history: historyRef.current,
          message: text,
        }),
      });
      const data = await res.json();
      const reply = data.reply || '...';
      setMessages((m) => m.map((msg) => (msg.id === tId ? { ...msg, text: reply, thinking: false } : msg)));
      historyRef.current.push({ role: 'assistant', content: reply });
      speak(reply);
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      setMessages((m) => m.map((msg) => (msg.id === tId ? { ...msg, text: '⚠ Lỗi: ' + err, thinking: false } : msg)));
    } finally {
      setThinking(false);
    }
  }, [thinking, current, input, stageIdx, pushMsg, speak]);

  const finish = useCallback(async () => {
    if (!current || historyRef.current.length < 4) {
      alert('Đàm phán quá ngắn — trao đổi thêm vài lượt trước khi chấm.');
      return;
    }
    const title = current.title;
    try {
      const res = await fetch('/api/ai/negotiate-grade', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: current.id,
          title: current.title,
          rubric: current.rubric,
          bonusIf: current.bonusIf,
          fatalIf: current.fatalIf,
          transcript: historyRef.current,
        }),
      });
      const data: GradeResult = await res.json();
      setResultTitle(title);
      setResult(data);
      setCurrent(null);
      // Sự kiện adaptive (nếu bridge tồn tại).
      try {
        if (window.EduAdaptive) {
          await window.EduAdaptive.event({
            skill: 'negotiate-' + current.id,
            correct: (data.overallScore || 0) >= 0.6,
            domain: current.domain,
            context: current.id,
          });
        }
      } catch {
        /* adaptive optional */
      }
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      alert('⚠ Lỗi chấm điểm: ' + err);
    }
  }, [current]);

  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [result]);

  const toggleMic = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
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
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + ' ' : '') + t);
    };
    rec.onend = () => {
      setListening(false);
      micRef.current = null;
    };
    rec.start();
    micRef.current = rec;
    setListening(true);
  }, []);

  const showSim = current !== null;

  return (
    <div className="neg-wrap">
      <ScopedStyle />

      <div className="neg-head">
        <Link href="/index" className="neg-back">
          ← Trang chủ
        </Link>
        <h1>🤝 Mô phỏng đàm phán (Game Theory)</h1>
      </div>

      {/* PICKER */}
      {!showSim && (
        <div>
          <p className="neg-tagline">
            4 kịch bản Việt: phỏng vấn IT (junior/senior), tư vấn BN ngại uống thuốc, và trình dược viên đàm phán giá với
            bệnh viện. NPC AI phản ứng theo lựa chọn của bạn — hợp tác → mở lòng, thô vụng → phòng thủ. Cuối phiên, AI
            giảng viên chấm điểm kỹ năng mềm.
          </p>

          {loading ? (
            <p className="neg-muted">Đang tải kịch bản…</p>
          ) : scenarios.length === 0 ? (
            <p className="neg-muted">Chưa tải được kịch bản. Hãy thử lại sau.</p>
          ) : (
            <div className="neg-grid">
              {scenarios.map((n) => (
                <div
                  key={n.id}
                  className="neg-card"
                  style={{ ['--card-color' as string]: n.color }}
                  onClick={() => startSim(n.id)}
                >
                  <div className="neg-ico">{n.icon}</div>
                  <div className="neg-audience">{n.audience}</div>
                  <h3>{n.title}</h3>
                  <div className="neg-you">
                    <b>Bạn:</b> {(n.youAre || '').slice(0, 120)}…
                  </div>
                  <div className="neg-npc">
                    <b>NPC:</b> {n.npcRole}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SIM */}
      {showSim && current && (
        <div className="neg-sim">
          <div className="neg-chat">
            <div className="neg-chat-head">
              <div
                className="neg-ava"
                style={{ background: `linear-gradient(135deg, ${current.color}, rgba(0,0,0,0.3))` }}
              >
                {current.icon}
              </div>
              <div className="neg-info">
                <div className="neg-role">{current.npcRole}</div>
                <div className="neg-stage">
                  Bạn đóng vai: <span>{(current.youAre || '').split('.')[0]}</span>
                </div>
              </div>
              <button className="neg-btn" onClick={backToList}>
                ← Đổi kịch bản
              </button>
              <button className="neg-btn neg-finish" onClick={finish}>
                Kết thúc + chấm
              </button>
            </div>

            <div className="neg-stages-bar">
              {current.stages.map((s, i) => (
                <div
                  key={s.id}
                  className={
                    'neg-stage-chip ' + (i < stageIdx ? 'done' : i === stageIdx ? 'current' : '')
                  }
                >
                  {i + 1}. {s.name.split('—')[0].trim()}
                </div>
              ))}
            </div>

            <div className="neg-msgs">
              {messages.map((m) => (
                <div key={m.id} className={'neg-msg ' + m.kind + (m.thinking ? ' thinking' : '')}>
                  {m.text}
                </div>
              ))}
              <div ref={msgsEndRef} />
            </div>

            <div className="neg-input">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Phản hồi NPC… (Enter để gửi)"
              />
              <button
                className={'neg-mic' + (listening ? ' listening' : '')}
                title="Nói"
                onClick={toggleMic}
              >
                🎤
              </button>
              <button className="neg-send" onClick={send}>
                ➤
              </button>
            </div>
          </div>

          <aside className="neg-side">
            <div className="neg-block">
              <h3>🎭 Bạn đóng vai</h3>
              <div className="neg-block-body">{current.youAre}</div>
            </div>
            <div className="neg-block">
              <h3>🤖 NPC là</h3>
              <div className="neg-block-body">{(current.persona || '').split('\n')[0]}</div>
            </div>
            <div className="neg-block">
              <h3>📋 Giai đoạn cần đi qua</h3>
              <ol className="neg-stages-list">
                {current.stages.map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ol>
            </div>
            <div className="neg-block">
              <h3>🎯 Rubric chấm cuối phiên</h3>
              <ul className="neg-rubric">
                {current.rubric.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <ResultPanel ref={resultRef} result={result} title={resultTitle} />
      )}
    </div>
  );
}

// ── Bảng kết quả chấm điểm ──
function ResultPanel({
  result,
  title,
  ref,
}: {
  result: GradeResult;
  title: string;
  ref: React.Ref<HTMLDivElement>;
}) {
  const score = Math.round((result.overallScore || 0) * 100);
  const ss = result.softSkills || {};
  const fatals = result.fatalsTriggered || [];
  const bonuses = result.bonusHits || [];
  const scoreColor = score >= 70 ? '#10b981' : score >= 50 ? '#fbbf24' : '#ef4444';

  return (
    <div className="neg-result" ref={ref}>
      <h3>🎓 Kết quả đàm phán — {title}</h3>
      <div>
        <b>Điểm tổng:</b>{' '}
        <span style={{ fontSize: 28, color: scoreColor, fontWeight: 800 }}>{score}/100</span>
      </div>

      {fatals.length > 0 && (
        <>
          <div style={{ marginTop: 10 }}>
            <b>⛔ Lỗi nghiêm trọng:</b>
          </div>
          {fatals.map((f, i) => (
            <div key={i} className="neg-fatal">
              {f}
            </div>
          ))}
        </>
      )}

      {bonuses.length > 0 && (
        <>
          <div style={{ marginTop: 12 }}>
            <b>✅ Đã làm tốt:</b>
          </div>
          {bonuses.map((b, i) => (
            <div key={i} className="neg-bonus">
              + {b}
            </div>
          ))}
        </>
      )}

      {Object.keys(ss).length > 0 && (
        <>
          <h4 style={{ marginTop: 14 }}>Kỹ năng mềm</h4>
          <div className="neg-skill-grid">
            {(['empathy', 'clarity', 'persuasion', 'professionalism'] as const)
              .filter((k) => ss[k] !== undefined)
              .map((k) => (
                <div key={k} className="neg-skill">
                  <div className="l">{SOFT_SKILL_LABEL[k]}</div>
                  <div
                    className="v"
                    style={{ color: ss[k] >= 0.7 ? '#10b981' : ss[k] >= 0.5 ? '#fbbf24' : '#ef4444' }}
                  >
                    {Math.round(ss[k] * 100)}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {result.overall && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 10,
            lineHeight: 1.6,
          }}
        >
          {result.overall}
        </div>
      )}
    </div>
  );
}

// ── CSS scoped (giữ nguyên thương hiệu tối/gradient của trang gốc) ──
function ScopedStyle() {
  return (
    <style>{`
      .neg-wrap { max-width: 1200px; margin: 0 auto; color: #fff; }
      .neg-muted { opacity: 0.75; font-size: 14px; }
      .neg-head { display: flex; gap: 14px; align-items: center; margin-bottom: 22px; flex-wrap: wrap; }
      .neg-back {
        padding: 8px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
        border-radius: 999px; color: #fff; text-decoration: none; font-size: 13px;
      }
      .neg-head h1 {
        margin: 0; font-size: 28px;
        background: linear-gradient(135deg, #ffffff, #fbbf24, #f97316);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .neg-tagline { opacity: 0.85; max-width: 800px; line-height: 1.6; margin: 0 0 22px; font-size: 14px; }
      .neg-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); }
      .neg-card {
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
        border-radius: 14px; padding: 20px; cursor: pointer; position: relative;
        transition: transform 0.15s, border-color 0.15s, background 0.15s; overflow: hidden;
      }
      .neg-card::before {
        content: ''; position: absolute; inset: 0;
        background: var(--card-color); opacity: 0.06; z-index: 0;
      }
      .neg-card > * { position: relative; z-index: 1; }
      .neg-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); border-color: var(--card-color); }
      .neg-ico { font-size: 36px; margin-bottom: 10px; }
      .neg-card h3 { margin: 0 0 6px; font-size: 16px; }
      .neg-audience {
        font-size: 11px; padding: 3px 10px; border-radius: 999px;
        background: var(--card-color); color: #fff; display: inline-block;
        font-weight: 700; margin-bottom: 10px;
      }
      .neg-you, .neg-npc { font-size: 12px; opacity: 0.85; margin-top: 6px; line-height: 1.4; }
      .neg-you b, .neg-npc b { color: var(--card-color); }

      .neg-sim { display: grid; grid-template-columns: 1fr 340px; gap: 18px; }
      @media (max-width: 880px) { .neg-sim { grid-template-columns: 1fr; } }
      .neg-chat {
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px;
        display: flex; flex-direction: column; min-height: 580px; max-height: 75vh;
      }
      .neg-chat-head {
        padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.12);
        display: flex; gap: 14px; align-items: center;
      }
      .neg-ava {
        width: 50px; height: 50px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0;
      }
      .neg-info { flex: 1; min-width: 0; }
      .neg-role { font-weight: 700; font-size: 14px; }
      .neg-stage { font-size: 11px; opacity: 0.7; }
      .neg-btn {
        padding: 7px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.06); color: #fff; font-size: 12px; cursor: pointer;
      }
      .neg-finish { background: linear-gradient(135deg, #10b981, #059669); border-color: transparent; }
      .neg-stages-bar { display: flex; gap: 4px; padding: 8px 18px; border-bottom: 1px solid rgba(255,255,255,0.12); }
      .neg-stage-chip {
        flex: 1; min-width: 60px; padding: 4px 8px; border-radius: 6px;
        font-size: 10px; text-align: center; background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08); opacity: 0.6;
      }
      .neg-stage-chip.done { opacity: 0.85; background: rgba(16,185,129,0.15); border-color: rgba(16,185,129,0.3); color: #6ee7b7; }
      .neg-stage-chip.current { opacity: 1; background: rgba(251,191,36,0.2); border-color: rgba(251,191,36,0.5); color: #fbbf24; font-weight: 700; }
      .neg-msgs { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
      .neg-msg { padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.55; max-width: 80%; white-space: pre-wrap; }
      .neg-msg.npc { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); align-self: flex-start; }
      .neg-msg.you { background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723; align-self: flex-end; }
      .neg-msg.warn { align-self: center; font-size: 12px; padding: 6px 14px; background: rgba(239,68,68,0.2); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3); }
      .neg-msg.thinking { opacity: 0.6; font-style: italic; }
      .neg-input { padding: 12px; border-top: 1px solid rgba(255,255,255,0.12); display: flex; gap: 8px; align-items: flex-end; }
      .neg-input textarea {
        flex: 1; resize: none; min-height: 40px; max-height: 100px;
        padding: 9px 12px; border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06);
        color: #fff; font-family: inherit; font-size: 14px;
      }
      .neg-mic, .neg-send { width: 40px; height: 40px; border-radius: 10px; border: none; cursor: pointer; font-size: 16px; flex-shrink: 0; }
      .neg-mic { background: rgba(255,255,255,0.1); color: #fff; }
      .neg-mic.listening { background: rgba(239,68,68,0.4); }
      .neg-send { background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723; }

      .neg-side {
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px;
        padding: 16px; display: flex; flex-direction: column; gap: 14px; max-height: 75vh; overflow-y: auto;
      }
      .neg-side h3 { margin: 0 0 4px; font-size: 13px; opacity: 0.9; }
      .neg-block { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; }
      .neg-block-body { font-size: 13px; line-height: 1.5; white-space: pre-wrap; }
      .neg-stages-list, .neg-rubric { padding-left: 18px; margin: 6px 0; font-size: 12px; line-height: 1.55; }

      .neg-result { background: rgba(255,255,255,0.06); border: 1px solid #10b981; border-radius: 14px; padding: 18px; margin-top: 18px; }
      .neg-result h3 { margin: 0 0 12px; color: #10b981; }
      .neg-skill-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-top: 12px; }
      .neg-skill { background: rgba(255,255,255,0.04); border-radius: 8px; padding: 10px; text-align: center; }
      .neg-skill .l { font-size: 11px; opacity: 0.7; }
      .neg-skill .v { font-size: 20px; font-weight: 800; margin: 4px 0; }
      .neg-fatal { background: rgba(220,38,38,0.15); border: 1px solid rgba(220,38,38,0.4); padding: 8px 12px; border-radius: 8px; color: #fca5a5; margin: 6px 0; }
      .neg-bonus { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); padding: 8px 12px; border-radius: 8px; color: #6ee7b7; margin: 6px 0; }
    `}</style>
  );
}
