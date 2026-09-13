'use client';

// Chuông 🔔 phản hồi từ Ban điều hành AI — bản React, port từ vanilla
// public/js/notifications-bell.js (vanilla vẫn dùng cho trang legacy Express).
// Mount TRỰC TIẾP trong SiteHeader (không còn trò đợi #ev-bell-slot của bản
// vanilla). Guest / backend tắt → probe 401 → không render gì.
// Style: class nbell-* trong app/widgets.css. Container giữ id="nbell-root"
// để script vanilla (nếu còn bị chèn) thấy đã có widget và tự bỏ qua.

import { useCallback, useEffect, useRef, useState } from 'react';
import { fmtTime, getPlayerName } from '@/lib/request-board';
import RequestThread from './RequestThread';

const POLL_MS = 60_000;

type Notif = {
  id: number | string;
  request_id?: number | null;
  title?: string;
  body?: string;
  url?: string;
  read_at?: number | null;
  created_at: number;
};

async function api(path: string, opts: RequestInit = {}) {
  const r = await fetch(path, { credentials: 'same-origin', ...opts });
  return { ok: r.ok, status: r.status, data: r.ok ? await r.json().catch(() => ({})) : null };
}

function urlB64ToUint8(b64: string) {
  const pad = '='.repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export default function NotificationsBell() {
  const [enabled, setEnabled] = useState(false); // probe OK mới hiện
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushOn, setPushOn] = useState(false);
  const [pushBusy, setPushBusy] = useState(false);
  // Yêu cầu đang mở xem chi tiết (bấm vào thông báo gắn với 1 yêu cầu).
  const [detailId, setDetailId] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<PushSubscription | null>(null);

  const refresh = useCallback(async () => {
    const r = await api('/api/notifications?limit=20');
    if (!r.ok) return;
    setItems(r.data?.items || []);
    setUnread(r.data?.unread || 0);
  }, []);

  // Probe 1 lần: guest (401) hoặc backend tắt → ẩn luôn.
  useEffect(() => {
    let alive = true;
    api('/api/notifications?limit=1').then((probe) => {
      if (!alive || !probe.ok) return;
      setEnabled(true);
      setItems(probe.data?.items || []);
      setUnread(probe.data?.unread || 0);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Polling nhẹ — refresh count mỗi 60s khi tab hiển thị.
  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => {
      if (!document.hidden) refresh();
    }, POLL_MS);
    return () => clearInterval(t);
  }, [enabled, refresh]);

  // Đóng panel khi bấm ra ngoài / Esc.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Web Push — chỉ hiện hàng bật/tắt khi trình duyệt hỗ trợ + đã có service worker.
  useEffect(() => {
    if (!enabled) return;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    let alive = true;
    navigator.serviceWorker.ready.then(async (reg) => {
      if (!alive) return;
      subRef.current = await reg.pushManager.getSubscription();
      setPushSupported(true);
      setPushOn(!!subRef.current);
    });
    return () => {
      alive = false;
    };
  }, [enabled]);

  async function togglePush() {
    setPushBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      if (subRef.current) {
        await subRef.current.unsubscribe().catch(() => {});
        subRef.current = null;
        await api('/api/notif/unsubscribe', { method: 'POST' });
      } else {
        if ((await Notification.requestPermission()) !== 'granted') return;
        const k = await api('/api/notif/vapid-key');
        if (!k.ok || !k.data?.key) return;
        subRef.current = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8(k.data.key) as unknown as BufferSource,
        });
        const j = subRef.current.toJSON();
        await api('/api/notif/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: j.endpoint, p256dh: j.keys?.p256dh, auth: j.keys?.auth }),
        });
        api('/api/notif/test', { method: 'POST' }).catch(() => {});
      }
    } finally {
      setPushBusy(false);
      setPushOn(!!subRef.current);
    }
  }

  function onItemClick(it: Notif) {
    if (!it.read_at) {
      setItems((prev) => prev.map((x) => (x.id === it.id ? { ...x, read_at: Date.now() } : x)));
      setUnread((u) => Math.max(0, u - 1));
      api(`/api/notifications/${it.id}/read`, { method: 'POST' }).catch(() => {});
    }
    // Thông báo gắn với 1 yêu cầu → mở ngay chi tiết yêu cầu đó (nội dung đã gửi,
    // file đính kèm, phản hồi) thay vì đưa về bảng yêu cầu chung của trường.
    if (it.request_id) {
      setOpen(false);
      setDetailId(Number(it.request_id));
      return;
    }
    if (it.url) setTimeout(() => (location.href = it.url!), 80);
  }

  useEffect(() => {
    if (detailId == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailId(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [detailId]);

  function onReadAll() {
    if (unread === 0) return;
    setUnread(0);
    setItems((prev) => prev.map((it) => ({ ...it, read_at: it.read_at || Date.now() })));
    api('/api/notifications/read-all', { method: 'POST' }).catch(() => {});
  }

  if (!enabled) return null;

  return (
    <div id="nbell-root" className="nbell-root--in-header" ref={rootRef}>
      <button
        className="nbell-btn"
        type="button"
        aria-label="Phản hồi từ Ban điều hành AI"
        title="Phản hồi từ Ban điều hành AI"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => {
            if (!o) refresh();
            return !o;
          });
        }}
      >
        <span className="nbell-ico">🔔</span>
        {unread > 0 && <span className="nbell-badge">{unread > 99 ? '99+' : unread}</span>}
      </button>

      {open && (
        <div className="nbell-panel">
          <div className="nbell-head">
            <span className="nbell-title">🏛️ Ban điều hành AI phản hồi</span>
            <button className="nbell-readall" type="button" onClick={onReadAll}>
              Đánh dấu đã đọc
            </button>
          </div>
          <div className="nbell-list">
            {!items.length ? (
              <div className="nbell-empty">Chưa có phản hồi nào. Gửi đề nghị qua nút 🏛️ ở góc trái bên dưới.</div>
            ) : (
              items.map((it) => (
                <div
                  key={String(it.id)}
                  className={`nbell-item ${it.read_at ? 'read' : 'unread'}`}
                  onClick={() => onItemClick(it)}
                >
                  <div className="nbell-item-title">{it.title || ''}</div>
                  {it.body && <div className="nbell-item-body">{it.body}</div>}
                  <div className="nbell-item-time">{fmtTime(it.created_at)}</div>
                </div>
              ))
            )}
          </div>
          {pushSupported && (
            <div className="nbell-foot">
              <span className="nbell-foot-label">📲 Nhắc học trên thiết bị</span>
              <button
                className={`nbell-push-toggle${pushOn ? ' on' : ''}`}
                type="button"
                disabled={pushBusy}
                onClick={togglePush}
              >
                {pushOn ? 'Đang bật ✓' : 'Bật'}
              </button>
            </div>
          )}
        </div>
      )}

      {detailId != null && (
        <div className="rqd-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sgf-backdrop" onClick={() => setDetailId(null)} />
          <div className="rqd-dialog" role="dialog" aria-modal="true" aria-label="Chi tiết yêu cầu">
            <div className="rqd-head">
              <span>🏛️ Yêu cầu gửi Ban điều hành AI</span>
              <button type="button" className="sgf-x" onClick={() => setDetailId(null)} aria-label="Đóng">✕</button>
            </div>
            <RequestThread requestId={detailId} me={getPlayerName()} onChange={refresh} showTitle />
          </div>
        </div>
      )}
    </div>
  );
}
