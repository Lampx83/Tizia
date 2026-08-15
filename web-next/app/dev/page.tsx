import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tizia Dev · Hướng dẫn phát triển app cho Tizia',
  description:
    'Tài liệu dành cho lập trình viên: đóng gói app SPA thành .zip (manifest.json + public/), cài vào Tizia, đọc danh tính người dùng, nối backend riêng qua proxy /api/apps. Cùng một gói chạy được cả trên AI Portal.',
  keywords: 'Tizia dev, portal app, phát triển app Tizia, manifest.json, AI Portal app, SDK Tizia',
  alternates: { canonical: 'https://tizia.vn/dev' },
  openGraph: {
    type: 'website',
    siteName: 'Tizia',
    locale: 'vi_VN',
    title: 'Tizia Dev · Hướng dẫn phát triển app',
    description:
      'Đóng gói app SPA thành .zip rồi cài thẳng vào Tizia. Tài liệu đầy đủ: manifest, biến host inject, proxy backend, cách build đúng.',
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

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <h2 className="border-b border-border pb-2 text-[19px] font-bold tracking-tight">
        <a href={`#${id}`} className="hover:text-primary">
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em] font-mono">{children}</code>
  );
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
  kind?: 'info' | 'warn';
  title: string;
  children: React.ReactNode;
}) {
  const tone =
    kind === 'warn'
      ? 'border-amber-500/30 bg-amber-500/[.08]'
      : 'border-primary/30 bg-primary/[.07]';
  return (
    <div className={`rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${tone}`}>
      <div className="mb-1 font-bold">{title}</div>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

/* ── Dữ liệu bảng ────────────────────────────────────────────────────────── */

const MANIFEST_FIELDS: [string, string, string][] = [
  ['alias', 'bắt buộc', 'Định danh app, chữ thường + gạch nối, 2–41 ký tự, bắt đầu bằng chữ. Là URL của app. Thiếu thì lấy id.'],
  ['name', 'bắt buộc', 'Tên hiển thị trên thẻ app (tối đa 120 ký tự).'],
  ['description', 'nên có', 'Mô tả ngắn hiện dưới tên (tối đa 500 ký tự).'],
  ['icon', 'nên có', 'Emoji, hoặc tên icon Lucide nếu bạn muốn dùng chung gói với AI Portal.'],
  ['version', 'nên có', 'Ví dụ 1.0.0. Cài lại cùng alias = ghi đè bản cũ.'],
  ['hasBackend', 'tuỳ chọn', 'true nếu app cần backend riêng. Phải khai kèm apiProxyTarget.'],
  ['apiProxyTarget', 'tuỳ chọn', 'URL TUYỆT ĐỐI tới backend của bạn (http/https). Chấp nhận tên cũ base_url.'],
  ['supported_languages', 'tuỳ chọn', 'Ví dụ ["vi","en"]. Hiện Tizia luôn báo locale vi.'],
];

const INJECTED: [string, string][] = [
  ['<base href>', 'Trỏ vào thư mục app. Nhờ nó mà ./assets/... trong index.html luôn resolve đúng.'],
  ['window.__PORTAL_USER__', '{ id, email, name } của người đang đăng nhập. Là null/không có nếu chưa đăng nhập.'],
  ['window.__WRITE_API_BASE__', 'Đường dẫn gốc để gọi backend của app: /api/apps/<alias>.'],
  ['window.__DATA_API_BASE__', 'Giống trên — có cả hai tên để tương thích app viết cho AI Portal.'],
  ['window.__PORTAL_THEME__', '"dark" hoặc "light" khi mở app kèm ?theme=. Tizia cũng thêm class tương ứng vào <html>.'],
  ['window.__AI_PORTAL_LOCALE__', 'Hiện luôn là "vi".'],
  ['window.__PORTAL_BASE_PATH__', 'Chỉ có khi Tizia chạy dưới thư mục con. Bình thường không xuất hiện.'],
];

export default function DevPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_HOWTO) }}
      />

      {/* Đầu trang */}
      <header className="space-y-3">
        <h1 className="text-2xl font-extrabold tracking-tight">
          🛠️ Tizia Dev{' '}
          <span className="text-lg font-semibold text-muted-foreground">
            · Hướng dẫn phát triển app
          </span>
        </h1>
        <p className="text-[14.5px] leading-relaxed text-muted-foreground">
          App Tizia là một trang web tĩnh (SPA) đóng gói thành <Code>.zip</Code>. Bạn viết bằng gì
          cũng được — React, Vue, Svelte hay HTML thuần — miễn build ra được{' '}
          <Code>index.html</Code> cùng đống asset. Tizia dùng đúng chuẩn app của{' '}
          <b>AI Portal</b>, nên <b>một gói cài được cả hai nơi</b>.
        </p>
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

      {/* Mục lục */}
      <nav className="rounded-2xl border border-border bg-card/40 p-4">
        <div className="mb-2 text-[13px] font-bold uppercase tracking-wide text-muted-foreground">
          Nội dung
        </div>
        <ol className="grid gap-1.5 text-[13.5px] sm:grid-cols-2">
          {[
            ['batdau', '1. Làm thử trong 5 phút'],
            ['goi', '2. Cấu trúc gói .zip'],
            ['manifest', '3. manifest.json'],
            ['host-inject', '4. Host đưa gì cho app'],
            ['backend', '5. App có backend riêng'],
            ['build', '6. Build sao cho đúng'],
            ['cai-dat', '7. Cài đặt & công khai'],
            ['checklist', '8. Checklist trước khi nộp'],
            ['gioi-han', '9. Giới hạn hiện tại'],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-muted-foreground hover:text-primary">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="batdau" title="1. Làm thử trong 5 phút">
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Tạo hai file này rồi nén lại thành <Code>hello.zip</Code>:
        </p>
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
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Kéo file <Code>hello.zip</Code> vào{' '}
          <Link href="/portal-apps" className="text-primary hover:underline">
            trang Portal Apps
          </Link>
          . Xong — app chạy tại <Code>/portal-apps/u/&lt;id-của-bạn&gt;/hello-tizia/</Code> và hiện
          trong trang Ứng dụng.
        </p>
      </Section>

      <Section id="goi" title="2. Cấu trúc gói .zip">
        <Pre label="my-app.zip">{`my-app.zip
├── manifest.json        ← bắt buộc, nằm ở gốc (hoặc trong 1 thư mục con duy nhất)
└── public/
    ├── index.html       ← bắt buộc, là điểm vào
    └── assets/          ← JS/CSS/ảnh đã build
        ├── index-abc123.js
        └── index-abc123.css`}</Pre>
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Giới hạn: file zip <b>≤ 30 MB</b>, giải nén ra <b>≤ 100 MB</b>, <b>≤ 2000 file</b>. Cài lại
          cùng <Code>alias</Code> sẽ thay thế bản cũ, nên cứ sửa rồi cài đè thoải mái.
        </p>
      </Section>

      <Section id="manifest" title="3. manifest.json">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-white/[.04] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">Trường</th>
                <th className="px-3 py-2 font-semibold">Mức</th>
                <th className="px-3 py-2 font-semibold">Ý nghĩa</th>
              </tr>
            </thead>
            <tbody>
              {MANIFEST_FIELDS.map(([field, level, desc]) => (
                <tr key={field} className="border-t border-border align-top">
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[12px]">{field}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{level}</td>
                  <td className="px-3 py-2 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note kind="info" title="Chọn alias cẩn thận">
          Alias chính là URL và là khoá định danh khi cài đè. Đổi alias = tạo ra app thứ hai, người
          dùng cũ vẫn ở app cũ.
        </Note>
      </Section>

      <Section id="host-inject" title="4. Host đưa gì cho app">
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Khi phục vụ <Code>index.html</Code>, Tizia chèn thêm vào <Code>&lt;head&gt;</Code> mấy thứ
          sau. App chỉ việc đọc, không cần gọi API nào để biết mình đang chạy ở đâu:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-white/[.04] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">Biến</th>
                <th className="px-3 py-2 font-semibold">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              {INJECTED.map(([k, v]) => (
                <tr key={k} className="border-t border-border align-top">
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[12px]">{k}</td>
                  <td className="px-3 py-2 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note kind="warn" title="Đừng tin __PORTAL_USER__ để phân quyền">
          Biến này chỉ để hiển thị. Mọi kiểm tra quyền phải làm ở backend, dựa trên header{' '}
          <Code>X-User-Id</Code> mà Tizia gửi kèm (xem mục 5) — người dùng sửa biến trong trình duyệt
          được, sửa header thì không.
        </Note>
      </Section>

      <Section id="backend" title="5. App có backend riêng">
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Tizia <b>không chạy code backend nằm trong file zip</b>. Backend của bạn phải là một dịch
          vụ riêng đang chạy sẵn; bạn khai địa chỉ nó vào <Code>apiProxyTarget</Code>, còn Tizia làm
          proxy và gắn danh tính người dùng vào từng request.
        </p>
        <Pre label="manifest.json">{`{
  "alias": "my-app",
  "name": "My App",
  "hasBackend": true,
  "apiProxyTarget": "https://api.vidu.vn/my-app"
}`}</Pre>
        <Pre label="Luồng đi của một request">{`Trình duyệt   fetch(window.__WRITE_API_BASE__ + '/sources')
              →  GET https://tizia.vn/api/apps/my-app/sources
Tizia         kiểm tra đăng nhập, tìm app theo alias
              →  GET https://api.vidu.vn/my-app/sources
                 X-User-Id:    23
                 X-User-Email: sv@example.com
                 X-User-Name:  Nguyễn Văn A
Backend       trả JSON  →  Tizia chuyển nguyên về trình duyệt`}</Pre>
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-muted-foreground">
          <li>
            <Code>apiProxyTarget</Code> phải là <b>URL tuyệt đối</b>. Đường dẫn kiểu{' '}
            <Code>/my-api</Code> sẽ bị từ chối.
          </li>
          <li>
            Backend đặt trong mạng nội bộ (localhost, 10.x, 172.16–31.x, 192.168.x) mặc định{' '}
            <b>bị chặn</b> để tránh SSRF. Cần dùng thì báo quản trị bật{' '}
            <Code>PORTAL_APPS_ALLOW_INTERNAL</Code>.
          </li>
          <li>
            Phần đuôi sau <Code>/api/apps/&lt;alias&gt;</Code> được ghép nguyên vào target, kể cả
            query — backend của bạn <b>không</b> tự có tiền tố <Code>/api</Code>. Muốn có thì viết
            luôn vào target: <Code>https://…/my-app/api</Code>.
          </li>
          <li>Người dùng chưa đăng nhập gọi vào đây sẽ nhận 401 — proxy luôn yêu cầu đăng nhập.</li>
        </ul>
      </Section>

      <Section id="build" title="6. Build sao cho đúng">
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Ba lỗi dưới đây chiếm gần hết số ca &quot;cài xong mở ra trắng trang&quot;. Đọc kỹ phần này
          tiết kiệm cho bạn cả buổi.
        </p>

        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card/40 p-4">
            <div className="text-[14px] font-bold">① Asset phải dùng đường dẫn tương đối</div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
              App nằm trong thư mục con, nên <Code>/assets/index.js</Code> (có gạch chéo đầu) sẽ 404.
              Với Vite, đặt <Code>base: &apos;./&apos;</Code>:
            </p>
            <Pre label="vite.config.ts">{`export default defineConfig({
  base: './',            // ← quan trọng nhất
  build: { outDir: 'public' },
})`}</Pre>
            <p className="mt-2 text-[13px] text-muted-foreground">
              Kiểm tra nhanh: mở <Code>public/index.html</Code>, các thẻ script/link phải bắt đầu
              bằng <Code>./assets/</Code>.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/40 p-4">
            <div className="text-[14px] font-bold">② Đừng để .env lúc dev lọt vào bản build</div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
              Vite nướng thẳng giá trị <Code>VITE_*</Code> vào bundle. Nếu file <Code>.env</Code> của
              bạn còn <Code>VITE_API_URL=http://localhost:4001</Code> thì app cài lên Tizia vẫn cắm
              đầu gọi <Code>localhost</Code> của máy người dùng và fail sạch. Trước khi build gói
              phát hành, dọn <Code>.env</Code> hoặc build ở máy sạch.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/40 p-4">
            <div className="text-[14px] font-bold">③ Backend lấy từ host, đừng hard-code</div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
              Luôn ưu tiên <Code>window.__WRITE_API_BASE__</Code>; chỉ rơi về địa chỉ mặc định khi
              biến này rỗng. Như vậy cùng một gói chạy được ở Tizia, ở AI Portal và ở máy bạn.
            </p>
            <Pre label="api.ts">{`const base =
  (typeof window !== 'undefined' && window.__WRITE_API_BASE__) ||
  import.meta.env.VITE_API_URL ||
  '';

export const api = (path: string) => fetch(base + path, { credentials: 'include' });`}</Pre>
          </div>
        </div>
      </Section>

      <Section id="cai-dat" title="7. Cài đặt & công khai">
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Cách thường dùng: kéo thả <Code>.zip</Code> vào{' '}
          <Link href="/portal-apps" className="text-primary hover:underline">
            trang Portal Apps
          </Link>
          . Cần đăng nhập và hồ sơ đã điền đủ. Muốn tự động hoá thì gọi API:
        </p>
        <Pre label="Terminal">{`# Cài (hoặc cài đè) — cần cookie đăng nhập
curl -X POST https://tizia.vn/api/portal-apps/install \\
  -b "tizia_sid=<session của bạn>" \\
  -H "Content-Type: application/zip" \\
  --data-binary @my-app.zip`}</Pre>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-white/[.04] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">Endpoint</th>
                <th className="px-3 py-2 font-semibold">Việc</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['POST /api/portal-apps/install', 'Cài hoặc cài đè app của chính bạn.'],
                ['GET /api/portal-apps', 'Liệt kê app của bạn + app đã công khai + app có sẵn.'],
                ['DELETE /api/portal-apps/:id', 'Gỡ app (chủ app hoặc quản trị).'],
                ['POST /api/portal-apps/:id/publish', 'Công khai cho mọi người — cần quyền quản trị.'],
              ].map(([ep, what]) => (
                <tr key={ep} className="border-t border-border align-top">
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[12px]">{ep}</td>
                  <td className="px-3 py-2 text-muted-foreground">{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note kind="info" title="Mặc định app chỉ mình bạn thấy">
          Cài xong, app nằm trong khu vực riêng của tài khoản bạn — tha hồ thử. Khi muốn phát hành
          cho cả trường, nhờ quản trị viên bấm công khai.
        </Note>
      </Section>

      <Section id="checklist" title="8. Checklist trước khi nộp">
        <ul className="space-y-2 text-[14px] leading-relaxed text-muted-foreground">
          {[
            'index.html trỏ asset bằng ./ — không có đường dẫn tuyệt đối.',
            'Đã build sạch, không còn localhost hay khoá API lẫn trong bundle.',
            'Mở app khi CHƯA đăng nhập vẫn không vỡ (__PORTAL_USER__ có thể không tồn tại).',
            'Gọi backend qua __WRITE_API_BASE__, không gọi thẳng domain riêng.',
            'Chạy thử ở khung hẹp (điện thoại) — nhiều người học bằng máy tính bảng.',
            'Giao diện đọc được trên nền tối, vì Tizia mặc định nền tối.',
            'alias, name, description, icon, version đã điền đúng.',
          ].map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="text-primary">☐</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="gioi-han" title="9. Giới hạn hiện tại">
        <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-muted-foreground">
          <li>
            <b>Không chạy code backend trong zip.</b> App kiểu AI Portal đóng gói sẵn{' '}
            <Code>dist/embed.js</Code> sẽ chỉ chạy phần giao diện; muốn có backend thì tách ra dịch
            vụ riêng rồi khai <Code>apiProxyTarget</Code>.
          </li>
          <li>
            <b>Không chạy file .sql trong zip.</b> App tự lo phần lưu trữ của mình.
          </li>
          <li>
            <b>
              Khai báo <Code>functions[]</Code> chưa dùng được.
            </b>{' '}
            Tizia lưu lại nhưng trợ lý AI chưa tự gọi hàm của app. Đừng phụ thuộc vào nó.
          </li>
          <li>
            Định danh người dùng ở Tizia là <b>số</b>, ở AI Portal là UUID. Backend nào ràng buộc
            định dạng UUID cần nới ra.
          </li>
        </ul>
        <p className="pt-1 text-[14px] leading-relaxed text-muted-foreground">
          Vướng chỗ nào, gửi yêu cầu bằng nút góc phải màn hình — cùng đường với góp ý của người học,
          và có người đọc thật.
        </p>
      </Section>
    </div>
  );
}
