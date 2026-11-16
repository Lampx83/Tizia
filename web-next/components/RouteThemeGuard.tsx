'use client';

// NGUỒN ÁP THEME DUY NHẤT ở phía client. Áp lớp `dark` lên <html> theo:
//   • route hiện tại (trong allowlist → theo lựa chọn người dùng; ngoài → ép tối)
//   • lựa chọn theme đã lưu ('tizia-theme')
//   • đổi sáng/tối của hệ thống (khi chọn 'system')
// Kích hoạt lại khi: điều hướng (Next client-side KHÔNG chạy lại inline script
// trong <head>), ThemeToggle phát event 'tizia-theme-change', hệ thống đổi màu.
// Xem [[theme-routes]]. Lần sơn đầu (chống FOUC) do inline script ở layout lo.

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { pathHonorsTheme } from '@/lib/theme-routes';

function applyTheme(pathname: string) {
  let userDark = true;
  try {
    const t = localStorage.getItem('tizia-theme') || 'system';
    userDark =
      t === 'dark' ||
      (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  } catch {}
  const dark = pathHonorsTheme(pathname) ? userDark : true; // ngoài allowlist → luôn tối
  document.documentElement.classList.toggle('dark', dark);
}

export default function RouteThemeGuard() {
  const pathname = usePathname();

  useEffect(() => {
    applyTheme(pathname);
    const onChange = () => applyTheme(pathname);
    window.addEventListener('tizia-theme-change', onChange);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('tizia-theme-change', onChange);
      mq.removeEventListener('change', onChange);
    };
  }, [pathname]);

  return null;
}
