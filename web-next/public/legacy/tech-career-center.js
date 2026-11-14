// ⚠️ CONTENT-IN-CODE TẠM THỜI — nguồn mirror từ inline <script> của trang gốc
// public/tech-career-center.html. Toàn bộ nội dung nghiệp vụ của trung tâm hướng
// nghiệp CNTT (bộ câu hỏi AI Career Coach `CQ`/`CAREER`, cẩm nang vị trí `ROLES`,
// case study `CASE`, 3 mini-game nhập vai dev/tester/security, và LỘ TRÌNH +
// CÂY KỸ NĂNG `SKILLS`/`ROADMAP` req #37) đều là CONTENT — ĐÁNG RA phải ở DB và
// fetch qua API. Hiện CHƯA có endpoint/bảng nào cho content này, nên theo đúng
// chiến lược wrap-mount ta GIỮ nguồn cũ ở đây (ngoài cây app/ của Next) thay vì
// nhân bản content vào .tsx.
// TODO(risk): seed nội dung vào DB (career_quiz / it_roles / it_case_study /
//   it_roadmap+skill_tree) + tạo GET API tương ứng, rồi đổi mount này sang fetch.
//
// LƯU Ý API: syncXP() gọi POST /api/wallet/earn (best-effort). Endpoint này HIỆN
// CHƯA tồn tại ở server Express (không có route /api/wallet/earn) → call sẽ 404
// nhưng được nuốt bằng .catch(()=>{}), GIỮ NGUYÊN hành vi "im lặng nếu guest/lỗi"
// của bản gốc. Cần bổ sung route /api/wallet/earn để XP thực sự cộng vào tài khoản.

(function () {
  const root = document.getElementById('tcc-root');
  if (!root) return;
  if (root.dataset.mounted === '1') return; // idempotent (StrictMode / remount)
  root.dataset.mounted = '1';

  const el = id => root.querySelector('#' + CSS.escape(id));
  const KEY = 'tizia:career-center:v1';
  let state = {}; try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  state.done = state.done || {};   // {activityId:true}
  state.xp = state.xp || 0;
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  function renderXP() { el('xp').textContent = state.xp; el('doneCount').textContent = Object.keys(state.done).length; }
  function award(act, pts) { if (!state.done[act]) { state.done[act] = true; state.xp += pts; save(); renderXP(); syncXP(pts); } }
  // Cộng XP lên tài khoản nếu đã đăng nhập (best-effort, im lặng nếu guest)
  function syncXP(pts) { try { fetch('/api/wallet/earn', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ amount: pts, reason: 'career-center' }) }).catch(() => {}); } catch (e) {} }

  function show(id) { root.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === id)); window.scrollTo(0, 0); }
  root.querySelectorAll('[data-go]').forEach(c => c.querySelector('.cbtn').onclick = () => { const id = c.dataset.go; show(id); INIT[id] && INIT[id](); });
  root.querySelectorAll('[data-back]').forEach(b => b.onclick = () => show('dashboard'));

  // ───────────────── 1. CAREER QUIZ ─────────────────
  const CQ = [
    { q: 'Bạn thích phần nào nhất của một ứng dụng?', a: [
      ['Xây dựng tính năng chạy được', 'dev'], ['Tìm xem nó hỏng ở đâu', 'test'],
      ['Giữ cho nó an toàn', 'sec'], ['Hiểu người dùng cần gì qua số liệu', 'data'] ] },
    { q: 'Cuối tuần rảnh, bạn có xu hướng…', a: [
      ['Tự code một dự án nhỏ', 'dev'], ['Mày mò bẻ khoá / thử phá game', 'sec'],
      ['Vẽ lại giao diện app mình hay dùng', 'design'], ['Lập bảng tính theo dõi chi tiêu', 'data'] ] },
    { q: 'Khi làm nhóm, bạn thường là người…', a: [
      ['Lên kế hoạch, chia việc, deadline', 'pm'], ['Viết phần lõi xử lý', 'dev'],
      ['Kiểm tra lại mọi thứ trước khi nộp', 'test'], ['Làm cho bài trình bày đẹp', 'design'] ] },
    { q: 'Một câu khiến bạn hứng thú nhất?', a: [
      ['"Làm sao cho nhanh hơn 10 lần?"', 'dev'], ['"Liệu có cách nào hack được không?"', 'sec'],
      ['"Con số này đang nói điều gì?"', 'data'], ['"Trải nghiệm này đã đủ mượt chưa?"', 'design'] ] },
    { q: 'Bạn khó chịu nhất khi…', a: [
      ['Code chạy sai mà không rõ vì sao', 'dev'], ['Phát hiện lỗ hổng mà không ai vá', 'sec'],
      ['Sản phẩm ra mắt còn đầy bug', 'test'], ['Dự án trễ hạn, mất kiểm soát', 'pm'] ] },
  ];
  const CAREER = {
    dev:    { ic: '💻', name: 'Lập trình viên (Developer)', d: 'Bạn thích kiến tạo. Hợp với nghề viết phần mềm: web, mobile, backend. Học chắc thuật toán + 1 ngôn ngữ, làm nhiều dự án thật.' },
    test:   { ic: '🔍', name: 'Kiểm thử viên (Tester/QA)', d: 'Bạn tỉ mỉ, thích "bắt lỗi". Hợp với đảm bảo chất lượng phần mềm: viết test case, automation test, tư duy phản biện.' },
    sec:    { ic: '🔒', name: 'Kỹ sư An toàn thông tin', d: 'Bạn tò mò về cách mọi thứ có thể bị phá. Hợp với bảo mật: pentest, phòng thủ, CTF. Học mạng + hệ điều hành thật vững.' },
    data:   { ic: '📊', name: 'Phân tích dữ liệu (Data Analyst)', d: 'Bạn thích con số kể chuyện. Hợp với phân tích dữ liệu: SQL, thống kê, trực quan hoá, dần tiến tới Data Science.' },
    design: { ic: '🎨', name: 'Thiết kế UI/UX', d: 'Bạn quan tâm trải nghiệm người dùng. Hợp với thiết kế giao diện/trải nghiệm: Figma, nghiên cứu người dùng, tư duy thẩm mỹ + logic.' },
    pm:     { ic: '📋', name: 'Quản lý dự án (PM)', d: 'Bạn giỏi tổ chức và kết nối. Hợp với quản lý dự án/sản phẩm: lập kế hoạch, điều phối nhóm, giao tiếp với khách hàng.' },
  };
  let cqIdx = 0, cqScore = {};
  const INIT_career = () => { cqIdx = 0; cqScore = {}; renderCQ(); };
  function renderCQ() {
    if (cqIdx >= CQ.length) { return resultCQ(); }
    const item = CQ[cqIdx];
    el('cqProg').textContent = 'Câu ' + (cqIdx + 1) + '/' + CQ.length;
    el('cqBody').innerHTML = '<p style="font-size:16px;font-weight:600;margin:0 0 14px">' + item.q + '</p>' +
      item.a.map((o, i) => '<button class="opt" data-i="' + i + '">' + o[0] + '</button>').join('');
    el('cqBody').querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const tag = item.a[+b.dataset.i][1]; cqScore[tag] = (cqScore[tag] || 0) + 1; cqIdx++; renderCQ();
    });
  }
  function resultCQ() {
    const top = Object.entries(cqScore).sort((a, b) => b[1] - a[1])[0]?.[0] || 'dev';
    const c = CAREER[top];
    el('cqProg').textContent = 'Kết quả';
    el('cqBody').innerHTML = '<div style="text-align:center;padding:10px 0"><div style="font-size:54px">' + c.ic + '</div>' +
      '<h2 style="margin:6px 0">' + c.name + '</h2><p style="color:var(--muted);font-size:14.5px;line-height:1.6;max-width:460px;margin:0 auto 16px">' + c.d + '</p>' +
      '<button class="cbtn" id="cqAgain">Làm lại</button></div>';
    el('cqAgain').onclick = INIT_career;
    award('career', 20);
  }

  // ───────────────── 2. ROLE GUIDE ─────────────────
  const ROLES = [
    { ic: '💻', nm: 'Developer', daily: 'Viết và sửa code để tạo tính năng; đọc yêu cầu, thiết kế giải pháp, review code của đồng đội, fix bug.', skills: ['Thuật toán', '1+ ngôn ngữ', 'Git', 'Tư duy logic'], tools: ['VS Code', 'GitHub', 'Docker'] },
    { ic: '🔍', nm: 'Tester / QA', daily: 'Viết kịch bản kiểm thử, chạy test thủ công và tự động, báo cáo bug, đảm bảo phần mềm chạy đúng trước khi phát hành.', skills: ['Tư duy phản biện', 'Tỉ mỉ', 'Test automation'], tools: ['Selenium', 'Postman', 'Jira'] },
    { ic: '🔒', nm: 'Cybersecurity', daily: 'Rà soát lỗ hổng, kiểm thử xâm nhập, dựng tường lửa, theo dõi tấn công và ứng cứu sự cố bảo mật.', skills: ['Mạng', 'Hệ điều hành', 'Pentest', 'CTF'], tools: ['Kali Linux', 'Burp Suite', 'Wireshark'] },
    { ic: '📊', nm: 'Data Analyst', daily: 'Thu thập và làm sạch dữ liệu, truy vấn SQL, phân tích xu hướng, trực quan hoá và đề xuất quyết định dựa trên số liệu.', skills: ['SQL', 'Thống kê', 'Trực quan hoá'], tools: ['Excel', 'Power BI', 'Python'] },
    { ic: '🎨', nm: 'UI/UX Designer', daily: 'Nghiên cứu người dùng, vẽ wireframe và prototype, thiết kế giao diện, phối hợp với dev để hiện thực hoá.', skills: ['Thẩm mỹ', 'Nghiên cứu UX', 'Wireframe'], tools: ['Figma', 'Adobe XD'] },
    { ic: '📋', nm: 'Project Manager', daily: 'Lập kế hoạch, chia việc, theo dõi tiến độ, quản lý rủi ro và giao tiếp giữa khách hàng với đội kỹ thuật.', skills: ['Tổ chức', 'Giao tiếp', 'Quản lý rủi ro'], tools: ['Jira', 'Trello', 'Notion'] },
  ];
  let guideSeen = 0;
  const INIT_guide = () => {
    el('roleGrid').innerHTML = ROLES.map((r, i) => '<div class="role" data-i="' + i + '"><div class="ic">' + r.ic + '</div><div class="nm">' + r.nm + '</div></div>').join('');
    el('roleDetail').innerHTML = 'Chọn một vị trí phía trên để xem "ai làm việc gì".';
    guideSeen = 0;
    el('roleGrid').querySelectorAll('.role').forEach(d => d.onclick = () => {
      el('roleGrid').querySelectorAll('.role').forEach(x => x.classList.remove('sel')); d.classList.add('sel');
      const r = ROLES[+d.dataset.i];
      el('roleDetail').innerHTML = '<h4>' + r.ic + ' ' + r.nm + '</h4>' +
        '<div class="lbl">Công việc hằng ngày</div><div style="margin-bottom:8px">' + r.daily + '</div>' +
        '<div class="lbl">Kỹ năng cần</div><div class="chips">' + r.skills.map(s => '<span class="chip">' + s + '</span>').join('') + '</div>' +
        '<div class="lbl">Công cụ phổ biến</div><div class="chips">' + r.tools.map(t => '<span class="chip">' + t + '</span>').join('') + '</div>';
      guideSeen++; if (guideSeen >= 3) award('guide', 15);
    });
  };

  // ───────────────── 3. CASE STUDY ─────────────────
  const CASE = [
    { n: '✍️', t: 'Viết code', d: 'Lập trình viên nhận yêu cầu "thêm nút Chia sẻ", tạo nhánh Git mới và viết code tính năng.' },
    { n: '👀', t: 'Code review', d: 'Đồng đội đọc lại code qua Pull Request, góp ý đặt tên biến, gợi ý cách viết gọn hơn, đảm bảo theo chuẩn nhóm.' },
    { n: '🧪', t: 'Unit test', d: 'Viết test tự động kiểm tra nút Chia sẻ hoạt động đúng với mọi trường hợp (mạng yếu, chưa đăng nhập…).' },
    { n: '⚙️', t: 'CI/CD build', d: 'Hệ thống tự động build và chạy toàn bộ test khi code được đẩy lên. Đỏ = chặn, xanh = qua.' },
    { n: '🔍', t: 'QA kiểm thử', d: 'Tester thử trên nhiều thiết bị thật, tìm lỗi giao diện và trải nghiệm trước khi cho ra mắt.' },
    { n: '🚀', t: 'Merge & Deploy', d: 'Code được gộp vào nhánh chính và triển khai lên máy chủ. Người dùng bắt đầu thấy tính năng mới.' },
    { n: '📦', t: 'Bàn giao & theo dõi', d: 'Đội vận hành theo dõi log, đo hiệu năng, thu phản hồi người dùng để cải tiến vòng tiếp theo.' },
  ];
  let caseSeen = 0;
  const INIT_case = () => {
    el('caseSteps').innerHTML = CASE.map((s, i) => '<div class="step" data-i="' + i + '"><span class="n">' + s.n + '</span>' + s.t + '</div>').join('');
    caseSeen = 0; pickCase(0);
    el('caseSteps').querySelectorAll('.step').forEach(s => s.onclick = () => pickCase(+s.dataset.i));
  };
  function pickCase(i) {
    el('caseSteps').querySelectorAll('.step').forEach((s, j) => s.classList.toggle('active', j === i));
    el('caseDetail').innerHTML = '<h4 style="margin:0 0 6px">' + CASE[i].n + ' Bước ' + (i + 1) + ': ' + CASE[i].t + '</h4>' + CASE[i].d;
    caseSeen++; if (caseSeen >= 5) award('case', 15);
  }

  // ───────────────── 4. DEV GAME (fix UI) ─────────────────
  const DEV_OPTS = [
    { code: '.loginRow { display:flex; justify-content:center; }', ok: true, fb: 'Chính xác! display:flex + justify-content:center căn nút vào giữa theo chiều ngang.' },
    { code: '.loginBtn { color: red; }', ok: false, fb: 'Đổi màu chữ không liên quan đến vị trí — nút vẫn lệch.' },
    { code: '.loginRow { font-size: 20px; }', ok: false, fb: 'Cỡ chữ không căn lề được — nút vẫn nằm bên trái.' },
    { code: '.loginBtn { margin-top: 10px; }', ok: false, fb: 'margin-top chỉ đẩy xuống dưới, không căn ngang.' },
  ];
  const INIT_dev = () => {
    el('loginRow').classList.remove('fixed'); el('devWin').classList.remove('show'); el('devFb').className = 'fb';
    el('devOpts').innerHTML = DEV_OPTS.map((o, i) => '<button class="opt" data-i="' + i + '" style="font-family:ui-monospace,monospace;font-size:13px">' + o.code + '</button>').join('');
    el('devOpts').querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const o = DEV_OPTS[+b.dataset.i];
      el('devFb').className = 'fb show ' + (o.ok ? 'ok' : 'no'); el('devFb').textContent = o.fb;
      if (o.ok) {
        el('loginRow').classList.add('fixed');
        el('devOpts').querySelectorAll('.opt').forEach((x, j) => { x.disabled = true; if (DEV_OPTS[j].ok) x.classList.add('correct'); });
        el('devWin').classList.add('show'); award('dev', 25);
      } else { b.classList.add('wrong'); }
    });
  };

  // ───────────────── 5. TESTER GAME (find 3 bugs) ─────────────────
  const PAY_LINES = [
    { t: 'Sản phẩm: Gói VinaApp Premium', bug: false },
    { t: 'Đơn giá: 250.000đ', bug: false },
    { t: 'Số lượng: 1', bug: false },
    { t: 'Tổng cộng: -250.000đ', bug: true, why: 'Tổng tiền bị ÂM — lỗi tính toán nghiêm trọng.' },
    { t: 'Số thẻ: undefined', bug: true, why: 'Hiện chữ "undefined" — dữ liệu chưa được nối đúng.' },
    { t: 'Phương thức: Thẻ tín dụng', bug: false },
    { t: '[ Thanh toántoán ]', bug: true, why: 'Nhãn nút bị lặp chữ — lỗi chính tả/giao diện.' },
  ];
  let foundBugs = 0;
  const INIT_test = () => {
    foundBugs = 0; el('testCount').textContent = 'Đã tìm: 0/3'; el('testWin').classList.remove('show'); el('testFb').className = 'fb';
    el('bugScreen').innerHTML = PAY_LINES.map((l, i) => '<div class="line' + (l.bug ? ' bug' : '') + '" data-i="' + i + '">' + l.t + '</div>').join('');
    el('bugScreen').querySelectorAll('.line').forEach(d => d.onclick = () => {
      const l = PAY_LINES[+d.dataset.i];
      if (l.bug && !d.classList.contains('found')) {
        d.classList.add('found'); foundBugs++; el('testCount').textContent = 'Đã tìm: ' + foundBugs + '/3';
        el('testFb').className = 'fb show ok'; el('testFb').textContent = '🐞 Bug! ' + l.why;
        if (foundBugs >= 3) { el('testWin').classList.add('show'); award('test', 25); }
      } else if (!l.bug) {
        el('testFb').className = 'fb show no'; el('testFb').textContent = 'Dòng này đúng, không phải lỗi. Thử dòng khác nhé.';
      }
    });
  };

  // ───────────────── 6. SECURITY GAME (patch vuln) ─────────────────
  const SEC = [
    { sit: 'Log đăng nhập VinaApp xuất hiện chuỗi lạ ở ô tên đăng nhập: <code>\' OR 1=1 --</code>. Hệ thống cho đăng nhập mà không cần mật khẩu đúng!',
      opts: [ ['Dùng câu truy vấn tham số hoá (prepared statement), không ghép chuỗi SQL', true],
             ['Nâng cấp RAM cho máy chủ', false], ['Đổi màu nút Đăng nhập', false], ['Xoá toàn bộ log để giấu sự cố', false] ],
      ok: 'Đúng! Đây là tấn công SQL Injection. Dùng prepared statement để dữ liệu người dùng không bị hiểu là câu lệnh SQL.' },
    { sit: 'Rà soát thấy mật khẩu người dùng đang lưu thẳng dạng chữ ("123456") trong cơ sở dữ liệu.',
      opts: [ ['Băm (hash) mật khẩu bằng bcrypt + salt trước khi lưu', true],
             ['Lưu thêm bản sao để phòng mất', false], ['Đặt mật khẩu dài hơn cho admin', false], ['Mã hoá tên người dùng thay vì mật khẩu', false] ],
      ok: 'Đúng! Không bao giờ lưu mật khẩu dạng thô. Hash + salt (bcrypt) để kẻ trộm DB cũng không đọc được.' },
    { sit: 'Khoá API bí mật của VinaApp bị thấy nằm ngay trong mã JavaScript chạy ở trình duyệt người dùng.',
      opts: [ ['Đưa khoá về máy chủ (backend), không để lộ ở frontend', true],
             ['Đổi tên biến cho khó đoán', false], ['Thu nhỏ (minify) file JS', false], ['Thêm chú thích "đừng xem"', false] ],
      ok: 'Đúng! Bí mật phải nằm ở backend. Mọi thứ gửi xuống trình duyệt đều có thể bị đọc — đổi tên/minify không phải bảo mật.' },
  ];
  let secIdx = 0;
  const INIT_sec = () => { secIdx = 0; renderSec(); };
  function renderSec() {
    if (secIdx >= SEC.length) {
      el('secProg').textContent = 'Hoàn thành';
      el('secBody').innerHTML = '<div class="winbanner show"><div class="em">🛡️</div><b>Đã vá toàn bộ lỗ hổng!</b><br><span style="color:var(--muted);font-size:13.5px">VinaApp an toàn trở lại. +25 điểm kinh nghiệm.</span></div>';
      award('sec', 25); return;
    }
    const s = SEC[secIdx];
    el('secProg').textContent = 'Sự cố ' + (secIdx + 1) + '/' + SEC.length;
    el('secBody').innerHTML = '<div class="roleDetail" style="margin-bottom:14px">🚨 ' + s.sit + '</div>' +
      s.opts.map((o, i) => '<button class="opt" data-i="' + i + '">' + o[0] + '</button>').join('') +
      '<div class="fb" id="secFb"></div>';
    el('secBody').querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const o = s.opts[+b.dataset.i];
      const fb = el('secFb');
      if (o[1]) {
        el('secBody').querySelectorAll('.opt').forEach((x, j) => { x.disabled = true; if (s.opts[j][1]) x.classList.add('correct'); });
        fb.className = 'fb show ok'; fb.textContent = s.ok;
        setTimeout(() => { secIdx++; renderSec(); }, 1700);
      } else { b.classList.add('wrong'); fb.className = 'fb show no'; fb.textContent = 'Chưa đúng — cách này không vá được lỗ hổng. Thử lại.'; }
    });
  }

  // ───────────────── 7. ROADMAP & SKILL TREE (req #37) ─────────────────
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // Link tới một KHÔNG GIAN kiến thức có sẵn trên campus Trường CNTT (req #41 Chu Thi Hue:
  // "kiến thức mỗi vị trí phải link ngay tới trang kiến thức có sẵn trên campus"). Trước đây
  // skill trỏ /module.html?module=Ix.x — nhưng các module đó là placeholder RỖNG (chưa có nội
  // dung) nên bấm vào trống trơn. Nay mỗi skill trỏ THẲNG tới trang thực hành thật (href) hoặc
  // không gian có bài kiến thức tương tác (space → /space?b=<key>&domain=it).
  const spaceHref = key => '/space?b=' + encodeURIComponent(key) + '&domain=it';

  // Từ điển kỹ năng dùng chung cho mọi lộ trình. Ưu tiên đích khi mở:
  //   `href` = trang thực hành trực tiếp · `space` = không gian kiến thức trên campus ·
  //   `res`  = kỹ năng chưa có sẵn trên campus → lý thuyết nhanh + nguồn tự học uy tín.
  const SKILLS = {
    py:    { ic: '🐍', label: 'Nhập môn Python',     href: '/it-code-lab.html?domain=it&contest=325049', d: 'Ngôn ngữ lập trình phổ biến, dễ học — nền tảng cho mọi nhánh CNTT. Học biến, vòng lặp, hàm, cấu trúc dữ liệu cơ bản.' },
    math:  { ic: '➗', label: 'Toán & Logic',        d: 'Toán rời rạc, logic, xác suất–thống kê: nền tảng tư duy cho giải thuật, AI và phân tích dữ liệu.',
             res: [['Khan Academy — Toán rời rạc', 'https://vi.khanacademy.org/math'], ['roadmap.sh — Computer Science', 'https://roadmap.sh/computer-science']] },
    arch:  { ic: '🖥️', label: 'Kiến trúc máy tính',  d: 'Cách máy tính hoạt động: CPU, bộ nhớ, biểu diễn nhị phân — hiểu để viết code hiệu quả.',
             res: [['roadmap.sh — Computer Science', 'https://roadmap.sh/computer-science'], ['CS50 — Harvard (miễn phí)', 'https://cs50.harvard.edu/x/']] },
    linux: { ic: '🐧', label: 'Hệ điều hành Linux',  space: 'netlab', d: 'Dòng lệnh, quản lý tiến trình, file, quyền. Kỹ năng bắt buộc cho DevOps, bảo mật và server.',
             res: [['Linux Journey (căn bản)', 'https://linuxjourney.com/'], ['roadmap.sh — Linux', 'https://roadmap.sh/linux']] },
    ctdl:  { ic: '🧮', label: 'CTDL & Giải thuật',   href: '/it-algo-viz.html?domain=it', d: 'Mảng, danh sách, cây, đồ thị + thuật toán sắp xếp, tìm kiếm. "Xương sống" của lập trình viên giỏi.' },
    oop:   { ic: '🧩', label: 'Lập trình HĐT (OOP)', space: 'codelab', d: 'Tư duy hướng đối tượng: lớp, kế thừa, đa hình — cách tổ chức code lớn, dễ bảo trì.' },
    sql:   { ic: '🗃️', label: 'Cơ sở dữ liệu SQL',   href: '/it-sql-playground.html?domain=it', d: 'Thiết kế bảng, truy vấn SELECT/JOIN, tối ưu. Mọi ứng dụng đều cần lưu và truy xuất dữ liệu.' },
    net:   { ic: '🌐', label: 'Mạng máy tính',       space: 'netlab', d: 'TCP/IP, HTTP, DNS, mô hình OSI. Hiểu mạng để làm web, cloud, và đặc biệt là an toàn thông tin.' },
    web:   { ic: '🎨', label: 'Thiết kế Web',        href: '/it-web-playground.html?domain=it', d: 'HTML, CSS, JavaScript — dựng giao diện chạy trên trình duyệt, bước đầu của web & mobile.' },
    ktpm:  { ic: '🏗️', label: 'Kỹ thuật phần mềm',   space: 'library', d: 'Quy trình phát triển phần mềm: phân tích yêu cầu, thiết kế, kiểm thử, làm việc nhóm theo Agile.' },
    ai:    { ic: '🧠', label: 'Trí tuệ nhân tạo',    space: 'ailab', d: 'Tìm kiếm, suy luận, học máy cơ bản — nền tảng để xây dựng hệ thống thông minh.' },
    ml:    { ic: '🤖', label: 'Machine Learning',    space: 'ailab', d: 'Mô hình học từ dữ liệu: hồi quy, phân loại, mạng nơ-ron. Kỹ năng lõi của AI/ML Engineer.' },
    full:  { ic: '🧱', label: 'Web Full-stack',      href: '/it-web-playground.html?domain=it', d: 'Node.js + React: làm cả backend lẫn frontend, dựng ứng dụng web hoàn chỉnh đầu–cuối.' },
    mob:   { ic: '📱', label: 'Mobile Dev',          space: 'webstudio', d: 'Xây ứng dụng Android/iOS: vòng đời màn hình, gọi API, lưu dữ liệu, đưa app lên store.' },
    devops:{ ic: '☁️', label: 'DevOps & Cloud',      space: 'cloudcenter', d: 'Tự động hoá build–deploy, container, giám sát hệ thống trên cloud (AWS/GCP).' },
    sec:   { ic: '🛡️', label: 'An toàn thông tin',   href: '/it-cipher-ctf.html?domain=it', d: 'Lỗ hổng web, mã hoá, phòng thủ & tấn công có đạo đức. Nghề đang rất khát nhân lực.' },
    patt:  { ic: '📐', label: 'Design Patterns',     d: 'Mẫu thiết kế tái sử dụng (Singleton, Factory, Observer…) giúp code sạch, mở rộng dễ.',
             res: [['refactoring.guru — Design Patterns', 'https://refactoring.guru/design-patterns'], ['roadmap.sh — Software Design', 'https://roadmap.sh/software-design-architecture']] },
    cloud: { ic: '⛅', label: 'Điện toán đám mây',    space: 'cloudcenter', d: 'Triển khai và vận hành dịch vụ trên AWS/GCP/Azure: máy ảo, lưu trữ, mở rộng tự động.' },
    ds:    { ic: '📈', label: 'Khoa học dữ liệu',     space: 'ailab', d: 'Toàn trình xử lý dữ liệu: thu thập, làm sạch, mô hình hoá, kể chuyện bằng dữ liệu.' },
    git:   { ic: '🔧', label: 'Git & GitHub',        space: 'codelab', d: 'Quản lý phiên bản code, làm việc nhóm qua branch/commit/pull request. Kỹ năng dùng hằng ngày của mọi lập trình viên.',
             res: [['roadmap.sh — Git & GitHub', 'https://roadmap.sh/git-github'], ['Tài liệu Git chính thức (tiếng Việt)', 'https://git-scm.com/book/vi/v2']] },
    viz:   { ic: '📊', label: 'Trực quan hoá dữ liệu', d: 'Biến số liệu thành biểu đồ dễ hiểu để ra quyết định: bar, line, scatter, dashboard.',
             res: [['Power BI — Microsoft Learn', 'https://learn.microsoft.com/training/powerbi/'], ['Data Visualization — freeCodeCamp', 'https://www.freecodecamp.org/learn/data-visualization/']] },
    docker:{ ic: '🐳', label: 'Docker & Container',  space: 'cloudcenter', d: 'Đóng gói ứng dụng vào container để chạy giống nhau ở mọi nơi — kỹ năng cốt lõi của DevOps.' },
    cicd:  { ic: '🔁', label: 'CI/CD', d: 'Tự động build, test, triển khai mỗi khi code thay đổi — giúp ra mắt nhanh và an toàn.',
             res: [['roadmap.sh — DevOps', 'https://roadmap.sh/devops'], ['GitHub Actions — tài liệu', 'https://docs.github.com/actions']] },
    ctf:   { ic: '🚩', label: 'Pentest & CTF', href: '/it-ctf-web.html', d: 'Thực hành tìm và khai thác lỗ hổng có đạo đức qua các thử thách Capture-The-Flag.' },
  };

  // Mỗi nghề: thông tin thị trường (insights) + cây kỹ năng theo tầng (cơ bản → nâng cao).
  const ROADMAP = {
    se:   { ic: '👨‍💻', name: 'Software Engineer', desc: 'Thiết kế, viết và bảo trì phần mềm: web, backend, ứng dụng. Giải bài toán bằng code, làm việc nhóm theo quy trình.',
            sal: { intern: '5–8 tr', junior: '12–22 tr', senior: '35–70 tr+' }, demand: 95,
            tree: [['py'], ['ctdl', 'oop'], ['git', 'sql', 'web'], ['ktpm', 'full'], ['patt']] },
    data: { ic: '📊', name: 'Data Analyst / Scientist', desc: 'Biến dữ liệu thô thành insight: truy vấn, phân tích xu hướng, mô hình hoá và đề xuất quyết định.',
            sal: { intern: '6–9 tr', junior: '14–24 tr', senior: '40–75 tr+' }, demand: 90,
            tree: [['py'], ['math', 'sql'], ['viz', 'ml'], ['ds']] },
    devops:{ ic: '☁️', name: 'DevOps Engineer', desc: 'Tự động hoá vòng đời phần mềm: build, deploy, giám sát hạ tầng cloud — cầu nối giữa Dev và vận hành.',
            sal: { intern: '6–9 tr', junior: '15–26 tr', senior: '40–80 tr+' }, demand: 88,
            tree: [['linux'], ['net', 'py'], ['docker', 'cicd'], ['devops', 'cloud']] },
    sec:  { ic: '🛡️', name: 'Cybersecurity Specialist', desc: 'Bảo vệ hệ thống: rà soát lỗ hổng, kiểm thử xâm nhập, ứng cứu sự cố. Ngành đang rất khát nhân lực.',
            sal: { intern: '6–10 tr', junior: '15–28 tr', senior: '45–90 tr+' }, demand: 92,
            tree: [['net'], ['linux', 'py'], ['sec'], ['ctf']] },
    aiml: { ic: '🤖', name: 'AI / ML Engineer', desc: 'Xây dựng hệ thống học máy: xử lý dữ liệu, huấn luyện mô hình, đưa AI vào sản phẩm thực tế.',
            sal: { intern: '7–11 tr', junior: '16–30 tr', senior: '50–100 tr+' }, demand: 93,
            tree: [['py'], ['math', 'ctdl'], ['ai', 'ml'], ['ds']] },
    mobile:{ ic: '📱', name: 'Mobile Developer', desc: 'Phát triển ứng dụng di động Android/iOS: giao diện mượt, gọi API, đưa app lên store.',
            sal: { intern: '5–8 tr', junior: '12–22 tr', senior: '35–65 tr+' }, demand: 82,
            tree: [['py'], ['oop', 'web'], ['mob'], ['full']] },
  };

  let rmRole = 'se', rmSkillOpened = false;
  const INIT_roadmap = () => {
    el('rmRoles').innerHTML = Object.entries(ROADMAP).map(([k, r]) =>
      `<button class="rmRole${k === rmRole ? ' sel' : ''}" data-role="${k}"><span class="ic">${r.ic}</span><span class="nm">${esc(r.name)}</span></button>`).join('');
    el('rmRoles').querySelectorAll('.rmRole').forEach(b => b.onclick = () => selectRole(b.dataset.role));
    selectRole(rmRole);
  };
  function selectRole(k) {
    rmRole = k; const r = ROADMAP[k];
    el('rmRoles').querySelectorAll('.rmRole').forEach(b => b.classList.toggle('sel', b.dataset.role === k));
    el('rmInsights').innerHTML =
      `<h3>${r.ic} ${esc(r.name)}</h3><div class="rmdesc">${esc(r.desc)}</div>` +
      `<div class="salGrid">
        <div class="salBox"><div class="lv">Thực tập</div><div class="vl">${r.sal.intern}</div></div>
        <div class="salBox"><div class="lv">Junior</div><div class="vl">${r.sal.junior}</div></div>
        <div class="salBox"><div class="lv">Senior</div><div class="vl">${r.sal.senior}</div></div>
      </div>` +
      `<div class="demand"><span>🔥 Độ hot tuyển dụng</span><b>${r.demand}/100</b></div>` +
      `<div class="demandBar"><i style="width:${r.demand}%"></i></div>`;
    renderTree(r.tree);
  }
  function renderTree(tree) {
    const W = 680, levelH = 104, nodeH = 44, topPad = 16;
    const H = topPad * 2 + (tree.length - 1) * levelH + nodeH;
    const pos = {};
    tree.forEach((lvl, li) => {
      const y = topPad + li * levelH, n = lvl.length;
      lvl.forEach((key, ki) => {
        const s = SKILLS[key] || { label: key };
        const w = Math.min(210, Math.max(104, s.label.length * 8 + 30));
        pos[key] = { x: W * (ki + 1) / (n + 1), y, w };
      });
    });
    let edges = '';
    for (let li = 0; li < tree.length - 1; li++)
      tree[li].forEach(a => tree[li + 1].forEach(b => {
        const p = pos[a], q = pos[b];
        edges += `<path d="M${p.x},${p.y + nodeH} C${p.x},${p.y + nodeH + 44} ${q.x},${q.y - 44} ${q.x},${q.y}" stroke="rgba(34,211,238,.3)" stroke-width="2" fill="none"/>`;
      }));
    let nodes = '';
    tree.forEach(lvl => lvl.forEach(key => {
      const s = SKILLS[key] || { label: key }, p = pos[key];
      const has = !!(s.href || s.space || s.res);
      nodes += `<g class="tnode${has ? ' has' : ''}" data-key="${key}" transform="translate(${p.x - p.w / 2},${p.y})">
        <rect width="${p.w}" height="${nodeH}" rx="11"/>
        <text x="${p.w / 2}" y="${nodeH / 2 + 5}" text-anchor="middle">${esc((s.ic ? s.ic + ' ' : '') + s.label)}</text></g>`;
    }));
    el('rmTree').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cây kỹ năng">${edges}${nodes}</svg>`;
    el('rmTree').querySelectorAll('.tnode.has').forEach(g => g.onclick = () => openSkill(g.dataset.key));
  }
  function openSkill(key) {
    const s = SKILLS[key]; if (!s) return;
    el('skIc').textContent = s.ic || '📘';
    el('skTitle').textContent = s.label;
    el('skDesc').textContent = s.d || '';
    const learn = el('skLearn');
    // Ưu tiên đích trên CAMPUS: trang thực hành trực tiếp (href) → không gian kiến thức (space).
    // Kỹ năng chưa có sẵn trên campus mới rơi xuống nguồn tự học (res). Nếu vừa có space vừa có
    // res (vd Linux, Git) thì hiện cả nút "Học ngay" lẫn danh sách nguồn tham khảo thêm.
    const resHtml = s.res ? '<div class="reslbl">📚 Nguồn tự học uy tín</div><div class="reslist">' +
      s.res.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join('') + '</div>' : '';
    if (s.href) { learn.href = s.href; learn.style.display = ''; learn.textContent = '🚀 Vào thực hành ngay'; el('skRes').innerHTML = resHtml; }
    else if (s.space) { learn.href = spaceHref(s.space); learn.style.display = ''; learn.textContent = '🚀 Học ngay trên campus'; el('skRes').innerHTML = resHtml; }
    else { learn.style.display = 'none'; el('skRes').innerHTML = resHtml; }
    el('skillOvl').classList.add('show');
    if (!rmSkillOpened) { rmSkillOpened = true; award('roadmap', 20); }
  }
  el('skClose').onclick = () => el('skillOvl').classList.remove('show');
  el('skillOvl').onclick = e => { if (e.target === el('skillOvl')) el('skillOvl').classList.remove('show'); };

  // INIT registry
  const INIT = { career: INIT_career, guide: INIT_guide, case: INIT_case, dev: INIT_dev, test: INIT_test, sec: INIT_sec, roadmap: INIT_roadmap };

  // back link theo domain — nút "← Khuôn viên Trường CNTT" trong root
  const backLink = el('back');
  const _dom = new URLSearchParams(location.search).get('domain');
  if (backLink && _dom) backLink.href = '/school.html?domain=' + encodeURIComponent(_dom);
  renderXP();
})();
