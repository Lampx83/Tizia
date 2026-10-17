import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { SAP_XEP } from './topic-data';
import TopicCard from './TopicCard';
import LevelGrid from './LevelGrid';

export const metadata: Metadata = pageMeta({
  title: 'Hub Sắp xếp thuốc',
  description:
    'Mô phỏng phân loại thuốc theo nhóm điều trị (ATC classification) trong nhiều phiên bản công nghệ — từ Canvas 2D arcade nhẹ trên mobile đến WebXR hand tracking trên Meta Quest và phòng dược Metaverse multiplayer. 16 thuốc thông dụng · 10 cấp độ.',
  path: '/sap-xep-hub',
});

// Hub tĩnh "Sắp xếp thuốc" — Server Component: hero + intro (SSR, SEO).
// Phần tương tác tách sang Client Component: <LevelGrid /> (lưới cấp độ + tiến độ
// localStorage) và <TopicCard /> (đổi mode). Trang gốc public/sap-xep-hub.html có
// thương hiệu riêng (nền gradient amber/xanh/tím, chữ hero gradient) → dùng scoped CSS
// lồng trong .sapxep-scope, không đụng theme tối chung.

export default function SapXepHubPage() {
  return (
    <div className="sapxep-scope">
      <style>{scopedCss}</style>

      <a className="sx-back" href="/">← Quay lại Tizia</a>

      <div className="sx-hero">
        <div className="sx-logo">💊</div>
        <h1>Hub Sắp xếp thuốc</h1>
        <p className="sx-tagline">
          Mô phỏng <b>phân loại thuốc theo nhóm điều trị</b> trong nhiều phiên bản công nghệ —
          từ Canvas 2D arcade nhẹ trên mobile đến <b>WebXR hand tracking</b> trên Meta Quest
          và phòng dược <b>Metaverse multiplayer</b>. 16 thuốc thông dụng · 10 cấp độ.
        </p>
        <div className="sx-pills">
          <span className="sx-pill">📱 Mobile · Desktop · VR / XR</span>
          <span className="sx-pill">🌐 Có multiplayer</span>
          <span className="sx-pill">🎯 10 cấp độ · 16 thuốc</span>
          <span className="sx-pill">🎮 8 phiên bản gộp 1 card</span>
        </div>
      </div>

      <div className="sx-intro-card">
        <h2>📖 Về kỹ năng sắp xếp thuốc theo nhóm điều trị</h2>
        <p>
          <b>Sắp xếp thuốc theo nhóm điều trị (ATC classification)</b> là kỹ năng cốt lõi trong
          thực hành nhà thuốc: giúp dược sĩ tư vấn, tra cứu, cấp phát thuốc nhanh và đúng,
          tránh nhầm lẫn giữa các hoạt chất cùng nhóm.
        </p>
        <p>
          Quy trình: nhận thuốc → xác định <b>nhóm điều trị</b> (Kháng sinh, Tim mạch, Tiêu hoá,
          Giảm đau, Vitamin, Chống dị ứng, Hô hấp, Dạ dày, Tiểu đường, Mỡ máu, Huyết áp,
          Tâm thần, Tuyến giáp, Chống viêm) → xếp vào đúng kệ.
        </p>
      </div>

      <LevelGrid />

      <div className="sx-section-title">
        <h2>🎮 Chọn phiên bản</h2>
        <span className="sx-hint">Tất cả 8 phiên bản gộp trong 1 card — chọn chip để đổi chế độ</span>
      </div>

      <TopicCard topic={SAP_XEP} />
    </div>
  );
}

const scopedCss = `
.sapxep-scope {
  --sx-accent: #fbbf24;
  --sx-card: rgba(255,255,255,0.06);
  --sx-border: rgba(255,255,255,0.12);
  color: #fff;
  position: relative;
  margin: -1rem -1rem 0;
  padding: 32px 20px 60px;
  min-height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(251,191,36,0.20), transparent),
    radial-gradient(ellipse 60% 50% at 80% 30%, rgba(14,165,233,0.18), transparent),
    radial-gradient(ellipse 80% 50% at 0% 80%, rgba(139,92,246,0.18), transparent),
    linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #1e3a8a 100%);
}
.sapxep-scope > * { max-width: 1200px; margin-left: auto; margin-right: auto; }

.sx-back { display: inline-flex; align-items: center; gap: 6px; opacity: 0.75; text-decoration: none; color: #fff; font-size: 13px; margin-bottom: 18px; }
.sx-back:hover { opacity: 1; }

.sx-hero { text-align: center; margin-bottom: 36px; }
.sx-logo { font-size: 72px; line-height: 1; margin-bottom: 12px; filter: drop-shadow(0 8px 16px rgba(251,191,36,0.5)); }
.sx-hero h1 {
  font-size: 48px; margin: 0 0 8px; font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #f97316 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  letter-spacing: -1px;
}
.sx-tagline { font-size: 17px; opacity: 0.85; max-width: 720px; margin: 0 auto 16px; line-height: 1.55; }
.sx-pills { display: inline-flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.sx-pill { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 20px; font-size: 12px; }

.sx-intro-card { background: var(--sx-card); border: 1px solid var(--sx-border); border-radius: 16px; padding: 22px 24px; margin-bottom: 28px; backdrop-filter: blur(10px); }
.sx-intro-card h2 { margin: 0 0 10px; font-size: 20px; }
.sx-intro-card p { line-height: 1.6; opacity: 0.9; margin: 6px 0; }

.sx-section-title { margin: 30px auto 14px; display: flex; align-items: baseline; gap: 12px; }
.sx-section-title h2 { margin: 0; font-size: 22px; font-weight: 700; }
.sx-hint { opacity: 0.6; font-size: 13px; }
.sx-actions { margin-left: auto; }
.sx-reset { font-size: 12px; color: var(--sx-accent); text-decoration: none; background: none; border: none; cursor: pointer; font-family: inherit; padding: 0; }
.sx-reset:hover { text-decoration: underline; }

/* ── Lưới cấp độ (port từ .levels/.lvl) ── */
.sx-levels {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
  background: var(--sx-card); border: 1px solid var(--sx-border);
  border-radius: 16px; padding: 16px; backdrop-filter: blur(10px);
  margin: 0 auto 8px;
}
@media (min-width: 600px) { .sx-levels { grid-template-columns: repeat(5, 1fr); } }
@media (min-width: 1024px) { .sx-levels { grid-template-columns: repeat(10, 1fr); } }
.sx-lvl {
  position: relative; aspect-ratio: 1; min-height: 80px;
  background: rgba(255,255,255,0.04); border: 2px solid var(--sx-border);
  border-radius: 12px; padding: 8px; color: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: all 0.2s; overflow: hidden; cursor: pointer; font-family: inherit;
}
.sx-lvl:hover:not(.locked) { transform: translateY(-2px); border-color: var(--sx-accent); background: rgba(251,191,36,0.08); }
.sx-lvl.locked { opacity: 0.4; cursor: not-allowed; }
.sx-lvl.locked::after { content: '🔒'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 24px; opacity: 0.5; }
.sx-lvl .sx-num { font-size: 22px; font-weight: 800; line-height: 1; }
.sx-lvl .sx-name { font-size: 9px; opacity: 0.7; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.sx-lvl .sx-stars { font-size: 11px; letter-spacing: 1px; margin-top: 3px; }
.sx-lvl .sx-stars .filled { color: var(--sx-accent); }
.sx-lvl .sx-stars .empty { color: rgba(255,255,255,0.2); }
.sx-lvl.current { border-color: var(--sx-accent); box-shadow: 0 0 0 2px rgba(251,191,36,0.4); }
.sx-lvl .sx-badge-new { position: absolute; top: 3px; right: 5px; background: var(--sx-accent); color: #3e2723; font-size: 9px; padding: 1px 5px; border-radius: 4px; font-weight: 700; }

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
