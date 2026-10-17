import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { CapabilityGrid } from './CapabilityGrid';

export const metadata: Metadata = pageMeta({
  title: 'Hỗ trợ thiết bị',
  description:
    'Tizia chạy trên đa thiết bị — khả năng đã phát hiện trên thiết bị hiện tại + hướng dẫn cho từng loại.',
  path: '/devices',
});

type Device = {
  name: string;
  vendor: string;
  icon: string;
  status: 'full' | 'partial' | 'none';
  works: string[];
  rec: string; // chứa HTML inline (<b>, <code>) như trang gốc
  modes: string[];
};

const DEVICES: Device[] = [
  {
    name: 'Meta Quest 2 / 3 / Pro', vendor: 'Meta · WebXR + Hand Tracking',
    icon: '🥽', status: 'full',
    works: ['3D Realistic với hand tracking native', 'Metaverse 3D multi-user', '2D Arcade qua trình duyệt'],
    rec: 'Mở <b>Meta Quest Browser</b> → <code>http://&lt;host&gt;:8041/3d-shelf</code> → bấm <b>ENTER VR</b> → giơ tay pinch ngón cái+trỏ',
    modes: ['3D ✓', 'Metaverse ✓', '2D ✓', 'AR ✗', 'Quiz ✓'],
  },
  {
    name: 'Apple Vision Pro', vendor: 'Apple · Safari + WebXR',
    icon: '🍎', status: 'partial',
    works: ['3D Realistic (hand tracking qua Safari)', '2D Arcade', 'Quiz'],
    rec: 'Mở <b>Safari</b> trên visionOS → URL trang → <b>ENTER VR</b>. WebXR hỗ trợ một phần; có thể fallback chuột-trỏ.',
    modes: ['3D ✓', 'Metaverse ✓', '2D ✓', 'AR ⚠️', 'Quiz ✓'],
  },
  {
    name: 'Android XR (Samsung HMD)', vendor: 'Google · Android XR 2025+',
    icon: '🤖', status: 'full',
    works: ['Tất cả mode 3D + hand tracking', 'Metaverse multi-user', 'AR mode (nếu thiết bị hỗ trợ)'],
    rec: 'Mở <b>Chrome trên Android XR</b> → URL → <b>ENTER VR</b>. WebXR + hand tracking đầy đủ.',
    modes: ['3D ✓', 'Metaverse ✓', '2D ✓', 'AR ✓', 'Quiz ✓'],
  },
  {
    name: 'Phone (Android/iOS) — AR', vendor: 'Chrome ARCore / Safari ARKit',
    icon: '📱', status: 'partial',
    works: ['2D Arcade với chuột/touch', 'Quiz (rất phù hợp)', 'AR mode khi có WebXR AR'],
    rec: 'Mở Chrome (Android) hoặc Safari (iOS) → bấm <b>2D Arcade</b> chế độ <b>chuột/chạm</b>, hoặc <b>Quiz</b> để học từ vựng phân loại.',
    modes: ['3D ⚠️', 'Metaverse ✓', '2D ✓', 'AR ⚠️', 'Quiz ✓'],
  },
  {
    name: 'Desktop + Webcam', vendor: 'Chrome / Edge — MediaPipe',
    icon: '💻', status: 'full',
    works: ['Mọi mode với MediaPipe pinch (webcam)', 'Hoặc chuột nếu không có webcam', 'Dashboard giảng viên'],
    rec: 'Trình duyệt hiện đại + webcam. Mở bất kỳ mode nào → <b>Bật điều khiển tay</b>.',
    modes: ['3D ✓', 'Metaverse ✓', '2D ✓', 'AR ✗', 'Quiz ✓'],
  },
  {
    name: 'Tablet (iPad / Android tablet)', vendor: 'Touch + Safari/Chrome',
    icon: '🖥️', status: 'partial',
    works: ['2D Arcade kéo-thả bằng tay', 'Quiz nhanh', 'Metaverse với touch'],
    rec: 'Phù hợp cho <b>lớp học</b> — không cần webcam. Mở 2D Arcade → "🖱️ Chơi bằng chuột".',
    modes: ['3D ⚠️', 'Metaverse ✓', '2D ✓', 'AR ⚠️', 'Quiz ✓'],
  },
  {
    name: 'Ray-Ban Meta Smart Glasses', vendor: 'Meta · không có màn hình',
    icon: '🕶️', status: 'none',
    works: ['Không hỗ trợ — kính chỉ có camera + loa, không có màn hình hiển thị web'],
    rec: 'Dùng <b>điện thoại Meta View app</b> để xem nội dung; hoặc kết hợp glass camera với 2D Arcade trên máy khác (sắp có).',
    modes: ['3D ✗', 'Metaverse ✗', '2D ✗', 'AR ✗', 'Quiz ✗'],
  },
  {
    name: 'Google Glass Enterprise', vendor: 'Google · màn hình rất nhỏ',
    icon: '👓', status: 'partial',
    works: ['Quiz mode (text-only) — phù hợp xem nhanh', 'Khó tương tác chính xác'],
    rec: 'Mở Quiz qua trình duyệt nhúng. Tương tác bằng touch pad của kính.',
    modes: ['3D ✗', 'Metaverse ✗', '2D ⚠️', 'AR ✗', 'Quiz ⚠️'],
  },
];

const STATUS_LABEL: Record<Device['status'], string> = {
  full: '✓ Hỗ trợ đầy đủ',
  partial: '⚠️ Một phần',
  none: '✗ Không phù hợp',
};

const STATUS_CLASS: Record<Device['status'], string> = {
  full: 'bg-[#10b981] text-white',
  partial: 'bg-[#f59e0b] text-white',
  none: 'bg-[#6b7280] text-white',
};

export default function DevicesPage() {
  return (
    <div
      className="w-full text-white"
      style={{
        // Nền gradient thương hiệu riêng của trang gốc devices.html.
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)',
        padding: '32px 20px',
        borderRadius: 16,
      }}
    >
      <header className="mb-6">
        <h1 className="m-0 mb-2 flex flex-wrap items-center gap-2.5 text-[34px] font-bold">
          📱 Hỗ trợ thiết bị
          <Link
            href="/"
            className="ml-auto rounded-md bg-white/15 px-3 py-1.5 text-[13px] text-white no-underline hover:bg-white/25"
          >
            ← Trang chính
          </Link>
        </h1>
        <div className="text-sm opacity-75">
          Tizia chạy trên đa thiết bị — đây là khả năng đã được phát hiện trên thiết bị hiện tại + hướng dẫn cho từng loại
        </div>
      </header>

      <div className="mb-7 rounded-[14px] border border-white/15 bg-white/[0.08] px-5 py-[18px]">
        <h2 className="m-0 mb-3.5 text-base opacity-85">🔍 Phát hiện trên thiết bị này</h2>
        <CapabilityGrid />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[18px]">
        {DEVICES.map((d) => (
          <div
            key={d.name}
            className="flex flex-col rounded-[14px] border border-white/15 bg-white/[0.08] px-[22px] py-5 transition-transform hover:-translate-y-[3px] hover:bg-white/[0.13]"
          >
            <h3 className="m-0 mb-1 flex items-center gap-2 text-[18px]">
              {d.icon} {d.name}
            </h3>
            <div className="mb-3 text-xs opacity-65">{d.vendor}</div>
            <span
              className={`mb-2.5 inline-block self-start rounded-[10px] px-[9px] py-[3px] text-[11px] font-bold uppercase tracking-[0.3px] ${STATUS_CLASS[d.status]}`}
            >
              {STATUS_LABEL[d.status]}
            </span>
            <div className="my-2.5 flex flex-wrap gap-[5px]">
              {d.modes.map((m) => {
                const bad = m.includes('✗');
                return (
                  <span
                    key={m}
                    className={`rounded-lg bg-white/[0.12] px-2 py-[2px] text-[10px] text-white/90 ${bad ? 'line-through opacity-35' : ''}`}
                  >
                    {m}
                  </span>
                );
              })}
            </div>
            <ul className="my-2 mb-3.5 list-disc pl-[18px] text-[13px] leading-[1.7] opacity-90">
              {d.works.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <div
              className="mt-auto rounded-lg bg-black/25 px-3 py-2 text-xs [&_b]:text-[#fbbf24]"
              dangerouslySetInnerHTML={{ __html: `💡 ${d.rec}` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
