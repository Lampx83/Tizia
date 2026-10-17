import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import CodeLab from './CodeLab';

export const metadata: Metadata = pageMeta({
  title: '💻 Code Lab · Trường CNTT',
  description:
    'Luyện lập trình Python/C++/Java trên NEU Codelab — chạy code thật trong sandbox, chấm tự động bằng test case.',
  path: '/it-code-lab',
});

// Server Component chỉ lo SEO/metadata. Toàn bộ tương tác (editor, chạy/nộp,
// localStorage, offline Web Worker) nằm trong Client Component vì bản chất là
// client-side (đúng như trang vanilla gốc).
export default function ItCodeLabPage() {
  return <CodeLab />;
}
