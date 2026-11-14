'use client';

// Patient Simulation Việt Nam — migrate 1:1 từ public/patient-sim.html.
// Ca lâm sàng LẤY TỪ DB qua /api/content/patient-cases (KHÔNG hardcode content).
// Đối thoại + chấm qua /api/ai/sim-patient + /api/ai/sim-grade.
// Giữ theme thương hiệu warm (amber/orange) của trang gốc bằng scoped CSS.

import { useEffect, useRef, useState, useCallback } from 'react';
import { pickVoice } from '@/lib/tts';

// ── Kiểu dữ liệu ca (khớp public/js/scenarios/_data/patient-cases.js) ──
type Patient = {
  initials: string;
  ageYears: number;
  sex: string;
  job: string;
  comorbidities: string[];
  currentMeds: string[];
  allergies?: string[];
};
type Trigger = { trigger: string; reason?: string; text?: string };
type Drp = { type: string; text: string };
type PatientCase = {
  id: string;
  title: string;
  domain: string;
  difficulty: string;
  icon: string;
  color?: string;
  audience: string;
  chiefComplaint: string;
  openingLine: string;
  persona?: string;
  patient: Patient;
  vitals?: Record<string, string | number>;
  labs?: Record<string, string | number>;
  hiddenInfo?: Record<string, string>;
  rubric: string[];
  drps?: Drp[];
  fatalIf?: Trigger[];
  bonusIf?: Trigger[];
};
type Msg = { role: 'bn' | 'sv' | 'sys'; text: string; speakable?: boolean };
type Turn = { role: 'user' | 'assistant'; content: string };
type Grade = {
  overallScore?: number;
  fatalsTriggered?: string[];
  bonusHits?: string[];
  missedDRPs?: string[];
  overall?: string;
};

function shade(hex: string, p: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + p));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + p));
  const b = Math.max(0, Math.min(255, (n & 0xff) + p));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function speak(t: string) {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t);
  u.lang = 'vi-VN';
  u.rate = 1.0;
  const v = pickVoice('vi'); // giọng chọn theo chất lượng — lib/tts.ts
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}

export default function PatientSimPage() {
  const [cases, setCases] = useState<PatientCase[]>([]);
  const [current, setCurrent] = useState<PatientCase | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [gradedTitle, setGradedTitle] = useState('');

  const historyRef = useRef<Turn[]>([]);
  const msgsBoxRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<unknown>(null);
  const gradeRef = useRef<HTMLDivElement>(null);

  // Fetch ca lâm sàng từ DB (nguồn: content_datasets 'patient-cases').
  useEffect(() => {
    fetch('/api/content/patient-cases', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => setCases((d.items as PatientCase[]) || []))
      .catch(() => setCases([]));
  }, []);

  // Cuộn xuống cuối khi có tin nhắn mới.
  useEffect(() => {
    const box = msgsBoxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [msgs]);

  const startCase = useCallback((id: string) => {
    const c = cases.find((x) => x.id === id);
    if (!c) return;
    historyRef.current = [{ role: 'assistant', content: c.openingLine }];
    setGrade(null);
    setCurrent(c);
    setMsgs([{ role: 'bn', text: c.openingLine, speakable: true }]);
  }, [cases]);

  const backToList = () => {
    setCurrent(null);
  };

  const send = useCallback(async () => {
    if (thinking || !current) return;
    const text = input.trim();
    if (!text) return;
    setInput('');

    const newMsgs: Msg[] = [{ role: 'sv', text }];
    historyRef.current.push({ role: 'user', content: text });

    // Cảnh báo fatal trigger tại chỗ.
    for (const f of current.fatalIf || []) {
      try {
        if (new RegExp(f.trigger, 'i').test(text)) {
          newMsgs.push({ role: 'sys', text: `⛔ ${f.reason}` });
          break;
        }
      } catch { /* regex xấu → bỏ qua */ }
    }
    setMsgs((m) => [...m, ...newMsgs]);
    setThinking(true);

    try {
      const res = await fetch('/api/ai/sim-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          caseId: current.id,
          persona: current.persona,
          chiefComplaint: current.chiefComplaint,
          history: historyRef.current,
          hiddenInfo: current.hiddenInfo,
          message: text,
        }),
      });
      const data = await res.json();
      const reply = data.reply || '…';
      historyRef.current.push({ role: 'assistant', content: reply });
      setMsgs((m) => [...m, { role: 'bn', text: reply, speakable: true }]);
      speak(reply);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMsgs((m) => [...m, { role: 'bn', text: '⚠ Lỗi: ' + msg }]);
    } finally {
      setThinking(false);
    }
  }, [thinking, current, input]);

  const finish = useCallback(async () => {
    if (!current || historyRef.current.length < 4) {
      alert('Phỏng vấn quá ngắn — hãy hỏi thêm vài câu trước khi chấm.');
      return;
    }
    const res = await fetch('/api/ai/sim-grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        caseId: current.id,
        title: current.title,
        rubric: current.rubric,
        drps: current.drps,
        bonusIf: current.bonusIf,
        fatalIf: current.fatalIf,
        transcript: historyRef.current,
      }),
    });
    const data: Grade = await res.json();
    setGradedTitle(current.title);
    setGrade(data);
    setCurrent(null);
    // Ghi nhận vào lịch sử học tập (adaptive) nếu bridge có mặt.
    try {
      const w = window as unknown as {
        EduAdaptive?: { event: (e: Record<string, unknown>) => Promise<void> };
      };
      if (w.EduAdaptive) {
        await w.EduAdaptive.event({
          skill: 'patient-' + current.id,
          correct: (data.overallScore || 0) >= 0.7,
          domain: current.domain,
          context: current.id,
          durationMs: 0,
        });
      }
    } catch { /* bỏ qua */ }
  }, [current]);

  useEffect(() => {
    if (grade && gradeRef.current) {
      gradeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [grade]);

  const toggleMic = () => {
    const SR =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SR) {
      alert('Trình duyệt không hỗ trợ giọng nói. Dùng Chrome/Edge.');
      return;
    }
    if (micRef.current) {
      (micRef.current as { stop: () => void }).stop();
      micRef.current = null;
      setListening(false);
      return;
    }
    const rec = new (SR as new () => {
      lang: string;
      onresult: (e: { results: Array<Array<{ transcript: string }>> }) => void;
      onend: () => void;
      start: () => void;
    })();
    rec.lang = 'vi-VN';
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setInput((v) => (v ? v + ' ' : '') + t);
    };
    rec.onend = () => {
      setListening(false);
      micRef.current = null;
    };
    rec.start();
    micRef.current = rec;
    setListening(true);
  };

  const diffLabel = (d: string) => (d === 'easy' ? 'Dễ' : d === 'medium' ? 'TB' : 'Khó');
  const domainLabel = (d: string) =>
    d === 'pharmacy' ? 'Dược' : d === 'medical' ? 'Y khoa' : d;

  return (
    <div className="ps-root">
      <style>{PS_CSS}</style>
      <div className="ps-head">
        <h1>🩺 Patient Simulation Việt Nam</h1>
        <div className="ps-stats">
          {cases.length ? `${cases.length} ca lâm sàng · Y khoa + Dược lâm sàng` : 'Đang tải ca…'}
        </div>
      </div>

      {/* CASE PICKER */}
      {!current && (
        <div>
          <p className="ps-tagline">
            Trao đổi với bệnh nhân ảo (AI). Mỗi ca tham chiếu phác đồ Bộ Y tế VN, phù hợp môi
            trường lâm sàng Việt. Khi thấy đủ thông tin, bấm <b>&quot;Hoàn thành phỏng vấn&quot;</b>{' '}
            để AI chấm theo rubric + phát hiện DRP.
          </p>
          <div className="ps-cases">
            {cases.map((c) => (
              <div
                key={c.id}
                className="ps-case"
                style={{ ['--case-color' as string]: c.color || '#fbbf24' }}
                onClick={() => startCase(c.id)}
              >
                <div className={`ps-difficulty ${c.difficulty}`}>{diffLabel(c.difficulty)}</div>
                <div className="ps-ico">{c.icon}</div>
                <h3>{c.title}</h3>
                <div className="ps-meta">{c.audience}</div>
                <div className="ps-cc">{c.chiefComplaint}</div>
                <div className="ps-audience">{domainLabel(c.domain)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SIM ROOM */}
      {current && (
        <div className="ps-sim">
          <div className="ps-chat-panel">
            <div className="ps-chat-head">
              <div
                className="ps-av"
                style={{
                  background: `linear-gradient(135deg, ${current.color}, ${shade(
                    current.color || '#fbbf24',
                    -20,
                  )})`,
                }}
              >
                {current.icon}
              </div>
              <div className="ps-info">
                <div className="ps-name">
                  {current.patient.initials} · {current.patient.ageYears} tuổi ·{' '}
                  {current.patient.sex === 'M' ? 'Nam' : 'Nữ'}
                </div>
                <div className="ps-sub">{current.audience}</div>
              </div>
              <div className="ps-actions">
                <button onClick={backToList}>← Đổi ca</button>
                <button className="success" onClick={finish}>
                  Hoàn thành phỏng vấn
                </button>
              </div>
            </div>

            <div className="ps-chat-msgs" ref={msgsBoxRef}>
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`ps-msg ${m.role}`}
                >
                  {m.text}
                  {m.speakable && m.role === 'bn' && (
                    <span className="ps-speak" onClick={() => speak(m.text)}>
                      {' '}
                      🔊
                    </span>
                  )}
                </div>
              ))}
              {thinking && <div className="ps-msg bn ps-thinking">…</div>}
            </div>

            <div className="ps-chat-input">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Hỏi bệnh nhân… (Enter để gửi)"
              />
              <button
                className={`ps-mic ${listening ? 'listening' : ''}`}
                title="Nói"
                onClick={toggleMic}
              >
                🎤
              </button>
              <button className="ps-send" onClick={send}>
                ➤
              </button>
            </div>
          </div>

          <aside className="ps-side">
            <div className="ps-block">
              <h3>📋 Lý do đến khám</h3>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{current.chiefComplaint}</div>
            </div>
            <div className="ps-block">
              <h3>👤 Thông tin BN</h3>
              <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                <b>Nghề:</b> {current.patient.job}
                <br />
                <b>Bệnh nền:</b>{' '}
                {current.patient.comorbidities.length
                  ? current.patient.comorbidities.join(', ')
                  : 'Không'}
                <br />
                <b>Thuốc đang dùng:</b> {current.patient.currentMeds.join(', ') || 'Không'}
                <br />
                <b>Dị ứng:</b> {current.patient.allergies?.join(', ') || 'Chưa rõ'}
              </div>
            </div>
            <div className="ps-block">
              <h3>📈 Sinh hiệu</h3>
              <div>
                {Object.entries(current.vitals || {}).map(([k, v]) => (
                  <div className="ps-vital" key={k}>
                    <span className="l">{k}:</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ps-block">
              <h3>🧪 Cận lâm sàng</h3>
              <div style={{ fontSize: 12 }}>
                {Object.entries(current.labs || {}).map(([k, v]) => (
                  <div className="ps-vital" key={k}>
                    <span className="l">{k}:</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ps-block">
              <h3>🎯 Rubric đánh giá</h3>
              <ul className="ps-rubric" style={{ paddingLeft: 18, margin: '6px 0' }}>
                {current.rubric.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      {/* GRADE RESULT */}
      {grade && (
        <div className="ps-grade-result show" ref={gradeRef}>
          <h3>📊 Kết quả phỏng vấn — {gradedTitle}</h3>
          {(() => {
            const score = Math.round((grade.overallScore || 0) * 100);
            const fatal = grade.fatalsTriggered || [];
            const bonus = grade.bonusHits || [];
            const missed = grade.missedDRPs || [];
            return (
              <>
                <div className="ps-row">
                  <b>Điểm tổng:</b>{' '}
                  <span
                    style={{
                      fontSize: 24,
                      color: score >= 70 ? '#10b981' : score >= 50 ? '#fbbf24' : '#ef4444',
                      fontWeight: 800,
                    }}
                  >
                    {score}/100
                  </span>
                  {fatal.length > 0 && (
                    <span style={{ color: '#fca5a5', marginLeft: 12 }}>⛔ Có lỗi nghiêm trọng</span>
                  )}
                </div>
                {fatal.length > 0 && (
                  <>
                    <div>
                      <b>⛔ Lỗi nghiêm trọng (auto-fail criteria):</b>
                    </div>
                    {fatal.map((f, i) => (
                      <div className="ps-fatal" key={i}>
                        {f}
                      </div>
                    ))}
                  </>
                )}
                {bonus.length > 0 && (
                  <>
                    <div style={{ marginTop: 12 }}>
                      <b>✅ Điểm thưởng đã đạt:</b>
                    </div>
                    {bonus.map((b, i) => (
                      <div className="ps-bon" key={i}>
                        + {b}
                      </div>
                    ))}
                  </>
                )}
                {missed.length > 0 && (
                  <>
                    <div style={{ marginTop: 12 }}>
                      <b>⚠️ DRP còn bỏ sót:</b>
                    </div>
                    {missed.map((b, i) => (
                      <div className="ps-crit" key={i}>
                        {b}
                      </div>
                    ))}
                  </>
                )}
                {grade.overall && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: 12,
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: 10,
                      lineHeight: 1.6,
                    }}
                  >
                    {grade.overall}
                  </div>
                )}
                <div style={{ marginTop: 14, fontSize: 12, opacity: 0.7 }}>
                  Đã ghi nhận vào lịch sử học tập của bạn.
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// Scoped CSS — giữ nguyên theme thương hiệu warm (amber/orange) của trang gốc.
const PS_CSS = `
.ps-root { --accent:#fbbf24; --success:#10b981; --card:rgba(255,255,255,0.06);
  --card-h:rgba(255,255,255,0.12); --border:rgba(255,255,255,0.12); color:#fff; }
.ps-head { display:flex; gap:14px; align-items:center; margin-bottom:22px; flex-wrap:wrap; }
.ps-head h1 { margin:0; font-size:28px;
  background:linear-gradient(135deg,#ffffff 0%,#fbbf24 60%,#f97316 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent; }
.ps-stats { margin-left:auto; opacity:0.85; font-size:13px; }
.ps-tagline { opacity:0.85; font-size:14px; line-height:1.6; max-width:800px; margin:0 0 22px; }

.ps-cases { display:grid; gap:14px; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); }
.ps-case { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px;
  cursor:pointer; transition:transform .15s,background .15s,border-color .15s; position:relative; overflow:hidden; }
.ps-case::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--case-color); }
.ps-case:hover { background:var(--card-h); transform:translateY(-2px); border-color:var(--case-color); }
.ps-ico { font-size:38px; margin-bottom:8px; }
.ps-case h3 { margin:0 0 6px; font-size:16px; }
.ps-meta { font-size:11px; opacity:0.65; margin-bottom:8px; }
.ps-cc { font-size:13px; opacity:0.9; line-height:1.4; margin-bottom:10px; }
.ps-audience { font-size:11px; padding:4px 10px; border-radius:999px;
  background:rgba(14,165,233,0.15); color:#7dd3fc; display:inline-block; }
.ps-difficulty { position:absolute; top:14px; right:14px; font-size:10px; padding:3px 8px;
  border-radius:999px; font-weight:700; text-transform:uppercase; }
.ps-difficulty.easy { background:rgba(16,185,129,0.2); color:#34d399; }
.ps-difficulty.medium { background:rgba(251,191,36,0.2); color:#fbbf24; }
.ps-difficulty.hard { background:rgba(239,68,68,0.2); color:#f87171; }

.ps-sim { display:grid; grid-template-columns:1fr 320px; gap:18px; }
@media (max-width:880px) { .ps-sim { grid-template-columns:1fr; } }

.ps-chat-panel { background:var(--card); border:1px solid var(--border); border-radius:14px;
  display:flex; flex-direction:column; min-height:580px; max-height:75vh; }
.ps-chat-head { padding:14px 18px; border-bottom:1px solid var(--border); display:flex; gap:12px; align-items:center; }
.ps-av { width:48px; height:48px; border-radius:50%;
  background:linear-gradient(135deg,#fbbf24,#f97316); display:flex; align-items:center; justify-content:center; font-size:24px; }
.ps-info .ps-name { font-weight:700; font-size:15px; }
.ps-info .ps-sub { font-size:11px; opacity:0.7; }
.ps-actions { margin-left:auto; display:flex; gap:8px; }
.ps-actions button { padding:6px 12px; border-radius:8px; border:1px solid var(--border);
  background:rgba(255,255,255,0.06); color:#fff; font-size:12px; cursor:pointer; }
.ps-actions button.success { background:rgba(16,185,129,0.2); border-color:rgba(16,185,129,0.4); color:#6ee7b7; }
.ps-chat-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; }
.ps-msg { padding:10px 14px; border-radius:14px; font-size:14px; line-height:1.5; max-width:80%; }
.ps-msg.bn { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); align-self:flex-start; }
.ps-msg.sv { background:linear-gradient(135deg,#fbbf24,#f97316); color:#3e2723; align-self:flex-end; }
.ps-msg.sys { align-self:center; font-size:12px; opacity:0.7; font-style:italic; }
.ps-msg.ps-thinking { opacity:0.6; font-style:italic; }
.ps-speak { cursor:pointer; margin-left:6px; opacity:0.6; font-size:12px; }
.ps-speak:hover { opacity:1; }
.ps-chat-input { padding:12px; border-top:1px solid var(--border); display:flex; gap:8px; align-items:flex-end; }
.ps-chat-input textarea { flex:1; resize:none; min-height:38px; max-height:100px; padding:9px 12px;
  border-radius:10px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.06);
  color:#fff; font-family:inherit; font-size:14px; }
.ps-chat-input button { width:40px; height:40px; border-radius:10px; border:none; cursor:pointer; font-size:16px; }
.ps-mic { background:rgba(255,255,255,0.1); color:#fff; }
.ps-mic.listening { background:#ef4444; }
.ps-send { background:linear-gradient(135deg,#fbbf24,#f97316); color:#3e2723; }

.ps-side { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px;
  display:flex; flex-direction:column; gap:14px; max-height:75vh; overflow-y:auto; }
.ps-side h3 { margin:0 0 6px; font-size:14px; opacity:0.9; }
.ps-block { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:10px 12px; }
.ps-vital { display:flex; justify-content:space-between; font-size:12px; padding:3px 0; }
.ps-vital .l { opacity:0.7; }
.ps-vital .v { font-weight:600; font-variant-numeric:tabular-nums; }
.ps-rubric li { font-size:12px; margin:4px 0; opacity:0.85; }

.ps-grade-result { background:var(--card); border:1px solid var(--success); border-radius:14px; padding:18px; margin-top:18px; }
.ps-grade-result h3 { margin:0 0 12px; color:var(--success); }
.ps-row { margin:8px 0; }
.ps-crit { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:8px 12px; border-radius:8px; color:#fca5a5; margin:6px 0; }
.ps-bon { background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:8px 12px; border-radius:8px; color:#6ee7b7; margin:6px 0; }
.ps-fatal { background:rgba(220,38,38,0.2); border:1px solid rgba(220,38,38,0.5); padding:10px 14px; border-radius:8px; color:#fca5a5; margin:6px 0; font-weight:600; }
`;
