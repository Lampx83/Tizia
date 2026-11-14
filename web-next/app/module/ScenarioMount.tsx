'use client';

import { useEffect } from 'react';

// Client mount: dựng đúng khung DOM (#page-title, #page-subtitle, #info,
// #picker, #app) mà module hub vanilla cần, rồi nạp module wrap
// (public/legacy/module.js) SAU khi mount. Module đó đọc ?module= từ URL, prime
// content từ DB (/api/curriculum), load domain đang hoạt động, dựng picker
// 3-track (Thực hành/Lý thuyết/Luyện kỹ năng) và dispatch ScenarioEngine —
// giữ NGUYÊN hành vi + text tiếng Việt của public/module.html gốc.
export default function ScenarioMount() {
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'module';
    // ?ts đảm bảo re-execute khi client-navigate lại vào trang (module ES chỉ
    // chạy 1 lần / URL — cache-bust cho từng mount).
    s.src = `/legacy/module.js?ts=${Date.now()}`;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className="module-root">
      <h1 id="page-title">Module</h1>
      <div className="subtitle" id="page-subtitle">
        Đang tải nội dung…
      </div>

      <div className="info-card" id="info" style={{ display: 'none' }}>
        <div id="info-text" />
        <div className="chips" id="info-chips" />
      </div>

      <div id="picker" className="scenarios" />
      <div id="app" />

      <style>{`
        .module-root { color: white; }
        .module-root h1 { margin: 0 0 6px; font-size: 26px; }
        .module-root .subtitle { opacity: 0.75; margin-bottom: 24px; font-size: 14px; }
        .module-root .info-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; padding: 16px 20px; margin-bottom: 20px;
        }
        .module-root .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
        .module-root .chip {
          background: rgba(251,191,36,0.15); border: 1px solid rgba(251,191,36,0.3);
          padding: 4px 10px; border-radius: 12px; font-size: 12px;
        }
        .module-root .scenarios { display: block; margin-bottom: 20px; }

        /* 3 track học tập */
        .module-root .track {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; padding: 14px 16px; margin-bottom: 14px;
        }
        .module-root .track-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px; }
        .module-root .track-icon { font-size: 20px; }
        .module-root .track-label { font-size: 16px; font-weight: 800; }
        .module-root .track-hint { font-size: 12px; opacity: 0.6; }
        .module-root .track-count { margin-left: auto; font-size: 11px; font-weight: 700;
          background: rgba(255,255,255,0.1); padding: 2px 9px; border-radius: 10px; }
        /* Thực hành nổi bật hơn */
        .module-root .track-practice {
          background: linear-gradient(135deg, rgba(20,184,166,0.14), rgba(139,92,246,0.10));
          border-color: rgba(20,184,166,0.4);
        }
        .module-root .track-practice .track-count { background: #14b8a6; color: #07221f; }
        .module-root .track-cards { display: grid; gap: 12px; }
        @media (min-width: 720px) { .module-root .track-cards { grid-template-columns: 1fr 1fr; } }

        .module-root .scn-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.15s;
          text-decoration: none; color: white; display: block;
        }
        .module-root .scn-card:hover { background: rgba(255,255,255,0.1); border-color: #fbbf24; transform: translateY(-2px); }
        .module-root .scn-card h4 { margin: 0 0 6px; }
        .module-root .scn-card .meta { font-size: 12px; opacity: 0.7; display: flex; gap: 10px; flex-wrap: wrap; }
        .module-root .scn-card .exp-desc { font-size: 12px; opacity: 0.78; margin-top: 8px; line-height: 1.45; }
        .module-root .scn-card.exp-card { border-color: rgba(20,184,166,0.45); }
        .module-root .scn-card.soon { opacity: 0.5; pointer-events: none; }
        .module-root .stub-tag { background: rgba(251,191,36,0.25); padding: 1px 7px; border-radius: 6px; font-size: 10px; }
        .module-root .run-badge {
          margin-left: auto; background: rgba(16,185,129,0.18);
          border: 1px solid rgba(16,185,129,0.45);
          color: #d1fae5; padding: 1px 8px; border-radius: 10px; font-size: 11px; font-weight: 700;
        }
        .module-root #app { min-height: 200px; }
        .module-root .scenario-header { padding: 16px 20px; background: rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 16px; }
        .module-root .scenario-title { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .module-root .scenario-desc { opacity: 0.8; font-size: 14px; }
        .module-root .scenario-meta { display: flex; gap: 12px; font-size: 12px; opacity: 0.7; margin-top: 6px; }

        .module-root .quiz-wrap { display: flex; flex-direction: column; gap: 14px; }
        .module-root .quiz-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 16px;
        }
        .module-root .quiz-stem { margin-bottom: 12px; line-height: 1.55; }
        .module-root .quiz-choices { display: flex; flex-direction: column; gap: 8px; }
        .module-root .quiz-choice { background: rgba(255,255,255,0.04); padding: 10px 14px;
          border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px; }
        .module-root .quiz-choice:hover { background: rgba(255,255,255,0.1); }
        .module-root .quiz-choice input { accent-color: #fbbf24; }
        .module-root .submit-btn {
          margin-top: 14px; padding: 12px 24px; border: none; border-radius: 10px;
          background: #10b981; color: white; font-weight: 700; cursor: pointer;
          align-self: flex-start; font-family: inherit; font-size: 15px;
        }
        .module-root .submit-btn:hover { background: #34d399; }

        .module-root .calc-wrap { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 18px; }
        .module-root .calc-input { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; font-size: 14px; }
        .module-root .calc-input input {
          padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.95); color: #1f2937; font-size: 14px;
        }
        .module-root .calc-result { margin-top: 12px; padding: 10px 14px; background: rgba(0,0,0,0.2); border-radius: 8px; }

        .module-root .drag-match-placeholder, .module-root .roleplay-placeholder,
        .module-root .identification-placeholder, .module-root .compound-lab-bridge {
          background: rgba(255,255,255,0.06); border: 1px dashed rgba(255,255,255,0.12);
          padding: 32px; border-radius: 12px; text-align: center; opacity: 0.85;
        }

        .module-root .result-card {
          margin-top: 20px; padding: 20px; background: rgba(16,185,129,0.1);
          border: 1px solid #10b981; border-radius: 14px;
        }
        .module-root .result-card.poor { background: rgba(239,68,68,0.1); border-color: #ef4444; }
        .module-root .result-stars { font-size: 32px; margin-bottom: 8px; }
        .module-root .result-score { font-size: 24px; font-weight: 700; }
        .module-root .result-breakdown { margin-top: 12px; }
        .module-root .result-row {
          background: rgba(0,0,0,0.2); padding: 10px 14px;
          border-radius: 8px; margin-bottom: 6px; font-size: 13px;
        }
        .module-root .result-row.ok { border-left: 3px solid #10b981; }
        .module-root .result-row.bad { border-left: 3px solid #ef4444; }
        .module-root .back-btn {
          margin-top: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.12);
          color: white; padding: 10px 20px; border-radius: 10px; cursor: pointer;
          font-family: inherit; font-size: 14px;
        }

        .module-root .not-found {
          background: rgba(239,68,68,0.1); border: 1px solid #ef4444;
          padding: 24px; border-radius: 12px; text-align: center;
        }

        /* ── Weekly lesson (Tiểu học) ── */
        .module-root .wl { display: flex; flex-direction: column; gap: 14px; }
        .module-root .wl-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; padding: 16px 20px; line-height: 1.6; }
        .module-root .wl-intro { background: linear-gradient(135deg, rgba(251,191,36,0.12), rgba(139,92,246,0.08));
          border-color: rgba(251,191,36,0.3); }
        .module-root .wl-lead { font-size: 16px; margin: 0 0 8px; }
        .module-root .wl-obj { font-size: 14px; }
        .module-root .wl-sec { font-size: 15px; font-weight: 800; margin-bottom: 10px; opacity: 0.95; }
        .module-root .wl-h { margin: 14px 0 6px; font-size: 15px; color: #fbbf24; }
        .module-root .wl-p { margin: 6px 0; }
        .module-root .wl-ul { margin: 6px 0; padding-left: 22px; }
        .module-root .wl-ul li { margin: 4px 0; }
        .module-root .wl-note { background: rgba(14,165,233,0.12); border-left: 3px solid #0ea5e9;
          padding: 8px 12px; border-radius: 8px; margin: 10px 0; font-size: 14px; }
        .module-root .wl-ex { background: rgba(255,255,255,0.04); border-radius: 10px;
          padding: 10px 14px; margin: 8px 0; }
        .module-root .wl-ex-q { margin-bottom: 4px; }
        .module-root .wl-ex-a { color: #10b981; font-size: 14px; }
        .module-root .wl-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
        .module-root .wl-btn { padding: 12px 20px; border: none; border-radius: 10px; cursor: pointer;
          font-family: inherit; font-size: 14px; font-weight: 700; }
        .module-root .wl-btn:disabled { opacity: 0.6; cursor: progress; }
        .module-root .wl-btn-primary { background: #10b981; color: #06281f; }
        .module-root .wl-btn-primary:hover { background: #34d399; }
        .module-root .wl-btn-ai { background: rgba(139,92,246,0.22); color: #ddd6fe;
          border: 1px solid rgba(139,92,246,0.5); }
        .module-root .wl-btn-ai:hover { background: rgba(139,92,246,0.4); }
        .module-root .wl-btn-bank { background: rgba(14,165,233,0.18); color: #bae6fd;
          border: 1px solid rgba(14,165,233,0.5); }
        .module-root .wl-btn-bank:hover { background: rgba(14,165,233,0.36); }
        .module-root .wl-ai-msg { font-size: 14px; }
        .module-root .wl-chat-log { display: flex; flex-direction: column; gap: 8px; max-height: 320px;
          overflow-y: auto; margin: 8px 0; padding: 4px; }
        .module-root .wl-msg { padding: 8px 12px; border-radius: 12px; font-size: 14px; max-width: 85%; line-height: 1.5; }
        .module-root .wl-msg-ai { background: rgba(139,92,246,0.18); align-self: flex-start; border-bottom-left-radius: 4px; }
        .module-root .wl-msg-me { background: rgba(16,185,129,0.18); align-self: flex-end; border-bottom-right-radius: 4px; }
        .module-root .wl-typing { opacity: 0.6; font-style: italic; }
        .module-root .wl-chat-row { display: flex; gap: 8px; }
        .module-root .wl-chat-input { flex: 1; padding: 10px 12px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.95);
          color: #1f2937; font-size: 14px; font-family: inherit; }
      `}</style>
    </div>
  );
}
