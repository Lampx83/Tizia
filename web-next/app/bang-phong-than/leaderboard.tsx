'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import './leaderboard.css';

// =============================================================
// Bảng Phong Thần — leaderboard tổng hợp top học sinh.
// Pull data từ /api/leaderboard (qua nhiều version) rồi merge điểm theo player.
// Không có data thật → hiển thị trạng thái trống (KHÔNG dùng mock).
// =============================================================

// ── Versions để gộp (chỉ chọn vài version chính có data thực) ──
const VERSIONS = ['quiz', '2d-arcade', '3d-shelf', 'time-attack', 'race'];

type Range = 'week' | 'month' | 'all';

type Entry = {
  player: string;
  score: number;
  runs: number;
  lastTs: number;
  badge?: string;
};

type MeUser = {
  username?: string;
  display_name?: string;
} | null;

type LeaderRow = {
  player_name?: string;
  score?: number | string;
  created_at?: string | number;
};

// ── Lấy leaderboard từ server (gộp nhiều version) ──
async function fetchLeaderboard(range: Range): Promise<Entry[]> {
  // range = 'week' | 'month' | 'all'  → filter client-side theo created_at
  const ranges: Record<Range, number> = { week: 7 * 86400000, month: 30 * 86400000, all: Infinity };
  const cutoff = Date.now() - ranges[range];

  const merged = new Map<string, Entry>(); // player → { score, runs, lastTs }
  let gotAny = false;

  await Promise.all(
    VERSIONS.map(async (v) => {
      try {
        const r = await fetch(`/api/leaderboard?version=${encodeURIComponent(v)}&limit=100`, {
          credentials: 'same-origin',
        });
        if (!r.ok) return;
        const rows = (await r.json()) as unknown;
        if (!Array.isArray(rows)) return;
        gotAny = true;
        for (const row of rows as LeaderRow[]) {
          const ts = new Date(row.created_at || 0).getTime();
          if (!Number.isFinite(ts) || ts < cutoff) continue;
          const name = String(row.player_name || 'Ẩn danh').trim() || 'Ẩn danh';
          const sc = Number(row.score) || 0;
          if (!merged.has(name)) merged.set(name, { player: name, score: 0, runs: 0, lastTs: 0 });
          const cur = merged.get(name)!;
          cur.score += sc;
          cur.runs++;
          if (ts > cur.lastTs) cur.lastTs = ts;
        }
      } catch {
        /* ignore từng version lỗi */
      }
    }),
  );

  if (!gotAny || merged.size === 0) {
    // Không có data thật → trả mảng rỗng, UI hiển thị trạng thái trống.
    return [];
  }

  // Sort theo điểm + gắn badge dựa subject (đơn giản hoá)
  const arr = [...merged.values()].sort((a, b) => b.score - a.score);
  const badges = ['Vua Toán 👑', 'Đại sư Văn 📜', 'Bậc thầy Anh 🌍', 'Học giả 🎓', 'Khám phá 🔬'];
  return arr.map((e, i) => ({ ...e, badge: badges[i % badges.length] }));
}

// Pixel art avatar placeholder — emoji dựa hash tên
function avatarFor(name: string): string {
  const emojis = ['🦊', '🐼', '🐨', '🦁', '🐯', '🐸', '🐵', '🦄', '🐲', '🐱', '🐶', '🦉', '🐰', '🦝', '🐺', '🐮', '🦒', '🦓', '🐧', '🐳'];
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return emojis[h % emojis.length];
}

// ── Particle sao bay ──
function makeStars() {
  const glyphs = ['⭐', '✨', '💫', '🌟'];
  const N = 18;
  return Array.from({ length: N }, (_, i) => ({
    ch: glyphs[i % glyphs.length],
    left: Math.random() * 100 + '%',
    fontSize: 10 + Math.random() * 16 + 'px',
    animationDuration: 12 + Math.random() * 18 + 's',
    animationDelay: -Math.random() * 20 + 's',
    opacity: (0.3 + Math.random() * 0.5).toFixed(2),
  }));
}

export default function Leaderboard() {
  const [range, setRange] = useState<Range>('week');
  const [me, setMe] = useState<MeUser>(null);
  const [entries, setEntries] = useState<Entry[] | null>(null); // null = loading
  const [moreOpen, setMoreOpen] = useState(false);

  // Sao bay: sinh 1 lần ở client (tránh mismatch SSR).
  const [stars, setStars] = useState<ReturnType<typeof makeStars>>([]);
  useEffect(() => setStars(makeStars()), []);

  // Lấy user hiện tại (1 lần).
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
        if (r.ok) {
          const data = await r.json();
          if (alive) setMe(data?.user || null);
        }
      } catch {
        /* guest → null */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Load leaderboard mỗi khi đổi range.
  useEffect(() => {
    let alive = true;
    setEntries(null);
    setMoreOpen(false);
    (async () => {
      const data = await fetchLeaderboard(range);
      if (alive) setEntries(data);
    })();
    return () => {
      alive = false;
    };
  }, [range]);

  const isCurrentUser = useMemo(() => {
    const my = (me?.display_name || me?.username || '').trim();
    return (playerName: string) =>
      !!my && my.toLowerCase() === playerName.toLowerCase();
  }, [me]);

  const top3 = entries?.slice(0, 3) ?? [];
  const mid = entries?.slice(3, 10) ?? [];
  const tail = entries?.slice(10, 50) ?? [];
  const maxScore = entries?.[0]?.score || 1;

  const renderRow = (e: Entry, rank: number) => {
    const pct = maxScore ? Math.max(4, (e.score / maxScore) * 100) : 0;
    const you = isCurrentUser(e.player);
    return (
      <div className={'row' + (you ? ' you' : '')} key={rank + ':' + e.player}>
        <div className="rank">#{rank}</div>
        <div className="name">{e.player}</div>
        <div className="badge">{e.badge || ''}</div>
        <div className="score">{(e.score | 0).toLocaleString('vi-VN')}</div>
        <div className="bar-mini">
          <i style={{ width: pct + '%' }} />
        </div>
      </div>
    );
  };

  const podSlot = (e: Entry, rank: 1 | 2 | 3) => (
    <div className="pod-slot">
      <div className={`pod-avatar r${rank}`}>
        {rank === 1 && <span className="pod-crown">👑</span>}
        {avatarFor(e.player)}
      </div>
      <div className="pod-name">
        {e.player}
        {isCurrentUser(e.player) && <span style={{ color: 'var(--neon-y)' }}> ★</span>}
      </div>
      <div className="pod-score">{(e.score | 0).toLocaleString('vi-VN')}</div>
      <div className={`pod-bar r${rank}`}>{rank}</div>
    </div>
  );

  return (
    <div className="bpt-scope">
      <div className="stars">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: s.left,
              fontSize: s.fontSize,
              animationDuration: s.animationDuration,
              animationDelay: s.animationDelay,
              opacity: Number(s.opacity),
            }}
          >
            {s.ch}
          </span>
        ))}
      </div>

      <div className="top">
        <Link className="back" href="/">
          ← Tizia
        </Link>
        <a className="back" href="/cay-tri-thuc">
          🌳 Cây Tri Thức
        </a>
        <a className="back" href="/pet-tri-thuc">
          🐣 Pet Tri Thức
        </a>
      </div>

      <main>
        <div className="hero">
          <h1>🏆 Bảng Phong Thần Tizia</h1>
          <p>Nơi vinh danh những cao thủ tri thức · Cập nhật theo thời gian thực</p>
        </div>

        <div className="tabs">
          {(
            [
              ['week', '📅 Tuần'],
              ['month', '🌙 Tháng'],
              ['all', '∞ Tất cả'],
            ] as [Range, string][]
          ).map(([r, label]) => (
            <button
              key={r}
              className={'tab' + (range === r ? ' on' : '')}
              onClick={() => range !== r && setRange(r)}
            >
              {label}
            </button>
          ))}
        </div>

        <div id="content">
          {entries === null ? (
            <div className="loading">
              <div className="spinner" />
              <div>Đang tải bảng xếp hạng…</div>
            </div>
          ) : entries.length === 0 ? (
            <div className="empty">
              <div className="ic">🏜️</div>
              <p>Chưa có cao thủ nào ở khoảng thời gian này!</p>
            </div>
          ) : (
            <>
              {top3.length < 3 ? (
                <div className="empty">
                  <div className="ic">🏜️</div>
                  <p>Chưa đủ 3 cao thủ ở khoảng thời gian này. Hãy là người đầu tiên!</p>
                </div>
              ) : (
                <div className="podium">
                  {podSlot(top3[1], 2)}
                  {podSlot(top3[0], 1)}
                  {podSlot(top3[2], 3)}
                </div>
              )}

              {mid.length > 0 && (
                <div className="leader-list">
                  {mid.map((e, i) => renderRow(e, 4 + i))}
                </div>
              )}

              {tail.length > 0 && (
                <div className={'more-wrap' + (moreOpen ? ' open' : '')}>
                  <button className="more-toggle" onClick={() => setMoreOpen((o) => !o)}>
                    <span>👥 Xem top 11 → {10 + tail.length}</span>
                    <span className="chev">▼</span>
                  </button>
                  <div className="more-list">
                    {tail.map((e, i) => renderRow(e, 11 + i))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="foot">
          Bảng cập nhật mỗi 5 phút · điểm = tổng best_score × stars trên các tuần đã hoàn thành.
          <br />
          Muốn lọt top? Hãy chinh phục thêm tuần học ở <a href="/space">Không gian học</a>!
        </div>
      </main>
    </div>
  );
}
