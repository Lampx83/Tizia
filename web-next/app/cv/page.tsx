import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import Toolbar from './Toolbar';

export const metadata: Metadata = pageMeta({
  title: 'CV & hồ sơ năng lực người học',
  description:
    'Hồ sơ năng lực tự động dựng từ quá trình học trên Tizia: kỹ năng đã đạt, thành tích và sản phẩm học tập.',
  path: '/cv',
});

// ── Shape API (đã verify với backend) ──
// GET /api/auth/me → { user: {...} }  (server/contexts/identity/auth.js:518)
type Me = {
  id: number;
  username: string;
  display_name: string;
  role: string;
  age: number | null;
  email: string | null;
  major?: string | null;
  cohort?: string | null;
  school_name?: string | null;
};
// GET /api/achievements?player=X → [{ badge_id, unlocked_at, badge }]  (server/index.js:1116)
type Achievement = { badge_id: string; unlocked_at: number };
// GET /api/badges?role=X → [{ id, icon, label, desc, audience }]  (server/index.js:1005 + BADGES)
type BadgeDef = { id: string; icon: string; label: string; desc: string; audience?: string };
// GET /api/players/:name/attempts → [{ id, version, score, correct, total, created_at, ... }]  (server/db.js:176)
type Attempt = {
  id: number;
  version: string | null;
  score: number | null;
  correct: number | null;
  total: number | null;
  created_at: number;
};

const MAJOR_LABEL: Record<string, string> = {
  pharmacy: '💊 Dược', it: '💻 Công nghệ thông tin', economics: '📉 Kinh tế',
  business: '📈 Kinh doanh', finance: '🏦 Tài chính – Ngân hàng', medicine: '⚕️ Y',
  nursing: '🩺 Điều dưỡng', law: '⚖️ Luật', education: '🎓 Sư phạm',
  engineering: '⚙️ Kỹ thuật – Công nghệ', architecture: '🏛️ Kiến trúc – Xây dựng',
  languages: '🗣️ Ngoại ngữ', agriculture: '🌾 Nông nghiệp', tourism: '🏖️ Du lịch – Khách sạn',
  arts: '🎨 Mỹ thuật – Thiết kế', media: '📰 Báo chí – Truyền thông',
  'social-sciences': '📚 KHXH & Nhân văn', 'natural-sciences': '🔬 Khoa học tự nhiên',
  logistics: '🚚 Logistics', 'public-admin': '🏢 Quản trị Nhà nước',
};

export default async function CvPage() {
  const meRes = await tiziaFetch<{ user: Me | null }>('/api/auth/me');

  // Gate đăng nhập: trang gốc redirect login.html?return=/cv khi chưa đăng nhập.
  if (meRes.status === 401 || !meRes.data?.user) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p>Hãy đăng nhập để xem hồ sơ học tập của bạn.</p>
        <Link href="/login" className="mt-2 inline-block font-medium text-primary hover:underline">
          Đăng nhập →
        </Link>
      </div>
    );
  }
  const me = meRes.data.user;

  // Gate role: chỉ SV + GV. HS (pupil…) không có trang CV.
  if (me.role !== 'student' && me.role !== 'teacher') {
    return (
      <div className="w-full rounded-xl bg-card p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold">📋 Trang này dành cho Sinh viên</h2>
        <p className="mt-2 text-muted-foreground">
          Học sinh có hệ thống huy hiệu vui ở{' '}
          <Link href="/" className="text-primary hover:underline">trang chủ</Link> 🎒
        </p>
      </div>
    );
  }

  // Fetch song song: huy hiệu đã đạt + danh mục huy hiệu theo role + lịch sử luyện.
  const playerEnc = encodeURIComponent(me.display_name);
  const [achsRes, badgesRes, attemptsRes] = await Promise.all([
    tiziaFetch<Achievement[]>(`/api/achievements?player=${playerEnc}`),
    tiziaFetch<BadgeDef[]>(`/api/badges?role=${encodeURIComponent(me.role)}`),
    tiziaFetch<Attempt[]>(`/api/players/${playerEnc}/attempts?limit=200`),
  ]);
  const achs: Achievement[] = Array.isArray(achsRes.data) ? achsRes.data : [];
  const allBadges: BadgeDef[] = Array.isArray(badgesRes.data) ? badgesRes.data : [];
  const attempts: Attempt[] = Array.isArray(attemptsRes.data) ? attemptsRes.data : [];

  // Header
  const initials = (me.display_name || '?')
    .split(' ')
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const majorLabel = MAJOR_LABEL[me.major || ''] || me.major || '—';
  const meta = `${majorLabel}${me.cohort ? ' · ' + me.cohort : ''}${me.school_name ? ' · ' + me.school_name : ''}`;

  // Hồ sơ
  const rows: [string, string | number][] = [
    ['Họ và tên', me.display_name],
    ['Email', me.email || '—'],
    ['Ngành học', majorLabel],
    ['Khoá', me.cohort || '—'],
    ['Trường', me.school_name || '—'],
    ['Tuổi', me.age != null ? me.age : '—'],
  ];

  // Stats
  const perfect = attempts.filter((a) => a.correct === a.total && (a.total || 0) > 0).length;

  // Badge list — chỉ huy hiệu đã mở khoá.
  const unlockedIds = new Set(achs.map((a) => a.badge_id));
  const unlocked = allBadges.filter((b) => unlockedIds.has(b.id));

  // Top 10 lượt theo điểm.
  const top = [...attempts].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 10);

  return (
    <div>
      <Toolbar />

      <div className="w-full rounded-xl bg-card p-8 text-card-foreground shadow-sm sm:p-10">
        {/* Head */}
        <div className="flex items-center gap-6 border-b-2 border-primary pb-6">
          <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full bg-primary text-4xl font-extrabold text-primary-foreground">
            {initials}
          </div>
          <div>
            <h1 className="text-[28px] font-bold leading-tight">{me.display_name}</h1>
            <div className="mt-1 text-sm text-muted-foreground">
              @{me.username} · {me.role === 'student' ? 'Sinh viên' : 'Giảng viên'}
            </div>
            <div className="mt-1.5 text-[13px] font-semibold text-primary">{meta}</div>
          </div>
        </div>

        {/* Hồ sơ */}
        <section className="mt-7">
          <h2 className="mb-3.5 text-[15px] font-bold uppercase tracking-wider text-primary">Hồ sơ</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <span className="text-[13px] text-muted-foreground">{k}</span>
                <span className="text-sm font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Số liệu học tập */}
        <section className="mt-7">
          <h2 className="mb-3.5 text-[15px] font-bold uppercase tracking-wider text-primary">
            Số liệu học tập
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-muted/40 p-3.5 text-center">
              <div className="text-2xl font-extrabold text-primary">{attempts.length}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                Lượt hoàn thành
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3.5 text-center">
              <div className="text-2xl font-extrabold text-primary">
                {achs.length}/{allBadges.length}
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                Huy hiệu đạt được
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3.5 text-center">
              <div className="text-2xl font-extrabold text-primary">{perfect}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                Lượt Perfect (100%)
              </div>
            </div>
          </div>
        </section>

        {/* Huy hiệu */}
        <section className="mt-7">
          <h2 className="mb-3.5 text-[15px] font-bold uppercase tracking-wider text-primary">Huy hiệu</h2>
          <div className="flex flex-wrap gap-2">
            {unlocked.length ? (
              unlocked.map((b) => (
                <span
                  key={b.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-400/15 px-3 py-1.5 text-[13px] font-semibold text-amber-200"
                >
                  {b.icon} {b.label}
                </span>
              ))
            ) : (
              <span className="text-sm italic text-muted-foreground">Chưa có</span>
            )}
          </div>
        </section>

        {/* Top 10 lượt nổi bật */}
        <section className="mt-7">
          <h2 className="mb-3.5 text-[15px] font-bold uppercase tracking-wider text-primary">
            Top 10 lượt nổi bật
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="border-b border-border px-2.5 py-2 font-semibold">Bài</th>
                  <th className="w-[90px] border-b border-border px-2.5 py-2 font-semibold">Điểm</th>
                  <th className="w-20 border-b border-border px-2.5 py-2 font-semibold">Đúng</th>
                  <th className="w-[120px] border-b border-border px-2.5 py-2 font-semibold">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {top.length ? (
                  top.map((a) => (
                    <tr key={a.id}>
                      <td className="border-b border-border px-2.5 py-2">{a.version || '—'}</td>
                      <td className="border-b border-border px-2.5 py-2">
                        <span className="font-bold text-primary">{a.score || 0}</span> / 100
                      </td>
                      <td className="border-b border-border px-2.5 py-2">
                        {a.correct || 0}/{a.total || 0}
                      </td>
                      <td className="border-b border-border px-2.5 py-2">
                        {new Date(a.created_at).toLocaleDateString('vi-VN')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="border-b border-border px-2.5 py-2 italic text-muted-foreground">
                      Chưa có lượt nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-9 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Sinh từ <b>Tizia</b> · The Intelligent Zone for Interactive Academy · tizia.vn
        </div>
      </div>
    </div>
  );
}
