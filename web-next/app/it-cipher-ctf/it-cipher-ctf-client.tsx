'use client';

// ============================================================
// Mật mã & CTF — bàn làm việc mã cổ điển + thử thách bắt cờ (port từ
// public/it-cipher-ctf.html). KHÔNG có API: mọi thứ tính local.
//   • Bàn Caesar: mã hoá/giải mã, kéo độ dịch 0-25, phân tích tần suất chữ cái.
//   • CTF: 3 cờ (Caesar +3, Caesar ẩn độ dịch, Atbash) — bản mã TỰ SINH từ bản
//     rõ bằng chính thuật toán để tránh sai sót. Nhập bản rõ (chuẩn hoá bỏ dấu,
//     không phân biệt hoa thường) để bắt cờ. Tiến độ lưu localStorage.
//
// Thuật toán mã Caesar/Atbash + 3 thử thách CTF là CƠ CHẾ TRÒ CHƠI (procedural,
// giống bài toán tự sinh của Bão Số Học), KHÔNG phải content nghiệp vụ trong DB
// → giữ nguyên trong code như trang gốc, không có API/endpoint tương ứng.
//
// Thao tác DOM trang vanilla chuyển sang React state + refs. Theme phòng lab mật
// mã (nền tối đỏ, mono, ô mã đỏ hồng) là bản sắc riêng của trang → dùng CSS scoped
// (styled-jsx) với hex gốc, ghi rõ ở risks.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ── thuật toán mã hoá cổ điển (giữ nguyên trang gốc) ──
function caesar(s: string, k: number): string {
  k = ((k % 26) + 26) % 26;
  return s.replace(/[a-z]/gi, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + k) % 26) + base);
  });
}
function atbash(s: string): string {
  return s.replace(/[a-z]/gi, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(base + 25 - (c.charCodeAt(0) - base));
  });
}
const norm = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, '');

type Mode = 'enc' | 'dec';

type Challenge = {
  id: string;
  lv: string;
  type: 'caesar' | 'atbash';
  k?: number;
  plain: string;
  hint: string;
};

const CH: Challenge[] = [
  { id: 'c1', lv: 'Caesar +3', type: 'caesar', k: 3, plain: 'MAT KHAU', hint: 'Mã Caesar dịch +3. Bật chế độ “Giải mã”, đặt độ dịch 3.' },
  { id: 'c2', lv: 'Caesar (ẩn độ dịch)', type: 'caesar', k: 11, plain: 'BAO MAT THONG TIN', hint: 'Không biết độ dịch — kéo thử 25 khả năng hoặc dùng phân tích tần suất.' },
  { id: 'c3', lv: 'Atbash', type: 'atbash', plain: 'CRYPTO', hint: 'Mã Atbash đối xứng bảng chữ: A↔Z, B↔Y, C↔X… Tự nghịch đảo (mã hoá lại = giải mã).' },
];

function cipherOf(ch: Challenge): string {
  return ch.type === 'atbash' ? atbash(ch.plain) : caesar(ch.plain, ch.k ?? 0);
}

const DONE_KEY = 'tizia:it:cipher:solved';

export default function CipherCtfClient() {
  // ── domain cho link quay lại (giống trang gốc đọc ?domain=it) ──
  const [domain, setDomain] = useState('it');

  // ── bàn làm việc Caesar ──
  const [mode, setMode] = useState<Mode>('enc');
  const [inp, setInp] = useState('AN TOAN THONG TIN');
  const [shift, setShift] = useState(3);
  const out = useMemo(() => caesar(inp, mode === 'enc' ? shift : -shift), [inp, mode, shift]);

  // ── phân tích tần suất ──
  const [showFreq, setShowFreq] = useState(false);
  const freq = useMemo(() => {
    const text = norm(inp);
    const cnt: Record<string, number> = {};
    for (const c of text) cnt[c] = (cnt[c] || 0) + 1;
    const arr = Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const max = arr.length ? arr[0][1] : 1;
    return { arr, max };
  }, [inp]);

  // ── thử thách CTF ──
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [attempts, setAttempts] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { ok: boolean; text: string }>>({});
  const [hintsOpen, setHintsOpen] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Khôi phục tiến độ + đọc query string sau khi mount (tránh SSR mismatch).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDomain(params.get('domain') || 'it');
    try {
      const raw = localStorage.getItem(DONE_KEY);
      if (raw) setSolved(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* bỏ qua */
    }
    // Chế độ demo ?auto=1: nạp ví dụ giải mã KHOOR ZRUOG (HELLO WORLD, dịch 3).
    if (params.get('auto') === '1') {
      setInp('KHOOR ZRUOG');
      setShift(3);
      setMode('dec');
    }
  }, []);

  const showToast = useCallback((m: string) => {
    setToast(m);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const check = useCallback(
    (id: string) => {
      const ch = CH.find((c) => c.id === id);
      if (!ch) return;
      const val = attempts[id] || '';
      const ok = norm(val) === norm(ch.plain);
      if (ok) {
        setFeedback((f) => ({ ...f, [id]: { ok: true, text: `✓ Chính xác! Bản rõ là “${ch.plain}”.` } }));
        if (!solved.has(id)) {
          const next = new Set(solved);
          next.add(id);
          setSolved(next);
          try {
            localStorage.setItem(DONE_KEY, JSON.stringify([...next]));
          } catch {
            /* bỏ qua */
          }
          // Đồng bộ tiến độ phòng lab an ninh cho bản đồ khuôn viên (giống trang gốc).
          try {
            const k = 'tizia:space:done';
            const d = JSON.parse(localStorage.getItem(k) || '{}') as Record<string, number>;
            d.seclab = Math.max(d.seclab || 0, next.size);
            localStorage.setItem(k, JSON.stringify(d));
          } catch {
            /* bỏ qua */
          }
          showToast(next.size === CH.length ? '🏆 Bắt đủ 3 cờ — CTF hoàn thành!' : '🚩 Bắt được cờ!');
        }
      } else {
        setFeedback((f) => ({
          ...f,
          [id]: { ok: false, text: '✗ Chưa đúng. Thử đổi độ dịch hoặc phân tích tần suất rồi giải lại.' },
        }));
      }
    },
    [attempts, solved, showToast],
  );

  const backHref = `/school?domain=${encodeURIComponent(domain)}#campus-hero`;

  return (
    <div className="cipher-root">
      <div className="top">
        <a className="back" href={backHref}>
          ← Khuôn viên trường
        </a>
        <div>
          <h1>
            🔒 Mật mã &amp; CTF <span className="sub">— mã hoá cổ điển &amp; giải cờ phòng thủ</span>
          </h1>
        </div>
        <div className="prog">{solved.size}/{CH.length} cờ</div>
      </div>

      <div className="wrap">
        {/* ── Bàn làm việc Caesar ── */}
        <div className="card">
          <h2>🧰 Bàn làm việc mật mã Caesar</h2>
          <p className="lead">
            Mã Caesar dịch mỗi chữ cái đi một số bước cố định trong bảng chữ. Đây là mã cổ điển — học để{' '}
            <b>hiểu nguyên lí &amp; điểm yếu</b>, không dùng để bảo mật thật (rất dễ phá bằng thử 25 khả năng).
          </p>
          <div className="modes">
            <button className={mode === 'enc' ? 'active' : ''} onClick={() => setMode('enc')}>
              Mã hoá →
            </button>
            <button className={mode === 'dec' ? 'active' : ''} onClick={() => setMode('dec')}>
              ← Giải mã
            </button>
          </div>
          <label className="fld">{mode === 'enc' ? 'Bản rõ (văn bản gốc)' : 'Bản mã (cần giải)'}</label>
          <textarea
            value={inp}
            spellCheck={false}
            autoCapitalize="characters"
            onChange={(e) => setInp(e.target.value)}
          />
          <div className="shiftrow">
            <span>Độ dịch</span>
            <input
              type="range"
              min={0}
              max={25}
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value, 10))}
            />
            <span className="k">
              {(mode === 'enc' ? '+' : '−') + shift}
            </span>
          </div>
          <label className="fld">{mode === 'enc' ? 'Bản mã (kết quả)' : 'Bản rõ (giải ra)'}</label>
          <textarea id="out" value={out} readOnly />
          <div style={{ marginTop: 10 }}>
            <button className="btn ghost" onClick={() => setShowFreq(true)}>
              📊 Phân tích tần suất chữ cái
            </button>
          </div>
          {showFreq && (
            <div className="freq show">
              {freq.arr.length === 0 ? (
                <div className="note">Chưa có chữ cái để phân tích.</div>
              ) : (
                <>
                  {freq.arr.map(([c, n]) => (
                    <div className="bar" key={c}>
                      <span>{c}</span>
                      <span className="fill" style={{ width: `${Math.round((n / freq.max) * 100)}%` }} />
                      <span>{n}</span>
                    </div>
                  ))}
                  <div className="note">
                    Mẹo: trong văn bản tiếng Anh, chữ phổ biến nhất thường là <b>E, T, A, O</b>. So khớp chữ hay gặp
                    nhất ở bản mã với <b>E</b> để đoán độ dịch của mã Caesar.
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Thử thách CTF ── */}
        <div className="card">
          <h2>🚩 Thử thách giải cờ (Capture The Flag)</h2>
          <p className="lead">
            Giải mã từng đoạn dưới đây rồi nhập <b>bản rõ</b> (không dấu, không phân biệt hoa thường) để bắt cờ. Dùng
            bàn làm việc ở trên để thử.
          </p>
          <div>
            {CH.map((ch, i) => {
              const fb = feedback[ch.id];
              return (
                <div className={`ch ${solved.has(ch.id) ? 'solved' : ''}`} key={ch.id}>
                  <div className="htxt">
                    Cờ {i + 1}
                    <span className="lv">{ch.lv}</span>
                  </div>
                  <div className="cipher">{cipherOf(ch)}</div>
                  <div className="solverow">
                    <input
                      type="text"
                      placeholder="Nhập bản rõ đã giải…"
                      autoCapitalize="characters"
                      spellCheck={false}
                      value={attempts[ch.id] || ''}
                      onChange={(e) => setAttempts((a) => ({ ...a, [ch.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') check(ch.id);
                      }}
                    />
                    <button className="btn act" onClick={() => check(ch.id)}>
                      Bắt cờ
                    </button>
                    <button
                      className="btn ghost"
                      onClick={() => setHintsOpen((h) => new Set(h).add(ch.id))}
                    >
                      Gợi ý
                    </button>
                  </div>
                  {fb && <div className={`fb show ${fb.ok ? 'ok' : 'bad'}`}>{fb.text}</div>}
                  {hintsOpen.has(ch.id) && <div className="hint">{ch.hint}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {toast && <div className="toast show">{toast}</div>}

      <style jsx>{`
        .cipher-root {
          --accent: #ef4444;
          --card: rgba(255, 255, 255, 0.05);
          --border: rgba(255, 255, 255, 0.12);
          --ok: #22c55e;
          color: #e5edf7;
        }
        .cipher-root * {
          box-sizing: border-box;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          border-bottom: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.2);
          border-radius: 14px 14px 0 0;
        }
        .back {
          color: #fff;
          text-decoration: none;
          opacity: 0.85;
          font-size: 13.5px;
          background: rgba(255, 255, 255, 0.08);
          padding: 7px 12px;
          border-radius: 9px;
        }
        .back:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.16);
        }
        .top h1 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
        }
        .top .sub {
          font-size: 12.5px;
          opacity: 0.6;
          font-weight: 500;
        }
        .top .prog {
          margin-left: auto;
          font-size: 13px;
          font-weight: 700;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
          padding: 6px 12px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .wrap {
          margin: 0 auto;
          padding: 16px 0 40px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 15px 17px;
        }
        .card h2 {
          font-size: 15px;
          margin: 0 0 10px;
        }
        .card p.lead {
          font-size: 13px;
          opacity: 0.8;
          margin: 0 0 12px;
          line-height: 1.55;
        }
        .modes {
          display: flex;
          gap: 8px;
          margin-bottom: 11px;
        }
        .modes button {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border);
          color: #cbd5e1;
          font-size: 13px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 9px;
          cursor: pointer;
          font-family: inherit;
        }
        .modes button.active {
          background: rgba(239, 68, 68, 0.16);
          border-color: rgba(239, 68, 68, 0.5);
          color: #fecaca;
        }
        label.fld {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.55;
          display: block;
          margin: 8px 0 4px;
        }
        textarea,
        input[type='text'] {
          width: 100%;
          background: #0a0f1d;
          color: #fecdd3;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 11px 13px;
          font-family: 'SF Mono', ui-monospace, Menlo, monospace;
          font-size: 14px;
          line-height: 1.5;
          letter-spacing: 0.5px;
        }
        textarea {
          min-height: 64px;
          resize: vertical;
        }
        textarea:focus,
        input:focus {
          outline: 2px solid var(--accent);
          border-color: transparent;
        }
        textarea#out {
          color: #bbf7d0;
          background: #091509;
        }
        .shiftrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 12px 0 4px;
          font-size: 13px;
        }
        .shiftrow input[type='range'] {
          flex: 1;
          accent-color: var(--accent);
        }
        .shiftrow .k {
          font-family: ui-monospace, monospace;
          font-weight: 800;
          min-width: 54px;
          text-align: right;
          color: #fca5a5;
        }
        .btn {
          border: none;
          border-radius: 10px;
          font-weight: 800;
          font-size: 13px;
          padding: 9px 15px;
          cursor: pointer;
          font-family: inherit;
        }
        .btn.act {
          background: var(--accent);
          color: #3a0a0a;
        }
        .btn.act:hover {
          filter: brightness(1.1);
        }
        .btn.ghost {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .btn.ghost:hover {
          background: rgba(255, 255, 255, 0.16);
        }
        .freq {
          margin-top: 12px;
        }
        .freq .bar {
          display: grid;
          grid-template-columns: 20px 1fr 34px;
          align-items: center;
          gap: 8px;
          margin: 3px 0;
          font-family: ui-monospace, monospace;
          font-size: 12px;
        }
        .freq .bar .fill {
          height: 13px;
          background: linear-gradient(90deg, #ef4444, #f59e0b);
          border-radius: 3px;
        }
        .freq .note {
          font-size: 12px;
          opacity: 0.7;
          margin-top: 8px;
        }
        .ch {
          border-top: 1px solid var(--border);
          padding: 13px 0;
        }
        .ch:first-of-type {
          border-top: none;
        }
        .ch .htxt {
          font-weight: 700;
          font-size: 14px;
        }
        .ch .lv {
          font-size: 10px;
          opacity: 0.55;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-left: 6px;
        }
        .ch .cipher {
          font-family: ui-monospace, monospace;
          font-size: 15px;
          letter-spacing: 2px;
          color: #fca5a5;
          background: #0a0f1d;
          border: 1px dashed var(--border);
          border-radius: 8px;
          padding: 9px 12px;
          margin: 8px 0;
          word-break: break-all;
        }
        .ch .solverow {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .ch .solverow input {
          flex: 1;
          min-width: 180px;
        }
        .ch .fb {
          font-size: 12.5px;
          margin-top: 7px;
        }
        .ch .fb.ok {
          color: #86efac;
        }
        .ch .fb.bad {
          color: #fca5a5;
        }
        .ch .hint {
          font-size: 12px;
          opacity: 0.6;
          margin-top: 6px;
        }
        .ch.solved .htxt::before {
          content: '✓ ';
          color: var(--ok);
        }
        .toast {
          position: fixed;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%) translateY(0);
          background: var(--ok);
          color: #04210f;
          font-weight: 800;
          padding: 12px 22px;
          border-radius: 13px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          z-index: 20;
        }
      `}</style>
    </div>
  );
}
