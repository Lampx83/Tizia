// ============================================================
// Cookie consent banner cho Tizia — ĐÃ TẮT theo yêu cầu user (jun 2026)
// ============================================================
// Banner che nội dung trên các trang chính (cây tri thức, bản đồ VN, mini-games).
// File giữ lại để tương thích import cũ nhưng KHÔNG render gì + dọn dẹp banner
// cũ nếu lỡ có (page cached cũ). Khôi phục bằng cách xoá `return` ở dưới + bỏ
// CSS hide trong dọn-dẹp.
// ============================================================

(function () {
  if (window.__tiziaConsentBannerLoaded) return;
  window.__tiziaConsentBannerLoaded = true;

  // Dọn dẹp banner cũ nếu page cached có sẵn DOM.
  try {
    const old = document.getElementById('tz-consent-banner');
    if (old) old.remove();
    const fab = document.getElementById('tz-consent-fab');
    if (fab) fab.remove();
  } catch {}
  return; // ← short-circuit, không render banner mới

  // Một số trang opt-out qua <body data-no-consent-banner> (vd: campus iframe
  // không phải top-level — banner của trang chính đã handle).
  const optOut = document.body && document.body.hasAttribute('data-no-consent-banner');
  if (optOut) return;

  // Iframe nhúng (campus, app anh em) không cần banner riêng — parent đã có.
  if (window.top !== window.self) return;

  const decided = window.tiziaGetConsent && window.tiziaGetConsent();
  injectFab();
  if (!decided) injectBanner();

  function injectBanner() {
    if (document.getElementById('tz-consent-banner')) return;
    const box = document.createElement('div');
    box.id = 'tz-consent-banner';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Thoả thuận sử dụng cookie');
    box.innerHTML = `
      <style>
        #tz-consent-banner {
          position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 99998;
          max-width: 720px; margin: 0 auto;
          background: rgba(15, 23, 42, 0.97); color: #e5edf7;
          border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 14px;
          padding: 16px 18px; font: 14px/1.5 Inter, system-ui, sans-serif;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
          display: flex; flex-direction: column; gap: 12px;
        }
        #tz-consent-banner .tz-cc-title {
          font-weight: 700; font-size: 15px; display: flex; gap: 8px; align-items: center;
        }
        #tz-consent-banner p { margin: 0; opacity: 0.85; }
        #tz-consent-banner a { color: #7dd3fc; text-decoration: underline; }
        #tz-consent-banner .tz-cc-actions {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;
        }
        #tz-consent-banner button {
          flex: 1 1 auto; min-width: 130px;
          padding: 9px 14px; border-radius: 9px; border: 1px solid transparent;
          font: 600 13.5px Inter, system-ui, sans-serif; cursor: pointer;
          transition: filter .12s, background .12s;
        }
        #tz-consent-banner .tz-cc-accept { background: #38bdf8; color: #0b1220; }
        #tz-consent-banner .tz-cc-accept:hover { filter: brightness(1.08); }
        #tz-consent-banner .tz-cc-min { background: rgba(255,255,255,.08); color: #e5edf7; border-color: rgba(255,255,255,.18); }
        #tz-consent-banner .tz-cc-min:hover { background: rgba(255,255,255,.14); }
        #tz-consent-banner .tz-cc-custom { background: transparent; color: #e5edf7; border-color: rgba(255,255,255,.18); }
        #tz-consent-banner .tz-cc-custom:hover { background: rgba(255,255,255,.06); }

        #tz-consent-banner.tz-cc-panel .tz-cc-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: 8px 0; border-top: 1px solid rgba(255,255,255,.08);
        }
        #tz-consent-banner.tz-cc-panel .tz-cc-row:first-of-type { border-top: 0; }
        #tz-consent-banner.tz-cc-panel .tz-cc-row b { font-size: 13.5px; }
        #tz-consent-banner.tz-cc-panel .tz-cc-row small { display: block; opacity: 0.7; font-size: 12px; }
        #tz-consent-banner .tz-sw { position: relative; width: 38px; height: 22px; flex: 0 0 38px;
          background: rgba(255,255,255,.18); border-radius: 999px; cursor: pointer; transition: background .15s; }
        #tz-consent-banner .tz-sw[aria-disabled="true"] { opacity: 0.6; cursor: not-allowed; }
        #tz-consent-banner .tz-sw::after { content: ""; position: absolute; top: 2px; left: 2px;
          width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: left .15s; }
        #tz-consent-banner .tz-sw[aria-checked="true"] { background: #22c55e; }
        #tz-consent-banner .tz-sw[aria-checked="true"]::after { left: 18px; }

        #tz-consent-fab {
          position: fixed; right: 14px; bottom: 14px; z-index: 99997;
          width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255,255,255,.18);
          background: rgba(15,23,42,.85); color: #e5edf7; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,.4);
          opacity: 0.55; transition: opacity .15s, transform .15s;
        }
        #tz-consent-fab:hover { opacity: 1; transform: scale(1.08); }
        @media (max-width: 560px) {
          #tz-consent-banner button { flex-basis: 100%; }
        }
      </style>
      <div class="tz-cc-title">🍪 Tizia dùng cookie để cải thiện trải nghiệm</div>
      <p>Chúng tôi dùng cookie cần thiết để giữ phiên đăng nhập, và cookie phân tích
        (Google Analytics) để hiểu cách bạn dùng nền tảng, qua đó cải thiện bài học.
        Bạn có thể đổi lựa chọn bất kỳ lúc nào qua nút 🛡️ ở góc phải.</p>
      <div class="tz-cc-actions">
        <button class="tz-cc-accept" type="button">Đồng ý tất cả</button>
        <button class="tz-cc-min" type="button">Chỉ cần thiết</button>
        <button class="tz-cc-custom" type="button">Tuỳ chỉnh</button>
      </div>
    `;
    document.body.appendChild(box);

    box.querySelector('.tz-cc-accept').addEventListener('click', () => decide(true));
    box.querySelector('.tz-cc-min').addEventListener('click', () => decide(false));
    box.querySelector('.tz-cc-custom').addEventListener('click', () => renderCustomPanel(box));
  }

  function renderCustomPanel(box) {
    box.classList.add('tz-cc-panel');
    const current = (window.tiziaGetConsent && window.tiziaGetConsent()) === 'granted';
    box.innerHTML = `
      <div class="tz-cc-title">🛡️ Tuỳ chỉnh cookie</div>
      <div class="tz-cc-row">
        <div>
          <b>Cần thiết</b>
          <small>Cookie phiên đăng nhập, bảo mật: luôn bật để hệ thống chạy.</small>
        </div>
        <div class="tz-sw" aria-checked="true" aria-disabled="true" role="switch"></div>
      </div>
      <div class="tz-cc-row" id="tz-cc-row-an">
        <div>
          <b>Phân tích (Google Analytics)</b>
          <small>Đếm lượt truy cập, đo hành vi học tập ẩn danh để cải thiện bài giảng. IP được ẩn.</small>
        </div>
        <div class="tz-sw" id="tz-cc-sw-an" aria-checked="${current ? 'true' : 'false'}" role="switch" tabindex="0"></div>
      </div>
      <div class="tz-cc-actions">
        <button class="tz-cc-accept" type="button">Lưu lựa chọn</button>
      </div>
    `;
    // Re-apply listeners (innerHTML đã wipe).
    const sw = box.querySelector('#tz-cc-sw-an');
    sw.addEventListener('click', () => {
      const next = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(next));
    });
    sw.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); sw.click(); }
    });
    box.querySelector('.tz-cc-accept').addEventListener('click', () => {
      decide(sw.getAttribute('aria-checked') === 'true');
    });
  }

  function decide(granted) {
    try { window.tiziaSetConsent && window.tiziaSetConsent(granted); } catch {}
    const box = document.getElementById('tz-consent-banner');
    if (box) box.remove();
    // Bắn 1 event xác nhận để admin biết tỷ lệ chọn — nhưng chỉ khi granted
    // (denied không bắn để tôn trọng lựa chọn).
    if (granted && window.tiziaTrack) {
      window.tiziaTrack('consent_grant', { source: 'banner' });
    }
  }

  function injectFab() {
    if (document.getElementById('tz-consent-fab')) return;
    const fab = document.createElement('button');
    fab.id = 'tz-consent-fab';
    fab.type = 'button';
    fab.title = 'Cài đặt cookie';
    fab.setAttribute('aria-label', 'Mở cài đặt cookie');
    fab.textContent = '🛡️';
    fab.addEventListener('click', () => {
      const existing = document.getElementById('tz-consent-banner');
      if (existing) existing.remove();
      injectBanner();
    });
    // Append sau khi DOM body sẵn sàng.
    if (document.body) document.body.appendChild(fab);
    else document.addEventListener('DOMContentLoaded', () => document.body.appendChild(fab), { once: true });
  }
})();
