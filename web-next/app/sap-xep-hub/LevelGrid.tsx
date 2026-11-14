'use client';

import { useCallback, useEffect, useState } from 'react';
import { LEVELS, type Level } from './topic-data';

// Port của renderLevels() trong sap-xep-hub.html + helper localStorage của medicines.js:
// lưới 10 cấp độ, khoá theo tiến độ (mở khi cấp trước đạt ≥1 sao), sao 0-3/cấp,
// đánh dấu cấp đang chọn, nút reset. Key localStorage giữ nguyên: tizia:progress, tizia:level.

const LEVEL_KEY = 'tizia:level';
const PROGRESS_KEY = 'tizia:progress';

type LevelStat = { stars?: number; bestScore?: number };
type Progress = Record<number, LevelStat>;

function readProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

function readCurrentLevel(): number {
  const n = parseInt(localStorage.getItem(LEVEL_KEY) || '1', 10);
  return LEVELS.find((l) => l.n === n) ? n : 1;
}

function isLevelUnlocked(n: number, progress: Progress): boolean {
  if (n === 1) return true;
  return (progress[n - 1]?.stars ?? 0) >= 1;
}

export default function LevelGrid() {
  // Trước khi mount client, dùng mặc định (Level 1, chưa có tiến độ) để SSR khớp.
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<Progress>({});
  const [current, setCurrent] = useState(1);

  const refresh = useCallback(() => {
    setProgress(readProgress());
    setCurrent(readCurrentLevel());
  }, []);

  useEffect(() => {
    setMounted(true);
    refresh();
  }, [refresh]);

  function selectLevel(l: Level) {
    if (!isLevelUnlocked(l.n, progress)) return;
    localStorage.setItem(LEVEL_KEY, String(l.n));
    setCurrent(l.n);
  }

  function resetProgress() {
    if (!confirm('Xoá toàn bộ tiến độ + sao đã đạt?')) return;
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(LEVEL_KEY);
    refresh();
  }

  const cur = LEVELS.find((l) => l.n === current) || LEVELS[0];
  const hint = mounted ? `Đang chọn: Level ${cur.n} · ${cur.label}` : 'Level 1 đang mở';

  return (
    <>
      <div className="sx-section-title">
        <h2>🎯 Chọn cấp độ</h2>
        <span className="sx-hint">{hint}</span>
        <span className="sx-actions">
          <button type="button" className="sx-reset" onClick={resetProgress}>
            ↺ Reset tiến độ
          </button>
        </span>
      </div>

      <div className="sx-levels">
        {LEVELS.map((l) => {
          const unlocked = isLevelUnlocked(l.n, progress);
          const stars = progress[l.n]?.stars ?? 0;
          const isCurrent = current === l.n;
          return (
            <button
              key={l.n}
              type="button"
              className={`sx-lvl ${unlocked ? '' : 'locked'} ${isCurrent ? 'current' : ''}`}
              title={`${l.label} — ${l.desc}`}
              onClick={() => selectLevel(l)}
              disabled={!unlocked}
            >
              {l.n === 10 && <span className="sx-badge-new">BOSS</span>}
              <div className="sx-num">{l.n}</div>
              <div className="sx-name">{l.label}</div>
              <div className="sx-stars">
                <span className="filled">{'★'.repeat(stars)}</span>
                <span className="empty">{'★'.repeat(3 - stars)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
