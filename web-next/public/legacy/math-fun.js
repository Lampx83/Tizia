// ============================================================
// math-fun.js — WRAP-MOUNT engine (nguyên văn khối <script type="module">
// inline của public/math-fun.html). KHÔNG dịch sang React.
//
// KHÁC BIỆT DUY NHẤT so với bản gốc: 2 dòng import đổi từ relative
// './js/scenarios/...' → absolute '/js/scenarios/...'. Lý do: file này phục vụ
// tại /legacy/math-fun.js, nếu giữ './js/...' trình duyệt sẽ resolve thành
// /legacy/js/scenarios/... (sai). Absolute path resolve qua next.config fallback
// proxy sang Express (đường dẫn /js/* giữ nguyên).
//
// Scenario math2-fun.js / math6-quest.js tự fetch content chủ đề toán từ DB
// (/api/content/math2-topics, /api/content/math6-topics) → không có content
// hardcode trong file này.
// ============================================================
import { loadMath2Topics } from '/js/scenarios/math2-fun.js';
import { loadMath6Topics } from '/js/scenarios/math6-quest.js';
// Data chủ đề toán từ DB (/api/content/math2-topics, math6-topics).
const { index: MATH2_INDEX, getById: getMath2Topic } = await loadMath2Topics();
const { index: MATH6_INDEX, getById: getMath6Topic } = await loadMath6Topics();

const $ = id => document.getElementById(id);
const COL_SHADOW = { '#fbbf24': '#f59e0b', '#10b981': '#059669', '#0ea5e9': '#0284c7', '#a855f7': '#9333ea', '#f97316': '#ea580c', '#22d3ee': '#06b6d4', '#84cc16': '#65a30d', '#3b82f6': '#2563eb', '#ec4899': '#db2777', '#ef4444': '#dc2626', '#8b5cf6': '#7c3aed', '#f59e0b': '#d97706', '#06b6d4': '#0891b2', '#d946ef': '#c026d3', '#0891b2': '#0e7490', '#fde047': '#eab308' };

// ============================================================
// HOME
// ============================================================
window.enterGrade = (g) => {
  $('home').style.display = 'none';
  if (g === 2) {
    $('g2-mode').style.display = 'block';
    $('pet').style.display = 'flex';
    renderG2List();
  } else {
    $('g6-mode').style.display = 'block';
    renderG6List();
  }
};
window.goHome = () => {
  $('g2-mode').style.display = 'none';
  $('g6-mode').style.display = 'none';
  $('pet').style.display = 'none';
  $('home').style.display = 'flex';
  if (g2State.timerId) { clearInterval(g2State.timerId); g2State.timerId = null; }
  if (g6State.timerId) { clearInterval(g6State.timerId); g6State.timerId = null; }
};

// ============================================================
// LỚP 2 — KID MODE
// ============================================================
const g2State = {
  topic: null, qIdx: 0, correct: 0, stars: 0, total: 0,
  timerId: null, timeLeft: 0, answered: false,
};

function renderG2List() {
  $('g2-quiz').style.display = 'none';
  $('g2-result').classList.remove('show');
  $('g2-topics-wrap').style.display = 'block';
  $('g2-timer').classList.remove('show');
  const totalStars = +(localStorage.getItem('math2.stars') || 0);
  const totalCorrect = +(localStorage.getItem('math2.correct') || 0);
  $('g2-stars').textContent = totalStars;
  $('g2-correct').textContent = totalCorrect;

  $('g2-topics').innerHTML = MATH2_INDEX.map(t => {
    const stars = +(localStorage.getItem('math2.topic.' + t.id) || 0);
    const sh = COL_SHADOW[t.color] || t.color;
    return `
      <div class="topic-card" style="--topic-color:${t.color};--topic-shadow:${sh};" onclick="g2StartTopic('${t.id}')">
        <div class="mascot-big">${t.mascot}</div>
        <h3>${t.title}</h3>
        <div class="intro">${t.intro}</div>
        <div class="meta">
          <div class="star-row">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div>
          <div class="qcount">${t.questionCount} câu</div>
        </div>
      </div>`;
  }).join('');
}

window.g2StartTopic = (id) => {
  g2State.topic = getMath2Topic(id);
  g2State.qIdx = 0; g2State.correct = 0; g2State.stars = 0;
  g2State.total = g2State.topic.questions.length;
  $('g2-topics-wrap').style.display = 'none';
  $('g2-result').classList.remove('show');
  $('g2-quiz').style.display = 'block';
  if (g2State.topic.mode === 'time-attack') {
    g2State.timeLeft = 60;
    $('g2-timer').classList.add('show');
    $('g2-time').textContent = g2State.timeLeft;
    g2State.timerId = setInterval(() => {
      g2State.timeLeft--;
      $('g2-time').textContent = g2State.timeLeft;
      if (g2State.timeLeft <= 10) $('g2-timer').classList.add('urgent');
      if (g2State.timeLeft <= 0) { clearInterval(g2State.timerId); g2Finish(); }
    }, 1000);
  } else {
    $('g2-timer').classList.remove('show', 'urgent');
  }
  renderG2Question();
  petSay('Cố lên nào! 🎉');
};

function renderG2Question() {
  const t = g2State.topic;
  const q = t.questions[g2State.qIdx];
  if (!q) { g2Finish(); return; }
  $('g2-q-mascot').textContent = t.mascot;
  const pct = (g2State.qIdx / t.questions.length) * 100;
  $('g2-q-progress').style.width = pct + '%';
  $('g2-q-progress-text').textContent = (g2State.qIdx + 1) + '/' + t.questions.length;
  $('g2-q-stars').innerHTML = '⭐'.repeat(g2State.correct);
  $('g2-q-stem').textContent = q.stem;
  $('g2-q-opts').innerHTML = q.choices.map((c, i) => `
    <button class="opt-btn c${String.fromCharCode(65+i)}" onclick="g2Answer(${i})">${c}</button>
  `).join('');
  $('g2-q-explain').classList.remove('show');
  $('g2-q-next').classList.remove('show');
  g2State.answered = false;
}

window.g2Answer = (i) => {
  if (g2State.answered) return;
  g2State.answered = true;
  const q = g2State.topic.questions[g2State.qIdx];
  const btns = $('g2-q-opts').querySelectorAll('.opt-btn');
  btns.forEach((b, j) => {
    if (j === q.answer) b.classList.add('correct');
    else if (j === i) b.classList.add('wrong');
    b.style.pointerEvents = 'none';
  });
  if (i === q.answer) {
    g2State.correct++;
    spawnConfetti();
    petCelebrate('Đúng rồi! 🌟');
    playSound('correct');
  } else {
    petSay('Lần sau nhé 💖');
    playSound('wrong');
  }
  $('g2-q-explain').textContent = '💡 ' + q.explanation;
  $('g2-q-explain').classList.add('show');
  $('g2-q-next').classList.add('show');
};

window.g2Next = () => {
  g2State.qIdx++;
  if (g2State.qIdx >= g2State.topic.questions.length) g2Finish();
  else renderG2Question();
};

function g2Finish() {
  if (g2State.timerId) { clearInterval(g2State.timerId); g2State.timerId = null; }
  const pct = g2State.correct / g2State.total;
  const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0;
  // Save
  const prev = +(localStorage.getItem('math2.topic.' + g2State.topic.id) || 0);
  if (stars > prev) localStorage.setItem('math2.topic.' + g2State.topic.id, stars);
  const totalStars = +(localStorage.getItem('math2.stars') || 0);
  localStorage.setItem('math2.stars', totalStars + stars);
  const totalCorrect = +(localStorage.getItem('math2.correct') || 0);
  localStorage.setItem('math2.correct', totalCorrect + g2State.correct);
  // Adaptive bridge
  try { window.EduAdaptive?.event({ skill: 'math2-' + g2State.topic.id, correct: pct >= 0.7, domain: 'school', context: 'g2' }); } catch {}
  // Result
  $('g2-quiz').style.display = 'none';
  $('g2-result').classList.add('show');
  $('g2-r-emo').textContent = stars >= 3 ? '🏆' : stars >= 2 ? '🌟' : stars >= 1 ? '👍' : '💪';
  $('g2-r-title').textContent = stars >= 3 ? 'Tuyệt vời!' : stars >= 2 ? 'Giỏi quá!' : stars >= 1 ? 'Khá lắm!' : 'Cố gắng lần sau';
  $('g2-r-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3-stars);
  $('g2-r-score').textContent = g2State.correct + '/' + g2State.total;
  $('g2-r-pet').textContent = '+1 thẻ ' + g2State.topic.mascot;
  $('g2-r-xp').textContent = '+' + stars + ' sao';
  $('g2-r-msg').textContent = stars >= 3 ? 'Em thật xuất sắc! Bé sóc thưởng cho em 1 hạt dẻ vàng!' :
                              stars >= 2 ? 'Em làm rất giỏi! Tiếp tục phát huy nhé.' :
                              'Em làm tốt! Lần sau chắc chắn sẽ tốt hơn nữa.';
  spawnConfetti(50);
}

window.g2Restart = () => g2StartTopic(g2State.topic.id);
window.g2BackToList = () => renderG2List();

// ============================================================
// LỚP 6 — RPG QUEST
// ============================================================
const g6State = {
  topic: null, qIdx: 0, correct: 0, total: 0,
  streak: 0, maxStreak: 0, combo: 0,
  timerId: null, timeLeft: 0, answered: false,
};

function renderG6List() {
  $('g6-quiz').style.display = 'none';
  $('g6-result').classList.remove('show');
  $('g6-topics-wrap').style.display = 'block';
  $('g6-timer').classList.remove('show');
  const gold = +(localStorage.getItem('math6.gold') || 0);
  const xp = +(localStorage.getItem('math6.xp') || 0);
  const streak = +(localStorage.getItem('math6.maxStreak') || 0);
  $('g6-gold').textContent = gold;
  $('g6-xp').textContent = xp;
  $('g6-streak').textContent = streak;

  $('g6-topics').innerHTML = MATH6_INDEX.map(t => {
    const completed = +(localStorage.getItem('math6.topic.' + t.id) || 0) > 0;
    const diffDots = Array.from({length: 3}, (_, i) => `<span class="${i < t.difficulty ? 'on' : ''}"></span>`).join('');
    return `
      <div class="topic-card${completed ? ' completed' : ''}" style="--topic-color:${t.color};" onclick="g6StartTopic('${t.id}')">
        <div class="boss-emo">${t.boss}</div>
        <h3>${t.title}</h3>
        <div class="intro">${t.intro}</div>
        <div class="footer">
          <div class="difficulty">${diffDots}</div>
          <div class="xp-badge">+${t.xpReward} XP</div>
        </div>
      </div>`;
  }).join('');
}

window.g6StartTopic = (id) => {
  g6State.topic = getMath6Topic(id);
  g6State.qIdx = 0; g6State.correct = 0;
  g6State.streak = 0; g6State.maxStreak = 0; g6State.combo = 0;
  g6State.total = g6State.topic.questions.length;
  $('g6-topics-wrap').style.display = 'none';
  $('g6-result').classList.remove('show');
  $('g6-quiz').style.display = 'block';
  $('g6-quiz-card', undefined);
  document.querySelector('.grade6-mode .quiz-card').style.setProperty('--topic-color', g6State.topic.color);
  if (g6State.topic.mode === 'time-attack') {
    g6State.timeLeft = 90;
    $('g6-timer').classList.add('show');
    $('g6-time').textContent = g6State.timeLeft;
    g6State.timerId = setInterval(() => {
      g6State.timeLeft--;
      $('g6-time').textContent = g6State.timeLeft;
      if (g6State.timeLeft <= 15) $('g6-timer').classList.add('urgent');
      if (g6State.timeLeft <= 0) { clearInterval(g6State.timerId); g6Finish(); }
    }, 1000);
  } else {
    $('g6-timer').classList.remove('show', 'urgent');
  }
  renderG6Question();
};

function renderG6Question() {
  const t = g6State.topic;
  const q = t.questions[g6State.qIdx];
  if (!q) { g6Finish(); return; }
  $('g6-q-boss').textContent = t.boss;
  $('g6-q-title').textContent = t.title;
  const pct = (g6State.qIdx / t.questions.length) * 100;
  $('g6-q-progress').style.width = pct + '%';
  $('g6-q-progress-text').textContent = (g6State.qIdx + 1) + '/' + t.questions.length;
  if (g6State.combo >= 2) {
    $('g6-q-combo').textContent = '🔥 Combo ×' + g6State.combo;
    $('g6-q-combo').classList.add('show');
  } else {
    $('g6-q-combo').classList.remove('show');
  }
  $('g6-q-stem').textContent = q.stem;
  $('g6-q-opts').innerHTML = q.choices.map((c, i) => `
    <button class="opt-btn" onclick="g6Answer(${i})">
      <span class="key">${String.fromCharCode(65+i)}</span>
      <span>${c}</span>
    </button>
  `).join('');
  $('g6-q-explain').classList.remove('show');
  $('g6-q-next').classList.remove('show');
  g6State.answered = false;
}

window.g6Answer = (i) => {
  if (g6State.answered) return;
  g6State.answered = true;
  const q = g6State.topic.questions[g6State.qIdx];
  const btns = $('g6-q-opts').querySelectorAll('.opt-btn');
  btns.forEach((b, j) => {
    if (j === q.answer) b.classList.add('correct');
    else if (j === i) b.classList.add('wrong');
    b.style.pointerEvents = 'none';
  });
  if (i === q.answer) {
    g6State.correct++;
    g6State.streak++;
    g6State.combo = g6State.streak;
    if (g6State.streak > g6State.maxStreak) g6State.maxStreak = g6State.streak;
    if (g6State.streak >= 3) spawnConfetti(30);
    playSound('correct');
  } else {
    g6State.streak = 0;
    g6State.combo = 0;
    playSound('wrong');
  }
  $('g6-q-explain').textContent = '📜 ' + q.explanation;
  $('g6-q-explain').classList.add('show');
  $('g6-q-next').classList.add('show');
};

window.g6Next = () => {
  g6State.qIdx++;
  if (g6State.qIdx >= g6State.topic.questions.length) g6Finish();
  else renderG6Question();
};

function g6Finish() {
  if (g6State.timerId) { clearInterval(g6State.timerId); g6State.timerId = null; }
  const pct = g6State.correct / g6State.total;
  const baseXp = g6State.topic.xpReward || 100;
  const xpEarned = Math.round(baseXp * pct * (1 + g6State.maxStreak * 0.05));
  const goldEarned = Math.round(g6State.correct * 5 * (1 + (pct >= 0.9 ? 0.5 : 0)));
  // Save
  const prevBest = +(localStorage.getItem('math6.topic.' + g6State.topic.id) || 0);
  if (g6State.correct > prevBest) localStorage.setItem('math6.topic.' + g6State.topic.id, g6State.correct);
  const totalGold = +(localStorage.getItem('math6.gold') || 0);
  const totalXp = +(localStorage.getItem('math6.xp') || 0);
  const oldMaxStreak = +(localStorage.getItem('math6.maxStreak') || 0);
  localStorage.setItem('math6.gold', totalGold + goldEarned);
  localStorage.setItem('math6.xp', totalXp + xpEarned);
  if (g6State.maxStreak > oldMaxStreak) localStorage.setItem('math6.maxStreak', g6State.maxStreak);
  try { window.EduAdaptive?.event({ skill: 'math6-' + g6State.topic.id, correct: pct >= 0.7, domain: 'school', context: 'g6' }); } catch {}
  // Result
  $('g6-quiz').style.display = 'none';
  $('g6-result').classList.add('show');
  const win = pct >= 0.7;
  $('g6-r-emo').textContent = pct >= 0.9 ? '👑' : win ? '⚔️' : '💀';
  $('g6-r-title').textContent = pct >= 0.9 ? 'Boss bị tiêu diệt!' : win ? 'Chiến thắng!' : 'Bại trận — thử lại!';
  $('g6-r-score').textContent = g6State.correct + '/' + g6State.total;
  $('g6-r-xp').textContent = xpEarned;
  $('g6-r-gold').textContent = goldEarned;
  $('g6-r-combo').textContent = g6State.maxStreak;
  $('g6-r-msg').textContent = pct >= 0.9 ? 'Boss bị đánh bại hoàn toàn! Em là hiệp sĩ số học xuất sắc!' :
                              win ? 'Em đã đánh bại boss! Tiếp tục hành trình.' :
                              'Boss còn quá mạnh. Luyện thêm rồi quay lại nhé!';
  if (win) spawnConfetti(50);
}

window.g6Restart = () => g6StartTopic(g6State.topic.id);
window.g6BackToList = () => renderG6List();

// ============================================================
// EFFECTS
// ============================================================
function spawnConfetti(count = 25) {
  const colors = ['#fbbf24', '#ec4899', '#10b981', '#6366f1', '#f97316', '#06b6d4'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.top = '-20px';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = (Math.random() * 0.3) + 's';
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

// Simple beep via WebAudio
let audioCtx = null;
function playSound(kind) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    if (kind === 'correct') {
      osc.frequency.setValueAtTime(523, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(784, audioCtx.currentTime + 0.15); // G5
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start(); osc.stop(audioCtx.currentTime + 0.25);
    } else {
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start(); osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch {}
}

// Pet companion
const PET_LINES = ['Em làm tốt lắm! 🌟', 'Cố lên nào! 💪', 'Suy nghĩ kỹ nhé 🤔', 'Tuyệt vời ông mặt trời! ☀️', 'Đỉnh thật! 🎉', 'Bé sóc tự hào về em!'];
window.petTalk = () => petSay(PET_LINES[Math.floor(Math.random() * PET_LINES.length)]);
function petSay(msg) {
  $('pet-speech').textContent = msg;
  $('pet-speech').classList.add('show');
  setTimeout(() => $('pet-speech').classList.remove('show'), 2500);
}
function petCelebrate(msg) {
  petSay(msg);
  $('pet').classList.add('celebrate');
  setTimeout(() => $('pet').classList.remove('celebrate'), 600);
}
