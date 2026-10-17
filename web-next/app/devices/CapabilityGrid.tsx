'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type CapItem = { key: string; ok: boolean; label: string; desc: string; warn?: boolean };

// Cùng logic dò capability như trang gốc devices.html (client-side, đọc API trình duyệt).
async function detect(): Promise<CapItem[]> {
  const caps: Record<string, boolean> = {};
  caps.touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  caps.webgl = !!document.createElement('canvas').getContext('webgl');
  caps.webaudio = !!(
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext
  );
  caps.webspeech =
    'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  caps.getUserMedia = !!navigator.mediaDevices?.getUserMedia;
  caps.https =
    location.protocol === 'https:' ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';
  // WebXR
  const xr = (navigator as unknown as { xr?: { isSessionSupported: (m: string) => Promise<boolean> } }).xr;
  caps.xrVR = false;
  caps.xrAR = false;
  if (xr) {
    try { caps.xrVR = await xr.isSessionSupported('immersive-vr'); } catch {}
    try { caps.xrAR = await xr.isSessionSupported('immersive-ar'); } catch {}
  }

  return [
    { key: 'touch',        ok: caps.touch,        label: '👆 Cảm ứng',    desc: caps.touch ? 'Có' : 'Không (chuột)' },
    { key: 'getUserMedia', ok: caps.getUserMedia, label: '📷 Camera',     desc: caps.getUserMedia ? 'API có' : 'Không' },
    { key: 'webgl',        ok: caps.webgl,        label: '🎨 WebGL',      desc: caps.webgl ? 'Có (3D OK)' : 'Không' },
    { key: 'xrVR',         ok: caps.xrVR,         label: '🥽 WebXR VR',   desc: caps.xrVR ? 'Hỗ trợ ✓' : 'Không' },
    { key: 'xrAR',         ok: caps.xrAR,         label: '📲 WebXR AR',   desc: caps.xrAR ? 'Hỗ trợ ✓' : 'Không' },
    { key: 'webaudio',     ok: caps.webaudio,     label: '🔊 WebAudio',   desc: caps.webaudio ? 'SFX OK' : 'Im lặng' },
    { key: 'webspeech',    ok: caps.webspeech,    label: '🎤 Speech API', desc: caps.webspeech ? 'Có' : 'Không' },
    { key: 'https',        ok: caps.https,        label: '🔒 HTTPS',      desc: caps.https ? 'Bảo mật ✓' : 'HTTP (webcam có thể chặn)', warn: !caps.https },
  ];
}

export function CapabilityGrid() {
  const [items, setItems] = useState<CapItem[] | null>(null);

  useEffect(() => {
    detect().then(setItems);
  }, []);

  if (!items) {
    return <div className="text-sm text-white/70">đang dò...</div>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2.5">
      {items.map((i) => (
        <div
          key={i.key}
          className={cn(
            'rounded-[10px] border-l-4 px-3.5 py-3',
            i.warn
              ? 'border-l-[#f59e0b] bg-[rgba(245,158,11,0.1)]'
              : i.ok
                ? 'border-l-[#10b981] bg-[rgba(16,185,129,0.1)]'
                : 'border-l-[#475569] bg-black/25',
          )}
        >
          <div className="mb-1 text-xs uppercase tracking-[0.4px] text-white/70">{i.label}</div>
          <div className="text-[15px] font-bold">{i.desc}</div>
        </div>
      ))}
    </div>
  );
}
