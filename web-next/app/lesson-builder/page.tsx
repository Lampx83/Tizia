'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ============================================================
// Lesson Builder no-code — port từ public/lesson-builder.html.
// Content bài giảng do người dùng tạo, LƯU QUA API/DB (POST /api/lessons),
// KHÔNG hardcode. Danh sách kiểu khối + option của các select (nhân vật, ca
// lâm sàng, kịch bản, môn học) là CẤU HÌNH GIAO DIỆN tĩnh của trình soạn thảo
// — không phải nội dung nghiệp vụ fetch từ DB — nên giữ nguyên như bản gốc.
// ============================================================

// ---------- Kiểu dữ liệu block ----------
type Block = {
  type: string;
  level?: number;
  text?: string;
  url?: string;
  alt?: string;
  caption?: string;
  stem?: string;
  options?: string[];
  correct?: number;
  explain?: string;
  domain?: string;
  prompt?: string;
  characterId?: string;
  caseId?: string;
  scenarioId?: string;
  label?: string;
  kind?: string;
};

type LessonMeta = {
  title: string;
  description: string;
  grade: string;
  subject: string;
  author: string;
};

type LessonApi = {
  slug?: string;
  title?: string;
  description?: string;
  author?: string;
  grade?: string;
  subject?: string;
  blocks?: Block[];
};

// ---------- Cấu hình palette (UI tĩnh) ----------
const PALETTE: { section: string; items: { type: string; ico: string; label: string }[] }[] = [
  {
    section: '📦 KHỐI NỘI DUNG',
    items: [
      { type: 'heading', ico: '🔖', label: 'Tiêu đề mục' },
      { type: 'text', ico: '📝', label: 'Đoạn văn' },
      { type: 'image', ico: '🖼', label: 'Hình ảnh' },
      { type: 'video', ico: '🎬', label: 'Video / YouTube' },
      { type: 'quiz', ico: '📋', label: 'Quiz trắc nghiệm' },
    ],
  },
  {
    section: '🎯 TƯƠNG TÁC',
    items: [
      { type: '3d-model', ico: '🧊', label: 'Model 3D (.glb)' },
      { type: 'ai-tutor', ico: '🦉', label: 'Gọi AI Tutor' },
      { type: 'ai-character', ico: '👤', label: 'Gặp danh nhân' },
      { type: 'patient-sim', ico: '🩺', label: 'Ca lâm sàng' },
      { type: 'negotiation', ico: '🤝', label: 'Đàm phán' },
    ],
  },
  {
    section: '🔗 KHÁC',
    items: [
      { type: 'link', ico: '🔗', label: 'Liên kết' },
      { type: 'callout', ico: '💡', label: 'Callout / Ghi nhớ' },
      { type: 'divider', ico: '➖', label: 'Đường kẻ' },
    ],
  },
];

const SUBJECTS: { value: string; label: string }[] = [
  { value: '', label: 'Môn' },
  { value: 'toan', label: 'Toán' },
  { value: 'vat_ly', label: 'Vật lý' },
  { value: 'hoa', label: 'Hoá' },
  { value: 'sinh', label: 'Sinh' },
  { value: 'ngu_van', label: 'Ngữ văn' },
  { value: 'lich_su', label: 'Lịch sử' },
  { value: 'dia', label: 'Địa lí' },
  { value: 'tin_hoc', label: 'Tin học' },
  { value: 'duoc', label: 'Dược' },
  { value: 'y', label: 'Y khoa' },
];

const CHARACTERS: { value: string; label: string }[] = [
  { value: 'hbt', label: '⚔️ Hai Bà Trưng' },
  { value: 'nt', label: '📜 Nguyễn Trãi' },
  { value: 'ttt', label: '🩺 Tôn Thất Tùng' },
  { value: 'ht', label: '∑ Hoàng Tuỵ' },
  { value: 'nbc', label: '🏆 Ngô Bảo Châu' },
  { value: 'dts', label: '🎹 Đặng Thái Sơn' },
];

const CASES: { value: string; label: string }[] = [
  { value: 'sxh-001', label: '🦟 SXH ngày 4' },
  { value: 'tcm-001', label: '👶 Tay chân miệng độ 2a' },
  { value: 'dtd-001', label: '🩸 ĐTĐ type 2 mới chẩn đoán' },
  { value: 'vh-001', label: '🤒 Viêm họng do virus' },
  { value: 'da-001', label: '⚠️ Dị ứng Allopurinol' },
  { value: 'copd-001', label: '🫁 COPD đợt cấp' },
];

const SCENARIOS: { value: string; label: string }[] = [
  { value: 'it-interview-junior', label: '💼 PV fullstack junior' },
  { value: 'it-interview-senior', label: '🏗 PV Lead Backend' },
  { value: 'pharma-counsel-dtd', label: '💊 Tư vấn ĐTĐ' },
  { value: 'medrep-pricing', label: '💼 MedRep đàm phán' },
];

const AI_DOMAINS = ['it', 'pharmacy', 'medical', 'school', 'general'];
const CALLOUT_KINDS = ['info', 'warn', 'tip', 'danger'];

function blockDefaults(type: string): Block {
  switch (type) {
    case 'heading':      return { type, level: 2, text: 'Tiêu đề mục' };
    case 'text':         return { type, text: 'Nội dung đoạn văn…' };
    case 'image':        return { type, url: '', alt: '', caption: '' };
    case 'video':        return { type, url: 'https://www.youtube.com/embed/' };
    case 'quiz':         return { type, stem: 'Câu hỏi?', options: ['A', 'B', 'C', 'D'], correct: 0, explain: '' };
    case '3d-model':     return { type, url: '', caption: '' };
    case 'ai-tutor':     return { type, domain: 'school', prompt: 'Em hãy hỏi tutor về…' };
    case 'ai-character': return { type, characterId: 'nbc' };
    case 'patient-sim':  return { type, caseId: 'sxh-001' };
    case 'negotiation':  return { type, scenarioId: 'it-interview-junior' };
    case 'link':         return { type, url: '', label: '' };
    case 'callout':      return { type, kind: 'info', text: 'Ghi nhớ quan trọng' };
    case 'divider':      return { type };
    default:             return { type };
  }
}

function blockLabel(b: Block): string {
  const clip = (s: string | undefined, n: number) => (s || '').slice(0, n);
  switch (b.type) {
    case 'heading':      return `🔖 ${clip(b.text, 30)}`;
    case 'text':         return `📝 ${clip(b.text, 40)}`;
    case 'image':        return `🖼 ${clip(b.alt || b.url, 30)}`;
    case 'video':        return '🎬 video';
    case 'quiz':         return `📋 ${clip(b.stem, 30)}`;
    case '3d-model':     return '🧊 3D model';
    case 'ai-tutor':     return '🦉 AI tutor';
    case 'ai-character': return `👤 ${b.characterId}`;
    case 'patient-sim':  return `🩺 ca ${b.caseId}`;
    case 'negotiation':  return `🤝 ${b.scenarioId}`;
    case 'link':         return `🔗 ${clip(b.label || b.url, 30)}`;
    case 'callout':      return `💡 ${clip(b.text, 30)}`;
    case 'divider':      return '➖ kẻ ngang';
    default:             return b.type;
  }
}

const DRAFT_KEY = 'lessonBuilder.draft';

export default function LessonBuilder() {
  const [meta, setMeta] = useState<LessonMeta>({ title: '', description: '', grade: '', subject: '', author: '' });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState<{ text: string; kind: 'ok' | 'danger' } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const hydrated = useRef(false);

  const showToast = useCallback((text: string, kind: 'ok' | 'danger' = 'ok') => {
    setToast({ text, kind });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  // Load existing nếu ?slug=, ngược lại khôi phục draft từ localStorage.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const urlSlug = new URLSearchParams(location.search).get('slug');
    if (urlSlug) {
      fetch('/api/lessons/' + urlSlug, { credentials: 'same-origin' })
        .then((r) => r.json())
        .then((d: LessonApi) => {
          if (d.slug) {
            setCurrentSlug(d.slug);
            setMeta({
              title: d.title || '',
              description: d.description || '',
              grade: d.grade || '',
              subject: d.subject || '',
              author: d.author || '',
            });
            setBlocks(d.blocks || []);
            showToast('Đã load bài: ' + d.title);
          }
        })
        .catch(() => showToast('Không load được bài: ' + urlSlug, 'danger'));
      return;
    }
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      if (draft.blocks) {
        setBlocks(draft.blocks);
        setMeta({
          title: draft.title || '',
          description: draft.description || '',
          grade: draft.grade || '',
          subject: draft.subject || '',
          author: draft.author || '',
        });
        setCurrentSlug(draft.slug || null);
      }
    } catch {
      /* ignore */
    }
  }, [showToast]);

  // Autosave draft khi thay đổi (chỉ sau khi hydrate xong để không ghi đè).
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ blocks, ...meta, slug: currentSlug }),
      );
    } catch {
      /* ignore */
    }
  }, [blocks, meta, currentSlug]);

  // ---------- Thao tác block ----------
  const addBlock = (type: string) => setBlocks((prev) => [...prev, blockDefaults(type)]);
  const delBlock = (i: number) => setBlocks((prev) => prev.filter((_, j) => j !== i));
  const moveBlock = (i: number, dir: number) => {
    setBlocks((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const patchBlock = (i: number, patch: Partial<Block>) => {
    setBlocks((prev) => prev.map((b, j) => (j === i ? { ...b, ...patch } : b)));
  };
  const setOption = (i: number, oi: number, value: string) => {
    setBlocks((prev) =>
      prev.map((b, j) => {
        if (j !== i) return b;
        const options = [...(b.options || [])];
        options[oi] = value;
        return { ...b, options };
      }),
    );
  };
  const addOption = (i: number) => {
    setBlocks((prev) =>
      prev.map((b, j) => {
        if (j !== i) return b;
        const options = [...(b.options || [])];
        options.push('Phương án ' + String.fromCharCode(65 + options.length));
        return { ...b, options };
      }),
    );
  };
  const delOption = (i: number, oi: number) => {
    setBlocks((prev) =>
      prev.map((b, j) => {
        if (j !== i) return b;
        const options = (b.options || []).filter((_, k) => k !== oi);
        return { ...b, options };
      }),
    );
  };

  // ---------- Save / Publish ----------
  const save = async (published: boolean) => {
    const title = meta.title.trim();
    if (!title) return showToast('⚠ Cần tên bài giảng', 'danger');
    if (!blocks.length) return showToast('⚠ Bài chưa có khối nào', 'danger');
    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: currentSlug || undefined,
          title,
          description: meta.description,
          author: meta.author || 'Ẩn danh',
          grade: meta.grade,
          subject: meta.subject,
          blocks,
          published,
        }),
      });
      const data = await res.json();
      if (!res.ok) return showToast('⚠ ' + (data.error || 'Lỗi'), 'danger');
      setCurrentSlug(data.slug);
      const url = location.origin + '/lesson?slug=' + data.slug;
      setShareUrl(url);
      showToast(published ? '🚀 Đã publish! Link share cho HS đã sẵn sàng.' : '💾 Đã lưu draft.');
    } catch (e) {
      showToast('⚠ ' + (e as Error).message, 'danger');
    }
  };

  // ---------- Export / Import ----------
  const doExport = () => {
    const data = { ...meta, blocks };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (meta.title || 'lesson').replace(/[^a-z0-9-]+/gi, '-') + '.json';
    a.click();
  };
  const doImport = async (file: File | null) => {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      setMeta({
        title: data.title || '',
        description: data.description || '',
        grade: data.grade || '',
        subject: data.subject || '',
        author: data.author || '',
      });
      const imported: Block[] = data.blocks || [];
      setBlocks(imported);
      showToast('Đã import ' + imported.length + ' khối');
    } catch (e) {
      showToast('Import lỗi: ' + (e as Error).message, 'danger');
    }
  };

  return (
    <div className="-mx-4 min-h-screen text-white sm:-mx-6" style={{ background: 'linear-gradient(180deg,#0f172a,#1e293b 60%,#312e81)' }}>
      {/* HEAD */}
      <div className="sticky top-0 z-40 flex flex-wrap items-center gap-3 border-b border-white/10 bg-slate-900/70 px-5 py-3 backdrop-blur">
        <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white no-underline">←</Link>
        <h1 className="m-0 bg-gradient-to-br from-white via-amber-400 to-orange-500 bg-clip-text text-lg font-bold text-transparent">
          ✏️ Lesson Builder no-code
        </h1>
        <input
          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          placeholder="Tên bài giảng"
          value={meta.title}
          onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
        />
        <input
          className="w-14 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          placeholder="Lớp"
          value={meta.grade}
          onChange={(e) => setMeta((m) => ({ ...m, grade: e.target.value }))}
        />
        <select
          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          value={meta.subject}
          onChange={(e) => setMeta((m) => ({ ...m, subject: e.target.value }))}
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value} className="bg-slate-800">{s.label}</option>
          ))}
        </select>
        <input
          className="w-28 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white"
          placeholder="Tác giả"
          value={meta.author}
          onChange={(e) => setMeta((m) => ({ ...m, author: e.target.value }))}
        />
        <div className="ml-auto flex items-center gap-1.5">
          <button className="rounded-lg border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs text-white" title="Import JSON" onClick={() => importRef.current?.click()}>📥 Import</button>
          <button className="rounded-lg border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs text-white" title="Export JSON" onClick={doExport}>💾 Export</button>
          <button className="rounded-lg border-none bg-gradient-to-br from-amber-400 to-orange-500 px-3.5 py-1.5 text-xs font-bold text-[#3e2723]" onClick={() => save(false)}>💾 Lưu</button>
          <button className="rounded-lg border-none bg-gradient-to-br from-emerald-500 to-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white" onClick={() => save(true)}>🚀 Publish</button>
          <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={(e) => doImport(e.target.files?.[0] || null)} />
        </div>
      </div>

      {/* LAYOUT */}
      <div className="grid gap-3 p-3.5 lg:grid-cols-[220px_1fr_320px]">
        {/* PALETTE */}
        <div className="max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
          {PALETTE.map((grp) => (
            <div key={grp.section}>
              <h3 className="my-2 text-xs opacity-80">{grp.section}</h3>
              {grp.items.map((it) => (
                <div
                  key={it.type}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/tizia-block-type', it.type);
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                  onClick={() => addBlock(it.type)}
                  className="mb-1.5 flex cursor-grab items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] hover:bg-white/10 active:scale-[0.97]"
                >
                  <span className="shrink-0 text-lg">{it.ico}</span>
                  {it.label}
                </div>
              ))}
            </div>
          ))}
          <p className="mt-3.5 text-[11px] leading-relaxed opacity-60">
            💡 Kéo khối từ đây sang vùng giữa. Trên di động, bấm khối để thêm.
          </p>
        </div>

        {/* CANVAS */}
        <div className="min-h-[60vh] rounded-2xl border border-white/10 bg-white/5 p-[18px]">
          <h2 className="mb-1.5 bg-gradient-to-br from-white via-amber-400 to-orange-500 bg-clip-text text-[22px] font-bold text-transparent">📚 Bài giảng tương tác</h2>
          <textarea
            className="mb-3 min-h-[42px] w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white"
            placeholder="Mô tả ngắn (tuỳ chọn) — học sinh sẽ thấy khi truy cập link share"
            value={meta.description}
            onChange={(e) => setMeta((m) => ({ ...m, description: e.target.value }))}
          />
          <div
            className={
              'min-h-[80px] rounded-xl border-2 border-dashed p-3.5 transition-colors ' +
              (dragOver ? 'border-amber-400 bg-amber-400/[0.06]' : 'border-white/15')
            }
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const type = e.dataTransfer.getData('text/tizia-block-type');
              if (type) addBlock(type);
            }}
          >
            {blocks.length === 0 ? (
              <div className="px-5 py-10 text-center text-[13px] opacity-70">
                Kéo khối từ panel bên trái vào đây để bắt đầu xây bài giảng.<br />
                Tự động lưu khi anh chị Publish hoặc bấm 💾 Lưu.
              </div>
            ) : (
              blocks.map((b, i) => (
                <BlockEditor
                  key={i}
                  block={b}
                  index={i}
                  total={blocks.length}
                  onPatch={(patch) => patchBlock(i, patch)}
                  onMove={(dir) => moveBlock(i, dir)}
                  onDel={() => { if (confirm('Xoá khối này?')) delBlock(i); }}
                  onSetOption={(oi, v) => setOption(i, oi, v)}
                  onAddOption={() => addOption(i)}
                  onDelOption={(oi) => delOption(i, oi)}
                />
              ))
            )}
          </div>
        </div>

        {/* PREVIEW */}
        <div className="max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3.5">
          <h3 className="my-1 text-[13px] opacity-85">📊 Tổng quan</h3>
          <div className="text-xs leading-relaxed opacity-85">
            {blocks.length} khối · {currentSlug ? 'slug=' + currentSlug : 'chưa lưu'}
          </div>

          {shareUrl && (
            <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5">
              <div className="mb-1.5 text-[11px] opacity-70">🔗 URL share cho HS:</div>
              <a href={shareUrl} target="_blank" rel="noreferrer" className="break-all text-xs text-emerald-300">{shareUrl}</a>
              <div className="mt-2 flex gap-1.5">
                <button
                  className="rounded-md border-none bg-emerald-500/20 px-2.5 py-1 text-[11px] text-emerald-300"
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                >📋 Copy</button>
                <button
                  className="rounded-md border-none bg-sky-500/20 px-2.5 py-1 text-[11px] text-sky-300"
                  onClick={() => window.open(shareUrl, '_blank')}
                >👁 Xem</button>
              </div>
            </div>
          )}

          <h3 className="mt-[18px] text-[13px] opacity-85">📋 Cấu trúc bài</h3>
          <div className="text-[11px] leading-relaxed opacity-85">
            {blocks.map((b, i) => (
              <div key={i}>{i + 1}. {blockLabel(b)}</div>
            ))}
          </div>

          <h3 className="mt-[18px] text-[13px] opacity-85">🔧 Mã JSON</h3>
          <pre className="max-h-[280px] overflow-y-auto whitespace-pre rounded-lg bg-black/30 p-2.5 font-mono text-[10px] leading-snug">
            {JSON.stringify(blocks, null, 2)}
          </pre>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div
          className="fixed bottom-[18px] right-[18px] z-[999] rounded-[10px] px-4 py-2.5 text-[13px] text-white shadow-lg"
          style={{ background: toast.kind === 'danger' ? 'linear-gradient(135deg,#ef4444,#b91c1c)' : 'linear-gradient(135deg,#10b981,#059669)' }}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Editor cho một block — render field theo type.
// ============================================================
const inputCls =
  'mb-1.5 w-full rounded-lg border border-white/15 bg-black/20 px-2.5 py-2 text-[13px] text-white';

function BlockEditor({
  block: b,
  index: i,
  total,
  onPatch,
  onMove,
  onDel,
  onSetOption,
  onAddOption,
  onDelOption,
}: {
  block: Block;
  index: number;
  total: number;
  onPatch: (patch: Partial<Block>) => void;
  onMove: (dir: number) => void;
  onDel: () => void;
  onSetOption: (oi: number, v: string) => void;
  onAddOption: () => void;
  onDelOption: (oi: number) => void;
}) {
  return (
    <div className="relative mb-2.5 rounded-xl border border-white/10 bg-white/5 p-3.5 hover:border-white/25">
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-full bg-amber-400 px-2.5 py-[3px] text-[11px] font-bold text-[#3e2723]">{b.type}</div>
        <div className="text-xs tabular-nums opacity-55">#{i + 1}</div>
        <div className="ml-auto flex gap-1">
          <button title="Lên" onClick={() => onMove(-1)} className="h-7 w-7 rounded-md border-none bg-white/5 text-[13px] text-white hover:bg-white/15">↑</button>
          <button title="Xuống" onClick={() => onMove(1)} className="h-7 w-7 rounded-md border-none bg-white/5 text-[13px] text-white hover:bg-white/15">↓</button>
          <button title="Xoá" onClick={onDel} className="h-7 w-7 rounded-md border-none bg-red-500/20 text-[13px] text-red-300 hover:bg-red-500/35">✕</button>
        </div>
      </div>
      <BlockFields b={b} i={i} total={total} onPatch={onPatch} onSetOption={onSetOption} onAddOption={onAddOption} onDelOption={onDelOption} />
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-0.5 text-[11px] opacity-75">{children}</div>;
}

function BlockFields({
  b,
  i,
  total,
  onPatch,
  onSetOption,
  onAddOption,
  onDelOption,
}: {
  b: Block;
  i: number;
  total: number;
  onPatch: (patch: Partial<Block>) => void;
  onSetOption: (oi: number, v: string) => void;
  onAddOption: () => void;
  onDelOption: (oi: number) => void;
}) {
  const selectCls = inputCls + ' [&>option]:bg-slate-800';
  switch (b.type) {
    case 'heading':
      return (
        <>
          <FieldLabel>Cấp tiêu đề (1-3)</FieldLabel>
          <input type="number" min={1} max={3} className={inputCls} value={b.level ?? 2} onChange={(e) => onPatch({ level: +e.target.value })} />
          <FieldLabel>Nội dung</FieldLabel>
          <input type="text" className={inputCls} value={b.text || ''} onChange={(e) => onPatch({ text: e.target.value })} />
        </>
      );
    case 'text':
      return <textarea className={inputCls + ' min-h-[70px] resize-y'} value={b.text || ''} onChange={(e) => onPatch({ text: e.target.value })} />;
    case 'image':
      return (
        <>
          <FieldLabel>URL ảnh</FieldLabel>
          <input type="url" className={inputCls} value={b.url || ''} onChange={(e) => onPatch({ url: e.target.value })} placeholder="https://… hoặc /assets/…" />
          <FieldLabel>Alt</FieldLabel>
          <input type="text" className={inputCls} value={b.alt || ''} onChange={(e) => onPatch({ alt: e.target.value })} />
          <FieldLabel>Chú thích</FieldLabel>
          <input type="text" className={inputCls} value={b.caption || ''} onChange={(e) => onPatch({ caption: e.target.value })} />
        </>
      );
    case 'video':
      return (
        <>
          <FieldLabel>URL embed (YouTube embed/* ý vimeo player)</FieldLabel>
          <input type="url" className={inputCls} value={b.url || ''} onChange={(e) => onPatch({ url: e.target.value })} />
        </>
      );
    case 'quiz':
      return (
        <>
          <FieldLabel>Câu hỏi</FieldLabel>
          <textarea className={inputCls + ' min-h-[70px] resize-y'} value={b.stem || ''} onChange={(e) => onPatch({ stem: e.target.value })} />
          <div className="mt-1.5 rounded-lg bg-black/20 p-2">
            {(b.options || []).map((o, j) => (
              <div key={j} className="mb-1 flex items-center gap-1.5">
                <input
                  type="radio"
                  name={`q${i}c`}
                  className="w-auto"
                  checked={b.correct === j}
                  onChange={() => onPatch({ correct: j })}
                />
                <input
                  type="text"
                  className="m-0 flex-1 rounded-lg border border-white/15 bg-black/20 px-2.5 py-2 text-[13px] text-white"
                  value={o}
                  onChange={(e) => onSetOption(j, e.target.value)}
                />
                <button className="h-7 w-[26px] rounded-md border-none bg-red-500/20 text-red-300" onClick={() => onDelOption(j)}>✕</button>
              </div>
            ))}
            <button className="rounded-md border-none bg-sky-500/15 px-2.5 py-1 text-[11px] text-sky-300" onClick={onAddOption}>+ Thêm phương án</button>
          </div>
          <FieldLabel>Giải thích đáp án</FieldLabel>
          <input type="text" className={inputCls} value={b.explain || ''} onChange={(e) => onPatch({ explain: e.target.value })} />
        </>
      );
    case '3d-model':
      return (
        <>
          <FieldLabel>URL .glb (em mở Thư viện Asset 3D ở tab khác để copy)</FieldLabel>
          <input type="url" className={inputCls} value={b.url || ''} onChange={(e) => onPatch({ url: e.target.value })} placeholder="/campus-proto/assets/.../building-a.glb" />
          <FieldLabel>Chú thích</FieldLabel>
          <input type="text" className={inputCls} value={b.caption || ''} onChange={(e) => onPatch({ caption: e.target.value })} />
        </>
      );
    case 'ai-tutor':
      return (
        <>
          <FieldLabel>Lĩnh vực</FieldLabel>
          <select className={selectCls} value={b.domain || 'school'} onChange={(e) => onPatch({ domain: e.target.value })}>
            {AI_DOMAINS.map((d) => (
              <option key={d} value={d} className="bg-slate-800">{d}</option>
            ))}
          </select>
          <FieldLabel>Gợi ý câu hỏi cho HS</FieldLabel>
          <input type="text" className={inputCls} value={b.prompt || ''} onChange={(e) => onPatch({ prompt: e.target.value })} />
        </>
      );
    case 'ai-character':
      return (
        <>
          <FieldLabel>Nhân vật</FieldLabel>
          <select className={selectCls} value={b.characterId || 'nbc'} onChange={(e) => onPatch({ characterId: e.target.value })}>
            {CHARACTERS.map((c) => (
              <option key={c.value} value={c.value} className="bg-slate-800">{c.label}</option>
            ))}
          </select>
        </>
      );
    case 'patient-sim':
      return (
        <>
          <FieldLabel>Ca lâm sàng</FieldLabel>
          <select className={selectCls} value={b.caseId || 'sxh-001'} onChange={(e) => onPatch({ caseId: e.target.value })}>
            {CASES.map((c) => (
              <option key={c.value} value={c.value} className="bg-slate-800">{c.label}</option>
            ))}
          </select>
        </>
      );
    case 'negotiation':
      return (
        <>
          <FieldLabel>Kịch bản đàm phán</FieldLabel>
          <select className={selectCls} value={b.scenarioId || 'it-interview-junior'} onChange={(e) => onPatch({ scenarioId: e.target.value })}>
            {SCENARIOS.map((s) => (
              <option key={s.value} value={s.value} className="bg-slate-800">{s.label}</option>
            ))}
          </select>
        </>
      );
    case 'link':
      return (
        <>
          <input type="url" className={inputCls} value={b.url || ''} onChange={(e) => onPatch({ url: e.target.value })} placeholder="https://…" />
          <input type="text" className={inputCls} value={b.label || ''} onChange={(e) => onPatch({ label: e.target.value })} placeholder="Nhãn hiển thị" />
        </>
      );
    case 'callout':
      return (
        <>
          <select className={selectCls} value={b.kind || 'info'} onChange={(e) => onPatch({ kind: e.target.value })}>
            {CALLOUT_KINDS.map((k) => (
              <option key={k} value={k} className="bg-slate-800">{k}</option>
            ))}
          </select>
          <textarea className={inputCls + ' min-h-[70px] resize-y'} value={b.text || ''} onChange={(e) => onPatch({ text: e.target.value })} />
        </>
      );
    case 'divider':
      return <div className="p-2.5 text-center text-xs opacity-60">— Đường kẻ ngang —</div>;
    default:
      return null;
  }
}
