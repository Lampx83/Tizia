'use client';

import Link from 'next/link';

// Thanh công cụ CV: nút In/Lưu PDF (window.print) là tương tác client, và link về
// trang chủ. Ẩn khi in (class print:hidden).
export default function Toolbar() {
  return (
    <div className="sticky top-0 z-10 -mx-4 mb-6 flex items-center justify-center gap-2.5 border-b border-border bg-background/95 px-3 py-3 backdrop-blur print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
      >
        🖨️ In / Lưu PDF
      </button>
      <Link
        href="/"
        className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent"
      >
        ← Về trang chủ
      </Link>
    </div>
  );
}
