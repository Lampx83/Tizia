'use client';

// ============================================================
// Cây Tri Thức — visualize completed scenario weeks as a tree.
// Mỗi tuần hoàn thành = 1 chiếc lá. Hoàn thành 3 sao = 1 quả chín.
// Dữ liệu SSR từ /api/scenario-runs và /api/wallet (truyền qua props).
// Toàn bộ thuật toán vẽ cây/nhánh/lá + tooltip + filter cấp học giữ
// nguyên như trang vanilla gốc.
// ============================================================

import { useMemo, useState, useRef } from 'react';

export type ScenarioRun = { runs: number; bestStars: number; bestScore: number; lastTs: number };
export type ScenarioRuns = Record<string, ScenarioRun>;
export type Wallet = { xp?: number; coins?: number; streak?: number };

type Branch = { key: string; label: string; color: string; emoji: string; prefixes: string[] };

// ── Bản đồ subject prefix → màu lá + nhãn ──────────────────────
const BRANCHES: Branch[] = [
  { key: 'toan', label: 'Toán', color: '#3b82f6', emoji: '➕', prefixes: ['P1-w', 'P2-w', 'P3-w', 'P4-w', 'P5-w', 'P6-w'] },
  { key: 'tieng-viet', label: 'Tiếng Việt', color: '#10b981', emoji: '📖', prefixes: ['P1TV', 'P2TV', 'P3TV', 'P4TV', 'P5TV', 'P6NV'] },
  { key: 'tieng-anh', label: 'Tiếng Anh', color: '#f59e0b', emoji: '🌍', prefixes: ['P1TA', 'P2TA', 'P3TA', 'P4TA', 'P5TA', 'P6TA'] },
  { key: 'tnxh', label: 'TN-XH / KHTN', color: '#06b6d4', emoji: '🔬', prefixes: ['P1TNXH', 'P2TNXH', 'P3TNXH', 'P4TNXH', 'P5TNXH', 'P6KHTN', 'P6LSDL', 'P6GDDP'] },
  { key: 'dao-duc', label: 'Đạo đức/GDCD', color: '#ec4899', emoji: '💝', prefixes: ['P1DD', 'P2DD', 'P3DD', 'P4DD', 'P5DD', 'P6GDCD'] },
  { key: 'am-nhac', label: 'Âm nhạc', color: '#a855f7', emoji: '🎵', prefixes: ['P1AN', 'P2AN', 'P3AN', 'P4AN', 'P5AN', 'P6AN'] },
  { key: 'my-thuat', label: 'Mỹ thuật', color: '#ef4444', emoji: '🎨', prefixes: ['P1MT', 'P2MT', 'P3MT', 'P4MT', 'P5MT', 'P6MT'] },
  { key: 'gdtc', label: 'Thể chất', color: '#84cc16', emoji: '🏃', prefixes: ['P1GDTC', 'P2GDTC', 'P3GDTC', 'P4GDTC', 'P5GDTC', 'P6GDTC'] },
  { key: 'hdtn', label: 'HĐ Trải nghiệm', color: '#fb923c', emoji: '🌟', prefixes: ['P1HDTN', 'P2HDTN', 'P3HDTN', 'P4HDTN', 'P5HDTN', 'P6HDTN'] },
  { key: 'mam-non', label: 'Mầm non', color: '#fbbf24', emoji: '🧸', prefixes: ['N1', 'N2', 'N3'] },
];

const detectBranch = (familyId: string): Branch => {
  for (const b of BRANCHES) {
    if (b.prefixes.some((p) => familyId.startsWith(p))) return b;
  }
  return BRANCHES.find((b) => b.key === 'tieng-anh')!; // fallback
};

const detectGrade = (familyId: string): string => {
  if (familyId.startsWith('N')) return 'N';
  const m = familyId.match(/^P(\d)/);
  return m ? 'P' + m[1] : '';
};

const GRADE_FILTERS = [
  { grade: '', label: 'Tất cả' },
  { grade: 'N', label: 'Mầm' },
  { grade: 'P1', label: 'Lớp 1' },
  { grade: 'P2', label: 'Lớp 2' },
  { grade: 'P3', label: 'Lớp 3' },
  { grade: 'P4', label: 'Lớp 4' },
  { grade: 'P5', label: 'Lớp 5' },
  { grade: 'P6', label: 'Lớp 6' },
];

type LeafInfo = { subject: string; stars: number; score: number; runs: number };
type SvgNode =
  | { kind: 'leaf' | 'fruit'; fid: string; info: LeafInfo; x: number; y: number; ang: number; color: string };
type TipState = { x: number; y: number; subject: string; fid: string; stars: number; score: number; runs: number } | null;

function moduleHref(fid: string): string {
  // module.html đọc param tên `module=` (không phải `id=`); thêm domain= để load
  // đúng catalog (N* = preschool, P* = primary, S* = secondary, H* = highschool).
  const dom = fid.startsWith('N') ? 'preschool'
    : fid.startsWith('P') ? 'primary'
    : fid.startsWith('S') ? 'secondary'
    : fid.startsWith('H') ? 'highschool'
    : '';
  const qs = `module=${encodeURIComponent(fid)}${dom ? '&domain=' + dom : ''}`;
  return `/module.html?${qs}`;
}

export default function TreeClient({ runs, wallet }: { runs: ScenarioRuns; wallet: Wallet }) {
  const [activeGrade, setActiveGrade] = useState('');
  const [tip, setTip] = useState<TipState>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // ── Tính toán bố cục cây (memo theo runs + filter) ──────────────
  const model = useMemo(() => {
    const filtered = Object.entries(runs).filter(([fid]) => !activeGrade || detectGrade(fid) === activeGrade);

    // Group by branch
    const byBranch = new Map<string, { fid: string; info: ScenarioRun; branch: Branch }[]>(
      BRANCHES.map((b) => [b.key, []]),
    );
    for (const [fid, info] of filtered) {
      const b = detectBranch(fid);
      byBranch.get(b.key)!.push({ fid, info, branch: b });
    }

    // Stats
    let totalLeaves = 0, totalFruits = 0;
    for (const arr of byBranch.values()) {
      for (const it of arr) {
        totalLeaves++;
        if ((it.info.bestStars | 0) >= 3) totalFruits++;
      }
    }

    // Trunk + nhánh
    const W = 1000, H = 720;
    const cx = W / 2, baseY = H - 30;
    const trunkPaths: string[] = [];

    trunkPaths.push(
      `M ${cx - 28} ${baseY} Q ${cx - 22} ${baseY - 180} ${cx - 20} ${baseY - 340} L ${cx + 20} ${baseY - 340} Q ${cx + 22} ${baseY - 180} ${cx + 28} ${baseY} Z`,
    );
    const trunkDark = `M ${cx - 20} ${baseY - 340} Q ${cx - 10} ${baseY - 360} ${cx} ${baseY - 365} Q ${cx + 10} ${baseY - 360} ${cx + 20} ${baseY - 340}`;
    // Vân thân
    const grains: string[] = [];
    for (let i = 0; i < 5; i++) {
      const y = baseY - 60 - i * 50;
      grains.push(`M ${cx - 22 + i * 2} ${y} Q ${cx} ${y - 8} ${cx + 22 - i * 2} ${y}`);
    }

    // Nhánh — phân bố 10 nhánh tỏa hình quạt từ đỉnh thân
    const branchAngles = [
      { ang: -72, len: 200, key: 'mam-non' },
      { ang: -55, len: 230, key: 'toan' },
      { ang: -38, len: 255, key: 'tieng-viet' },
      { ang: -22, len: 240, key: 'tieng-anh' },
      { ang: -8, len: 225, key: 'tnxh' },
      { ang: 8, len: 225, key: 'dao-duc' },
      { ang: 22, len: 240, key: 'am-nhac' },
      { ang: 38, len: 255, key: 'my-thuat' },
      { ang: 55, len: 230, key: 'gdtc' },
      { ang: 72, len: 200, key: 'hdtn' },
    ];

    const branchEnds = new Map<string, { ex: number; ey: number; ang: number; len: number }>();
    const branchPaths: { d: string; w: number }[] = [];
    const branchBlobs: { ex: number; ey: number; color: string }[] = [];
    const topX = cx, topY = baseY - 350;
    for (const br of branchAngles) {
      const rad = (br.ang * Math.PI) / 180;
      const ex = topX + Math.sin(rad) * br.len;
      const ey = topY - Math.cos(rad) * br.len * 0.85;
      const midX = topX + Math.sin(rad) * br.len * 0.5;
      const midY = topY - Math.cos(rad) * br.len * 0.6;
      const w = 14 - Math.min(8, Math.abs(br.ang) / 12);
      branchPaths.push({ d: `M ${topX} ${topY} Q ${midX} ${midY} ${ex} ${ey}`, w });
      branchEnds.set(br.key, { ex, ey, ang: br.ang, len: br.len });

      const brInfo = BRANCHES.find((b) => b.key === br.key);
      if (brInfo) branchBlobs.push({ ex, ey, color: brInfo.color });
    }

    // Lá cho từng nhánh
    const nodes: SvgNode[] = [];
    const overflow: { ex: number; ey: number; extra: number; color: string }[] = [];
    for (const br of branchAngles) {
      const arr = byBranch.get(br.key) || [];
      const branch = BRANCHES.find((b) => b.key === br.key)!;
      const { ex, ey } = branchEnds.get(br.key)!;

      const count = Math.min(arr.length, 24);
      for (let i = 0; i < count; i++) {
        const item = arr[i];
        const golden = Math.PI * (3 - Math.sqrt(5));
        const r = 12 + Math.sqrt(i) * 13;
        const t = i * golden;
        const lx = ex + Math.cos(t) * r;
        const ly = ey + Math.sin(t) * r * 0.85;
        const stars = item.info.bestStars | 0;
        const isFruit = stars >= 3;
        const info: LeafInfo = { subject: branch.label, stars, score: item.info.bestScore | 0, runs: item.info.runs | 0 };
        const ang = ((t * 180) / Math.PI) % 360;
        nodes.push({ kind: isFruit ? 'fruit' : 'leaf', fid: item.fid, info, x: lx, y: ly, ang, color: branch.color });
      }
      if (arr.length > 24) overflow.push({ ex, ey, extra: arr.length - 24, color: branch.color });
    }

    const legend = BRANCHES.map((b) => ({ ...b, count: (byBranch.get(b.key) || []).length }));

    // Tán lá xanh rậm (req #116): khối lá lớn phía sau nhánh → cây giống cây thật.
    const crownCx = cx, crownCy = (baseY - 350) - 55;
    const canopyRaw = [
      { x: 0, y: 24, r: 158, c: '#3d8a41', o: 0.95 }, { x: -176, y: 64, r: 116, c: '#3d8a41', o: 0.95 }, { x: 176, y: 64, r: 116, c: '#3d8a41', o: 0.95 },
      { x: -96, y: -74, r: 110, c: '#43944a', o: 0.95 }, { x: 96, y: -74, r: 110, c: '#43944a', o: 0.95 }, { x: 0, y: -116, r: 100, c: '#43944a', o: 0.95 },
      { x: -238, y: -4, r: 84, c: '#3d8a41', o: 0.92 }, { x: 238, y: -4, r: 84, c: '#3d8a41', o: 0.92 },
      { x: -64, y: 12, r: 98, c: '#5fb85a', o: 0.96 }, { x: 74, y: 2, r: 104, c: '#5fb85a', o: 0.96 }, { x: 0, y: -44, r: 94, c: '#6cc665', o: 0.96 },
      { x: -156, y: 22, r: 74, c: '#5fb85a', o: 0.94 }, { x: 156, y: 22, r: 74, c: '#5fb85a', o: 0.94 }, { x: -34, y: -96, r: 68, c: '#6cc665', o: 0.92 },
      { x: 120, y: -56, r: 66, c: '#6cc665', o: 0.9 }, { x: -120, y: -52, r: 62, c: '#6cc665', o: 0.9 },
    ];
    const canopy = canopyRaw.map((b) => ({ cx: crownCx + b.x, cy: crownCy + b.y, r: b.r, c: b.c, o: b.o }));
    const canopyHi = [{ cx: crownCx - 50, cy: crownCy - 30, r: 30 }, { cx: crownCx + 90, cy: crownCy + 30, r: 26 }];
    // Bụi cây + hoa quanh gốc (req #116: xung quanh đỡ trống vắng)
    const bushes = [
      { bx: cx - 250, s: 1.15, c1: '#4e9048', c2: '#6cc665' }, { bx: cx + 265, s: 1.3, c1: '#478a42', c2: '#63bd5c' },
      { bx: cx - 95, s: 0.8, c1: '#4e9048', c2: '#6cc665' }, { bx: cx + 120, s: 0.9, c1: '#478a42', c2: '#63bd5c' },
    ].map((b) => ({ ...b, y: baseY - 6 }));
    const flowerCols = ['#ff6b9d', '#ffd54a', '#c77dff', '#ff8f5a', '#6ec6ff'];
    const flowers = Array.from({ length: 9 }, (_, i) => ({
      fx: 70 + i * 105 + (i % 2 ? 30 : 0), fy: baseY + 6 + (i % 3) * 8, col: flowerCols[i % flowerCols.length],
    }));

    return { totalLeaves, totalFruits, trunkPaths, trunkDark, grains, branchPaths, branchBlobs, nodes, overflow, legend, canopy, canopyHi, bushes, flowers };
  }, [runs, activeGrade]);

  const showTip = (e: React.MouseEvent, node: SvgNode) => {
    const r = (e.currentTarget as SVGGElement).getBoundingClientRect();
    setTip({
      x: r.left + r.width / 2,
      y: r.top,
      subject: node.info.subject,
      fid: node.fid,
      stars: node.info.stars,
      score: node.info.score,
      runs: node.info.runs,
    });
  };

  const xp = (wallet.xp || 0).toLocaleString('vi-VN');
  const streak = wallet.streak || 0;

  return (
    <div className="ctt-scene">
      <style>{`
        .ctt-scene { --trunk:#6b3a1a; --trunk-dark:#4a2710; --grass-1:#7bc36f; --grass-2:#5fa757; --accent:#f59e0b;
          position:relative; border-radius:20px; overflow:hidden;
          background: linear-gradient(180deg,#a3d2ff 0%, #d8eeff 55%, #fff5d8 100%);
          color:#1f2937; min-height:680px; }
        .ctt-top { position:absolute; top:14px; left:14px; right:14px; z-index:20; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .ctt-stats { display:flex; gap:8px; margin-left:auto; flex-wrap:wrap; }
        .ctt-pill { background:rgba(255,255,255,.85); border:1px solid rgba(255,255,255,.6); padding:7px 13px; border-radius:18px; font-size:13px; font-weight:700; color:#1f2937; display:flex; gap:6px; align-items:center; box-shadow:0 4px 12px rgba(31,41,55,.08); }
        .ctt-pill b { color:var(--accent); }
        .ctt-stage { position:relative; width:100%; min-height:680px; height:100%; display:flex; align-items:flex-end; justify-content:center; }
        .ctt-cloud { position:absolute; opacity:.78; pointer-events:none; animation: ctt-drift 80s linear infinite; }
        .ctt-cloud.c2 { animation-duration:120s; animation-delay:-40s; }
        .ctt-cloud.c3 { animation-duration:100s; animation-delay:-15s; }
        @keyframes ctt-drift { from{ transform:translateX(-15vw); } to { transform:translateX(110vw); } }
        .ctt-ground { position:absolute; bottom:0; left:0; right:0; height:120px;
          background: linear-gradient(180deg, var(--grass-1), var(--grass-2));
          border-radius:50% 50% 0 0 / 24% 24% 0 0; box-shadow: inset 0 16px 30px rgba(0,0,0,.08); }
        .ctt-ground::before { content:''; position:absolute; top:-6px; left:0; right:0; height:14px;
          background: repeating-linear-gradient(90deg, transparent 0 8px, rgba(255,255,255,.25) 8px 12px); border-radius:50% 50% 0 0 / 100% 100% 0 0; }
        .ctt-tree { position:relative; z-index:2; width:min(96%,1100px); height:auto; margin-bottom:60px; filter: drop-shadow(0 10px 18px rgba(0,0,0,.18)); }
        .ctt-trunk { fill: var(--trunk); }
        .ctt-trunk-dark { fill: var(--trunk-dark); }
        .ctt-branch { stroke: var(--trunk); fill:none; stroke-linecap:round; }
        .ctt-leaf { transition: filter .18s ease; cursor:pointer; }
        .ctt-leaf:hover { filter: brightness(1.25) drop-shadow(0 3px 8px rgba(0,0,0,.45)); }
        .ctt-tip { position:fixed; z-index:30; background:rgba(15,23,42,.94); color:#fff; padding:8px 13px; border-radius:10px; font-size:12.5px; pointer-events:none; max-width:240px; line-height:1.45; box-shadow:0 8px 20px rgba(0,0,0,.3); transform:translate(-50%,-130%); }
        .ctt-tip b { display:block; margin-bottom:2px; font-size:13px; color:#fde68a; }
        .ctt-legend { position:absolute; right:14px; bottom:14px; z-index:20; background:rgba(255,255,255,.92); border-radius:14px; padding:11px 14px 12px; box-shadow:0 8px 24px rgba(0,0,0,.15); max-width:260px; backdrop-filter:blur(8px); }
        .ctt-legend h4 { margin:0 0 8px; font-size:12.5px; font-weight:800; color:#1f2937; display:flex; align-items:center; gap:6px; }
        .ctt-legend .row { display:flex; align-items:center; gap:8px; font-size:12px; border-radius:6px; padding:3px 6px; }
        .ctt-legend .row .dot { width:14px; height:14px; border-radius:4px; flex-shrink:0; }
        .ctt-legend .row .ct { color:#475569; margin-left:auto; font-weight:700; font-size:11.5px; }
        .ctt-filter { position:absolute; left:14px; bottom:14px; z-index:20; background:rgba(255,255,255,.92); border-radius:14px; padding:10px 12px; box-shadow:0 8px 24px rgba(0,0,0,.15); display:flex; gap:6px; flex-wrap:wrap; max-width:340px; }
        .ctt-filter button { background:rgba(15,23,42,.06); border:1px solid rgba(15,23,42,.1); color:#1f2937; font-size:12px; font-weight:700; padding:6px 11px; border-radius:14px; cursor:pointer; transition: background .12s; font-family:inherit; }
        .ctt-filter button:hover { background:rgba(15,23,42,.14); }
        .ctt-filter button.on { background:var(--accent); color:#fff; border-color:transparent; }
        .ctt-empty { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:5; background:rgba(255,255,255,.95); padding:22px 30px; border-radius:18px; max-width:380px; text-align:center; box-shadow:0 16px 40px rgba(0,0,0,.18); }
        .ctt-empty .ic { font-size:48px; }
        .ctt-empty h3 { margin:8px 0 6px; font-size:18px; color:#1f2937; }
        .ctt-empty p { margin:0 0 14px; color:#475569; font-size:13.5px; line-height:1.5; }
        .ctt-empty a { background:var(--accent); color:#fff; text-decoration:none; padding:9px 18px; border-radius:18px; font-weight:700; font-size:13px; display:inline-block; }
        @media (max-width:600px) {
          .ctt-top .ctt-stats { width:100%; margin-left:0; }
          .ctt-legend, .ctt-filter { max-width:46%; }
          .ctt-legend { right:8px; bottom:8px; padding:8px 10px; font-size:11px; }
          .ctt-filter { left:8px; bottom:8px; padding:8px; gap:4px; }
          .ctt-filter button { padding:5px 9px; font-size:11px; }
        }
      `}</style>

      <div className="ctt-top">
        <div className="ctt-stats">
          <span className="ctt-pill">🍃 Lá: <b>{model.totalLeaves}</b></span>
          <span className="ctt-pill">🍎 Quả chín: <b>{model.totalFruits}</b></span>
          <span className="ctt-pill">✨ XP: <b>{xp}</b></span>
          <span className="ctt-pill">🔥 Streak: <b>{streak}</b></span>
        </div>
      </div>

      <div className="ctt-stage">
        {/* Mặt trời (req #116: lấp khoảng trời trống) */}
        <svg style={{ position: 'absolute', top: '5%', right: '6vw', pointerEvents: 'none' }} width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="42" fill="#ffe08a" opacity="0.35" />
          <circle cx="55" cy="55" r="30" fill="#ffd24a" />
          <circle cx="55" cy="55" r="24" fill="#ffe37a" />
        </svg>
        {/* Mây */}
        <svg className="ctt-cloud c1" style={{ top: '8%', left: '5vw' }} width="120" height="50" viewBox="0 0 120 50">
          <ellipse cx="30" cy="30" rx="22" ry="16" fill="#fff" />
          <ellipse cx="55" cy="22" rx="26" ry="20" fill="#fff" />
          <ellipse cx="85" cy="32" rx="22" ry="16" fill="#fff" />
        </svg>
        <svg className="ctt-cloud c2" style={{ top: '18%', left: '35vw' }} width="160" height="60" viewBox="0 0 160 60">
          <ellipse cx="40" cy="36" rx="28" ry="20" fill="#fff" />
          <ellipse cx="80" cy="26" rx="34" ry="24" fill="#fff" />
          <ellipse cx="120" cy="38" rx="28" ry="20" fill="#fff" />
        </svg>
        <svg className="ctt-cloud c3" style={{ top: '6%', left: '60vw' }} width="100" height="44" viewBox="0 0 100 44">
          <ellipse cx="26" cy="26" rx="18" ry="14" fill="#fff" />
          <ellipse cx="50" cy="20" rx="22" ry="17" fill="#fff" />
          <ellipse cx="74" cy="28" rx="18" ry="14" fill="#fff" />
        </svg>

        <div className="ctt-ground" />

        {/* Cây vẽ động */}
        <svg ref={svgRef} className="ctt-tree" viewBox="0 0 1000 720" preserveAspectRatio="xMidYMax meet">
          {model.trunkPaths.map((d, i) => <path key={'t' + i} className="ctt-trunk" d={d} />)}
          <path className="ctt-trunk-dark" d={model.trunkDark} opacity={0.45} />
          {model.grains.map((d, i) => (
            <path key={'g' + i} d={d} stroke="#4a2710" strokeWidth={1.5} fill="none" opacity={0.35} />
          ))}
          {/* Tán lá xanh rậm phía sau nhánh (req #116) */}
          {model.canopy.map((b, i) => (
            <circle key={'cp' + i} cx={b.cx} cy={b.cy} r={b.r} fill={b.c} opacity={b.o} />
          ))}
          {model.canopyHi.map((b, i) => (
            <circle key={'ch' + i} cx={b.cx} cy={b.cy} r={b.r} fill="#7fd177" opacity={0.48} />
          ))}
          {model.branchPaths.map((b, i) => (
            <path key={'b' + i} className="ctt-branch" strokeWidth={b.w} d={b.d} />
          ))}
          {model.branchBlobs.map((b, i) => (
            <ellipse key={'bl' + i} cx={b.ex} cy={b.ey} rx={74} ry={64} fill={b.color} opacity={0.18} />
          ))}
          {model.nodes.map((n, i) =>
            n.kind === 'fruit' ? (
              <g
                key={'n' + i}
                className="ctt-leaf"
                onMouseEnter={(e) => showTip(e, n)}
                onMouseLeave={() => setTip(null)}
                onClick={() => { window.location.href = moduleHref(n.fid); }}
              >
                <circle cx={n.x} cy={n.y} r={11} fill={n.color} stroke="#fff" strokeWidth={2} />
                <circle cx={n.x - 3} cy={n.y - 3} r={3} fill="#fff" opacity={0.55} />
              </g>
            ) : (
              <g
                key={'n' + i}
                className="ctt-leaf"
                transform={`translate(${n.x},${n.y}) rotate(${n.ang})`}
                onMouseEnter={(e) => showTip(e, n)}
                onMouseLeave={() => setTip(null)}
                onClick={() => { window.location.href = moduleHref(n.fid); }}
              >
                <ellipse cx={0} cy={0} rx={6.5} ry={11} fill={n.color} stroke="#fff" strokeWidth={1.5} />
                <path d="M 0 -10 Q 2 0 0 10" stroke={n.color} strokeWidth={1} fill="none" opacity={0.5} />
              </g>
            ),
          )}
          {model.overflow.map((o, i) => (
            <g key={'o' + i} transform={`translate(${o.ex},${o.ey + 60})`}>
              <rect x={-22} y={-12} width={44} height={22} rx={11} fill={o.color} />
              <text x={0} y={3} textAnchor="middle" fontSize={11} fontWeight={800} fill="#fff">
                +{o.extra}
              </text>
            </g>
          ))}
          {/* Bụi cây + hoa tiền cảnh quanh gốc (req #116) */}
          {model.bushes.map((b, i) => (
            <g key={'bu' + i} transform={`translate(${b.bx},${b.y}) scale(${b.s})`}>
              <ellipse cx={0} cy={0} rx={70} ry={34} fill={b.c1} />
              <circle cx={-40} cy={-14} r={30} fill={b.c1} /><circle cx={40} cy={-14} r={30} fill={b.c1} />
              <circle cx={0} cy={-30} r={34} fill={b.c2} /><circle cx={-18} cy={-16} r={24} fill={b.c2} /><circle cx={22} cy={-14} r={22} fill={b.c2} />
            </g>
          ))}
          {model.flowers.map((f, i) => (
            <g key={'fl' + i} transform={`translate(${f.fx},${f.fy})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx={Math.cos((a * Math.PI) / 180) * 7} cy={Math.sin((a * Math.PI) / 180) * 7} rx={5} ry={3.4} fill={f.col} transform={`rotate(${a})`} />
              ))}
              <circle cx={0} cy={0} r={4} fill="#ffd54a" />
            </g>
          ))}
        </svg>
      </div>

      {model.totalLeaves === 0 && (
        <div className="ctt-empty">
          <div className="ic">🌱</div>
          <h3>Cây em chưa có lá nào!</h3>
          <p>Hãy hoàn thành các tuần học trong &quot;Không gian học&quot; để gieo những chiếc lá đầu tiên lên Cây Tri Thức nhé.</p>
          <a href="/space.html">🌳 Đến không gian học</a>
        </div>
      )}

      <div className="ctt-legend">
        <h4>🍃 Các nhánh môn học</h4>
        <div>
          {model.legend.map((b) => (
            <div className="row" key={b.key} data-branch={b.key}>
              <span className="dot" style={{ background: b.color }} />
              <span>{b.emoji} {b.label}</span>
              <span className="ct">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ctt-filter">
        {GRADE_FILTERS.map((f) => (
          <button
            key={f.grade || 'all'}
            className={activeGrade === f.grade ? 'on' : ''}
            onClick={() => setActiveGrade(f.grade)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {tip && (
        <div className="ctt-tip" style={{ left: tip.x, top: tip.y }}>
          <b>{tip.subject}</b>
          {tip.fid}
          <br />
          {'⭐'.repeat(tip.stars) + '☆'.repeat(3 - tip.stars)} · {tip.score} điểm · {tip.runs} lượt
        </div>
      )}
    </div>
  );
}
