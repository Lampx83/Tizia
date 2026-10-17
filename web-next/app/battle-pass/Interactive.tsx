'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Nút mở Premium track — POST /api/bp/buy-premium, confirm trước khi gọi.
export function PremiumButton({ hasPremium }: { hasPremium: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (hasPremium) {
    return (
      <Button
        type="button"
        disabled
        className="flex-shrink-0 border border-emerald-400 bg-emerald-500/20 font-extrabold text-emerald-400 hover:bg-emerald-500/20"
      >
        ✓ Đã có Premium
      </Button>
    );
  }

  async function buy() {
    if (!confirm('Mở Premium track tốn 5000 🪙 — chắc chắn?')) return;
    setBusy(true);
    try {
      const r = await fetch('/api/bp/buy-premium', { method: 'POST', credentials: 'same-origin' });
      const data = await r.json();
      if (!data.ok) {
        alert(data.error || 'Lỗi');
        return;
      }
      router.refresh();
    } catch (e) {
      alert('Lỗi: ' + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={buy}
      disabled={busy}
      className="flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 font-extrabold text-slate-800 hover:opacity-90"
    >
      ⭐ Mở Premium (5000 🪙)
    </Button>
  );
}

// Nút nhận reward của một tier/track — POST /api/bp/claim.
export function ClaimButton({
  tier,
  track,
  disabled,
  label,
}: {
  tier?: number;
  track?: 'free' | 'premium';
  disabled?: boolean;
  label?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (disabled) {
    return (
      <Button
        type="button"
        disabled
        size="sm"
        variant="secondary"
        className="mt-1 h-auto px-2 py-1 text-[10.5px]"
      >
        {label}
      </Button>
    );
  }

  async function claim() {
    setBusy(true);
    try {
      const r = await fetch('/api/bp/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, track }),
        credentials: 'same-origin',
      });
      const data = await r.json();
      if (!data.ok) {
        alert(data.error || 'Lỗi');
        return;
      }
      router.refresh();
      try {
        (window as unknown as { __tziaEngagementHud?: { refresh: () => void } }).__tziaEngagementHud?.refresh();
      } catch {}
    } catch (e) {
      alert('Lỗi: ' + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={claim}
      disabled={busy}
      size="sm"
      className="mt-1 h-auto bg-gradient-to-br from-emerald-400 to-emerald-600 px-2 py-1 text-[10.5px] font-bold text-emerald-950 hover:opacity-90"
    >
      Nhận
    </Button>
  );
}
