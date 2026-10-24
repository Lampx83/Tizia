'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type ClassSummary = {
  id: number;
  code: string;
  name: string;
  teacher_name: string;
  created_at: number;
  attempt_count: number;
  student_count: number;
};

type ClassInfo = {
  id: number;
  code: string;
  name: string;
  teacher_name: string;
  created_at: number;
};

type Member = {
  player_name: string;
  attempts: number;
  best_score: number;
  avg_score: number | null;
  perfect_count: number;
  last_seen: number;
};

type Attempt = {
  id: number;
  version: string;
  player_name: string;
  score: number;
  correct: number;
  total: number;
  duration_ms: number | null;
  level_n: number | null;
  created_at: number;
};

function fmt(ms?: number | null): string {
  if (!ms) return '—';
  return new Date(ms).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
}

export default function TeacherClient({ initialClasses }: { initialClasses: ClassSummary[] }) {
  const [classes, setClasses] = useState<ClassSummary[]>(initialClasses);
  const [active, setActive] = useState<string | null>(null);

  const [newName, setNewName] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState<string | null>(null);

  const [info, setInfo] = useState<ClassInfo | null>(null);
  const [members, setMembers] = useState<Member[] | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [copied, setCopied] = useState(false);

  const [playerName, setPlayerName] = useState<string | null>(null);
  const [playerAtts, setPlayerAtts] = useState<Attempt[] | null>(null);
  const [loadingPlayer, setLoadingPlayer] = useState(false);

  const reloadClasses = useCallback(async () => {
    const r = await fetch('/api/classes', { credentials: 'same-origin' });
    if (r.ok) setClasses(await r.json());
  }, []);

  const loadDetail = useCallback(async (code: string) => {
    setActive(code);
    setLoadingDetail(true);
    setInfo(null);
    setMembers(null);
    setPlayerName(null);
    setPlayerAtts(null);
    setCopied(false);
    const [i, m] = await Promise.all([
      fetch('/api/classes/' + code, { credentials: 'same-origin' }).then((r) => r.json()),
      fetch('/api/classes/' + code + '/members', { credentials: 'same-origin' }).then((r) => r.json()),
    ]);
    setInfo(i);
    setMembers(Array.isArray(m) ? m : []);
    setLoadingDetail(false);
  }, []);

  const loadPlayerDetail = useCallback(async (name: string) => {
    setPlayerName(name);
    setLoadingPlayer(true);
    setPlayerAtts(null);
    const r = await fetch('/api/players/' + encodeURIComponent(name) + '/attempts?limit=30', {
      credentials: 'same-origin',
    });
    const atts = await r.json();
    setPlayerAtts(Array.isArray(atts) ? atts : []);
    setLoadingPlayer(false);
  }, []);

  const createClass = useCallback(async () => {
    const name = newName.trim();
    const teacherName = newTeacher.trim();
    if (!name) {
      setCreateErr('Nhập tên lớp');
      return;
    }
    setCreating(true);
    setCreateErr(null);
    const r = await fetch('/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ name, teacherName }),
    });
    const data = await r.json();
    setCreating(false);
    if (data.code) {
      setNewName('');
      setNewTeacher('');
      await reloadClasses();
      loadDetail(data.code);
    } else {
      setCreateErr('Lỗi: ' + (data.error || 'không tạo được'));
    }
  }, [newName, newTeacher, reloadClasses, loadDetail]);

  const inviteUrl =
    info && typeof window !== 'undefined' ? `${window.location.origin}/?class=${info.code}` : '';

  const copyLink = useCallback(() => {
    if (!inviteUrl) return;
    navigator.clipboard?.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [inviteUrl]);

  const totalAttempts = members?.reduce((s, m) => s + m.attempts, 0) ?? 0;
  const avg = members?.length
    ? Math.round(members.reduce((s, m) => s + (m.avg_score || 0), 0) / members.length)
    : 0;
  const totalPerfect = members?.reduce((s, m) => s + (m.perfect_count || 0), 0) ?? 0;

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      {/* Cột trái: tạo lớp + danh sách */}
      <Card className="p-4">
        <h2 className="mb-3 text-lg font-medium">➕ Tạo lớp mới</h2>
        <label className="mb-1 block text-xs text-muted-foreground">Tên lớp</label>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="VD: Dược 2025 — K15"
          maxLength={60}
        />
        <label className="mb-1 mt-2 block text-xs text-muted-foreground">Tên giảng viên</label>
        <Input
          value={newTeacher}
          onChange={(e) => setNewTeacher(e.target.value)}
          placeholder="VD: PGS.TS. Nguyễn Văn A"
          maxLength={40}
        />
        <Button className="mt-3 w-full" onClick={createClass} disabled={creating}>
          {creating ? 'Đang tạo...' : 'Tạo lớp + sinh mã'}
        </Button>
        {createErr && <p className="mt-2 text-sm text-destructive">{createErr}</p>}

        <h2 className="mb-3 mt-5 text-lg font-medium">📚 Các lớp đã tạo</h2>
        <div className="flex max-h-[60vh] flex-col gap-2.5 overflow-y-auto">
          {classes.length === 0 ? (
            <div className="py-4 text-center text-xs italic text-muted-foreground">
              Chưa có lớp — tạo lớp đầu tiên!
            </div>
          ) : (
            classes.map((c) => (
              <button
                key={c.code}
                onClick={() => loadDetail(c.code)}
                className={cn(
                  'rounded-lg border border-transparent bg-background/40 p-2.5 text-left transition-colors hover:bg-background/70',
                  active === c.code && 'border-primary bg-primary/10',
                )}
              >
                <div className="text-sm font-bold">{c.name}</div>
                <div className="mt-0.5 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded bg-card px-2 py-px font-mono font-bold text-foreground">
                    {c.code}
                  </span>
                  <span>👨‍🏫 {c.teacher_name}</span>
                  <span>👥 {c.student_count} SV</span>
                  <span>🎮 {c.attempt_count} lượt</span>
                </div>
              </button>
            ))
          )}
        </div>
      </Card>

      {/* Cột phải: chi tiết */}
      <Card className="min-h-[400px] p-4">
        {!active ? (
          <div className="py-12 text-center italic text-muted-foreground">
            ← Chọn 1 lớp ở bên trái để xem chi tiết
          </div>
        ) : loadingDetail || !info || !members ? (
          <div className="py-12 text-center italic text-muted-foreground">đang tải...</div>
        ) : (
          <>
            <div className="mb-3.5 flex flex-wrap items-baseline gap-3">
              <h2 className="text-lg font-medium">{info.name}</h2>
              <span className="text-sm text-muted-foreground">
                👨‍🏫 {info.teacher_name} · tạo {fmt(info.created_at)}
              </span>
            </div>

            <div className="mb-3.5 flex flex-wrap items-center gap-2.5 rounded-lg border border-dashed border-primary bg-primary/10 px-3.5 py-2.5">
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Mã mời SV:
              </span>
              <code className="rounded bg-background/60 px-2.5 py-1 text-base font-bold text-primary">
                {info.code}
              </code>
              <a
                href={inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                {inviteUrl}
              </a>
              <button
                onClick={copyLink}
                className="rounded bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground"
              >
                {copied ? '✓ Đã sao chép' : 'Sao chép link'}
              </button>
            </div>

            <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-2">
              <Stat v={members.length} l="Sinh viên" />
              <Stat v={totalAttempts} l="Tổng lượt" />
              <Stat v={avg} l="Điểm TB" />
              <Stat v={totalPerfect} l="Perfect" />
            </div>

            <div className="mb-2 flex items-center gap-2.5">
              <h3 className="text-sm font-medium">📋 Roster ({members.length} SV)</h3>
              <span className="flex-1" />
              <a
                href={`/api/classes/${info.code}/export.csv`}
                download
                className="rounded bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-400"
              >
                ⬇️ Export CSV lớp
              </a>
            </div>

            {members.length === 0 ? (
              <div className="py-8 text-center italic text-muted-foreground">
                Chưa có SV nào tham gia.
                <br />
                <small>Chia sẻ link mời ở trên cho SV vào.</small>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      <th className="border-b border-border px-2 py-1.5 text-left font-semibold">
                        Sinh viên
                      </th>
                      <th className="border-b border-border px-2 py-1.5 text-right font-semibold">
                        Lượt
                      </th>
                      <th className="border-b border-border px-2 py-1.5 text-right font-semibold">
                        Tốt nhất
                      </th>
                      <th className="border-b border-border px-2 py-1.5 text-right font-semibold">
                        TB
                      </th>
                      <th className="border-b border-border px-2 py-1.5 text-right font-semibold">
                        🎯 Perfect
                      </th>
                      <th className="border-b border-border px-2 py-1.5 text-right font-semibold">
                        Lần cuối
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, i) => (
                      <tr
                        key={m.player_name}
                        onClick={() => loadPlayerDetail(m.player_name)}
                        className="cursor-pointer transition-colors hover:bg-foreground/5"
                      >
                        <td className="border-b border-border/60 px-2 py-1.5">
                          <b>{i + 1}.</b> {m.player_name}
                        </td>
                        <td className="border-b border-border/60 px-2 py-1.5 text-right">
                          {m.attempts}
                        </td>
                        <td className="border-b border-border/60 px-2 py-1.5 text-right font-bold text-primary">
                          {m.best_score}
                        </td>
                        <td className="border-b border-border/60 px-2 py-1.5 text-right">
                          {m.avg_score ?? '—'}
                        </td>
                        <td className="border-b border-border/60 px-2 py-1.5 text-right">
                          {m.perfect_count > 0
                            ? '⭐'.repeat(Math.min(m.perfect_count, 5)) +
                              (m.perfect_count > 5 ? '+' : '')
                            : '—'}
                        </td>
                        <td className="border-b border-border/60 px-2 py-1.5 text-right text-[11px] text-muted-foreground">
                          {fmt(m.last_seen)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {playerName && (
                  <div className="mt-4 border-t border-border pt-3.5">
                    {loadingPlayer || !playerAtts ? (
                      <>
                        <h3 className="mb-2 text-base font-medium">📈 Chi tiết: {playerName}</h3>
                        <div className="py-6 text-center italic text-muted-foreground">
                          đang tải...
                        </div>
                      </>
                    ) : playerAtts.length === 0 ? (
                      <>
                        <h3 className="mb-2 text-base font-medium">📈 {playerName}</h3>
                        <div className="py-6 text-center italic text-muted-foreground">
                          Chưa có lượt nào
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="mb-2 text-base font-medium">
                          📈 {playerName} — {playerAtts.length} lượt gần nhất
                        </h3>
                        {playerAtts.map((a) => (
                          <div
                            key={a.id}
                            className="flex justify-between gap-2.5 border-b border-border/40 py-1.5 text-xs"
                          >
                            <span>
                              <span className="rounded bg-card px-1.5 py-px text-[10px]">
                                {a.version}
                                {a.level_n ? ' L' + a.level_n : ''}
                              </span>{' '}
                              {a.correct}/{a.total} · <b className="text-primary">{a.score}đ</b>
                            </span>
                            <span className="text-muted-foreground">{fmt(a.created_at)}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

function Stat({ v, l }: { v: number; l: string }) {
  return (
    <div className="rounded-lg bg-background/40 px-3 py-2 text-center">
      <div className="text-xl font-extrabold text-primary">{v}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{l}</div>
    </div>
  );
}
