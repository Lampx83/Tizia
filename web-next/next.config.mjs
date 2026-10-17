/** @type {import('next').NextConfig} */
// Next là CỬA TRƯỚC của Tizia. Chiến lược migrate "strangler fig":
//   • Trang đã migrate  → route Next native (React).
//   • Còn lại           → fallback proxy sang app vanilla Express (:8042) —
//                          trang HTML cũ + asset (/js, /assets, /models…) + /api.
// Nhờ vậy "mọi thứ đi qua Next" ngay, không hỏng gì; migrate dần từng trang, khi
// hết trang fallback thì XOÁ vanilla + bỏ khối `fallback` này.
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/+$/, '');
const hasBasePath = BASE_PATH.length > 0;
const LEGACY =
  process.env.BACKEND_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8042' : 'http://localhost:8041');

const nextConfig = {
  output: 'standalone',
  turbopack: { root: import.meta.dirname },
  images: { unoptimized: true },
  ...(hasBasePath && { basePath: BASE_PATH, assetPrefix: BASE_PATH }),
  env: { ...(hasBasePath && { NEXT_PUBLIC_BASE_PATH: BASE_PATH }) },
  async redirects() {
    // URL .html cũ → URL SẠCH (308, giữ query). Ai vào /school.html?domain=x sẽ tự
    // nhảy sang /school?domain=x. CHỈ áp cho trang đã migrate — KHÔNG đụng .html của
    // asset nhúng (campus-proto iframe…) vì chúng vẫn do Express phục vụ qua fallback.
    return [
      // Trang chủ chỉ được có MỘT URL. Trước đây /index.html → /index, mà /index
      // render y hệt "/" → Google thấy hai URL trùng nội dung (duplicate content).
      // Nay cả hai đều gom về "/".
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      ...MIGRATED.filter((p) => p !== 'index').map((p) => ({
        source: `/${p}.html`,
        destination: `/${p}`,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // LUÔN đẩy /api sang Express (kể cả khi có page trùng tên).
        { source: '/api/:path*', destination: `${LEGACY}/api/:path*` },
      ],
      afterFiles: [],
      // fallback: path Next KHÔNG có route/file → phục vụ tạm bằng app vanilla.
      fallback: [{ source: '/:path*', destination: `${LEGACY}/:path*` }],
    };
  },
};

// Trang đã MIGRATE sang Next (dùng cho redirects .html→URL sạch ở trên).
const MIGRATED = [
      'login', 'register', 'complete-profile', 'kham-pha',
      // batch 1 (SSR content)
      'league', 'marketplace', 'cv', 'apps', 'battle-pass', 'ban-do-vn',
      // batch 2 (SSR content)
      'L3-3-tuong-tac', 'bang-phong-than', 'cast', 'cay-tri-thuc', 'devices',
      'family', 'index', 'it-code-lab', 'luat-giao-thong-600', 'module',
      'nang-luc', 'portal-apps', 'pricing', 'sac-ky-vr', 'sap-xep-hub',
      'school', 'srs', 'subject', 'teacher', 'tran-dau',
      // batch 3a (client-rewrite)
      'GC07-osce-championship', 'agent-chat', 'ai-quiz-gen', 'bao-che-hub', 'bao-so-hoc',
      'bien-bao-giao-thong', 'bp-measure', 'calibration-curve', 'code-quest', 'cua-hang',
      'dem-ngon-tay', 'dem-qua', 'dilution', 'dispense', 'do-chu-ghep-van', 'duoc-soap',
      'ghep-chu-cai', 'grapher', 'history-vn', 'hoc-thong-minh', 'it-algo-viz',
      'it-cipher-ctf', 'it-ctf-web',
      // batch 3b (client-rewrite)
      'iv-infusion', 'lesson-builder', 'lop2-anh-memory', 'lop2-dao-duc', 'lop2-ghep-van',
      'luyen-de', 'luyen-phat-am', 'negotiation', 'patient-sim', 'pdf-tutor',
      'pediatric-dose', 'pet-tri-thuc', 'pixel-art-studio', 'pk-curve', 'quiz',
      'sac-ky-quiz', 'space', 'teacher-live', 'tech-career-center', 'tu-vung-tieng-anh',
      'voice-demo',
      // batch wrap-mount (3D/game/lab — bọc engine cũ)
      '2d-arcade', '3d-shelf', 'L2-1-titration', 'PS01-er', 'PS15-gmp-factory',
      'antibiogram-2d', 'assets', 'campus-mp', 'compounding-lab', 'herb-garden-3d',
      'lab-hoa-ao', 'lap-trinh-game', 'lesson', 'lop2-am-nhac', 'lop2-phan-loai-rac',
      'lop2-the-thao', 'math-fun', 'metaverse', 'nha-thuoc-3d', 'sac-ky-2d',
      'sac-ky-3d', 'sac-ky-meta', 'sac-ky-vr-web', 'time-attack',
];

export default nextConfig;
