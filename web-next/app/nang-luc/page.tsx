import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { tiziaFetch } from '@/lib/tizia';
import { LoginRequired } from '@/components/ui/empty-state';
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
      <LoginRequired returnTo="/nang-luc" title="Em chưa đăng nhập" description="Đăng nhập để theo dõi cây năng lực theo khung GDPT 2018." />
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
