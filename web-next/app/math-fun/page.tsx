'use client';

// ============================================================
// Wrap-mount trang Next /math-fun ("Toán vui" — game quiz toán Lớp 2 + Lớp 6).
// Chiến lược WRAP-MOUNT: KHÔNG viết lại engine sang React. Chỉ:
//  1) Dựng lại NGUYÊN VĂN khung DOM <body> gốc (home picker + g2-mode + g6-mode +
//     pet) qua dangerouslySetInnerHTML — giữ MỌI id/class/onclick để engine cũ
//     querySelector/gọi window.enterGrade... trúng.
//  2) Chèn CSS gốc (khối <style> trong public/math-fun.html) NGUYÊN VĂN vào <head>
//     — CSS đặt nền gradient trên <body> và confetti/pet là fixed thẳng trong
//     document.body, nên phải ở phạm vi document, KHÔNG scope container.
//  3) Nạp public/legacy/math-fun.js dạng <script type="module"> (script gốc dùng
//     top-level import/await → phải là module). Kèm các script phụ gốc:
//     adaptive-bridge.js (module, cấp window.EduAdaptive), state-sync.js (module,
//     đồng bộ localStorage math2/math6 ↔ server), pwa-register.js (classic, defer).
// Effect chạy sau paint → skeleton đã render → engine append/querySelector an toàn.
//
// CONTENT: chủ đề toán KHÔNG hardcode ở đây — scenario /js/scenarios/math2-fun.js
// & math6-quest.js fetch từ DB (/api/content/math2-topics, math6-topics) qua proxy.
// ============================================================

import { useEffect } from 'react';

// CSS gốc (public/math-fun.html) — nguyên văn. Đặt background gradient lên <body>;
// confetti/pet-companion là position:fixed append thẳng vào document.body → CSS
// phải ở phạm vi document, không scope trong container.
const LEGACY_CSS = `
  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; color: white; overflow-x: hidden; }
  body {
    min-height: 100vh; padding: 0;
    background: linear-gradient(180deg, #1e293b 0%, #312e81 100%);
  }

  /* HOME PICKER */
  .home {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 30px 20px;
    background:
      radial-gradient(circle at 20% 20%, rgba(251,191,36,0.25), transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(236,72,153,0.25), transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(99,102,241,0.2), transparent 50%),
      linear-gradient(180deg, #1e293b 0%, #312e81 100%);
    position: relative;
  }
  .home .back-link {
    position: absolute; top: 20px; left: 20px;
    padding: 8px 14px; background: rgba(255,255,255,0.1);
    border-radius: 999px; color: white; text-decoration: none; font-size: 13px;
    backdrop-filter: blur(10px);
  }
  .home h1 {
    font-size: clamp(36px, 7vw, 64px); margin: 0 0 16px;
    text-align: center; font-weight: 900;
    background: linear-gradient(135deg, #ffffff, #fbbf24, #ec4899, #8b5cf6);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    animation: titleGlow 3s ease-in-out infinite;
    text-shadow: 0 0 80px rgba(251,191,36,0.5);
  }
  @keyframes titleGlow {
    0%, 100% { filter: drop-shadow(0 0 20px rgba(251,191,36,0.5)); }
    50% { filter: drop-shadow(0 0 40px rgba(236,72,153,0.7)); }
  }
  .home .sub {
    text-align: center; opacity: 0.9; font-size: 18px; max-width: 600px;
    line-height: 1.6; margin: 0 0 40px;
  }
  .home .pick {
    display: flex; gap: 28px; flex-wrap: wrap; justify-content: center;
    max-width: 900px;
  }
  .home .grade-card {
    width: 320px; min-height: 380px; padding: 36px 28px;
    border-radius: 32px; cursor: pointer;
    text-align: center; position: relative; overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    border: 4px solid transparent;
  }
  .home .grade-card:hover { transform: translateY(-12px) scale(1.03); }
  .home .grade-card.g2 {
    background: linear-gradient(135deg, #fbbf24 0%, #f97316 60%, #ec4899 100%);
    box-shadow: 0 20px 60px rgba(251,191,36,0.4), inset 0 -4px 20px rgba(0,0,0,0.15);
    color: #3e2723;
  }
  .home .grade-card.g2:hover { box-shadow: 0 30px 70px rgba(251,191,36,0.6); }
  .home .grade-card.g6 {
    background: linear-gradient(135deg, #1e3a8a 0%, #4338ca 50%, #7c3aed 100%);
    box-shadow: 0 20px 60px rgba(99,102,241,0.4), inset 0 -4px 20px rgba(0,0,0,0.3);
    color: white;
    border-color: rgba(251,191,36,0.4);
  }
  .home .grade-card.g6:hover { box-shadow: 0 30px 70px rgba(124,58,237,0.6); }
  .home .grade-card .big-emo {
    font-size: 110px; margin-bottom: 10px; line-height: 1;
    animation: bounce 2s ease-in-out infinite;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  .home .grade-card h2 {
    font-size: 32px; margin: 8px 0; font-weight: 900;
  }
  .home .grade-card .tag {
    font-size: 14px; opacity: 0.85; line-height: 1.5; margin-bottom: 18px;
  }
  .home .grade-card .ctas {
    display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
  }
  .home .grade-card .chip {
    padding: 6px 14px; border-radius: 999px;
    background: rgba(255,255,255,0.25); font-weight: 600; font-size: 13px;
    backdrop-filter: blur(8px);
  }
  .home .grade-card.g6 .chip { background: rgba(251,191,36,0.25); color: #fbbf24; }

  /* Floating math symbols background */
  .floating { position: absolute; pointer-events: none; opacity: 0.15; font-size: 60px; user-select: none; }

  /* KID MODE — Lớp 2 */
  .grade2-mode {
    min-height: 100vh;
    background:
      radial-gradient(circle at 15% 0%, #fef3c7, transparent 30%),
      radial-gradient(circle at 85% 100%, #fbcfe8, transparent 30%),
      linear-gradient(180deg, #fef3c7 0%, #fed7aa 40%, #fbcfe8 80%, #c7d2fe 100%);
    color: #422006;
  }
  .grade2-mode .head {
    padding: 18px 24px; display: flex; gap: 16px; align-items: center;
    background: rgba(255,255,255,0.6); backdrop-filter: blur(20px);
    border-bottom: 3px dashed rgba(251,146,60,0.4);
    flex-wrap: wrap;
  }
  .grade2-mode .head .back {
    background: white; color: #422006; border: 3px solid #fbbf24;
    padding: 8px 16px; border-radius: 999px; text-decoration: none;
    font-weight: 700; font-size: 14px;
    box-shadow: 0 4px 0 rgba(251,191,36,0.4);
  }
  .grade2-mode .head .stats {
    margin-left: auto; display: flex; gap: 12px; align-items: center;
  }
  .grade2-mode .head .stat-item {
    background: white; padding: 8px 14px; border-radius: 999px;
    font-weight: 700; font-size: 14px;
    box-shadow: 0 4px 0 rgba(251,191,36,0.3);
    border: 2px solid #fbbf24;
  }
  .grade2-mode .head h1 {
    font-size: 26px; margin: 0; font-weight: 900;
    background: linear-gradient(135deg, #ea580c, #db2777, #7c3aed);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .grade2-mode .topics-wrap { padding: 24px 20px; max-width: 1200px; margin: 0 auto; }
  .grade2-mode .topics-grid {
    display: grid; gap: 18px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  .grade2-mode .topic-card {
    background: white; border-radius: 24px;
    padding: 18px; cursor: pointer; position: relative;
    border: 4px solid var(--topic-color);
    box-shadow: 0 6px 0 var(--topic-shadow), 0 12px 24px rgba(0,0,0,0.1);
    transition: transform 0.15s;
  }
  .grade2-mode .topic-card:hover { transform: translateY(-4px); }
  .grade2-mode .topic-card .mascot-big {
    font-size: 50px; line-height: 1; display: block; text-align: center;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
    animation: bounce 2.5s ease-in-out infinite;
  }
  .grade2-mode .topic-card h3 {
    margin: 10px 0 6px; font-size: 17px; text-align: center;
    color: var(--topic-color); font-weight: 900;
  }
  .grade2-mode .topic-card .intro {
    font-size: 12px; text-align: center; opacity: 0.7; line-height: 1.4;
    min-height: 32px;
  }
  .grade2-mode .topic-card .meta {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 10px; font-size: 11px; opacity: 0.8;
  }
  .grade2-mode .topic-card .star-row { color: #fbbf24; }
  .grade2-mode .topic-card .qcount { background: var(--topic-color); color: white; padding: 2px 8px; border-radius: 999px; font-weight: 700; }

  /* QUIZ KID */
  .grade2-mode .quiz-area {
    max-width: 800px; margin: 0 auto; padding: 24px 20px;
  }
  .grade2-mode .quiz-card {
    background: white; border-radius: 32px;
    padding: 32px 28px; box-shadow: 0 16px 40px rgba(0,0,0,0.1);
    border: 4px solid #fbbf24;
  }
  .grade2-mode .quiz-card .header-row {
    display: flex; gap: 12px; align-items: center; margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .grade2-mode .quiz-card .mascot-quiz {
    font-size: 60px;
    animation: wiggle 0.8s ease-in-out infinite;
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
  }
  .grade2-mode .quiz-card .progress-bar {
    flex: 1; min-width: 200px; height: 24px;
    background: #f3f4f6; border-radius: 999px; overflow: hidden;
    border: 3px solid #fbbf24; position: relative;
  }
  .grade2-mode .quiz-card .progress-bar > div {
    height: 100%; background: linear-gradient(90deg, #fbbf24, #ec4899);
    transition: width 0.4s;
  }
  .grade2-mode .quiz-card .progress-text {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
    font-weight: 800; color: #422006; font-size: 13px;
  }
  .grade2-mode .quiz-card .stars-display {
    display: flex; gap: 2px; font-size: 28px;
  }
  .grade2-mode .quiz-card .q-stem {
    font-size: 28px; text-align: center; padding: 28px 16px;
    background: linear-gradient(135deg, #fef3c7, #fbcfe8);
    border-radius: 20px; margin: 16px 0 24px; font-weight: 700;
    color: #422006; line-height: 1.5;
  }
  .grade2-mode .opts-grid {
    display: grid; gap: 14px; grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) { .grade2-mode .opts-grid { grid-template-columns: 1fr; } }
  .grade2-mode .opt-btn {
    padding: 20px 24px; border: 4px solid; border-radius: 20px;
    font-size: 22px; font-weight: 800; cursor: pointer;
    background: white; transition: transform 0.1s, box-shadow 0.15s;
    font-family: inherit; color: inherit; position: relative;
  }
  .grade2-mode .opt-btn.cA { border-color: #ef4444; color: #ef4444; box-shadow: 0 5px 0 #fca5a5; }
  .grade2-mode .opt-btn.cB { border-color: #3b82f6; color: #3b82f6; box-shadow: 0 5px 0 #93c5fd; }
  .grade2-mode .opt-btn.cC { border-color: #10b981; color: #10b981; box-shadow: 0 5px 0 #6ee7b7; }
  .grade2-mode .opt-btn.cD { border-color: #a855f7; color: #a855f7; box-shadow: 0 5px 0 #d8b4fe; }
  .grade2-mode .opt-btn:hover { transform: translateY(-3px); }
  .grade2-mode .opt-btn:active { transform: translateY(0); box-shadow: 0 2px 0; }
  .grade2-mode .opt-btn.correct {
    background: #10b981 !important; color: white !important;
    border-color: #047857 !important;
    animation: pop 0.4s; box-shadow: 0 5px 0 #047857 !important;
  }
  .grade2-mode .opt-btn.wrong {
    background: #ef4444 !important; color: white !important; border-color: #b91c1c !important;
    animation: shake 0.4s; box-shadow: 0 5px 0 #b91c1c !important;
  }
  @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.12); } 100% { transform: scale(1); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
  .grade2-mode .explain-box {
    margin-top: 18px; padding: 16px 20px;
    background: linear-gradient(135deg, #dbeafe, #c7d2fe);
    border-radius: 16px; border-left: 6px solid #6366f1;
    font-size: 16px; line-height: 1.6; display: none;
  }
  .grade2-mode .explain-box.show { display: block; animation: slideIn 0.3s; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .grade2-mode .next-btn {
    width: 100%; margin-top: 16px; padding: 18px;
    border: none; border-radius: 16px;
    background: linear-gradient(135deg, #fbbf24, #ec4899);
    color: white; font-size: 20px; font-weight: 900;
    cursor: pointer; display: none;
    box-shadow: 0 6px 0 rgba(0,0,0,0.15);
    font-family: inherit;
  }
  .grade2-mode .next-btn.show { display: block; }
  .grade2-mode .next-btn:active { transform: translateY(3px); box-shadow: 0 3px 0 rgba(0,0,0,0.15); }

  /* QUEST MODE — Lớp 6 */
  .grade6-mode {
    min-height: 100vh;
    background:
      radial-gradient(circle at 10% 20%, rgba(99,102,241,0.3), transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(220,38,38,0.2), transparent 40%),
      linear-gradient(180deg, #020617 0%, #1e1b4b 50%, #312e81 100%);
    color: white; position: relative;
  }
  .grade6-mode::before {
    content: ''; position: fixed; inset: 0; pointer-events: none;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><circle cx="2" cy="2" r="1" fill="rgba(251,191,36,0.3)"/></svg>');
    opacity: 0.4;
  }
  .grade6-mode .head {
    padding: 16px 24px; display: flex; gap: 16px; align-items: center;
    background: rgba(2,6,23,0.6); backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(251,191,36,0.3);
    position: sticky; top: 0; z-index: 50; flex-wrap: wrap;
  }
  .grade6-mode .head .back {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);
    color: white; padding: 7px 14px; border-radius: 8px; text-decoration: none;
    font-size: 13px;
  }
  .grade6-mode .head h1 {
    font-size: 24px; margin: 0; font-weight: 900;
    background: linear-gradient(135deg, #fbbf24, #ec4899, #8b5cf6);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .grade6-mode .head .stats {
    margin-left: auto; display: flex; gap: 10px; align-items: center;
  }
  .grade6-mode .head .stat-item {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(251,191,36,0.4);
    padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .grade6-mode .head .stat-item.gold { color: #fbbf24; }
  .grade6-mode .head .stat-item.xp { color: #6ee7b7; }
  .grade6-mode .head .stat-item.streak { color: #f97316; }

  .grade6-mode .topics-wrap { padding: 24px 20px; max-width: 1280px; margin: 0 auto; }
  .grade6-mode .topics-grid {
    display: grid; gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .grade6-mode .topic-card {
    background:
      linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)),
      rgba(2,6,23,0.6);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; padding: 22px; cursor: pointer;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    position: relative; overflow: hidden;
  }
  .grade6-mode .topic-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
    background: var(--topic-color);
  }
  .grade6-mode .topic-card:hover {
    transform: translateY(-3px); border-color: var(--topic-color);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4), 0 0 30px var(--topic-color);
  }
  .grade6-mode .topic-card .boss-emo {
    font-size: 38px; margin-bottom: 8px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4));
  }
  .grade6-mode .topic-card h3 { margin: 4px 0 6px; font-size: 16px; }
  .grade6-mode .topic-card .intro { font-size: 12px; opacity: 0.75; line-height: 1.5; min-height: 36px; margin-bottom: 12px; }
  .grade6-mode .topic-card .footer {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px;
  }
  .grade6-mode .topic-card .difficulty {
    display: flex; gap: 2px;
  }
  .grade6-mode .topic-card .difficulty span {
    width: 6px; height: 12px; background: rgba(255,255,255,0.15); border-radius: 2px;
  }
  .grade6-mode .topic-card .difficulty span.on { background: var(--topic-color); }
  .grade6-mode .topic-card .xp-badge {
    font-size: 11px; padding: 3px 9px; border-radius: 999px;
    background: rgba(16,185,129,0.15); color: #6ee7b7; font-weight: 700;
  }
  .grade6-mode .topic-card.completed::after {
    content: '✓'; position: absolute; top: 12px; right: 14px;
    width: 26px; height: 26px; border-radius: 50%;
    background: #10b981; color: white;
    display: flex; align-items: center; justify-content: center; font-weight: 900;
  }

  /* QUIZ QUEST */
  .grade6-mode .quiz-area { max-width: 820px; margin: 0 auto; padding: 24px 20px; }
  .grade6-mode .quiz-card {
    background:
      linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)),
      rgba(2,6,23,0.8);
    border: 1px solid rgba(251,191,36,0.3); border-radius: 16px;
    padding: 24px 24px 28px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .grade6-mode .quiz-card .header-row {
    display: flex; gap: 12px; align-items: center; margin-bottom: 18px;
    flex-wrap: wrap;
  }
  .grade6-mode .boss-portrait {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, var(--topic-color), rgba(0,0,0,0.5));
    display: flex; align-items: center; justify-content: center; font-size: 32px;
    box-shadow: 0 0 30px var(--topic-color);
    animation: bossPulse 1.5s ease-in-out infinite;
  }
  @keyframes bossPulse {
    0%, 100% { box-shadow: 0 0 30px var(--topic-color); }
    50% { box-shadow: 0 0 60px var(--topic-color); }
  }
  .grade6-mode .quiz-card .progress-bar {
    flex: 1; min-width: 180px;
  }
  .grade6-mode .quiz-card .progress-bar .label {
    font-size: 11px; opacity: 0.7; margin-bottom: 4px;
    display: flex; justify-content: space-between;
  }
  .grade6-mode .quiz-card .progress-bar .track {
    height: 10px; background: rgba(255,255,255,0.08); border-radius: 999px;
    overflow: hidden;
  }
  .grade6-mode .quiz-card .progress-bar .track > div {
    height: 100%; background: linear-gradient(90deg, #fbbf24, #ec4899);
    transition: width 0.4s;
  }
  .grade6-mode .quiz-card .combo {
    padding: 8px 14px; border-radius: 10px; font-weight: 800;
    background: rgba(251,191,36,0.15); color: #fbbf24;
    font-size: 13px; border: 1px solid rgba(251,191,36,0.3);
    animation: comboBeat 1s infinite;
    display: none;
  }
  .grade6-mode .quiz-card .combo.show { display: block; }
  @keyframes comboBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .grade6-mode .quiz-card .q-stem {
    font-size: 22px; padding: 24px 20px;
    background: rgba(99,102,241,0.08);
    border-radius: 14px; margin: 8px 0 18px;
    border-left: 4px solid var(--topic-color);
    line-height: 1.5;
  }
  .grade6-mode .opts-grid {
    display: grid; gap: 10px; grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 480px) { .grade6-mode .opts-grid { grid-template-columns: 1fr; } }
  .grade6-mode .opt-btn {
    padding: 16px 18px; border-radius: 12px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.15);
    color: white; font-size: 15px; cursor: pointer; text-align: left;
    transition: all 0.15s; font-family: inherit; font-weight: 500;
    display: flex; gap: 12px; align-items: center;
  }
  .grade6-mode .opt-btn:hover {
    background: rgba(255,255,255,0.08); border-color: var(--topic-color);
    transform: translateX(4px);
  }
  .grade6-mode .opt-btn .key {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--topic-color); color: white;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px; flex-shrink: 0;
  }
  .grade6-mode .opt-btn.correct {
    background: rgba(16,185,129,0.2) !important;
    border-color: #10b981 !important; color: #6ee7b7;
    animation: critHit 0.5s;
  }
  .grade6-mode .opt-btn.wrong {
    background: rgba(239,68,68,0.2) !important;
    border-color: #ef4444 !important; color: #fca5a5;
    animation: shake 0.4s;
  }
  @keyframes critHit {
    0% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0); }
    50% { transform: scale(1.04); box-shadow: 0 0 30px rgba(16,185,129,0.6); }
    100% { transform: scale(1); box-shadow: 0 0 0 rgba(16,185,129,0); }
  }
  .grade6-mode .explain-box {
    margin-top: 16px; padding: 14px 18px;
    background: rgba(14,165,233,0.1); border-left: 3px solid #0ea5e9;
    border-radius: 10px; font-size: 14px; line-height: 1.6; display: none;
  }
  .grade6-mode .explain-box.show { display: block; animation: slideIn 0.3s; }
  .grade6-mode .next-btn {
    width: 100%; margin-top: 16px; padding: 14px;
    border: none; border-radius: 10px;
    background: linear-gradient(135deg, var(--topic-color), rgba(0,0,0,0.3));
    color: white; font-size: 15px; font-weight: 700;
    cursor: pointer; display: none;
    font-family: inherit;
  }
  .grade6-mode .next-btn.show { display: block; }

  /* SHARED — Result screen */
  .result-screen {
    display: none; max-width: 600px; margin: 24px auto; padding: 0 20px;
  }
  .result-screen.show { display: block; }
  .result-screen .card {
    text-align: center; padding: 36px 28px; border-radius: 24px;
    position: relative; overflow: hidden;
  }
  .grade2-mode .result-screen .card {
    background: white; border: 4px solid #fbbf24;
    box-shadow: 0 16px 50px rgba(0,0,0,0.15);
  }
  .grade6-mode .result-screen .card {
    background: rgba(2,6,23,0.8); border: 1px solid rgba(251,191,36,0.4);
    box-shadow: 0 16px 50px rgba(0,0,0,0.5);
  }
  .result-screen .emo { font-size: 80px; margin-bottom: 12px; line-height: 1; }
  .result-screen h2 {
    font-size: 32px; margin: 0 0 8px;
    background: linear-gradient(135deg, #fbbf24, #ec4899);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .result-screen .score-big {
    font-size: 64px; font-weight: 900; line-height: 1; margin: 16px 0;
    color: #10b981;
  }
  .result-screen .stars-final {
    font-size: 56px; margin: 12px 0; letter-spacing: 4px;
  }
  .result-screen .rewards {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    margin: 20px 0;
  }
  .result-screen .reward {
    padding: 10px 16px; border-radius: 12px;
    background: rgba(251,191,36,0.15); border: 1px solid #fbbf24;
    font-weight: 700; color: #fbbf24;
  }
  .grade2-mode .result-screen .reward { background: #fef3c7; }
  .result-screen .btn-row {
    display: flex; gap: 10px; justify-content: center; margin-top: 18px;
  }
  .result-screen button {
    padding: 12px 24px; border-radius: 12px; border: none;
    font-weight: 700; cursor: pointer; font-size: 15px; font-family: inherit;
  }
  .result-screen .btn-again {
    background: linear-gradient(135deg, #10b981, #059669); color: white;
  }
  .result-screen .btn-back {
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: inherit;
  }
  .grade2-mode .result-screen .btn-back { background: white; border: 2px solid #fbbf24; color: #422006; }

  /* Confetti & particles */
  .confetti {
    position: fixed; width: 12px; height: 12px;
    pointer-events: none; z-index: 1000;
    animation: confetti-fall 3s ease-out forwards;
  }
  @keyframes confetti-fall {
    0% { transform: translateY(-100px) rotate(0); opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }

  /* Pet companion */
  .pet-companion {
    position: fixed; bottom: 20px; right: 20px; z-index: 200;
    width: 80px; height: 80px;
    background: white; border-radius: 50%;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 42px;
    border: 4px solid #fbbf24;
    animation: petIdle 3s ease-in-out infinite;
    cursor: pointer; user-select: none;
  }
  @keyframes petIdle {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-8px) rotate(3deg); }
  }
  .pet-companion.celebrate { animation: petCelebrate 0.6s ease-in-out; }
  @keyframes petCelebrate {
    0% { transform: scale(1) rotate(0); }
    25% { transform: scale(1.3) rotate(-15deg); }
    75% { transform: scale(1.3) rotate(15deg); }
    100% { transform: scale(1) rotate(0); }
  }
  .pet-speech {
    position: fixed; bottom: 110px; right: 20px; z-index: 199;
    background: white; padding: 8px 14px; border-radius: 16px;
    font-size: 13px; font-weight: 600;
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    color: #422006; max-width: 200px;
    border: 2px solid #fbbf24;
    opacity: 0; transition: opacity 0.3s;
  }
  .pet-speech.show { opacity: 1; }

  /* Time-attack timer */
  .ta-timer {
    display: none;
    position: sticky; top: 0; left: 0; right: 0;
    padding: 6px 0; text-align: center;
    background: linear-gradient(90deg, #ef4444, #f97316);
    color: white; font-weight: 900; font-size: 16px;
    box-shadow: 0 4px 16px rgba(239,68,68,0.4);
    font-variant-numeric: tabular-nums;
    z-index: 100;
  }
  .ta-timer.show { display: block; }
  .ta-timer.urgent { animation: urgentPulse 0.5s infinite; }
  @keyframes urgentPulse {
    0%, 100% { background: linear-gradient(90deg, #ef4444, #f97316); }
    50% { background: linear-gradient(90deg, #dc2626, #ea580c); }
  }
`;

// Khung DOM tĩnh gốc (markup trong <body> của public/math-fun.html) — giữ NGUYÊN
// mọi id/class/onclick để engine cũ (window.enterGrade/goHome/g2*/g6*/petTalk)
// gọi trúng. Đường dẫn ./ giữ nguyên (proxy Express phục vụ).
const SKELETON = `
  <div class="home" id="home">
    <a href="./" class="back-link">← Trang chủ</a>
    <span class="floating" style="top:10%;left:5%;">∑</span>
    <span class="floating" style="top:20%;right:10%;">π</span>
    <span class="floating" style="bottom:15%;left:15%;">√</span>
    <span class="floating" style="bottom:20%;right:5%;">÷</span>
    <span class="floating" style="top:50%;left:50%;">×</span>

    <h1>🎮 Toán vui — Học mà chơi</h1>
    <p class="sub">Chọn lứa tuổi của em — mỗi nơi có riêng phong cách & nhân vật. Học theo dạng game, mỗi câu đúng được sao và XP!</p>
    <div class="pick">
      <div class="grade-card g2" onclick="enterGrade(2)">
        <div class="big-emo">🐿</div>
        <h2>Lớp 2</h2>
        <div class="tag">Phiêu lưu cùng bé sóc, gấu, thỏ.<br>16 dạng bài × hơn 190 câu.</div>
        <div class="ctas">
          <span class="chip">⭐ Sao thưởng</span>
          <span class="chip">🎉 Confetti</span>
          <span class="chip">🐾 Thú cưng</span>
        </div>
      </div>
      <div class="grade-card g6" onclick="enterGrade(6)">
        <div class="big-emo">⚔️</div>
        <h2>Lớp 6</h2>
        <div class="tag">Hành trình hiệp sĩ đánh boss số học.<br>16 chương × hơn 190 câu.</div>
        <div class="ctas">
          <span class="chip">💎 XP & Vàng</span>
          <span class="chip">🔥 Combo streak</span>
          <span class="chip">👑 Boss</span>
        </div>
      </div>
    </div>
  </div>

  <div class="grade2-mode" id="g2-mode" style="display:none;">
    <div class="head">
      <a href="#" class="back" onclick="goHome();return false;">← Quay lại</a>
      <h1>🐿 Toán Lớp 2</h1>
      <div class="stats">
        <div class="stat-item">⭐ <span id="g2-stars">0</span></div>
        <div class="stat-item">🎯 <span id="g2-correct">0</span> đúng</div>
      </div>
    </div>
    <div class="ta-timer" id="g2-timer">⏱ <span id="g2-time">60</span> giây</div>
    <div class="topics-wrap" id="g2-topics-wrap">
      <div class="topics-grid" id="g2-topics"></div>
    </div>
    <div class="quiz-area" id="g2-quiz" style="display:none;">
      <div class="quiz-card">
        <div class="header-row">
          <div class="mascot-quiz" id="g2-q-mascot">🐿</div>
          <div class="progress-bar">
            <div id="g2-q-progress"></div>
            <div class="progress-text" id="g2-q-progress-text">0/10</div>
          </div>
          <div class="stars-display" id="g2-q-stars"></div>
        </div>
        <div class="q-stem" id="g2-q-stem">…</div>
        <div class="opts-grid" id="g2-q-opts"></div>
        <div class="explain-box" id="g2-q-explain"></div>
        <button class="next-btn" id="g2-q-next" onclick="g2Next()">Câu tiếp theo →</button>
      </div>
    </div>
    <div class="result-screen" id="g2-result">
      <div class="card">
        <div class="emo" id="g2-r-emo">🏆</div>
        <h2 id="g2-r-title">Tuyệt vời!</h2>
        <div class="stars-final" id="g2-r-stars">⭐⭐⭐</div>
        <div class="score-big" id="g2-r-score">0/0</div>
        <div class="rewards">
          <div class="reward">🐾 <span id="g2-r-pet">+1 thú cưng</span></div>
          <div class="reward">⭐ <span id="g2-r-xp">+0 sao</span></div>
        </div>
        <p id="g2-r-msg" style="margin:14px 0;color:#7c3aed;">Em làm rất giỏi!</p>
        <div class="btn-row">
          <button class="btn-again" onclick="g2Restart()">🔁 Chơi lại</button>
          <button class="btn-back" onclick="g2BackToList()">📚 Đổi bài</button>
        </div>
      </div>
    </div>
  </div>

  <div class="grade6-mode" id="g6-mode" style="display:none;">
    <div class="head">
      <a href="#" class="back" onclick="goHome();return false;">← Sảnh</a>
      <h1>⚔️ Hành trình số học · Lớp 6</h1>
      <div class="stats">
        <div class="stat-item gold">💰 <span id="g6-gold">0</span></div>
        <div class="stat-item xp">💎 <span id="g6-xp">0</span> XP</div>
        <div class="stat-item streak">🔥 <span id="g6-streak">0</span></div>
      </div>
    </div>
    <div class="ta-timer" id="g6-timer">⏱ <span id="g6-time">90</span> giây</div>
    <div class="topics-wrap" id="g6-topics-wrap">
      <div class="topics-grid" id="g6-topics"></div>
    </div>
    <div class="quiz-area" id="g6-quiz" style="display:none;">
      <div class="quiz-card">
        <div class="header-row">
          <div class="boss-portrait" id="g6-q-boss">⚔️</div>
          <div class="progress-bar">
            <div class="label"><span id="g6-q-title">…</span> <span id="g6-q-progress-text">0/10</span></div>
            <div class="track"><div id="g6-q-progress"></div></div>
          </div>
          <div class="combo" id="g6-q-combo">🔥 ×0</div>
        </div>
        <div class="q-stem" id="g6-q-stem">…</div>
        <div class="opts-grid" id="g6-q-opts"></div>
        <div class="explain-box" id="g6-q-explain"></div>
        <button class="next-btn" id="g6-q-next" onclick="g6Next()">Tiếp →</button>
      </div>
    </div>
    <div class="result-screen" id="g6-result">
      <div class="card">
        <div class="emo" id="g6-r-emo">⚔️</div>
        <h2 id="g6-r-title">Victory!</h2>
        <div class="score-big" id="g6-r-score">0/0</div>
        <div class="rewards">
          <div class="reward">💎 +<span id="g6-r-xp">0</span> XP</div>
          <div class="reward">💰 +<span id="g6-r-gold">0</span></div>
          <div class="reward">🔥 max combo <span id="g6-r-combo">0</span></div>
        </div>
        <p id="g6-r-msg" style="margin:14px 0;opacity:0.85;">Cuộc chiến tốt lắm!</p>
        <div class="btn-row">
          <button class="btn-again" onclick="g6Restart()">⚔️ Chiến lại</button>
          <button class="btn-back" onclick="g6BackToList()">🗺 Bản đồ</button>
        </div>
      </div>
    </div>
  </div>

  <div class="pet-companion" id="pet" style="display:none;" onclick="petTalk()">🐿</div>
  <div class="pet-speech" id="pet-speech"></div>
`;

export default function MathFunPage() {
  useEffect(() => {
    // 1) CSS gốc vào <head> — nền gradient trên <body> + confetti/pet fixed thẳng
    //    trong document.body → phải ở phạm vi document, không scope container.
    const style = document.createElement('style');
    style.dataset.mathFunLegacy = '1';
    style.textContent = LEGACY_CSS;
    document.head.appendChild(style);

    // 2) Script phụ gốc + engine chính, đúng thứ tự & đúng loại:
    //    - adaptive-bridge.js (module) trước: cấp window.EduAdaptive (engine gọi
    //      window.EduAdaptive?.event, guard nên thứ tự không bắt buộc nhưng giữ đúng gốc).
    //    - math-fun.js (module) là engine chính (top-level import/await).
    //    - state-sync.js (module) đồng bộ localStorage math2/math6 ↔ server.
    //    - pwa-register.js (classic, defer) đăng ký service worker.
    //    ?ts để re-execute khi client-navigate quay lại trang.
    const ts = Date.now();
    const mk = (src: string, module: boolean, defer = false) => {
      const s = document.createElement('script');
      if (module) s.type = 'module';
      if (defer) s.defer = true;
      s.dataset.mathFunLegacy = '1';
      s.src = `${src}?ts=${ts}`;
      document.body.appendChild(s);
      return s;
    };

    const sAdaptive = mk('/js/adaptive-bridge.js', true);
    const sEngine = mk('/legacy/math-fun.js', true);
    const sSync = mk('/js/engine/state-sync.js', true);
    const sPwa = mk('/js/pwa-register.js', false, true);

    return () => {
      // Dọn timer đang chạy (engine có setInterval time-attack) trước khi gỡ.
      try {
        (window as any).goHome?.();
      } catch {}
      [sAdaptive, sEngine, sSync, sPwa].forEach((s) => s.remove());
      style.remove();
      // confetti/pet append thẳng vào body → dọn để re-mount sạch.
      document
        .querySelectorAll('body > .confetti, body > .pet-companion, body > .pet-speech')
        .forEach((el) => el.remove());
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: SKELETON }} />;
}
