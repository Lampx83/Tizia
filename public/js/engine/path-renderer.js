// ============================================================
// Path renderer — Subway-map style learning path
// ============================================================
// Render lộ trình học tập 5 năm dạng "subway map":
//   - Mỗi năm là 1 chapter dọc
//   - Modules là nodes trong CSS grid
//   - Prereq lines = SVG overlay nối node→node
//   - Mỗi node: icon · title · stars · mode badges (📚 + 2D/3D/VR/…)
//   - Locked: dim + 🔒
//
// Domain-agnostic: nhận MODULES + SUBJECTS + DOMAIN config.
// ============================================================

import {
  aggregateProgress, recommendNext, nextMilestone, isBossModule,
  levelInfo, rankFor, avatarFor, titleFor,
} from './gamification.js';

/** Link đích của 1 module: ưu tiên pathHref (cổng lộ trình con) nếu có. */
function moduleHref(mod) {
  return mod?.pathHref || `module.html?module=${encodeURIComponent(mod.id)}`;
}

const MODE_ICONS = {
  quiz:   '📚',
  '2d':   '📱',
  '3d':   '🥽',
  vr:     '🕹️',
  xr:     '🕹️',
  ar:     '🎨',
  meta:   '🌐',
  native: '📦',
};

const MODE_LABEL = {
  quiz:   'Quiz · lý thuyết',
  '2d':   '2D · Canvas',
  '3d':   '3D Realistic',
  vr:     'VR / XR Web',
  xr:     'XR mixed reality',
  ar:     'AR (sắp có)',
  meta:   'Metaverse multiplayer',
  native: 'Unity native APK',
};

/**
 * Render subway-map vào host element.
 * @param {{
 *   host: HTMLElement,
 *   modules: import('./types.js').CourseModule[],
 *   subjects: Record<string, {label:string,icon:string,color:string}>,
 *   domain: import('./types.js').DomainConfig,
 *   progress: Record<string, {stars:number}>,
 *   unlocked: Set<string>,
 *   locked: Map<string, string>,  // moduleId → reason
 * }} opts
 */
export function renderPath({ host, modules, subjects, domain, categories, progress, unlocked, locked, contentSet, gamified = true }) {
  injectStylesOnce();

  // ── Build groups: curriculum theo năm + các cụm khác (practice/skill/…) ──
  const groups = [];

  // 1. Curriculum theo năm
  const byYear = new Map();
  for (const m of modules.filter(m => m.category === 'curriculum')) {
    const y = m.yearLevel || 1;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y).push(m);
  }
  for (const y of [...byYear.keys()].sort()) {
    const arr = byYear.get(y).sort((a, b) => a.id.localeCompare(b.id));
    groups.push({
      id: `year-${y}`,
      label: domain.yearLabels?.[y - 1] || `Năm ${y}`,
      short: domain.yearLabels?.[y - 1]?.split(': ')[0] || `Năm ${y}`,
      color: '#fbbf24',
      modules: arr,
      drawLines: true,
    });
  }

  // 2. Các cụm chung: thực hành, kỹ năng, thư viện, sự nghiệp, game
  const CLUSTER_ORDER = ['practice', 'skill', 'library', 'career', 'game'];
  for (const cat of CLUSTER_ORDER) {
    const arr = modules.filter(m => m.category === cat).sort((a, b) => a.id.localeCompare(b.id));
    if (!arr.length) continue;
    const meta = categories?.[cat] || { label: cat, icon: '📂', color: '#94a3b8' };
    groups.push({
      id: `cat-${cat}`,
      label: `${meta.icon} ${meta.label}`,
      short: `${meta.icon} ${meta.label}`,
      color: meta.color,
      modules: arr,
      drawLines: false,
    });
  }

  const hasContent = (id) => !contentSet || contentSet.has(id);

  // ── Gamification: recommendation · boss · milestone · overall progress ──
  // CHỈ Tiểu học/THCS (gamified). Trường khác → nodeFlags null + không header.
  let nodeFlags = null;
  let journeyHtml = '';
  if (gamified) {
    const subjectLabels = {};
    for (const [k, v] of Object.entries(subjects || {})) subjectLabels[k] = v.label;
    const agg = aggregateProgress(modules, progress);
    const rec = recommendNext(modules, progress, hasContent);
    const milestone = nextMilestone(modules, progress, hasContent, subjectLabels);
    nodeFlags = { recommendedId: rec?.module?.id || null, bossIds: new Set(modules.filter(m => isBossModule(m, modules)).map(m => m.id)) };
    journeyHtml = renderJourneyHeader({ rec, milestone, agg, subjects, domain });
  }

  // ── Tabs (sticky) ──
  const tabsHtml = groups.map(g => {
    const openable = g.modules.filter(m => hasContent(m.id)).length;
    const stars = g.modules.reduce((s, m) => s + (progress[m.id]?.stars || 0), 0);
    return `<a class="path-year-tab" href="#path-${g.id}" data-group="${g.id}" style="--tab-color:${g.color}">
      <span class="pyt-num">${g.short}</span>
      <span class="pyt-prog">${openable}/${g.modules.length} mở <span class="pyt-stars">★ ${stars}</span></span>
    </a>`;
  }).join('');

  // ── Chapters ──
  const chaptersHtml = groups.map(g => {
    const openable = g.modules.filter(m => hasContent(m.id)).length;
    const nodesHtml = g.modules.map(m => renderNode(m, { subjects, progress, locked, hasContent, nodeFlags })).join('');
    return `
      <section class="path-year" id="path-${g.id}">
        <header class="path-year-head">
          <h3>${g.label}</h3>
          <span class="path-year-sub">${openable}/${g.modules.length} module có nội dung</span>
        </header>
        <div class="path-year-grid">${nodesHtml}</div>
        <svg class="path-year-svg" aria-hidden="true"></svg>
      </section>
    `;
  }).join('');

  host.innerHTML = `
    <div class="path-domain-hero">
      <div class="pdh-icon">${domain.icon}</div>
      <div>
        <h2 class="pdh-title">${domain.name}</h2>
        <p class="pdh-tagline">${domain.tagline || ''}</p>
      </div>
    </div>
    ${journeyHtml}
    <nav class="path-year-tabs">${tabsHtml}</nav>
    <div class="path-chapters">${chaptersHtml}</div>
  `;

  attachNodeNavigation(host);

  // Vẽ prereq line cho các group cần (curriculum). rAF + setTimeout để layout xong.
  const lineGroups = groups.filter(g => g.drawLines);
  const drawAll = () => {
    for (const g of lineGroups) {
      try { drawPrereqLines(host, g.id, g.modules, subjects); }
      catch (err) { console.warn('drawPrereqLines failed for', g.id, err); }
    }
  };
  requestAnimationFrame(drawAll);
  setTimeout(drawAll, 60);

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(drawAll);
    ro.observe(host);
  }
}

/**
 * Journey header: big "Continue Learning" CTA + next milestone +
 * overall progress + per-subject progress bars.
 */
function renderJourneyHeader({ rec, milestone, agg, subjects, domain }) {
  const overall = agg.overall;
  // Per-subject progress bars (only subjects that have modules)
  const subjBars = Object.entries(agg.subjects).map(([sid, s]) => {
    const meta = subjects[sid] || { label: sid, icon: '📘', color: '#94a3b8' };
    return `
      <div class="jh-subj">
        <div class="jh-subj-head"><span>${meta.icon} ${meta.label}</span><span>${s.passed}/${s.total}</span></div>
        <div class="jh-mini-bar"><i style="width:${s.pct}%;background:${meta.color}"></i></div>
      </div>`;
  }).join('');

  const ctaInner = rec
    ? `<a class="jh-cta" href="${moduleHref(rec.module)}">
         <span class="jh-cta-ic">▶</span>
         <span class="jh-cta-txt">
           <b>${rec.reason}</b>
           <small>${rec.module.title}</small>
         </span>
         <span class="jh-cta-go">Tiếp tục →</span>
       </a>`
    : `<div class="jh-cta done"><span class="jh-cta-ic">🎉</span>
         <span class="jh-cta-txt"><b>Bạn đã hoàn thành tất cả bài có sẵn!</b>
         <small>Quay lại sau khi mở thêm nội dung mới</small></span></div>`;

  const milestoneHtml = milestone
    ? `<div class="jh-milestone ${milestone.ready ? 'ready' : ''}">🎯 ${milestone.text}</div>` : '';

  return `
    <section class="journey-header">
      <div class="jh-top">
        <div class="jh-overall">
          <div class="jh-overall-head">
            <span>🗺️ Tiến độ ${domain.shortName || ''}</span>
            <span class="jh-overall-pct">${overall.pct}%</span>
          </div>
          <div class="jh-bar"><i style="width:${overall.pct}%"></i></div>
          <div class="jh-overall-sub">${overall.passed}/${overall.total} bài · ⭐ ${overall.stars}</div>
        </div>
        ${milestoneHtml}
      </div>
      ${ctaInner}
      ${subjBars ? `<div class="jh-subjects">${subjBars}</div>` : ''}
    </section>`;
}

function renderNode(mod, { subjects, progress, locked, hasContent, nodeFlags }) {
  const stars = progress[mod.id]?.stars || 0;
  const noContent = !hasContent(mod.id);
  const prereqReason = locked?.get(mod.id);
  const isLocked = noContent || !!prereqReason;
  const reason = noContent ? 'Chưa có nội dung, sắp ra mắt' : (prereqReason || '');
  const subj = subjects[mod.subject] || { label: mod.subject, icon: '📘', color: '#94a3b8' };
  const starsHtml = '★'.repeat(stars) + '☆'.repeat(3 - stars);

  // ── Status tag hierarchy (chỉ khi gamified = có nodeFlags) ──
  const gami = !!nodeFlags;
  const passed = stars >= 1;
  const isBoss = gami && nodeFlags.bossIds?.has(mod.id);
  const isRecommended = gami && nodeFlags.recommendedId === mod.id;
  let tag = '';
  if (gami) {
    if (isLocked) tag = `<span class="pn-tag locked">⛔ Khoá</span>`;
    else if (passed) tag = `<span class="pn-tag done">✓ Hoàn thành</span>`;
    else if (isRecommended) tag = `<span class="pn-tag rec">🔥 Gợi ý hôm nay</span>`;
    else tag = `<span class="pn-tag new">🟣 Mới mở</span>`;
  }
  const bossBadge = isBoss ? `<span class="pn-boss" title="Boss môn ${subj.label}">👑</span>` : '';

  // Quiz badge (luôn có) + experiences. Node khoá → CSS pointer-events:none làm badge trơ.
  const modes = [{ mode: 'quiz', icon: '📚', label: MODE_LABEL.quiz, tech: 'Quiz', url: `module.html?module=${encodeURIComponent(mod.id)}` }];
  for (const e of (mod.experiences || [])) modes.push(e);

  const badgesHtml = modes.map(e => {
    const icon = e.icon || MODE_ICONS[e.mode] || '·';
    const safeUrl = e.url || '#';
    const cls = `mode-badge mode-${e.mode}` + (e.status === 'soon' ? ' soon' : '');
    const external = e.status === 'external' ? 'target="_blank" rel="noopener"' : '';
    return `<a class="${cls}" href="${safeUrl}" ${external} title="${e.label} · ${e.tech || ''}">${icon}</a>`;
  }).join('');

  const targetUrl = isLocked ? '#' : moduleHref(mod);
  const cls = ['path-node'];
  if (isLocked) cls.push('locked');
  if (noContent) cls.push('no-content');
  if (passed) cls.push('passed');
  if (isBoss) cls.push('boss');
  if (isRecommended && !isLocked && !passed) cls.push('recommended');
  return `
    <div class="${cls.join(' ')}"
         data-mod="${mod.id}"
         data-subject="${mod.subject}"
         data-href="${targetUrl}"
         style="--node-color: ${subj.color}"
         role="link"
         tabindex="${isLocked ? -1 : 0}"
         ${isLocked ? `aria-disabled="true" title="🔒 ${reason}"` : ''}>
      ${gami ? `<div class="pn-tagrow">${tag}${bossBadge}</div>` : ''}
      <div class="pn-head">
        <span class="pn-icon">${mod.icon || subj.icon}</span>
        <span class="pn-id">${mod.id}</span>
        ${mod.hasCertificate ? '<span class="pn-cert" title="Module có cấp chứng chỉ">🏆</span>' : ''}
      </div>
      <div class="pn-title">${mod.title}</div>
      <div class="pn-meta">
        <span class="pn-stars" aria-label="${stars} sao">${starsHtml}</span>
        <span class="pn-subject">${subj.icon} ${subj.label}</span>
      </div>
      <div class="pn-badges">${badgesHtml}</div>
      ${isLocked ? `<div class="pn-lock">🔒</div>` : ''}
    </div>
  `;
}

/** Wire click + keyboard nav cho path-node (a-trong-a không hợp lệ). */
function attachNodeNavigation(host) {
  host.addEventListener('click', (e) => {
    if (e.target.closest('.mode-badge')) return; // badge tự xử lý
    const node = e.target.closest('.path-node');
    if (!node || node.classList.contains('locked')) return;
    const href = node.dataset.href;
    if (href && href !== '#') location.href = href;
  });
  host.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const node = e.target.closest('.path-node');
    if (!node || node.classList.contains('locked')) return;
    e.preventDefault();
    const href = node.dataset.href;
    if (href && href !== '#') location.href = href;
  });
}

function drawPrereqLines(host, groupId, groupModules, subjects) {
  const section = host.querySelector(`#path-${groupId}`);
  if (!section) return;
  const svg = section.querySelector('.path-year-svg');
  const grid = section.querySelector('.path-year-grid');
  if (!svg || !grid) return;

  const gridRect = grid.getBoundingClientRect();
  svg.setAttribute('width', gridRect.width);
  svg.setAttribute('height', gridRect.height);
  svg.style.left = '0';
  svg.style.top = '0';
  svg.innerHTML = '';

  const ns = 'http://www.w3.org/2000/svg';
  for (const m of groupModules) {
    for (const pid of (m.prerequisites || [])) {
      // Chỉ vẽ khi cả 2 node nằm trong cùng group này
      const aNode = grid.querySelector(`[data-mod="${pid}"]`);
      const bNode = grid.querySelector(`[data-mod="${m.id}"]`);
      if (!aNode || !bNode) continue;
      const a = aNode.getBoundingClientRect();
      const b = bNode.getBoundingClientRect();
      const subj = subjects[m.subject] || { color: '#94a3b8' };
      const x1 = a.left + a.width / 2 - gridRect.left;
      const y1 = a.bottom - gridRect.top;
      const x2 = b.left + b.width / 2 - gridRect.left;
      const y2 = b.top - gridRect.top;
      const midY = (y1 + y2) / 2;
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', `M ${x1} ${y1} C ${x1} ${midY} ${x2} ${midY} ${x2} ${y2}`);
      path.setAttribute('stroke', subj.color);
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.55');
      path.setAttribute('stroke-dasharray', '4 4');
      svg.appendChild(path);
    }
  }
}

// Side rail đã được hợp nhất vào renderPath (các cụm practice/skill/…
// nay là section trong chính lộ trình). renderSideRail không còn dùng.

// ─────────────────────────────────────────────────────────────
// Styles (injected once)
// ─────────────────────────────────────────────────────────────

let stylesInjected = false;
function injectStylesOnce() {
  if (stylesInjected) return;
  stylesInjected = true;
  const css = `
    .path-domain-hero {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 22px; border-radius: 16px;
      background: linear-gradient(135deg, rgba(251,191,36,0.15), rgba(139,92,246,0.15));
      border: 1px solid rgba(255,255,255,0.12); margin-bottom: 18px;
    }
    .pdh-icon { font-size: 48px; line-height: 1; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)); }
    .pdh-title { margin: 0; font-size: 22px; font-weight: 800; color: white; }
    .pdh-tagline { margin: 4px 0 0; font-size: 13px; opacity: 0.85; line-height: 1.5; }

    .path-year-tabs {
      display: flex; gap: 8px; flex-wrap: wrap;
      background: rgba(15,23,42,0.7); backdrop-filter: blur(8px);
      padding: 10px 12px; border-radius: 12px; margin-bottom: 18px;
      position: sticky; top: 8px; z-index: 5;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .path-year-tab {
      flex: 1 1 140px;
      padding: 10px 14px; border-radius: 10px;
      background: rgba(255,255,255,0.05); color: white;
      text-decoration: none; transition: all 0.15s;
      display: flex; flex-direction: column; gap: 3px;
      border: 1px solid transparent;
    }
    .path-year-tab:hover { background: rgba(251,191,36,0.15); border-color: rgba(251,191,36,0.3); }
    .pyt-num { font-size: 13px; font-weight: 700; opacity: 0.95; }
    .pyt-prog { font-size: 12px; opacity: 0.75; display: flex; justify-content: space-between; }
    .pyt-stars { color: #fbbf24; font-weight: 700; }

    .path-chapters { display: flex; flex-direction: column; gap: 22px; }

    .path-year {
      position: relative;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; padding: 18px 20px;
      scroll-margin-top: 80px;
    }
    .path-year-head {
      display: flex; justify-content: space-between; align-items: baseline;
      margin-bottom: 14px; padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .path-year-head h3 { margin: 0; font-size: 18px; font-weight: 700; color: white; }
    .path-year-sub { font-size: 12px; opacity: 0.6; }

    .path-year-grid {
      position: relative; z-index: 2;
      display: grid; gap: 14px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
    .path-year-svg {
      position: absolute; left: 20px; top: 60px;
      pointer-events: none; z-index: 1;
      width: calc(100% - 40px);
    }

    .path-node {
      position: relative; z-index: 2;
      background: rgba(0,0,0,0.28); color: white;
      border: 2px solid var(--node-color, #94a3b8);
      border-radius: 14px; padding: 12px 14px;
      text-decoration: none; transition: all 0.18s;
      display: flex; flex-direction: column; gap: 6px;
      cursor: pointer;
      outline: none;
    }
    .path-node:focus-visible { box-shadow: 0 0 0 3px rgba(251,191,36,0.6); }
    .path-node::before {
      content: ''; position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: var(--node-color, #94a3b8); border-radius: 14px 14px 0 0;
      opacity: 0.65;
    }
    .path-node:hover {
      transform: translateY(-3px);
      background: rgba(0,0,0,0.4);
      box-shadow: 0 8px 22px rgba(0,0,0,0.4);
    }
    .path-node.passed { background: rgba(16,185,129,0.18); border-color: #10b981; }
    .path-node.locked {
      opacity: 0.45; cursor: not-allowed; pointer-events: none;
      filter: grayscale(0.5);
    }
    /* "Chưa có nội dung", phân biệt với khoá do prereq: viền nét đứt, mờ nhẹ hơn */
    .path-node.no-content {
      opacity: 0.6; filter: grayscale(0.3);
      border-style: dashed;
    }
    .pn-head { display: flex; align-items: center; gap: 6px; }
    .pn-icon { font-size: 20px; }
    .pn-id { font-size: 11px; font-weight: 700; opacity: 0.7; letter-spacing: 0.4px; }
    .pn-cert { margin-left: auto; font-size: 13px; }
    .pn-title { font-size: 13.5px; font-weight: 600; line-height: 1.35; }
    .pn-meta {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 11px; opacity: 0.78;
    }
    .pn-stars { color: #fbbf24; letter-spacing: 1px; }
    .pn-subject {
      padding: 2px 6px; border-radius: 6px;
      background: rgba(255,255,255,0.06); font-size: 10px;
    }
    .pn-badges { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 4px; }
    .mode-badge {
      display: inline-flex; align-items: center; justify-content: center;
      width: 26px; height: 26px; border-radius: 6px;
      background: rgba(255,255,255,0.08);
      font-size: 13px; text-decoration: none; color: white;
      transition: all 0.12s;
    }
    .mode-badge:hover { background: rgba(255,255,255,0.22); transform: scale(1.08); }
    .mode-badge.soon { opacity: 0.45; pointer-events: none; }
    .mode-badge.mode-quiz { background: rgba(251,191,36,0.22); }
    .mode-badge.mode-3d   { background: rgba(139,92,246,0.22); }
    .mode-badge.mode-vr,
    .mode-badge.mode-xr   { background: rgba(236,72,153,0.22); }
    .mode-badge.mode-2d   { background: rgba(251,146,60,0.22); }
    .mode-badge.mode-meta { background: rgba(2,132,199,0.22); }
    .mode-badge.mode-native { background: rgba(99,102,241,0.22); }
    .mode-badge.mode-ar { background: rgba(20,184,166,0.22); }

    .pn-lock {
      position: absolute; right: 8px; top: 8px;
      font-size: 18px; opacity: 0.65;
    }

    /* Side rail */
    .rail-guild {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px; padding: 0 14px; margin-bottom: 10px;
    }
    .rail-guild[open] { background: rgba(255,255,255,0.07); }
    .rail-guild summary {
      cursor: pointer; padding: 10px 0;
      display: flex; align-items: center; gap: 8px;
      font-size: 13.5px; font-weight: 600; color: white;
      list-style: none;
    }
    .rail-guild summary::-webkit-details-marker { display: none; }
    .rg-icon { font-size: 18px; }
    .rg-label { flex: 1; }
    .rg-count {
      padding: 2px 7px; border-radius: 10px;
      background: var(--rg-color, #94a3b8); color: #1f1147;
      font-size: 10px; font-weight: 700;
    }
    .rg-desc { font-size: 11px; opacity: 0.65; margin: 0 0 8px; line-height: 1.5; }
    .rail-items {
      display: flex; flex-direction: column; gap: 4px; padding-bottom: 10px;
    }
    .rail-item {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 10px; border-radius: 8px;
      background: rgba(0,0,0,0.18); color: white;
      text-decoration: none; font-size: 12.5px;
      transition: background 0.12s;
    }
    .rail-item:hover { background: rgba(255,255,255,0.1); }
    .rail-item.locked { opacity: 0.5; pointer-events: none; }
    .ri-icon { font-size: 14px; }
    .ri-title { flex: 1; line-height: 1.3; }
    .ri-lock { font-size: 10px; opacity: 0.85; padding: 1px 6px; border-radius: 4px; background: rgba(0,0,0,0.3); }

    /* Wallet pills */
    .wallet-row {
      display: flex; gap: 8px; flex-wrap: wrap;
      margin: 14px 0;
    }
    .wallet-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px; border-radius: 999px;
      background: rgba(255,255,255,0.08); color: white;
      border: 1px solid rgba(255,255,255,0.12);
      font-size: 13px; font-weight: 600;
    }
    .wallet-pill.coins { background: rgba(251,191,36,0.18); border-color: rgba(251,191,36,0.45); }
    .wallet-pill.stars { background: rgba(245,158,11,0.18); border-color: rgba(245,158,11,0.4); }
    .wallet-pill.streak { background: rgba(239,68,68,0.18); border-color: rgba(239,68,68,0.45); }
    .wallet-pill.achievements { background: rgba(139,92,246,0.18); border-color: rgba(139,92,246,0.45); }
    .wp-icon { font-size: 16px; }
    .wp-val  { font-weight: 800; }

    /* Toast */
    .achievement-toast {
      position: fixed; right: 24px; bottom: 24px;
      max-width: 320px; padding: 14px 18px;
      background: linear-gradient(135deg, #fbbf24, #f97316);
      color: #1f1147; border-radius: 14px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.45);
      font-size: 13.5px; line-height: 1.4;
      transform: translateY(20px); opacity: 0;
      transition: all 0.25s;
      z-index: 9999;
    }
    .achievement-toast.show { transform: translateY(0); opacity: 1; }
    .achievement-toast .at-icon { font-size: 28px; margin-right: 8px; vertical-align: middle; }
    .achievement-toast .at-title { font-weight: 800; }
    .achievement-toast .at-desc  { opacity: 0.85; font-size: 12px; margin-top: 2px; }

    /* ===== Journey header (Continue + milestone + progress) ===== */
    .journey-header {
      background: linear-gradient(135deg, rgba(139,92,246,0.18), rgba(34,211,238,0.12));
      border: 1px solid rgba(255,255,255,0.14); border-radius: 16px;
      padding: 16px 18px; margin-bottom: 18px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .jh-top { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
    .jh-overall { flex: 1 1 220px; min-width: 200px; }
    .jh-overall-head { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #fff; }
    .jh-overall-pct { color: #22d3ee; }
    .jh-bar { height: 10px; border-radius: 6px; background: rgba(255,255,255,0.12); overflow: hidden; margin: 6px 0 4px; }
    .jh-bar > i { display: block; height: 100%; background: linear-gradient(90deg,#8b5cf6,#22d3ee); border-radius: 6px; transition: width .8s cubic-bezier(.2,.8,.2,1); }
    .jh-overall-sub { font-size: 11.5px; opacity: 0.75; }
    .jh-milestone {
      flex: 1 1 240px; font-size: 13.5px; font-weight: 700; color: #fde68a;
      background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.35);
      border-radius: 12px; padding: 10px 14px;
    }
    .jh-milestone.ready { color: #86efac; background: rgba(34,197,94,0.14); border-color: rgba(34,197,94,0.4); }
    .jh-cta {
      display: flex; align-items: center; gap: 14px; text-decoration: none;
      background: linear-gradient(90deg,#fbbf24,#f59e0b); color: #1f1147;
      border-radius: 14px; padding: 13px 18px; transition: filter .15s, transform .15s;
    }
    .jh-cta:hover { filter: brightness(1.05); transform: translateY(-2px); }
    .jh-cta.done { background: rgba(255,255,255,0.08); color: #fff; cursor: default; }
    .jh-cta-ic { font-size: 22px; width: 40px; height: 40px; flex: none; border-radius: 50%;
      background: rgba(31,17,71,0.18); display: flex; align-items: center; justify-content: center; }
    .jh-cta.done .jh-cta-ic { background: rgba(255,255,255,0.1); }
    .jh-cta-txt { flex: 1; display: flex; flex-direction: column; line-height: 1.3; }
    .jh-cta-txt b { font-size: 15px; font-weight: 800; }
    .jh-cta-txt small { font-size: 12.5px; opacity: 0.85; }
    .jh-cta-go { font-weight: 800; font-size: 14px; white-space: nowrap; }
    .jh-subjects { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(150px,1fr)); }
    .jh-subj-head { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: #fff; opacity: 0.9; }
    .jh-mini-bar { height: 7px; border-radius: 5px; background: rgba(255,255,255,0.12); overflow: hidden; margin-top: 4px; }
    .jh-mini-bar > i { display: block; height: 100%; border-radius: 5px; transition: width .8s; }

    /* ===== Node status tags + boss ===== */
    .pn-tagrow { display: flex; align-items: center; gap: 6px; min-height: 18px; }
    .pn-tag { font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 999px; letter-spacing: .2px; }
    .pn-tag.rec  { background: #f97316; color: #1f1147; box-shadow: 0 0 0 0 rgba(249,115,22,.6); animation: pn-pulse 1.8s infinite; }
    .pn-tag.new  { background: rgba(168,85,247,0.25); color: #e9d5ff; border: 1px solid rgba(168,85,247,0.5); }
    .pn-tag.done { background: rgba(16,185,129,0.22); color: #6ee7b7; }
    .pn-tag.locked { background: rgba(148,163,184,0.2); color: #cbd5e1; }
    .pn-boss { margin-left: auto; font-size: 16px; filter: drop-shadow(0 0 6px rgba(251,191,36,.7)); }
    .path-node.recommended { border-color: #f97316; box-shadow: 0 0 0 1px rgba(249,115,22,.5), 0 8px 24px rgba(249,115,22,.22); }
    .path-node.boss { border-color: #fbbf24; background: linear-gradient(160deg, rgba(251,191,36,0.12), rgba(0,0,0,0.3)); }
    .path-node.boss.passed { background: linear-gradient(160deg, rgba(251,191,36,0.2), rgba(16,185,129,0.18)); }
    @keyframes pn-pulse { 0%{box-shadow:0 0 0 0 rgba(249,115,22,.5)} 70%{box-shadow:0 0 0 8px rgba(249,115,22,0)} 100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} }

    /* ===== Identity bar (avatar/level/rank/XP/title) ===== */
    .identity-bar {
      display: flex; align-items: center; gap: 14px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
      border-left: 4px solid var(--rank-color, #fbbf24);
      border-radius: 14px; padding: 12px 16px; margin: 14px 0 8px;
    }
    .ib-avatar { font-size: 38px; line-height: 1; filter: drop-shadow(0 3px 8px rgba(0,0,0,.4)); }
    .ib-main { flex: 1; min-width: 0; }
    .ib-top { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
    .ib-rank { font-weight: 800; color: var(--rank-color, #fbbf24); font-size: 14px; }
    .ib-title { font-size: 12.5px; opacity: 0.8; color: #fff; }
    .ib-levelrow { display: flex; align-items: center; gap: 8px; margin: 5px 0 2px; }
    .ib-lvl { font-size: 12px; font-weight: 800; color: #fff; white-space: nowrap; }
    .ib-xpbar { flex: 1; height: 9px; border-radius: 6px; background: rgba(255,255,255,0.12); overflow: hidden; }
    .ib-xpbar > i { display: block; height: 100%; background: linear-gradient(90deg,#8b5cf6,#22d3ee); border-radius: 6px; transition: width .9s cubic-bezier(.2,.8,.2,1); }
    .ib-xp { font-size: 11px; opacity: 0.75; white-space: nowrap; }
    .ib-next { font-size: 11px; opacity: 0.65; }
    .streak-risk {
      display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 999px;
      font-size: 12.5px; font-weight: 700; color: #fecaca;
      background: rgba(239,68,68,0.18); border: 1px solid rgba(239,68,68,0.5);
      animation: pn-pulse 2s infinite;
    }

    .dash-mappath { display: inline-block; margin-top: 10px; font-size: 12.5px; font-weight: 600;
      color: #c4b5fd; text-decoration: none; opacity: 0.85; }
    .dash-mappath:hover { opacity: 1; text-decoration: underline; }
    .dash-grid { display: grid; gap: 14px; grid-template-columns: 1fr; }
    @media (min-width: 760px) { .dash-grid { grid-template-columns: 1.4fr 1fr; align-items: start; } }

    /* ===== Daily quests ===== */
    .daily-quests {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 9px;
    }
    .dq-head { display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: #fff; }
    .dq-count { color: #4ade80; }
    .dq-item { display: flex; align-items: center; gap: 10px; }
    .dq-item.done .dq-label { opacity: 0.65; text-decoration: line-through; }
    .dq-ic { font-size: 17px; width: 20px; text-align: center; }
    .dq-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
    .dq-label { font-size: 12.5px; font-weight: 600; color: #fff; }
    .dq-bar { height: 6px; border-radius: 4px; background: rgba(255,255,255,0.12); overflow: hidden; }
    .dq-bar > i { display: block; height: 100%; background: linear-gradient(90deg,#22c55e,#4ade80); border-radius: 4px; transition: width .6s; }
    .dq-reward { font-size: 11px; font-weight: 700; opacity: 0.85; white-space: nowrap; }
    .dq-claimed { color: #4ade80; }

    /* Side rail layout (desktop ≥1024px) */
    .path-with-rail { display: grid; gap: 18px; grid-template-columns: 1fr; }
    @media (min-width: 1024px) {
      .path-with-rail { grid-template-columns: minmax(0, 1fr) 320px; }
      .path-side-rail { position: sticky; top: 88px; align-self: start; max-height: calc(100vh - 100px); overflow-y: auto; padding-right: 4px; }
    }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-injected', 'path-renderer');
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Compact "Continue Learning" card for the home dashboard.
 * @param {HTMLElement} host
 * @param {{rec:{module:object,reason:string}|null, domain:object, milestone?:object}} opts
 */
export function renderContinueCard(host, { rec, domain, milestone }) {
  if (!host) return;
  injectStylesOnce();
  const dn = domain?.name || 'trường';
  if (!rec) {
    host.innerHTML = `<div class="jh-cta done"><span class="jh-cta-ic">🎉</span>
      <span class="jh-cta-txt"><b>Bạn đã học hết nội dung hiện có ở ${dn}!</b>
      <small>Chọn một trường khác bên dưới để học tiếp</small></span></div>`;
    return;
  }
  const ms = milestone ? `<div class="jh-milestone ${milestone.ready ? 'ready' : ''}" style="margin-top:10px">🎯 ${milestone.text}</div>` : '';
  host.innerHTML = `
    <a class="jh-cta" href="${moduleHref(rec.module)}">
      <span class="jh-cta-ic">▶</span>
      <span class="jh-cta-txt">
        <b>${rec.reason} · ${domain?.icon || ''} ${domain?.shortName || ''}</b>
        <small>${rec.module.title}</small>
      </span>
      <span class="jh-cta-go">Học ngay →</span>
    </a>${ms}
    <a class="dash-mappath" href="school.html?domain=${encodeURIComponent(domain?.id || '')}">🗺️ Xem toàn bộ lộ trình ${dn} →</a>`;
}

/**
 * Render the Daily Quest panel.
 * @param {HTMLElement} host
 * @param {Array<{id,icon,label,goal,progress,done,claimed,reward}>} quests
 */
export function renderDailyQuests(host, quests) {
  if (!host) return;
  injectStylesOnce();
  const doneCount = quests.filter(q => q.done).length;
  const rows = quests.map(q => {
    const pct = Math.min(100, Math.round((q.progress / q.goal) * 100));
    return `
      <div class="dq-item ${q.done ? 'done' : ''}">
        <span class="dq-ic">${q.done ? '✅' : q.icon}</span>
        <span class="dq-body">
          <span class="dq-label">${q.label}</span>
          <span class="dq-bar"><i style="width:${pct}%"></i></span>
        </span>
        <span class="dq-reward">${q.done ? `<span class="dq-claimed">+${q.reward.xp} XP 🪙${q.reward.coin}</span>` : `${q.progress}/${q.goal}`}</span>
      </div>`;
  }).join('');
  host.innerHTML = `
    <div class="daily-quests">
      <div class="dq-head"><span>📋 Nhiệm vụ hôm nay</span><span class="dq-count">${doneCount}/${quests.length}</span></div>
      ${rows}
    </div>`;
}

/** Toast 1 achievement vừa unlock. */
export function showAchievementToast(achievement) {
  const t = document.createElement('div');
  t.className = 'achievement-toast';
  t.innerHTML = `
    <span class="at-icon">${achievement.icon}</span>
    <span>
      <span class="at-title">🏆 ${achievement.title}</span>
      <div class="at-desc">${achievement.desc}</div>
    </span>
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 320);
  }, 3800);
}

/**
 * Render the player identity bar: avatar + level + rank + XP bar + title,
 * followed by stat pills (sao / coin / streak + risk / huy hiệu).
 * @param {{wallet:object, progress:object, modules?:Array, atRisk?:boolean}} opts
 */
export function renderWalletPills(host, { wallet, progress, modules, atRisk, gamified = true }) {
  injectStylesOnce();
  const totalStars = Object.values(progress || {}).reduce((s, p) => s + (p?.stars || 0), 0);

  // Trường không game hoá → chỉ hàng pill cổ điển (không thanh cấp độ/rank).
  if (!gamified) {
    host.innerHTML = `
      <div class="wallet-row" id="wallet-row">
        <span class="wallet-pill stars"><span class="wp-icon">⭐</span><span class="wp-val">${totalStars}</span> sao</span>
        <span class="wallet-pill coins"><span class="wp-icon">🪙</span><span class="wp-val">${wallet.coins}</span> coin</span>
        <span class="wallet-pill streak"><span class="wp-icon">🔥</span><span class="wp-val">${wallet.streak}</span> ngày</span>
        <span class="wallet-pill achievements"><span class="wp-icon">🏆</span><span class="wp-val">${(wallet.achievements || []).length}</span> huy hiệu</span>
      </div>`;
    return;
  }

  const li = levelInfo(wallet.xp || 0);
  const { rank, next, levelsToNext } = rankFor(li.level);
  const avatar = avatarFor(li.level);
  const agg = modules ? aggregateProgress(modules, progress) : { subjects: {} };
  const title = titleFor(agg, li.level);
  const shields = wallet.streakShields || 0;
  const riskHtml = atRisk
    ? `<span class="streak-risk" title="Học 1 bài hôm nay để giữ chuỗi!">⚠️ giữ chuỗi hôm nay</span>` : '';

  host.innerHTML = `
    <div class="identity-bar" style="--rank-color:${rank.color}">
      <div class="ib-avatar">${avatar}</div>
      <div class="ib-main">
        <div class="ib-top">
          <span class="ib-rank">${rank.icon} ${rank.name}</span>
          <span class="ib-title">${title}</span>
        </div>
        <div class="ib-levelrow">
          <span class="ib-lvl">Lv.${li.level}</span>
          <div class="ib-xpbar"><i style="width:${li.pct}%"></i></div>
          <span class="ib-xp">${li.intoLevel}/${li.span} XP</span>
        </div>
        ${next ? `<div class="ib-next">Còn ${levelsToNext} cấp → ${next.icon} ${next.name}</div>` : `<div class="ib-next">Đã đạt hạng cao nhất 👑</div>`}
      </div>
    </div>
    <div class="wallet-row" id="wallet-row">
      <span class="wallet-pill stars"><span class="wp-icon">⭐</span><span class="wp-val">${totalStars}</span> sao</span>
      <span class="wallet-pill coins"><span class="wp-icon">🪙</span><span class="wp-val">${wallet.coins}</span> coin</span>
      <span class="wallet-pill streak"><span class="wp-icon">🔥</span><span class="wp-val">${wallet.streak}</span> ngày${shields ? ` · 🛡️${shields}` : ''}</span>
      ${riskHtml}
      <span class="wallet-pill achievements"><span class="wp-icon">🏆</span><span class="wp-val">${(wallet.achievements || []).length}</span> huy hiệu</span>
    </div>
  `;
}
