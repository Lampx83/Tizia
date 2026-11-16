'use client';

// ============================================================
// CTF Bảo mật Web — sandbox 4 lỗ hổng OWASP (port từ public/it-ctf-web.html).
//   • CH1 SQLi: bypass login bằng payload thoát dấu nháy (regex khớp exploit).
//   • CH2 XSS: render payload trong <iframe sandbox="allow-scripts"> rồi hỏi
//     window.__pwn === 1 qua postMessage (giữ nguyên cơ chế check của trang gốc).
//   • CH3 Path Traversal: giả lập resolve ./public/uploads/${f} → /etc/passwd.
//   • CH4 Command Injection: chuỗi ip phải có separator (; && | $() `) + whoami.
// Các kịch bản/đoạn code dễ tổn thương, gợi ý, bài học phòng thủ và LOGIC CHECKER
// là CƠ CHẾ TRÒ CHƠI (procedural, giống Mật mã & CTF), KHÔNG phải content nghiệp
// vụ trong DB → giữ nguyên trong code như trang gốc, không có API tương ứng.
//
// API thật: khi bắt đủ 4 cờ → submitAttempt POST /api/attempts (server lấy
// player từ session; guest 401 → im lặng), y hệt trang gốc gọi js/api.js.
//
// Thao tác DOM trang vanilla chuyển sang React state + refs. Theme CTF (nền tối
// xanh lá/đỏ, mono, ô payload đỏ hồng) là bản sắc riêng của trang → dùng CSS
// scoped (styled-jsx) với hex gốc, ghi rõ ở risks.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Ch = 'ch1' | 'ch2' | 'ch3' | 'ch4';
type Feedback = { ok: boolean; text: string };

// submitAttempt: POST /api/attempts (server lấy player từ session). Guest 401 → im lặng.
async function submitAttempt(payload: Record<string, unknown>) {
  try {
    const res = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Tên hiển thị (giống getPlayerName của js/api.js: đọc localStorage tizia:playerName).
function getPlayerName(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem('tizia:playerName') || '';
  } catch {
    return '';
  }
}

export default function CtfWebClient() {
  // ── trạng thái tương tác ──
  const [open, setOpen] = useState<Record<Ch, boolean>>({ ch1: true, ch2: false, ch3: false, ch4: false });
  const [hintOpen, setHintOpen] = useState<Record<Ch, boolean>>({ ch1: false, ch2: false, ch3: false, ch4: false });
  const [solved, setSolved] = useState<Set<Ch>>(new Set());
  const [feedback, setFeedback] = useState<Partial<Record<Ch, Feedback>>>({});
  const [toast, setToast] = useState<string | null>(null);
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── input các thử thách ──
  const [ch1u, setCh1u] = useState('');
  const [ch1p, setCh1p] = useState('x');
  const [ch2q, setCh2q] = useState('');
  const [ch3f, setCh3f] = useState('');
  const [ch4ip, setCh4ip] = useState('');

  // ── domain cho link quay lại (giống trang gốc đọc ?domain) ──
  const [domain, setDomain] = useState('it');

  const startTime = useMemo(() => Date.now(), []);
  const finishRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDomain(params.get('domain') || 'it');
  }, []);

  const showToast = useCallback((m: string) => {
    setToast(m);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const setFb = useCallback((id: Ch, ok: boolean, text: string) => {
    setFeedback((f) => ({ ...f, [id]: { ok, text } }));
  }, []);

  const markSolved = useCallback(
    (chId: Ch, scoreText: string) => {
      setSolved((prev) => {
        if (prev.has(chId)) return prev;
        const next = new Set(prev);
        next.add(chId);
        setFb(chId, true, '✓ Đúng rồi! ' + scoreText);
        showToast('🚩 Chiếm cờ #' + chId.slice(2) + '!');
        return next;
      });
    },
    [setFb, showToast],
  );

  // ─── CHALLENGE CHECKERS (giữ nguyên logic trang gốc) ───

  // SQLi: tìm payload làm WHERE name='${u}' AND pass='${p}' → match dù pass sai
  const checkCh1 = useCallback(() => {
    const u = ch1u;
    const p = ch1p;
    const sql = `SELECT * FROM users WHERE name='${u}' AND pass='${p}'`;
    // Tableau giả lập: chỉ có admin/realsecret123. Pass đúng dòng input là 'x'.
    const exploits = [
      /'\s*or\s*('?\d+'?\s*=\s*'?\d+'?|true|'[a-z]'='[a-z]')/i,
      /'\s*or\s+\d+\s*=\s*\d+/i,
      /admin'\s*--/i,
      /admin'\s*#/,
      /admin'\s*\/\*/,
      /'\s*union\s+select/i,
    ];
    const hit = exploits.some((rx) => rx.test(u));
    if (hit && p !== 'realsecret123') {
      markSolved('ch1', `SQL chạy được: <code style="color:#fde68a">${escapeHtml(sql)}</code>`);
    } else if (p === 'realsecret123' && u === 'admin') {
      setFb(
        'ch1',
        false,
        '⚠️ Bạn đoán đúng mật khẩu thật, nhưng mục tiêu là <b>bypass</b> mà không biết password. Thử payload SQLi.',
      );
    } else {
      setFb('ch1', false, '✗ Sai. SQL chạy ra 0 row → đăng nhập thất bại. Thử payload thoát dấu nháy.');
    }
  }, [ch1u, ch1p, markSolved, setFb]);

  // XSS: render payload vào iframe sandbox, check window.__pwn === 1
  const checkCh2 = useCallback(() => {
    const q = ch2q;
    if (!q) {
      setFb('ch2', false, '⚠️ Nhập payload đã.');
      return;
    }
    // Render payload trong iframe sandbox; sau 250ms hỏi xem window.__pwn đã bị set chưa.
    const html = `<!DOCTYPE html><html><body>Bạn tìm: <b>${q}</b>
<script>setTimeout(function(){ parent.postMessage({ type: 'xss-check', pwn: window.__pwn === 1 }, '*'); }, 250);<\/script>
</body></html>`;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.sandbox.add('allow-scripts');
    iframe.srcdoc = html;
    document.body.appendChild(iframe);
    let done = false;
    const onMsg = (e: MessageEvent) => {
      if (!e.data || e.data.type !== 'xss-check') return;
      done = true;
      window.removeEventListener('message', onMsg);
      iframe.remove();
      if (e.data.pwn) markSolved('ch2', 'JS của bạn đã được thi hành trong DOM nạn nhân.');
      else
        setFb(
          'ch2',
          false,
          '✗ Payload chưa thi hành. Nhớ rằng &lt;script&gt; gán qua innerHTML KHÔNG chạy — dùng event handler trên thẻ hợp lệ.',
        );
    };
    window.addEventListener('message', onMsg);
    setTimeout(() => {
      if (!done) {
        window.removeEventListener('message', onMsg);
        if (iframe.parentNode) iframe.remove();
        setFb(
          'ch2',
          false,
          '✗ Hết giờ chờ — payload có thể đã gây lỗi parse. Thử lại với event handler trên thẻ hợp lệ.',
        );
      }
    }, 1200);
  }, [ch2q, markSolved, setFb]);

  // Path traversal: f phải normalize ra /etc/passwd hoặc tương đương
  const checkCh3 = useCallback(() => {
    const f = ch3f.trim();
    if (!f) {
      setFb('ch3', false, '⚠️ Nhập tham số đã.');
      return;
    }
    // Giả lập resolve: ./public/uploads/${f}
    const segments = ('public/uploads/' + f).split('/').filter((s) => s !== '' && s !== '.');
    const stack: string[] = [];
    for (const s of segments) {
      if (s === '..') stack.pop();
      else stack.push(s);
    }
    const resolved = '/' + stack.join('/');
    if (/^\/etc\/passwd$/.test(resolved) || /^\/etc\/shadow$/.test(resolved)) {
      markSolved(
        'ch3',
        `Đã thoát ra ngoài <code>./public/uploads/</code>. Đường dẫn thực: <code style="color:#fde68a">${escapeHtml(resolved)}</code>`,
      );
    } else {
      setFb(
        'ch3',
        false,
        `✗ Đường dẫn quy ra: <code>${escapeHtml(resolved)}</code> — chưa đến /etc/passwd. Tính lại số <code>../</code>.`,
      );
    }
  }, [ch3f, markSolved, setFb]);

  // Command injection: chuỗi ip phải có separator + chứa whoami
  const checkCh4 = useCallback(() => {
    const ip = ch4ip.trim();
    if (!ip) {
      setFb('ch4', false, '⚠️ Nhập đã.');
      return;
    }
    // Giả lập: shell parse với ; && | $() backtick
    const hasInjection = /[;&|`$]|\$\(/.test(ip);
    const runsWhoami = /\bwhoami\b/.test(ip);
    if (hasInjection && runsWhoami) {
      markSolved(
        'ch4',
        `Shell sẽ chạy: <code>ping -c 2 ${escapeHtml(ip)}</code> — phần sau separator được exec riêng.`,
      );
    } else if (runsWhoami && !hasInjection) {
      setFb(
        'ch4',
        false,
        '✗ Có whoami rồi, nhưng shell sẽ coi cả chuỗi là 1 hostname. Cần KÝ TỰ NỐI LỆNH (; hoặc &&).',
      );
    } else if (hasInjection && !runsWhoami) {
      setFb('ch4', false, '✗ Có separator rồi, nhưng chưa thấy <code>whoami</code>.');
    } else {
      setFb('ch4', false, '✗ Sai. Mục tiêu: chạy thêm <code>whoami</code> SAU lệnh ping.');
    }
  }, [ch4ip, markSolved, setFb]);

  const CHECKERS: Record<Ch, () => void> = useMemo(
    () => ({ ch1: checkCh1, ch2: checkCh2, ch3: checkCh3, ch4: checkCh4 }),
    [checkCh1, checkCh2, checkCh3, checkCh4],
  );

  // ── khi bắt đủ 4 cờ: hiện finish card + submitAttempt (một lần) ──
  useEffect(() => {
    if (solved.size !== 4 || submittedRef.current) return;
    submittedRef.current = true;
    finishRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    submitAttempt({
      version: 'it-ctf-web',
      player_name: getPlayerName() || 'Ẩn danh',
      score: 100,
      correct: 4,
      total: 4,
      duration_ms: Date.now() - startTime,
      details: { challenges: ['sqli', 'xss', 'lfi', 'rce'] },
    }).catch(() => {});
  }, [solved, startTime]);

  const toggle = (id: Ch) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const toggleHint = (id: Ch) => setHintOpen((h) => ({ ...h, [id]: !h[id] }));
  const onEnter = (id: Ch) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') CHECKERS[id]();
  };

  const backHref = `/school?domain=${encodeURIComponent(domain)}#campus-hero`;

  return (
    <div className="ctf-root">
      <div className="top">
        <a className="back" href={backHref}>
          ← Khuôn viên trường
        </a>
        <div>
          <h1>
            🛡️ CTF Bảo mật Web{' '}
            <span className="sub">— SQLi · XSS · Path Traversal · Command Injection</span>
          </h1>
        </div>
        <div className="prog">{solved.size}/4 cờ</div>
      </div>

      <div className="wrap">
        <div className="card intro">
          <h2>Mục tiêu</h2>
          <p>
            Đây là môi trường <b>sandbox an toàn</b> mô phỏng 4 lỗ hổng bảo mật web phổ biến nhất theo
            OWASP Top 10. Bạn sẽ đóng vai pentester (kẻ tấn công đạo đức) — tìm input để khai thác lỗ
            hổng, hiểu cách lỗ hổng phát sinh, và đọc bài học để biết cách <b>phòng thủ</b> ở đời thật.
          </p>
          <p>
            Mỗi thử thách hiện code dễ tổn thương → bạn nhập payload → hệ thống đánh giá cục bộ. Không
            có server thật bị tấn công.
          </p>
          <div className="warn">
            ⚠️ Kiến thức này chỉ dùng để <b>bảo vệ</b>. Việc tấn công hệ thống không được phép là{' '}
            <b>vi phạm pháp luật</b> (Bộ luật Hình sự 2015 — Điều 287, 289).
          </div>
        </div>

        {/* CH1: SQL INJECTION */}
        <div className={`ch${solved.has('ch1') ? ' solved' : ''}${open.ch1 ? ' open' : ''}`}>
          <div className="ch-head" onClick={() => toggle('ch1')}>
            <span className="num">1</span>
            <span className="ttl">
              Login bypass qua SQL Injection <span className="tag">SQLi</span>
            </span>
            <span className="caret">▶</span>
          </div>
          <div className="ch-body">
            <p className="scen">Hệ thống cũ ghép chuỗi SQL trực tiếp từ form đăng nhập — không hề parameter hoá:</p>
            <div className="code">
              <span className="c">{'// Backend (PHP/Node giả lập)'}</span>
              {'\n'}
              <span className="k">const</span> sql ={' '}
              <span className="s">{"`SELECT * FROM users WHERE name='${u}' AND pass='${p}'`"}</span>;{'\n'}
              <span className="k">if</span> (db.query(sql).rows.length) login();
            </div>
            <p className="scen">
              Có 1 tài khoản tên <code style={{ color: '#fbbf24' }}>admin</code> trong CSDL. Bạn{' '}
              <b>không biết mật khẩu</b> — hãy nhập payload vào ô <i>Tên</i> sao cho query trả về ≥1 row
              (đăng nhập thành công) bất kể mật khẩu là gì.
            </p>
            <label className="lbl">Tên đăng nhập (payload SQLi):</label>
            <input
              className="ipt"
              value={ch1u}
              onChange={(e) => setCh1u(e.target.value)}
              onKeyDown={onEnter('ch1')}
              placeholder="admin' OR ..."
              autoComplete="off"
            />
            <label className="lbl">Mật khẩu (bất kỳ):</label>
            <input
              className="ipt short"
              value={ch1p}
              onChange={(e) => setCh1p(e.target.value)}
              onKeyDown={onEnter('ch1')}
              type="text"
              autoComplete="off"
            />
            <div className="row">
              <button className="btn ghost" onClick={() => toggleHint('ch1')}>
                💡 Gợi ý
              </button>
              <button className="btn act" onClick={() => CHECKERS.ch1()}>
                ▶ Thử đăng nhập
              </button>
            </div>
            <Fb fb={feedback.ch1} />
            {hintOpen.ch1 && (
              <div className="hint">
                💡 Bạn cần thoát khỏi dấu nháy đơn rồi nối điều kiện luôn đúng. Thử:{' '}
                <b>admin&apos; OR &apos;1&apos;=&apos;1</b> — phần sau dấu <code>--</code> hoặc tương
                đương sẽ biến mật khẩu thành vô nghĩa.
              </div>
            )}
            <details className="lesson">
              <summary>📚 Bài học phòng thủ</summary>
              <p>
                • <b>Parameter hoá / Prepared statements</b> — không bao giờ ghép chuỗi vào câu SQL. Dùng{' '}
                <code>db.query(&apos;SELECT * FROM users WHERE name=? AND pass=?&apos;, [u, p])</code>. ORM
                (Prisma, Sequelize, Drizzle) tự làm việc này.
                <br />• <b>Hash mật khẩu</b> với bcrypt/scrypt/argon2 — không lưu plain text.
                <br />• <b>Least privilege</b> — user DB chỉ có quyền cần thiết.
                <br />• <b>WAF + rate limit</b> chặn brute-force/automated payloads.
              </p>
            </details>
          </div>
        </div>

        {/* CH2: XSS */}
        <div className={`ch${solved.has('ch2') ? ' solved' : ''}${open.ch2 ? ' open' : ''}`}>
          <div className="ch-head" onClick={() => toggle('ch2')}>
            <span className="num">2</span>
            <span className="ttl">
              Reflected XSS — chiếm DOM <span className="tag">XSS</span>
            </span>
            <span className="caret">▶</span>
          </div>
          <div className="ch-body">
            <p className="scen">Trang tìm kiếm render thẳng query vào HTML:</p>
            <div className="code">
              <span className="c">{'// Trang /search?q=...'}</span>
              {'\n'}
              results.innerHTML = <span className="s">{'`Bạn tìm: <b>${req.query.q}</b>`'}</span>;
            </div>
            <p className="scen">
              Hãy nhập payload sao cho code JavaScript <b>tự thi hành</b> trên trang — cụ thể: gán{' '}
              <code style={{ color: '#fbbf24' }}>window.__pwn = 1</code> để chứng minh control flow.
            </p>
            <label className="lbl">Query string (payload XSS):</label>
            <input
              className="ipt"
              value={ch2q}
              onChange={(e) => setCh2q(e.target.value)}
              onKeyDown={onEnter('ch2')}
              placeholder={'<img src=x onerror="...">'}
              autoComplete="off"
            />
            <div className="row">
              <button className="btn ghost" onClick={() => toggleHint('ch2')}>
                💡 Gợi ý
              </button>
              <button className="btn act" onClick={() => CHECKERS.ch2()}>
                ▶ Render
              </button>
            </div>
            <Fb fb={feedback.ch2} />
            {hintOpen.ch2 && (
              <div className="hint">
                💡 Thẻ <code>&lt;script&gt;</code> được set qua <code>innerHTML</code> KHÔNG chạy (trình
                duyệt cố tình chặn). Thử event handler trên thẻ hợp lệ:{' '}
                <b>&lt;img src=x onerror=&quot;window.__pwn=1&quot;&gt;</b>
              </div>
            )}
            <details className="lesson">
              <summary>📚 Bài học phòng thủ</summary>
              <p>
                • <b>Output encoding</b> — luôn escape <code>&lt; &gt; &quot; &apos; &amp;</code> khi đưa
                user input vào HTML. Template engine (EJS, Handlebars, JSX) tự escape <code>{'{{var}}'}</code>;
                CHỈ dùng raw <code>{'{{{var}}}'}</code> khi đã sanitize.
                <br />• <b>Content Security Policy (CSP)</b> — header <code>script-src &apos;self&apos;</code>{' '}
                chặn inline script.
                <br />• <b>HttpOnly cookies</b> — JS không đọc được session cookie nếu attacker chiếm được DOM.
                <br />• <b>Sanitize HTML</b> bằng DOMPurify khi BUỘC phải render HTML do user soạn.
              </p>
            </details>
          </div>
        </div>

        {/* CH3: PATH TRAVERSAL */}
        <div className={`ch${solved.has('ch3') ? ' solved' : ''}${open.ch3 ? ' open' : ''}`}>
          <div className="ch-head" onClick={() => toggle('ch3')}>
            <span className="num">3</span>
            <span className="ttl">
              Path Traversal — đọc file bí mật <span className="tag">LFI</span>
            </span>
            <span className="caret">▶</span>
          </div>
          <div className="ch-body">
            <p className="scen">
              Endpoint <code>/download?f=...</code> ghép tham số trực tiếp vào đường dẫn:
            </p>
            <div className="code">
              <span className="c">{'// Backend'}</span>
              {'\n'}
              <span className="k">const</span> p = <span className="s">{'`./public/uploads/${req.query.f}`'}</span>;
              {'\n'}
              res.sendFile(path.resolve(p));
            </div>
            <p className="scen">
              File hệ thống <code style={{ color: '#fbbf24' }}>/etc/passwd</code> (Linux) đang ngoài thư
              mục public. Hãy đặt giá trị <code>f</code> để đọc được file đó.
            </p>
            <label className="lbl">Tham số f (payload):</label>
            <input
              className="ipt"
              value={ch3f}
              onChange={(e) => setCh3f(e.target.value)}
              onKeyDown={onEnter('ch3')}
              placeholder="../../../etc/..."
              autoComplete="off"
            />
            <div className="row">
              <button className="btn ghost" onClick={() => toggleHint('ch3')}>
                💡 Gợi ý
              </button>
              <button className="btn act" onClick={() => CHECKERS.ch3()}>
                ▶ Tải
              </button>
            </div>
            <Fb fb={feedback.ch3} />
            {hintOpen.ch3 && (
              <div className="hint">
                💡 Mỗi <code>../</code> đi lên 1 cấp. Tính từ <code>./public/uploads/</code> cần{' '}
                <b>3 cấp</b> để ra root, rồi <code>etc/passwd</code>. Đáp án: <b>../../../etc/passwd</b>
              </div>
            )}
            <details className="lesson">
              <summary>📚 Bài học phòng thủ</summary>
              <p>
                • <b>Whitelist tên file</b> hoặc map id → tên (vd <code>/download?id=42</code> tra DB).
                <br />• <b>Normalize + validate</b>: <code>path.resolve(p).startsWith(SAFE_DIR)</code> để
                chặn ra ngoài.
                <br />• <b>Block các pattern</b>: <code>..</code>, <code>%2e%2e</code>, byte null.
                <br />• <b>Chroot / container</b> — process không có quyền đọc <code>/etc</code> ngay từ đầu.
              </p>
            </details>
          </div>
        </div>

        {/* CH4: COMMAND INJECTION */}
        <div className={`ch${solved.has('ch4') ? ' solved' : ''}${open.ch4 ? ' open' : ''}`}>
          <div className="ch-head" onClick={() => toggle('ch4')}>
            <span className="num">4</span>
            <span className="ttl">
              Command Injection — thoát khỏi tham số <span className="tag">RCE</span>
            </span>
            <span className="caret">▶</span>
          </div>
          <div className="ch-body">
            <p className="scen">
              Endpoint <code>/ping?ip=...</code> ghép input vào lệnh shell:
            </p>
            <div className="code">
              <span className="c">{'// Backend'}</span>
              {'\n'}
              exec(<span className="s">{'`ping -c 2 ${req.query.ip}`'}</span>, callback);
            </div>
            <p className="scen">
              Mục tiêu: nhập <code>ip</code> sao cho shell <b>chạy thêm</b> lệnh{' '}
              <code style={{ color: '#fbbf24' }}>whoami</code> sau lệnh ping (để xác định mình là user nào).
            </p>
            <label className="lbl">Tham số ip (payload):</label>
            <input
              className="ipt"
              value={ch4ip}
              onChange={(e) => setCh4ip(e.target.value)}
              onKeyDown={onEnter('ch4')}
              placeholder="8.8.8.8 ; ..."
              autoComplete="off"
            />
            <div className="row">
              <button className="btn ghost" onClick={() => toggleHint('ch4')}>
                💡 Gợi ý
              </button>
              <button className="btn act" onClick={() => CHECKERS.ch4()}>
                ▶ Ping
              </button>
            </div>
            <Fb fb={feedback.ch4} />
            {hintOpen.ch4 && (
              <div className="hint">
                💡 Shell có nhiều ký tự chia lệnh: <code>;</code> (chạy lần lượt), <code>&amp;&amp;</code>{' '}
                (chạy nếu thành công), <code>|</code> (pipe), <code>$(...)</code> (command substitution).
                Thử: <b>8.8.8.8 ; whoami</b>
              </div>
            )}
            <details className="lesson">
              <summary>📚 Bài học phòng thủ</summary>
              <p>
                • <b>KHÔNG dùng shell</b> khi không cần — dùng{' '}
                <code>execFile(&apos;ping&apos;, [&apos;-c&apos;, &apos;2&apos;, ip])</code> (Node) hoặc
                thư viện chuyên dụng. Tham số không qua shell parsing.
                <br />• <b>Validate strict</b>: chỉ cho phép IPv4 hợp lệ với regex/parser, từ chối mọi ký
                tự khác.
                <br />• <b>Least privilege</b> + <b>seccomp/AppArmor</b> giới hạn syscall process được phép.
                <br />• Tuyệt đối tránh <code>eval</code>, <code>exec</code>, <code>system</code> với input
                chưa rửa.
              </p>
            </details>
          </div>
        </div>

        <div className={`card finish-card${solved.size === 4 ? ' show' : ''}`} ref={finishRef}>
          <h2 style={{ margin: '0 0 8px', color: '#86efac' }}>🏆 Đã chiếm cả 4 cờ!</h2>
          <p style={{ fontSize: '13.5px', lineHeight: 1.6, opacity: 0.88, margin: '6px 0' }}>
            Bạn đã hiểu cách phát sinh và cách phòng thủ 4 lỗ hổng bảo mật web phổ biến nhất. Hãy ghi nhớ
            một câu duy nhất:{' '}
            <b style={{ color: '#fbbf24' }}>
              Không bao giờ tin user input — luôn validate/parameterize/escape.
            </b>
          </p>
          <p style={{ fontSize: '12.5px', opacity: 0.72, marginTop: '9px' }}>
            Hành trang tiếp theo: tìm hiểu OWASP Top 10 đầy đủ (CSRF, SSRF, IDOR, deserialization…), thử
            nền tảng học thật như PortSwigger Web Security Academy.
          </p>
        </div>
      </div>

      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>

      <style jsx>{`
        .ctf-root {
          --bg-1: #0b1220;
          --bg-2: #0f1830;
          --accent: #10b981;
          --accent-2: #ef4444;
          --border: rgba(255, 255, 255, 0.12);
          --card: rgba(255, 255, 255, 0.05);
          --ok: #22c55e;
          --bad: #ef4444;
          color: #e5edf7;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16, 185, 129, 0.12), transparent),
            linear-gradient(180deg, var(--bg-1), var(--bg-2));
          min-height: 100vh;
          margin: -1rem calc(50% - 50vw) 0;
          width: 100vw;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .ctf-root :global(*) {
          box-sizing: border-box;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          border-bottom: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .back {
          color: #fff;
          text-decoration: none;
          opacity: 0.85;
          font-size: 13.5px;
          background: rgba(255, 255, 255, 0.08);
          padding: 7px 12px;
          border-radius: 9px;
        }
        .back:hover {
          background: rgba(255, 255, 255, 0.16);
        }
        .top h1 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
        }
        .top .sub {
          font-size: 12.5px;
          opacity: 0.6;
          font-weight: 500;
        }
        .top .prog {
          margin-left: auto;
          font-size: 13px;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #86efac;
          padding: 6px 12px;
          border-radius: 20px;
        }
        .wrap {
          max-width: 880px;
          margin: 0 auto;
          padding: 18px 18px 60px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 17px 19px;
        }
        .intro h2 {
          margin: 0 0 8px;
          font-size: 16px;
        }
        .intro p {
          font-size: 13.5px;
          line-height: 1.6;
          opacity: 0.85;
          margin: 6px 0;
        }
        .intro .warn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 10px 12px;
          border-radius: 9px;
          font-size: 12.5px;
          color: #fca5a5;
          margin-top: 10px;
        }
        .ch {
          border-radius: 13px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          padding: 0;
          overflow: hidden;
        }
        .ch-head {
          padding: 13px 17px;
          background: rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }
        .ch-head .num {
          background: var(--accent);
          color: #04210f;
          font-weight: 900;
          font-size: 12px;
          padding: 3px 9px;
          border-radius: 7px;
          min-width: 24px;
          text-align: center;
        }
        .ch.solved .ch-head .num {
          background: var(--ok);
        }
        .ch-head .ttl {
          font-weight: 800;
          font-size: 15px;
          flex: 1;
        }
        .ch-head .ttl :global(.tag) {
          font-size: 10.5px;
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          padding: 2px 7px;
          border-radius: 6px;
          margin-left: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .ch-head .caret {
          font-size: 13px;
          opacity: 0.6;
          transition: 0.2s;
        }
        .ch.open .ch-head .caret {
          transform: rotate(90deg);
        }
        .ch-body {
          padding: 14px 17px 16px;
          display: none;
        }
        .ch.open .ch-body {
          display: block;
        }
        .ch.solved .ch-head .ttl::before {
          content: '✓ ';
          color: var(--ok);
        }
        .scen {
          font-size: 13px;
          line-height: 1.6;
          opacity: 0.88;
          margin: 0 0 12px;
        }
        .scen :global(code) {
          font-family: 'SF Mono', ui-monospace, Menlo, monospace;
        }
        .code {
          background: #0a0f1d;
          border: 1px solid var(--border);
          border-radius: 9px;
          padding: 11px 13px;
          font-family: 'SF Mono', ui-monospace, Menlo, monospace;
          font-size: 12.5px;
          line-height: 1.55;
          color: #fde68a;
          white-space: pre;
          overflow-x: auto;
          margin: 7px 0;
        }
        .code :global(.k) {
          color: #93c5fd;
        }
        .code :global(.s) {
          color: #86efac;
        }
        .code :global(.c) {
          color: #64748b;
          font-style: italic;
        }
        .lbl {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.55;
          display: block;
          margin: 10px 0 5px;
          font-weight: 700;
        }
        .ipt {
          width: 100%;
          background: #0a0f1d;
          color: #fca5a5;
          border: 1px solid var(--border);
          border-radius: 9px;
          padding: 10px 12px;
          font-family: 'SF Mono', ui-monospace, monospace;
          font-size: 13.5px;
        }
        .ipt:focus {
          outline: 2px solid var(--accent);
          border-color: transparent;
        }
        .ipt.short {
          font-size: 14px;
        }
        .row {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
          margin-top: 11px;
          align-items: center;
        }
        .btn {
          border: none;
          border-radius: 9px;
          font-weight: 800;
          font-size: 13px;
          padding: 9px 16px;
          cursor: pointer;
          font-family: inherit;
        }
        .btn.act {
          background: var(--accent);
          color: #04210f;
        }
        .btn.act:hover {
          filter: brightness(1.1);
        }
        .btn.ghost {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .btn.ghost:hover {
          background: rgba(255, 255, 255, 0.16);
        }
        .hint {
          font-size: 12px;
          opacity: 0.65;
          margin-top: 8px;
          line-height: 1.55;
        }
        .hint :global(b) {
          color: #fbbf24;
        }
        .hint :global(code) {
          font-family: 'SF Mono', ui-monospace, Menlo, monospace;
        }
        .lesson {
          margin-top: 11px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 9px;
          padding: 9px 12px;
        }
        .lesson summary {
          cursor: pointer;
          font-weight: 700;
          font-size: 12.5px;
          color: #86efac;
        }
        .lesson :global(p) {
          font-size: 12.5px;
          opacity: 0.86;
          line-height: 1.6;
          margin: 8px 0 0;
        }
        .lesson :global(code) {
          font-family: 'SF Mono', ui-monospace, Menlo, monospace;
        }
        .toast {
          position: fixed;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%) translateY(20px);
          background: var(--ok);
          color: #04210f;
          font-weight: 800;
          padding: 12px 22px;
          border-radius: 13px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: 0.3s;
          z-index: 20;
          pointer-events: none;
        }
        .toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .finish-card {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.4);
          display: none;
        }
        .finish-card.show {
          display: block;
        }
      `}</style>
    </div>
  );
}

// ── feedback box (giữ hành vi .fb .ok/.bad; text có thể chứa HTML nội bộ đã escape input) ──
function Fb({ fb }: { fb?: Feedback }) {
  if (!fb) return <div className="fb" />;
  return (
    <div
      className={`fb show ${fb.ok ? 'ok' : 'bad'}`}
      dangerouslySetInnerHTML={{ __html: fb.text }}
      style={{
        fontSize: '13px',
        marginTop: '9px',
        padding: '8px 11px',
        borderRadius: '8px',
        ...(fb.ok
          ? { background: 'rgba(34,197,94,.12)', color: '#86efac', border: '1px solid rgba(34,197,94,.35)' }
          : { background: 'rgba(239,68,68,.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,.35)' }),
      }}
    />
  );
}

// Escape user input trước khi nhúng vào chuỗi feedback HTML (trang gốc chèn thẳng
// input vào innerHTML — ta escape để phần hiển thị an toàn, giữ nguyên phần khung).
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
