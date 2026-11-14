'use client';

// ============================================================
// compounding-lab — WRAP-MOUNT của trang vanilla Three.js gốc
// (public/compounding-lab.html, 4504 dòng). KHÔNG viết lại engine:
// engine giữ nguyên trong /public/legacy/compounding-lab.js (ES module).
// Trang này chỉ: (1) render lại DOM skeleton gốc (giữ mọi id/class/data-*),
// (2) chèn <style> global gốc, (3) nạp importmap + module script theo đúng
// thứ tự trong useEffect. Content (recipes/reagents) legacy js tự fetch từ
// /api/content/lab-recipes & /api/content/lab-reagents qua proxy Express.
// ============================================================

import { useEffect } from 'react';

const LEGACY_CSS = `  html, body { margin: 0; height: 100%; overflow: hidden; background: linear-gradient(180deg, #e8efe9 0%, #c9d5cc 100%); font-family: system-ui, sans-serif; touch-action: none; -webkit-tap-highlight-color: transparent; color: #1f2937; }
  canvas { display: block; touch-action: none; }
  a { color: inherit; }

  #topbar {
    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 10px; align-items: center;
    background: rgba(255,255,255,0.94); backdrop-filter: blur(8px);
    padding: 8px 14px; border-radius: 14px; font-size: 13px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
    max-width: calc(100vw - 80px); width: max-content;
    border: 1px solid rgba(0,0,0,0.06);
    flex-wrap: nowrap; white-space: nowrap;
  }
  #topbar .topbar-divider {
    width: 1px; height: 22px; background: rgba(0,0,0,0.1); margin: 0 2px;
  }
  #topbar button.primary {
    background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff;
    border-color: transparent;
  }
  #topbar button.primary:disabled { opacity: 0.45; cursor: not-allowed; }
  #topbar button.primary:not(:disabled):hover { filter: brightness(1.05); }
  #topbar .pill {
    background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px; letter-spacing: 0.5px;
  }
  #topbar .lvl-pill {
    background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723;
    padding: 4px 10px; border-radius: 14px; font-weight: 700; font-size: 11px;
  }
  #topbar button {
    background: rgba(0,0,0,0.06); color: #1f2937; border: 1px solid rgba(0,0,0,0.08);
    padding: 4px 12px; border-radius: 10px; font-size: 12px; cursor: pointer; font-family: inherit;
  }
  #topbar button:hover { background: rgba(0,0,0,0.10); }

  a.back {
    position: absolute; top: 12px; left: 12px; z-index: 10;
    background: rgba(255,255,255,0.85); color: #1f2937; padding: 6px 12px; border-radius: 8px;
    text-decoration: none; font-size: 13px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  /* ===== Recipe panel (clipboard style) — hidden by default, opens via FAB ===== */
  #recipe {
    display: none;
    position: absolute; top: 60px; left: 12px; z-index: 10;
    width: 270px;
    background:
      repeating-linear-gradient(180deg, #fffef5 0px, #fffef5 27px, #f0e8c8 28px),
      linear-gradient(180deg, #fffdf0, #f7eecc);
    border-radius: 4px 4px 8px 8px;
    box-shadow:
      0 8px 28px rgba(0,0,0,0.22),
      inset 0 1px 0 rgba(255,255,255,0.7);
    border: 1px solid #c9b780;
    color: #2c1d0a;
    font-size: 13px; line-height: 1.5;
  }
  #recipe::before {
    content: ''; position: absolute; left: 50%; top: -14px; transform: translateX(-50%);
    width: 70px; height: 18px;
    background: linear-gradient(180deg, #b0b0b0, #777);
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4);
  }
  #recipe::after {
    content: ''; position: absolute; left: 50%; top: -22px; transform: translateX(-50%);
    width: 26px; height: 14px;
    background: #888; border-radius: 4px 4px 0 0;
  }
  #recipe-head {
    background: linear-gradient(180deg, #e1d29f, #ccb878);
    padding: 24px 14px 8px;
    border-radius: 4px 4px 0 0;
    font-weight: 800; font-size: 14px; color: #2c1d0a;
    text-align: center;
    border-bottom: 1px solid #b39c5e;
  }
  #recipe-body { padding: 10px 14px 12px; }
  #recipe-body .lbl { font-size: 10px; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 8px; font-weight: 700; }
  #recipe-body ul { list-style: none; padding: 0; margin: 4px 0 8px; }
  #recipe-body ul li { display: flex; justify-content: space-between; padding: 2px 0; font-family: 'SF Mono', Consolas, monospace; font-size: 12px; }
  #recipe-body .ix { background: linear-gradient(90deg, transparent 90%, rgba(0,0,0,0.04) 100%); padding-left: 6px; }
  #recipe-body .totals { border-top: 1px dashed #a38f4e; padding-top: 6px; font-weight: 700; }
  #recipe.open { display: block; }

  /* ===== Step instructions — hidden by default, opens via FAB ===== */
  #step {
    display: none;
    position: absolute; top: 60px; right: 12px; z-index: 10;
    width: 320px;
    background: rgba(255,255,255,0.96);
    border-radius: 12px;
    padding: 14px 18px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.18);
    border: 1px solid rgba(0,0,0,0.06);
  }
  #step .stepnum {
    display: inline-block;
    background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723;
    padding: 2px 10px; border-radius: 10px; font-weight: 800; font-size: 11px;
    letter-spacing: 0.5px; margin-bottom: 6px;
  }
  #step .title { font-size: 16px; font-weight: 800; color: #14532d; margin-bottom: 4px; }
  #step .body { font-size: 13px; line-height: 1.5; color: #374151; }
  #step .meter { background: #e5e7eb; height: 8px; border-radius: 4px; margin-top: 10px; overflow: hidden; }
  #step .meter > div { background: linear-gradient(90deg, #10b981, #14b8a6); height: 100%; width: 0; transition: width 0.3s; }
  #step .targets { display: flex; justify-content: space-between; font-size: 11px; opacity: 0.7; margin-top: 4px; font-family: 'SF Mono', Consolas, monospace; }
  #step.open { display: block; }

  /* ===== Side FABs (recipe, step at top-right; mp at bottom-right) ===== */
  #recipe-fab, #step-fab, #mp-fab {
    position: absolute; z-index: 11;
    width: 44px; height: 44px; border-radius: 50%;
    color: #fff; border: 1px solid rgba(0,0,0,0.12);
    box-shadow: 0 4px 14px rgba(0,0,0,0.22);
    font-size: 20px; font-weight: 800; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; user-select: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
  }
  #recipe-fab:hover, #step-fab:hover, #mp-fab:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.28); }
  #recipe-fab { top: 56px; left: 12px; background: linear-gradient(135deg, #b08948, #8a6a2e); }
  #step-fab { top: 12px; right: 12px; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723; }
  #step-fab .step-frac { font-size: 11px; font-weight: 800; letter-spacing: 0; }
  #mp-fab { bottom: 22px; right: 76px; background: linear-gradient(135deg, #14b8a6, #0f766e); display: none; }
  #mp-fab.active { display: flex; }
  #recipe-fab.open, #step-fab.open, #mp-fab.open { filter: brightness(0.85); }

  /* ===== Toast ===== */
  #toast {
    position: absolute; top: 60%; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.88); color: white; padding: 12px 22px;
    border-radius: 22px; font-size: 14px; z-index: 20; display: none;
    box-shadow: 0 6px 22px rgba(0,0,0,0.3);
  }
  #toast.ok { background: linear-gradient(135deg, #16a34a, #15803d); }
  #toast.err { background: linear-gradient(135deg, #dc2626, #b91c1c); }

  /* ===== Bottom buttons (legacy — buttons now live inside #topbar) ===== */
  #ctrl-bar { display: none; }
  #ctrl-bar-legacy {
    position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 10px;
  }
  #ctrl-bar button {
    padding: 10px 18px; font-size: 14px; font-weight: 700;
    border: none; border-radius: 10px; cursor: pointer;
    background: rgba(255,255,255,0.94); color: #1f2937;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: inherit;
    transition: transform .1s, filter .15s;
  }
  #ctrl-bar button:hover { transform: translateY(-1px); filter: brightness(1.05); }
  #ctrl-bar button.primary { background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff; }
  #ctrl-bar button.danger  { background: linear-gradient(135deg, #ef4444, #b91c1c); color: #fff; }
  #ctrl-bar button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ===== Camera focus bar (bottom, above ctrl-bar) ===== */
  #cam-focus-bar {
    position: absolute; bottom: 72px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;
    max-width: calc(100vw - 24px);
  }
  #cam-focus-bar button {
    padding: 7px 12px; font-size: 12px; font-weight: 600;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 999px; cursor: pointer;
    background: rgba(255,255,255,0.92); color: #1f2937;
    box-shadow: 0 2px 6px rgba(0,0,0,0.10);
    font-family: inherit;
    transition: transform .1s, background .15s, color .15s;
  }
  #cam-focus-bar button:hover { transform: translateY(-1px); background: #fff; }
  #cam-focus-bar button.active { background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff; border-color: transparent; }

  /* ===== Hover label ===== */
  #hover-label {
    position: absolute; left: 0; top: 0; pointer-events: none;
    background: rgba(255,255,255,0.97); border-radius: 12px;
    padding: 8px 14px 10px; font-size: 13px; color: #1f2937;
    box-shadow: 0 6px 18px rgba(0,0,0,0.28); transform: translate(-50%, calc(-100% - 14px));
    white-space: nowrap; opacity: 0; transition: opacity .15s;
    z-index: 12; border: 1.5px solid rgba(0,0,0,0.08);
  }
  #hover-label.shown { opacity: 1; }
  #hover-label .ht { font-weight: 800; font-size: 14px; }
  #hover-label .hs { font-size: 11px; opacity: 0.62; margin-top: 1px; }
  #hover-label .hc {
    display: inline-block; margin-top: 5px; padding: 2px 10px;
    border-radius: 10px; font-size: 11px; color: #fff; font-weight: 700;
    background: var(--cat-color, #43a047);
  }
  #hover-label::after {
    content: ''; position: absolute; bottom: -7px; left: 50%;
    transform: translateX(-50%);
    width: 0; height: 0;
    border-left: 8px solid transparent; border-right: 8px solid transparent;
    border-top: 8px solid rgba(255,255,255,0.97);
  }
  /* Unity-style "Press to interact" floating prompt */
  #hover-press {
    position: absolute; left: 0; top: 0; pointer-events: none;
    background: rgba(0,0,0,0.82); color: #fff;
    border-radius: 16px;
    padding: 4px 10px 4px 6px;
    font-family: system-ui, sans-serif; font-size: 12px;
    display: inline-flex; align-items: center; gap: 5px;
    transform: translate(-50%, calc(100% + 8px));
    z-index: 12; opacity: 0; transition: opacity .12s;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    white-space: nowrap;
  }
  #hover-press.shown { opacity: 1; }
  #hover-press .kb {
    display: inline-block; background: #fff; color: #222;
    padding: 1px 6px; border-radius: 4px; font-weight: 700; font-size: 10px;
    box-shadow: 0 1px 0 #888;
    font-family: 'SF Mono', monospace;
  }
  #hover-press .icon { font-size: 14px; }

  /* ===== Result modal ===== */
  #result-modal, #level-modal {
    position: absolute; inset: 0; background: rgba(0,0,0,0.78);
    display: none; align-items: center; justify-content: center; z-index: 30;
    backdrop-filter: blur(4px);
  }
  #result-modal .card { background: #fff; border-radius: 16px; padding: 26px 30px; width: min(480px, 90vw); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
  #result-modal .score-big { font-size: 44px; font-weight: 800; text-align: center; }
  #result-modal .verdict { font-size: 14px; text-align: center; opacity: 0.75; }
  #result-modal ul { list-style: none; padding: 0; margin: 12px 0; font-size: 13px; line-height: 1.7; }
  #result-modal .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
  #result-modal button, #result-modal a {
    padding: 9px 18px; border-radius: 8px; border: 1px solid #d1d5db; cursor: pointer;
    background: #f3f4f6; color: #1f2937; font-weight: 600; text-decoration: none; font-family: inherit;
  }
  #result-modal button.primary { background: linear-gradient(135deg, #14b8a6, #0f766e); color: #fff; border: none; }

  /* ===== Level select modal ===== */
  #level-modal .lm-card {
    background: linear-gradient(180deg, #ffffff, #f3f4f6);
    color: #1f2937; /* panel TRẮNG phải tự chốt chữ tối — không thừa kế chữ sáng của trang tối */
    border-radius: 18px; padding: 24px 28px;
    width: min(820px, 96vw); max-height: 92vh; overflow: auto;
    box-shadow: 0 28px 80px rgba(0,0,0,0.5);
  }
  #level-modal h2 { margin: 0 0 4px; font-size: 22px; color: #14532d; }
  #level-modal .lm-sub { font-size: 13px; opacity: 0.72; margin-bottom: 16px; }
  #level-modal .lm-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
  #level-modal .lm-card-mini {
    background: #fff; border: 2px solid #e5e7eb; border-radius: 14px; padding: 14px;
    cursor: pointer; transition: transform .12s, border-color .12s, box-shadow .12s;
    display: flex; flex-direction: column; gap: 4px;
  }
  #level-modal .lm-card-mini:hover { border-color: #14b8a6; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(20,184,166,0.15); }
  #level-modal .lm-icon { font-size: 32px; }
  #level-modal .lm-name { font-weight: 800; font-size: 15px; color: #14532d; }
  #level-modal .lm-short { font-size: 11px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.4px; }
  #level-modal .lm-desc { font-size: 12px; line-height: 1.4; color: #374151; margin-top: 4px; }
  #level-modal .lm-meta { font-size: 11px; color: #047857; margin-top: 6px; font-family: 'SF Mono', Consolas, monospace; }
  #level-modal .lm-badge { display: inline-block; background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723; padding: 2px 8px; border-radius: 8px; font-size: 10px; font-weight: 800; margin-top: 4px; align-self: flex-start; }
  #level-modal .lm-foot { display: flex; gap: 8px; margin-top: 14px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
  #level-modal .lm-mp { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  #level-modal .lm-mp input[type=checkbox] { width: 16px; height: 16px; accent-color: #14b8a6; }
  #level-modal .lm-mp input[type=text] { padding: 6px 10px; border-radius: 8px; border: 1px solid #d1d5db; font-size: 13px; font-family: inherit; }

  /* ===== Multiplayer panel — hidden by default, opens via bottom-right FAB ===== */
  #mp-panel {
    position: absolute; bottom: 76px; right: 22px; z-index: 10;
    width: 320px; background: rgba(255,255,255,0.97);
    border-radius: 12px; padding: 10px 14px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
    font-size: 12px; display: none; border: 1px solid rgba(0,0,0,0.06);
  }
  #mp-panel.open { display: block; }
  #mp-panel h5 { margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7; }
  #mp-panel .pl-row { display: flex; align-items: center; gap: 7px; padding: 3px 0; }
  #mp-panel .pl-dot { width: 10px; height: 10px; border-radius: 50%; }
  #mp-panel .pl-prog { margin-left: auto; font-family: 'SF Mono', Consolas, monospace; font-size: 11px; color: #047857; }
  #mp-panel .pl-me { font-weight: 700; }
  #mp-chat-log { max-height: 110px; overflow-y: auto; margin-top: 6px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 6px; font-size: 12px; }
  #mp-chat-log .chat-row { padding: 1px 0; line-height: 1.4; }
  #mp-chat-input {
    width: 100%; box-sizing: border-box; margin-top: 4px;
    padding: 6px 10px; border-radius: 6px; border: 1px solid #d1d5db;
    font-size: 12px; font-family: inherit;
  }
  /* ===== Action menu — popup behind the bottom-right gear FAB ===== */
  #action-fab {
    position: absolute; bottom: 22px; right: 22px; z-index: 11;
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, #475569, #334155); color: #fff;
    border: 1px solid rgba(0,0,0,0.12);
    box-shadow: 0 4px 14px rgba(0,0,0,0.22);
    font-size: 20px; font-weight: 800; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; user-select: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  #action-fab:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.28); }
  #action-fab.open { background: linear-gradient(135deg, #1f2937, #0f172a); }
  #action-menu {
    position: absolute; bottom: 76px; right: 22px; z-index: 10;
    display: none; flex-direction: column; gap: 8px; align-items: flex-end;
  }
  #action-menu.open { display: flex; }
  #action-menu button {
    background: rgba(255,255,255,0.97); color: #1f2937;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 10px; padding: 8px 14px; font-size: 12px;
    cursor: pointer; font-family: inherit; white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  #action-menu button:hover { transform: translateY(-1px); }
  #walk-btn.active, #hand-btn.active { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #3e2723; border-color: transparent; }
  #cam-preview {
    position: absolute; bottom: 70px; right: 12px; z-index: 9;
    border-radius: 8px; background: #000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    transform: scaleX(-1); display: none;
  }
  #cam-preview.shown { display: block; }
  #crosshair {
    position: absolute; top: 50%; left: 50%; margin: -8px 0 0 -8px;
    width: 16px; height: 16px; border: 2px solid #fff;
    border-radius: 50%; box-shadow: 0 0 0 1px rgba(0,0,0,0.55);
    pointer-events: none; z-index: 9; display: none;
  }
  #crosshair.shown { display: block; }
  #walk-hint {
    position: absolute; bottom: 70px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.75); color: white; padding: 7px 16px;
    border-radius: 16px; font-size: 12px; z-index: 9;
    display: none;
  }
  #walk-hint.shown { display: block; }

  /* ===== "How to play" help — collapsed by default, opens from a FAB ===== */
  #help-fab {
    position: absolute; bottom: 22px; left: 22px; z-index: 11;
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, #0f766e, #14b8a6); color: #fff;
    border: 1px solid rgba(0,0,0,0.12);
    box-shadow: 0 4px 14px rgba(0,0,0,0.22);
    font-size: 20px; font-weight: 800; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; user-select: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  }
  #help-fab:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.28); }
  #help-fab.open { background: linear-gradient(135deg, #475569, #334155); }
  #help-card {
    position: absolute; bottom: 76px; left: 22px; z-index: 10;
    background: rgba(255,255,255,0.97);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 12px; padding: 12px 14px;
    font-size: 12px; line-height: 1.55;
    width: 248px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    display: none;
  }
  #help-card.open { display: block; }
  #help-card h5 {
    margin: 0 0 6px; font-size: 11px;
    color: #0f766e; letter-spacing: 0.5px;
    text-transform: uppercase; font-weight: 800;
    display: flex; align-items: center; gap: 6px;
  }
  #help-card h5 .toggle {
    margin-left: auto; cursor: pointer; user-select: none;
    background: rgba(0,0,0,0.05); border-radius: 6px;
    padding: 0 7px; font-weight: 700; color: #0f766e;
  }
  #help-card .row { display: flex; align-items: center; gap: 7px; padding: 2px 0; }
  #help-card .kbd {
    display: inline-block; min-width: 22px; padding: 1px 6px;
    border-radius: 5px; background: linear-gradient(180deg, #fff, #e5e7eb);
    border: 1px solid #9ca3af; box-shadow: 0 1px 0 #6b7280;
    font-family: 'SF Mono', monospace; font-weight: 700; font-size: 10.5px;
    color: #1f2937; text-align: center;
  }
  #help-card .row .desc { flex: 1; color: #1f2937; }

  /* ===== "Đang cầm" badge — follows cursor in mouse mode, pinned in walk mode ===== */
  #hold-badge {
    position: absolute; pointer-events: none; z-index: 13;
    background: linear-gradient(135deg, #14b8a6, #0f766e);
    color: #fff; padding: 5px 12px 5px 8px;
    border-radius: 16px; font-size: 12px; font-weight: 700;
    box-shadow: 0 4px 12px rgba(20,184,166,0.45), 0 0 0 2px rgba(255,255,255,0.4);
    display: none; align-items: center; gap: 6px;
    transform: translate(14px, 18px);
    white-space: nowrap; max-width: 240px;
    overflow: hidden; text-overflow: ellipsis;
  }
  #hold-badge.shown { display: inline-flex; }
  #hold-badge .ic { font-size: 14px; }
  #hold-badge .clear {
    background: rgba(255,255,255,0.3); color: #fff;
    padding: 1px 6px; border-radius: 6px; font-size: 10px;
    pointer-events: auto; cursor: pointer; margin-left: 4px;
  }
  #hold-badge.walk-mode {
    top: auto !important; left: 50% !important;
    bottom: 110px; transform: translateX(-50%);
  }

  @media (max-width: 720px) {
    #recipe { width: 220px; font-size: 12px; }
    #step { width: 240px; padding: 10px 14px; }
    #step .title { font-size: 14px; }
    #topbar { font-size: 11px; padding: 6px 10px; max-width: calc(100vw - 24px); }
    #mp-panel { width: 200px; }
    a.back { font-size: 12px; padding: 5px 10px; }
  }
`;

const SKELETON = `<a class="back" href="./">← Trang chính</a>
<div id="topbar">
  <span class="pill">🧪 BÀO CHẾ</span>
  <span class="lvl-pill" id="lvl-pill">LV 1</span>
  <span id="topbar-recipe">Siro Paracetamol</span>
  <button id="change-level">↻ Đổi bài</button>
  <span class="topbar-divider"></span>
  <button id="restart-btn" title="Làm lại từ đầu">🔄 Làm lại</button>
  <button id="skip-step-btn" title="Bỏ qua bước hiện tại">⏭️ Bỏ qua</button>
  <button id="submit-btn" class="primary" disabled title="Hoàn thành & nộp bài">📝 Nộp bài</button>
</div>

<div id="action-menu">
  <button id="mp-action">👥 Tham gia phòng chung</button>
  <button id="walk-btn" title="Phím V — vào chế độ đi quanh phòng">🚶 Đi quanh phòng (V)</button>
  <button id="hand-btn" title="MediaPipe hand tracking — pinch ngón cái + trỏ qua webcam">🖐️ Bật điều khiển tay</button>
</div>
<div id="action-fab" title="Cài đặt nhanh">⚙️</div>
<canvas id="cam-preview" width="200" height="150"></canvas>
<div id="crosshair"></div>
<div id="walk-hint">🚶 WASD đi · chuột nhìn · Click thao tác · <kbd>Esc</kbd> thoát</div>

<div id="recipe-fab" title="Đơn pha chế">📋</div>
<div id="step-fab" title="Bước hiện tại"><span class="step-frac" id="step-fab-frac">1/6</span></div>
<div id="mp-fab" title="Trong phòng chung">👥</div>

<div id="recipe">
  <div id="recipe-head">📋 ĐƠN PHA CHẾ</div>
  <div id="recipe-body"></div>
</div>

<div id="step">
  <span class="stepnum" id="step-num">BƯỚC 1 / 6</span>
  <div class="title" id="step-title">Đặt cốc lên cân</div>
  <div class="body" id="step-body"></div>
  <div class="meter"><div id="meter-bar"></div></div>
  <div class="targets"><span id="meter-cur">0.000 g</span><span id="meter-tgt">đích: 0.000 g</span></div>
</div>

<div id="mp-panel">
  <h5>👥 Trong phòng chung</h5>
  <div id="mp-players"></div>
  <div id="mp-chat-log"></div>
  <input id="mp-chat-input" placeholder="Nhắn (Enter để gửi)" maxlength="140" />
</div>

<div id="toast"></div>
<div id="hover-label"><div class="ht"></div><div class="hs"></div><div class="hc"></div></div>
<div id="hover-press"><span class="icon">🖱️</span><span class="kb">CLICK</span><span>để cầm</span></div>

<div id="help-fab" title="Hướng dẫn thao tác">?</div>
<div id="help-card">
  <h5>🎮 Cách thao tác <span class="toggle" id="help-toggle">×</span></h5>
  <div class="body">
    <div class="row"><span class="kbd">🖱️</span><span class="desc"><b>Click chai/dụng cụ</b> để cầm — vật được viền xanh + hiện badge "Đang cầm"</span></div>
    <div class="row"><span class="kbd">🖱️</span><span class="desc"><b>Click lần 2</b> vào cốc/ống đong/cân để <b>rót / đặt</b></span></div>
    <div class="row"><span class="kbd">Esc</span><span class="desc">Bỏ chọn vật đang cầm</span></div>
    <div class="row"><span class="kbd">V</span><span class="desc">Vào chế độ <b>đi quanh phòng</b> (WASD + chuột)</span></div>
    <div class="row"><span class="kbd">✋</span><span class="desc"><b>Pinch ngón cái + trỏ</b> qua webcam (nút "Bật điều khiển tay") — hỗ trợ <b>2 tay</b></span></div>
    <div class="row"><span class="kbd">🤲</span><span class="desc"><b>Hai tay đồng thời pinch</b> (cầm chai + chụm vào cốc) → <b>rót ổn định</b>, ít quá tay</span></div>
    <div class="row" style="margin-top:5px;border-top:1px dashed rgba(0,0,0,0.1);padding-top:5px"><span style="font-size:11px;opacity:0.75;font-weight:700">🧰 Dụng cụ thêm</span></div>
    <div class="row"><span class="kbd">💧</span><span class="desc"><b>Pipet 5 mL</b>: cầm → click container có dung dịch để <b>hút</b>, sau đó click container khác để <b>nhỏ</b></span></div>
    <div class="row"><span class="kbd">🥄</span><span class="desc"><b>Đũa khuấy</b>: cầm → click vào cốc/ống đong/cối để <b>khuấy</b></span></div>
    <div class="row"><span class="kbd">💢</span><span class="desc"><b>Chày</b>: cầm → click cối có hỗn hợp để <b>nghiền</b> (sinh bụi)</span></div>
    <div class="row"><span class="kbd">🤝</span><span class="desc"><b>Lắc chai</b>: double-click chai thành phẩm</span></div>
    <div class="row" style="margin-top:5px;border-top:1px dashed rgba(0,0,0,0.1);padding-top:5px"><span style="font-size:11px;opacity:0.75">💡 Thao tác tự do — sai quy trình sẽ được tổng kết cuối bài.</span></div>
  </div>
</div>

<div id="hold-badge">
  <span class="ic">✋</span>
  <span id="hold-name">Đang cầm</span>
  <span class="clear" id="hold-clear">Esc</span>
</div>

<div id="cam-focus-bar">
  <button data-focus="default">🏠 Toàn cảnh</button>
  <button data-focus="counter">🧪 Bàn</button>
  <button data-focus="shelf">📚 Kệ hóa chất</button>
  <button data-focus="balance">⚖️ Cân</button>
  <button data-focus="periodic">🔬 Bảng tuần hoàn</button>
  <button data-focus="drugclasses">📊 Phân loại thuốc</button>
  <button data-focus="finalbottle">🧴 Chai thành phẩm</button>
</div>

<div id="result-modal"><div class="card" id="result-card"></div></div>

<div id="level-modal">
  <div class="lm-card">
    <h2>🧪 Chọn bài pha chế</h2>
    <p class="lm-sub">Mỗi bài là một đơn pha chế thật từ sách giáo trình Bào chế Dược. Càng cao càng nhiều thành phần.</p>
    <div class="lm-grid" id="lm-grid"></div>
    <div class="lm-foot">
      <label class="lm-mp">
        <input type="checkbox" id="lm-mp-toggle" />
        <span>Vào phòng chung (multiplayer) — nhìn thấy bạn cùng lớp pha chế cùng lúc</span>
      </label>
      <input type="text" id="lm-name" placeholder="Tên / mã SV (cho phòng chung)" maxlength="32" />
    </div>
  </div>
</div>
`;

export default function CompoundingLabPage() {
  useEffect(() => {
    // Tránh double-mount (React StrictMode dev) nạp engine 2 lần.
    if ((window as any).__compoundingLabMounted) return;
    (window as any).__compoundingLabMounted = true;

    const appended: Node[] = [];

    // 1) importmap PHẢI có mặt trước khi module dùng bare-import 'three' được nạp.
    const importmap = document.createElement('script');
    importmap.type = 'importmap';
    importmap.textContent = JSON.stringify({
      imports: {
        three: '/vendor/three-0.160/build/three.module.js',
        'three/addons/': '/vendor/three-0.160/examples/jsm/',
      },
    });
    document.head.appendChild(importmap);
    appended.push(importmap);

    // 2) engine module gốc (ES module, có top-level await + import three qua map).
    const engine = document.createElement('script');
    engine.type = 'module';
    engine.src = '/legacy/compounding-lab.js';
    document.body.appendChild(engine);
    appended.push(engine);

    return () => {
      // Engine Three.js gốc không có teardown; giữ mounted-guard để không nạp lại.
      appended.forEach((n) => n.parentNode?.removeChild(n));
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LEGACY_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </>
  );
}
