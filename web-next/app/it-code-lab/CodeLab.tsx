'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ====== Code Lab — UI gọi Codelab API thật ======
// Mọi bài + chạy code + chấm điểm đều đi qua /api/codelab/* (server proxy
// giấu X-API-Key + gắn externalUserRef = "tizia:user:<id>" từ session).
// Spec: https://fit.neu.edu.vn/codelab/api-backend/docs
//
// Cổng này giữ NGUYÊN hành vi trang vanilla public/it-code-lab.html: probe
// languages → nếu 503/lỗi thì fallback bộ thử thách OFFLINE chạy trong Web
// Worker; còn không thì load contest Tizia, chạy/nộp thật.

const CONTEST_SLUG_DEFAULT = 'tizia-it-i11'; // convention
const PREFERRED_LANGS = ['python', 'cpp', 'c++', 'java', 'javascript']; // ưu tiên hiển thị

// ====== Types ======
type Lang = { id: number; name: string; label: string };

type CodelabLanguageRaw = { id: number | string; name?: string };

type Sample = {
  input?: string;
  output?: string;
  sampleInput?: string;
  sampleOutput?: string;
  explanation?: string;
};

type ProblemLanguage = {
  id: number | string;
  template?: { files?: { solution?: string }; solution?: string };
  starterCode?: string;
  starter?: string;
};

type ProblemDetail = {
  slug?: string;
  name?: string;
  difficulty?: string;
  languages?: ProblemLanguage[];
  problemStatement?: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  note?: string;
  samples?: Sample[];
};

type ProblemListItem = {
  slug: string;
  name?: string;
  difficulty?: string;
  tags?: { name?: string }[];
  languages?: ProblemLanguage[];
};

type Test = { args: unknown[]; expected: unknown };

type Challenge = {
  id: string;
  slug?: string;
  cat: string;
  title: string;
  desc: string;
  difficulty?: string;
  langIds?: number[];
  rawLanguages?: ProblemLanguage[];
  starter?: string;
  samples?: Sample[];
  _loaded?: boolean;
  // offline-only
  fnName?: string;
  tests?: Test[];
  sol?: string;
};

type Mode = 'codelab' | 'offline';

// ====== Fallback bộ thử thách OFFLINE ======
// Chỉ hiển thị khi server Codelab chưa cấu hình (CODELAB_API_KEY rỗng →
// /api/codelab/problems trả 503). Bộ này chạy local trong Web Worker để demo UI
// vẫn dùng được khi dev offline.
const FALLBACK_CHALLENGES: Challenge[] = [
  {
    id: 'sumTwo', cat: 'Cơ bản', title: 'Tổng hai số', fnName: 'sumTwo',
    desc: 'Viết hàm <code>sumTwo(a, b)</code> trả về tổng của hai số.',
    starter: 'function sumTwo(a, b) {\n  // viết code ở đây\n  \n}',
    tests: [{ args: [2, 3], expected: 5 }, { args: [-4, 10], expected: 6 }, { args: [0, 0], expected: 0 }, { args: [100, 250], expected: 350 }],
    sol: 'function sumTwo(a, b) {\n  return a + b;\n}',
  },
  {
    id: 'reverseString', cat: 'Cơ bản', title: 'Đảo ngược chuỗi', fnName: 'reverseString',
    desc: 'Viết hàm <code>reverseString(s)</code> trả về chuỗi đảo ngược.',
    starter: 'function reverseString(s) {\n  \n}',
    tests: [{ args: ['abc'], expected: 'cba' }, { args: ['Tizia'], expected: 'esreVudE' }, { args: [''], expected: '' }, { args: ['a'], expected: 'a' }],
    sol: 'function reverseString(s) {\n  return s.split("").reverse().join("");\n}',
  },
  {
    id: 'isEven', cat: 'Cơ bản', title: 'Kiểm tra số chẵn', fnName: 'isEven',
    desc: 'Viết hàm <code>isEven(n)</code> trả về <code>true</code> nếu n chẵn, ngược lại <code>false</code>.',
    starter: 'function isEven(n) {\n  \n}',
    tests: [{ args: [4], expected: true }, { args: [7], expected: false }, { args: [0], expected: true }, { args: [-2], expected: true }, { args: [-3], expected: false }],
    sol: 'function isEven(n) {\n  return n % 2 === 0;\n}',
  },
  {
    id: 'countVowels', cat: 'Cơ bản', title: 'Đếm nguyên âm', fnName: 'countVowels',
    desc: 'Viết hàm <code>countVowels(s)</code> đếm số nguyên âm (a, e, i, o, u — không phân biệt hoa thường) trong chuỗi.',
    starter: 'function countVowels(s) {\n  \n}',
    tests: [{ args: ['hello'], expected: 2 }, { args: ['Tizia'], expected: 4 }, { args: ['xyz'], expected: 0 }, { args: ['AEIOU'], expected: 5 }],
    sol: 'function countVowels(s) {\n  return (s.match(/[aeiou]/gi) || []).length;\n}',
  },
  {
    id: 'fizzbuzz', cat: 'Giải thuật', title: 'FizzBuzz', fnName: 'fizzbuzz',
    desc: 'Viết hàm <code>fizzbuzz(n)</code> trả về MẢNG từ 1..n: bội 3 → <code>"Fizz"</code>, bội 5 → <code>"Buzz"</code>, bội cả 3 và 5 → <code>"FizzBuzz"</code>, còn lại là chính số đó.',
    starter: 'function fizzbuzz(n) {\n  // trả về một mảng\n  \n}',
    tests: [{ args: [5], expected: [1, 2, 'Fizz', 4, 'Buzz'] }, { args: [3], expected: [1, 2, 'Fizz'] }, { args: [15], expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'] }],
    sol: 'function fizzbuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push("FizzBuzz");\n    else if (i % 3 === 0) out.push("Fizz");\n    else if (i % 5 === 0) out.push("Buzz");\n    else out.push(i);\n  }\n  return out;\n}',
  },
  {
    id: 'findMax', cat: 'Giải thuật', title: 'Tìm phần tử lớn nhất', fnName: 'findMax',
    desc: 'Viết hàm <code>findMax(arr)</code> trả về phần tử lớn nhất trong mảng số (không dùng <code>Math.max</code> cũng được).',
    starter: 'function findMax(arr) {\n  \n}',
    tests: [{ args: [[3, 7, 2, 9, 4]], expected: 9 }, { args: [[-5, -1, -9]], expected: -1 }, { args: [[42]], expected: 42 }],
    sol: 'function findMax(arr) {\n  let m = arr[0];\n  for (const x of arr) if (x > m) m = x;\n  return m;\n}',
  },
  {
    id: 'isPrime', cat: 'Giải thuật', title: 'Số nguyên tố', fnName: 'isPrime',
    desc: 'Viết hàm <code>isPrime(n)</code> trả về <code>true</code> nếu n là số nguyên tố. Lưu ý: số &lt; 2 không phải nguyên tố.',
    starter: 'function isPrime(n) {\n  \n}',
    tests: [{ args: [2], expected: true }, { args: [7], expected: true }, { args: [1], expected: false }, { args: [9], expected: false }, { args: [97], expected: true }, { args: [100], expected: false }],
    sol: 'function isPrime(n) {\n  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++)\n    if (n % i === 0) return false;\n  return true;\n}',
  },
  {
    id: 'fibonacci', cat: 'Giải thuật', title: 'Fibonacci thứ n', fnName: 'fibonacci',
    desc: 'Viết hàm <code>fibonacci(n)</code> trả về số Fibonacci thứ n (bắt đầu <code>fibonacci(0)=0</code>, <code>fibonacci(1)=1</code>).',
    starter: 'function fibonacci(n) {\n  \n}',
    tests: [{ args: [0], expected: 0 }, { args: [1], expected: 1 }, { args: [7], expected: 13 }, { args: [10], expected: 55 }],
    sol: 'function fibonacci(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) { [a, b] = [b, a + b]; }\n  return a;\n}',
  },
  {
    id: 'bubbleSort', cat: 'Giải thuật', title: 'Sắp xếp mảng tăng dần', fnName: 'sortAsc',
    desc: 'Viết hàm <code>sortAsc(arr)</code> trả về MẢNG MỚI đã sắp xếp tăng dần.',
    starter: 'function sortAsc(arr) {\n  \n}',
    tests: [{ args: [[3, 1, 2]], expected: [1, 2, 3] }, { args: [[9, 9, 1, 0]], expected: [0, 1, 9, 9] }, { args: [[]], expected: [] }, { args: [[5]], expected: [5] }],
    sol: 'function sortAsc(arr) {\n  return [...arr].sort((a, b) => a - b);\n}',
  },
];

// ====== Helpers ======
const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string));
const fmt = (v: unknown) => {
  try { return JSON.stringify(v); } catch { return String(v); }
};

const LOCAL_SOLVED_KEY = 'tizia:it:codelab:solved';

function loadLocalSolved(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(LOCAL_SOLVED_KEY) || '[]')); }
  catch { return new Set(); }
}
function saveLocalSolved(set: Set<string>) {
  try { localStorage.setItem(LOCAL_SOLVED_KEY, JSON.stringify([...set])); } catch {}
}

type FetchError = Error & { status?: number; body?: { message?: string; error?: string; code?: string } };

async function fetchJson<T = unknown>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: 'same-origin', ...opts });
  let body: { message?: string; error?: string; code?: string } | null = null;
  try { body = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error(body?.message || body?.error || res.statusText) as FetchError;
    err.status = res.status;
    err.body = body || undefined;
    throw err;
  }
  return body as T;
}

/**
 * Lấy starter code đúng ngôn ngữ. Schema thật Codelab:
 *   problem.languages[i] = { id, template: { files: { solution: "code…" } } }
 * Fallback các tên field cũ để an toàn.
 */
function pickStarter(problem: { languages?: ProblemLanguage[] } | null, lang: Lang | null): string {
  if (!problem || !lang) return '';
  const langs = problem.languages || [];
  const hit = langs.find((l) => Number(l.id) === Number(lang.id));
  if (!hit) return '';
  return hit.template?.files?.solution
    ?? hit.template?.solution
    ?? hit.starterCode
    ?? hit.starter
    ?? '';
}

// Cho phép desc có HTML từ Codelab (đã sanitize phía Codelab — tin tưởng).
// Nếu là plain text → bọc <p>.
function escDesc(s?: string): string {
  if (!s) return '';
  if (/<\w+/.test(s)) return s; // có tag → giữ nguyên
  return `<p>${esc(s).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
}

/**
 * Compose mô tả bài từ các field markdown của Codelab:
 * problemStatement (chính) + inputFormat + outputFormat + constraints + note.
 */
function formatProblemDesc(p: ProblemDetail | null): string {
  if (!p) return '';
  const blocks: string[] = [];
  if (p.problemStatement) blocks.push(escDesc(p.problemStatement));
  if (p.inputFormat) blocks.push(`<h4 style="margin:12px 0 4px;font-size:13px;color:#7dd3fc">📥 Input</h4>${escDesc(p.inputFormat)}`);
  if (p.outputFormat) blocks.push(`<h4 style="margin:12px 0 4px;font-size:13px;color:#7dd3fc">📤 Output</h4>${escDesc(p.outputFormat)}`);
  if (p.constraints) blocks.push(`<h4 style="margin:12px 0 4px;font-size:13px;color:#fbbf24">⚖️ Ràng buộc</h4>${escDesc(p.constraints)}`);
  if (p.note) blocks.push(`<h4 style="margin:12px 0 4px;font-size:13px;color:#a78bfa">💡 Lưu ý</h4>${escDesc(p.note)}`);
  return blocks.join('\n');
}

// ====== Offline mode (fallback engine cũ) ======
const WORKER_SRC = `self.onmessage = function(e){
  var d = e.data, logs = [];
  var cap = function(){ logs.push([].slice.call(arguments).map(function(x){ try { return typeof x==='object'? JSON.stringify(x): String(x); } catch(_){ return String(x);} }).join(' ')); };
  try {
    var factory = new Function('console', d.code + '\\n; return typeof ' + d.fnName + ' === "function" ? ' + d.fnName + ' : undefined;');
    var fn = factory({ log:cap, info:cap, warn:cap, error:cap });
    if (typeof fn !== 'function'){ self.postMessage({ ok:false, error:'Chưa định nghĩa hàm ' + d.fnName + '(...)', logs:logs }); return; }
    var results = d.tests.map(function(t){
      try {
        var args = JSON.parse(JSON.stringify(t.args));
        var got = fn.apply(null, args);
        return { args:t.args, expected:t.expected, got:got, pass: JSON.stringify(got) === JSON.stringify(t.expected) };
      } catch(err){ return { args:t.args, expected:t.expected, got:String(err), pass:false, err:true }; }
    });
    self.postMessage({ ok:true, results:results, logs:logs });
  } catch(err){ self.postMessage({ ok:false, error:String(err), logs:logs }); }
};`;

type OfflineResult = { args: unknown[]; expected: unknown; got: unknown; pass: boolean; err?: boolean };
type OfflineMsg = { ok: boolean; error?: string; results?: OfflineResult[]; logs?: string[] };

export default function CodeLab() {
  const [mode, setMode] = useState<Mode>('codelab');
  const [languages, setLanguages] = useState<Lang[]>([]);
  const [currentLangId, setCurrentLangId] = useState<number | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [subtitle, setSubtitle] = useState('— Python · C++ · Java · NEU Online Judge');
  const [backHref, setBackHref] = useState('/school?domain=it#campus-hero');
  const [statsTitle, setStatsTitle] = useState('');

  const [probHtml, setProbHtml] = useState('');
  const [code, setCode] = useState('');
  const [hint, setHint] = useState('');
  const [resultsHtml, setResultsHtml] = useState('');
  const [resultsShow, setResultsShow] = useState(false);
  const [runBusy, setRunBusy] = useState(false);
  const [submitBusy, setSubmitBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Mutable refs cho các giá trị dùng trong callback async / worker, tránh
  // stale closure và tránh re-render mỗi keypress cho phần lazy-load challenge.
  const challengesRef = useRef<Challenge[]>([]);
  const currentRef = useRef<Challenge | null>(null);
  const langRef = useRef<Lang | null>(null);
  const solvedRef = useRef<Set<string>>(new Set());
  const modeRef = useRef<Mode>('codelab');
  const contestSlugRef = useRef<string>(CONTEST_SLUG_DEFAULT);
  const hintShownRef = useRef<string>(''); // offline: track bài đã bấm "gợi ý" 1 lần
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const codeKey = useCallback(
    (id: string) => `tizia:it:codelab:code:${modeRef.current}:${langRef.current?.id ?? 'def'}:${id}`,
    [],
  );

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  // Filter bài theo langRef. Nếu bài có langIds rỗng (legacy) → coi như chấp
  // nhận mọi ngôn ngữ để không ẩn nhầm.
  const visibleChallenges = useCallback((list: Challenge[], langId: number | null) => {
    return list.filter((c) => !c.langIds?.length || (langId != null && c.langIds.includes(langId)));
  }, []);

  const loadCodeForCurrent = useCallback((ch: Challenge) => {
    let saved = '';
    try { saved = localStorage.getItem(codeKey(ch.id)) || ''; } catch {}
    const starter = modeRef.current === 'codelab'
      ? pickStarter({ languages: ch.rawLanguages || [] }, langRef.current)
      : (ch.starter || '');
    setCode(saved || starter || '');
  }, [codeKey]);

  const selectChallenge = useCallback(async (id: string) => {
    const ch = challengesRef.current.find((c) => c.id === id);
    if (!ch) return;
    currentRef.current = ch;
    setCurrentId(id);

    // Codelab: lazy-load đề + sample khi click.
    if (modeRef.current === 'codelab' && !ch._loaded) {
      setProbHtml(`<h3>${esc(ch.title)}</h3><p style="opacity:.5">Đang tải đề…</p>`);
      try {
        const detail = await fetchJson<{ data?: ProblemDetail } & ProblemDetail>(
          `/api/codelab/problems/${encodeURIComponent(ch.slug || '')}`,
        );
        const p = (detail?.data || detail) as ProblemDetail;
        ch.desc = formatProblemDesc(p);
        ch.starter = pickStarter(p, langRef.current);
        ch.samples = Array.isArray(p?.samples) ? p.samples : [];
        ch.rawLanguages = p?.languages || ch.rawLanguages;
        ch._loaded = true;
      } catch (e) {
        const msg = (e as Error).message;
        setProbHtml(`<h3>${esc(ch.title)}</h3><p>⚠️ Không tải được đề: ${esc(msg)}</p>`);
        return;
      }
    }

    // Render đề + sample.
    const sampleHtml = (ch.samples && ch.samples.length)
      ? ch.samples.map((s, i) => `
        <div class="case" style="border-top:1px solid var(--cl-border);margin-top:6px;padding-top:8px">
          <div class="mark" style="color:#7dd3fc">#${i + 1}</div>
          <div class="det">
            <div><span class="k">vào:</span> <code>${esc(s.input ?? s.sampleInput ?? '')}</code></div>
            <div><span class="k">ra:</span> <code>${esc(s.output ?? s.sampleOutput ?? '')}</code></div>
            ${s.explanation ? `<div><span class="k">giải thích:</span> ${esc(s.explanation)}</div>` : ''}
          </div>
        </div>`).join('')
      : (ch.tests && ch.tests[0])
        ? `<p class="ex">Ví dụ: <code>${esc(ch.fnName)}(${esc(fmt(ch.tests[0].args).slice(1, -1))})</code> → <code>${esc(fmt(ch.tests[0].expected))}</code></p>`
        : '';
    setProbHtml(`<h3>${esc(ch.title)}${ch.cat ? `<span class="tag">${esc(ch.cat)}</span>` : ''}</h3>
      <div class="desc">${ch.desc || '<p style="opacity:.5">Bài này không có mô tả.</p>'}</div>${sampleHtml}`);

    loadCodeForCurrent(ch);
    setResultsShow(false);
    setResultsHtml('');
    setHint('');
  }, [loadCodeForCurrent]);

  // ====== BOOT ======
  const bootOfflineMode = useCallback(() => {
    modeRef.current = 'offline';
    setMode('offline');
    challengesRef.current = FALLBACK_CHALLENGES;
    setChallenges(FALLBACK_CHALLENGES);
    const s = loadLocalSolved();
    solvedRef.current = s;
    setSolved(s);
    setSubtitle('— chế độ offline (Codelab chưa cấu hình)');
    if (FALLBACK_CHALLENGES.length) selectChallenge(FALLBACK_CHALLENGES[0].id);
  }, [selectChallenge]);

  useEffect(() => {
    // Giữ tham số domain cho nút back + đọc ?contest=.
    const params = new URLSearchParams(window.location.search);
    contestSlugRef.current = params.get('contest') || CONTEST_SLUG_DEFAULT;
    const d = params.get('domain');
    if (d) setBackHref(`/school?domain=${encodeURIComponent(d)}#campus-hero`);

    let cancelled = false;

    (async () => {
      // Probe ngôn ngữ trước — nếu 503 codelab_not_configured → fallback offline.
      let langs: Lang[];
      try {
        const raw = await fetchJson<{ items?: CodelabLanguageRaw[] } | CodelabLanguageRaw[]>('/api/codelab/languages');
        const arr: CodelabLanguageRaw[] = Array.isArray(raw) ? raw : (raw?.items || []);
        langs = arr.map((l) => ({
          id: Number(l.id),
          name: String(l.name || '').toLowerCase(),
          label: l.name || `Lang ${l.id}`,
        }));
        if (!langs.length) throw new Error('no_languages');
      } catch (e) {
        console.warn('[codelab] languages fetch failed, fallback offline:', (e as Error).message);
        if (!cancelled) bootOfflineMode();
        return;
      }

      // Sắp ngôn ngữ ưa thích lên đầu.
      langs.sort((a, b) => {
        const ai = PREFERRED_LANGS.findIndex((p) => a.name.includes(p));
        const bi = PREFERRED_LANGS.findIndex((p) => b.name.includes(p));
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
      if (cancelled) return;
      langRef.current = langs[0];
      setLanguages(langs);
      setCurrentLangId(langs[0].id);

      // Load problems từ contest Tizia.
      let problems: ProblemListItem[] = [];
      try {
        const data = await fetchJson<{ items?: ProblemListItem[]; data?: ProblemListItem[] } | ProblemListItem[]>(
          `/api/codelab/problems?contest=${encodeURIComponent(contestSlugRef.current)}&limit=50`,
        );
        const arr = Array.isArray(data) ? data : (data?.items || data?.data || []);
        problems = arr.filter((p) => p && p.slug);
        if (!problems.length) {
          const all = await fetchJson<{ items?: ProblemListItem[]; data?: ProblemListItem[] } | ProblemListItem[]>(
            '/api/codelab/problems?limit=50',
          );
          const allArr = Array.isArray(all) ? all : (all?.items || all?.data || []);
          problems = allArr.filter((p) => p && p.slug);
        }
      } catch (e) {
        console.warn('[codelab] problems fetch failed:', (e as Error).message);
      }

      if (!problems.length) {
        if (!cancelled) bootOfflineMode();
        return;
      }

      const list: Challenge[] = problems.map((p) => ({
        id: p.slug,
        slug: p.slug,
        cat: (p.tags && p.tags[0]?.name) || p.difficulty || 'Codelab',
        title: p.name || p.slug,
        desc: '',
        difficulty: p.difficulty,
        langIds: (p.languages || []).map((l) => Number(l.id)),
        rawLanguages: p.languages || [],
        starter: pickStarter({ languages: p.languages || [] }, langRef.current),
      }));

      // Load đã giải từ server (Codelab là nguồn chân lý) — hợp nhất localStorage.
      let s: Set<string>;
      try {
        const stats = await fetchJson<{ acceptedProblems?: number | null }>('/api/codelab/me/stats');
        s = loadLocalSolved();
        if (stats?.acceptedProblems != null) {
          setStatsTitle(`Đã pass: ${stats.acceptedProblems} bài Codelab (toàn thời gian)`);
        }
      } catch { s = loadLocalSolved(); }

      if (cancelled) return;
      solvedRef.current = s;
      setSolved(s);
      challengesRef.current = list;
      setChallenges(list);
      if (list.length) selectChallenge(list[0].id);
    })();

    return () => { cancelled = true; };
  }, [bootOfflineMode, selectChallenge]);

  // ====== Đổi ngôn ngữ ======
  const onLangChange = useCallback((newId: number) => {
    const lang = languages.find((l) => l.id === newId) || languages[0];
    langRef.current = lang;
    setCurrentLangId(lang.id);
    const cur = currentRef.current;
    if (cur && cur.langIds?.length && !cur.langIds.includes(lang.id)) {
      currentRef.current = null;
      setCurrentId(null);
      setProbHtml('<p style="opacity:.55;padding:6px 4px">Chọn 1 bài ở danh sách bên trái — danh sách đã lọc theo ngôn ngữ vừa chọn.</p>');
      setCode('');
      setResultsShow(false);
    } else if (cur) {
      cur._loaded = false;
      selectChallenge(cur.id);
    }
  }, [languages, selectChallenge]);

  // ====== Run / Submit ======
  const renderRunResult = useCallback((data: Record<string, unknown>, sample?: Sample) => {
    const r = (data?.result as Record<string, unknown>) || data;
    const status = r?.status as { description?: string; id?: number } | undefined;
    const stdout = String(r?.stdout || r?.output || '');
    const stderr = String(r?.stderr || r?.compile_output || '');
    const statusName = status?.description || (r?.statusName as string) || (status?.id === 3 ? 'Accepted' : 'Run done');
    const passed = !!(sample && sample.output && stdout.trim() === String(sample.output).trim());
    const head = passed
      ? `<div class="res-head pass">✅ Khớp ví dụ mẫu (${esc(statusName)})</div>`
      : sample
        ? `<div class="res-head fail">⚠️ ${esc(statusName)} — chưa khớp ví dụ mẫu</div>`
        : `<div class="res-head">▶ ${esc(statusName)}</div>`;
    setResultsShow(true);
    setResultsHtml(head +
      (sample ? `<div class="case ${passed ? 'pass' : 'fail'}"><div class="mark">${passed ? '✓' : '✗'}</div>
        <div class="det">
          <div><span class="k">stdin:</span> ${esc(sample.input || '')}</div>
          <div><span class="k">mong đợi:</span> <code>${esc(sample.output || '')}</code></div>
          <div><span class="k">nhận:</span> <code>${esc(stdout)}</code></div>
        </div></div>` : '') +
      (stdout ? `<div class="console show"><div class="ttl">stdout</div>${esc(stdout)}</div>` : '') +
      (stderr ? `<div class="console show"><div class="ttl">stderr</div>${esc(stderr)}</div>` : ''));
  }, []);

  const runOffline = useCallback(() => {
    const cur = currentRef.current;
    if (!cur) return;
    const src = code;
    return new Promise<OfflineMsg>((resolve) => {
      let w: Worker;
      try { w = new Worker(URL.createObjectURL(new Blob([WORKER_SRC], { type: 'application/javascript' }))); }
      catch (e) { resolve({ ok: false, error: 'Không tạo được Worker: ' + e, logs: [] }); return; }
      const timer = setTimeout(() => { w.terminate(); resolve({ ok: false, error: 'Hết thời gian (3s)', logs: [] }); }, 3000);
      w.onmessage = (ev) => { clearTimeout(timer); w.terminate(); resolve(ev.data as OfflineMsg); };
      w.onerror = (ev) => { clearTimeout(timer); w.terminate(); resolve({ ok: false, error: ev.message || 'Lỗi khi chạy code', logs: [] }); };
      w.postMessage({ code: src, fnName: cur.fnName, tests: cur.tests });
    }).then((data) => {
      setResultsShow(true);
      if (!data.ok) { setResultsHtml(`<div class="res-head fail">⛔ Lỗi: ${esc(data.error)}</div>`); return; }
      const results = data.results || [];
      const passedCount = results.filter((r) => r.pass).length;
      const allPass = passedCount === results.length;
      const rows = results.map((r) => `<div class="case ${r.pass ? 'pass' : 'fail'}"><div class="mark">${r.pass ? '✓' : '✗'}</div>
        <div class="det">
          <div><span class="k">vào:</span> ${esc(cur.fnName)}(${esc(fmt(r.args).slice(1, -1))})</div>
          <div><span class="k">mong đợi:</span> ${esc(fmt(r.expected))} <span class="k">nhận:</span> ${esc(fmt(r.got))}</div>
        </div></div>`).join('');
      setResultsHtml(`<div class="res-head ${allPass ? 'pass' : 'fail'}">${allPass ? '✅ Vượt ' + passedCount + '/' + results.length + ' test!' : '⚠️ Đúng ' + passedCount + '/' + results.length + ' test'}</div>${rows}`);
      if (allPass && !solvedRef.current.has(cur.id)) {
        const next = new Set(solvedRef.current); next.add(cur.id);
        solvedRef.current = next; setSolved(next); saveLocalSolved(next);
        showToast('✓ Đã giải: ' + cur.title);
      }
    });
  }, [code, showToast]);

  const runOnce = useCallback(async () => {
    if (modeRef.current === 'offline') { await runOffline(); return; }
    const cur = currentRef.current;
    if (!cur) return;
    if (!code.trim()) { showToast('Hãy viết code trước nhé'); return; }

    setRunBusy(true);
    try {
      const sample = cur.samples?.[0];
      const data = await fetchJson<Record<string, unknown>>('/api/codelab/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: code,
          language_id: langRef.current?.id,
          stdin: sample?.input || '',
          expected_output: sample?.output || undefined,
          wait: true,
        }),
      });
      renderRunResult(data, sample);
    } catch (e) {
      setResultsShow(true);
      setResultsHtml(`<div class="res-head fail">⛔ Lỗi: ${esc((e as Error).message)}</div>`);
    } finally {
      setRunBusy(false);
    }
  }, [code, showToast, runOffline, renderRunResult]);

  const renderSubmitResult = useCallback((sub: Record<string, unknown>) => {
    const cur = currentRef.current;
    setResultsShow(true);
    const status = String(sub.status || '').toLowerCase();
    const passed = (sub.passedCases ?? sub.passed_test_cases ?? 0) as number;
    const total = (sub.totalCases ?? sub.total_test_cases ?? 0) as number;
    const accepted = status === 'accepted';
    const head = accepted
      ? `<div class="res-head pass">✅ Vượt tất cả ${passed}/${total} test! (Codelab Accepted)</div>`
      : `<div class="res-head fail">⚠️ ${esc(sub.status || 'Failed')} — ${passed}/${total} test</div>`;
    setResultsHtml(head + (sub.message ? `<div class="console show"><div class="ttl">message</div>${esc(sub.message)}</div>` : ''));

    if (accepted && cur && !solvedRef.current.has(cur.id)) {
      const next = new Set(solvedRef.current); next.add(cur.id);
      solvedRef.current = next; setSolved(next); saveLocalSolved(next);
      showToast(next.size === challengesRef.current.length ? '🏆 Hoàn thành toàn bộ Code Lab!' : '✓ Đã giải: ' + cur.title);
      try {
        const k = 'tizia:space:done';
        const dd = JSON.parse(localStorage.getItem(k) || '{}');
        dd.codelab = Math.max(dd.codelab || 0, next.size);
        dd.algolab = Math.max(dd.algolab || 0, next.size);
        localStorage.setItem(k, JSON.stringify(dd));
      } catch {}
    }
  }, [showToast]);

  const submitOnce = useCallback(async () => {
    if (modeRef.current === 'offline') { showToast('Chế độ offline không nộp bài'); return; }
    const cur = currentRef.current;
    if (!cur) return;
    if (!code.trim()) { showToast('Hãy viết code trước nhé'); return; }
    setSubmitBusy(true);
    try {
      const data = await fetchJson<Record<string, unknown>>('/api/codelab/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemSlug: cur.slug,
          contestSlug: contestSlugRef.current,
          language_id: langRef.current?.id,
          source_code: code,
        }),
      });
      const subId = (data?.id || data?.submissionId) as string | undefined;
      if (!subId) throw new Error('Codelab không trả submission ID');
      showToast('Đã nộp — đang chấm…');
      let final: Record<string, unknown> | null = null;
      for (let i = 0; i < 10; i++) {
        await new Promise((r) => setTimeout(r, 1500));
        try {
          const curSub = await fetchJson<Record<string, unknown>>(`/api/codelab/submissions/${encodeURIComponent(subId)}`);
          const s = String(curSub?.status || '').toLowerCase();
          if (s && s !== 'queued' && s !== 'running' && s !== 'pending') { final = curSub; break; }
        } catch {}
      }
      if (!final) {
        setResultsShow(true);
        setResultsHtml('<div class="res-head">⏳ Đang chấm, chưa có kết quả. Mở lại tab sau ít phút nhé (XP sẽ tự cộng khi xong).</div>');
        return;
      }
      renderSubmitResult(final);
      try {
        const claim = await fetchJson<{ reward?: { xp: number; coin: number } }>(
          `/api/codelab/me/claim/${encodeURIComponent(subId)}`, { method: 'POST' },
        );
        if (claim?.reward) showToast(`+${claim.reward.xp} XP, +${claim.reward.coin} coin 🎉`);
      } catch (e) { console.warn('[claim]', (e as Error).message); }
    } catch (e) {
      setResultsShow(true);
      setResultsHtml(`<div class="res-head fail">⛔ Nộp bài lỗi: ${esc((e as Error).message)}</div>`);
    } finally {
      setSubmitBusy(false);
    }
  }, [code, showToast, renderSubmitResult]);

  const onReset = useCallback(() => {
    const cur = currentRef.current;
    if (!cur) return;
    setCode(cur.starter || '');
    try { localStorage.removeItem(codeKey(cur.id)); } catch {}
  }, [codeKey]);

  const onSolution = useCallback(async () => {
    const cur = currentRef.current;
    if (!cur) return;
    if (modeRef.current === 'offline') {
      if (hintShownRef.current === cur.id) {
        setCode(cur.sol || '');
        setHint('Đã chèn lời giải mẫu — đọc hiểu rồi tự viết lại.');
      } else {
        hintShownRef.current = cur.id;
        setHint('Bấm lần nữa để chèn lời giải mẫu.');
      }
      return;
    }
    try {
      const data = await fetchJson<{ answers?: { languageId?: number; files?: { content?: string }[]; code?: string }[] }>(
        `/api/codelab/problems/${encodeURIComponent(cur.slug || '')}/answer`,
      );
      const ans = data?.answers?.find((a) => Number(a.languageId) === langRef.current?.id) || data?.answers?.[0];
      const codeStr = ans?.files?.[0]?.content || ans?.code || '';
      if (codeStr) { setCode(codeStr); setHint('Đã chèn lời giải mẫu Codelab.'); }
      else setHint('Bài này chưa có đáp án mẫu.');
    } catch (e) {
      const err = e as FetchError;
      if (err.body?.code === 'USER_HAS_NOT_SOLVED' || err.status === 403) {
        setHint('Phải pass bài này trước thì Codelab mới cho xem lời giải.');
      } else setHint('⚠️ Lấy lời giải lỗi: ' + err.message);
    }
  }, []);

  // Persist draft mỗi lần gõ.
  const onCodeChange = useCallback((val: string) => {
    setCode(val);
    const cur = currentRef.current;
    if (cur) try { localStorage.setItem(codeKey(cur.id), val); } catch {}
  }, [codeKey]);

  // Tab = 2 dấu cách trong textarea.
  const onCodeKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const t = e.currentTarget;
      const s = t.selectionStart, en = t.selectionEnd;
      const val = t.value.slice(0, s) + '  ' + t.value.slice(en);
      onCodeChange(val);
      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2; });
    }
  }, [onCodeChange]);

  // Ctrl/Cmd + Enter → chạy thử.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runOnce();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [runOnce]);

  // ====== Render ======
  const visible = visibleChallenges(challenges, currentLangId);
  const cats = [...new Set(visible.map((c) => c.cat))];
  const progLabel = visible.length
    ? `${[...solved].filter((id) => visible.some((v) => v.id === id)).length}/${visible.length} bài`
    : '0/0 bài';
  const doneBanner = solved.size > 0 && solved.size === visible.length && visible.length > 0;

  return (
    <div className="cl-root">
      <style>{CL_STYLES}</style>

      <div className="cl-top">
        <a className="cl-back" href={backHref}>← Khuôn viên trường</a>
        <div>
          <h1>💻 Code Lab <span className="cl-sub">{subtitle}</span></h1>
        </div>
        {mode === 'codelab' && languages.length > 0 && (
          <select
            className="cl-lang"
            value={currentLangId ?? ''}
            onChange={(e) => onLangChange(Number(e.target.value))}
          >
            {languages.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        )}
        <div className="cl-prog" title={statsTitle || undefined}>{progLabel}</div>
      </div>

      <div className="cl-layout">
        <div className="cl-list">
          {!visible.length && langRef.current ? (
            <p style={{ opacity: 0.6, padding: '18px 10px', fontSize: 13, lineHeight: 1.55 }}>
              Chưa có bài Codelab nào hỗ trợ <b>{langRef.current.label}</b> trong contest này. Đổi ngôn
              ngữ ở dropdown trên cùng, hoặc thêm <code>?contest=&lt;slug&gt;</code> vào URL để thử contest khác.
            </p>
          ) : (
            cats.map((cat) => (
              <div key={cat}>
                <h2>{cat}</h2>
                {visible.filter((c) => c.cat === cat).map((c) => (
                  <div
                    key={c.id}
                    className={`cl-ch${solved.has(c.id) ? ' solved' : ''}${currentId === c.id ? ' active' : ''}`}
                    onClick={() => selectChallenge(c.id)}
                  >
                    <span className="st">{solved.has(c.id) ? '✓' : ''}</span>
                    <span className="nm">{c.title}</span>
                    {c.difficulty ? <span className="lv">{c.difficulty}</span> : null}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="cl-work">
          {doneBanner && (
            <div className="cl-done-banner show">
              🎉 <b>Xuất sắc!</b> Bạn đã vượt qua mọi thử thách. Đây là cách một trường CNTT thật vận
              hành: viết code → chạy → vượt test.
            </div>
          )}
          <div className="cl-prob" dangerouslySetInnerHTML={{ __html: probHtml }} />
          <div className="cl-ed-wrap">
            <div className="cl-ed-lbl">Trình soạn code · Tab = 2 dấu cách · chạy thật trên NEU Codelab (sandbox Judge0)</div>
            <textarea
              className="cl-code"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              onKeyDown={onCodeKeyDown}
            />
          </div>
          <div className="cl-controls">
            <button className="cl-btn run" disabled={runBusy} onClick={runOnce}>
              {runBusy ? '⏳ Đang chạy…' : '▶ Chạy thử'}
            </button>
            {mode === 'codelab' && (
              <button className="cl-btn submit" disabled={submitBusy} onClick={submitOnce}>
                {submitBusy ? '⏳ Đang chấm…' : '✓ Nộp bài'}
              </button>
            )}
            <button className="cl-btn ghost" onClick={onReset}>↺ Đặt lại</button>
            <button className="cl-btn sol" onClick={onSolution}>Xem gợi ý</button>
            <span className="cl-hint">{hint}</span>
          </div>
          <div className={`cl-results${resultsShow ? ' show' : ''}`} dangerouslySetInnerHTML={{ __html: resultsHtml }} />
        </div>
      </div>

      <div className={`cl-toast${toast ? ' show' : ''}`}>{toast}</div>
    </div>
  );
}

// Scoped CSS — giữ NGUYÊN bảng màu thương hiệu Code Lab của trang gốc
// (cyan accent + green ok/red bad, nền tối riêng). Prefix .cl-* để không đụng
// tới token layout chung của web-next.
const CL_STYLES = `
.cl-root { --cl-accent:#38bdf8; --cl-accent-2:#22c55e; --cl-card:rgba(255,255,255,.05);
  --cl-border:rgba(255,255,255,.12); --cl-ok:#22c55e; --cl-bad:#ef4444;
  color:#e5edf7; margin:-2rem -1rem 0; min-height:calc(100vh - 57px);
  background:radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56,189,248,.16), transparent), linear-gradient(180deg,#0b1220,#0f1830);
  font-family:'Inter',system-ui,sans-serif; }
.cl-root * { box-sizing:border-box; }
.cl-top { display:flex; align-items:center; gap:14px; padding:12px 18px; border-bottom:1px solid var(--cl-border); background:rgba(0,0,0,.2); }
.cl-back { color:#fff; text-decoration:none; opacity:.85; font-size:13.5px; background:rgba(255,255,255,.08); padding:7px 12px; border-radius:9px; }
.cl-back:hover { opacity:1; background:rgba(255,255,255,.16); }
.cl-top h1 { margin:0; font-size:17px; font-weight:800; }
.cl-top .cl-sub { font-size:12.5px; opacity:.6; }
.cl-lang { margin-left:auto; background:rgba(255,255,255,.08); color:#fff; border:1px solid var(--cl-border); border-radius:9px; padding:7px 10px; font-size:13px; }
.cl-prog { font-size:13px; font-weight:700; background:rgba(34,197,94,.15); border:1px solid rgba(34,197,94,.4); color:#86efac; padding:6px 12px; border-radius:20px; }
/* Khi ẩn dropdown ngôn ngữ (offline mode) thì prog đẩy sang phải thay dropdown. */
.cl-top > .cl-prog:nth-child(3) { margin-left:auto; }
.cl-layout { display:grid; grid-template-columns:260px 1fr; gap:0; height:calc(100vh - 58px); }
@media (max-width:820px){ .cl-layout{ grid-template-columns:1fr; height:auto; } .cl-list{ max-height:none !important; } }
.cl-list { border-right:1px solid var(--cl-border); overflow:auto; padding:10px; }
.cl-list h2 { font-size:11px; letter-spacing:1px; text-transform:uppercase; opacity:.5; margin:12px 8px 6px; }
.cl-ch { display:flex; align-items:center; gap:9px; padding:10px 11px; border-radius:10px; cursor:pointer; font-size:13.5px; border:1px solid transparent; }
.cl-ch:hover { background:rgba(255,255,255,.06); }
.cl-ch.active { background:rgba(56,189,248,.14); border-color:rgba(56,189,248,.45); }
.cl-ch .st { width:18px; height:18px; border-radius:50%; border:2px solid rgba(255,255,255,.25); flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:11px; }
.cl-ch.solved .st { background:var(--cl-ok); border-color:var(--cl-ok); color:#04210f; }
.cl-ch .nm { flex:1; } .cl-ch .lv { font-size:10px; opacity:.5; }
.cl-work { display:flex; flex-direction:column; overflow:auto; padding:16px 18px 28px; gap:12px; }
.cl-prob { background:var(--cl-card); border:1px solid var(--cl-border); border-radius:13px; padding:14px 16px; }
.cl-prob:empty { display:none; }
.cl-prob h3 { margin:0 0 6px; font-size:17px; }
.cl-prob .tag { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.4px; padding:2px 8px; border-radius:7px; background:rgba(56,189,248,.2); color:#bae6fd; margin-left:8px; }
.cl-prob p { margin:6px 0; font-size:13.5px; opacity:.9; line-height:1.55; }
.cl-prob code { background:rgba(0,0,0,.35); padding:1px 6px; border-radius:5px; font-size:12.5px; color:#7dd3fc; }
.cl-prob .ex { font-size:12.5px; opacity:.75; margin-top:4px; }
.cl-ed-wrap { position:relative; }
.cl-ed-lbl { font-size:11px; opacity:.5; text-transform:uppercase; letter-spacing:.6px; margin-bottom:5px; }
.cl-code { width:100%; min-height:240px; resize:vertical; background:#0a0f1d; color:#e7f0ff; border:1px solid var(--cl-border);
  border-radius:11px; padding:13px 15px; font-family:'SF Mono',ui-monospace,Menlo,Consolas,monospace; font-size:13.5px; line-height:1.6; tab-size:2; }
.cl-code:focus { outline:2px solid var(--cl-accent); border-color:transparent; }
.cl-controls { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
.cl-btn { border:none; border-radius:10px; font-weight:800; font-size:13.5px; padding:10px 18px; cursor:pointer; font-family:inherit; }
.cl-btn:disabled { opacity:.7; cursor:default; }
.cl-btn.run { background:var(--cl-accent); color:#04222e; } .cl-btn.run:hover{ filter:brightness(1.1); }
.cl-btn.submit { background:var(--cl-accent-2); color:#04210f; }
.cl-btn.ghost { background:rgba(255,255,255,.08); color:#fff; } .cl-btn.ghost:hover{ background:rgba(255,255,255,.16); }
.cl-btn.sol { background:rgba(255,255,255,.06); color:#cbd5e1; font-weight:600; }
.cl-hint { font-size:12px; opacity:.5; }
.cl-results { background:var(--cl-card); border:1px solid var(--cl-border); border-radius:12px; padding:6px 6px; display:none; }
.cl-results.show { display:block; }
.cl-results .res-head { font-weight:800; font-size:14px; padding:10px 12px; }
.cl-results .res-head.pass { color:#86efac; } .cl-results .res-head.fail { color:#fca5a5; }
.cl-results .case { display:grid; grid-template-columns:22px 1fr; gap:8px; padding:8px 12px; border-top:1px solid var(--cl-border); font-size:12.5px; font-family:ui-monospace,monospace; }
.cl-results .case .mark { font-weight:800; } .cl-results .case.pass .mark{ color:var(--cl-ok);} .cl-results .case.fail .mark{ color:var(--cl-bad);}
.cl-results .case .det { overflow-x:auto; } .cl-results .case .det div{ white-space:nowrap; }
.cl-results .case .k { opacity:.55; }
.cl-results .console { background:#06080f; border:1px solid var(--cl-border); border-radius:10px; margin:8px 12px 12px; padding:9px 12px; font-family:ui-monospace,monospace; font-size:12.5px; color:#9fb3c8; max-height:140px; overflow:auto; white-space:pre-wrap; display:none; }
.cl-results .console.show { display:block; }
.cl-results .console .ttl{ opacity:.5; font-size:10px; text-transform:uppercase; letter-spacing:.6px; margin-bottom:4px; }
.cl-toast { position:fixed; left:50%; bottom:22px; transform:translateX(-50%) translateY(20px); background:#22c55e; color:#04210f; font-weight:800;
  padding:12px 22px; border-radius:13px; box-shadow:0 12px 30px rgba(0,0,0,.4); opacity:0; transition:.3s; z-index:20; pointer-events:none; }
.cl-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
.cl-done-banner { background:linear-gradient(120deg, rgba(34,197,94,.2), rgba(56,189,248,.12)); border:1px solid rgba(34,197,94,.4);
  border-radius:13px; padding:14px 16px; font-size:14px; }
`;
