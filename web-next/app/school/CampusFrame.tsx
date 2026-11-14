'use client';

import { useEffect, useRef, useState } from 'react';

// Khung iframe campus (2.5D iso canvas) — asset legacy vẫn do Express phục vụ,
// truy cập qua đường tuyệt đối /campus-proto/... (Next fallback proxy sang :8041/:8042).
// Port lại hành vi inline <script> của public/school.html:99-134:
//   • src = campus-proto/b-iso-canvas.html?embed=1&domain=<dom>
//   • GA4 school_enter khi vào trang + campus_building_click khi bấm toà nhà
//   • nhận postMessage {type:'campus-enter'} → cuộn xuống khu "Khám phá thêm"
//   • banner cảnh báo khi truy cập qua HTTP IP LAN (webcam bị chặn)

declare global {
  interface Window {
    tiziaTrack?: (event: string, params?: Record<string, unknown>) => void;
  }
}

export default function CampusFrame({ domain }: { domain: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [lanWarning, setLanWarning] = useState<string | null>(null);

  useEffect(() => {
    // Banner nếu không phải secure context (LAN HTTP) — webcam modes won't work.
    if (
      !window.isSecureContext &&
      location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1'
    ) {
      setLanWarning(location.host);
    }

    // GA4: vào trang trường (school_enter là 1 bước trong funnel mặc định).
    try {
      window.tiziaTrack?.('school_enter', { domain });
    } catch {}

    function onMessage(e: MessageEvent) {
      const d = e.data as { type?: string; building?: string; id?: string } | null;
      if (!d || d.type !== 'campus-enter') return;
      // Bấm vào toà nhà trong khuôn viên.
      try {
        window.tiziaTrack?.('campus_building_click', {
          domain,
          building: String(d.building || d.id || '').slice(0, 40),
        });
      } catch {}
      const path = document.getElementById('school-explore-host'); // cuộn xuống khu khám phá thêm
      if (path) path.scrollIntoView({ block: 'start' });
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [domain]);

  return (
    <>
      {lanWarning && (
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto 18px',
            background: 'rgba(251,191,36,0.15)',
            border: '1px solid #fbbf24',
            color: '#fde68a',
            padding: '10px 16px',
            borderRadius: 10,
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          ⚠️ <b>Đang truy cập qua HTTP IP LAN</b> ({lanWarning}). Chrome chặn webcam ngoài
          HTTPS/localhost — các mode webcam tự chuyển sang chuột/touch.
        </div>
      )}
      <div
        ref={wrapRef}
        id="campus-frame-wrap"
        style={{
          position: 'relative',
          width: '100%',
          height: '82vh',
          minHeight: 520,
          // Trang full-width nhưng map giữ tỷ lệ: cap bề ngang ≤ 1.6× chiều cao
          // (khớp tỉ lệ iso ~16:10) rồi căn giữa — tránh bị kéo bẹt trên màn rộng.
          maxWidth: 'calc(82vh * 1.6)',
          margin: '0 auto',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 26px rgba(0,0,0,.28)',
        }}
      >
        <iframe
          id="campus-frame"
          title="Khuôn viên trường"
          loading="lazy"
          src={`/campus-proto/b-iso-canvas.html?embed=1&domain=${encodeURIComponent(domain)}`}
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      </div>
    </>
  );
}
