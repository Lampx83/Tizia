'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { completeProfileRequest, logoutRequest } from '@/lib/auth-client';

const MAJORS: [string, string][] = [
  ['pharmacy', '💊 Dược'], ['it', '💻 Công nghệ thông tin'], ['economics', '📉 Kinh tế'],
  ['business', '📈 Kinh doanh'], ['finance', '🏦 Tài chính – Ngân hàng'], ['medicine', '⚕️ Y'],
  ['nursing', '🩺 Điều dưỡng'], ['law', '⚖️ Luật'], ['education', '🎓 Sư phạm'],
  ['engineering', '⚙️ Kỹ thuật – Công nghệ'], ['architecture', '🏛️ Kiến trúc – Xây dựng'],
  ['languages', '🗣️ Ngoại ngữ'], ['agriculture', '🌾 Nông nghiệp'], ['tourism', '🏖️ Du lịch – Khách sạn'],
  ['arts', '🎨 Mỹ thuật – Thiết kế'], ['media', '📰 Báo chí – Truyền thông'],
  ['social-sciences', '📚 KHXH & Nhân văn'], ['natural-sciences', '🔬 Khoa học tự nhiên'],
  ['logistics', '🚚 Logistics'], ['public-admin', '🏢 Quản trị Nhà nước'], ['driving', '🚗 Lái xe (B1/B2/C/D)'],
];
const GRADES: [number, string][] = [[0, 'Mầm non (3–5 tuổi)'], ...Array.from({ length: 12 }, (_, i) => [i + 1, `Lớp ${i + 1}`] as [number, string])];
const ROLE_LABEL: Record<string, string> = { pupil: '🎒 Học sinh', student: '🎓 Sinh viên', teacher: '👨‍🏫 Giảng viên' };

const selectCls = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm';

export default function CompleteProfile() {
  const [me, setMe] = useState<any>(null);
  const [f, setF] = useState({ grade: '', major: '', cohort: '', schoolName: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const u = d?.user;
        if (!u) { window.location.replace('/login'); return; }
        if (u.profile_complete) { window.location.replace(u.default_route || '/'); return; }
        setMe(u);
        setF((p) => ({
          ...p,
          grade: u.grade != null ? String(u.grade) : '',
          major: u.major || '', cohort: u.cohort || '', schoolName: u.school_name || '',
        }));
      })
      .catch(() => window.location.replace('/login'));
  }, []);

  if (!me) return <div className="py-16 text-center text-muted-foreground">Đang tải…</div>;
  const role = me.role || 'student';
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(''); setBusy(true);
    const payload: Record<string, unknown> = {};
    if (role === 'pupil') { payload.grade = Number(f.grade) || 0; if (f.schoolName) payload.schoolName = f.schoolName; }
    else if (role === 'student') {
      if (!f.major) { setErr('Vui lòng chọn ngành học'); setBusy(false); return; }
      payload.major = f.major; if (f.cohort) payload.cohort = f.cohort; if (f.schoolName) payload.schoolName = f.schoolName;
    } else if (f.schoolName) payload.schoolName = f.schoolName;

    const res = await completeProfileRequest(payload);
    if (res.ok) window.location.replace(res.redirectTo || '/');
    else { setErr(res.error || 'Lưu thất bại'); setBusy(false); }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Khai bổ sung thông tin</CardTitle>
          <CardDescription>
            Để Tizia dẫn bạn vào đúng trường &amp; lộ trình — bạn là{' '}
            <span className="font-medium text-primary">{ROLE_LABEL[role] || role}</span> và đang ở đâu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {role === 'pupil' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Đang học lớp mấy?</label>
                  <select className={selectCls} value={f.grade} onChange={(e) => set('grade', e.target.value)}>
                    {GRADES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <Field label="Trường đang học (không bắt buộc)" ph="VD: Tiểu học Kim Liên" v={f.schoolName} on={(v) => set('schoolName', v)} />
              </>
            )}
            {role === 'student' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Ngành học</label>
                  <select className={selectCls} value={f.major} onChange={(e) => set('major', e.target.value)}>
                    <option value="">— Chọn ngành —</option>
                    {MAJORS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Khoá" ph="K65" v={f.cohort} on={(v) => set('cohort', v)} />
                  <Field label="Trường ĐH" ph="VD: NEU" v={f.schoolName} on={(v) => set('schoolName', v)} />
                </div>
              </>
            )}
            {role === 'teacher' && (
              <Field label="Trường đang công tác (không bắt buộc)" ph="VD: ĐH Kinh tế Quốc dân" v={f.schoolName} on={(v) => set('schoolName', v)} />
            )}

            {err && <p className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">{err}</p>}

            <Button type="submit" className="w-full" disabled={busy}>{busy ? 'Đang lưu…' : 'Lưu & vào Tizia'}</Button>
          </form>
          <p className="mt-4 text-center text-sm">
            <button onClick={logoutRequest} className="text-muted-foreground hover:text-foreground hover:underline">Đăng xuất</button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, ph, v, on }: { label: string; ph: string; v: string; on: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <Input placeholder={ph} value={v} onChange={(e) => on(e.target.value)} />
    </div>
  );
}
