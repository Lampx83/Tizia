'use client';

import { useEffect } from 'react';

// Client mount: dựng đúng khung DOM (dashboard + 7 view career/guide/case/dev/
// test/sec/roadmap + modal kỹ năng) mà script vanilla cần, rồi nạp
// public/legacy/tech-career-center.js SAU khi mount. Script đó giữ NGUYÊN hành vi
// bản public/tech-career-center.html gốc: AI Career Coach quiz, cẩm nang vị trí,
// case study, 3 mini-game nhập vai (dev/tester/security), lộ trình + cây kỹ năng
// (req #37), lưu tiến độ localStorage + best-effort POST /api/wallet/earn.
// TOÀN BỘ nội dung nghiệp vụ nằm trong script legacy — CHƯA có API/DB, xem GHI
// CHÚ ở đầu file .js (cần đưa content lên DB + tạo API).
export default function CareerCenterMount() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = `/legacy/tech-career-center.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div id="tcc-root" className="tcc">
      <div className="wrap">
        <header className="hero">
          <h1>🚀 Trung tâm Hướng nghiệp &amp; Giả lập Công nghệ</h1>
          <p>
            Trạm dừng chân định hướng bản thân, khám phá các lĩnh vực công việc CNTT và nhập vai
            thực tập tại công ty công nghệ giả lập <b>Tizia&nbsp;Tech</b>.
          </p>
          <div className="xpbar">
            <div className="pill">⭐ Điểm: <b id="xp">0</b></div>
            <div className="pill">🏅 Hoàn thành: <b id="doneCount">0</b>/7</div>
          </div>
        </header>

        {/* DASHBOARD */}
        <div className="view active" id="dashboard">
          <div className="group-title">🧭 Nhóm 1 · Định hướng &amp; kiến thức nghề nghiệp</div>
          <div className="cards">
            <div className="ccard" data-go="career"><span className="tag know">ĐỊNH HƯỚNG</span><div className="cic">🧭</div>
              <h3>Bản đồ Nghề nghiệp &amp; AI Quiz</h3>
              <p>Làm trắc nghiệm tính cách nhanh với AI Career Coach để khám phá nhánh ngành CNTT hợp với bạn.</p>
              <button className="cbtn">VÀO TRẢI NGHIỆM</button></div>
            <div className="ccard" data-go="guide"><span className="tag know">CẨM NANG</span><div className="cic">📚</div>
              <h3>Cẩm nang các vị trí công việc</h3>
              <p>Thẻ kiến thức về công việc hằng ngày của Developer, Tester, Cybersecurity, Data Analyst… "Ai làm việc gì?"</p>
              <button className="cbtn">ĐỌC CẨM NANG</button></div>
            <div className="ccard" data-go="case"><span className="tag know">CASE STUDY</span><div className="cic">🔬</div>
              <h3>Ví dụ thực tế &amp; Case Study</h3>
              <p>Vòng đời của một dòng code: từ lúc viết đến khi bàn giao, các phòng ban phối hợp ra sao.</p>
              <button className="cbtn">XEM VÍ DỤ</button></div>
            <div className="ccard" data-go="roadmap"><span className="tag know">LỘ TRÌNH</span><div className="cic">🗺️</div>
              <h3>Sơ đồ Lộ trình &amp; Cây Kỹ năng</h3>
              <p>Chọn vị trí (SE, DevOps, Data, Security, AI/ML…) → xem cây kỹ năng từ cơ bản đến nâng cao, mức lương tham khảo, độ hot &amp; link học ngay từng kỹ năng.</p>
              <button className="cbtn">XEM LỘ TRÌNH</button></div>
          </div>

          <div className="group-title">🎮 Nhóm 2 · Play Roles — Dự án giả lập "VinaApp"</div>
          <div className="cards">
            <div className="ccard play" data-go="dev"><span className="tag play">PLAY ROLE</span><div className="cic">💻</div>
              <h3>Lập trình viên VinaApp</h3>
              <p>Nhận task sửa lỗi nút Đăng nhập bị lệch của VinaApp bằng tư duy lập trình kéo-thả khối lệnh.</p>
              <button className="cbtn">CHƠI NGAY</button></div>
            <div className="ccard play" data-go="test"><span className="tag play">PLAY ROLE</span><div className="cic">🔍</div>
              <h3>Kiểm thử viên VinaApp</h3>
              <p>Nhận kịch bản test, tìm và báo cáo 3 lỗi giao diện cài sẵn trên tính năng thanh toán.</p>
              <button className="cbtn">CHƠI NGAY</button></div>
            <div className="ccard play" data-go="sec"><span className="tag play">PLAY ROLE</span><div className="cic">🔒</div>
              <h3>Kỹ sư Bảo mật VinaApp</h3>
              <p>Ứng cứu khẩn cấp: phân tích lỗ hổng và vá lỗi khi máy chủ VinaApp bị hacker tấn công giả lập.</p>
              <button className="cbtn">CHƠI NGAY</button></div>
          </div>
        </div>

        {/* CAREER QUIZ */}
        <div className="view" id="career">
          <button className="vback" data-back>← Về trung tâm</button>
          <div className="panel">
            <div className="vhead"><span className="vic">🧭</span><h2>AI Career Coach — Bạn hợp nghề nào?</h2></div>
            <div className="prog" id="cqProg" />
            <div id="cqBody" />
          </div>
        </div>

        {/* ROLE GUIDE */}
        <div className="view" id="guide">
          <button className="vback" data-back>← Về trung tâm</button>
          <div className="panel">
            <div className="vhead"><span className="vic">📚</span><h2>Cẩm nang vị trí công việc CNTT</h2></div>
            <div className="roleGrid" id="roleGrid" />
            <div className="roleDetail" id="roleDetail">Chọn một vị trí phía trên để xem "ai làm việc gì".</div>
          </div>
        </div>

        {/* CASE STUDY */}
        <div className="view" id="case">
          <button className="vback" data-back>← Về trung tâm</button>
          <div className="panel">
            <div className="vhead"><span className="vic">🔬</span><h2>Vòng đời của một dòng code</h2></div>
            <div className="steps" id="caseSteps" />
            <div className="roleDetail" id="caseDetail" />
          </div>
        </div>

        {/* DEV GAME */}
        <div className="view" id="dev">
          <button className="vback" data-back>← Về trung tâm</button>
          <div className="panel">
            <div className="vhead"><span className="vic">💻</span><h2>Task: Nút "Đăng nhập" bị lệch trái</h2></div>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 0 }}>QA báo nút Đăng nhập của VinaApp không nằm giữa. Chọn KHỐI LỆNH CSS đúng để căn nút vào giữa.</p>
            <div className="mockphone">
              <div className="logo">VinaApp</div>
              <div className="fld">📧 Email</div>
              <div className="fld">🔒 Mật khẩu</div>
              <div className="loginRow" id="loginRow"><button className="loginBtn">Đăng nhập</button></div>
            </div>
            <div id="devOpts" />
            <div className="fb" id="devFb" />
            <div className="winbanner" id="devWin"><div className="em">🎉</div><b>Đã sửa xong!</b><br /><span style={{ color: 'var(--muted)', fontSize: 13.5 }}>Nút Đăng nhập đã căn giữa. +25 điểm kinh nghiệm.</span></div>
          </div>
        </div>

        {/* TESTER GAME */}
        <div className="view" id="test">
          <button className="vback" data-back>← Về trung tâm</button>
          <div className="panel">
            <div className="vhead"><span className="vic">🔍</span><h2>Tìm 3 lỗi trên màn Thanh toán</h2></div>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 0 }}>Bấm vào những dòng bạn nghi là LỖI. Tìm đủ <b>3/3</b> để hoàn thành báo cáo test. <span id="testCount">Đã tìm: 0/3</span></p>
            <div className="bugScreen" id="bugScreen" />
            <div className="fb" id="testFb" />
            <div className="winbanner" id="testWin"><div className="em">🐞</div><b>Báo cáo test hoàn tất!</b><br /><span style={{ color: 'var(--muted)', fontSize: 13.5 }}>Bạn đã tìm đủ 3 bug. +25 điểm kinh nghiệm.</span></div>
          </div>
        </div>

        {/* SECURITY GAME */}
        <div className="view" id="sec">
          <button className="vback" data-back>← Về trung tâm</button>
          <div className="panel">
            <div className="vhead"><span className="vic">🔒</span><h2>Ứng cứu sự cố bảo mật VinaApp</h2></div>
            <div className="prog" id="secProg" />
            <div id="secBody" />
          </div>
        </div>

        {/* ROADMAP & SKILL TREE (req #37) */}
        <div className="view" id="roadmap">
          <button className="vback" data-back>← Về trung tâm</button>
          <div className="panel">
            <div className="vhead"><span className="vic">🗺️</span><h2>Sơ đồ Lộ trình Nghề nghiệp &amp; Cây Kỹ năng CNTT</h2></div>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 0 }}>Chọn một vị trí nghề nghiệp ở cột trái → xem cây kỹ năng từ cơ bản đến nâng cao. Bấm vào một kỹ năng để xem mô tả và <b>học ngay</b> bằng module của trường.</p>
            <div className="rmWrap">
              <div className="rmRoles" id="rmRoles" />
              <div className="rmMain">
                <div className="rmInsights" id="rmInsights" />
                <div className="rmTreeWrap">
                  <div className="rmTreeHint">🌳 Cây kỹ năng — bấm vào ô kỹ năng để mở chi tiết</div>
                  <div id="rmTree" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill detail modal (req #37) */}
      <div className="ovl" id="skillOvl">
        <div className="skillModal">
          <div className="sic" id="skIc">📘</div>
          <h3 id="skTitle">Kỹ năng</h3>
          <div className="sd" id="skDesc" />
          <div id="skRes" />
          <div className="mrow">
            <button className="vback gho" id="skClose" style={{ margin: 0 }}>Đóng</button>
            <a className="cbtn" id="skLearn" href="#" style={{ textDecoration: 'none', display: 'none' }}>🚀 Học ngay</a>
          </div>
        </div>
      </div>

      {/* back link ngoài wrap — script cập nhật href theo ?domain= */}
      <a className="back" id="back" href="/school?domain=it">← Khuôn viên Trường CNTT</a>

      <style>{`
        .tcc {
          --card: rgba(255,255,255,.05); --accent: #22d3ee; --accent2: #6366f1;
          --green: #10b981; --red: #ef4444; --amber: #fbbf24;
          --text: #e6eefb; --muted: #93a4c0; --border: rgba(255,255,255,.12);
          color: var(--text);
        }
        .tcc * { box-sizing: border-box; }
        .tcc a.back { display: inline-flex; align-items: center; gap: 6px; position: fixed; left: 16px; top: 14px; z-index: 20;
          background: rgba(10,19,38,.8); color: #bfe9ff; text-decoration: none; padding: 7px 13px; border-radius: 20px;
          font-size: 12.5px; backdrop-filter: blur(8px); border: 1px solid var(--border); }
        .tcc .wrap { max-width: 1000px; margin: 0 auto; }
        .tcc header.hero { text-align: center; margin-bottom: 8px; }
        .tcc header.hero h1 { font-size: 27px; margin: 0 0 6px;
          background: linear-gradient(120deg,#22d3ee,#818cf8); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .tcc header.hero p { color: var(--muted); font-size: 14px; max-width: 620px; margin: 0 auto; line-height: 1.6; }
        .tcc .xpbar { display: flex; justify-content: center; gap: 14px; margin: 16px 0 6px; }
        .tcc .pill { display: flex; align-items: center; gap: 6px; background: var(--card); border: 1px solid var(--border);
          padding: 7px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; }
        .tcc .pill b { color: var(--accent); }

        .tcc .group-title { display: flex; align-items: center; gap: 10px; margin: 26px 0 12px; font-size: 13px;
          letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); font-weight: 800; }
        .tcc .group-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        .tcc .cards { display: grid; grid-template-columns: repeat(auto-fill,minmax(280px,1fr)); gap: 16px; }
        .tcc .ccard { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 22px; position: relative;
          overflow: hidden; transition: .18s; display: flex; flex-direction: column; }
        .tcc .ccard::before { content: ''; position: absolute; inset: 0 0 auto 0; height: 3px; background: linear-gradient(90deg,var(--accent),var(--accent2)); opacity: .85; }
        .tcc .ccard:hover { transform: translateY(-4px); border-color: rgba(34,211,238,.5); box-shadow: 0 14px 40px rgba(0,0,0,.35); }
        .tcc .ccard .cic { font-size: 34px; }
        .tcc .ccard h3 { font-size: 18px; margin: 10px 0 6px; }
        .tcc .ccard p { color: var(--muted); font-size: 13.5px; line-height: 1.6; flex: 1; margin: 0 0 16px; }
        .tcc .ccard .tag { position: absolute; top: 16px; right: 16px; font-size: 10px; letter-spacing: .5px; font-weight: 800;
          padding: 3px 9px; border-radius: 20px; }
        .tcc .tag.know { background: rgba(34,211,238,.15); color: var(--accent); }
        .tcc .tag.play { background: rgba(99,102,241,.18); color: #a5b4fc; }
        .tcc .cbtn { align-self: flex-start; font-family: inherit; font-weight: 800; font-size: 13px; cursor: pointer;
          border: 0; border-radius: 11px; padding: 11px 20px; color: #04121f;
          background: linear-gradient(135deg,var(--accent),#38bdf8); letter-spacing: .4px; }
        .tcc .ccard.play .cbtn { background: linear-gradient(135deg,#818cf8,var(--accent2)); color: #fff; }

        /* Activity views */
        .tcc .view { display: none; }
        .tcc .view.active { display: block; animation: tccfade .25s; }
        @keyframes tccfade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .tcc .panel { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 24px; }
        .tcc .vhead { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .tcc .vhead .vic { font-size: 30px; }
        .tcc .vhead h2 { margin: 0; font-size: 20px; }
        .tcc .vback { font-family: inherit; cursor: pointer; background: var(--card); border: 1px solid var(--border); color: var(--text);
          border-radius: 10px; padding: 8px 14px; font-size: 13px; margin-bottom: 14px; }
        .tcc .opt { display: block; width: 100%; text-align: left; font-family: inherit; font-size: 14.5px; padding: 14px 16px;
          border-radius: 12px; background: rgba(0,0,0,.22); border: 1px solid var(--border); color: var(--text); cursor: pointer;
          margin-bottom: 10px; transition: .15s; }
        .tcc .opt:hover:not(:disabled) { border-color: rgba(34,211,238,.5); background: rgba(34,211,238,.05); }
        .tcc .opt.correct { background: rgba(16,185,129,.16); border-color: rgba(16,185,129,.6); }
        .tcc .opt.wrong { background: rgba(239,68,68,.16); border-color: rgba(239,68,68,.6); }
        .tcc .fb { margin-top: 6px; padding: 12px 14px; border-radius: 11px; font-size: 14px; line-height: 1.55; display: none; }
        .tcc .fb.show { display: block; } .tcc .fb.ok { background: rgba(16,185,129,.12); color: #a7f3d0; } .tcc .fb.no { background: rgba(239,68,68,.12); color: #fca5a5; }
        .tcc .prog { font-size: 13px; color: var(--muted); margin-bottom: 10px; }

        /* role guide */
        .tcc .roleGrid { display: grid; grid-template-columns: repeat(auto-fill,minmax(150px,1fr)); gap: 10px; margin-bottom: 14px; }
        .tcc .role { background: rgba(0,0,0,.22); border: 1px solid var(--border); border-radius: 12px; padding: 13px; cursor: pointer; text-align: center; transition: .15s; }
        .tcc .role:hover, .tcc .role.sel { border-color: var(--accent); background: rgba(34,211,238,.08); }
        .tcc .role .ic { font-size: 26px; } .tcc .role .nm { font-weight: 700; font-size: 14px; margin-top: 4px; }
        .tcc .roleDetail { background: rgba(0,0,0,.2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; }
        .tcc .roleDetail h4 { margin: 0 0 8px; } .tcc .roleDetail .lbl { color: var(--accent); font-weight: 700; }
        .tcc .chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 10px; }
        .tcc .chip { font-size: 12px; background: rgba(255,255,255,.06); border: 1px solid var(--border); border-radius: 20px; padding: 3px 10px; }

        /* case study timeline */
        .tcc .steps { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
        .tcc .step { flex: 1; min-width: 90px; text-align: center; background: rgba(0,0,0,.22); border: 1px solid var(--border);
          border-radius: 10px; padding: 10px 6px; cursor: pointer; font-size: 12.5px; transition: .15s; }
        .tcc .step.active { background: linear-gradient(135deg,rgba(34,211,238,.18),rgba(99,102,241,.14)); border-color: var(--accent); }
        .tcc .step .n { display: block; font-size: 18px; }

        /* dev game */
        .tcc .mockphone { max-width: 300px; margin: 0 auto 14px; background: #0d1830; border: 2px solid var(--border); border-radius: 22px; padding: 22px 18px; }
        .tcc .mockphone .logo { text-align: center; font-weight: 800; font-size: 18px; margin-bottom: 14px; color: var(--accent); }
        .tcc .mockphone .fld { background: #1a2744; border: 1px solid var(--border); border-radius: 9px; padding: 11px; font-size: 13px; color: var(--muted); margin-bottom: 10px; }
        .tcc .loginRow { display: flex; }                 /* mặc định lệch trái (lỗi) */
        .tcc .loginRow.fixed { justify-content: center; } /* fix đúng */
        .tcc .loginBtn { background: linear-gradient(135deg,var(--accent),#38bdf8); color: #04121f; font-weight: 800; border: 0;
          border-radius: 9px; padding: 11px 26px; font-size: 14px; cursor: default; }

        /* tester game */
        .tcc .bugScreen { position: relative; background: #0d1830; border: 1px solid var(--border); border-radius: 14px; padding: 20px; margin-bottom: 14px; }
        .tcc .bugScreen .line { padding: 9px 11px; border-radius: 8px; margin-bottom: 9px; background: #16223e; font-size: 14px; cursor: pointer; border: 1px solid transparent; }
        .tcc .bugScreen .line.bug.found { border-color: var(--green); background: rgba(16,185,129,.14); }
        .tcc .bugScreen .line:hover { border-color: rgba(34,211,238,.4); }

        .tcc .winbanner { text-align: center; background: linear-gradient(135deg,rgba(16,185,129,.14),rgba(34,211,238,.1));
          border: 1px solid rgba(16,185,129,.4); border-radius: 14px; padding: 18px; margin-top: 12px; display: none; }
        .tcc .winbanner.show { display: block; animation: tccfade .3s; }
        .tcc .winbanner .em { font-size: 40px; }

        /* ROADMAP & SKILL TREE (req #37) */
        .tcc .rmWrap { display: grid; grid-template-columns: 212px 1fr; gap: 16px; }
        @media (max-width: 760px) { .tcc .rmWrap { grid-template-columns: 1fr; } }
        .tcc .rmRoles { display: flex; flex-direction: column; gap: 9px; }
        @media (max-width: 760px) { .tcc .rmRoles { flex-direction: row; overflow-x: auto; padding-bottom: 4px; } }
        .tcc .rmRole { display: flex; align-items: center; gap: 10px; text-align: left; background: rgba(0,0,0,.22); border: 1px solid var(--border);
          border-radius: 12px; padding: 11px 13px; cursor: pointer; font-family: inherit; color: var(--text); transition: .15s; white-space: nowrap; }
        .tcc .rmRole:hover { border-color: rgba(34,211,238,.5); }
        .tcc .rmRole.sel { border-color: var(--accent); background: rgba(34,211,238,.1); }
        .tcc .rmRole .ic { font-size: 21px; } .tcc .rmRole .nm { font-weight: 700; font-size: 13px; }
        .tcc .rmInsights { background: linear-gradient(135deg,rgba(34,211,238,.08),rgba(99,102,241,.07)); border: 1px solid var(--border);
          border-radius: 14px; padding: 16px; margin-bottom: 14px; }
        .tcc .rmInsights h3 { margin: 0 0 4px; font-size: 17px; }
        .tcc .rmInsights .rmdesc { color: var(--muted); font-size: 13.5px; line-height: 1.55; margin-bottom: 12px; }
        .tcc .salGrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 12px; }
        .tcc .salBox { background: rgba(0,0,0,.24); border: 1px solid var(--border); border-radius: 10px; padding: 9px 6px; text-align: center; }
        .tcc .salBox .lv { font-size: 11px; color: var(--muted); } .tcc .salBox .vl { font-weight: 800; font-size: 14px; color: var(--accent); margin-top: 2px; }
        .tcc .demand { font-size: 12.5px; color: var(--muted); margin-bottom: 5px; display: flex; justify-content: space-between; }
        .tcc .demand b { color: var(--text); }
        .tcc .demandBar { height: 9px; background: rgba(255,255,255,.08); border-radius: 6px; overflow: hidden; }
        .tcc .demandBar i { display: block; height: 100%; background: linear-gradient(90deg,var(--accent),var(--accent2)); border-radius: 6px; transition: width .5s; }
        .tcc .rmTreeWrap { background: rgba(0,0,0,.18); border: 1px solid var(--border); border-radius: 14px; padding: 8px 6px 12px; }
        .tcc .rmTreeHint { font-size: 12px; color: var(--muted); text-align: center; margin: 6px 0 4px; }
        .tcc #rmTree svg { width: 100%; height: auto; display: block; }
        .tcc .tnode { cursor: default; }
        .tcc .tnode rect { fill: rgba(255,255,255,.05); stroke: var(--border); stroke-width: 1.4; transition: .15s; }
        .tcc .tnode text { fill: var(--text); font-size: 12.5px; font-family: inherit; font-weight: 600; pointer-events: none; }
        .tcc .tnode.has { cursor: pointer; }
        .tcc .tnode.has rect { fill: rgba(34,211,238,.1); stroke: rgba(34,211,238,.45); }
        .tcc .tnode.has:hover rect { fill: rgba(34,211,238,.22); stroke: var(--accent); }

        .tcc .ovl { position: fixed; inset: 0; background: rgba(4,10,22,.74); backdrop-filter: blur(4px);
          display: none; align-items: center; justify-content: center; z-index: 40; padding: 18px; }
        .tcc .ovl.show { display: flex; animation: tccfade .2s; }
        .tcc .skillModal { background: linear-gradient(160deg,#11203d,#0c1730); border: 1px solid var(--border); border-radius: 18px;
          padding: 24px; max-width: 440px; width: 100%; }
        .tcc .skillModal .sic { font-size: 34px; } .tcc .skillModal h3 { margin: 6px 0 8px; font-size: 19px; }
        .tcc .skillModal .sd { color: var(--muted); font-size: 14px; line-height: 1.6; margin-bottom: 14px; }
        .tcc .skillModal .reslbl { font-size: 12px; color: var(--accent); font-weight: 700; margin-bottom: 4px; }
        .tcc .skillModal .reslist a { display: block; color: #bfe9ff; font-size: 13.5px; text-decoration: none; padding: 7px 0; border-bottom: 1px solid var(--border); }
        .tcc .skillModal .reslist a:hover { color: var(--accent); }
        .tcc .mrow { display: flex; gap: 10px; justify-content: flex-end; margin-top: 16px; flex-wrap: wrap; }
        .tcc .mrow .gho { background: var(--card); border: 1px solid var(--border); color: var(--text); }
      `}</style>
    </div>
  );
}
