import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { BAO_CHE, RECIPES } from './topic-data';
import TopicCard from './TopicCard';

export const metadata: Metadata = pageMeta({
  title: 'Hub Bào chế GMP',
  description:
    'Mô phỏng pha chế thuốc theo đơn trong nhiều phiên bản công nghệ — cân hoạt chất, đong dung môi, q.s. nước cất, đóng chai. 8 đơn từ Siro Paracetamol đến nhỏ mắt NaCl, 2 tay phối hợp qua MediaPipe để rót ổn định hơn.',
  path: '/bao-che-hub',
});

// Hub tĩnh "Bào chế GMP" — Server Component: hero + intro + thư mục 8 đơn (SSR, SEO).
// Phần tương tác (đổi mode) tách sang Client Component <TopicCard />. Trang gốc
// public/bao-che-hub.html có thương hiệu riêng (nền gradient teal/xanh/xanh-lá, chữ hero
// gradient) → dùng scoped CSS lồng trong .baoche-scope, không đụng theme tối chung.

export default function BaoCheHubPage() {
  return (
    <div className="baoche-scope">
      <style>{scopedCss}</style>

      <a className="bc-back" href="/">← Quay lại Tizia</a>

      <div className="bc-hero">
        <div className="bc-logo">🧪</div>
        <h1>Hub Bào chế GMP</h1>
        <p className="bc-tagline">
          Mô phỏng <b>pha chế thuốc theo đơn</b> trong nhiều phiên bản công nghệ — cân hoạt chất,
          đong dung môi, q.s. nước cất, đóng chai. 8 đơn từ Siro Paracetamol đến nhỏ mắt NaCl,
          <b>2 tay phối hợp</b> qua MediaPipe để rót ổn định hơn.
        </p>
        <div className="bc-pills">
          <span className="bc-pill">📱 Mobile · Desktop · VR / XR</span>
          <span className="bc-pill">🤲 2 tay MediaPipe</span>
          <span className="bc-pill">🎯 8 đơn · Free-form</span>
          <span className="bc-pill">🎮 8 phiên bản gộp 1 card</span>
        </div>
      </div>

      <div className="bc-intro-card">
        <h2>📖 Về kỹ năng bào chế GMP</h2>
        <p>
          <b>Bào chế thuốc theo đơn (Pharmaceutical compounding)</b> là kỹ năng nền tảng trong
          đào tạo dược sĩ: yêu cầu chính xác về định lượng, đúng quy trình, an toàn vô khuẩn —
          tuân thủ <b>GMP (Good Manufacturing Practice)</b>.
        </p>
        <p>
          Quy trình chuẩn: <b>(1)</b> đọc đơn, chuẩn bị dụng cụ → <b>(2)</b> cân hoạt chất trên cân điện tử →{' '}
          <b>(3)</b> đong dung môi qua ống đong → <b>(4)</b> hoà tan, khuấy đều →{' '}
          <b>(5)</b> q.s. dung môi đến vạch → <b>(6)</b> đóng chai, dán nhãn.
        </p>
      </div>

      <div className="bc-section-title">
        <h2>🎯 Chọn đơn pha chế (8 đơn)</h2>
        <span className="bc-hint">Từ Siro Paracetamol đến Nhỏ mắt NaCl 0.9%</span>
      </div>

      <div className="bc-recipes">
        {RECIPES.map((r) => (
          <a key={r.slug} className="bc-recipe" href={`/compounding-lab?recipe=${r.slug}`}>
            <div className="bc-recipe-icon">{r.icon}</div>
            <div className="bc-lvl-num">{r.order}</div>
            <div className="bc-rname">{r.name}</div>
          </a>
        ))}
      </div>

      <div className="bc-section-title">
        <h2>🎮 Chọn phiên bản</h2>
        <span className="bc-hint">Tất cả 8 phiên bản gộp trong 1 card — chọn chip để đổi chế độ</span>
      </div>

      <TopicCard topic={BAO_CHE} />
    </div>
  );
}

const scopedCss = `
.baoche-scope {
  --bc-accent: #14b8a6;
  --bc-card: rgba(255,255,255,0.06);
  --bc-border: rgba(255,255,255,0.12);
  color: #fff;
  position: relative;
  margin: -1rem -1rem 0;
  padding: 32px 20px 60px;
  min-height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,184,166,0.25), transparent),
    radial-gradient(ellipse 60% 50% at 80% 30%, rgba(14,165,233,0.18), transparent),
    radial-gradient(ellipse 80% 50% at 0% 80%, rgba(34,197,94,0.18), transparent),
    linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #134e4a 100%);
}
.baoche-scope > * { max-width: 1200px; margin-left: auto; margin-right: auto; }

.bc-back { display: inline-flex; align-items: center; gap: 6px; opacity: 0.75; text-decoration: none; color: #fff; font-size: 13px; margin-bottom: 18px; }
.bc-back:hover { opacity: 1; }

.bc-hero { text-align: center; margin-bottom: 36px; }
.bc-logo { font-size: 72px; line-height: 1; margin-bottom: 12px; filter: drop-shadow(0 8px 16px rgba(20,184,166,0.5)); }
.bc-hero h1 {
  font-size: 48px; margin: 0 0 8px; font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #14b8a6 50%, #22c55e 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  letter-spacing: -1px;
}
.bc-tagline { font-size: 17px; opacity: 0.85; max-width: 720px; margin: 0 auto 16px; line-height: 1.55; }
.bc-pills { display: inline-flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.bc-pill { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 20px; font-size: 12px; }

.bc-intro-card { background: var(--bc-card); border: 1px solid var(--bc-border); border-radius: 16px; padding: 22px 24px; margin-bottom: 28px; backdrop-filter: blur(10px); }
.bc-intro-card h2 { margin: 0 0 10px; font-size: 20px; }
.bc-intro-card p { line-height: 1.6; opacity: 0.9; margin: 6px 0; }

.bc-section-title { margin: 30px auto 14px; display: flex; align-items: baseline; gap: 12px; }
.bc-section-title h2 { margin: 0; font-size: 22px; font-weight: 700; }
.bc-hint { opacity: 0.6; font-size: 13px; }

/* ── Thư mục 8 đơn (port từ .recipes/.recipe) ── */
.bc-recipes {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
  background: var(--bc-card); border: 1px solid var(--bc-border);
  border-radius: 16px; padding: 16px; backdrop-filter: blur(10px);
  margin: 0 auto;
}
@media (min-width: 600px) { .bc-recipes { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1024px) { .bc-recipes { grid-template-columns: repeat(8, 1fr); } }
.bc-recipe {
  position: relative; aspect-ratio: 1; min-height: 80px;
  background: rgba(255,255,255,0.04); border: 2px solid var(--bc-border);
  border-radius: 12px; padding: 8px; text-decoration: none; color: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: all 0.2s; overflow: hidden; cursor: pointer;
}
.bc-recipe:hover { transform: translateY(-2px); border-color: var(--bc-accent); background: rgba(20,184,166,0.10); }
.bc-recipe-icon { font-size: 26px; line-height: 1; }
.bc-lvl-num { font-size: 11px; opacity: 0.6; margin-top: 2px; font-weight: 700; }
.bc-rname { font-size: 9px; opacity: 0.85; margin-top: 3px; text-align: center; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ── Card gộp phiên bản (port từ topic-modes.js) ── */
.tm-card {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px; padding: 22px 24px 24px; backdrop-filter: blur(10px);
  position: relative; overflow: hidden; margin: 0 auto;
}
.tm-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--tm-accent, #14b8a6); }
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
.tm-chip.active { background: var(--tm-accent, #14b8a6); color: #07221f; border-color: var(--tm-accent, #14b8a6); box-shadow: 0 4px 14px rgba(0,0,0,0.3); }
.tm-chip.soon { opacity: 0.7; }
.tm-chip-icon { font-size: 15px; }
.tm-chip-soon { font-size: 9px; padding: 1px 6px; border-radius: 6px; background: rgba(0,0,0,0.25); color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700; margin-left: 2px; }
.tm-chip.active .tm-chip-soon { background: rgba(0,0,0,0.4); color: #fff; }

.tm-body { background: rgba(0,0,0,0.18); border-radius: 12px; padding: 16px 18px; }
.tm-tech { font-size: 11px; color: var(--tm-accent, #14b8a6); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.tm-badge { font-size: 9px; padding: 2px 7px; border-radius: 6px; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700; }
.tm-badge-soon { background: rgba(255,255,255,0.12); }
.tm-badge-ext { background: rgba(99,102,241,0.25); color: #c7d2fe; }

.tm-desc { line-height: 1.55; opacity: 0.92; margin: 6px 0 12px; font-size: 14px; color: #fff; }
.tm-specs { display: flex; gap: 6px; flex-wrap: wrap; font-size: 11px; margin-bottom: 14px; }
.tm-spec { padding: 3px 9px; border-radius: 8px; background: rgba(255,255,255,0.08); color: #fff; }
.tm-spec.ok { background: rgba(16,185,129,0.22); }
.tm-spec.bad { background: rgba(239,68,68,0.22); }

.tm-btn { display: inline-block; padding: 12px 22px; border-radius: 11px; background: var(--tm-accent, #14b8a6); color: #07221f; text-decoration: none; font-weight: 700; font-size: 15px; text-align: center; transition: filter 0.15s, transform 0.15s; }
.tm-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.tm-btn.disabled { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.5); cursor: not-allowed; pointer-events: none; }
`;
