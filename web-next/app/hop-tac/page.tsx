import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PartnershipForm from './PartnershipForm';

// ─────────────────────────────────────────────────────────────────────────
// Trang «Hợp tác» (18/10/2026) — dành cho TỔ CHỨC: trường, trung tâm đào tạo,
// doanh nghiệp, cơ sở y tế/đào tạo… Form gửi về Express (contexts/partnership),
// lưu bảng partnership_requests, admin xem ở /admin-hop-tac.html.
//
// Nội dung chỉ nêu tính năng Tizia ĐANG CÓ (xem README, server/contexts/*) hoặc
// ghi rõ "khảo sát theo yêu cầu". Không ghi giá (bán gói đang tạm dừng).
//
// Email liên hệ: biến PARTNERSHIP_CONTACT_EMAIL của Express (qua /api/partnership/
// info) — chưa đặt thì hiện placeholder. Repo chưa có email hợp tác công khai.
//
// ⚠️ Mục «Dữ liệu liên hệ hợp tác» (#du-lieu-lien-he) đặt tạm trên trang này vì
// nhánh production chưa có trang chính sách quyền riêng tư. Khi merge nhánh ToS
// (research/tos-dieu-khoan-nghien-cuu) cần chuyển/link mục này vào trang chính sách.
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = pageMeta({
  title: 'Hợp tác — Tizia cho nhà trường, trung tâm và doanh nghiệp',
  description:
    'Hợp tác cùng Tizia: dùng nền tảng giáo dục ảo cho đơn vị (triển khai riêng, đăng nhập Google/Microsoft), tích hợp ứng dụng và webhook, phân phối, biên soạn học liệu và nghiên cứu chung.',
  path: '/hop-tac',
  keywords: ['hợp tác Tizia', 'Tizia cho nhà trường', 'triển khai riêng', 'mô phỏng đào tạo', 'đối tác giáo dục'],
});

const PLACEHOLDER_EMAIL = '[email hợp tác: đang cập nhật]';
const SELLER = 'Hộ kinh doanh Tizi (đang hoàn tất đăng ký)';

type Group = { id: string; icon: string; title: string; lead: string; points: React.ReactNode[] };

const GROUPS: Group[] = [
  {
    id: 'to-chuc',
    icon: '🏫',
    title: 'Dùng Tizia cho trường, khoa, trung tâm, doanh nghiệp',
    lead: 'Gói dành cho tổ chức, triển khai trên hạ tầng chung của Tizia hoặc trên máy chủ riêng của đơn vị.',
    points: [
      'Lớp học theo mã, bảng điều khiển giảng viên (thống kê, phổ điểm, ma trận nhầm lẫn, xuất CSV), điều khiển lớp và đố vui trực tiếp.',
      'Quản trị theo trường: cán bộ của đơn vị có thể được giao quyền quản trị trường ảo tương ứng; quyền vào trường được cấp cho từng người học.',
      'Triển khai riêng (on-premise) bằng Docker — máy chủ ứng dụng và cơ sở dữ liệu PostgreSQL — chạy dưới tên miền riêng hoặc đường dẫn con; dữ liệu nằm trên hạ tầng của đơn vị.',
      'Đăng nhập bằng tài khoản Google, Microsoft (ví dụ Microsoft 365 của trường) hoặc GitHub. Kết nối hệ thống đăng nhập tập trung của đơn vị (SAML/OIDC) được khảo sát theo yêu cầu.',
      'Gia sư AI chạy trên mô hình ngôn ngữ tự vận hành; bản triển khai riêng có thể dùng máy chủ AI của đơn vị.',
    ],
  },
  {
    id: 'tich-hop',
    icon: '🔌',
    title: 'Tích hợp và API',
    lead: 'Kết nối Tizia với hệ thống sẵn có của đơn vị.',
    points: [
      <>
        Cài ứng dụng web của đơn vị vào Tizia dưới dạng gói <code>.zip</code>; ứng dụng đọc được danh tính người dùng đang
        đăng nhập — hướng dẫn tại{' '}
        <Link href="/dev" className="font-medium text-primary hover:underline">
          Tizia Dev
        </Link>
        .
      </>,
      'Gửi sự kiện từ Tizia sang hệ thống của đơn vị qua webhook có chữ ký HMAC, tự gửi lại khi hệ thống nhận tạm lỗi.',
      'Tizia đã kết nối qua API với ngân hàng câu hỏi ScoreUp và hệ thống chấm bài lập trình Codelab; hệ thống đề thi, bài tập riêng của đơn vị có thể kết nối theo cách tương tự.',
      'Các kết nối khác (ví dụ hệ thống quản lý học tập của đơn vị) được khảo sát và báo khả năng thực hiện theo từng trường hợp.',
    ],
  },
  {
    id: 'phan-phoi',
    icon: '🤝',
    title: 'Đối tác giới thiệu và phân phối',
    lead: 'Dành cho tổ chức muốn giới thiệu hoặc phân phối Tizia tới nhà trường, trung tâm đào tạo, doanh nghiệp.',
    points: [
      'Phối hợp giới thiệu, trình diễn và hỗ trợ đơn vị sử dụng trong khu vực hoặc lĩnh vực của đối tác.',
      'Hình thức hợp tác và quyền lợi của đối tác được trao đổi và thống nhất bằng văn bản.',
    ],
  },
  {
    id: 'hoc-lieu',
    icon: '📚',
    title: 'Hợp tác nội dung, học liệu',
    lead: 'Nhiều trường ảo và module của Tizia đang ở giai đoạn thử nghiệm hoặc sắp mở — rất cần chuyên gia nội dung.',
    points: [
      'Biên soạn câu hỏi, bài lý thuyết, đề luyện tập cho các module đang hoàn thiện.',
      'Cùng chuyên gia của đơn vị xây dựng mô phỏng, tình huống thực hành chuyên ngành 2D · 3D · VR (như nhà thuốc GPP 3D, phòng bào chế, mô phỏng bệnh nhân).',
      'Mở trường ảo mới cho một ngành (Y, Điều dưỡng, Sư phạm, Logistics…): mỗi trường là một mô-đun độc lập trên cùng nền tảng.',
      'Đăng bài giảng lên Chợ bài giảng cộng đồng; soạn bài bằng công cụ không cần lập trình.',
      'Quyền tác giả và cách ghi nhận đóng góp được thống nhất trong thoả thuận.',
    ],
  },
  {
    id: 'nghien-cuu',
    icon: '🔬',
    title: 'Nghiên cứu chung',
    lead: 'Tizia có sẵn công cụ đo lường học tập: thí nghiệm A/B, mô hình năng lực theo câu hỏi (IRT), ôn tập ngắt quãng, nhật ký thực hành mô phỏng.',
    points: [
      'Cùng thiết kế thực nghiệm, đánh giá hiệu quả học tập bằng mô phỏng và gia sư AI, công bố chung.',
      'Dữ liệu chỉ được dùng ở dạng đã ẩn danh, theo điều khoản nghiên cứu được các bên thống nhất; không chia sẻ dữ liệu định danh người học.',
    ],
  },
];

const FITS: Array<[string, string]> = [
  ['💊 Trường, khoa Dược và cơ sở y tế', '5 năm · 102 module, OSCE 10 trạm, nhà thuốc GPP 3D, phòng bào chế GMP, cấp cứu phản vệ.'],
  ['🚗 Trung tâm đào tạo lái xe', 'Ngân hàng 600 câu lý thuyết, tra cứu và luyện biển báo giao thông.'],
  ['🏫 Trường phổ thông', 'Học theo Chương trình GDPT 2018 từ Mầm non đến THPT (đang mở rộng môn học), luyện đề thi vào 10 và tốt nghiệp THPT.'],
  ['💻 Khoa CNTT, doanh nghiệp công nghệ', 'Lộ trình Python → ML → Cloud, thử thách CTF, bài tập lập trình chấm tự động (đang thử nghiệm).'],
];

export default async function HopTacPage() {
  const info = await tiziaFetch<{ contactEmail: string | null }>('/api/partnership/info');
  const contactEmail = info.ok ? info.data?.contactEmail || null : null;
  const emailNode = contactEmail ? (
    <a href={`mailto:${contactEmail}`} className="font-medium text-primary hover:underline">
      {contactEmail}
    </a>
  ) : (
    <span className="font-medium">{PLACEHOLDER_EMAIL}</span>
  );

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Mở đầu */}
      <header className="space-y-3">
        <Badge variant="secondary">Dành cho tổ chức</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">🤝 Hợp tác cùng Tizia</h1>
        <p className="max-w-3xl text-muted-foreground">
          Tizia là nền tảng giáo dục ảo: mỗi ngành, mỗi cấp học là một trường ảo (Dược, Công nghệ thông tin, Lái xe, Ngoại
          ngữ, phổ thông theo Chương trình GDPT 2018…), người học thực hành bằng mô phỏng 2D · 3D · VR, có gia sư AI và
          game hoá. Chúng tôi mong được hợp tác với nhà trường, trung tâm đào tạo, doanh nghiệp, cơ sở y tế và các tổ chức
          có nhu cầu đào tạo.
        </p>
        <p className="text-sm text-muted-foreground">
          Đơn vị cung cấp: <span className="font-medium text-foreground">{SELLER}</span>. Email hợp tác: {emailNode}.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href="#lien-he"
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Liên hệ hợp tác
          </a>
          <Link
            href="/kham-pha"
            className="inline-flex h-10 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Xem toàn cảnh Tizia
          </Link>
        </div>
      </header>

      {/* Các nhóm hợp tác */}
      <section className="space-y-4" aria-labelledby="nhom-hop-tac">
        <h2 id="nhom-hop-tac" className="text-xl font-semibold tracking-tight">
          Các hình thức hợp tác
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {GROUPS.map((g) => (
            <Card key={g.id} id={g.id} className="scroll-mt-20">
              <CardContent className="space-y-3 p-5">
                <h3 className="text-lg font-medium">
                  <span className="mr-1.5">{g.icon}</span>
                  {g.title}
                </h3>
                <p className="text-sm text-muted-foreground">{g.lead}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                  {g.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Phù hợp với ai */}
      <section className="space-y-4" aria-labelledby="phu-hop">
        <h2 id="phu-hop" className="text-xl font-semibold tracking-tight">
          Nội dung tiêu biểu theo loại đơn vị
        </h2>
        <p className="text-sm text-muted-foreground">
          Mức độ hoàn thiện khác nhau giữa các trường ảo; trạng thái từng trường hiển thị ở{' '}
          <Link href="/#schools" className="font-medium text-primary hover:underline">
            trang chủ
          </Link>
          .
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {FITS.map(([t, d]) => (
            <div key={t} className="rounded-lg border border-border p-4">
              <div className="font-medium">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="lien-he" className="scroll-mt-20 space-y-4" aria-labelledby="lien-he-title">
        <div className="space-y-2">
          <h2 id="lien-he-title" className="text-xl font-semibold tracking-tight">
            Liên hệ hợp tác
          </h2>
          <p className="text-sm text-muted-foreground">
            Gửi thông tin đơn vị và nhu cầu, chúng tôi sẽ phản hồi qua email để trao đổi, trình diễn và thống nhất bằng văn
            bản.
          </p>
          <p className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm">
            Mục này chỉ dành cho <b>tổ chức</b>. Người gửi phải <b>từ 18 tuổi trở lên</b> và đại diện cho đơn vị. Học sinh vui
            lòng không gửi thông tin tại đây.
          </p>
        </div>
        <Card>
          <CardContent className="p-5">
            <PartnershipForm />
          </CardContent>
        </Card>
      </section>

      {/* Chính sách dữ liệu liên hệ */}
      <section id="du-lieu-lien-he" className="scroll-mt-20 space-y-3" aria-labelledby="du-lieu-title">
        <h2 id="du-lieu-title" className="text-xl font-semibold tracking-tight">
          Dữ liệu liên hệ hợp tác
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <b className="text-foreground">Dữ liệu thu:</b> tên đơn vị, loại đơn vị, họ tên người liên hệ, email, điện thoại
            (nếu có), lĩnh vực hợp tác, số người dùng dự kiến (nếu có), nội dung trao đổi, thời điểm đồng ý được liên hệ và
            nguồn truy cập trang (tham số chiến dịch, trang đến). Yêu cầu không gắn với tài khoản Tizia nào và không lưu địa chỉ
            IP.
          </li>
          <li>
            <b className="text-foreground">Mục đích:</b> trả lời và trao đổi về hợp tác. Thông tin được chuyển sang hệ thống
            quản lý khách hàng nội bộ của đơn vị vận hành ({SELLER}) để theo dõi việc trao đổi.
          </li>
          <li>
            <b className="text-foreground">Không quảng cáo, không chia sẻ:</b> không dùng để gửi quảng cáo nếu chưa có sự đồng
            ý riêng; không bán, không chia sẻ cho bên thứ ba.
          </li>
          <li>
            <b className="text-foreground">Thời hạn lưu:</b> 24 tháng kể từ lần trao đổi cuối, sau đó dữ liệu được xoá.
          </li>
          <li>
            <b className="text-foreground">Rút đồng ý, yêu cầu xoá:</b> gửi email tới {emailNode}; chúng tôi ngừng liên hệ và
            xoá thông tin liên hệ của đơn vị.
          </li>
        </ul>
      </section>
    </div>
  );
}
