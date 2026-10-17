'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

// ---- Types (khớp shape backend server/skills.js + auth.js) ----
export type MeUser = {
  id: number;
  display_name: string;
  role: string;
  enrolled_domain?: string | null;
};

export type FamilyChild = { id: number; display_name: string };
export type FamilyMe = { children?: FamilyChild[]; can_be_parent?: boolean };

export type ClassInfo = {
  id: number;
  code: string;
  name: string;
  teacher_name: string;
};

export type EarnedSkill = {
  code: string;
  name: string;
  domain: string | null;
  score: number | null;
  mastery_pct: number;
};

export type Competency = {
  code: string;
  kind: string;
  name: string;
  description: string | null;
  sort_order?: number;
};

export type TreeNode = {
  competency: Competency;
  total_skills: number;
  earned_skills: EarnedSkill[];
  mastery_pct: number;
  avg_mastery_pct: number;
};

export type SkillTreeResponse = {
  summary: { earned: number; total: number };
  tree: TreeNode[];
  child?: { id: number; display_name: string };
} | null;

type ClassMember = {
  user_id: number;
  display_name: string;
  summary: { earned: number; total: number };
};
type ClassRosterResponse = {
  class: { id: number; code: string; name: string };
  total_skills: number;
  members: ClassMember[];
};

type CatalogResponse = {
  competencies: { id: number; code: string; name: string }[];
  skills: {
    code: string;
    name: string;
    competency_id: number;
    domain: string | null;
  }[];
};

type Subject =
  | { context: 'self'; label: string }
  | { context: 'child'; label: string; child_id: number }
  | { context: 'class'; label: string; class_code: string };

// ---- Metadata (giữ nguyên bản gốc) ----
const KIND_META: Record<string, { label: string; cls: string; icon: string }> = {
  pham_chat: { label: '5 Phẩm chất', cls: 'pham-chat', icon: '💖' },
  nang_luc_chung: { label: '3 Năng lực chung', cls: 'nl-chung', icon: '🧭' },
  nang_luc_chuyen_mon: { label: '7 Năng lực chuyên môn', cls: 'nl-chuyen', icon: '🛠️' },
};
const DOMAIN_LABEL: Record<string, string> = {
  preschool: 'Mầm non',
  primary: 'Tiểu học',
  secondary: 'THCS',
  highschool: 'THPT',
  pharmacy: 'Trường Dược',
  it: 'Trường CNTT',
};
const COMP_ICON: Record<string, string> = {
  PC_YEU_NUOC: '🇻🇳',
  PC_NHAN_AI: '🤝',
  PC_CHAM_CHI: '🐝',
  PC_TRUNG_THUC: '🕊️',
  PC_TRACH_NHIEM: '🛡️',
  NL_TU_CHU: '🧭',
  NL_GIAO_TIEP: '💬',
  NL_GQVD: '💡',
  NL_NGON_NGU: '📚',
  NL_TINH_TOAN: '🔢',
  NL_KHOA_HOC: '🔬',
  NL_CONG_NGHE: '⚙️',
  NL_TIN_HOC: '💻',
  NL_THAM_MY: '🎨',
  NL_THE_CHAT: '⚽',
};
const DOMAIN_META: Record<string, { icon: string; name: string; tagline: string }> = {
  pharmacy: { icon: '💊', name: 'Trường Dược', tagline: '5 năm · 102 module · Hoá hữu cơ → OSCE · hỗ trợ 2D/3D/VR/Metaverse' },
  it: { icon: '💻', name: 'Trường Công nghệ thông tin', tagline: '4 năm · Cử nhân CNTT · Python → ML · CTF · Hackathon · Cloud' },
  preschool: { icon: '🧸', name: 'Trường Mầm non', tagline: '3–5 tuổi (Mầm/Chồi/Lá) · đếm số · màu sắc · hình khối · học bằng hình ảnh vui' },
  primary: { icon: '🎒', name: 'Trường Tiểu học', tagline: 'Lớp 1–5 · Toán (đã có) · Tiếng Việt · TN&XH · Tiếng Anh · học mà chơi' },
  secondary: { icon: '📐', name: 'Trường Trung học cơ sở', tagline: 'Lớp 6–9 · Toán · Ngữ văn · Anh · KHTN · Sử-Địa · luyện thi vào 10' },
  highschool: { icon: '🏫', name: 'Trường Trung học phổ thông', tagline: 'Lớp 10–12 · phân ban KHTN/KHXH · luyện thi tốt nghiệp THPT & ĐH' },
};

const KIND_DOT: Record<string, string> = {
  'pham-chat': '#f472b6',
  'nl-chung': '#60a5fa',
  'nl-chuyen': '#a78bfa',
};

// ---- Component ----
export default function NangLucClient({
  me,
  children,
  classes,
  selfTree,
}: {
  me: MeUser;
  children: FamilyChild[];
  classes: ClassInfo[];
  selfTree: SkillTreeResponse;
}) {
  const [subject, setSubject] = useState<Subject>({
    context: 'self',
    label: 'Bản thân (' + (me.display_name || 'tôi') + ')',
  });
  const [tree, setTree] = useState<SkillTreeResponse>(selfTree);
  const [roster, setRoster] = useState<ClassRosterResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal xem toàn bộ kỹ năng của 1 competency.
  const [modalNode, setModalNode] = useState<TreeNode | null>(null);
  const [catalog, setCatalog] = useState<CatalogResponse | null>(null);
  const [catalogLoading, setCatalogLoading] = useState(false);

  const load = useCallback(async (subj: Subject) => {
    setSubject(subj);
    setError(null);
    setLoading(true);
    setRoster(null);
    let url = '/api/skills/me';
    if (subj.context === 'child') url = `/api/skills/child/${subj.child_id}`;
    else if (subj.context === 'class')
      url = `/api/skills/class/${encodeURIComponent(subj.class_code)}`;
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (subj.context === 'class') {
        setRoster(data as ClassRosterResponse);
        setTree(null);
      } else {
        setTree(data as SkillTreeResponse);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  // Đóng modal bằng Escape.
  useEffect(() => {
    if (!modalNode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalNode(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalNode]);

  const openModal = useCallback(async (node: TreeNode) => {
    setModalNode(node);
    if (catalog) return;
    setCatalogLoading(true);
    try {
      const res = await fetch('/api/skills/catalog');
      setCatalog((await res.json()) as CatalogResponse);
    } catch {
      setCatalog({ competencies: [], skills: [] });
    } finally {
      setCatalogLoading(false);
    }
  }, [catalog]);

  const enrollMeta = me.enrolled_domain ? DOMAIN_META[me.enrolled_domain] : null;

  return (
    <div className="w-full space-y-4 pb-16">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">🎯 Năng lực của em</h1>
          <span className="ml-auto text-sm text-muted-foreground">
            Khung Chương trình GDPT 2018 (TT 32/2018)
          </span>
        </div>
      </div>

      {/* Enrollment banner: trường đang theo học (admin không hiện). */}
      {me.role !== 'admin' && (
        <div className="flex flex-wrap items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-3.5">
          <div className="text-3xl">{enrollMeta ? enrollMeta.icon : '❓'}</div>
          <div className="min-w-[200px] flex-1">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Trường đang theo học
            </div>
            <div className="text-[17px] font-extrabold">
              {enrollMeta ? enrollMeta.name : 'Chưa chọn trường'}
            </div>
            <div className="mt-0.5 text-[12.5px] text-muted-foreground">
              {enrollMeta ? enrollMeta.tagline : 'Hãy chọn một trường để bắt đầu theo dõi năng lực.'}
            </div>
          </div>
          <Link
            href="/"
            className="rounded-[10px] bg-foreground px-4 py-2 text-[13px] font-bold text-background hover:opacity-90"
          >
            {me.enrolled_domain ? '🔄 Đổi trường' : '🎓 Chọn trường'}
          </Link>
        </div>
      )}

      <Switcher me={me} children={children} classes={classes} subject={subject} onPick={load} />

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Đang tải…</div>
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-10 text-center">
          <h3 className="font-semibold">⚠️ Lỗi tải</h3>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
      ) : subject.context === 'class' && roster ? (
        <ClassRoster roster={roster} onPickStudent={load} />
      ) : tree ? (
        <Tree tree={tree} subject={subject} onOpenModal={openModal} />
      ) : (
        <div className="py-16 text-center text-muted-foreground">Đang tải cây năng lực…</div>
      )}

      {modalNode && (
        <SkillModal
          node={modalNode}
          catalog={catalog}
          loading={catalogLoading}
          onClose={() => setModalNode(null)}
        />
      )}
    </div>
  );
}

// ---- Switcher: xem cây năng lực của ai (bản thân / con / lớp) ----
function Switcher({
  me,
  children,
  classes,
  subject,
  onPick,
}: {
  me: MeUser;
  children: FamilyChild[];
  classes: ClassInfo[];
  subject: Subject;
  onPick: (s: Subject) => void;
}) {
  // Chỉ self → ẩn switcher (giống bản gốc).
  if (children.length === 0 && classes.length === 0) return null;

  const pillBase =
    'inline-flex items-center gap-1.5 rounded-[14px] border px-3 py-1.5 text-[13px] transition-colors';
  const pillOn = 'border-primary bg-primary font-bold text-primary-foreground';
  const pillOff = 'border-border bg-card-foreground/5 hover:bg-card-foreground/10';

  const active = (test: boolean) => `${pillBase} ${test ? pillOn : pillOff}`;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-[14px] border border-border bg-card px-3 py-2.5">
      <b className="mr-1.5 text-[13px] text-muted-foreground">Xem cây năng lực của:</b>
      <button
        className={active(subject.context === 'self')}
        onClick={() => onPick({ context: 'self', label: 'Bản thân' })}
      >
        👤 Bản thân
        <span className="text-[11px] opacity-70">{me.display_name || ''}</span>
      </button>
      {children.map((c) => (
        <button
          key={`child-${c.id}`}
          className={active(subject.context === 'child' && subject.child_id === c.id)}
          onClick={() =>
            onPick({ context: 'child', label: 'Con: ' + (c.display_name || c.id), child_id: c.id })
          }
        >
          👶 {c.display_name}
          <span className="text-[11px] opacity-70">con</span>
        </button>
      ))}
      {classes.map((cls) => (
        <button
          key={`class-${cls.code}`}
          className={active(subject.context === 'class' && subject.class_code === cls.code)}
          onClick={() =>
            onPick({
              context: 'class',
              label: 'Lớp: ' + (cls.name || cls.code),
              class_code: cls.code,
            })
          }
        >
          🎓 {cls.name || cls.code}
          <span className="text-[11px] opacity-70">lớp</span>
        </button>
      ))}
    </div>
  );
}

// ---- Class roster (cho GV) ----
function ClassRoster({
  roster,
  onPickStudent,
}: {
  roster: ClassRosterResponse;
  onPickStudent: (s: Subject) => void;
}) {
  const members = roster.members || [];
  const cls = roster.class || { code: '', name: '' };
  const total = roster.total_skills || 0;
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[rgba(251,191,36,.35)] bg-[linear-gradient(135deg,rgba(251,191,36,.18),rgba(251,191,36,.03))] px-6 py-5">
        <h2 className="text-xl font-bold">
          🎓 Lớp <span className="text-[#34d399]">{cls.name || cls.code}</span>
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {members.length} HS trong lớp. Bấm vào HS để xem cây năng lực chi tiết. (Chỉ HS đã làm bài
          qua mã lớp{' '}
          <code className="rounded bg-white/[.07] px-1.5 py-0.5">{cls.code}</code> mới hiển thị.)
        </p>
      </div>
      {members.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-10 text-center">
          <h3 className="font-semibold">👥 Chưa có HS nào</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            HS làm bài với class_code=<b>{cls.code}</b> sẽ tự xuất hiện ở đây.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
          {members.map((m) => {
            const pct = total > 0 ? Math.round((m.summary.earned / total) * 100) : 0;
            return (
              <button
                key={m.user_id}
                className="rounded-xl border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-primary"
                onClick={() =>
                  onPickStudent({
                    context: 'child',
                    label: 'HS: ' + m.display_name,
                    child_id: m.user_id,
                  })
                }
              >
                <div className="text-sm font-bold">{m.display_name}</div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-md bg-white/[.07]">
                  <i
                    className="block h-full bg-[linear-gradient(90deg,#34d399,#fbbf24)]"
                    style={{ width: pct + '%' }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[11.5px] text-muted-foreground">
                  <span>
                    {m.summary.earned}/{total} kỹ năng
                  </span>
                  <span>{pct}%</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---- Tree (hero donut + competency grid) ----
function Tree({
  tree,
  subject,
  onOpenModal,
}: {
  tree: NonNullable<SkillTreeResponse>;
  subject: Subject;
  onOpenModal: (n: TreeNode) => void;
}) {
  const summary = tree.summary || { earned: 0, total: 0 };
  const nodes = tree.tree || [];
  const child = tree.child;
  const pct = summary.total > 0 ? Math.round((summary.earned / summary.total) * 100) : 0;

  const CIRC = 2 * Math.PI * 52;
  const arcLen = (pct / 100) * CIRC;
  const whoName = child ? child.display_name : 'Em';
  const isSelf = subject.context === 'self';

  const byKind: Record<string, TreeNode[]> = {
    pham_chat: [],
    nang_luc_chung: [],
    nang_luc_chuyen_mon: [],
  };
  for (const node of nodes) {
    const k = node.competency.kind;
    if (byKind[k]) byKind[k].push(node);
  }

  return (
    <div className="space-y-2">
      {/* Hero */}
      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-[rgba(251,191,36,.35)] bg-[linear-gradient(135deg,rgba(251,191,36,.18),rgba(251,191,36,.03))] px-6 py-5">
        <div className="relative h-[120px] w-[120px] flex-shrink-0" aria-label="Tiến độ tổng">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${arcLen} ${CIRC - arcLen}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-extrabold text-[#fbbf24]">{pct}%</div>
            <div className="text-[11px] font-semibold text-muted-foreground">Tiến độ</div>
          </div>
        </div>
        <div className="min-w-[260px] flex-1">
          <h2 className="text-[22px] font-bold">
            {whoName} đã đạt <span className="text-[#34d399]">{summary.earned}</span> /{' '}
            {summary.total} kỹ năng
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {isSelf ? (
              <>
                Mỗi kỹ năng thuộc 1 trong <b>5 phẩm chất</b> hoặc <b>10 năng lực</b> của Chương
                trình GDPT 2018. Hoàn thành quiz tại mỗi không gian (đạt ≥70%) để mở khoá kỹ năng
                mới.
              </>
            ) : (
              <>
                Cây năng lực của <b>{whoName}</b> theo khung Chương trình GDPT 2018. Bạn đang xem ở
                chế độ {subject.context === 'child' ? 'phụ huynh / quản lý' : 'giáo viên'}.
              </>
            )}
          </p>
          {isSelf && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-xl bg-primary px-3.5 py-2 text-[13px] font-bold text-primary-foreground hover:opacity-90"
              >
                🏫 Khám phá các trường
              </Link>
              <Link
                href="/cay-tri-thuc"
                className="rounded-xl border border-border bg-white/[.08] px-3.5 py-2 text-[13px] font-bold hover:bg-white/[.14]"
              >
                🌳 Cây Tri Thức
              </Link>
            </div>
          )}
        </div>
      </div>

      {summary.earned === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card py-10 text-center">
          <h3 className="font-semibold">🌱 Hãy bắt đầu khám phá!</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Em chưa đạt kỹ năng nào — vào một không gian (ví dụ Trường Mầm non → Lớp Mầm) và làm quiz
            đạt ≥70% để mở khoá.
          </p>
          <Link
            href="/school?domain=preschool"
            className="mt-3 inline-block rounded-xl bg-primary px-[18px] py-2.5 font-bold text-primary-foreground hover:opacity-90"
          >
            🏫 Vào Trường Mầm non
          </Link>
        </div>
      )}

      {(['pham_chat', 'nang_luc_chung', 'nang_luc_chuyen_mon'] as const).map((kind) => {
        const list = byKind[kind];
        if (!list || list.length === 0) return null;
        const meta = KIND_META[kind];
        const totalEarned = list.reduce((s, n) => s + n.earned_skills.length, 0);
        const totalAll = list.reduce((s, n) => s + n.total_skills, 0);
        return (
          <div key={kind}>
            <div className="mb-3 mt-7 flex items-center gap-2.5 text-base font-bold">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: KIND_DOT[meta.cls] }}
              />
              {meta.icon} {meta.label}
              <span className="ml-auto text-[12.5px] font-medium text-muted-foreground">
                {totalEarned}/{totalAll} kỹ năng
              </span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-3.5">
              {list.map((node) => (
                <CompCard key={node.competency.code} node={node} onOpenModal={onOpenModal} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CompCard({ node, onOpenModal }: { node: TreeNode; onOpenModal: (n: TreeNode) => void }) {
  const c = node.competency;
  const earned = node.earned_skills.length;
  const total = node.total_skills;
  const coveragePct = total > 0 ? Math.round((earned / total) * 100) : 0;
  const masteryPct = node.mastery_pct ?? 0;
  const avgMasteryPct = node.avg_mastery_pct ?? 0;
  const isEmpty = earned === 0;
  const icon = COMP_ICON[c.code] || '⭐';
  const earnedChips = node.earned_skills.slice(0, 4);
  const more = earned - 4;

  return (
    <div
      className={
        'rounded-2xl border border-border bg-card px-[18px] py-4 transition-colors hover:border-[rgba(251,191,36,.4)] ' +
        (isEmpty ? 'opacity-60' : '')
      }
    >
      <h3 className="mb-1.5 flex items-center gap-2 text-[15.5px] font-semibold">
        <span className="text-xl">{icon}</span>
        {c.name}
      </h3>
      <p className="mb-3 min-h-[36px] text-[12.5px] leading-relaxed text-muted-foreground">
        {c.description || ''}
      </p>
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span>Đã đạt</span>
        <span>
          <b className="text-[#34d399]">{earned}</b>/{total} ({coveragePct}%)
        </span>
      </div>
      <div className="mb-2.5 h-2 overflow-hidden rounded-lg bg-white/[.07]">
        <i
          className="block h-full rounded-lg bg-[linear-gradient(90deg,#34d399,#fbbf24)]"
          style={{ width: coveragePct + '%' }}
        />
      </div>
      <div className="mb-2 mt-2.5 flex justify-between text-xs text-muted-foreground">
        <span>Thành thạo</span>
        <span>
          <b className="text-[#34d399]">{masteryPct}%</b>
          <span className="text-[11px] opacity-60"> · TB {avgMasteryPct}%</span>
        </span>
      </div>
      <div className="mb-2.5 h-2 overflow-hidden rounded-lg bg-white/[.07]">
        <i
          className="block h-full rounded-lg bg-[linear-gradient(90deg,#a78bfa,#ec4899)]"
          style={{ width: masteryPct + '%' }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {isEmpty ? (
          <span className="text-[12.5px] italic text-muted-foreground">
            Chưa có kỹ năng nào — vào trường và làm quiz đi em!
          </span>
        ) : (
          <>
            {earnedChips.map((s) => (
              <span
                key={s.code}
                title={`${s.domain ? DOMAIN_LABEL[s.domain] || '' : ''} · Thành thạo ${s.mastery_pct}%`}
                className="inline-flex flex-col items-stretch gap-[3px] rounded-[14px] border border-[rgba(16,185,129,.4)] bg-[rgba(16,185,129,.16)] px-2.5 py-1 text-[11.5px] text-[#34d399]"
              >
                {s.name}
                <span className="h-[3px] overflow-hidden rounded-sm bg-white/[.18]">
                  <i
                    className="block h-full bg-[linear-gradient(90deg,#a78bfa,#34d399)]"
                    style={{ width: s.mastery_pct + '%' }}
                  />
                </span>
              </span>
            ))}
            {more > 0 && (
              <button
                className="cursor-pointer rounded-[14px] border border-dashed border-border bg-white/[.06] px-2.5 py-1 text-[11.5px] text-muted-foreground"
                onClick={() => onOpenModal(node)}
              >
                +{more} khác
              </button>
            )}
          </>
        )}
      </div>
      {total > earned && !isEmpty && (
        <div className="mt-2">
          <button
            className="cursor-pointer rounded-[14px] border border-dashed border-border bg-white/[.06] px-2.5 py-1 text-[11.5px] text-muted-foreground"
            onClick={() => onOpenModal(node)}
          >
            Xem {total - earned} kỹ năng chưa đạt →
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Modal: toàn bộ skill của 1 competency (earned + chưa đạt) ----
function SkillModal({
  node,
  catalog,
  loading,
  onClose,
}: {
  node: TreeNode;
  catalog: CatalogResponse | null;
  loading: boolean;
  onClose: () => void;
}) {
  const c = node.competency;
  const compId = catalog?.competencies.find((x) => x.code === c.code)?.id;
  const all = catalog && compId != null ? catalog.skills.filter((s) => s.competency_id === compId) : [];
  const earnedSet = new Set(node.earned_skills.map((s) => s.code));
  const earnedBySource = new Map(node.earned_skills.map((s) => [s.code, s]));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,11,22,.72)] p-5 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[80vh] w-full max-w-[560px] overflow-auto rounded-2xl border border-border bg-card px-6 py-5">
        <h2 className="text-xl font-bold">
          {COMP_ICON[c.code] || '⭐'} {c.name}
        </h2>
        <p className="mb-3.5 text-[13.5px] text-muted-foreground">{c.description || ''}</p>
        <div>
          {loading || !catalog ? (
            <p className="text-muted-foreground">Đang tải…</p>
          ) : compId == null ? (
            <p>Không tìm thấy năng lực này.</p>
          ) : all.length === 0 ? (
            <p className="text-muted-foreground">
              Năng lực này chưa có kỹ năng cụ thể nào trong catalog.
            </p>
          ) : (
            all.map((s) => {
              const isEarned = earnedSet.has(s.code);
              const src = earnedBySource.get(s.code);
              const domainLabel = s.domain ? DOMAIN_LABEL[s.domain] || s.domain : '';
              return (
                <div
                  key={s.code}
                  className="flex items-center gap-2.5 border-t border-border py-2.5 text-[13.5px]"
                >
                  <span className="text-base">{isEarned ? '✅' : '⬜'}</span>
                  <span className={isEarned ? '' : 'opacity-65'}>{s.name}</span>
                  <span className="ml-auto text-[11.5px] text-muted-foreground">
                    {domainLabel}
                    {src?.score != null ? ' · ' + src.score + '%' : ''}
                  </span>
                </div>
              );
            })
          )}
        </div>
        <button
          className="mt-3.5 cursor-pointer rounded-[10px] border border-border bg-white/[.08] px-3 py-1.5 hover:bg-white/[.14]"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
