// ============================================================
// Topic-Modes registry — gộp tất cả phiên bản (2D/3D/VR/XR/Quiz/
// Metaverse/Time-Attack/Race/Unity native) của 1 chủ đề vào 1 card
// có mode selector duy nhất.
//
// Mỗi topic = 1 module/hub. Mỗi mode = 1 cách thực thi cùng nội dung.
// Hub HTML chỉ cần gọi renderTopicCard({ host, topicId }) là xong.
//
// Thêm hub mới → push vào TOPICS object. Không cần sửa hub HTML.
// ============================================================

/**
 * @typedef {Object} Mode
 * @property {string} id            — ổn định (3d, vr, 2d, quiz, meta, time, race, unity)
 * @property {string} label         — tiêu đề hiển thị trên chip
 * @property {string} tech          — dòng tech stack (Three.js · WebGL …)
 * @property {string} icon          — emoji
 * @property {string} url           — đường dẫn (relative) hoặc full URL
 * @property {string[]} specs       — chip nhỏ trong "Đặc điểm" (ok = xanh, bad = đỏ, neutral = xám)
 * @property {string} desc          — mô tả ngắn của mode
 * @property {'ready'|'soon'|'external'} [status]  — mặc định 'ready'
 * @property {string} [cta]         — text trên nút Play (mặc định "Vào chế độ này")
 */

/**
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} icon
 * @property {string} title
 * @property {string} subtitle
 * @property {string} accentColor   — màu accent (hex)
 * @property {string} defaultMode   — mode id mặc định
 * @property {Mode[]} modes
 */

/** @type {Record<string, Topic>} */
export const TOPICS = {
  'sap-xep': {
    id: 'sap-xep',
    icon: '💊',
    title: 'Sắp xếp thuốc theo nhóm ATC',
    subtitle: 'Phân loại 16 thuốc thông dụng vào đúng nhóm điều trị · 10 cấp độ',
    accentColor: '#fbbf24',
    defaultMode: '3d',
    modes: [
      {
        id: '3d', icon: '🥽', label: '3D Realistic', tech: 'Three.js · WebGL',
        url: '3d-shelf.html',
        desc: 'Three.js full 3D scene với carton mở được, snap-to-slot, hover halo. Camera orbit chuột/touch, click để nhặt thuốc.',
        specs: ['ok:Đẹp · Realistic', 'Desktop tốt nhất', 'Touch OK', 'bad:Mobile yếu chậm'],
        cta: '▶️ Chơi 3D ngay',
      },
      {
        id: 'vr', icon: '🕹️', label: 'VR / XR Web', tech: 'Three.js · WebXR · Hand tracking',
        url: '3d-shelf.html#vr',
        desc: 'Cùng scene 3D: vào kính Meta Quest browser bấm Enter VR để chơi bằng tay (hand tracking native). Cũng chạy desktop với chuột.',
        specs: ['ok:VR thật trên Quest', 'ok:Hand tracking native', 'Snap-to-slot', 'Desktop OK'],
        cta: '🥽 Vào VR / XR',
      },
      {
        id: '2d', icon: '🎮', label: '2D Arcade', tech: 'Canvas 2D · MediaPipe · Mouse',
        url: '2d-arcade.html',
        desc: 'Game-style side-view. Pinch mở thùng → thuốc bay ra → kéo vào kệ đúng nhóm. Hỗ trợ chuột nếu không có webcam. Nhẹ ~30 KB.',
        specs: ['ok:Mobile mượt', 'MediaPipe · Mouse', '🔊 SFX', 'bad:Không VR'],
        cta: '▶️ Chơi 2D',
      },
      {
        id: 'quiz', icon: '🧠', label: 'Quiz MCQ', tech: 'HTML + JS · Quiz',
        url: 'quiz.html',
        desc: '10 câu hỏi MCQ về phân loại thuốc, nhìn tên/hoạt chất chọn đúng nhóm điều trị trong 4 đáp án. 15s/câu, streak bonus.',
        specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết', 'ok:Ai cũng chơi'],
        cta: '🧠 Bắt đầu Quiz',
      },
      {
        id: 'meta', icon: '🌐', label: 'Metaverse', tech: 'Three.js + WebSocket · Multiplayer',
        url: 'metaverse.html',
        desc: 'Phòng dược 3D realtime multiplayer, thấy avatar người khác chuyển động real-time, cùng xếp thuốc, chat & xem tiến độ.',
        specs: ['ok:Multiplayer', 'ok:Chat & avatar', 'Desktop · Mobile', 'Realtime sync'],
        cta: '🌐 Vào phòng',
      },
      {
        id: 'time', icon: '⚡', label: 'Time Attack', tech: 'Canvas 2D · Survival',
        url: 'time-attack.html',
        desc: 'Sống được càng nhiều wave càng tốt, mỗi wave thêm 1 thuốc, time giảm dần, sai trừ 5s. Test phản xạ và độ nhớ.',
        specs: ['ok:Endless', 'Escalating', 'bad:Sai -5s', 'Wave-based'],
        cta: '⚡ Time Attack',
      },
      {
        id: 'race', icon: '🏁', label: 'Race 1v1', tech: 'WebSocket · 1v1',
        url: '#',
        status: 'soon',
        desc: 'Bắt cặp 2 người ngẫu nhiên qua WebSocket, cùng chơi 1 level, ai xong trước thắng. Backend đã sẵn sàng, UI đang hoàn thiện.',
        specs: ['ok:Auto-match', 'Live opponent', 'Real-time score', 'Best of 3'],
      },
      {
        id: 'unity', icon: '📦', label: 'Unity native', tech: 'Unity · Meta XR SDK · Quest APK',
        url: '#',
        status: 'soon',
        desc: 'Bản app native Quest dự kiến, hand tracking chuẩn Meta XR SDK, vật lý PhysX, đồ hoạ tốt nhất. Đang chờ team Unity build.',
        specs: ['~50 MB APK', 'ok:VR chất lượng cao nhất', 'bad:Chỉ Meta Quest', 'Cần Unity build'],
      },
    ],
  },

  'bao-che': {
    id: 'bao-che',
    icon: '🧪',
    title: 'Bào chế GMP: Pha 8 đơn thuốc',
    subtitle: 'Cân hoạt chất, đong dung môi, q.s., đóng chai · 2 tay phối hợp',
    accentColor: '#14b8a6',
    defaultMode: '3d',
    modes: [
      {
        id: '3d', icon: '🥽', label: 'Phòng Lab 3D', tech: 'Three.js · MediaPipe · 2 tay',
        url: 'compounding-lab.html',
        desc: 'Three.js full 3D scene với cân điện tử, ống đong, cốc thuỷ tinh. Free-form thao tác tự do, lỗi quy trình tổng kết cuối bài. 2 tay phối hợp rót ổn định hơn.',
        specs: ['ok:Sẵn sàng', 'ok:2 tay MediaPipe', 'Free-form', 'Desktop tốt nhất'],
        cta: '▶️ Vào phòng lab',
      },
      {
        id: 'vr', icon: '🕹️', label: 'VR / XR Web', tech: 'A-Frame · WebXR',
        url: '#',
        status: 'soon',
        desc: 'Phòng lab WebXR: vào kính Meta Quest bấm Enter VR, dùng hand tracking native để cầm cốc, rót thuốc thật như đang ở phòng pha chế.',
        specs: ['~250 KB', 'ok:VR thật trên Quest', 'Desktop OK', 'Hand tracking native'],
      },
      {
        id: '2d', icon: '🎨', label: '2D Side-view', tech: 'Canvas 2D · Vanilla JS',
        url: '#',
        status: 'soon',
        desc: 'Side-view minimalist: kéo cốc, ống đong, lọ thuốc bằng chuột/touch. Tải nhẹ, phù hợp ôn quy trình trên mobile mà không cần webcam hay 3D.',
        specs: ['ok:~10 KB', 'Click/touch', 'Mobile OK', 'bad:Không VR'],
      },
      {
        id: 'quiz', icon: '🧠', label: 'Quiz GMP', tech: 'HTML + JS · Quiz',
        url: '#',
        status: 'soon',
        desc: '10 câu hỏi MCQ về quy trình GMP, thứ tự bước, công thức q.s., tolerance cân, an toàn vô khuẩn. 15s/câu, streak bonus.',
        specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết GMP', 'ok:Ai cũng chơi'],
      },
      {
        id: 'meta', icon: '🌐', label: 'Metaverse', tech: 'Three.js + WebSocket · Multiplayer',
        url: '#',
        status: 'soon',
        desc: 'Phòng lab GMP realtime multiplayer, mỗi SV có bàn pha riêng, thấy avatar người khác, giảng viên ghé qua kiểm tra trực tiếp.',
        specs: ['ok:Multiplayer', '~220 KB', 'ok:GV giám sát', 'Desktop · Mobile'],
      },
      {
        id: 'time', icon: '⚡', label: 'Time Attack', tech: 'Three.js · Survival',
        url: '#',
        status: 'soon',
        desc: 'Pha đúng đơn càng nhanh càng tốt, đếm ngược, sai bước trừ thời gian. Test phản xạ quy trình GMP dưới áp lực thời gian.',
        specs: ['ok:Endless', 'Escalating', 'bad:Sai -10s', 'Đơn random'],
      },
      {
        id: 'race', icon: '🏁', label: 'Race 1v1', tech: 'WebSocket · 1v1',
        url: '#',
        status: 'soon',
        desc: '2 SV ngẫu nhiên cùng pha 1 đơn, ai đúng & nhanh hơn thắng. Backend WebSocket dùng chung với Sắp xếp.',
        specs: ['ok:Auto-match', 'Live opponent', 'Real-time score', 'Best of 3'],
      },
      {
        id: 'unity', icon: '📦', label: 'Unity native', tech: 'Unity · Meta XR SDK · Quest APK',
        url: '#',
        status: 'soon',
        desc: 'App native Quest: vật lý PhysX cho chất lỏng, hand tracking Meta XR SDK chuẩn. Mô phỏng cảm giác cầm cốc, rót, lắc gần như thật.',
        specs: ['~70 MB APK', 'ok:VR cao nhất', 'bad:Chỉ Meta Quest', 'Cần Unity build'],
      },
    ],
  },

  'sac-ky': {
    id: 'sac-ky',
    icon: '🧪',
    title: 'Sắc ký lớp mỏng (TLC)',
    subtitle: 'Phân tích định tính dược phẩm · 6 bước · 3 mẫu chấm · UV inspection · đo Rf',
    accentColor: '#a78bfa',
    defaultMode: '3d',
    modes: [
      {
        id: '3d', icon: '🥽', label: '3D Three.js', tech: 'Three.js · WebGL',
        url: 'sac-ky-3d.html',
        desc: 'Full 3D scene với glass material, shadow, lighting. Camera orbit chuột/touch, click vào đối tượng để tương tác. Đẹp nhất trên desktop.',
        specs: ['~150 KB', 'Desktop tốt nhất', 'Touch OK', 'bad:Mobile yếu chậm'],
        cta: '▶️ Vào lab 3D',
      },
      {
        id: 'vr', icon: '🕹️', label: 'VR / XR Web', tech: 'A-Frame · WebXR',
        url: 'sac-ky-vr-web.html',
        desc: 'Declarative HTML + WebXR. Vào kính Quest browser bấm Enter VR để chơi thật như VR native. Cũng chạy được trên desktop với gaze pointer.',
        specs: ['~250 KB', 'ok:VR thật trên Quest', 'Desktop OK', 'Hand tracking native'],
        cta: '🥽 Vào VR / XR',
      },
      {
        id: '2d', icon: '🎨', label: '2D Canvas', tech: 'Canvas 2D · Vanilla JS',
        url: 'sac-ky-2d.html',
        desc: 'Side-view minimalist: pure Canvas, không cần library. Tải cực nhanh (~5KB), chạy mượt trên mọi máy kể cả máy yếu / mobile cũ.',
        specs: ['ok:~5 KB', 'Click chuột', 'Mobile OK', 'bad:Không VR'],
        cta: '▶️ Chơi 2D',
      },
      {
        id: 'quiz', icon: '🧠', label: 'Quiz MCQ', tech: 'HTML + JS · Quiz',
        url: 'sac-ky-quiz.html',
        desc: '10 câu hỏi MCQ về quy trình, công thức Rf, ứng dụng dược, an toàn. 15s/câu, streak bonus. Phù hợp ôn lý thuyết, không cần 3D.',
        specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết', 'ok:Ai cũng chơi'],
        cta: '🧠 Bắt đầu Quiz',
      },
      {
        id: 'meta', icon: '🌐', label: 'Metaverse', tech: 'Three.js + WebSocket · Multiplayer',
        url: 'sac-ky-meta.html',
        desc: 'Phòng lab 3D realtime multiplayer, thấy avatar người khác cùng làm thí nghiệm, chat & xem tiến độ. Mỗi SV có bàn lab riêng nhưng cùng không gian.',
        specs: ['ok:Multiplayer', '~200 KB', 'ok:Chat & avatar', 'Desktop · Mobile'],
        cta: '🌐 Vào phòng',
      },
      {
        id: 'unity', icon: '📦', label: 'Unity native', tech: 'Unity · Meta XR SDK · Quest APK',
        url: 'https://github.com/minhquang2k4/VR-Sac-Ky',
        status: 'external',
        desc: 'Phiên bản app native chạy trên Meta Quest, đồ hoạ tốt nhất, hand-tracking chuẩn Meta XR SDK, vật lý PhysX. Cần build từ source Unity.',
        specs: ['~50 MB APK', 'ok:VR chất lượng cao nhất', 'bad:Chỉ Meta Quest', 'Cần Unity build'],
        cta: '📦 Repo & hướng dẫn build',
      },
    ],
  },
};

// ────────────────────────────────────────────────────────────
// Renderer
// ────────────────────────────────────────────────────────────

function specChips(specs) {
  return (specs || []).map(s => {
    let cls = '';
    let txt = s;
    if (s.startsWith('ok:'))  { cls = 'ok';  txt = s.slice(3); }
    if (s.startsWith('bad:')) { cls = 'bad'; txt = s.slice(4); }
    return `<span class="${cls}">${txt}</span>`;
  }).join('');
}

function statusBadge(status) {
  if (status === 'soon')     return '<span class="tm-badge tm-badge-soon">Sắp có</span>';
  if (status === 'external') return '<span class="tm-badge tm-badge-ext">Repo ngoài</span>';
  return '';
}

/**
 * Render 1 card gộp tất cả phiên bản của 1 topic.
 * @param {{ host: HTMLElement, topicId: string, initialMode?: string }} opts
 */
export function renderTopicCard({ host, topicId, initialMode }) {
  const topic = TOPICS[topicId];
  if (!topic) {
    host.innerHTML = `<div style="opacity:0.6">Topic "${topicId}" chưa được đăng ký trong topic-modes.js</div>`;
    return;
  }

  // State: which mode is selected
  let current = initialMode || topic.defaultMode;
  if (!topic.modes.find(m => m.id === current)) current = topic.modes[0].id;

  injectStylesOnce();

  host.innerHTML = `
    <div class="tm-card" style="--tm-accent: ${topic.accentColor}">
      <div class="tm-head">
        <div class="tm-icon">${topic.icon}</div>
        <div class="tm-titles">
          <h3 class="tm-title">${topic.title}</h3>
          <p class="tm-sub">${topic.subtitle}</p>
        </div>
      </div>

      <div class="tm-chips-label">Chọn phiên bản</div>
      <div class="tm-chips" role="radiogroup" aria-label="Phiên bản">
        ${topic.modes.map(m => `
          <button
            type="button"
            class="tm-chip ${m.id === current ? 'active' : ''} ${m.status === 'soon' ? 'soon' : ''}"
            data-mode="${m.id}"
            role="radio"
            aria-checked="${m.id === current}"
            title="${m.tech}">
            <span class="tm-chip-icon">${m.icon}</span>
            <span class="tm-chip-label">${m.label}</span>
            ${m.status === 'soon' ? '<span class="tm-chip-soon">Sắp có</span>' : ''}
            ${m.status === 'external' ? '<span class="tm-chip-soon">Repo</span>' : ''}
          </button>
        `).join('')}
      </div>

      <div class="tm-body" id="tm-body-${topic.id}">
        <!-- filled by updateBody() -->
      </div>
    </div>
  `;

  const body = host.querySelector(`#tm-body-${topic.id}`);
  const chips = host.querySelectorAll('.tm-chip');

  function updateBody() {
    const mode = topic.modes.find(m => m.id === current) || topic.modes[0];
    const isDisabled = mode.status === 'soon';
    const isExternal = mode.status === 'external';
    const cta = mode.cta || (isExternal ? '🔗 Mở repo' : '▶️ Vào chế độ này');
    body.innerHTML = `
      <div class="tm-tech">${mode.tech} ${statusBadge(mode.status)}</div>
      <p class="tm-desc">${mode.desc}</p>
      <div class="tm-specs">${specChips(mode.specs)}</div>
      <a
        class="tm-btn ${isDisabled ? 'disabled' : ''}"
        href="${isDisabled ? '#' : mode.url}"
        ${isExternal ? 'target="_blank" rel="noopener"' : ''}
        ${isDisabled ? 'aria-disabled="true"' : ''}>
        ${isDisabled ? '📦 Đang phát triển' : cta}
      </a>
    `;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      current = chip.dataset.mode;
      chips.forEach(c => {
        const active = c.dataset.mode === current;
        c.classList.toggle('active', active);
        c.setAttribute('aria-checked', active);
      });
      updateBody();
    });
  });

  updateBody();
}

// ────────────────────────────────────────────────────────────
// Inject shared CSS once per page
// ────────────────────────────────────────────────────────────

let stylesInjected = false;
function injectStylesOnce() {
  if (stylesInjected) return;
  stylesInjected = true;
  const css = `
    .tm-card {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 18px;
      padding: 22px 24px 24px;
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }
    .tm-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
      background: var(--tm-accent, #fbbf24);
    }
    .tm-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 18px; }
    .tm-icon {
      font-size: 38px; line-height: 1;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
    }
    .tm-titles { flex: 1; min-width: 0; }
    .tm-title { margin: 0 0 4px; font-size: 22px; font-weight: 800; color: white; }
    .tm-sub { margin: 0; font-size: 13.5px; opacity: 0.78; line-height: 1.5; }

    .tm-chips-label {
      font-size: 11px; opacity: 0.65; text-transform: uppercase;
      letter-spacing: 0.7px; font-weight: 700; margin-bottom: 10px;
    }
    .tm-chips {
      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;
    }
    .tm-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 14px; border-radius: 999px;
      background: rgba(255,255,255,0.06);
      border: 1.5px solid rgba(255,255,255,0.12);
      color: white; font-size: 13px; font-weight: 600;
      cursor: pointer; transition: all 0.15s;
      font-family: inherit;
    }
    .tm-chip:hover:not(.active) { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25); }
    .tm-chip.active {
      background: var(--tm-accent, #fbbf24);
      color: #1f1147;
      border-color: var(--tm-accent, #fbbf24);
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
    }
    .tm-chip.soon { opacity: 0.7; }
    .tm-chip-icon { font-size: 15px; }
    .tm-chip-soon {
      font-size: 9px; padding: 1px 6px; border-radius: 6px;
      background: rgba(0,0,0,0.25); color: rgba(255,255,255,0.85);
      text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700;
      margin-left: 2px;
    }
    .tm-chip.active .tm-chip-soon { background: rgba(0,0,0,0.4); color: white; }

    .tm-body {
      background: rgba(0,0,0,0.18); border-radius: 12px; padding: 16px 18px;
    }
    .tm-tech {
      font-size: 11px; color: var(--tm-accent, #fbbf24);
      text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
      margin-bottom: 8px;
      display: flex; align-items: center; gap: 8px;
    }
    .tm-badge {
      font-size: 9px; padding: 2px 7px; border-radius: 6px;
      background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85);
      text-transform: uppercase; letter-spacing: 0.4px; font-weight: 700;
    }
    .tm-badge-soon { background: rgba(255,255,255,0.12); }
    .tm-badge-ext  { background: rgba(99,102,241,0.25); color: #c7d2fe; }

    .tm-desc {
      line-height: 1.55; opacity: 0.92; margin: 6px 0 12px;
      font-size: 14px; color: white;
    }
    .tm-specs {
      display: flex; gap: 6px; flex-wrap: wrap;
      font-size: 11px; margin-bottom: 14px;
    }
    .tm-specs span {
      padding: 3px 9px; border-radius: 8px;
      background: rgba(255,255,255,0.08); color: white;
    }
    .tm-specs .ok  { background: rgba(16,185,129,0.22); }
    .tm-specs .bad { background: rgba(239,68,68,0.22); }

    .tm-btn {
      display: inline-block;
      padding: 12px 22px; border-radius: 11px;
      background: var(--tm-accent, #fbbf24); color: #1f1147;
      text-decoration: none; font-weight: 700; font-size: 15px;
      text-align: center; transition: filter 0.15s, transform 0.15s;
    }
    .tm-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
    .tm-btn.disabled {
      background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.5);
      cursor: not-allowed; pointer-events: none;
    }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-injected', 'topic-modes');
  style.textContent = css;
  document.head.appendChild(style);
}
