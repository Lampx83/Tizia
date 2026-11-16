import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { tiziaFetch } from '@/lib/tizia';
import DrivingQuiz, { type DrivingQuestion } from './DrivingQuiz';

export const metadata: Metadata = pageMeta({
  title: '🚦 Lý thuyết Lái xe ô tô — Thi sát hạch theo hạng',
  description:
    'Câu hỏi lý thuyết lái xe ô tô theo Luật TTATGT 2024 — luyện tập theo chủ đề + thi thử theo hạng GPLX (B, C1, C, D1, D2, D…), có câu điểm liệt phải trả lời đúng để qua.',
  path: '/luat-giao-thong-600',
});

type Res = { ok: boolean; collection: string; items: DrivingQuestion[] };

export default async function LuatGiaoThong600() {
  const res = await tiziaFetch<Res>('/api/content/driving-600');
  const items = res.data?.items ?? [];

  if (!res.ok && res.status === 401) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để ôn thi lý thuyết lái xe.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }

  return <DrivingQuiz items={items} />;
}
