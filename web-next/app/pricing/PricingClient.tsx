'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { USER_PLANS, effectivePlanId, fmtVnd, type Me } from './plans';
import './pricing.css';

const ORDER = ['guest', 'free', 'plus', 'pro'] as const;
const ICONS: Record<string, string> = { guest: '👀', free: '🌱', plus: '✨', pro: '🚀' };
const TAGLINES: Record<string, string> = {
  guest: 'Thử trải nghiệm không cần đăng ký',
  free: 'Đầy đủ Mầm non + Tiểu học (Lớp 1–2)',
  plus: 'Tất cả trường K-12 + Đại học, không quảng cáo',
  pro: 'Mọi thứ ở Plus + AI cá nhân hoá, chấm tự luận, báo cáo PH',
};
const FEATURES: Record<string, [string, number][]> = {
  guest: [['Xem Mầm non', 1], ['Lưu tiến độ', 0], ['Toàn bộ trường', 0], ['AI gợi ý', 0]],
  free: [['Mầm non + Tiểu học (Lớp 1–2)', 1], ['Lưu tiến độ', 1], ['20 lượt AI/ngày', 1], ['Toàn bộ trường', 0], ['AI cá nhân hoá', 0]],
  plus: [['Tất cả trường K-12 → ĐH', 1], ['Lưu tiến độ + đồng bộ thiết bị', 1], ['50 lượt AI gợi ý cơ bản/ngày', 1], ['Không quảng cáo', 1], ['AI cá nhân hoá', 0]],
  pro: [['Tất cả ở Plus', 1], ['300 lượt AI/ngày', 1], ['AI chấm bài tự luận + giải thích', 1], ['Lộ trình AI theo điểm yếu', 1], ['Báo cáo phụ huynh AI sinh tự động', 1], ['Truy cập sớm trường mới', 1]],
};

type Cycle = 'month' | 'year';
type Msg = { kind: 'err' | 'ok'; text: string; html?: boolean } | null;

function priceLabel(planId: string, cycle: Cycle) {
  const p = USER_PLANS[planId];
  if (!p || p.price_month_vnd === 0) return { num: 'Miễn phí', per: '', note: '', free: true };
  const v = cycle === 'year' ? p.price_year_vnd : p.price_month_vnd;
  const perMo = cycle === 'year' ? Math.round(p.price_year_vnd / 12) : null;
  return {
    num: fmtVnd(v),
    per: cycle === 'year' ? '/năm' : '/tháng',
    note: perMo ? `≈ ${fmtVnd(perMo)}/tháng · tiết kiệm 2 tháng` : '',
    free: false,
  };
}

export default function PricingClient({ me }: { me: Me }) {
  const params = useSearchParams();
  const want = params.get('want'); // gói user muốn (từ paywall): plus|pro
  const wantDomain = params.get('domain');

  const currentPlan = effectivePlanId(me);
  const [cycle, setCycle] = useState<Cycle>('month');
  const [msg, setMsg] = useState<Msg>(null);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);

  async function upgrade(plan: string) {
    setMsg(null);
    if (!me) {
      const ret = encodeURIComponent('/pricing?want=' + plan);
      window.location.href = 'login.html?return=' + ret;
      return;
    }
    setBusyPlan(plan);
    try {
      const r = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ plan, cycle }),
      });
      const data = await r.json();
      if (!r.ok) {
        if (data?.error === 'payment_unconfigured') {
          setMsg({
            kind: 'err',
            html: true,
            text: '⚠️ Cổng thanh toán chưa cấu hình (sandbox). Liên hệ admin hoặc đặt biến môi trường <code>VNPAY_TMN_CODE</code> &amp; <code>VNPAY_HASH_SECRET</code> để bật.',
          });
        } else {
          setMsg({ kind: 'err', text: '⚠️ ' + (data?.error || 'Không tạo được đơn') });
        }
        setBusyPlan(null);
        return;
      }
      setMsg({ kind: 'ok', text: '✓ Đơn đã tạo (' + data.orderRef + ') — đang chuyển đến cổng thanh toán…' });
      setTimeout(() => { window.location.href = data.payUrl; }, 600);
    } catch {
      setMsg({ kind: 'err', text: '⚠️ Lỗi mạng — thử lại sau.' });
      setBusyPlan(null);
    }
  }

  const ctxBanner = wantDomain ? (
    <div className="ctx-banner">
      Để mở khoá <strong>{wantDomain}</strong>, bạn cần gói{' '}
      <strong>{USER_PLANS[want ?? '']?.name || 'Plus'}</strong> trở lên.
    </div>
  ) : want ? (
    <div className="ctx-banner">
      Bạn đang xem gói {USER_PLANS[want]?.name || want} — chọn chu kỳ và bấm Nâng cấp bên dưới.
    </div>
  ) : null;

  return (
    <>
      <div className="hero">
        <a href="./" className="back">← Quay lại trang chủ</a>
        <h1>Chọn gói phù hợp cho bạn</h1>
        <p>Tizia mở miễn phí Mầm non + Tiểu học. Nâng cấp để học hết K-12, đại học và mở AI cá nhân hoá.</p>
        {ctxBanner}
      </div>

      <div className="toggle-host">
        <div className="cycle-toggle" role="tablist">
          <button className={cycle === 'month' ? 'on' : ''} type="button" onClick={() => setCycle('month')}>Theo tháng</button>
          <button className={cycle === 'year' ? 'on' : ''} type="button" onClick={() => setCycle('year')}>
            Theo năm <span className="save">−2 tháng</span>
          </button>
        </div>
      </div>

      <div className="plans">
        {ORDER.map((planId) => {
          const p = USER_PLANS[planId];
          const isCurrent = currentPlan === planId;
          const isHighlight = want === planId || (!want && planId === 'pro');
          const price = priceLabel(planId, cycle);
          const classes = ['plan'];
          if (isHighlight) classes.push('highlight');
          if (isCurrent) classes.push('current');

          let cta: React.ReactNode;
          if (planId === 'guest') {
            cta = me
              ? <button className="cta muted" disabled>Bạn đã đăng ký</button>
              : <a className="cta muted" href="./">Tiếp tục dùng thử</a>;
          } else if (planId === 'free') {
            cta = me
              ? (currentPlan === 'free'
                ? <button className="cta muted" disabled>Gói hiện tại</button>
                : <button className="cta muted" disabled>Bao gồm sẵn</button>)
              : <a className="cta muted" href="register.html">Đăng ký miễn phí</a>;
          } else {
            const same = currentPlan === planId;
            cta = same
              ? <button className="cta muted" disabled>Gói hiện tại</button>
              : (
                <button
                  className="cta primary"
                  disabled={busyPlan === planId}
                  onClick={() => upgrade(planId)}
                >
                  {busyPlan === planId
                    ? 'Đang tạo đơn…'
                    : (currentPlan === 'pro' && planId !== 'pro' ? 'Đổi sang gói này' : 'Nâng cấp ' + p.name)}
                </button>
              );
          }

          return (
            <div key={planId} className={classes.join(' ')}>
              {isCurrent
                ? <span className="ribbon current">Đang dùng</span>
                : (isHighlight ? <span className="ribbon">Khuyên dùng</span> : null)}
              <h2>{ICONS[planId]} {p.name}</h2>
              <p className="tagline">{TAGLINES[planId]}</p>
              <div className={'price' + (price.free ? ' free' : '')}>
                <span className="num">{price.num}</span>
                <span className="per">{price.per}</span>
              </div>
              {price.note ? <div className="year-note">{price.note}</div> : null}
              <ul className="feature-list">
                {FEATURES[planId].map(([txt, on], i) => (
                  <li key={i} className={on ? '' : 'x'}>{txt}</li>
                ))}
              </ul>
              {cta}
            </div>
          );
        })}
      </div>

      {msg && (
        <div className={'msg show ' + msg.kind}>
          {msg.html ? <span dangerouslySetInnerHTML={{ __html: msg.text }} /> : msg.text}
        </div>
      )}

      <RedeemForm />
    </>
  );
}

function RedeemForm() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ text: string; color: string } | null>(null);
  const [code, setCode] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setBusy(true);
    const c = code.trim().toUpperCase();
    try {
      const r = await fetch('/api/billing/redeem-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ code: c }),
      });
      const data = await r.json();
      if (r.ok) {
        setResult({ text: '✓ ' + data.message, color: '#16a34a' });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setResult({ text: '⚠️ ' + (data.message || data.error || 'Mã không dùng được'), color: '#dc2626' });
      }
    } catch {
      setResult({ text: '⚠️ Lỗi mạng. Thử lại.', color: '#dc2626' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="redeem-box">
      <h3>🎟️ Có mã trường hoặc mã khuyến mãi?</h3>
      <p>Trường K-12 / ĐH cấp mã sinh viên → nhập để nhận gói Plus 1 năm hoặc giảm giá khi thanh toán.</p>
      <form onSubmit={onSubmit} className="redeem-form">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã, vd NEU2026"
          required
          className="redeem-input"
        />
        <button type="submit" disabled={busy} className="redeem-btn">Áp dụng</button>
      </form>
      {result && <div className="redeem-result" style={{ color: result.color }}>{result.text}</div>}
    </div>
  );
}
