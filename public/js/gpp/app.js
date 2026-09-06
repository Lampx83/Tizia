// GPP 2D — bộ điều khiển giao diện. Vanilla ES module, không phụ thuộc framework.
import { LEVELS, QUIZ, GAME_PAIRS, SURVEYS } from './data.js?v=gpp0906a';
import { buildLevel } from './levels.js?v=gpp0906a';
import * as store from './store.js?v=gpp0906a';

const $app = document.getElementById('app');
const h = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
    else if (v != null) n.setAttribute(k, v);
  }
  for (const kid of kids.flat()) { if (kid == null) continue; n.append(kid.nodeType ? kid : document.createTextNode(kid)); }
  return n;
};
const mount = (node) => { $app.innerHTML = ''; $app.append(node); window.scrollTo(0, 0); };
const now = () => Date.now();

// ============================ ENROLL ============================
function viewEnroll() {
  const wrap = h('div', { class: 'card enroll' });
  wrap.append(
    h('h2', {}, '🧪 Thực hành nghiệp vụ nhà thuốc GPP'),
    h('p', { class: 'muted' }, 'Nhập thông tin để bắt đầu. Mã sinh viên dùng để lưu tiến trình và phục vụ nghiên cứu.'),
  );
  const f = h('div', { class: 'form' });
  const code = h('input', { placeholder: 'Mã sinh viên *', autocomplete: 'off' });
  const name = h('input', { placeholder: 'Họ và tên', autocomplete: 'off' });
  const klass = h('input', { placeholder: 'Lớp (VD: 14A, 15A)', autocomplete: 'off' });
  const year = h('select', {}, h('option', { value: '' }, '— Năm học —'), h('option', { value: '2' }, 'Năm 2 (Dược lý)'), h('option', { value: '3' }, 'Năm 3 (KNTH tại CSBL thuốc)'));
  const grp = h('select', {}, h('option', { value: '' }, '— Nhóm nghiên cứu (nếu có) —'), h('option', { value: 'exp' }, 'Nhóm thực nghiệm'), h('option', { value: 'ctrl' }, 'Nhóm đối chứng'));
  const err = h('div', { class: 'err' });
  const btn = h('button', { class: 'btn primary', onclick: async () => {
    if (!code.value.trim()) { err.textContent = 'Vui lòng nhập mã sinh viên.'; return; }
    btn.disabled = true; btn.textContent = 'Đang vào…';
    const res = await store.enroll({ studentCode: code.value.trim(), fullName: name.value.trim(), className: klass.value.trim(), yearLevel: Number(year.value) || null, studyGroup: grp.value || null });
    if (!res.ok) { err.textContent = 'Không kết nối được máy chủ. Thử lại.'; btn.disabled = false; btn.textContent = 'Bắt đầu'; return; }
    viewHub();
  } }, 'Bắt đầu');
  const testBtn = h('button', { class: 'btn ghost', style: 'margin-top:4px', onclick: () => {
    store.enterTestMode(); viewHub();
  } }, '⚡ Vào thử ngay — bỏ qua khai báo (mở sẵn 4 cấp)');
  f.append(code, name, klass, year, grp, err, btn, testBtn);
  wrap.append(f);
  mount(wrap);
}

// ============================ HUB ============================
function viewHub() {
  const s = store.state;
  const wrap = h('div', {});
  wrap.append(h('div', { class: 'hero' },
    h('div', {}, h('h2', {}, 'Xin chào, ' + (s.studentCode || 'bạn')),
      h('p', { class: 'muted' }, `Lớp ${s.className || '—'} · ${s.yearLevel === 3 ? 'Năm 3' : s.yearLevel === 2 ? 'Năm 2' : ''}`)),
    h('button', { class: 'btn ghost small', onclick: () => { localStorage.removeItem('gpp_participant_v1'); location.reload(); } }, 'Đổi tài khoản'),
  ));
  if (s.testMode) wrap.append(h('div', { class: 'context', style: 'border-left-color:var(--accent);margin-bottom:12px' },
    h('div', { class: 'ctx-line' }, '⚡ Chế độ dùng thử — mở sẵn cả 4 cấp, không lưu dữ liệu nghiên cứu. Nhấn "Đổi tài khoản" để vào chế độ chính thức.')));
  else if (s.offline) wrap.append(h('div', { class: 'context', style: 'border-left-color:var(--warn);margin-bottom:12px' },
    h('div', { class: 'ctx-line' }, '⚠️ Chưa kết nối máy chủ — bạn vẫn luyện tập bình thường, tiến trình lưu tạm trên máy này.')));

  // Tham quan nhà thuốc 2D
  wrap.append(h('div', { class: 'section-title' }, '🏥 Nhà thuốc thực hành An Tâm Pharma'));
  wrap.append(tile('🏥', 'Tham quan nhà thuốc 2D', 'Mặt tiền + nội thất trực quan — bấm vào các tủ (Rx / OTC / sản phẩm khác) để xem danh mục thuốc.', () => location.href = '/nha-thuoc-2d.html'));

  // Đo trước / sau
  wrap.append(h('div', { class: 'section-title' }, '📝 Bài kiểm tra kiến thức'));
  const tests = h('div', { class: 'grid two' },
    tile('📥', 'Đo TRƯỚC (pre-test)', 'Làm trước khi luyện tập.', () => viewQuiz('pre')),
    tile('📤', 'Đo SAU (post-test)', 'Làm sau khi hoàn thành các cấp.', () => viewQuiz('post')),
  );
  wrap.append(tests);

  // 4 cấp
  wrap.append(h('div', { class: 'section-title' }, '🎯 Bốn cấp độ thực hành'));
  const grid = h('div', { class: 'grid' });
  for (const lv of LEVELS) {
    const unlocked = s.unlocked[lv.level];
    const score = s.scores[lv.level];
    const card = h('div', { class: 'level-card' + (unlocked ? '' : ' locked') });
    card.append(
      h('div', { class: 'lc-icon' }, unlocked ? lv.icon : '🔒'),
      h('div', { class: 'lc-body' },
        h('div', { class: 'lc-title' }, lv.title),
        h('div', { class: 'lc-desc' }, lv.desc),
        score != null ? h('div', { class: 'lc-score' }, `Điểm gần nhất: ${score}%` + (score >= 70 ? ' ✅' : '')) : null,
      ),
    );
    if (unlocked) card.addEventListener('click', () => viewLevel(lv.level));
    else card.append(h('div', { class: 'lc-hint' }, 'Đạt ≥70% cấp trước để mở'));
    grid.append(card);
  }
  wrap.append(grid);

  // Trò chơi + thang đo
  wrap.append(h('div', { class: 'section-title' }, '🎮 Học kiến thức qua trò chơi'));
  wrap.append(h('div', { class: 'grid two' },
    tile('💊', 'Pharma Crush', 'Game ghép 3 theo nhóm dược lý — có cấp độ, combo, mẹo dược sĩ.', () => location.href = '/pharma-crush.html'),
    tile('🗂️', 'Pharma Sort', 'Kéo từng thuốc vào đúng cột nhóm dược lý — luyện phân loại.', () => location.href = '/pharma-sort.html'),
    tile('🃏', 'Ghép thuốc – nhóm dược lý', 'Ôn phân loại thuốc theo tác dụng.', viewGame),
    tile('📊', 'Phiếu cuối buổi', 'Động lực, tải nhận thức, tính khả dụng.', viewSurveyMenu),
  ));
  mount(wrap);
}
function tile(icon, title, desc, onclick) {
  return h('div', { class: 'tile', onclick }, h('div', { class: 'tile-ic' }, icon),
    h('div', {}, h('div', { class: 'tile-t' }, title), h('div', { class: 'tile-d' }, desc)));
}

// ============================ LEVEL RUNNER ============================
function viewLevel(level) {
  const data = buildLevel(level);
  const steps = data.steps;
  const meta = LEVELS.find(l => l.level === level);
  let idx = 0;
  const perStep = steps.map(() => ({ attempts: 0, firstOk: null, startedAt: now() }));
  const t0 = now();

  const wrap = h('div', {});
  const head = h('div', { class: 'run-head' },
    h('button', { class: 'btn ghost small', onclick: () => viewHub() }, '← Về'),
    h('div', { class: 'run-title' }, meta.icon + ' ' + meta.title),
  );
  const ctx = data.context ? h('div', { class: 'context' },
    h('div', { class: 'ctx-title' }, '📄 ' + data.context.title),
    ...data.context.lines.map(l => h('div', { class: 'ctx-line' }, '• ' + l))) : null;
  const prog = h('div', { class: 'progress' });
  const body = h('div', { class: 'step-body' });
  const aiBox = h('div', { class: 'ai-box' });
  [head, ctx, prog, body, aiBox].forEach(n => { if (n) wrap.append(n); });
  mount(wrap);

  function renderProgress() {
    prog.innerHTML = '';
    steps.forEach((_, i) => prog.append(h('span', { class: 'dot' + (i < idx ? ' done' : i === idx ? ' cur' : '') })));
    prog.append(h('span', { class: 'pcount' }, `${idx}/${steps.length}`));
  }
  function renderStep() {
    renderProgress();
    body.innerHTML = '';
    if (idx >= steps.length) return finish();
    const st = steps[idx];
    const ps = perStep[idx];
    ps.startedAt = now();
    body.append(h('div', { class: 'crit' }, `Tiêu chí ${idx + 1}: ${st.crit}`));
    body.append(h('div', { class: 'prompt' }, st.prompt));
    const opts = h('div', { class: 'opts' });
    const fb = h('div', { class: 'fb' });
    st.options.forEach((label, oi) => {
      const b = h('button', { class: 'opt', onclick: () => {
        const correct = oi === st.answer;
        ps.attempts++;
        if (ps.firstOk === null) ps.firstOk = correct;
        store.logEvent({ level, stepKey: st.key, action: 'answer', correct, attempts: ps.attempts, timeMs: now() - ps.startedAt, detail: { pick: oi } });
        [...opts.children].forEach(c => c.classList.remove('sel'));
        b.classList.add('sel');
        if (correct) {
          b.classList.add('ok');
          fb.className = 'fb show ok'; fb.textContent = '✅ Chính xác. ' + (st.fb || '');
          [...opts.children].forEach(c => c.disabled = true);
          setTimeout(() => { idx++; renderStep(); }, 750);
        } else {
          b.classList.add('bad');
          fb.className = 'fb show bad'; fb.textContent = '❌ Chưa đúng, thử lại.' + (st.fb ? ' Gợi ý: ' + st.fb : '');
        }
      } }, label);
      opts.append(b);
    });
    body.append(opts, fb);
  }
  async function finish() {
    const stepsPassed = perStep.filter(p => p.firstOk === true).length;
    const attemptsTotal = perStep.reduce((a, p) => a + p.attempts, 0);
    const durationMs = now() - t0;
    const res = await store.completeLevel({ level, stepsTotal: steps.length, stepsPassed, durationMs, attemptsTotal, detail: perStep.map((p, i) => ({ key: steps[i].key, firstOk: p.firstOk, attempts: p.attempts })) });
    const score = res.score ?? Math.round((stepsPassed / steps.length) * 1000) / 10;
    const passed = score >= 70;
    body.innerHTML = '';
    prog.innerHTML = '';
    body.append(h('div', { class: 'result ' + (passed ? 'pass' : 'fail') },
      h('div', { class: 'res-emoji' }, passed ? '🎉' : '💪'),
      h('h3', {}, `Đạt ${stepsPassed}/${steps.length} tiêu chí lần đầu — ${score}%`),
      h('p', {}, passed ? (level < 4 ? 'Đạt ngưỡng! Đã mở cấp tiếp theo.' : 'Hoàn thành cả 4 cấp — xuất sắc!') : 'Chưa đạt 70%. Luyện lại để mở cấp sau.'),
      h('div', { class: 'row' },
        h('button', { class: 'btn ghost', onclick: () => viewLevel(level) }, '🔁 Làm lại'),
        h('button', { class: 'btn primary', onclick: () => viewHub() }, 'Về trang chính'),
      ),
    ));
  }

  // Nút AI sinh tình huống luyện tập bổ sung
  aiBox.append(h('button', { class: 'btn ai', onclick: () => loadAi(level, aiBox) }, '✨ Tình huống luyện thêm (AI)'));
  renderStep();
}

async function loadAi(level, box) {
  const btn = box.querySelector('button');
  btn.disabled = true; btn.textContent = 'AI đang soạn…';
  const res = await store.aiScenario(level);
  btn.disabled = false; btn.textContent = '✨ Tình huống luyện thêm (AI)';
  if (!res.ok) { flash(box, 'AI tạm không khả dụng, thử lại sau.'); return; }
  const sc = res.scenario;
  const card = h('div', { class: 'ai-card' });
  card.append(h('div', { class: 'ai-badge' }, '🤖 AI · cần giảng viên duyệt trước khi dùng lượng giá'));
  card.append(h('div', { class: 'ai-sit' }, sc.situation || ''));
  card.append(h('div', { class: 'prompt' }, sc.question || ''));
  const fb = h('div', { class: 'fb' });
  const opts = h('div', { class: 'opts' });
  (sc.options || []).forEach((label, oi) => {
    opts.append(h('button', { class: 'opt', onclick: () => {
      const ok = oi === (sc.answer ?? 0);
      fb.className = 'fb show ' + (ok ? 'ok' : 'bad');
      fb.textContent = (ok ? '✅ ' : '❌ ') + (sc.explain || '');
    } }, label));
  });
  card.append(opts, fb);
  const old = box.querySelector('.ai-card'); if (old) old.remove();
  box.append(card);
}
function flash(box, msg) { const f = h('div', { class: 'fb show bad' }, msg); box.append(f); setTimeout(() => f.remove(), 2500); }

// ============================ GAME (ghép cặp) ============================
function viewGame() {
  const pairs = shuffle(GAME_PAIRS).slice(0, 6); // chọn ngẫu nhiên 6 cặp mỗi lượt
  const drugs = pairs.map((p, i) => ({ ...p, i }));
  const groups = shuffle(pairs.map((p, i) => ({ ...p, i })));
  let selDrug = null, matched = 0, attempts = 0;
  const t0 = now();
  const wrap = h('div', {});
  wrap.append(h('div', { class: 'run-head' }, h('button', { class: 'btn ghost small', onclick: viewHub }, '← Về'), h('div', { class: 'run-title' }, '🃏 Ghép thuốc – nhóm tác dụng dược lý')));
  wrap.append(h('p', { class: 'muted' }, 'Bấm 1 thuốc bên trái rồi bấm nhóm đúng bên phải.'));
  const board = h('div', { class: 'game' });
  const colL = h('div', { class: 'gcol' });
  const colR = h('div', { class: 'gcol' });
  const status = h('div', { class: 'gstatus' }, `Đã ghép 0/${pairs.length}`);
  drugs.forEach(d => colL.append(h('button', { class: 'gcard', 'data-i': d.i, onclick: (e) => {
    if (e.target.classList.contains('done')) return;
    [...colL.children].forEach(c => c.classList.remove('sel')); e.target.classList.add('sel'); selDrug = d.i;
  } }, d.drug)));
  groups.forEach(g => colR.append(h('button', { class: 'gcard', 'data-i': g.i, onclick: (e) => {
    if (selDrug === null || e.target.classList.contains('done')) return;
    attempts++;
    if (g.i === selDrug) {
      e.target.classList.add('done'); colL.querySelector(`[data-i="${selDrug}"]`).classList.add('done');
      [...colL.children].forEach(c => c.classList.remove('sel')); selDrug = null; matched++;
      status.textContent = `Đã ghép ${matched}/${pairs.length}`;
      if (matched === pairs.length) endGame();
    } else { e.target.classList.add('shake'); setTimeout(() => e.target.classList.remove('shake'), 400); }
  } }, g.group)));
  board.append(colL, colR);
  wrap.append(status, board);
  mount(wrap);
  function endGame() {
    const dur = now() - t0;
    const acc = Math.round((pairs.length / attempts) * 100);
    store.logEvent({ level: 0, action: 'game', correct: true, attempts, timeMs: dur, detail: { matched, pairs: pairs.length } });
    status.append(h('div', { class: 'result pass', style: 'margin-top:12px' }, h('div', { class: 'res-emoji' }, '🎉'), h('h3', {}, `Hoàn thành! Độ chính xác ${acc}% · ${(dur / 1000).toFixed(0)}s`), h('button', { class: 'btn primary', onclick: viewHub }, 'Về trang chính')));
  }
}
function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }

// ============================ QUIZ (pre/post) ============================
function viewQuiz(phase) {
  const y = store.state.yearLevel;
  const bank = y === 2 ? QUIZ.filter(q => q.tag === 'nen' || q.tag === 'l1') : QUIZ;
  const picks = {};
  const wrap = h('div', {});
  wrap.append(h('div', { class: 'run-head' }, h('button', { class: 'btn ghost small', onclick: viewHub }, '← Về'), h('div', { class: 'run-title' }, (phase === 'pre' ? '📥 Bài đo TRƯỚC' : '📤 Bài đo SAU') + ` · ${bank.length} câu`)));
  wrap.append(h('p', { class: 'muted' }, 'Chọn 1 đáp án đúng nhất cho mỗi câu. Mỗi câu 1 điểm, quy về thang 10.'));
  const list = h('div', { class: 'quiz' });
  bank.forEach((q, qi) => {
    const item = h('div', { class: 'q' }, h('div', { class: 'q-t' }, `Câu ${qi + 1}. ${q.q}`));
    q.o.forEach((label, oi) => {
      const id = `q${q.id}o${oi}`;
      const row = h('label', { class: 'q-o', for: id },
        h('input', { type: 'radio', name: 'q' + q.id, id, onchange: () => { picks[q.id] = oi; } }),
        h('span', {}, label));
      item.append(row);
    });
    list.append(item);
  });
  const err = h('div', { class: 'err' });
  const submit = h('button', { class: 'btn primary', onclick: async () => {
    if (Object.keys(picks).length < bank.length) { err.textContent = `Còn ${bank.length - Object.keys(picks).length} câu chưa trả lời.`; return; }
    let nc = 0; const answers = bank.map(q => { const ok = picks[q.id] === q.a; if (ok) nc++; return { qid: q.id, pick: picks[q.id], correct: q.a, ok }; });
    submit.disabled = true; submit.textContent = 'Đang nộp…';
    const res = await store.saveTest({ phase, nQuestions: bank.length, nCorrect: nc, answers, formVariant: phase === 'pre' ? 'A' : 'B' });
    const score10 = res.score10 ?? Math.round((nc / bank.length) * 100) / 10;
    wrap.append(h('div', { class: 'result pass', style: 'margin-top:16px' }, h('div', { class: 'res-emoji' }, '✅'), h('h3', {}, `Đã nộp. Điểm: ${score10}/10 (${nc}/${bank.length} đúng)`), h('button', { class: 'btn primary', onclick: viewHub }, 'Về trang chính')));
    submit.disabled = true; submit.style.display = 'none'; err.textContent = '';
    window.scrollTo(0, document.body.scrollHeight);
  } }, 'Nộp bài');
  wrap.append(list, err, submit);
  mount(wrap);
}

// ============================ SURVEYS ============================
function viewSurveyMenu() {
  const wrap = h('div', {});
  wrap.append(h('div', { class: 'run-head' }, h('button', { class: 'btn ghost small', onclick: viewHub }, '← Về'), h('div', { class: 'run-title' }, '📊 Phiếu cuối buổi')));
  wrap.append(h('div', { class: 'grid' },
    tile('💡', SURVEYS.arcs.title, '16 nhận định · thang 5 mức', () => viewSurvey('arcs')),
    tile('🧠', SURVEYS.clt.title, '10 nhận định · thang 0–10', () => viewSurvey('clt')),
    tile('👍', SURVEYS.sus.title, '10 nhận định · thang 5 mức', () => viewSurvey('sus')),
  ));
  mount(wrap);
}
function viewSurvey(kind) {
  const cfg = SURVEYS[kind];
  const vals = {};
  const wrap = h('div', {});
  wrap.append(h('div', { class: 'run-head' }, h('button', { class: 'btn ghost small', onclick: viewSurveyMenu }, '← Về'), h('div', { class: 'run-title' }, cfg.title)));
  wrap.append(h('p', { class: 'muted' }, cfg.legend));
  const list = h('div', { class: 'survey' });
  const opts = kind === 'clt' ? Array.from({ length: 11 }, (_, i) => i) : [1, 2, 3, 4, 5];
  cfg.items.forEach((text, i) => {
    const row = h('div', { class: 'sv-item' }, h('div', { class: 'sv-text' }, `${i + 1}. ${text}`));
    const scale = h('div', { class: 'sv-scale' });
    opts.forEach(v => scale.append(h('button', { class: 'sv-b', onclick: (e) => {
      vals[i] = v; [...scale.children].forEach(c => c.classList.remove('on')); e.target.classList.add('on');
    } }, String(v))));
    row.append(scale); list.append(row);
  });
  const err = h('div', { class: 'err' });
  const submit = h('button', { class: 'btn primary', onclick: async () => {
    if (Object.keys(vals).length < cfg.items.length) { err.textContent = `Còn ${cfg.items.length - Object.keys(vals).length} mục chưa chọn.`; return; }
    const items = cfg.items.map((_, i) => ({ id: i, val: vals[i] }));
    let summary = {};
    if (kind === 'sus') { // mục lẻ (index chẵn) khẳng định: val-1; mục chẵn (index lẻ) phủ định: 5-val
      let sum = 0; items.forEach((it, i) => sum += (i % 2 === 0 ? it.val - 1 : 5 - it.val)); summary = { sus: Math.round(sum * 2.5 * 10) / 10 };
    } else { const avg = items.reduce((a, b) => a + b.val, 0) / items.length; summary = { mean: Math.round(avg * 100) / 100 }; }
    submit.disabled = true; submit.textContent = 'Đang lưu…';
    await store.saveSurvey({ kind, items, summary });
    wrap.append(h('div', { class: 'result pass', style: 'margin-top:16px' }, h('div', { class: 'res-emoji' }, '✅'), h('h3', {}, 'Đã ghi nhận. Cảm ơn bạn!' + (kind === 'sus' ? ` (SUS ${summary.sus}/100)` : '')), h('button', { class: 'btn primary', onclick: viewSurveyMenu }, 'Về danh sách phiếu')));
    submit.style.display = 'none'; err.textContent = ''; window.scrollTo(0, document.body.scrollHeight);
  } }, 'Gửi phiếu');
  wrap.append(list, err, submit);
  mount(wrap);
}

// ============================ BOOT ============================
store.loadLocal();
// ?test=1 hoặc ?demo=1 → vào thẳng chế độ dùng thử (mở sẵn 4 cấp, không khai báo).
const _q = new URLSearchParams(location.search);
if (_q.has('test') || _q.has('demo')) { store.enterTestMode(); viewHub(); }
else if (store.state.studentCode && (store.state.participantId || store.state.offline || store.state.testMode)) viewHub();
else viewEnroll();
