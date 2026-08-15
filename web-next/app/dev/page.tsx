import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tizia Dev · Hướng dẫn phát triển app cho Tizia',
  description:
    'Tài liệu đầy đủ cho lập trình viên: đóng gói app SPA thành .zip (manifest.json + public/), cài vào Tizia, đọc danh tính người dùng, nối backend riêng qua proxy /api/apps, xử lý sự cố. Cùng một gói chạy được cả trên AI Portal.',
  keywords: 'Tizia dev, portal app, phát triển app Tizia, manifest.json, AI Portal app, SDK Tizia',
  alternates: { canonical: 'https://tizia.vn/dev' },
  openGraph: {
    type: 'website',
    siteName: 'Tizia',
    locale: 'vi_VN',
    title: 'Tizia Dev · Hướng dẫn phát triển app',
    description:
      'Đóng gói app SPA thành .zip rồi cài thẳng vào Tizia. Hướng dẫn đầy đủ kèm hình minh hoạ: manifest, biến host inject, proxy backend, cách build đúng, xử lý sự cố.',
    url: 'https://tizia.vn/dev',
    images: ['https://tizia.vn/og-default.svg'],
  },
};

const LD_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Phát triển và cài app cho Tizia',
  description:
    'Đóng gói ứng dụng web thành .zip chuẩn AI Portal và cài vào Tizia qua trang Portal Apps.',
  step: [
    { '@type': 'HowToStep', name: 'Viết manifest.json', text: 'Khai alias và name cho app.' },
    { '@type': 'HowToStep', name: 'Build với đường dẫn tương đối', text: 'Đặt base là ./ để asset resolve đúng.' },
    { '@type': 'HowToStep', name: 'Đóng gói .zip', text: 'Nén manifest.json cùng thư mục public/.' },
    { '@type': 'HowToStep', name: 'Cài vào Tizia', text: 'Kéo thả file .zip vào trang Portal Apps.' },
  ],
};

/* ── Khối trình bày dùng chung ───────────────────────────────────────────── */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 space-y-3.5">
      <h2 className="border-b border-border pb-2 text-[19px] font-bold tracking-tight">
        <a href={`#${id}`} className="hover:text-primary">
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="pt-1.5 text-[15.5px] font-bold">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] leading-relaxed text-muted-foreground">{children}</p>;
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em] font-mono">{children}</code>;
}

function Pre({ children, label }: { children: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-black/40">
      {label && (
        <div className="border-b border-border bg-white/[.04] px-3.5 py-1.5 font-mono text-[11.5px] text-muted-foreground">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-3.5 py-3 text-[12px] leading-relaxed">{children}</pre>
    </div>
  );
}

function Note({
  kind = 'info',
  title,
  children,
}: {
  kind?: 'info' | 'warn' | 'bad';
  title: string;
  children: React.ReactNode;
}) {
  const tone = {
    info: 'border-primary/30 bg-primary/[.07]',
    warn: 'border-amber-500/30 bg-amber-500/[.08]',
    bad: 'border-red-500/30 bg-red-500/[.08]',
  }[kind];
  return (
    <div className={`rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${tone}`}>
      <div className="mb-1 font-bold">{title}</div>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="space-y-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="w-full rounded-xl border border-border"
      />
      <figcaption className="text-[12.5px] leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-[13px]">
        <thead className="bg-white/[.04] text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border align-top">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? 'whitespace-nowrap px-3 py-2 font-mono text-[12px]'
                      : 'px-3 py-2 text-muted-foreground'
                  }
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Sơ đồ (SVG nội tuyến, dùng currentColor nên hợp mọi nền) ────────────── */

function DiagramLifecycle() {
  const boxes = [
    ['1', 'Máy bạn', 'npm run build', 'ra public/'],
    ['2', 'Đóng gói', 'zip manifest', '+ public/'],
    ['3', 'Tizia nhận', 'kiểm tra, giải nén', 'ghi vào kho'],
    ['4', 'Người học mở', 'Tizia chèn danh tính', 'rồi trả index.html'],
  ];
  return (
    <figure className="space-y-2">
      <div className="overflow-x-auto rounded-xl border border-border bg-black/20 p-4">
        <svg viewBox="0 0 760 150" className="h-auto w-full min-w-[560px]" role="img"
             aria-label="Vòng đời: build trên máy bạn, đóng gói zip, Tizia nhận và giải nén, người học mở app">
          {boxes.map(([n, t, l1, l2], i) => {
            const x = i * 190;
            return (
              <g key={n}>
                <rect x={x + 8} y="28" width="160" height="86" rx="12"
                      fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.25" />
                <circle cx={x + 30} cy="50" r="11" fill="currentColor" fillOpacity="0.18" />
                <text x={x + 30} y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">{n}</text>
                <text x={x + 48} y="54" fontSize="12.5" fontWeight="700" fill="currentColor">{t}</text>
                <text x={x + 24} y="80" fontSize="11" fill="currentColor" fillOpacity="0.65">{l1}</text>
                <text x={x + 24} y="97" fontSize="11" fill="currentColor" fillOpacity="0.65">{l2}</text>
                {i < 3 && (
                  <path d={`M${x + 172} 71 L${x + 194} 71`} stroke="currentColor" strokeOpacity="0.5"
                        strokeWidth="1.5" markerEnd="url(#arr)" />
                )}
              </g>
            );
          })}
          <defs>
            <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0 0 L7 3.5 L0 7 z" fill="currentColor" fillOpacity="0.5" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="text-[12.5px] text-muted-foreground">
        Vòng đời một app: bạn chỉ làm bước 1–2, Tizia lo bước 3–4.
      </figcaption>
    </figure>
  );
}

function DiagramUrl() {
  return (
    <figure className="space-y-2">
      <div className="overflow-x-auto rounded-xl border border-border bg-black/20 p-4">
        <svg viewBox="0 0 700 132" className="h-auto w-full min-w-[520px]" role="img"
             aria-label="Giải phẫu URL của app: /portal-apps/u/ id-chủ-app / alias /">
          <text x="20" y="46" fontSize="17" fontFamily="ui-monospace, monospace" fill="currentColor">
            <tspan fillOpacity="0.5">/portal-apps/u/</tspan>
            <tspan fill="currentColor" fontWeight="700">23</tspan>
            <tspan fillOpacity="0.5">/</tspan>
            <tspan fill="currentColor" fontWeight="700">hello-tizia</tspan>
            <tspan fillOpacity="0.5">/</tspan>
          </text>
          <path d="M148 58 L148 78 L120 78" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.3" fill="none" />
          <text x="24" y="96" fontSize="11.5" fill="currentColor" fillOpacity="0.7">id tài khoản đã cài app</text>
          <path d="M232 58 L232 108 L300 108" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.3" fill="none" />
          <text x="308" y="112" fontSize="11.5" fill="currentColor" fillOpacity="0.7">
            alias trong manifest.json
          </text>
        </svg>
      </div>
      <figcaption className="text-[12.5px] text-muted-foreground">
        Hai người khác nhau cài cùng một alias vẫn không đụng nhau — id tài khoản tách riêng kho chứa.
      </figcaption>
    </figure>
  );
}

function DiagramProxy() {
  return (
    <figure className="space-y-2">
      <div className="overflow-x-auto rounded-xl border border-border bg-black/20 p-4">
        <svg viewBox="0 0 720 250" className="h-auto w-full min-w-[560px]" role="img"
             aria-label="Luồng request: trình duyệt gọi Tizia, Tizia thêm header X-User và chuyển tới backend của app">
          {[
            [10, 'Trình duyệt', 'app của bạn'],
            [265, 'Tizia', 'kiểm tra đăng nhập'],
            [520, 'Backend của bạn', 'dịch vụ riêng'],
          ].map(([x, t, s]) => (
            <g key={t as string}>
              <rect x={x as number} y="20" width="190" height="56" rx="11"
                    fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.25" />
              <text x={(x as number) + 95} y="44" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">{t}</text>
              <text x={(x as number) + 95} y="62" textAnchor="middle" fontSize="10.5" fill="currentColor" fillOpacity="0.6">{s}</text>
            </g>
          ))}

          <path d="M200 48 L262 48" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" markerEnd="url(#arr2)" />
          <path d="M455 48 L517 48" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" markerEnd="url(#arr2)" />

          <text x="14" y="112" fontSize="10.5" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
            fetch(base + &apos;/sources&apos;)
          </text>
          <text x="14" y="130" fontSize="10.5" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.5">
            → /api/apps/my-app/…
          </text>

          <text x="275" y="112" fontSize="10.5" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
            + X-User-Id: 23
          </text>
          <text x="275" y="130" fontSize="10.5" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
            + X-User-Email
          </text>
          <text x="275" y="148" fontSize="10.5" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
            + X-User-Name
          </text>

          <text x="533" y="112" fontSize="11" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.75">
            GET /sources
          </text>
          <text x="533" y="130" fontSize="11" fill="currentColor" fillOpacity="0.5">
            (apiProxyTarget)
          </text>

          <path d="M517 190 L200 190" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5"
                strokeDasharray="5 4" markerEnd="url(#arr2)" />
          <text x="300" y="182" fontSize="11" fill="currentColor" fillOpacity="0.6">JSON trả nguyên vẹn về app</text>

          <defs>
            <marker id="arr2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0 0 L7 3.5 L0 7 z" fill="currentColor" fillOpacity="0.55" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="text-[12.5px] text-muted-foreground">
        App không bao giờ gọi thẳng backend — mọi thứ đi qua Tizia để được gắn danh tính.
      </figcaption>
    </figure>
  );
}

/* ── Dữ liệu bảng ────────────────────────────────────────────────────────── */

const SAMPLES = [
  {
    file: 'hello-tizia.zip',
    icon: '👋',
    name: 'Hello Tizia',
    desc: 'App tối giản nhất chạy được: một manifest, một trang HTML.',
    desc_en: '',
    learn: 'cách đọc __PORTAL_USER__ để biết ai đang mở app.',
  },
  {
    file: 'pomodoro.zip',
    icon: '🍅',
    name: 'Pomodoro Timer',
    desc: 'Đồng hồ tập trung 25/5 theo chu kỳ, có âm báo hết giờ.',
    desc_en: '',
    learn: 'quản lý trạng thái theo thời gian, giao diện gọn cho màn hình nhỏ.',
  },
  {
    file: 'flashcards.zip',
    icon: '🃏',
    name: 'Flashcards Lật Thẻ',
    desc: 'Tự nhập bộ thẻ, lật thẻ học, đánh dấu đã thuộc.',
    desc_en: '',
    learn: 'lưu dữ liệu người dùng bằng localStorage.',
  },
  {
    file: 'md-notes.zip',
    icon: '📝',
    name: 'Markdown Notes',
    desc: 'Gõ Markdown bên trái, xem kết quả bên phải, xuất file .md.',
    desc_en: '',
    learn: 'bố cục hai cột và cho người dùng tải file về.',
  },
  {
    file: 'color-palette.zip',
    icon: '🎨',
    name: 'Color Palette',
    desc: 'Nhập một màu, sinh bảng màu hài hoà, copy mã hex/rgb/hsl.',
    desc_en: '',
    learn: 'công cụ thuần tính toán, không cần lưu gì cả.',
  },
];

const MANIFEST_FIELDS: [string, string, string][] = [
  ['alias', 'bắt buộc', 'Định danh app: chữ thường + gạch nối, 2–41 ký tự, bắt đầu bằng chữ. Là URL của app. Thiếu thì lấy id.'],
  ['name', 'bắt buộc', 'Tên hiển thị trên thẻ app (tối đa 120 ký tự).'],
  ['description', 'nên có', 'Mô tả ngắn hiện dưới tên (tối đa 500 ký tự).'],
  ['icon', 'nên có', 'Dùng EMOJI (👋, 🧮). Tên icon Lucide kiểu "FileText" vẫn nhận nhưng Tizia hiển thị 🧩 thay thế.'],
  ['version', 'nên có', 'Ví dụ 1.0.0. Chỉ để hiển thị; cài đè không cần tăng version.'],
  ['hasBackend', 'tuỳ chọn', 'true nếu app cần backend riêng. Phải khai kèm apiProxyTarget.'],
  ['apiProxyTarget', 'tuỳ chọn', 'URL TUYỆT ĐỐI tới backend của bạn (http/https). Chấp nhận tên cũ base_url.'],
  ['supported_languages', 'tuỳ chọn', 'Ví dụ ["vi","en"]. Hiện Tizia luôn báo locale vi.'],
  ['type, hasFrontendOnly, functions…', 'bỏ qua', 'Giữ được để tương thích AI Portal; Tizia lưu nguyên manifest nhưng chưa dùng.'],
];

const INJECTED: [string, string][] = [
  ['<base href>', 'Trỏ vào thư mục app. Nhờ nó mà ./assets/… trong index.html luôn resolve đúng.'],
  ['window.__PORTAL_USER__', '{ id, email, name } của người đang mở app. id là chuỗi, ví dụ "23".'],
  ['window.__WRITE_API_BASE__', 'Đường dẫn gốc gọi backend của app: /api/apps/<alias>.'],
  ['window.__DATA_API_BASE__', 'Giống trên — có hai tên để tương thích app viết cho AI Portal.'],
  ['window.__PORTAL_THEME__', '"dark" hoặc "light" khi mở kèm ?theme=. Tizia cũng thêm class đó vào thẻ <html>.'],
  ['window.__AI_PORTAL_LOCALE__', 'Hiện luôn là "vi".'],
  ['window.__PORTAL_BASE_PATH__', 'Chỉ xuất hiện khi Tizia chạy dưới thư mục con. Bình thường không có.'],
];

const ERRORS: [string, string, string][] = [
  ['no_manifest', '400', 'Zip không có manifest.json ở gốc (hoặc trong đúng 1 thư mục con).'],
  ['bad_manifest', '400', 'manifest.json không phải JSON hợp lệ — thường do thừa dấu phẩy cuối.'],
  ['invalid_manifest', '400', 'Thiếu name, hoặc alias sai định dạng (phải chữ thường + gạch nối).'],
  ['no_index_html', '400', 'Thiếu public/index.html. Nhớ build TRƯỚC khi nén.'],
  ['bad_zip', '400', 'File tải lên không phải zip.'],
  ['too_many_files', '413', 'Quá 2000 file — thường do lỡ nén cả node_modules.'],
  ['too_large_uncompressed', '413', 'Giải nén vượt 100 MB.'],
  ['profile_incomplete', '403', 'Tài khoản chưa điền đủ hồ sơ. Vào trang cá nhân bổ sung rồi cài lại.'],
  ['unauthorized', '401', 'Chưa đăng nhập, hoặc cookie phiên đã hết hạn.'],
];

const TROUBLE: [string, string, string][] = [
  [
    'Mở app ra trang trắng',
    'Asset dùng đường dẫn tuyệt đối nên 404.',
    'Mở tab Network xem file .js có 404 không. Sửa base thành "./" rồi build lại.',
  ],
  [
    'App gọi localhost, hỏng ở máy người khác',
    'File .env lúc dev bị nướng vào bundle.',
    'Dọn .env (hoặc bỏ biến VITE_*) rồi build lại bản phát hành.',
  ],
  [
    'Backend trả 404 no_backend',
    'Manifest chưa khai apiProxyTarget.',
    'Thêm apiProxyTarget rồi CÀI ĐÈ lại — manifest chỉ đọc lúc cài.',
  ],
  [
    'Backend trả 502 unsafe_target',
    'apiProxyTarget là đường dẫn tương đối, hoặc trỏ vào mạng nội bộ.',
    'Đổi sang URL tuyệt đối công khai. Nếu buộc phải dùng dịch vụ nội bộ, nhờ quản trị bật cờ cho phép.',
  ],
  [
    'Backend trả 404 tuy dịch vụ vẫn sống',
    'Ghép sai đường dẫn: Tizia không tự thêm tiền tố /api.',
    'Viết luôn tiền tố vào target: https://…/my-app/api',
  ],
  [
    'Sửa code mà app không đổi',
    'Trình duyệt cache asset cũ.',
    'Tên file asset nên có hash (Vite làm sẵn). Nếu tự đặt tên, thêm ?v= khi đổi.',
  ],
];

export default function DevPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-11 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_HOWTO) }} />

      {/* Đầu trang */}
      <header className="space-y-3">
        <h1 className="text-2xl font-extrabold tracking-tight">
          🛠️ Tizia Dev{' '}
          <span className="text-lg font-semibold text-muted-foreground">· Hướng dẫn phát triển app</span>
        </h1>
        <P>
          App Tizia là một trang web tĩnh (SPA) đóng gói thành <Code>.zip</Code>. Bạn viết bằng gì cũng
          được — React, Vue, Svelte hay HTML thuần — miễn build ra được <Code>index.html</Code> cùng
          đống asset. Tizia dùng đúng chuẩn app của <b>AI Portal</b>, nên <b>một gói cài được cả hai nơi</b>.
        </P>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href="/portal-apps"
            className="rounded-lg bg-primary px-3.5 py-2 text-[13.5px] font-bold text-primary-foreground hover:opacity-90"
          >
            📥 Cài app của bạn
          </Link>
          <Link
            href="/apps"
            className="rounded-lg border border-border px-3.5 py-2 text-[13.5px] font-semibold hover:bg-white/5"
          >
            🧩 Xem app đang chạy
          </Link>
        </div>
      </header>

      <DiagramLifecycle />

      {/* Mục lục */}
      <nav className="rounded-2xl border border-border bg-card/40 p-4">
        <div className="mb-2 text-[13px] font-bold uppercase tracking-wide text-muted-foreground">Nội dung</div>
        <ol className="grid gap-1.5 text-[13.5px] sm:grid-cols-2">
          {[
            ['batdau', '1. Làm thử trong 5 phút'],
            ['tai-mau', '2. Tải app mẫu về'],
            ['goi', '3. Cấu trúc gói .zip'],
            ['manifest', '4. manifest.json'],
            ['host-inject', '5. Host đưa gì cho app'],
            ['luu-du-lieu', '6. Lưu dữ liệu ở đâu'],
            ['backend', '7. App có backend riêng'],
            ['build', '8. Build sao cho đúng'],
            ['dev-local', '9. Chạy thử ở máy'],
            ['cai-dat', '10. Cài đặt, cập nhật, công khai'],
            ['giao-dien', '11. Giao diện & trải nghiệm'],
            ['bao-mat', '12. Bảo mật & quyền riêng tư'],
            ['su-co', '13. Xử lý sự cố'],
            ['ma-loi', '14. Mã lỗi khi cài'],
            ['checklist', '15. Checklist trước khi nộp'],
            ['gioi-han', '16. Giới hạn hiện tại'],
            ['vidu', '17. App mẫu đang chạy'],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-muted-foreground hover:text-primary">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1 */}
      <Section id="batdau" title="1. Làm thử trong 5 phút">
        <P>Tạo hai file này rồi nén lại thành hello.zip:</P>
        <Pre label="manifest.json">{`{
  "alias": "hello-tizia",
  "name": "Hello Tizia",
  "description": "App đầu tiên của tôi",
  "icon": "👋",
  "version": "1.0.0"
}`}</Pre>
        <Pre label="public/index.html">{`<!doctype html>
<html lang="vi">
<head><meta charset="utf-8"><title>Hello Tizia</title></head>
<body style="font-family:system-ui;padding:32px">
  <h1>Xin chào 👋</h1>
  <p id="who">Đang đọc danh tính…</p>
  <script>
    // Tizia chèn sẵn biến này trước khi trang chạy.
    var u = window.__PORTAL_USER__;
    document.getElementById('who').textContent =
      u ? 'Chào ' + u.name + ' (id ' + u.id + ')' : 'Bạn chưa đăng nhập';
  </script>
</body>
</html>`}</Pre>
        <Pre label="Terminal">{`zip -r hello.zip manifest.json public/`}</Pre>
        <P>
          Kéo <Code>hello.zip</Code> vào{' '}
          <Link href="/portal-apps" className="text-primary hover:underline">
            trang Portal Apps
          </Link>
          :
        </P>
        <Figure
          src="/img/dev/portal-apps-dashboard.png"
          alt="Trang Portal Apps với vùng kéo thả file zip và danh sách app đã cài"
          width={1700}
          height={1124}
          caption="Vùng kéo thả nằm ngay đầu trang. Cài xong, app hiện ngay ở mục “App của tôi” bên dưới."
        />
        <P>Mở app lên, nó chào đúng tên người đang đăng nhập — danh tính do Tizia đưa sang:</P>
        <Figure
          src="/img/dev/hello-app.png"
          alt="App Hello Tizia đang chạy, hiển thị dòng chữ chào kèm tên và id người dùng"
          width={1700}
          height={576}
          caption="App chạy tại /portal-apps/u/<id-của-bạn>/hello-tizia/ — không cần cấu hình gì thêm."
        />
      </Section>

      {/* 2 */}
      <Section id="tai-mau" title="2. Tải app mẫu về">
        <P>
          Nhanh hơn nữa: tải một gói mẫu <b>đã đóng sẵn</b>, kéo thả vào Tizia để xem nó chạy, rồi giải
          nén ra sửa thành app của bạn. Mỗi gói là <b>một file HTML duy nhất</b>, không cần cài đặt gì,
          không cần build — mở bằng trình soạn thảo là đọc hiểu được ngay.
        </P>
        <div className="grid gap-3 sm:grid-cols-2">
          {SAMPLES.map((s) => (
            <div
              key={s.file}
              className="flex flex-col gap-2 rounded-xl border border-border bg-card/40 p-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[26px] leading-none">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-[14.5px] font-bold">{s.name}</div>
                  <div className="font-mono text-[11.5px] text-muted-foreground">{s.file}</div>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
              <p className="text-[12.5px] leading-relaxed text-primary/90">Học được: {s.learn}</p>
              <a
                href={`/downloads/apps/${s.file}`}
                download
                className="mt-auto rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-center text-[13px] font-bold text-primary hover:bg-primary/20"
              >
                ⬇ Tải {s.file}
              </a>
            </div>
          ))}
        </div>
        <Note kind="info" title="Cách dùng nhanh nhất">
          Tải <Code>hello-tizia.zip</Code> → kéo thả vào{' '}
          <Link href="/portal-apps" className="text-primary hover:underline">
            Portal Apps
          </Link>{' '}
          → mở app. Sau đó giải nén, sửa <Code>alias</Code> và <Code>name</Code> trong{' '}
          <Code>manifest.json</Code> thành của bạn, sửa <Code>public/index.html</Code> tuỳ ý, nén lại rồi
          cài đè. Đó là toàn bộ vòng làm việc.
        </Note>
      </Section>

      {/* 3 */}
      <Section id="goi" title="3. Cấu trúc gói .zip">
        <Pre label="my-app.zip">{`my-app.zip
├── manifest.json        ← bắt buộc, nằm ở gốc (hoặc trong 1 thư mục con duy nhất)
└── public/
    ├── index.html       ← bắt buộc, là điểm vào
    └── assets/          ← JS/CSS/ảnh đã build
        ├── index-abc123.js
        └── index-abc123.css`}</Pre>
        <P>
          Tizia <b>chỉ giải nén những gì nằm trong</b> <Code>public/</Code>. File để ngoài (README,
          thư mục <Code>schema/</Code>, mã nguồn…) bị bỏ qua, không gây lỗi. Manifest được đọc rồi lưu
          vào cơ sở dữ liệu.
        </P>
        <Table
          head={['Giới hạn', 'Giá trị']}
          rows={[
            ['File .zip', 'tối đa 30 MB'],
            ['Sau khi giải nén', 'tối đa 100 MB'],
            ['Số file', 'tối đa 2000'],
          ]}
        />
        <DiagramUrl />
      </Section>

      {/* 3 */}
      <Section id="manifest" title="4. manifest.json">
        <Table
          head={['Trường', 'Mức', 'Ý nghĩa']}
          rows={MANIFEST_FIELDS.map(([f, l, d]) => [f, l, d])}
        />
        <Note kind="info" title="Chọn alias cẩn thận">
          Alias vừa là URL vừa là khoá định danh khi cài đè. Đổi alias = tạo ra app thứ hai, người
          dùng cũ vẫn ở app cũ. Đặt xong thì đừng đổi.
        </Note>
      </Section>

      {/* 4 */}
      <Section id="host-inject" title="5. Host đưa gì cho app">
        <P>
          Khi phục vụ <Code>index.html</Code>, Tizia chèn thêm vào <Code>&lt;head&gt;</Code> mấy thứ
          sau. App chỉ việc đọc — không cần gọi API nào để biết mình đang chạy ở đâu, ai đang dùng:
        </P>
        <Table head={['Biến', 'Nội dung']} rows={INJECTED.map(([k, v]) => [k, v])} />
        <Sub>Nhìn thấy tận mắt</Sub>
        <P>Mở app rồi xem mã nguồn trang, phần đầu sẽ trông như thế này:</P>
        <Pre label="HTML Tizia trả về">{`<head>
  <base href="/portal-apps/u/23/hello-tizia/">
  <script>window.__WRITE_API_BASE__="/api/apps/hello-tizia";
          window.__DATA_API_BASE__="/api/apps/hello-tizia";</script>
  <script>window.__AI_PORTAL_LOCALE__="vi";</script>
  <script>window.__PORTAL_USER__={"id":"23","email":"","name":"Nguyễn Văn A"};</script>
  … phần <head> gốc của bạn giữ nguyên …`}</Pre>
        <Note kind="warn" title="Đừng dùng __PORTAL_USER__ để phân quyền">
          Biến này chỉ để hiển thị. Mọi kiểm tra quyền phải làm ở backend dựa trên header{' '}
          <Code>X-User-Id</Code> (mục 7) — người dùng sửa biến trong trình duyệt được, sửa header thì
          không.
        </Note>
        <Note kind="info" title="Trên Tizia luôn có người dùng">
          Tizia bắt đăng nhập trước khi mở app, nên <Code>__PORTAL_USER__</Code> gần như luôn tồn tại.
          Dù vậy vẫn nên viết phòng hờ <Code>u ? … : …</Code>, để app còn chạy được khi bạn mở thử ở
          máy hoặc đem sang host khác.
        </Note>
      </Section>

      {/* 5 */}
      <Section id="luu-du-lieu" title="6. Lưu dữ liệu ở đâu">
        <P>
          Tizia <b>không</b> cấp sẵn kho dữ liệu cho app. Bạn có ba lựa chọn, chọn theo mức độ nghiêm
          túc của dữ liệu:
        </P>
        <Table
          head={['Cách', 'Hợp với', 'Nhược điểm']}
          rows={[
            [
              'localStorage',
              'Nháp, cài đặt cá nhân, app dùng một mình như máy tính, ghi chú.',
              'Mất khi đổi máy/xoá cache. Không chia sẻ được.',
            ],
            [
              'Backend riêng (mục 7)',
              'Dữ liệu thật, nhiều người, cần thống kê hay chấm điểm.',
              'Bạn phải tự dựng và tự lo vận hành.',
            ],
            [
              'Không lưu gì',
              'Công cụ tính toán, chuyển đổi, tạo mã QR…',
              'Không có gì để mất — thường là lựa chọn tốt nhất.',
            ],
          ]}
        />
        <Note kind="info" title="Mẹo tách dữ liệu theo người dùng">
          Dùng localStorage thì thêm id vào khoá:{' '}
          <Code>{`localStorage.setItem('myapp:' + __PORTAL_USER__.id + ':notes', …)`}</Code> — máy tính
          chung ở trường thì hai học sinh mới không đọc nhầm dữ liệu của nhau.
        </Note>
      </Section>

      {/* 6 */}
      <Section id="backend" title="7. App có backend riêng">
        <P>
          Tizia <b>không chạy code backend nằm trong file zip</b>. Backend của bạn phải là một dịch vụ
          riêng đang chạy sẵn; bạn khai địa chỉ nó vào <Code>apiProxyTarget</Code>, còn Tizia làm proxy
          và gắn danh tính người dùng vào từng request.
        </P>
        <DiagramProxy />
        <Pre label="manifest.json">{`{
  "alias": "my-app",
  "name": "My App",
  "hasBackend": true,
  "apiProxyTarget": "https://api.vidu.vn/my-app"
}`}</Pre>
        <Sub>Phía app gọi thế nào</Sub>
        <Pre label="src/api.ts">{`const base = window.__WRITE_API_BASE__ || '';   // "/api/apps/my-app"

export async function getSources() {
  const r = await fetch(base + '/sources', { credentials: 'include' });
  if (r.status === 401) throw new Error('Phiên đăng nhập đã hết');
  return r.json();
}`}</Pre>
        <Sub>Phía backend đọc danh tính thế nào</Sub>
        <Pre label="Express">{`app.get('/sources', (req, res) => {
  const userId = req.header('X-User-Id');       // "23" — Tizia đã xác thực
  if (!userId) return res.status(401).json({ error: 'no_identity' });
  res.json({ items: db.listFor(userId) });
});`}</Pre>
        <Sub>Bốn luật phải nhớ</Sub>
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-muted-foreground">
          <li>
            <Code>apiProxyTarget</Code> phải là <b>URL tuyệt đối</b>. Đường dẫn kiểu{' '}
            <Code>/my-api</Code> bị từ chối (502).
          </li>
          <li>
            Backend trong mạng nội bộ (localhost, 10.x, 172.16–31.x, 192.168.x) mặc định <b>bị chặn</b>{' '}
            để tránh SSRF. Cần thì nhờ quản trị bật <Code>PORTAL_APPS_ALLOW_INTERNAL</Code>.
          </li>
          <li>
            Phần đuôi sau <Code>/api/apps/&lt;alias&gt;</Code> được ghép <b>nguyên xi</b> vào target, kể
            cả query. Tizia <b>không</b> tự thêm <Code>/api</Code>.
          </li>
          <li>
            Chỉ tin <Code>X-User-*</Code> khi request thực sự đến từ Tizia. Đặt backend sau tường lửa,
            hoặc kiểm tra thêm một khoá bí mật dùng chung.
          </li>
        </ul>
      </Section>

      {/* 7 */}
      <Section id="build" title="8. Build sao cho đúng">
        <P>
          Ba lỗi dưới đây chiếm gần hết số ca &quot;cài xong mở ra trắng trang&quot;. Đọc kỹ phần này
          tiết kiệm cho bạn cả buổi.
        </P>

        <div className="rounded-xl border border-border bg-card/40 p-4">
          <div className="text-[14px] font-bold">① Asset phải dùng đường dẫn tương đối</div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
            App nằm trong thư mục con, nên <Code>/assets/index.js</Code> (có gạch chéo đầu) sẽ 404.
          </p>
          <Pre label="vite.config.ts">{`export default defineConfig({
  base: './',              // ← quan trọng nhất
  build: { outDir: 'public' },
})`}</Pre>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Kiểm tra nhanh: mở <Code>public/index.html</Code>, thẻ script/link phải bắt đầu bằng{' '}
            <Code>./assets/</Code>. Nếu thấy <Code>/assets/</Code> hay{' '}
            <Code>/embed/ten-app/assets/</Code> là còn sai.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4">
          <div className="text-[14px] font-bold">② Đừng để .env lúc dev lọt vào bản build</div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
            Vite nướng thẳng giá trị <Code>VITE_*</Code> vào bundle. Nếu <Code>.env</Code> còn{' '}
            <Code>VITE_API_URL=http://localhost:4001</Code> thì app cài lên Tizia vẫn cắm đầu gọi{' '}
            <Code>localhost</Code> của máy người dùng và fail sạch. Tệ hơn là <Code>.env</Code> thường
            bị gitignore nên máy bạn có, máy CI không — hai bên build ra hai kết quả khác nhau.
          </p>
          <Pre label="Kiểm tra trước khi nộp">{`grep -r "localhost" public/assets/*.js | head`}</Pre>
        </div>

        <div className="rounded-xl border border-border bg-card/40 p-4">
          <div className="text-[14px] font-bold">③ Backend lấy từ host, đừng hard-code</div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
            Luôn ưu tiên <Code>window.__WRITE_API_BASE__</Code>, chỉ rơi về địa chỉ mặc định khi biến
            này rỗng. Như vậy cùng một gói chạy được ở Tizia, ở AI Portal và ở máy bạn.
          </p>
          <Pre label="src/api.ts">{`const base =
  (typeof window !== 'undefined' && window.__WRITE_API_BASE__) ||
  import.meta.env.VITE_API_URL ||
  '';`}</Pre>
        </div>

        <Sub>Cấu hình mẫu theo công cụ</Sub>
        <Table
          head={['Công cụ', 'Cần đặt']}
          rows={[
            ['Vite', <><Code>base: &apos;./&apos;</Code></>],
            ['Create React App', <><Code>&quot;homepage&quot;: &quot;.&quot;</Code> trong package.json</>],
            ['Next.js', <>Xuất tĩnh: <Code>output: &apos;export&apos;</Code> + <Code>assetPrefix: &apos;./&apos;</Code></>],
            ['HTML thuần', <>Chỉ cần viết <Code>./style.css</Code>, đừng viết <Code>/style.css</Code></>],
          ]}
        />
      </Section>

      {/* 8 */}
      <Section id="dev-local" title="9. Chạy thử ở máy trước khi đóng gói">
        <P>
          Ở máy bạn không có Tizia nên <Code>__PORTAL_USER__</Code> không tồn tại. Giả lập vài dòng là
          đủ để phát triển thoải mái:
        </P>
        <Pre label="index.html (chỉ khi dev)">{`<script>
  // Giả lập môi trường Tizia khi chạy ở localhost.
  if (location.hostname === 'localhost') {
    window.__PORTAL_USER__ = { id: '1', email: 'dev@local', name: 'Dev' };
    window.__WRITE_API_BASE__ = 'http://localhost:4000';   // backend dev của bạn
  }
</script>`}</Pre>
        <P>
          Đoạn này nằm trong <Code>index.html</Code> nên vẫn theo vào bản build — nhưng vì có điều kiện{' '}
          <Code>localhost</Code> nên lên Tizia nó không chạy. Muốn sạch hơn thì đặt trong file riêng và
          loại khi build.
        </P>
        <Note kind="info" title="Thử nhanh cả vòng">
          Cài đè mất vài giây, nên cách nhanh nhất để kiểm tra thật là: build → zip → kéo thả → mở app.
          Lặp lại thoải mái, app cũ tự bị thay.
        </Note>
      </Section>

      {/* 9 */}
      <Section id="cai-dat" title="10. Cài đặt, cập nhật, công khai">
        <Sub>Cài lần đầu</Sub>
        <P>
          Kéo thả <Code>.zip</Code> vào{' '}
          <Link href="/portal-apps" className="text-primary hover:underline">
            trang Portal Apps
          </Link>
          . Cần đăng nhập và hồ sơ đã điền đủ.
        </P>
        <Sub>Cập nhật</Sub>
        <P>
          Cài lại đúng <Code>alias</Code> đó là xong — bản cũ bị thay hoàn toàn (Tizia giải nén ra thư
          mục tạm rồi mới tráo, nên app không bao giờ ở trạng thái nửa vời). URL không đổi, người dùng
          không phải làm gì.
        </P>
        <Sub>Công khai cho mọi người</Sub>
        <P>
          Mặc định app chỉ mình bạn thấy. Khi muốn phát hành cho cả trường, nhờ quản trị viên bấm công
          khai — lúc đó app xuất hiện trong mục &quot;Apps cộng đồng&quot; ở trang Ứng dụng:
        </P>
        <Figure
          src="/img/dev/apps-grid.png"
          alt="Trang Ứng dụng của Tizia, mục Apps cộng đồng hiển thị các thẻ app đã cài"
          width={1700}
          height={893}
          caption="Mỗi app là một thẻ: icon, tên, alias, mô tả trong manifest. Viết mô tả cho tử tế — người học đọc đúng dòng đó để quyết định có mở hay không."
        />
        <Sub>Tự động hoá bằng API</Sub>
        <Pre label="Terminal">{`curl -X POST https://tizia.vn/api/portal-apps/install \\
  -b "tizia_sid=<cookie phiên của bạn>" \\
  -H "Content-Type: application/zip" \\
  --data-binary @my-app.zip`}</Pre>
        <Table
          head={['Endpoint', 'Việc']}
          rows={[
            ['POST /api/portal-apps/install', 'Cài hoặc cài đè app của chính bạn.'],
            ['GET /api/portal-apps', 'Liệt kê app của bạn + app đã công khai + app có sẵn.'],
            ['DELETE /api/portal-apps/:id', 'Gỡ app (chủ app hoặc quản trị).'],
            ['POST /api/portal-apps/:id/publish', 'Công khai cho mọi người — cần quyền quản trị.'],
          ]}
        />
      </Section>

      {/* 10 */}
      <Section id="giao-dien" title="11. Giao diện & trải nghiệm">
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-muted-foreground">
          <li>
            <b>Nền tối là mặc định.</b> Tizia dark-only ở hầu hết trang. App nền trắng vẫn mở được
            nhưng chói mắt khi người học đang đi từ trang tối sang. Nếu làm được cả hai nền thì đọc{' '}
            <Code>__PORTAL_THEME__</Code>.
          </li>
          <li>
            <b>Người dùng là học sinh, sinh viên.</b> Chữ tiếng Việt, câu ngắn, nút to. Tránh thuật ngữ
            tiếng Anh không chú giải.
          </li>
          <li>
            <b>Chạy được trên màn hình hẹp.</b> Nhiều em học bằng máy tính bảng hoặc điện thoại.
          </li>
          <li>
            <b>Đừng tự mở cửa sổ mới hay chuyển hướng ra ngoài</b> — app đang nằm trong khung của
            Tizia, làm vậy người học lạc mất đường về.
          </li>
          <li>
            <b>Trạng thái rỗng phải nói được gì đó.</b> &quot;Chưa có dữ liệu&quot; kèm một nút để bắt
            đầu, đừng để màn hình trống trơn.
          </li>
        </ul>
      </Section>

      {/* 11 */}
      <Section id="bao-mat" title="12. Bảo mật & quyền riêng tư">
        <Note kind="bad" title="Người dùng Tizia phần lớn là trẻ em">
          Dữ liệu học tập của trẻ là dữ liệu nhạy cảm. Đừng gửi bất cứ thứ gì ra dịch vụ bên thứ ba khi
          không thật sự cần, và nếu có thì phải nói rõ trong mô tả app.
        </Note>
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-muted-foreground">
          <li>
            <b>Không nhúng khoá API vào bundle.</b> Mã frontend ai cũng đọc được. Khoá phải nằm ở
            backend của bạn.
          </li>
          <li>
            <b>Không tự dựng form đăng nhập.</b> Người dùng đã đăng nhập Tizia rồi; hỏi mật khẩu lần nữa
            là dấu hiệu lừa đảo.
          </li>
          <li>
            <b>Backend phải chạy HTTPS</b> nếu đặt ngoài mạng nội bộ.
          </li>
          <li>
            <b>Kiểm tra quyền theo <Code>X-User-Id</Code></b>, đừng tin id do app gửi lên trong body.
          </li>
          <li>
            <b>Chỉ xin đúng thứ cần.</b> App tạo mã QR thì không có lý do gì đụng tới camera hay vị trí.
          </li>
        </ul>
      </Section>

      {/* 12 */}
      <Section id="su-co" title="13. Xử lý sự cố">
        <Table
          head={['Triệu chứng', 'Nguyên nhân hay gặp', 'Cách sửa']}
          rows={TROUBLE.map(([a, b, c]) => [a, b, c])}
        />
        <Note kind="info" title="Cách soi nhanh nhất">
          Mở app, bật DevTools (F12) → tab <b>Network</b>. File nào đỏ là biết ngay hỏng ở đâu: asset
          404 thì lỗi đường dẫn, <Code>/api/apps/…</Code> 502 thì lỗi khai backend, 401 thì hết phiên
          đăng nhập.
        </Note>
      </Section>

      {/* 13 */}
      <Section id="ma-loi" title="14. Mã lỗi khi cài">
        <Table head={['Mã', 'HTTP', 'Nghĩa là gì']} rows={ERRORS.map(([c, h, m]) => [c, h, m])} />
      </Section>

      {/* 14 */}
      <Section id="checklist" title="15. Checklist trước khi nộp">
        <ul className="space-y-2 text-[14px] leading-relaxed text-muted-foreground">
          {[
            'index.html trỏ asset bằng ./ — không còn đường dẫn tuyệt đối.',
            'Đã grep bundle: không còn localhost, không còn khoá API.',
            'Mở app khi chưa đăng nhập cũng không vỡ (phòng khi chạy ở host khác).',
            'Gọi backend qua __WRITE_API_BASE__, không gọi thẳng domain riêng.',
            'Thử ở khung hẹp 375px — nút vẫn bấm được, chữ không tràn.',
            'Đọc được trên nền tối.',
            'alias, name, description, icon (emoji), version đã điền đúng.',
            'Zip không lẫn node_modules, không lẫn mã nguồn.',
            'Cài thử lên tài khoản của mình và bấm hết các nút một lượt.',
          ].map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="text-primary">☐</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 15 */}
      <Section id="gioi-han" title="16. Giới hạn hiện tại">
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-muted-foreground">
          <li>
            <b>Không chạy code backend trong zip.</b> App kiểu AI Portal đóng gói sẵn{' '}
            <Code>dist/embed.js</Code> chỉ chạy được phần giao diện; muốn có backend thì tách ra dịch vụ
            riêng rồi khai <Code>apiProxyTarget</Code>.
          </li>
          <li>
            <b>Không chạy file .sql trong zip.</b> Thư mục <Code>schema/</Code> được chấp nhận nhưng bỏ
            qua — app tự lo phần lưu trữ.
          </li>
          <li>
            <b>
              Khai báo <Code>functions[]</Code> chưa dùng được.
            </b>{' '}
            Tizia lưu lại nhưng trợ lý AI chưa tự gọi hàm của app.
          </li>
          <li>
            <b>Icon Lucide chưa vẽ được.</b> Manifest ghi <Code>&quot;icon&quot;: &quot;FileText&quot;</Code>{' '}
            thì Tizia hiển thị 🧩. Dùng emoji để có icon đúng ý.
          </li>
          <li>
            Định danh người dùng ở Tizia là <b>số</b>, ở AI Portal là UUID. Backend nào ràng buộc định
            dạng UUID cần nới ra.
          </li>
          <li>
            Chưa có kho app chung để người khác tự cài — hiện phải nhờ quản trị công khai từng app.
          </li>
        </ul>
      </Section>

      {/* 16 */}
      <Section id="vidu" title="17. App mẫu đang chạy">
        <P>
          Sáu app dưới đây đang chạy thật trên Tizia bằng đúng cơ chế mô tả ở trên. Mở ra xem trước khi
          bắt tay làm app của bạn:
        </P>
        <Table
          head={['App', 'Kiểu', 'Đáng xem vì']}
          rows={[
            [
              'qrcode',
              'không backend',
              'Công cụ thuần frontend, gọn nhất để tham khảo cấu trúc.',
            ],
            ['annota', 'localStorage', 'Dữ liệu phức tạp mà vẫn không cần backend.'],
            ['quantis', 'localStorage', 'App nhiều màn hình, nhiều tab.'],
            ['bibliomap', 'localStorage', 'Đọc __PORTAL_USER__ để hiện tên người dùng.'],
            ['library-search', 'có backend', 'Đi qua proxy /api/apps, tra cứu hơn 137.000 bản ghi.'],
            ['convertum', 'có backend', 'App quy đổi điểm, cùng cơ chế.'],
          ]}
        />
        <P>
          Vướng chỗ nào, gửi yêu cầu bằng nút góp ý ở góc màn hình — cùng đường với góp ý của người học,
          và có người đọc thật.
        </P>
      </Section>
    </div>
  );
}
