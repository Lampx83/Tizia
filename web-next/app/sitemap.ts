import type { MetadataRoute } from 'next';
import { SITE_URL, xmlSafeUrl } from '@/lib/seo';
import { DOMAIN_META, getRequiredPlan } from './school/domains';

// ─────────────────────────────────────────────────────────────────────────
// sitemap.xml động.
//
// Bản cũ (Express) chỉ có 9 URL, trong đó 6 URL là *.html nay đã 308 sang URL
// sạch → Google coi là redirect, không index. Bản này liệt kê ĐÚNG URL cuối
// cùng của mọi trang khách xem được (không cần đăng nhập).
//
// Quy ước: chỉ đưa vào đây trang KHÔNG bị auth gate và có nội dung thật.
// Trang cá nhân (dashboard, gia đình, giáo viên…) cố tình bỏ ra + noindex.
// ─────────────────────────────────────────────────────────────────────────

type Entry = { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] };

// Trang trụ cột — điểm vào chính của site.
const CORE: Entry[] = [
  { path: '/', priority: 1.0, freq: 'daily' },
  { path: '/kham-pha', priority: 0.9, freq: 'weekly' },
  { path: '/on-tap', priority: 0.9, freq: 'weekly' },
  { path: '/school', priority: 0.9, freq: 'weekly' },
  { path: '/apps', priority: 0.8, freq: 'weekly' },
  { path: '/pricing', priority: 0.8, freq: 'monthly' },
  { path: '/nang-luc', priority: 0.8, freq: 'monthly' },
  { path: '/tinh-nang.html', priority: 0.7, freq: 'monthly' },
  { path: '/dev', priority: 0.6, freq: 'monthly' },
  { path: '/marketplace', priority: 0.6, freq: 'weekly' },
  { path: '/league', priority: 0.5, freq: 'weekly' },
  { path: '/leaderboard', priority: 0.5, freq: 'daily' },
  { path: '/bang-phong-than', priority: 0.5, freq: 'daily' },
  { path: '/login', priority: 0.3, freq: 'yearly' },
  { path: '/register', priority: 0.4, freq: 'yearly' },
];

// Trang học + trải nghiệm khách vào thẳng được (mirror PUBLIC_PATH_EXACT ở
// server/contexts/identity/auth.js). Đây là phần nội dung dài đuôi có giá trị
// tìm kiếm nhất: "luyện đề vào 10", "600 câu lý thuyết lái xe", "ghép vần lớp 1"…
const LEARNING: Entry[] = [
  { path: '/luyen-de', priority: 0.9, freq: 'weekly' },
  { path: '/luat-giao-thong-600', priority: 0.9, freq: 'monthly' },
  { path: '/bien-bao-giao-thong', priority: 0.8, freq: 'monthly' },
  { path: '/tra-cuu-bien-bao-gplx', priority: 0.8, freq: 'monthly' },
  { path: '/tu-vung-tieng-anh', priority: 0.7, freq: 'monthly' },
  { path: '/subject?subject=toan&grade=6', priority: 0.7, freq: 'monthly' },
  { path: '/srs', priority: 0.6, freq: 'monthly' },
  { path: '/hoc-thong-minh', priority: 0.6, freq: 'monthly' },
  { path: '/ai-quiz-gen', priority: 0.6, freq: 'monthly' },
  { path: '/nha-thuoc-3d', priority: 0.7, freq: 'monthly' },
  { path: '/bao-che-hub', priority: 0.6, freq: 'monthly' },
  { path: '/gpp.html', priority: 0.6, freq: 'monthly' },
  { path: '/nha-thuoc-2d.html', priority: 0.5, freq: 'monthly' },
  { path: '/tu-thuoc-mo-phong.html', priority: 0.5, freq: 'monthly' },
  { path: '/pharma-crush.html', priority: 0.5, freq: 'monthly' },
  { path: '/pharma-sort.html', priority: 0.5, freq: 'monthly' },
];

// Mini-game / phòng thí nghiệm ảo — khách chơi được, mỗi trang một từ khoá riêng.
const PLAY: Entry[] = [
  { path: '/ban-do-vn', priority: 0.7, freq: 'monthly' },
  { path: '/bao-so-hoc', priority: 0.7, freq: 'monthly' },
  { path: '/cay-tri-thuc', priority: 0.6, freq: 'monthly' },
  { path: '/lab-hoa-ao', priority: 0.7, freq: 'monthly' },
  { path: '/do-chu-ghep-van', priority: 0.7, freq: 'monthly' },
  { path: '/pet-tri-thuc', priority: 0.6, freq: 'monthly' },
  { path: '/pixel-art-studio', priority: 0.6, freq: 'monthly' },
  { path: '/code-quest', priority: 0.6, freq: 'monthly' },
  { path: '/math-fun', priority: 0.6, freq: 'monthly' },
  { path: '/time-attack', priority: 0.5, freq: 'monthly' },
  { path: '/2d-arcade', priority: 0.5, freq: 'monthly' },
  { path: '/dem-ngon-tay', priority: 0.5, freq: 'monthly' },
  { path: '/dem-qua', priority: 0.5, freq: 'monthly' },
  { path: '/ghep-chu-cai', priority: 0.6, freq: 'monthly' },
  { path: '/history-vn', priority: 0.6, freq: 'monthly' },
  { path: '/lop2-ghep-van', priority: 0.6, freq: 'monthly' },
  { path: '/lop2-am-nhac', priority: 0.5, freq: 'monthly' },
  { path: '/lop2-anh-memory', priority: 0.5, freq: 'monthly' },
  { path: '/lop2-dao-duc', priority: 0.5, freq: 'monthly' },
  { path: '/lop2-phan-loai-rac', priority: 0.5, freq: 'monthly' },
  { path: '/lop2-the-thao', priority: 0.5, freq: 'monthly' },
];

export const revalidate = 86400; // sinh lại mỗi ngày — lastmod luôn tươi.

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Landing từng trường ảo — chỉ trường khách vào được (guest plan), tránh đẩy
  // Google tới trang sẽ redirect sang /pricing.
  const schools: Entry[] = DOMAIN_META.filter(
    (d) => d.status !== 'locked' && getRequiredPlan(d.id) === 'guest',
  ).map((d) => ({ path: `/school?domain=${d.id}`, priority: 0.8, freq: 'weekly' as const }));

  return [...CORE, ...schools, ...LEARNING, ...PLAY].map((e) => ({
    // xmlSafeUrl: bắt buộc — Next ghi thẳng chuỗi này vào <loc>, một dấu & trần
    // là hỏng cả file (xem lib/seo.ts).
    url: xmlSafeUrl(`${SITE_URL}${e.path}`),
    lastModified: now,
    changeFrequency: e.freq,
    priority: e.priority,
  }));
}
