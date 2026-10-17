'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { pickVoice } from '@/lib/tts';

// ─────────────────────────────────────────────────────────────────────────────
//  TỪ VỰNG TIẾNG ANH CHUYÊN NGÀNH — bản React (Next) của trang vanilla cũ.
//
//  CONTENT (bộ từ vựng theo chủ đề) KHÔNG hardcode trong file này: đọc DB qua
//  /api/content/vocab-en — mỗi row = 1 chủ đề { topic, label, words[] }. Nguồn
//  seed: public/js/scenarios/_data/vocab-en.js (node server/scripts/seed-content.mjs).
//
//  LỊCH SỬ LỖI (2026-07-16): bản đầu scrape object VOCAB từ inline script của
//  trang HTML cũ (/tu-vung-tieng-anh). Khi trang này vào danh sách MIGRATED
//  thì Next 308 /tu-vung-tieng-anh → /tu-vung-tieng-anh, tức fetch quay về
//  CHÍNH TRANG NÀY — không còn VOCAB để trích → mất sạch flashcard + các tác vụ.
//  Đừng dựng lại fallback trỏ vào URL .html của trang đã migrate.
//
//  Chấm câu/bài viết dùng API thật: /api/ai/grade-sentence, /api/ai/grade-writing.
//  Nhập từ file dùng /api/ai/extract-vocab. Tất cả fetch credentials:'same-origin'.
//  Tiến độ SRS + streak lưu localStorage (giữ nguyên hành vi trang gốc).
// ─────────────────────────────────────────────────────────────────────────────

type Word = { w: string; pos: string; ph: string; v: string; ex: string; custom?: boolean };
type Vocab = Record<string, Word[]>;
type ExtractWord = { en: string; vi: string; pos: string; topic: string; ipa?: string; ex?: string };

const INTERVALS = [0, 10 * 60e3, 24 * 3600e3, 3 * 24 * 3600e3, 7 * 24 * 3600e3, 16 * 24 * 3600e3];
const MASTER_BOX = 4;
const QUIZ_LEN = 10;
const LISTEN_LEN = 10;
const WRITE_LEN = 8;
const STATE_KEY = 'tizia:vocab-en:v2';
const CUSTOM_KEY = 'tizia:vocab-en:custom';
const IMPORT_TOPIC = 'custom_import';

const TOPIC_LABELS: Record<string, string> = {
  cntt: '💻 Công nghệ thông tin', yte: '🩺 Y tế', giaoduc: '🎓 Giáo dục', business: '💼 Kinh doanh',
  basic: '📖 Cơ bản', travel: '✈️ Du lịch', academic: '🔬 Học thuật', ielts: '📝 IELTS 6.5+',
};
const TOPIC_ORDER = ['cntt', 'yte', 'giaoduc', 'business', 'basic', 'travel', 'academic', 'ielts'];
const TOPIC_KW: Record<string, string[]> = {
  cntt: ['máy tính', 'dữ liệu', 'mã hoá', 'mã hóa', 'code', 'lập trình', 'mạng', 'phần mềm', 'phần cứng', 'web', 'máy chủ', 'thuật toán', 'bảo mật', 'ứng dụng', 'biến', 'hàm', 'tệp', 'đám mây', 'lỗi'],
  yte: ['bệnh', 'thuốc', 'sức khỏe', 'sức khoẻ', 'điều trị', 'bác sĩ', 'virus', 'vi-rút', 'tế bào', 'phẫu', 'triệu chứng', 'dịch', 'tiêm', 'chẩn đoán', 'y tế', 'vết thương'],
  giaoduc: ['học', 'trường', 'sinh viên', 'giáo dục', 'bài giảng', 'thi', 'khoá học', 'khóa học', 'lớp', 'đào tạo', 'bằng', 'học bổng', 'giảng', 'luận'],
  business: ['kinh doanh', 'doanh thu', 'thị trường', 'công ty', 'lợi nhuận', 'đầu tư', 'tài chính', 'khách hàng', 'ngân sách', 'hợp đồng', 'cổ', 'vận tải'],
};

// Loại bài viết + dàn ý (label UI tĩnh, không phải content nghiệp vụ).
const WRITE_TYPES: Record<string, { label: string; words: string; outline: string[] }> = {
  paragraph: { label: '📄 Đoạn văn', words: '60–100 từ', outline: ['Câu chủ đề: nêu ý chính của đoạn', '2–3 câu triển khai: lý do, ví dụ, chi tiết', 'Câu kết: chốt lại ý hoặc nêu cảm nghĩ'] },
  email: { label: '✉️ Email', words: '80–120 từ', outline: ['Lời chào: Dear … / Hi …', 'Mở đầu: nêu lý do viết email', 'Nội dung chính: thông tin, đề nghị hoặc câu hỏi', 'Kết: lời cảm ơn + Best regards, [tên]'] },
  essay: { label: '📝 Essay', words: '150–250 từ', outline: ['Introduction: giới thiệu chủ đề + nêu luận điểm (thesis)', 'Body 1: ý chính thứ nhất + ví dụ/lý lẽ', 'Body 2: ý chính thứ hai + ví dụ/lý lẽ', 'Conclusion: tóm tắt + khẳng định lại quan điểm'] },
};
const ESSAY_ANGLES: Record<string, string[]> = {
  paragraph: ['Mô tả một khái niệm/công cụ trong lĩnh vực «{label}» mà bạn thấy thú vị.', 'Giới thiệu bản thân và lý do bạn quan tâm tới «{label}».', 'Nêu lợi ích và một thách thức của «{label}» trong đời sống.'],
  email: ['Viết email hỏi thông tin về một khoá học/cơ hội liên quan tới «{label}».', 'Viết email báo cáo tiến độ một công việc thuộc «{label}» cho đồng nghiệp.', 'Viết email xin lời khuyên từ một chuyên gia trong lĩnh vực «{label}».'],
  essay: ['Theo bạn, «{label}» ảnh hưởng thế nào tới xã hội? Nêu quan điểm và ví dụ.', 'Lợi ích và mặt trái của «{label}»: bạn nghiêng về phía nào? Vì sao?', 'Xu hướng phát triển của «{label}» trong 10 năm tới sẽ ra sao?'],
};

const todayStr = () => new Date().toISOString().slice(0, 10);
function escapeReg(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// ── SRS store (localStorage) ───────────────────────────────────────────────
type CardSt = { box: number; due: number };
type Store = { cards: Record<string, Record<string, CardSt>>; streak: { count: number; last: string | null } };
function loadStore(): Store {
  let s: Partial<Store> = {};
  try { s = JSON.parse(localStorage.getItem(STATE_KEY) || '{}'); } catch { /* ignore */ }
  return { cards: s.cards || {}, streak: s.streak || { count: 0, last: null } };
}

type Custom = { words: Record<string, Word[]>; labels: Record<string, string> };
function loadCustom(): Custom {
  let c: Partial<Custom> = {};
  try { c = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '{}'); } catch { /* ignore */ }
  return { words: c.words || {}, labels: c.labels || {} };
}

// ── Đọc bộ từ vựng từ DB (/api/content/vocab-en) ────────────────────────────
// Mỗi row = 1 chủ đề. Giữ thứ tự row trả về (ord trong DB) làm thứ tự hiển thị.
type TopicRow = { topic: string; label?: string; words?: Word[] };
type LoadedVocab = { vocab: Vocab; labels: Record<string, string>; order: string[] };

async function fetchVocabFromDb(): Promise<LoadedVocab | null> {
  const r = await fetch('/api/content/vocab-en', { credentials: 'same-origin' });
  if (!r.ok) return null;
  const d = await r.json();
  const rows: TopicRow[] = Array.isArray(d?.items) ? d.items : [];
  const out: LoadedVocab = { vocab: {}, labels: {}, order: [] };
  for (const row of rows) {
    if (!row?.topic || !Array.isArray(row.words) || !row.words.length) continue;
    out.vocab[row.topic] = row.words;
    if (row.label) out.labels[row.topic] = row.label;
    out.order.push(row.topic);
  }
  return out.order.length ? out : null;
}

// ── Phát âm (Web Speech API) ────────────────────────────────────────────────
function speak(word: string, rate = 0.85) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(word);
  u.lang = 'en-US'; u.rate = rate;
  const v = pickVoice('en'); // giọng en chọn theo chất lượng — lib/tts.ts
  if (v) u.voice = v;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

type Tab = 'card' | 'quiz' | 'review' | 'listen' | 'write' | 'essay';
type Mode = 'en-vi' | 'vi-en';

export default function TuVungTiengAnhClient() {
  const [vocab, setVocab] = useState<Vocab>({});
  const [labels, setLabels] = useState<Record<string, string>>({ ...TOPIC_LABELS });
  const [loadErr, setLoadErr] = useState('');
  const [ready, setReady] = useState(false);

  const [topic, setTopic] = useState('cntt');
  const [mode, setMode] = useState<Mode>('en-vi');
  const [tab, setTab] = useState<Tab>('card');
  const [streakDisp, setStreakDisp] = useState(0);
  const [searchMsg, setSearchMsg] = useState('');

  const storeRef = useRef<Store>({ cards: {}, streak: { count: 0, last: null } });
  const customRef = useRef<Custom>({ words: {}, labels: {} });
  const vocabRef = useRef<Vocab>({});
  const dbOrderRef = useRef<string[]>([]);
  const backHref = useRef('/school?domain=language');

  useEffect(() => { vocabRef.current = vocab; }, [vocab]);

  // ── nạp store + custom + VOCAB nguồn ──
  useEffect(() => {
    storeRef.current = loadStore();
    customRef.current = loadCustom();
    const params = new URLSearchParams(location.search);
    const dom = params.get('domain');
    if (dom) backHref.current = '/school?domain=' + encodeURIComponent(dom);

    (async () => {
      let loaded: LoadedVocab | null = null;
      try { loaded = await fetchVocabFromDb(); } catch { /* ignore */ }
      if (!loaded) { setLoadErr('Không tải được bộ từ vựng. Vui lòng thử lại.'); setReady(true); return; }

      // gộp từ do người dùng thêm (custom, localStorage)
      const merged: Vocab = {};
      for (const [k, arr] of Object.entries(loaded.vocab)) merged[k] = arr.slice();
      const cust = customRef.current;
      for (const [t, arr] of Object.entries(cust.words)) {
        if (!merged[t]) merged[t] = [];
        for (const it of arr) if (!merged[t].some((x) => x.w.toLowerCase() === it.w.toLowerCase())) merged[t].push(it);
      }
      setLabels({ ...TOPIC_LABELS, ...loaded.labels, ...cust.labels });
      dbOrderRef.current = loaded.order;

      const t = params.get('topic');
      let start = loaded.order[0] || 'cntt';
      if (t && merged[t]) start = t;
      setTopic(start);
      setVocab(merged);
      setStreakDisp(streakValid());
      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── SRS helpers (đọc/ghi storeRef) ──
  const save = useCallback(() => { try { localStorage.setItem(STATE_KEY, JSON.stringify(storeRef.current)); } catch { /* ignore */ } }, []);
  const saveCustom = useCallback(() => { try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(customRef.current)); } catch { /* ignore */ } }, []);
  function cardState(t: string, w: string): CardSt {
    const c = storeRef.current.cards; c[t] = c[t] || {};
    return c[t][w] || { box: 0, due: 0 };
  }
  const setCardSt = useCallback((t: string, w: string, st: CardSt) => {
    const c = storeRef.current.cards; c[t] = c[t] || {}; c[t][w] = st; save();
  }, [save]);
  const grade = useCallback((t: string, w: string, correct: boolean) => {
    const st = cardState(t, w);
    st.box = correct ? Math.min(MASTER_BOX + 1, st.box + 1) : 0;
    st.due = Date.now() + INTERVALS[Math.min(st.box, INTERVALS.length - 1)];
    setCardSt(t, w, st);
  }, [setCardSt]);
  function dueList(t: string): Word[] {
    const now = Date.now();
    return (vocabRef.current[t] || []).filter((it) => cardState(t, it.w).due <= now)
      .sort((a, b) => cardState(t, a.w).box - cardState(t, b.w).box);
  }
  function masteredCount(t: string) {
    return (vocabRef.current[t] || []).filter((it) => cardState(t, it.w).box >= MASTER_BOX).length;
  }
  function streakValid() {
    const s = storeRef.current.streak; if (!s.last) return 0;
    const t = todayStr(), yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    return (s.last === t || s.last === yest) ? s.count : 0;
  }
  const bumpStreak = useCallback(() => {
    const t = todayStr(), s = storeRef.current.streak;
    if (s.last === t) return;
    const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    s.count = (s.last === yest) ? s.count + 1 : 1; s.last = t; save();
    setStreakDisp(streakValid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);

  // ─────────────── FLASHCARD ───────────────
  const [flipped, setFlipped] = useState(false);
  const [cur, setCur] = useState<Word | null>(null);
  const [reviewAhead, setReviewAhead] = useState(false);
  const forcedRef = useRef<Word | null>(null);
  const [fcWriteOpen, setFcWriteOpen] = useState(false);
  const [fcInput, setFcInput] = useState('');
  const [fcFeed, setFcFeed] = useState<{ cls: string; html: string } | null>(null);
  const [fcGrading, setFcGrading] = useState(false);

  const pickCard = useCallback((): Word | null => {
    const due = dueList(topic);
    if (due.length) { return due[0]; }
    if (reviewAhead) { const all = vocabRef.current[topic] || []; return all.length ? all[Math.floor(Math.random() * all.length)] : null; }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, reviewAhead]);

  const refreshCard = useCallback(() => {
    const next = forcedRef.current || pickCard(); forcedRef.current = null;
    if (next && dueList(topic).length) setReviewAhead(false);
    setCur(next);
    setFcWriteOpen(false); setFcInput(''); setFcFeed(null); setFcGrading(false);
  }, [pickCard, topic]);

  useEffect(() => { if (ready && tab === 'card') refreshCard(); /* eslint-disable-next-line */ }, [ready, tab, topic, reviewAhead]);

  const dueCount = ready ? dueList(topic).length : 0;
  const total = (vocab[topic] || []).length;
  const mastered = ready ? masteredCount(topic) : 0;

  const knowCard = () => { if (!cur) return; grade(topic, cur.w, true); bumpStreak(); setFlipped(false); refreshCard(); };
  const againCard = () => { if (!cur) return; grade(topic, cur.w, false); setFlipped(false); refreshCard(); };

  // ── Chấm 1 câu (dùng chung Flashcard + Luyện Viết) ──
  type GradeRes = { ok: boolean; correct: boolean; ai: boolean; guest: boolean; html: string };
  const gradeSentence = useCallback(async (it: Word, sentence: string): Promise<GradeRes> => {
    let r: Record<string, unknown> | null = null;
    try {
      const resp = await fetch('/api/ai/grade-sentence', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: it.w, meaning: it.v, pos: it.pos, sentence }),
      });
      if (resp.ok) r = await resp.json();
      else if (resp.status === 401) r = { _guest: true };
    } catch { /* ignore */ }
    if (!r || r._guest || r.score == null) {
      const usesWord = new RegExp('\\b' + escapeReg(it.w), 'i').test(sentence);
      const ok = usesWord && sentence.split(/\s+/).filter(Boolean).length >= 4;
      const html =
        '<div class="wscore">' + (ok ? '✅ Câu hợp lệ' : '⚠️ Cần xem lại') + '</div>' +
        '<div class="wline">' + (usesWord ? 'Câu của bạn có dùng từ <b>' + it.w + '</b>. ' : 'Câu chưa dùng từ <b>' + it.w + '</b>. ') +
        (r && r._guest ? 'Đăng nhập để được AI chấm chi tiết ngữ pháp & cách dùng.' : 'AI chấm chi tiết tạm offline.') + '</div>' +
        '<div class="wline"><span class="wlabel">Câu mẫu</span><br>' + esc(it.ex) + '</div>';
      return { ok, correct: ok, ai: false, guest: !!(r && r._guest), html };
    }
    const score = r.score as number, correct = !!r.correct;
    let html = '<div class="wscore">' + (correct ? '✅' : '✍️') + ' ' + score + '/100</div>';
    if (r.feedback) html += '<div class="wline">' + esc(String(r.feedback)) + '</div>';
    if (r.corrected && String(r.corrected).trim().toLowerCase() !== sentence.toLowerCase())
      html += '<div class="wline"><span class="wlabel">Gợi ý sửa</span><br>' + esc(String(r.corrected)) + '</div>';
    if (r.betterExample)
      html += '<div class="wline"><span class="wlabel">Câu hay hơn</span><br>' + esc(String(r.betterExample)) + '</div>';
    return { ok: correct, correct, ai: true, guest: false, html };
  }, []);

  const fcGrade = async () => {
    if (!cur || fcGrading) return;
    const sentence = fcInput.trim();
    if (sentence.split(/\s+/).filter(Boolean).length < 3) {
      setFcFeed({ cls: 'wfeed show no', html: '✍️ Hãy viết một câu hoàn chỉnh có dùng từ <b>' + cur.w + '</b>.' });
      return;
    }
    setFcGrading(true);
    const res = await gradeSentence(cur, sentence);
    setFcGrading(false);
    setFcFeed({ cls: 'wfeed show ' + (res.correct ? 'ok' : 'no'), html: res.html });
    if (res.ai && res.correct) bumpStreak();
  };

  // ─────────────── QUIZ ───────────────
  type QItem = { it: Word; opts: string[]; answer: number; picked: number | null };
  const [quiz, setQuiz] = useState<{ items: QItem[]; idx: number; right: number } | null>(null);
  const startQuiz = useCallback(() => {
    const pool = vocabRef.current[topic] || [];
    const ranked = [...pool].sort((a, b) => cardState(topic, a.w).box - cardState(topic, b.w).box);
    const chosen = ranked.slice(0, Math.min(QUIZ_LEN, pool.length)).sort(() => Math.random() - 0.5);
    const items: QItem[] = chosen.map((it) => {
      const others = pool.filter((x) => x.w !== it.w).sort(() => Math.random() - 0.5).slice(0, 3);
      const optSrc = [it, ...others].sort(() => Math.random() - 0.5);
      const opts = optSrc.map((o) => (mode === 'en-vi' ? o.v : o.w));
      return { it, opts, answer: opts.indexOf(mode === 'en-vi' ? it.v : it.w), picked: null };
    });
    setQuiz({ items, idx: 0, right: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, mode]);

  const answerQuiz = (i: number) => {
    setQuiz((q) => {
      if (!q) return q;
      const cq = q.items[q.idx];
      if (cq.picked !== null) return q;
      const correct = i === cq.answer;
      grade(topic, cq.it.w, correct);
      if (mode === 'en-vi') speak(cq.it.w);
      const items = q.items.slice();
      items[q.idx] = { ...cq, picked: i };
      return { ...q, items, right: q.right + (correct ? 1 : 0) };
    });
  };
  const quizNext = () => {
    setQuiz((q) => {
      if (!q) return q;
      if (q.idx < q.items.length - 1) return { ...q, idx: q.idx + 1 };
      finishQuiz(q);
      return q;
    });
  };

  // ── Overlay chúc mừng (dùng chung) ──
  const [overlay, setOverlay] = useState<null | {
    emoji: string; title: string; score: string; msg: string;
    showReview: boolean; onAgain: () => void;
  }>(null);
  const finishQuiz = (q: { items: QItem[]; right: number }) => {
    bumpStreak();
    const n = q.items.length, r = q.right, pct = Math.round((r / n) * 100), pass = pct >= 70;
    setOverlay({
      emoji: pct === 100 ? '🏆' : pass ? '🎉' : '💪',
      title: pct === 100 ? 'Tuyệt đối!' : pass ? 'Chúc mừng!' : 'Cố lên!',
      score: r + '/' + n,
      msg: pass
        ? 'Bạn trả lời đúng <b>' + pct + '%</b>. Chuỗi học: 🔥 <b>' + streakValid() + ' ngày</b>. Các từ trả lời đúng đã được dời lịch ôn xa hơn.'
        : 'Đúng <b>' + pct + '%</b> — ôn lại các từ sai rồi thử lại nhé. Những từ sai sẽ xuất hiện sớm trong phần Học thẻ.',
      showReview: true,
      onAgain: () => { setOverlay(null); startQuiz(); setTab('quiz'); },
    });
    if (pass) fireConfetti(pct === 100 ? 1.6 : 1);
  };

  // ─────────────── LUYỆN NGHE ───────────────
  type LState = { items: Word[]; idx: number; right: number };
  const [listen, setListen] = useState<LState | null>(null);
  const [lInput, setLInput] = useState('');
  const [lReveal, setLReveal] = useState<null | { ok: boolean; guess: string; it: Word }>(null);
  const startListen = useCallback(() => {
    const pool = vocabRef.current[topic] || [];
    const ranked = [...pool].sort((a, b) => cardState(topic, a.w).box - cardState(topic, b.w).box);
    const items = ranked.slice(0, Math.min(LISTEN_LEN, pool.length)).sort(() => Math.random() - 0.5);
    setListen({ items, idx: 0, right: 0 }); setLInput(''); setLReveal(null);
    if (items[0]) speak(items[0].w);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);
  const checkListen = () => {
    if (!listen || lReveal) return;
    const it = listen.items[listen.idx];
    const guess = lInput.trim().toLowerCase();
    if (!guess) return;
    const correct = guess === it.w.toLowerCase();
    grade(topic, it.w, correct);
    if (correct) setListen({ ...listen, right: listen.right + 1 });
    setLReveal({ ok: correct, guess, it });
  };
  const listenNext = () => {
    if (!listen) return;
    if (listen.idx < listen.items.length - 1) {
      const idx = listen.idx + 1;
      setListen({ ...listen, idx }); setLInput(''); setLReveal(null);
      speak(listen.items[idx].w);
    } else {
      bumpStreak();
      finishListenWrite('🎧 Luyện Nghe', listen.right, listen.items.length, startListen);
    }
  };

  // ─────────────── LUYỆN VIẾT ───────────────
  const [write, setWrite] = useState<LState | null>(null);
  const [wInput, setWInput] = useState('');
  const [wFeed, setWFeed] = useState<{ cls: string; html: string } | null>(null);
  const [wGrading, setWGrading] = useState(false);
  const [wDone, setWDone] = useState(false);
  const startWrite = useCallback(() => {
    const pool = vocabRef.current[topic] || [];
    const ranked = [...pool].sort((a, b) => cardState(topic, a.w).box - cardState(topic, b.w).box);
    const items = ranked.slice(0, Math.min(WRITE_LEN, pool.length)).sort(() => Math.random() - 0.5);
    setWrite({ items, idx: 0, right: 0 }); setWInput(''); setWFeed(null); setWGrading(false); setWDone(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);
  const submitWrite = async () => {
    if (!write || wDone) return;
    const it = write.items[write.idx];
    const sentence = wInput.trim();
    if (sentence.split(/\s+/).filter(Boolean).length < 3) {
      setWFeed({ cls: 'wfeed show no', html: '✍️ Hãy viết một câu hoàn chỉnh (ít nhất vài từ) có dùng từ <b>' + it.w + '</b>.' });
      return;
    }
    setWGrading(true);
    const res = await gradeSentence(it, sentence);
    setWGrading(false); setWDone(true);
    if (res.correct) setWrite({ ...write, right: write.right + 1 });
    setWFeed({ cls: 'wfeed show ' + (res.correct ? 'ok' : 'no'), html: res.html });
    if (res.ai) grade(topic, it.w, res.correct);
  };
  const writeNext = () => {
    if (!write) return;
    if (write.idx < write.items.length - 1) {
      setWrite({ ...write, idx: write.idx + 1 }); setWInput(''); setWFeed(null); setWDone(false);
    } else {
      bumpStreak();
      finishListenWrite('✍️ Luyện Viết', write.right, write.items.length, startWrite);
    }
  };

  const finishListenWrite = (label: string, right: number, tot: number, retry: () => void) => {
    const pct = Math.round((right / tot) * 100), pass = pct >= 70;
    setOverlay({
      emoji: pct === 100 ? '🏆' : pass ? '🎉' : '💪',
      title: label + (pct === 100 ? ' — Tuyệt đối!' : pass ? ' — Tốt lắm!' : ' — Cố lên!'),
      score: right + '/' + tot,
      msg: 'Bạn đạt <b>' + pct + '%</b>. Chuỗi học: 🔥 <b>' + streakValid() + ' ngày</b>.',
      showReview: false,
      onAgain: () => { setOverlay(null); retry(); },
    });
    if (pass) fireConfetti(pct === 100 ? 1.6 : 1);
  };

  // ─────────────── VIẾT BÀI (đoạn/email/essay) ───────────────
  const [eType, setEType] = useState('paragraph');
  const [eAngle, setEAngle] = useState(0);
  const [eInput, setEInput] = useState('');
  const [eFeed, setEFeed] = useState<{ cls: string; html: string } | null>(null);
  const [eGrading, setEGrading] = useState(false);
  function topicLabelNow() {
    return (labels[topic] || TOPIC_LABELS[topic] || topic || 'chủ đề').replace(/^[^\p{L}]+/u, '').trim();
  }
  const eAngles = ESSAY_ANGLES[eType];
  const ePrompt = (eAngles[eAngle % eAngles.length] || '').replace('{label}', topicLabelNow());
  const eVocabHint = (() => {
    const pool = (vocab[topic] || []).slice().sort(() => Math.random() - 0.5).slice(0, 5).map((x) => x.w);
    return pool.length ? '💡 Thử dùng các từ đã học: ' + pool.map((w) => '<b>' + esc(w) + '</b>').join(', ') : '';
  })();
  const submitEssay = async () => {
    const t = WRITE_TYPES[eType];
    const text = eInput.trim();
    if (text.split(/\s+/).filter(Boolean).length < 20) {
      setEFeed({ cls: 'wfeed show no', html: '✍️ Hãy viết dài hơn (ít nhất ~20 từ) theo dàn ý gợi ý để hệ thống chấm chính xác hơn.' });
      return;
    }
    setEGrading(true);
    let r: Record<string, unknown> | null = null;
    try {
      const resp = await fetch('/api/ai/grade-writing', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: eType, topicLabel: topicLabelNow(), prompt: ePrompt, text, targetWords: t.words }),
      });
      if (resp.status === 401) {
        setEGrading(false);
        setEFeed({ cls: 'wfeed show no', html: '🔒 Hãy <a href="/login" style="color:var(--tv-accent)">đăng nhập</a> để dùng chức năng chấm bài viết.' });
        return;
      }
      if (resp.ok) r = await resp.json();
    } catch { /* ignore */ }
    setEGrading(false);
    if (!r) { setEFeed({ cls: 'wfeed show no', html: '😅 Chấm bài tạm lỗi, thử lại sau ít phút nhé.' }); return; }
    const score = (r.score as number) || 0, ok = score >= 60;
    let html = '<div class="wscore">' + (ok ? '✅' : '✍️') + ' ' + score + '/100' + (r.level ? '<span class="elevel">' + esc(String(r.level)) + '</span>' : '') + '</div>';
    if (r.feedback) html += '<div class="wline">' + esc(String(r.feedback)) + '</div>';
    if (r.strengths) html += '<div class="wline"><span class="wlabel">Điểm mạnh</span><br>' + esc(String(r.strengths)) + '</div>';
    const corr = r.corrections as Array<{ original?: string; fixed?: string; why?: string }> | undefined;
    if (corr && corr.length) {
      html += '<div class="wline"><span class="wlabel">Lỗi &amp; cách sửa</span></div>';
      for (const c of corr) {
        html += '<div class="ecorr">' + (c.original ? '<span class="o">' + esc(c.original) + '</span> → ' : '')
          + '<span class="f">' + esc(c.fixed || '') + '</span>' + (c.why ? '<span class="wy">' + esc(c.why) + '</span>' : '') + '</div>';
      }
    }
    if (r.improved) html += '<div class="wline"><span class="wlabel">Bản viết lại hay hơn</span><br>' + esc(String(r.improved)).replace(/\n/g, '<br>') + '</div>';
    setEFeed({ cls: 'wfeed show ' + (ok ? 'ok' : 'no'), html });
    if (r.source === 'ai' && ok) bumpStreak();
  };

  // ─────────────── Tìm kiếm + Thêm từ + Nhập file ───────────────
  const [searchInput, setSearchInput] = useState('');
  const rebuildLabels = useCallback(() => setLabels({ ...TOPIC_LABELS, ...customRef.current.labels }), []);
  const mergeCustomIntoVocab = useCallback(() => {
    setVocab((prev) => {
      const next: Vocab = {};
      for (const [k, arr] of Object.entries(prev)) next[k] = arr.slice();
      for (const [t, arr] of Object.entries(customRef.current.words)) {
        if (!next[t]) next[t] = [];
        for (const it of arr) if (!next[t].some((x) => x.w.toLowerCase() === it.w.toLowerCase())) next[t].push(it);
      }
      return next;
    });
  }, []);

  const doSearch = () => {
    const q = searchInput.trim().toLowerCase();
    if (!q) { setSearchMsg(''); return; }
    for (const [t, arr] of Object.entries(vocab)) {
      const hit = arr.find((it) => it.w.toLowerCase() === q) || arr.find((it) => it.w.toLowerCase().includes(q) || it.v.toLowerCase().includes(q));
      if (hit) {
        setTopic(t); setTab('card');
        setSearchMsg('✓ Thấy <b>' + hit.w + '</b> trong «' + (labels[t] || t) + '»');
        forcedRef.current = hit; setFlipped(false); setReviewAhead(false);
        setTimeout(refreshCard, 0);
        return;
      }
    }
    setSearchMsg('Không thấy «' + esc(q) + '».');
  };

  // Modal thêm từ
  const [addOpen, setAddOpen] = useState(false);
  const [aw, setAw] = useState({ en: '', vi: '', ipa: '', pos: 'noun', ex: '', topic: 'cntt', newTopic: '' });
  const openAdd = (prefill = '') => {
    const first = Object.keys(vocab)[0] || 'cntt';
    setAw({ en: prefill, vi: '', ipa: '', pos: 'noun', ex: '', topic: first, newTopic: '' });
    setAddOpen(true);
  };
  useEffect(() => {
    if (!addOpen) return;
    const sug = suggestTopic(aw.en, aw.vi);
    if (sug && aw.topic !== '__new__' && vocab[sug]) setAw((s) => ({ ...s, topic: sug }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aw.en, aw.vi]);
  const saveWord = () => {
    const en = aw.en.trim(), vi = aw.vi.trim();
    if (!en || !vi) { alert('Nhập tối thiểu Từ tiếng Anh + Nghĩa tiếng Việt.'); return; }
    let tk = aw.topic;
    if (tk === '__new__') {
      const nm = aw.newTopic.trim(); if (!nm) { alert('Nhập tên chủ đề mới.'); return; }
      tk = 'custom_' + (Object.keys(customRef.current.labels).length + 1);
      customRef.current.labels[tk] = '✏️ ' + nm;
    }
    const item: Word = { w: en, pos: aw.pos, ph: aw.ipa.trim() || ('/' + en + '/'), v: vi, ex: aw.ex.trim() || (en + ' — ' + vi), custom: true };
    customRef.current.words[tk] = customRef.current.words[tk] || [];
    customRef.current.words[tk].push(item);
    saveCustom(); rebuildLabels(); mergeCustomIntoVocab();
    setAddOpen(false); setTopic(tk); setTab('card');
    forcedRef.current = item; setFlipped(false); setTimeout(refreshCard, 0);
    setSearchMsg('✓ Đã thêm <b>' + en + '</b> vào «' + (customRef.current.labels[tk] || TOPIC_LABELS[tk] || tk) + '»');
  };

  // Nhập từ file (AI extract)
  const [importOpen, setImportOpen] = useState(false);
  const [impStatus, setImpStatus] = useState('');
  const [impWords, setImpWords] = useState<ExtractWord[]>([]);
  const [impChecked, setImpChecked] = useState<Record<number, boolean>>({});
  const [impTopics, setImpTopics] = useState<Record<number, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const onImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    e.target.value = '';
    setImportOpen(true); setImpWords([]); setImpStatus('⏳ Đang đọc «' + esc(file.name) + '»…');
    let text = '';
    try { text = await extractText(file); }
    catch (err) { setImpStatus('⚠️ ' + ((err as Error).message || 'Không đọc được file.')); return; }
    if (!text || text.trim().length < 3) { setImpStatus('⚠️ File không có nội dung chữ để trích.'); return; }
    setImpStatus('⏳ AI đang lọc từ vựng chuyên ngành…');
    const allLabels = { ...TOPIC_LABELS, ...customRef.current.labels };
    const topics = Object.keys(allLabels).filter((k) => vocab[k] && k !== IMPORT_TOPIC)
      .map((k) => ({ key: k, label: allLabels[k].replace(/^[^\p{L}]+/u, '').trim() || k }));
    let words: ExtractWord[] = [];
    try {
      const resp = await fetch('/api/ai/extract-vocab', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, topics, max: 30 }),
      });
      if (resp.status === 401) { setImpStatus('🔒 Hãy đăng nhập để dùng tính năng nhập từ file.'); return; }
      if (resp.ok) { const d = await resp.json(); words = d.words || []; }
    } catch { /* ignore */ }
    if (!words.length) { setImpStatus('😅 Chưa trích được từ vựng phù hợp. Thử file có nhiều thuật ngữ tiếng Anh hơn nhé.'); return; }
    setImpWords(words);
    const chk: Record<number, boolean> = {}, tps: Record<number, string> = {};
    words.forEach((w, i) => { chk[i] = true; tps[i] = w.topic; });
    setImpChecked(chk); setImpTopics(tps);
    setImpStatus('✓ Tìm thấy <b>' + words.length + '</b> từ. Bỏ chọn từ không cần, chỉnh chủ đề nếu muốn, rồi bấm «Thêm».');
  };
  const doImportAdd = () => {
    let added = 0, firstTopic: string | null = null;
    impWords.forEach((w, i) => {
      if (!impChecked[i]) return;
      let tk = impTopics[i] || 'khac';
      if (tk === 'khac') { tk = IMPORT_TOPIC; if (!customRef.current.labels[tk]) customRef.current.labels[tk] = '📄 Từ nhập file'; }
      const item: Word = { w: w.en, pos: w.pos, ph: w.ipa || ('/' + w.en + '/'), v: w.vi, ex: w.ex || (w.en + ' — ' + w.vi), custom: true };
      const dup = (customRef.current.words[tk] || []).some((x) => x.w.toLowerCase() === item.w.toLowerCase())
        || (vocab[tk] || []).some((x) => x.w.toLowerCase() === item.w.toLowerCase());
      if (!dup) { customRef.current.words[tk] = customRef.current.words[tk] || []; customRef.current.words[tk].push(item); added++; if (!firstTopic) firstTopic = tk; }
    });
    saveCustom(); rebuildLabels(); mergeCustomIntoVocab();
    setImportOpen(false);
    if (added && firstTopic) { setTopic(firstTopic); setTab('card'); setFlipped(false); setTimeout(refreshCard, 0); }
    setSearchMsg(added ? '✓ Đã nhập <b>' + added + '</b> từ từ file vào kho từ vựng.' : 'Các từ đã có sẵn trong kho.');
  };

  // ─────────────── Điều hướng tab ───────────────
  const goTab = (t: Tab) => {
    setTab(t); setFlipped(false);
    if (t === 'card') { setReviewAhead(false); setTimeout(refreshCard, 0); }
    else if (t === 'quiz') startQuiz();
    else if (t === 'listen') startListen();
    else if (t === 'write') startWrite();
  };
  // Khi đổi topic/mode, refresh đúng tab (trừ card đã có effect riêng)
  useEffect(() => {
    if (!ready) return;
    if (tab === 'quiz') startQuiz();
    else if (tab === 'listen') startListen();
    else if (tab === 'write') startWrite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, mode]);

  // ─────────────── Confetti ───────────────
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const fireConfetti = useCallback((intensity = 1) => {
    const cv = confettiRef.current; if (!cv) return;
    const W = innerWidth || 360, H = innerHeight || 640;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cv.style.display = 'block';
    const colors = ['#22d3ee', '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#e879f9', '#fbbf24'];
    const N = Math.round(150 * intensity);
    const parts = Array.from({ length: N }, (_, i) => ({
      x: W / 2 + (Math.random() - 0.5) * 140, y: H / 3,
      vx: (Math.random() - 0.5) * 11, vy: Math.random() * -13 - 4, g: 0.28 + Math.random() * 0.14,
      w: 6 + Math.random() * 6, h: 4 + Math.random() * 5, rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.32, c: colors[i % colors.length], life: 0, max: 130 + Math.random() * 70,
    }));
    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of parts) {
        if (p.life > p.max) continue;
        alive++; p.life++; p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vx *= 0.99;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max); ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      }
      if (alive > 0) rafRef.current = requestAnimationFrame(tick);
      else { cv.style.display = 'none'; ctx.clearRect(0, 0, W, H); }
    };
    tick();
  }, []);
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ── options chủ đề: thứ tự DB trước, rồi custom; Object.keys(vocab) chốt hậu
  // để chủ đề mới thêm ở DB không bị rơi khỏi dropdown. ──
  const topicOrder = [
    ...dbOrderRef.current, ...TOPIC_ORDER,
    ...Object.keys(customRef.current.labels), ...Object.keys(vocab),
  ];
  const seen = new Set<string>();
  const topicKeys = topicOrder.filter((k) => { if (seen.has(k) || !vocab[k]) return false; seen.add(k); return true; });
  const addTopicKeys = topicKeys;

  const qCur = quiz ? quiz.items[quiz.idx] : null;

  return (
    <div className="tv-root">
      <style>{SCOPED_CSS}</style>

      <a className="tv-back" href={backHref.current}>← Khuôn viên trường</a>
      <h1 className="tv-h1">📚 Từ vựng Tiếng Anh chuyên ngành</h1>
      <div className="tv-sub">Flashcard có IPA · ôn theo Spaced Repetition · kiểm tra trắc nghiệm · giữ streak mỗi ngày</div>

      <div className="tabs">
        <button className={tab === 'card' ? 'active' : ''} onClick={() => goTab('card')}>🃏 Học thẻ</button>
        <button className={tab === 'quiz' || tab === 'review' ? 'active' : ''} onClick={() => goTab('quiz')}>📝 Kiểm tra</button>
        <button className={tab === 'listen' ? 'active' : ''} onClick={() => goTab('listen')}>🎧 Nghe</button>
        <button className={tab === 'write' ? 'active' : ''} onClick={() => goTab('write')}>✍️ Viết</button>
        <button className={tab === 'essay' ? 'active' : ''} onClick={() => { setTab('essay'); setEFeed(null); setEInput(''); }}>✒️ Viết bài</button>
      </div>

      <div className="toolbar">
        <select value={topic} onChange={(e) => { setTopic(e.target.value); setFlipped(false); setReviewAhead(false); }}>
          {topicKeys.map((k) => <option key={k} value={k}>{(labels[k] || k) + ' (' + (vocab[k]?.length || 0) + ')'}</option>)}
        </select>
        <select value={mode} onChange={(e) => { setMode(e.target.value as Mode); setFlipped(false); }}>
          <option value="en-vi">EN → VI (đoán nghĩa)</option>
          <option value="vi-en">VI → EN (đoán từ)</option>
        </select>
        <div className="streak" title="Số ngày học liên tiếp">🔥 <span>{streakDisp}</span> ngày</div>
      </div>
      <div className="toolbar">
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') doSearch(); }}
          placeholder="🔍 Tìm từ (Anh hoặc Việt)…" autoComplete="off" />
        <button onClick={doSearch}>Tìm</button>
        <button className="primary" onClick={() => openAdd(searchInput.trim())}>➕ Thêm từ mới</button>
        <button title="Tải file Word/.txt — AI tự lọc từ vựng chuyên ngành" onClick={() => fileRef.current?.click()}>📄 Nhập từ file</button>
        <input ref={fileRef} type="file" accept=".txt,.csv,.md,.docx" style={{ display: 'none' }} onChange={onImportFile} />
      </div>
      <div className="searchMsg" dangerouslySetInnerHTML={{ __html: searchMsg }} />

      {!ready && <div className="tv-loading">⏳ Đang tải bộ từ vựng…</div>}
      {loadErr && <div className="tv-loading">⚠️ {loadErr}</div>}

      {/* ───── Flashcard ───── */}
      {ready && !loadErr && tab === 'card' && (
        <div className="flash">
          <div className="progress"><div style={{ width: (total ? (mastered / total) * 100 : 0) + '%' }} /></div>
          <div className={'card' + (flipped ? ' flipped' : '')} onClick={() => setFlipped((f) => !f)}>
            <div className="inner">
              <div className="face">
                <span className="boxbadge">{cur ? (cardState(topic, cur.w).box === 0 ? 'Mới' : 'Cấp ' + cardState(topic, cur.w).box + '/5') : ''}</span>
                <button className="speak-btn" title="Phát âm" onClick={(e) => { e.stopPropagation(); if (cur) speak(cur.w); }}>🔊</button>
                <div className="pos">{cur ? (mode === 'en-vi' ? cur.pos : 'tiếng Việt') : ''}</div>
                <h2 className="word">{cur ? (mode === 'en-vi' ? cur.w : cur.v) : '🎉'}</h2>
                <div className="phonetic">{cur && mode === 'en-vi' ? cur.ph : ''}</div>
                <div className="hint">Bấm thẻ để xem nghĩa</div>
              </div>
              <div className="face back">
                <button className="speak-btn" title="Phát âm" onClick={(e) => { e.stopPropagation(); if (cur) speak(cur.w); }}>🔊</button>
                <div className="meaning">{cur ? (mode === 'en-vi' ? cur.v : cur.w + '  ' + cur.ph) : 'Hết từ cần ôn hôm nay!'}</div>
                <div className="example">{cur ? cur.ex : 'Quay lại sau hoặc bấm "ôn lại tất cả" để học thêm.'}</div>
              </div>
            </div>
          </div>
          <div className="actions">
            <button className="again" onClick={againCard} disabled={!cur}>😵 Chưa nhớ</button>
            <button className="know" onClick={knowCard} disabled={!cur}>✅ Thuộc rồi</button>
          </div>
          {cur && (
            <div className="fcPractice">
              <div className="fcBtns">
                <button className="opt" onClick={() => cur && speak(cur.w)}>🎧 Nghe từ</button>
                <button className="opt" onClick={() => cur && speak(cur.w, 0.5)}>🐢 Nghe chậm</button>
                <button className="opt" onClick={() => setFcWriteOpen((o) => !o)}>{fcWriteOpen ? '✖️ Đóng đặt câu' : '✍️ Đặt câu với từ này'}</button>
              </div>
              {fcWriteOpen && (
                <div className="fcWriteBox">
                  <textarea className="wta" value={fcInput} onChange={(e) => setFcInput(e.target.value)} placeholder="Đặt một câu tiếng Anh có dùng từ này…" />
                  <button className="opt primary" onClick={fcGrade} disabled={fcGrading}>{fcGrading ? '⏳ Đang chấm…' : (fcFeed ? 'Chấm câu lại' : 'Chấm câu')}</button>
                  {fcFeed && <div className={fcFeed.cls} dangerouslySetInnerHTML={{ __html: fcFeed.html }} />}
                </div>
              )}
            </div>
          )}
          <div className="stats">
            <span>Cần ôn hôm nay: <b>{dueCount}</b></span>
            <span>Đã thuộc: <b>{mastered}</b></span>
            <span>Tổng: <b>{total}</b></span>
          </div>
          {!cur && !reviewAhead && (
            <button className="opt reviewAll" onClick={() => { setReviewAhead(true); setFlipped(false); setTimeout(refreshCard, 0); }}>Hôm nay ôn xong — ôn lại tất cả ↻</button>
          )}
        </div>
      )}

      {/* ───── Quiz ───── */}
      {ready && tab === 'quiz' && quiz && qCur && (
        <div className="quiz">
          <div className="qbar"><span>Câu <b>{quiz.idx + 1}</b>/<b>{quiz.items.length}</b></span><span>Đúng: <b>{quiz.right}</b></span></div>
          <div className="qcard">
            <div className="qprompt">{mode === 'en-vi' ? 'Chọn NGHĨA đúng của từ:' : 'Chọn TỪ tiếng Anh đúng cho nghĩa:'}</div>
            <div className="qword">{mode === 'en-vi' ? qCur.it.w : qCur.it.v}</div>
            <div className="qphon">{mode === 'en-vi' ? qCur.it.ph : ''}</div>
            <div className="opts">
              {qCur.opts.map((opt, i) => {
                let cls = 'opt';
                if (qCur.picked !== null) {
                  if (i === qCur.answer) cls += ' correct';
                  else if (i === qCur.picked) cls += ' wrong';
                }
                return <button key={i} className={cls} disabled={qCur.picked !== null} onClick={() => answerQuiz(i)}>{opt}</button>;
              })}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            {qCur.picked !== null && (
              <button className="opt qNext" onClick={quizNext}>{quiz.idx < quiz.items.length - 1 ? 'Câu sau →' : '🏁 Xem kết quả'}</button>
            )}
          </div>
        </div>
      )}

      {/* ───── Review ───── */}
      {ready && tab === 'review' && quiz && (
        <div className="review">
          <h2 style={{ fontSize: 18, margin: '4px 0' }}>📋 Xem lại bài kiểm tra</h2>
          <div>
            {quiz.items.map((q, i) => {
              const ok = q.picked === q.answer;
              const yourAns = q.picked === null ? '(bỏ qua)' : q.opts[q.picked];
              return (
                <div key={i} className={'rrow ' + (ok ? 'ok' : 'no')}>
                  <div className="rw">{q.it.w} <span style={{ color: 'var(--tv-accent)', fontSize: 13 }}>{q.it.ph}</span>
                    <span className={'tag ' + (ok ? 'ok' : 'no')}>{ok ? 'Đúng' : 'Sai'}</span></div>
                  <div className="ra">Nghĩa: <b>{q.it.v}</b></div>
                  {!ok && <div className="ra">Bạn chọn: {yourAns}</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button className="opt" style={{ flex: 1 }} onClick={() => { startQuiz(); setTab('quiz'); }}>🔁 Làm lại</button>
            <button className="opt" style={{ flex: 1 }} onClick={() => goTab('card')}>🃏 Về học thẻ</button>
          </div>
        </div>
      )}

      {/* ───── Luyện Nghe ───── */}
      {ready && tab === 'listen' && listen && (
        <div className="listen">
          <div className="qbar"><span>Câu <b>{listen.idx + 1}</b>/<b>{listen.items.length}</b></span><span>Đúng: <b>{listen.right}</b></span></div>
          <div className="lbig">
            <div className="wprompt">🎧 Nghe và gõ lại từ tiếng Anh bạn nghe được:</div>
            <button className="lspeak" title="Nghe lại" onClick={() => speak(listen.items[listen.idx].w)}>🔊</button>
            <div className="lhint">Bấm loa để nghe lại · Enter để kiểm tra</div>
            <button className="lreplay" onClick={() => speak(listen.items[listen.idx].w, 0.5)}>🐢 Nghe chậm</button>
          </div>
          <input className="linput" value={lInput} onChange={(e) => setLInput(e.target.value)} disabled={!!lReveal}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); checkListen(); } }}
            placeholder="gõ từ ở đây…" autoComplete="off" autoCapitalize="off" spellCheck={false} />
          {lReveal && (
            <div className={'lreveal show ' + (lReveal.ok ? 'ok' : 'no')}>
              <div className="rword">{lReveal.it.w}</div>
              <div className="rmeta">{lReveal.it.ph + ' · ' + lReveal.it.pos}</div>
              <div className="rmean">{(lReveal.ok ? '✅ Chính xác! ' : '❌ Bạn gõ: “' + (lReveal.guess || '—') + '”. ') + lReveal.it.v}</div>
              <div className="rex">{lReveal.it.ex || ''}</div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            {!lReveal
              ? <button className="opt primary" style={{ flex: 1 }} onClick={checkListen}>Kiểm tra</button>
              : <button className="opt" style={{ flex: 1 }} onClick={listenNext}>{listen.idx < listen.items.length - 1 ? 'Câu sau →' : '🏁 Xem kết quả'}</button>}
          </div>
        </div>
      )}

      {/* ───── Luyện Viết ───── */}
      {ready && tab === 'write' && write && (
        <div className="write">
          <div className="qbar"><span>Từ <b>{write.idx + 1}</b>/<b>{write.items.length}</b></span><span>Đặt câu đúng: <b>{write.right}</b></span></div>
          <div className="wcard">
            <div className="wprompt">✍️ Đặt MỘT câu tiếng Anh có dùng từ chuyên ngành dưới đây:</div>
            <div className="wword">{write.items[write.idx].w}</div>
            <div className="wmeta">{write.items[write.idx].ph + ' · ' + write.items[write.idx].pos}</div>
            <div className="wmean">{'➡️ ' + write.items[write.idx].v}</div>
            <textarea className="wta" value={wInput} onChange={(e) => setWInput(e.target.value)} disabled={wDone}
              placeholder="Ví dụ: The new algorithm runs much faster than the old one." />
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {!wDone && <button className="opt primary" style={{ flex: 1 }} onClick={submitWrite} disabled={wGrading}>{wGrading ? '⏳ Đang chấm…' : 'Chấm câu'}</button>}
              <button className="opt" onClick={writeNext} style={{ flex: '0 0 auto' }}>{write.idx < write.items.length - 1 ? 'Từ sau →' : '🏁 Xong'}</button>
            </div>
          </div>
          {wFeed && <div className={wFeed.cls} dangerouslySetInnerHTML={{ __html: wFeed.html }} />}
        </div>
      )}

      {/* ───── Viết bài ───── */}
      {ready && tab === 'essay' && (
        <div className="essay">
          <div className="etypes">
            {Object.entries(WRITE_TYPES).map(([k, t]) => (
              <button key={k} className={'etype' + (k === eType ? ' sel' : '')} onClick={() => { setEType(k); setEAngle(0); setEFeed(null); setEInput(''); }}>{t.label}</button>
            ))}
          </div>
          <div className="wcard" style={{ maxWidth: 640, width: '100%' }}>
            <div className="eprompt-row">
              <div className="wprompt" style={{ margin: 0 }}>📝 Đề bài <span className="epill">{WRITE_TYPES[eType].words}</span></div>
              <button className="opt" style={{ flex: '0 0 auto', padding: '6px 12px', fontSize: 12.5 }} onClick={() => { setEAngle((a) => a + 1); setEFeed(null); }}>🔄 Đổi đề</button>
            </div>
            <div className="eprompt">{ePrompt}</div>
            <details className="eoutline" open>
              <summary>🧭 Dàn ý gợi ý</summary>
              <ul>{WRITE_TYPES[eType].outline.map((o, i) => <li key={i}>{o}</li>)}</ul>
              <div className="ehint" dangerouslySetInnerHTML={{ __html: eVocabHint }} />
            </details>
            <textarea className="wta" style={{ minHeight: 170 }} value={eInput} onChange={(e) => setEInput(e.target.value)} placeholder="Viết bài của bạn ở đây bằng tiếng Anh…" />
            <div className="erow">
              <span className="ecount">{eInput.trim().split(/\s+/).filter(Boolean).length} từ</span>
              <button className="opt primary" style={{ flex: '0 0 auto' }} onClick={submitEssay} disabled={eGrading}>{eGrading ? '⏳ Đang chấm…' : (eFeed ? 'Chấm lại' : 'Chấm bài')}</button>
            </div>
          </div>
          {eFeed && <div className={eFeed.cls} style={{ maxWidth: 640, width: '100%' }} dangerouslySetInnerHTML={{ __html: eFeed.html }} />}
        </div>
      )}

      {/* ───── Modal thêm từ ───── */}
      {addOpen && (
        <div className="overlay show" onClick={(e) => { if (e.target === e.currentTarget) setAddOpen(false); }}>
          <div className="modal" style={{ maxWidth: 430 }}>
            <h2 style={{ margin: '0 0 2px' }}>➕ Thêm từ mới</h2>
            <p style={{ margin: '2px 0 6px' }}>Hệ thống tự gợi ý chủ đề phù hợp với từ bạn nhập.</p>
            <div className="modal-form">
              <label>Từ tiếng Anh *</label><input value={aw.en} onChange={(e) => setAw((s) => ({ ...s, en: e.target.value }))} placeholder="vd: compiler" autoComplete="off" />
              <label>Nghĩa tiếng Việt *</label><input value={aw.vi} onChange={(e) => setAw((s) => ({ ...s, vi: e.target.value }))} placeholder="vd: trình biên dịch" autoComplete="off" />
              <label>Phiên âm IPA (tuỳ chọn)</label><input value={aw.ipa} onChange={(e) => setAw((s) => ({ ...s, ipa: e.target.value }))} placeholder="/kəmˈpaɪ.lər/" autoComplete="off" />
              <label>Loại từ</label>
              <select value={aw.pos} onChange={(e) => setAw((s) => ({ ...s, pos: e.target.value }))}>
                <option>noun</option><option>verb</option><option>adj</option><option>adv</option>
              </select>
              <label>Ví dụ (tuỳ chọn)</label><input value={aw.ex} onChange={(e) => setAw((s) => ({ ...s, ex: e.target.value }))} placeholder="A compiler turns code into machine code." autoComplete="off" />
              <label>Chủ đề (tự gợi ý)</label>
              <select value={aw.topic} onChange={(e) => setAw((s) => ({ ...s, topic: e.target.value }))}>
                {addTopicKeys.map((k) => <option key={k} value={k}>{labels[k] || k}</option>)}
                <option value="__new__">➕ Chủ đề mới…</option>
              </select>
              {aw.topic === '__new__' && <input value={aw.newTopic} onChange={(e) => setAw((s) => ({ ...s, newTopic: e.target.value }))} placeholder="Tên chủ đề mới…" style={{ marginTop: 6 }} autoComplete="off" />}
            </div>
            <div className="mbtns" style={{ marginTop: 16 }}>
              <button onClick={() => setAddOpen(false)}>Huỷ</button>
              <button className="primary" onClick={saveWord}>Lưu từ</button>
            </div>
          </div>
        </div>
      )}

      {/* ───── Modal nhập file ───── */}
      {importOpen && (
        <div className="overlay show" onClick={(e) => { if (e.target === e.currentTarget) setImportOpen(false); }}>
          <div className="modal" style={{ maxWidth: 560, textAlign: 'left' }}>
            <h2 style={{ margin: '0 0 2px' }}>📄 Nhập từ vựng từ file</h2>
            <p style={{ margin: '2px 0 10px', color: 'var(--tv-muted)', fontSize: 13.5 }} dangerouslySetInnerHTML={{ __html: impStatus || 'Chọn file Word (.docx) hoặc .txt — hệ thống tự lọc từ vựng chuyên ngành và xếp vào chủ đề phù hợp.' }} />
            <div style={{ maxHeight: '46vh', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {impWords.map((w, i) => (
                <label key={i} className="rrow ok" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!impChecked[i]} onChange={(e) => setImpChecked((s) => ({ ...s, [i]: e.target.checked }))} style={{ marginTop: 4 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="rw">{w.en} <span style={{ color: 'var(--tv-accent)', fontSize: 12 }}>{w.ipa || ''}</span> <span style={{ color: 'var(--tv-muted)', fontSize: 12 }}>{w.pos}</span></div>
                    <div className="ra">{w.vi}</div>
                  </div>
                  <select value={impTopics[i] || 'khac'} onChange={(e) => setImpTopics((s) => ({ ...s, [i]: e.target.value }))}
                    style={{ fontFamily: 'inherit', background: 'rgba(0,0,0,.25)', color: 'var(--tv-text)', border: '1px solid var(--tv-border)', borderRadius: 8, padding: 5, fontSize: 12, maxWidth: 150 }}>
                    {topicKeys.map((k) => <option key={k} value={k}>{labels[k] || k}</option>)}
                    <option value="khac">📄 Khác (từ file)</option>
                  </select>
                </label>
              ))}
            </div>
            <div className="mbtns" style={{ marginTop: 14 }}>
              <button onClick={() => setImportOpen(false)}>Đóng</button>
              {impWords.length > 0 && <button className="primary" onClick={doImportAdd}>Thêm {Object.values(impChecked).filter(Boolean).length} từ</button>}
            </div>
          </div>
        </div>
      )}

      {/* Confetti */}
      <canvas ref={confettiRef} className="confetti" />

      {/* ───── Overlay chúc mừng ───── */}
      {overlay && (
        <div className="overlay show">
          <div className="modal pop">
            <div className="emoji">{overlay.emoji}</div>
            <h2>{overlay.title}</h2>
            <div className="score">{overlay.score}</div>
            <p dangerouslySetInnerHTML={{ __html: overlay.msg }} />
            <div className="mbtns">
              {overlay.showReview && <button onClick={() => { setOverlay(null); setTab('review'); }}>📋 Xem lại</button>}
              <button className="primary" onClick={overlay.onAgain}>🔁 Làm lại</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── suggestTopic (dùng ngoài component để tránh re-create) ──
function suggestTopic(en: string, vi: string): string | null {
  const t = (en + ' ' + vi).toLowerCase();
  for (const [k, kws] of Object.entries(TOPIC_KW)) if (kws.some((w) => t.includes(w))) return k;
  return null;
}

function esc(s: string): string {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

// ── Trích text từ .docx (ZIP) ngay trên trình duyệt (giữ nguyên từ trang gốc) ──
async function readDocx(file: File): Promise<string> {
  const buf = new Uint8Array(await file.arrayBuffer());
  const dv = new DataView(buf.buffer);
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i >= buf.length - 22 - 65536; i--) {
    if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('File .docx không hợp lệ.');
  const cdOffset = dv.getUint32(eocd + 16, true), cdCount = dv.getUint16(eocd + 10, true);
  let p = cdOffset; let target: { comp: number; compSize: number; lho: number } | null = null;
  for (let i = 0; i < cdCount; i++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const comp = dv.getUint16(p + 10, true), compSize = dv.getUint32(p + 20, true);
    const nameLen = dv.getUint16(p + 28, true), extraLen = dv.getUint16(p + 30, true), commentLen = dv.getUint16(p + 32, true);
    const lho = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(buf.subarray(p + 46, p + 46 + nameLen));
    if (name === 'word/document.xml') { target = { comp, compSize, lho }; break; }
    p += 46 + nameLen + extraLen + commentLen;
  }
  if (!target) throw new Error('Không tìm thấy nội dung trong file Word.');
  const lh = target.lho;
  if (dv.getUint32(lh, true) !== 0x04034b50) throw new Error('Cấu trúc .docx lỗi.');
  const dataStart = lh + 30 + dv.getUint16(lh + 26, true) + dv.getUint16(lh + 28, true);
  const raw = buf.subarray(dataStart, dataStart + target.compSize);
  let xmlBytes: Uint8Array;
  if (target.comp === 0) xmlBytes = raw;
  else {
    if (typeof DecompressionStream === 'undefined') throw new Error('Trình duyệt không hỗ trợ đọc .docx — hãy lưu file thành .txt rồi tải lên.');
    const stream = new Response(raw).body!.pipeThrough(new DecompressionStream('deflate-raw'));
    xmlBytes = new Uint8Array(await new Response(stream).arrayBuffer());
  }
  return new TextDecoder('utf-8').decode(xmlBytes)
    .replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/[ \t]+/g, ' ');
}
async function extractText(file: File): Promise<string> {
  return (file.name || '').toLowerCase().endsWith('.docx') ? readDocx(file) : file.text();
}

// ─────────────────────────────────────────────────────────────────────────────
//  CSS scoped: giữ nguyên nhận diện thương hiệu (nền gradient tối + màu accent)
//  của trang gốc. Tất cả biến đổi tên thành --tv-* để không đụng token toàn cục.
// ─────────────────────────────────────────────────────────────────────────────
const SCOPED_CSS = `
.tv-root { --tv-bg:#0f172a; --tv-card:rgba(255,255,255,.06); --tv-accent:#0ea5e9; --tv-green:#10b981;
  --tv-red:#ef4444; --tv-amber:#fbbf24; --tv-text:#e5edf7; --tv-muted:#94a3b8; --tv-border:rgba(255,255,255,.12);
  position:relative; display:flex; flex-direction:column; align-items:center; gap:16px;
  color:var(--tv-text); padding:8px 0 40px; }
.tv-root * { box-sizing:border-box; }
.tv-back { align-self:flex-start; background:rgba(15,23,42,.7); color:#cfe9ff; text-decoration:none;
  padding:6px 12px; border-radius:20px; font-size:12.5px; }
.tv-h1 { margin:0; font-size:21px; text-align:center; }
.tv-sub { color:var(--tv-muted); font-size:12.5px; margin:-8px 0 2px; text-align:center; }
.tv-loading { color:var(--tv-muted); font-size:14px; padding:24px; }

.tabs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
.tabs button { font-family:inherit; background:var(--tv-card); color:var(--tv-text);
  border:1px solid var(--tv-border); padding:9px 20px; border-radius:11px; font-size:14px; cursor:pointer; font-weight:600; }
.tabs button.active { background:linear-gradient(135deg, var(--tv-accent), #6366f1); color:#fff; border-color:transparent; }

.toolbar { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
.toolbar select, .toolbar button { font-family:inherit; background:var(--tv-card);
  color:var(--tv-text); border:1px solid var(--tv-border); padding:8px 14px; border-radius:9px; font-size:13px; cursor:pointer; }
.toolbar select option { background:#0f172a; }
.toolbar button.primary { background:linear-gradient(135deg, var(--tv-accent), #6366f1); color:white; border:0; font-weight:700; }
.toolbar input { font-family:inherit; background:var(--tv-card); color:var(--tv-text); border:1px solid var(--tv-border); padding:8px 12px; border-radius:9px; font-size:13px; min-width:170px; }
.streak { display:flex; align-items:center; gap:6px; background:rgba(251,191,36,.12);
  border:1px solid rgba(251,191,36,.35); color:var(--tv-amber); padding:7px 13px; border-radius:20px; font-size:13px; font-weight:700; }
.searchMsg { font-size:13px; color:var(--tv-muted); min-height:18px; }
.searchMsg a { color:var(--tv-accent); }

.flash { display:flex; flex-direction:column; align-items:center; gap:14px; width:100%; }
.card { perspective:1200px; width:100%; max-width:520px; height:318px; }
.card .inner { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .6s; cursor:pointer; border-radius:18px; }
.card.flipped .inner { transform:rotateY(180deg); }
.face { position:absolute; inset:0; backface-visibility:hidden; border-radius:18px;
  background:var(--tv-card); border:1px solid var(--tv-border); padding:30px;
  display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
.face.back { transform:rotateY(180deg); background:linear-gradient(135deg, rgba(14,165,233,.15), rgba(99,102,241,.1)); }
.word { font-size:36px; font-weight:800; margin:0 0 6px; }
.pos { color:var(--tv-muted); font-size:13px; letter-spacing:.5px; text-transform:uppercase; }
.phonetic { color:var(--tv-accent); font-size:17px; margin:8px 0; font-family:'Times New Roman',serif; min-height:22px; }
.meaning { font-size:22px; line-height:1.4; }
.example { font-size:14px; color:var(--tv-muted); margin-top:14px; font-style:italic; padding:0 12px; line-height:1.5; }
.boxbadge { position:absolute; top:14px; left:14px; font-size:11px; color:var(--tv-muted);
  background:rgba(255,255,255,.06); border:1px solid var(--tv-border); padding:3px 8px; border-radius:10px; }
.speak-btn { position:absolute; top:12px; right:12px; background:rgba(14,165,233,.2);
  border:1px solid var(--tv-accent); color:var(--tv-accent); width:38px; height:38px; border-radius:50%; cursor:pointer; font-size:15px; }
.speak-btn:hover { background:var(--tv-accent); color:white; }
.progress { width:100%; max-width:520px; height:6px; background:rgba(255,255,255,.08); border-radius:3px; overflow:hidden; }
.progress > div { height:100%; background:linear-gradient(90deg, var(--tv-accent), var(--tv-green)); transition:width .3s; }
.actions { display:flex; gap:12px; }
.actions button { padding:12px 24px; border-radius:11px; font-weight:700; font-size:15px; border:0; cursor:pointer; font-family:inherit; }
.actions button:disabled { opacity:.4; cursor:default; }
.actions .again { background:rgba(239,68,68,.15); color:#fca5a5; border:1px solid rgba(239,68,68,.3); }
.actions .know { background:rgba(16,185,129,.15); color:#6ee7b7; border:1px solid rgba(16,185,129,.3); }
.stats { display:flex; gap:20px; font-size:13px; color:var(--tv-muted); flex-wrap:wrap; justify-content:center; }
.stats b { color:var(--tv-text); font-size:16px; }
.hint { color:var(--tv-muted); font-size:12.5px; margin-top:4px; }
.reviewAll { max-width:300px; }

.fcPractice { width:100%; max-width:520px; display:flex; flex-direction:column; gap:10px; }
.fcBtns { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; }
.fcBtns .opt { flex:0 0 auto; }
.fcWriteBox { display:flex; flex-direction:column; gap:8px; }

.quiz, .listen, .write { width:100%; max-width:560px; display:flex; flex-direction:column; gap:14px; align-items:stretch; }
.review { width:100%; max-width:560px; display:flex; flex-direction:column; gap:10px; }
.qbar { display:flex; justify-content:space-between; font-size:13px; color:var(--tv-muted); }
.qcard, .wcard { background:var(--tv-card); border:1px solid var(--tv-border); border-radius:16px; padding:24px; }
.qprompt { font-size:13px; color:var(--tv-muted); margin-bottom:6px; }
.qword { font-size:28px; font-weight:800; margin-bottom:4px; }
.qphon { color:var(--tv-accent); font-size:15px; font-family:'Times New Roman',serif; margin-bottom:18px; min-height:18px; }
.opts { display:grid; gap:10px; }
.opt { text-align:left; font-family:inherit; font-size:15px; padding:14px 16px; border-radius:11px;
  background:rgba(0,0,0,.2); border:1px solid var(--tv-border); color:var(--tv-text); cursor:pointer; transition:.15s; }
.opt:hover:not(:disabled) { border-color:rgba(255,255,255,.3); background:rgba(255,255,255,.04); }
.opt.primary { background:linear-gradient(135deg,var(--tv-accent),#6366f1); color:#fff; border:0; font-weight:700; }
.opt.correct { background:rgba(16,185,129,.16); border-color:rgba(16,185,129,.6); color:#a7f3d0; }
.opt.wrong { background:rgba(239,68,68,.16); border-color:rgba(239,68,68,.6); color:#fca5a5; }
.opt:disabled { cursor:default; }
.opt.qNext { max-width:200px; margin:0 auto; }

.rrow { background:var(--tv-card); border:1px solid var(--tv-border); border-radius:12px; padding:12px 14px; font-size:14px; }
.rrow .rw { font-weight:700; }
.rrow .ra { font-size:13px; color:var(--tv-muted); margin-top:3px; }
.rrow.ok { border-left:3px solid var(--tv-green); }
.rrow.no { border-left:3px solid var(--tv-red); }
.tag { font-size:11px; padding:2px 7px; border-radius:8px; margin-left:6px; }
.tag.ok { background:rgba(16,185,129,.16); color:#6ee7b7; }
.tag.no { background:rgba(239,68,68,.16); color:#fca5a5; }

.overlay { position:fixed; inset:0; background:rgba(8,12,24,.72); backdrop-filter:blur(4px);
  display:none; align-items:center; justify-content:center; z-index:30; padding:20px; }
.overlay.show { display:flex; }
.modal { background:linear-gradient(180deg,#15233f,#0f1b30); border:1px solid var(--tv-border);
  border-radius:20px; padding:30px 26px; max-width:380px; width:100%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,.5); }
.modal .emoji { font-size:54px; }
.modal h2 { margin:6px 0 2px; font-size:24px; }
.modal .score { font-size:46px; font-weight:800; margin:10px 0;
  background:linear-gradient(135deg,var(--tv-accent),var(--tv-green)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.modal p { color:var(--tv-muted); font-size:14px; line-height:1.55; margin:6px 0 18px; }
.modal .mbtns { display:flex; gap:10px; }
.modal .mbtns button { flex:1; padding:11px; border-radius:11px; font-family:inherit; font-weight:700;
  font-size:14px; cursor:pointer; border:1px solid var(--tv-border); background:var(--tv-card); color:var(--tv-text); }
.modal .mbtns button.primary { background:linear-gradient(135deg,var(--tv-accent),#6366f1); border:0; color:#fff; }
.modal-form { text-align:left; }
.modal-form label { display:block; font-size:12px; color:var(--tv-muted); margin:9px 0 3px; }
.modal-form input, .modal-form select { width:100%; font-family:inherit; background:rgba(0,0,0,.25); color:var(--tv-text);
  border:1px solid var(--tv-border); padding:9px 11px; border-radius:9px; font-size:14px; }
.pop { animation:tvpop .4s cubic-bezier(.2,1.3,.4,1); }
@keyframes tvpop { from { transform:scale(.7); opacity:0 } to { transform:scale(1); opacity:1 } }

.lbig { background:var(--tv-card); border:1px solid var(--tv-border); border-radius:16px; padding:30px 24px; text-align:center; }
.lspeak { width:96px; height:96px; border-radius:50%; border:0; cursor:pointer; font-size:40px; margin:0 auto 8px;
  background:linear-gradient(135deg,var(--tv-accent),#6366f1); color:#fff; display:flex; align-items:center; justify-content:center;
  box-shadow:0 10px 30px rgba(14,165,233,.35); transition:transform .12s; }
.lspeak:hover { transform:scale(1.05); } .lspeak:active { transform:scale(.95); }
.lhint { color:var(--tv-muted); font-size:13px; margin-top:6px; }
.lreplay { background:none; border:0; color:var(--tv-accent); cursor:pointer; font-size:13px; font-family:inherit; margin-top:4px; }
.linput { width:100%; font-family:inherit; font-size:19px; text-align:center; letter-spacing:1px;
  background:rgba(0,0,0,.25); color:var(--tv-text); border:2px solid var(--tv-border); padding:14px; border-radius:12px; }
.linput:focus { outline:0; border-color:var(--tv-accent); }
.lreveal { background:var(--tv-card); border:1px solid var(--tv-border); border-radius:14px; padding:18px 20px; }
.lreveal.ok { border-left:4px solid var(--tv-green); } .lreveal.no { border-left:4px solid var(--tv-red); }
.lreveal .rword { font-size:26px; font-weight:800; }
.lreveal .rmeta { color:var(--tv-accent); font-size:14px; margin:4px 0; font-family:'Times New Roman',serif; }
.lreveal .rmean { font-size:17px; margin:6px 0 2px; }
.lreveal .rex { color:var(--tv-muted); font-size:13.5px; font-style:italic; }

.wprompt { font-size:13px; color:var(--tv-muted); margin-bottom:6px; }
.wword { font-size:30px; font-weight:800; }
.wmeta { color:var(--tv-accent); font-size:14px; font-family:'Times New Roman',serif; margin:3px 0; }
.wmean { font-size:16px; color:var(--tv-text); margin-top:4px; }
.wta { width:100%; min-height:84px; font-family:inherit; font-size:15px; resize:vertical;
  background:rgba(0,0,0,.25); color:var(--tv-text); border:1px solid var(--tv-border); padding:13px; border-radius:12px; margin-top:14px; }
.wta:focus { outline:0; border-color:var(--tv-accent); }
.wfeed { display:none; border-radius:14px; padding:16px 18px; font-size:14.5px; line-height:1.55; margin-top:2px; }
.wfeed.show { display:block; }
.wfeed.ok { background:rgba(16,185,129,.1); border:1px solid rgba(16,185,129,.35); }
.wfeed.no { background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.35); }
.wfeed .wscore { font-size:18px; font-weight:800; }
.wfeed .wline { margin-top:8px; }
.wfeed .wlabel { color:var(--tv-muted); font-size:12px; text-transform:uppercase; letter-spacing:.4px; }
.wfeed a { color:var(--tv-accent); }

.essay { display:flex; flex-direction:column; align-items:center; gap:14px; width:100%; }
.etypes { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
.etype { font-family:inherit; font-size:13.5px; padding:8px 15px; border-radius:20px; cursor:pointer;
  background:rgba(0,0,0,.22); color:var(--tv-text); border:1px solid var(--tv-border); transition:.15s; }
.etype:hover { border-color:rgba(99,102,241,.5); }
.etype.sel { background:linear-gradient(135deg,var(--tv-accent),#6366f1); color:#fff; border-color:transparent; font-weight:700; }
.eprompt-row { display:flex; align-items:center; justify-content:space-between; gap:10px; }
.epill { font-size:11px; color:var(--tv-muted); background:rgba(255,255,255,.06); border:1px solid var(--tv-border); border-radius:20px; padding:2px 9px; margin-left:6px; }
.eprompt { font-size:15.5px; font-weight:600; line-height:1.5; margin:10px 0 4px; }
.eoutline { background:rgba(0,0,0,.18); border:1px solid var(--tv-border); border-radius:12px; padding:10px 14px; margin-top:8px; }
.eoutline summary { cursor:pointer; font-size:13.5px; color:var(--tv-accent); font-weight:700; }
.eoutline ul { margin:8px 0 4px; padding-left:20px; }
.eoutline li { font-size:13.5px; color:var(--tv-muted); line-height:1.7; }
.ehint { font-size:12.5px; color:var(--tv-muted); margin-top:6px; }
.ehint b { color:var(--tv-accent); }
.erow { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:12px; }
.ecount { font-size:12.5px; color:var(--tv-muted); }
.wfeed .ecorr { background:rgba(0,0,0,.22); border:1px solid var(--tv-border); border-radius:10px; padding:9px 11px; margin-top:8px; font-size:13.5px; }
.wfeed .ecorr .o { color:#fca5a5; text-decoration:line-through; }
.wfeed .ecorr .f { color:#6ee7b7; font-weight:600; }
.wfeed .ecorr .wy { color:var(--tv-muted); font-size:12.5px; display:block; margin-top:3px; }
.wfeed .elevel { display:inline-block; font-size:12px; font-weight:700; color:var(--tv-accent); background:rgba(34,211,238,.12);
  border:1px solid rgba(34,211,238,.3); border-radius:20px; padding:2px 10px; margin-left:8px; vertical-align:2px; }

.confetti { position:fixed; inset:0; width:100%; height:100%; pointer-events:none; z-index:60; display:none; }
`;
