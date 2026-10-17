import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import NangLucClient, {
  type MeUser,
  type FamilyMe,
  type ClassInfo,
  type SkillTreeResponse,
} from './NangLucClient';

export const metadata: Metadata = pageMeta({
  title: '🎯 Năng lực của em',
  description:
    'Cây năng lực của HS theo khung GDPT 2018 (Thông tư 32/2018): 5 phẩm chất + 10 năng lực. Theo dõi tiến độ kỹ năng đã đạt qua tất cả các trường.',
  path: '/nang-luc',
});

export default async function NangLucPage() {
  // 1) Info user hiện tại (auth gate).
  const meRes = await tiziaFetch<{ user: MeUser | null }>('/api/auth/me');
  if (meRes.status === 401 || !meRes.data?.user) {
    return (
      <div className="mx-auto max-w-[560px] rounded-2xl border border-dashed border-border bg-card py-12 text-center">
        <h3 className="text-lg font-semibold">🔐 Em chưa đăng nhập</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Đăng nhập để theo dõi cây năng lực theo khung GDPT 2018.
        </p>
        <Link
          href="/login?return=%2Fnang-luc"
          className="mt-3 inline-block rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground hover:opacity-90"
        >
          Đăng nhập
        </Link>
      </div>
    );
  }
  const me = meRes.data.user;

  // 2) Song song: list con + list lớp (nếu teacher/admin) + cây năng lực mặc định (bản thân).
  const isTeacherOrAdmin = me.role === 'teacher' || me.role === 'admin';
  const [familyRes, classesRes, selfTreeRes] = await Promise.all([
    tiziaFetch<FamilyMe>('/api/family/me'),
    isTeacherOrAdmin
      ? tiziaFetch<ClassInfo[]>('/api/classes')
      : Promise.resolve({ ok: true, status: 200, data: [] as ClassInfo[] }),
    tiziaFetch<SkillTreeResponse>('/api/skills/me'),
  ]);

  const children = familyRes.data?.children || [];
  // GV chỉ thấy lớp do mình tạo (teacher_name khớp display_name); admin thấy tất.
  const classes = (classesRes.data || []).filter(
    (c) => me.role === 'admin' || c.teacher_name === me.display_name,
  );

  return (
    <NangLucClient
      me={me}
      children={children}
      classes={classes}
      selfTree={selfTreeRes.ok ? selfTreeRes.data : null}
    />
  );
}
