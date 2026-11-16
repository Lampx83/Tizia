// Dữ liệu tĩnh của topic "sap-xep" — trích từ public/js/topic-modes.js (TOPICS['sap-xep'])
// và LEVELS trong public/js/medicines.js.
// Hub sắp xếp thuốc không gọi API: đây là registry client-side các phiên bản (mode)
// cùng nội dung + bảng 10 cấp độ; tiến độ lưu ở localStorage (xem LevelGrid.tsx).

export type Mode = {
  id: string;
  icon: string;
  label: string;
  tech: string;
  url: string;
  desc: string;
  specs: string[];
  status?: 'ready' | 'soon' | 'external';
  cta?: string;
};

export type Topic = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  accentColor: string;
  defaultMode: string;
  modes: Mode[];
};

export type Level = {
  n: number;
  count: number;
  time: number;
  shuffleSlots: boolean;
  label: string;
  desc: string;
};

// 10 LEVELS — escalating difficulty (port từ medicines.js).
export const LEVELS: Level[] = [
  { n: 1, count: 3, time: 90, shuffleSlots: false, label: 'Khởi đầu', desc: '3 loại · 90s · nhẹ nhàng' },
  { n: 2, count: 4, time: 80, shuffleSlots: false, label: 'Làm quen', desc: '4 loại · 80s' },
  { n: 3, count: 5, time: 70, shuffleSlots: false, label: 'Tăng tốc', desc: '5 loại · 70s' },
  { n: 4, count: 6, time: 60, shuffleSlots: false, label: 'Bình thường', desc: '6 loại · 60s' },
  { n: 5, count: 6, time: 55, shuffleSlots: true, label: 'Đảo kệ', desc: '6 loại · 55s · ô shuffle' },
  { n: 6, count: 7, time: 50, shuffleSlots: true, label: 'Khá khó', desc: '7 loại · 50s · ô shuffle' },
  { n: 7, count: 8, time: 45, shuffleSlots: true, label: 'Thử thách', desc: '8 loại · 45s · ô shuffle' },
  { n: 8, count: 9, time: 40, shuffleSlots: true, label: 'Khó', desc: '9 loại · 40s' },
  { n: 9, count: 10, time: 35, shuffleSlots: true, label: 'Rất khó', desc: '10 loại · 35s' },
  { n: 10, count: 16, time: 30, shuffleSlots: true, label: 'Boss — đỉnh cao', desc: '16 loại · 30s · FULL CATALOG' },
];

export const SAP_XEP: Topic = {
  id: 'sap-xep',
  icon: '💊',
  title: 'Sắp xếp thuốc theo nhóm ATC',
  subtitle: 'Phân loại 16 thuốc thông dụng vào đúng nhóm điều trị · 10 cấp độ',
  accentColor: '#fbbf24',
  defaultMode: '3d',
  modes: [
    {
      id: '3d', icon: '🥽', label: '3D Realistic', tech: 'Three.js · WebGL',
      url: '/3d-shelf',
      desc: 'Three.js full 3D scene với carton mở được, snap-to-slot, hover halo. Camera orbit chuột/touch, click để nhặt thuốc.',
      specs: ['ok:Đẹp · Realistic', 'Desktop tốt nhất', 'Touch OK', 'bad:Mobile yếu chậm'],
      cta: '▶️ Chơi 3D ngay',
    },
    {
      id: 'vr', icon: '🕹️', label: 'VR / XR Web', tech: 'Three.js · WebXR · Hand tracking',
      url: '/3d-shelf#vr',
      desc: 'Cùng scene 3D — vào kính Meta Quest browser bấm Enter VR để chơi bằng tay (hand tracking native). Cũng chạy desktop với chuột.',
      specs: ['ok:VR thật trên Quest', 'ok:Hand tracking native', 'Snap-to-slot', 'Desktop OK'],
      cta: '🥽 Vào VR / XR',
    },
    {
      id: '2d', icon: '🎮', label: '2D Arcade', tech: 'Canvas 2D · MediaPipe · Mouse',
      url: '/2d-arcade',
      desc: 'Game-style side-view. Pinch mở thùng → thuốc bay ra → kéo vào kệ đúng nhóm. Hỗ trợ chuột nếu không có webcam. Nhẹ ~30 KB.',
      specs: ['ok:Mobile mượt', 'MediaPipe · Mouse', '🔊 SFX', 'bad:Không VR'],
      cta: '▶️ Chơi 2D',
    },
    {
      id: 'quiz', icon: '🧠', label: 'Quiz MCQ', tech: 'HTML + JS · Quiz',
      url: '/quiz',
      desc: '10 câu hỏi MCQ về phân loại thuốc — nhìn tên/hoạt chất chọn đúng nhóm điều trị trong 4 đáp án. 15s/câu, streak bonus.',
      specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết', 'ok:Ai cũng chơi'],
      cta: '🧠 Bắt đầu Quiz',
    },
    {
      id: 'meta', icon: '🌐', label: 'Metaverse', tech: 'Three.js + WebSocket · Multiplayer',
      url: '/metaverse',
      desc: 'Phòng dược 3D realtime multiplayer — thấy avatar người khác chuyển động real-time, cùng xếp thuốc, chat & xem tiến độ.',
      specs: ['ok:Multiplayer', 'ok:Chat & avatar', 'Desktop · Mobile', 'Realtime sync'],
      cta: '🌐 Vào phòng',
    },
    {
      id: 'time', icon: '⚡', label: 'Time Attack', tech: 'Canvas 2D · Survival',
      url: '/time-attack',
      desc: 'Sống được càng nhiều wave càng tốt — mỗi wave thêm 1 thuốc, time giảm dần, sai trừ 5s. Test phản xạ và độ nhớ.',
      specs: ['ok:Endless', 'Escalating', 'bad:Sai -5s', 'Wave-based'],
      cta: '⚡ Time Attack',
    },
    {
      id: 'race', icon: '🏁', label: 'Race 1v1', tech: 'WebSocket · 1v1',
      url: '#',
      status: 'soon',
      desc: 'Bắt cặp 2 người ngẫu nhiên qua WebSocket, cùng chơi 1 level, ai xong trước thắng. Backend đã sẵn sàng, UI đang hoàn thiện.',
      specs: ['ok:Auto-match', 'Live opponent', 'Real-time score', 'Best of 3'],
    },
    {
      id: 'unity', icon: '📦', label: 'Unity native', tech: 'Unity · Meta XR SDK · Quest APK',
      url: '#',
      status: 'soon',
      desc: 'Bản app native Quest dự kiến — hand tracking chuẩn Meta XR SDK, vật lý PhysX, đồ hoạ tốt nhất. Đang chờ team Unity build.',
      specs: ['~50 MB APK', 'ok:VR chất lượng cao nhất', 'bad:Chỉ Meta Quest', 'Cần Unity build'],
    },
  ],
};
