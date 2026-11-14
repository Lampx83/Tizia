'use client';

// =============================================================
// Pet Tri Thức — virtual pet "Tiziamon" tiến hoá theo XP.
// Port từ trang vanilla public/pet-tri-thuc.html sang React (client).
// - State lưu localStorage('pet-tri-thuc.state') như bản gốc.
// - Ngân hàng câu hỏi LẤY TỪ /api/content/pet-quiz-banks (DB) — KHÔNG hardcode.
// - Sync XP với /api/wallet khi user đã login (PUT debounced mỗi lần).
// - Pet SVG dựng theo stage, animation, confetti, toast giữ nguyên hành vi.
// =============================================================

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Kiểu dữ liệu ─────────────────────────────────────────────
type QuizItem = { q: string; o: string[]; a: string };
type Grade = 'mam-non' | 'tieu-hoc' | 'thcs' | 'thpt';
type GradeBank = { feed?: QuizItem[]; study?: QuizItem[] };
type QuizBanks = Partial<Record<Grade, GradeBank>>;

type PetState = {
  level: number;
  xp: number;
  hp: number;
  mood: 'happy' | 'ok' | 'sad';
  streak: number;
  lastVisit: string;
  name: string;
};

const STATE_KEY = 'pet-tri-thuc.state';
const DEFAULT_STATE: PetState = {
  level: 0,
  xp: 0,
  hp: 100,
  mood: 'ok',
  streak: 0,
  lastVisit: '',
  name: 'Tiziamon',
};

// Range đếm cho mini-game "play" theo cấp (chỉ là tham số game, không phải content).
const COUNT_RANGE: Record<Grade, { min: number; max: number; fillerMin: number; fillerMax: number }> = {
  'mam-non': { min: 1, max: 5, fillerMin: 2, fillerMax: 5 },
  'tieu-hoc': { min: 3, max: 12, fillerMin: 5, fillerMax: 10 },
  thcs: { min: 5, max: 20, fillerMin: 10, fillerMax: 18 },
  thpt: { min: 5, max: 25, fillerMin: 10, fillerMax: 20 },
};

const GRADE_KEY = 'pet-tri-thuc.grade';
const VALID_GRADES: Grade[] = ['mam-non', 'tieu-hoc', 'thcs', 'thpt'];
const GRADE_LABEL: Record<Grade, string> = { 'mam-non': 'Mầm non', 'tieu-hoc': 'Tiểu học', thcs: 'THCS', thpt: 'THPT' };

// ── Stage tiến hoá ───────────────────────────────────────────
type Stage = { id: number; name: string; emoji: string };
function getStage(level: number): Stage {
  if (level === 0) return { id: 0, name: 'Trứng', emoji: '🥚' };
  if (level <= 5) return { id: 1, name: 'Tiziamon baby', emoji: '🐣' };
  if (level <= 15) return { id: 2, name: 'Tiziamon teen', emoji: '🦊' };
  if (level <= 30) return { id: 3, name: 'Tiziamon adult', emoji: '🦄' };
  return { id: 4, name: 'Tiziamon legendary', emoji: '🐉' };
}

// ── Dựng SVG pet theo stage + mood (giữ nguyên hình gốc) ─────
function buildPetSvg(level: number, mood: PetState['mood'], hp: number): string {
  const stage = getStage(level);
  const happy = mood === 'happy';
  const sad = mood === 'sad' || hp <= 0;

  const eyeShape = (cx: number, cy: number) => {
    if (happy)
      return `<path d="M ${cx - 7} ${cy} Q ${cx} ${cy - 8} ${cx + 7} ${cy}" stroke="#1f2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    if (sad)
      return `<g><circle cx="${cx}" cy="${cy}" r="4" fill="#1f2937"/><path d="M ${cx} ${cy + 6} L ${cx - 2} ${cy + 12}" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/></g>`;
    return `<circle cx="${cx}" cy="${cy}" r="5" fill="#1f2937"/><circle cx="${cx + 1.5}" cy="${cy - 1.5}" r="1.5" fill="#fff"/>`;
  };
  const mouthShape = (cx: number, cy: number) => {
    if (happy)
      return `<path d="M ${cx - 12} ${cy} Q ${cx} ${cy + 12} ${cx + 12} ${cy}" stroke="var(--pet-mouth)" stroke-width="3" fill="#fb7185" stroke-linecap="round"/>`;
    if (sad)
      return `<path d="M ${cx - 10} ${cy + 5} Q ${cx} ${cy - 3} ${cx + 10} ${cy + 5}" stroke="var(--pet-mouth)" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    return `<path d="M ${cx - 8} ${cy} Q ${cx} ${cy + 5} ${cx + 8} ${cy}" stroke="var(--pet-mouth)" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  };

  if (stage.id === 0) {
    return `
      <defs>
        <radialGradient id="egg" cx="40%" cy="35%">
          <stop offset="0%" stop-color="#fef9c3"/><stop offset="100%" stop-color="#facc15"/>
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="105" rx="55" ry="72" fill="url(#egg)" stroke="#a16207" stroke-width="3"/>
      <path d="M 50 95 L 60 90 L 70 95 L 80 90 L 90 95 L 100 90 L 110 95 L 120 90 L 130 95 L 140 90 L 150 95" stroke="#a16207" stroke-width="2.5" fill="none"/>
      <path d="M 50 130 L 60 125 L 70 130 L 80 125 L 90 130 L 100 125 L 110 130 L 120 125 L 130 130 L 140 125 L 150 130" stroke="#a16207" stroke-width="2.5" fill="none"/>
      <ellipse cx="80" cy="60" rx="20" ry="12" fill="#fff" opacity=".4"/>
    `;
  }
  if (stage.id === 1) {
    return `
      <defs>
        <radialGradient id="baby" cx="40%" cy="35%">
          <stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="var(--pet-skin-2)"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="105" r="60" fill="url(#baby)" stroke="#a16207" stroke-width="3"/>
      <ellipse cx="80" cy="75" rx="14" ry="9" fill="#fff" opacity=".5"/>
      ${eyeShape(82, 100)} ${eyeShape(118, 100)}
      ${mouthShape(100, 122)}
      <circle cx="70" cy="120" r="4" fill="#fb7185" opacity=".55"/>
      <circle cx="130" cy="120" r="4" fill="#fb7185" opacity=".55"/>
    `;
  }
  if (stage.id === 2) {
    return `
      <defs>
        <radialGradient id="teen" cx="40%" cy="35%">
          <stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#f59e0b"/>
        </radialGradient>
      </defs>
      <path d="M 155 130 Q 175 110 170 90 Q 165 75 175 65" stroke="#f59e0b" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="175" cy="63" r="6" fill="#f59e0b"/>
      <ellipse cx="80" cy="170" rx="14" ry="8" fill="#d97706"/>
      <ellipse cx="120" cy="170" rx="14" ry="8" fill="#d97706"/>
      <rect x="73" y="155" width="14" height="14" fill="#f59e0b"/>
      <rect x="113" y="155" width="14" height="14" fill="#f59e0b"/>
      <circle cx="100" cy="105" r="55" fill="url(#teen)" stroke="#92400e" stroke-width="3"/>
      <ellipse cx="45" cy="115" rx="10" ry="16" fill="#f59e0b" transform="rotate(-20 45 115)" stroke="#92400e" stroke-width="2"/>
      <ellipse cx="155" cy="115" rx="10" ry="16" fill="#f59e0b" transform="rotate(20 155 115)" stroke="#92400e" stroke-width="2"/>
      <ellipse cx="82" cy="78" rx="12" ry="7" fill="#fff" opacity=".4"/>
      ${eyeShape(82, 100)} ${eyeShape(118, 100)}
      ${mouthShape(100, 122)}
      <circle cx="70" cy="118" r="5" fill="#fb7185" opacity=".55"/>
      <circle cx="130" cy="118" r="5" fill="#fb7185" opacity=".55"/>
    `;
  }
  if (stage.id === 3) {
    return `
      <defs>
        <radialGradient id="adult" cx="40%" cy="35%">
          <stop offset="0%" stop-color="#fef3c7"/><stop offset="100%" stop-color="#ea580c"/>
        </radialGradient>
      </defs>
      <path d="M 40 80 Q 10 65 5 95 Q 15 105 45 100 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2.5"/>
      <path d="M 160 80 Q 190 65 195 95 Q 185 105 155 100 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2.5"/>
      <path d="M 155 135 Q 180 115 175 88 Q 170 70 185 58" stroke="#ea580c" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M 180 55 L 195 50 L 188 65 Z" fill="#ea580c"/>
      <ellipse cx="78" cy="175" rx="16" ry="9" fill="#9a3412"/>
      <ellipse cx="122" cy="175" rx="16" ry="9" fill="#9a3412"/>
      <rect x="70" y="155" width="16" height="18" fill="#ea580c" rx="3"/>
      <rect x="114" y="155" width="16" height="18" fill="#ea580c" rx="3"/>
      <circle cx="100" cy="105" r="58" fill="url(#adult)" stroke="#7c2d12" stroke-width="3"/>
      <ellipse cx="42" cy="118" rx="11" ry="18" fill="#ea580c" transform="rotate(-20 42 118)" stroke="#7c2d12" stroke-width="2"/>
      <ellipse cx="158" cy="118" rx="11" ry="18" fill="#ea580c" transform="rotate(20 158 118)" stroke="#7c2d12" stroke-width="2"/>
      <path d="M 75 55 L 70 30 L 82 50 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
      <path d="M 125 55 L 130 30 L 118 50 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
      <ellipse cx="82" cy="78" rx="14" ry="7" fill="#fff" opacity=".4"/>
      ${eyeShape(80, 100)} ${eyeShape(120, 100)}
      ${mouthShape(100, 124)}
      <circle cx="68" cy="120" r="6" fill="#fb7185" opacity=".55"/>
      <circle cx="132" cy="120" r="6" fill="#fb7185" opacity=".55"/>
    `;
  }
  // Legendary
  return `
    <defs>
      <radialGradient id="halo" cx="50%" cy="50%">
        <stop offset="0%" stop-color="#fde047" stop-opacity=".9"/>
        <stop offset="60%" stop-color="#fbbf24" stop-opacity=".4"/>
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="legend" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#fef9c3"/>
        <stop offset="60%" stop-color="#fbbf24"/>
        <stop offset="100%" stop-color="#b45309"/>
      </radialGradient>
      <linearGradient id="wing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef9c3"/>
        <stop offset="100%" stop-color="#f59e0b"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="95" fill="url(#halo)"/>
    <path d="M 35 70 Q -10 30 -5 100 Q 15 120 50 95 Z" fill="url(#wing)" stroke="#b45309" stroke-width="3"/>
    <path d="M 165 70 Q 210 30 205 100 Q 185 120 150 95 Z" fill="url(#wing)" stroke="#b45309" stroke-width="3"/>
    <path d="M 20 60 Q 10 85 25 95" stroke="#b45309" stroke-width="1.5" fill="none"/>
    <path d="M 180 60 Q 190 85 175 95" stroke="#b45309" stroke-width="1.5" fill="none"/>
    <path d="M 155 140 Q 195 120 190 85 Q 185 55 205 45" stroke="#b45309" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M 200 40 L 218 38 L 210 58 Z" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
    <ellipse cx="78" cy="178" rx="17" ry="10" fill="#78350f"/>
    <ellipse cx="122" cy="178" rx="17" ry="10" fill="#78350f"/>
    <rect x="68" y="155" width="20" height="20" fill="#b45309" rx="4"/>
    <rect x="112" y="155" width="20" height="20" fill="#b45309" rx="4"/>
    <circle cx="100" cy="105" r="60" fill="url(#legend)" stroke="#78350f" stroke-width="3"/>
    <path d="M 75 52 L 65 22 L 84 48 Z" fill="#fde047" stroke="#78350f" stroke-width="2"/>
    <path d="M 125 52 L 135 22 L 116 48 Z" fill="#fde047" stroke="#78350f" stroke-width="2"/>
    <circle cx="65" cy="22" r="3" fill="#fff"/>
    <circle cx="135" cy="22" r="3" fill="#fff"/>
    <ellipse cx="82" cy="78" rx="14" ry="7" fill="#fff" opacity=".5"/>
    ${eyeShape(80, 100)} ${eyeShape(120, 100)}
    ${mouthShape(100, 124)}
    <circle cx="68" cy="120" r="6" fill="#fb7185" opacity=".55"/>
    <circle cx="132" cy="120" r="6" fill="#fb7185" opacity=".55"/>
  `;
}

// ── State persistence ────────────────────────────────────────
function loadState(): PetState {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<PetState>) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_STATE };
}
function saveState(s: PetState) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}
function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function detectGrade(): Grade {
  try {
    const u = new URLSearchParams(location.search);
    const fromUrl = u.get('grade');
    if (fromUrl && (VALID_GRADES as string[]).includes(fromUrl)) {
      localStorage.setItem(GRADE_KEY, fromUrl);
      return fromUrl as Grade;
    }
    const stored = localStorage.getItem(GRADE_KEY);
    if (stored && (VALID_GRADES as string[]).includes(stored)) return stored as Grade;
  } catch {
    /* ignore */
  }
  return 'mam-non';
}

// ── Modal quiz state ─────────────────────────────────────────
type ModalState =
  | { kind: 'quiz'; action: 'feed' | 'study'; title: string; q: QuizItem; opts: string[] }
  | { kind: 'count'; title: string; target: string; arr: string[]; opts: number[]; total: number }
  | null;

type QResult = { ok: boolean; text: string } | null;

export default function PetClient() {
  const [state, setState] = useState<PetState>(DEFAULT_STATE);
  const [grade, setGrade] = useState<Grade>('mam-non');
  const [banks, setBanks] = useState<QuizBanks>({});
  const [nameInput, setNameInput] = useState('');
  const [modal, setModal] = useState<ModalState>(null);
  const [qResult, setQResult] = useState<QResult>(null);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{ msg: string; kind: string; id: number } | null>(null);
  const [morphKey, setMorphKey] = useState(0);

  const stateRef = useRef(state);
  stateRef.current = state;
  const gradeRef = useRef(grade);
  gradeRef.current = grade;
  const petWrapRef = useRef<HTMLDivElement>(null);

  // Cập nhật state + lưu localStorage đồng thời.
  const commit = useCallback((next: PetState) => {
    saveState(next);
    setState(next);
  }, []);

  // ── Toast ──
  const toast = useCallback((msg: string, kind = '') => {
    setToastMsg({ msg, kind, id: Date.now() });
  }, []);
  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 2400);
    return () => clearTimeout(t);
  }, [toastMsg]);

  // ── Confetti (DOM ephemeral như bản gốc) ──
  const spawnConfetti = useCallback(() => {
    const emojis = ['🎉', '✨', '⭐', '🎊', '💫', '🌟'];
    const wrap = petWrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    for (let i = 0; i < 14; i++) {
      const c = document.createElement('span');
      c.className = 'ptt-confetti';
      c.textContent = emojis[i % emojis.length];
      c.style.left = r.left + r.width / 2 + (Math.random() - 0.5) * 60 + 'px';
      c.style.top = r.top + r.height / 2 + 'px';
      c.style.animationDelay = i * 0.04 + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 1700);
    }
  }, []);

  // ── Sync XP với /api/wallet (debounced, best-effort) ──
  const walletCache = useRef<{ xp: number; coin: number; streak: number } | null>(null);
  const walletTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncWalletXP = useCallback(async (deltaXp: number) => {
    if (!deltaXp) return;
    try {
      if (!walletCache.current) {
        const r = await fetch('/api/wallet', { credentials: 'same-origin' });
        if (!r.ok) return; // guest / 401 → skip
        walletCache.current = (await r.json()) || { xp: 0, coin: 0, streak: 0 };
      }
      walletCache.current!.xp = (walletCache.current!.xp | 0) + deltaXp;
      if (walletTimer.current) clearTimeout(walletTimer.current);
      walletTimer.current = setTimeout(async () => {
        try {
          await fetch('/api/wallet', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(walletCache.current),
          });
        } catch {
          /* ignore */
        }
      }, 600);
    } catch {
      /* ignore */
    }
  }, []);

  // ── Morph anim + level up ──
  const triggerMorph = useCallback(
    (oldLvl: number, newLvl: number) => {
      setMorphKey((k) => k + 1);
      toast(`🎉 Lên cấp! Tiziamon đã đạt cấp ${newLvl}!`);
      spawnConfetti();
      const oldStage = getStage(oldLvl).id;
      const newStage = getStage(newLvl).id;
      if (newStage > oldStage) {
        setTimeout(() => toast(`✨ Tiến hoá! Pet trở thành ${getStage(newLvl).name}!`, 'info'), 2400);
      }
    },
    [toast, spawnConfetti],
  );

  // ── Apply XP: trả về state mới (không lưu — caller quyết) ──
  const applyXp = useCallback(
    (s: PetState, amount: number): PetState => {
      const oldLevel = s.level;
      let xp = s.xp + amount;
      let level = s.level;
      while (xp >= (level + 1) * 100 && level < 99) level++;
      if (level > oldLevel) triggerMorph(oldLevel, level);
      syncWalletXP(amount);
      return { ...s, xp, level };
    },
    [triggerMorph, syncWalletXP],
  );

  // ── Boot: load state + grade + banks + streak ──
  useEffect(() => {
    const g = detectGrade();
    setGrade(g);
    const loaded = loadState();

    // Update streak
    const today = todayKey();
    if (loaded.lastVisit !== today) {
      if (!loaded.lastVisit) loaded.streak = 1;
      else {
        const last = new Date(loaded.lastVisit);
        const now = new Date(today);
        const diff = Math.round((now.getTime() - last.getTime()) / 86400000);
        if (diff === 1) loaded.streak++;
        else if (diff > 1) loaded.streak = 1;
      }
      loaded.lastVisit = today;
    }
    saveState(loaded);
    setState(loaded);
    setNameInput(loaded.name || '');

    // Ngân hàng câu hỏi TỪ DB — /api/content/pet-quiz-banks trả { items: [...] }.
    // items[0] = object keyed theo cấp học { 'mam-non': { feed, study }, ... }.
    fetch('/api/content/pet-quiz-banks', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j) => setBanks(((j.items || [])[0] as QuizBanks) || {}))
      .catch(() => setBanks({}));

    // Welcome toast theo cấp
    const stage = getStage(loaded.level);
    const gradeLbl = GRADE_LABEL[g] || '';
    const suffix = gradeLbl ? ` · câu hỏi ${gradeLbl}` : '';
    const t = setTimeout(() => {
      if (loaded.level === 0)
        toast(`🥚 Trứng đang chờ ấp${suffix}. Trả lời câu hỏi để pet nở!`, 'info');
      else toast(`👋 ${loaded.name} (cấp ${loaded.level}, ${stage.name})${suffix}`, 'info');
    }, 500);
    return () => clearTimeout(t);
  }, [toast]);

  // ── HP tick: -2 mỗi 30s ──
  useEffect(() => {
    const id = setInterval(() => {
      const s = stateRef.current;
      if (s.hp > 0) {
        const hp = Math.max(0, s.hp - 2);
        let mood = s.mood;
        if (hp <= 20 && s.mood !== 'sad') {
          mood = 'sad';
          toast('😢 Tiziamon đang đói! Hãy cho ăn nhé!', 'bad');
        }
        commit({ ...s, hp, mood });
      }
    }, 30000);
    return () => clearInterval(id);
  }, [commit, toast]);

  // ── Grade change ──
  const onGradeChange = (g: Grade) => {
    if (!VALID_GRADES.includes(g)) return;
    setGrade(g);
    try {
      localStorage.setItem(GRADE_KEY, g);
    } catch {
      /* ignore */
    }
    toast(`📚 Đã chuyển sang câu hỏi ${GRADE_LABEL[g]}`, 'info');
  };

  const getQuizBank = (): GradeBank => banks[gradeRef.current] || banks['mam-non'] || {};
  const getCountRange = () => COUNT_RANGE[gradeRef.current] || COUNT_RANGE['mam-non'];

  // ── Mở quiz feed/study ──
  const openQuiz = (action: 'feed' | 'study') => {
    const bank = getQuizBank()[action];
    if (!bank || !bank.length) {
      toast('Chưa có câu hỏi cho cấp này.', 'bad');
      return;
    }
    const q = bank[Math.floor(Math.random() * bank.length)];
    const labels: Record<'feed' | 'study', string> = {
      feed: '🍎 Cho pet ăn (Toán)',
      study: '📖 Pet học bài (Văn / Nhận biết)',
    };
    const opts = [...q.o].sort(() => Math.random() - 0.5);
    setAnswered(false);
    setChosen(null);
    setQResult(null);
    setModal({ kind: 'quiz', action, title: labels[action], q, opts });
  };

  // ── Mini-game đếm số ──
  const openCountGame = () => {
    const emojis = ['🍎', '🍌', '🍓', '⭐', '🐱', '🌸', '🎈', '🌈'];
    const target = emojis[Math.floor(Math.random() * emojis.length)];
    const range = getCountRange();
    const total = range.min + Math.floor(Math.random() * (range.max - range.min + 1));
    const fillers = emojis.filter((e) => e !== target);
    const arr: string[] = [];
    for (let i = 0; i < total; i++) arr.push(target);
    const fillerCount = range.fillerMin + Math.floor(Math.random() * (range.fillerMax - range.fillerMin + 1));
    for (let i = 0; i < fillerCount; i++) arr.push(fillers[Math.floor(Math.random() * fillers.length)]);
    arr.sort(() => Math.random() - 0.5);
    const optsSet = new Set<number>([total]);
    const spread = gradeRef.current === 'mam-non' ? 2 : 3;
    while (optsSet.size < 4) {
      const d = total + (Math.floor(Math.random() * (spread * 2 + 1)) - spread);
      if (d > 0 && d !== total) optsSet.add(d);
    }
    const opts = [...optsSet].sort(() => Math.random() - 0.5);
    setAnswered(false);
    setChosen(null);
    setQResult(null);
    setModal({ kind: 'count', title: '🎮 Đếm thật nhanh!', target, arr, opts, total });
  };

  const openAction = (action: 'feed' | 'study' | 'play') => {
    if (action === 'play') return openCountGame();
    openQuiz(action);
  };

  // ── Trả lời ──
  const answer = (choice: string, correct: string, action: 'feed' | 'study' | 'play') => {
    if (answered) return;
    setAnswered(true);
    setChosen(choice);
    const ok = choice === correct;
    const s = stateRef.current;
    if (ok) {
      let next = applyXp(s, 20);
      if (action === 'feed') next = { ...next, hp: Math.min(100, next.hp + 15) };
      if (next.hp > 50) next = { ...next, mood: 'happy' };
      commit(next);
      setQResult({ ok: true, text: `✅ Chính xác! +20 XP${action === 'feed' ? ', +15 HP' : ''}.` });
    } else {
      let hp = Math.max(0, s.hp - 5);
      let mood = s.mood;
      if (hp <= 20) mood = 'sad';
      commit({ ...s, hp, mood });
      setQResult({ ok: false, text: `❌ Sai rồi. Đáp án đúng: ${correct}. -5 HP.` });
    }
  };

  // ── Vuốt ve pet ──
  const petPet = () => {
    setMorphKey((k) => k + 1);
    const s = stateRef.current;
    if (s.hp > 0) {
      commit({ ...s, mood: 'happy' });
      setTimeout(() => {
        const cur = stateRef.current;
        commit({ ...cur, mood: 'ok' });
      }, 3000);
    } else {
      toast('💔 Pet quá đói, hãy cho ăn trước!', 'bad');
    }
  };

  // ── Lưu tên ──
  const saveName = () => {
    const v = nameInput.trim().slice(0, 20);
    if (v) {
      commit({ ...stateRef.current, name: v });
      toast('✅ Đã đặt tên cho pet!');
    }
  };

  // ── Dẫn xuất render ──
  const stage = getStage(state.level);
  const petSvg = buildPetSvg(state.level, state.mood, state.hp);
  const sad = state.mood === 'sad' || state.hp <= 0;
  const happy = state.mood === 'happy';
  const xpInLvl = state.xp % 100;
  const moodPill = sad
    ? { cls: 'ptt-mood-sad', txt: '😢 đói/buồn' }
    : happy
      ? { cls: 'ptt-mood-happy', txt: '😊 rất vui' }
      : { cls: 'ptt-mood-ok', txt: '😐 bình thường' };
  const wrapAnim = state.hp <= 0 || sad ? 'shake' : happy ? 'bounce' : '';
  const legendarySparkles: { emoji: string; x: number; y: number }[] =
    stage.id === 4
      ? [
          { emoji: '✨', x: -10, y: 0 },
          { emoji: '⭐', x: 230, y: 30 },
          { emoji: '🌟', x: 0, y: 170 },
          { emoji: '💫', x: 225, y: 175 },
          { emoji: '✨', x: 110, y: -15 },
        ]
      : [];

  return (
    <div className="ptt-root">
      <style>{PTT_CSS}</style>

      <div className="ptt-top">
        <a className="ptt-back" href="/">← Tizia</a>
        <a className="ptt-back" href="/cay-tri-thuc">🌳 Cây Tri Thức</a>
        <div className="ptt-name-wrap">
          <input
            type="text"
            placeholder="Đặt tên cho pet…"
            maxLength={20}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button onClick={saveName}>Lưu</button>
        </div>
      </div>

      <main className="ptt-main">
        {/* Stats panel */}
        <div className="ptt-card ptt-stats">
          <h3>📊 Trạng thái Tiziamon</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--ptt-ink-soft)' }}>🎓 Cấp học:</span>
            <select
              className="ptt-grade-pill"
              title="Chọn cấp học để pet hỏi câu phù hợp"
              value={grade}
              onChange={(e) => onGradeChange(e.target.value as Grade)}
            >
              <option value="mam-non">🐤 Mầm non (3–5 tuổi)</option>
              <option value="tieu-hoc">🎒 Tiểu học (lớp 1–5)</option>
              <option value="thcs">📚 THCS (lớp 6–9)</option>
              <option value="thpt">🎓 THPT (lớp 10–12)</option>
            </select>
          </div>
          <div className="ptt-stat-row">
            <span className="ptt-ic">❤️</span>
            <span className="ptt-lbl">HP</span>
            <span className="ptt-bar ptt-hp">
              <i style={{ width: `${Math.max(0, Math.min(100, state.hp))}%` }} />
            </span>
            <span className="ptt-val">{Math.max(0, state.hp | 0)}</span>
          </div>
          <div className="ptt-stat-row">
            <span className="ptt-ic">✨</span>
            <span className="ptt-lbl">XP</span>
            <span className="ptt-bar ptt-xp">
              <i style={{ width: `${xpInLvl}%` }} />
            </span>
            <span className="ptt-val">{xpInLvl}/100</span>
          </div>
          <div className="ptt-stat-row">
            <span className="ptt-ic">🎚️</span>
            <span className="ptt-lbl">Cấp</span>
            <span className="ptt-val" style={{ marginLeft: 0 }}>{state.level}</span>
            <span style={{ marginLeft: 'auto' }}>
              <span className={`ptt-mood-pill ${moodPill.cls}`}>{moodPill.txt}</span>
            </span>
          </div>
          <div className="ptt-stat-row">
            <span className="ptt-ic">🔥</span>
            <span className="ptt-lbl">Streak</span>
            <span className="ptt-val">{state.streak} ngày</span>
          </div>

          <div className="ptt-actions">
            <button className="ptt-act-btn" onClick={() => openAction('feed')}>
              <span className="ptt-ic">🍎</span>
              <span className="ptt-lb">Cho ăn</span>
              <div className="ptt-sub">Toán · +HP</div>
            </button>
            <button className="ptt-act-btn" onClick={() => openAction('study')}>
              <span className="ptt-ic">📖</span>
              <span className="ptt-lb">Học bài</span>
              <div className="ptt-sub">Văn · +XP</div>
            </button>
            <button className="ptt-act-btn" onClick={() => openAction('play')}>
              <span className="ptt-ic">🎮</span>
              <span className="ptt-lb">Chơi</span>
              <div className="ptt-sub">Đếm số · +mood</div>
            </button>
          </div>

          <div style={{ marginTop: 14, fontSize: 11.5, color: 'var(--ptt-ink-soft)', lineHeight: 1.55 }}>
            💡 Mỗi 30 giây pet tiêu thụ 2 HP. Trả lời đúng câu hỏi để cho pet ăn, học, chơi cùng pet. Level up mỗi 100 XP — pet sẽ tiến hoá!
          </div>
        </div>

        {/* Pet stage */}
        <div className="ptt-card ptt-stage">
          <div style={{ position: 'absolute', top: 14, right: 18, fontSize: 11, color: 'var(--ptt-ink-soft)', fontWeight: 700 }}>
            <span>{stage.emoji} {stage.name}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              key={morphKey}
              ref={petWrapRef}
              className={`ptt-pet-wrap morph ${wrapAnim}`}
              onClick={petPet}
            >
              <svg
                className="ptt-pet-svg"
                width={220}
                height={220}
                viewBox="0 0 200 200"
                dangerouslySetInnerHTML={{ __html: petSvg }}
              />
              {legendarySparkles.map((sp, i) => (
                <span
                  key={i}
                  className="ptt-sparkle"
                  style={{ left: sp.x, top: sp.y, animationDelay: `${i * 0.3}s` }}
                >
                  {sp.emoji}
                </span>
              ))}
            </div>
            <div className="ptt-pet-label">{state.name || 'Tiziamon'}</div>
            <div className="ptt-pet-stage-name">
              {stage.id === 0 ? 'Trả lời quiz để nở trứng!' : `Cấp ${state.level} · ${stage.name}`}
            </div>
          </div>
        </div>
      </main>

      {/* Quiz modal */}
      {modal && (
        <div className="ptt-backdrop show" onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="ptt-modal">
            <h2>{modal.title}</h2>
            {modal.kind === 'quiz' && (
              <div>
                <div className="ptt-qprompt">{modal.q.q}</div>
                <div className="ptt-qopts">
                  {modal.opts.map((o, i) => {
                    let cls = 'ptt-qopt';
                    if (answered) {
                      if (o === modal.q.a) cls += ' good';
                      else if (o === chosen) cls += ' bad';
                    }
                    return (
                      <button
                        key={i}
                        className={cls}
                        disabled={answered}
                        onClick={() => answer(o, modal.q.a, modal.action)}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
                {qResult && (
                  <div className={`ptt-qresult show ${qResult.ok ? 'ok' : 'no'}`}>{qResult.text}</div>
                )}
              </div>
            )}
            {modal.kind === 'count' && (
              <div className="ptt-count-game">
                <div style={{ fontSize: 14, color: 'var(--ptt-ink-soft)', fontWeight: 700 }}>
                  Có bao nhiêu <span style={{ fontSize: 24 }}>{modal.target}</span> trong dãy này?
                </div>
                <div className="ptt-emojis">{modal.arr.join(' ')}</div>
                <div className="ptt-qopts ptt-count-opts">
                  {modal.opts.map((n, i) => {
                    const correct = String(modal.total);
                    let cls = 'ptt-qopt';
                    if (answered) {
                      if (String(n) === correct) cls += ' good';
                      else if (String(n) === chosen) cls += ' bad';
                    }
                    return (
                      <button
                        key={i}
                        className={cls}
                        disabled={answered}
                        onClick={() => answer(String(n), correct, 'play')}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
                {qResult && (
                  <div className={`ptt-qresult show ${qResult.ok ? 'ok' : 'no'}`}>{qResult.text}</div>
                )}
              </div>
            )}
            {answered && (
              <button className="ptt-qclose show" onClick={() => setModal(null)}>Đóng</button>
            )}
          </div>
        </div>
      )}

      {toastMsg && <div className={`ptt-toast show ${toastMsg.kind}`}>{toastMsg.msg}</div>}
    </div>
  );
}

// ── CSS scoped cho trang (thương hiệu pastel gốc, không dùng theme tối) ──
const PTT_CSS = `
.ptt-root {
  --ptt-bg-1:#a7f3d0; --ptt-bg-2:#fde68a; --ptt-bg-3:#fbcfe8;
  --ptt-ink:#1f2937; --ptt-ink-soft:#475569;
  --ptt-accent:#f59e0b; --ptt-good:#16a34a; --ptt-bad:#dc2626;
  --pet-skin-2:#facc15; --pet-mouth:#9a3412;
  position:fixed; inset:0; overflow:auto;
  font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif; color:var(--ptt-ink);
  background: linear-gradient(135deg, var(--ptt-bg-1) 0%, var(--ptt-bg-2) 55%, var(--ptt-bg-3) 100%);
  z-index:0;
}
.ptt-root *, .ptt-root *::before, .ptt-root *::after { box-sizing:border-box; }
.ptt-top { position:fixed; top:14px; left:14px; right:14px; z-index:20; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.ptt-back { background:rgba(15,23,42,.75); color:#fff; text-decoration:none; padding:8px 14px; border-radius:20px; font-size:13px; font-weight:600; backdrop-filter:blur(6px); }
.ptt-back:hover { background:rgba(15,23,42,.9); }
.ptt-name-wrap { margin-left:auto; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.ptt-name-wrap input { background:rgba(255,255,255,.92); border:1px solid rgba(255,255,255,.6); padding:7px 13px; border-radius:18px; font-size:13px; font-weight:700; color:var(--ptt-ink); font-family:inherit; max-width:160px; }
.ptt-name-wrap button { background:var(--ptt-accent); color:#fff; border:none; padding:7px 13px; border-radius:18px; font-size:13px; font-weight:700; cursor:pointer; font-family:inherit; }
.ptt-grade-pill { background:rgba(255,255,255,.92); border:1px solid rgba(255,255,255,.6); border-radius:18px; padding:6px 10px; font-size:12.5px; font-weight:800; color:var(--ptt-ink); font-family:inherit; cursor:pointer; }
.ptt-main { padding:80px 14px 24px; max-width:980px; margin:0 auto; display:grid; gap:16px; grid-template-columns: 1fr; }
@media (min-width:840px) { .ptt-main { grid-template-columns: 320px 1fr; } }
.ptt-card { background:rgba(255,255,255,.85); border:1px solid rgba(255,255,255,.6); border-radius:18px; padding:16px 18px; box-shadow:0 8px 24px rgba(31,41,55,.08); backdrop-filter:blur(8px); }
.ptt-stats h3 { margin:0 0 12px; font-size:14px; color:var(--ptt-ink-soft); letter-spacing:.5px; text-transform:uppercase; font-weight:800; }
.ptt-stat-row { display:flex; align-items:center; gap:10px; margin-bottom:11px; font-size:13.5px; }
.ptt-stat-row .ptt-ic { width:24px; text-align:center; font-size:17px; }
.ptt-stat-row .ptt-lbl { font-weight:700; color:var(--ptt-ink); flex:0 0 70px; }
.ptt-stat-row .ptt-val { font-weight:800; color:var(--ptt-accent); margin-left:auto; font-variant-numeric:tabular-nums; }
.ptt-bar { flex:1; height:10px; background:rgba(15,23,42,.08); border-radius:6px; overflow:hidden; position:relative; }
.ptt-bar > i { display:block; height:100%; border-radius:6px; transition: width .4s cubic-bezier(.34,1.56,.64,1); }
.ptt-bar.ptt-hp > i { background: linear-gradient(90deg,#ef4444,#f87171); }
.ptt-bar.ptt-xp > i { background: linear-gradient(90deg,#3b82f6,#60a5fa); }
.ptt-mood-pill { display:inline-block; padding:3px 10px; border-radius:12px; font-size:12px; font-weight:800; }
.ptt-mood-happy { background:#dcfce7; color:#15803d; }
.ptt-mood-ok    { background:#dbeafe; color:#1e40af; }
.ptt-mood-sad   { background:#fee2e2; color:#b91c1c; }
.ptt-stage { position:relative; min-height:380px; display:flex; align-items:center; justify-content:center; padding:30px 18px; }
.ptt-pet-wrap { position:relative; cursor:pointer; transition: transform .25s; }
.ptt-pet-wrap:hover { transform: scale(1.05); }
.ptt-pet-wrap.shake { animation: ptt-shake .5s ease-in-out infinite; }
.ptt-pet-wrap.morph { animation: ptt-morph 1s cubic-bezier(.34,1.56,.64,1); }
.ptt-pet-wrap.bounce { animation: ptt-bounce 1.6s ease-in-out infinite; }
@keyframes ptt-shake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-6px);} 75%{transform:translateX(6px);} }
@keyframes ptt-morph { 0%{transform:scale(1);} 40%{transform:scale(1.5) rotate(15deg);} 70%{transform:scale(.9);} 100%{transform:scale(1);} }
@keyframes ptt-bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
.ptt-pet-svg { display:block; }
.ptt-pet-label { text-align:center; margin-top:8px; font-weight:800; color:var(--ptt-ink); font-size:15px; }
.ptt-pet-stage-name { text-align:center; margin-top:2px; font-size:12.5px; color:var(--ptt-ink-soft); font-weight:600; }
.ptt-actions { display:grid; grid-template-columns: repeat(3,1fr); gap:10px; margin-top:14px; }
.ptt-act-btn { background:linear-gradient(180deg,#fff 0%, #f8fafc 100%); border:2px solid rgba(15,23,42,.1); border-radius:14px; padding:14px 8px; text-align:center; cursor:pointer; transition: all .15s; font-family:inherit; }
.ptt-act-btn:hover { border-color:var(--ptt-accent); transform: translateY(-3px); box-shadow:0 6px 16px rgba(245,158,11,.25); }
.ptt-act-btn .ptt-ic { font-size:28px; display:block; margin-bottom:4px; }
.ptt-act-btn .ptt-lb { font-weight:800; font-size:13px; color:var(--ptt-ink); }
.ptt-act-btn .ptt-sub { font-size:11px; color:var(--ptt-ink-soft); margin-top:2px; }
.ptt-backdrop { position:fixed; inset:0; background:rgba(15,23,42,.55); z-index:50; display:flex; align-items:center; justify-content:center; padding:18px; backdrop-filter:blur(4px); }
.ptt-modal { background:#fff; border-radius:20px; max-width:480px; width:100%; padding:24px; box-shadow:0 24px 60px rgba(0,0,0,.35); }
.ptt-modal h2 { margin:0 0 6px; font-size:18px; }
.ptt-qprompt { font-size:16px; font-weight:700; color:var(--ptt-ink); margin:14px 0 16px; line-height:1.5; }
.ptt-qopts { display:grid; gap:8px; }
.ptt-qopt { background:#f8fafc; border:2px solid #e2e8f0; padding:12px 14px; border-radius:12px; cursor:pointer; font-weight:700; font-size:14px; text-align:left; color:var(--ptt-ink); transition: all .15s; font-family:inherit; }
.ptt-qopt:hover:not(:disabled) { background:#fef3c7; border-color:var(--ptt-accent); }
.ptt-qopt.good { background:#dcfce7; border-color:var(--ptt-good); color:var(--ptt-good); }
.ptt-qopt.bad { background:#fee2e2; border-color:var(--ptt-bad); color:var(--ptt-bad); }
.ptt-qopt:disabled { cursor:default; }
.ptt-qresult { margin-top:14px; padding:12px 14px; border-radius:12px; font-weight:700; font-size:14px; }
.ptt-qresult.ok { background:#dcfce7; color:var(--ptt-good); }
.ptt-qresult.no { background:#fee2e2; color:var(--ptt-bad); }
.ptt-qclose { margin-top:14px; background:var(--ptt-ink); color:#fff; border:none; padding:10px 18px; border-radius:14px; font-weight:700; cursor:pointer; font-family:inherit; }
.ptt-count-game { text-align:center; padding:10px 0; }
.ptt-count-game .ptt-emojis { font-size:34px; line-height:1.4; margin:12px 0; user-select:none; word-wrap:break-word; }
.ptt-count-opts { grid-template-columns: repeat(4,1fr); }
.ptt-count-opts .ptt-qopt { text-align:center; }
.ptt-toast { position:fixed; left:50%; top:18px; transform:translateX(-50%) translateY(0); z-index:60; background:#16a34a; color:#fff; padding:10px 18px; border-radius:14px; font-weight:700; box-shadow:0 8px 24px rgba(22,163,74,.5); max-width:90vw; text-align:center; }
.ptt-toast.bad { background:#dc2626; box-shadow:0 8px 24px rgba(220,38,38,.5); }
.ptt-toast.info { background:#3b82f6; box-shadow:0 8px 24px rgba(59,130,246,.5); }
.ptt-confetti { position:fixed; pointer-events:none; font-size:22px; z-index:55; animation: ptt-conf 1.6s ease-out forwards; }
@keyframes ptt-conf { from { transform: translateY(0) scale(.4) rotate(0deg); opacity:1; } to { transform: translateY(-220px) scale(1.4) rotate(540deg); opacity:0; } }
.ptt-sparkle { position:absolute; font-size:18px; pointer-events:none; animation: ptt-sparkle 2s ease-in-out infinite; }
@keyframes ptt-sparkle { 0%,100%{ opacity:.4; transform:scale(.8); } 50%{ opacity:1; transform:scale(1.2); } }
`;
