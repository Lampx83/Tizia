// =====================================================================
// PHARMA CRUSH — ghép 3 theo NHÓM TÁC DỤNG DƯỢC LÝ.
// Điểm sư phạm: 3 ô ăn nhau khi CÙNG NHÓM dược lý (thuốc có thể khác tên) —
// người chơi phải nhớ thuốc nào cùng nhóm mới ghép được. Dùng chung danh mục
// thuốc đã kiểm định của module GPP (data.js) để không sai chuyên môn.
// =====================================================================
import { DRUGS } from './data.js?v=gpp0906a';

// ---- Nhóm chơi được: gom từ DRUGS, chỉ lấy nhóm có đủ thuốc ----
// Palette 12 màu ĐẬM, phân biệt rõ khi xếp cạnh nhau (tránh các sắc gần giống
// nhau gây nhầm khi chơi). `tag` = viết tắt hiện trên huy hiệu để người chơi
// phân biệt được cả khi khó phân biệt màu (mù màu) — và học luôn tên viết tắt.
const COLORS = {
  // Bảng màu tươi kiểu casual game (theo mẫu thiết kế): đủ bão hoà để nổi trên
  // thẻ kem, phân biệt rõ khi 5 nhóm đứng cạnh nhau.
  'Giảm đau – hạ sốt – NSAID':  { hex:'#ef5a66', tag:'NSAID',desc:'Giảm đau, hạ sốt, chống viêm không steroid.' },
  'Kháng sinh':                 { hex:'#5cb85f', tag:'KS',  desc:'Các thuốc có tác dụng diệt hoặc kìm hãm vi khuẩn.' },
  'Kháng histamin H1':          { hex:'#a765d8', tag:'H1',  desc:'Chống dị ứng do ức chế thụ thể histamin H1.' },
  'Tiêu hoá':                   { hex:'#2eb8b8', tag:'TH',  desc:'Điều trị bệnh lý dạ dày – ruột, bù nước điện giải.' },
  'Tim mạch':                   { hex:'#f2913c', tag:'TM',  desc:'Điều trị tăng huyết áp, suy tim, loạn nhịp, lợi tiểu.' },
  'Đái tháo đường':             { hex:'#3d9be9', tag:'ĐTĐ', desc:'Kiểm soát đường huyết: uống và insulin tiêm.' },
  'Hormon và kháng hormon':     { hex:'#e0609b', tag:'HM',  desc:'Corticoid, hormon tuyến giáp và các kháng hormon.' },
  'Rối loạn lipid máu':         { hex:'#d3a53a', tag:'LIPID',desc:'Nhóm statin — hạ cholesterol, triglycerid máu.' },
  'Hô hấp':                     { hex:'#3fc09a', tag:'HH',  desc:'Giãn phế quản, long đờm, điều trị bệnh hô hấp.' },
  'Điều trị lao':               { hex:'#a4714f', tag:'LAO', desc:'Phác đồ chống lao: isoniazid, rifampicin…' },
  'Kháng virus':                { hex:'#6d7ee0', tag:'KV',  desc:'Ức chế sự nhân lên của virus.' },
  'Thần kinh trung ương':       { hex:'#7f8ba3', tag:'TKTW',desc:'An thần, chống co giật — nhiều thuốc kiểm soát đặc biệt.' },
};

/** Làm sáng/tối 1 màu hex (pct>0 sáng, pct<0 tối) — dựng mặt sáng/tối của khối 3D. */
export function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (pct > 0 ? (255 - v) * pct : v * pct))));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('');
}
export function groupTag(name) { return (COLORS[name] || {}).tag || '?'; }

export function buildGroups() {
  const by = new Map();
  for (const d of DRUGS) {
    if (!d.nhom || !COLORS[d.nhom]) continue;
    if (!by.has(d.nhom)) by.set(d.nhom, []);
    by.get(d.nhom).push(d);
  }
  // Nhóm ≥3 thuốc lên trước (đa dạng hơn khi ăn), rồi tới nhóm 2 thuốc.
  return [...by.entries()]
    .map(([name, drugs]) => ({ name, drugs, hex: COLORS[name].hex, tag: COLORS[name].tag, desc: COLORS[name].desc }))
    .sort((a, b) => b.drugs.length - a.drugs.length);
}

// ---- Cấu hình level: càng lên càng nhiều nhóm, ít thời gian, mục tiêu cao ----
// Đường cong độ khó: 2 màn đầu rất dễ (3 nhóm, mục tiêu thấp, thời gian rộng)
// để ai cũng chơi được, sau đó tăng dần số nhóm và mục tiêu, rút ngắn thời gian.
/* =====================================================================
   HỆ MÀN CHƠI CÓ CHIỀU SÂU
   - Mục tiêu đa dạng (không chỉ "gom N thuốc nhóm X")
   - Chướng ngại: tủ kiểm soát đặc biệt phải mở 2 lớp
   - Cứ 7 màn có 1 "màn thử thách" mục tiêu kép
   - Gỡ dần gợi ý (màu / ký hiệu) để chuyển từ khớp màu sang nhớ nhóm
   ===================================================================== */

/** Các kiểu mục tiêu. `check` chạy trên số liệu tích luỹ của màn. */
export const GOAL_TYPES = {
  group:   { icon:'🎯', label:(g)=>`Gom ${g.need} thuốc nhóm ${g.group}` },
  twoGroup:{ icon:'🎯', label:(g)=>`Gom ${g.need} thuốc thuộc ${g.groups.join(' hoặc ')}` },
  rx:      { icon:'📋', label:(g)=>`Gom ${g.need} thuốc KÊ ĐƠN (Rx)` },
  otc:     { icon:'🛒', label:(g)=>`Gom ${g.need} thuốc KHÔNG kê đơn (OTC)` },
  special: { icon:'⭐', label:(g)=>`Tạo ${g.need} vật phẩm đặc biệt` },
  score:   { icon:'💯', label:(g)=>`Đạt ${g.need} điểm` },
  unlock:  { icon:'🔐', label:(g)=>`Mở ${g.need} tủ kiểm soát đặc biệt` },
};

/** Sinh mục tiêu cho màn — xoay vòng để không lặp lại nhàm chán. */
// Tốc độ gom được đo bằng mô phỏng bot: càng nhiều nhóm trên bàn thì mỗi nước
// càng khó trúng nhóm mục tiêu. Mục tiêu vì thế được tính theo SỐ NƯỚC ĐI và SỐ
// NHÓM, thay vì tăng tuyến tính — nhờ vậy độ khó ổn định suốt hàng chục màn.
const RATE = { 3: 3.2, 4: 1.9, 5: 1.15 };

function goalsFor(level, pool, moves) {
  const g = (i) => pool[i % pool.length];
  const nG = pool.length;
  const rate = RATE[nG] || 1.15;
  const boss = level % 7 === 0;
  const tight = boss ? 0.62 : 0.5;          // màn thử thách siết chặt hơn
  const need = (mult) => Math.max(6, Math.round(moves * rate * tight * mult));
  const bank = [
    () => [{ type:'group',    group:g(level-1).name, need:need(1) }],
    () => [{ type:'rx',       need:Math.max(20, Math.round(moves * 4.5 * tight)) }],
    () => [{ type:'twoGroup', groups:[g(level-1).name, g(level).name], need:need(1.7) }],
    () => [{ type:'special',  need:Math.min(5, 3 + Math.floor(level / 10)) }],
    () => [{ type:'otc',      need:Math.max(10, Math.round(moves * 1.5 * tight)) }],
    () => [{ type:'score',    need:Math.round(moves * 118) }],
  ];
  if (boss) {
    return [
      { type:'group', group:g(level-1).name, need:need(0.75) },
      { type:'special', need:Math.min(3, 1 + Math.floor(level / 10)) },
    ];
  }
  if (level >= 5 && level % 5 === 3) {
    return [{ type:'unlock', need:Math.min(5, 2 + Math.floor(level / 8)) }];
  }
  return bank[(level - 1) % bank.length]();
}

export function levelConfig(level, groups) {
  // Lưới 5×5 chỉ có 25 ô: quá nhiều nhóm sẽ hiếm bộ 3 → giữ tối đa 5 nhóm.
  const nGroups = Math.min(groups.length, 5, 3 + Math.floor((level - 1) / 3)); // 3,3,3,4,4,4,5…
  const pool    = groups.slice(0, nGroups);
  const boss    = level % 7 === 0;
  // Nhịp khó–dễ: xen kẽ màn "dễ thở" để người chơi không kiệt sức.
  const breather = !boss && level % 5 === 0;
  const moves = Math.max(18, 28 - Math.floor((level - 1) * 0.45)) + (breather ? 5 : 0) - (boss ? 3 : 0);
  const tier  = level >= 10 ? 3 : (level >= 5 ? 2 : 1);
  const goals = goalsFor(level, pool, moves);
  // Chướng ngại: tủ kiểm soát đặc biệt xuất hiện từ màn 5, tăng dần
  const needUnlock = goals.find(g => g.type === 'unlock');
  const locked = needUnlock ? needUnlock.need
               : (level >= 6 ? Math.min(4, Math.floor((level - 4) / 4)) : 0);
  return {
    level, pool, nGroups, goals, moves, tier, boss, breather, locked,
    goalGroup: pool[(level - 1) % nGroups],   // giữ tương thích phần hiển thị cũ
    target: goals[0].need,
    showTag:   tier === 1,
    showColor: tier <= 2,
    // req #145 (ThS Hương Lý): trước đây từ màn 10 icon nhóm bị TÔ XÁM nên trông
    // "mờ mờ" khó chịu. Nay icon MẤT DẦN: từ màn 9 một tỉ lệ ô không còn icon,
    // tỉ lệ tăng theo màn cho tới khi mất hẳn — ô nào còn icon thì vẫn rõ nét.
    // Ô đã mất icon là ô "nhớ bằng đầu": ghép trúng được thưởng điểm cao hơn.
    hideIcon: level < 9 ? 0 : Math.min(1, 0.30 + (level - 9) * 0.15),
    tutorial: level <= 2,
    autoHintMs: level <= 2 ? 7000 : (level <= 4 ? 12000 : 0),
    starAt: [0.45, 0.75, 1].map(f => Math.round(f * (700 + (level - 1) * 220))),
  };
}

/** Nhãn hiển thị của một mục tiêu. */
export function goalLabel(goal) {
  const t = GOAL_TYPES[goal.type];
  return t ? t.label(goal) : '';
}
export function goalIcon(goal) { return (GOAL_TYPES[goal.type] || {}).icon || '🎯'; }

/** Tiến độ hiện tại của 1 mục tiêu, dựa trên số liệu tích luỹ của màn. */
export function goalProgress(goal, stat) {
  switch (goal.type) {
    case 'group':    return stat.byGroup[goal.group] || 0;
    case 'twoGroup': return goal.groups.reduce((a, g) => a + (stat.byGroup[g] || 0), 0);
    case 'rx':       return stat.rx;
    case 'otc':      return stat.otc;
    case 'special':  return stat.specials;
    case 'score':    return stat.score;
    case 'unlock':   return stat.unlocked;
    default:         return 0;
  }
}
export function goalsDone(goals, stat) {
  return goals.every(g => goalProgress(g, stat) >= g.need);
}

/** req #145 — Ô này có bị giấu icon nhóm không?
 * Quyết định bằng hàm băm từ cell.id nên MỘT ô luôn cho cùng kết quả suốt màn
 * (vẽ lại bao nhiêu lần cũng không nhấp nháy), nhưng các ô khác nhau thì khác
 * nhau → icon "rụng" rải rác chứ không mất đồng loạt.
 */
export function iconHidden(cfg, cell) {
  const p = cfg?.hideIcon || 0;
  if (p <= 0 || !cell) return false;
  if (p >= 1) return true;
  let h = 2166136261;
  const s = String(cell.id);
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return (h % 1000) / 1000 < p;
}

/** Mô tả ngắn chế độ hiển thị của màn (hiện trên bảng nhiệm vụ). */
export function tierNote(cfg) {
  const pct = Math.round((cfg.hideIcon || 0) * 100);
  if (pct >= 100) return 'Đã mất hết icon gợi ý — ghép đúng được thưởng gấp rưỡi!';
  if (pct > 0) return `Khoảng ${pct}% hộp đã mất icon gợi ý — ghép trúng hộp đó được thưởng thêm.`;
  if (cfg.tier === 1) return 'Có màu và ký hiệu nhóm hỗ trợ.';
  return 'Đã bỏ ký hiệu nhóm — nhìn màu và nhớ tên thuốc.';
}

// ================== LƯỚI ==================
// Kích thước lưới thay đổi theo màn hình (điện thoại dùng lưới nhỏ hơn để mỗi
// hộp đủ to, đọc được tên thuốc). Gọi setGrid() trước khi dựng lưới mới.
export let ROWS = 6, COLS = 6;
export function setGrid(rows, cols) { ROWS = rows; COLS = cols; }

/** Tên ngắn hiển thị trên ô: bỏ hàm lượng và phần trong ngoặc. */
export function shortName(d) {
  return (d.ten || d.hoatChat || '')
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/\s*\d+([.,]\d+)?\s*(mg|mcg|g|ml|IU)(\/\S+)?\s*$/i, '')
    .trim();
}
const rnd = (n) => Math.floor(Math.random() * n);

function randCell(pool) {
  const g = pool[rnd(pool.length)];
  const d = g.drugs[rnd(g.drugs.length)];
  return { group: g.name, hex: g.hex, tag: g.tag, drug: d, sp: null, id: Math.random().toString(36).slice(2, 9) };
}

/** Sinh lưới KHÔNG có match sẵn và CHẮC CHẮN còn nước đi. */
export function newBoard(pool) {
  let b;
  let guard = 0;
  do {
    b = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        let cell, tries = 0;
        do {
          cell = randCell(pool);
          tries++;
          // tránh tạo sẵn 3 liên tiếp ngang/dọc
        } while (tries < 40 && (
          (c >= 2 && row[c - 1].group === cell.group && row[c - 2].group === cell.group) ||
          (r >= 2 && b[r - 1][c].group === cell.group && b[r - 2][c].group === cell.group)
        ));
        row.push(cell);
      }
      b.push(row);
    }
    guard++;
  } while (guard < 30 && (findMatches(b).size > 0 || !hasValidMove(b)));
  return b;
}

/**
 * Rải "tủ kiểm soát đặc biệt" — ô khoá 2 lớp. Người chơi không kéo được ô này;
 * phải ghép bộ 3 CHỨA nó để bóc từng lớp. Đặt rải rác, tránh sát nhau để không
 * bịt đường đi.
 */
export function placeLocks(board, count) {
  const spots = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) spots.push([r, c]);
  for (let i = spots.length - 1; i > 0; i--) { const j = rnd(i + 1); [spots[i], spots[j]] = [spots[j], spots[i]]; }
  let placed = 0;
  for (const [r, c] of spots) {
    if (placed >= count) break;
    if (!board[r][c] || board[r][c].lock) continue;
    // không đặt cạnh ô khoá khác
    const near = [[0,1],[0,-1],[1,0],[-1,0]].some(([dr,dc]) => {
      const rr = r+dr, cc = c+dc;
      return rr>=0 && cc>=0 && rr<ROWS && cc<COLS && board[rr][cc] && board[rr][cc].lock;
    });
    if (near) continue;
    board[r][c].lock = 1;
    placed++;
  }
  return placed;
}

/** Tập ô nằm trong match ≥3 (theo NHÓM). Trả Set khoá "r,c". */
export function findMatches(board) {
  const hit = new Set();
  // ngang
  for (let r = 0; r < ROWS; r++) {
    let run = 1;
    for (let c = 1; c <= COLS; c++) {
      const same = c < COLS && board[r][c] && board[r][c - 1] && board[r][c].group === board[r][c - 1].group;
      if (same) run++;
      else {
        if (run >= 3) for (let k = c - run; k < c; k++) hit.add(r + ',' + k);
        run = 1;
      }
    }
  }
  // dọc
  for (let c = 0; c < COLS; c++) {
    let run = 1;
    for (let r = 1; r <= ROWS; r++) {
      const same = r < ROWS && board[r][c] && board[r - 1][c] && board[r][c].group === board[r - 1][c].group;
      if (same) run++;
      else {
        if (run >= 3) for (let k = r - run; k < r; k++) hit.add(k + ',' + c);
        run = 1;
      }
    }
  }
  return hit;
}

function swapCells(b, r1, c1, r2, c2) {
  const t = b[r1][c1]; b[r1][c1] = b[r2][c2]; b[r2][c2] = t;
}

/** Hoán đổi thử — true nếu tạo được match. Luôn trả lưới về trạng thái cũ. */
export function wouldMatch(board, r1, c1, r2, c2) {
  // tủ kiểm soát đặc biệt đang khoá thì không kéo đi đâu được
  if ((board[r1][c1] && board[r1][c1].lock) || (board[r2][c2] && board[r2][c2].lock)) return false;
  // đổi chỗ dính vật phẩm đặc biệt luôn hợp lệ (kích hoạt hiệu ứng của nó)
  if ((board[r1][c1] && board[r1][c1].sp) || (board[r2][c2] && board[r2][c2].sp)) return true;
  swapCells(board, r1, c1, r2, c2);
  const ok = findMatches(board).size > 0;
  swapCells(board, r1, c1, r2, c2);
  return ok;
}

/** Còn nước đi hợp lệ nào không (chống kẹt lưới). */
export function hasValidMove(board) {
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (c + 1 < COLS && wouldMatch(board, r, c, r, c + 1)) return true;
    if (r + 1 < ROWS && wouldMatch(board, r, c, r + 1, c)) return true;
  }
  return false;
}

/** Tìm 1 nước đi gợi ý — trả {r1,c1,r2,c2} hoặc null. */
export function findHint(board) {
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (c + 1 < COLS && wouldMatch(board, r, c, r, c + 1)) return { r1: r, c1: c, r2: r, c2: c + 1 };
    if (r + 1 < ROWS && wouldMatch(board, r, c, r + 1, c)) return { r1: r, c1: c, r2: r + 1, c2: c };
  }
  return null;
}

// =====================================================================
// VẬT PHẨM ĐẶC BIỆT (theo lối Candy Crush, chuyển thể sang chủ đề nhà thuốc)
//   'row'     — Vỉ nổ ngang : ghép 4 theo hàng  → quét sạch cả HÀNG
//   'col'     — Vỉ nổ dọc   : ghép 4 theo cột   → quét sạch cả CỘT
//   'bomb'    — Hộp cấp cứu : ghép hình L/T     → nổ vùng 3×3 quanh nó
//   'rainbow' — Tủ thuốc vàng: ghép 5 thẳng      → xoá TOÀN BỘ thuốc cùng nhóm
// =====================================================================

/** Các đoạn ≥3 ô liên tiếp cùng nhóm. Trả [{cells:[[r,c]…], dir:'h'|'v', len, group}]. */
export function findRuns(board) {
  const runs = [];
  for (let r = 0; r < ROWS; r++) {
    let s = 0;
    for (let c = 1; c <= COLS; c++) {
      const same = c < COLS && board[r][c] && board[r][s] && board[r][c].group === board[r][s].group;
      if (!same) {
        if (c - s >= 3) runs.push({ dir: 'h', len: c - s, group: board[r][s].group,
          cells: Array.from({ length: c - s }, (_, i) => [r, s + i]) });
        s = c;
      }
    }
  }
  for (let c = 0; c < COLS; c++) {
    let s = 0;
    for (let r = 1; r <= ROWS; r++) {
      const same = r < ROWS && board[r][c] && board[s][c] && board[r][c].group === board[s][c].group;
      if (!same) {
        if (r - s >= 3) runs.push({ dir: 'v', len: r - s, group: board[s][c].group,
          cells: Array.from({ length: r - s }, (_, i) => [s + i, c]) });
        s = r;
      }
    }
  }
  return runs;
}

const keyOf = (r, c) => r + ',' + c;

/** Mở rộng danh sách ô bị xoá qua hiệu ứng của các vật phẩm đặc biệt (có đệ quy). */
export function expandSpecials(board, seed) {
  const out = new Set(seed);
  const queue = [...seed];
  const fired = new Set();
  while (queue.length) {
    const k = queue.pop();
    const [r, c] = k.split(',').map(Number);
    const cell = board[r][c];
    if (!cell || !cell.sp || fired.has(k)) continue;
    fired.add(k);
    const add = (rr, cc) => {
      if (rr < 0 || cc < 0 || rr >= ROWS || cc >= COLS || !board[rr][cc]) return;
      const kk = keyOf(rr, cc);
      if (!out.has(kk)) { out.add(kk); queue.push(kk); }
      else if (board[rr][cc].sp && !fired.has(kk)) queue.push(kk);
    };
    if (cell.sp === 'row') for (let cc = 0; cc < COLS; cc++) add(r, cc);
    else if (cell.sp === 'col') for (let rr = 0; rr < ROWS; rr++) add(rr, c);
    else if (cell.sp === 'bomb') for (let rr = r - 1; rr <= r + 1; rr++) for (let cc = c - 1; cc <= c + 1; cc++) add(rr, cc);
    else if (cell.sp === 'rainbow') {
      for (let rr = 0; rr < ROWS; rr++) for (let cc = 0; cc < COLS; cc++)
        if (board[rr][cc] && board[rr][cc].group === cell.group) add(rr, cc);
    }
  }
  return out;
}

/**
 * Lập kế hoạch cho một lượt ăn: ô nào bị xoá và vật phẩm đặc biệt nào được tạo.
 * @param {Array} board
 * @param {{r:number,c:number}|null} swapAt ô người chơi vừa chạm (ưu tiên đặt vật phẩm ở đây)
 */
export function planMatches(board, swapAt) {
  const runs = findRuns(board);
  if (!runs.length) return null;
  const base = new Set();
  runs.forEach(run => run.cells.forEach(([r, c]) => base.add(keyOf(r, c))));

  // ô nằm ở giao của 1 đoạn ngang và 1 đoạn dọc → hình L/T
  const hSet = new Set(), vSet = new Set();
  runs.forEach(run => run.cells.forEach(([r, c]) => (run.dir === 'h' ? hSet : vSet).add(keyOf(r, c))));
  const crosses = [...hSet].filter(k => vSet.has(k));

  const creates = [];
  const taken = new Set();
  const pickSpot = (run) => {
    if (swapAt) { const k = keyOf(swapAt.r, swapAt.c);
      if (run.cells.some(([r, c]) => keyOf(r, c) === k) && !taken.has(k)) return [swapAt.r, swapAt.c]; }
    const mid = run.cells[Math.floor(run.cells.length / 2)];
    return taken.has(keyOf(mid[0], mid[1])) ? run.cells.find(([r, c]) => !taken.has(keyOf(r, c))) || mid : mid;
  };
  // hình L/T trước (ưu tiên cao hơn đoạn 4)
  for (const k of crosses) {
    if (taken.has(k)) continue;
    const [r, c] = k.split(',').map(Number);
    const cell = board[r][c]; if (!cell) continue;
    taken.add(k);
    creates.push({ r, c, sp: 'bomb', group: cell.group, hex: cell.hex, tag: cell.tag, drug: cell.drug });
  }
  for (const run of runs) {
    const cross = run.cells.some(([r, c]) => taken.has(keyOf(r, c)) && crosses.includes(keyOf(r, c)));
    if (cross) continue;
    if (run.len < 4) continue;
    const spot = pickSpot(run); if (!spot) continue;
    const k = keyOf(spot[0], spot[1]); if (taken.has(k)) continue;
    const cell = board[spot[0]][spot[1]]; if (!cell) continue;
    taken.add(k);
    creates.push({ r: spot[0], c: spot[1], group: cell.group, hex: cell.hex, tag: cell.tag, drug: cell.drug,
      sp: run.len >= 5 ? 'rainbow' : (run.dir === 'h' ? 'row' : 'col') });
  }
  const clear = expandSpecials(board, base);
  return { clear, creates, runs };
}

/** Kích hoạt trực tiếp 1 vật phẩm đặc biệt (khi người chơi đổi chỗ nó với ô thường). */
export function triggerSpecial(board, r, c, otherGroup) {
  const cell = board[r][c];
  if (!cell || !cell.sp) return null;
  if (cell.sp === 'rainbow' && otherGroup) cell.group = otherGroup; // cầu vồng ăn theo nhóm ô kia
  return expandSpecials(board, new Set([keyOf(r, c)]));
}

/** Đặt các vật phẩm đặc biệt vừa tạo lên bàn (gọi SAU khi đã xoá). */
export function placeSpecials(board, creates) {
  for (const s of creates) {
    board[s.r][s.c] = { group: s.group, hex: s.hex, tag: s.tag, drug: s.drug, sp: s.sp,
      id: Math.random().toString(36).slice(2, 9) };
  }
}

export const SPECIAL_INFO = {
  row:     { icon: '↔', name: 'Vỉ nổ ngang',  desc: 'Quét sạch cả hàng' },
  col:     { icon: '↕', name: 'Vỉ nổ dọc',    desc: 'Quét sạch cả cột' },
  bomb:    { icon: '✚', name: 'Hộp cấp cứu',  desc: 'Nổ vùng 3×3' },
  rainbow: { icon: '★', name: 'Tủ thuốc vàng', desc: 'Xoá toàn bộ thuốc cùng nhóm' },
};

/** Xoá các ô trúng (đặt null). Trả thống kê theo nhóm + danh sách thuốc đã ăn. */
export function clearMatches(board, hits, pool) {
  const byGroup = {}; const drugs = [];
  let rx = 0, otc = 0, unlocked = 0, cracked = 0, count = 0;
  for (const key of hits) {
    const [r, c] = key.split(',').map(Number);
    const cell = board[r][c];
    if (!cell) continue;
    if (cell.lock) {
      // bóc 1 lớp tủ khoá; đổi sang thuốc khác để không match lại vô hạn
      cell.lock--;
      cracked++;
      if (cell.lock <= 0) { delete cell.lock; unlocked++; }
      if (pool) { const nc = randCell(pool); cell.group = nc.group; cell.hex = nc.hex; cell.tag = nc.tag; cell.drug = nc.drug; }
      continue;
    }
    byGroup[cell.group] = (byGroup[cell.group] || 0) + 1;
    if ((cell.drug.keDon || '').startsWith('ETC')) rx++; else otc++;
    drugs.push(cell.drug);
    board[r][c] = null;
    count++;
  }
  return { byGroup, drugs, count, rx, otc, unlocked, cracked };
}

/** Số vòng combo tối đa cho 1 nước đi — quá dài thì mất kiểm soát, không vui. */
export const MAX_CHAIN = 3;

/**
 * Rơi xuống + đổ ô mới từ trên.
 * @param {boolean} noNewMatch true = ô mới sinh ra KHÔNG tạo bộ 3 (dừng chuỗi combo).
 */
export function applyGravity(board, pool, noNewMatch = false) {
  for (let c = 0; c < COLS; c++) {
    let write = ROWS - 1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][c]) { board[write][c] = board[r][c]; if (write !== r) board[r][c] = null; write--; }
    }
    for (let r = write; r >= 0; r--) {
      let cell, tries = 0;
      do {
        cell = randCell(pool);
        tries++;
        if (!noNewMatch) break;
        // tránh tạo sẵn 3 liên tiếp với các ô đã có quanh vị trí này
        const g = cell.group;
        const left2  = c >= 2 && board[r][c-1] && board[r][c-2] && board[r][c-1].group === g && board[r][c-2].group === g;
        const right2 = c < COLS-2 && board[r][c+1] && board[r][c+2] && board[r][c+1].group === g && board[r][c+2].group === g;
        const mid    = c >= 1 && c < COLS-1 && board[r][c-1] && board[r][c+1] && board[r][c-1].group === g && board[r][c+1].group === g;
        const down2  = r < ROWS-2 && board[r+1][c] && board[r+2][c] && board[r+1][c].group === g && board[r+2][c].group === g;
        if (!left2 && !right2 && !mid && !down2) break;
      } while (tries < 40);
      board[r][c] = cell;
    }
  }
}

/** Ô tại (r,c) hiện có nằm trong bộ 3 nào không. */
function cellInMatch(board, r, c) {
  const g = board[r][c] && board[r][c].group; if (!g) return false;
  let run = 1;
  for (let i = c - 1; i >= 0 && board[r][i] && board[r][i].group === g; i--) run++;
  for (let i = c + 1; i < COLS && board[r][i] && board[r][i].group === g; i++) run++;
  if (run >= 3) return true;
  run = 1;
  for (let i = r - 1; i >= 0 && board[i][c] && board[i][c].group === g; i--) run++;
  for (let i = r + 1; i < ROWS && board[i][c] && board[i][c].group === g; i++) run++;
  return run >= 3;
}

/**
 * DỪNG CHUỖI COMBO: thay các ô thường đang tạo bộ 3 bằng ô khác cho tới khi bàn
 * sạch match. Dùng sau khi đã đạt MAX_CHAIN — combo kéo dài quá làm người chơi
 * mất cảm giác kiểm soát. Vật phẩm đặc biệt được giữ nguyên.
 */
export function settleNoMatch(board, pool) {
  for (let guard = 0; guard < 60; guard++) {
    const hits = findMatches(board);
    if (!hits.size) return true;
    for (const k of hits) {
      const [r, c] = k.split(',').map(Number);
      if (!board[r][c] || board[r][c].sp) continue;
      for (let t = 0; t < 40; t++) {
        board[r][c] = randCell(pool);
        if (!cellInMatch(board, r, c)) break;
      }
    }
  }
  return findMatches(board).size === 0;
}

/** Trộn lại toàn bộ ô hiện có cho tới khi hết match sẵn & còn nước đi. */
export function shuffleBoard(board, pool) {
  // ô khoá đứng yên (là "tủ" gắn vào bàn), chỉ trộn các ô thường
  const fixed = [];
  const flat = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (board[r][c] && board[r][c].lock) fixed.push([r, c, board[r][c]]);
    else flat.push(board[r][c]);
  }
  if (fixed.length) {
    for (let g = 0; g < 40; g++) {
      for (let i = flat.length - 1; i > 0; i--) { const j = rnd(i + 1); [flat[i], flat[j]] = [flat[j], flat[i]]; }
      let k = 0;
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const f = fixed.find(([fr, fc]) => fr === r && fc === c);
        board[r][c] = f ? f[2] : flat[k++];
      }
      if (findMatches(board).size === 0 && hasValidMove(board)) return true;
    }
    return true;
  }
  for (let g = 0; g < 40; g++) {
    for (let i = flat.length - 1; i > 0; i--) { const j = rnd(i + 1); [flat[i], flat[j]] = [flat[j], flat[i]]; }
    let k = 0;
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) board[r][c] = flat[k++];
    if (findMatches(board).size === 0 && hasValidMove(board)) return true;
  }
  // bí quá thì sinh lưới mới
  const nb = newBoard(pool);
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) board[r][c] = nb[r][c];
  return true;
}

/** Mẹo dược sĩ sau mỗi lần ăn: nêu các thuốc vừa ăn cùng nhóm. */
export function tipFor(groupName, drugs) {
  const list = drugs.filter(d => d);
  const names = [...new Set(list.map(d => shortName(d)))].slice(0, 3);
  let tip = names.length >= 2
    ? `${names.join(', ')} đều thuộc nhóm ${groupName}.`
    : `${groupName}: ${(COLORS[groupName] || {}).desc || ''}`;
  // Đính chính chuyên môn: Paracetamol nằm chung BÀI với NSAID trong giáo trình,
  // nhưng KHÔNG phải NSAID (không chống viêm đáng kể) — nói rõ để tránh hiểu nhầm.
  if (list.some(d => /paracetamol/i.test(d.hoatChat || d.ten))) {
    tip += ' Lưu ý: Paracetamol giảm đau – hạ sốt, gần như không chống viêm nên không xếp là NSAID thực thụ.';
  }
  return tip;
}

export function groupDesc(name) { return (COLORS[name] || {}).desc || ''; }

/**
 * Phản hồi SỬA SAI khi người chơi ghép nhầm hai thuốc khác nhóm.
 * Đây là giá trị học cốt lõi: nói rõ thuốc nào thuộc nhóm nào ngay lúc sai —
 * "retrieval practice + corrective feedback" hiệu quả hơn nhiều so với chỉ báo lỗi.
 */
export function wrongTip(cellA, cellB) {
  if (!cellA || !cellB) return 'Cặp đó chưa tạo được bộ 3 cùng nhóm — thử cặp khác nhé.';
  if (cellA.group === cellB.group) {
    return `${shortName(cellA.drug)} và ${shortName(cellB.drug)} cùng nhóm ${cellA.group}, `
         + 'nhưng đổi chỗ này chưa xếp đủ 3 hộp thành hàng.';
  }
  return `${shortName(cellA.drug)} thuộc nhóm ${cellA.group}, còn `
       + `${shortName(cellB.drug)} thuộc nhóm ${cellB.group} — khác nhóm nên không ăn được.`;
}

/** Lời khen tăng dần theo chuỗi combo (thuật ngữ nghề, không bịa chuyên môn). */
export const PRAISE = ['Đúng nhóm!', 'Chuẩn phác đồ!', 'Dược sĩ giỏi!', 'Xuất sắc!'];
export function praiseFor(chain) { return PRAISE[Math.min(chain - 1, PRAISE.length - 1)]; }
