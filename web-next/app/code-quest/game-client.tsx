'use client';

// ============================================================
// Code Quest — game kéo-thả khối lệnh + robot chạy trên canvas.
// Port 1:1 hành vi từ public/code-quest.html (inline <script>) sang React:
//   • state.program → React state (mảng khối {id,num,indent}).
//   • DOM thao tác tay → render qua JSX; canvas giữ nguyên, vẽ trong useEffect.
//   • drag/drop từ thư viện khối → workspace, chỉnh N, xoá, indent (dblclick).
//   • trình thông dịch async (move/turn/pick/repeat/if_*) giữ nguyên logic.
//   • điểm tốt nhất lưu localStorage (client-only), không gọi API.
// Toàn bộ text tiếng Việt, luật thắng, level giữ nguyên bản gốc.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BLOCKS, fetchLevels, type Level } from './levels';

type ProgBlock = { id: string; num?: number; indent: number };
type World = {
  w: number;
  h: number;
  robot: { x: number; y: number; dir: number } | null;
  goal: { x: number; y: number } | null;
  stars: Set<string>;
  walls: Set<string>;
  collected: number;
};
type BestMap = Record<number, number>;

const LS_KEY = 'code-quest.best';

function loadBest(): BestMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}') as BestMap;
  } catch {
    return {};
  }
}

// ── Dựng world từ grid ──
function parseGrid(rows: string[]): World {
  const w = rows[0].length;
  const h = rows.length;
  let robot: World['robot'] = null;
  let goal: World['goal'] = null;
  const stars = new Set<string>();
  const walls = new Set<string>();
  for (let y = 0; y < h; y++) {
    const row = rows[y];
    for (let x = 0; x < w; x++) {
      const ch = row[x];
      if (ch === '#') walls.add(`${x},${y}`);
      else if (ch === 'G') goal = { x, y };
      else if (ch === 'S') stars.add(`${x},${y}`);
      else if (ch === 'R') robot = { x, y, dir: 0 }; // 0=phải,1=xuống,2=trái,3=lên
      else if (ch === 'U') robot = { x, y, dir: 3 };
      else if (ch === 'L') robot = { x, y, dir: 2 };
      else if (ch === 'D') robot = { x, y, dir: 1 };
    }
  }
  return { w, h, robot, goal, stars, walls, collected: 0 };
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const dirToDelta = (dir: number): [number, number] => [[1, 0], [0, 1], [-1, 0], [0, -1]][dir] as [number, number];

type Toast = { msg: string; kind: '' | 'err' | 'win' } | null;

export default function GameClient() {
  // Content (10 level) đến từ DB qua /api/content/code-quest-levels (không hardcode).
  const [levels, setLevels] = useState<Level[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error' | 'empty'>('loading');
  const [levelIdx, setLevelIdx] = useState(0);
  const [program, setProgram] = useState<ProgBlock[]>([]);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState<BestMap>({});
  const [toast, setToast] = useState<Toast>(null);
  const [runningIdx, setRunningIdx] = useState<number>(-1);
  const [dragOver, setDragOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const cancelledRef = useRef(false);
  const runningRef = useRef(false);
  const programRef = useRef<ProgBlock[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  programRef.current = program;
  const lvl: Level | undefined = levels[levelIdx];

  useEffect(() => {
    setBest(loadBest());
  }, []);

  // Nạp content từ DB khi mount. Degrade an toàn nếu lỗi/rỗng — không vỡ trang.
  useEffect(() => {
    let alive = true;
    fetchLevels()
      .then((items) => {
        if (!alive) return;
        if (!items.length) {
          setLoadState('empty');
          return;
        }
        setLevels(items);
        setLoadState('ready');
      })
      .catch(() => {
        if (alive) setLoadState('error');
      });
    return () => {
      alive = false;
    };
  }, []);

  function saveBest(levelId: number, count: number) {
    setBest((prev) => {
      if (prev[levelId] && count >= prev[levelId]) return prev;
      const next = { ...prev, [levelId]: count };
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  // ── Vẽ world ──
  const drawWorld = useCallback(() => {
    const c = canvasRef.current;
    const world = worldRef.current;
    if (!c || !world) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const { w, h } = world;
    const cell = c.width / w;
    ctx.clearRect(0, 0, c.width, c.height);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#f0fdf4' : '#dcfce7';
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
    ctx.font = `${Math.floor(cell * 0.78)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    world.walls.forEach((k) => {
      const [x, y] = k.split(',').map(Number);
      ctx.fillText('🟫', x * cell + cell / 2, y * cell + cell / 2 + 2);
    });
    world.stars.forEach((k) => {
      const [x, y] = k.split(',').map(Number);
      ctx.fillText('⭐', x * cell + cell / 2, y * cell + cell / 2 + 2);
    });
    if (world.goal) {
      const { x, y } = world.goal;
      ctx.fillText('🚩', x * cell + cell / 2, y * cell + cell / 2 + 2);
    }
    if (world.robot) {
      const { x, y, dir } = world.robot;
      ctx.save();
      ctx.translate(x * cell + cell / 2, y * cell + cell / 2 + 2);
      ctx.rotate((dir * Math.PI) / 2);
      ctx.fillText('🤖', 0, 0);
      ctx.restore();
    }
  }, []);

  const resetWorld = useCallback(() => {
    const cur = levels[levelIdx];
    if (!cur) return;
    worldRef.current = parseGrid(cur.grid);
    drawWorld();
  }, [levels, levelIdx, drawWorld]);

  // Khi đổi level → reset world + chương trình.
  useEffect(() => {
    cancelledRef.current = true;
    runningRef.current = false;
    setRunning(false);
    setRunningIdx(-1);
    setProgram([]);
    resetWorld();
  }, [levelIdx, resetWorld]);

  // ── Toast ──
  const showToast = useCallback((msg: string, kind: '' | 'err' | 'win' = '') => {
    setToast({ msg, kind });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  // ── Thêm / xoá khối ──
  const addBlock = useCallback((blockId: string, indent = 0) => {
    const def = BLOCKS[blockId];
    if (!def) return;
    setProgram((prev) => [...prev, { id: blockId, num: def.hasNum ? def.defNum : undefined, indent }]);
  }, []);

  const removeBlock = (i: number) => setProgram((prev) => prev.filter((_, k) => k !== i));

  const setNum = (i: number, v: number) => {
    const val = Math.max(1, Math.min(50, v || 1));
    setProgram((prev) => prev.map((b, k) => (k === i ? { ...b, num: val } : b)));
  };

  // dblclick: bật/tắt indent (chỉ khi phía trên có container ở indent 0).
  const toggleIndent = (i: number) => {
    setProgram((prev) => {
      const b = prev[i];
      let hasContainerAbove = false;
      for (let k = i - 1; k >= 0; k--) {
        if (BLOCKS[prev[k].id]?.isContainer && prev[k].indent === 0) {
          hasContainerAbove = true;
          break;
        }
      }
      let indent = b.indent;
      if (b.indent === 0 && hasContainerAbove) indent = 1;
      else if (b.indent === 1) indent = 0;
      return prev.map((bb, k) => (k === i ? { ...bb, indent } : bb));
    });
  };

  // ── Drop từ thư viện ──
  const onDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    setDragOver(false);
    const id = ev.dataTransfer.getData('text/block');
    if (!id) return;
    let indent = 0;
    const prev = programRef.current;
    if (prev.length) {
      const last = prev[prev.length - 1];
      if (BLOCKS[last.id]?.isContainer) indent = 1;
    }
    addBlock(id, indent);
  };

  // ── Trình thông dịch ──
  type Node = ProgBlock & { children?: Node[]; srcIdx?: number };

  const compileWithRefs = useCallback((): Node[] => {
    const prog = programRef.current;
    const out: Node[] = [];
    let i = 0;
    while (i < prog.length) {
      const b = prog[i];
      if (b.indent !== 0) {
        i++;
        continue;
      }
      const node: Node = { ...b, srcIdx: i };
      if (BLOCKS[b.id]?.isContainer) {
        const children: Node[] = [];
        let j = i + 1;
        while (j < prog.length && prog[j].indent === 1) {
          children.push({ ...prog[j], srcIdx: j });
          j++;
        }
        node.children = children;
        out.push(node);
        i = j;
      } else {
        out.push(node);
        i++;
      }
    }
    return out;
  }, []);

  const frontCell = (world: World) => {
    const [dx, dy] = dirToDelta(world.robot!.dir);
    return { x: world.robot!.x + dx, y: world.robot!.y + dy };
  };
  const isWall = (world: World, x: number, y: number) => {
    if (x < 0 || y < 0 || x >= world.w || y >= world.h) return true;
    return world.walls.has(`${x},${y}`);
  };
  const hasStarAtFront = (world: World) => {
    const { x, y } = frontCell(world);
    return world.stars.has(`${x},${y}`);
  };
  const frontIsClear = (world: World) => {
    const { x, y } = frontCell(world);
    return !isWall(world, x, y);
  };
  const atGoal = (world: World) =>
    !!world.goal && world.robot!.x === world.goal.x && world.robot!.y === world.goal.y;

  const exec = useCallback(
    async (tree: Node[], ctx: { speed: number; crashed: boolean }) => {
      const world = worldRef.current!;
      for (const node of tree) {
        if (cancelledRef.current) return;
        setRunningIdx(node.srcIdx ?? -1);
        await sleep(ctx.speed);
        const id = node.id;
        if (id === 'move') {
          const { x, y } = frontCell(world);
          if (isWall(world, x, y)) {
            ctx.crashed = true;
            return;
          }
          world.robot!.x = x;
          world.robot!.y = y;
          drawWorld();
        } else if (id === 'turn_left') {
          world.robot!.dir = (world.robot!.dir + 3) % 4;
          drawWorld();
        } else if (id === 'turn_right') {
          world.robot!.dir = (world.robot!.dir + 1) % 4;
          drawWorld();
        } else if (id === 'pick') {
          const k = `${world.robot!.x},${world.robot!.y}`;
          const front = frontCell(world);
          const fk = `${front.x},${front.y}`;
          let took: string | null = null;
          if (world.stars.has(k)) took = k;
          else if (world.stars.has(fk)) took = fk;
          if (took) {
            world.stars.delete(took);
            world.collected++;
            drawWorld();
          }
        } else if (id === 'wait') {
          await sleep(900);
        } else if (id === 'end') {
          return;
        } else if (id === 'repeat') {
          const n = Math.max(1, Math.min(50, node.num || 1));
          for (let r = 0; r < n; r++) {
            if (cancelledRef.current || ctx.crashed) return;
            await exec(node.children || [], ctx);
          }
        } else if (id === 'if_gold') {
          if (hasStarAtFront(world)) await exec(node.children || [], ctx);
        } else if (id === 'if_clear') {
          if (frontIsClear(world)) await exec(node.children || [], ctx);
        } else if (id === 'at_goal') {
          if (atGoal(world)) await exec(node.children || [], ctx);
        }
        setRunningIdx(-1);
      }
    },
    [drawWorld],
  );

  const celebrate = () => {
    const emojis = ['🎉', '⭐', '✨', '🌟', '🎊', '💫'];
    for (let i = 0; i < 16; i++) {
      const e = document.createElement('div');
      e.className = 'cq-burst';
      e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      e.style.left = `${30 + Math.random() * 40}%`;
      e.style.top = `${40 + Math.random() * 20}%`;
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 1700);
    }
  };

  const runProgram = useCallback(async () => {
    if (runningRef.current) return;
    if (!programRef.current.length) {
      showToast('Hãy thêm vài khối lệnh trước!', 'err');
      return;
    }
    runningRef.current = true;
    setRunning(true);
    cancelledRef.current = false;
    resetWorld();
    const tree = compileWithRefs();
    const ctx = { speed: 320, crashed: false };
    await exec(tree, ctx);
    setRunningIdx(-1);
    runningRef.current = false;
    setRunning(false);
    if (ctx.crashed) {
      showToast('💥 Robot va vào tường! Thử lại nhé.', 'err');
      return;
    }
    const world = worldRef.current!;
    const cur = levels[levelIdx];
    if (!cur) return;
    const initial = parseGrid(cur.grid);
    const requireStars = initial.stars.size > 0 && [4, 7, 9].includes(cur.id);
    if (atGoal(world) && (!requireStars || world.stars.size === 0)) {
      const count = programRef.current.length;
      saveBest(cur.id, count);
      celebrate();
      showToast(`🎉 Bạn đã thắng level ${cur.id}! (${count} khối)`, 'win');
    } else if (atGoal(world)) {
      showToast('🚩 Tới đích rồi nhưng còn sót ⭐. Thử nhặt hết nhé!', 'err');
    } else {
      showToast('❌ Robot chưa đến đích. Kiểm tra lại chương trình.', 'err');
    }
  }, [compileWithRefs, exec, levels, levelIdx, resetWorld, showToast]);

  const doReset = () => {
    cancelledRef.current = true;
    runningRef.current = false;
    setRunning(false);
    setRunningIdx(-1);
    resetWorld();
  };

  const clearWorkspace = () => {
    if (!program.length) return;
    if (!confirm('Xoá toàn bộ chương trình?')) return;
    setProgram([]);
  };

  const showHint = () => {
    if (!lvl) return;
    const tokens = lvl.hint;
    const used = new Set<string>();
    tokens.forEach((t) => {
      const id = t.split(':')[0];
      if (BLOCKS[id]) used.add(id);
    });
    const list = Array.from(used)
      .map((id) => `${BLOCKS[id].ic} ${BLOCKS[id].label}`)
      .join(', ');
    showToast(`💡 Thử dùng: ${list}`);
  };

  const loadLevel = (idx: number) => {
    if (idx < 0 || idx >= levels.length) return;
    setLevelIdx(idx);
  };

  const bestForLevel = lvl ? best[lvl.id] : undefined;
  const blockEntries = useMemo(() => Object.entries(BLOCKS), []);

  // Chưa có content (đang tải / lỗi / rỗng) → màn chờ gọn, không vỡ trang.
  if (loadState !== 'ready' || !lvl) {
    const msg =
      loadState === 'error'
        ? '⚠️ Không tải được các màn chơi. Vui lòng thử lại sau.'
        : loadState === 'empty'
          ? '📭 Chưa có màn chơi nào.'
          : '⏳ Đang tải các màn chơi…';
    return (
      <div className="cq-root">
        <header className="cq-top">
          <a className="cq-back" href="/">
            ← Tizia
          </a>
          <span className="cq-title">🤖 Code Quest</span>
        </header>
        <div className="cq-loading">{msg}</div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="cq-root">
      <header className="cq-top">
        <a className="cq-back" href="/">
          ← Tizia
        </a>
        <span className="cq-title">🤖 Code Quest</span>
        <div className="cq-stats">
          <span className="cq-pill">
            Level: <b>{lvl.id}</b>/{levels.length}
          </span>
          <span className="cq-pill">
            Khối: <b>{program.length}</b>
          </span>
          <span className="cq-pill">
            Tốt nhất: <b>{bestForLevel ?? '—'}</b>
          </span>
        </div>
      </header>

      <div className="cq-level-row">
        {levels.map((l, i) => (
          <button
            key={l.id}
            type="button"
            className={`cq-level-btn${i === levelIdx ? ' active' : ''}${best[l.id] ? ' solved' : ''}`}
            onClick={() => loadLevel(i)}
          >
            Level {l.id}
            {best[l.id] ? ' ⭐' : ''}
          </button>
        ))}
      </div>

      <div className="cq-layout">
        {/* LEFT: thư viện khối */}
        <aside className="cq-panel">
          <h3>🧩 Thư viện khối</h3>
          <div className="cq-blocks">
            {blockEntries.map(([id, def]) => (
              <div
                key={id}
                className={`cq-block-item ${def.cls}`}
                draggable
                onDragStart={(ev) => {
                  ev.dataTransfer.setData('text/block', id);
                  ev.dataTransfer.effectAllowed = 'copy';
                }}
                onClick={() => addBlock(id)}
              >
                <span className="ic">{def.ic}</span>
                <span>{def.label}</span>
              </div>
            ))}
          </div>
          <div className="cq-help">Kéo khối thả vào khu làm việc bên phải, hoặc bấm để thêm.</div>
        </aside>

        {/* CENTER: khu làm việc */}
        <main className="cq-panel">
          <h3>🧪 Khu làm việc</h3>
          <div
            className={`cq-workspace${dragOver ? ' drag-over' : ''}`}
            onDragOver={(ev) => {
              ev.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            {program.length === 0 ? (
              <div className="cq-ws-empty">
                Kéo khối vào đây để xếp chương trình.
                <br />
                Robot 🤖 sẽ chạy theo thứ tự từ trên xuống.
              </div>
            ) : (
              program.map((b, i) => {
                const def = BLOCKS[b.id];
                return (
                  <div
                    key={i}
                    className={`cq-ws-block ${def.cls}${b.indent ? ' indent' : ''}${
                      runningIdx === i ? ' running' : ''
                    }`}
                    onDoubleClick={() => toggleIndent(i)}
                  >
                    <span className="ic">{def.ic}</span>
                    <span>{def.label}</span>
                    {def.hasNum && (
                      <input
                        className="cq-num-input"
                        type="number"
                        min={1}
                        max={50}
                        value={b.num ?? def.defNum ?? 1}
                        onChange={(e) => setNum(i, Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={(e) => e.stopPropagation()}
                      />
                    )}
                    <button
                      className="cq-rm"
                      title="Xoá khối"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBlock(i);
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })
            )}
          </div>
          <div className="cq-run-row" style={{ marginTop: 10 }}>
            <button className="cq-btn cq-btn-run" onClick={runProgram} disabled={running}>
              ▶️ Chạy
            </button>
            <button className="cq-btn cq-btn-reset" onClick={doReset}>
              ⏮️ Đặt lại
            </button>
            <button className="cq-btn cq-btn-clear" onClick={clearWorkspace}>
              🗑️
            </button>
          </div>
        </main>

        {/* RIGHT: thế giới */}
        <aside className="cq-panel cq-world-wrap">
          <h3>🌍 Thế giới</h3>
          <canvas ref={canvasRef} id="cq-world-canvas" width={288} height={288} />
          <div className="cq-level-info">
            <b>
              Level {lvl.id}: {lvl.name}
            </b>
            <br />
            {lvl.desc}
          </div>
          <div className="cq-run-row">
            <button className="cq-btn cq-btn-hint" onClick={showHint}>
              💡 Gợi ý
            </button>
            <button className="cq-btn cq-btn-reset" onClick={() => loadLevel(levelIdx - 1)}>
              ◀ Trước
            </button>
            <button className="cq-btn cq-btn-reset" onClick={() => loadLevel(levelIdx + 1)}>
              Tiếp ▶
            </button>
          </div>
        </aside>
      </div>

      {toast && <div className={`cq-toast show ${toast.kind}`}>{toast.msg}</div>}

      <style>{styles}</style>
    </div>
  );
}

// ── CSS scoped (thương hiệu riêng của trang: nền xanh + khối màu theo loại) ──
const styles = `
.cq-root {
  --cq-bg-1:#1e3a8a; --cq-bg-2:#1d4ed8; --cq-bg-3:#3b82f6;
  --cq-ink:#0f172a; --cq-ink-soft:#475569;
  --cq-card-soft:#f1f5f9; --cq-accent:#facc15;
  --cq-border:rgba(15,23,42,.12);
  position: relative;
  margin: -16px calc(50% - 50vw);
  min-height: calc(100vh - 60px);
  font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif;
  color:var(--cq-ink);
  background: linear-gradient(135deg, var(--cq-bg-1) 0%, var(--cq-bg-2) 55%, var(--cq-bg-3) 100%);
}
.cq-top { display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  padding:10px 18px; background:rgba(15,23,42,.35); border-bottom:1px solid rgba(255,255,255,.1); color:#fff; }
.cq-back { background:rgba(255,255,255,.18); color:#fff; text-decoration:none; padding:7px 14px; border-radius:18px; font-size:13px; font-weight:600; }
.cq-back:hover { background:rgba(255,255,255,.3); }
.cq-title { font-size:16px; font-weight:800; color:#fff; display:flex; align-items:center; gap:8px; }
.cq-stats { display:flex; gap:8px; margin-left:auto; flex-wrap:wrap; }
.cq-pill { background:rgba(255,255,255,.92); border:1px solid rgba(255,255,255,.5); padding:6px 13px; border-radius:18px; font-size:12.5px; font-weight:700; color:var(--cq-ink); display:flex; gap:6px; align-items:center; box-shadow:0 4px 12px rgba(0,0,0,.15); }
.cq-pill b { color:#1d4ed8; }

.cq-level-row { display:flex; gap:6px; padding:10px 18px; flex-wrap:wrap; max-width:1320px; margin:0 auto; }
.cq-level-btn { background:rgba(255,255,255,.15); color:#fff; border:1px solid rgba(255,255,255,.25); padding:6px 12px; border-radius:14px; cursor:pointer; font-family:inherit; font-size:12.5px; font-weight:700; transition:background .12s, transform .12s; }
.cq-level-btn:hover { background:rgba(255,255,255,.28); }
.cq-level-btn.active { background:var(--cq-accent); color:#0f172a; border-color:transparent; transform:scale(1.05); }

.cq-layout { display:grid; grid-template-columns: 230px 1fr 320px; gap:14px; padding:0 18px 18px; max-width:1320px; margin:0 auto; }
@media (max-width:1100px) { .cq-layout { grid-template-columns: 1fr; } }

.cq-panel { background:rgba(255,255,255,.95); border:1px solid var(--cq-border); border-radius:14px; padding:14px; box-shadow:0 8px 24px rgba(0,0,0,.15); }
.cq-panel h3 { margin:0 0 10px; font-size:13px; font-weight:800; color:var(--cq-ink); display:flex; align-items:center; gap:6px; }

.cq-blocks { display:flex; flex-direction:column; gap:6px; max-height:62vh; overflow-y:auto; }
.cq-block-item { display:flex; align-items:center; gap:7px; padding:8px 11px; border-radius:8px; cursor:grab; user-select:none; color:#fff; font-size:12.5px; font-weight:700; box-shadow:0 2px 6px rgba(0,0,0,.18); transition:transform .12s; }
.cq-block-item:hover { transform:translateX(4px); }
.cq-block-item:active { cursor:grabbing; transform:scale(0.97); }
.cq-block-item .ic { font-size:14px; }

.b-move    { background:linear-gradient(135deg,#06b6d4,#0891b2); }
.b-turn    { background:linear-gradient(135deg,#a855f7,#7e22ce); }
.b-loop    { background:linear-gradient(135deg,#f97316,#c2410c); }
.b-cond    { background:linear-gradient(135deg,#22c55e,#15803d); }
.b-action  { background:linear-gradient(135deg,#facc15,#a16207); color:#0f172a !important; text-shadow:none; }
.b-end     { background:linear-gradient(135deg,#64748b,#334155); }
.b-wait    { background:linear-gradient(135deg,#ec4899,#be185d); }

.cq-workspace { min-height:440px; background:var(--cq-card-soft); border:2px dashed var(--cq-border); border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:6px; overflow-y:auto; max-height:62vh; }
.cq-workspace.drag-over { border-color:var(--cq-accent); background:#fef9c3; }
.cq-ws-block { display:flex; align-items:center; gap:7px; padding:8px 11px; border-radius:8px; user-select:none; color:#fff; font-size:12.5px; font-weight:700; box-shadow:0 2px 6px rgba(0,0,0,.18); position:relative; cursor:grab; }
.cq-ws-block.indent { margin-left:24px; }
.cq-ws-block.indent::before { content:'└'; position:absolute; left:-16px; top:50%; transform:translateY(-50%); color:var(--cq-ink-soft); font-size:14px; }
.cq-num-input { width:36px; padding:2px 4px; border-radius:5px; border:1px solid rgba(255,255,255,.4); background:rgba(255,255,255,.95); color:#0f172a; font-size:12px; font-weight:700; font-family:inherit; text-align:center; margin-left:auto; }
.cq-rm { background:rgba(0,0,0,.25); color:#fff; border:none; border-radius:5px; width:18px; height:18px; cursor:pointer; font-size:11px; font-weight:700; margin-left:6px; }
.cq-rm:hover { background:rgba(220,38,38,.85); }
.cq-ws-block.running { box-shadow:0 0 0 3px var(--cq-accent), 0 2px 6px rgba(0,0,0,.18); }
.cq-ws-empty { color:var(--cq-ink-soft); font-size:12.5px; text-align:center; padding:30px; font-style:italic; }

.cq-world-wrap { display:flex; flex-direction:column; align-items:center; gap:10px; }
#cq-world-canvas { background:#fff; border-radius:10px; box-shadow:inset 0 0 0 1px var(--cq-border); max-width:100%; }
.cq-level-info { width:100%; background:var(--cq-card-soft); padding:10px 12px; border-radius:9px; font-size:12.5px; line-height:1.5; color:var(--cq-ink); }
.cq-level-info b { color:#1d4ed8; }

.cq-run-row { display:flex; gap:7px; width:100%; }
.cq-btn { padding:10px; border-radius:10px; cursor:pointer; font-family:inherit; font-size:12.5px; font-weight:800; border:none; flex:1; transition:transform .12s, box-shadow .15s; }
.cq-btn:disabled { opacity:.6; cursor:default; }
.cq-btn-run { background:linear-gradient(135deg,#22c55e,#15803d); color:#fff; box-shadow:0 4px 12px rgba(34,197,94,.4); }
.cq-btn-run:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(34,197,94,.5); }
.cq-btn-reset { background:rgba(15,23,42,.08); color:var(--cq-ink); }
.cq-btn-reset:hover { background:rgba(15,23,42,.16); }
.cq-btn-hint { background:linear-gradient(135deg,#facc15,#ca8a04); color:#0f172a; box-shadow:0 4px 12px rgba(250,204,21,.4); }
.cq-btn-clear { background:#fee2e2; color:#991b1b; }

.cq-help { font-size:11px; color:var(--cq-ink-soft); margin-top:6px; line-height:1.45; }

.cq-loading { max-width:1320px; margin:0 auto; padding:60px 18px; text-align:center; color:#fff; font-size:15px; font-weight:700; }

.cq-toast { position:fixed; left:50%; top:80px; transform:translateX(-50%) translateY(0); z-index:80; background:#16a34a; color:#fff; padding:11px 22px; border-radius:14px; font-weight:700; font-size:14px; box-shadow:0 8px 24px rgba(22,163,74,.5); pointer-events:none; max-width:380px; text-align:center; }
.cq-toast.err { background:#dc2626; box-shadow:0 8px 24px rgba(220,38,38,.5); }
.cq-toast.win { background:linear-gradient(135deg,#facc15,#16a34a); color:#0f172a; font-size:15px; padding:14px 26px; }

.cq-burst { position:fixed; pointer-events:none; font-size:22px; z-index:75; animation: cq-burst-up 1.6s ease-out forwards; }
@keyframes cq-burst-up { from { transform: translateY(0) scale(.6); opacity:1; } to { transform: translateY(-220px) scale(1.4) rotate(180deg); opacity:0; } }
`;
