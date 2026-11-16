'use client';

import { useEffect } from 'react';

// Client mount: dựng đúng khung DOM (#picker, #app) mà engine vanilla cần, rồi
// nạp module wrap (public/legacy/L3-3-tuong-tac.js) SAU khi mount. Module đó
// import engine + scenario tĩnh từ /js/* (Express qua fallback proxy) và tự gắn
// picker + ScenarioEngine — giữ nguyên hành vi bản HTML gốc.
export default function ScenarioMount() {
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'module';
    s.src = '/legacy/L3-3-tuong-tac.js';
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <>
      <div id="picker" className="scenarios" />
      <div id="app" />
      <style>{`
        .scenarios { display: grid; gap: 12px; margin-bottom: 20px; }
        @media (min-width: 720px) { .scenarios { grid-template-columns: 1fr 1fr; } }
        .scn-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.15s;
        }
        .scn-card:hover { background: rgba(255,255,255,0.1); border-color: #fbbf24; transform: translateY(-2px); }
        .scn-card h4 { margin: 0 0 6px; }
        .scn-card .meta { font-size: 12px; opacity: 0.7; display: flex; gap: 10px; }

        #app { min-height: 200px; }
        .scenario-header { padding: 16px 20px; background: rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 16px; }
        .scenario-title { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .scenario-desc { opacity: 0.8; font-size: 14px; margin-bottom: 8px; }
        .scenario-meta { display: flex; gap: 12px; font-size: 12px; opacity: 0.7; }

        .quiz-wrap { display: flex; flex-direction: column; gap: 14px; }
        .quiz-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 16px; backdrop-filter: blur(10px);
        }
        .quiz-stem { margin-bottom: 12px; line-height: 1.5; }
        .quiz-choices { display: flex; flex-direction: column; gap: 8px; }
        .quiz-choice {
          background: rgba(255,255,255,0.04); padding: 10px 14px;
          border-radius: 8px; cursor: pointer; transition: background 0.15s;
          display: flex; align-items: center; gap: 10px;
        }
        .quiz-choice:hover { background: rgba(255,255,255,0.1); }
        .quiz-choice input { margin: 0; accent-color: #fbbf24; }

        .submit-btn {
          margin-top: 14px; padding: 12px 24px; border: none; border-radius: 10px;
          background: #10b981; color: white; font-weight: 700; font-size: 15px;
          cursor: pointer; font-family: inherit; align-self: flex-start;
        }
        .submit-btn:hover { background: #34d399; transform: translateY(-1px); }

        .drag-match-placeholder, .roleplay-placeholder,
        .identification-placeholder, .compound-lab-bridge {
          background: rgba(255,255,255,0.06); border: 1px dashed rgba(255,255,255,0.12);
          padding: 32px; border-radius: 12px; text-align: center; opacity: 0.8;
        }
        .open-lab {
          display: inline-block; margin-top: 12px; padding: 10px 18px;
          background: #0ea5e9; color: white; text-decoration: none; border-radius: 10px;
        }

        .result-card {
          margin-top: 20px; padding: 20px; background: rgba(16,185,129,0.1);
          border: 1px solid #10b981; border-radius: 14px;
        }
        .result-card.poor { background: rgba(239,68,68,0.1); border-color: #ef4444; }
        .result-stars { font-size: 32px; margin-bottom: 8px; }
        .result-score { font-size: 24px; font-weight: 700; }
        .result-breakdown { margin-top: 12px; }
        .result-row {
          background: rgba(0,0,0,0.2); padding: 10px 14px;
          border-radius: 8px; margin-bottom: 6px; font-size: 14px;
        }
        .result-row.ok { border-left: 3px solid #10b981; }
        .result-row.bad { border-left: 3px solid #ef4444; }

        .back-btn {
          margin-top: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.12);
          color: white; padding: 10px 20px; border-radius: 10px; cursor: pointer;
          font-family: inherit; font-size: 14px;
        }
        .back-btn:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </>
  );
}
