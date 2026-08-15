'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export type PortalApp = {
  id: number;
  alias: string;
  name: string;
  description: string | null;
  icon: string | null;
  version: string | null;
  isPublic?: boolean;
  sizeBytes?: number;
  ownerId?: number;
  ownerName?: string | null;
  kind?: string;
  category?: string | null;
  domain?: string | null;
  url: string;
};

const DOMAIN_LABELS: Record<string, string> = {
  all: '🌐 Tất cả',
  preschool: '🍼 Mầm non',
  primary: '🎒 Tiểu học',
  secondary: '📚 Trung học',
  it: '💻 CNTT',
  pharmacy: '💊 Dược/Y',
  general: '🛠 Chung',
};

async function getCsrfToken(): Promise<string | null> {
  try {
    const r = await fetch('/api/csrf', { credentials: 'same-origin' });
    const j = await r.json();
    return j.token || null;
  } catch {
    return null;
  }
}

type Progress = { msg: string; kind: 'ok' | 'err' } | null;

/* Manifest chuẩn AI Portal đặt icon là TÊN icon Lucide ("FileText", "Sigma"…), còn Tizia
 * render icon như text → cả chữ đó phình 32px đè lên tên app. Chỉ nhận ký hiệu/emoji;
 * gặp tên bằng chữ-số thì rơi về 🧩. */
export function appIcon(raw?: string | null): string {
  const s = (raw || '').trim();
  if (!s || /[A-Za-z0-9]/.test(s)) return '🧩';
  return s;
}

function AppCard({
  app,
  isBuiltin,
  canDelete,
  onUninstall,
}: {
  app: PortalApp;
  isBuiltin: boolean;
  canDelete: boolean;
  onUninstall?: (id: number) => void;
}) {
  const ico = appIcon(app.icon);
  const v = app.version ? ` · v${app.version}` : '';
  const owner = app.ownerName ? ` · ${app.ownerName}` : '';
  const meta = isBuiltin
    ? `${app.category || ''}${v} · sẵn có`
    : `${app.alias}${v} · ${((app.sizeBytes || 0) / 1024).toFixed(0)} KB${owner}`;

  return (
    <div className="flex min-w-0 flex-col gap-2.5 rounded-xl border border-border bg-white/[.04] p-4 transition-colors hover:border-primary/50 hover:bg-white/[.06]">
      <div className="flex items-center gap-3">
        <div
          className="grid h-[52px] w-[52px] flex-none place-items-center rounded-xl border border-white/10 text-[32px] leading-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(251,191,36,.18), rgba(99,102,241,.12))',
          }}
        >
          {ico}
        </div>
        <div className="min-w-0 flex-1">
          <b className="block overflow-hidden text-ellipsis whitespace-nowrap text-[15px]">
            {app.name}
          </b>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[11.5px] text-muted-foreground">
            {meta}
          </div>
        </div>
      </div>
      <div className="line-clamp-2 min-h-[38px] text-[12.5px] leading-relaxed text-foreground/80">
        {app.description || 'Portal app cài qua manifest + zip.'}
      </div>
      <div className="mt-1 flex gap-1.5">
        <a
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-primary bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground hover:brightness-110"
          href={app.url}
          target="_blank"
          rel="noopener"
        >
          ↗ Mở
        </a>
        <a
          className="inline-flex items-center gap-1 rounded-md border border-border bg-white/[.06] px-2.5 py-1.5 text-xs font-semibold hover:bg-white/[.12]"
          href={`/apps.html?app=portal:${app.id}`}
          title="Nhúng trong Tizia"
        >
          📺
        </a>
        {canDelete && onUninstall && (
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-red-500/30 bg-red-500/[.12] px-2.5 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/[.22]"
            title="Gỡ app"
            onClick={() => onUninstall(app.id)}
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
}

export default function PortalAppsClient({
  own,
  publicApps,
  builtin,
}: {
  own: PortalApp[];
  publicApps: PortalApp[];
  builtin: PortalApp[];
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<Progress>(null);
  const [dragover, setDragover] = useState(false);
  const [activeDomain, setActiveDomain] = useState('all');

  function showProgress(msg: string, kind: 'ok' | 'err' = 'ok') {
    setProgress({ msg, kind });
  }
  function hideProgressLater() {
    setTimeout(() => setProgress(null), 4000);
  }

  async function installZip(file?: File | null) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.zip')) {
      showProgress('❌ File phải có đuôi .zip', 'err');
      return;
    }
    showProgress(`⏳ Đang upload ${file.name} (${(file.size / 1024).toFixed(1)} KB)…`);
    const csrf = await getCsrfToken();
    try {
      const r = await fetch('/api/portal-apps/install', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/zip',
          'X-Filename': file.name,
          ...(csrf ? { 'X-CSRF-Token': csrf } : {}),
        },
        body: file,
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        showProgress(`❌ Lỗi: ${j.message || j.error || r.status}`, 'err');
        return;
      }
      showProgress(
        `✅ Đã cài "${j.app.name}" (v${j.app.version || '?'}) → ${j.app.url}`,
        'ok',
      );
      hideProgressLater();
      router.refresh();
    } catch (err) {
      showProgress('❌ Lỗi mạng: ' + (err as Error).message, 'err');
    }
  }

  async function uninstall(id: number) {
    if (!confirm('Gỡ app này khỏi tài khoản?')) return;
    const csrf = await getCsrfToken();
    const r = await fetch('/api/portal-apps/' + id, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: csrf ? { 'X-CSRF-Token': csrf } : {},
    });
    if (r.ok) router.refresh();
    else alert('Không gỡ được: ' + (await r.text()));
  }

  const domains = ['all', ...Array.from(new Set(builtin.map((a) => a.domain).filter(Boolean)))] as string[];
  const builtinList =
    activeDomain === 'all' ? builtin : builtin.filter((a) => a.domain === activeDomain);

  return (
    <div className="w-full space-y-5 py-8">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">
          🧩 Portal Apps{' '}
          <span className="text-base font-semibold text-muted-foreground">· Developer dashboard</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Cài app SPA chuẩn <b>AI Portal</b> vào Tizia. Đóng gói{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">.zip</code> chứa{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">manifest.json</code> +{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">public/index.html</code> rồi kéo thả vào đây.
          App của bạn được serve dưới{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
            /portal-apps/u/&lt;id&gt;/&lt;alias&gt;/
          </code>{' '}
          và xuất hiện trong trang{' '}
          <a href="/apps.html" className="text-primary hover:underline">
            Ứng dụng
          </a>
          . Lần đầu làm app?{' '}
          <a href="/dev" className="font-semibold text-primary hover:underline">
            Đọc hướng dẫn phát triển →
          </a>
        </p>
      </div>

      {/* Cài app mới */}
      <div className="rounded-2xl border border-border bg-card/40 p-[18px]">
        <h2 className="mb-2 text-[17px] font-semibold">
          📥 Cài app mới{' '}
          <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-primary">
            .zip
          </span>
        </h2>
        <label
          className={cn(
            'block cursor-pointer rounded-2xl border-2 border-dashed border-white/20 bg-black/20 px-[22px] py-[34px] text-center transition-colors',
            'hover:border-primary hover:bg-primary/[.06]',
            dragover && 'border-solid border-primary bg-primary/[.12]',
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragover(true);
          }}
          onDragLeave={() => setDragover(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragover(false);
            installZip(e.dataTransfer.files?.[0]);
          }}
        >
          <input
            ref={fileInput}
            type="file"
            accept=".zip,application/zip"
            className="hidden"
            onChange={(e) => installZip(e.target.files?.[0])}
          />
          <div className="mb-3 text-[44px] leading-none">📦</div>
          <div className="text-[15px] font-bold">
            <b className="text-primary">Kéo thả file .zip</b> vào đây hoặc bấm để chọn
          </div>
          <div className="mt-2 text-[12.5px] text-muted-foreground">
            Tối đa 30 MB · giải nén ≤ 100 MB · ≤ 2000 file
          </div>
        </label>

        {progress && (
          <div
            className={cn(
              'my-3 rounded-lg border px-3.5 py-2.5 font-mono text-[13px]',
              progress.kind === 'ok'
                ? 'border-green-500/30 bg-green-500/[.12] text-green-300'
                : 'border-red-500/30 bg-red-500/[.12] text-red-300',
            )}
          >
            {progress.msg}
          </div>
        )}

        <details className="mt-3.5 rounded-xl bg-black/20 px-4 py-3">
          <summary className="cursor-pointer text-[13.5px] font-bold">
            📋 Quy chuẩn manifest.json
          </summary>
          <p className="mt-2.5 text-[13px] text-muted-foreground">
            Bắt buộc <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">alias</code> (lowercase
            kebab, ví dụ <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">my-app</code>) +{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">name</code>. App cần backend
            riêng thì khai thêm{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">hasBackend: true</code> +{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">apiProxyTarget</code> (URL tuyệt
            đối tới dịch vụ của bạn) — xem{' '}
            <a href="/dev#backend" className="text-primary hover:underline">
              mục 5 của hướng dẫn
            </a>
            . Code backend nằm trong zip thì KHÔNG được chạy.
          </p>
          <pre className="mt-2 overflow-auto rounded-lg bg-black/40 px-3.5 py-3 text-[11.5px] leading-relaxed">
{`{
  "id": "my-app",
  "alias": "my-app",
  "name": "My App",
  "description": "Mô tả ngắn về app",
  "icon": "🎨",
  "version": "1.0.0",
  "type": "embedded",
  "hasFrontendOnly": true
}`}
          </pre>
          <p className="text-[13px] text-muted-foreground">Cấu trúc zip:</p>
          <pre className="mt-2 overflow-auto rounded-lg bg-black/40 px-3.5 py-3 text-[11.5px] leading-relaxed">
{`my-app.zip
├── manifest.json
└── public/
    ├── index.html      ← bắt buộc (entry point)
    ├── embed-config.json   ← tuỳ chọn, tự sinh nếu thiếu
    └── assets/...      ← JS/CSS đã build (đường dẫn TƯƠNG ĐỐI: ./assets/...)`}
          </pre>
          <p className="text-[13px] text-muted-foreground">
            ⚠️ Trong <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">index.html</code>, mọi
            đường dẫn asset phải tương đối (
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">./assets/...</code>), KHÔNG dùng{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">/assets/...</code> tuyệt đối — vì
            app chạy dưới{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
              /portal-apps/u/&lt;id&gt;/&lt;alias&gt;/
            </code>
            . Với Vite: <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">vite.config.js</code>{' '}
            set <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">base: './'</code>.
          </p>
        </details>
      </div>

      {/* App của tôi */}
      <div className="rounded-2xl border border-border bg-card/40 p-[18px]">
        <h2 className="mb-2 text-[17px] font-semibold">🧩 App của tôi</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
          {own.length ? (
            own.map((a) => (
              <AppCard key={a.id} app={a} isBuiltin={false} canDelete onUninstall={uninstall} />
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed border-border bg-white/[.02] p-7 text-center text-[13px] text-muted-foreground">
              Bạn chưa cài app nào. Kéo file .zip vào ô trên để bắt đầu.
            </div>
          )}
        </div>
      </div>

      {/* Apps công khai */}
      <div className="rounded-2xl border border-border bg-card/40 p-[18px]">
        <h2 className="mb-2 text-[17px] font-semibold">🌍 Apps công khai (do dev khác chia sẻ)</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
          {publicApps.length ? (
            publicApps.map((a) => (
              <AppCard key={a.id} app={a} isBuiltin={false} canDelete={false} />
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed border-border bg-white/[.02] p-7 text-center text-[13px] text-muted-foreground">
              Chưa có app công khai nào.
            </div>
          )}
        </div>
      </div>

      {/* Apps có sẵn */}
      <div className="rounded-2xl border border-border bg-card/40 p-[18px]">
        <h2 className="mb-2 text-[17px] font-semibold">
          📚 Apps có sẵn của Tizia{' '}
          <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-primary">
            {builtin.length} apps
          </span>
        </h2>
        <p className="mb-3.5 text-[13px] leading-relaxed text-muted-foreground">
          Kho game/lab/sim/tool sẵn có. Khi cấu hình campus map, bạn có thể gán bất kỳ app nào ở đây vào
          một toà nhà cụ thể.
        </p>
        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {domains.map((d) => {
            const count = d === 'all' ? builtin.length : builtin.filter((a) => a.domain === d).length;
            const active = d === activeDomain;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setActiveDomain(d)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-[12.5px] transition-colors',
                  active
                    ? 'border-primary bg-primary font-bold text-primary-foreground'
                    : 'border-border bg-white/[.06] font-medium text-foreground',
                )}
              >
                {DOMAIN_LABELS[d] || d} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
          {builtinList.length ? (
            builtinList.map((a) => (
              <AppCard key={a.id} app={a} isBuiltin canDelete={false} />
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed border-border bg-white/[.02] p-7 text-center text-[13px] text-muted-foreground">
              Không có app nào trong nhóm này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
