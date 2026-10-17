// ============================================================
// ScenarioEngine — Trái tim của 38 module
// ============================================================
// Mỗi module mới chỉ cần khai báo Scenario JSON (xem types.js).
// Engine sẽ:
//   1. Mount UI tương ứng vào host element
//   2. Theo dõi tương tác SV → tính điểm theo rubric
//   3. Gọi AITutor nếu scenario yêu cầu chấm tự luận
//   4. Submit kết quả qua API (api/attempts)
//   5. Trả AssessmentResult về callback onComplete
//
// Cách dùng từ một module bất kỳ:
//
//   import { ScenarioEngine } from './engine/scenario-engine.js';
//   import scenario from './scenarios/L3.3-tuong-tac-01.json' assert {type:'json'};
//
//   const engine = new ScenarioEngine({
//     host: document.getElementById('app'),
//     scenario,
//     onComplete: (result) => console.log(result),
//   });
//   engine.start();
//
// ============================================================

import { getDrug, findInteractions } from './drug-db.js';
import { Assessment } from './assessment.js';
import { getActiveDomainId } from './domain.js';
// Cache-bust ?v=p7: server có Cache-Control max-age=86400, browser cache ES module
// theo URL → khi đổi quiz dispatcher cần bump version để client load module mới.
import { renderQuizPreschool } from './preschool-ui.js?v=p7';
import { renderQuizPrimary } from './primary-ui.js?v=p7';
import { renderQuizSecondary, renderQuizHighschool } from './secondary-ui.js?v=p7';
import { renderQuizUniversity } from './university-ui.js?v=p7';

const RENDERERS = {
  'quiz':              renderQuiz,
  'drag-match':        renderDragMatch,
  'compound-lab':      renderCompoundLab,
  'soap-write':        renderSoapWrite,
  'patient-roleplay':  renderPatientRoleplay,
  'identification':    renderIdentification,
  'calculator':        renderCalculator,
  // 'arrange', 'titration', 'osce-station', 'structure-draw' — bổ sung sau
};

export class ScenarioEngine {
  /**
   * @param {Object} cfg
   * @param {HTMLElement} cfg.host
   * @param {import('./types.js').Scenario} cfg.scenario
   * @param {(r: import('./types.js').AssessmentResult)=>void} [cfg.onComplete]
   * @param {string} [cfg.playerName]
   * @param {string} [cfg.classCode]
   */
  constructor(cfg) {
    this.host = cfg.host;
    this.scenario = cfg.scenario;
    this.onComplete = cfg.onComplete || (() => {});
    this.playerName = cfg.playerName || 'Ẩn danh';
    this.classCode = cfg.classCode;
    // Quiz "phản hồi tức thì" (game hoá) — chỉ bật cho Tiểu học/THCS.
    // Mặc định false → quiz cổ điển (chọn rồi Nộp bài một lần).
    this.instantFeedback = !!cfg.instantFeedback;
    this.assessment = new Assessment(this.scenario);
    this.startedAt = 0;
    this.state = {};
  }

  start() {
    const renderer = RENDERERS[this.scenario.kind];
    if (!renderer) {
      throw new Error(`Scenario kind "${this.scenario.kind}" chưa có renderer`);
    }
    this.startedAt = Date.now();
    this._renderHeader();
    renderer(this, this.host);
  }

  _renderHeader() {
    const h = document.createElement('div');
    h.className = 'scenario-header';
    h.innerHTML = `
      <div class="scenario-title">${this.scenario.title}</div>
      ${this.scenario.description ? `<div class="scenario-desc">${this.scenario.description}</div>` : ''}
      <div class="scenario-meta">
        ${this.scenario.yearLevel ? `<span>📚 Năm ${this.scenario.yearLevel}</span>` : ''}
        ${this.scenario.subject ? `<span>🎓 ${this.scenario.subject}</span>` : ''}
        ${this.scenario.difficulty ? `<span>⭐ ${this.scenario.difficulty}/5</span>` : ''}
      </div>`;
    this.host.appendChild(h);
  }

  /** Module renderer gọi khi SV hoàn thành để tính điểm + submit. */
  async complete(rawDetails) {
    const result = await this.assessment.evaluate(rawDetails);
    result.playerName = this.playerName;
    if (this.classCode) result.classCode = this.classCode;
    result.durationMs = Date.now() - this.startedAt;
    result.timestamp = Date.now();
    await this._submitAttempt(result);
    this.onComplete(result);
    return result;
  }

  async _submitAttempt(result) {
    try {
      await fetch('api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: this.scenario.id,           // dùng scenario.id làm version
          playerName: result.playerName,
          classCode: result.classCode,
          score: result.score,
          correct: result.rubricBreakdown.filter(r => r.score >= 0.5).length,
          total: result.rubricBreakdown.length || 1,
          duration_ms: result.durationMs,
          level_n: this.scenario.difficulty || null,
          details: JSON.stringify({
            kind: this.scenario.kind,
            stars: result.stars,
            rubric: result.rubricBreakdown,
            ...result.details,
          }),
        }),
      });
    } catch (e) {
      console.warn('[engine] submit attempt failed', e);
    }
  }
}

// ============================================================
// RENDERERS — mỗi kind một hàm
// Code thực sự render từng kind có thể tách file riêng khi
// scenario phức tạp hơn. Dưới đây là MVP để demo API engine.
// ============================================================

/**
 * Quiz dispatcher: 4 tier UI/UX riêng biệt theo lứa tuổi.
 *  - preschool  → Big Bubble Cards (cute, TTS, confetti)
 *  - primary    → Adventure Quest (pet 🦊 cổ vũ, đáp án A/B/C/D vibrant, progress sao)
 *  - secondary  → Modern Vibrant (streak counter, progress bar gradient)
 *  - highschool → Focused Academic (dim theme, question nav, flag for review, timer)
 *  - pharmacy/it/economics → University Exam (palette sidebar, confirm submit, breakdown)
 *  - fallback   → classic Nộp bài / instant feedback theo engine config
 * @param {ScenarioEngine} engine
 */
function renderQuiz(engine, host) {
  try {
    const dom = getActiveDomainId();
    if (dom === 'preschool')  return renderQuizPreschool(engine, host);
    if (dom === 'primary')    return renderQuizPrimary(engine, host);
    if (dom === 'secondary')  return renderQuizSecondary(engine, host);
    if (dom === 'highschool') return renderQuizHighschool(engine, host);
    if (dom === 'pharmacy' || dom === 'it' || dom === 'economics') {
      return renderQuizUniversity(engine, host);
    }
  } catch {}
  if (engine.instantFeedback) return renderQuizInstant(engine, host);
  return renderQuizClassic(engine, host);
}

/** Quiz cổ điển — chọn đáp án bằng radio, nộp 1 lần (không thưởng tức thì). */
function renderQuizClassic(engine, host) {
  const sc = /** @type {import('./types.js').QuizScenario} */ (engine.scenario);
  const wrap = document.createElement('div');
  wrap.className = 'quiz-wrap';
  const answers = new Array(sc.questions.length).fill(-1);

  sc.questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-stem"><b>Câu ${i + 1}.</b> ${q.stem}</div>
      ${q.image ? `<img src="${q.image}" class="quiz-img"/>` : ''}
      <div class="quiz-choices">
        ${q.choices.map((c, ci) => `
          <label class="quiz-choice"><input type="radio" name="q${i}" value="${ci}"/> ${c}</label>
        `).join('')}
      </div>`;
    card.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('change', () => { answers[i] = parseInt(inp.value); });
    });
    wrap.appendChild(card);
  });

  const submitBtn = document.createElement('button');
  submitBtn.className = 'submit-btn';
  submitBtn.textContent = 'Nộp bài';
  submitBtn.onclick = () => engine.complete({ answers, questions: sc.questions });
  wrap.appendChild(submitBtn);
  host.appendChild(wrap);
}

/**
 * Quiz với PHẢN HỒI NGAY mỗi câu:
 *  - chọn đáp án → khoá câu, tô xanh đáp án đúng / đỏ đáp án sai,
 *    hiện "+XP" và lời giải ngắn.
 *  - đủ tất cả câu → nút "Xem kết quả" mở màn tổng kết.
 * @param {ScenarioEngine} engine
 */
function renderQuizInstant(engine, host) {
  injectQuizFxStyles();
  const sc = /** @type {import('./types.js').QuizScenario} */ (engine.scenario);
  const wrap = document.createElement('div');
  wrap.className = 'qzx-wrap';
  const answers = new Array(sc.questions.length).fill(-1);
  const locked = new Array(sc.questions.length).fill(false);
  let answered = 0;
  let correctCount = 0;

  sc.questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'qzx-card';
    card.innerHTML = `
      <div class="qzx-stem"><span class="qzx-num">Câu ${i + 1}</span> ${q.stem}</div>
      ${q.image ? `<img src="${q.image}" class="qzx-img"/>` : ''}
      <div class="qzx-choices">
        ${q.choices.map((c, ci) => `
          <button class="qzx-choice" type="button" data-i="${i}" data-ci="${ci}">
            <span class="qzx-key">${String.fromCharCode(65 + ci)}</span>
            <span class="qzx-ctext">${c}</span>
          </button>`).join('')}
      </div>
      <div class="qzx-explain" hidden></div>`;
    wrap.appendChild(card);
  });

  const footer = document.createElement('div');
  footer.className = 'qzx-footer';
  footer.innerHTML = `
    <div class="qzx-prog"><span data-done>0</span>/${sc.questions.length} câu · <span data-correct>0</span> đúng</div>
    <button class="qzx-finish" type="button" disabled>Hoàn thành</button>`;
  wrap.appendChild(footer);
  host.appendChild(wrap);

  const doneEl = footer.querySelector('[data-done]');
  const correctEl = footer.querySelector('[data-correct]');
  const finishBtn = footer.querySelector('.qzx-finish');

  wrap.querySelectorAll('.qzx-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.i);
      const ci = Number(btn.dataset.ci);
      if (locked[i]) return;
      locked[i] = true;
      answers[i] = ci;
      const q = sc.questions[i];
      const ok = ci === q.answer;
      const card = btn.closest('.qzx-card');

      card.querySelectorAll('.qzx-choice').forEach(b => {
        b.disabled = true;
        const bci = Number(b.dataset.ci);
        if (bci === q.answer) b.classList.add('is-correct');
        if (bci === ci && !ok) b.classList.add('is-wrong');
      });

      const ex = card.querySelector('.qzx-explain');
      ex.hidden = false;
      ex.className = 'qzx-explain ' + (ok ? 'ok' : 'bad');
      // Per-choice feedback (choiceFeedback[i]) — giải thích đúng/sai theo CHÍNH
      // lựa chọn của HS; fallback về explanation chung nếu câu chưa có per-choice.
      const cf = Array.isArray(q.choiceFeedback) ? q.choiceFeedback : null;
      const perChoice = cf && cf[ci] != null ? String(cf[ci]) : '';
      const note = perChoice || (q.explanation ? String(q.explanation) : '');
      ex.innerHTML = ok
        ? `<b>✓ Chính xác!</b> <span class="qzx-xp">+10 XP</span>${note ? ' · ' + note : ''}`
        : `<b>✗ Chưa đúng.</b> Đáp án đúng: <b>${q.choices[q.answer]}</b>${note ? '. ' +  note : ''}`;
      // "Học thêm" — mini-bài giảng (theory[]) nếu câu hỏi có (vd ngân hàng lớp 6).
      if (Array.isArray(q.theory) && q.theory.length) {
        const det = document.createElement('details');
        det.className = 'qzx-theory';
        det.innerHTML = `<summary>💡 Học thêm</summary>` +
          q.theory.map(t => `<div class="qzx-theory-b">${String(t)}</div>`).join('');
        ex.appendChild(det);
      }

      if (ok) { correctCount++; card.classList.add('qzx-flash'); }
      answered++;
      doneEl.textContent = answered;
      correctEl.textContent = correctCount;

      if (answered === sc.questions.length) {
        finishBtn.disabled = false;
        finishBtn.classList.add('ready');
        finishBtn.textContent = 'Xem kết quả →';
        finishBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  finishBtn.addEventListener('click', () => {
    if (finishBtn.disabled) return;
    engine.complete({ answers, questions: sc.questions });
  });
}

let _quizFxInjected = false;
function injectQuizFxStyles() {
  if (_quizFxInjected || typeof document === 'undefined') return;
  _quizFxInjected = true;
  const css = `
  .qzx-wrap { display: flex; flex-direction: column; gap: 14px; }
  .qzx-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 16px 18px; }
  .qzx-card.qzx-flash { animation: qzxFlash .6s ease; }
  @keyframes qzxFlash { 0%{box-shadow:0 0 0 0 rgba(34,197,94,0)} 30%{box-shadow:0 0 0 3px rgba(34,197,94,.55)} 100%{box-shadow:0 0 0 0 rgba(34,197,94,0)} }
  .qzx-stem { line-height: 1.55; margin-bottom: 12px; font-size: 15.5px; }
  .qzx-num { display: inline-block; font-size: 11px; font-weight: 800; color: #1f1147;
    background: #fbbf24; padding: 2px 8px; border-radius: 999px; margin-right: 6px; }
  .qzx-img { max-width: 100%; border-radius: 10px; margin-bottom: 10px; }
  .qzx-choices { display: flex; flex-direction: column; gap: 9px; }
  .qzx-choice { display: flex; align-items: center; gap: 11px; width: 100%; text-align: left;
    background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.14);
    color: #fff; padding: 11px 14px; border-radius: 11px; cursor: pointer;
    font-family: inherit; font-size: 14.5px; transition: all .14s; }
  .qzx-choice:hover:not(:disabled) { background: rgba(255,255,255,0.12); border-color: #fbbf24; transform: translateX(3px); }
  .qzx-choice:disabled { cursor: default; }
  .qzx-key { flex: none; width: 26px; height: 26px; border-radius: 7px; display: flex;
    align-items: center; justify-content: center; font-weight: 800; font-size: 13px;
    background: rgba(255,255,255,0.1); }
  .qzx-choice.is-correct { background: rgba(34,197,94,0.2); border-color: #22c55e; }
  .qzx-choice.is-correct .qzx-key { background: #22c55e; color: #06281a; }
  .qzx-choice.is-wrong { background: rgba(239,68,68,0.18); border-color: #ef4444; }
  .qzx-choice.is-wrong .qzx-key { background: #ef4444; color: #fff; }
  .qzx-explain { margin-top: 12px; padding: 10px 14px; border-radius: 10px; font-size: 13.5px; line-height: 1.5;
    animation: qzxSlide .25s ease; }
  @keyframes qzxSlide { from{opacity:0; transform:translateY(-4px)} to{opacity:1; transform:none} }
  .qzx-explain.ok  { background: rgba(34,197,94,0.12); border-left: 3px solid #22c55e; }
  .qzx-explain.bad { background: rgba(239,68,68,0.12); border-left: 3px solid #ef4444; }
  .qzx-theory { margin-top: 8px; }
  .qzx-theory > summary { cursor: pointer; font-weight: 700; color: #a78bfa; font-size: 13px; list-style: none; }
  .qzx-theory > summary::-webkit-details-marker { display: none; }
  .qzx-theory[open] > summary { margin-bottom: 6px; }
  .qzx-theory-b { background: rgba(167,139,250,0.08); border-radius: 8px; padding: 7px 10px; margin: 5px 0; font-size: 13px; line-height: 1.55; }
  .qzx-theory-b code { background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 4px; }
  .qzx-theory-b ul { margin: 4px 0; padding-left: 20px; }
  .qzx-xp { display: inline-block; font-weight: 800; color: #fde047;
    background: rgba(253,224,71,0.15); padding: 1px 8px; border-radius: 999px;
    animation: qzxPop .4s cubic-bezier(.2,.9,.3,1.6); }
  @keyframes qzxPop { 0%{transform:scale(0)} 60%{transform:scale(1.25)} 100%{transform:scale(1)} }
  .qzx-footer { position: sticky; bottom: 0; display: flex; align-items: center; justify-content: space-between;
    gap: 12px; background: rgba(15,23,42,0.92); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 12px 16px; margin-top: 4px; }
  .qzx-prog { font-size: 13.5px; font-weight: 700; opacity: 0.9; }
  .qzx-finish { padding: 11px 22px; border: 0; border-radius: 11px; font-weight: 800; font-size: 15px;
    font-family: inherit; cursor: pointer; color: #fff; background: rgba(255,255,255,0.12); }
  .qzx-finish:disabled { opacity: 0.5; cursor: not-allowed; }
  .qzx-finish.ready { background: linear-gradient(90deg,#fbbf24,#f59e0b); color: #1f1147;
    animation: qzxPop .4s cubic-bezier(.2,.9,.3,1.6); }
  @media (prefers-reduced-motion: reduce) {
    .qzx-card.qzx-flash, .qzx-explain, .qzx-xp, .qzx-finish.ready { animation: none; }
  }`;
  const tag = document.createElement('style');
  tag.textContent = css;
  document.head.appendChild(tag);
}

/** @param {ScenarioEngine} engine */
function renderDragMatch(engine, host) {
  const sc = /** @type {import('./types.js').DragMatchScenario} */ (engine.scenario);
  injectDragMatchStyles();
  const right = [...sc.rightItems].sort(() => Math.random() - 0.5);
  const pairs = {};          // leftId -> rightId
  let activeLeft = null;

  const wrap = document.createElement('div');
  wrap.className = 'dm-wrap';
  wrap.innerHTML = `
    <div class="dm-hint">👉 Bấm một ô bên <b>trái</b>, rồi bấm ô bên <b>phải</b> tương ứng để ghép cặp. Bấm lại để đổi.</div>
    <div class="dm-cols">
      <div class="dm-col">${sc.leftItems.map(it => `<button type="button" class="dm-item" data-side="L" data-id="${it.id}">${it.label}</button>`).join('')}</div>
      <div class="dm-col">${right.map(it => `<button type="button" class="dm-item" data-side="R" data-id="${it.id}">${it.label}</button>`).join('')}</div>
    </div>
    <div class="dm-foot"><span class="dm-progress"></span><button type="button" class="submit-btn dm-submit">Nộp bài</button></div>`;
  host.appendChild(wrap);

  const colorFor = i => `hsl(${(i * 57) % 360} 70% 55%)`;
  function refresh() {
    wrap.querySelectorAll('.dm-item').forEach(b => {
      b.classList.remove('active', 'paired');
      b.style.removeProperty('--pc');
    });
    if (activeLeft) wrap.querySelector(`.dm-item[data-side="L"][data-id="${CSS.escape(activeLeft)}"]`)?.classList.add('active');
    Object.entries(pairs).forEach(([lid, rid], idx) => {
      const c = colorFor(idx);
      for (const sel of [`.dm-item[data-side="L"][data-id="${CSS.escape(lid)}"]`,
                         `.dm-item[data-side="R"][data-id="${CSS.escape(rid)}"]`]) {
        const el = wrap.querySelector(sel);
        if (el) { el.classList.add('paired'); el.style.setProperty('--pc', c); }
      }
    });
    const n = Object.keys(pairs).length;
    wrap.querySelector('.dm-progress').textContent = `Đã ghép ${n}/${sc.leftItems.length}`;
  }
  wrap.querySelectorAll('.dm-item[data-side="L"]').forEach(b =>
    b.onclick = () => { activeLeft = (activeLeft === b.dataset.id) ? null : b.dataset.id; refresh(); });
  wrap.querySelectorAll('.dm-item[data-side="R"]').forEach(b =>
    b.onclick = () => {
      if (!activeLeft) return;
      for (const k of Object.keys(pairs)) if (pairs[k] === b.dataset.id) delete pairs[k];
      pairs[activeLeft] = b.dataset.id;
      activeLeft = null; refresh();
    });
  wrap.querySelector('.dm-submit').onclick = () =>
    engine.complete({ pairs: Object.entries(pairs).map(([l, r]) => [l, r]) });
  refresh();
}

let _dmStyled = false;
function injectDragMatchStyles() {
  if (_dmStyled) return; _dmStyled = true;
  const css = `
    .dm-wrap { display:flex; flex-direction:column; gap:14px; }
    .dm-hint { font-size:13px; opacity:0.8; }
    .dm-cols { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .dm-col { display:flex; flex-direction:column; gap:10px; }
    .dm-item {
      padding:12px 14px; border-radius:10px; font-size:15px; font-family:inherit;
      background:rgba(255,255,255,0.06); color:#fff; border:2px solid rgba(255,255,255,0.15);
      cursor:pointer; transition:all 0.12s; text-align:center;
    }
    .dm-item:hover { background:rgba(255,255,255,0.12); }
    .dm-item.active { border-color:#fbbf24; box-shadow:0 0 0 3px rgba(251,191,36,0.3); }
    .dm-item.paired { border-color:var(--pc); background:color-mix(in srgb, var(--pc) 18%, transparent); }
    .dm-foot { display:flex; align-items:center; gap:12px; }
    .dm-progress { font-size:13px; opacity:0.7; margin-right:auto; }
  `;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
}

/** @param {ScenarioEngine} engine */
function renderCompoundLab(engine, host) {
  // Bridge sang compounding-lab.html hiện có — dùng recipe đính kèm
  const sc = /** @type {import('./types.js').CompoundLabScenario} */ (engine.scenario);
  host.insertAdjacentHTML('beforeend',
    `<div class="compound-lab-bridge">
      <a class="open-lab" href="compounding-lab.html?recipe=${sc.recipe.id}">🧪 Mở Bào chế Lab</a>
    </div>`);
}

/** @param {ScenarioEngine} engine */
async function renderSoapWrite(engine, host) {
  const sc = /** @type {import('./types.js').SoapWriteScenario} */ (engine.scenario);
  host.insertAdjacentHTML('beforeend', `
    <div class="soap-wrap">
      <div class="soap-case">📋 Ca: ${sc.caseId}</div>
      <textarea class="soap-input" rows="14" placeholder="Viết SOAP note tại đây..."></textarea>
      <button class="submit-btn">Nộp & xin AI feedback</button>
      <div class="soap-feedback"></div>
    </div>`);
  host.querySelector('.submit-btn').onclick = async () => {
    const text = host.querySelector('.soap-input').value;
    const fb = host.querySelector('.soap-feedback');
    fb.textContent = '⏳ AI đang chấm bài...';
    // gọi AITutor (xem ai-tutor.js)
    const { gradeSoap } = await import('./ai-tutor.js');
    const review = await gradeSoap({ caseId: sc.caseId, soapText: text, rubric: sc.rubric });
    fb.innerHTML = `<div class="ai-feedback">${review.html}</div>`;
    engine.complete({ soapText: text, rubricScore: review.scores });
  };
}

/** @param {ScenarioEngine} engine */
function renderPatientRoleplay(engine, host) {
  host.insertAdjacentHTML('beforeend',
    `<div class="roleplay-placeholder">🗣️ AI Patient Role-play, sẽ implement chi tiết ở module L5.2.</div>`);
}

/** @param {ScenarioEngine} engine */
function renderIdentification(engine, host) {
  host.insertAdjacentHTML('beforeend',
    `<div class="identification-placeholder">🌿 Nhận diện (ảnh / AR / kính hiển vi): sẽ implement ở L2.2 và L2.3.</div>`);
}

/** @param {ScenarioEngine} engine */
function renderCalculator(engine, host) {
  const sc = /** @type {import('./types.js').CalculatorScenario} */ (engine.scenario);
  const inputsHtml = sc.inputs.map(i => `
    <label class="calc-input">
      ${i.label} (${i.unit})
      <input type="number" step="any" data-name="${i.name}"/>
    </label>`).join('');
  host.insertAdjacentHTML('beforeend', `
    <div class="calc-wrap">
      ${inputsHtml}
      <button class="submit-btn">Tính</button>
      <div class="calc-result"></div>
    </div>`);
  host.querySelector('.submit-btn').onclick = () => {
    const values = {};
    host.querySelectorAll('input').forEach(inp => values[inp.dataset.name] = parseFloat(inp.value));
    const computed = computeFormula(sc.formula, values);
    const ok = Math.abs(computed - sc.target) <= sc.tolerance;
    host.querySelector('.calc-result').textContent =
      `Kết quả: ${computed.toFixed(2)}, ${ok ? '✅ Đúng' : `❌ Lệch (đáp án ${sc.target})`}`;
    engine.complete({ input: values, computed, target: sc.target, ok });
  };
}

// Bộ công thức cho calculator
function computeFormula(name, v) {
  switch (name) {
    case 'cockcroft-gault':
      // CrCl = (140-age) × kg / (72 × Scr_mg/dL); × 0.85 nếu nữ
      return ((140 - v.age) * v.weight) / (72 * v.scr) * (v.sex === 'F' ? 0.85 : 1);
    case 'mg-per-kg':
      return v.dose_mg_per_kg * v.weight;
    case 'bsa-mosteller':
      // BSA = √(height × weight / 3600)
      return Math.sqrt((v.height * v.weight) / 3600);
    case 'auc-trapezoidal':
      // simplified: AUC = (C0 + C1)/2 × (t1 - t0)
      return ((v.c0 + v.c1) / 2) * (v.t1 - v.t0);
    case 'custom':
      // Fill-in số: SV tự gõ đáp án (dùng cho Toán/khoa học). Lấy ô 'answer'
      // hoặc ô input đầu tiên; so với target ± tolerance.
      return v.answer ?? Object.values(v)[0] ?? NaN;
    default: return NaN;
  }
}
