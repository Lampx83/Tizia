'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ── Kiểu dữ liệu khớp API DB (server/contexts/economy/index.js) ──
type ShopItem = {
  id: string;
  name: string;
  type: string;
  icon: string | null;
  description: string | null;
  rarity: string; // common | rare | epic | legendary
  price_coin: number;
};
type InventoryRow = {
  item_id: string;
  name: string;
  type: string;
  icon: string | null;
  description: string | null;
  rarity: string;
  equipped: number | boolean;
};
// Item đã chuẩn hoá để render (chung cho tab thường + tab "Của tôi").
type DisplayItem = {
  id: string;
  name: string;
  type: string;
  icon: string | null;
  description: string | null;
  rarity: string;
  price_coin: number;
  owned: boolean;
  equipped: boolean;
};

const TABS: { type: string; label: string }[] = [
  { type: '', label: 'Tất cả' },
  { type: 'pet-skin', label: '🐲 Skin Pet' },
  { type: 'avatar-frame', label: '🖼 Khung Avatar' },
  { type: 'emoji-pack', label: '😀 Emoji Pack' },
  { type: 'title', label: '👑 Danh hiệu' },
  { type: 'inventory', label: '📦 Của tôi' },
];

const RARITY_LABEL: Record<string, string> = {
  common: 'Thường',
  rare: 'Hiếm',
  epic: 'Sử thi',
  legendary: 'Huyền thoại',
};
function rarityLabel(r: string) {
  return RARITY_LABEL[r] || r;
}

// Màu viền/nhãn theo độ hiếm — thương hiệu riêng của trang gốc (giữ nguyên hex).
const RARITY_BORDER: Record<string, string> = {
  common: 'border-white/10',
  rare: 'border-[#60a5fa]/40 shadow-[0_4px_14px_rgba(96,165,250,.15)]',
  epic: 'border-[#a78bfa]/50 shadow-[0_4px_18px_rgba(167,139,250,.2)]',
  legendary: 'border-[#fbbf24]/55 shadow-[0_6px_22px_rgba(251,191,36,.25)]',
};
const RARITY_TAG: Record<string, string> = {
  common: 'bg-white/[.08] text-[#9aa3c7]',
  rare: 'bg-[#60a5fa]/20 text-[#60a5fa]',
  epic: 'bg-[#a78bfa]/25 text-[#c4b5fd]',
  legendary: 'bg-[#fbbf24]/25 text-[#fbbf24]',
};

export default function CuaHang() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [inventory, setInventory] = useState<Map<string, InventoryRow>>(new Map());
  const [coins, setCoins] = useState(0);
  const [currentTab, setCurrentTab] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [shopRes, invRes, walletRes] = await Promise.all([
        fetch('/api/shop/items', { credentials: 'same-origin' }),
        fetch('/api/shop/me', { credentials: 'same-origin' }),
        fetch('/api/wallet', { credentials: 'same-origin' }),
      ]);
      if (shopRes.ok) {
        const d = await shopRes.json();
        setItems(d.items || []);
      }
      if (invRes.ok) {
        const d = await invRes.json();
        setInventory(
          new Map<string, InventoryRow>((d.inventory || []).map((i: InventoryRow) => [i.item_id, i])),
        );
      }
      if (walletRes.ok) {
        const w = await walletRes.json();
        setCoins(w?.coins || 0);
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function buy(id: string) {
    const r = await fetch('/api/shop/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: id }),
      credentials: 'same-origin',
    });
    const d = await r.json();
    if (!d.ok) {
      if (d.error === 'no_coins') alert(`Không đủ coin. Cần ${d.need}, hiện có ${d.have}.`);
      else alert(d.error || 'Lỗi');
      return;
    }
    await load();
    try {
      (window as unknown as { __tziaEngagementHud?: { refresh?: () => void } }).__tziaEngagementHud?.refresh?.();
    } catch {
      /* noop */
    }
  }

  async function equip(id: string) {
    const r = await fetch('/api/shop/equip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: id }),
      credentials: 'same-origin',
    });
    const d = await r.json();
    if (d.ok) load();
  }

  // Danh sách hiển thị theo tab hiện tại.
  let display: DisplayItem[];
  if (currentTab === 'inventory') {
    display = [...inventory.values()].map((i) => ({
      id: i.item_id,
      name: i.name,
      type: i.type,
      icon: i.icon,
      description: i.description,
      rarity: i.rarity,
      price_coin: 0,
      owned: true,
      equipped: !!i.equipped,
    }));
  } else {
    display = items
      .filter((i) => !currentTab || i.type === currentTab)
      .map((i) => ({
        ...i,
        owned: inventory.has(i.id),
        equipped: !!inventory.get(i.id)?.equipped,
      }));
  }

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center gap-3.5">
        <Link
          href="/"
          className="rounded-[18px] border bg-white/[.08] px-3.5 py-1.5 text-[13px] font-semibold"
        >
          ← Trang chủ
        </Link>
        <h1 className="text-lg font-semibold tracking-tight">🛒 Cửa hàng skin &amp; avatar</h1>
        <div className="ml-auto rounded-[14px] bg-[#fbbf24]/15 px-3.5 py-1.5 text-sm font-extrabold text-[#fbbf24]">
          {coins} 🪙
        </div>
      </div>

      <div className="mb-[18px] flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.type || 'all'}
            onClick={() => setCurrentTab(t.type)}
            className={cn(
              'cursor-pointer rounded-[18px] border px-4 py-1.5 text-[13px] font-semibold transition-colors',
              currentTab === t.type
                ? 'border-[#a78bfa] bg-[#a78bfa] text-white'
                : 'bg-white/5 hover:bg-white/10',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-10 text-center text-muted-foreground">Đang tải…</div>
      ) : error ? (
        <p className="py-10 text-center text-[#fb7185]">Lỗi: {error}</p>
      ) : display.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">Không có item nào.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          {display.map((i) => (
            <div
              key={i.id}
              className={cn(
                'rounded-2xl border bg-card px-3.5 py-[18px] text-center transition-transform hover:-translate-y-0.5',
                RARITY_BORDER[i.rarity] || 'border',
              )}
            >
              <span className="mb-2 block text-5xl leading-none">{i.icon || '🎁'}</span>
              <div
                className={cn(
                  'mb-2.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide',
                  RARITY_TAG[i.rarity] || 'bg-white/[.08] text-muted-foreground',
                )}
              >
                {rarityLabel(i.rarity)}
              </div>
              <div className="mb-[3px] text-sm font-extrabold">{i.name}</div>
              <div className="mb-2.5 min-h-[32px] text-[11.5px] leading-snug text-muted-foreground">
                {i.description || ''}
              </div>
              {!i.owned && (
                <div className="mb-2 text-[13px] font-extrabold text-[#fbbf24]">{i.price_coin} 🪙</div>
              )}
              {i.owned ? (
                i.equipped ? (
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-[10px] border border-[#34d399] bg-[#34d399] px-3.5 py-2 text-[12.5px] font-bold text-[#052e16]"
                  >
                    ✓ Đang dùng
                  </button>
                ) : (
                  <button
                    onClick={() => equip(i.id)}
                    className="w-full cursor-pointer rounded-[10px] border border-[#34d399] bg-[#22c55e]/[.18] px-3.5 py-2 text-[12.5px] font-bold text-[#34d399]"
                  >
                    Dùng item này
                  </button>
                )
              ) : (
                <Button
                  onClick={() => buy(i.id)}
                  className="w-full rounded-[10px] bg-gradient-to-br from-[#fbbf24] to-[#f97316] px-3.5 py-2 text-[12.5px] font-bold text-[#1e293b] hover:opacity-90"
                >
                  Mua
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
