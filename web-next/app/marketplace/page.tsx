import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import { PageHeader } from '@/components/ui/page-header';
import { LoginRequired } from '@/components/ui/empty-state';
import MarketplaceClient, { type Lesson } from './MarketplaceClient';

export const metadata: Metadata = pageMeta({
  title: 'Chợ bài giảng cộng đồng',
  description:
    'Bài giảng tương tác do giáo viên Việt Nam tự tạo bằng trình tạo bài giảng không cần code. Xem miễn phí, sao chép về để sửa.',
  path: '/marketplace',
});

type Res = { items: Lesson[]; total: number };

export default async function Marketplace() {
  // SSR danh sách ban đầu — sort mới nhất, limit 60 (khớp trang gốc).
  const res = await tiziaFetch<Res>('/api/lessons?sort=recent&limit=60');
  const initialItems = res.data?.items ?? [];

  return (
    <div className="w-full space-y-6">
      <PageHeader
        icon="📚"
        title="Chợ bài giảng cộng đồng"
        description="Bài giảng tương tác do giáo viên Việt Nam tự soạn bằng trình tạo bài giảng của Tizia (không cần viết code). Xem miễn phí, sao chép về để chỉnh sửa. Mỗi bài có thể nhúng video, câu hỏi, trợ lý AI, danh nhân, ca lâm sàng, tình huống đàm phán."
        actions={
          <a
            href="/lesson-builder"
            className="rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 text-sm font-bold text-[#3e2723]"
          >
            ✏️ Tạo bài giảng mới
          </a>
        }
      />

      {res.status === 401 ? (
        <LoginRequired returnTo="/marketplace" description="Đăng nhập để xem và sao chép bài giảng của các thầy cô." />
      ) : (
        <MarketplaceClient initialItems={initialItems} />
      )}
    </div>
  );
}
