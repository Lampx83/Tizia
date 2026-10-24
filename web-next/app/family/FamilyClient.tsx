'use client';

import { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type FamilyChild = {
  id: number;
  username: string;
  display_name: string;
  role?: string;
  grade: number | null;
  school_name: string | null;
  plan?: string;
  plan_expires_at?: number | null;
};

export type FamilyMe = {
  children?: FamilyChild[];
  can_be_parent: boolean;
  parent_plan?: string;
  message?: string;
};

// Nhãn gói giữ nguyên bản gốc.
const PLAN_LABEL: Record<string, string> = {
  guest: 'Khách',
  free: 'Miễn phí',
  plus: 'Plus',
  pro: 'Pro',
};

function gradeLabel(grade: number | null): string {
  if (grade == null) return '—';
  if (grade === 0) return 'Mầm non';
  return 'Lớp ' + grade;
}

export default function FamilyClient({ initial }: { initial: FamilyMe }) {
  const [data, setData] = useState<FamilyMe>(initial);
  const [username, setUsername] = useState('');
  const [addMsg, setAddMsg] = useState<{ text: string; kind: 'ok' | 'err' } | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch('/api/family/me', { credentials: 'same-origin' });
      const d: FamilyMe = await r.json();
      setData(d);
    } catch {
      /* giữ dữ liệu cũ nếu lỗi mạng */
    }
  }, []);

  const unlinkChild = useCallback(
    async (childId: number) => {
      if (!confirm('Bỏ link tài khoản con này? Gói sẽ ngừng chia sẻ.')) return;
      await fetch('/api/family/unlink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ childId }),
      });
      refresh();
    },
    [refresh],
  );

  const onAdd = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const uname = username.trim();
      setAddMsg(null);
      setBusy(true);
      try {
        const r = await fetch('/api/family/link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ childUsername: uname }),
        });
        const d: {
          child?: { display_name: string; username: string };
          message?: string;
          error?: string;
        } = await r.json();
        if (r.ok && d.child) {
          setAddMsg({
            text: `✓ Đã link ${d.child.display_name} (@${d.child.username})`,
            kind: 'ok',
          });
          setUsername('');
          refresh();
        } else {
          setAddMsg({ text: '⚠️ ' + (d.message || d.error || ''), kind: 'err' });
        }
      } catch {
        setAddMsg({ text: '⚠️ Lỗi mạng. Thử lại.', kind: 'err' });
      } finally {
        setBusy(false);
      }
    },
    [username, refresh],
  );

  const planName = `Gói ${PLAN_LABEL[data.parent_plan ?? ''] || data.parent_plan || 'Miễn phí'}`;
  const planSub = data.can_be_parent
    ? data.message
    : 'Tài khoản Học sinh không thể làm phụ huynh. Đổi vai trò sang Sinh viên hoặc Giảng viên.';

  const children = data.children ?? [];

  return (
    <>
      {/* Thẻ gói — giữ gradient thương hiệu (sky → green) của bản gốc. */}
      <div
        className="rounded-xl px-6 py-5 text-white"
        style={{ background: 'linear-gradient(135deg, #0ea5e9, #22c55e)' }}
      >
        <div className="text-[22px] font-extrabold">{planName}</div>
        <div className="mt-1 text-sm opacity-90">{planSub}</div>
      </div>

      {/* Thêm con — ẩn khi không thể làm phụ huynh (như bản gốc). */}
      {data.can_be_parent && (
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-3 text-base font-semibold">Thêm con</h3>
            <form className="flex gap-2" onSubmit={onAdd}>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên đăng nhập tài khoản con (vd: lampx-con1)"
                required
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={busy}
                className="font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #22c55e)' }}
              >
                + Link
              </Button>
            </form>
            {addMsg && (
              <div
                className={
                  'mt-2 text-[13px] ' +
                  (addMsg.kind === 'ok' ? 'text-green-600' : 'text-red-600')
                }
              >
                {addMsg.text}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Danh sách con đã link. */}
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-3 text-base font-semibold">Con đã link</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {['Tên hiển thị', 'Tài khoản', 'Lớp', 'Trường', ''].map((h, i) => (
                    <th
                      key={i}
                      className="border-b border-border px-2 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!data.can_be_parent ? (
                  <tr>
                    <td colSpan={5} className="px-2 py-6 text-center italic text-muted-foreground">
                      —
                    </td>
                  </tr>
                ) : children.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-2 py-6 text-center italic text-muted-foreground">
                      Chưa link con nào.
                    </td>
                  </tr>
                ) : (
                  children.map((c) => (
                    <tr key={c.id}>
                      <td className="border-b border-border px-2 py-3">
                        <b>{c.display_name}</b>
                      </td>
                      <td className="border-b border-border px-2 py-3">@{c.username}</td>
                      <td className="border-b border-border px-2 py-3">{gradeLabel(c.grade)}</td>
                      <td className="border-b border-border px-2 py-3">{c.school_name || '—'}</td>
                      <td className="border-b border-border px-2 py-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-auto border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => unlinkChild(c.id)}
                        >
                          Bỏ link
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
