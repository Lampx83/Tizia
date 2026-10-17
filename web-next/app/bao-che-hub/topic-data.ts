// Dữ liệu tĩnh của topic "bao-che" — trích từ public/js/topic-modes.js (TOPICS['bao-che'])
// và danh sách 8 đơn pha chế trong public/bao-che-hub.html.
// Hub bào chế không gọi API: đây là registry client-side các phiên bản (mode) cùng nội dung
// + thư mục 8 đơn link tới compounding-lab. Không có endpoint DB cho registry này (xem risks).

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

export type Recipe = {
  slug: string;
  icon: string;
  order: string;
  name: string;
};

// 8 đơn pha chế — thư mục link tới compounding-lab (port từ bao-che-hub.html).
export const RECIPES: Recipe[] = [
  { slug: 'siro-paracetamol', icon: '🍯', order: 'Đơn 1', name: 'Siro Para' },
  { slug: 'dung-dich-vitc', icon: '🍋', order: 'Đơn 2', name: 'DD VitC' },
  { slug: 'hon-dich-smecta', icon: '🥛', order: 'Đơn 3', name: 'Smecta' },
  { slug: 'con-iod', icon: '🟤', order: 'Đơn 4', name: 'Cồn iod' },
  { slug: 'siro-ho-thaoduoc', icon: '🌿', order: 'Đơn 5', name: 'Siro ho' },
  { slug: 'kem-calamine', icon: '🌸', order: 'Đơn 6', name: 'Calamine' },
  { slug: 'vien-ngam-vitc', icon: '🟡', order: 'Đơn 7', name: 'Ngậm VitC' },
  { slug: 'nhomat-nacl', icon: '💧', order: 'Đơn 8', name: 'Nhỏ mắt' },
];

export const BAO_CHE: Topic = {
  id: 'bao-che',
  icon: '🧪',
  title: 'Bào chế GMP — Pha 8 đơn thuốc',
  subtitle: 'Cân hoạt chất, đong dung môi, q.s., đóng chai · 2 tay phối hợp',
  accentColor: '#14b8a6',
  defaultMode: '3d',
  modes: [
    {
      id: '3d', icon: '🥽', label: 'Phòng Lab 3D', tech: 'Three.js · MediaPipe · 2 tay',
      url: '/compounding-lab',
      desc: 'Three.js full 3D scene với cân điện tử, ống đong, cốc thuỷ tinh. Free-form thao tác tự do, lỗi quy trình tổng kết cuối bài. 2 tay phối hợp rót ổn định hơn.',
      specs: ['ok:Sẵn sàng', 'ok:2 tay MediaPipe', 'Free-form', 'Desktop tốt nhất'],
      cta: '▶️ Vào phòng lab',
    },
    {
      id: 'vr', icon: '🕹️', label: 'VR / XR Web', tech: 'A-Frame · WebXR',
      url: '#',
      status: 'soon',
      desc: 'Phòng lab WebXR — vào kính Meta Quest bấm Enter VR, dùng hand tracking native để cầm cốc, rót thuốc thật như đang ở phòng pha chế.',
      specs: ['~250 KB', 'ok:VR thật trên Quest', 'Desktop OK', 'Hand tracking native'],
    },
    {
      id: '2d', icon: '🎨', label: '2D Side-view', tech: 'Canvas 2D · Vanilla JS',
      url: '#',
      status: 'soon',
      desc: 'Side-view minimalist — kéo cốc, ống đong, lọ thuốc bằng chuột/touch. Tải nhẹ, phù hợp ôn quy trình trên mobile mà không cần webcam hay 3D.',
      specs: ['ok:~10 KB', 'Click/touch', 'Mobile OK', 'bad:Không VR'],
    },
    {
      id: 'quiz', icon: '🧠', label: 'Quiz GMP', tech: 'HTML + JS · Quiz',
      url: '#',
      status: 'soon',
      desc: '10 câu hỏi MCQ về quy trình GMP — thứ tự bước, công thức q.s., tolerance cân, an toàn vô khuẩn. 15s/câu, streak bonus.',
      specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết GMP', 'ok:Ai cũng chơi'],
    },
    {
      id: 'meta', icon: '🌐', label: 'Metaverse', tech: 'Three.js + WebSocket · Multiplayer',
      url: '#',
      status: 'soon',
      desc: 'Phòng lab GMP realtime multiplayer — mỗi SV có bàn pha riêng, thấy avatar người khác, giảng viên ghé qua kiểm tra trực tiếp.',
      specs: ['ok:Multiplayer', '~220 KB', 'ok:GV giám sát', 'Desktop · Mobile'],
    },
    {
      id: 'time', icon: '⚡', label: 'Time Attack', tech: 'Three.js · Survival',
      url: '#',
      status: 'soon',
      desc: 'Pha đúng đơn càng nhanh càng tốt — đếm ngược, sai bước trừ thời gian. Test phản xạ quy trình GMP dưới áp lực thời gian.',
      specs: ['ok:Endless', 'Escalating', 'bad:Sai -10s', 'Đơn random'],
    },
    {
      id: 'race', icon: '🏁', label: 'Race 1v1', tech: 'WebSocket · 1v1',
      url: '#',
      status: 'soon',
      desc: '2 SV ngẫu nhiên cùng pha 1 đơn — ai đúng & nhanh hơn thắng. Backend WebSocket dùng chung với Sắp xếp.',
      specs: ['ok:Auto-match', 'Live opponent', 'Real-time score', 'Best of 3'],
    },
    {
      id: 'unity', icon: '📦', label: 'Unity native', tech: 'Unity · Meta XR SDK · Quest APK',
      url: '#',
      status: 'soon',
      desc: 'App native Quest — vật lý PhysX cho chất lỏng, hand tracking Meta XR SDK chuẩn. Mô phỏng cảm giác cầm cốc, rót, lắc gần như thật.',
      specs: ['~70 MB APK', 'ok:VR cao nhất', 'bad:Chỉ Meta Quest', 'Cần Unity build'],
    },
  ],
};
