'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ── Bảng màu 16 màu cơ bản ──
type PaletteEntry = { hex: string; name: string };
const PALETTE: PaletteEntry[] = [
  { hex: '#000000', name: 'đen' },
  { hex: '#ffffff', name: 'trắng' },
  { hex: '#94a3b8', name: 'xám' },
  { hex: '#fef3c7', name: 'kem' },
  { hex: '#ef4444', name: 'đỏ' },
  { hex: '#f97316', name: 'cam' },
  { hex: '#facc15', name: 'vàng' },
  { hex: '#22c55e', name: 'xanh lá' },
  { hex: '#10b981', name: 'xanh ngọc' },
  { hex: '#0ea5e9', name: 'xanh dương' },
  { hex: '#6366f1', name: 'chàm' },
  { hex: '#a855f7', name: 'tím' },
  { hex: '#ec4899', name: 'hồng' },
  { hex: '#fb7185', name: 'hồng đào' },
  { hex: '#92400e', name: 'nâu' },
  { hex: 'transparent', name: 'xoá (trong suốt)' },
];

type Tool = 'pencil' | 'eraser' | 'fill' | 'pick';

type GalleryItem = { ts: number; size: number; bitmap: string[]; png: string };

const LS_KEY = 'pixel-art.saves';

// ── Templates (encoded as bitmap arrays of hex) ──
const C: Record<string, string> = {
  R: '#ef4444', O: '#f97316', Y: '#facc15', G: '#22c55e', B: '#0ea5e9',
  P: '#a855f7', K: '#000000', W: '#ffffff', N: '#92400e', H: '#ec4899',
  S: '#94a3b8', T: 'transparent', I: '#fef3c7',
};
function tplFromMatrix(rows: string[]): string[] {
  const out = new Array(16 * 16).fill('transparent');
  for (let y = 0; y < Math.min(rows.length, 16); y++) {
    for (let x = 0; x < Math.min(rows[y].length, 16); x++) {
      const ch = rows[y][x];
      out[y * 16 + x] = C[ch] !== undefined ? C[ch] : 'transparent';
    }
  }
  return out;
}

const TEMPLATES: Record<string, string[]> = {
  mario: tplFromMatrix([
    'TTTTTRRRRRRTTTTT',
    'TTTRRRRRRRRRRTTT',
    'TTTNNNIIIKIITTTT',
    'TTNIKIIIIKIIIITT',
    'TTNIKKIIIKKIIITT',
    'TTNNIIIIIIIIITTT',
    'TTTIIIIIIIIITTTT',
    'TTTRRBRRRRBRRTTT',
    'TTRRRBRRRRBRRRTT',
    'TRRRRBBBBBBRRRRT',
    'TIIRBYBBBBYBRIIT',
    'TIIIBBBBBBBBIIIT',
    'TIIBBBBBBBBBBIIT',
    'TTNNNTTTTTTNNNTT',
    'TNNNNTTTTTTNNNNT',
    'TTTTTTTTTTTTTTTT',
  ]),
  pikachu: tplFromMatrix([
    'TTKKTTTTTTTTKKTT',
    'TKYYKTTTTTTKYYKT',
    'TKYYKKTTTTKKYYKT',
    'TTKYYYKTTKYYYKTT',
    'TTTKYYYKKYYYKTTT',
    'TTTKYYYYYYYYKTTT',
    'TTKYYKYYYYKYYKTT',
    'TKYYYKYYYYKYYYKT',
    'TKYRYYYYYYYYRYKT',
    'TKYYYYYKKYYYYYKT',
    'TTKYYYYYYYYYYKTT',
    'TTTKYYYYYYYYKTTT',
    'TTTTKYYYYYYKTTTT',
    'TTTTTKKKKKKTTTTT',
    'TTTKKTTTTTTKKTTT',
    'TTKKKTTTTTTKKKTT',
  ]),
  flower: tplFromMatrix([
    'TTTTTTTHHTTTTTTT',
    'TTTTTHHHHHHTTTTT',
    'TTTTHHHHHHHHTTTT',
    'TTHHHHYYYYHHHHTT',
    'THHHHYYYYYYHHHHT',
    'THHHYYYOOYYYHHHT',
    'THHHYYOOOOYYHHHT',
    'THHHHYYYYYYHHHHT',
    'TTHHHHYYYYHHHHTT',
    'TTTTHHHHHHHHTTTT',
    'TTTTTTGGGGTTTTTT',
    'TTTTTTTGGTTTTTTT',
    'TTTTTGGGGGGTTTTT',
    'TTTTGGGTGGGTTTTT',
    'TTTTTGGTTGTTTTTT',
    'TTTTTTGTTTTTTTTT',
  ]),
  heart: tplFromMatrix([
    'TTTTTTTTTTTTTTTT',
    'TTTRRRRTTRRRRTTT',
    'TTRRRRRRRRRRRRTT',
    'TRRRRRRRRRRRRRRT',
    'TRRRWRRRRRRWRRRT',
    'TRRRWRRRRRRWRRRT',
    'TRRRRRRRRRRRRRRT',
    'TRRRRRRRRRRRRRRT',
    'TRRRRRRRRRRRRRRT',
    'TTRRRRRRRRRRRRTT',
    'TTTRRRRRRRRRRTTT',
    'TTTTRRRRRRRRTTTT',
    'TTTTTRRRRRRTTTTT',
    'TTTTTTRRRRTTTTTT',
    'TTTTTTTRRTTTTTTT',
    'TTTTTTTTTTTTTTTT',
  ]),
  smile: tplFromMatrix([
    'TTTTYYYYYYYYTTTT',
    'TTYYYYYYYYYYYYTT',
    'TYYYYYYYYYYYYYYT',
    'YYYYYYYYYYYYYYYY',
    'YYYYYKKYYKKYYYYY',
    'YYYYYKKYYKKYYYYY',
    'YYYYYYYYYYYYYYYY',
    'YYYYYYYYYYYYYYYY',
    'YYYKYYYYYYYYKYYY',
    'YYYKKYYYYYYKKYYY',
    'YYYYKKKKKKKKYYYY',
    'YYYYYYKKKKYYYYYY',
    'YYYYYYYYYYYYYYYY',
    'TYYYYYYYYYYYYYYT',
    'TTYYYYYYYYYYYYTT',
    'TTTTYYYYYYYYTTTT',
  ]),
};

const TPL_BUTTONS: { key: string; label: string }[] = [
  { key: 'mario', label: '🍄 Mario' },
  { key: 'pikachu', label: '⚡ Pikachu' },
  { key: 'flower', label: '🌸 Hoa' },
  { key: 'heart', label: '❤️ Trái Tim' },
  { key: 'smile', label: '😊 Mặt Cười' },
];

const TOOL_BUTTONS: { tool: Tool; ic: string; label: string }[] = [
  { tool: 'pencil', ic: '✏️', label: 'Bút' },
  { tool: 'eraser', ic: '🧹', label: 'Tẩy' },
  { tool: 'fill', ic: '🪣', label: 'Đổ sơn' },
  { tool: 'pick', ic: '💧', label: 'Hút màu' },
];

function newBitmap(size: number): string[] {
  return new Array(size * size).fill('transparent');
}

// ── Share qua URL hash: mỗi ô = index bảng màu (0-f) hoặc 'x' (trong suốt) ──
function bitmapToHash(size: number, bitmap: string[]): string {
  const sizeCode = size === 16 ? 'a' : 'b';
  const palMap = new Map(PALETTE.map((p, i) => [p.hex, i]));
  let s = sizeCode;
  for (const c of bitmap) {
    if (c === 'transparent') { s += 'x'; continue; }
    const idx = palMap.get(c);
    if (idx === undefined) { s += 'x'; continue; }
    s += idx.toString(16);
  }
  return s;
}

function hashToBitmap(h: string): { size: number; bitmap: string[] } | null {
  if (!h || h.length < 2) return null;
  const sizeCode = h[0];
  const size = sizeCode === 'a' ? 16 : (sizeCode === 'b' ? 32 : null);
  if (!size) return null;
  const expected = size * size;
  const body = h.slice(1);
  if (body.length < expected) return null;
  const bitmap = new Array<string>(expected);
  for (let i = 0; i < expected; i++) {
    const ch = body[i];
    if (ch === 'x') bitmap[i] = 'transparent';
    else {
      const idx = parseInt(ch, 16);
      bitmap[i] = PALETTE[idx]?.hex || 'transparent';
    }
  }
  return { size, bitmap };
}

export default function PixelArtStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  // State phản chiếu UI.
  const [size, setSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<Tool>('pencil');
  const [filled, setFilled] = useState(0);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [toastMsg, setToastMsg] = useState<{ text: string; err: boolean } | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const shareInputRef = useRef<HTMLInputElement>(null);

  // Refs "sống" cho vòng lặp vẽ (tránh stale closure trong pointer handler).
  const bitmapRef = useRef<string[]>(newBitmap(16));
  const sizeRef = useRef(16);
  const colorRef = useRef('#000000');
  const toolRef = useRef<Tool>('pencil');
  const drawingRef = useRef(false);
  const rightClickRef = useRef(false);
  const historyRef = useRef<string[][]>([]);
  const futureRef = useRef<string[][]>([]);

  const colorName = PALETTE.find((p) => p.hex.toLowerCase() === color.toLowerCase())?.name || color;

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toast = useCallback((text: string, err = false) => {
    setToastMsg({ text, err });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2200);
  }, []);

  // ── Vẽ bitmap ra canvas + preview ──
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const preview = previewRef.current;
    if (!canvas || !preview) return;
    const s = sizeRef.current;
    const bitmap = bitmapRef.current;
    const ctx = canvas.getContext('2d');
    const pctx = preview.getContext('2d');
    if (!ctx || !pctx) return;

    canvas.width = s;
    canvas.height = s;
    ctx.clearRect(0, 0, s, s);
    for (let y = 0; y < s; y++) {
      for (let x = 0; x < s; x++) {
        const c = bitmap[y * s + x];
        if (c === 'transparent') {
          ctx.fillStyle = (x + y) % 2 === 0 ? '#f8fafc' : '#e2e8f0';
          ctx.fillRect(x, y, 1, 1);
        } else {
          ctx.fillStyle = c;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    preview.width = s;
    preview.height = s;
    pctx.clearRect(0, 0, s, s);
    pctx.fillStyle = '#ffffff';
    pctx.fillRect(0, 0, s, s);
    for (let i = 0; i < bitmap.length; i++) {
      const c = bitmap[i];
      if (c === 'transparent') continue;
      const x = i % s;
      const y = Math.floor(i / s);
      pctx.fillStyle = c;
      pctx.fillRect(x, y, 1, 1);
    }

    const cellPx = canvas.clientWidth / s;
    canvas.style.backgroundImage =
      'linear-gradient(to right, rgba(15,23,42,.08) 1px, transparent 1px),' +
      'linear-gradient(to bottom, rgba(15,23,42,.08) 1px, transparent 1px)';
    canvas.style.backgroundSize = `${cellPx}px ${cellPx}px`;

    setFilled(bitmap.filter((c) => c !== 'transparent').length);
  }, []);

  const snapshot = useCallback(() => {
    historyRef.current.push(bitmapRef.current.slice());
    if (historyRef.current.length > 50) historyRef.current.shift();
    futureRef.current.length = 0;
  }, []);

  const undo = useCallback(() => {
    if (!historyRef.current.length) return;
    futureRef.current.push(bitmapRef.current.slice());
    bitmapRef.current = historyRef.current.pop()!;
    draw();
  }, [draw]);

  const redo = useCallback(() => {
    if (!futureRef.current.length) return;
    historyRef.current.push(bitmapRef.current.slice());
    bitmapRef.current = futureRef.current.pop()!;
    draw();
  }, [draw]);

  const cellFromEvent = useCallback((ev: PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const cx = Math.floor((x / rect.width) * sizeRef.current);
    const cy = Math.floor((y / rect.height) * sizeRef.current);
    return { x: cx, y: cy };
  }, []);

  const paintCell = useCallback((x: number, y: number, erase: boolean) => {
    const s = sizeRef.current;
    if (x < 0 || y < 0 || x >= s || y >= s) return;
    const idx = y * s + x;
    const newColor = erase ? 'transparent' : colorRef.current;
    if (bitmapRef.current[idx] === newColor) return;
    bitmapRef.current[idx] = newColor;
  }, []);

  const floodFill = useCallback((x: number, y: number) => {
    const s = sizeRef.current;
    const bitmap = bitmapRef.current;
    const target = bitmap[y * s + x];
    const replacement = colorRef.current;
    if (target === replacement) return;
    const stack: [number, number][] = [[x, y]];
    while (stack.length) {
      const [cx, cy] = stack.pop()!;
      if (cx < 0 || cy < 0 || cx >= s || cy >= s) continue;
      if (bitmap[cy * s + cx] !== target) continue;
      bitmap[cy * s + cx] = replacement;
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
  }, []);

  const applyColor = useCallback((hex: string) => {
    colorRef.current = hex;
    setColor(hex);
  }, []);

  const pickColor = useCallback((x: number, y: number) => {
    const c = bitmapRef.current[y * sizeRef.current + x];
    if (c === 'transparent') return;
    applyColor(c);
  }, [applyColor]);

  const handleStroke = useCallback((ev: PointerEvent) => {
    const { x, y } = cellFromEvent(ev);
    const erase = rightClickRef.current || toolRef.current === 'eraser';
    if (toolRef.current === 'fill') {
      floodFill(x, y);
      draw();
      drawingRef.current = false;
    } else if (toolRef.current === 'pick') {
      pickColor(x, y);
      drawingRef.current = false;
    } else {
      paintCell(x, y, erase);
      draw();
    }
  }, [cellFromEvent, floodFill, pickColor, paintCell, draw]);

  const applyTool = useCallback((t: Tool) => {
    toolRef.current = t;
    setTool(t);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = t === 'fill' ? 'cell' : t === 'pick' ? 'help' : t === 'eraser' ? 'not-allowed' : 'crosshair';
    }
  }, []);

  const doSetSize = useCallback((s: number) => {
    if (s === sizeRef.current) return;
    sizeRef.current = s;
    setSize(s);
    bitmapRef.current = newBitmap(s);
    historyRef.current.length = 0;
    futureRef.current.length = 0;
    draw();
  }, [draw]);

  const loadFromData = useCallback((s: number, bitmap: string[]) => {
    sizeRef.current = s;
    setSize(s);
    bitmapRef.current = bitmap.slice();
    historyRef.current.length = 0;
    futureRef.current.length = 0;
    draw();
  }, [draw]);

  // ── Gallery (localStorage) ──
  const loadGallery = useCallback((): GalleryItem[] => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
  }, []);
  const writeGallery = useCallback((arr: GalleryItem[]) => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(arr.slice(-10))); } catch { /* ignore */ }
  }, []);

  const bitmapToPngDataURL = useCallback((scale = 16) => {
    const s = sizeRef.current;
    const bitmap = bitmapRef.current;
    const off = document.createElement('canvas');
    off.width = s * scale;
    off.height = s * scale;
    const octx = off.getContext('2d')!;
    octx.imageSmoothingEnabled = false;
    for (let i = 0; i < bitmap.length; i++) {
      const c = bitmap[i];
      if (c === 'transparent') continue;
      const x = i % s;
      const y = Math.floor(i / s);
      octx.fillStyle = c;
      octx.fillRect(x * scale, y * scale, scale, scale);
    }
    return off.toDataURL('image/png');
  }, []);

  const downloadPng = useCallback(() => {
    const url = bitmapToPngDataURL(24);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixel-art-${Date.now()}.png`;
    a.click();
    toast('Đã tải PNG ✨');
  }, [bitmapToPngDataURL, toast]);

  const saveToGallery = useCallback(() => {
    if (!bitmapRef.current.some((c) => c !== 'transparent')) {
      toast('Bức tranh trống — hãy vẽ vài nét trước nhé!', true);
      return;
    }
    const png = bitmapToPngDataURL(16);
    const arr = loadGallery();
    arr.push({ ts: Date.now(), size: sizeRef.current, bitmap: bitmapRef.current.slice(), png });
    const trimmed = arr.slice(-10);
    writeGallery(trimmed);
    setGallery(trimmed);
    toast('Đã lưu vào thư viện 🖼️');
  }, [bitmapToPngDataURL, loadGallery, writeGallery, toast]);

  const openShare = useCallback(() => {
    if (!bitmapRef.current.some((c) => c !== 'transparent')) {
      toast('Hãy vẽ vài nét rồi chia sẻ nhé!', true);
      return;
    }
    const h = bitmapToHash(sizeRef.current, bitmapRef.current);
    const url = `${location.origin}${location.pathname}#art=${h}`;
    setShareUrl(url);
  }, [toast]);

  const copyShare = useCallback(async () => {
    const txt = shareUrl || '';
    try {
      await navigator.clipboard.writeText(txt);
      toast('Đã sao chép link 📋');
    } catch {
      shareInputRef.current?.select();
      document.execCommand('copy');
      toast('Đã sao chép 📋');
    }
  }, [shareUrl, toast]);

  const onClear = useCallback(() => {
    if (!bitmapRef.current.some((c) => c !== 'transparent')) return;
    if (!confirm('Xoá toàn bộ bức tranh?')) return;
    snapshot();
    bitmapRef.current = newBitmap(sizeRef.current);
    draw();
  }, [snapshot, draw]);

  const onSizeBtn = useCallback((s: number) => {
    if (bitmapRef.current.some((c) => c !== 'transparent')) {
      if (!confirm('Đổi kích thước sẽ xoá bức hiện tại. Tiếp tục?')) return;
    }
    doSetSize(s);
  }, [doSetSize]);

  const onTemplate = useCallback((key: string) => {
    const tpl = TEMPLATES[key];
    if (!tpl) return;
    snapshot();
    doSetSize(16);
    bitmapRef.current = tpl.slice();
    draw();
    toast('Đã nạp mẫu — em có thể chỉnh sửa thoải mái!');
  }, [snapshot, doSetSize, draw, toast]);

  const onGalleryItem = useCallback((item: GalleryItem) => {
    loadFromData(item.size, item.bitmap);
    toast('Đã mở bức tranh đã lưu 🎨');
  }, [loadFromData, toast]);

  // ── Pointer handlers gắn trực tiếp lên canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onContextMenu = (e: Event) => e.preventDefault();
    const onPointerDown = (ev: PointerEvent) => {
      ev.preventDefault();
      canvas.setPointerCapture(ev.pointerId);
      drawingRef.current = true;
      rightClickRef.current = ev.button === 2;
      snapshot();
      handleStroke(ev);
    };
    const onPointerMove = (ev: PointerEvent) => {
      if (!drawingRef.current) return;
      handleStroke(ev);
    };
    const stopDraw = () => {
      drawingRef.current = false;
      rightClickRef.current = false;
      draw();
    };

    canvas.addEventListener('contextmenu', onContextMenu);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', stopDraw);
    canvas.addEventListener('pointercancel', stopDraw);
    return () => {
      canvas.removeEventListener('contextmenu', onContextMenu);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', stopDraw);
      canvas.removeEventListener('pointercancel', stopDraw);
    };
  }, [snapshot, handleStroke, draw]);

  // ── Bàn phím tắt ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' || e.key === 'Z') { e.preventDefault(); undo(); }
        if (e.key === 'y' || e.key === 'Y') { e.preventDefault(); redo(); }
      }
      if (e.key === 'b' || e.key === 'B') applyTool('pencil');
      if (e.key === 'e' || e.key === 'E') applyTool('eraser');
      if (e.key === 'f' || e.key === 'F') applyTool('fill');
      if (e.key === 'p' || e.key === 'P') applyTool('pick');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo, applyTool]);

  // ── Init: đọc hash chia sẻ + gallery ──
  useEffect(() => {
    const m = location.hash.match(/art=([^&]+)/);
    if (m) {
      const parsed = hashToBitmap(decodeURIComponent(m[1]));
      if (parsed) {
        loadFromData(parsed.size, parsed.bitmap);
        toast('Đã mở bức tranh được chia sẻ 🎁');
      }
    }
    draw();
    setGallery(loadGallery());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentChipStyle: React.CSSProperties = color === 'transparent'
    ? { background: 'repeating-conic-gradient(#ccc 0% 25%, #fff 25% 50%) 50% / 8px 8px' }
    : { background: color };

  return (
    <div style={styles.root}>
      <style>{scopedCss}</style>

      <header className="pas-top">
        <Link className="pas-back" href="/">← Tizia</Link>
        <span className="pas-title">🎨 Pixel Art Studio</span>
        <div className="pas-stats">
          <span className="pas-pill">Kích thước: <b>{size}×{size}</b></span>
          <span className="pas-pill">Pixel đã tô: <b>{filled}</b></span>
        </div>
      </header>

      <div className="pas-layout">
        {/* LEFT: Palette */}
        <aside className="pas-panel">
          <h3>🎨 Bảng màu</h3>
          <div className="pas-palette">
            {PALETTE.map((p) => (
              <div
                key={p.hex}
                className={
                  'pas-swatch' +
                  (p.hex === 'transparent' ? ' transparent' : '') +
                  (p.hex === color ? ' active' : '')
                }
                title={p.name}
                style={p.hex !== 'transparent' ? { background: p.hex } : undefined}
                onClick={() => applyColor(p.hex)}
              />
            ))}
          </div>
          <div className="pas-color-info">
            Màu hiện tại: <span className="pas-chip" style={currentChipStyle} />
            <span>{colorName}</span>
          </div>
          <div className="pas-tip">Bấm chọn màu rồi tô lên ô vuông. Kéo chuột để tô nhiều ô.</div>
        </aside>

        {/* CENTER: Canvas */}
        <main className="pas-panel pas-canvas-wrap">
          <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
            <div />
            <div className="pas-preview-box">
              <span className="pas-preview-label">👁️ Xem nhỏ</span>
              <canvas ref={previewRef} id="pas-preview" width={16} height={16} />
            </div>
          </div>
          <div className="pas-canvas-host">
            <div className="pas-canvas-stack">
              <canvas ref={canvasRef} id="pas-pixel-canvas" width={16} height={16} style={{ width: 480, height: 480 }} />
            </div>
          </div>
          <div className="pas-tip">Mẹo: chuột trái = tô, chuột phải = xoá. Giữ và kéo để tô liên tục.</div>
        </main>

        {/* RIGHT: Tools */}
        <aside className="pas-panel">
          <h3>🛠️ Công cụ</h3>
          <div className="pas-tool-grid">
            {TOOL_BUTTONS.map((b) => (
              <button
                key={b.tool}
                className={'pas-tool-btn' + (tool === b.tool ? ' active' : '')}
                onClick={() => applyTool(b.tool)}
              >
                <span className="ic">{b.ic}</span>{b.label}
              </button>
            ))}
          </div>
          <div className="pas-tool-grid" style={{ marginTop: 8 }}>
            <button className="pas-tool-btn" onClick={undo}><span className="ic">↶</span>Hoàn tác</button>
            <button className="pas-tool-btn" onClick={redo}><span className="ic">↷</span>Làm lại</button>
          </div>

          <h3 style={{ marginTop: 14 }}>📐 Kích thước</h3>
          <div className="pas-size-row">
            <button className={'pas-size-btn' + (size === 16 ? ' active' : '')} onClick={() => onSizeBtn(16)}>16×16</button>
            <button className={'pas-size-btn' + (size === 32 ? ' active' : '')} onClick={() => onSizeBtn(32)}>32×32</button>
          </div>

          <div className="pas-action-row">
            <button className="pas-btn-action" onClick={saveToGallery}>💾 Lưu vào thư viện</button>
            <button className="pas-btn-action" onClick={downloadPng}>⬇️ Tải PNG</button>
            <button className="pas-btn-action" onClick={openShare}>🔗 Chia sẻ</button>
            <button className="pas-btn-action secondary" onClick={onClear}>🗑️ Xoá tất cả</button>
          </div>
        </aside>
      </div>

      {/* Templates */}
      <div className="pas-templates">
        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--pas-ink-soft)', alignSelf: 'center' }}>🧩 Mẫu có sẵn:</span>
        {TPL_BUTTONS.map((b) => (
          <button key={b.key} className="pas-tpl-btn" onClick={() => onTemplate(b.key)}>{b.label}</button>
        ))}
      </div>

      {/* Gallery */}
      <section className="pas-gallery">
        <h3>🖼️ Thư viện của em (tối đa 10)</h3>
        <div className="pas-gallery-grid">
          {gallery.length === 0 ? (
            <div className="pas-gallery-empty">Chưa có bức nào. Lưu tác phẩm đầu tiên nhé!</div>
          ) : (
            gallery.slice().reverse().map((item) => (
              <div key={item.ts} className="pas-gallery-item" title="Bấm để mở lại" onClick={() => onGalleryItem(item)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.png} alt="" />
                <div className="meta">{item.size}×{item.size}</div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Toast */}
      <div className={'pas-toast' + (toastMsg ? ' show' : '') + (toastMsg?.err ? ' err' : '')}>{toastMsg?.text}</div>

      {/* Share modal */}
      {shareUrl && (
        <div className="pas-modal-backdrop show" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('pas-modal-backdrop')) setShareUrl(null); }}>
          <div className="pas-modal">
            <h3>🔗 Chia sẻ tác phẩm</h3>
            <p>Sao chép đường dẫn dưới đây và gửi cho bạn bè. Bạn nhận link sẽ thấy bức tranh y hệt!</p>
            <input ref={shareInputRef} type="text" readOnly value={shareUrl} />
            <div className="btn-row">
              <button className="pas-btn-action" onClick={copyShare}>📋 Sao chép</button>
              <button className="pas-btn-action secondary" onClick={() => setShareUrl(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    margin: '-1.5rem -1rem',
  },
};

// Giữ nguyên bộ màu pastel + look thương hiệu của trang gốc qua CSS scoped (prefix .pas-).
const scopedCss = `
.pas-top, .pas-layout, .pas-templates, .pas-gallery, .pas-toast, .pas-modal-backdrop, .pas-panel {
  --pas-ink:#1f2937; --pas-ink-soft:#475569;
  --pas-card-soft:#f8fafc; --pas-accent:#8b5cf6; --pas-accent-2:#ec4899;
  --pas-border:rgba(15,23,42,.12);
}
.pas-top *, .pas-layout *, .pas-templates *, .pas-gallery *, .pas-modal *, .pas-toast {
  box-sizing:border-box; font-family:'Inter','Be Vietnam Pro',system-ui,sans-serif;
}
.pas-top {
  --pas-ink:#1f2937; --pas-ink-soft:#475569; --pas-accent:#8b5cf6;
  --pas-border:rgba(15,23,42,.12);
  display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  padding:10px 18px; background:linear-gradient(135deg,#dbeafe,#e0d4f7 50%,#fce7f3);
  border-bottom:1px solid rgba(255,255,255,.5); color:var(--pas-ink);
}
.pas-back { background:rgba(15,23,42,.78); color:#fff; text-decoration:none; padding:7px 14px; border-radius:18px; font-size:13px; font-weight:600; }
.pas-back:hover { background:rgba(15,23,42,.92); }
.pas-title { font-size:16px; font-weight:800; color:var(--pas-ink); display:flex; align-items:center; gap:8px; }
.pas-stats { display:flex; gap:8px; margin-left:auto; flex-wrap:wrap; }
.pas-pill { background:rgba(255,255,255,.92); border:1px solid var(--pas-border); padding:6px 13px; border-radius:18px; font-size:12.5px; font-weight:700; color:var(--pas-ink); display:flex; gap:6px; align-items:center; box-shadow:0 4px 12px rgba(31,41,55,.06); }
.pas-pill b { color:var(--pas-accent); }

.pas-layout { display:grid; grid-template-columns:220px 1fr 240px; gap:18px; padding:18px; max-width:1300px; margin:0 auto; color:var(--pas-ink); }
@media (max-width:1000px) { .pas-layout { grid-template-columns:1fr; } }

.pas-panel { background:rgba(255,255,255,.85); border:1px solid var(--pas-border); border-radius:16px; padding:14px; box-shadow:0 8px 24px rgba(31,41,55,.06); backdrop-filter:blur(6px); }
.pas-panel h3 { margin:0 0 10px; font-size:13px; font-weight:800; color:var(--pas-ink); display:flex; align-items:center; gap:6px; }

.pas-palette { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
.pas-swatch { aspect-ratio:1; border-radius:9px; cursor:pointer; border:2px solid rgba(15,23,42,.1); position:relative; transition:transform .12s, box-shadow .12s; }
.pas-swatch:hover { transform:scale(1.08); box-shadow:0 4px 12px rgba(0,0,0,.18); }
.pas-swatch.active { border-color:#1f2937; box-shadow:0 0 0 3px rgba(139,92,246,.45); transform:scale(1.05); }
.pas-swatch.transparent { background:repeating-conic-gradient(#ccc 0% 25%, #fff 25% 50%) 50% / 12px 12px; }

.pas-color-info { font-size:11px; color:var(--pas-ink-soft); margin-top:10px; display:flex; align-items:center; gap:8px; }
.pas-chip { width:18px; height:18px; border-radius:5px; border:1px solid var(--pas-border); display:inline-block; }

.pas-canvas-wrap { display:flex; flex-direction:column; align-items:center; gap:12px; }
.pas-canvas-host { background:var(--pas-card-soft); border:2px solid var(--pas-border); border-radius:14px; padding:8px; touch-action:none; user-select:none; box-shadow:inset 0 0 0 1px rgba(255,255,255,.6); }
#pas-pixel-canvas { display:block; image-rendering:pixelated; image-rendering:crisp-edges; cursor:crosshair; background:#fff; border-radius:8px; }
.pas-canvas-stack { position:relative; }

.pas-preview-box { display:flex; flex-direction:column; gap:6px; align-items:flex-end; }
.pas-preview-label { font-size:11px; color:var(--pas-ink-soft); font-weight:700; }
#pas-preview { width:72px; height:72px; image-rendering:pixelated; image-rendering:crisp-edges; border-radius:8px; border:1px solid var(--pas-border); background:#fff; box-shadow:0 4px 12px rgba(0,0,0,.1); }

.pas-tool-grid { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
.pas-tool-btn { background:var(--pas-card-soft); border:1px solid var(--pas-border); color:var(--pas-ink); padding:9px 6px; border-radius:9px; cursor:pointer; font-family:inherit; font-size:12px; font-weight:700; display:flex; flex-direction:column; align-items:center; gap:3px; transition:background .12s, transform .12s; }
.pas-tool-btn:hover { background:#fff; transform:translateY(-1px); }
.pas-tool-btn.active { background:var(--pas-accent); color:#fff; border-color:transparent; box-shadow:0 4px 12px rgba(139,92,246,.4); }
.pas-tool-btn .ic { font-size:18px; }

.pas-size-row { display:flex; gap:6px; margin-top:10px; }
.pas-size-btn { flex:1; background:var(--pas-card-soft); border:1px solid var(--pas-border); color:var(--pas-ink); padding:8px; border-radius:8px; cursor:pointer; font-family:inherit; font-size:12px; font-weight:700; transition:background .12s; }
.pas-size-btn.active { background:var(--pas-accent); color:#fff; border-color:transparent; }

.pas-action-row { display:flex; flex-direction:column; gap:7px; margin-top:12px; }
.pas-btn-action { background:linear-gradient(135deg, var(--pas-accent), var(--pas-accent-2)); color:#fff; border:none; padding:10px; border-radius:10px; cursor:pointer; font-family:inherit; font-size:12.5px; font-weight:800; transition:transform .12s, box-shadow .15s; box-shadow:0 4px 12px rgba(139,92,246,.3); }
.pas-btn-action:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(139,92,246,.5); }
.pas-btn-action.secondary { background:rgba(15,23,42,.08); color:var(--pas-ink); box-shadow:none; }
.pas-btn-action.secondary:hover { background:rgba(15,23,42,.16); }

.pas-templates { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin:14px auto; max-width:1300px; padding:0 18px; }
.pas-tpl-btn { background:rgba(255,255,255,.92); border:1px solid var(--pas-border); padding:6px 12px; border-radius:14px; font-size:12px; font-weight:700; cursor:pointer; transition:background .12s, transform .12s; font-family:inherit; color:var(--pas-ink); }
.pas-tpl-btn:hover { background:#fff; transform:translateY(-1px); }

.pas-gallery { max-width:1300px; margin:0 auto 30px; padding:0 18px; color:var(--pas-ink); }
.pas-gallery h3 { font-size:14px; font-weight:800; color:var(--pas-ink); margin:14px 0 10px; display:flex; align-items:center; gap:6px; }
.pas-gallery-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(96px,1fr)); gap:10px; }
.pas-gallery-item { background:rgba(255,255,255,.88); border:1px solid var(--pas-border); border-radius:12px; padding:8px; cursor:pointer; transition:transform .12s, box-shadow .15s; }
.pas-gallery-item:hover { transform:translateY(-2px); box-shadow:0 8px 18px rgba(0,0,0,.12); }
.pas-gallery-item img { width:100%; aspect-ratio:1; image-rendering:pixelated; image-rendering:crisp-edges; border-radius:6px; display:block; }
.pas-gallery-item .meta { font-size:10px; color:var(--pas-ink-soft); margin-top:5px; text-align:center; }
.pas-gallery-empty { text-align:center; color:var(--pas-ink-soft); font-size:12.5px; padding:20px; }

.pas-toast { position:fixed; left:50%; top:60px; transform:translateX(-50%) translateY(-30px); z-index:80; background:#16a34a; color:#fff; padding:10px 18px; border-radius:14px; font-weight:700; font-size:13px; opacity:0; transition:opacity .2s, transform .2s; box-shadow:0 8px 24px rgba(22,163,74,.5); pointer-events:none; }
.pas-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
.pas-toast.err { background:#dc2626; box-shadow:0 8px 24px rgba(220,38,38,.5); }

.pas-modal-backdrop { position:fixed; inset:0; background:rgba(15,23,42,.6); z-index:90; display:flex; align-items:center; justify-content:center; padding:20px; }
.pas-modal { background:#fff; border-radius:18px; padding:24px; max-width:480px; width:100%; box-shadow:0 24px 60px rgba(0,0,0,.4); color:#1f2937; }
.pas-modal h3 { margin:0 0 12px; font-size:18px; }
.pas-modal p { font-size:13px; color:#475569; margin:0 0 10px; line-height:1.5; }
.pas-modal input { width:100%; padding:9px 11px; border-radius:9px; border:1px solid rgba(15,23,42,.12); font-size:12.5px; font-family:inherit; }
.pas-modal .btn-row { display:flex; gap:8px; margin-top:14px; }

.pas-tip { font-size:11px; color:var(--pas-ink-soft); margin-top:6px; line-height:1.45; }
`;
