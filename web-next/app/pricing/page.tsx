import type { Metadata } from 'next';
import { pageMeta, faqLd, breadcrumbLd } from '@/lib/seo';
import { Suspense } from 'react';
import { tiziaFetch } from '@/lib/tizia';
import PricingClient from './PricingClient';
import type { Me } from './plans';

// canonical CŨ trỏ /pricing — URL đó nay 308 sang /pricing, nên Google coi
// canonical là redirect và bỏ qua. Dùng pageMeta để luôn lấy URL cuối cùng.
export const metadata: Metadata = pageMeta({
  title: 'Bảng giá — Gói Free, Pro, Plus cho học sinh, lớp học và trường',
  description:
    'So sánh các gói Tizia: Free (Mầm non + Tiểu học miễn phí), Pro (K-12 + AI cá nhân hoá) và Plus (gia đình, lớp học, trường). Mua theo tháng hoặc theo năm tiết kiệm 2 tháng.',
  path: '/pricing',
  keywords: ['bảng giá Tizia', 'học phí học trực tuyến', 'gói gia đình', 'gói trường học', 'edtech Việt Nam'],
});


const LD_BREADCRUMB = breadcrumbLd([
  { name: 'Tizia', path: '/' },
  { name: 'Bảng giá', path: '/pricing' },
]);

// FAQPage: lặp lại đúng nội dung khối "Câu hỏi thường gặp" hiển thị bên dưới —
// Google yêu cầu nội dung JSON-LD phải khớp nội dung người dùng nhìn thấy.
const LD_FAQ = faqLd([
  {
    q: 'Tôi có thể huỷ gói bất cứ lúc nào không?',
    a: 'Có. Sau khi huỷ, bạn vẫn dùng được đến hết kỳ thanh toán hiện tại, sau đó tài khoản tự chuyển về gói Miễn phí — không mất dữ liệu, có thể nâng lại bất cứ lúc nào.',
  },
  {
    q: 'AI ở gói Pro có gì khác?',
    a: 'Gói Plus dùng được gợi ý cơ bản (tĩnh + tham chiếu). Gói Pro mở AI cá nhân hoá: chấm bài tự luận, sinh lộ trình theo điểm yếu, báo cáo phụ huynh tự động, hỏi đáp với cô giáo AI không giới hạn.',
  },
  {
    q: 'Một gia đình nhiều con thì sao?',
    a: 'Mỗi cháu một tài khoản riêng, sau đó phụ huynh vào trang Gia đình để liên kết tài khoản các con. Gói của phụ huynh được chia sẻ cho các con đã liên kết và theo dõi được tiến độ từng cháu.',
  },
  {
    q: 'Thanh toán bằng cách nào?',
    a: 'Hiện hỗ trợ VNPay (thẻ ATM nội địa, Visa, MasterCard, QR ngân hàng). Sắp tới sẽ thêm MoMo và ZaloPay.',
  },
  {
    q: 'Trường học hoặc trung tâm có giá riêng không?',
    a: 'Có. Gói School license dành cho trường và trung tâm, tính theo số người học hoạt động hằng tháng. Liên hệ qua hộp thư Ban điều hành AI của trang trường để được tư vấn.',
  },
]);

const LD_PRODUCT = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Gói học tập Tizia',
  description: 'Nền tảng giáo dục ảo Tizia với các gói Free, Pro và Plus cho học sinh, lớp học và trường.',
  brand: { '@type': 'Brand', name: 'Tizia' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'VND',
    lowPrice: '0',
    highPrice: '1990000',
    offerCount: '3',
    url: 'https://tizia.vn/pricing',
  },
};

export default async function PricingPage() {
  // Fetch user để biết gói hiện tại (currentPlan) + trạng thái đăng nhập. 401 →
  // me = null (guest), trang vẫn render đủ (public SEO).
  const res = await tiziaFetch<{ user: Me }>('/api/auth/me');
  const me: Me = res.ok ? res.data?.user ?? null : null;

  return (
    <div className="pricing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_PRODUCT) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_FAQ) }} />

      <Suspense fallback={null}>
        <PricingClient me={me} />
      </Suspense>

      <div className="faq">
        <h3>Câu hỏi thường gặp</h3>
        <details>
          <summary>Tôi có thể huỷ gói bất cứ lúc nào không?</summary>
          <p>Có. Sau khi huỷ, bạn vẫn dùng được đến hết kỳ thanh toán hiện tại, sau đó tài khoản tự chuyển về gói Miễn phí — không mất dữ liệu, có thể nâng lại bất cứ lúc nào.</p>
        </details>
        <details>
          <summary>AI ở gói Pro có gì khác?</summary>
          <p>Gói Plus dùng được gợi ý cơ bản (tĩnh + tham chiếu). Gói Pro mở AI cá nhân hoá: chấm bài tự luận, sinh lộ trình theo điểm yếu, báo cáo phụ huynh tự động, hỏi đáp với &quot;cô giáo AI&quot; không giới hạn.</p>
        </details>
        <details>
          <summary>Một gia đình nhiều con thì sao?</summary>
          <p>Mỗi cháu một tài khoản riêng, sau đó anh chị vào <a href="/family">trang Gia đình</a> để liên kết tài khoản các con. Gói của phụ huynh được chia sẻ cho các con đã liên kết, và anh chị theo dõi được tiến độ học của từng cháu.</p>
        </details>
        <details>
          <summary>Thanh toán bằng cách nào?</summary>
          <p>Hiện hỗ trợ VNPay (thẻ ATM nội địa / Visa / MasterCard / QR ngân hàng). Sắp tới sẽ thêm MoMo và ZaloPay.</p>
        </details>
        <details>
          <summary>Trường học / trung tâm có giá riêng không?</summary>
          <p>Có. Gói School license dành cho trường/trung tâm tính theo MAU. Liên hệ qua hộp thư &quot;Ban điều hành AI&quot; của trang trường để được tư vấn.</p>
        </details>
      </div>
    </div>
  );
}
