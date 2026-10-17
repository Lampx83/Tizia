import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import SpaceMount from './SpaceMount';

// Trang "Không gian khám phá" (space) — bộ nội dung + phòng trải nghiệm + quiz
// SRS cá nhân hoá, tất cả LẤY TỪ DB qua API (/api/content/space-sets,
// /api/skills/*, /api/curriculum/*). Server component chỉ giữ metadata SEO;
// toàn bộ tương tác (modal, canvas game, audio, quiz) nằm trong client mount.
// Tiêu đề thực (emoji + tên trường) được wrap client cập nhật theo ?b=&?domain=.
export const metadata: Metadata = pageMeta({
  title: 'Không gian học tập — Phòng học, phòng thí nghiệm ảo',
  description:
    'Vào từng không gian trong trường ảo Tizia: phòng học, phòng thí nghiệm, thư viện và xưởng thực hành, mỗi nơi là một hoạt động học.',
  path: '/space',
});

export default function SpacePage() {
  return <SpaceMount />;
}
