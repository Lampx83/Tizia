'use client';

// Form liên hệ hợp tác của TỔ CHỨC (trang /hop-tac). Gửi POST /api/partnership/requests
// (Express, contexts/partnership). Kiểm tra chính ở server; client chỉ chặn sớm cho tiện.
//
// credentials: 'omit' — KHÔNG gửi cookie phiên: yêu cầu hợp tác không bao giờ gắn với
// tài khoản Tizia đang đăng nhập (kể cả tài khoản học sinh).
// Ô "website" là ô bẫy chống bot: ẩn với người dùng, trình đọc màn hình bỏ qua.

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ORG_TYPES: Array<[string, string]> = [
  ['university', 'Trường đại học/cao đẳng'],
  ['school', 'Trường phổ thông'],
  ['training_center', 'Trung tâm đào tạo'],
  ['company', 'Doanh nghiệp'],
  ['government', 'Cơ quan nhà nước'],
  ['other', 'Tổ chức khác (cơ sở y tế, hiệp hội…)'],
];

// Khớp AREAS ở server/contexts/partnership/index.js và các nhóm trên trang.
const AREAS: Array<[string, string]> = [
  ['org_license', 'Dùng Tizia cho đơn vị (gói tổ chức, triển khai riêng)'],
  ['integration', 'Tích hợp và API'],
  ['reseller', 'Đối tác giới thiệu và phân phối'],
  ['content', 'Hợp tác nội dung, học liệu'],
  ['research', 'Nghiên cứu chung'],
  ['other', 'Khác'],
];

const MSG_MAX = 3000;
const CLICK_IDS = ['gclid', 'fbclid', 'ttclid', 'msclkid', 'zclid'];

type Errors = Partial<Record<string, string>>;

// Nguồn truy cập: tham số UTM trên URL, loại mã click (không lưu mã), trang đến, tên miền giới thiệu.
function readSource() {
  try {
    const q = new URLSearchParams(window.location.search);
    let referrerHost: string | null = null;
    if (document.referrer) {
      const h = new URL(document.referrer).host;
      if (h && h !== window.location.host) referrerHost = h;
    }
    return {
      utmSource: q.get('utm_source'),
      utmMedium: q.get('utm_medium'),
      utmCampaign: q.get('utm_campaign'),
      utmContent: q.get('utm_content'),
      utmTerm: q.get('utm_term'),
      clickIdKind: CLICK_IDS.find((k) => q.has(k)) || null,
      landingPath: window.location.pathname,
      referrerHost,
    };
  } catch {
    return null;
  }
}

const selectCls =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm';

function Field({ id, label, required, error, hint, children }: {
  id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : <span className="font-normal text-muted-foreground">(không bắt buộc)</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-err`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function PartnershipForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [msgLen, setMsgLen] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '').trim();
    const body = {
      organization: get('organization'),
      orgType: get('orgType'),
      contactName: get('contactName'),
      email: get('email'),
      phone: get('phone'),
      area: get('area'),
      seats: get('seats'),
      message: get('message'),
      consent: fd.get('consent') === 'on',
      website: get('website'),
      source: readSource(),
    };
    const errs: Errors = {};
    if (!body.organization) errs.organization = 'Vui lòng nhập tên đơn vị.';
    if (!body.orgType) errs.orgType = 'Vui lòng chọn loại đơn vị.';
    if (!body.contactName) errs.contactName = 'Vui lòng nhập họ tên người liên hệ.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errs.email = 'Email không đúng định dạng.';
    if (!body.area) errs.area = 'Vui lòng chọn lĩnh vực hợp tác.';
    if (body.message.length < 10) errs.message = 'Vui lòng mô tả nhu cầu (ít nhất 10 ký tự).';
    if (!body.consent) errs.consent = 'Vui lòng đánh dấu ô xác nhận.';
    setErrors(errs);
    setFormError(null);
    if (Object.keys(errs).length) return;

    setBusy(true);
    try {
      const r = await fetch('/api/partnership/requests', {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await r.json().catch(() => ({} as Record<string, string>));
      if (r.ok) {
        setDone(true);
      } else if (r.status === 400 && data.field) {
        setErrors({ [data.field]: data.message || 'Thông tin chưa hợp lệ.' });
      } else if (r.status === 429) {
        setFormError('Bạn đã gửi quá nhiều lần trong thời gian ngắn. Vui lòng thử lại sau ít phút.');
      } else {
        setFormError(data.message || 'Chưa gửi được, vui lòng thử lại sau.');
      }
    } catch {
      setFormError('Lỗi mạng, vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-2 py-4 text-center" role="status">
        <div className="text-3xl">✅</div>
        <p className="text-lg font-medium">Đã gửi yêu cầu hợp tác</p>
        <p className="text-sm text-muted-foreground">
          Cảm ơn quý đơn vị. Chúng tôi sẽ phản hồi qua email đã cung cấp.
        </p>
      </div>
    );
  }

  const aria = (k: string) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-err` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="organization" label="Tên đơn vị" required error={errors.organization}>
          <Input id="organization" name="organization" maxLength={200} autoComplete="organization" required {...aria('organization')} />
        </Field>
        <Field id="orgType" label="Loại đơn vị" required error={errors.orgType}>
          <select id="orgType" name="orgType" defaultValue="" className={selectCls} required {...aria('orgType')}>
            <option value="" disabled>
              — Chọn loại đơn vị —
            </option>
            {ORG_TYPES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field id="contactName" label="Người liên hệ" required error={errors.contactName}>
          <Input id="contactName" name="contactName" maxLength={100} autoComplete="name" required {...aria('contactName')} />
        </Field>
        <Field id="email" label="Email công việc" required error={errors.email}>
          <Input id="email" name="email" type="email" maxLength={200} autoComplete="email" required {...aria('email')} />
        </Field>
        <Field id="phone" label="Điện thoại" error={errors.phone}>
          <Input id="phone" name="phone" type="tel" maxLength={30} autoComplete="tel" {...aria('phone')} />
        </Field>
        <Field id="seats" label="Số người dùng dự kiến" error={errors.seats}>
          <Input id="seats" name="seats" type="number" min={1} max={1000000} inputMode="numeric" {...aria('seats')} />
        </Field>
      </div>

      <Field id="area" label="Lĩnh vực hợp tác" required error={errors.area}>
        <select id="area" name="area" defaultValue="" className={selectCls} required {...aria('area')}>
          <option value="" disabled>
            — Chọn lĩnh vực —
          </option>
          {AREAS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Nội dung" required error={errors.message} hint={`${msgLen}/${MSG_MAX} ký tự`}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={MSG_MAX}
          required
          onChange={(e) => setMsgLen(e.target.value.length)}
          placeholder="Nhu cầu của đơn vị, số lớp/người học, thời gian dự kiến…"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
          {...aria('message')}
        />
      </Field>

      {/* Ô bẫy chống bot — người dùng không thấy. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-1.5">
        <label className="flex items-start gap-2.5 text-sm leading-relaxed">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" {...aria('consent')} />
          <span>
            Tôi từ 18 tuổi trở lên, gửi thông tin này với tư cách đại diện cho đơn vị nêu trên và đồng ý để Tizia liên hệ qua
            email/điện thoại đã cung cấp về nội dung hợp tác, theo mục{' '}
            <a href="#du-lieu-lien-he" className="font-medium text-primary hover:underline">
              Dữ liệu liên hệ hợp tác
            </a>
            . <span className="text-destructive">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-err" className="text-xs text-destructive" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {formError && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {formError}
        </p>
      )}

      <Button type="submit" disabled={busy}>
        {busy ? 'Đang gửi…' : 'Gửi yêu cầu hợp tác'}
      </Button>
    </form>
  );
}
