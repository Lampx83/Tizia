import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import VoiceDemo from './VoiceDemo';

export const metadata: Metadata = pageMeta({
  title: 'Spatial VoIP Demo',
  description:
    'Demo VoIP không gian: mở 2+ tab cùng mã phòng, kéo chấm lại gần nhau để nghe rõ dần, ra xa 12m thì tắt. Push-to-talk.',
  path: '/voice-demo',
});

// Server Component: khung SEO tĩnh. Phần tương tác (WebRTC mesh, kéo chấm, push-
// to-talk, render peer) nằm trong VoiceDemo ('use client'). Engine WebRTC KHÔNG
// nhân bản sang code Next — import động runtime module gốc /js/spatial-voice.js
// (Next fallback-proxy phục vụ). Không có content/DB: tên & vị trí peer đến từ
// signaling WebSocket /ws-orchestrate, không phải catalog.
export default function VoiceDemoPage() {
  return <VoiceDemo />;
}
