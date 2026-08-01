// Màn hình giới thiệu "Pharmacomm" (CBS 20/07 #1) — hiện TRƯỚC khi vào nhà thuốc 3D.
// Giới thiệu phần mềm + mục tiêu học tập + DANH SÁCH TÌNH HUỐNG (thẻ). Người học bấm
// 1 thẻ → onPick(id) → startSimulation({ moduleId:id }).
//
// Self-contained: tự chèn <style> (dùng biến theme --card/--text… có sẵn ở cả trang
// Express lẫn Next, kèm màu dự phòng) nên KHÔNG phải sửa CSS ở 2 nơi. Dùng chung cho
// public/nha-thuoc-3d.html (Express) và web-next (Next) — 1 nguồn duy nhất.
import { SCENARIO_CARDS, SCENARIOS } from './scenarios.js?v=ph0801';

const LEARNING_GOALS = [
  ['💬', 'Giao tiếp', 'Chào hỏi, tạo kết nối, giao tiếp trực diện với người bệnh'],
  ['🔎', 'Khai thác thông tin', 'Hỏi đúng trọng tâm về triệu chứng, tiền sử, thuốc đang dùng'],
  ['💊', 'Tư vấn dùng thuốc hợp lý', 'Chọn thuốc phù hợp, hướng dẫn cách dùng, dán nhãn HDSD'],
  ['🧾', 'Kỹ năng bán thuốc GPP', 'Ra lẻ, đóng gói, xuất hóa đơn, dặn dò theo dõi']
];

function injectStyle() {
  if (document.getElementById('pharmacomm-intro-style')) return;
  const st = document.createElement('style');
  st.id = 'pharmacomm-intro-style';
  st.textContent = `
  .pc-intro { position: fixed; inset: 0; z-index: 3000; overflow: auto;
    background: var(--bg, #0f172a);
    background-image: radial-gradient(1200px 600px at 80% -10%, rgba(56,189,248,0.18), transparent 60%),
                      radial-gradient(1000px 500px at -10% 110%, rgba(13,148,136,0.16), transparent 60%);
    color: var(--text, #e2e8f0); font-family: 'Inter', system-ui, sans-serif;
    display: flex; align-items: flex-start; justify-content: center; padding: 32px 20px; }
  .pc-wrap { width: min(1080px, 100%); }
  .pc-brand { display: flex; align-items: center; gap: 14px; }
  .pc-logo { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; font-size: 28px;
    background: linear-gradient(135deg, var(--accent, #38bdf8), var(--accent-2, #0d9488)); color: #04121a; box-shadow: 0 8px 24px rgba(56,189,248,0.35); }
  .pc-title { margin: 0; font-size: 30px; font-weight: 800; letter-spacing: .2px; }
  .pc-title span { background: linear-gradient(90deg, var(--accent, #38bdf8), var(--green, #22c55e)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .pc-sub { margin: 3px 0 0; color: var(--muted, #94a3b8); font-size: 14px; }
  .pc-goals { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 22px 0 6px; }
  .pc-goal { background: var(--card, #111827); border: 1px solid var(--border, #334155); border-radius: 12px; padding: 12px 14px; }
  .pc-goal-h { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; }
  .pc-goal-d { margin: 6px 0 0; color: var(--muted, #94a3b8); font-size: 12.5px; line-height: 1.5; }
  .pc-sec { margin: 26px 0 12px; font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .pc-sec small { color: var(--muted, #94a3b8); font-weight: 500; font-size: 12.5px; }
  .pc-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
  .pc-card { text-align: left; cursor: pointer; background: var(--card, #111827); border: 1px solid var(--border, #334155);
    border-radius: 16px; padding: 16px; color: inherit; font: inherit; display: flex; flex-direction: column; gap: 10px;
    transition: transform .12s ease, border-color .12s ease, box-shadow .12s ease; }
  .pc-card:hover, .pc-card:focus-visible { transform: translateY(-3px); border-color: var(--accent, #38bdf8);
    box-shadow: 0 12px 30px rgba(0,0,0,0.35); outline: none; }
  .pc-card-top { display: flex; align-items: center; gap: 10px; }
  .pc-card-ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; font-size: 24px; background: var(--card-h, #1e293b); flex: none; }
  .pc-card-code { font-weight: 800; font-size: 15px; }
  .pc-card-tag { font-size: 11px; color: var(--muted, #94a3b8); background: var(--card-h, #1e293b); border: 1px solid var(--border, #334155); padding: 1px 8px; border-radius: 999px; }
  .pc-card-title { font-weight: 700; font-size: 14.5px; line-height: 1.4; }
  .pc-card-desc { color: var(--muted, #94a3b8); font-size: 12.5px; line-height: 1.55; }
  .pc-card-go { margin-top: auto; align-self: flex-start; font-size: 12.5px; font-weight: 700; color: var(--accent, #38bdf8); }
  .pc-card:hover .pc-card-go { text-decoration: underline; }
  .pc-foot { margin: 22px 0 8px; color: var(--muted, #94a3b8); font-size: 12px; }
  /* Ô gửi yêu cầu cho Ban điều hành AI (29/07): trang này trước đây KHÔNG có lối
     gửi yêu cầu — FAB gốc bị CSS ẩn, nút thay thế lại chèn vào header cũ nên bản
     Next không có. Đặt hẳn một ô ngay màn giới thiệu cho thầy cô/SV dễ thấy. */
  .pc-ask { margin-top: 26px; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
    background: linear-gradient(135deg, rgba(124,58,237,0.14), rgba(79,70,229,0.10));
    border: 1px solid rgba(124,58,237,0.45); border-radius: 16px; padding: 16px 18px; }
  .pc-ask-ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; font-size: 24px;
    background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; flex: none; }
  .pc-ask-txt { flex: 1 1 260px; }
  .pc-ask-h { font-weight: 700; font-size: 14.5px; }
  .pc-ask-d { color: var(--muted, #94a3b8); font-size: 12.5px; line-height: 1.55; margin-top: 4px; }
  .pc-ask-btn { cursor: pointer; font: inherit; font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap;
    background: linear-gradient(135deg, #7c3aed, #4f46e5); border: 0; border-radius: 10px; padding: 10px 16px;
    transition: transform .12s ease, filter .12s ease; }
  .pc-ask-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
  @media (max-width: 560px) { .pc-title { font-size: 24px; } .pc-intro { padding: 20px 14px; } }
  `;
  document.head.appendChild(st);
}

// showIntro({ moduleId, onPick }) — nếu URL đã chỉ định ?module=<id> hợp lệ thì BỎ QUA
// màn giới thiệu (deep-link vào thẳng tình huống). Ngược lại dựng màn chọn tình huống.
export function showIntro({ moduleId, onPick }) {
  const valid = moduleId && SCENARIOS && SCENARIOS[moduleId];
  const explicit = new URLSearchParams(location.search).has('module');
  if (valid && explicit) { onPick(moduleId); return; }

  injectStyle();
  // Tiêu đề trang: bản Next đặt title chung "Tizia — Vũ trụ giáo dục ảo" nên yêu cầu
  // gửi từ đây không nói được là trang nào. Đặt tên thật để ngữ cảnh kèm theo rõ ràng.
  document.title = 'Pharmacomm — Nhà thuốc GPP 3D · Tizia';
  const cards = (SCENARIO_CARDS && SCENARIO_CARDS.length)
    ? SCENARIO_CARDS
    : Object.values(SCENARIOS || {}).map(s => ({ id: s.id, code: s.code || s.id, tag: s.npcRole || '', icon: '🧪', title: s.title, desc: s.setting }));

  const overlay = document.createElement('div');
  overlay.className = 'pc-intro';
  overlay.innerHTML = `
    <div class="pc-wrap">
      <div class="pc-brand">
        <div class="pc-logo">⚕️</div>
        <div>
          <h1 class="pc-title"><span>Pharmacomm</span></h1>
          <p class="pc-sub">Phần mềm mô phỏng thực hành giao tiếp & bán thuốc tại nhà thuốc GPP</p>
        </div>
      </div>

      <div class="pc-goals">
        ${LEARNING_GOALS.map(([ic, h, d]) => `
          <div class="pc-goal">
            <div class="pc-goal-h">${ic} ${h}</div>
            <p class="pc-goal-d">${d}</p>
          </div>`).join('')}
      </div>

      <div class="pc-sec">🎬 Chọn tình huống mô phỏng <small>· bấm một thẻ để bắt đầu</small></div>
      <div class="pc-cards">
        ${cards.map(c => `
          <button class="pc-card" type="button" data-id="${c.id}">
            <div class="pc-card-top">
              <div class="pc-card-ic">${c.icon || '🧪'}</div>
              <div>
                <div class="pc-card-code">${c.code || c.id}</div>
                ${c.tag ? `<span class="pc-card-tag">${c.tag}</span>` : ''}
              </div>
            </div>
            <div class="pc-card-title">${c.title || ''}</div>
            <div class="pc-card-desc">${c.desc || ''}</div>
            <span class="pc-card-go">Bắt đầu →</span>
          </button>`).join('')}
      </div>

      <div class="pc-ask">
        <div class="pc-ask-ic">🏛️</div>
        <div class="pc-ask-txt">
          <div class="pc-ask-h">Góp ý cho phần mềm này?</div>
          <div class="pc-ask-d">Gửi yêu cầu tới Ban điều hành AI: sửa lời thoại bệnh nhân, thêm tình huống mới, chỉnh thuốc hay báo lỗi. Yêu cầu tự kèm tên trang này để AI biết sửa đúng chỗ; kèm được cả ảnh chụp và file Word.</div>
        </div>
        <button class="pc-ask-btn" type="button" data-ask>✍️ Gửi yêu cầu</button>
      </div>

      <p class="pc-foot">Mẹo: có thể vào thẳng một tình huống bằng địa chỉ <code>?module=&lt;mã&gt;</code>.</p>
    </div>
  `;

  overlay.addEventListener('click', (e) => {
    // Nút gửi yêu cầu: bấm hộ vào FAB gốc (#sgf-fab) — nút đó bị CSS trang này ẩn
    // nhưng vẫn nằm trong DOM và click bằng script vẫn mở đúng modal Ban điều hành AI.
    // KHÔNG đóng màn giới thiệu để người dùng gửi xong còn chọn tình huống tiếp.
    if (e.target.closest('[data-ask]')) {
      const fab = document.getElementById('sgf-fab');
      if (fab) fab.click();
      else alert('Chưa mở được ô gửi yêu cầu. Bạn thử tải lại trang giúp nhé.');
      return;
    }
    const btn = e.target.closest('.pc-card');
    if (!btn) return;
    const id = btn.dataset.id;
    overlay.remove();
    onPick(id);
  });

  document.body.appendChild(overlay);
}
