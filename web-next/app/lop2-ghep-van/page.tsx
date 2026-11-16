import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Lop2GhepVanClient from './lop2-ghep-van-client';

// Trang trò chơi tương tác (ghép âm đầu + vần + dấu thanh). Server component chỉ
// giữ metadata SEO; toàn bộ tương tác nằm trong client component.
export const metadata: Metadata = pageMeta({
  title: '🔤 Ghép vần · Tiếng Việt Lớp 2',
  description:
    'Trò chơi ghép vần Tiếng Việt lớp 2 — chọn 1 âm đầu + 1 vần + 1 dấu thanh để tạo tiếng đúng theo nghĩa gợi ý.',
  path: '/lop2-ghep-van',
});

export default function Lop2GhepVanPage() {
  return <Lop2GhepVanClient />;
}
