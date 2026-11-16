// ⚠️ CONTENT-IN-CODE TẠM THỜI — nguồn mirror từ inline <script> của trang gốc
// public/sac-ky-quiz.html. Bộ QUESTIONS (10 câu Sắc ký lớp mỏng TLC: câu hỏi +
// 4 đáp án + đáp án đúng + giải thích) là CONTENT nghiệp vụ, ĐÁNG RA phải ở DB +
// fetch qua API. Vì hiện CHƯA có endpoint/bảng nào cho quiz sắc ký (chỉ có
// /api/attempts để LƯU điểm, không có API TRẢ câu hỏi), ta GIỮ nguồn cũ ở đây
// (ngoài cây app/ của Next) theo đúng chiến lược wrap-mount, thay vì nhân bản
// content vào .tsx.
// TODO(risk): seed 10 câu vào DB (vd bảng quiz_questions / curriculum_content với
// môn TLC) + tạo GET /api/sac-ky-quiz/questions, rồi đổi mount này sang fetch API
// và xoá khối QUESTIONS hardcode.

(function () {
  const root = document.getElementById('skq-root');
  if (!root) return;
  if (root.dataset.mounted === '1') return; // idempotent (StrictMode / remount)
  root.dataset.mounted = '1';

  const QUESTIONS = [
    {
      cat: 'Định nghĩa',
      q: 'Sắc ký lớp mỏng (TLC) là kỹ thuật phân tích dùng để làm gì?',
      options: [
        'Tách và định tính các thành phần trong hỗn hợp',
        'Đo nồng độ chất bằng quang phổ',
        'Pha chế thuốc theo công thức',
        'Khử trùng dụng cụ thí nghiệm',
      ],
      correct: 0,
      explain: 'TLC = Thin Layer Chromatography — tách các hợp chất dựa vào sự khác biệt về ái lực với pha tĩnh (silica) và pha động (dung môi).',
    },
    {
      cat: 'Vật liệu',
      q: 'Pha tĩnh phổ biến nhất trong TLC là gì?',
      options: [
        'Silica gel (silic dioxide)',
        'Than hoạt tính',
        'Polyethylene',
        'Đường lactose',
      ],
      correct: 0,
      explain: 'Silica gel được phủ lên bản mỏng nhôm/thủy tinh, là pha tĩnh phổ biến nhờ tính phân cực cao.',
    },
    {
      cat: 'Công thức Rf',
      q: 'Hệ số Rf được tính bằng công thức nào?',
      options: [
        'Rf = quãng đường vệt mẫu / quãng đường dung môi',
        'Rf = quãng đường dung môi / quãng đường vệt mẫu',
        'Rf = khối lượng mẫu / thể tích dung môi',
        'Rf = thời gian × tốc độ dung môi',
      ],
      correct: 0,
      explain: 'Rf (Retention factor) = khoảng cách vệt mẫu di chuyển ÷ khoảng cách dung môi di chuyển. Giá trị nằm trong khoảng 0–1.',
    },
    {
      cat: 'Quy trình',
      q: 'Bước đầu tiên trong quy trình TLC là gì?',
      options: [
        'Vạch đường gốc trên bản mỏng',
        'Pha pha động trong bình triển khai',
        'Soi đèn UV',
        'Cắt bản mỏng',
      ],
      correct: 0,
      explain: 'Vạch đường gốc nhẹ bằng bút chì cách mép dưới ~1cm. Đây là nơi sẽ chấm mẫu — KHÔNG vẽ bằng bút bi vì mực sẽ chạy theo dung môi.',
    },
    {
      cat: 'Chấm mẫu',
      q: 'Khi chấm mẫu, vệt chấm KHÔNG được vượt quá bao nhiêu mm đường kính?',
      options: [
        '2–3 mm',
        '10 mm',
        '20 mm',
        'Càng to càng dễ thấy',
      ],
      correct: 0,
      explain: 'Vệt chấm phải nhỏ (≤3mm) — chấm to sẽ làm vệt khi tách bị loang, khó đọc Rf chính xác.',
    },
    {
      cat: 'Pha động',
      q: 'Vì sao bình triển khai phải đậy nắp kín?',
      options: [
        'Để hơi dung môi bão hoà, đảm bảo Rf ổn định',
        'Để giữ ấm cho dung môi',
        'Để tránh côn trùng vào',
        'Để giảm tiếng ồn',
      ],
      correct: 0,
      explain: 'Hơi dung môi bão hoà giúp pha động di chuyển đều, tránh "edge effect" làm vệt biến dạng và Rf sai lệch.',
    },
    {
      cat: 'Triển khai',
      q: 'Đường gốc của bản mỏng phải ở vị trí nào so với mặt dung môi trong bình?',
      options: [
        'CAO HƠN mặt dung môi (cách mép dưới ~1cm)',
        'NGANG mặt dung môi',
        'CHÌM trong dung môi',
        'Bất kỳ vị trí nào',
      ],
      correct: 0,
      explain: 'Nếu đường gốc chìm trong dung môi, mẫu sẽ tan ra hết — không chạy lên được. Phải đặt cao hơn mặt dung môi.',
    },
    {
      cat: 'Quan sát',
      q: 'Khi quan sát kết quả TLC, dùng đèn UV bước sóng nào để soi?',
      options: [
        '254 nm hoặc 365 nm',
        '100 nm',
        '500 nm',
        '700 nm (ánh sáng đỏ)',
      ],
      correct: 0,
      explain: 'UV 254nm phát hiện các chất hấp thụ UV (vệt tối trên nền huỳnh quang). UV 365nm phát hiện chất phát huỳnh quang.',
    },
    {
      cat: 'Đọc kết quả',
      q: 'Hai chất có Rf bằng nhau trong cùng hệ dung môi có nghĩa là gì?',
      options: [
        'Có khả năng cùng một chất — nhưng cần kiểm chứng thêm',
        'Chắc chắn là cùng một chất',
        'Hai chất khác nhau hoàn toàn',
        'Cần đổi dung môi',
      ],
      correct: 0,
      explain: 'Rf giống nhau là dấu hiệu cùng chất, nhưng KHÔNG đủ để khẳng định. Phải kiểm chứng thêm bằng phổ MS, NMR hoặc TLC ở hệ dung môi khác.',
    },
    {
      cat: 'Ứng dụng Dược',
      q: 'TLC trong kiểm nghiệm dược phẩm dùng để làm gì? (chọn câu đầy đủ nhất)',
      options: [
        'Định tính, kiểm tra tinh khiết, theo dõi phản ứng',
        'Chỉ định lượng hoạt chất',
        'Chỉ pha chế dược phẩm',
        'Khử trùng nguyên liệu',
      ],
      correct: 0,
      explain: 'TLC trong Dược: định tính (so với chuẩn), kiểm tra độ tinh khiết (phát hiện tạp chất), theo dõi tiến độ phản ứng tổng hợp.',
    },
  ];

  // submit /api/attempts — mirror hành vi public/js/api.js#submitAttempt: gửi
  // credentials same-origin, KHÔNG truyền playerName (server lấy từ session).
  // Guest (401) → degrade mượt, không chặn UI.
  async function submitAttempt(payload) {
    try {
      let classCode;
      try { classCode = localStorage.getItem('tizia:classCode') || undefined; } catch { classCode = undefined; }
      const res = await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ ...payload, classCode }),
      });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (err) {
      console.warn('[sac-ky-quiz] submitAttempt failed:', err);
      return null;
    }
  }

  const TIME_PER_Q = 15;
  let qIdx = 0, score = 0, streak = 0, correct = 0;
  let answered = false;
  let startTime = performance.now();
  let qStartTime = 0;
  let timerInterval = null;

  function $(id) { return root.querySelector('#' + id); }

  function renderQuestion() {
    answered = false;
    const q = QUESTIONS[qIdx];
    $('q-cat').textContent = q.cat;
    $('q-text').textContent = q.q;
    $('qnum').textContent = qIdx + 1;
    $('progress').style.width = `${((qIdx + 1) / QUESTIONS.length) * 100}%`;
    const opts = $('options');
    opts.innerHTML = '';
    q.options.forEach((text, i) => {
      const div = document.createElement('div');
      div.className = 'opt';
      div.dataset.idx = i;
      div.innerHTML = `<span class="opt-letter">${'ABCD'[i]}</span><span>${text}</span>`;
      div.addEventListener('click', () => onAnswer(i));
      opts.appendChild(div);
    });
    $('explain').classList.remove('show');
    $('explain').textContent = q.explain;
    $('next-btn').classList.remove('show');
    qStartTime = performance.now();
    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    function update() {
      if (answered) return;
      const elapsed = (performance.now() - qStartTime) / 1000;
      const remaining = Math.max(0, TIME_PER_Q - elapsed);
      $('timer').textContent = remaining.toFixed(1) + 's';
      $('timer-bar').style.width = (remaining / TIME_PER_Q * 100) + '%';
      if (remaining <= 0) {
        onAnswer(-1); // timeout
      }
    }
    update();
    timerInterval = setInterval(update, 100);
  }

  function onAnswer(idx) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);
    const q = QUESTIONS[qIdx];
    const isCorrect = idx === q.correct;
    const opts = $('options').children;
    for (let i = 0; i < opts.length; i++) {
      opts[i].classList.add('disabled');
      if (i === q.correct) opts[i].classList.add('correct');
      else if (i === idx) opts[i].classList.add('wrong');
    }
    if (isCorrect) {
      const elapsed = (performance.now() - qStartTime) / 1000;
      const speedBonus = Math.max(0, Math.floor((TIME_PER_Q - elapsed) * 0.5));
      streak++;
      const streakBonus = Math.min(streak - 1, 5) * 2;
      const pts = 10 + speedBonus + streakBonus;
      score += pts;
      correct++;
      if (streak >= 2) {
        $('streak-wrap').style.display = 'inline-flex';
        $('streak').textContent = streak;
      }
    } else {
      streak = 0;
      $('streak-wrap').style.display = 'none';
    }
    $('score').textContent = score;
    $('explain').classList.add('show');
    $('next-btn').classList.add('show');
  }

  $('next-btn').addEventListener('click', () => {
    qIdx++;
    if (qIdx >= QUESTIONS.length) {
      finishQuiz();
    } else {
      renderQuestion();
    }
  });

  async function finishQuiz() {
    const durationMs = Math.round(performance.now() - startTime);
    await submitAttempt({
      version: 'sac-ky-quiz',
      score, correct, total: QUESTIONS.length, durationMs,
      details: { topics: QUESTIONS.map((q) => q.cat) },
    });
    $('modal-score').textContent = score;
    $('modal-details').innerHTML = [
      ['Câu đúng', correct + '/10'],
      ['Thời gian', (durationMs / 1000).toFixed(1) + 's'],
      ['Streak cao nhất', streak >= 2 ? streak : '-'],
    ].map(([k, v]) => `<div class="row"><span>${k}</span><b>${v}</b></div>`).join('');
    $('modal').classList.add('show');
  }

  $('modal-replay').addEventListener('click', () => {
    qIdx = 0; score = 0; streak = 0; correct = 0;
    startTime = performance.now();
    $('modal').classList.remove('show');
    $('score').textContent = 0;
    $('streak-wrap').style.display = 'none';
    renderQuestion();
  });

  renderQuestion();
})();
