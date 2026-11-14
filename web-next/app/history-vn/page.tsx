import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import HistoryVnClient from './history-vn-client';

// Server component chỉ giữ metadata SEO; toàn bộ tương tác (chat AI, TTS,
// speech-to-text) nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: '👤 Gặp danh nhân Việt Nam',
  description:
    'Trò chuyện thực với các nhân vật lịch sử và khoa học Việt Nam — AI đóng vai theo persona, biết về cuộc đời và lĩnh vực chuyên môn của họ.',
  path: '/history-vn',
});

export default function HistoryVnPage() {
  return <HistoryVnClient />;
}
