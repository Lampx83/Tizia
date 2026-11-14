import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { SAC_KY } from './topic-data';
import TopicCard from './TopicCard';

export const metadata: Metadata = pageMeta({
  title: 'Hub Sắc ký TLC',
  description:
    'Mô phỏng thí nghiệm Sắc ký lớp mỏng (TLC) trong nhiều phiên bản công nghệ — từ Canvas 2D nhẹ trên mobile đến VR thật trên Meta Quest và phòng lab Metaverse multiplayer.',
  path: '/sac-ky-vr',
});

// Hub tĩnh TLC — Server Component: hero + intro + bảng so sánh (SSR, SEO).
// Phần tương tác (đổi mode) tách sang Client Component <TopicCard />.
// Trang gốc public/sac-ky-vr.html có thương hiệu riêng (nền gradient tím/violet,
// chữ hero gradient) → dùng scoped CSS lồng trong .sacky-scope, không đụng theme tối chung.

export default function SacKyVrPage() {
  return (
    <div className="sacky-scope">
      <style>{scopedCss}</style>

      <a className="sk-back" href="/">← Quay lại Tizia</a>

      <div className="sk-hero">
        <div className="sk-logo">🧪</div>
        <h1>Hub Sắc ký</h1>
        <p className="sk-tagline">
          Mô phỏng thí nghiệm <b>Sắc ký lớp mỏng (TLC)</b> trong nhiều phiên bản công nghệ —
          từ Canvas 2D nhẹ tênh trên mobile đến VR thật trên Meta Quest và phòng lab{' '}
          <b>Metaverse multiplayer</b>. Chọn phiên bản phù hợp với thiết bị của bạn.
        </p>
        <div className="sk-pills">
          <span className="sk-pill">📱 Mobile · Desktop · VR / XR</span>
          <span className="sk-pill">🌐 Có multiplayer</span>
          <span className="sk-pill">🎯 Cùng 6 bước TLC</span>
          <span className="sk-pill">🎮 6 phiên bản gộp 1 card</span>
        </div>
      </div>

      <div className="sk-intro-card">
        <h2>📖 Về kỹ thuật Sắc ký lớp mỏng</h2>
        <p>
          <b>Sắc ký lớp mỏng (Thin Layer Chromatography — TLC)</b> là kỹ thuật phân tích cốt lõi
          trong kiểm nghiệm dược phẩm: dùng để định tính, kiểm tra độ tinh khiết của thuốc,
          theo dõi phản ứng tổng hợp hoạt chất.
        </p>
        <p>
          Quy trình 6 bước: <b>(1)</b> chuẩn bị bản mỏng silica gel →{' '}
          <b>(2)</b> chấm mẫu lên đường gốc → <b>(3)</b> pha pha động → <b>(4)</b> triển khai
          trong bình kín → <b>(5)</b> lấy bản, đánh dấu front → <b>(6)</b> soi UV, đo R<sub>f</sub>.
        </p>
      </div>

      <div className="sk-section-title">
        <h2>🎮 Chọn phiên bản</h2>
        <span className="sk-hint">Tất cả 6 phiên bản gộp trong 1 card — chọn chip để đổi chế độ</span>
      </div>

      <TopicCard topic={SAC_KY} />

      <footer className="sk-footer">
        <Link href="/" className="sk-footer-link">Tizia</Link>
      </footer>
    </div>
  );
}

const scopedCss = `
.sacky-scope {
  --sk-accent: #a78bfa;
  --sk-card: rgba(255,255,255,0.06);
  --sk-border: rgba(255,255,255,0.12);
  color: #fff;
  position: relative;
  margin: -1rem -1rem 0;
  padding: 32px 20px 60px;
  min-height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.30), transparent),
    radial-gradient(ellipse 60% 50% at 80% 30%, rgba(14,165,233,0.18), transparent),
    radial-gradient(ellipse 80% 50% at 0% 80%, rgba(167,139,250,0.20), transparent),
    linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #312e81 100%);
}
.sacky-scope > * { max-width: 1200px; margin-left: auto; margin-right: auto; }

.sk-back { display: inline-flex; align-items: center; gap: 6px; opacity: 0.75; text-decoration: none; color: #fff; font-size: 13px; margin-bottom: 18px; }
.sk-back:hover { opacity: 1; }

.sk-hero { text-align: center; margin-bottom: 36px; }
.sk-logo { font-size: 72px; line-height: 1; margin-bottom: 12px; filter: drop-shadow(0 8px 16px rgba(167,139,250,0.5)); }
.sk-hero h1 {
  font-size: 48px; margin: 0 0 8px; font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #ec4899 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  letter-spacing: -1px;
}
.sk-tagline { font-size: 17px; opacity: 0.85; max-width: 720px; margin: 0 auto 16px; line-height: 1.55; }
.sk-pills { display: inline-flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.sk-pill { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 20px; font-size: 12px; }

.sk-intro-card { background: var(--sk-card); border: 1px solid var(--sk-border); border-radius: 16px; padding: 22px 24px; margin-bottom: 28px; backdrop-filter: blur(10px); }
.sk-intro-card h2 { margin: 0 0 10px; font-size: 20px; }
.sk-intro-card p { line-height: 1.6; opacity: 0.9; margin: 6px 0; }

.sk-section-title { margin: 30px auto 14px; display: flex; align-items: baseline; gap: 12px; }
.sk-section-title h2 { margin: 0; font-size: 22px; font-weight: 700; }
.sk-hint { opacity: 0.6; font-size: 13px; }

.sk-footer { margin: 40px auto 0; opacity: 0.6; font-size: 12px; text-align: center; line-height: 1.7; }
.sk-footer-link { color: #fff; text-decoration: none; }
.sk-footer-link:hover { text-decoration: underline; }

/* ── Card gộp phiên bản (port từ topic-modes.js) ── */
.tm-card {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px; padding: 22px 24px 24px; backdrop-filter: blur(10px);
  position: relative; overflow: hidden; margin: 0 auto;
}
.tm-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--tm-accent, #fbbf24); }
.tm-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 18px; }
.tm-icon { font-size: 38px; line-height: 1; flex-shrink: 0; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3)); }
.tm-titles { flex: 1; min-width: 0; }
.tm-title { margin: 0 0 4px; font-size: 22px; font-weight: 800; color: #fff; }
.tm-sub { margin: 0; font-size: 13.5px; opacity: 0.78; line-height: 1.5; }

.tm-chips-label { font-size: 11px; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.7px; font-weight: 700; margin-bottom: 10px; }
.tm-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.tm-chip {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px;
  background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12);
  color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: inherit;
}
.tm-chip:hover:not(.active) { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25); }
.tm-chip.active { background: var(--tm-accent, #fbbf24); color: #1f1147; border-color: var(--tm-accent, #fbbf24); box-shadow: 0 4px 14px rgba(0,0,0,0.3); }
.tm-chip.soon { opacity: 0.7; }
.tm-chip-icon { font-size: 15px; }
.tm-chip-soon { font-size: 9px; padding: 1px 6px; border-radius: 6px; background: rgba(0,0,0,0.25); color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700; margin-left: 2px; }
.tm-chip.active .tm-chip-soon { background: rgba(0,0,0,0.4); color: #fff; }

.tm-body { background: rgba(0,0,0,0.18); border-radius: 12px; padding: 16px 18px; }
.tm-tech { font-size: 11px; color: var(--tm-accent, #fbbf24); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.tm-badge { font-size: 9px; padding: 2px 7px; border-radius: 6px; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700; }
.tm-badge-soon { background: rgba(255,255,255,0.12); }
.tm-badge-ext { background: rgba(99,102,241,0.25); color: #c7d2fe; }

.tm-desc { line-height: 1.55; opacity: 0.92; margin: 6px 0 12px; font-size: 14px; color: #fff; }
.tm-specs { display: flex; gap: 6px; flex-wrap: wrap; font-size: 11px; margin-bottom: 14px; }
.tm-spec { padding: 3px 9px; border-radius: 8px; background: rgba(255,255,255,0.08); color: #fff; }
.tm-spec.ok { background: rgba(16,185,129,0.22); }
.tm-spec.bad { background: rgba(239,68,68,0.22); }

.tm-btn { display: inline-block; padding: 12px 22px; border-radius: 11px; background: var(--tm-accent, #fbbf24); color: #1f1147; text-decoration: none; font-weight: 700; font-size: 15px; text-align: center; transition: filter 0.15s, transform 0.15s; }
.tm-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.tm-btn.disabled { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.5); cursor: not-allowed; pointer-events: none; }
`;
