import type { Metadata } from 'next';
import { pageMeta, breadcrumbLd, courseLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { redirect } from 'next/navigation';
import { tiziaFetch } from '@/lib/tizia';
import {
  canEnterDomain,
  domainMeta,
  getRequiredPlan,
  isDomainOpen,
  type SchoolUser,
} from './domains';
import CampusFrame from './CampusFrame';

// ── Shape API (đã verify với backend) ──
// GET /api/auth/me → { user: {...} }  (server/contexts/identity/auth.js:518)
type Me = SchoolUser & {
  id: number;
  display_name: string;
  role: string;
  enrolled_domain?: string | null;
};
type MeRes = { user: Me | null };

type SearchParams = Promise<{ domain?: string | string[] }>;

function pickDomain(sp: { domain?: string | string[] }): string {
  const raw = Array.isArray(sp.domain) ? sp.domain[0] : sp.domain;
  return raw || 'pharmacy';
}

// <title>/description động theo domain (SEO). Trang gốc đổi document.title theo
// tên+icon trường (public/school.html:121,198).
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const sp = await searchParams;
  const dom = pickDomain(sp);
  const meta = domainMeta(dom);
  // Trước đây title tự nối "· Tizia" trong khi template ở layout cũng nối →
  // ra "… · Tizia · Tizia". Nay để template lo phần thương hiệu.
  // canonical giữ nguyên ?domain= vì mỗi trường là một trang nội dung khác nhau.
  return pageMeta({
    title: `${meta.icon} ${meta.name} — Khuôn viên ảo và lộ trình học`,
    description: `${meta.name} trên Tizia: bản đồ khuôn viên 2.5D bấm được, các phòng học và phòng thí nghiệm ảo, lộ trình môn học theo chương trình chuẩn. Học bằng mô phỏng 2D · 3D · VR.`,
    path: `/school?domain=${dom}`,
  });
}

export default async function School({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const dom = pickDomain(sp);

  // Trường đang khoá / không tồn tại → quay về trang chọn trường (public/school.html:154).
  if (!isDomainOpen(dom)) redirect('/');

  const res = await tiziaFetch<MeRes>('/api/auth/me');
  const me: Me | null = res.ok && res.data ? res.data.user : null;

  // Gate truy cập theo gói cước (public/school.html:162-172):
  //   • chưa login + trường ≠ mở-cho-khách → redirect login (giữ return URL)
  //   • đã login nhưng gói chưa đủ → redirect /pricing
  if (!canEnterDomain(dom, me)) {
    const ret = encodeURIComponent(`/school?domain=${dom}`);
    if (!me) {
      redirect(`/login?return=${ret}`);
    } else {
      const required = getRequiredPlan(dom);
      redirect(
        `/pricing?want=${encodeURIComponent(required)}&domain=${encodeURIComponent(dom)}&return=${ret}`,
      );
    }
  }

  const meta = domainMeta(dom);
  const isAdmin = me?.role === 'admin';
  // Banner "Đang học" — chỉ khi đang ở trường của mình (public/school.html:177).
  const atOwnSchool =
    !!me && me.role !== 'admin' && !!me.enrolled_domain && me.enrolled_domain === dom;

  return (
    <div className="mx-auto max-w-[1200px] space-y-4 py-5">
      {/* Dữ liệu có cấu trúc: đường dẫn Trang chủ › Trường ảo › <tên trường> và
          mô tả trường như một khoá học → Google hiện breadcrumb + rich result. */}
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Trường ảo', path: '/school' },
            { name: meta.name, path: `/school?domain=${dom}` },
          ]),
          courseLd({
            name: `${meta.name} — Tizia`,
            description: `Lộ trình học tại ${meta.name} trên Tizia: khuôn viên ảo 2.5D, phòng học và phòng thí nghiệm mô phỏng, bài học và bài kiểm tra theo chương trình chuẩn.`,
            path: `/school?domain=${dom}`,
          }),
        ]}
      />

      {/* Nút quay lại trang chủ — điều hướng thoát khỏi campus một trường. */}
      <a
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
      >
        <span aria-hidden>←</span> Về trang chủ
      </a>

      <div className="flex items-baseline gap-3">
        <h1 className="text-[22px] font-bold" id="campus-title">
          {meta.icon} {meta.name}
        </h1>
        {/* Nhãn "Đang học" — cạnh tiêu đề, KHÔNG floating để tránh đè avatar/tên
            tài khoản trong header. */}
        {atOwnSchool && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 800,
              background: '#16a34a',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(22,163,74,.35)',
              whiteSpace: 'nowrap',
            }}
          >
            🎓 Trường bạn đang học
          </span>
        )}
      </div>

      <div className="relative">
        <CampusFrame domain={dom} />

        {/* Admin → nút "✏️ Sửa campus" góc trên-phải BÊN TRONG khung campus. */}
        {isAdmin && (
          <a
            href={`/admin/campus-editor.html?domain=${encodeURIComponent(dom)}`}
            title={`Mở Campus Editor cho trường "${dom}"`}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 50,
              padding: '8px 16px',
              borderRadius: 22,
              fontSize: 13,
              fontWeight: 800,
              background: '#0f172a',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(0,0,0,.4)',
              border: '1px solid rgba(255,255,255,.15)',
            }}
          >
            ✏️ Sửa campus
          </a>
        )}
      </div>

      {/* Neo cuộn cho postMessage 'campus-enter' (khu "Khám phá thêm" là module
          legacy js/school-explore.js — chưa migrate; giữ neo để hành vi cuộn khớp). */}
      <div id="school-explore-host" />
    </div>
  );
}
