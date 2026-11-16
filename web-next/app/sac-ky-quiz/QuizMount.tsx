'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Client mount: dựng đúng khung DOM (topbar + progress/timer bar + question-card
// + modal) mà script vanilla cần, rồi nạp public/legacy/sac-ky-quiz.js SAU khi
// mount. Script đó giữ nguyên hành vi bản HTML gốc: render câu hỏi, timer 15s,
// chấm điểm + speed/streak bonus, modal kết quả, submit qua /api/attempts.
// Bộ QUESTIONS (10 câu TLC) là CONTENT nằm trong script legacy — CHƯA có API/DB
// nên giữ nguồn cũ, xem GHI CHÚ ở đầu file .js.
export default function QuizMount() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = `/legacy/sac-ky-quiz.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div id="skq-root" className="skq">
      <div className="container">
        <div className="topbar">
          <Link href="/sac-ky-vr">← Hub Sắc ký</Link>
          <span className="stat">
            📝 <b><span id="qnum">1</span>/10</b>
          </span>
          <span className="stat">
            🎯 <b id="score">0</b>
          </span>
          <span className="stat" id="streak-wrap" style={{ display: 'none' }}>
            🔥 <b id="streak">0</b>
          </span>
          <span className="spacer" />
          <span className="stat">
            ⏱️ <b id="timer">15s</b>
          </span>
        </div>

        <div className="progress-bar">
          <div id="progress" style={{ width: '10%' }} />
        </div>
        <div className="timer-bar">
          <div id="timer-bar" style={{ width: '100%' }} />
        </div>

        <div className="question-card">
          <h2 id="q-cat">Định nghĩa</h2>
          <div className="q-text" id="q-text">Đang tải...</div>
          <div className="options" id="options" />
          <div className="explain" id="explain" />
          <button className="next-btn" id="next-btn">Câu tiếp →</button>
        </div>
      </div>

      <div className="modal" id="modal">
        <div className="modal-card">
          <h2 id="modal-title">🎉 Hoàn thành Quiz</h2>
          <div className="score" id="modal-score">0</div>
          <div id="modal-details" />
          <div className="modal-btns">
            <button className="primary" id="modal-replay">↺ Chơi lại</button>
            <Link className="outline" href="/sac-ky-vr">← Hub</Link>
            <Link className="outline" href="/">🏠 Trang chính</Link>
          </div>
        </div>
      </div>

      <style>{`
        .skq {
          --skq-accent: #a78bfa;
          --skq-ok: #10b981;
          --skq-err: #ef4444;
          color: #fff;
        }
        .skq * { box-sizing: border-box; }
        .skq .container { width: 100%; }
        .skq .topbar {
          display: flex; gap: 12px; align-items: center; padding: 8px 14px;
          background: rgba(0,0,0,0.4); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; margin-bottom: 24px; font-size: 13px;
        }
        .skq .topbar a { color: #fff; opacity: 0.7; text-decoration: none; }
        .skq .stat { display: inline-flex; gap: 6px; align-items: center; }
        .skq .stat b { color: var(--skq-accent); font-weight: 700; }
        .skq .spacer { flex: 1; }
        .skq .progress-bar {
          height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px;
          overflow: hidden; margin-bottom: 20px;
        }
        .skq .progress-bar > div {
          height: 100%; background: linear-gradient(90deg, var(--skq-accent), #ec4899);
          transition: width 0.3s;
        }
        .skq .timer-bar {
          height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;
          overflow: hidden; margin-bottom: 16px;
        }
        .skq .timer-bar > div { height: 100%; background: var(--skq-ok); transition: width 0.1s linear; }
        .skq .question-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px; padding: 24px; backdrop-filter: blur(10px);
        }
        .skq .question-card h2 {
          margin: 0 0 6px; font-size: 14px; opacity: 0.6; font-weight: 600;
          letter-spacing: 0.4px; text-transform: uppercase;
        }
        .skq .question-card .q-text {
          font-size: 19px; line-height: 1.5; margin-bottom: 20px; font-weight: 600;
        }
        .skq .options { display: flex; flex-direction: column; gap: 10px; }
        .skq .opt {
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 14px 16px; cursor: pointer; transition: all 0.15s;
          font-size: 15px; line-height: 1.4; display: flex; gap: 10px; align-items: flex-start;
        }
        .skq .opt:hover { background: rgba(167,139,250,0.18); border-color: var(--skq-accent); }
        .skq .opt.correct { background: rgba(16,185,129,0.25); border-color: var(--skq-ok); }
        .skq .opt.wrong { background: rgba(239,68,68,0.25); border-color: var(--skq-err); }
        .skq .opt.disabled { cursor: not-allowed; pointer-events: none; }
        .skq .opt-letter {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.1); display: inline-flex;
          align-items: center; justify-content: center; font-weight: 700;
          flex-shrink: 0; font-size: 14px;
        }
        .skq .opt.correct .opt-letter { background: var(--skq-ok); }
        .skq .opt.wrong .opt-letter { background: var(--skq-err); }
        .skq .explain {
          margin-top: 16px; padding: 12px 14px;
          background: rgba(167,139,250,0.12); border-left: 3px solid var(--skq-accent);
          border-radius: 8px; font-size: 13px; line-height: 1.55; display: none;
        }
        .skq .explain.show { display: block; }
        .skq .next-btn {
          margin-top: 16px; width: 100%; padding: 12px 18px; border: none;
          background: var(--skq-accent); color: #1f1147; border-radius: 10px;
          font-family: inherit; font-weight: 700; font-size: 14px;
          cursor: pointer; opacity: 0; transition: opacity 0.2s;
        }
        .skq .next-btn.show { opacity: 1; }

        .skq .modal {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
          display: none; align-items: center; justify-content: center; z-index: 30; padding: 16px;
        }
        .skq .modal.show { display: flex; }
        .skq .modal-card {
          background: linear-gradient(135deg, #1e293b, #312e81); border-radius: 16px;
          padding: 24px; max-width: 500px; width: 100%; border: 1px solid rgba(255,255,255,0.15);
        }
        .skq .modal h2 { margin: 0 0 12px; font-size: 24px; }
        .skq .modal .score {
          font-size: 56px; font-weight: 800; text-align: center;
          color: var(--skq-accent); line-height: 1; margin: 12px 0;
        }
        .skq .modal .row {
          display: flex; justify-content: space-between; padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;
        }
        .skq .modal-btns { display: flex; gap: 10px; margin-top: 18px; justify-content: center; flex-wrap: wrap; }
        .skq .modal-btns button, .skq .modal-btns a {
          padding: 10px 18px; border-radius: 10px; border: none; font-family: inherit;
          font-weight: 700; font-size: 14px; cursor: pointer; text-decoration: none;
          color: #fff; text-align: center;
        }
        .skq .modal-btns .primary { background: var(--skq-accent); color: #1f1147; }
        .skq .modal-btns .outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
