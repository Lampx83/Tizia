// Dữ liệu tĩnh của topic "sac-ky" — trích từ public/js/topic-modes.js (TOPICS['sac-ky']).
// Hub sắc ký không gọi API: đây là registry client-side các phiên bản (mode) cùng nội dung TLC.

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

export const SAC_KY: Topic = {
  id: 'sac-ky',
  icon: '🧪',
  title: 'Sắc ký lớp mỏng (TLC)',
  subtitle: 'Phân tích định tính dược phẩm · 6 bước · 3 mẫu chấm · UV inspection · đo Rf',
  accentColor: '#a78bfa',
  defaultMode: '3d',
  modes: [
    {
      id: '3d', icon: '🥽', label: '3D Three.js', tech: 'Three.js · WebGL',
      url: '/sac-ky-3d',
      desc: 'Full 3D scene với glass material, shadow, lighting. Camera orbit chuột/touch, click vào đối tượng để tương tác. Đẹp nhất trên desktop.',
      specs: ['~150 KB', 'Desktop tốt nhất', 'Touch OK', 'bad:Mobile yếu chậm'],
      cta: '▶️ Vào lab 3D',
    },
    {
      id: 'vr', icon: '🕹️', label: 'VR / XR Web', tech: 'A-Frame · WebXR',
      url: '/sac-ky-vr-web',
      desc: 'Declarative HTML + WebXR. Vào kính Quest browser bấm Enter VR để chơi thật như VR native. Cũng chạy được trên desktop với gaze pointer.',
      specs: ['~250 KB', 'ok:VR thật trên Quest', 'Desktop OK', 'Hand tracking native'],
      cta: '🥽 Vào VR / XR',
    },
    {
      id: '2d', icon: '🎨', label: '2D Canvas', tech: 'Canvas 2D · Vanilla JS',
      url: '/sac-ky-2d',
      desc: 'Side-view minimalist — pure Canvas, không cần library. Tải cực nhanh (~5KB), chạy mượt trên mọi máy kể cả máy yếu / mobile cũ.',
      specs: ['ok:~5 KB', 'Click chuột', 'Mobile OK', 'bad:Không VR'],
      cta: '▶️ Chơi 2D',
    },
    {
      id: 'quiz', icon: '🧠', label: 'Quiz MCQ', tech: 'HTML + JS · Quiz',
      url: '/sac-ky-quiz',
      desc: '10 câu hỏi MCQ về quy trình, công thức Rf, ứng dụng dược, an toàn. 15s/câu, streak bonus. Phù hợp ôn lý thuyết — không cần 3D.',
      specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết', 'ok:Ai cũng chơi'],
      cta: '🧠 Bắt đầu Quiz',
    },
    {
      id: 'meta', icon: '🌐', label: 'Metaverse', tech: 'Three.js + WebSocket · Multiplayer',
      url: '/sac-ky-meta',
      desc: 'Phòng lab 3D realtime multiplayer — thấy avatar người khác cùng làm thí nghiệm, chat & xem tiến độ. Mỗi SV có bàn lab riêng nhưng cùng không gian.',
      specs: ['ok:Multiplayer', '~200 KB', 'ok:Chat & avatar', 'Desktop · Mobile'],
      cta: '🌐 Vào phòng',
    },
    {
      id: 'unity', icon: '📦', label: 'Unity native', tech: 'Unity · Meta XR SDK · Quest APK',
      url: 'https://github.com/minhquang2k4/VR-Sac-Ky',
      status: 'external',
      desc: 'Phiên bản app native chạy trên Meta Quest — đồ hoạ tốt nhất, hand-tracking chuẩn Meta XR SDK, vật lý PhysX. Cần build từ source Unity.',
      specs: ['~50 MB APK', 'ok:VR chất lượng cao nhất', 'bad:Chỉ Meta Quest', 'Cần Unity build'],
      cta: '📦 Repo & hướng dẫn build',
    },
  ],
};
