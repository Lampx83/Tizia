// ============================================================
// Google Analytics 4 loader cho Tizia
// ============================================================
// • Đọc cấu hình từ /api/analytics/bootstrap (Measurement ID + user info)
// • Consent Mode v2: mặc định denied cho analytics_storage / ad_storage,
//   chờ banner đồng ý (xem consent-banner.js).
// • Expose window.tiziaTrack(name, props) cho mọi module client gọi.
// • Tự bắn page_view cho SPA-like navigation (history.pushState) — Tizia
//   chủ yếu MPA nên gtag tự bắn page_view khi load, ta chỉ patch SPA.
// ============================================================

(function () {
  if (window.__tiziaAnalyticsLoaded) return;
  window.__tiziaAnalyticsLoaded = true;

  // dataLayer + gtag stub — phải có trước khi gtag.js load để buffer event.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());

  // Consent Mode v2 — mặc định DENIED cho analytics + ads, chờ banner đồng ý.
  // 'security_storage' và 'functionality_storage' luôn 'granted' (cần để hệ
  // thống chạy, không liên quan đo lường). 'wait_for_update' = 500ms — gtag
  // sẽ chờ update consent trước khi gửi event đầu tiên (tránh race).
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });

  // Đọc consent đã lưu từ cookie tizia_consent — nếu user đã quyết định từ
  // session trước, áp dụng ngay (banner sẽ không hiện lại).
  applySavedConsent();

  // Buffer event bắn trước khi gtag config xong → flush sau khi bootstrap về.
  const pending = [];
  let ready = false;
  let cfg = null;

  /** Public API: track 1 event. Tự buffer nếu gtag chưa config. */
  window.tiziaTrack = function (name, params) {
    if (!name || typeof name !== 'string') return;
    const payload = Object.assign({}, params || {});
    if (!ready) { pending.push([name, payload]); return; }
    try { gtag('event', name, payload); } catch {}
  };

  // Bootstrap: hỏi server measurementId + user info → init gtag.
  // Pageview internal (về analytics_events) bắn độc lập với GA4 — không phụ
  // thuộc measurementId, không cần consent banner (chỉ ghi path + ref + title,
  // không cookie tracking).
  fetch('api/analytics/bootstrap', { credentials: 'same-origin' })
    .then(r => r.ok ? r.json() : null)
    .then(b => {
      sendInternalPageview();
      if (!b || !b.measurementId) {
        // GA chưa cấu hình → không load gtag.js, vẫn buffer track() để debug.
        ready = true;
        if (window.__TIZIA_GA_DEBUG__) console.warn('[analytics] GA_MEASUREMENT_ID chưa set: bỏ qua.');
        return;
      }
      cfg = b;
      loadGtagScript(b.measurementId);
      configureGtag(b);
    })
    .catch(() => { ready = true; sendInternalPageview(); });

  // ── Internal pageview (gửi về /api/track/pageview) ──
  // Persist anon_id ~ 1 năm để đếm unique visitor ổn định. Không lấy localStorage
  // được (Safari ITP / private mode) → fallback sessionStorage rồi in-memory.
  function getAnonId() {
    const KEY = 'tizia_anon_id';
    try {
      let v = localStorage.getItem(KEY);
      if (v) return v;
      v = (crypto.randomUUID?.() || (Date.now().toString(36) + Math.random().toString(36).slice(2)));
      localStorage.setItem(KEY, v);
      return v;
    } catch {
      try {
        let v = sessionStorage.getItem(KEY);
        if (v) return v;
        v = (crypto.randomUUID?.() || (Date.now().toString(36) + Math.random().toString(36).slice(2)));
        sessionStorage.setItem(KEY, v);
        return v;
      } catch {
        return window.__tiziaAnonMem || (window.__tiziaAnonMem = 'mem-' + Math.random().toString(36).slice(2));
      }
    }
  }

  let lastPvPath = null;
  function sendInternalPageview() {
    try {
      const path = location.pathname + location.search;
      if (path === lastPvPath) return;          // SPA pushState đôi khi bắn 2 lần
      lastPvPath = path;
      const payload = {
        path,
        referrer: document.referrer || null,
        title: document.title || null,
        lang: document.documentElement.lang || null,
        anonId: getAnonId(),
      };
      const body = JSON.stringify(payload);
      const url = 'api/track/pageview';
      // sendBeacon = không bị huỷ khi user navigate ngay; fallback fetch keepalive.
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      } else {
        fetch(url, {
          method: 'POST', credentials: 'same-origin', keepalive: true,
          headers: { 'Content-Type': 'application/json' }, body,
        }).catch(() => {});
      }
    } catch {}
  }

  // SPA-like nav (history.pushState) — Tizia chủ yếu MPA nên ít khi cần,
  // nhưng các widget có thể đổi URL ?subject=… → đếm thành lượt view khác.
  const _push = history.pushState;
  history.pushState = function () {
    const r = _push.apply(this, arguments);
    setTimeout(sendInternalPageview, 0);
    return r;
  };
  window.addEventListener('popstate', () => setTimeout(sendInternalPageview, 0));

  function loadGtagScript(id) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }

  function configureGtag(b) {
    // anonymize_ip: GDPR friendly. send_page_view: true (default) — tự bắn pageview.
    const config = {
      anonymize_ip: true,
      send_page_view: true,
    };
    if (b.userId) config.user_id = String(b.userId);
    gtag('config', b.measurementId, config);

    // user_properties — custom dimension cho phân tích theo trường, role, plan.
    const props = {};
    if (b.schoolId)   props.school_id = String(b.schoolId);
    if (b.schoolCode) props.school_code = String(b.schoolCode);
    if (b.role)       props.role = String(b.role);
    if (b.plan)       props.plan = String(b.plan);
    if (b.isGuest)    props.is_guest = '1';
    if (Object.keys(props).length) gtag('set', 'user_properties', props);

    ready = true;
    // Flush buffered event.
    for (const [n, p] of pending.splice(0)) {
      try { gtag('event', n, p); } catch {}
    }
  }

  // ── Consent helpers (banner dùng) ──
  window.tiziaSetConsent = function (granted) {
    const state = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
    // Lưu 180 ngày — đủ lâu để khỏi spam banner, đủ ngắn để re-confirm khi
    // pháp lý đổi (TT về bảo vệ dữ liệu trẻ em VN còn đang hoàn thiện).
    setCookie('tizia_consent', granted ? '1' : '0', 180);
  };

  window.tiziaGetConsent = function () {
    const v = getCookie('tizia_consent');
    if (v === '1') return 'granted';
    if (v === '0') return 'denied';
    return null;
  };

  function applySavedConsent() {
    const v = getCookie('tizia_consent');
    if (v !== '1' && v !== '0') return;
    const state = v === '1' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }

  function setCookie(name, value, days) {
    const exp = new Date(Date.now() + days * 24 * 3600 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Expires=${exp}; SameSite=Lax`;
  }
  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
})();
