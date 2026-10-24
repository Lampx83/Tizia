import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

export const metadata: Metadata = pageMeta({
  title: 'Khám phá hành trình học — Tính năng mở khoá dần',
  description:
    'Bản đồ tính năng Tizia: học đến đâu mở khoá đến đó — lớp học ảo, phòng thí nghiệm mô phỏng, luyện đề, đấu trường kiến thức, gia sư AI và hồ sơ năng lực.',
  path: '/kham-pha',
});

type Feat = { unlocked: boolean; name: string; url: string | null; tier: number; scope: string; unlock_text: string | null; desc: string | null };
type Res = { ok: boolean; user_tier: number; progress?: Record<string, number>; features: Record<string, Feat> };

const TIER_LABEL = ['Bắt đầu', 'Vào học', 'Chăm chỉ', 'Tiến bộ', 'Thành thạo', 'Bền bỉ', 'Chuyên sâu'];

export default async function KhamPha() {
  const res = await tiziaFetch<Res>('/api/features/me?scope=global');
  // Khách chưa đăng nhập: KHÔNG trả về mỗi nút đăng nhập. Trang này nằm trong
  // sitemap, mà một trang chỉ có dòng "hãy đăng nhập" là thin content — Google
  // hạ hạng cả site. Thay bằng phần giới thiệu thật, có liên kết nội bộ.
  if (res.status === 401 || !res.data?.ok) {
    return <GuestOverview />;
  }
  const { user_tier, progress, features } = res.data;

  // Gom feature theo tier.
  const byTier = new Map<number, [string, Feat][]>();
  for (const [id, f] of Object.entries(features)) {
    if (!byTier.has(f.tier)) byTier.set(f.tier, []);
    byTier.get(f.tier)!.push([id, f]);
  }
  const tiers = [...byTier.keys()].sort((a, b) => a - b);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">🧭 Khám phá hành trình</h1>
        <p className="text-muted-foreground">Tính năng mở khoá dần theo tiến độ học. Bạn đang ở mức {user_tier}.</p>
        {progress && (
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Badge variant="secondary">🔥 Streak {progress.streak}</Badge>
            <Badge variant="secondary">✅ Đúng {progress.quiz_correct}</Badge>
            <Badge variant="secondary">🎯 Kỹ năng {progress.skills_earned}</Badge>
            <Badge variant="secondary">📅 Ngày học {progress.active_days}</Badge>
          </div>
        )}
      </div>

      {tiers.map((t) => (
        <section key={t} className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-sm text-primary">{t}</span>
            {TIER_LABEL[t] || `Mức ${t}`}
            <span className="text-sm font-normal text-muted-foreground">
              ({byTier.get(t)!.filter(([, f]) => f.unlocked).length}/{byTier.get(t)!.length})
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {byTier.get(t)!.map(([id, f]) => {
              const inner = (
                <Card className={f.unlocked ? 'h-full transition-colors hover:border-primary' : 'h-full opacity-55'}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 font-medium">
                      {!f.unlocked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                      {f.name}
                    </div>
                    {f.desc && <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>}
                    {!f.unlocked && f.unlock_text && (
                      <p className="mt-2 text-xs text-primary/80">🔒 {f.unlock_text}</p>
                    )}
                  </CardContent>
                </Card>
              );
              return f.unlocked && f.url ? <Link key={id} href={f.url}>{inner}</Link> : <div key={id}>{inner}</div>;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

// Nội dung dành cho khách (và cho Googlebot) — mô tả hành trình học ở Tizia.
const JOURNEY: Array<{ tier: string; title: string; desc: string; links: Array<[string, string]> }> = [
  {
    tier: 'Bắt đầu',
    title: 'Chọn trường và vào lớp',
    desc: 'Mỗi cấp học là một trường ảo có khuôn viên riêng: bấm vào toà nhà để vào phòng học, phòng thí nghiệm hay thư viện.',
    links: [
      ['/school?domain=preschool', 'Trường Mầm non'],
      ['/school?domain=primary', 'Trường Tiểu học'],
      ['/school?domain=secondary', 'Trường THCS'],
      ['/school?domain=highschool', 'Trường THPT'],
    ],
  },
  {
    tier: 'Vào học',
    title: 'Học theo lộ trình môn học',
    desc: 'Mỗi môn chia theo chương và bài bám Chương trình GDPT 2018. Học xong bài thì làm quiz ngắn, hết chương thì đánh Boss kiểm tra.',
    links: [
      ['/subject?subject=toan&grade=6', 'Lộ trình Toán lớp 6'],
      ['/quiz', 'Quiz nhanh'],
      ['/srs', 'Flashcards ôn tập'],
    ],
  },
  {
    tier: 'Chăm chỉ',
    title: 'Luyện thi và ôn tập',
    desc: 'Bộ đề thi thử có bấm giờ cho kỳ thi tốt nghiệp THPT và thi vào lớp 10, chấm điểm ngay kèm lời giải từng câu.',
    links: [
      ['/luyen-de', 'Luyện đề thi thử'],
      ['/luat-giao-thong-600', 'Lý thuyết lái xe ô tô'],
      ['/tu-vung-tieng-anh', 'Từ vựng Tiếng Anh'],
    ],
  },
  {
    tier: 'Thành thạo',
    title: 'Thực hành bằng mô phỏng',
    desc: 'Phòng thí nghiệm ảo và mô phỏng nghề nghiệp: pha chế thuốc, nhà thuốc GPP 3D, lab hoá học, phòng cấp cứu — làm thật trên máy trước khi làm ngoài đời.',
    links: [
      ['/nha-thuoc-3d', 'Nhà thuốc GPP 3D'],
      ['/lab-hoa-ao', 'Lab Hoá học ảo'],
      ['/bao-che-hub', 'Phòng Bào chế'],
    ],
  },
  {
    tier: 'Bền bỉ',
    title: 'Giữ động lực mỗi ngày',
    desc: 'Chuỗi ngày học, nhiệm vụ hằng ngày, đấu trường kiến thức và bảng xếp hạng giúp việc học thành thói quen thay vì đợt dồn.',
    links: [
      ['/league', 'League tuần'],
      ['/leaderboard', 'Bảng xếp hạng'],
      ['/nang-luc', 'Hồ sơ năng lực'],
    ],
  },
];

function GuestOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">🧭 Khám phá hành trình học ở Tizia</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Tizia mở tính năng dần theo tiến độ, để người học không bị ngợp ngay từ đầu. Dưới đây là
          toàn bộ chặng đường — bạn có thể xem thử từng phần trước khi tạo tài khoản.
        </p>
      </div>

      <div className="space-y-6">
        {JOURNEY.map((step) => (
          <Card key={step.tier}>
            <CardContent className="space-y-3 p-5">
              <Badge variant="secondary">{step.tier}</Badge>
              <h2 className="text-lg font-medium">{step.title}</h2>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {step.links.map(([href, label]) => (
                  <Link key={href} href={href} className="font-medium text-primary hover:underline">
                    {label} →
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        <Link href="/register" className="font-medium text-primary hover:underline">
          Tạo tài khoản miễn phí
        </Link>{' '}
        để lưu tiến độ, giữ chuỗi ngày học và mở khoá hành trình của riêng bạn.
      </p>
    </div>
  );
}
