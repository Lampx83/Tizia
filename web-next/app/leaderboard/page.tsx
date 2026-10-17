import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// SEO: metadata riêng. Đây là Server Component → cả bảng dưới nằm trong HTML server
// trả về → bot Google đọc được (khác SPA React thuần).
export const metadata: Metadata = pageMeta({
  title: 'Bảng xếp hạng người học',
  description:
    'Bảng xếp hạng theo điểm kinh nghiệm và thành tích học tập trên Tizia — so tài với bạn cùng lớp và cả cộng đồng.',
  path: '/leaderboard',
});

type Row = { player_name?: string; player?: string; score: number; correct?: number; total?: number };

export default async function Leaderboard() {
  const res = await tiziaFetch<Row[]>('/api/leaderboard?version=2d-arcade&limit=10');
  const rows = Array.isArray(res.data) ? res.data : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">🏆 Bảng xếp hạng</CardTitle>
        <CardDescription>
          Chế độ 2D Arcade · render sẵn ở server (SSR). Dữ liệu từ{' '}
          <code className="rounded bg-secondary px-1 text-xs">/api/leaderboard</code> của Express Tizia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="py-6 text-sm text-muted-foreground">
            Chưa có dữ liệu (hoặc backend :8042 chưa chạy). Cơ chế SSR vẫn hoạt động.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Người chơi</TableHead>
                <TableHead className="text-right">Điểm</TableHead>
                <TableHead className="text-right">Đúng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    {i === 0 ? '🥇 ' : i === 1 ? '🥈 ' : i === 2 ? '🥉 ' : ''}
                    {r.player_name || r.player || 'Ẩn danh'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="font-semibold">{r.score}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {r.correct != null && r.total != null ? `${r.correct}/${r.total}` : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
