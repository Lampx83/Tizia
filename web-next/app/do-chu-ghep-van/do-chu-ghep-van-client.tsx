'use client';

// ============================================================
// Đố Chữ Ghép Vần — ghép âm tiết Tiếng Việt (port từ public/do-chu-ghep-van.html).
// 3 cấp: easy (3-5 ký tự), medium (5-7), hard (7-10). Kéo/thả (hoặc bấm) chữ cái
// từ "bank" vào các ô trống để tạo từ đúng nghĩa được gợi ý. Đúng → +10 điểm,
// confetti, sync XP. Đủ điểm → lên cấp.
//
// Gate: mầm non (?domain=preschool hoặc grade N/0) → chuyển sang Ghép Chữ Cái
// (/ghep-chu-cai), game này cần biết đọc + đánh vần nên chưa hợp 3-5 tuổi.
//
// Thao tác DOM của trang vanilla được chuyển sang React state (slotChars, bank) +
// key re-render; hiệu ứng correct/wrong/confetti/level-up dùng state có id tự dọn.
// Bảng màu pastel (hồng/vàng) là bản sắc riêng của trang → giữ hex gốc trong
// styled-jsx scoped, ghi rõ ở risks.
//
// CONTENT: danh sách 60 từ + gợi ý nghĩa (WORDS) là VOCABULARY của game — giữ
// nguyên trong code như trang gốc vì CHƯA có API/endpoint DB cho từ vựng game này.
// Ghi rõ ở content_source/risks: nên đưa vào DB + tạo API sau.
// ============================================================

import { useCallback, useEffect, useRef, useState } from 'react';

type WordEntry = { w: string; m: string };
type Level = 1 | 2 | 3;

// Bank từ — 60 từ chia 3 cấp. Mỗi từ kèm gợi ý nghĩa. GIỮ NGUYÊN từ trang gốc.
const WORDS: Record<'easy' | 'medium' | 'hard', WordEntry[]> = {
  easy: [
    { w: 'mẹ', m: 'Người sinh ra em, yêu em nhất nhà.' },
    { w: 'cha', m: 'Người đàn ông trong gia đình, vai vế ngang mẹ.' },
    { w: 'bà', m: 'Mẹ của bố hoặc mẹ em.' },
    { w: 'ông', m: 'Bố của bố hoặc mẹ em.' },
    { w: 'cô', m: 'Người dạy em ở trường, là phụ nữ.' },
    { w: 'thầy', m: 'Người dạy em ở trường, là đàn ông.' },
    { w: 'nhà', m: 'Nơi em sống cùng gia đình.' },
    { w: 'sách', m: 'Vật để đọc, có nhiều trang giấy.' },
    { w: 'bút', m: 'Vật dùng để viết chữ.' },
    { w: 'vở', m: 'Quyển giấy trắng để em ghi bài.' },
    { w: 'cá', m: 'Loài vật bơi dưới nước.' },
    { w: 'gà', m: 'Con vật biết gáy ò ó o.' },
    { w: 'hoa', m: 'Bông đẹp nở trong vườn.' },
    { w: 'lá', m: 'Phần xanh trên cây.' },
    { w: 'mưa', m: 'Nước rơi từ trên trời xuống.' },
    { w: 'nắng', m: 'Ánh sáng từ mặt trời chiếu xuống.' },
    { w: 'gió', m: 'Thứ làm cờ bay phấp phới.' },
    { w: 'sao', m: 'Vì lấp lánh trên trời đêm.' },
    { w: 'cây', m: 'Vật to cao có lá xanh, mọc trong vườn.' },
    { w: 'núi', m: 'Khối đất đá rất cao, có đỉnh.' },
  ],
  medium: [
    { w: 'trường', m: 'Nơi em học bài mỗi ngày.' },
    { w: 'lớp', m: 'Phòng học của em ở trường.' },
    { w: 'bàn', m: 'Đồ dùng để em ngồi viết.' },
    { w: 'ghế', m: 'Đồ để em ngồi, có 4 chân.' },
    { w: 'biển', m: 'Vùng nước mặn rất rộng có sóng.' },
    { w: 'sông', m: 'Dòng nước chảy dài, có thuyền đi.' },
    { w: 'rừng', m: 'Nơi có rất nhiều cây mọc dày.' },
    { w: 'ruộng', m: 'Nơi nông dân trồng lúa.' },
    { w: 'vườn', m: 'Khu đất trồng rau và hoa quanh nhà.' },
    { w: 'chim', m: 'Con vật có cánh, biết hót và bay.' },
    { w: 'cánh', m: 'Bộ phận giúp chim bay.' },
    { w: 'trống', m: 'Nhạc cụ tròn, dùng dùi để đánh.' },
    { w: 'đường', m: 'Lối em đi từ nhà tới trường.' },
    { w: 'sạch', m: 'Trái nghĩa với bẩn.' },
    { w: 'xanh', m: 'Màu của lá và bầu trời.' },
    { w: 'thắng', m: 'Trái nghĩa với thua.' },
    { w: 'nước', m: 'Thứ em uống mỗi ngày.' },
    { w: 'mặt', m: 'Phần trước của đầu, có mắt mũi.' },
    { w: 'trời', m: 'Bầu khí quyển xanh trên cao.' },
    { w: 'đèn', m: 'Vật phát sáng khi tối.' },
  ],
  hard: [
    { w: 'cộng đồng', m: 'Tập thể nhiều người cùng sống chung.' },
    { w: 'di sản', m: 'Tài sản tổ tiên để lại, có giá trị lâu dài.' },
    { w: 'kháng chiến', m: 'Cuộc chiến đấu bảo vệ Tổ quốc.' },
    { w: 'biển đảo', m: 'Phần lãnh thổ ngoài khơi của đất nước.' },
    { w: 'thiên nhiên', m: 'Cây cối, núi sông, biển trời quanh ta.' },
    { w: 'tổ quốc', m: 'Đất nước nơi em sinh ra và lớn lên.' },
    { w: 'lịch sử', m: 'Câu chuyện về quá khứ của dân tộc.' },
    { w: 'truyền thống', m: 'Phong tục, tập quán cha ông để lại.' },
    { w: 'môi trường', m: 'Không khí, nước, đất xung quanh chúng ta.' },
    { w: 'gia đình', m: 'Tập hợp những người thân yêu sống chung nhà.' },
    { w: 'bác sĩ', m: 'Người chữa bệnh trong bệnh viện.' },
    { w: 'kỹ sư', m: 'Người thiết kế máy móc, cầu đường.' },
    { w: 'thư viện', m: 'Nơi mượn sách để đọc.' },
    { w: 'bệnh viện', m: 'Nơi chữa bệnh cho mọi người.' },
    { w: 'công viên', m: 'Nơi có cây xanh, ghế đá để dạo chơi.' },
    { w: 'âm nhạc', m: 'Tiếng đàn, tiếng hát hay làm em vui.' },
    { w: 'thể thao', m: 'Hoạt động vận động giúp khoẻ mạnh.' },
    { w: 'học sinh', m: 'Em ngồi học trong lớp gọi là gì?' },
    { w: 'giáo viên', m: 'Người đứng lớp giảng bài.' },
    { w: 'tự hào', m: 'Cảm xúc khi đạt được điều tốt đẹp.' },
  ],
};

const LEVEL_NAMES: Record<Level, 'easy' | 'medium' | 'hard'> = { 1: 'easy', 2: 'medium', 3: 'hard' };
const NEXT_LEVEL_AT: Record<number, number> = { 1: 50, 2: 120 }; // score để lên cấp
const SK_KEY = 'do-chu-ghep-van';

const rand = (n: number) => Math.floor(Math.random() * n);
const pick = <T,>(arr: T[]): T => arr[rand(arr.length)];

type Current = { w: string; m: string; chars: string[] };
type BankTile = { ch: string; used: boolean };

// Tách từ thành mảng ký tự cần điền (giữ khoảng trắng giữa âm tiết như một ô riêng).
function splitWord(w: string): string[] {
  return Array.from(w);
}

let confId = 0;
type Conf = { id: number; text: string; left: number };

export default function DoChuGhepVanClient() {
  // HUD
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<Level>(1);
  const [done, setDone] = useState(0);
  const [best, setBest] = useState(0);
  const [skips, setSkips] = useState(3);

  // Round state
  const [current, setCurrent] = useState<Current | null>(null);
  const [slotChars, setSlotChars] = useState<(string | null)[]>([]);
  const [bank, setBank] = useState<BankTile[]>([]);

  // Feedback
  const [slotFx, setSlotFx] = useState<'' | 'correct' | 'wrong'>('');
  const [overSlot, setOverSlot] = useState<number | null>(null);
  const [draggingBank, setDraggingBank] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<Conf[]>([]);
  const [toast, setToast] = useState<{ msg: string; kind: '' | 'good' | 'bad' } | null>(null);
  const [levelUp, setLevelUp] = useState<string | null>(null);

  // Refs cho stale-closure / cleanup
  const levelRef = useRef<Level>(1);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const currentRef = useRef<Current | null>(null);
  const slotCharsRef = useRef<(string | null)[]>([]);
  const bankRef = useRef<BankTile[]>([]);
  const skipsRef = useRef(3);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gatedRef = useRef(false);

  // Load best từ localStorage.
  useEffect(() => {
    try {
      const b = Number(localStorage.getItem(SK_KEY + '.best') || 0);
      if (b > 0) {
        bestRef.current = b;
        setBest(b);
      }
    } catch {}
  }, []);

  const showToast = useCallback((msg: string, kind: '' | 'good' | 'bad' = '') => {
    setToast({ msg, kind });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const fireConfetti = useCallback(() => {
    const emojis = ['🎉', '⭐', '🌟', '✨', '🎊', '🥳', '💖'];
    const w = typeof window !== 'undefined' ? window.innerWidth : 800;
    const items: Conf[] = [];
    for (let i = 0; i < 14; i++) {
      items.push({ id: ++confId, text: pick(emojis), left: Math.random() * w });
    }
    setConfetti((c) => [...c, ...items]);
    const ids = new Set(items.map((x) => x.id));
    setTimeout(() => setConfetti((c) => c.filter((x) => !ids.has(x.id))), 1700);
  }, []);

  const syncWalletXp = useCallback((gain: number) => {
    if (!gain) return;
    try {
      fetch('/api/wallet', { credentials: 'same-origin' })
        .then((r) => (r.ok ? r.json() : null))
        .then((w) => {
          if (!w) return;
          fetch('/api/wallet', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...w, xp: (w.xp || 0) + gain }),
          });
        })
        .catch(() => {});
    } catch {}
  }, []);

  // Tạo từ mới cho cấp hiện tại.
  const pickNewWord = useCallback(() => {
    const pool = WORDS[LEVEL_NAMES[levelRef.current]];
    let next: WordEntry | null = null;
    for (let i = 0; i < 5; i++) {
      next = pick(pool);
      if (!currentRef.current || next.w !== currentRef.current.w) break;
    }
    const chars = splitWord(next!.w);
    const cur: Current = { w: next!.w, m: next!.m, chars };
    currentRef.current = cur;

    const newSlots = chars.map((c) => (c === ' ' ? ' ' : null));
    slotCharsRef.current = newSlots;

    // Bank: chữ đúng trong từ + chữ nhiễu (3-6 chữ). Bỏ qua khoảng trắng.
    const needed = chars.filter((c) => c !== ' ');
    const noiseCount = Math.min(6, Math.max(3, Math.floor(needed.length / 2) + 1));
    const VN_LETTERS =
      'aăâbcdđeêghiklmnoôơpqrstuưvxyêôươăáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ'.split(
        '',
      );
    const noise: string[] = [];
    while (noise.length < noiseCount) {
      const c = pick(VN_LETTERS);
      if (!needed.includes(c) && !noise.includes(c)) noise.push(c);
    }
    const newBank: BankTile[] = [...needed, ...noise]
      .map((ch) => ({ ch, used: false }))
      .sort(() => Math.random() - 0.5);
    bankRef.current = newBank;

    setCurrent(cur);
    setSlotChars(newSlots);
    setBank(newBank);
    setSlotFx('');
  }, []);

  // Gate mầm non + khởi tạo ván đầu.
  useEffect(() => {
    (async () => {
      try {
        const dom = new URLSearchParams(window.location.search).get('domain');
        if (dom === 'preschool') {
          gatedRef.current = true;
          window.location.replace('/ghep-chu-cai');
          return;
        }
        const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
        if (r.ok) {
          const d = await r.json();
          const g = d?.user?.grade;
          if (g === 'N' || g === 0) {
            gatedRef.current = true;
            window.location.replace('/ghep-chu-cai');
            return;
          }
        }
      } catch {}
      if (!gatedRef.current) pickNewWord();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Đặt chữ từ bank vào ô slot.
  const placeChar = useCallback((slotIdx: number, bankIdx: number) => {
    const slots = [...slotCharsRef.current];
    const bk = bankRef.current.map((b) => ({ ...b }));

    // Nếu ô đã có chữ → trả chữ cũ về bank trước.
    const existing = slots[slotIdx];
    if (existing && existing !== ' ') {
      const t = bk.find((b) => b.ch === existing && b.used);
      if (t) t.used = false;
      slots[slotIdx] = null;
    }
    const b = bk[bankIdx];
    if (!b || b.used) return;
    slots[slotIdx] = b.ch;
    b.used = true;

    slotCharsRef.current = slots;
    bankRef.current = bk;
    setSlotChars(slots);
    setBank(bk);
    setSlotFx('');
  }, []);

  const returnChar = useCallback((slotIdx: number) => {
    const slots = [...slotCharsRef.current];
    const ch = slots[slotIdx];
    if (!ch || ch === ' ') return;
    const bk = bankRef.current.map((b) => ({ ...b }));
    const t = bk.find((b) => b.ch === ch && b.used);
    if (t) t.used = false;
    slots[slotIdx] = null;
    slotCharsRef.current = slots;
    bankRef.current = bk;
    setSlotChars(slots);
    setBank(bk);
    setSlotFx('');
  }, []);

  const clearAll = useCallback(() => {
    const cur = currentRef.current;
    if (!cur) return;
    const slots = cur.chars.map((c) => (c === ' ' ? ' ' : null));
    const bk = bankRef.current.map((b) => ({ ...b, used: false }));
    slotCharsRef.current = slots;
    bankRef.current = bk;
    setSlotChars(slots);
    setBank(bk);
    setSlotFx('');
  }, []);

  // Click chữ trong bank → auto-place vào ô trống đầu tiên.
  const clickBank = useCallback(
    (i: number) => {
      const b = bankRef.current[i];
      if (!b || b.used) return;
      const cur = currentRef.current;
      if (!cur) return;
      const empty = slotCharsRef.current.findIndex((v, k) => v == null && cur.chars[k] !== ' ');
      if (empty >= 0) placeChar(empty, i);
    },
    [placeChar],
  );

  const showLevelUp = useCallback((newLevel: Level) => {
    setLevelUp('🎉 Lên cấp ' + newLevel + ' (' + (newLevel === 2 ? 'Trung bình' : 'Khó') + ')!');
    setTimeout(() => setLevelUp(null), 1500);
  }, []);

  const check = useCallback(() => {
    const cur = currentRef.current;
    if (!cur) return;
    const slots = slotCharsRef.current;
    const guess = slots.map((c) => (c == null ? '?' : c)).join('');
    if (guess.includes('?')) {
      showToast('Hãy điền hết các ô trống đã nhé!', 'bad');
      return;
    }
    if (guess === cur.w) {
      const newScore = scoreRef.current + 10;
      scoreRef.current = newScore;
      setScore(newScore);
      setDone((d) => d + 1);
      setSlotFx('correct');
      showToast('🎉 Đúng rồi! +10 điểm', 'good');
      fireConfetti();
      syncWalletXp(10);

      // Lên cấp?
      const need = NEXT_LEVEL_AT[levelRef.current];
      if (need && newScore >= need && levelRef.current < 3) {
        const nl = (levelRef.current + 1) as Level;
        levelRef.current = nl;
        setLevel(nl);
        showLevelUp(nl);
      }

      // Best score
      if (newScore > bestRef.current) {
        bestRef.current = newScore;
        setBest(newScore);
        try {
          localStorage.setItem(SK_KEY + '.best', String(newScore));
        } catch {}
      }

      setTimeout(() => pickNewWord(), 1200);
    } else {
      setSlotFx('wrong');
      showToast('Chưa đúng — thử lại nhé!', 'bad');
      setTimeout(() => setSlotFx(''), 500);
    }
  }, [fireConfetti, pickNewWord, showLevelUp, showToast, syncWalletXp]);

  const skip = useCallback(() => {
    if (skipsRef.current <= 0) {
      showToast('Hết lượt bỏ qua trong phiên này rồi.', 'bad');
      return;
    }
    skipsRef.current -= 1;
    setSkips(skipsRef.current);
    showToast('Đã bỏ qua từ này: ' + (currentRef.current?.w ?? ''), 'bad');
    pickNewWord();
  }, [pickNewWord, showToast]);

  return (
    <div className="dcgv-root">
      {/* Topbar */}
      <div className="topbar">
        <a className="back" href="/">
          ← Tizia
        </a>
        <div className="title">
          <span className="em">🔤</span>Đố Chữ Ghép Vần
        </div>
        <div className="stat">
          <span className="pill">
            ⭐ Điểm: <b>{score}</b>
          </span>
          <span className="pill lv">
            🎯 Cấp: <b>{level}</b>
          </span>
          <span className="pill">
            ✅ Đúng: <b>{done}</b>
          </span>
          <span className="pill">
            🏆 Best: <b>{best}</b>
          </span>
        </div>
      </div>

      <div className="game">
        <div className="hint-card">
          <div className="lbl">Gợi ý nghĩa</div>
          <div className="meaning">{current?.m ?? '…'}</div>
        </div>

        <div className="slots">
          {current?.chars.map((c, idx) => {
            if (c === ' ') {
              return <div key={idx} className="spacer" />;
            }
            const filled = !!slotChars[idx];
            const cls =
              'slot' +
              (filled ? ' filled' : '') +
              (overSlot === idx ? ' over' : '') +
              (filled && slotFx ? ' ' + slotFx : '');
            return (
              <div
                key={idx}
                className={cls}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOverSlot(idx);
                }}
                onDragLeave={() => setOverSlot((o) => (o === idx ? null : o))}
                onDrop={(e) => {
                  e.preventDefault();
                  setOverSlot(null);
                  const raw = e.dataTransfer.getData('text/idx');
                  if (raw === '') return;
                  placeChar(idx, Number(raw));
                }}
                onClick={() => {
                  if (slotChars[idx]) returnChar(idx);
                }}
              >
                {slotChars[idx] || ''}
              </div>
            );
          })}
        </div>

        <div className="bank-wrap">
          <div className="lbl">Kéo chữ vào ô trống</div>
          <div className="bank">
            {bank.map((b, i) => (
              <div
                key={i}
                className={'tile' + (b.used ? ' used' : '') + (draggingBank === i ? ' dragging' : '')}
                draggable={!b.used}
                onDragStart={(e) => {
                  if (b.used) {
                    e.preventDefault();
                    return;
                  }
                  e.dataTransfer.setData('text/idx', String(i));
                  setDraggingBank(i);
                }}
                onDragEnd={() => setDraggingBank(null)}
                onClick={() => clickBank(i)}
              >
                {b.ch === ' ' ? '␣' : b.ch}
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <button className="btn primary" onClick={check}>
            ✓ Kiểm tra
          </button>
          <button className="btn ghost" onClick={skip} disabled={skips <= 0}>
            ⏭ Bỏ qua (<span>{skips}</span>)
          </button>
          <button className="btn ghost" onClick={clearAll}>
            🧹 Xoá hết
          </button>
        </div>

        <div className="footer-note">
          Mỗi từ đúng <b>+10 điểm</b>. Đủ điểm sẽ lên cấp khó hơn. Kéo nhầm cũng không sao — cứ thử lại nhé!
        </div>
      </div>

      {/* Toast */}
      <div className={'toast' + (toast ? ' show' : '') + (toast?.kind ? ' ' + toast.kind : '')}>
        {toast?.msg}
      </div>

      {/* Level-up banner */}
      <div className={'level-up' + (levelUp ? ' show' : '')}>{levelUp ?? '🎉 Lên cấp!'}</div>

      {/* Confetti */}
      {confetti.map((c) => (
        <div key={c.id} className="conf" style={{ left: c.left + 'px', top: '-20px' }}>
          {c.text}
        </div>
      ))}

      <style jsx>{`
        .dcgv-root {
          --bg-1: #fef3c7;
          --bg-2: #fce7f3;
          --bg-3: #fef9ff;
          --ink: #3f2418;
          --muted: #7c5a4b;
          --accent: #ec4899;
          --accent-2: #f59e0b;
          --good: #10b981;
          --bad: #ef4444;
          --tile-edge: #fcd34d;
          --slot-empty: #fff7ed;
          --slot-edge: #fdba74;
          position: fixed;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          color: var(--ink);
          font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
          background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 60%, var(--bg-3) 100%);
          z-index: 40;
        }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 22px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(120, 80, 50, 0.12);
        }
        .back {
          background: rgba(236, 72, 153, 0.12);
          color: var(--accent);
          padding: 7px 14px;
          border-radius: 18px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid rgba(236, 72, 153, 0.3);
          transition: background 0.15s, transform 0.12s;
        }
        .back:hover {
          background: rgba(236, 72, 153, 0.22);
          transform: translateX(-2px);
        }
        .title {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }
        .title .em {
          font-size: 22px;
          margin-right: 6px;
        }
        .stat {
          margin-left: auto;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pill {
          background: #fff;
          border: 1px solid rgba(120, 80, 50, 0.18);
          padding: 6px 13px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        .pill :global(b) {
          color: var(--accent);
        }
        .pill.lv :global(b) {
          color: var(--accent-2);
        }

        .game {
          max-width: 760px;
          margin: 0 auto;
          padding: 28px 22px 40px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          align-items: center;
        }

        .hint-card {
          background: rgba(255, 255, 255, 0.85);
          border: 2px dashed rgba(236, 72, 153, 0.35);
          border-radius: 20px;
          padding: 18px 24px;
          text-align: center;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 4px 18px rgba(120, 80, 50, 0.08);
        }
        .hint-card .lbl {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--accent);
          font-weight: 800;
        }
        .hint-card .meaning {
          font-size: 17px;
          margin-top: 6px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.45;
        }

        .slots {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 6px;
        }
        .spacer {
          width: 16px;
          height: 64px;
        }
        .slot {
          width: 56px;
          height: 64px;
          border-radius: 12px;
          border: 3px dashed var(--slot-edge);
          background: var(--slot-empty);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 900;
          color: var(--ink);
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
        }
        .slot.over {
          background: #fff7ed;
          border-color: var(--accent);
          transform: scale(1.05);
        }
        .slot.filled {
          background: linear-gradient(180deg, #fff, #fef3c7);
          border-style: solid;
          border-color: var(--tile-edge);
          cursor: pointer;
        }
        .slot.correct {
          background: linear-gradient(180deg, #d1fae5, #6ee7b7);
          border-color: var(--good);
          animation: pop 0.35s;
        }
        .slot.wrong {
          background: linear-gradient(180deg, #fee2e2, #fca5a5);
          border-color: var(--bad);
          animation: shake 0.35s;
        }
        @keyframes pop {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-6px);
          }
          75% {
            transform: translateX(6px);
          }
        }

        .bank-wrap {
          background: rgba(255, 255, 255, 0.7);
          border-radius: 18px;
          padding: 18px;
          width: 100%;
          max-width: 600px;
          border: 1px solid rgba(120, 80, 50, 0.15);
          box-shadow: 0 4px 18px rgba(120, 80, 50, 0.06);
        }
        .bank-wrap .lbl {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--muted);
          font-weight: 800;
          margin-bottom: 10px;
          text-align: center;
        }
        .bank {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .tile {
          width: 52px;
          height: 56px;
          border-radius: 11px;
          background: linear-gradient(180deg, #fff, #fef9c3);
          border: 2.5px solid var(--tile-edge);
          box-shadow: 0 3px 0 rgba(217, 119, 6, 0.4), 0 6px 12px rgba(217, 119, 6, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 900;
          color: var(--ink);
          cursor: grab;
          user-select: none;
          transition: transform 0.12s, box-shadow 0.15s;
        }
        .tile:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 0 rgba(217, 119, 6, 0.4), 0 9px 16px rgba(217, 119, 6, 0.25);
        }
        .tile:active {
          cursor: grabbing;
          transform: scale(0.92);
        }
        .tile.dragging {
          opacity: 0.4;
        }
        .tile.used {
          opacity: 0.2;
          pointer-events: none;
          transform: scale(0.85);
        }

        .actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn {
          padding: 11px 22px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 14px;
          font-family: inherit;
          border: none;
          cursor: pointer;
          transition: transform 0.12s, filter 0.15s;
        }
        .btn.primary {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: #fff;
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.35);
        }
        .btn.primary:hover {
          transform: translateY(-1px);
          filter: brightness(1.07);
        }
        .btn.ghost {
          background: #fff;
          color: var(--ink);
          border: 1.5px solid rgba(120, 80, 50, 0.2);
        }
        .btn.ghost:hover:not(:disabled) {
          background: #fff7ed;
        }
        .btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: rgba(63, 36, 24, 0.95);
          color: #fff;
          padding: 11px 22px;
          border-radius: 14px;
          font-size: 13.5px;
          font-weight: 600;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s, transform 0.25s;
          z-index: 100;
          max-width: 80vw;
          text-align: center;
        }
        .toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .toast.good {
          background: rgba(16, 185, 129, 0.96);
        }
        .toast.bad {
          background: rgba(239, 68, 68, 0.96);
        }

        .conf {
          position: fixed;
          pointer-events: none;
          font-size: 22px;
          animation: rain 1.6s ease-in forwards;
          z-index: 90;
        }
        @keyframes rain {
          0% {
            opacity: 1;
            transform: translateY(-10px) rotate(0);
          }
          100% {
            opacity: 0;
            transform: translateY(380px) rotate(540deg);
          }
        }

        .level-up {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.5);
          background: linear-gradient(135deg, var(--accent-2), #fbbf24);
          color: #fff;
          padding: 24px 44px;
          border-radius: 22px;
          font-size: 28px;
          font-weight: 900;
          box-shadow: 0 20px 50px rgba(245, 158, 11, 0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s, transform 0.3s;
          z-index: 200;
        }
        .level-up.show {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .footer-note {
          font-size: 12.5px;
          color: var(--muted);
          text-align: center;
          max-width: 540px;
          line-height: 1.55;
        }
      `}</style>
    </div>
  );
}
