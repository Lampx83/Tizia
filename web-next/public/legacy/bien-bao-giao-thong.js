// Wrap-mount trang "Biển báo giao thông". Nội dung 21 biển (QCVN 41:2019) nay LƯU
// Ở DB (content_datasets, collection='traffic-signs') và được fetch runtime qua
// GET /api/content/traffic-signs — KHÔNG còn hardcode SIGNS trong file này.
// Mỗi item DB: { id, group, name, meaning, svg } (svg đã nội suy sẵn chuỗi).

(function () {
  const root = document.getElementById('bbgt-root');
  if (!root) return;
  if (root.dataset.mounted === '1') return; // idempotent (StrictMode / remount)
  root.dataset.mounted = '1';

  const GROUP_LABELS = { cam:'Biển CẤM', nguyhiem:'Biển NGUY HIỂM', hieulenh:'Biển HIỆU LỆNH', chidan:'Biển CHỈ DẪN' };
  const el = (id) => root.querySelector('#' + id);
  let mode = 'learn', group = 'all';
  let quiz = null, rCnt = 0, wCnt = 0, strk = 0;
  let SIGNS = [];

  function renderLearn() {
    el('learnGrid').style.display = '';
    el('quizArea').style.display = 'none';
    el('quizStats').style.display = 'none';
    const list = group === 'all' ? SIGNS : SIGNS.filter((s) => s.group === group);
    if (!list.length) {
      el('learnGrid').innerHTML = '<div style="padding:24px;text-align:center;opacity:.7">Chưa có biển báo nào.</div>';
      return;
    }
    el('learnGrid').innerHTML = list.map((s) => `
      <div class="sign-card" data-id="${s.id}">
        ${s.svg}
        <div class="name">${s.name}</div>
        <div class="id">${s.id}</div>
      </div>`).join('');
    root.querySelectorAll('.sign-card').forEach((c) => (c.onclick = () => showDetail(c.dataset.id)));
  }
  function showDetail(id) {
    const s = SIGNS.find((x) => x.id === id);
    if (!s) return;
    el('modalContent').innerHTML = `
      ${s.svg}
      <h3>${s.name}</h3>
      <div class="group">${GROUP_LABELS[s.group]} · ${s.id}</div>
      <div class="meaning">${s.meaning}</div>
      <button data-close="1">Đóng</button>`;
    el('modalContent').querySelector('[data-close]').onclick = () => el('modalBg').classList.remove('show');
    el('modalBg').classList.add('show');
  }
  el('modalBg').onclick = (e) => { if (e.target.id === 'modalBg') el('modalBg').classList.remove('show'); };

  function pickQuiz() {
    const list = group === 'all' ? SIGNS : SIGNS.filter((s) => s.group === group);
    const correct = list[Math.floor(Math.random() * list.length)];
    const others = list.filter((s) => s.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const choices = [...others, correct].sort(() => Math.random() - 0.5);
    return { correct, choices };
  }
  function renderQuiz() {
    el('learnGrid').style.display = 'none';
    el('quizArea').style.display = '';
    el('quizStats').style.display = '';
    const list = group === 'all' ? SIGNS : SIGNS.filter((s) => s.group === group);
    if (!list.length) {
      el('quizSign').innerHTML = '';
      el('quizAnswers').innerHTML = '';
      el('quizExplain').textContent = 'Chưa có biển báo nào để luyện.';
      el('nextQuizBtn').style.display = 'none';
      return;
    }
    quiz = pickQuiz();
    el('quizSign').innerHTML = quiz.correct.svg;
    el('quizAnswers').innerHTML = quiz.choices.map((c) => `
      <button data-correct="${c.id === quiz.correct.id}">${c.name}</button>
    `).join('');
    el('quizExplain').textContent = '';
    el('nextQuizBtn').style.display = 'none';
    root.querySelectorAll('#quizAnswers button').forEach((b) => (b.onclick = () => answerQuiz(b)));
  }
  function answerQuiz(btn) {
    const right = btn.dataset.correct === 'true';
    root.querySelectorAll('#quizAnswers button').forEach((b) => {
      b.disabled = true;
      if (b.dataset.correct === 'true') b.classList.add('right');
      else if (b === btn) b.classList.add('wrong');
    });
    if (right) { rCnt++; strk++; } else { wCnt++; strk = 0; }
    el('rCnt').textContent = rCnt;
    el('wCnt').textContent = wCnt;
    el('strk').textContent = strk;
    el('quizExplain').textContent = (right ? '✅ Đúng. ' : `❌ Đáp án đúng: ${quiz.correct.name}. `) + quiz.correct.meaning;
    el('nextQuizBtn').style.display = '';
  }
  el('nextQuizBtn').onclick = renderQuiz;

  function setMode(m) {
    mode = m;
    root.querySelectorAll('[data-mode]').forEach((b) => b.classList.toggle('active', b.dataset.mode === m));
    if (m === 'learn') renderLearn();
    else renderQuiz();
  }
  function setGroup(g) {
    group = g;
    root.querySelectorAll('[data-group-tab]').forEach((b) => b.classList.toggle('active', b.dataset.group === g));
    if (mode === 'learn') renderLearn();
    else renderQuiz();
  }
  root.querySelectorAll('[data-mode]').forEach((b) => (b.onclick = () => setMode(b.dataset.mode)));
  root.querySelectorAll('[data-group-tab]').forEach((b) => (b.onclick = () => setGroup(b.dataset.group)));

  // ── Nạp data từ DB rồi mới render. Loading + fallback rỗng an toàn. ──
  el('learnGrid').innerHTML = '<div style="padding:24px;text-align:center;opacity:.7">Đang tải biển báo…</div>';
  fetch('/api/content/traffic-signs', { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .then((data) => { SIGNS = Array.isArray(data?.items) ? data.items : []; })
    .catch(() => { SIGNS = []; })
    .finally(() => { renderLearn(); });
})();
