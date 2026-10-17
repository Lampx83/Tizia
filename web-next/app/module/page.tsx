import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import ScenarioMount from './ScenarioMount';

// Server Component: khung SEO tĩnh cho module hub. Tiêu đề/subtitle/metadata
// module thực tế được đặt động ở client (theo ?module= + domain đang hoạt động
// qua public/legacy/module.js) — giữ nguyên hành vi bản public/module.html gốc.
export const metadata: Metadata = pageMeta({
  title: 'Module học — Danh sách bài trong module',
  description:
    'Danh sách bài học trong một module của Tizia: mở khoá tuần tự, làm bài luyện tập và đánh giá cuối module.',
  path: '/module',
});

export default function ModulePage() {
  return (
    <div className="w-full">
      <ScenarioMount />
    </div>
  );
}
