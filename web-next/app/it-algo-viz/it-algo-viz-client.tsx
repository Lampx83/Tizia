'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Định nghĩa thuật toán (nội dung giáo dục tĩnh, không phải content DB) ──
type AlgoKey = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';
type AlgoDef = { name: string; big: string; stable: boolean; note: string };

const ALGOS: Record<AlgoKey, AlgoDef> = {
  bubble: {
    name: 'Sắp xếp nổi bọt (Bubble sort)',
    big: 'Tốt nhất O(n) · TB/Xấu O(n²)',
    stable: true,
    note: 'So sánh từng cặp kề nhau và đẩy phần tử lớn "nổi" dần về cuối sau mỗi vòng.',
  },
  selection: {
    name: 'Sắp xếp chọn (Selection sort)',
    big: 'O(n²) mọi trường hợp',
    stable: false,
    note: 'Mỗi vòng tìm phần tử nhỏ nhất trong phần còn lại rồi đưa về đầu — ít hoán đổi nhưng luôn O(n²) so sánh.',
  },
  insertion: {
    name: 'Sắp xếp chèn (Insertion sort)',
    big: 'Tốt nhất O(n) · TB/Xấu O(n²)',
    stable: true,
    note: 'Chèn dần từng phần tử vào đúng chỗ trong đoạn đã sắp xếp bên trái — rất nhanh với dữ liệu gần như đã sắp.',
  },
  merge: {
    name: 'Sắp xếp trộn (Merge sort)',
    big: 'O(n log n) mọi trường hợp · tốn O(n) bộ nhớ',
    stable: true,
    note: 'Chia đôi đệ quy đến đoạn 1 phần tử rồi trộn (merge) hai nửa đã sắp xếp lại với nhau.',
  },
  quick: {
    name: 'Sắp xếp nhanh (Quick sort)',
    big: 'TB O(n log n) · Xấu nhất O(n²)',
    stable: false,
    note: 'Chọn một phần tử làm chốt (pivot), phân hoạch nhỏ–lớn quanh chốt rồi đệ quy hai bên.',
  },
};

// ── Củng cố (MCQ) — nội dung giáo dục tĩnh của trang gốc ──
type Quiz = { q: string; o: string[]; a: number; fb: string };
const QUIZ: Quiz[] = [
  {
    q: 'Thuật toán nào luôn đạt O(n log n) kể cả trường hợp xấu nhất?',
    o: ['Merge sort', 'Quick sort', 'Bubble sort', 'Selection sort'],
    a: 0,
    fb: 'Merge sort luôn O(n log n) nhờ chia đôi đều, đổi lại tốn O(n) bộ nhớ phụ.',
  },
  {
    q: 'Với mảng GẦN NHƯ đã sắp xếp, thuật toán nào nhanh nhất (tiến tới O(n))?',
    o: ['Insertion sort', 'Selection sort', 'Quick sort', 'Merge sort'],
    a: 0,
    fb: 'Insertion sort chỉ cần vài phép so sánh khi dữ liệu gần đúng thứ tự ⇒ tiệm cận O(n).',
  },
  {
    q: 'Vì sao nên TRÁNH Bubble/Selection sort khi n rất lớn?',
    o: [
      'Vì độ phức tạp O(n²) tăng rất nhanh theo n',
      'Vì chúng tốn nhiều bộ nhớ',
      'Vì không sắp xếp đúng',
      'Vì cần phần cứng đặc biệt',
    ],
    a: 0,
    fb: 'O(n²): n gấp 10 thì thời gian gấp ~100 lần. Với n lớn hãy dùng O(n log n).',
  },
];

// ── vết thao tác để phát lại từng bước ──
type Op =
  | ['cmp', number, number]
  | ['swap', number, number]
  | ['set', number, number]
  | ['sorted', number]
  | ['pivot', number];

function genTrace(algo: AlgoKey, src: number[]): Op[] {
  const a = src.slice();
  const ops: Op[] = [];
  const cmp = (i: number, j: number) => ops.push(['cmp', i, j]);
  const swap = (i: number, j: number) => {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
    ops.push(['swap', i, j]);
  };
  const set = (i: number, v: number) => {
    a[i] = v;
    ops.push(['set', i, v]);
  };
  const sortd = (i: number) => ops.push(['sorted', i]);
  const n = a.length;
  if (algo === 'bubble') {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        cmp(j, j + 1);
        if (a[j] > a[j + 1]) swap(j, j + 1);
      }
      sortd(n - 1 - i);
    }
  } else if (algo === 'selection') {
    for (let i = 0; i < n; i++) {
      let m = i;
      for (let j = i + 1; j < n; j++) {
        cmp(m, j);
        if (a[j] < a[m]) m = j;
      }
      if (m !== i) swap(i, m);
      sortd(i);
    }
  } else if (algo === 'insertion') {
    sortd(0);
    for (let i = 1; i < n; i++) {
      let j = i;
      while (j > 0) {
        cmp(j - 1, j);
        if (a[j - 1] > a[j]) {
          swap(j - 1, j);
          j--;
        } else break;
      }
    }
    for (let k = 0; k < n; k++) sortd(k);
  } else if (algo === 'merge') {
    const ms = (lo: number, hi: number) => {
      if (hi - lo <= 1) return;
      const mid = (lo + hi) >> 1;
      ms(lo, mid);
      ms(mid, hi);
      const L = a.slice(lo, mid);
      const R = a.slice(mid, hi);
      let i = 0,
        j = 0,
        k = lo;
      while (i < L.length && j < R.length) {
        cmp(lo + i, mid + j);
        if (L[i] <= R[j]) {
          set(k, L[i]);
          i++;
        } else {
          set(k, R[j]);
          j++;
        }
        k++;
      }
      while (i < L.length) {
        set(k, L[i]);
        i++;
        k++;
      }
      while (j < R.length) {
        set(k, R[j]);
        j++;
        k++;
      }
    };
    ms(0, n);
    for (let k = 0; k < n; k++) sortd(k);
  } else if (algo === 'quick') {
    const qs = (lo: number, hi: number) => {
      if (lo >= hi) {
        if (lo === hi) sortd(lo);
        return;
      }
      const pivot = a[hi];
      ops.push(['pivot', hi]);
      let i = lo;
      for (let j = lo; j < hi; j++) {
        cmp(j, hi);
        if (a[j] < pivot) {
          if (i !== j) swap(i, j);
          i++;
        }
      }
      if (i !== hi) swap(i, hi);
      sortd(i);
      qs(lo, i - 1);
      qs(i + 1, hi);
    };
    qs(0, n - 1);
  }
  return ops;
}

function rng(n: number): number[] {
  const a: number[] = [];
  for (let i = 0; i < n; i++) a.push(8 + Math.floor(Math.random() * 100));
  return a;
}

// Màu canvas cố định theo brand trang gốc (không phải token app theme).
const COLORS = {
  base: '#64748b',
  cmp: '#fbbf24',
  swap: '#ef4444',
  write: '#22d3ee',
  pivot: '#a78bfa',
  sorted: '#4ade80',
};

type Hi = {
  cmp?: [number, number];
  swap?: [number, number];
  write?: [number];
  pivot?: [number];
};

export default function ItAlgoVizClient() {
  const [domain, setDomain] = useState('it');
  const [curAlgo, setCurAlgo] = useState<AlgoKey>('bubble');
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(45);
  const [size, setSize] = useState(32);
  const [cmpN, setCmpN] = useState(0);
  const [moveN, setMoveN] = useState(0);
  const [statusT, setStatusT] = useState('Sẵn sàng');

  // quiz
  const [answered, setAnswered] = useState<Record<number, number>>({}); // qi -> chọn oi
  const [toast, setToast] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Trạng thái mô phỏng giữ trong ref để vòng lặp rAF đọc/ghi không kẹt closure.
  const arrRef = useRef<number[]>([]);
  const traceRef = useRef<Op[]>([]);
  const ptrRef = useRef(0);
  const sortedSetRef = useRef<Set<number>>(new Set());
  const pivotIdxRef = useRef(-1);
  const hiRef = useRef<Hi>({});
  const cmpCountRef = useRef(0);
  const moveCountRef = useRef(0);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const accRef = useRef(0);
  const playingRef = useRef(false);
  const speedRef = useRef(45);
  const curAlgoRef = useRef<AlgoKey>('bubble');
  const toastTRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  speedRef.current = speed;
  curAlgoRef.current = curAlgo;

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const W = cv.width,
      H = cv.height,
      arr = arrRef.current,
      n = arr.length,
      gap = n > 40 ? 1 : 2;
    const bw = (W - gap * (n + 1)) / n;
    const maxV = Math.max(...arr, 1);
    ctx.clearRect(0, 0, W, H);
    const hi = hiRef.current;
    for (let i = 0; i < n; i++) {
      const h = (arr[i] / maxV) * (H - 20),
        x = gap + i * (bw + gap),
        y = H - h;
      let col = COLORS.base;
      if (sortedSetRef.current.has(i)) col = COLORS.sorted;
      if (pivotIdxRef.current === i) col = COLORS.pivot;
      if (hi.cmp && hi.cmp.includes(i)) col = COLORS.cmp;
      if (hi.write && hi.write.includes(i)) col = COLORS.write;
      if (hi.swap && hi.swap.includes(i)) col = COLORS.swap;
      ctx.fillStyle = col;
      ctx.fillRect(x, y, Math.max(bw, 1), h);
    }
  }, []);

  const stop = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const finish = useCallback(() => {
    if (playingRef.current) stop();
    pivotIdxRef.current = -1;
    for (let i = 0; i < arrRef.current.length; i++) sortedSetRef.current.add(i);
    hiRef.current = {};
    setStatusT('Hoàn tất ✓');
    draw();
  }, [draw, stop]);

  const applyOp = useCallback((op: Op) => {
    hiRef.current = {};
    const t = op[0];
    const arr = arrRef.current;
    if (t === 'cmp') {
      cmpCountRef.current++;
      hiRef.current = { cmp: [op[1], op[2]] };
    } else if (t === 'swap') {
      moveCountRef.current++;
      const x = op[1],
        y = op[2],
        tmp = arr[x];
      arr[x] = arr[y];
      arr[y] = tmp;
      hiRef.current = { swap: [x, y] };
    } else if (t === 'set') {
      moveCountRef.current++;
      arr[op[1]] = op[2];
      hiRef.current = { write: [op[1]] };
    } else if (t === 'sorted') {
      sortedSetRef.current.add(op[1]);
    } else if (t === 'pivot') {
      pivotIdxRef.current = op[1];
      hiRef.current = { pivot: [op[1]] };
    }
    setCmpN(cmpCountRef.current);
    setMoveN(moveCountRef.current);
  }, []);

  const step = useCallback((): boolean => {
    if (ptrRef.current >= traceRef.current.length) {
      finish();
      return false;
    }
    applyOp(traceRef.current[ptrRef.current++]);
    draw();
    if (ptrRef.current >= traceRef.current.length) finish();
    return true;
  }, [applyOp, draw, finish]);

  const rebuild = useCallback(
    (newArr: number[] | null) => {
      stop();
      const n = size;
      const arr = newArr || rng(n);
      arrRef.current = arr;
      traceRef.current = genTrace(curAlgoRef.current, arr);
      ptrRef.current = 0;
      cmpCountRef.current = 0;
      moveCountRef.current = 0;
      sortedSetRef.current = new Set();
      pivotIdxRef.current = -1;
      hiRef.current = {};
      setCmpN(0);
      setMoveN(0);
      setStatusT('Sẵn sàng');
      draw();
    },
    [draw, size, stop],
  );

  const loop = useCallback(
    (ts: number) => {
      if (!playingRef.current) return;
      if (!lastRef.current) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;
      const opsPerSec = Math.pow(speedRef.current / 100, 1.6) * 180 + 2;
      accRef.current += (dt / 1000) * opsPerSec;
      while (accRef.current >= 1 && playingRef.current) {
        accRef.current -= 1;
        if (!step()) break;
      }
      rafRef.current = requestAnimationFrame(loop);
    },
    [step],
  );

  const play = useCallback(() => {
    if (ptrRef.current >= traceRef.current.length) rebuild(arrRef.current.slice());
    playingRef.current = true;
    setPlaying(true);
    lastRef.current = 0;
    accRef.current = 0;
    setStatusT('Đang chạy…');
    rafRef.current = requestAnimationFrame(loop);
  }, [loop, rebuild]);

  const showToast = useCallback((m: string) => {
    setToast(m);
    if (toastTRef.current) clearTimeout(toastTRef.current);
    toastTRef.current = setTimeout(() => setToast(''), 2400);
  }, []);

  // Chọn thuật toán → dựng lại vết. Giữ mảng hiện tại nếu đã có.
  const selectAlgo = useCallback(
    (k: AlgoKey) => {
      curAlgoRef.current = k;
      setCurAlgo(k);
      rebuild(arrRef.current.length ? arrRef.current.slice() : null);
    },
    [rebuild],
  );

  // init: đọc query param (domain / auto) + dựng lần đầu.
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const params = new URLSearchParams(window.location.search);
    const d = params.get('domain') || 'it';
    setDomain(d);
    const auto = params.get('auto') === '1';
    if (auto) {
      setSpeed(70);
      curAlgoRef.current = 'quick';
      setCurAlgo('quick');
      rebuild(null);
      // chạy sau khi state size/speed sẵn sàng
      setTimeout(() => play(), 0);
    } else {
      rebuild(null);
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (toastTRef.current) clearTimeout(toastTRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Đổi số phần tử → trộn lại (khớp hành vi 'input' trên slider gốc).
  const sizeInit = useRef(true);
  useEffect(() => {
    if (sizeInit.current) {
      sizeInit.current = false;
      return;
    }
    rebuild(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const answer = useCallback(
    (qi: number, oi: number) => {
      if (qi in answered) return;
      const it = QUIZ[qi];
      const correct = oi === it.a;
      const next = { ...answered, [qi]: oi };
      setAnswered(next);
      if (correct) showToast('✓ Củng cố: +1');
      const size = Object.keys(next).length;
      if (size === QUIZ.length) {
        try {
          const key = 'tizia:space:done';
          const d = JSON.parse(localStorage.getItem(key) || '{}');
          d.algolab = Math.max(d.algolab || 0, QUIZ.length);
          localStorage.setItem(key, JSON.stringify(d));
        } catch {
          /* ignore */
        }
        showToast('🏆 Hoàn thành phần củng cố giải thuật!');
      }
    },
    [answered, showToast],
  );

  const answeredCount = Object.keys(answered).length;
  const A = ALGOS[curAlgo];

  return (
    <div className="algoviz">
      <style>{css}</style>
      <div className="av-top">
        <a
          className="av-back"
          href={`/school?domain=${encodeURIComponent(domain)}#campus-hero`}
        >
          ← Khuôn viên trường
        </a>
        <div>
          <h1 className="av-title">
            🌳 Trực quan giải thuật{' '}
            <span className="av-sub">— xem từng bước so sánh &amp; hoán đổi</span>
          </h1>
        </div>
        <div className="av-prog">{answeredCount}/3 củng cố</div>
      </div>

      <div className="av-wrap">
        <div className="av-algos">
          {(Object.keys(ALGOS) as AlgoKey[]).map((k) => (
            <button
              key={k}
              className={k === curAlgo ? 'active' : ''}
              onClick={() => selectAlgo(k)}
            >
              {ALGOS[k].name.split('(')[0].trim()}
            </button>
          ))}
        </div>

        <div className="av-panel">
          <div className="av-meta">
            <span className="av-nm">{A.name}</span>
            <span className="av-big">{A.big}</span>
            <span className={`av-stable ${A.stable ? 'y' : 'n'}`}>
              {A.stable ? 'ổn định' : 'không ổn định'}
            </span>
          </div>
          <div className="av-note">{A.note}</div>

          <canvas ref={canvasRef} width={1040} height={300} />

          <div className="av-legend">
            <span>
              <i style={{ background: COLORS.base }} />
              chưa xét
            </span>
            <span>
              <i style={{ background: COLORS.cmp }} />
              đang so sánh
            </span>
            <span>
              <i style={{ background: COLORS.swap }} />
              hoán đổi
            </span>
            <span>
              <i style={{ background: COLORS.write }} />
              ghi đè (merge)
            </span>
            <span>
              <i style={{ background: COLORS.pivot }} />
              chốt (pivot)
            </span>
            <span>
              <i style={{ background: COLORS.sorted }} />
              đã đúng vị trí
            </span>
          </div>

          <div className="av-controls">
            <button
              className="av-btn play"
              onClick={() => (playing ? stop() : play())}
            >
              {playing ? '⏸ Tạm dừng' : '▶ Chạy'}
            </button>
            <button
              className="av-btn ghost"
              onClick={() => {
                stop();
                step();
              }}
            >
              ⏭ Bước
            </button>
            <button className="av-btn ghost" onClick={() => rebuild(null)}>
              🔀 Trộn lại
            </button>
            <span className="av-ctl-grp">
              Tốc độ{' '}
              <input
                type="range"
                min={1}
                max={100}
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
              />
            </span>
            <span className="av-ctl-grp">
              Số phần tử{' '}
              <input
                type="range"
                min={8}
                max={60}
                value={size}
                onChange={(e) => setSize(+e.target.value)}
              />
            </span>
          </div>

          <div className="av-stats">
            <div>
              <b>{cmpN}</b>
              <span>so sánh</span>
            </div>
            <div>
              <b>{moveN}</b>
              <span>hoán đổi / ghi</span>
            </div>
            <div>
              <b>{statusT}</b>
              <span>trạng thái</span>
            </div>
          </div>
        </div>

        <div className="av-reinforce">
          <h2>💡 Củng cố kiến thức</h2>
          <div>
            {QUIZ.map((it, qi) => {
              const chosen = answered[qi];
              const isAnswered = qi in answered;
              const correct = isAnswered && chosen === it.a;
              return (
                <div className="av-q" key={qi}>
                  <div className="av-qt">
                    {qi + 1}. {it.q}
                  </div>
                  {it.o.map((o, oi) => {
                    let cls = 'av-opt';
                    if (isAnswered) {
                      if (oi === it.a) cls += ' ok';
                      else if (oi === chosen) cls += ' no';
                    }
                    return (
                      <button
                        key={oi}
                        className={cls}
                        onClick={() => answer(qi, oi)}
                      >
                        {o}
                      </button>
                    );
                  })}
                  <div className={`av-fb ${isAnswered ? 'show' : ''}`}>
                    {isAnswered
                      ? (correct ? '✓ Đúng! ' : '✗ Chưa đúng. ') + it.fb
                      : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`av-toast ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  );
}

// CSS scoped theo brand trang gốc (nền tối xanh, accent xanh lá). Dùng inline
// <style> vì đây là màu thương hiệu riêng của trang, không phải token app theme.
const css = `
.algoviz { --av-accent:#4ade80; --av-card:rgba(255,255,255,.05); --av-border:rgba(255,255,255,.12);
  margin:-1rem -1rem 0; min-height:calc(100vh - 60px); color:#e5edf7;
  background:radial-gradient(ellipse 80% 50% at 50% 0%, rgba(74,222,128,.14), transparent), linear-gradient(180deg,#0b1220,#0f1830);
  font-family:'Inter',system-ui,sans-serif; }
.algoviz * { box-sizing:border-box; }
.av-top { display:flex; align-items:center; gap:14px; padding:12px 18px; border-bottom:1px solid var(--av-border); background:rgba(0,0,0,.2); }
.av-back { color:#fff; text-decoration:none; opacity:.85; font-size:13.5px; background:rgba(255,255,255,.08); padding:7px 12px; border-radius:9px; }
.av-back:hover { opacity:1; background:rgba(255,255,255,.16); }
.av-title { margin:0; font-size:17px; font-weight:800; }
.av-sub { font-size:12.5px; opacity:.6; font-weight:500; }
.av-prog { margin-left:auto; font-size:13px; font-weight:700; background:rgba(74,222,128,.15); border:1px solid rgba(74,222,128,.4); color:#86efac; padding:6px 12px; border-radius:20px; }
.av-wrap { max-width:1080px; margin:0 auto; padding:16px 18px 40px; }
.av-algos { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px; }
.av-algos button { background:rgba(255,255,255,.06); border:1px solid var(--av-border); color:#cbd5e1; font-size:13px; font-weight:600; padding:8px 13px; border-radius:10px; cursor:pointer; font-family:inherit; }
.av-algos button:hover { background:rgba(255,255,255,.12); }
.av-algos button.active { background:rgba(74,222,128,.16); border-color:rgba(74,222,128,.5); color:#bbf7d0; }
.av-panel { background:var(--av-card); border:1px solid var(--av-border); border-radius:14px; padding:14px 16px; }
.av-meta { display:flex; flex-wrap:wrap; gap:18px; align-items:baseline; margin-bottom:6px; }
.av-nm { font-size:16px; font-weight:800; }
.av-big { font-size:12.5px; color:#fcd34d; font-family:ui-monospace,monospace; }
.av-stable { font-size:11px; padding:2px 8px; border-radius:7px; }
.av-stable.y { background:rgba(34,197,94,.18); color:#86efac; }
.av-stable.n { background:rgba(239,68,68,.16); color:#fca5a5; }
.av-note { font-size:13px; opacity:.82; line-height:1.5; margin:2px 0 10px; }
.algoviz canvas { width:100%; height:300px; display:block; background:#070b16; border-radius:11px; border:1px solid var(--av-border); }
.av-legend { display:flex; flex-wrap:wrap; gap:14px; margin:10px 2px 0; font-size:12px; opacity:.85; }
.av-legend i { display:inline-block; width:11px; height:11px; border-radius:3px; margin-right:5px; vertical-align:-1px; }
.av-controls { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-top:13px; }
.av-btn { border:none; border-radius:10px; font-weight:800; font-size:13.5px; padding:10px 16px; cursor:pointer; font-family:inherit; }
.av-btn.play { background:var(--av-accent); color:#04210f; }
.av-btn.play:hover { filter:brightness(1.08); }
.av-btn.ghost { background:rgba(255,255,255,.08); color:#fff; }
.av-btn.ghost:hover { background:rgba(255,255,255,.16); }
.av-ctl-grp { display:flex; align-items:center; gap:8px; font-size:12.5px; opacity:.85; }
.av-ctl-grp input[type=range]{ width:120px; accent-color:var(--av-accent); }
.av-stats { display:flex; gap:20px; margin-top:12px; font-size:13px; }
.av-stats b { font-size:18px; color:#fff; display:block; font-variant-numeric:tabular-nums; }
.av-stats span { opacity:.6; font-size:11.5px; text-transform:uppercase; letter-spacing:.5px; }
.av-reinforce { margin-top:18px; }
.av-reinforce h2 { font-size:14px; margin:0 0 10px; }
.av-q { background:var(--av-card); border:1px solid var(--av-border); border-radius:12px; padding:12px 14px; margin-bottom:10px; }
.av-qt { font-size:13.5px; font-weight:700; margin-bottom:8px; }
.av-opt { display:block; width:100%; text-align:left; background:rgba(255,255,255,.04); border:1px solid var(--av-border); color:#e5edf7; padding:8px 11px; border-radius:9px; margin:5px 0; font-size:13px; cursor:pointer; font-family:inherit; }
.av-opt:hover { background:rgba(255,255,255,.09); }
.av-opt.ok { background:rgba(34,197,94,.2); border-color:#22c55e; }
.av-opt.no { background:rgba(239,68,68,.18); border-color:#ef4444; }
.av-fb { font-size:12.5px; margin-top:7px; opacity:0; transition:.25s; color:#bbf7d0; min-height:0; }
.av-fb.show { opacity:.95; }
.av-toast { position:fixed; left:50%; bottom:22px; transform:translateX(-50%) translateY(20px); background:#22c55e; color:#04210f; font-weight:800; padding:12px 22px; border-radius:13px; box-shadow:0 12px 30px rgba(0,0,0,.4); opacity:0; transition:.3s; z-index:20; pointer-events:none; }
.av-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
`;
