// Admin dashboard — single-page Vercel/Linear-like layout.
// Module bundles KPI cards, SVG charts, top breakdowns, system health, activity feed
// + legacy tabs (Góp ý / Người dùng / Trường / AI / Học liệu / Gói cước).
// Auto-refresh 60s, vanilla — không phụ thuộc thư viện ngoài.

import { DOMAIN_META } from './engine/domain.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = (t) => t ? new Date(t).toLocaleString('vi-VN', { hour12:false }) : '—';
const fmtNum = (n) => (n == null) ? '—' : Number(n).toLocaleString('vi-VN');

// ─────────── API helper ───────────
let csrfToken = null;
async function api(path, opts = {}) {
  const method = String(opts.method || 'GET').toUpperCase();
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && !csrfToken) {
    const tokenResponse = await fetch('/api/csrf', { credentials:'same-origin' });
    csrfToken = (await tokenResponse.json()).token;
  }
  const headers = { 'Content-Type':'application/json', ...(opts.headers || {}) };
  if (csrfToken && !['GET', 'HEAD', 'OPTIONS'].includes(method)) headers['X-CSRF-Token'] = csrfToken;
  const r = await fetch(path, { credentials:'same-origin', ...opts, headers });
  if (r.status === 401) { location.href = '/login.html?return=' + encodeURIComponent('/admin.html'); throw new Error('login'); }
  const data = await r.json().catch(()=>({}));
  return { status: r.status, ok: r.ok, data };
}

function toast(msg, kind='ok') {
  const t = $('#toast'); t.textContent = msg;
  t.classList.toggle('err', kind === 'err');
  t.classList.add('show');
  clearTimeout(toast._tm);
  toast._tm = setTimeout(() => t.classList.remove('show'), 2400);
}

function fmtBytes(b) {
  if (b == null) return '—';
  const u = ['B','KB','MB','GB','TB'];
  let i = 0; let n = b;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return n.toFixed(n < 10 ? 1 : 0) + ' ' + u[i];
}
function fmtUptime(s) {
  if (s == null) return '—';
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
function humanTime(t) {
  if (!t) return '—';
  const diff = (Date.now() - t) / 1000;
  if (diff < 60) return Math.floor(diff) + 's trước';
  if (diff < 3600) return Math.floor(diff / 60) + ' phút trước';
  if (diff < 86400) return Math.floor(diff / 3600) + ' giờ trước';
  if (diff < 86400 * 7) return Math.floor(diff / 86400) + ' ngày trước';
  return new Date(t).toLocaleDateString('vi-VN');
}

// ─────────── Chart tooltip ───────────
const tooltip = $('#ctt');
function showTooltip(x, y, html) {
  tooltip.innerHTML = html;
  tooltip.style.left = (x + 10) + 'px';
  tooltip.style.top = (y - 30) + 'px';
  tooltip.style.opacity = '1';
}
function hideTooltip() { tooltip.style.opacity = '0'; }

// ─────────── SVG Line chart (area + line + dots) ───────────
// data: [{date, value}]; opts: {color, label, height, prefix}
function lineChart(host, data, opts = {}) {
  const w = host.clientWidth || 600;
  const h = opts.height || 200;
  const pad = { l: 36, r: 12, t: 12, b: 24 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const values = data.map(d => d.value);
  const maxV = Math.max(1, ...values);
  const niceMax = Math.ceil(maxV * 1.15);
  const stepX = data.length > 1 ? innerW / (data.length - 1) : innerW;

  const pts = data.map((d, i) => ({
    x: pad.l + i * stepX,
    y: pad.t + innerH - (d.value / niceMax) * innerH,
    date: d.date, value: d.value,
  }));

  const linePath = 'M' + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L');
  const areaPath = linePath + ` L${pts.at(-1).x.toFixed(1)},${(pad.t + innerH).toFixed(1)} L${pts[0].x.toFixed(1)},${(pad.t + innerH).toFixed(1)} Z`;

  // Y axis ticks (4)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(r => ({
    y: pad.t + innerH * (1 - r),
    v: Math.round(niceMax * r),
  }));
  // X labels (every ~5 ticks)
  const xStep = Math.max(1, Math.floor(data.length / 6));
  const xLabels = data.map((d, i) => i % xStep === 0 || i === data.length - 1
    ? { x: pad.l + i * stepX, label: d.date.slice(5) } : null).filter(Boolean);

  const color = opts.color || 'var(--accent)';
  host.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      ${yTicks.map(t => `
        <line class="grid-line" x1="${pad.l}" x2="${w - pad.r}" y1="${t.y}" y2="${t.y}"></line>
        <text class="axis-y" x="${pad.l - 5}" y="${t.y + 3}" text-anchor="end">${fmtNum(t.v)}</text>
      `).join('')}
      <path class="area" d="${areaPath}" fill="${color}"></path>
      <path class="line" d="${linePath}" stroke="${color}"></path>
      ${pts.map((p, i) => `<circle class="dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5" fill="${color}" data-i="${i}"></circle>`).join('')}
      ${xLabels.map(l => `<text class="axis-x" x="${l.x}" y="${h - 6}" text-anchor="middle">${l.label}</text>`).join('')}
    </svg>`;

  // Interactivity
  host.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('mouseenter', (e) => {
      const i = Number(dot.dataset.i);
      const p = pts[i];
      const rect = host.getBoundingClientRect();
      showTooltip(rect.left + p.x, rect.top + p.y,
        `<b>${p.date}</b><br>${opts.label || 'Giá trị'}: <b>${fmtNum(p.value)}</b>${opts.suffix || ''}`);
      dot.setAttribute('r', '4');
    });
    dot.addEventListener('mouseleave', () => { hideTooltip(); dot.setAttribute('r', '2.5'); });
  });
}

// ─────────── SVG Bar chart (horizontal grouped: tokens by model) ───────────
// data: [{model, value, color?}]
function barChartH(host, data, opts = {}) {
  if (!data.length) { host.innerHTML = `<div class="empty">Chưa có dữ liệu</div>`; return; }
  const w = host.clientWidth || 600;
  const rowH = 28;
  const labelW = 130;
  const valueW = 60;
  const barW = w - labelW - valueW - 12;
  const maxV = Math.max(1, ...data.map(d => d.value));
  const palette = ['#fbbf24', '#60a5fa', '#a78bfa', '#22d3ee', '#f472b6', '#86efac', '#fcd34d', '#fb923c'];

  host.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:5px;">
      ${data.map((d, i) => {
        const pct = (d.value / maxV) * 100;
        const color = d.color || palette[i % palette.length];
        return `
          <div style="display:flex;align-items:center;gap:8px;height:${rowH}px;">
            <div style="width:${labelW}px;font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(d.model)}">${esc(d.model)}</div>
            <div style="flex:1;background:rgba(255,255,255,0.04);border-radius:4px;height:18px;position:relative;overflow:hidden;">
              <div style="width:${pct}%;height:100%;background:${color};border-radius:4px;transition:width .4s;"></div>
            </div>
            <div style="width:${valueW}px;font-size:12px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:${color};">${fmtNum(d.value)}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ─────────── KPI cards ───────────
function deltaCmp(now, prev) {
  if (prev === 0 && now === 0) return { cls:'flat', icon:'→', text:'0' };
  if (prev === 0) return { cls:'up', icon:'↑', text:`+${now}` };
  const diff = now - prev;
  const pct = Math.round((diff / Math.max(1, prev)) * 100);
  if (diff === 0) return { cls:'flat', icon:'→', text:'0%' };
  if (diff > 0) return { cls:'up', icon:'↑', text:`+${diff} (${pct}%)` };
  return { cls:'dn', icon:'↓', text:`${diff} (${pct}%)` };
}

// Mapping KPI → tab đích + selector vùng cần cuộn tới (highlight bằng .kpi-flash)
const KPI_NAV = {
  users:            { tab:'users' },
  attempts:         { tab:'dashboard', focus:'#chart-attempts' },
  requests_pending: { tab:'requests', filter:'pending' },
  ai_decisions:     { tab:'dashboard', focus:'#chart-tokens-model' },
  ai_tokens_24h:    { tab:'dashboard', focus:'#chart-tokens' },
  pageviews_24h:    { tab:'dashboard', focus:'#chart-pageviews' },
  pageviews_7d:     { tab:'dashboard', focus:'#chart-pageviews' },
  active_sessions:  { tab:'users' },
  events:           { tab:'dashboard', focus:'#activity-feed' },
  requests:         { tab:'requests', filter:'all' },
};

async function navigateKpi(k) {
  const nav = KPI_NAV[k];
  if (!nav) return;
  if (nav.tab && nav.tab !== currentTab) {
    if (nav.tab === 'requests' && nav.filter) reqFilter = nav.filter;
    await showTab(nav.tab);
  } else if (nav.tab === 'requests' && nav.filter) {
    reqFilter = nav.filter;
    renderRequests();
  }
  if (nav.focus) {
    setTimeout(() => {
      const el = document.querySelector(nav.focus);
      if (!el) return;
      const target = el.closest('.panel') || el.closest('.section') || el;
      target.scrollIntoView({ behavior:'smooth', block:'center' });
      target.classList.add('kpi-flash');
      setTimeout(() => target.classList.remove('kpi-flash'), 1500);
    }, 50);
  }
}

function renderKpi(overview) {
  const d = overview.delta || {};
  const heroCards = [
    { k:'users', label:'Người dùng', icon:'👥', delta: deltaCmp(d.users_24h, d.users_prev_24h), deltaLabel:'24h' },
    { k:'attempts', label:'Lượt học', icon:'🎮', delta: deltaCmp(d.attempts_24h, d.attempts_prev_24h), deltaLabel:'24h' },
    { k:'requests_pending', label:'Góp ý chờ', icon:'💡', cls:'pending' },
  ];
  const subCards = [
    { k:'pageviews_24h', label:'Pageview 24h', icon:'👀', cls:'info' },
    { k:'pageviews_7d', label:'Pageview 7 ngày', icon:'👁️', cls:'info' },
    { k:'ai_decisions', label:'Quyết định AI', icon:'🤖', cls:'info' },
    { k:'ai_tokens_24h', label:'AI tokens 24h', icon:'⚡', cls:'info', fallback:'—' },
    { k:'active_sessions', label:'Tài khoản còn phiên', icon:'🟢', cls:'ok' },
    { k:'events', label:'Sự kiện', icon:'📊' },
    { k:'requests', label:'Tổng góp ý', icon:'✉️' },
  ];
  const card = (c) => {
    const v = overview[c.k];
    if (v == null && !c.fallback) return '';
    const dlt = c.delta ? `<div class="delta ${c.delta.cls}">${c.delta.icon} ${c.delta.text} <small>· ${c.deltaLabel}</small></div>` : '';
    const navAttr = KPI_NAV[c.k] ? ` data-nav="${c.k}" title="Bấm để xem chi tiết"` : '';
    return `
      <div class="kpi ${c.cls || ''} ${c.k === 'requests_pending' && v > 0 ? 'pending' : ''}"${navAttr}>
        <div class="label">${c.label}</div>
        <div class="value">${v != null ? fmtNum(v) : c.fallback}</div>
        ${dlt}
        <div class="icon">${c.icon}</div>
      </div>
    `;
  };
  return `
    <section class="section">
      <h2 class="section-title">📊 Tổng quan <span class="line"></span></h2>
      <div class="kpi-grid">${heroCards.map(card).join('')}</div>
      <div style="height:10px"></div>
      <div class="kpi-grid">${subCards.map(card).join('')}</div>
    </section>
  `;
}

// ─────────── Top breakdowns ───────────
function renderTopList(rows, opts) {
  if (!rows.length) return `<div class="empty">Chưa có dữ liệu</div>`;
  return `<div class="list-rank">${rows.map((r, i) => `
    <div class="row top${i + 1 <= 3 ? i + 1 : ''}">
      <div class="rank">#${i + 1}</div>
      <div class="name">${esc(r[opts.nameKey])}<span class="sub">${opts.sub ? opts.sub(r) : ''}</span></div>
      <div class="value">${fmtNum(r[opts.valueKey])}</div>
    </div>
  `).join('')}</div>`;
}

// ─────────── Activity feed ───────────
function renderFeed(items) {
  if (!items.length) return `<div class="empty">Chưa có hoạt động</div>`;
  const icons = { user_register:'👤', attempt:'🎮', request:'💡', event:'📊' };
  return `<div class="feed">${items.map(it => `
    <div class="item">
      <div class="kind">${icons[it.kind] || '·'}</div>
      <div class="body">
        <div class="label" title="${esc(it.label)}">${esc(it.label)}</div>
        <div class="time">${humanTime(it.t)}</div>
      </div>
    </div>
  `).join('')}</div>`;
}

// ─────────── Pageview section ───────────
// Hai biểu đồ chồng (tổng + unique visitor) + top path + breakdown role.
const ROLE_LABEL = {
  guest: '👤 Khách', pupil: '🧒 Học sinh', student: '🎓 Sinh viên',
  teacher: '👨‍🏫 Giáo viên', admin: '🛡️ Admin', unknown: '? Không rõ',
};
function renderPageviewSection(pv) {
  const t = pv.totals || {};
  const stat = (label, value, unique) => `
    <div class="kpi info" style="padding:14px 16px">
      <div class="label">${label}</div>
      <div class="value">${fmtNum(value || 0)}</div>
      <div class="delta flat">${fmtNum(unique || 0)} khách duy nhất</div>
    </div>`;
  return `
    <section class="section" id="pageview-section">
      <h2 class="section-title">👀 Lượt truy cập (Pageview) <span class="line"></span></h2>
      <div class="kpi-grid">
        ${stat('Pageview 24h', t.last_24h, t.unique_24h)}
        ${stat('Pageview 7 ngày', t.last_7d, t.unique_7d)}
        ${stat('Pageview 30 ngày', t.last_30d, t.unique_30d)}
      </div>
      <div style="height:12px"></div>
      <div class="panel">
        <div class="panel-title">📈 Pageview vs khách duy nhất theo ngày
          <span class="legend">
            <span><i style="background:var(--cyan)"></i>Pageview</span>
            <span><i style="background:var(--purple)"></i>Khách duy nhất</span>
          </span>
        </div>
        <div class="chart" id="chart-pageviews"></div>
        <div class="chart" id="chart-pageviews-unique" style="height:120px;margin-top:6px"></div>
      </div>
      <div style="height:14px"></div>
      <div class="two-col">
        <div class="panel">
          <div class="panel-title">🔝 Top trang được xem nhiều (30 ngày)</div>
          <div id="pv-top-paths"></div>
        </div>
        <div class="panel">
          <div class="panel-title">👥 Phân bổ theo vai trò (30 ngày)</div>
          <div id="pv-by-role"></div>
        </div>
      </div>
    </section>
  `;
}
function renderPageviewCharts(pv) {
  const days = pv.by_day || [];
  lineChart($('#chart-pageviews'),
    days.map(d => ({ date: d.date, value: d.pageviews })),
    { color: 'var(--cyan)', label: 'Pageview' });
  lineChart($('#chart-pageviews-unique'),
    days.map(d => ({ date: d.date, value: d.uniques })),
    { color: 'var(--purple)', label: 'Khách duy nhất' });

  const paths = (pv.top_paths || []);
  $('#pv-top-paths').innerHTML = paths.length
    ? renderTopList(paths.map(p => ({ path: p.path, count: p.count, uniques: p.uniques })), {
        nameKey: 'path', valueKey: 'count',
        sub: r => ` · ${fmtNum(r.uniques)} khách`,
      })
    : '<div class="empty">Chưa có pageview nào trong 30 ngày qua.</div>';

  const totalRole = (pv.by_role || []).reduce((s, r) => s + (r.count || 0), 0) || 1;
  const roleRows = (pv.by_role || []).map(r => {
    const pct = Math.round((r.count / totalRole) * 100);
    const color = r.role === 'guest' ? 'var(--dim)'
      : r.role === 'admin' ? 'var(--accent)'
      : r.role === 'teacher' ? 'var(--purple)'
      : r.role === 'student' ? 'var(--accent2)'
      : r.role === 'pupil' ? 'var(--ok)' : 'var(--muted)';
    return `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="width:130px;font-size:12px">${ROLE_LABEL[r.role] || r.role}</div>
        <div style="flex:1;background:rgba(255,255,255,0.04);border-radius:4px;height:18px;overflow:hidden">
          <div style="width:${pct}%;height:100%;background:${color};transition:width .4s"></div>
        </div>
        <div style="width:90px;font-size:12px;font-weight:700;text-align:right;color:${color};font-variant-numeric:tabular-nums">${fmtNum(r.count)} <span style="opacity:.6;font-weight:400">${pct}%</span></div>
      </div>`;
  }).join('');
  $('#pv-by-role').innerHTML = roleRows || '<div class="empty">Chưa có dữ liệu</div>';
}

// ─────────── System health ───────────
function renderSystem(sys) {
  if (!sys) return '';
  const memPct = sys.memory && sys.memory.heap_total
    ? Math.round((sys.memory.heap_used / sys.memory.heap_total) * 100) : null;
  const items = [
    { l:'Uptime', v: fmtUptime(sys.uptime_seconds), cls:'ok' },
    { l:'Memory (RSS)', v: fmtBytes(sys.memory?.rss), sub: memPct ? `heap ${memPct}%` : '' },
    { l:'Heap', v: `${fmtBytes(sys.memory?.heap_used)}`, sub: `/ ${fmtBytes(sys.memory?.heap_total)}` },
    { l:'DB size', v: fmtBytes(sys.db_size_bytes) },
    { l:'Node', v: sys.node_version },
    { l:'Platform', v: sys.platform },
  ];
  return `
    <section class="section">
      <h2 class="section-title">⚙️ Hệ thống <span class="line"></span></h2>
      <div class="syshealth">
        ${items.map(i => `
          <div class="item ${i.cls || ''}">
            <div class="l">${i.l}</div>
            <div class="v">${i.v} ${i.sub ? `<small>${i.sub}</small>` : ''}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// ─────────── Tabs (legacy: Góp ý / Users / Schools / AI / Content / Billing) ───────────
let reqCache = [];
let aiTicketCache = [];
let aiWorkerCache = [];
let reqFilter = 'all';
let userCache = [];
let currentTab = 'dashboard';

async function loadRequests() {
  const [r, ai] = await Promise.all([
    api('/api/admin/requests?limit=300'),
    api('/api/admin/ai-board/queue'),
  ]);
  reqCache = r.data.requests || [];
  aiTicketCache = ai.data.tickets || [];
  aiWorkerCache = ai.data.workers || [];
  renderRequests();
}
function renderRequests() {
  const filtered = reqFilter === 'all' ? reqCache : reqCache.filter(r => r.status === reqFilter);
  const counts = reqCache.reduce((m,r) => (m[r.status] = (m[r.status]||0)+1, m), {});
  const ticketByRequest = new Map(aiTicketCache.map(ticket => [ticket.source_request_id, ticket]));
  const host = $('#tabbody');
  host.innerHTML = `
    <section class="card" style="margin-bottom:14px;padding:12px 16px">
      <div style="font-weight:700;margin-bottom:8px">AI Board workers</div>
      ${aiWorkerCache.length ? aiWorkerCache.map(worker => `
        <div style="font-size:12px;margin:4px 0">
          <span class="pill">${esc(worker.worker_id)}</span>
          ${esc(worker.mode)} · ${esc(worker.status)} · ticket #${worker.current_ticket_id || '—'}
          · heartbeat ${fmt(worker.last_seen_at)} · ${esc(worker.version)}
        </div>
      `).join('') : '<div style="font-size:12px;opacity:.65">Chưa có worker heartbeat.</div>'}
    </section>
    <div class="toolbar">
      <span style="font-size:12px;opacity:.6">Lọc:</span>
      <select id="reqFilter">
        <option value="all">Tất cả (${reqCache.length})</option>
        <option value="pending">Chờ xử lý (${counts.pending||0})</option>
        <option value="reviewing">Đang xử lý (${counts.reviewing||0})</option>
        <option value="done">Hoàn thành (${counts.done||0})</option>
        <option value="rejected">Từ chối (${counts.rejected||0})</option>
      </select>
      <div class="spacer"></div>
      <button class="btn" id="reqRefresh">↻ Tải lại</button>
    </div>
    <table>
      <thead><tr>
        <th>#</th><th>Trường</th><th>Tiêu đề</th><th>Loại</th>
        <th>HS</th><th>Trạng thái</th><th>AI Board</th><th>Vote</th><th>Tạo lúc</th><th></th>
      </tr></thead>
      <tbody>
      ${filtered.map(r => `
        ${(() => {
          const ticket = ticketByRequest.get(r.id);
          const ticketSummary = ticket
            ? `<span class="pill">#${ticket.id} · ${esc(ticket.status)}/${esc(ticket.phase)}</span><div style="font-size:11px;opacity:.75;max-width:260px">${esc(ticket.public_note || ticket.internal_reason || '')}</div>`
            : '<span style="opacity:.45">legacy</span>';
          return `
        <tr data-rid="${r.id}">
          <td>${r.id}</td>
          <td><span class="pill">${esc(r.domain)}</span></td>
          <td style="max-width:340px">${esc(r.title)}</td>
          <td><span class="pill">${esc(r.type)}</span></td>
          <td>${esc(r.student)}</td>
          <td><span class="pill ${r.status}">${r.status}</span></td>
          <td>${ticketSummary}</td>
          <td>${r.votes}</td>
          <td style="font-size:12px;opacity:.7">${fmt(r.created_at)}</td>
          <td class="actions" style="white-space:nowrap">
            <button class="btn" data-act="detail" data-rid="${r.id}" title="Xem chi tiết">👁</button>
            <button class="btn primary" data-act="reply" data-rid="${r.id}" title="Trả lời + đổi trạng thái">💬</button>
            ${ticket ? '' : `<button class="btn danger" data-act="delreq" data-rid="${r.id}" title="Xoá yêu cầu">🗑</button>`}
          </td>
        </tr>
          `;
        })()}
      `).join('')}
      </tbody>
    </table>
    ${filtered.length === 0 ? '<div class="empty">Không có yêu cầu nào trong bộ lọc.</div>' : ''}
  `;
  $('#reqFilter').value = reqFilter;
  $('#reqFilter').addEventListener('change', e => { reqFilter = e.target.value; renderRequests(); });
  $('#reqRefresh').addEventListener('click', loadRequests);
  host.querySelectorAll('[data-act]').forEach(b => {
    b.addEventListener('click', () => {
      const id = Number(b.dataset.rid);
      if (b.dataset.act === 'reply') openReplyModal(id);
      else if (b.dataset.act === 'delreq') {
        const r = reqCache.find(x => x.id === id);
        openConfirm({
          title: '🗑 Xoá yêu cầu?',
          msg: 'Hành động không thể undo. Cascade xoá: ai_decisions liên quan.',
          ctx: `#${r.id} · ${r.student} · ${r.title}`.slice(0, 100),
          onConfirm: async () => {
            const dr = await api(`/api/admin/requests/${id}`, { method:'DELETE' });
            if (!dr.ok) return toast('Lỗi: ' + (dr.data?.message || dr.data?.error || dr.status), 'err');
            toast('✓ Đã xoá');
            closeModal();
            await loadRequests();
          },
        });
      }
      else toggleDetail(id);
    });
  });
}
async function toggleDetail(id) {
  const tr = $(`#tabbody tr[data-rid="${id}"]`);
  if (!tr) return;
  const next = tr.nextElementSibling;
  if (next && next.classList.contains('detail-row')) {
    next.remove(); tr.classList.remove('expanded'); return;
  }
  tr.classList.add('expanded');
  const colspan = tr.children.length;
  const detail = document.createElement('tr');
  detail.className = 'detail-row';
  detail.innerHTML = `<td colspan="${colspan}"><div class="detail-box">Đang tải…</div></td>`;
  tr.after(detail);
  const r = reqCache.find(x => x.id === id);
  const [dr, tr2] = await Promise.all([
    api(`/api/requests/${id}/decisions`),
    api(`/api/requests/${id}/thread`),
  ]);
  const decisions = dr.data?.decisions || [];
  const msgs = tr2.data?.messages || [];
  const threadHtml = msgs.map(m => {
    const board = m.role === 'ai' || m.role === 'admin';
    const who = board ? `🏛️ ${esc(m.author_name || 'Ban điều hành AI')}` : `👤 ${esc(m.author_name || 'HS')}`;
    return `<div class="blk" style="border-left:3px solid ${board ? '#10b981' : '#6366f1'};margin-bottom:6px">
      <div style="font-size:11px;opacity:.6;margin-bottom:3px">${who} · ${fmt(m.created_at)}</div>
      <div style="white-space:pre-wrap">${esc(m.body)}</div>
    </div>`;
  }).join('');
  detail.querySelector('.detail-box').innerHTML = `
    <h4>Nội dung yêu cầu</h4>
    <div class="blk">${esc(r.title)}${r.detail ? `<div style="opacity:.7;margin-top:5px">${esc(r.detail)}</div>` : ''}</div>
    <h4>Phiên trao đổi (${msgs.length})</h4>
    ${threadHtml || '<div class="blk" style="opacity:.6">Chưa có trao đổi nào.</div>'}
    <h4>Lịch sử quyết định AI (${decisions.length})</h4>
    ${decisions.length === 0 ? '<div class="blk" style="opacity:.6">Chưa có quyết định nào.</div>' :
      decisions.map(d => `
        <div class="blk">
          <div style="font-size:11px;opacity:.6;margin-bottom:4px">${fmt(d.created_at)} · <b>${d.decided_by}</b>${d.model ? ' · ' + d.model : ''} · confidence: ${(d.confidence||0).toFixed(2)}</div>
          <div><b>${d.action}</b> → ${d.status_applied}${d.priority_score != null ? ` · priority ${d.priority_score}` : ''}</div>
          ${d.reason ? `<div style="opacity:.75;margin-top:4px;font-size:11.5px">↳ ${esc(d.reason)}</div>` : ''}
          ${d.public_note ? `<div style="opacity:.85;margin-top:4px">💬 ${esc(d.public_note)}</div>` : ''}
        </div>
      `).join('')
    }
  `;
}
function openReplyModal(id) {
  const r = reqCache.find(x => x.id === id);
  if (!r) return;
  $('#modal-replyReq').style.display = '';
  $('#modal-setRole').style.display = 'none';
  $('#modal-ctx').innerHTML = `<b>#${r.id}</b> · ${esc(r.domain)}/${esc(r.type)} · gửi bởi <b>${esc(r.student)}</b><br>${esc(r.title)}`;
  $('#modal-status').value = r.status === 'rejected' ? 'rejected' : 'done';
  $('#modal-msg').value = '';
  $('#modal-bg').classList.add('show');
  $('#modal-bg').dataset.rid = id;
  $('#modal-msg').focus();
}
async function submitReply() {
  const id = Number($('#modal-bg').dataset.rid);
  const status = $('#modal-status').value;
  const message = $('#modal-msg').value.trim();
  if (message.length < 4) return toast('Lời nhắn quá ngắn (≥4 ký tự)', 'err');
  const r = await api(`/api/admin/requests/${id}/reply`, { method:'POST', body: JSON.stringify({ status, message }) });
  if (!r.ok) return toast('Lỗi: ' + (r.data?.error || r.status), 'err');
  toast(r.data.notified ? '✓ Đã gửi phản hồi + 🔔 cho HS' : '✓ Đã đóng yêu cầu');
  closeModal();
  await loadRequests();
}
function closeModal() { $('#modal-bg').classList.remove('show'); }

async function loadUsers() {
  const r = await api('/api/admin/users?limit=300');
  userCache = r.data.users || [];
  renderUsers();
}
function renderUsers() {
  const host = $('#tabbody');
  host.innerHTML = `
    <div class="toolbar">
      <span style="font-size:12px;opacity:.6">Tổng: <b>${userCache.length}</b> user</span>
      <div class="spacer"></div>
      <button class="btn primary" id="userCreate">➕ Tạo user mới</button>
      <button class="btn" id="userRefresh">↻ Tải lại</button>
    </div>
    <table>
      <thead><tr>
        <th>#</th><th>Username</th><th>Tên hiển thị</th><th>Vai trò</th>
        <th>Gói</th><th title="Trường HS đang theo học (mỗi tài khoản 1 trường)">🎓 Đang học</th>
        <th title="Level tính từ XP">Lv</th>
        <th>XP</th><th>Coin</th><th title="Chuỗi ngày liên tục">🔥</th>
        <th>Email</th><th>Đăng nhập gần nhất</th><th></th>
      </tr></thead>
      <tbody>
      ${userCache.map(u => `
        <tr>
          <td>${u.id}</td>
          <td>@${esc(u.username)}</td>
          <td>${esc(u.display_name)}</td>
          <td><span class="pill ${u.role}">${u.role}</span></td>
          <td><span class="pill">${esc(u.plan || 'free')}</span></td>
          <td style="font-size:12px">${u.enrolled_domain ? `<span class="pill" style="background:#16a34a;color:#fff">${esc(u.enrolled_domain)}</span>` : '<span style="opacity:.5">—</span>'}</td>
          <td style="font-weight:600;color:#a78bfa">${lvFromXp(u.xp || 0)}</td>
          <td style="font-size:12px">${u.xp != null ? u.xp : '—'}</td>
          <td style="font-size:12px">${u.coins != null ? u.coins : '—'}</td>
          <td style="font-size:12px">${u.streak || 0}</td>
          <td style="font-size:12px;opacity:.7">${u.email ? esc(u.email) : '—'}</td>
          <td style="font-size:12px;opacity:.7">${fmt(u.last_login)}</td>
          <td class="actions" style="white-space:nowrap">
            <button class="btn" data-act="wallet" data-uid="${u.id}" title="Xem/sửa ví XP/coin">🎮</button>
            <button class="btn" data-act="enroll" data-uid="${u.id}" data-domain="${esc(u.enrolled_domain || '')}" title="Đổi trường đang học">🎓</button>
            <button class="btn" data-act="role" data-uid="${u.id}" data-role="${u.role}" title="Đổi vai trò">👥</button>
            <button class="btn" data-act="edit" data-uid="${u.id}" title="Sửa thông tin">✏️</button>
            <button class="btn" data-act="pwd" data-uid="${u.id}" title="Đặt lại mật khẩu">🔑</button>
            <button class="btn danger" data-act="del" data-uid="${u.id}" title="Xoá user">🗑</button>
          </td>
        </tr>
      `).join('')}
      </tbody>
    </table>
  `;
  $('#userCreate').addEventListener('click', openCreateUserModal);
  $('#userRefresh').addEventListener('click', loadUsers);
  host.querySelectorAll('[data-act][data-uid]').forEach(b => {
    b.addEventListener('click', () => {
      const id = Number(b.dataset.uid);
      const u = userCache.find(x => x.id === id);
      if (!u) return;
      if (b.dataset.act === 'role') openRoleModal(id, b.dataset.role);
      else if (b.dataset.act === 'edit') openEditUserModal(u);
      else if (b.dataset.act === 'wallet') openWalletModal(u);
      else if (b.dataset.act === 'pwd') openResetPwdModal(u);
      else if (b.dataset.act === 'del') confirmDeleteUser(u);
      else if (b.dataset.act === 'enroll') openEnrollModal(u);
    });
  });
}

// Admin set/đổi enrolled_domain của HS (vd HS chọn nhầm, hoặc admin reset).
// Bucket cũ (ví/skill/level ở trường trước) KHÔNG bị xoá — chỉ ẩn vì query lọc
// theo enrolled_domain hiện tại. Đổi sang giá trị NULL = bỏ gắn trường (admin).
function openEnrollModal(u) {
  const DOMAINS = [
    ['preschool','🧸 Mầm non'], ['primary','🎒 Tiểu học'], ['secondary','📐 THCS'], ['highschool','🏫 THPT'],
    ['pharmacy','💊 Dược'], ['it','💻 CNTT'], ['economics','📉 Kinh tế'], ['business','📈 Kinh doanh'],
    ['finance','🏦 Tài chính'], ['medicine','⚕️ Y'], ['nursing','🩺 Điều dưỡng'], ['law','⚖️ Luật'],
    ['education','🎓 Sư phạm'], ['engineering','⚙️ Kỹ thuật'], ['architecture','🏛️ Kiến trúc'],
    ['languages','🗣️ Ngoại ngữ'], ['agriculture','🌾 Nông nghiệp'], ['tourism','🏖️ Du lịch'],
    ['arts','🎨 Mỹ thuật'], ['media','📰 Truyền thông'], ['social-sciences','📚 KHXH&NV'],
    ['natural-sciences','🔬 KHTN'], ['logistics','🚚 Logistics'], ['public-admin','🏢 Hành chính'],
  ];
  const cur = u.enrolled_domain || '';
  const opts = DOMAINS.map(([id, label]) =>
    `<option value="${id}" ${id === cur ? 'selected' : ''}>${label}</option>`).join('');
  // Dùng overlay tự xây thay vì #modal-bg (chia sẻ với role/edit modal sẽ phức tạp).
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,23,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(6px);';
  ov.innerHTML = `
    <div style="background:#0f172a;border:1px solid #334155;color:#f1f5f9;border-radius:14px;padding:20px 22px;max-width:480px;width:100%;box-shadow:0 30px 80px rgba(0,0,0,.6)">
      <h3 style="margin:0 0 4px;font-size:18px">🎓 Đặt/đổi trường đang học</h3>
      <p style="font-size:13px;opacity:.7;margin:0 0 10px">@${esc(u.username)} · ${esc(u.display_name)} · hiện tại: <b>${cur || '— chưa chọn —'}</b></p>
      <p style="font-size:12px;color:#fbbf24;margin:0 0 12px;line-height:1.5">Bucket cũ (ví, skill, level) ở trường trước <b>vẫn lưu</b> — quay lại trường đó sẽ khôi phục.</p>
      <label style="font-size:12px;display:block;margin-bottom:5px">Trường mới</label>
      <select id="enrollDomain" style="width:100%;padding:9px 11px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:8px;font-size:14px"><option value="">— (không gắn trường — chỉ admin)</option>${opts}</select>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">
        <button class="btn" data-close>Huỷ</button>
        <button class="btn primary" id="enrollSave">Lưu</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  const close = () => ov.remove();
  ov.querySelector('[data-close]').addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  ov.querySelector('#enrollSave').addEventListener('click', async () => {
    const newDomain = ov.querySelector('#enrollDomain').value || null;
    try {
      await api(`/api/admin/users/${u.id}/enrollment`, { method: 'POST', body: JSON.stringify({ enrolled_domain: newDomain }) });
      close();
      toast('✓ Đã đổi trường' + (newDomain ? ' → ' + newDomain : ' (bỏ gắn trường)'));
      await loadUsers();
    } catch (e) {
      toast('Lỗi: ' + (e.message || 'không lưu được'), 'err');
    }
  });
}

// ─── CRUD Users ───
async function openCreateUserModal() {
  ['cu-username','cu-password','cu-display','cu-email','cu-age'].forEach(id => $('#' + id).value = '');
  $('#cu-role').value = 'student';
  hideAllModals(); $('#modal-createUser').style.display = '';
  $('#modal-bg').classList.add('show');
  $('#cu-username').focus();
}
async function submitCreateUser() {
  const body = {
    username: $('#cu-username').value.trim(),
    password: $('#cu-password').value,
    display_name: $('#cu-display').value.trim(),
    role: $('#cu-role').value,
    email: $('#cu-email').value.trim() || null,
    age: Number($('#cu-age').value) || null,
  };
  const r = await api('/api/admin/users', { method:'POST', body: JSON.stringify(body) });
  if (!r.ok) return toast('Lỗi: ' + (r.data?.message || r.data?.error || r.status), 'err');
  toast('✓ Đã tạo @' + body.username);
  closeModal();
  await loadUsers();
}
async function openEditUserModal(u) {
  $('#eu-sub').textContent = `@${u.username} · id=${u.id} · role=${u.role}`;
  $('#eu-display').value = u.display_name || '';
  $('#eu-email').value = u.email || '';
  $('#eu-age').value = u.age || '';
  $('#modal-bg').dataset.uid = u.id;
  hideAllModals(); $('#modal-editUser').style.display = '';
  $('#modal-bg').classList.add('show');
  $('#eu-display').focus();
}
async function submitEditUser() {
  const uid = Number($('#modal-bg').dataset.uid);
  const body = {
    display_name: $('#eu-display').value.trim(),
    email: $('#eu-email').value.trim() || null,
    age: $('#eu-age').value || null,
  };
  const r = await api(`/api/admin/users/${uid}`, { method:'PATCH', body: JSON.stringify(body) });
  if (!r.ok) return toast('Lỗi: ' + (r.data?.message || r.data?.error || r.status), 'err');
  toast('✓ Đã cập nhật');
  closeModal();
  await loadUsers();
}
function openResetPwdModal(u) {
  $('#rp-sub').textContent = `@${u.username} · ${u.display_name} (id=${u.id})`;
  $('#rp-password').value = '';
  $('#modal-bg').dataset.uid = u.id;
  hideAllModals(); $('#modal-resetPwd').style.display = '';
  $('#modal-bg').classList.add('show');
  $('#rp-password').focus();
}
function genPassword(n = 16) {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => charset[b % charset.length]).join('');
}
async function submitResetPwd() {
  const uid = Number($('#modal-bg').dataset.uid);
  const password = $('#rp-password').value;
  if (password.length < 6) return toast('Mật khẩu ≥6 ký tự', 'err');
  const r = await api(`/api/admin/users/${uid}/password`, { method:'POST', body: JSON.stringify({ password }) });
  if (!r.ok) return toast('Lỗi: ' + (r.data?.message || r.data?.error || r.status), 'err');
  toast('✓ Đã đổi mật khẩu + huỷ mọi session');
  closeModal();
  await loadUsers();
}
function confirmDeleteUser(u) {
  openConfirm({
    title: '🗑 Xoá người dùng?',
    msg: 'Hành động không thể undo. Cascade xoá: sessions, oauth_identities, subscriptions, notifications. Attempts/achievements giữ nguyên (link bằng tên hiển thị, không phải user_id).',
    ctx: `@${u.username} · ${u.display_name} · role=${u.role}`,
    onConfirm: async () => {
      const r = await api(`/api/admin/users/${u.id}`, { method:'DELETE' });
      if (!r.ok) return toast('Lỗi: ' + (r.data?.message || r.data?.error || r.status), 'err');
      toast('✓ Đã xoá @' + r.data.deleted);
      closeModal();
      await loadUsers();
    },
  });
}

// ─── Generic confirm modal ───
function openConfirm({ title, msg, ctx, onConfirm }) {
  $('#cf-title').textContent = title || 'Xác nhận';
  $('#cf-msg').textContent = msg || '';
  $('#cf-ctx').textContent = ctx || '';
  $('#cf-ctx').style.display = ctx ? '' : 'none';
  hideAllModals(); $('#modal-confirm').style.display = '';
  $('#modal-bg').classList.add('show');
  $('#cf-submit').onclick = async () => { try { await onConfirm(); } catch(e) { toast('Lỗi: ' + e.message, 'err'); } };
}

function hideAllModals() {
  ['modal-replyReq','modal-setRole','modal-createUser','modal-editUser','modal-resetPwd','modal-confirm','modal-wallet'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// ─── Wallet (XP/coin/streak) viewer + editor ───
// Cùng công thức với public/js/engine/gamification.js để admin thấy đúng level
// mà user đang hiển thị. Đổi đây phải đổi cả gamification.js.
function lvFromXp(xp) {
  xp = Math.max(0, xp | 0);
  const cum = L => { const n = Math.max(1, L) - 1; return 60 * n + 40 * (n * (n + 1)) / 2; };
  let L = 1; while (xp >= cum(L + 1)) L++; return L;
}
async function openWalletModal(u) {
  const r = await api(`/api/admin/users/${u.id}/wallet`);
  if (!r.ok) return toast('Không tải được ví: ' + (r.data?.error || r.status), 'err');
  const w = r.data.wallet;
  $('#ew-sub').textContent = `@${u.username} · ${u.display_name} (id=${u.id}, role=${u.role})`;
  if (!w) {
    $('#ew-summary').innerHTML = '<div class="ctx" style="grid-column:1/-1">Chưa có ví — user chưa hoạt động lần nào</div>';
    $('#ew-xp').value = 0; $('#ew-coins').value = 0; $('#ew-streak').value = 0; $('#ew-shields').value = 0;
    $('#ew-raw').textContent = '(empty)';
  } else {
    const lv = lvFromXp(w.xp);
    $('#ew-summary').innerHTML = `
      <div class="ctx" style="text-align:center"><div style="font-size:11px;opacity:.7">Level</div><div style="font-size:22px;font-weight:700;color:#a78bfa">${lv}</div></div>
      <div class="ctx" style="text-align:center"><div style="font-size:11px;opacity:.7">XP</div><div style="font-size:18px;font-weight:600">${w.xp}</div></div>
      <div class="ctx" style="text-align:center"><div style="font-size:11px;opacity:.7">Coin</div><div style="font-size:18px;font-weight:600;color:#fbbf24">${w.coins}</div></div>
      <div class="ctx" style="text-align:center"><div style="font-size:11px;opacity:.7">Streak</div><div style="font-size:18px;font-weight:600;color:#ef4444">${w.streak} 🔥</div></div>
    `;
    $('#ew-xp').value = w.xp;
    $('#ew-coins').value = w.coins;
    $('#ew-streak').value = w.streak;
    $('#ew-shields').value = w.streak_shields;
    $('#ew-raw').textContent = JSON.stringify({
      achievements: w.achievements,
      modules_by_day: w.modules_by_day,
      daily: w.daily,
      quests_claimed: w.quests_claimed,
      longest_streak: w.longest_streak,
      vr_sessions: w.vr_sessions, meta_sessions: w.meta_sessions,
      quizzes_passed: w.quizzes_passed,
      last_visit_day: w.last_visit_day,
      updated_at: w.updated_at && new Date(w.updated_at).toISOString(),
    }, null, 2);
  }
  $('#modal-bg').dataset.uid = u.id;
  hideAllModals(); $('#modal-wallet').style.display = '';
  $('#modal-bg').classList.add('show');
}
async function submitWallet() {
  const uid = Number($('#modal-bg').dataset.uid);
  const body = {
    xp: Number($('#ew-xp').value) || 0,
    coins: Number($('#ew-coins').value) || 0,
    streak: Number($('#ew-streak').value) || 0,
    streak_shields: Number($('#ew-shields').value) || 0,
  };
  const r = await api(`/api/admin/users/${uid}/wallet`, { method:'PATCH', body: JSON.stringify(body) });
  if (!r.ok) return toast('Lỗi lưu ví: ' + (r.data?.error || r.status), 'err');
  toast(`✓ Đã lưu ví · Lv${lvFromXp(body.xp)}`);
  closeModal();
  await loadUsers();
}
function openRoleModal(uid, currentRole) {
  const u = userCache.find(x => x.id === uid);
  if (!u) return;
  $('#modal-replyReq').style.display = 'none';
  $('#modal-setRole').style.display = '';
  $('#modal-role-sub').textContent = `@${u.username} · ${u.display_name} · hiện tại: ${currentRole}`;
  $('#modal-role').value = currentRole;
  $('#modal-bg').dataset.uid = uid;
  $('#modal-bg').classList.add('show');
}
async function submitRole() {
  const uid = Number($('#modal-bg').dataset.uid);
  const role = $('#modal-role').value;
  const r = await api(`/api/admin/users/${uid}/role`, { method:'POST', body: JSON.stringify({ role }) });
  if (!r.ok) return toast('Lỗi đổi vai trò', 'err');
  toast('✓ Đã đổi vai trò → ' + role);
  closeModal();
  await loadUsers();
}

async function loadSimple(path, key, cols, fmtMap = {}) {
  const r = await api(path);
  const rows = r.data[key] || [];
  if (!rows.length) { $('#tabbody').innerHTML = '<div class="empty">Chưa có dữ liệu.</div>'; return; }
  const head = cols.map(c=>`<th>${c}</th>`).join('');
  const body = rows.map(row => '<tr>' + cols.map(c => {
    let v = row[c]; if (fmtMap[c]) v = fmtMap[c](v);
    if (['status','plan','role','action','decided_by'].includes(c)) v = `<span class="pill ${row[c]||''}">${v??''}</span>`;
    return `<td>${v ?? '—'}</td>`;
  }).join('') + '</tr>').join('');
  $('#tabbody').innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

// ─────────── Campus Editor ───────────
// Single source of truth: DOMAIN_META (engine/domain.js) — đảm bảo admin
// luôn ngang với trang chủ (parity), không drift khi thêm trường mới.
// 'ready' + 'preview' = trường đã mở (có editor); 'locked' = hiển thị badge,
// editor vẫn cho mở để admin chuẩn bị layout trước khi go-live.
const CAMPUS_DOMAINS = DOMAIN_META.map(d => ({
  domain: d.id,
  label:  d.shortName || d.name,
  emoji:  d.icon || '🏫',
  status: d.status,
  level:  d.level,
}));

let _campusEditorDomain = null;
let _campusLayoutCache  = null;

async function loadCampus(host = $('#tabbody')) {
  const r = await api('/api/admin/campus-layouts');
  const overrides = new Set((r.data?.layouts || []).map(x => x.domain));
  const updatedMap = Object.fromEntries((r.data?.layouts || []).map(x => [x.domain, x.updated_at]));

  // Nhóm theo cấp: Phổ thông trước, ĐH/CĐ sau. Trường locked dồn cuối nhóm.
  const order = { ready: 0, preview: 1, locked: 2 };
  const sortFn = (a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3);
  const grpSchool = CAMPUS_DOMAINS.filter(c => c.level === 'school').sort(sortFn);
  const grpHE     = CAMPUS_DOMAINS.filter(c => c.level === 'he').sort(sortFn);

  const renderCard = (c) => {
    const statusBadge = c.status === 'locked'
      ? '<span style="background:rgba(148,163,184,.15);color:#94a3b8;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:700">🔒 SẮP MỞ</span>'
      : c.status === 'preview'
        ? '<span style="background:rgba(251,191,36,.15);color:#fbbf24;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:700">PREVIEW</span>'
        : '<span style="background:rgba(34,197,94,.15);color:#22c55e;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:700">READY</span>';
    const editorState = overrides.has(c.domain)
      ? `<span style="color:var(--ok)">● Override DB</span> · ${fmt(updatedMap[c.domain])}`
      : '<span style="color:var(--dim)">● Mặc định</span>';
    return `
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:8px;${c.status==='locked'?'opacity:.75':''}">
        <div style="display:flex;align-items:center;gap:8px"><span style="font-size:24px">${c.emoji}</span>${statusBadge}</div>
        <div>
          <div style="font-weight:700;font-size:14px">${c.label}</div>
          <div style="font-size:11.5px;color:var(--muted);margin-top:2px">${editorState}</div>
        </div>
        <div style="display:flex;gap:6px;margin-top:auto">
          <button class="btn primary" style="flex:1;font-size:12px" data-campus-edit="${c.domain}" data-campus-label="${c.label} ${c.emoji}">✏️ Sửa</button>
          ${overrides.has(c.domain) ? `<button class="btn" style="color:var(--bad);border-color:var(--bad);background:rgba(239,68,68,.08);font-size:12px" data-campus-del="${c.domain}" title="Xoá override">↺</button>` : ''}
        </div>
      </div>
    `;
  };

  host.innerHTML = `
    <h2 class="section-title">🗺️ Campus 2.5D theo trường <span class="line"></span></h2>
    <p style="color:var(--muted);font-size:13px;margin:0 0 14px">
      Quản lý bố cục bản đồ cho <b>${CAMPUS_DOMAINS.length} trường</b> trong hệ thống Tizia
      — đồng bộ với trang chủ. Override lưu vào DB; Reset để về layout mặc định.
    </p>

    <h3 style="font-size:13px;margin:12px 0 8px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">
      🎒 Phổ thông (${grpSchool.length})
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
      ${grpSchool.map(renderCard).join('')}
    </div>

    <h3 style="font-size:13px;margin:24px 0 8px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">
      🎓 Đại học & Cao đẳng (${grpHE.length})
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
      ${grpHE.map(renderCard).join('')}
    </div>
  `;

  host.querySelectorAll('[data-campus-edit]').forEach(btn => {
    btn.addEventListener('click', () => openSchoolPanel(btn.dataset.campusEdit, btn.dataset.campusLabel));
  });
  host.querySelectorAll('[data-campus-del]').forEach(btn => {
    btn.addEventListener('click', () => resetCampusLayout(btn.dataset.campusDel));
  });
}

async function loadSchoolsCampus() {
  $('#tabbody').innerHTML = `<div id="sc-campus"></div>`;
  await loadCampus($('#sc-campus'));
}

// ─────────── SCHOOL ADMIN OVERLAY ───────────
// Bấm "Sửa" trên 1 trường → mở overlay full-screen 5 tab:
//   campus | apps | curriculum | admins | users
// Tab campus nhúng /admin/campus-editor.html (giữ postMessage dirty/state cũ);
// các tab khác render inline trong #school-tab-content.
const SCHOOL_TABS = [
  { id: 'campus',     label: '🗺️ Campus',         hint: 'Bố cục bản đồ 2.5D' },
  { id: 'apps',       label: '🧩 Apps',           hint: 'App gán cho trường' },
  { id: 'curriculum', label: '📚 Curriculum',     hint: 'Coverage chương trình' },
  { id: 'admins',     label: '🛡️ Quản lý',        hint: 'School admins' },
  { id: 'users',      label: '👥 Người dùng',     hint: 'HS/SV enrolled + grants' },
];
let _activeSchoolTab = 'campus';

function openSchoolPanel(domain, label) {
  _campusEditorDomain = domain;
  _campusLayoutCache  = null;
  const meta = CAMPUS_DOMAINS.find(c => c.domain === domain);
  const displayLabel = label || (meta ? `${meta.emoji} ${meta.label}` : domain);
  $('#school-overlay-title').textContent = `🏫 Quản lý trường — ${displayLabel}`;
  $('#school-overlay').style.display = 'flex';

  // Render sidebar tabs
  $('#school-tabs').innerHTML = SCHOOL_TABS.map(t => `
    <button class="btn school-tab" data-school-tab="${t.id}"
      style="justify-content:flex-start;text-align:left;padding:10px 12px;font-size:13px;line-height:1.2"
      title="${t.hint}">
      ${t.label}
    </button>
  `).join('');
  $('#school-tabs').querySelectorAll('[data-school-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchSchoolTab(btn.dataset.schoolTab));
  });

  switchSchoolTab('campus');
}

function closeSchoolOverlay() {
  $('#school-overlay').style.display = 'none';
  $('#campus-iframe').src = '';
  $('#school-tab-content').innerHTML = '';
  _campusEditorDomain = null;
  _campusLayoutCache  = null;
  $('#campus-dirty-badge').style.display = 'none';
}
// Backwards-compat alias — đã được dùng ở chỗ resetCampusLayout.
const closeCampusEditor = closeSchoolOverlay;

function switchSchoolTab(tabId) {
  if (!_campusEditorDomain) return;
  _activeSchoolTab = tabId;
  $('#school-tabs').querySelectorAll('[data-school-tab]').forEach(btn => {
    const active = btn.dataset.schoolTab === tabId;
    btn.classList.toggle('primary', active);
    btn.style.background = active ? '' : 'transparent';
  });

  const iframe   = $('#campus-iframe');
  const content  = $('#school-tab-content');
  const saveBtn  = $('#campus-save-btn');
  const resetBtn = $('#campus-reset-btn');

  // Toolbar Lưu/Reset chỉ có ý nghĩa cho campus
  saveBtn.style.display  = tabId === 'campus' ? '' : 'none';
  resetBtn.style.display = tabId === 'campus' ? '' : 'none';

  if (tabId === 'campus') {
    content.style.display = 'none';
    iframe.style.display = 'block';
    if (!iframe.src || !iframe.src.includes(`domain=${_campusEditorDomain}`)) {
      iframe.src = `/admin/campus-editor.html?domain=${encodeURIComponent(_campusEditorDomain)}&embed=1`;
    }
    return;
  }
  iframe.style.display = 'none';
  content.style.display = 'block';
  content.innerHTML = '<div style="color:var(--muted);padding:24px;text-align:center">⏳ Đang tải…</div>';

  if (tabId === 'apps')        return renderSchoolAppsTab(_campusEditorDomain, content);
  if (tabId === 'curriculum')  return renderSchoolCurriculumTab(_campusEditorDomain, content);
  if (tabId === 'admins')      return renderSchoolAdminsTab(_campusEditorDomain, content);
  if (tabId === 'users')       return renderSchoolUsersTab(_campusEditorDomain, content);
}

async function saveCampusLayout() {
  if (!_campusEditorDomain) return;
  $('#campus-iframe').contentWindow?.postMessage({ type: 'campus-cmd-state' }, '*');
  await new Promise(res => {
    const t = setTimeout(res, 3000);
    const check = setInterval(() => {
      if (_campusLayoutCache) { clearInterval(check); clearTimeout(t); res(); }
    }, 100);
  });
  if (!_campusLayoutCache) return toast('Không đọc được layout từ iframe', 'err');
  const r = await api(`/api/admin/campus-layout/${_campusEditorDomain}`, {
    method: 'POST', body: JSON.stringify({ layout: _campusLayoutCache }),
  });
  if (!r.ok) return toast('Lỗi lưu: ' + (r.data?.message || r.data?.error || r.status), 'err');
  toast(`✓ Đã lưu campus ${_campusEditorDomain}`);
  $('#campus-dirty-badge').style.display = 'none';
  _campusLayoutCache = null;
}

async function resetCampusLayout(domain) {
  if (!confirm(`Reset về layout mặc định cho "${domain}"? Override DB sẽ bị xoá.`)) return;
  const r = await api(`/api/admin/campus-layout/${domain}`, { method: 'DELETE' });
  if (!r.ok) return toast('Lỗi: ' + (r.data?.error || r.status), 'err');
  toast(`✓ Đã reset campus ${domain}`);
  if (_campusEditorDomain === domain) closeSchoolOverlay();
  await showTab(currentTab);
}

window.addEventListener('message', e => {
  const m = e.data;
  if (!m || !_campusEditorDomain) return;
  if (m.type === 'campus-dirty') {
    $('#campus-dirty-badge').style.display = 'inline-block';
  } else if (m.type === 'campus-state') {
    _campusLayoutCache = m.layout;
  }
});

// ─────────── Tab APPS — list portal-apps catalog filtered by domain ───────────
async function renderSchoolAppsTab(domain, host) {
  const r = await fetch('/api/portal-apps/catalog', { credentials: 'same-origin' }).then(x => x.json()).catch(() => null);
  if (!r) { host.innerHTML = '<div style="color:var(--bad);padding:20px">Lỗi tải catalog.</div>'; return; }
  const apps = (r.builtin || []).filter(a => a.domain === domain);
  if (!apps.length) {
    host.innerHTML = `
      <h2 class="section-title">🧩 Apps của trường <span class="line"></span></h2>
      <p style="color:var(--muted);font-size:13px">Trường <b>${esc(domain)}</b> chưa có app nào trong catalog (<code>builtin-catalog.js</code>).</p>
      <p style="color:var(--muted);font-size:12px;margin-top:8px">Thêm app: edit <code>server/contexts/portal-apps/builtin-catalog.js</code>, set <code>domain: '${esc(domain)}'</code>, restart server.</p>
    `;
    return;
  }
  const byCat = {};
  for (const a of apps) (byCat[a.category || 'misc'] ||= []).push(a);
  const catLabel = { game: '🎮 Game', tool: '🛠️ Tool', course: '📘 Course', misc: '📦 Khác' };
  host.innerHTML = `
    <h2 class="section-title">🧩 Apps của trường (${apps.length}) <span class="line"></span></h2>
    <p style="color:var(--muted);font-size:13px;margin-bottom:16px">
      Danh sách app từ <code>builtin-catalog.js</code> domain=<b>${esc(domain)}</b> — catalog version <code>${esc(r.version || '?')}</code>.
    </p>
    ${Object.entries(byCat).map(([cat, list]) => `
      <h3 style="font-size:13px;margin:18px 0 8px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">${catLabel[cat] || cat} (${list.length})</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px">
        ${list.map(a => `
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 14px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <span style="font-size:22px">${a.icon || '📦'}</span>
              <div style="flex:1;min-width:0">
                <div style="font-weight:700;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.name)}</div>
                <div style="font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.alias)}</div>
              </div>
            </div>
            <div style="font-size:11.5px;color:var(--muted);margin-bottom:8px;min-height:32px">${esc(a.description || '')}</div>
            <a href="${esc(a.url)}" target="_blank" class="btn" style="display:inline-block;font-size:11.5px;padding:5px 10px">↗ Mở app</a>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

// ─────────── Tab CURRICULUM — port card từ curriculum-gap cho 1 domain ───────────
const DOMAIN_REGISTRY = {
  preschool:  () => import('/js/domains/preschool/index.js'),
  primary:    () => import('/js/domains/primary/index.js'),
  secondary:  () => import('/js/domains/secondary/index.js'),
  highschool: () => import('/js/domains/highschool/index.js'),
  it:         () => import('/js/domains/it/index.js'),
  pharmacy:   () => import('/js/domains/pharmacy/index.js'),
};
const TARGET_WEEKS = 35;

async function renderSchoolCurriculumTab(domain, host) {
  const meta = DOMAIN_META.find(d => d.id === domain);
  if (!DOMAIN_REGISTRY[domain]) {
    host.innerHTML = `
      <h2 class="section-title">📚 Curriculum <span class="line"></span></h2>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;color:var(--muted)">
        <div style="font-size:32px;margin-bottom:8px">${meta?.icon || '🔒'}</div>
        <b>Chưa có module registry cho trường này</b>
        <div style="font-size:12px;margin-top:6px">
          ${meta?.status === 'locked' ? 'Trường đang khoá — chưa có biên soạn nội dung.' : `Domain <code>${esc(domain)}</code> chưa được khai báo trong DOMAIN_REGISTRY.`}
        </div>
      </div>
    `;
    return;
  }
  let mod;
  try { mod = await DOMAIN_REGISTRY[domain](); }
  catch (e) {
    host.innerHTML = `<div style="color:var(--bad);padding:20px">Lỗi load module: ${esc(e.message)}</div>`;
    return;
  }
  const modules  = mod.MODULES  || [];
  const subjects = mod.SUBJECTS || {};
  const map = {};
  for (const m of modules) {
    const sid = m.subject || '_uncategorized';
    if (!map[sid]) {
      const sm = subjects[sid] || { label: sid, icon: '📘' };
      map[sid] = { id: sid, label: sm.label, icon: sm.icon, weekCount: 0, moduleCount: 0, allOptional: true };
    }
    map[sid].moduleCount += 1;
    if (!m.optional) map[sid].allOptional = false;
    const isStub = m.status === 'in-progress' || /đang biên soạn/i.test(m.description || '');
    map[sid].weekCount += isStub ? 0 : (m.scenarioIds?.length ? TARGET_WEEKS : 0);
  }
  const agg = Object.values(map).sort((a, b) => a.id.localeCompare(b.id));
  const subjectsFull = agg.filter(s => s.weekCount >= TARGET_WEEKS).length;
  const coverage = agg.length ? Math.round((subjectsFull / agg.length) * 100) : 0;

  host.innerHTML = `
    <h2 class="section-title">📚 Curriculum coverage <span class="line"></span></h2>
    <p style="color:var(--muted);font-size:13px;margin-bottom:14px">
      ${meta?.icon || '📘'} <b>${esc(meta?.name || domain)}</b> — ${modules.length} module, ${Object.keys(subjects).length} môn metadata.
      Mỗi môn chuẩn GDPT 2018 cần <b>${TARGET_WEEKS}</b> tuần.
    </p>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:18px 20px;margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-size:13px;color:var(--muted)">Độ phủ môn (≥ ${TARGET_WEEKS} tuần)</span>
        <span><b>${subjectsFull}/${agg.length}</b> môn (${coverage}%)</span>
      </div>
      <div style="height:8px;background:rgba(148,163,184,.15);border-radius:999px;overflow:hidden">
        <div style="width:${coverage}%;height:100%;background:linear-gradient(90deg,var(--ok),var(--brand))"></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden">
      <div style="display:grid;grid-template-columns:1fr 100px 110px;gap:8px;padding:10px 14px;background:var(--bg2);font-size:11.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px">
        <div>Môn</div><div style="text-align:right">Tuần / ${TARGET_WEEKS}</div><div style="text-align:center">Trạng thái</div>
      </div>
      ${agg.map(s => {
        const st = s.weekCount >= TARGET_WEEKS ? 'ok' : s.weekCount > 0 ? 'partial' : 'empty';
        const stLabel = st === 'ok' ? '✓ Đủ' : st === 'partial' ? '⚠ Thiếu' : '✗ Trống';
        const stColor = st === 'ok' ? 'var(--ok)' : st === 'partial' ? 'var(--warn)' : 'var(--bad)';
        return `
          <div style="display:grid;grid-template-columns:1fr 100px 110px;gap:8px;padding:10px 14px;background:var(--bg);align-items:center">
            <div style="font-size:13px">${s.icon || '📘'} ${esc(s.label)}${s.allOptional ? ' <span style="font-size:10px;background:rgba(251,191,36,.15);color:var(--warn);padding:1px 6px;border-radius:999px;margin-left:4px">TỰ CHỌN</span>' : ''}</div>
            <div style="text-align:right;font-variant-numeric:tabular-nums">${s.weekCount}/${TARGET_WEEKS}</div>
            <div style="text-align:center;color:${stColor};font-weight:700;font-size:12px">${stLabel}</div>
          </div>
        `;
      }).join('') || '<div style="padding:18px;text-align:center;color:var(--muted)">Chưa có môn nào.</div>'}
    </div>
    <p style="font-size:11.5px;color:var(--muted);margin-top:12px">
      Full view all domains: <a href="/admin/curriculum-gap.html" style="color:var(--brand)">📊 Curriculum Gap Dashboard</a>.
    </p>
  `;
}

// ─────────── Tab ADMINS — CRUD school_admins ───────────
async function renderSchoolAdminsTab(domain, host) {
  const r = await api(`/api/admin/schools/${encodeURIComponent(domain)}/admins`);
  if (!r.ok) { host.innerHTML = `<div style="color:var(--bad);padding:20px">Lỗi: ${esc(r.data?.error || r.status)}</div>`; return; }
  const admins = r.data?.admins || [];
  host.innerHTML = `
    <h2 class="section-title">🛡️ Quản lý trường — ${admins.length} admin <span class="line"></span></h2>
    <p style="color:var(--muted);font-size:13px;margin-bottom:14px">
      User có trong danh sách này sẽ thấy menu <b>"Quản lý trường ${esc(domain)}"</b> sau khi đăng nhập (qua <code>managed_domains</code> trong <code>/api/auth/me</code>).
    </p>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span style="font-size:13px;color:var(--muted)">Bổ nhiệm user mới:</span>
        <input id="sa-userid" type="number" min="1" placeholder="user_id" style="width:120px;padding:7px 10px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px">
        <input id="sa-note"   type="text" placeholder="Ghi chú (tuỳ chọn)" style="flex:1;min-width:160px;padding:7px 10px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px">
        <button class="btn primary" id="sa-add-btn" style="font-size:12px">+ Bổ nhiệm</button>
      </div>
      <div style="font-size:11.5px;color:var(--muted);margin-top:6px">💡 Lấy user_id từ tab <b>Người dùng</b> hoặc từ <code>GET /api/admin/users</code>.</div>
    </div>
    ${admins.length === 0
      ? '<div style="padding:24px;text-align:center;color:var(--muted);background:var(--bg2);border:1px solid var(--border);border-radius:10px">Chưa có admin nào.</div>'
      : `<div style="display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden">
          <div style="display:grid;grid-template-columns:60px 1fr 1fr 150px 90px;gap:8px;padding:10px 14px;background:var(--bg2);font-size:11.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px">
            <div>UID</div><div>Username</div><div>Ghi chú</div><div>Bổ nhiệm lúc</div><div></div>
          </div>
          ${admins.map(a => `
            <div style="display:grid;grid-template-columns:60px 1fr 1fr 150px 90px;gap:8px;padding:10px 14px;background:var(--bg);align-items:center">
              <div style="font-variant-numeric:tabular-nums;color:var(--muted)">#${a.user_id}</div>
              <div><b>${esc(a.display_name || a.username || '?')}</b><br><span style="font-size:11px;color:var(--muted)">@${esc(a.username || '')}</span></div>
              <div style="font-size:12px;color:var(--muted)">${esc(a.note || '—')}</div>
              <div style="font-size:11.5px;color:var(--muted)">${fmt(a.granted_at)}</div>
              <div style="text-align:right"><button class="btn" data-revoke="${a.user_id}" style="font-size:11px;padding:5px 8px;color:var(--bad);border-color:var(--bad);background:rgba(239,68,68,.08)">🗑 Thu hồi</button></div>
            </div>
          `).join('')}
        </div>`
    }
  `;
  $('#sa-add-btn').addEventListener('click', async () => {
    const uid = Number($('#sa-userid').value);
    const note = $('#sa-note').value.trim();
    if (!uid || uid < 1) return toast('user_id không hợp lệ', 'err');
    const rr = await api(`/api/admin/users/${uid}/school-admin`, {
      method: 'POST', body: JSON.stringify({ domain_id: domain, note: note || null }),
    });
    if (!rr.ok) return toast('Lỗi: ' + (rr.data?.error || rr.status), 'err');
    toast(`✓ Bổ nhiệm user #${uid} làm admin trường ${domain}`);
    renderSchoolAdminsTab(domain, host);
  });
  host.querySelectorAll('[data-revoke]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid = Number(btn.dataset.revoke);
      if (!confirm(`Thu hồi quyền quản lý trường "${domain}" của user #${uid}?`)) return;
      const rr = await api(`/api/admin/users/${uid}/school-admin/${encodeURIComponent(domain)}`, { method: 'DELETE' });
      if (!rr.ok) return toast('Lỗi: ' + (rr.data?.error || rr.status), 'err');
      toast(`✓ Đã thu hồi`);
      renderSchoolAdminsTab(domain, host);
    });
  });
}

// ─────────── Tab USERS — list enrolled + grants theo domain ───────────
async function renderSchoolUsersTab(domain, host) {
  const [ru, rg] = await Promise.all([
    api('/api/admin/users?limit=500'),
    api('/api/admin/domain-grants'),
  ]);
  if (!ru.ok) { host.innerHTML = `<div style="color:var(--bad);padding:20px">Lỗi: ${esc(ru.data?.error || ru.status)}</div>`; return; }
  const allUsers = ru.data?.users || [];
  const allGrants = (rg.data?.grants || []).filter(g => g.domain_id === domain);
  const grantsByUser = {};
  for (const g of allGrants) grantsByUser[g.user_id] = g;

  const enrolled = allUsers.filter(u => u.enrolled_domain === domain);
  const grantedOnly = allUsers.filter(u => u.enrolled_domain !== domain && grantsByUser[u.id]);

  const renderRow = (u, kind) => {
    const g = grantsByUser[u.id];
    const expires = g?.expires_at ? ` · hết hạn ${fmt(g.expires_at)}` : '';
    return `
      <div style="display:grid;grid-template-columns:60px 1.4fr 110px 1fr 120px;gap:8px;padding:10px 14px;background:var(--bg);align-items:center">
        <div style="font-variant-numeric:tabular-nums;color:var(--muted)">#${u.id}</div>
        <div><b>${esc(u.display_name || u.username)}</b><br><span style="font-size:11px;color:var(--muted)">@${esc(u.username)} · ${esc(u.role)}</span></div>
        <div style="font-size:11.5px">${kind === 'enrolled' ? '<span style="background:rgba(34,197,94,.15);color:var(--ok);padding:2px 7px;border-radius:6px;font-size:10.5px;font-weight:700">ENROLLED</span>' : '<span style="background:rgba(99,102,241,.15);color:#a5b4fc;padding:2px 7px;border-radius:6px;font-size:10.5px;font-weight:700">GRANT</span>'}</div>
        <div style="font-size:11.5px;color:var(--muted)">${esc(g?.note || '—')}${expires}</div>
        <div style="text-align:right;display:flex;gap:4px;justify-content:flex-end">
          ${kind === 'enrolled'
            ? `<button class="btn" data-unenroll="${u.id}" style="font-size:11px;padding:5px 8px" title="Bỏ gắn enrolled_domain">↺ Bỏ enroll</button>`
            : `<button class="btn" data-revoke-grant="${u.id}" style="font-size:11px;padding:5px 8px;color:var(--bad);border-color:var(--bad);background:rgba(239,68,68,.08)">🗑 Thu hồi</button>`}
        </div>
      </div>`;
  };

  host.innerHTML = `
    <h2 class="section-title">👥 Người dùng của trường <span class="line"></span></h2>
    <div style="display:flex;gap:14px;margin-bottom:14px;flex-wrap:wrap">
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px 16px;flex:1;min-width:160px">
        <div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">Enrolled</div>
        <div style="font-size:24px;font-weight:700;color:var(--ok)">${enrolled.length}</div>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px 16px;flex:1;min-width:160px">
        <div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px">Grants</div>
        <div style="font-size:24px;font-weight:700;color:#a5b4fc">${grantedOnly.length}</div>
      </div>
    </div>

    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;margin-bottom:16px">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span style="font-size:13px;color:var(--muted)">Cấp grant quyền vào trường:</span>
        <input id="su-userid" type="number" min="1" placeholder="user_id" style="width:120px;padding:7px 10px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px">
        <input id="su-note"   type="text" placeholder="Ghi chú (tuỳ chọn)" style="flex:1;min-width:160px;padding:7px 10px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px">
        <button class="btn primary" id="su-grant-btn" style="font-size:12px">+ Grant</button>
      </div>
    </div>

    ${enrolled.length === 0 && grantedOnly.length === 0
      ? '<div style="padding:24px;text-align:center;color:var(--muted);background:var(--bg2);border:1px solid var(--border);border-radius:10px">Chưa có user nào enroll hoặc grant vào trường này.</div>'
      : `<div style="display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden">
          <div style="display:grid;grid-template-columns:60px 1.4fr 110px 1fr 120px;gap:8px;padding:10px 14px;background:var(--bg2);font-size:11.5px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.5px">
            <div>UID</div><div>User</div><div>Kiểu</div><div>Ghi chú</div><div></div>
          </div>
          ${enrolled.map(u => renderRow(u, 'enrolled')).join('')}
          ${grantedOnly.map(u => renderRow(u, 'grant')).join('')}
        </div>`
    }
  `;

  $('#su-grant-btn').addEventListener('click', async () => {
    const uid = Number($('#su-userid').value);
    const note = $('#su-note').value.trim();
    if (!uid || uid < 1) return toast('user_id không hợp lệ', 'err');
    const rr = await api(`/api/admin/users/${uid}/grant-domain`, {
      method: 'POST', body: JSON.stringify({ domain_id: domain, note: note || null }),
    });
    if (!rr.ok) return toast('Lỗi: ' + (rr.data?.error || rr.status), 'err');
    toast(`✓ Cấp grant trường ${domain} cho user #${uid}`);
    renderSchoolUsersTab(domain, host);
  });
  host.querySelectorAll('[data-unenroll]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid = Number(btn.dataset.unenroll);
      if (!confirm(`Bỏ gắn trường "${domain}" khỏi user #${uid}? (enrolled_domain sẽ về null)`)) return;
      const rr = await api(`/api/admin/users/${uid}/enrollment`, {
        method: 'POST', body: JSON.stringify({ enrolled_domain: null }),
      });
      if (!rr.ok) return toast('Lỗi: ' + (rr.data?.error || rr.status), 'err');
      toast(`✓ Bỏ enroll xong`);
      renderSchoolUsersTab(domain, host);
    });
  });
  host.querySelectorAll('[data-revoke-grant]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid = Number(btn.dataset.revokeGrant);
      if (!confirm(`Thu hồi grant trường "${domain}" của user #${uid}?`)) return;
      const rr = await api(`/api/admin/users/${uid}/grant-domain/${encodeURIComponent(domain)}`, { method: 'DELETE' });
      if (!rr.ok) return toast('Lỗi: ' + (rr.data?.error || rr.status), 'err');
      toast(`✓ Thu hồi xong`);
      renderSchoolUsersTab(domain, host);
    });
  });
}

// Curriculum gap dashboard mở trang riêng — không cần phải nhúng heatmap nặng
// vào tab khi nó cần load 6 domain modules song song. Click tab Curriculum sẽ
// hiện shortcut + preview stats; full view ở /admin/curriculum-gap.html.
async function loadCurriculumTab() {
  $('#tabbody').innerHTML = `
    <h2 class="section-title">📊 Curriculum Gap Dashboard <span class="line"></span></h2>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:18px 22px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;">
        <div style="font-weight:700;font-size:15px;margin-bottom:6px">Heatmap độ phủ K-12 vs GDPT 2018</div>
        <div style="color:var(--muted);font-size:13px;line-height:1.55">
          Đối chiếu môn × tuần × có scenarios giữa Tizia vs chuẩn Chương trình GDPT 2018 (TT 32/2018 + TT 13/2022 cho THPT + TT 51/2020 cho mầm non).
          Sau khi anh chạy upgrade <code style="background:#020617;color:var(--accent);padding:2px 6px;border-radius:4px;font-size:11.5px">SCOREUP-UPGRADE.md</code> Phase 4, dashboard tự lấy coverage thực từ ScoreUp.
        </div>
      </div>
      <a class="btn primary" href="/admin/curriculum-gap.html" style="font-weight:700">📊 Mở Dashboard →</a>
    </div>
    <div style="margin-top:24px;color:var(--muted);font-size:12.5px;line-height:1.6">
      🧪 <b>Quick refs:</b><br>
      • Audit chi tiết: <code style="background:#020617;color:var(--accent);padding:1px 5px;border-radius:3px">docs/AUDIT-2026-06-05.md</code><br>
      • Seed JSON Lịch sử L11/L12: <code style="background:#020617;color:var(--accent);padding:1px 5px;border-radius:3px">docs/curriculum-seeds/lich-su-{11,12}.json</code><br>
      • Upgrade prompts: <code style="background:#020617;color:var(--accent);padding:1px 5px;border-radius:3px">docs/upgrade-prompts/{SCOREUP,CODELAB}-UPGRADE.md</code>
    </div>
  `;
}

// ─────────── CSDL TAB — admin trực tiếp browse + CRUD sqlite tizia.db ───────────
// Sub-section: 📋 Tables | 🔍 SQL Console | 💾 Backups | 📜 Audit
// Mọi non-SELECT đều ghi vào admin_db_audit + console của server.
let _dbActiveSub  = 'tables';
let _dbActiveTbl  = null;
let _dbRowOffset  = 0;
const DB_PAGE_SIZE = 100;

async function loadDbTab() {
  const host = $('#tabbody');
  host.innerHTML = `
    <h2 class="section-title">🗄️ Cơ sở dữ liệu (SQLite) <span class="line"></span></h2>
    <p style="color:var(--muted);font-size:13px;margin:0 0 14px">
      Browse + CRUD trực tiếp <code>tizia.db</code>. Mọi thao tác <b>ghi</b> sẽ vào
      <code>admin_db_audit</code>. Hãy <b>backup trước khi UPDATE/DELETE</b> số lượng lớn.
    </p>
    <div style="display:flex;gap:6px;border-bottom:1px solid var(--border);margin-bottom:16px;flex-wrap:wrap">
      ${[
        ['tables',  '📋 Tables'],
        ['sql',     '🔍 SQL Console'],
        ['backups', '💾 Backups'],
        ['audit',   '📜 Audit log'],
      ].map(([id, lbl]) => `
        <button class="btn db-sub" data-db-sub="${id}" style="border-radius:8px 8px 0 0;border-bottom:0;font-size:12.5px">${lbl}</button>
      `).join('')}
    </div>
    <div id="db-sub-body"></div>
  `;
  host.querySelectorAll('[data-db-sub]').forEach(btn => {
    btn.addEventListener('click', () => switchDbSub(btn.dataset.dbSub));
  });
  switchDbSub(_dbActiveSub);
}

function switchDbSub(sub) {
  _dbActiveSub = sub;
  $('#tabbody').querySelectorAll('[data-db-sub]').forEach(btn => {
    const active = btn.dataset.dbSub === sub;
    btn.classList.toggle('primary', active);
    btn.style.background = active ? '' : 'transparent';
  });
  const body = $('#db-sub-body');
  body.innerHTML = '<div style="color:var(--muted);padding:20px;text-align:center">⏳ Đang tải…</div>';
  if (sub === 'tables')  return renderDbTablesSub(body);
  if (sub === 'sql')     return renderDbSqlSub(body);
  if (sub === 'backups') return renderDbBackupsSub(body);
  if (sub === 'audit')   return renderDbAuditSub(body);
}

async function renderDbTablesSub(host) {
  const r = await api('/api/admin/db/tables');
  if (!r.ok) { host.innerHTML = `<div class="err">Lỗi: ${esc(r.data?.error || r.status)}</div>`; return; }
  const tables = r.data?.tables || [];
  host.innerHTML = `
    <div style="display:flex;gap:14px;min-height:400px">
      <aside style="width:260px;flex-shrink:0;background:var(--bg2);border:1px solid var(--border);border-radius:10px;overflow:hidden;display:flex;flex-direction:column">
        <div style="padding:10px 12px;border-bottom:1px solid var(--border);font-size:11.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;font-weight:700">
          ${tables.length} tables
        </div>
        <div style="overflow-y:auto;max-height:520px">
          ${tables.map(t => `
            <button data-db-table="${esc(t.name)}" style="display:flex;justify-content:space-between;align-items:center;width:100%;text-align:left;padding:9px 12px;background:transparent;border:none;border-bottom:1px solid var(--border);color:var(--text);font-size:12.5px;cursor:pointer">
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${esc(t.name)}</span>
              <span style="font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums;margin-left:8px">${fmtNum(t.rowCount)}</span>
            </button>
          `).join('')}
        </div>
      </aside>
      <main id="db-table-detail" style="flex:1;min-width:0">
        <div style="color:var(--muted);padding:40px;text-align:center;background:var(--bg2);border:1px solid var(--border);border-radius:10px">
          ← Chọn 1 bảng bên trái để xem rows / schema.
        </div>
      </main>
    </div>
  `;
  host.querySelectorAll('[data-db-table]').forEach(btn => {
    btn.addEventListener('click', () => {
      host.querySelectorAll('[data-db-table]').forEach(b => b.style.background = 'transparent');
      btn.style.background = 'rgba(59,130,246,.15)';
      _dbActiveTbl = btn.dataset.dbTable;
      _dbRowOffset = 0;
      renderDbTableDetail(_dbActiveTbl);
    });
  });
  if (_dbActiveTbl && tables.some(t => t.name === _dbActiveTbl)) {
    const btn = host.querySelector(`[data-db-table="${CSS.escape(_dbActiveTbl)}"]`);
    if (btn) { btn.style.background = 'rgba(59,130,246,.15)'; renderDbTableDetail(_dbActiveTbl); }
  }
}

async function renderDbTableDetail(tbl) {
  const host = $('#db-table-detail');
  host.innerHTML = '<div style="color:var(--muted);padding:30px;text-align:center">⏳ Đang tải…</div>';
  const [schemaR, rowsR] = await Promise.all([
    api(`/api/admin/db/schema/${encodeURIComponent(tbl)}`),
    api(`/api/admin/db/rows/${encodeURIComponent(tbl)}?limit=${DB_PAGE_SIZE}&offset=${_dbRowOffset}`),
  ]);
  if (!rowsR.ok) { host.innerHTML = `<div class="err">Lỗi: ${esc(rowsR.data?.error || rowsR.status)}</div>`; return; }
  const cols  = schemaR.data?.columns || [];
  const total = rowsR.data?.total || 0;
  const rows  = rowsR.data?.rows || [];
  const pk    = cols.find(c => c.pk) || cols[0] || { name: 'rowid' };
  const totalPages = Math.max(1, Math.ceil(total / DB_PAGE_SIZE));
  const curPage = Math.floor(_dbRowOffset / DB_PAGE_SIZE) + 1;

  const truncate = (v) => {
    if (v == null) return '<span style="color:var(--muted);font-style:italic">NULL</span>';
    const s = String(v);
    if (s.length > 80) return esc(s.slice(0, 80)) + '<span style="color:var(--muted)">…</span>';
    return esc(s);
  };

  host.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:10px;flex-wrap:wrap">
      <div>
        <h3 style="margin:0;font-size:16px">📋 ${esc(tbl)}</h3>
        <small style="color:var(--muted)">${cols.length} cột · ${fmtNum(total)} rows · PK: <code>${esc(pk.name)}</code></small>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn" id="db-tbl-schema" style="font-size:11.5px">📐 Xem DDL</button>
        <button class="btn primary" id="db-tbl-insert" style="font-size:11.5px">+ Insert row</button>
      </div>
    </div>
    <div style="overflow-x:auto;border:1px solid var(--border);border-radius:10px;background:var(--bg2)">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:var(--bg);position:sticky;top:0">
          ${cols.map(c => `<th style="padding:8px 10px;text-align:left;border-bottom:1px solid var(--border);font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;font-size:10.5px;white-space:nowrap">${esc(c.name)}${c.pk ? ' 🔑' : ''}<br><span style="font-size:10px;font-weight:400;text-transform:none;letter-spacing:0">${esc(c.type)}</span></th>`).join('')}
          <th style="padding:8px 10px;width:90px;border-bottom:1px solid var(--border)"></th>
        </tr></thead>
        <tbody>
          ${rows.length === 0
            ? `<tr><td colspan="${cols.length + 1}" style="padding:30px;text-align:center;color:var(--muted)">Bảng trống.</td></tr>`
            : rows.map(row => `
              <tr style="border-bottom:1px solid var(--border)">
                ${cols.map(c => `<td style="padding:6px 10px;vertical-align:top;font-family:monospace">${truncate(row[c.name])}</td>`).join('')}
                <td style="padding:6px 10px;white-space:nowrap;text-align:right">
                  <button class="btn" data-row-edit="${esc(JSON.stringify(row[pk.name]))}" style="font-size:10.5px;padding:3px 7px" title="Edit">✏️</button>
                  <button class="btn" data-row-del="${esc(JSON.stringify(row[pk.name]))}" style="font-size:10.5px;padding:3px 7px;color:var(--bad);border-color:var(--bad);background:rgba(239,68,68,.08)" title="Delete">🗑</button>
                </td>
              </tr>
            `).join('')
          }
        </tbody>
      </table>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:12.5px;color:var(--muted)">
      <div>Trang ${curPage}/${totalPages} — hiển thị row ${_dbRowOffset + 1}–${Math.min(_dbRowOffset + rows.length, total)} / ${fmtNum(total)}</div>
      <div style="display:flex;gap:6px">
        <button class="btn" id="db-pg-first"  ${_dbRowOffset === 0 ? 'disabled' : ''} style="font-size:11px">«</button>
        <button class="btn" id="db-pg-prev"   ${_dbRowOffset === 0 ? 'disabled' : ''} style="font-size:11px">‹ Prev</button>
        <button class="btn" id="db-pg-next"   ${curPage >= totalPages ? 'disabled' : ''} style="font-size:11px">Next ›</button>
        <button class="btn" id="db-pg-last"   ${curPage >= totalPages ? 'disabled' : ''} style="font-size:11px">»</button>
      </div>
    </div>
  `;

  $('#db-pg-first').addEventListener('click', () => { _dbRowOffset = 0; renderDbTableDetail(tbl); });
  $('#db-pg-prev') .addEventListener('click', () => { _dbRowOffset = Math.max(0, _dbRowOffset - DB_PAGE_SIZE); renderDbTableDetail(tbl); });
  $('#db-pg-next') .addEventListener('click', () => { _dbRowOffset = _dbRowOffset + DB_PAGE_SIZE; renderDbTableDetail(tbl); });
  $('#db-pg-last') .addEventListener('click', () => { _dbRowOffset = (totalPages - 1) * DB_PAGE_SIZE; renderDbTableDetail(tbl); });
  $('#db-tbl-schema').addEventListener('click', () => {
    alert(schemaR.data?.ddl || '(no ddl)');
  });
  $('#db-tbl-insert').addEventListener('click', () => openDbRowEditor(tbl, cols, null, null));
  host.querySelectorAll('[data-row-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkVal = JSON.parse(btn.dataset.rowEdit);
      const row = rows.find(r => r[pk.name] === pkVal);
      openDbRowEditor(tbl, cols, pk.name, row);
    });
  });
  host.querySelectorAll('[data-row-del]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const pkVal = JSON.parse(btn.dataset.rowDel);
      if (!confirm(`Xoá row ${pk.name}=${JSON.stringify(pkVal)} khỏi bảng "${tbl}"?\n\nKhông thể undo.`)) return;
      const rr = await api(`/api/admin/db/rows/${encodeURIComponent(tbl)}/delete`, {
        method: 'POST', body: JSON.stringify({ pk_col: pk.name, pk_val: pkVal }),
      });
      if (!rr.ok) return toast('Lỗi: ' + (rr.data?.message || rr.data?.error), 'err');
      toast(`✓ Xoá ${rr.data.changes} row`);
      renderDbTableDetail(tbl);
    });
  });
}

function openDbRowEditor(tbl, cols, pkCol, existing) {
  const isInsert = !existing;
  const editableCols = cols.filter(c => !(isInsert && c.pk && c.type?.toUpperCase().includes('INTEGER'))); // autoincrement PK skip on insert
  const modalHtml = `
    <div id="db-row-modal" style="position:fixed;inset:0;z-index:2000;background:rgba(11,18,32,.85);display:flex;align-items:center;justify-content:center;padding:20px">
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;max-width:640px;width:100%;max-height:88vh;overflow:auto">
        <div style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
          <h3 style="margin:0;font-size:15px">${isInsert ? '➕ Insert row' : '✏️ Edit row'} — <code>${esc(tbl)}</code></h3>
          <button class="btn" id="db-row-cancel" style="font-size:12px">✕</button>
        </div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px">
          ${editableCols.map(c => {
            const isPkEdit = !isInsert && c.name === pkCol;
            const v = existing ? existing[c.name] : (c.dflt_value ?? '');
            return `
              <div>
                <label style="display:block;font-size:12px;color:var(--muted);margin-bottom:3px">
                  <b>${esc(c.name)}</b> · <span style="font-family:monospace">${esc(c.type)}</span>${c.notnull ? ' · <span style="color:var(--bad)">NOT NULL</span>' : ''}${c.pk ? ' · <span style="color:var(--warn)">PK</span>' : ''}${isPkEdit ? ' · <span style="color:var(--muted)">(read-only)</span>' : ''}
                </label>
                <input
                  data-col="${esc(c.name)}"
                  type="text"
                  value="${v == null ? '' : esc(v)}"
                  placeholder="${v == null ? 'NULL' : ''}"
                  ${isPkEdit ? 'readonly' : ''}
                  style="width:100%;padding:7px 10px;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:13px;font-family:monospace${isPkEdit ? ';opacity:.6' : ''}"
                />
              </div>
            `;
          }).join('')}
          <small style="color:var(--muted)">💡 Để trống = NULL (nếu cột cho phép NULL). Số/JSON cứ paste, server giữ nguyên.</small>
        </div>
        <div style="padding:12px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px">
          <button class="btn" id="db-row-close" style="font-size:12px">Huỷ</button>
          <button class="btn primary" id="db-row-save" style="font-size:12px">${isInsert ? '💾 Insert' : '💾 Lưu'}</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = $('#db-row-modal');
  const close = () => modal.remove();
  $('#db-row-cancel').addEventListener('click', close);
  $('#db-row-close').addEventListener('click', close);
  $('#db-row-save').addEventListener('click', async () => {
    const data = {};
    modal.querySelectorAll('[data-col]').forEach(inp => {
      if (inp.readOnly) return;
      const name = inp.dataset.col;
      const raw  = inp.value;
      data[name] = raw === '' ? null : raw;
    });
    if (isInsert) {
      const rr = await api(`/api/admin/db/rows/${encodeURIComponent(tbl)}/insert`, {
        method: 'POST', body: JSON.stringify({ values: data }),
      });
      if (!rr.ok) return toast('Lỗi: ' + (rr.data?.message || rr.data?.error), 'err');
      toast(`✓ Insert row #${rr.data.last_id}`);
    } else {
      const rr = await api(`/api/admin/db/rows/${encodeURIComponent(tbl)}/update`, {
        method: 'POST', body: JSON.stringify({ pk_col: pkCol, pk_val: existing[pkCol], set: data }),
      });
      if (!rr.ok) return toast('Lỗi: ' + (rr.data?.message || rr.data?.error), 'err');
      toast(`✓ Update ${rr.data.changes} row`);
    }
    close();
    renderDbTableDetail(tbl);
  });
}

function renderDbSqlSub(host) {
  host.innerHTML = `
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px 16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <label style="font-size:12.5px;color:var(--muted);font-weight:700">SQL Query</label>
        <label style="font-size:12px;display:flex;align-items:center;gap:6px;color:var(--warn);cursor:pointer">
          <input id="db-allow-write" type="checkbox">
          <span>Cho phép WRITE (INSERT/UPDATE/DELETE/DROP) — audit log</span>
        </label>
      </div>
      <textarea id="db-sql" rows="8" placeholder="SELECT * FROM users LIMIT 20;" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-family:monospace;font-size:13px;line-height:1.5;resize:vertical"></textarea>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;gap:8px;flex-wrap:wrap">
        <small style="color:var(--muted)">Ctrl/Cmd+Enter để chạy. Read-only (SELECT/WITH/EXPLAIN/PRAGMA) chạy luôn. Non-SELECT cần tick "Cho phép WRITE" + confirm 2 lần.</small>
        <button class="btn primary" id="db-sql-run" style="font-size:12.5px">▶ Run</button>
      </div>
    </div>
    <div id="db-sql-result" style="margin-top:14px"></div>
  `;
  const ta = $('#db-sql');
  ta.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); $('#db-sql-run').click(); }
  });
  $('#db-sql-run').addEventListener('click', async () => {
    const sql = ta.value.trim();
    if (!sql) return toast('SQL trống', 'err');
    const allowWrite = $('#db-allow-write').checked;
    const isRead = /^\s*(SELECT|WITH|EXPLAIN|PRAGMA)\b/i.test(sql);
    if (!isRead) {
      if (!allowWrite) return toast('Tick "Cho phép WRITE" trước', 'err');
      const c1 = confirm(`⚠️ Non-SELECT query:\n\n${sql.slice(0, 300)}${sql.length > 300 ? '…' : ''}\n\nChạy thử?`);
      if (!c1) return;
      const c2 = confirm(`⚠️ Xác nhận lần 2 — không thể undo.\n\nThực sự chạy?`);
      if (!c2) return;
    }
    const result = $('#db-sql-result');
    result.innerHTML = '<div style="color:var(--muted);padding:20px;text-align:center">⏳ Đang chạy…</div>';
    const r = await api('/api/admin/db/query', {
      method: 'POST', body: JSON.stringify({ sql, allow_write: allowWrite }),
    });
    if (!r.ok) {
      result.innerHTML = `<div class="err" style="padding:14px;background:rgba(239,68,68,.08);border:1px solid var(--bad);border-radius:8px;color:var(--bad);font-family:monospace;font-size:12.5px;white-space:pre-wrap">❌ ${esc(r.data?.message || r.data?.error || r.status)}</div>`;
      return;
    }
    if (r.data.mode === 'write') {
      result.innerHTML = `<div style="padding:14px;background:rgba(34,197,94,.08);border:1px solid var(--ok);border-radius:8px;color:var(--ok);font-size:13px">✓ Write OK — <b>${r.data.changes}</b> rows affected${r.data.last_id ? ` · last_id=<b>${r.data.last_id}</b>` : ''}.</div>`;
      toast('✓ Write OK');
      return;
    }
    const cols = r.data.columns || [];
    const rows = r.data.rows || [];
    if (!rows.length) {
      result.innerHTML = `<div style="padding:20px;text-align:center;color:var(--muted);background:var(--bg2);border:1px solid var(--border);border-radius:8px">Query OK — 0 rows.</div>`;
      return;
    }
    const truncate = (v) => v == null ? '<span style="color:var(--muted);font-style:italic">NULL</span>' : esc(String(v).length > 120 ? String(v).slice(0, 120) + '…' : String(v));
    result.innerHTML = `
      <div style="margin-bottom:6px;font-size:12.5px;color:var(--muted)">${rows.length} rows · ${cols.length} cols</div>
      <div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;background:var(--bg2);max-height:520px;overflow-y:auto">
        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <thead><tr style="background:var(--bg);position:sticky;top:0">
            ${cols.map(c => `<th style="padding:8px 10px;text-align:left;border-bottom:1px solid var(--border);font-weight:700;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;white-space:nowrap">${esc(c)}</th>`).join('')}
          </tr></thead>
          <tbody>
            ${rows.map(row => `<tr style="border-bottom:1px solid var(--border)">${cols.map(c => `<td style="padding:6px 10px;font-family:monospace;vertical-align:top">${truncate(row[c])}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
  });
}

async function renderDbBackupsSub(host) {
  const r = await api('/api/admin/db/backups');
  if (!r.ok) { host.innerHTML = `<div class="err">Lỗi: ${esc(r.data?.error || r.status)}</div>`; return; }
  const backups = r.data?.backups || [];
  host.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <button class="btn primary" id="db-bk-new" style="font-size:12.5px">📸 Tạo backup mới (snapshot)</button>
      <a class="btn" href="/api/admin/db/backup/download?name=current" target="_blank" style="font-size:12.5px;text-decoration:none">⬇ Tải tizia.db hiện tại</a>
      <button class="btn" id="db-bk-refresh" style="font-size:12.5px">↻ Refresh</button>
    </div>
    <p style="color:var(--muted);font-size:12.5px;margin:0 0 12px">
      Backup folder: <code>${esc(r.data?.data_dir || '?')}</code> — tổng <b>${backups.length}</b> file.
    </p>
    ${backups.length === 0
      ? '<div style="padding:24px;text-align:center;color:var(--muted);background:var(--bg2);border:1px solid var(--border);border-radius:10px">Chưa có backup nào.</div>'
      : `<div style="border:1px solid var(--border);border-radius:10px;overflow:hidden">
          <table style="width:100%;border-collapse:collapse;font-size:12.5px">
            <thead><tr style="background:var(--bg2)">
              <th style="padding:10px 14px;text-align:left;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px">Tên file</th>
              <th style="padding:10px 14px;text-align:right;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;width:110px">Kích thước</th>
              <th style="padding:10px 14px;text-align:left;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;width:170px">Tạo lúc</th>
              <th style="padding:10px 14px;width:90px"></th>
            </tr></thead>
            <tbody>
              ${backups.map(b => `
                <tr style="border-top:1px solid var(--border)">
                  <td style="padding:8px 14px;font-family:monospace">${esc(b.name)}</td>
                  <td style="padding:8px 14px;text-align:right;font-variant-numeric:tabular-nums">${fmtBytes(b.size)}</td>
                  <td style="padding:8px 14px;color:var(--muted)">${fmt(b.mtime)}</td>
                  <td style="padding:8px 14px;text-align:right">
                    <a class="btn" href="/api/admin/db/backup/download?name=${encodeURIComponent(b.name)}" target="_blank" style="font-size:11px;padding:4px 8px;text-decoration:none">⬇</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>`
    }
  `;
  $('#db-bk-new').addEventListener('click', async () => {
    if (!confirm('Tạo snapshot backup tizia.db ngay? (an toàn — không khoá DB)')) return;
    const rr = await api('/api/admin/db/backup', { method: 'POST' });
    if (!rr.ok) return toast('Lỗi: ' + (rr.data?.message || rr.data?.error), 'err');
    toast(`✓ Tạo ${rr.data.name} (${fmtBytes(rr.data.size)})`);
    renderDbBackupsSub(host);
  });
  $('#db-bk-refresh').addEventListener('click', () => renderDbBackupsSub(host));
}

async function renderDbAuditSub(host) {
  const r = await api('/api/admin/db/audit');
  if (!r.ok) { host.innerHTML = `<div class="err">Lỗi: ${esc(r.data?.error || r.status)}</div>`; return; }
  const audit = r.data?.audit || [];
  host.innerHTML = `
    <p style="color:var(--muted);font-size:12.5px;margin:0 0 12px">
      ${audit.length} thao tác WRITE gần nhất (giới hạn 200). Mỗi row UPDATE/INSERT/DELETE từ UI DB hoặc từ SQL Console đều ghi đây.
    </p>
    ${audit.length === 0
      ? '<div style="padding:24px;text-align:center;color:var(--muted);background:var(--bg2);border:1px solid var(--border);border-radius:10px">Chưa có thao tác WRITE nào.</div>'
      : `<div style="display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:10px;overflow:hidden">
          ${audit.map(a => `
            <div style="padding:10px 14px;background:var(--bg)">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:11.5px;color:var(--muted);margin-bottom:4px">
                <span><b style="color:var(--text)">@${esc(a.username || '?')}</b> (uid=${a.user_id}) · ${fmt(a.created_at)}</span>
                <span>${a.error ? `<span style="color:var(--bad)">✗ ${esc(a.error)}</span>` : `<span style="color:var(--ok)">✓ ${a.changes} rows${a.last_id ? ` · last_id=${a.last_id}` : ''}</span>`}</span>
              </div>
              <code style="display:block;font-size:11.5px;background:var(--bg2);padding:6px 9px;border-radius:5px;white-space:pre-wrap;word-break:break-all;color:${a.error ? 'var(--bad)' : 'var(--text)'};max-height:120px;overflow:auto">${esc(a.sql)}</code>
            </div>
          `).join('')}
        </div>`
    }
  `;
}

const TABS = {
  dashboard:  { label:'📊 Dashboard', load: loadDashboard },
  schools:    { label:'🏫 Trường', load: loadSchoolsCampus },
  curriculum: { label:'📊 Curriculum', load: loadCurriculumTab },
  requests:   { label:'💡 Góp ý', load: loadRequests, badge: () => reqCache.filter(r => r.status === 'pending').length },
  users:      { label:'👥 Người dùng', load: loadUsers },
  db:         { label:'🗄️ CSDL',     load: loadDbTab },
  config:     { label:'⚙️ Cấu hình', load: loadConfig },
};

// ─────────── Dashboard tab (KPI + charts + tops + feed + system) ───────────
async function loadDashboard() {
  const [ov, ts, tokenModelsRes, topStudents, sys, activity, pv] = await Promise.all([
    api('/api/admin/overview2'),
    api('/api/admin/timeseries?days=30'),
    api('/api/admin/ai-tokens-by-model?days=30'),
    api('/api/admin/top?metric=students&limit=8'),
    api('/api/admin/system'),
    api('/api/admin/activity?limit=40'),
    api('/api/admin/pageviews?days=30'),
  ]);

  if (ov.status === 403) {
    $('#tabbody').innerHTML = `<div class="err">⛔ Cần quyền <b>admin</b>. Tài khoản hiện tại không đủ quyền.<br>
      Liên hệ quản trị để được cấp quyền.</div>`;
    return;
  }

  const kpiHtml = renderKpi(ov.data || {});
  const chartsHtml = `
    <section class="section">
      <h2 class="section-title">📈 Xu hướng 30 ngày <span class="line"></span></h2>
      <div class="two-col">
        <div class="panel">
          <div class="panel-title">🎮 Lượt học theo ngày <span class="legend"><span><i style="background:var(--accent)"></i>Lượt học</span></span></div>
          <div class="chart" id="chart-attempts"></div>
        </div>
        <div class="panel">
          <div class="panel-title">👤 User mới theo ngày <span class="legend"><span><i style="background:var(--accent2)"></i>Đăng ký</span></span></div>
          <div class="chart" id="chart-users"></div>
        </div>
      </div>
      <div style="height:14px"></div>
      <div class="two-col">
        <div class="panel">
          <div class="panel-title">🤖 AI tokens theo ngày <span class="legend"><span><i style="background:var(--purple)"></i>Tokens</span></span></div>
          <div class="chart" id="chart-tokens"></div>
        </div>
        <div class="panel">
          <div class="panel-title">⚡ Tokens theo model</div>
          <div id="chart-tokens-model" style="padding:6px 0"></div>
        </div>
      </div>
    </section>
  `;
  const pvHtml = renderPageviewSection(pv.data || {});
  const topsHtml = `
    <section class="section">
      <h2 class="section-title">🏆 Bảng xếp hạng <span class="line"></span></h2>
      <div class="panel">
        <div class="panel-title">🏆 Top học sinh năng động</div>
        <div id="top-students"></div>
      </div>
    </section>
  `;
  const feedHtml = `
    <section class="section">
      <div class="two-col">
        <div class="panel">
          <div class="panel-title">📋 Hoạt động gần đây</div>
          <div id="activity-feed"></div>
        </div>
        <div class="panel">
          <div class="panel-title">⚙️ Hệ thống (snapshot)</div>
          <div id="sysblock"></div>
        </div>
      </div>
    </section>
  `;
  $('#tabbody').innerHTML = kpiHtml + chartsHtml + pvHtml + topsHtml + feedHtml;

  $$('.kpi[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigateKpi(el.dataset.nav));
  });

  const series = (ts.data?.series || []);
  lineChart($('#chart-attempts'),
    series.map(s => ({ date: s.date, value: s.attempts })),
    { color:'var(--accent)', label:'Lượt' });
  lineChart($('#chart-users'),
    series.map(s => ({ date: s.date, value: s.users })),
    { color:'var(--accent2)', label:'User mới' });
  lineChart($('#chart-tokens'),
    series.map(s => ({ date: s.date, value: s.ai_tokens })),
    { color:'var(--purple)', label:'Tokens' });
  renderPageviewCharts(pv.data || {});

  const tokenModels = (tokenModelsRes.data?.models || []).map(m => ({
    model: `${m.model} ${m.provider ? '(' + m.provider + ')' : ''}`,
    value: (m.pin || 0) + (m.pout || 0),
  }));
  barChartH($('#chart-tokens-model'), tokenModels);

  $('#top-students').innerHTML = renderTopList(topStudents.data?.rows || [], {
    nameKey:'display_name', valueKey:'attempts',
    sub: r => ` · @${r.username} · điểm ${fmtNum(r.total_score)}`,
  });
  $('#activity-feed').innerHTML = renderFeed(activity.data?.items || []);
  $('#sysblock').innerHTML = renderSystem(sys.data || {});

  // Đồng bộ badge "Góp ý" sau khi dashboard load xong (nhẹ, không trùng request)
  if (ov.data?.requests_pending != null) {
    const tb = document.querySelector('.tab[data-k="requests"] .count');
    if (tb) tb.textContent = ov.data.requests_pending;
  }
}

// ─────────── Cấu hình hệ thống (Runtime info + Auto-backup config + DB backup) ───────────
// Tab "⚙️ Cấu hình" gom 3 nhóm:
//   1. Runtime snapshot: uptime, memory, DB size, Node version (readonly)
//   2. Cấu hình môi trường: env var chính (BACKUP_HOUR/KEEP, AI, …) — readonly
//      vì sửa cần restart server; chỉ là window để admin biết đang chạy gì.
//   3. Sao lưu / Phục hồi DB (pg_dump): tạo snapshot, list, restore.
async function loadConfig() {
  const [sysR, r] = await Promise.all([
    api('/api/admin/system'),
    api('/api/admin/backups'),
  ]);
  if (!r.ok) { $('#tabbody').innerHTML = `<div class="err">Lỗi tải cấu hình: ${r.data?.error || r.status}</div>`; return; }
  const items = r.data.backups || [];
  const pgReady = r.data.pg_ready !== false; // backwards-compat: undefined = giả định ready

  // ── 1. Runtime snapshot ──
  const sysHtml = renderSystem(sysR.data || {});

  // ── 2. Env config snapshot (readonly — sửa cần restart) ──
  const envHtml = `
    <section class="section">
      <h2 class="section-title">🔧 Cấu hình môi trường <span class="line"></span></h2>
      <p style="color:var(--muted);font-size:12.5px;margin:0 0 12px">
        Các giá trị dưới đây đọc từ biến môi trường lúc khởi động server. Sửa = đổi
        env var trên prod rồi restart container.
      </p>
      <div class="panel">
        <div style="padding:12px 14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;font-size:13px">
          <div><div style="color:var(--muted)">Backup khung giờ</div><div style="font-weight:700">${String(r.data.auto_hour).padStart(2,'0')}:00 (server time)</div><small style="color:var(--muted)">env: BACKUP_HOUR</small></div>
          <div><div style="color:var(--muted)">Backup giữ tối đa</div><div style="font-weight:700">${r.data.keep} file</div><small style="color:var(--muted)">env: BACKUP_KEEP</small></div>
          <div><div style="color:var(--muted)">Định dạng dump</div><div style="font-weight:700">${esc(r.data.format || 'pg_dump -Fc')}</div></div>
          <div><div style="color:var(--muted)">Postgres</div><div style="font-weight:700;color:${pgReady ? 'var(--ok)' : 'var(--warn)'}">${pgReady ? '● sẵn sàng' : '● chưa cấu hình'}</div><small style="color:var(--muted)">env: DATABASE_URL</small></div>
          <div style="grid-column:1 / -1"><div style="color:var(--muted)">Thư mục backup</div><div style="font-family:monospace;font-size:12px;word-break:break-all">${esc(r.data.dir)}</div><small style="color:var(--muted)">env: BACKUP_DIR</small></div>
        </div>
      </div>
    </section>`;

  // ── 3. Sao lưu / Phục hồi DB ──
  const pgWarn = pgReady ? '' : `
    <div class="panel" style="margin-bottom:14px;background:rgba(251,146,60,0.08);border-color:rgba(251,146,60,0.4)">
      <div class="panel-title" style="color:var(--warn)">⚠️ Postgres chưa sẵn sàng</div>
      <div style="padding:6px 14px 12px;font-size:13px;line-height:1.55;color:var(--txt)">
        Server không có biến môi trường <code style="background:rgba(0,0,0,.3);padding:1px 5px;border-radius:4px">DATABASE_URL</code>.
        Tính năng <b>Tạo backup</b> / <b>Phục hồi</b> dùng <code>pg_dump</code>/<code>pg_restore</code> → chỉ hoạt động khi server đã chuyển sang Postgres.
        Hiện tại đang chạy SQLite (giai đoạn migration đang dở) — vui lòng set <code>DATABASE_URL</code> rồi restart server.
      </div>
    </div>`;

  const meta = `
    <div class="panel" style="margin-bottom:14px">
      <div class="panel-title">📦 Tóm tắt backup</div>
      <div style="padding:10px 14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;font-size:13px">
        <div><div style="color:var(--muted)">Số file</div><div style="font-weight:700">${items.length}</div></div>
        <div><div style="color:var(--muted)">Tổng dung lượng</div><div style="font-weight:700">${fmtBytes(r.data.total_size)}</div></div>
        <div><div style="color:var(--muted)">Mới nhất</div><div style="font-weight:700">${items[0] ? fmt(items[0].created_at) : '—'}</div></div>
      </div>
    </div>`;

  const disAttr = pgReady ? '' : 'disabled style="opacity:.4;cursor:not-allowed" title="Cần DATABASE_URL"';
  const actions = `
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
      <button class="btn primary" id="do-snapshot" ${disAttr}>📸 Tạo backup ngay</button>
      <label class="btn" style="cursor:${pgReady ? 'pointer' : 'not-allowed'};${pgReady ? '' : 'opacity:.4'}" title="${pgReady ? '' : 'Cần DATABASE_URL'}">
        ⤴️ Phục hồi từ file…
        <input type="file" id="restore-file" accept=".dump,application/octet-stream" style="display:none" ${pgReady ? '' : 'disabled'}>
      </label>
      <button class="btn" id="refresh-bk">↻ Tải lại</button>
    </div>`;

  let body;
  if (!items.length) {
    body = '<div class="empty">Chưa có backup nào. Bấm "Tạo backup ngay" để snapshot lần đầu.</div>';
  } else {
    const rows = items.map((b, i) => `
      <tr>
        <td style="font-family:monospace">${esc(b.name)}</td>
        <td>${fmtBytes(b.size)}</td>
        <td>${fmt(b.created_at)}</td>
        <td class="actions">
          <a class="btn" href="/api/admin/backups/${encodeURIComponent(b.name)}" download title="Tải về">⬇</a>
          <button class="btn" data-restore="${esc(b.name)}" title="Phục hồi từ snapshot này">⤴︎</button>
          <button class="btn danger" data-del="${esc(b.name)}" title="Xoá" ${i === 0 ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>🗑</button>
        </td>
      </tr>`).join('');
    body = `<table><thead><tr><th>Tên file</th><th>Dung lượng</th><th>Tạo lúc</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  const backupSection = `
    <section class="section">
      <h2 class="section-title">💾 Sao lưu / Phục hồi DB <span class="line"></span></h2>
      ${pgWarn}${meta}${actions}${body}
    </section>`;
  $('#tabbody').innerHTML = sysHtml + envHtml + backupSection;

  $('#do-snapshot').onclick = async () => {
    $('#do-snapshot').disabled = true; $('#do-snapshot').textContent = '⏳ Đang sao lưu…';
    const rr = await api('/api/admin/backups', { method:'POST', body: JSON.stringify({ label:'manual' }) });
    if (!rr.ok) return toast('Lỗi: ' + (rr.data?.detail || rr.data?.error || rr.status), 'err');
    toast('✓ Đã tạo ' + rr.data.backup.name); await loadConfig();
  };

  $('#refresh-bk').onclick = () => loadConfig();

  $$('button[data-del]').forEach(btn => {
    btn.onclick = () => {
      const name = btn.dataset.del;
      openConfirm({
        title:'🗑 Xoá backup?',
        msg:'Không thể khôi phục lại. File sẽ bị xoá vĩnh viễn khỏi đĩa.',
        ctx: name,
        onConfirm: async () => {
          const rr = await api(`/api/admin/backups/${encodeURIComponent(name)}`, { method:'DELETE' });
          if (!rr.ok) return toast('Lỗi xoá', 'err');
          toast('✓ Đã xoá ' + name); closeModal(); await loadConfig();
        },
      });
    };
  });

  $$('button[data-restore]').forEach(btn => {
    btn.onclick = () => {
      const name = btn.dataset.restore;
      openConfirm({
        title:'⚠️ Phục hồi từ snapshot?',
        msg:'pg_restore --clean sẽ chạy ngay trên DB đang sống — mọi bảng bị DROP rồi tạo lại từ snapshot. Server tự lưu safety snapshot pre-restore trước khi restore. Có chắc chắn?',
        ctx: name,
        onConfirm: async () => {
          const fr = await fetch(`/api/admin/backups/${encodeURIComponent(name)}`, { credentials:'same-origin' });
          if (!fr.ok) return toast('Không tải được snapshot', 'err');
          const buf = await fr.arrayBuffer();
          const rr = await fetch('/api/admin/restore', {
            method:'POST', credentials:'same-origin',
            headers:{'Content-Type':'application/octet-stream','X-Confirm-Restore':'YES'},
            body: buf,
          });
          const j = await rr.json().catch(()=>({}));
          if (!rr.ok) return toast('Lỗi: ' + (j.detail || j.error || rr.status), 'err');
          toast('✓ Đã phục hồi · safety=' + (j.safety_backup || '—')); closeModal(); await loadConfig();
        },
      });
    };
  });

  const fileInput = $('#restore-file');
  if (fileInput) {
    fileInput.onchange = async (e) => {
      const file = e.target.files?.[0]; if (!file) return;
      if (!/\.dump$/i.test(file.name)) { toast('Chỉ nhận file .dump (pg_dump -Fc)', 'err'); fileInput.value=''; return; }
      openConfirm({
        title:'⚠️ Phục hồi từ file upload?',
        msg:'pg_restore --clean sẽ chạy ngay — bảng hiện tại bị DROP rồi tạo lại từ file upload. Server tự lưu safety snapshot pre-restore. Có chắc chắn?',
        ctx: `${file.name} · ${fmtBytes(file.size)}`,
        onConfirm: async () => {
          const buf = await file.arrayBuffer();
          const rr = await fetch('/api/admin/restore', {
            method:'POST', credentials:'same-origin',
            headers:{'Content-Type':'application/octet-stream','X-Confirm-Restore':'YES'},
            body: buf,
          });
          const j = await rr.json().catch(()=>({}));
          if (!rr.ok) return toast('Lỗi: ' + (j.message || j.detail || j.error || rr.status), 'err');
          toast('✓ Đã phục hồi · safety=' + (j.safety_backup || '—')); closeModal(); fileInput.value=''; await loadConfig();
        },
      });
    };
  }
}

// loadSimple variant có cột "Xoá" cuối row (dùng cho content)
async function loadSimpleWithDelete(path, key, cols, fmtMap = {}, deleteBase, entityLabel) {
  const r = await api(path);
  const rows = r.data[key] || [];
  if (!rows.length) { $('#tabbody').innerHTML = '<div class="empty">Chưa có dữ liệu.</div>'; return; }
  const head = cols.map(c=>`<th>${c}</th>`).join('') + '<th></th>';
  const body = rows.map(row => '<tr>' + cols.map(c => {
    let v = row[c]; if (fmtMap[c]) v = fmtMap[c](v);
    if (['status','plan','role','action','decided_by'].includes(c)) v = `<span class="pill ${row[c]||''}">${v??''}</span>`;
    return `<td>${v ?? '—'}</td>`;
  }).join('') + `<td class="actions"><button class="btn danger" data-rid="${row.id}" title="Xoá">🗑</button></td>` + '</tr>').join('');
  $('#tabbody').innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  $$('[data-rid]').forEach(b => {
    b.addEventListener('click', () => {
      const id = Number(b.dataset.rid);
      const row = rows.find(x => x.id === id);
      openConfirm({
        title: `🗑 Xoá ${entityLabel}?`,
        msg: 'Hành động không thể undo.',
        ctx: `id=${row.id}` + (row.title ? ' · ' + row.title.slice(0, 80) : ''),
        onConfirm: async () => {
          const dr = await api(`${deleteBase}/${id}`, { method:'DELETE' });
          if (!dr.ok) return toast('Lỗi: ' + (dr.data?.message || dr.data?.error || dr.status), 'err');
          toast('✓ Đã xoá');
          closeModal();
          await TABS[currentTab].load();
        },
      });
    });
  });
}

function renderTabBar() {
  const tabsHtml = Object.entries(TABS).map(([k,v]) => {
    const badge = v.badge ? `<span class="count">${v.badge()}</span>` : '';
    return `<button class="tab ${k === currentTab ? 'active' : ''}" data-k="${k}">${v.label}${badge}</button>`;
  }).join('')
    // Link ra trang sửa nội dung học (curriculum_content) — không phải tab SPA.
    + `<a class="tab" href="/admin-curriculum.html" title="Sửa nóng quiz + lý thuyết trong DB">✏️ Sửa nội dung</a>`;
  const bar = $('#tabs');
  if (bar) bar.innerHTML = tabsHtml;
}

// Đọc tab từ location.hash (vd #schools). Trả null nếu hash không match tab nào.
function tabFromHash() {
  const h = (location.hash || '').replace(/^#/, '').trim();
  return TABS[h] ? h : null;
}

async function showTab(key) {
  if (!TABS[key]) key = 'dashboard';
  currentTab = key;
  // Sync URL hash để F5 / share link giữ nguyên tab. Dùng replaceState để
  // không spam history; dashboard ẩn hash (URL sạch).
  const want = key === 'dashboard' ? '' : '#' + key;
  if (location.hash !== want) {
    try { history.replaceState(null, '', location.pathname + location.search + want); } catch {}
  }
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.k === key));
  $('#tabbody').innerHTML = '<div class="loading">⏳ Đang tải…</div>';
  try {
    await TABS[key].load();
    // Cập nhật badge "Góp ý" sau khi load xong (vd: requests tab vừa fetch lại reqCache)
    const reqBadge = document.querySelector('.tab[data-k="requests"] .count');
    if (reqBadge && TABS.requests.badge) reqBadge.textContent = TABS.requests.badge();
  } catch(e) {
    $('#tabbody').innerHTML = `<div class="err">Lỗi: ${e.message}</div>`;
  }
}

async function refresh() {
  const btn = $('#refreshBtn');
  btn?.classList.add('spin');
  try { await showTab(currentTab); }
  catch(e) { if (e.message !== 'login') console.error(e); }
  finally { setTimeout(() => $('#refreshBtn')?.classList.remove('spin'), 400); }
}

// ─────────── Init ───────────
// Inject ADMIN badge + live-dot vào breadcrumb của auth-header
function injectAdminBadge() {
  const crumbs = document.querySelector('.ev-header .ev-crumbs');
  if (!crumbs) return;
  if (crumbs.querySelector('.badge')) return; // đã inject rồi
  crumbs.insertAdjacentHTML('beforeend',
    `<span class="badge" style="margin-left:8px">ADMIN</span>` +
    `<span class="live-dot" title="Live — auto refresh 60s" style="margin-left:8px"></span>`
  );
}
document.addEventListener('ev-header-mounted', injectAdminBadge, { once: true });

async function init() {
  const meR = await api('/api/auth/me');

  // Render shell một lần — tab bar lớn + container nội dung
  $('#app').innerHTML = `
    <div class="tabs" id="tabs"></div>
    <div id="tabbody"><div class="loading">⏳ Đang tải…</div></div>
  `;
  renderTabBar();
  $('#tabs').addEventListener('click', e => {
    const t = e.target.closest('.tab');
    if (t && t.dataset.k) showTab(t.dataset.k);
  });

  // Hash routing: F5 / back-forward / paste link → giữ tab. Khởi động lấy
  // tab từ URL hash, tự sync khi user bấm back/forward.
  const startTab = tabFromHash() || 'dashboard';
  window.addEventListener('hashchange', () => {
    const t = tabFromHash();
    if (t && t !== currentTab) showTab(t);
  });
  await showTab(startTab);

  // Auto-refresh 60s (chỉ reload tab hiện tại)
  setInterval(refresh, 60_000);

  // Manual refresh
  $('#refreshBtn')?.addEventListener('click', refresh);
  document.addEventListener('keydown', e => {
    if (e.key === 'r' && !e.metaKey && !e.ctrlKey && !['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) {
      refresh();
    }
    if (e.key === 'Escape') closeModal();
  });

  // Modal wiring
  $('#modal-bg').addEventListener('click', e => { if (e.target === $('#modal-bg')) closeModal(); });
  $('#modal-cancel').addEventListener('click', closeModal);
  $('#modal-submit').addEventListener('click', submitReply);
  $('#modal-role-cancel').addEventListener('click', closeModal);
  $('#modal-role-submit').addEventListener('click', submitRole);

  // CRUD modals
  $('#cu-cancel').addEventListener('click', closeModal);
  $('#cu-submit').addEventListener('click', submitCreateUser);
  $('#eu-cancel').addEventListener('click', closeModal);
  $('#eu-submit').addEventListener('click', submitEditUser);
  $('#rp-cancel').addEventListener('click', closeModal);
  $('#rp-submit').addEventListener('click', submitResetPwd);
  $('#ew-cancel').addEventListener('click', closeModal);
  $('#ew-submit').addEventListener('click', submitWallet);
  $('#rp-gen').addEventListener('click', () => { $('#rp-password').value = genPassword(16); });
  $('#cf-cancel').addEventListener('click', closeModal);

  // School admin overlay (5 tab: campus/apps/curriculum/admins/users)
  $('#school-close-btn').addEventListener('click', closeSchoolOverlay);
  $('#campus-save-btn').addEventListener('click', saveCampusLayout);
  $('#campus-reset-btn').addEventListener('click', () => _campusEditorDomain && resetCampusLayout(_campusEditorDomain));

  // Logout
  $('#logoutBtn')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method:'POST', credentials:'same-origin' });
    location.href = '/login.html';
  });
}

init();
