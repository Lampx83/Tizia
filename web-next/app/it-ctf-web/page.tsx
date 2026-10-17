import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import CtfWebClient from './it-ctf-web-client';

// Trang tương tác client (sandbox CTF bảo mật web: SQLi · XSS · Path Traversal ·
// Command Injection). Server component chỉ giữ metadata SEO; toàn bộ tương tác +
// checker chạy client (không có server thật bị tấn công).
export const metadata: Metadata = pageMeta({
  title: '🛡️ CTF Bảo mật Web · Trường CNTT',
  description:
    'Sandbox an toàn mô phỏng 4 lỗ hổng OWASP Top 10 — SQL Injection, XSS, Path Traversal, Command Injection — với bài học phòng thủ ở đời thật.',
  path: '/it-ctf-web',
});

export default function CtfWebPage() {
  return <CtfWebClient />;
}
