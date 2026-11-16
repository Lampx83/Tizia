import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import DaoDucMount from './DaoDucMount';

export const metadata: Metadata = pageMeta({
  title: '🤝 Đúng hay Sai? — Đạo đức Lớp 2',
  description:
    'Trò chơi đạo đức Lớp 2: đọc tình huống rồi chọn ✅ đúng hoặc ❌ sai (hoặc vuốt thẻ). Học sống đẹp qua 15 tình huống gần gũi.',
  path: '/lop2-dao-duc',
});

// Server Component: khung SEO tĩnh (tiêu đề) render sẵn. Toàn bộ tương tác (rút
// tình huống, chọn/vuốt thẻ, feedback, modal tổng kết, đồng bộ XP /api/wallet)
// nằm trong DaoDucMount ('use client'), tái dùng script vanilla qua
// public/legacy/lop2-dao-duc.js. Content POOL (15 tình huống) giữ trong file
// legacy vì CHƯA có API/DB — xem risks.
export default function Lop2DaoDuc() {
  return <DaoDucMount />;
}
