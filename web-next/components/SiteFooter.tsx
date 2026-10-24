'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo';

// ─────────────────────────────────────────────────────────────────────────
// Chân trang toàn site.
//
// Ngoài việc tiện cho người dùng, đây là lớp LIÊN KẾT NỘI BỘ quan trọng cho SEO:
// trước khi có nó, các trang nội dung (trường ảo, luyện đề, mini-game) hầu như
// không được trang nào trỏ tới ngoài menu 3 mục — Googlebot phải đoán qua
// sitemap. Nay mọi trang đều trỏ tới các trang trụ cột.
//
// Chỉ hiện ở TRANG NỘI DUNG (allowlist bên dưới). Các trang 3D/VR/game chiếm
// trọn màn hình thì bỏ qua — thêm chân trang vào đó chỉ làm hỏng bố cục, mà
// giá trị SEO của chúng đến từ việc ĐƯỢC trỏ tới chứ không phải trỏ đi.
// Next vẫn dựng sẵn HTML của Client Component ở server nên Googlebot đọc được
// toàn bộ liên kết mà không cần chạy JS.
// ─────────────────────────────────────────────────────────────────────────

// Trang được gắn chân trang. Thêm route mới vào đây khi có trang nội dung mới.
const FOOTER_ROUTES: RegExp[] = [
  /^\/$/,
  /^\/(kham-pha|school|space|apps|pricing|nang-luc|marketplace|league|leaderboard)(\/|$)/,
  /^\/(dev|portal-apps|cv|subject|module|lesson|register|login|bang-phong-than)(\/|$)/,
  /^\/(luyen-de|srs|hoc-thong-minh|tu-vung-tieng-anh|quiz|on-tap)(\/|$)/,
  /^\/(luat-giao-thong-600|bien-bao-giao-thong|tra-cuu-bien-bao-gplx)(\/|$)/,
];

const SCHOOLS: Array<[string, string]> = [
  ['/school?domain=preschool', '🧸 Trường Mầm non'],
  ['/school?domain=primary', '🎒 Trường Tiểu học'],
  ['/school?domain=secondary', '📐 Trường THCS'],
  ['/school?domain=highschool', '🏫 Trường THPT'],
  ['/school?domain=pharmacy', '💊 Trường Dược'],
  ['/school?domain=it', '💻 Trường Công nghệ thông tin'],
  ['/school?domain=language', '🗣️ Trường Ngoại ngữ'],
  ['/school?domain=driving', '🚗 Trường Lái xe'],
];

const LEARN: Array<[string, string]> = [
  ['/on-tap', 'Thư viện ôn tập Lớp 1–12'],
  ['/luyen-de', 'Luyện đề thi thử THPT & vào lớp 10'],
  ['/luat-giao-thong-600', 'Lý thuyết lái xe ô tô'],
  ['/tra-cuu-bien-bao-gplx', 'Tra cứu biển báo giao thông'],
  ['/tu-vung-tieng-anh', 'Từ vựng Tiếng Anh chuyên ngành'],
  ['/nang-luc', 'Khung năng lực GDPT 2018'],
  ['/srs', 'Flashcards ôn tập ngắt quãng'],
];

const PLAY: Array<[string, string]> = [
  ['/ban-do-vn', 'Bản đồ Việt Nam tri thức'],
  ['/bao-so-hoc', 'Bão Số Học — luyện tính nhẩm'],
  ['/lab-hoa-ao', 'Lab Hoá học ảo'],
  ['/do-chu-ghep-van', 'Đố chữ ghép vần'],
  ['/math-fun', 'Toán vui Lớp 2 & Lớp 6'],
  ['/nha-thuoc-3d', 'Nhà thuốc GPP 3D'],
];

const ABOUT: Array<[string, string]> = [
  ['/kham-pha', 'Khám phá tính năng'],
  ['/pricing', 'Bảng giá'],
  ['/apps', 'Thư viện ứng dụng'],
  ['/marketplace', 'Chợ bài giảng cộng đồng'],
  ['/dev', 'Dành cho lập trình viên'],
  ['/register', 'Đăng ký miễn phí'],
];

function Column({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-foreground">{title}</h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="transition-colors hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  const pathname = usePathname() || '/';
  const p = pathname.replace(/\/+$/, '') || '/';
  if (!FOOTER_ROUTES.some((re) => re.test(p))) return null;

  return (
    <footer className="mt-12 border-t border-foreground/10 bg-background/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Trường ảo" links={SCHOOLS} />
          <Column title="Học & luyện thi" links={LEARN} />
          <Column title="Học mà chơi" links={PLAY} />
          <Column title="Về Tizia" links={ABOUT} />
        </div>

        <div className="mt-10 border-t border-foreground/10 pt-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">
            {SITE_NAME} — {SITE_TAGLINE}
          </p>
          <p className="mt-1 max-w-3xl">
            Nền tảng giáo dục ảo của Việt Nam: học theo Chương trình GDPT 2018 từ Mầm non đến THPT và
            các trường nghề nghiệp bậc đại học, bằng mô phỏng tương tác 2D · 3D · VR cùng gia sư AI.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} Tizia · tizia.vn</p>
        </div>
      </div>
    </footer>
  );
}
