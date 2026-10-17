/* GAP 6 — Student-side bridge cho real-time orchestration.
 *
 * Mọi trang HS đều có thể nhúng để:
 *   1. Tham gia 1 class code → server biết HS đang ở đâu (page=<file>).
 *   2. Nhận lệnh GV: gather (chuyển trang), broadcast (toast), pin-task (banner), open-quiz (link).
 *   3. Gửi raise-hand khi HS bí.
 *
 * Tự kết nối nếu URL có ?room=<code> hoặc localStorage 'class.code'.
 * Tự reconnect khi mất WS.
 */

(function () {
  if (typeof window === 'undefined') return;
  if (window.EduOrchestrate) return;

  const KEY_CLASS = 'class.code';
  const KEY_NAME = 'player.name';

  function getClassCode() {
    const url = new URLSearchParams(location.search).get('room');
    if (url) {
      try { localStorage.setItem(KEY_CLASS, url.toUpperCase()); } catch {}
      return url.toUpperCase();
    }
    try {
      const h = (location.hash || '').match(/room=([A-Z0-9]+)/i);
      if (h) {
        localStorage.setItem(KEY_CLASS, h[1].toUpperCase());
        return h[1].toUpperCase();
      }
    } catch {}
    try { return (localStorage.getItem(KEY_CLASS) || '').toUpperCase(); } catch { return ''; }
  }
  function getName() {
    // Ưu tiên tên đã được auth.js syncToLocal set (tizia:playerName) để mỗi user
    // hiện ra trong roster GV bằng tên thật. KEY_NAME ('player.name') giữ làm
    // fallback cho code legacy.
    try {
      return localStorage.getItem('tizia:playerName')
          || localStorage.getItem(KEY_NAME)
          || 'Ẩn danh';
    } catch { return 'Ẩn danh'; }
  }
  function pageName() {
    return (location.pathname.split('/').pop() || 'index.html').replace(/^\//, '');
  }

  const wsUrl = () => {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const base = location.pathname.includes('/ps/') ? '/ps' : '';
    return `${proto}//${location.host}${base}/ws-orchestrate`;
  };

  let ws = null;
  let alive = false;
  let reconnectTimer = null;
  let backoff = 1500;

  function connect() {
    const classCode = getClassCode();
    if (!classCode) return;
    try {
      ws = new WebSocket(wsUrl());
    } catch (e) {
      console.warn('[orchestrate] ws fail:', e); scheduleReconnect(); return;
    }
    ws.onopen = () => {
      alive = true; backoff = 1500;
      ws.send(JSON.stringify({
        type: 'join', role: 'student',
        name: getName(), classCode,
      }));
      ws.send(JSON.stringify({ type: 'location', page: pageName() }));
    };
    ws.onmessage = (ev) => {
      let msg; try { msg = JSON.parse(ev.data); } catch { return; }
      handleServerMsg(msg);
    };
    ws.onclose = () => { alive = false; scheduleReconnect(); };
    ws.onerror = () => { alive = false; };
  }
  function scheduleReconnect() {
    if (reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      backoff = Math.min(backoff * 1.5, 30000);
      connect();
    }, backoff);
  }

  function handleServerMsg(msg) {
    if (msg.type === 'teacher-broadcast') {
      showToast('📣 ' + (msg.from || 'GV') + ': ' + msg.text, 'info', 6000);
    } else if (msg.type === 'teacher-gather') {
      // Khi GV gọi về 1 trang
      showToast('🔔 ' + (msg.from || 'GV') + ' gọi cả lớp về: ' + msg.target, 'warn', 8000);
      const target = String(msg.target || '').trim();
      if (target && target !== pageName()) {
        setTimeout(() => {
          if (/^https?:/.test(target)) location.href = target;
          else location.href = './' + target.replace(/^\.?\//, '');
        }, 3500);
      }
    } else if (msg.type === 'teacher-pinned') {
      renderPinnedBanner(msg.task);
    } else if (msg.type === 'teacher-quiz') {
      if (msg.quizId) showToast('📝 GV mở quiz: ' + msg.quizId + 'bấm để vào', 'info', 12000, () => {
        location.href = './quiz.html?id=' + encodeURIComponent(msg.quizId);
      });
    } else if (msg.type === 'kicked') {
      showToast('⛔ Bạn đã bị mời ra khỏi lớp bởi ' + (msg.from || 'GV'), 'danger', 10000);
    }
  }

  // === Public API ===
  function raiseHand() {
    if (alive && ws) ws.send(JSON.stringify({ type: 'raise-hand' }));
  }
  function sendProgress({ score, correct, total }) {
    if (alive && ws) ws.send(JSON.stringify({ type: 'progress', score, correct, total }));
  }
  function sendStatus(state) {
    if (alive && ws) ws.send(JSON.stringify({ type: 'status', state }));
  }

  window.EduOrchestrate = { raiseHand, sendProgress, sendStatus, classCode: getClassCode };

  // === UI ===
  function showToast(text, kind, ttl, onClick) {
    const el = document.createElement('div');
    Object.assign(el.style, {
      position: 'fixed', left: '50%', top: '20px', transform: 'translateX(-50%)',
      zIndex: 99999, padding: '12px 22px', borderRadius: '12px',
      fontSize: '14px', fontWeight: '600', color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif',
      boxShadow: '0 10px 28px rgba(0,0,0,0.4)',
      background: kind === 'danger' ? 'linear-gradient(135deg,#ef4444,#dc2626)'
        : kind === 'warn' ? 'linear-gradient(135deg,#f97316,#dc2626)'
        : 'linear-gradient(135deg,#fbbf24,#f97316)',
      maxWidth: '90vw', cursor: onClick ? 'pointer' : 'default',
      animation: 'eduOrcToastIn 0.25s ease-out',
    });
    el.textContent = text;
    if (onClick) el.addEventListener('click', onClick);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ttl || 5000);
  }

  function renderPinnedBanner(task) {
    let b = document.getElementById('edu-orc-pinned');
    if (!task) { if (b) b.remove(); return; }
    if (!b) {
      b = document.createElement('div');
      b.id = 'edu-orc-pinned';
      Object.assign(b.style, {
        position: 'fixed', left: '0', right: '0', top: '0', zIndex: 99997,
        padding: '8px 18px', textAlign: 'center', fontSize: '13px',
        background: 'linear-gradient(90deg, #0ea5e9, #6366f1)',
        color: 'white', fontWeight: '600', fontFamily: 'Inter, system-ui, sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      });
      document.body.appendChild(b);
    }
    b.innerHTML = '📌 ' + escapeHtml(task);
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
  }

  // Inject @keyframes once
  if (!document.getElementById('edu-orc-style')) {
    const st = document.createElement('style');
    st.id = 'edu-orc-style';
    st.textContent = '@keyframes eduOrcToastIn{from{transform:translate(-50%,-20px);opacity:0}to{transform:translate(-50%,0);opacity:1}}';
    document.head.appendChild(st);
  }

  // Hand button (floating, only when in a class)
  if (getClassCode()) {
    const btn = document.createElement('button');
    btn.id = 'edu-orc-hand';
    btn.title = 'Giơ tay xin GV trợ giúp';
    btn.textContent = '✋';
    Object.assign(btn.style, {
      position: 'fixed', left: '18px', bottom: '90px', zIndex: 99996,
      width: '50px', height: '50px', borderRadius: '50%',
      border: 'none', cursor: 'pointer', fontSize: '22px',
      background: 'rgba(255,255,255,0.12)', color: 'white',
      backdropFilter: 'blur(6px)',
    });
    btn.addEventListener('click', () => {
      raiseHand();
      btn.style.background = 'rgba(251,191,36,0.5)';
      setTimeout(() => { btn.style.background = 'rgba(255,255,255,0.12)'; }, 1500);
    });
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(btn));
    if (document.body) document.body.appendChild(btn);
  }

  // Connect when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connect);
  } else {
    connect();
  }
})();
