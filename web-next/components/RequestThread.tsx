'use client';

// Phiên trao đổi của 1 yêu cầu gửi Ban điều hành AI — bản React, port từ
// public/js/request-thread.js (vanilla vẫn dùng cho trang legacy Express).
// Luồng: tin mở đầu của HS → phản hồi Ban điều hành AI → HS trao đổi tiếp…
// Trao đổi BẤT ĐỒNG BỘ: HS gửi → Ban điều hành AI trả lời sau → chuông báo.
// Style: class rt-* trong app/widgets.css (giữ nguyên giao diện bản vanilla).

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  REQUEST_STATUS,
  fmtTime,
  type Attachment,
  type ThreadMessage,
} from '@/lib/request-board';

type ThreadData = {
  request: { id?: number; status?: string; student?: string; title?: string; created_at?: number };
  messages: ThreadMessage[];
};

function Atts({ atts }: { atts?: Attachment[] }) {
  const list = Array.isArray(atts) ? atts : [];
  if (!list.length) return null;
  return (
    <div className="rt-att">
      {list.map((a, i) => {
        const isImg = /^image\//.test(a.mime || '');
        if (isImg) {
          return (
            <a key={i} className="rt-att-thumb" href={a.url} target="_blank" rel="noopener noreferrer" title={a.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={a.url} alt={a.name} />
            </a>
          );
        }
        return (
          <a key={i} className="rt-att-file" href={a.url} target="_blank" rel="noopener noreferrer" download={a.name}>
            {a.kind === 'screenshot' ? '📸' : '📎'} {a.name}
          </a>
        );
      })}
    </div>
  );
}

export default function RequestThread({
  requestId,
  me = '',
  onChange,
  showTitle = false,
}: {
  requestId: number | string;
  me?: string;
  onChange?: () => void;
  /** Hiện tiêu đề yêu cầu ở đầu — dùng khi mở riêng (từ chuông thông báo). */
  showTitle?: boolean;
}) {
  const [data, setData] = useState<ThreadData | null>(null);
  const [failed, setFailed] = useState(false);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/requests/${requestId}/thread`);
      if (!r.ok) throw new Error('http ' + r.status);
      setData(await r.json());
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [requestId]);

  useEffect(() => {
    load();
  }, [load]);

  // Cuộn xuống tin mới nhất mỗi khi danh sách thay đổi.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [data]);

  if (failed) return <div className="rt-root"><div className="rt-loading">Không tải được phiên trao đổi.</div></div>;
  if (!data) return <div className="rt-root"><div className="rt-loading">Đang tải phiên trao đổi…</div></div>;

  const req = data.request || {};
  const msgs = Array.isArray(data.messages) ? data.messages : [];
  const sm = REQUEST_STATUS[req.status || ''] || REQUEST_STATUS.pending;
  const isOwner = !!me && me === req.student;
  const closed = req.status === 'done' || req.status === 'rejected';

  async function submit() {
    const text = body.trim();
    if (!text) {
      setMsg('⚠️ Nhập nội dung trước khi gửi');
      return;
    }
    setSending(true);
    setMsg('Đang gửi…');
    try {
      const r = await fetch(`/api/requests/${requestId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ body: text }),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        setMsg(
          '⚠️ ' +
            (e.error === 'forbidden'
              ? 'Chỉ chủ yêu cầu mới trao đổi được'
              : e.error === 'empty'
                ? 'Nội dung trống'
                : e.error || 'Không gửi được'),
        );
        return;
      }
      setBody('');
      setMsg('');
      await load();
      onChange?.();
    } catch {
      setMsg('⚠️ Lỗi mạng — thử lại sau.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rt-root">
      {showTitle && req.title && (
        <div className="rt-title">
          #{req.id} · {req.title}
          {req.created_at ? <small>Gửi {fmtTime(req.created_at)}</small> : null}
        </div>
      )}
      <div className="rt-head">
        <span className={`rt-status ${sm.cls}`}>{sm.label}</span>
        <span className="rt-count">{msgs.length} tin nhắn</span>
      </div>
      <div className="rt-list" ref={listRef}>
        {msgs.map((m, i) => {
          const isBoard = m.role === 'ai' || m.role === 'admin';
          const mine = m.role === 'student' && !!me && m.author_name === me;
          return (
            <div key={i} className={`rt-msg ${m.role === 'student' ? 'rt-right' : 'rt-left'} ${isBoard ? 'rt-board' : 'rt-student'}`}>
              <div className="rt-bubble">
                <div className="rt-who">
                  {isBoard
                    ? `🏛️ ${m.author_name || 'Ban điều hành AI'}`
                    : `👤 ${m.author_name || 'Học sinh'}${mine ? ' (bạn)' : ''}`}
                </div>
                <div className="rt-body">{m.body}</div>
                <Atts atts={m.attachments} />
                <div className="rt-time">{fmtTime(m.created_at)}</div>
              </div>
            </div>
          );
        })}
      </div>
      {isOwner ? (
        <form
          className="rt-composer"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          {closed && (
            <div className="rt-reopen-note">
              Yêu cầu đã đóng — gửi thêm sẽ <b>mở lại</b> để Ban điều hành xem tiếp.
            </div>
          )}
          <textarea
            className="rt-input"
            rows={2}
            maxLength={10000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Trao đổi tiếp với Ban điều hành AI… (Enter để gửi, Shift+Enter xuống dòng)"
          />
          <div className="rt-composer-bar">
            <span className="rt-cmsg">{msg}</span>
            <button type="submit" className="rt-send" disabled={sending}>
              Gửi 📨
            </button>
          </div>
        </form>
      ) : !me ? (
        <div className="rt-login-hint">Đăng nhập để trao đổi với Ban điều hành AI.</div>
      ) : null}
    </div>
  );
}
