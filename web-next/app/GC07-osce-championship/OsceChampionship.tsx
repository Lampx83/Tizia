'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ============================================================
// Shapes — giống item collection 'osce-exam' backend trả về.
// Content (đề, câu hỏi, DRP, checklist…) LẤY TỪ DB, không hardcode.
// ============================================================
export type Question = { stem: string; options: string[]; answer: number; explain?: string };
export type MatchItem = { drug: string; category: string };
export type Rubric = { S: number; O: number; A: number; P: number; total: number };

export type Station = {
  n: number;
  title: string;
  kind: string; // quiz | drag-match | calculator | arrange | soap-write | patient-roleplay
  maxTimeS?: number;
  weight: number;
  scenario?: string;
  // per-kind payloads
  questions?: Question[];
  items?: MatchItem[];
  drps?: string[];
  tasks?: string[];
  formulas?: string[];
  correctOrder?: string[];
  rubric?: Rubric;
  caseRef?: string;
  checklist?: string[];
};

export type OsceExam = {
  id: string;
  title: string;
  totalTimeS?: number;
  passingScore: number;
  stations: Station[];
};

type Result = {
  n: number;
  title: string;
  kind: string;
  score: number; // 0..1 (with bonus)
  rawScore: number;
  bonus: number;
  weight: number;
  timeSpentS: number;
  maxTimeS: number;
  autoSubmitted: boolean;
  skipped: boolean;
};

type Phase = 'welcome' | 'exam' | 'final';

const VERSION = 'GC07-osce-championship';
const STATE_KEY = 'tizia:osce-championship:state';
const PLAYER_KEY = 'tizia:playerName';
const CLASS_KEY = 'tizia:classCode';

// ============================================================
// localStorage helpers (khớp js/api.js + engine/storage.js)
// ============================================================
function lsGet(key: string): string {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}
function getPlayerName() { return lsGet(PLAYER_KEY); }
function getClassCode() { return lsGet(CLASS_KEY); }
function setPlayerName(name: string) {
  const clean = String(name || '').trim().slice(0, 40);
  try { if (clean) localStorage.setItem(PLAYER_KEY, clean); } catch { /* noop */ }
  return clean;
}
function setClassCode(code: string) {
  const c = String(code || '').trim().toUpperCase().slice(0, 12);
  try {
    if (c) localStorage.setItem(CLASS_KEY, c);
    else localStorage.removeItem(CLASS_KEY);
  } catch { /* noop */ }
  return c;
}

// Persisted running state.
type PersistedState = {
  phase: Phase;
  playerName: string;
  classCode: string;
  currentStation: number;
  examStartAt: number;
  stationStartAt: number;
  answers: Record<string, unknown>;
  results: Result[];
};
function loadPersisted(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedState;
    if (data.phase === 'exam') return data;
    return null;
  } catch { return null; }
}
function clearPersisted() { try { localStorage.removeItem(STATE_KEY); } catch { /* noop */ } }

// ============================================================
// Pure helpers
// ============================================================
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function formatDuration(s: number): string {
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60), r = s % 60;
  return `${m}m${r > 0 ? ' ' + r + 's' : ''}`;
}
function formatDateCompact(d: Date): string {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}
function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

// ============================================================
// Scoped brand CSS — giữ nguyên "OSCE Championship" theme của trang gốc
// (tối tím/vàng, khác app theme). Xem risks.
// ============================================================
const OSCE_CSS = `
.osce-root {
  --bg-1: #0f172a; --bg-2: #1e293b; --bg-3: #312e81;
  --accent: #fbbf24; --accent-2: #f59e0b;
  --success: #10b981; --info: #0ea5e9;
  --danger: #ef4444; --warn: #f59e0b;
  --card: rgba(255,255,255,0.06); --border: rgba(255,255,255,0.12);
  --soft: rgba(255,255,255,0.04);
  color: white;
  font-family: 'Inter', system-ui, sans-serif;
  border-radius: 18px;
  padding: 24px 16px;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.25), transparent),
    radial-gradient(ellipse 60% 50% at 80% 30%, rgba(14,165,233,0.18), transparent),
    linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 60%, var(--bg-3) 100%);
}
.osce-root * { box-sizing: border-box; }
.osce-container { width: 100%; margin: 0 auto; }
.osce-top-nav { display: flex; gap: 12px; margin-bottom: 20px; opacity: 0.85; font-size: 14px; }
.osce-top-nav a { color: rgba(255,255,255,0.7); text-decoration: none; }
.osce-top-nav a:hover { color: white; }

.osce-welcome {
  background: linear-gradient(160deg, rgba(251,191,36,0.08), rgba(139,92,246,0.08));
  border: 1px solid var(--border); border-radius: 18px;
  padding: 36px 28px; text-align: center; margin-top: 28px;
}
.osce-welcome h1 { margin: 0 0 8px; font-size: 36px; letter-spacing: -0.02em; }
.osce-welcome .osce-badge {
  display: inline-block; background: var(--accent); color: #1f2937;
  padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;
}
.osce-welcome .osce-subtitle { opacity: 0.85; font-size: 15px; margin-bottom: 26px; }
.osce-stations-overview {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px; margin: 22px 0; text-align: left;
}
.osce-st-pill {
  background: var(--soft); border: 1px solid var(--border);
  border-radius: 10px; padding: 8px 12px; font-size: 12px;
}
.osce-st-pill .osce-st-num { color: var(--accent); font-weight: 700; }
.osce-st-pill .osce-st-w { float: right; opacity: 0.6; }
.osce-form-row { display: flex; flex-direction: column; gap: 6px; margin: 14px auto; max-width: 360px; text-align: left; }
.osce-form-row label { font-size: 13px; opacity: 0.8; }
.osce-form-row input {
  padding: 12px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.97); color: #1f2937; font-size: 15px; font-family: inherit;
}
.osce-warn-card {
  background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.4);
  border-radius: 12px; padding: 14px 18px; margin: 18px auto; max-width: 560px;
  font-size: 13px; line-height: 1.5; text-align: left;
}
.osce-start-btn {
  display: inline-block; padding: 14px 32px; border: none; border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #1f2937; font-weight: 800; cursor: pointer;
  font-family: inherit; font-size: 17px; letter-spacing: 0.02em;
  box-shadow: 0 8px 22px rgba(251,191,36,0.35); transition: transform 0.15s;
}
.osce-start-btn:hover { transform: translateY(-2px); }
.osce-start-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.osce-exam-header {
  position: sticky; top: 12px; z-index: 10;
  background: rgba(15,23,42,0.92); backdrop-filter: blur(12px);
  border: 1px solid var(--border); border-radius: 14px;
  padding: 14px 20px; margin-bottom: 18px;
  display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
}
.osce-progress-block { flex: 1 1 280px; }
.osce-progress-meta { display: flex; justify-content: space-between; font-size: 12px; opacity: 0.85; margin-bottom: 6px; }
.osce-progress-track { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
.osce-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--success)); transition: width 0.4s ease; }
.osce-timer-block { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.osce-timer-label { font-size: 11px; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.06em; }
.osce-timer-value { font-size: 28px; font-weight: 800; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
.osce-timer-value.warn { color: var(--warn); }
.osce-timer-value.danger { color: var(--danger); animation: osce-pulse 1s infinite; }
@keyframes osce-pulse { 50% { opacity: 0.55; } }

.osce-station-title { font-size: 24px; font-weight: 700; margin: 4px 0 4px; }
.osce-station-kind { font-size: 12px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.06em; }
.osce-station-scenario {
  background: var(--card); border-left: 3px solid var(--accent);
  border-radius: 10px; padding: 14px 18px; margin: 14px 0; font-size: 14px; line-height: 1.6;
}
.osce-station-body { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px; margin-bottom: 16px; }

.osce-field-label { font-size: 13px; opacity: 0.8; margin-bottom: 6px; display: block; }
.osce-text-input, .osce-num-input, .osce-root textarea {
  width: 100%; padding: 10px 12px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.96); color: #1f2937;
  font-family: inherit; font-size: 14px;
}
.osce-root textarea { min-height: 110px; resize: vertical; line-height: 1.5; }
.osce-word-count { font-size: 12px; opacity: 0.65; margin-top: 4px; text-align: right; }

.osce-quiz-q { background: var(--soft); border-radius: 10px; padding: 14px 16px; margin-bottom: 10px; }
.osce-quiz-stem { font-size: 14px; line-height: 1.55; margin-bottom: 10px; }
.osce-quiz-opts { display: flex; flex-direction: column; gap: 6px; }
.osce-quiz-opt {
  background: rgba(255,255,255,0.04); padding: 9px 12px; border-radius: 8px;
  cursor: pointer; display: flex; align-items: center; gap: 9px;
  border: 1px solid transparent; transition: all 0.12s;
}
.osce-quiz-opt:hover { background: rgba(255,255,255,0.08); }
.osce-quiz-opt input { accent-color: var(--accent); }
.osce-quiz-opt.checked { border-color: var(--accent); background: rgba(251,191,36,0.08); }

.osce-match-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.osce-match-col h4 { margin: 0 0 8px; font-size: 13px; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em; }
.osce-match-item {
  background: var(--soft); padding: 10px 12px; border-radius: 8px; margin-bottom: 6px;
  cursor: pointer; font-size: 13px; transition: all 0.12s; border: 2px solid transparent;
}
.osce-match-item:hover { background: rgba(255,255,255,0.1); }
.osce-match-item.selected { border-color: var(--accent); background: rgba(251,191,36,0.12); }
.osce-match-item.paired { opacity: 0.55; background: rgba(16,185,129,0.12); border-color: var(--success); cursor: default; }
.osce-pairs-display { margin-top: 12px; font-size: 12px; opacity: 0.85; }

.osce-arrange-list { display: flex; flex-direction: column; gap: 6px; }
.osce-arrange-item {
  background: var(--soft); padding: 10px 12px; border-radius: 8px;
  display: flex; align-items: center; gap: 12px; cursor: move; font-size: 13px;
  border: 1px solid transparent; transition: all 0.12s;
}
.osce-arrange-item:hover { background: rgba(255,255,255,0.08); border-color: var(--border); }
.osce-arrange-item.dragging { opacity: 0.45; }
.osce-arrange-handle { color: var(--accent); font-weight: 700; min-width: 22px; }
.osce-arrange-actions { margin-left: auto; display: flex; gap: 4px; }
.osce-arrange-btn {
  background: rgba(255,255,255,0.08); border: 1px solid var(--border);
  color: white; padding: 3px 9px; border-radius: 6px; cursor: pointer; font-size: 12px;
}
.osce-arrange-btn:hover { background: rgba(255,255,255,0.15); }

.osce-calc-tasks { font-size: 13px; line-height: 1.6; margin-bottom: 10px; opacity: 0.85; }
.osce-calc-tasks li { margin-bottom: 4px; }

.osce-roleplay-checklist {
  background: rgba(14,165,233,0.06); border: 1px solid rgba(14,165,233,0.3);
  border-radius: 10px; padding: 12px 16px; margin-bottom: 14px; font-size: 13px;
}
.osce-roleplay-checklist h5 { margin: 0 0 6px; font-size: 13px; color: var(--info); }
.osce-roleplay-checklist ul { margin: 0; padding-left: 18px; line-height: 1.6; }

.osce-nav-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 14px; }
.osce-skip-link { font-size: 12px; opacity: 0.55; cursor: pointer; }
.osce-skip-link:hover { opacity: 0.85; text-decoration: underline; }
.osce-next-btn {
  padding: 12px 24px; border: none; border-radius: 10px;
  background: var(--success); color: white; font-weight: 700; cursor: pointer;
  font-family: inherit; font-size: 15px; transition: transform 0.12s;
}
.osce-next-btn:hover { transform: translateY(-1px); background: #34d399; }

.osce-final-wrap { text-align: center; padding: 12px 0 40px; }
.osce-final-headline { font-size: 32px; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.02em; }
.osce-final-score-block {
  display: inline-block; padding: 22px 36px; border-radius: 18px;
  background: var(--card); border: 1px solid var(--border); margin: 14px auto 20px;
}
.osce-final-score-value { font-size: 60px; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; }
.osce-final-score-label { font-size: 13px; opacity: 0.7; margin-top: 4px; }
.osce-traffic-tag {
  display: inline-block; padding: 6px 14px; border-radius: 999px;
  font-size: 13px; font-weight: 700; margin: 4px 0; letter-spacing: 0.04em;
}
.osce-traffic-tag.green { background: rgba(16,185,129,0.18); color: #6ee7b7; border: 1px solid var(--success); }
.osce-traffic-tag.yellow { background: rgba(245,158,11,0.18); color: #fcd34d; border: 1px solid var(--warn); }
.osce-traffic-tag.red { background: rgba(239,68,68,0.18); color: #fca5a5; border: 1px solid var(--danger); }

.osce-breakdown-table { width: 100%; margin-top: 20px; border-collapse: collapse; font-size: 13px; }
.osce-breakdown-table th, .osce-breakdown-table td {
  padding: 9px 12px; border-bottom: 1px solid var(--border); text-align: left;
}
.osce-breakdown-table th { background: rgba(255,255,255,0.05); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.7; }
.osce-breakdown-table td.right { text-align: right; font-variant-numeric: tabular-nums; }
.osce-breakdown-table tr.skipped td { opacity: 0.45; }

.osce-certificate {
  background: linear-gradient(140deg, rgba(251,191,36,0.12), rgba(245,158,11,0.05));
  border: 2px solid var(--accent); border-radius: 18px;
  padding: 32px 28px; margin: 28px 0; text-align: center;
  box-shadow: 0 18px 40px rgba(251,191,36,0.18);
}
.osce-certificate .osce-seal { font-size: 56px; margin-bottom: 8px; }
.osce-certificate h2 { margin: 0 0 6px; color: var(--accent); font-size: 24px; }
.osce-certificate .osce-recipient { font-size: 22px; margin: 14px 0 8px; font-weight: 700; }
.osce-certificate .osce-cert-meta { font-size: 12px; opacity: 0.8; margin-top: 14px; line-height: 1.6; }
.osce-certificate .osce-cert-id { font-family: 'Courier New', monospace; font-size: 13px; color: var(--accent); letter-spacing: 0.06em; }
.osce-download-btn {
  margin-top: 14px; background: rgba(255,255,255,0.1); border: 1px solid var(--border);
  color: white; padding: 9px 18px; border-radius: 10px; cursor: pointer;
  font-family: inherit; font-size: 13px;
}
.osce-download-btn:hover { background: rgba(255,255,255,0.18); }

.osce-back-row { margin-top: 30px; display: flex; gap: 10px; justify-content: center; }
.osce-back-btn {
  background: rgba(255,255,255,0.08); border: 1px solid var(--border);
  color: white; padding: 11px 22px; border-radius: 10px; cursor: pointer;
  font-family: inherit; font-size: 14px;
}
.osce-back-btn:hover { background: rgba(255,255,255,0.16); }

.osce-toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: rgba(0,0,0,0.85); color: white; padding: 10px 18px;
  border-radius: 10px; font-size: 13px; z-index: 100;
  border: 1px solid var(--border);
}

@media (max-width: 640px) {
  .osce-match-grid { grid-template-columns: 1fr; }
  .osce-welcome h1 { font-size: 28px; }
  .osce-timer-value { font-size: 22px; }
  .osce-final-score-value { font-size: 48px; }
}
`;

// Distractor cho câu drag-match kiểu DRP — logic chấm điểm client (không phải
// content bài thi trong DB), giữ nguyên như trang gốc.
const DRP_DISTRACTORS = [
  'Liều paracetamol quá thấp cho người 70 tuổi',
  'Warfarin chống chỉ định tuyệt đối với UTI',
  'Metformin tăng nguy cơ chảy máu',
];

// Heuristic đáp số calculator — logic chấm điểm client, giữ nguyên như trang gốc.
function inferCalculatorTarget(st: Station): { value: number | null; tolerance: number } {
  if (st.n === 3) return { value: 600, tolerance: 60 }; // AUC24 ≈ 600 ± 10%
  if (st.n === 9) return { value: 15, tolerance: 2 };   // mL/lần
  return { value: null, tolerance: 0 };
}

// ============================================================
// Component
// ============================================================
export default function OsceChampionship({ exam }: { exam: OsceExam }) {
  const totalWeight = useMemo(
    () => exam.stations.reduce((s, st) => s + (st.weight || 0), 0) || 100,
    [exam],
  );

  const [phase, setPhase] = useState<Phase>('welcome');
  const [playerName, setPlayerNameState] = useState('');
  const [classCode, setClassCodeState] = useState('');
  const [currentStation, setCurrentStation] = useState(0);
  const [timer, setTimer] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [resumeAvailable, setResumeAvailable] = useState<PersistedState | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Refs cho state không cần re-render mỗi giây.
  const examStartAtRef = useRef(0);
  const stationStartAtRef = useRef(0);
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultsRef = useRef<Result[]>([]);
  const timerRef = useRef(0);
  // Answer captors — mỗi station renderer đăng ký hàm chấm điểm hiện tại.
  const graderRef = useRef<(() => number) | null>(null);

  useEffect(() => { resultsRef.current = results; }, [results]);
  useEffect(() => { timerRef.current = timer; }, [timer]);

  // Boot: đọc tên/lớp + phát hiện phiên thi dở.
  useEffect(() => {
    setPlayerNameState(getPlayerName());
    setClassCodeState(getClassCode());
    setResumeAvailable(loadPersisted());
    return () => { if (timerIdRef.current) clearInterval(timerIdRef.current); };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((cur) => (cur === msg ? null : cur)), 3000);
  }, []);

  const savePersisted = useCallback((next: Partial<PersistedState>) => {
    try {
      const data: PersistedState = {
        phase: 'exam',
        playerName,
        classCode,
        currentStation,
        examStartAt: examStartAtRef.current,
        stationStartAt: stationStartAtRef.current,
        answers: {},
        results: resultsRef.current,
        ...next,
      };
      localStorage.setItem(STATE_KEY, JSON.stringify(data));
    } catch { /* noop */ }
  }, [playerName, classCode, currentStation]);

  // ----------------------------------------------------------
  // Timer
  // ----------------------------------------------------------
  const finishStationRef = useRef<(auto: boolean, skipped?: boolean) => void>(() => {});

  const startTimer = useCallback(() => {
    if (timerIdRef.current) clearInterval(timerIdRef.current);
    timerIdRef.current = setInterval(() => {
      const next = timerRef.current - 1;
      timerRef.current = next;
      setTimer(next);
      if (next <= 0) {
        if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }
        finishStationRef.current(true);
      }
    }, 1000);
  }, []);

  const enterStation = useCallback((idx: number, opts?: { keepResults?: boolean }) => {
    if (idx >= exam.stations.length) { showFinalRef.current(); return; }
    setPhase('exam');
    setCurrentStation(idx);
    stationStartAtRef.current = Date.now();
    const t = exam.stations[idx].maxTimeS || 300;
    timerRef.current = t;
    setTimer(t);
    graderRef.current = null;
    savePersisted({ currentStation: idx });
    startTimer();
    void opts;
  }, [exam, savePersisted, startTimer]);

  // ----------------------------------------------------------
  // Finish station: grade + record + advance
  // ----------------------------------------------------------
  const finishStation = useCallback((autoSubmit: boolean, skipped = false) => {
    if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }
    const idx = currentStation;
    const st = exam.stations[idx];

    let scoreNorm = 0;
    if (!skipped && graderRef.current) {
      try { scoreNorm = graderRef.current(); } catch (err) { console.warn('Grade error', err); scoreNorm = 0; }
    }

    const timeSpentS = Math.max(1, Math.round((Date.now() - stationStartAtRef.current) / 1000));
    const maxT = st.maxTimeS || 300;
    let bonus = 0;
    if (!autoSubmit && !skipped && timeSpentS < maxT * 0.8 && scoreNorm > 0) bonus = 0.05;
    const finalScore = Math.min(1, scoreNorm * (1 + bonus));

    const rec: Result = {
      n: st.n, title: st.title, kind: st.kind,
      score: finalScore, rawScore: scoreNorm, bonus,
      weight: st.weight, timeSpentS, maxTimeS: maxT,
      autoSubmitted: !!autoSubmit, skipped: !!skipped,
    };
    const nextResults = [...resultsRef.current, rec];
    resultsRef.current = nextResults;
    setResults(nextResults);
    savePersisted({ results: nextResults, currentStation: idx });

    if (autoSubmit) showToast('⏰ Hết giờ trạm — tự động chuyển trạm');
    if (skipped) showToast('Đã bỏ qua trạm này');

    enterStation(idx + 1);
  }, [currentStation, exam, enterStation, savePersisted, showToast]);

  useEffect(() => { finishStationRef.current = finishStation; }, [finishStation]);

  // ----------------------------------------------------------
  // Final
  // ----------------------------------------------------------
  const showFinalRef = useRef<() => void>(() => {});
  const submittedRef = useRef(false);
  const [certId, setCertId] = useState('');
  const [finalDateStr, setFinalDateStr] = useState('');

  const submitFinal = useCallback(async (total: number, totalTimeS: number, passing: boolean, cid: string) => {
    try {
      const payload = {
        version: VERSION,
        score: Math.round(total),
        durationMs: totalTimeS * 1000,
        rubricBreakdown: resultsRef.current.map((r) => ({
          criterion: `Trạm ${r.n}: ${r.title}`,
          score: r.score,
          weight: r.weight / 100,
          feedback: `${(r.score * 100).toFixed(0)}/100 · ${formatDuration(r.timeSpentS)}${r.bonus > 0 ? ' · +bonus' : ''}${r.autoSubmitted ? ' · auto' : ''}${r.skipped ? ' · skipped' : ''}`,
        })),
        meta: { stations: resultsRef.current.length, passing, certId: cid },
        playerName,
        classCode: classCode || undefined,
      };
      await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('[osce] submit failed', err);
    }
  }, [playerName, classCode]);

  const showFinal = useCallback(() => {
    setPhase('final');
    if (timerIdRef.current) { clearInterval(timerIdRef.current); timerIdRef.current = null; }

    let total = 0;
    resultsRef.current.forEach((r) => { total += r.score * (r.weight / totalWeight) * 100; });
    total = Math.round(total * 10) / 10;
    const passing = total >= (exam.passingScore || 60);
    const totalTimeS = Math.round((Date.now() - examStartAtRef.current) / 1000);

    const cid = `OSCE-${classCode || 'OPEN'}-${formatDateCompact(new Date())}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setCertId(cid);
    setFinalDateStr(new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));

    if (!submittedRef.current) {
      submittedRef.current = true;
      void submitFinal(total, totalTimeS, passing, cid);
    }
    clearPersisted();
  }, [exam, totalWeight, classCode, submitFinal]);

  useEffect(() => { showFinalRef.current = showFinal; }, [showFinal]);

  // ----------------------------------------------------------
  // Welcome actions
  // ----------------------------------------------------------
  const startExam = useCallback(() => {
    const name = playerName.trim();
    if (!name) { showToast('Vui lòng nhập họ tên trước khi bắt đầu'); return; }
    const cleanName = setPlayerName(name);
    setPlayerNameState(cleanName);
    const cc = classCode.trim();
    const cleanCc = cc ? setClassCode(cc) : '';
    setClassCodeState(cleanCc);
    examStartAtRef.current = Date.now();
    resultsRef.current = [];
    setResults([]);
    submittedRef.current = false;
    clearPersisted();
    setResumeAvailable(null);
    // examStartAt vào persisted qua enterStation → savePersisted.
    enterStation(0);
  }, [playerName, classCode, showToast, enterStation]);

  const resumeExam = useCallback(() => {
    const data = loadPersisted();
    if (!data) return;
    setPlayerNameState(data.playerName || playerName);
    setClassCodeState(data.classCode || classCode);
    examStartAtRef.current = data.examStartAt || Date.now();
    resultsRef.current = data.results || [];
    setResults(data.results || []);
    submittedRef.current = false;
    setResumeAvailable(null);
    enterStation(data.currentStation || 0);
  }, [playerName, classCode, enterStation]);

  const retryExam = useCallback(() => {
    clearPersisted();
    resultsRef.current = [];
    setResults([]);
    setCurrentStation(0);
    submittedRef.current = false;
    setPhase('welcome');
    setResumeAvailable(loadPersisted());
  }, []);

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  return (
    <div className="osce-root">
      <style dangerouslySetInnerHTML={{ __html: OSCE_CSS }} />
      <div className="osce-container">
        <div className="osce-top-nav">
          <a href="/index">← Trang chủ</a>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Năm 5 · OSCE Championship</span>
        </div>

        {phase === 'welcome' && (
          <Welcome
            exam={exam}
            playerName={playerName}
            classCode={classCode}
            onPlayerName={setPlayerNameState}
            onClassCode={setClassCodeState}
            onStart={startExam}
            resume={resumeAvailable}
            onResume={resumeExam}
          />
        )}

        {phase === 'exam' && (
          <ExamStation
            exam={exam}
            idx={currentStation}
            timer={timer}
            registerGrader={(fn) => { graderRef.current = fn; }}
            onNext={() => finishStation(false)}
            onSkip={() => {
              if (window.confirm('Bỏ qua trạm này? Bạn sẽ nhận 0 điểm cho trạm.')) finishStation(false, true);
            }}
          />
        )}

        {phase === 'final' && (
          <Final
            exam={exam}
            results={results}
            totalWeight={totalWeight}
            examStartAt={examStartAtRef.current}
            playerName={playerName}
            classCode={classCode}
            certId={certId}
            dateStr={finalDateStr}
            onRetry={retryExam}
          />
        )}
      </div>
      {toastMsg && <div className="osce-toast">{toastMsg}</div>}
    </div>
  );
}

// ============================================================
// Welcome
// ============================================================
function Welcome({
  exam, playerName, classCode, onPlayerName, onClassCode, onStart, resume, onResume,
}: {
  exam: OsceExam;
  playerName: string;
  classCode: string;
  onPlayerName: (v: string) => void;
  onClassCode: (v: string) => void;
  onStart: () => void;
  resume: PersistedState | null;
  onResume: () => void;
}) {
  const totalMin = Math.round((exam.totalTimeS || exam.stations.length * 300) / 60);
  return (
    <div className="osce-welcome">
      <div className="osce-badge">🏆 KỲ THI TỐT NGHIỆP</div>
      <h1>{exam.title}</h1>
      <div className="osce-subtitle">
        Kỳ thi OSCE Composite — 10 trạm, ~{totalMin} phút, đậu ≥ {exam.passingScore}/100
      </div>

      <div className="osce-stations-overview">
        {exam.stations.map((s) => (
          <div className="osce-st-pill" key={s.n}>
            <span className="osce-st-num">Trạm {s.n}</span>
            <span className="osce-st-w">{s.weight}%</span>
            <div style={{ marginTop: 4, fontSize: 13 }}>{s.title}</div>
          </div>
        ))}
      </div>

      <div className="osce-form-row">
        <label htmlFor="osce-player-input">Họ tên sinh viên</label>
        <input
          id="osce-player-input" className="osce-text-input" type="text"
          value={playerName} maxLength={40} placeholder="Nguyễn Văn A"
          onChange={(e) => onPlayerName(e.target.value)}
        />
      </div>
      <div className="osce-form-row">
        <label htmlFor="osce-class-input">Mã lớp (tuỳ chọn)</label>
        <input
          id="osce-class-input" className="osce-text-input" type="text"
          value={classCode} maxLength={12} placeholder="DH22DC1"
          onChange={(e) => onClassCode(e.target.value)}
        />
      </div>

      <div className="osce-warn-card">
        <b>⚠️ Lưu ý kỳ thi:</b>
        <ul style={{ margin: '6px 0 0', paddingLeft: 20, lineHeight: 1.65 }}>
          <li>10 trạm chạy nối tiếp, mỗi trạm ~5 phút có đồng hồ đếm ngược.</li>
          <li>Hết giờ trạm sẽ <b>tự chuyển sang trạm kế</b> — không quay lại được.</li>
          <li>Bài làm sớm hơn 80% thời gian được <b>thưởng +5%</b> điểm trạm đó.</li>
          <li>Đóng tab giữa kỳ thi sẽ được phục hồi tiến độ khi vào lại.</li>
        </ul>
      </div>

      <button className="osce-start-btn" onClick={onStart}>Bắt đầu OSCE</button>
      {resume && (
        <div style={{ marginTop: 14 }}>
          <button className="osce-back-btn" onClick={onResume}>
            ↻ Tiếp tục kỳ thi đang dở (Trạm {(resume.currentStation || 0) + 1})
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Exam station shell
// ============================================================
function ExamStation({
  exam, idx, timer, registerGrader, onNext, onSkip,
}: {
  exam: OsceExam;
  idx: number;
  timer: number;
  registerGrader: (fn: () => number) => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  const st = exam.stations[idx];
  const progressPct = Math.round((idx / exam.stations.length) * 100);
  const mins = Math.floor(timer / 60);
  const secs = timer % 60;
  const timerClass = timer <= 30 ? 'danger' : timer <= 60 ? 'warn' : '';

  return (
    <div>
      <div className="osce-exam-header">
        <div className="osce-progress-block">
          <div className="osce-progress-meta">
            <span><b>Trạm {idx + 1}/{exam.stations.length}</b> · {st.title}</span>
            <span>Trọng số {st.weight}%</span>
          </div>
          <div className="osce-progress-track">
            <div className="osce-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className="osce-timer-block">
          <div className="osce-timer-label">⏱️ Còn lại trạm này</div>
          <div className={`osce-timer-value ${timerClass}`}>
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="osce-station-kind">Kiểu: {st.kind}</div>
      <h2 className="osce-station-title">Trạm {st.n} · {st.title}</h2>

      {st.scenario && <div className="osce-station-scenario">📋 {st.scenario}</div>}

      <div className="osce-station-body">
        <StationBody station={st} registerGrader={registerGrader} />
      </div>

      <div className="osce-nav-row">
        <span className="osce-skip-link" onClick={onSkip}>Bỏ qua trạm này →</span>
        <button className="osce-next-btn" onClick={onNext}>Hoàn thành trạm {idx + 1} →</button>
      </div>
    </div>
  );
}

// Chọn renderer theo kind — remount khi đổi station (key = st.n ở parent list).
function StationBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  switch (station.kind) {
    case 'quiz': return <QuizBody key={station.n} station={station} registerGrader={registerGrader} />;
    case 'drag-match': return <DragMatchBody key={station.n} station={station} registerGrader={registerGrader} />;
    case 'calculator': return <CalculatorBody key={station.n} station={station} registerGrader={registerGrader} />;
    case 'arrange': return <ArrangeBody key={station.n} station={station} registerGrader={registerGrader} />;
    case 'soap-write': return <SoapBody key={station.n} station={station} registerGrader={registerGrader} />;
    case 'patient-roleplay': return <RoleplayBody key={station.n} station={station} registerGrader={registerGrader} />;
    default: return <GenericBody key={station.n} station={station} registerGrader={registerGrader} />;
  }
}

// ============================================================
// QUIZ
// ============================================================
function QuizBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const qs = station.questions || [];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answersRef = useRef(answers);
  useEffect(() => { answersRef.current = answers; }, [answers]);

  useEffect(() => {
    registerGrader(() => {
      let correct = 0;
      qs.forEach((q, i) => { if (answersRef.current[i] === q.answer) correct++; });
      return qs.length ? correct / qs.length : 0;
    });
  }, [registerGrader, qs]);

  return (
    <div>
      {qs.map((q, i) => (
        <div className="osce-quiz-q" key={i}>
          <div className="osce-quiz-stem"><b>Câu {i + 1}.</b> {q.stem}</div>
          <div className="osce-quiz-opts">
            {q.options.map((opt, j) => (
              <label className={`osce-quiz-opt ${answers[i] === j ? 'checked' : ''}`} key={j}>
                <input
                  type="radio" name={`q${i}`} value={j} checked={answers[i] === j}
                  onChange={() => setAnswers((prev) => ({ ...prev, [i]: j }))}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// DRAG-MATCH — 2 chế độ: items[] (ghép cặp) hoặc drps[] (tick DRP)
// ============================================================
function DragMatchBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  if (station.items && Array.isArray(station.items)) {
    return <MatchPairs station={station} registerGrader={registerGrader} />;
  }
  if (station.drps && Array.isArray(station.drps)) {
    return <DrpChecklist station={station} registerGrader={registerGrader} />;
  }
  registerGrader(() => 0);
  return null;
}

function MatchPairs({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const items = station.items!;
  const lefts = useMemo(() => items.map((i) => i.drug), [items]);
  const cats = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);
  const rights = useMemo(() => shuffle([...cats]), [cats]);

  const [pairs, setPairs] = useState<Record<number, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const pairsRef = useRef(pairs);
  useEffect(() => { pairsRef.current = pairs; }, [pairs]);

  useEffect(() => {
    registerGrader(() => {
      let correct = 0;
      items.forEach((item, idx) => { if (pairsRef.current[idx] === item.category) correct++; });
      return items.length ? correct / items.length : 0;
    });
  }, [registerGrader, items]);

  const pickRight = (cat: string) => {
    if (selectedLeft === null) return;
    setPairs((prev) => ({ ...prev, [selectedLeft]: cat }));
    setSelectedLeft(null);
  };

  return (
    <div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
        Bấm chọn 1 thuốc bên trái, rồi bấm phân loại bên phải để ghép cặp.
      </p>
      <div className="osce-match-grid">
        <div className="osce-match-col">
          <h4>Thuốc</h4>
          {lefts.map((l, i) => {
            const paired = pairs[i] !== undefined;
            const cls = `osce-match-item ${paired ? 'paired' : ''} ${selectedLeft === i ? 'selected' : ''}`;
            return (
              <div
                className={cls} key={i}
                onClick={() => { if (!paired) setSelectedLeft(i); }}
              >
                {l}
                {paired && <span style={{ opacity: 0.7 }}> → {pairs[i]}</span>}
              </div>
            );
          })}
        </div>
        <div className="osce-match-col">
          <h4>Phân loại</h4>
          {rights.map((r, i) => (
            <div className="osce-match-item" key={i} onClick={() => pickRight(r)}>{r}</div>
          ))}
        </div>
      </div>
      <div className="osce-pairs-display">Đã ghép {Object.keys(pairs).length}/{lefts.length}</div>
    </div>
  );
}

function DrpChecklist({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const mixed = useMemo(() => {
    const all = (station.drps || []).map((d) => ({ text: d, correct: true }));
    const dis = DRP_DISTRACTORS.map((d) => ({ text: d, correct: false }));
    return shuffle([...all, ...dis]);
  }, [station.drps]);

  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const checkedRef = useRef(checked);
  useEffect(() => { checkedRef.current = checked; }, [checked]);

  useEffect(() => {
    registerGrader(() => {
      let tp = 0, fp = 0, fn = 0;
      mixed.forEach((m, i) => {
        const isChecked = !!checkedRef.current[i];
        if (isChecked && m.correct) tp++;
        else if (isChecked && !m.correct) fp++;
        else if (!isChecked && m.correct) fn++;
      });
      const total = tp + fn;
      if (total === 0) return 0;
      const precision = tp / Math.max(1, tp + fp);
      const recall = tp / total;
      return 0.5 * precision + 0.5 * recall;
    });
  }, [registerGrader, mixed]);

  return (
    <div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
        Đánh dấu các DRP (Vấn đề liên quan tới thuốc) mà bạn phát hiện được trong đơn.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mixed.map((m, i) => (
          <label
            className="osce-match-item"
            key={i}
            style={{ cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start', border: '1px solid var(--border)' }}
          >
            <input
              type="checkbox" checked={!!checked[i]} style={{ marginTop: 3, accentColor: 'var(--accent)' }}
              onChange={(e) => setChecked((prev) => ({ ...prev, [i]: e.target.checked }))}
            />
            <span>{m.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CALCULATOR
// ============================================================
function CalculatorBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const [finalVal, setFinalVal] = useState('');
  const [work, setWork] = useState('');
  const finalRef = useRef(finalVal);
  const workRef = useRef(work);
  useEffect(() => { finalRef.current = finalVal; }, [finalVal]);
  useEffect(() => { workRef.current = work; }, [work]);

  useEffect(() => {
    const target = inferCalculatorTarget(station);
    registerGrader(() => {
      const val = parseFloat(finalRef.current);
      const w = workRef.current.trim();
      let score = 0;
      if (!isNaN(val) && target.value !== null) {
        if (Math.abs(val - target.value) <= target.tolerance) score = 0.7;
        else if (Math.abs(val - target.value) <= target.tolerance * 2) score = 0.4;
        else score = 0.1;
      }
      if (w.length >= 60) score += 0.3;
      else if (w.length >= 25) score += 0.15;
      return Math.min(1, score);
    });
  }, [registerGrader, station]);

  return (
    <div>
      {station.tasks && (
        <div className="osce-calc-tasks">
          <b>Các bước tính:</b>
          <ul>{station.tasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      )}
      {station.formulas && (
        <div className="osce-calc-tasks">
          <b>Công thức tham khảo:</b>
          <ul>{station.formulas.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      )}
      <label className="osce-field-label">🔢 Đáp số cuối (số):</label>
      <input
        className="osce-num-input" type="number" step="any" placeholder="VD: 750"
        value={finalVal} onChange={(e) => setFinalVal(e.target.value)}
      />
      <label className="osce-field-label" style={{ marginTop: 14 }}>📝 Đơn vị + giải thích cách tính:</label>
      <textarea
        placeholder="Trình bày cách tính, đơn vị, và các bước tinh chỉnh liều..."
        value={work} onChange={(e) => setWork(e.target.value)}
      />
    </div>
  );
}

// ============================================================
// ARRANGE
// ============================================================
function ArrangeBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const original = useMemo(() => station.correctOrder || [], [station.correctOrder]);
  const [order, setOrder] = useState<string[]>(() => shuffle([...original]));
  const orderRef = useRef(order);
  const dragIdx = useRef<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  useEffect(() => { orderRef.current = order; }, [order]);

  useEffect(() => {
    registerGrader(() => {
      const cur = orderRef.current;
      if (!original.length) return 0;
      let exact = 0, near = 0;
      cur.forEach((txt, i) => {
        const correctIdx = original.indexOf(txt);
        if (correctIdx === i) exact++;
        else if (Math.abs(correctIdx - i) === 1) near++;
      });
      return Math.min(1, (exact + 0.5 * near) / original.length);
    });
  }, [registerGrader, original]);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    setOrder((prev) => {
      const a = prev.slice();
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    });
  };

  const onDrop = (targetIdx: number) => {
    const from = dragIdx.current;
    if (from === null || from === targetIdx) return;
    setOrder((prev) => {
      const a = prev.slice();
      const [moved] = a.splice(from, 1);
      a.splice(targetIdx, 0, moved);
      return a;
    });
  };

  return (
    <div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
        Dùng nút ▲▼ hoặc kéo thả để sắp xếp các bước đúng thứ tự.
      </p>
      <div className="osce-arrange-list">
        {order.map((it, i) => (
          <div
            className={`osce-arrange-item ${draggingIdx === i ? 'dragging' : ''}`}
            key={it}
            draggable
            onDragStart={() => { dragIdx.current = i; setDraggingIdx(i); }}
            onDragEnd={() => { dragIdx.current = null; setDraggingIdx(null); }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(i)}
          >
            <span className="osce-arrange-handle">{i + 1}.</span>
            <span className="osce-arrange-label">{it}</span>
            <span className="osce-arrange-actions">
              <button className="osce-arrange-btn" onClick={() => move(i, -1)}>▲</button>
              <button className="osce-arrange-btn" onClick={() => move(i, 1)}>▼</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SOAP
// ============================================================
const SOAP_SECTIONS = ['S - Subjective', 'O - Objective', 'A - Assessment', 'P - Plan'] as const;
const SOAP_WEIGHTS: Record<string, number> = { S: 0.18, O: 0.27, A: 0.18, P: 0.37 };

function SoapBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const rub = station.rubric || { S: 10, O: 15, A: 10, P: 25, total: 60 };
  const [texts, setTexts] = useState<Record<string, string>>({ S: '', O: '', A: '', P: '' });
  const textsRef = useRef(texts);
  useEffect(() => { textsRef.current = texts; }, [texts]);

  useEffect(() => {
    registerGrader(() => {
      let score = 0;
      (['S', 'O', 'A', 'P'] as const).forEach((sec) => {
        const words = wordCount(textsRef.current[sec] || '');
        let segScore = 0;
        if (words >= 40) segScore = 1;
        else if (words >= 20) segScore = 0.65;
        else if (words >= 8) segScore = 0.35;
        score += (SOAP_WEIGHTS[sec] || 0.25) * segScore;
      });
      return Math.min(1, score);
    });
  }, [registerGrader]);

  return (
    <div>
      <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 12 }}>
        Viết ghi chú SOAP đầy đủ cho ca lâm sàng (case <code>{station.caseRef || '—'}</code>).
        Mục tiêu điểm: S={rub.S}, O={rub.O}, A={rub.A}, P={rub.P}.
      </p>
      {SOAP_SECTIONS.map((sec) => {
        const key = sec[0];
        return (
          <div key={key}>
            <label className="osce-field-label">{sec}</label>
            <textarea
              placeholder={`Nhập phần ${sec}...`}
              value={texts[key]}
              onChange={(e) => setTexts((prev) => ({ ...prev, [key]: e.target.value }))}
            />
            <div className="osce-word-count">{wordCount(texts[key])} từ</div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// PATIENT ROLEPLAY
// ============================================================
function RoleplayBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const checklist = useMemo(() => station.checklist || [], [station.checklist]);
  const [script, setScript] = useState('');
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const scriptRef = useRef(script);
  const checkedRef = useRef(checked);
  useEffect(() => { scriptRef.current = script; }, [script]);
  useEffect(() => { checkedRef.current = checked; }, [checked]);

  useEffect(() => {
    registerGrader(() => {
      const text = scriptRef.current.trim();
      const words = wordCount(text);
      const checks = Object.values(checkedRef.current).filter(Boolean).length;
      const total = checklist.length || 1;
      let coverageScore = checks / total;
      if (words < 30 && checks > 2) coverageScore *= 0.5;
      let wordScore = 0;
      if (words >= 120) wordScore = 1;
      else if (words >= 60) wordScore = 0.6;
      else if (words >= 25) wordScore = 0.3;
      return Math.min(1, 0.6 * coverageScore + 0.4 * wordScore);
    });
  }, [registerGrader, checklist]);

  return (
    <div>
      <div className="osce-roleplay-checklist">
        <h5>📋 Checklist OSCE — cố gắng cover các điểm sau trong câu trả lời:</h5>
        <ul>{checklist.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </div>
      <label className="osce-field-label">📝 Trình bày kịch bản tư vấn / phỏng vấn BN của bạn:</label>
      <textarea
        rows={10} placeholder="Mô tả lời chào, các câu hỏi khai thác, lời tư vấn, hẹn theo dõi..."
        value={script} onChange={(e) => setScript(e.target.value)}
      />
      <div className="osce-word-count">{wordCount(script)} từ</div>
      <div style={{ marginTop: 10 }}>
        <label className="osce-field-label">✅ Tự đánh giá: bạn đã làm các bước nào trong checklist?</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
          {checklist.map((c, i) => (
            <label key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox" style={{ accentColor: 'var(--accent)' }} checked={!!checked[i]}
                onChange={(e) => setChecked((prev) => ({ ...prev, [i]: e.target.checked }))}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// GENERIC fallback
// ============================================================
function GenericBody({ station, registerGrader }: { station: Station; registerGrader: (fn: () => number) => void }) {
  const [text, setText] = useState('');
  const textRef = useRef(text);
  useEffect(() => { textRef.current = text; }, [text]);

  useEffect(() => {
    registerGrader(() => Math.min(1, textRef.current.trim().length / 200));
  }, [registerGrader]);

  return (
    <div>
      <p style={{ opacity: 0.85 }}>Trạm <b>{station.kind}</b> — nhập câu trả lời của bạn:</p>
      <textarea rows={6} placeholder="Câu trả lời..." value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

// ============================================================
// Final screen
// ============================================================
function Final({
  exam, results, totalWeight, examStartAt, playerName, classCode, certId, dateStr, onRetry,
}: {
  exam: OsceExam;
  results: Result[];
  totalWeight: number;
  examStartAt: number;
  playerName: string;
  classCode: string;
  certId: string;
  dateStr: string;
  onRetry: () => void;
}) {
  const total = useMemo(() => {
    let t = 0;
    results.forEach((r) => { t += r.score * (r.weight / totalWeight) * 100; });
    return Math.round(t * 10) / 10;
  }, [results, totalWeight]);

  const passing = total >= (exam.passingScore || 60);
  const totalTimeS = useMemo(() => Math.round((Date.now() - examStartAt) / 1000), [examStartAt]);

  let tier: 'green' | 'yellow' | 'red' = 'red';
  let tierLabel = 'FAIL';
  if (total >= 75) { tier = 'green'; tierLabel = 'EXCELLENT'; }
  else if (total >= 60) { tier = 'yellow'; tierLabel = 'PASS'; }

  const tierColor = tier === 'green' ? '#10b981' : tier === 'yellow' ? '#f59e0b' : '#ef4444';
  const tierEmoji = tier === 'green' ? '🟢' : tier === 'yellow' ? '🟡' : '🔴';

  return (
    <div className="osce-final-wrap">
      <div className="osce-final-headline">{passing ? '🎓 Kỳ thi OSCE hoàn tất' : '⏸ Kỳ thi đã kết thúc'}</div>
      <div style={{ opacity: 0.75, fontSize: 14 }}>
        Tổng thời gian: {formatDuration(totalTimeS)} · {results.length}/{exam.stations.length} trạm
      </div>

      <div className="osce-final-score-block">
        <div className="osce-final-score-value" style={{ color: tierColor }}>{total.toFixed(1)}</div>
        <div className="osce-final-score-label">/ 100 điểm (đạt ≥ {exam.passingScore})</div>
      </div>
      <div><span className={`osce-traffic-tag ${tier}`}>{tierEmoji} {tierLabel}</span></div>

      <table className="osce-breakdown-table">
        <thead>
          <tr><th>#</th><th>Trạm</th><th>Điểm trạm</th><th>Trọng số</th><th>Quy đổi</th><th>Thời gian</th></tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr className={r.skipped ? 'skipped' : ''} key={i}>
              <td>{r.n}</td>
              <td>
                {r.title}
                {r.bonus > 0 && <span style={{ color: 'var(--accent)', fontSize: 11 }}> +bonus</span>}
                {r.autoSubmitted && <span style={{ color: 'var(--warn)', fontSize: 11 }}> (hết giờ)</span>}
                {r.skipped && <span style={{ color: 'var(--danger)', fontSize: 11 }}> (bỏ qua)</span>}
              </td>
              <td className="right">{(r.score * 100).toFixed(0)}/100</td>
              <td className="right">{r.weight}%</td>
              <td className="right"><b>{(r.score * r.weight / totalWeight * 100).toFixed(1)}</b></td>
              <td className="right">{formatDuration(r.timeSpentS)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} style={{ textAlign: 'right', borderTop: '2px solid var(--border)' }}><b>TỔNG</b></td>
            <td className="right" style={{ borderTop: '2px solid var(--border)' }}><b>{total.toFixed(1)}/100</b></td>
            <td className="right" style={{ borderTop: '2px solid var(--border)' }}>{formatDuration(totalTimeS)}</td>
          </tr>
        </tbody>
      </table>

      {passing ? (
        <div className="osce-certificate">
          <div className="osce-seal">🏆</div>
          <h2>CHỨNG CHỈ OSCE TỐT NGHIỆP</h2>
          <div style={{ opacity: 0.85, fontSize: 14 }}>Trao tặng cho sinh viên Dược</div>
          <div className="osce-recipient">{playerName}</div>
          <div style={{ fontSize: 14 }}>
            đã hoàn thành <b>{exam.stations.length} trạm OSCE Composite</b> với tổng điểm <b>{total.toFixed(1)}/100</b> — <i>{tierLabel}</i>.
          </div>
          <div className="osce-cert-meta">
            <div>Mã chứng chỉ: <span className="osce-cert-id">{certId}</span></div>
            <div>Lớp: {classCode || '—'} · Ngày cấp: {dateStr}</div>
            <div style={{ marginTop: 6, opacity: 0.7 }}>Tizia · Trường ĐH Dược · Mô phỏng OSCE năm cuối</div>
          </div>
          <button className="osce-download-btn" onClick={() => window.print()}>🖨️ In / lưu PDF chứng chỉ</button>
        </div>
      ) : (
        <div className="osce-warn-card" style={{ maxWidth: 560, margin: '24px auto' }}>
          Tổng điểm chưa đạt ngưỡng <b>{exam.passingScore}/100</b>. Bạn có thể ôn lại các trạm yếu nhất ở danh sách trên và làm lại kỳ thi vào lần sau.
        </div>
      )}

      <div className="osce-back-row">
        <button className="osce-back-btn" onClick={() => { window.location.href = '/index'; }}>← Trang chủ</button>
        <button className="osce-back-btn" onClick={onRetry}>↻ Làm lại kỳ thi</button>
      </div>
    </div>
  );
}
