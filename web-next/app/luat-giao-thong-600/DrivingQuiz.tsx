'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

// Shape 1 câu — giống item collection 'driving-600' backend trả về.
export type DrivingQuestion = {
  id?: string;
  t: string; // topic (17 sub-category)
  c: boolean; // câu điểm liệt (critical)
  q: string; // đề bài
  o: string[]; // các đáp án
  a: number; // index đáp án đúng
  ex: string; // giải thích
  img?: string; // ảnh minh hoạ (ký hiệu đèn báo / biển) — req #54
  imgTodo?: boolean; // câu tham chiếu hình nhưng chưa có ảnh — hiện nhãn "đang bổ sung"
};

type ExamClass = {
  id: string;
  ic: string;
  n: number;
  min: number;
  pass: number;
  crit: number;
  desc: string;
  up?: number;
};

// Map chủ đề (t) → nhóm dropdown. Taxonomy chuẩn bộ 600 câu (req #47/#48/#50/#51 Thì Dũng):
// 1 Khái niệm & quy tắc · 2 Văn hoá & đạo đức · 3 Kỹ thuật lái xe · 4 Cấu tạo & sửa chữa
// 5 Biển Báo (chờ ảnh) · 6 Tình huống giao thông.
const GROUP: Record<string, string> = {
  'Khái niệm & quy tắc': 'kn',
  'Văn hoá giao thông': 'vh',
  'Kỹ thuật lái xe': 'kt',
  'Cấu tạo & sửa chữa': 'ct',
  // 5 Biển Báo (th): chưa có câu (chờ SV gửi ảnh biển báo)
  'Xử lý tình huống': 'nv', // 6 Tình huống giao thông
  // giữ tương thích key cũ nếu còn dữ liệu seed cũ
  'Khái niệm': 'kn',
  'Lái xe đường đặc biệt': 'kt',
  'Động cơ - hệ thống': 'ct',
};
const groupOf = (t: string) => GROUP[t] || 'kn';

// Cấu hình thi theo hạng GPLX (req #21): n câu · min phút · pass đạt · crit câu liệt.
const EXAM_CLASSES: ExamClass[] = [
  { id: 'B', ic: '🚗', n: 30, min: 20, pass: 27, crit: 1, desc: 'Ô tô đến 8 chỗ (không kể chỗ lái)' },
  { id: 'C1', ic: '🚙', n: 35, min: 22, pass: 32, crit: 1, desc: 'Ô tô tải 3,5 – 7,5 tấn' },
  { id: 'C', ic: '🚚', n: 40, min: 24, pass: 36, crit: 1, desc: 'Ô tô tải trên 7,5 tấn' },
  { id: 'D1', ic: '🚐', n: 45, min: 26, pass: 41, crit: 1, desc: 'Ô tô chở 8 – 16 chỗ' },
  { id: 'D2', ic: '🚌', n: 45, min: 26, pass: 41, crit: 1, desc: 'Ô tô chở 16 – 29 chỗ' },
  { id: 'D', ic: '🚍', n: 45, min: 26, pass: 41, crit: 1, desc: 'Ô tô chở trên 29 chỗ' },
  { id: 'BE', ic: '🚗', n: 45, min: 26, pass: 41, crit: 1, desc: 'Hạng B + kéo rơ moóc trên 750kg', up: 1 },
  { id: 'C1E', ic: '🚙', n: 45, min: 26, pass: 41, crit: 1, desc: 'Hạng C1 + rơ moóc trên 750kg', up: 1 },
  { id: 'CE', ic: '🚚', n: 45, min: 26, pass: 41, crit: 1, desc: 'Hạng C + rơ moóc trên 750kg', up: 1 },
  { id: 'D1E', ic: '🚐', n: 45, min: 26, pass: 41, crit: 1, desc: 'Hạng D1 + rơ moóc trên 750kg', up: 1 },
  { id: 'DE', ic: '🚍', n: 45, min: 26, pass: 41, crit: 1, desc: 'Hạng D + rơ moóc trên 750kg', up: 1 },
];

const NUM_DE = 15; // số đề ngẫu nhiên cố định cho mỗi hạng (req #35)

// RNG có seed → mỗi "Đề số N" của một hạng luôn cho ra CÙNG bộ câu (như app thi thật).
const hashSeed = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
function seededShuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Mode = 'learn' | 'exam' | 'critical';
type View = 'quiz' | 'classPicker' | 'dePicker';

const CATEGORIES = [
  { value: 'all', label: '📚 Tất cả các câu' },
  { value: 'kn', label: '📖 1. Khái niệm & quy tắc lý thuyết' },
  { value: 'vh', label: '🤝 2. Văn hoá & đạo đức' },
  { value: 'kt', label: '🛠️ 3. Kỹ thuật lái xe' },
  { value: 'ct', label: '⚙️ 4. Cấu tạo & sửa chữa' },
  { value: 'th', label: '🚸 5. Biển Báo' },
  { value: 'nv', label: '⚠️ 6. Tình huống giao thông' },
  { value: 'critical', label: '🔥 Câu điểm liệt' },
];

export default function DrivingQuiz({ items }: { items: DrivingQuestion[] }) {
  const Q = items;

  const [mode, setMode] = useState<Mode>('learn');
  const [view, setView] = useState<View>('quiz');
  const [category, setCategory] = useState('all');
  const [examClass, setExamClass] = useState<ExamClass | null>(null);
  const [examDe, setExamDe] = useState<number | null>(null);

  const [list, setList] = useState<DrivingQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [search, setSearch] = useState(''); // ô tìm kiếm câu (req #52/#53)

  // exam timer
  const [examStart, setExamStart] = useState<number | null>(null);
  const [examDuration, setExamDuration] = useState(0);
  const [remainMs, setRemainMs] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Dựng 1 đề cố định cho hạng `cls`, số đề `deIdx` (1..15).
  const buildDe = useCallback(
    (cls: ExamClass, deIdx: number) => {
      const rnd = mulberry32(hashSeed(cls.id + ':de' + deIdx));
      const crit = Q.filter((q) => q.c);
      const norm = Q.filter((q) => !q.c);
      const nc = Math.min(cls.crit, crit.length);
      const ex = [
        ...seededShuffle(crit, rnd).slice(0, nc),
        ...seededShuffle(norm, rnd).slice(0, Math.max(0, cls.n - nc)),
      ];
      return seededShuffle(ex, rnd);
    },
    [Q],
  );

  const pickQuestions = useCallback(
    (m: Mode, cat: string, cls: ExamClass | null, de: number | null): DrivingQuestion[] => {
      if (m === 'critical') return Q.filter((q) => q.c);
      if (m === 'exam') {
        const c = cls || ({ id: 'B', n: 25, crit: 1 } as ExamClass);
        if (de) return buildDe(c, de); // đã chọn đề cố định
        const crit = Q.filter((q) => q.c);
        const norm = Q.filter((q) => !q.c);
        const pickN = (arr: DrivingQuestion[], n: number) =>
          arr.slice().sort(() => Math.random() - 0.5).slice(0, n);
        const nc = Math.min(c.crit, crit.length);
        const ex = [...pickN(crit, nc), ...pickN(norm, Math.max(0, c.n - nc))];
        return ex.sort(() => Math.random() - 0.5);
      }
      // learn: lọc theo nhóm chủ đề đang chọn ở dropdown
      if (cat === 'all') return [...Q];
      if (cat === 'critical') return Q.filter((q) => q.c);
      return Q.filter((q) => groupOf(q.t) === cat);
    },
    [Q, buildDe],
  );

  // Bắt đầu 1 phiên (setMode gốc): dựng list + reset trạng thái.
  const startMode = useCallback(
    (m: Mode, cat: string, cls: ExamClass | null, de: number | null) => {
      const nextList = pickQuestions(m, cat, cls, de);
      setMode(m);
      setView('quiz');
      setCategory(cat);
      setExamClass(cls);
      setExamDe(de);
      setList(nextList);
      setIdx(0);
      setAnswered({});
      setShowSummary(false);
      if (m === 'exam') {
        const dur = (cls ? cls.min : 22) * 60 * 1000;
        setExamStart(Date.now());
        setExamDuration(dur);
        setRemainMs(dur);
      } else {
        setExamStart(null);
      }
    },
    [pickQuestions],
  );

  // Khởi tạo giống trang gốc: ?mode=exam (chọn hạng) | ?mode=critical | learn.
  const inited = useRef(false);
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    const _m = new URLSearchParams(window.location.search).get('mode');
    if (_m === 'exam') {
      enterExamPicker();
    } else {
      startMode(_m === 'critical' ? 'critical' : 'learn', 'all', null, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitExam = useCallback(() => {
    setShowSummary(true);
    setExamStart(null);
  }, []);

  // Đồng hồ đếm ngược khi thi.
  useEffect(() => {
    if (examStart === null || showSummary) return;
    const tick = () => {
      const remain = examDuration - (Date.now() - examStart);
      if (remain <= 0) {
        setRemainMs(0);
        submitExam();
        return;
      }
      setRemainMs(remain);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [examStart, examDuration, showSummary, submitExam]);

  // ── Điều hướng màn chọn ─────────────────────────────────────────────
  const enterExamPicker = useCallback(() => {
    setMode('exam');
    setExamClass(null);
    setExamDe(null);
    setShowSummary(false);
    setExamStart(null);
    setView('classPicker');
  }, []);

  const enterDePicker = useCallback((cls: ExamClass) => {
    setMode('exam');
    setExamClass(cls);
    setExamDe(null);
    setShowSummary(false);
    setExamStart(null);
    setView('dePicker');
  }, []);

  // ── Thống kê / kết quả ──────────────────────────────────────────────
  const stats = useMemo(() => {
    let r = 0,
      w = 0;
    for (const [i, ans] of Object.entries(answered)) {
      if (ans === list[+i]?.a) r++;
      else w++;
    }
    return { r, w };
  }, [answered, list]);

  const examResult = useMemo(() => {
    let right = 0,
      critWrong = 0;
    for (const [i, ans] of Object.entries(answered)) {
      const q = list[+i];
      if (!q) continue;
      if (ans === q.a) right++;
      else if (q.c) critWrong++;
    }
    const total = list.length;
    const need = examClass ? examClass.pass : 21;
    const passByScore = right >= need;
    const pass = passByScore && critWrong === 0;
    return { right, critWrong, total, need, passByScore, pass };
  }, [answered, list, examClass]);

  const current = list[idx];

  // ── Render helpers ──────────────────────────────────────────────────
  const timerText = useMemo(() => {
    const m = String(Math.floor(remainMs / 60000)).padStart(2, '0');
    const s = String(Math.floor((remainMs % 60000) / 1000)).padStart(2, '0');
    return `${m}:${s}`;
  }, [remainMs]);

  const showFeedback = mode !== 'exam' && current && answered[idx] !== undefined;

  return (
    <div style={S.wrap}>
      <style>{scopedCss}</style>

      <h1 style={S.h1}>🚦 Lý thuyết Lái xe ô tô — Luật giao thông đường bộ</h1>
      <p style={{ margin: '-8px 0 8px', fontSize: 14 }}>
        Cần tra cứu chi tiết từng biển?{' '}
        <Link href="/tra-cuu-bien-bao-gplx" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          📚 Danh mục 235 biển báo (kèm mức phạt) →
        </Link>
      </p>

      {/* Toolbar chế độ */}
      <div style={S.toolbar}>
        <button
          className={'lgt-btn' + (mode === 'learn' && view === 'quiz' ? ' active' : '')}
          onClick={() => startMode('learn', 'all', null, null)}
        >
          📖 Luyện tập
        </button>
        <button
          className={'lgt-btn' + (mode === 'exam' ? ' active' : '')}
          onClick={() => enterExamPicker()}
        >
          📝 Thi sát hạch theo hạng
        </button>
        <button
          className={'lgt-btn' + (mode === 'critical' ? ' active' : '')}
          onClick={() => startMode('critical', 'all', null, null)}
        >
          ⚠️ Chỉ câu liệt
        </button>
      </div>

      {/* Dropdown chủ đề — ẩn khi thi */}
      {mode !== 'exam' && (
        <div style={S.toolbar}>
          <label style={S.label} htmlFor="catSelect">
            📂 Chủ đề:
          </label>
          <select
            id="catSelect"
            className="lgt-select"
            value={mode === 'critical' ? 'critical' : category}
            onChange={(e) => startMode('learn', e.target.value, null, null)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Màn chọn hạng bằng (req #21) */}
      {view === 'classPicker' && (
        <div style={{ width: '100%', maxWidth: 900 }}>
          <h2 style={S.pickerH2}>🚗 Chọn hạng bằng để bắt đầu thi sát hạch</h2>
          <p style={S.pickerNote}>
            Từ 01/01/2025 (Luật TTATGT 2024): hạng <b>B1, B2 cũ</b> gộp thành hạng <b>B</b> (ô tô đến
            8 chỗ). Mỗi hạng bốc <b>đề ngẫu nhiên</b> từ ngân hàng câu hỏi, có ít nhất 1 câu điểm
            liệt.
          </p>
          <div className="lgt-clsGrid">
            {EXAM_CLASSES.map((c, i) => (
              <button key={c.id} className="lgt-cls" onClick={() => enterDePicker(EXAM_CLASSES[i])}>
                {c.up ? <span className="up">NÂNG HẠNG</span> : null}
                <div className="ic">{c.ic}</div>
                <div className="nm">Hạng {c.id}</div>
                <div className="meta">
                  <span>❓ {c.n} câu</span>
                  <span>⏱ {c.min} phút</span>
                </div>
                <div className="desc">{c.desc}</div>
                <div className="badges">
                  <span className="pass">
                    🏆 Đậu: {c.pass}/{c.n}
                  </span>
                  <span className="crit">⚠️ {c.crit} câu điểm liệt</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Màn chọn 15 đề (req #35) */}
      {view === 'dePicker' && examClass && (
        <div style={{ width: '100%', maxWidth: 900 }}>
          <h2 style={S.pickerH2}>📑 Chọn đề thi — Hạng {examClass.id}</h2>
          <p style={S.pickerNote}>
            <b>15 đề thi ngẫu nhiên</b> được tạo cố định cho hạng này — mỗi đề{' '}
            {examClass.n} câu · {examClass.min} phút · đậu {examClass.pass}/{examClass.n}, có câu điểm
            liệt. Bấm vào một đề để vào thi.
          </p>
          <div className="lgt-deGrid">
            {Array.from({ length: NUM_DE }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className="lgt-de"
                onClick={() => startMode('exam', 'all', examClass, n)}
              >
                <div className="dn">Đề số {n}</div>
                <div className="dm">
                  {examClass.n} câu · {examClass.min}&apos;
                </div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button className="lgt-lnkbtn" onClick={() => enterExamPicker()}>
              ← Chọn hạng bằng khác
            </button>
          </div>
        </div>
      )}

      {/* Khu thi/luyện */}
      {view === 'quiz' && !showSummary && (
        <>
          {list.length === 0 ? (
            <div className="lgt-empty">
              📭 Mục «
              {CATEGORIES.find((c) => c.value === (mode === 'critical' ? 'critical' : category))
                ?.label || category}
              » hiện chưa có câu hỏi.
            </div>
          ) : (
            <div className="lgt-practiceWrap">
              {mode !== 'exam' && (
                <aside className="lgt-sidebar">
                  <div className="lgt-sbTitle">🔍 Tìm kiếm câu hỏi</div>
                  <input
                    className="lgt-search"
                    placeholder="Nhập nội dung câu hỏi…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="lgt-sbHead">
                    <span className="lgt-sbTitle">Danh sách câu hỏi</span>
                    <button className="lgt-sbReset" onClick={() => setAnswered({})}>
                      Xoá điểm
                    </button>
                  </div>
                  <div className="lgt-qGrid">
                    {list.map((qq, i) => {
                      const term = search.trim().toLowerCase();
                      if (term && !qq.q.toLowerCase().includes(term)) return null;
                      const c =
                        'lgt-qn' +
                        (i === idx ? ' cur' : '') +
                        (answered[i] !== undefined ? ' done' : '');
                      return (
                        <button key={i} className={c} onClick={() => setIdx(i)}>
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                  {search.trim() &&
                    !list.some((qq) =>
                      qq.q.toLowerCase().includes(search.trim().toLowerCase()),
                    ) && <div className="lgt-sbEmpty">Không thấy câu khớp.</div>}
                  <button className="lgt-sbExam" onClick={() => enterExamPicker()}>
                    🕐 Thi thử theo hạng
                  </button>
                </aside>
              )}
              <div className="lgt-mainCol">
              <div style={S.stats}>
                <span>
                  Câu <b style={S.statB}>{idx + 1}</b>/<b style={S.statB}>{list.length}</b>
                </span>
                <span>
                  Đúng: <b style={S.statB}>{stats.r}</b>
                </span>
                <span>
                  Sai: <b style={S.statB}>{stats.w}</b>
                </span>
                {mode === 'exam' && (
                  <span>
                    ⏱ <b style={S.statB}>{timerText}</b>
                  </span>
                )}
              </div>

              {current && (
                <div className="lgt-qcard">
                  <div className="lgt-qhead">
                    <span className="badge normal">{current.t}</span>
                    {current.c && <span className="badge">⚠️ CÂU LIỆT</span>}
                  </div>
                  <div className="lgt-qtext">{current.q}</div>
                  {current.img ? (
                    <div className="lgt-qimg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={current.img} alt="Hình minh hoạ câu hỏi" loading="lazy" />
                    </div>
                  ) : current.imgTodo ? (
                    <div className="lgt-qimg">
                      <span className="todo">🖼️ Hình minh hoạ đang được bổ sung</span>
                    </div>
                  ) : null}
                  <div className="lgt-opts">
                    {current.o.map((opt, i) => {
                      let cls = 'lgt-opt';
                      if (showFeedback) {
                        if (i === current.a) cls += ' correct';
                        else if (i === answered[idx]) cls += ' wrong';
                      }
                      return (
                        <label key={i} className={cls}>
                          <input
                            type="radio"
                            name="ans"
                            value={i}
                            checked={answered[idx] === i}
                            onChange={() => setAnswered((prev) => ({ ...prev, [idx]: i }))}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                  {showFeedback && (
                    <div
                      className={
                        'lgt-feedback show ' + (answered[idx] === current.a ? 'right' : 'wrong')
                      }
                    >
                      {(answered[idx] === current.a ? '✅ Đúng. ' : '❌ Sai. ') + current.ex}
                    </div>
                  )}
                </div>
              )}

              <div className="lgt-nav">
                <button className="lgt-navbtn" onClick={() => idx > 0 && setIdx(idx - 1)}>
                  ← Câu trước
                </button>
                <button
                  className="lgt-navbtn primary"
                  onClick={() => idx < list.length - 1 && setIdx(idx + 1)}
                >
                  Câu sau →
                </button>
                {mode === 'exam' && (
                  <button className="lgt-navbtn" onClick={submitExam}>
                    🏁 Nộp bài
                  </button>
                )}
              </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Kết quả thi */}
      {showSummary && (
        <div className="lgt-summary show">
          <h2 style={{ margin: '0 0 4px' }}>{examResult.pass ? '🎉 ĐẠT' : '❌ TRƯỢT'}</h2>
          <div className={'big ' + (examResult.pass ? 'pass' : 'fail')}>
            {examResult.right}/{examResult.total}
          </div>
          <div style={{ color: 'var(--lgt-muted)', lineHeight: 1.6 }}>
            {examClass && (
              <>
                Hạng <b>{examClass.id}</b>
                {examDe ? (
                  <>
                    {' '}
                    · Đề số <b>{examDe}</b>
                  </>
                ) : null}{' '}
                · cần đạt{' '}
                <b>
                  {examResult.need}/{examResult.total}
                </b>
                <br />
              </>
            )}
            Đúng: <b>{examResult.right}</b> · Sai: <b>{examResult.total - examResult.right}</b>
            <br />
            Câu liệt sai:{' '}
            <b style={{ color: examResult.critWrong ? 'var(--lgt-red)' : 'var(--lgt-green)' }}>
              {examResult.critWrong}
            </b>
            <br />
            {!examResult.passByScore && (
              <span style={{ color: 'var(--lgt-red)' }}>
                → Chưa đủ {examResult.need}/{examResult.total} câu
                <br />
              </span>
            )}
            {examResult.critWrong > 0 && (
              <span style={{ color: 'var(--lgt-red)' }}>→ Sai câu LIỆT — tự động trượt</span>
            )}
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {examDe ? (
              <>
                <button
                  className="lgt-lnkbtn primary"
                  onClick={() => startMode('exam', 'all', examClass, examDe)}
                >
                  🔄 Thi lại Đề {examDe}
                </button>
                <button
                  className="lgt-lnkbtn"
                  onClick={() => examClass && enterDePicker(examClass)}
                >
                  📑 Đề khác
                </button>
              </>
            ) : (
              <button
                className="lgt-lnkbtn primary"
                onClick={() => startMode('exam', 'all', examClass, examDe)}
              >
                Làm lại
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Style: giữ thương hiệu đỏ + nền tối gradient của trang gốc (scoped) ──
const S: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    padding: '18px 0',
  },
  h1: { margin: 0, fontSize: 22, textAlign: 'center' },
  toolbar: { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  label: { alignSelf: 'center', color: 'var(--lgt-muted)', fontSize: 13 },
  stats: {
    display: 'flex',
    gap: 18,
    fontSize: 13,
    color: 'var(--lgt-muted)',
    maxWidth: 760,
    width: '100%',
    justifyContent: 'center',
  },
  statB: { color: 'var(--lgt-text)', fontSize: 15 },
  pickerH2: { textAlign: 'center', fontSize: 18, margin: '4px 0 14px' },
  pickerNote: {
    textAlign: 'center',
    color: 'var(--lgt-muted)',
    fontSize: 12.5,
    maxWidth: 680,
    margin: '0 auto 14px',
    lineHeight: 1.5,
  },
};

const scopedCss = `
  :root {
    --lgt-card: rgba(255,255,255,.06); --lgt-red:#dc2626; --lgt-green:#10b981;
    --lgt-text:#e5edf7; --lgt-muted:#94a3b8; --lgt-border:rgba(255,255,255,.12);
  }
  .lgt-btn { font-family:inherit; background:var(--lgt-card); color:var(--lgt-text);
    border:1px solid var(--lgt-border); padding:8px 16px; border-radius:9px; font-size:13px; cursor:pointer; }
  .lgt-btn.active { background:var(--lgt-red); border-color:var(--lgt-red); font-weight:700; }
  .lgt-select { font-family:inherit; background:var(--lgt-card); color:var(--lgt-text); border:1px solid var(--lgt-border);
    padding:8px 12px; border-radius:9px; font-size:13px; cursor:pointer; max-width:min(92vw,420px); }
  .lgt-select option { background:#1a1a2e; color:var(--lgt-text); }
  .lgt-empty { width:100%; max-width:760px; background:var(--lgt-card); border:1px solid var(--lgt-border);
    border-radius:14px; padding:34px 22px; text-align:center; color:var(--lgt-muted); font-size:14px; line-height:1.7; }
  .lgt-qcard { width:100%; max-width:760px; background:var(--lgt-card); border:1px solid var(--lgt-border);
    border-radius:14px; padding:22px; }
  .lgt-qhead { display:flex; align-items:center; gap:10px; margin-bottom:12px; font-size:13px; color:var(--lgt-muted); }
  .lgt-qhead .badge { background:rgba(220,38,38,.18); border:1px solid var(--lgt-red); color:#fca5a5;
    padding:3px 9px; border-radius:5px; font-size:11px; font-weight:700; letter-spacing:.4px; }
  .lgt-qhead .badge.normal { background:rgba(255,255,255,.06); border-color:var(--lgt-border); color:var(--lgt-muted); }
  .lgt-qtext { font-size:17px; line-height:1.55; margin-bottom:18px; font-weight:600; }
  .lgt-opts { display:grid; gap:10px; }
  .lgt-opt { display:flex; gap:12px; padding:14px 16px; background:rgba(0,0,0,.2); border:1px solid var(--lgt-border);
    border-radius:10px; cursor:pointer; transition:background .15s, border-color .15s; }
  .lgt-opt:hover { background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.2); }
  .lgt-opt input { margin-top:3px; }
  .lgt-opt.correct { background:rgba(16,185,129,.12); border-color:rgba(16,185,129,.5); }
  .lgt-opt.wrong { background:rgba(220,38,38,.12); border-color:rgba(220,38,38,.5); }
  .lgt-feedback { margin-top:14px; padding:12px 16px; border-radius:9px; font-size:14px; line-height:1.55; }
  .lgt-feedback.right { background:rgba(16,185,129,.1); border:1px solid rgba(16,185,129,.3); color:#6ee7b7; }
  .lgt-feedback.wrong { background:rgba(220,38,38,.1); border:1px solid rgba(220,38,38,.3); color:#fca5a5; }
  .lgt-nav { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; max-width:760px; width:100%; }
  .lgt-navbtn { font-family:inherit; padding:10px 22px; border-radius:10px; border:1px solid var(--lgt-border);
    background:var(--lgt-card); color:var(--lgt-text); cursor:pointer; font-size:13.5px; font-weight:600; }
  .lgt-navbtn.primary { background:var(--lgt-red); border:0; color:white; }
  .lgt-summary { background:var(--lgt-card); border:1px solid var(--lgt-border); border-radius:14px;
    padding:24px; max-width:760px; width:100%; text-align:center; }
  .lgt-summary .big { font-size:56px; font-weight:800; margin:8px 0; }
  .lgt-summary .pass { color:var(--lgt-green); }
  .lgt-summary .fail { color:var(--lgt-red); }
  .lgt-clsGrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:12px; }
  .lgt-cls { background:var(--lgt-card); border:1px solid var(--lgt-border); border-radius:14px; padding:16px 14px;
    cursor:pointer; transition:.15s; position:relative; text-align:center; color:var(--lgt-text); font-family:inherit; }
  .lgt-cls:hover { border-color:var(--lgt-red); transform:translateY(-2px); background:rgba(220,38,38,.06); }
  .lgt-cls .ic { font-size:30px; line-height:1; }
  .lgt-cls .nm { font-weight:800; font-size:17px; margin:5px 0 3px; }
  .lgt-cls .meta { color:var(--lgt-muted); font-size:12.5px; display:flex; gap:12px; justify-content:center; }
  .lgt-cls .desc { font-size:12px; color:var(--lgt-muted); background:rgba(255,255,255,.04); border-radius:8px;
    padding:6px 8px; margin:9px 0; min-height:46px; display:flex; align-items:center; justify-content:center; line-height:1.4; }
  .lgt-cls .badges { display:flex; gap:5px; justify-content:center; flex-wrap:wrap; }
  .lgt-cls .pass { font-size:11px; color:#6ee7b7; background:rgba(16,185,129,.12); border:1px solid rgba(16,185,129,.3); border-radius:7px; padding:3px 7px; }
  .lgt-cls .crit { font-size:11px; color:#fca5a5; background:rgba(220,38,38,.12); border:1px solid rgba(220,38,38,.3); border-radius:7px; padding:3px 7px; }
  .lgt-cls .up { position:absolute; top:8px; right:8px; font-size:9px; letter-spacing:.5px; color:var(--lgt-muted); border:1px solid var(--lgt-border); border-radius:6px; padding:2px 6px; }
  .lgt-deGrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(132px,1fr)); gap:11px; }
  .lgt-de { background:var(--lgt-card); border:1px solid var(--lgt-border); border-radius:12px; padding:14px 10px;
    cursor:pointer; text-align:center; transition:.15s; color:var(--lgt-text); font-family:inherit; }
  .lgt-de:hover { border-color:var(--lgt-red); transform:translateY(-2px); background:rgba(220,38,38,.06); }
  .lgt-de .dn { font-weight:800; font-size:16px; }
  .lgt-de .dm { color:var(--lgt-muted); font-size:11.5px; margin-top:4px; }
  .lgt-lnkbtn { font-family:inherit; background:var(--lgt-card); color:var(--lgt-text); border:1px solid var(--lgt-border);
    padding:10px 22px; border-radius:10px; font-size:13px; cursor:pointer; }
  .lgt-lnkbtn.primary { background:var(--lgt-red); border:0; color:#fff; font-weight:700; }

  /* Ảnh minh hoạ câu hỏi (req #54) */
  .lgt-qimg { margin:0 0 16px; }
  .lgt-qimg img { max-width:min(320px,80%); border-radius:10px; background:#fff; padding:8px; display:block; }
  .lgt-qimg .todo { font-size:12.5px; color:#fbbf24; background:rgba(251,191,36,.1);
    border:1px dashed rgba(251,191,36,.4); border-radius:9px; padding:8px 12px; display:inline-block; }

  /* Sidebar: tìm kiếm + danh sách câu (req #52/#53) */
  .lgt-practiceWrap { display:flex; gap:18px; width:100%; max-width:1120px; justify-content:center; align-items:flex-start; }
  .lgt-mainCol { flex:1 1 760px; max-width:760px; min-width:0; display:flex; flex-direction:column; align-items:center; gap:16px; }
  .lgt-sidebar { flex:0 0 250px; width:250px; background:var(--lgt-card); border:1px solid var(--lgt-border);
    border-radius:14px; padding:16px; position:sticky; top:18px; align-self:flex-start; }
  .lgt-sidebar .lgt-sbTitle { font-size:13.5px; font-weight:700; color:var(--lgt-text); }
  .lgt-search { width:100%; margin-top:9px; font-family:inherit; background:rgba(0,0,0,.25);
    border:1px solid var(--lgt-border); color:var(--lgt-text); border-radius:9px; padding:9px 11px; font-size:13px; }
  .lgt-search::placeholder { color:var(--lgt-muted); }
  .lgt-sbHead { display:flex; justify-content:space-between; align-items:center; margin:16px 0 10px; }
  .lgt-sbReset { font-family:inherit; font-size:11px; font-weight:700; color:#fca5a5; background:rgba(220,38,38,.14);
    border:1px solid rgba(220,38,38,.3); border-radius:7px; padding:4px 9px; cursor:pointer; }
  .lgt-qGrid { display:grid; grid-template-columns:repeat(5,1fr); gap:7px; max-height:340px; overflow-y:auto; padding-right:2px; }
  .lgt-qn { font-family:inherit; aspect-ratio:1; border:1px solid var(--lgt-border); background:rgba(0,0,0,.2);
    color:var(--lgt-text); border-radius:8px; cursor:pointer; font-size:12.5px; font-weight:600; padding:0; transition:.12s; }
  .lgt-qn:hover { border-color:var(--lgt-red); }
  .lgt-qn.cur { background:#fbbf24; color:#1a1a2e; border-color:#fbbf24; font-weight:800; }
  .lgt-qn.done { border-color:rgba(16,185,129,.55); color:#6ee7b7; }
  .lgt-sbEmpty { color:var(--lgt-muted); font-size:12.5px; text-align:center; padding:14px 4px; }
  .lgt-sbExam { width:100%; margin-top:14px; font-family:inherit; background:var(--lgt-red); color:#fff; border:0;
    border-radius:10px; padding:11px; font-weight:700; font-size:13px; cursor:pointer; }
  @media (max-width:860px) {
    .lgt-practiceWrap { flex-direction:column; align-items:center; }
    .lgt-sidebar { width:100%; max-width:760px; position:static; order:2; }
    .lgt-qGrid { max-height:200px; grid-template-columns:repeat(8,1fr); }
  }
`;
