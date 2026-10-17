// ============================================================
// Weekly Lesson — màn hình 1 tuần học (~1 tiết) cho Tiểu học
// ============================================================
// Mỗi tuần = 4 lớp học tập:
//   1. 📖 Lý thuyết + ví dụ (tĩnh — scenario.lesson, soạn sẵn)
//   2. ✏️ Quiz luyện tập (scenario.questions — đã có)
//   3. ♾️ AI "Học thêm" — POST /api/ai/practice-more (Ollama sinh thêm câu)
//   4. 🦉 AI "Hỏi gia sư" — POST /api/ai/lesson-coach (Ollama giảng lại)
//
// Render thuần DOM, không phụ thuộc framework. module.html gọi:
//   renderWeeklyLesson({ host, scenario, grade, subjectLabel,
//                        onStartQuiz, onStartBonus })
// ============================================================

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Render 1 khối lý thuyết (h / p / ul / note / hình) → HTML */
function renderBlock(b) {
  if (typeof b === 'string') return `<p>${esc(b)}</p>`;
  if (b.h) return `<h4 class="wl-h">${esc(b.h)}</h4>`;
  if (b.p) return `<p class="wl-p">${esc(b.p)}</p>`;
  if (b.ul) return `<ul class="wl-ul">${b.ul.map(li => `<li>${esc(li)}</li>`).join('')}</ul>`;
  if (b.note) return `<div class="wl-note">💡 ${esc(b.note)}</div>`;
  return '';
}

/**
 * @param {Object} o
 * @param {HTMLElement} o.host           - nơi render
 * @param {Object}      o.scenario       - scenario tuần (có .lesson, .questions, .title)
 * @param {number}      o.grade          - lớp (2)
 * @param {string}      o.subjectLabel   - "Toán", "Tiếng Việt"…
 * @param {Function}    o.onStartQuiz    - () => chạy quiz lõi
 * @param {Function}    o.onStartBonus   - (bonusScenario) => chạy quiz AI sinh thêm
 */
export function renderWeeklyLesson({ host, scenario, grade = 2, subjectLabel = '', onStartQuiz, onStartBonus }) {
  // GA4: học sinh mở tuần học — analytics dashboard đo "lesson_start" theo môn/lớp/tuần.
  try {
    window.tiziaTrack?.('lesson_start', {
      week_id: scenario.id || '',
      week_title: (scenario.title || '').slice(0, 80),
      subject: subjectLabel || scenario.subject || '',
      grade: Number(grade) || 0,
    });
  } catch {}
  const lesson = scenario.lesson || {};
  const theory = Array.isArray(lesson.theory) ? lesson.theory : [];
  const examples = Array.isArray(lesson.examples) ? lesson.examples : [];
  const objectives = Array.isArray(lesson.objectives) ? lesson.objectives : [];
  const qCount = (scenario.questions || []).length;

  host.innerHTML = `
    <div class="wl">
      <div class="wl-card wl-intro">
        ${lesson.intro ? `<p class="wl-lead">${esc(lesson.intro)}</p>` : ''}
        ${objectives.length ? `
          <div class="wl-obj">
            <b>🎯 Tuần này em sẽ học:</b>
            <ul class="wl-ul">${objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
          </div>` : ''}
      </div>

      ${theory.length ? `
      <div class="wl-card">
        <div class="wl-sec">📖 Bài học</div>
        ${theory.map(renderBlock).join('')}
      </div>` : ''}

      ${examples.length ? `
      <div class="wl-card">
        <div class="wl-sec">✍️ Ví dụ mẫu</div>
        ${examples.map((ex, i) => `
          <div class="wl-ex">
            <div class="wl-ex-q"><b>Ví dụ ${i + 1}.</b> ${esc(ex.q)}</div>
            ${ex.a ? `<div class="wl-ex-a">👉 ${esc(ex.a)}</div>` : ''}
          </div>`).join('')}
      </div>` : ''}

      <div class="wl-actions">
        <button class="wl-btn wl-btn-primary" id="wl-start-quiz">
          ✏️ Làm bài kiểm tra (${qCount} câu)
        </button>
        <button class="wl-btn wl-btn-ai" id="wl-more">
          ♾️ Học thêm (AI ra đề mới)
        </button>
        <button class="wl-btn wl-btn-ai" id="wl-coach">
          🦉 Hỏi cô giáo AI
        </button>
        <button class="wl-btn wl-btn-bank" id="wl-bank" style="display:none">
          📚 Kho câu hỏi
        </button>
        <!-- "Trồng lá" CTA: bấm vào Cây Tri Thức xem các tuần đã hoàn thành dưới dạng visual -->
        <a class="wl-btn" id="wl-tree" href="/cay-tri-thuc.html" target="_blank" rel="noopener"
           style="background:linear-gradient(135deg,rgba(34,197,94,.2),rgba(132,204,22,.2));color:#15803d;border:1px solid rgba(34,197,94,.5);text-decoration:none;display:inline-flex;align-items:center;gap:6px">
          🌳 Cây Tri Thức của em
        </a>
      </div>

      <div id="wl-ai-zone"></div>
    </div>
  `;

  const aiZone = host.querySelector('#wl-ai-zone');

  // Kho học liệu AI đã tích luỹ của tuần này (bài học giàu dần qua mỗi lần dùng).
  const bankBtn = host.querySelector('#wl-bank');
  let bankQuestions = [];
  (async () => {
    try {
      const res = await fetch(`api/ai/lesson-bank?weekId=${encodeURIComponent(scenario.id)}`);
      if (!res.ok) return;
      const data = await res.json();
      bankQuestions = Array.isArray(data.questions) ? data.questions : [];
      const nQ = data.counts?.question || bankQuestions.length;
      if (nQ > 0) {
        bankBtn.textContent = `📚 Kho câu hỏi (${nQ})`;
        bankBtn.style.display = '';
      }
    } catch {}
  })();

  bankBtn.addEventListener('click', () => {
    if (!bankQuestions.length || typeof onStartBonus !== 'function') return;
    onStartBonus({
      id: `${scenario.id}-bank`,
      title: `📚 Kho câu hỏi · ${scenario.title}`,
      kind: 'quiz',
      yearLevel: scenario.yearLevel,
      subject: scenario.subject,
      difficulty: scenario.difficulty,
      questions: bankQuestions.slice(0, 10),
      isBonus: true,
    });
  });

  host.querySelector('#wl-start-quiz').addEventListener('click', () => {
    try {
      window.tiziaTrack?.('lesson_quiz_open', {
        week_id: scenario.id || '',
        subject: subjectLabel || scenario.subject || '',
        grade: Number(grade) || 0,
        question_count: (scenario.questions || []).length,
      });
    } catch {}
    if (typeof onStartQuiz === 'function') onStartQuiz();
  });

  // ── ♾️ HỌC THÊM — gọi Ollama sinh câu mới ──
  host.querySelector('#wl-more').addEventListener('click', async () => {
    const btn = host.querySelector('#wl-more');
    btn.disabled = true;
    const old = btn.textContent;
    btn.textContent = '⏳ Cô đang ra đề mới…';
    try {
      const res = await fetch('api/ai/practice-more', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          subjectLabel,
          weekId: scenario.id,
          topic: lesson.topic || scenario.title || '',
          sampleStems: (scenario.questions || []).slice(0, 6).map(q => q.stem),
          numQuestions: 5,
        }),
      });
      const data = await res.json();
      const qs = Array.isArray(data.questions) ? data.questions : [];
      if (!qs.length) {
        aiZone.innerHTML = `<div class="wl-card wl-ai-msg">🦉 Cô chưa nghĩ ra đề mới lúc này (AI bận hoặc ngoại tuyến). Em làm bài kiểm tra trước nhé!</div>`;
      } else if (typeof onStartBonus === 'function') {
        aiZone.innerHTML = `<div class="wl-card wl-ai-msg">✨ Cô vừa ra ${qs.length} câu mới cho em! <small style="opacity:.7">(AI tự soạn, nếu thấy câu nào lạ, em hỏi cô giáo nhé)</small></div>`;
        onStartBonus({
          id: `${scenario.id}-bonus`,
          title: `♾️ Học thêm · ${scenario.title}`,
          kind: 'quiz',
          yearLevel: scenario.yearLevel,
          subject: scenario.subject,
          difficulty: scenario.difficulty,
          questions: qs,
          isBonus: true,
        });
      }
    } catch (e) {
      aiZone.innerHTML = `<div class="wl-card wl-ai-msg">⚠️ Không kết nối được AI: ${esc(e.message)}</div>`;
    } finally {
      btn.disabled = false;
      btn.textContent = old;
    }
  });

  // ── 🦉 HỎI CÔ GIÁO AI — chat giảng lại ──
  host.querySelector('#wl-coach').addEventListener('click', () => {
    if (aiZone.querySelector('.wl-chat')) {
      aiZone.querySelector('.wl-chat-input')?.focus();
      return;
    }
    aiZone.innerHTML = `
      <div class="wl-card wl-chat">
        <div class="wl-sec">🦉 Cô giáo AI, hỏi gì cô cũng giảng lại nhé!</div>
        <div class="wl-chat-log" id="wl-chat-log">
          <div class="wl-msg wl-msg-ai">Chào em! Phần nào trong bài "${esc(scenario.title)}" em chưa hiểu, cứ hỏi cô nhé 😊</div>
        </div>
        <div class="wl-chat-row">
          <input class="wl-chat-input" id="wl-chat-input" placeholder="Ví dụ: Cô ơi cộng có nhớ là sao ạ?" maxlength="300" />
          <button class="wl-btn wl-btn-ai" id="wl-chat-send">Gửi</button>
        </div>
      </div>`;
    const log = aiZone.querySelector('#wl-chat-log');
    const input = aiZone.querySelector('#wl-chat-input');
    const send = aiZone.querySelector('#wl-chat-send');
    const histChat = [];
    const theoryText = theory.map(b => b.h || b.p || (b.ul || []).join('; ') || b.note || '').join('\n');

    async function ask() {
      const msg = input.value.trim();
      if (!msg) return;
      input.value = '';
      log.insertAdjacentHTML('beforeend', `<div class="wl-msg wl-msg-me">${esc(msg)}</div>`);
      log.insertAdjacentHTML('beforeend', `<div class="wl-msg wl-msg-ai wl-typing">cô đang nghĩ…</div>`);
      log.scrollTop = log.scrollHeight;
      histChat.push({ role: 'user', content: msg });
      try {
        const res = await fetch('api/ai/lesson-coach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade, subjectLabel,
            weekId: scenario.id,
            topic: lesson.topic || scenario.title || '',
            theory: theoryText,
            history: histChat.slice(0, -1),
            message: msg,
          }),
        });
        const data = await res.json();
        const reply = data.reply || 'Cô chưa trả lời được, em hỏi lại nhé!';
        log.querySelector('.wl-typing')?.remove();
        log.insertAdjacentHTML('beforeend', `<div class="wl-msg wl-msg-ai">${esc(reply)}</div>`);
        histChat.push({ role: 'assistant', content: reply });
        log.scrollTop = log.scrollHeight;
      } catch (e) {
        log.querySelector('.wl-typing')?.remove();
        log.insertAdjacentHTML('beforeend', `<div class="wl-msg wl-msg-ai">⚠️ Lỗi kết nối: ${esc(e.message)}</div>`);
      }
    }
    send.addEventListener('click', ask);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') ask(); });
    input.focus();
  });
}
