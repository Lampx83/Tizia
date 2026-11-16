'use client';

import { useEffect } from 'react';

// Client mount: dựng đúng khung DOM (toolbar + #learnGrid + #quizArea + #modalBg)
// mà script vanilla cần, rồi nạp public/legacy/bien-bao-giao-thong.js SAU khi
// mount. Script đó giữ nguyên hành vi bản HTML gốc (học/đố vui, lọc nhóm, modal
// chi tiết, đếm điểm/streak). Danh sách biển báo (SIGNS) là CONTENT nằm trong
// script legacy — CHƯA có API/DB nên giữ nguồn cũ, xem GHI CHÚ ở đầu file .js.
export default function SignsMount() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = `/legacy/bien-bao-giao-thong.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div id="bbgt-root" className="bbgt">
      <div className="toolbar">
        <button data-mode="learn" className="active">📖 Học</button>
        <button data-mode="quiz">🎯 Đố vui</button>
        <button data-group="all" data-group-tab="" className="active">Tất cả</button>
        <button data-group="cam" data-group-tab="">🚫 Cấm</button>
        <button data-group="nguyhiem" data-group-tab="">⚠️ Nguy hiểm</button>
        <button data-group="hieulenh" data-group-tab="">✅ Hiệu lệnh</button>
        <button data-group="chidan" data-group-tab="">📍 Chỉ dẫn</button>
      </div>

      <div className="stats" id="quizStats" style={{ display: 'none' }}>
        <span>Đúng: <b id="rCnt">0</b></span>
        <span>Sai: <b id="wCnt">0</b></span>
        <span>Streak: <b id="strk">0</b></span>
      </div>

      <div className="signs-grid" id="learnGrid" />

      <div className="quiz-area" id="quizArea" style={{ display: 'none' }}>
        <div className="big-sign" id="quizSign" />
        <div className="question">Biển báo này có ý nghĩa gì?</div>
        <div className="answers" id="quizAnswers" />
        <div style={{ marginTop: 14, color: 'var(--bbgt-muted)', fontSize: 13 }} id="quizExplain" />
        <button id="nextQuizBtn" className="next-quiz-btn" style={{ display: 'none' }}>
          Câu tiếp →
        </button>
      </div>

      <div className="modal-bg" id="modalBg">
        <div className="modal" id="modalContent" />
      </div>

      <style>{`
        .bbgt {
          --bbgt-card: rgba(255,255,255,.06);
          --bbgt-text: #e5edf7;
          --bbgt-muted: #94a3b8;
          --bbgt-border: rgba(255,255,255,.12);
          --bbgt-red: #dc2626; --bbgt-yellow: #fbbf24; --bbgt-green: #10b981;
          display: flex; flex-direction: column; align-items: center; gap: 18px;
          color: var(--bbgt-text);
        }
        .bbgt * { box-sizing: border-box; }

        .bbgt .toolbar { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .bbgt .toolbar button {
          font-family: inherit; background: var(--bbgt-card); color: var(--bbgt-text);
          border: 1px solid var(--bbgt-border); padding: 8px 16px; border-radius: 9px;
          font-size: 13px; cursor: pointer;
        }
        .bbgt .toolbar button.active { background: var(--bbgt-red); border-color: var(--bbgt-red); font-weight: 700; }

        .bbgt .signs-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 14px; max-width: 1080px; width: 100%;
        }
        .bbgt .sign-card {
          background: var(--bbgt-card); border: 1px solid var(--bbgt-border); border-radius: 12px;
          padding: 14px; text-align: center; cursor: pointer;
          transition: transform .12s, border-color .15s;
        }
        .bbgt .sign-card:hover { transform: translateY(-3px); border-color: var(--bbgt-yellow); }
        .bbgt .sign-card svg { width: 84px; height: 84px; display: block; margin: 0 auto 10px; }
        .bbgt .sign-card .name { font-size: 12.5px; line-height: 1.4; color: var(--bbgt-text); }
        .bbgt .sign-card .id { font-size: 11px; color: var(--bbgt-muted); margin-top: 3px; }

        .bbgt .quiz-area {
          background: var(--bbgt-card); border: 1px solid var(--bbgt-border); border-radius: 14px;
          padding: 24px; max-width: 520px; width: 100%; text-align: center;
        }
        .bbgt .quiz-area .big-sign svg { width: 160px; height: 160px; }
        .bbgt .quiz-area .question { margin: 12px 0 18px; font-size: 16px; color: var(--bbgt-muted); }
        .bbgt .answers { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; }
        .bbgt .answers button {
          padding: 14px; border-radius: 9px; border: 1px solid var(--bbgt-border);
          background: rgba(0,0,0,.2); color: var(--bbgt-text); cursor: pointer;
          font-family: inherit; font-size: 13.5px; transition: .15s;
        }
        .bbgt .answers button:hover { background: rgba(255,255,255,.06); }
        .bbgt .answers button.right { background: rgba(16,185,129,.2); border-color: var(--bbgt-green); color: #6ee7b7; }
        .bbgt .answers button.wrong { background: rgba(220,38,38,.2); border-color: var(--bbgt-red); color: #fca5a5; }

        .bbgt .stats { display: flex; gap: 18px; font-size: 13px; color: var(--bbgt-muted); }
        .bbgt .stats b { color: var(--bbgt-text); font-size: 15px; }

        .bbgt .next-quiz-btn {
          margin-top: 14px; padding: 10px 20px; border-radius: 9px; border: 0;
          background: var(--bbgt-red); color: white; font-weight: 700; cursor: pointer; font-family: inherit;
        }

        .bbgt .modal-bg {
          position: fixed; inset: 0; background: rgba(0,0,0,.7); display: none;
          align-items: center; justify-content: center; z-index: 100; padding: 20px;
        }
        .bbgt .modal-bg.show { display: flex; }
        .bbgt .modal {
          background: #1a1a2e; border: 1px solid var(--bbgt-border); border-radius: 16px;
          padding: 24px; max-width: 420px; width: 100%; text-align: center;
        }
        .bbgt .modal svg { width: 140px; height: 140px; }
        .bbgt .modal h3 { margin: 12px 0 6px; }
        .bbgt .modal .group { color: var(--bbgt-muted); font-size: 13px; }
        .bbgt .modal .meaning { margin: 14px 0; line-height: 1.6; font-size: 14.5px; }
        .bbgt .modal button {
          padding: 9px 20px; border-radius: 9px; border: 0; background: var(--bbgt-red);
          color: white; font-weight: 700; cursor: pointer; font-family: inherit;
        }
      `}</style>
    </div>
  );
}
