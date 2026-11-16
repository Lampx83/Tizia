import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import TuVungTiengAnhClient from './tu-vung-tieng-anh-client';

// Server Component chỉ giữ metadata SEO; toàn bộ tương tác (flashcard SRS, quiz,
// nghe, viết, chấm câu/bài qua AI) nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: '📚 Từ vựng Tiếng Anh chuyên ngành',
  description:
    'Học từ vựng tiếng Anh chuyên ngành (CNTT, Y tế, Giáo dục, Kinh doanh…) bằng flashcard có IPA + spaced repetition, chế độ kiểm tra trắc nghiệm, luyện nghe/viết, chấm câu & bài viết qua AI.',
  path: '/tu-vung-tieng-anh',
});

export default function TuVungTiengAnhPage() {
  return <TuVungTiengAnhClient />;
}
