import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import MarketplaceClient, { type Lesson } from './MarketplaceClient';

export const metadata: Metadata = pageMeta({
  title: 'Chợ bài giảng cộng đồng',
  description:
    'Bài giảng tương tác do giáo viên Việt Nam tự tạo bằng Lesson Builder no-code. Free để xem, free để clone về sửa.',
  path: '/marketplace',
});

type Res = { items: Lesson[]; total: number };

export default async function Marketplace() {
  // SSR danh sách ban đầu — sort mới nhất, limit 60 (khớp trang gốc).
  const res = await tiziaFetch<Res>('/api/lessons?sort=recent&limit=60');
  const initialItems = res.data?.items ?? [];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="bg-gradient-to-br from-white via-primary to-orange-500 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
          📚 Chợ bài giảng cộng đồng
        </h1>
        <a
          href="/lesson-builder"
          className="ml-auto rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 text-sm font-bold text-[#3e2723]"
        >
          ✏️ Tạo bài giảng mới
        </a>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Bài giảng tương tác do giáo viên Việt Nam tự tạo bằng{' '}
        <b className="text-foreground">Lesson Builder no-code</b>. Free để xem, free để clone về sửa.
        Mỗi bài có thể nhúng video, quiz, AI tutor, danh nhân, ca lâm sàng, đàm phán.
      </p>

      <MarketplaceClient initialItems={initialItems} />
    </div>
  );
}
