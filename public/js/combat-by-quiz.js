// Combat-by-quiz — Prodigy-style: gặp boss → trả lời quiz để tấn công.
// Usage: window.tziaCombat.start({ bossName, bossEmoji, bossHp, subjectId, questions: 5 })
//
// Mỗi câu đúng = -1 HP boss. Sai = -1 heart user. HP boss = 0 → thắng + drop.
// Heart user = 0 → thua. Tận dụng:
//   /api/quiz/adaptive-next  → fetch câu hỏi
//   /api/quiz/attempt        → chấm (server tự update IRT + tracking)
//   /api/engagement/spend-heart → khi sai

const CSS = `
  .tz-cb-bg {
    position: fixed; inset: 0; z-index: 700;
    background: radial-gradient(ellipse at center, rgba(15,23,42,0.85) 0%, rgba(2,6,23,0.96) 100%);
    backdrop-filter: blur(14px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 16px; color: #fff; font-family: 'Inter', system-ui, sans-serif;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .tz-cb-bg.open { opacity: 1; pointer-events: auto; }
  .tz-cb-arena {
    width: min(720px, 100%);
    background: linear-gradient(180deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%);
    border: 2px solid rgba(251,191,36,0.5);
    border-radius: 22px; padding: 24px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(251,191,36,0.25);
  }
  .tz-cb-boss {
    text-align: center; margin-bottom: 20px;
  }
  .tz-cb-boss .emo {
    font-size: 88px; line-height: 1; display: inline-block;
    filter: drop-shadow(0 8px 24px rgba(239,68,68,0.5));
    animation: tz-cb-bobble 2.4s ease-in-out infinite;
  }
  .tz-cb-boss.hit .emo { animation: tz-cb-hit 0.4s; }
  .tz-cb-boss .name {
    font-size: 22px; font-weight: 800; margin-top: 6px;
    background: linear-gradient(135deg, #fbbf24, #ef4444);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tz-cb-hp-bar {
    height: 14px; background: rgba(0,0,0,0.4); border-radius: 8px;
    overflow: hidden; margin-top: 10px; border: 1px solid rgba(255,255,255,0.15);
  }
  .tz-cb-hp-bar > i {
    display: block; height: 100%;
    background: linear-gradient(90deg, #ef4444, #fbbf24); transition: width 0.45s;
  }
  .tz-cb-hp-label { font-size: 12px; color: #fca5a5; margin-top: 4px; font-weight: 700; }
  @keyframes tz-cb-bobble {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  @keyframes tz-cb-hit {
    0% { transform: translateX(0); filter: brightness(1); }
    20% { transform: translateX(-12px); filter: brightness(2) hue-rotate(-30deg); }
    50% { transform: translateX(12px); filter: brightness(1.5); }
    100% { transform: translateX(0); filter: brightness(1); }
  }

  .tz-cb-q {
    margin-top: 20px; padding: 18px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
  }
  .tz-cb-q .text { font-size: 16px; font-weight: 600; line-height: 1.55; margin-bottom: 14px; }
  .tz-cb-q .opt {
    display: block; padding: 11px 14px; margin: 6px 0;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);
    border-radius: 10px; cursor: pointer; font-size: 14px;
    transition: background 0.12s, border-color 0.12s;
  }
  .tz-cb-q .opt:hover { background: rgba(251,191,36,0.10); border-color: rgba(251,191,36,0.4); }
  .tz-cb-q .opt.correct { background: rgba(34,197,94,0.20); border-color: #22c55e; }
  .tz-cb-q .opt.wrong { background: rgba(239,68,68,0.15); border-color: #ef4444; }
  .tz-cb-q .opt input { margin-right: 8px; }

  .tz-cb-status {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 14px; font-size: 13px; color: #cbd5e1;
  }
  .tz-cb-status .hearts { color: #ef4444; font-weight: 700; }
  .tz-cb-status .qno { color: #fbbf24; font-weight: 700; }
  .tz-cb-actions { display: flex; gap: 10px; margin-top: 14px; }
  .tz-cb-actions button {
    flex: 1; padding: 11px 16px; border-radius: 12px; border: none;
    cursor: pointer; font: 800 14px 'Inter', system-ui, sans-serif;
  }
  .tz-cb-actions .attack {
    background: linear-gradient(135deg, #ef4444, #fbbf24); color: #1e293b;
    box-shadow: 0 8px 24px rgba(239,68,68,0.35);
  }
  .tz-cb-actions .attack:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }
  .tz-cb-actions .flee { background: rgba(255,255,255,0.08); color: #cbd5e1; }

  .tz-cb-result {
    text-align: center; padding: 30px 20px;
  }
  .tz-cb-result .big { font-size: 64px; }
  .tz-cb-result h2 {
    font-size: 28px; margin: 10px 0 6px;
    background: linear-gradient(135deg, #fbbf24, #ec4899);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tz-cb-result .drop {
    display: inline-block; background: rgba(251,191,36,0.15);
    border: 1px solid rgba(251,191,36,0.4); border-radius: 999px;
    padding: 8px 18px; font-weight: 700; margin: 12px 0;
    color: #fde68a;
  }
  .tz-cb-result button {
    background: linear-gradient(135deg, #fbbf24, #f97316);
    color: #1e293b; border: none; cursor: pointer;
    padding: 12px 28px; border-radius: 14px; font: 800 14px 'Inter', system-ui, sans-serif;
    margin-top: 8px;
  }
`;

class CombatByQuiz {
  constructor() {
    this.injectCss();
    this.mount();
  }

  injectCss() {
    if (document.getElementById('tz-cb-css')) return;
    const s = document.createElement('style');
    s.id = 'tz-cb-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  mount() {
    const bg = document.createElement('div');
    bg.className = 'tz-cb-bg';
    bg.innerHTML = `<div class="tz-cb-arena" data-arena></div>`;
    document.body.appendChild(bg);
    this.bg = bg;
    this.arena = bg.querySelector('[data-arena]');
  }

  async start({ bossName = 'Boss bí ẩn', bossEmoji = '👾', bossHp = 5, subjectId = '', rewardCoin = 50, rewardXp = 80 }) {
    this.state = {
      bossName, bossEmoji, bossHp, bossHpMax: bossHp,
      subjectId, rewardCoin, rewardXp,
      hearts: 5,                // local hearts cho combat (không spam server)
      qNo: 0, qMax: bossHp + 3, // tối đa số câu = HP + 3 (margin)
      excludeIds: [], currentQ: null,
      selected: null, answered: false,
    };
    this.bg.classList.add('open');
    await this.loadHearts();
    await this.loadQuestion();
    this.render();
  }

  close() { this.bg.classList.remove('open'); }

  async loadHearts() {
    try {
      const r = await fetch('/api/engagement/state', { credentials: 'same-origin' });
      if (r.ok) { const d = await r.json(); this.state.hearts = d.hearts; }
    } catch {}
  }

  async loadQuestion() {
    try {
      const r = await fetch('/api/quiz/adaptive-next', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_id: this.state.subjectId, exclude_ids: this.state.excludeIds }),
        credentials: 'same-origin',
      });
      if (!r.ok) { this.state.currentQ = null; return; }
      const d = await r.json();
      this.state.currentQ = d.question;
      this.state.selected = null;
      this.state.answered = false;
    } catch {
      this.state.currentQ = null;
    }
  }

  render() {
    const s = this.state;
    if (!s.currentQ) {
      this.arena.innerHTML = `<p style="text-align:center;color:#cbd5e1">Không tải được câu hỏi. <button onclick="window.tziaCombat?.close?.()" style="margin-left:8px;background:#fbbf24;color:#1e293b;border:none;padding:6px 14px;border-radius:8px;cursor:pointer">Đóng</button></p>`;
      return;
    }
    const hpPct = Math.round((s.bossHp / s.bossHpMax) * 100);
    const q = s.currentQ;
    const answers = q.answers || q.options || [];
    this.arena.innerHTML = `
      <div class="tz-cb-boss" data-boss>
        <div class="emo">${s.bossEmoji}</div>
        <div class="name">${esc(s.bossName)}</div>
        <div class="tz-cb-hp-bar"><i style="width:${hpPct}%"></i></div>
        <div class="tz-cb-hp-label">❤ HP ${s.bossHp}/${s.bossHpMax}</div>
      </div>
      <div class="tz-cb-q">
        <div class="text">${esc(q.question || q.body || '?')}</div>
        ${answers.map((a, i) => `
          <label class="opt" data-val="${esc(a.id || a.value || i)}">
            <input type="radio" name="cb-ans" value="${esc(a.id || a.value || i)}">
            ${esc(a.text || a.label || String(a))}
          </label>
        `).join('')}
      </div>
      <div class="tz-cb-status">
        <span class="hearts">❤ ${s.hearts}</span>
        <span class="qno">Câu ${s.qNo + 1}/${s.qMax}</span>
      </div>
      <div class="tz-cb-actions">
        <button class="attack" data-attack disabled>⚔ Tấn công</button>
        <button class="flee" data-flee>🏃 Chạy trốn</button>
      </div>
    `;
    this.arena.querySelectorAll('.opt').forEach(o => {
      o.addEventListener('click', () => {
        if (this.state.answered) return;
        this.arena.querySelectorAll('.opt').forEach(x => x.classList.remove('selected'));
        o.style.background = 'rgba(251,191,36,0.18)';
        o.querySelector('input').checked = true;
        this.state.selected = o.dataset.val;
        this.arena.querySelector('[data-attack]').disabled = false;
      });
    });
    this.arena.querySelector('[data-attack]').addEventListener('click', () => this.attack());
    this.arena.querySelector('[data-flee]').addEventListener('click', () => this.flee());
  }

  async attack() {
    const s = this.state;
    if (!s.currentQ || s.selected == null || s.answered) return;
    s.answered = true;
    try {
      const r = await fetch('/api/quiz/attempt', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question_id: s.currentQ.id, answer: s.selected }),
        credentials: 'same-origin',
      });
      const d = await r.json();
      const correct = !!d.correct;
      // Highlight đúng/sai
      this.arena.querySelectorAll('.opt').forEach(o => {
        const v = String(o.dataset.val);
        if ((d.correct_answers || []).map(String).includes(v)) o.classList.add('correct');
        else if (v === String(s.selected) && !correct) o.classList.add('wrong');
      });

      s.excludeIds.push(s.currentQ.id);
      s.qNo += 1;

      if (correct) {
        s.bossHp = Math.max(0, s.bossHp - 1);
        const boss = this.arena.querySelector('[data-boss]');
        boss.classList.add('hit');
        setTimeout(() => boss.classList.remove('hit'), 400);
      } else {
        s.hearts = Math.max(0, s.hearts - 1);
        // Spend server heart background (best-effort)
        fetch('/api/engagement/spend-heart', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
      }

      // Animate boss hp bar
      const fill = this.arena.querySelector('.tz-cb-hp-bar > i');
      if (fill) fill.style.width = Math.round((s.bossHp / s.bossHpMax) * 100) + '%';
      const lbl = this.arena.querySelector('.tz-cb-hp-label');
      if (lbl) lbl.textContent = `❤ HP ${s.bossHp}/${s.bossHpMax}`;
      const hh = this.arena.querySelector('.hearts');
      if (hh) hh.textContent = `❤ ${s.hearts}`;

      // End conditions
      await new Promise(r => setTimeout(r, 900));
      if (s.bossHp <= 0) return this.win();
      if (s.hearts <= 0) return this.lose();
      if (s.qNo >= s.qMax) return this.lose('Hết lượt: boss chạy mất rồi!');

      // Câu kế tiếp
      await this.loadQuestion();
      this.render();
    } catch (e) {
      console.warn('[combat] attack', e);
    }
  }

  flee() {
    this.arena.innerHTML = `
      <div class="tz-cb-result">
        <div class="big">🏃</div>
        <h2>Em đã rút lui</h2>
        <p style="color:#cbd5e1">Quay lại sau khi luyện tập thêm nhé.</p>
        <button data-close>Đóng</button>
      </div>
    `;
    this.arena.querySelector('[data-close]').addEventListener('click', () => this.close());
  }

  async win() {
    const s = this.state;
    // Reward — claim quest minigame nếu chưa, hoặc gọi /api/engagement/track
    try { await fetch('/api/engagement/track', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({kind:'minigame', amount: 1}), credentials:'same-origin' }); } catch {}
    this.arena.innerHTML = `
      <div class="tz-cb-result">
        <div class="big">🏆</div>
        <h2>Em đã hạ ${esc(s.bossName)}!</h2>
        <div class="drop">+${s.rewardCoin} 🪙 · +${s.rewardXp} ✨ · drop skin ngẫu nhiên</div>
        <p style="color:#cbd5e1">Trận chiến đã được ghi vào nhật ký học tập.</p>
        <button data-close>Tuyệt vời! ✨</button>
      </div>
    `;
    this.arena.querySelector('[data-close]').addEventListener('click', () => this.close());
    // Refresh HUD + pet
    try { window.__tziaEngagementHud?.refresh(); } catch {}
    try { window.__tziaPetWidget?.refresh(); } catch {}
  }

  lose(msg) {
    this.arena.innerHTML = `
      <div class="tz-cb-result">
        <div class="big">💀</div>
        <h2>${esc(msg || 'Em đã thua trận này')}</h2>
        <p style="color:#cbd5e1">Đừng nản, ôn lại bài rồi quay lại boss này nhé.</p>
        <button data-close>Thử lại sau</button>
      </div>
    `;
    this.arena.querySelector('[data-close]').addEventListener('click', () => this.close());
  }
}

function esc(s) { return String(s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

if (!window.tziaCombat) window.tziaCombat = new CombatByQuiz();

export { CombatByQuiz };
