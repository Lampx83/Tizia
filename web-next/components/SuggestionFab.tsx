'use client';

// Nút "🏛️ Đề nghị" + modal gửi yêu cầu tới Ban điều hành AI — bản REACT,
// port đầy đủ từ vanilla public/js/suggestion-fab.js (bản vanilla vẫn dùng cho
// trang legacy Express; trang Next dùng component này — hết phụ thuộc nginx
// sub_filter chèn script + bump cache-bust).
//
// Hành vi giữ nguyên bản gốc:
//   • Chỉ hiện khi đang TRONG một trường (resolveSchoolDomain — sessionStorage
//     'tizia_school_domain'); đề nghị gắn đúng domain trường đó.
//   • Form: loại + tiêu đề + mô tả (đếm ký tự) + đính kèm (file, kéo-thả, dán
//     ảnh Ctrl/⌘+V, ảnh chụp màn hình qua html2canvas CDN).
//   • Hộp thư: yêu cầu của tôi (lọc theo tên) + thread trao đổi từng yêu cầu.
// Style: class sgf-* trong app/widgets.css (copy 1:1 từ bản vanilla).
// Container giữ id="sgf-root" để script vanilla (nếu còn bị chèn ở đâu đó)
// thấy đã có widget và tự bỏ qua — không bao giờ hiện 2 nút.

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import RequestThread from './RequestThread';
import {
  REQUEST_STATUS,
  REQUEST_TYPES,
  getPlayerName,
  resolveSchoolDomain,
  type Attachment,
  type RequestItem,
} from '@/lib/request-board';

declare global {
  interface Window {
    html2canvas?: (el: HTMLElement, opts?: Record<string, unknown>) => Promise<HTMLCanvasElement>;
  }
}

const MAX_FILES = 5;
const MAX_BYTES = 50 * 1024 * 1024; // 50MB/file (khớp giới hạn BE)
const MAX_TOTAL = 120 * 1024 * 1024; // 120MB tổng/đề nghị
// Khớp whitelist BE (server/index.js) — lọc sớm phía client cho UX tốt hơn.
const ALLOWED_MIME = new Set([
  'image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf',
  'text/plain', 'text/csv', 'application/zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
  'application/sql', 'application/x-sqlite3', 'application/vnd.sqlite3',
]);
const ALLOWED_EXT = /\.(png|jpe?g|webp|gif|pdf|txt|csv|docx?|xlsx?|pptx?|zip|db|sqlite|sqlite3|sql)$/i;
const isAllowed = (f: File) => ALLOWED_MIME.has(f.type) || ALLOWED_EXT.test(f.name || '');

function fileIcon(name: string) {
  const n = String(name || '').toLowerCase();
  if (/\.pdf$/.test(n)) return '📄';
  if (/\.(docx?|odt)$/.test(n)) return '📝';
  if (/\.(xlsx?|csv)$/.test(n)) return '📊';
  if (/\.pptx?$/.test(n)) return '📑';
  if (/\.zip$/.test(n)) return '🗜️';
  if (/\.txt$/.test(n)) return '📃';
  if (/\.(db|sqlite3?|sql)$/.test(n)) return '🗄️';
  return '📎';
}

// Upload 1 file/blob qua /api/requests/attachments → meta {url,name,mime,size,kind}.
async function uploadOne(blob: Blob, name: string, kind: string): Promise<Attachment> {
  const r = await fetch('/api/requests/attachments', {
    method: 'POST',
    headers: {
      'Content-Type': blob.type || 'application/octet-stream',
      'X-Filename': encodeURIComponent(name || 'attachment'),
      'X-Kind': kind,
    },
    body: blob,
  });
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    throw new Error(e.message || e.error || 'upload_failed');
  }
  return r.json();
}

// Chụp DOM hiện tại (ẩn tạm widget) — html2canvas tải động từ CDN khi cần.
async function captureScreenshot(rootEl: HTMLElement | null): Promise<Blob | null> {
  if (!window.html2canvas) {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Không tải được html2canvas'));
      document.head.appendChild(s);
    });
  }
  const prev = rootEl?.style.display ?? '';
  if (rootEl) rootEl.style.display = 'none';
  try {
    const canvas = await window.html2canvas!(document.body, {
      useCORS: true,
      allowTaint: true,
      scale: Math.min(window.devicePixelRatio || 1, 2),
      backgroundColor: getComputedStyle(document.body).backgroundColor || '#fff',
      logging: false,
      ignoreElements: (el: Element) =>
        el.id === 'sgf-root' || (el as HTMLElement).classList?.contains('tizia-view-banner'),
    });
    return await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png', 0.9));
  } finally {
    if (rootEl) rootEl.style.display = prev;
  }
}

export default function SuggestionFab() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const domainParam = searchParams.get('domain');

  // Domain trường hiện tại — null = không ở trong trường nào → ẩn nút.
  // Tính lại mỗi lần đổi route (usePathname/useSearchParams phản ứng với
  // client-side navigation của Next — thay cho trò vá history.pushState).
  const [domain, setDomain] = useState<string | null>(null);
  useEffect(() => {
    setDomain(resolveSchoolDomain(pathname, domainParam));
  }, [pathname, domainParam]);

  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>(REQUEST_TYPES[0].v);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [msg, setMsg] = useState<React.ReactNode>('');
  const [sending, setSending] = useState(false);
  const [shot, setShot] = useState(false);
  const [files, setFiles] = useState<{ file: File; url: string | null }[]>([]);
  // Đối tượng người dùng trỏ thẳng vào trên trang (thay vì tả bằng lời).
  const [target, setTarget] = useState<{ label: string; kind: string; path: string } | null>(null);
  const [picking, setPicking] = useState(false);
  const [drag, setDrag] = useState(false);
  const [items, setItems] = useState<RequestItem[] | null>(null);
  const [inboxErr, setInboxErr] = useState(false);
  const [openThreads, setOpenThreads] = useState<Set<string>>(new Set());

  const me = useMemo(() => (typeof window !== 'undefined' ? getPlayerName() : ''), [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Ngữ cảnh trang đang xem — gắn vào đề nghị để AI có bối cảnh.
  const ctx = useMemo(() => {
    if (typeof window === 'undefined') return { url: '', title: '' };
    const url = location.pathname + location.search;
    const t = (document.title || '').replace(/\s*[·|—-]\s*Tizia.*$/i, '').trim();
    return { url, title: t };
  }, [open, pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadInbox = useCallback(async () => {
    if (!domain) return;
    try {
      const r = await fetch(`/api/requests?domain=${encodeURIComponent(domain)}&limit=200`);
      const data = await r.json();
      const meName = getPlayerName();
      const all: RequestItem[] = data.items || [];
      const mine = meName ? all.filter((it) => it.student === meName) : [];
      const withReply = all.filter((it) => it.admin_note && it.student !== meName).slice(0, 3);
      const shown = (mine.length ? mine : withReply)
        .slice()
        .sort((a, b) => (b.updated_at || b.created_at || 0) - (a.updated_at || a.created_at || 0));
      setItems(shown);
      setInboxErr(false);
    } catch {
      setItems([]);
      setInboxErr(true);
    }
  }, [domain]);

  useEffect(() => {
    if (open) loadInbox();
  }, [open, loadInbox]);

  // Esc đóng modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function addFiles(list: FileList | File[] | null) {
    const errs: string[] = [];
    const next = [...files];
    for (const f of [...(list || [])]) {
      if (next.length >= MAX_FILES) { errs.push(`tối đa ${MAX_FILES} file`); break; }
      if (!isAllowed(f)) { errs.push(`"${f.name}" sai định dạng`); continue; }
      if (f.size > MAX_BYTES) { errs.push(`"${f.name}" > ${Math.round(MAX_BYTES / 1048576)}MB`); continue; }
      if (next.some((p) => p.file.name === f.name && p.file.size === f.size)) { errs.push(`"${f.name}" đã thêm`); continue; }
      const total = next.reduce((s, p) => s + p.file.size, 0) + f.size;
      if (total > MAX_TOTAL) { errs.push(`vượt tổng ${Math.round(MAX_TOTAL / 1048576)}MB`); continue; }
      next.push({ file: f, url: /^image\//.test(f.type) ? URL.createObjectURL(f) : null });
    }
    setMsg(errs.length ? '⚠️ Bỏ qua: ' + errs.join('; ') : '');
    setFiles(next);
  }

  function removeFile(i: number) {
    const it = files[i];
    if (it?.url) URL.revokeObjectURL(it.url);
    setFiles(files.filter((_, idx) => idx !== i));
  }

  function clearAttachments() {
    files.forEach((p) => p.url && URL.revokeObjectURL(p.url));
    setFiles([]);
    setShot(false);
  }

  // Bật chế độ trỏ-chọn: tạm ẩn hộp thoại để người dùng thấy trang, chọn xong mở lại.
  async function pickOnPage() {
    setPicking(true);
    setOpen(false);
    try {
      // Nạp qua BIẾN: đây là file tĩnh trong public/, không phải module TypeScript
      // nên không được để literal (trình biên dịch sẽ đi tìm khai báo kiểu và fail).
      const src = '/js/pick-target.js';
      const mod: any = await import(/* webpackIgnore: true */ src);
      const t = await mod.pickTarget();
      if (t) setTarget({ label: t.label, kind: t.kind, path: t.path });
    } catch (e) {
      setMsg('⚠️ Không bật được chế độ chọn: ' + ((e as Error).message || e));
    } finally {
      setPicking(false);
      setOpen(true);
    }
  }

  async function submit() {
    const t = title.trim();
    if (t.length < 4) { setMsg('⚠️ Tiêu đề quá ngắn (≥ 4 ký tự)'); return; }
    const targetLine = target ? `[Đối tượng: ${target.kind} "${target.label}" · vị trí ${target.path}]` : '';
    const fullDetail = [`[Trang: ${ctx.title || '—'}] ${ctx.url}`, targetLine, detail.trim()].filter(Boolean).join('\n');

    setSending(true);
    setMsg('Đang gửi…');
    try {
      const attachments: Attachment[] = [];
      if (shot) {
        setMsg('Đang chụp màn hình…');
        try {
          const blob = await captureScreenshot(rootRef.current);
          if (blob) {
            setMsg('Đang tải ảnh chụp…');
            attachments.push(await uploadOne(blob, 'screenshot.png', 'screenshot'));
          }
        } catch (e) {
          setMsg('⚠️ Không chụp được màn hình: ' + ((e as Error).message || e));
          return;
        }
      }
      for (let i = 0; i < files.length; i++) {
        const f = files[i].file;
        setMsg(`Đang tải file ${i + 1}/${files.length}: ${f.name}…`);
        try {
          attachments.push(await uploadOne(f, f.name, 'file'));
        } catch (e) {
          setMsg(`⚠️ Không tải được "${f.name}": ${(e as Error).message || e}`);
          return;
        }
      }

      setMsg('Đang gửi…');
      const r = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain, type, title: t, detail: fullDetail, attachments,
          student: getPlayerName() || 'Ẩn danh',
        }),
      });
      if (!r.ok) {
        const e2 = await r.json().catch(() => ({}));
        if (e2.viewOnly || e2.error === 'view_only') {
          setMsg(
            <>
              ⚠️ Bạn đang ở trường khác.{' '}
              <a href={`/school.html?domain=${encodeURIComponent(e2.your_school || '')}`} style={{ color: '#fbbf24', textDecoration: 'underline' }}>
                Về trường của bạn
              </a>{' '}
              để gửi đề nghị.
            </>,
          );
        } else if (e2.needLogin) {
          setMsg('⚠️ Hãy đăng nhập để gửi đề nghị.');
        } else if (e2.needEnroll) {
          setMsg('⚠️ Hãy chọn trường để bắt đầu gửi đề nghị.');
        } else {
          setMsg('⚠️ ' + (e2.message || e2.error || 'Không gửi được'));
        }
        return;
      }
      setMsg('✓ Đã gửi! Hiệu trưởng AI đang xem xét…');
      setTitle('');
      setDetail('');
      clearAttachments();
      loadInbox();
      // AI quyết định nền sau ~1-3s → tải lại để hiện phản hồi.
      setTimeout(loadInbox, 2500);
      setTimeout(loadInbox, 6000);
    } catch {
      setMsg('⚠️ Lỗi mạng — thử lại sau.');
    } finally {
      setSending(false);
    }
  }

  if (!domain) return null; // không ở trong trường nào → ẩn nút

  const detailLen = detail.length;
  const detailColor = detailLen > 9000 ? '#dc2626' : detailLen > 7000 ? '#f59e0b' : undefined;

  return (
    <div id="sgf-root" ref={rootRef}>
      <button
        id="sgf-fab"
        type="button"
        aria-label="Gửi đề nghị tới Ban điều hành AI"
        title="Gửi đề nghị cho Ban điều hành AI"
        onClick={() => setOpen(true)}
      >
        <span className="sgf-fab-ico">🏛️</span>
        <span className="sgf-fab-lbl">Đề nghị</span>
      </button>

      {open && (
        <div
          id="sgf-modal"
          className="sgf-modal"
          onPaste={(e) => {
            const imgs: File[] = [];
            for (const it of e.clipboardData?.items || []) {
              if (it.kind === 'file' && /^image\//.test(it.type)) {
                const f = it.getAsFile();
                if (f) {
                  const ext = (f.type.split('/')[1] || 'png').replace('jpeg', 'jpg');
                  imgs.push(new File([f], `paste-${imgs.length + 1}-${f.size}.${ext}`, { type: f.type }));
                }
              }
            }
            if (imgs.length) { e.preventDefault(); addFiles(imgs); }
          }}
        >
          <div className="sgf-backdrop" onClick={() => setOpen(false)} />
          <div className="sgf-dialog" role="dialog" aria-modal="true" aria-labelledby="sgf-title">
            <div className="sgf-head">
              <div className="sgf-head-ico">🏛️</div>
              <div className="sgf-head-text">
                <h3 id="sgf-title">Ban điều hành AI</h3>
                <p>
                  Trường do <b>AI điều hành</b> — gửi đề nghị, AI sẽ xem xét &amp; phản hồi. Yêu cầu được làm xong sẽ tick ✓ kèm lời nhắn.
                </p>
              </div>
              <button type="button" className="sgf-x" onClick={() => setOpen(false)} aria-label="Đóng">✕</button>
            </div>

            <form
              className="sgf-form"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <label className="sgf-lab">
                Loại đề nghị
                <select className="sgf-in" value={type} onChange={(e) => setType(e.target.value)}>
                  {REQUEST_TYPES.map((t) => (
                    <option key={t.v} value={t.v}>{t.icon} {t.label}</option>
                  ))}
                </select>
              </label>
              {/* Trỏ thẳng vào phần cần sửa — đỡ phải tả bằng lời rồi bị hiểu nhầm. */}
              <div className="sgf-lab">
                Đối tượng cần thay đổi
                {target ? (
                  <div className="sgf-target">
                    <span className="sgf-target-ico">🎯</span>
                    <span className="sgf-target-txt">
                      <b>{target.label}</b>
                      <i>{target.kind} · {target.path}</i>
                    </span>
                    <button type="button" className="sgf-target-x" onClick={() => setTarget(null)} title="Bỏ chọn">✕</button>
                  </div>
                ) : (
                  <button type="button" className="sgf-pick" onClick={pickOnPage} disabled={picking}>
                    🎯 Chọn đối tượng trên trang
                    <small>Bấm rồi trỏ vào đúng phần cần sửa — không phải mô tả bằng lời</small>
                  </button>
                )}
              </div>

              <label className="sgf-lab">
                Tiêu đề <span className="sgf-req">*</span>
                <input
                  className="sgf-in"
                  maxLength={200}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Thêm dạng bài Toán có nhiều cách giải"
                />
              </label>
              <label className="sgf-lab">
                Mô tả chi tiết (tuỳ chọn)
                <span style={{ opacity: 0.55, fontSize: 11, float: 'right', color: detailColor }}>
                  {detailLen.toLocaleString('vi-VN')} / 10.000
                </span>
                <textarea
                  className="sgf-in"
                  rows={3}
                  maxLength={10000}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="Càng cụ thể, AI càng dễ hiểu & phản hồi đúng nhu cầu của bạn."
                />
              </label>

              <div
                className={`sgf-attach${drag ? ' sgf-drag' : ''}`}
                onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDrag(true); }}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDrag(true); }}
                onDragLeave={(e) => {
                  e.preventDefault(); e.stopPropagation();
                  if ((e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) return;
                  setDrag(false);
                }}
                onDrop={(e) => {
                  e.preventDefault(); e.stopPropagation(); setDrag(false);
                  if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
                }}
              >
                <label className="sgf-attach-row">
                  <input type="checkbox" checked={shot} onChange={(e) => setShot(e.target.checked)} />
                  <span>📸 Đính kèm ảnh chụp <b>màn hình hiện tại</b> (Ban điều hành xem trực tiếp giao diện anh/chị đang gặp)</span>
                </label>
                <label className="sgf-attach-row sgf-file-row">
                  <span className="sgf-attach-lbl">📎 Đính kèm file (ảnh / PDF / Word / Excel / PPT / CSDL .db / .sql — tối đa 50MB × 5 file):</span>
                  <input
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.db,.sqlite,.sqlite3,.sql,application/sql,application/x-sqlite3"
                    onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
                  />
                </label>
                <div className="sgf-attach-hint">💡 Có thể <b>kéo-thả</b> file vào khung này hoặc <b>dán ảnh</b> trực tiếp (Ctrl/⌘+V).</div>
                <div className="sgf-attach-hint">📄 Yêu cầu dài? Có thể viết <b>toàn bộ nội dung trong file Word/PDF</b> rồi đính kèm — Ban điều hành AI sẽ <b>mở file đọc kỹ</b> trước khi thực hiện (tiêu đề vẫn cần điền, VD: &quot;Xem yêu cầu trong file&quot;).</div>
                {(shot || files.length > 0) && (
                  <div className="sgf-attach-list">
                    {shot && (
                      <div className="sgf-attach-it">
                        <span className="sgf-attach-ic">📸</span>
                        <span className="sgf-attach-nm">Ảnh chụp màn hình hiện tại</span>
                        <button type="button" className="sgf-attach-rm" title="Bỏ ảnh chụp" onClick={() => setShot(false)}>✕</button>
                      </div>
                    )}
                    {files.map((p, i) => (
                      <div className="sgf-attach-it" key={`${p.file.name}-${p.file.size}`}>
                        {p.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className="sgf-attach-thumb" src={p.url} alt="" />
                        ) : (
                          <span className="sgf-attach-ic">{fileIcon(p.file.name)}</span>
                        )}
                        <span className="sgf-attach-nm">
                          {p.file.name} <span className="sgf-attach-size">({(p.file.size / 1024).toFixed(0)} KB)</span>
                        </span>
                        <button type="button" className="sgf-attach-rm" title="Bỏ file" onClick={() => removeFile(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="sgf-ctx">
                📍 <b>Trang đang xem:</b> {ctx.title || ctx.url}
                <span className="sgf-ctx-url">{ctx.url}</span>
              </div>
              <div className="sgf-bar">
                <span className="sgf-msg">{msg}</span>
                <button type="submit" className="sgf-send" disabled={sending}>📨 Gửi tới Ban điều hành</button>
              </div>
            </form>

            <div className="sgf-inbox">
              <div className="sgf-inbox-head">
                <span>Yêu cầu của bạn{items?.length ? ` (${items.length})` : ''}</span>
                <button type="button" className="sgf-reload" title="Tải lại" onClick={loadInbox}>↻</button>
              </div>
              <div className="sgf-inbox-list">
                {items === null ? (
                  'Đang tải…'
                ) : inboxErr ? (
                  <div className="sgf-empty">Không tải được — cần backend chạy.</div>
                ) : !items.length ? (
                  <div className="sgf-empty">Chưa có yêu cầu nào. Hãy là người đầu tiên đề xuất cải tiến trang này! 🚀</div>
                ) : (
                  items.map((it) => {
                    const sm = REQUEST_STATUS[it.status || ''] || REQUEST_STATUS.pending;
                    const t = REQUEST_TYPES.find((x) => x.v === it.type) || REQUEST_TYPES[4];
                    const mine = !!me && it.student === me;
                    const atts = Array.isArray(it.attachments) ? it.attachments : [];
                    const id = String(it.id);
                    const openThread = openThreads.has(id);
                    return (
                      <div className="sgf-it" key={id}>
                        <div className="sgf-it-line">
                          <span className="sgf-it-ico">{t.icon}</span>
                          <span className="sgf-it-title">{it.title}</span>
                          <span className={`sgf-it-st ${sm.cls}`}>{sm.label}</span>
                        </div>
                        {atts.length > 0 && (
                          <div className="sgf-it-att">
                            {atts.map((a, i) =>
                              /^image\//.test(a.mime || '') ? (
                                <a key={i} className="sgf-it-thumb" href={a.url} target="_blank" rel="noopener noreferrer" title={a.name}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img loading="lazy" src={a.url} alt={a.name} />
                                </a>
                              ) : (
                                <a key={i} className="sgf-it-file" href={a.url} target="_blank" rel="noopener noreferrer" download={a.name}>
                                  {a.kind === 'screenshot' ? '📸' : '📎'} {a.name}
                                </a>
                              ),
                            )}
                          </div>
                        )}
                        {it.admin_note && <div className="sgf-it-note">🏛️ {it.admin_note}</div>}
                        <button
                          type="button"
                          className="sgf-it-thread-btn"
                          onClick={() =>
                            setOpenThreads((prev) => {
                              const next = new Set(prev);
                              if (next.has(id)) next.delete(id);
                              else next.add(id);
                              return next;
                            })
                          }
                        >
                          💬 {mine ? 'Trao đổi với Ban điều hành' : 'Xem trao đổi'}
                        </button>
                        {openThread && (
                          <div className="sgf-it-thread">
                            <RequestThread requestId={id} me={me} onChange={loadInbox} />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
