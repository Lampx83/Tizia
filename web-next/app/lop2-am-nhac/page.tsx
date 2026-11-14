import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import AmNhacMount from './AmNhacMount';

export const metadata: Metadata = pageMeta({
  title: '🎵 Đô-Rê-Mi Bay — Âm nhạc Lớp 2',
  description:
    'Game âm nhạc Lớp 2: gõ phím A S D F G H J (hoặc bấm thanh nốt) khi nốt Đô-Rê-Mi rơi tới vạch. WebAudio phát đúng tần số 7 nốt, chấm PERFECT/GOOD, combo và điểm.',
  path: '/lop2-am-nhac',
});

// Server Component: khung SEO tĩnh (tiêu đề) render sẵn. Toàn bộ tương tác (WebAudio
// tổng hợp âm 7 nốt, nốt rơi theo requestAnimationFrame, gõ phím/bấm thanh nốt,
// chấm điểm + combo, đồng hồ 60s, modal tổng kết + best localStorage, đồng bộ XP
// /api/wallet) nằm trong AmNhacMount ('use client'), tái dùng script vanilla qua
// public/legacy/lop2-am-nhac.js. Bảng NOTES (7 nốt + tần số chuẩn) là hằng số nhạc
// lý giữ trong file legacy — xem risks.
export default function Lop2AmNhac() {
  return <AmNhacMount />;
}
