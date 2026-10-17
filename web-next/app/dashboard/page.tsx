'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// "Migrate trang thật": bản Next của dashboard.html (bảng điều khiển giáo viên) —
// thống kê theo chế độ + bảng xếp hạng, tất cả tương tác bằng state React, dữ liệu
// thật từ /api/leaderboard của Express Tizia. Đây là Client Component (Radix Tabs/Slider).
type Row = { player_name?: string; player?: string; score: number; correct?: number; total?: number };
const MODES = [
  { id: '2d-arcade', label: '2D Arcade' },
  { id: '3d-shelf', label: '3D Realistic' },
  { id: 'quiz', label: 'Quiz' },
];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-2xl font-semibold text-primary">{value}</div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [mode, setMode] = useState('2d-arcade');
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [minScore, setMinScore] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/leaderboard?version=${mode}&limit=20`, { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { if (alive) { setRows(Array.isArray(data) ? data : []); setLoading(false); } })
      .catch(() => { if (alive) { setRows([]); setLoading(false); } });
    return () => { alive = false; };
  }, [mode]);

  const stats = useMemo(() => {
    const n = rows.length;
    const max = n ? Math.max(...rows.map((r) => r.score)) : 0;
    const avg = n ? Math.round(rows.reduce((s, r) => s + r.score, 0) / n) : 0;
    const perfect = rows.filter((r) => r.correct != null && r.total != null && r.correct === r.total).length;
    return { n, max, avg, perfect };
  }, [rows]);

  const filtered = rows.filter((r) => r.score >= minScore);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">📊 Bảng điều khiển</h1>
        <p className="text-muted-foreground">Thống kê + xếp hạng theo chế độ — state React, không reload.</p>
      </div>

      <Tabs value={mode} onValueChange={setMode}>
        <TabsList>
          {MODES.map((m) => (
            <TabsTrigger key={m.id} value={m.id}>{m.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
        ) : (
          <>
            <Stat label="Lượt chơi" value={stats.n} />
            <Stat label="Điểm cao" value={stats.max} />
            <Stat label="Điểm TB" value={stats.avg} />
            <Stat label="Perfect" value={stats.perfect} />
          </>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Lọc điểm tối thiểu: <span className="text-primary">{minScore}</span></CardTitle>
          <CardDescription>Kéo để lọc — cập nhật tức thì.</CardDescription>
        </CardHeader>
        <CardContent>
          <Slider value={[minScore]} min={0} max={300} step={10} onValueChange={([v]) => setMinScore(v)} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Xếp hạng · {MODES.find((m) => m.id === mode)?.label}</CardTitle>
          <CardDescription>Hiển thị {filtered.length}/{rows.length} kết quả.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-9" />)}</div>
          ) : filtered.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">Không có kết quả (hạ điểm tối thiểu, hoặc backend chưa chạy).</p>
          ) : (
            <ul className="divide-y">
              {filtered.map((r, i) => (
                <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                  <span><span className="mr-3 text-muted-foreground">{i + 1}</span>{r.player_name || r.player || 'Ẩn danh'}</span>
                  <Badge variant="secondary" className="font-semibold">{r.score}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
