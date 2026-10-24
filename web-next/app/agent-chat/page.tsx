'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

// Shape trả về từ /api/agents (portal-agents/index.js decorateAgent).
type Agent = {
  id: number;
  alias: string;
  name: string;
  isPublic: boolean;
  samplePrompts?: string[];
  own?: boolean;
  mine?: boolean;
};

type Msg = { id: number; kind: 'user' | 'bot' | 'err'; text: string };

// Parse một `data:` payload SSE → text delta (hỗ trợ {delta}/{content_markdown}/{answer}/{content}/{text}).
function extractDelta(dataStr: string): string {
  const s = dataStr.trim();
  if (!s || s === '[DONE]') return '';
  try {
    const o = JSON.parse(s);
    return o.delta ?? o.content_markdown ?? o.answer ?? o.content ?? o.text ?? '';
  } catch {
    return s;
  }
}

let msgSeq = 0;

export default function AgentChat() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [listState, setListState] = useState<'loading' | 'need-login' | 'ready' | 'error'>('loading');
  const [listError, setListError] = useState('');
  const [current, setCurrent] = useState<Agent | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);

  // Form cài agent mới.
  const [addOpen, setAddOpen] = useState(false);
  const [fAlias, setFAlias] = useState('');
  const [fBase, setFBase] = useState('');
  const [fName, setFName] = useState('');
  const [regStatus, setRegStatus] = useState<{ kind: '' | 'ok' | 'err'; text: string }>({ kind: '', text: '' });
  const [registering, setRegistering] = useState(false);

  const msgsRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [msgs, scrollToBottom]);

  const loadAgents = useCallback(async () => {
    setListState('loading');
    try {
      const r = await fetch('/api/agents', { credentials: 'same-origin' });
      if (r.status === 401) {
        setListState('need-login');
        return;
      }
      const j = await r.json();
      const all: Agent[] = [
        ...(j.own || []).map((a: Agent) => ({ ...a, mine: true })),
        ...(j.public || []),
      ];
      setAgents(all);
      setListState('ready');
    } catch (e) {
      setListError(e instanceof Error ? e.message : String(e));
      setListState('error');
    }
  }, []);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  function addBubble(kind: Msg['kind'], text: string): number {
    const id = ++msgSeq;
    setMsgs((prev) => [...prev, { id, kind, text }]);
    return id;
  }

  function updateBubble(id: number, text: string) {
    setMsgs((prev) => prev.map((m) => (m.id === id ? { ...m, text } : m)));
  }

  function removeBubble(id: number) {
    setMsgs((prev) => prev.filter((m) => m.id !== id));
  }

  function selectAgent(a: Agent) {
    setCurrent(a);
    const initial: Msg[] = [];
    if (Array.isArray(a.samplePrompts) && a.samplePrompts.length) {
      initial.push({
        id: ++msgSeq,
        kind: 'bot',
        text: 'Gợi ý: ' + a.samplePrompts.slice(0, 3).map((p) => '“' + p + '”').join('  ·  '),
      });
    }
    setMsgs(initial);
    setTimeout(() => promptRef.current?.focus(), 0);
  }

  async function send() {
    if (busy || !current) return;
    const text = prompt.trim();
    if (!text) return;
    setBusy(true);
    setPrompt('');
    addBubble('user', text);
    const botId = addBubble('bot', '…');
    let acc = '';
    try {
      const r = await fetch(`/api/agents/${encodeURIComponent(current.alias)}/ask`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        body: JSON.stringify({ prompt: text }),
      });
      if (!r.ok) {
        const t = await r.text().catch(() => '');
        removeBubble(botId);
        addBubble('err', 'Lỗi ' + r.status + ': ' + (t.slice(0, 300) || 'agent không phản hồi.'));
      } else if ((r.headers.get('content-type') || '').includes('text/event-stream') && r.body) {
        const reader = r.body.getReader();
        const dec = new TextDecoder();
        let buf = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const parts = buf.split(/\n\n/);
          buf = parts.pop() ?? '';
          for (const evt of parts) {
            for (const line of evt.split(/\n/)) {
              if (line.startsWith('data:')) {
                acc += extractDelta(line.slice(5));
                updateBubble(botId, acc || '…');
              }
            }
            scrollToBottom();
          }
        }
        if (!acc) {
          let j: { content_markdown?: string; answer?: string; content?: string } | null = null;
          try {
            j = JSON.parse(buf);
          } catch {
            j = null;
          }
          acc = j ? j.content_markdown || j.answer || j.content || '' : '';
        }
        updateBubble(botId, acc || '(không có nội dung)');
      } else {
        const j = await r.json().catch(() => null);
        updateBubble(
          botId,
          (j && (j.content_markdown || j.answer || j.content)) || '(không có nội dung)',
        );
      }
    } catch (e) {
      removeBubble(botId);
      addBubble('err', 'Lỗi kết nối: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setBusy(false);
      setTimeout(() => promptRef.current?.focus(), 0);
    }
  }

  async function registerAgent() {
    const alias = fAlias.trim().toLowerCase();
    const baseUrl = fBase.trim();
    const name = fName.trim();
    setRegStatus({ kind: '', text: 'Đang kiểm tra agent…' });
    setRegistering(true);
    try {
      const r = await fetch('/api/agents/register', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias, baseUrl, name: name || undefined }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setRegStatus({ kind: 'err', text: j.message || j.error || 'Cài thất bại.' });
      } else {
        setRegStatus({ kind: 'ok', text: '✅ Đã cài “' + (j.agent?.name || alias) + '”.' });
        setFAlias('');
        setFBase('');
        setFName('');
        loadAgents();
      }
    } catch (e) {
      setRegStatus({ kind: 'err', text: 'Lỗi: ' + (e instanceof Error ? e.message : String(e)) });
    } finally {
      setRegistering(false);
    }
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <h1 className="text-xl font-bold">
          Trợ lý AI <span className="text-sm font-semibold text-muted-foreground">· Agent kiểu AI Portal</span>
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        {/* SIDEBAR: agents + cài mới */}
        <div className="rounded-2xl border bg-card p-4">
          <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Agent đã cài
          </h2>

          <div>
            {listState === 'loading' && <div className="px-0.5 py-1.5 text-sm text-muted-foreground">Đang tải…</div>}
            {listState === 'need-login' && (
              <div className="px-0.5 py-1.5 text-sm text-muted-foreground">
                Bạn cần{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  đăng nhập
                </Link>{' '}
                để dùng trợ lý.
              </div>
            )}
            {listState === 'error' && (
              <div className="px-0.5 py-1.5 text-sm text-muted-foreground">Lỗi tải danh sách: {listError}</div>
            )}
            {listState === 'ready' && agents.length === 0 && (
              <div className="px-0.5 py-1.5 text-sm text-muted-foreground">
                Chưa có agent nào. Mở “Cài agent mới” bên dưới để thêm.
              </div>
            )}
            {listState === 'ready' &&
              agents.map((a) => {
                const active = current?.alias === a.alias;
                return (
                  <button
                    key={a.id ?? a.alias}
                    type="button"
                    onClick={() => selectAgent(a)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-xl border border-transparent px-2.5 py-2 text-left transition-colors hover:bg-foreground/5',
                      active && 'border-primary bg-primary/10',
                    )}
                  >
                    <div className="grid h-[30px] w-[30px] place-items-center rounded-lg bg-foreground/10">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold">{a.name}</div>
                      <div className="truncate text-[11.5px] text-muted-foreground">
                        {a.alias}
                        {a.mine ? '' : ' · công khai'}
                      </div>
                    </div>
                    {a.mine && a.isPublic && (
                      <span className="rounded-md bg-green-500/15 px-1.5 py-0.5 text-[10px] text-green-500">
                        public
                      </span>
                    )}
                  </button>
                );
              })}
          </div>

          <details
            className="mt-2.5"
            open={addOpen}
            onToggle={(e) => setAddOpen((e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary className="cursor-pointer text-[12.5px] text-muted-foreground">➕ Cài agent mới</summary>
            <div className="mt-2.5">
              <input
                className="mb-2 w-full rounded-lg border bg-black/25 px-2.5 py-2 text-[13.5px] outline-none"
                value={fAlias}
                onChange={(e) => setFAlias(e.target.value)}
                placeholder="alias (vd: papers)"
                autoComplete="off"
              />
              <input
                className="mb-2 w-full rounded-lg border bg-black/25 px-2.5 py-2 text-[13.5px] outline-none"
                value={fBase}
                onChange={(e) => setFBase(e.target.value)}
                placeholder="base_url (https://…/v1)"
                autoComplete="off"
              />
              <input
                className="mb-2 w-full rounded-lg border bg-black/25 px-2.5 py-2 text-[13.5px] outline-none"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                placeholder="Tên hiển thị (tuỳ chọn)"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={registerAgent}
                disabled={registering}
                className="rounded-lg bg-primary px-3.5 py-2 text-[13.5px] font-bold text-primary-foreground disabled:opacity-50"
              >
                Cài &amp; kiểm tra /metadata
              </button>
              <div
                className={cn(
                  'min-h-4 text-xs',
                  regStatus.kind === 'ok' && 'text-green-500',
                  regStatus.kind === 'err' && 'text-red-500',
                  regStatus.kind === '' && 'text-muted-foreground',
                )}
              >
                {regStatus.text}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Tizia sẽ gọi <code>GET base_url/metadata</code> để xác nhận agent đang chạy trước khi lưu.
              </p>
            </div>
          </details>
        </div>

        {/* CHAT */}
        <div className="flex min-h-[70vh] flex-col rounded-2xl border bg-card p-4">
          <div className="text-xs text-muted-foreground">
            {current ? (
              <>
                Đang trò chuyện với <b className="text-foreground">{current.name}</b>{' '}
                <span className="text-muted-foreground">({current.alias})</span>
              </>
            ) : (
              'Chọn một agent bên trái để bắt đầu trò chuyện.'
            )}
          </div>

          <div ref={msgsRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-0.5 pb-3.5 pt-1.5">
            {msgs.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  m.kind === 'user' && 'self-end border border-primary/30 bg-primary/15',
                  m.kind === 'bot' && 'self-start border bg-foreground/5',
                  m.kind === 'err' && 'self-start border border-red-500/40 bg-red-500/10 text-red-200',
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <textarea
              ref={promptRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              disabled={!current}
              className="max-h-[180px] min-h-[46px] flex-1 resize-y rounded-lg border bg-black/25 px-2.5 py-2 text-[13.5px] outline-none disabled:opacity-50"
              placeholder="Nhập câu hỏi… (Enter để gửi, Shift+Enter xuống dòng)"
            />
            <button
              type="button"
              onClick={send}
              disabled={!current || busy}
              className="rounded-lg bg-primary px-3.5 py-2 text-[13.5px] font-bold text-primary-foreground disabled:opacity-50"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
