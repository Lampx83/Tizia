/* GAP 1 — AI Tutor floating button (TIẾNG VIỆT, có voice TTS/STT)
 *
 * Sử dụng:
 *   <script src="./js/tutor-floating.js" data-domain="pharmacy" data-grade="11"></script>
 *
 * Hoặc khởi tạo thủ công:
 *   window.EduTutor.mount({ domain: 'it', grade: 11, context: 'lab-sql' });
 *
 * Backend: gọi POST /api/ai/tutor-chat (sẽ thêm vào server/ai.js).
 *   - Server dùng Ollama qwen2.5:14b-instruct-ctx16k (tiếng Việt tốt).
 *
 * Voice:
 *   - TTS: Web Speech API SpeechSynthesis (giọng vi-VN nếu hệ điều hành có).
 *   - STT: SpeechRecognition (Chrome/Edge). Fallback: nhập text bằng phím.
 *
 * Lưu hội thoại vào localStorage để tutor "nhớ" trong phiên (last 12 turn).
 */

(function () {
  if (typeof window === 'undefined') return;
  if (window.EduTutor) return; // tránh mount 2 lần

  const STORAGE_KEY = 'tizia.tutor.history.v1';
  const MAX_HISTORY = 12;

  // Parse data-* attributes của script tag tự khởi tạo
  const selfScript = document.currentScript;
  const autoDomain = selfScript?.dataset?.domain || autoDetectDomain();
  const autoGrade = selfScript?.dataset?.grade || '';
  const autoContext = selfScript?.dataset?.context || (location.pathname.split('/').pop() || '').replace('.html', '');

  function autoDetectDomain() {
    const p = location.pathname.toLowerCase();
    if (p.includes('it-') || p.includes('algo') || p.includes('cipher') || p.includes('sql') || p.includes('code-lab') || p.includes('web-playground')) return 'it';
    if (p.includes('herb') || p.includes('sac-ky') || p.includes('antibio') || p.includes('compound') || p.includes('bao-che') || p.includes('dispens') || p.includes('dilut') || p.includes('medicine')) return 'pharmacy';
    if (p.includes('osce') || p.includes('soap') || p.includes('patient') || p.includes('infusion') || p.includes('pediatric') || p.includes('bp-measure')) return 'medical';
    if (p.includes('school') || p.includes('quiz') || p.includes('subject')) return 'school';
    return 'general';
  }

  const DOMAIN_LABEL = {
    it: 'CNTT', pharmacy: 'Dược', medical: 'Y khoa',
    school: 'phổ thông GDPT 2018', general: 'giáo dục tổng quát',
  };

  const TUTOR_STYLE_DOC = {
    it: 'Khi giải thích code, dùng pseudo-code tiếng Việt trước rồi mới đến cú pháp. Khuyến khích test trên SQL playground / code lab có sẵn của Tizia.',
    pharmacy: 'Khi tư vấn dùng thuốc, luôn nhắc về liều, đường dùng, tương tác, chống chỉ định. Tham chiếu được tới các lab sắc ký / chuẩn độ / antibiogram có sẵn.',
    medical: 'Khi giải thích triệu chứng, theo cấu trúc SOAP. Nhấn mạnh khi nào cần khám bác sĩ.',
    school: 'Bám sát Chương trình GDPT 2018 của Bộ GD&ĐT VN, dùng ví dụ học sinh Việt quen thuộc.',
    general: 'Giải thích đơn giản, có ví dụ, không thuật ngữ Anh không cần thiết.',
  };

  // ──────────────────────────────────────────────────────────
  // UI
  // ──────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('edututor-styles')) return;
    const css = `
      #edututor-fab {
        position: fixed; right: 18px; bottom: 18px; z-index: 99998;
        width: 60px; height: 60px; border-radius: 50%;
        background: linear-gradient(135deg, #fbbf24, #f97316);
        color: #3e2723; font-size: 28px; line-height: 60px; text-align: center;
        cursor: pointer; border: none;
        box-shadow: 0 8px 24px rgba(251,191,36,0.4);
        transition: transform 0.15s; user-select: none;
      }
      #edututor-fab:hover { transform: scale(1.08); }
      #edututor-fab.pulse::after {
        content: ''; position: absolute; inset: -8px; border-radius: 50%;
        border: 2px solid rgba(251,191,36,0.5); animation: edututor-pulse 1.5s ease-out infinite;
      }
      @keyframes edututor-pulse {
        0%   { transform: scale(0.9); opacity: 1; }
        100% { transform: scale(1.4); opacity: 0; }
      }
      #edututor-panel {
        position: fixed; right: 18px; bottom: 90px; z-index: 99999;
        width: 380px; max-width: calc(100vw - 36px);
        height: 540px; max-height: calc(100vh - 130px);
        background: rgba(15,23,42,0.97); color: white;
        border-radius: 16px; border: 1px solid rgba(251,191,36,0.4);
        backdrop-filter: blur(14px); box-shadow: 0 16px 48px rgba(0,0,0,0.6);
        display: none; flex-direction: column; font-family: 'Inter', system-ui, sans-serif;
        overflow: hidden;
      }
      #edututor-panel.open { display: flex; }
      .edututor-head {
        padding: 14px 16px; background: linear-gradient(135deg, rgba(251,191,36,0.15), transparent);
        border-bottom: 1px solid rgba(255,255,255,0.1);
        display: flex; gap: 10px; align-items: center;
      }
      .edututor-head .ico { font-size: 22px; }
      .edututor-head .title { font-weight: 700; font-size: 15px; }
      .edututor-head .sub { font-size: 11px; opacity: 0.75; }
      .edututor-head .close {
        background: none; border: none; color: white;
        font-size: 18px; cursor: pointer; opacity: 0.7;
      }
      .edututor-head .close:hover { opacity: 1; }
      /* Toggle Socratic — đặt ngay trước nút Close */
      .edututor-mode {
        margin-left: auto;
        display: inline-flex; align-items: center; gap: 5px;
        font-size: 11.5px; font-weight: 700;
        padding: 4px 9px; border-radius: 999px;
        background: rgba(167,139,250,0.18);
        border: 1px solid rgba(167,139,250,0.4);
        cursor: pointer; user-select: none;
        transition: background 0.15s;
      }
      .edututor-mode:hover { background: rgba(167,139,250,0.32); }
      .edututor-mode input { margin: 0; cursor: pointer; accent-color: #a78bfa; }
      .edututor-mode input:checked ~ span { color: #c4b5fd; }
      .edututor-msg.sys {
        background: rgba(167,139,250,0.10);
        border: 1px dashed rgba(167,139,250,0.4);
        color: #c4b5fd;
        margin: 8px 0; padding: 8px 12px; border-radius: 8px;
        font-size: 12px; text-align: center;
      }
      .edututor-msgs {
        flex: 1; overflow-y: auto; padding: 14px 16px;
        display: flex; flex-direction: column; gap: 10px;
      }
      .edututor-msg {
        padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.5;
        max-width: 88%; word-wrap: break-word;
      }
      .edututor-msg.user {
        align-self: flex-end;
        background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723;
      }
      .edututor-msg.bot {
        align-self: flex-start;
        background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
      }
      .edututor-msg.bot.thinking { opacity: 0.7; font-style: italic; }
      .edututor-quicks {
        display: flex; gap: 6px; flex-wrap: wrap; padding: 0 16px 8px;
      }
      .edututor-quicks button {
        font-size: 11px; padding: 6px 10px; border-radius: 999px;
        background: rgba(14,165,233,0.15); border: 1px solid rgba(14,165,233,0.3);
        color: #7dd3fc; cursor: pointer; font-family: inherit;
      }
      .edututor-quicks button:hover { background: rgba(14,165,233,0.25); }
      .edututor-input {
        padding: 12px 14px; border-top: 1px solid rgba(255,255,255,0.1);
        display: flex; gap: 8px; align-items: flex-end;
      }
      .edututor-input textarea {
        flex: 1; resize: none; min-height: 38px; max-height: 100px;
        padding: 8px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.06); color: white; font-family: inherit; font-size: 14px;
      }
      .edututor-input textarea:focus { outline: 2px solid rgba(251,191,36,0.5); }
      .edututor-input button {
        width: 38px; height: 38px; border-radius: 10px;
        border: none; cursor: pointer; font-size: 16px;
      }
      .edututor-input .mic { background: rgba(255,255,255,0.1); color: white; }
      .edututor-input .mic.listening { background: #ef4444; color: white; animation: edututor-pulse-mic 1s infinite; }
      .edututor-input .send { background: linear-gradient(135deg, #fbbf24, #f97316); color: #3e2723; }
      @keyframes edututor-pulse-mic {
        0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); }
      }
      @media (max-width: 540px) {
        #edututor-panel { right: 8px; left: 8px; width: auto; bottom: 80px; }
        #edututor-fab { right: 12px; bottom: 12px; }
      }
    `;
    const style = document.createElement('style');
    style.id = 'edututor-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildPanel() {
    injectStyles();
    const fab = document.createElement('button');
    fab.id = 'edututor-fab';
    fab.title = 'AI Tutor — hỏi gì cũng được';
    fab.textContent = '🦉';
    fab.addEventListener('click', togglePanel);
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'edututor-panel';
    const initMode = localStorage.getItem('edututor_mode') === 'socratic' ? 'socratic' : 'direct';
    panel.innerHTML = `
      <div class="edututor-head">
        <div class="ico">🦉</div>
        <div>
          <div class="title">AI Tutor · Tizia</div>
          <div class="sub">Lĩnh vực: <span id="edututor-domain">${DOMAIN_LABEL[autoDomain] || autoDomain}</span></div>
        </div>
        <label class="edututor-mode" title="Socratic: AI không cho đáp án, chỉ hỏi gợi mở để em tự nghĩ ra (như Khanmigo).">
          <input type="checkbox" id="edututor-mode-toggle" ${initMode === 'socratic' ? 'checked' : ''}>
          <span>🤔 Socratic</span>
        </label>
        <button class="close" id="edututor-close" title="Đóng">✕</button>
      </div>
      <div class="edututor-msgs" id="edututor-msgs"></div>
      <div class="edututor-quicks" id="edututor-quicks"></div>
      <div class="edututor-input">
        <textarea id="edututor-ta" placeholder="Hỏi tutor… (Enter để gửi, Shift+Enter xuống dòng)"></textarea>
        <button class="mic" id="edututor-mic" title="Nói">🎤</button>
        <button class="send" id="edututor-send" title="Gửi">➤</button>
      </div>
    `;
    document.body.appendChild(panel);

    document.getElementById('edututor-close').addEventListener('click', togglePanel);
    document.getElementById('edututor-send').addEventListener('click', sendCurrent);
    document.getElementById('edututor-mic').addEventListener('click', toggleMic);
    document.getElementById('edututor-ta').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendCurrent(); }
    });
    document.getElementById('edututor-mode-toggle').addEventListener('change', (e) => {
      const m = e.target.checked ? 'socratic' : 'direct';
      localStorage.setItem('edututor_mode', m);
      // Toast nhỏ trong panel để user biết đã đổi.
      const msgs = document.getElementById('edututor-msgs');
      const note = document.createElement('div');
      note.className = 'edututor-msg sys';
      note.innerHTML = m === 'socratic'
        ? '🤔 <b>Socratic ON</b> — Thầy AI sẽ không cho đáp án mà hỏi ngược để em tự nghĩ ra.'
        : '💡 <b>Trực tiếp ON</b> — Thầy AI sẽ giải đáp thẳng.';
      msgs.appendChild(note);
      msgs.scrollTop = msgs.scrollHeight;
    });

    renderQuickPrompts();
    restoreHistory();
  }

  const QUICKS = {
    it:       ['Giải thích bài SQL trang này', 'Cho 1 ví dụ về thuật toán này', 'Bug code của tôi'],
    pharmacy: ['Liều thường dùng?', 'Tương tác thuốc', 'Bảo quản đặc biệt'],
    medical:  ['Soạn SOAP mẫu', 'Triệu chứng nguy hiểm?', 'Khám gì tiếp theo?'],
    school:   ['Tóm tắt bài này', 'Cho ví dụ đời sống', 'Làm bài tập mẫu'],
    general:  ['Bài này nói gì?', 'Có ví dụ không?', 'Bài tập thử'],
  };

  function renderQuickPrompts() {
    const wrap = document.getElementById('edututor-quicks');
    const list = QUICKS[autoDomain] || QUICKS.general;
    wrap.innerHTML = list.map(q => `<button>${q}</button>`).join('');
    wrap.querySelectorAll('button').forEach((b, i) => {
      b.addEventListener('click', () => {
        document.getElementById('edututor-ta').value = list[i];
        sendCurrent();
      });
    });
  }

  // ──────────────────────────────────────────────────────────
  // State
  // ──────────────────────────────────────────────────────────
  let history = [];
  let isThinking = false;

  function loadHistory() {
    try { history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { history = []; }
  }
  function saveHistory() {
    history = history.slice(-MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }

  function restoreHistory() {
    loadHistory();
    if (!history.length) {
      addMsg('bot', `Xin chào! Mình là AI tutor của Tizia — chuyên lĩnh vực <b>${DOMAIN_LABEL[autoDomain] || autoDomain}</b>. Bạn cần mình giúp gì ở trang này?`);
    } else {
      for (const h of history) addMsg(h.role === 'user' ? 'user' : 'bot', h.content, /*skipSpeak*/ true);
    }
  }

  // ──────────────────────────────────────────────────────────
  // Voice TTS — DISABLED (user request). STT mic vẫn giữ ở dưới.
  // ──────────────────────────────────────────────────────────
  function speak(_text) { /* AI Tutor voice tắt theo yêu cầu của user. */ }

  let micRec = null;
  function toggleMic() {
    const btn = document.getElementById('edututor-mic');
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Trình duyệt này không hỗ trợ nhận diện giọng nói. Dùng Chrome/Edge nhé.'); return; }
    if (micRec) { micRec.stop(); micRec = null; btn.classList.remove('listening'); return; }
    micRec = new SR();
    micRec.lang = 'vi-VN';
    micRec.continuous = false;
    micRec.interimResults = false;
    btn.classList.add('listening');
    micRec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      const ta = document.getElementById('edututor-ta');
      ta.value = (ta.value ? ta.value + ' ' : '') + text;
      ta.focus();
    };
    micRec.onend = () => { btn.classList.remove('listening'); micRec = null; };
    micRec.onerror = () => { btn.classList.remove('listening'); micRec = null; };
    micRec.start();
  }

  // ──────────────────────────────────────────────────────────
  // Chat
  // ──────────────────────────────────────────────────────────
  function addMsg(role, content, _skipSpeak = false) {
    const msgs = document.getElementById('edututor-msgs');
    const el = document.createElement('div');
    el.className = 'edututor-msg ' + role;
    el.innerHTML = role === 'bot' ? content : escapeHtml(content);
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  async function sendCurrent() {
    if (isThinking) return;
    const ta = document.getElementById('edututor-ta');
    const text = ta.value.trim();
    if (!text) return;
    ta.value = '';
    addMsg('user', text);
    history.push({ role: 'user', content: text }); saveHistory();

    const thinking = addMsg('bot', '🤔 Đang nghĩ…', true);
    thinking.classList.add('thinking');
    isThinking = true;

    try {
      const res = await fetch('./api/ai/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: autoDomain,
          grade: autoGrade || undefined,
          context: autoContext,
          history: history.slice(-MAX_HISTORY).slice(0, -1),
          message: text,
          styleNote: TUTOR_STYLE_DOC[autoDomain] || TUTOR_STYLE_DOC.general,
          // Socratic mode — đọc từ localStorage, mặc định OFF.
          mode: localStorage.getItem('edututor_mode') === 'socratic' ? 'socratic' : 'direct',
        }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const reply = String(data.reply || '').trim() || 'Mình chưa rõ câu hỏi của bạn — kể chi tiết hơn nhé.';
      thinking.classList.remove('thinking');
      thinking.innerHTML = formatReply(reply);
      history.push({ role: 'assistant', content: reply }); saveHistory();
    } catch (err) {
      thinking.classList.remove('thinking');
      thinking.innerHTML = '⚠ Không kết nối được AI tutor (' + escapeHtml(String(err.message || err)) + '). Thử lại sau nhé.';
    } finally {
      isThinking = false;
    }
  }

  function togglePanel() {
    const panel = document.getElementById('edututor-panel');
    const fab = document.getElementById('edututor-fab');
    panel.classList.toggle('open');
    fab.classList.remove('pulse');
    if (panel.classList.contains('open')) {
      document.getElementById('edututor-ta').focus();
    }
  }

  function formatReply(s) {
    // Bold **x**, italic *x*, code `x`, line breaks
    return escapeHtml(s)
      .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 6px;border-radius:4px;font-size:12px;">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\n/g, '<br>');
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }
  function stripHtml(s) { return String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

  // ──────────────────────────────────────────────────────────
  // Auto-mount
  // ──────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildPanel);
  } else {
    buildPanel();
  }

  // Public API — cho phép trang khác mount thủ công + reset
  window.EduTutor = {
    open() { document.getElementById('edututor-panel')?.classList.add('open'); },
    close() { document.getElementById('edututor-panel')?.classList.remove('open'); },
    reset() { history = []; saveHistory(); document.getElementById('edututor-msgs').innerHTML = ''; restoreHistory(); },
    pulse() { document.getElementById('edututor-fab')?.classList.add('pulse'); },
    setDomain(d) { /* TODO: re-mount with new domain */ },
  };
})();
