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

// Yêu cầu liên kết chưa được học sinh xác nhận — chỉ có username (không lộ lớp/trường).
export type FamilyPending = {
  link_id: number;
  status: 'pending' | 'rejected';
  created_at: number;
  username: string;
};

// Phía học sinh: ai đang xin liên kết / đã liên kết với mình.
export type FamilyIncoming = {
  link_id: number;
  status: 'pending' | 'confirmed';
  created_at: number;
  parent_username: string;
  parent_display_name: string;
  parent_role: string;
};

export type FamilyMe = {
  children?: FamilyChild[];
  pending?: FamilyPending[];
  incoming?: FamilyIncoming[];
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
          pending?: boolean;
          message?: string;
          error?: string;
        } = await r.json();
        // Liên kết cần học sinh/quản trị xác nhận → server chỉ báo "đã gửi yêu cầu".
        if (r.ok && d.pending) {
          setAddMsg({ text: '✓ ' + (d.message || 'Đã gửi yêu cầu liên kết.'), kind: 'ok' });
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

  const decide = useCallback(
    async (linkId: number, action: 'approve' | 'reject') => {
      const ask =
        action === 'approve'
          ? 'Chấp nhận? Người này sẽ xem được tiến độ học tập của bạn.'
          : 'Từ chối / thu hồi liên kết này?';
      if (!confirm(ask)) return;
      await fetch(`/api/family/links/${linkId}/${action}`, {
        method: 'POST',
        credentials: 'same-origin',
      });
      refresh();
    },
    [refresh],
  );

  const planName = `Gói ${PLAN_LABEL[data.parent_plan ?? ''] || data.parent_plan || 'Miễn phí'}`;
  const planSub = data.can_be_parent
    ? data.message
    : 'Tài khoản Học sinh không thể làm phụ huynh. Đổi vai trò sang Sinh viên hoặc Giảng viên.';

  const children = data.children ?? [];
  const pending = data.pending ?? [];
  const incoming = data.incoming ?? [];

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

      {/* Yêu cầu phụ huynh đã gửi, đang chờ học sinh xác nhận. */}
      {data.can_be_parent && pending.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-3 text-base font-semibold">Đang chờ học sinh xác nhận</h3>
            <ul className="space-y-1 text-sm">
              {pending.map((p) => (
                <li key={p.link_id}>
                  @{p.username} —{' '}
                  {p.status === 'rejected' ? 'đã bị từ chối' : 'chờ xác nhận'}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Học sinh: chấp nhận / từ chối yêu cầu liên kết. */}
      {!data.can_be_parent && incoming.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-3 text-base font-semibold">Yêu cầu liên kết với bạn</h3>
            <ul className="space-y-2 text-sm">
              {incoming.map((x) => (
                <li key={x.link_id} className="flex flex-wrap items-center gap-2">
                  <span>
                    <b>{x.parent_display_name}</b> (@{x.parent_username}) —{' '}
                    {x.status === 'confirmed' ? 'đã liên kết' : 'đang xin liên kết'}
                  </span>
                  {x.status === 'pending' && (
                    <Button type="button" size="sm" onClick={() => decide(x.link_id, 'approve')}>
                      Chấp nhận
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => decide(x.link_id, 'reject')}
                  >
                    {x.status === 'confirmed' ? 'Thu hồi' : 'Từ chối'}
                  </Button>
                </li>
              ))}
            </ul>
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
