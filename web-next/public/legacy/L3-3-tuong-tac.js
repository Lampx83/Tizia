// Wrap-mount cho trang Next /L3-3-tuong-tac.
// Tái sử dụng NGUYÊN engine + dữ liệu scenario tĩnh của app vanilla (phục vụ
// qua fallback proxy của Next: /js/* → Express). Logic = bản gốc trong inline
// <script type="module"> của public/L3-3-tuong-tac.html (picker + startScenario
// + showResult). KHÔNG thay đổi hành vi: engine tự POST api/attempts (đường dẫn
// tương đối → /api/attempts → Express).
import { ScenarioEngine } from '/js/engine/index.js';
import { L33_SCENARIOS } from '/js/scenarios/L3.3-tuong-tac-warfarin-clarithromycin.js';
import { getPlayerName, getClassCode } from '/js/api.js';

const picker = document.getElementById('picker');
const app = document.getElementById('app');
if (picker && app) {
  function renderPicker() {
    picker.innerHTML = L33_SCENARIOS.map((s) => `
      <div class="scn-card" data-id="${s.id}">
        <h4>${s.title}</h4>
        <div class="meta">
          <span>🎯 ${s.kind}</span>
          <span>⭐ ${s.difficulty}/5</span>
          ${s.questions ? `<span>${s.questions.length} câu</span>` : ''}
          ${s.correctPairs ? `<span>${s.correctPairs.length} cặp</span>` : ''}
        </div>
      </div>
    `).join('');
    picker.querySelectorAll('.scn-card').forEach((card) => {
      card.addEventListener('click', () => startScenario(card.dataset.id));
    });
    app.innerHTML = '';
  }

  function startScenario(id) {
    picker.innerHTML = '';
    app.innerHTML = '';
    const scenario = L33_SCENARIOS.find((s) => s.id === id);
    if (!scenario) return renderPicker();
    const engine = new ScenarioEngine({
      host: app,
      scenario,
      playerName: getPlayerName() || 'Ẩn danh',
      classCode: getClassCode() || undefined,
      onComplete: showResult,
    });
    engine.start();
  }

  function showResult(result) {
    const stars = '⭐'.repeat(result.stars) + '☆'.repeat(3 - result.stars);
    const poor = result.score < 50;
    const card = document.createElement('div');
    card.className = 'result-card' + (poor ? ' poor' : '');
    card.innerHTML = `
      <div class="result-stars">${stars}</div>
      <div class="result-score">${result.score}/100</div>
      <div style="opacity:0.8;margin-top:6px">Thời gian: ${(result.durationMs / 1000).toFixed(1)}s</div>
      <div class="result-breakdown">
        ${result.rubricBreakdown.map((r) => `
          <div class="result-row ${r.score >= 0.5 ? 'ok' : 'bad'}">
            <b>${r.criterion}</b> — ${r.feedback}
          </div>
        `).join('')}
      </div>
      <button class="back-btn">← Quay lại danh sách bài tập</button>
    `;
    app.appendChild(card);
    card.querySelector('.back-btn').addEventListener('click', renderPicker);
  }

  renderPicker();
}
