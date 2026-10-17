import { ImageResponse } from 'next/og';

// Ảnh chia sẻ mặc định cho toàn site, sinh động bằng next/og.
// Vì sao không dùng /og-default.svg như trước: Facebook, Zalo và Twitter KHÔNG
// render og:image định dạng SVG → link Tizia chia sẻ ra mạng xã hội hiện ô trắng.
// ImageResponse trả PNG 1200×630 đúng chuẩn.
export const runtime = 'nodejs';
export const alt = 'Tizia — Vũ trụ giáo dục ảo 3D · VR · AI cho học sinh Việt Nam';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b1020 0%, #14204a 55%, #2a1a4d 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 24,
              background: '#fbbf24',
              color: '#0b1020',
              fontSize: 52,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            T
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, letterSpacing: -1 }}>Tizia</div>
        </div>

        <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.2, maxWidth: 960 }}>
          Vũ trụ giáo dục ảo 3D · VR · AI
        </div>

        <div style={{ fontSize: 32, color: '#c7d2fe', marginTop: 24, maxWidth: 960, lineHeight: 1.4 }}>
          Trường Dược, Công nghệ thông tin, Kinh tế và phổ thông theo GDPT 2018 — học bằng mô phỏng
          tương tác, có gia sư AI.
        </div>

        <div style={{ display: 'flex', marginTop: 44, fontSize: 28, color: '#fbbf24', fontWeight: 600 }}>
          tizia.vn
        </div>
      </div>
    ),
    size,
  );
}
