'use client';

import { useEffect, useRef } from 'react';

// Scoped styles copied verbatim from the original inline <style> block.
const STYLE = `
  html, body { margin: 0; height: 100%; overflow: hidden; font-family: 'Inter', system-ui, sans-serif; color: white; background: #1e293b; }
  .topbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; gap: 14px; align-items: center;
    padding: 10px 16px;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-size: 13px;
  }
  .topbar a { color: white; opacity: 0.85; text-decoration: none; }
  .topbar a:hover { opacity: 1; }
  .topbar .spacer { flex: 1; }
  .stat { display: inline-flex; gap: 6px; align-items: center; }
  .stat b { color: #a78bfa; font-weight: 700; }
  .step-pill {
    background: #a78bfa; color: #1f1147; padding: 4px 10px;
    border-radius: 14px; font-weight: 700; font-size: 12px;
  }
  .badge {
    background: linear-gradient(135deg, #ec4899, #f97316);
    color: white; padding: 3px 9px; border-radius: 10px;
    font-size: 11px; font-weight: 700;
  }
  .panel {
    position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 10px 16px;
    display: flex; gap: 10px; align-items: center;
    z-index: 1000; max-width: 92vw; flex-wrap: wrap; justify-content: center;
  }
  .panel button {
    background: #a78bfa; color: #1f1147; border: none;
    padding: 8px 16px; border-radius: 10px;
    font-family: inherit; font-weight: 700; font-size: 13px;
    cursor: pointer;
  }
  .panel button:disabled { opacity: 0.4; cursor: not-allowed; }
  .toast {
    position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.85); color: white;
    padding: 10px 18px; border-radius: 10px;
    font-size: 14px; z-index: 1000;
    border-left: 3px solid #a78bfa;
  }
  .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(6px); display: none; align-items: center; justify-content: center; z-index: 2000; }
  .modal.show { display: flex; }
  .modal-card { background: linear-gradient(135deg, #1e293b, #312e81); border-radius: 16px; padding: 24px 28px; max-width: 500px; width: 90vw; border: 1px solid rgba(255,255,255,0.15); }
  .modal h2 { margin: 0 0 12px; font-size: 24px; }
  .modal .score { font-size: 56px; font-weight: 800; text-align: center; color: #a78bfa; line-height: 1; margin: 12px 0; }
  .modal .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; }
  .modal-btns { display: flex; gap: 10px; margin-top: 18px; justify-content: center; flex-wrap: wrap; }
  .modal-btns button, .modal-btns a { padding: 10px 18px; border-radius: 10px; border: none; font-family: inherit; font-weight: 700; font-size: 14px; cursor: pointer; text-decoration: none; color: white; }
  .modal-btns .primary { background: #a78bfa; color: #1f1147; }
  .modal-btns .outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); }

  /* Tutorial overlay */
  .tutorial {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg, rgba(31,17,71,0.95), rgba(46,16,101,0.95));
    border: 1px solid rgba(236,72,153,0.4);
    border-radius: 14px; padding: 12px 18px;
    max-width: 460px; width: calc(100vw - 40px);
    z-index: 1000; backdrop-filter: blur(14px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    pointer-events: none;
  }
  .tutorial .tut-head { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .tutorial .tut-num {
    width: 26px; height: 26px; border-radius: 50%;
    background: linear-gradient(135deg, #a78bfa, #ec4899);
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 13px; color: white; flex-shrink: 0;
  }
  .tutorial .tut-title { font-size: 14px; font-weight: 700; }
  .tutorial .tut-body { font-size: 12.5px; line-height: 1.45; opacity: 0.92; margin-top: 2px; }
  .tutorial .tut-hint { font-size: 10.5px; opacity: 0.65; margin-top: 4px; font-style: italic; }
  @media (max-width: 720px) {
    .tutorial { bottom: 88px; padding: 10px 14px; }
    .tutorial .tut-title { font-size: 13px; }
    .tutorial .tut-body { font-size: 11.5px; }
  }

  /* A-Frame VR button override */
  .a-enter-vr-button {
    background-color: #a78bfa !important;
    background-image: none !important;
    border-radius: 12px !important;
  }
`;

// Body markup copied verbatim from the original <body> (A-Frame scene + HUD).
// Every id/class/data-* is preserved so the legacy engine's querySelector /
// getElementById calls hit their targets. Only the root-relative navigation
// hrefs were made absolute so they resolve correctly under the
// /sac-ky-vr-web/ route instead of relative to it.
const SKELETON = `
<div class="topbar">
  <a href="/sac-ky-vr">← Hub</a>
  <span class="step-pill" id="step-pill">Bước 2/6 · Chấm mẫu</span>
  <span class="badge">🥽 WebXR</span>
  <span class="stat">⏱️ <b id="timer">0s</b></span>
  <span class="stat">🎯 <b id="score">0</b></span>
  <span class="spacer"></span>
  <span class="stat" style="opacity:0.75" id="hint-text">Click hoặc gaze vào lọ mẫu — bấm "Enter VR" để vào kính</span>
</div>

<a-scene background="color: #1e293b" fog="type: linear; color: #1e293b; near: 8; far: 25" vr-mode-ui="enabled: true">
  <a-assets timeout="3000">
    <!-- Sample bottle labels as canvases -->
  </a-assets>

  <!-- Lighting -->
  <a-light type="ambient" color="#fff5e6" intensity="0.6"></a-light>
  <a-light type="directional" position="3 6 4" intensity="0.95" color="#fff5e0" light="castShadow: true; shadowMapHeight: 2048; shadowMapWidth: 2048"></a-light>
  <a-light type="point" position="-3 4 -2" intensity="0.6" color="#a78bfa"></a-light>
  <a-light type="point" position="3 4 2" intensity="0.4" color="#ec4899"></a-light>

  <!-- LAB ROOM ENVIRONMENT -->
  <!-- Floor (tiled) -->
  <a-plane position="0 -0.05 0" rotation="-90 0 0" width="20" height="16" color="#cbd5e1" shadow="receive: true"
    material="src: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22128%22 height=%22128%22><rect width=%2264%22 height=%2264%22 fill=%22%23e2e8f0%22/><rect x=%2264%22 width=%2264%22 height=%2264%22 fill=%22%2394a3b8%22/><rect y=%2264%22 width=%2264%22 height=%2264%22 fill=%22%2394a3b8%22/><rect x=%2264%22 y=%2264%22 width=%2264%22 height=%2264%22 fill=%22%23e2e8f0%22/></svg>'); repeat: 12 8"></a-plane>
  <!-- Walls -->
  <a-plane position="0 3 -4" width="20" height="8" color="#c9dce8" material="roughness: 0.9"></a-plane>
  <a-plane position="-8 3 0" rotation="0 90 0" width="8" height="8" color="#c9dce8"></a-plane>
  <a-plane position="8 3 0" rotation="0 -90 0" width="8" height="8" color="#c9dce8"></a-plane>
  <!-- Ceiling -->
  <a-plane position="0 7 0" rotation="90 0 0" width="20" height="16" color="#f8fafc"></a-plane>
  <!-- Lab bench -->
  <a-box position="0 -0.05 0" width="8" height="0.12" depth="2.6" color="#f1f5f9" shadow="receive: true; cast: true" material="roughness: 0.4"></a-box>
  <a-box position="0 -0.13 0" width="8.05" height="0.04" depth="2.65" color="#78350f"></a-box>
  <a-box position="0 -0.55 0" width="7.6" height="0.85" depth="2.3" color="#e2e8f0" shadow="cast: true"></a-box>
  <!-- Safety poster (back left) -->
  <a-plane position="-4.5 2.4 -3.95" width="1.5" height="2" color="#fef3c7">
    <a-text value="⚠️ AN TOÀN PTN" position="0 0.7 0.01" align="center" color="#7c2d12" width="2.6"></a-text>
    <a-text value="• Đeo kính BHLĐ&#10;• Áo blu trong lab&#10;• Không hút thuốc&#10;• Tránh nuốt dung môi&#10;• Rửa tay sau buổi" position="-0.55 -0.05 0.01" baseline="top" anchor="left" color="#7c2d12" width="1.8" wrap-count="22"></a-text>
  </a-plane>
  <!-- Rf chart poster (back right) -->
  <a-plane position="4.5 2.4 -3.95" width="1.5" height="2" color="#f1f5f9">
    <a-text value="SẮC KÝ TLC" position="0 0.85 0.01" align="center" color="#1e293b" width="2.4"></a-text>
    <a-text value="Rf = d_mẫu / d_dung môi" position="0 -0.85 0.01" align="center" color="#1e293b" width="1.8"></a-text>
    <a-box position="0 0 0.01" width="0.7" height="1.2" color="#fef3c7"></a-box>
    <a-sphere position="-0.18 -0.30 0.02" radius="0.06" color="#ef4444"></a-sphere>
    <a-sphere position="0 0 0.02" radius="0.06" color="#3b82f6"></a-sphere>
    <a-sphere position="0.18 0.30 0.02" radius="0.06" color="#22c55e"></a-sphere>
  </a-plane>
  <!-- Background shelf (decoration) -->
  <a-box position="0 3.2 -3.92" width="6" height="0.06" depth="0.5" color="#78350f" shadow="cast: true"></a-box>
  <a-cylinder position="-2.4 3.45 -3.9" radius="0.10" height="0.30" color="#fde047" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="-1.8 3.42 -3.9" radius="0.09" height="0.25" color="#60a5fa" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="-1.2 3.50 -3.9" radius="0.11" height="0.35" color="#fb7185" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="-0.6 3.43 -3.9" radius="0.08" height="0.30" color="#10b981" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="0 3.45 -3.9" radius="0.10" height="0.32" color="#a78bfa" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="0.6 3.48 -3.9" radius="0.09" height="0.30" color="#f97316" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="1.2 3.45 -3.9" radius="0.10" height="0.32" color="#fb923c" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="1.8 3.42 -3.9" radius="0.08" height="0.28" color="#84cc16" opacity="0.85" material="transparent: true"></a-cylinder>
  <a-cylinder position="2.4 3.45 -3.9" radius="0.10" height="0.32" color="#06b6d4" opacity="0.85" material="transparent: true"></a-cylinder>

  <!-- Sample bottles A, B, C -->
  <a-entity id="bottle-A" class="sample interactable" data-sample="A" position="-2.5 0.3 0">
    <a-cylinder radius="0.18" height="0.5" color="#ffffff" opacity="0.5" material="transparent: true; metalness: 0.1"></a-cylinder>
    <a-cylinder radius="0.155" height="0.35" position="0 -0.04 0" color="#ef4444"></a-cylinder>
    <a-cylinder radius="0.08" height="0.15" position="0 0.32 0" color="#e2e8f0"></a-cylinder>
    <a-text value="A" position="0 0.05 0.19" align="center" color="white" width="1.2"></a-text>
  </a-entity>

  <a-entity id="bottle-B" class="sample interactable" data-sample="B" position="-1.8 0.3 0">
    <a-cylinder radius="0.18" height="0.5" color="#ffffff" opacity="0.5" material="transparent: true"></a-cylinder>
    <a-cylinder radius="0.155" height="0.35" position="0 -0.04 0" color="#3b82f6"></a-cylinder>
    <a-cylinder radius="0.08" height="0.15" position="0 0.32 0" color="#e2e8f0"></a-cylinder>
    <a-text value="B" position="0 0.05 0.19" align="center" color="white" width="1.2"></a-text>
  </a-entity>

  <a-entity id="bottle-C" class="sample interactable" data-sample="C" position="-1.1 0.3 0">
    <a-cylinder radius="0.18" height="0.5" color="#ffffff" opacity="0.5" material="transparent: true"></a-cylinder>
    <a-cylinder radius="0.155" height="0.35" position="0 -0.04 0" color="#22c55e"></a-cylinder>
    <a-cylinder radius="0.08" height="0.15" position="0 0.32 0" color="#e2e8f0"></a-cylinder>
    <a-text value="C" position="0 0.05 0.19" align="center" color="white" width="1.2"></a-text>
  </a-entity>

  <!-- TLC plate -->
  <a-entity id="plate-group" class="interactable" data-type="plate" position="0 0.65 0">
    <a-box id="plate" width="0.7" height="1.2" depth="0.05" color="#fef3c7" shadow="cast: true"></a-box>
    <!-- Spots will be added by JS -->
    <a-entity id="spots"></a-entity>
    <!-- Origin line (cylinder) -->
    <a-cylinder radius="0.005" height="0.65" rotation="0 0 90" position="0 -0.4 0.03" color="#9ca3af"></a-cylinder>
  </a-entity>

  <!-- Capillary -->
  <a-entity id="capillary" position="0.8 0.35 0.5" rotation="0 0 -15">
    <a-cylinder radius="0.025" height="0.6" color="#e2e8f0"></a-cylinder>
    <a-cylinder id="cap-tip" radius="0.025" height="0.15" position="0 -0.225 0" color="#cccccc" visible="false"></a-cylinder>
  </a-entity>

  <!-- Developing chamber (glass box) -->
  <a-entity position="2.5 0.05 0" class="interactable" data-type="chamber">
    <!-- 4 walls + floor (semi-transparent) -->
    <a-box position="0 0.01 0" width="0.9" height="0.02" depth="0.5" color="#ffffff" opacity="0.3" material="transparent: true"></a-box>
    <a-box position="0 0.7 0.25" width="0.9" height="1.4" depth="0.02" color="#ffffff" opacity="0.25" material="transparent: true"></a-box>
    <a-box position="0 0.7 -0.25" width="0.9" height="1.4" depth="0.02" color="#ffffff" opacity="0.25" material="transparent: true"></a-box>
    <a-box position="-0.45 0.7 0" width="0.02" height="1.4" depth="0.5" color="#ffffff" opacity="0.25" material="transparent: true"></a-box>
    <a-box position="0.45 0.7 0" width="0.02" height="1.4" depth="0.5" color="#ffffff" opacity="0.25" material="transparent: true"></a-box>
    <!-- Solvent inside (initially hidden) -->
    <a-box id="chamber-solvent" position="0 0.13 0" width="0.85" height="0.25" depth="0.45" color="#a78bfa" opacity="0.5" visible="false" material="transparent: true"></a-box>
  </a-entity>

  <!-- Solvent bottle -->
  <a-entity id="solvent" class="interactable" data-type="solvent" position="1.8 0.35 0.6">
    <a-cylinder radius="0.25" height="0.7" color="#ffffff" opacity="0.4" material="transparent: true"></a-cylinder>
    <a-cylinder radius="0.22" height="0.5" position="0 -0.075 0" color="#a78bfa" opacity="0.7" material="transparent: true"></a-cylinder>
    <a-cylinder radius="0.1" height="0.12" position="0 0.41 0" color="#6b7280"></a-cylinder>
    <a-text value="💧" position="0 0 0.26" align="center" width="2"></a-text>
  </a-entity>

  <!-- Camera with cursor (gaze + click) + hand controllers for VR -->
  <a-entity id="rig" position="0 0 3">
    <a-camera look-controls="pointerLockEnabled: false" wasd-controls="acceleration: 30">
      <a-cursor
        animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
        animation__fusing="property: scale; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 500"
        material="color: #a78bfa; shader: flat"
        position="0 0 -1"
        geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
        raycaster="objects: .interactable; far: 10"></a-cursor>
    </a-camera>
    <!-- Left hand controller -->
    <a-entity id="left-hand"
      laser-controls="hand: left"
      raycaster="objects: .interactable; far: 5; lineColor: #a78bfa; lineOpacity: 0.7"
      hand-tracking-controls="hand: left; modelColor: #a78bfa"></a-entity>
    <!-- Right hand controller -->
    <a-entity id="right-hand"
      laser-controls="hand: right"
      raycaster="objects: .interactable; far: 5; lineColor: #ec4899; lineOpacity: 0.7"
      hand-tracking-controls="hand: right; modelColor: #ec4899"></a-entity>
  </a-entity>
</a-scene>

<div class="tutorial">
  <div class="tut-head">
    <span class="tut-num" id="tut-num">2</span>
    <span class="tut-title" id="tut-title">Chấm mẫu lên đường gốc</span>
  </div>
  <div class="tut-body" id="tut-body">Nhìn vào 1 lọ A/B/C để chấm điểm gaze, hoặc click. Trong VR dùng controller trigger.</div>
  <div class="tut-hint" id="tut-hint">💡 Bấm <b>Enter VR</b> (góc phải) để vào kính Quest.</div>
</div>

<div class="panel">
  <button id="btn-action" disabled>Thao tác</button>
  <button id="btn-restart">↺ Chơi lại</button>
</div>

<div class="modal" id="modal">
  <div class="modal-card">
    <h2>🎉 Hoàn thành!</h2>
    <div class="score" id="modal-score">0</div>
    <div id="modal-details"></div>
    <div class="modal-btns">
      <button class="primary" id="modal-replay">↺ Chơi lại</button>
      <a class="outline" href="/sac-ky-vr">← Hub</a>
      <a class="outline" href="/">🏠 Trang chính</a>
    </div>
  </div>
</div>
`;

export default function SacKyVrWeb() {
  const mounted = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode's double effect invoke duplicating engines.
    if (mounted.current) return;
    mounted.current = true;

    const aframeSrc = 'https://aframe.io/releases/1.5.0/aframe.min.js';

    // Load the inline game module (verbatim copy) only after A-Frame has
    // registered its custom elements, matching the original head→body order.
    function loadGame() {
      const game = document.createElement('script');
      game.type = 'module';
      game.src = '/legacy/sac-ky-vr-web.js';
      game.setAttribute('data-legacy', 'sac-ky-vr-web');
      document.body.appendChild(game);
    }

    // Reuse A-Frame if already loaded (e.g. after client-side navigation).
    if ((window as any).AFRAME) {
      loadGame();
    } else {
      const existing = document.querySelector(
        `script[src="${aframeSrc}"]`,
      ) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', loadGame, { once: true });
      } else {
        const aframe = document.createElement('script');
        aframe.src = aframeSrc;
        aframe.onload = loadGame;
        document.head.appendChild(aframe);
      }
    }

    return () => {
      // Remove the game module and any DOM A-Frame appended to <body>
      // (fullscreen canvas, VR button, orientation modal) so navigating away
      // leaves nothing behind. A-Frame itself stays cached on window.
      document
        .querySelectorAll('script[data-legacy="sac-ky-vr-web"]')
        .forEach((s) => s.remove());
      document
        .querySelectorAll('body > canvas, .a-enter-vr, .a-orientation-modal')
        .forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
    </>
  );
}
