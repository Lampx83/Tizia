'use client';

// Bộ chọn giao diện dùng chung (mount trong SiteHeader). 3 lựa chọn:
//   • 🖥️ Theo hệ thống  → bám prefers-color-scheme của máy
//   • ☀️ Nền sáng
//   • 🌙 Nền tối
// Lưu ở localStorage 'tizia-theme' rồi phát event 'tizia-theme-change'; việc
// ÁP lớp `dark` (có xét route allowlist) do RouteThemeGuard lo — xem
// [[theme-routes]]. Nút TỰ ẨN ở trang ngoài allowlist vì ở đó app luôn nền tối
// nên đổi theme không có tác dụng.

import { useEffect, useRef, useState } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
const KEY = 'tizia-theme';

const OPTIONS: { mode: ThemeMode; icon: string; label: string }[] = [
  { mode: 'system', icon: '🖥️', label: 'Theo hệ thống' },
  { mode: 'light', icon: '☀️', label: 'Nền sáng' },
  { mode: 'dark', icon: '🌙', label: 'Nền tối' },
];

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Đọc lựa chọn đã lưu (chỉ ở client).
  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as ThemeMode) || 'system';
    setMode(saved);
    setReady(true);
  }, []);

  // Đóng menu khi bấm ra ngoài.
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  function choose(next: ThemeMode) {
    setMode(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    // RouteThemeGuard nghe event này để áp lại theme (có xét allowlist).
    window.dispatchEvent(new Event('tizia-theme-change'));
    setOpen(false);
  }

  // Hiển thị ở MỌI trang để header thống nhất. Ở trang ngoài allowlist (game/
  // lab nền tối) nút vẫn LƯU lựa chọn — có tác dụng khi quay lại trang "đọc".
  const current = OPTIONS.find((o) => o.mode === mode) ?? OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title={`Giao diện: ${current.label}`}
        aria-label={`Đổi giao diện — đang: ${current.label}`}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-base transition-colors hover:bg-foreground/10"
      >
        {/* Trước khi đọc localStorage xong thì hiển thị icon trung tính để tránh
            nhảy icon (hydration). */}
        <span suppressHydrationWarning>{ready ? current.icon : '🖥️'}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          <div className="p-1.5 text-sm">
            {OPTIONS.map((o) => (
              <button
                key={o.mode}
                type="button"
                onClick={() => choose(o.mode)}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition-colors hover:bg-foreground/5 ${
                  o.mode === mode ? 'font-semibold text-primary' : ''
                }`}
              >
                <span className="text-base leading-none">{o.icon}</span>
                <span>{o.label}</span>
                {o.mode === mode && <span className="ml-auto text-primary">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
