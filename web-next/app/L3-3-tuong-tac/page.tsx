import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import ScenarioMount from './ScenarioMount';

export const metadata: Metadata = pageMeta({
  title: 'L3.3 · Tương tác thuốc',
  description:
    'Phát hiện cặp tương tác nguy hiểm + hiểu cơ chế CYP450 — phục vụ môn Dược lý 3 và Dược lâm sàng 4.',
  path: '/L3-3-tuong-tac',
});

// Server Component: khung SEO tĩnh (tiêu đề, mô tả, mục tiêu module) render sẵn
// từ server. Phần tương tác (picker scenario + ScenarioEngine + quiz + kết quả)
// nằm trong ScenarioMount ('use client'), tái dùng engine vanilla qua /js/*.
export default function L33TuongTac() {
  return (
    <div className="w-full text-white">
      <div className="mb-6 flex items-center gap-3 text-sm">
        <Link href="/" className="text-white/70 hover:text-white">
          ← Trang chủ
        </Link>
        <span className="opacity-40">|</span>
        <Link href="/" className="text-white/70 hover:text-white">
          Năm 3 · Dược lý
        </Link>
      </div>

      <h1 className="mb-1.5 text-[28px] font-semibold">🔗 Module L3.3 · Tương tác thuốc</h1>
      <div className="mb-6 text-[15px] opacity-75">
        Phát hiện cặp tương tác nguy hiểm + hiểu cơ chế CYP450 — phục vụ môn Dược lý 3 và Dược lâm sàng 4.
      </div>

      <div
        className="mb-5 rounded-[14px] border p-[18px]"
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderColor: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h3 className="mb-2.5 text-base font-semibold">📚 Mục tiêu module</h3>
        <div>
          SV nhận diện được các cặp tương tác lâm sàng quan trọng (warfarin × macrolide, statin × CYP3A4
          inhibitor, clopidogrel × PPI…), hiểu cơ chế qua CYP450 và đề xuất phương án thay thế.
        </div>
        <div className="my-2 flex flex-wrap gap-2">
          {['📚 Năm 3', '🎓 Dược lý', '⏱️ ~15 phút', '🎯 5 câu MCQ + 5 cặp drag-match'].map((c) => (
            <span
              key={c}
              className="rounded-xl px-2.5 py-1 text-xs"
              style={{
                background: 'rgba(251,191,36,0.15)',
                border: '1px solid rgba(251,191,36,0.3)',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <ScenarioMount />
    </div>
  );
}
