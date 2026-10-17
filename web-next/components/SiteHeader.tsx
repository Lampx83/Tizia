'use client';

// Header dùng chung cho MỌI trang (mount trong app/layout.tsx) — thay cho
// public/js/auth-header.js của bản vanilla. Trái: brand 🌌 Tizia + nav. Phải:
// nếu đã đăng nhập → streak 🔥 (ẩn với trường ngoài K-12 theo streak_hidden) +
// xu 🪙 + chip tài khoản (dropdown hồ sơ + Đăng xuất); chưa đăng nhập → nút Đăng nhập.

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import NotificationsBell from './NotificationsBell';

type Me = {
  id: number;
  display_name: string;
  role: string;
  avatar_url?: string | null;
  effective_plan?: string;
  plan?: string;
  enrolled_domain?: string | null;
};
type Eng = { streak?: number; streak_hidden?: boolean };
type Wallet = { coins?: number; xp?: number };

const PLAN_LABEL: Record<string, string> = { free: 'Free', plus: 'Plus', pro: 'Pro', guest: 'Khách' };

export default function SiteHeader() {
  const [me, setMe] = useState<Me | null | undefined>(undefined); // undefined = đang tải
  const [eng, setEng] = useState<Eng | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Ai đang đăng nhập?
  useEffect(() => {
    let alive = true;
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive) return;
        const u = (d?.user ?? d) as Me | null;
        setMe(u && u.id ? u : null);
      })
      .catch(() => alive && setMe(null));
    return () => {
      alive = false;
    };
  }, []);

  // Streak + xu (chỉ khi đã đăng nhập).
  useEffect(() => {
    if (!me) return;
    fetch('/api/engagement/state', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setEng(d))
      .catch(() => {});
    fetch('/api/wallet', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setWallet(d))
      .catch(() => {});
  }, [me]);

  // Đóng dropdown khi bấm ra ngoài.
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } catch {}
    window.location.href = '/';
  }

  const coins = wallet?.coins ?? wallet?.xp;
  const plan = me?.effective_plan || me?.plan || 'free';

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-3 px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="text-xl leading-none">🌌</span>
          <span className="text-lg">Tizia</span>
        </Link>

        {/* Nav chính */}
        <nav className="ml-3 hidden items-center gap-4 text-sm text-muted-foreground md:flex">
          <Link href="/kham-pha" className="transition-colors hover:text-foreground">Khám phá</Link>
          <Link href="/school" className="transition-colors hover:text-foreground">Trường học</Link>
          <Link href="/on-tap" className="transition-colors hover:text-foreground">Ôn tập</Link>
          <Link href="/league" className="transition-colors hover:text-foreground">Bảng xếp hạng</Link>
        </nav>

        {/* Khu tài khoản */}
        <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
          {/* Chuông phản hồi Ban điều hành AI (ẩn với guest) — bản React,
              thay vanilla notifications-bell.js chèn qua nginx. */}
          <NotificationsBell />
          {/* Bộ chọn giao diện sáng / tối / theo hệ thống — luôn hiển thị */}
          <ThemeToggle />

          {me === undefined ? (
            <div className="h-8 w-20 animate-pulse rounded-full bg-foreground/5" />
          ) : me ? (
            <>
              {eng && !eng.streak_hidden && typeof eng.streak === 'number' && (
                <span
                  className="hidden items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-1 text-sm font-medium sm:inline-flex"
                  title="Chuỗi ngày học liên tiếp"
                >
                  🔥 {eng.streak}
                </span>
              )}
              {typeof coins === 'number' && (
                <span
                  className="hidden items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-1 text-sm font-medium sm:inline-flex"
                  title="Xu tích luỹ"
                >
                  🪙 {coins.toLocaleString('vi-VN')}
                </span>
              )}

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-full bg-foreground/5 py-1 pl-1 pr-2.5 transition-colors hover:bg-foreground/10"
                >
                  <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-primary/25 text-sm font-semibold text-primary">
                    {me.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={me.avatar_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      (me.display_name?.[0] || '🙂').toUpperCase()
                    )}
                  </span>
                  <span className="hidden max-w-[130px] truncate text-sm font-medium sm:block">
                    {me.display_name}
                  </span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                    <div className="border-b border-border px-4 py-3">
                      <div className="truncate font-medium">{me.display_name}</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">{PLAN_LABEL[plan] || plan}</span>
                        <span>· {me.role}</span>
                      </div>
                    </div>
                    <nav className="p-1.5 text-sm">
                      <Link href="/kham-pha" className="block rounded-md px-3 py-2 transition-colors hover:bg-foreground/5" onClick={() => setOpen(false)}>🧭 Khám phá</Link>
                      <Link href="/on-tap" className="block rounded-md px-3 py-2 transition-colors hover:bg-foreground/5" onClick={() => setOpen(false)}>📚 Thư viện ôn tập</Link>
                      <Link href="/nang-luc" className="block rounded-md px-3 py-2 transition-colors hover:bg-foreground/5" onClick={() => setOpen(false)}>🎯 Năng lực</Link>
                      <Link href="/complete-profile" className="block rounded-md px-3 py-2 transition-colors hover:bg-foreground/5" onClick={() => setOpen(false)}>👤 Hồ sơ</Link>
                      {me.role === 'admin' && (
                        <a href="/admin.html" className="block rounded-md px-3 py-2 transition-colors hover:bg-foreground/5">🛠️ Quản trị</a>
                      )}
                      <button
                        type="button"
                        onClick={logout}
                        className="mt-0.5 block w-full rounded-md px-3 py-2 text-left text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        ⎋ Đăng xuất
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
