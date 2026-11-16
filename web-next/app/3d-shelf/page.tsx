import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import ShelfMount from './ShelfMount';

// Server Component: chỉ giữ khung SEO (metadata). Toàn bộ engine 3D (Three.js kệ
// thuốc + WebXR/VR, OrbitControls, pinch-drag qua MediaPipe, VR-Preview, chấm
// điểm, submit /api/attempts) là vanilla NẶNG — được wrap-mount NGUYÊN VĂN qua
// ShelfMount ('use client') + public/legacy/3d-shelf.js. Không viết lại engine.
export const metadata: Metadata = pageMeta({
  title: '3D Realistic — Kệ thuốc 3D',
  description:
    'Mô phỏng kệ thuốc 3D bằng Three.js: bốc thuốc từ thùng carton rồi xếp lên đúng ô phân loại. Hỗ trợ pinch điều khiển tay (MediaPipe) và VR/WebXR.',
  path: '/3d-shelf',
});

export default function ThreeDShelfPage() {
  return <ShelfMount />;
}
