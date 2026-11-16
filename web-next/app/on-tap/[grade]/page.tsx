import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMeta, breadcrumbLd, courseLd } from '@/lib/seo';
import { findGrade, getLessonIndex, subjectLabel } from '@/lib/curriculum';

// ISR: KHÔNG dựng sẵn trang nào lúc build (mảng rỗng — lúc build chưa gọi được
// Express), nhưng trang đã dựng thì được LƯU LẠI và dùng chung cho mọi người
// trong 1 giờ. Thiếu khai báo này Next coi route là "động hoàn toàn" và trả
// Cache-Control: no-store → mỗi lượt xem lại dựng lại từ đầu, chậm và tốn.
export function generateStaticParams() {
  return [];
}
export const dynamicParams = true;
export const revalidate = 3600;

type Params = { params: Promise<{ grade: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { grade } = await params;
  const g = findGrade(grade);
  if (!g) return pageMeta({ title: 'Không tìm thấy khối lớp', description: '', path: '/on-tap', noindex: true });
  return pageMeta({
    title: `Ôn tập ${g.label} — Câu hỏi và lời giải tất cả các môn`,
    description: `Câu hỏi ôn tập ${g.label} (${g.level}) theo Chương trình GDPT 2018: đủ các môn, chia theo chương và bài, mỗi câu có đáp án kèm giải thích. Xem miễn phí.`,
    path: `/on-tap/${g.slug}`,
    keywords: [`ôn tập ${g.label.toLowerCase()}`, `trắc nghiệm ${g.label.toLowerCase()}`, 'GDPT 2018'],
  });
}

export default async function GradePage({ params }: Params) {
  const { grade } = await params;
  const g = findGrade(grade);
  if (!g) notFound();

  const items = await getLessonIndex(g);

  // Gom theo môn, giữ thứ tự tự nhiên của dữ liệu.
  const bySubject = new Map<string, number>();
  const questionsBySubject = new Map<string, number>();
  for (const it of items) {
    bySubject.set(it.subject, (bySubject.get(it.subject) || 0) + 1);
    questionsBySubject.set(it.subject, (questionsBySubject.get(it.subject) || 0) + it.questionCount);
  }
  const subjects = [...bySubject.keys()].sort((a, b) => subjectLabel(a).localeCompare(subjectLabel(b), 'vi'));
  const totalQuestions = [...questionsBySubject.values()].reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-4">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Thư viện ôn tập', path: '/on-tap' },
            { name: g.label, path: `/on-tap/${g.slug}` },
          ]),
          courseLd({
            name: `Ôn tập ${g.label} — Tizia`,
            description: `Bộ câu hỏi ôn tập ${g.label} theo Chương trình GDPT 2018, đủ các môn, có lời giải.`,
            path: `/on-tap/${g.slug}`,
            level: g.level,
          }),
        ]}
      />

      <nav className="text-sm text-muted-foreground">
        <Link href="/on-tap" className="hover:text-foreground">Thư viện ôn tập</Link>
        <span className="mx-1.5">›</span>
        <span className="text-foreground">{g.label}</span>
      </nav>

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Ôn tập {g.label}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          {g.level} · {subjects.length} môn · {items.length} bài · {totalQuestions.toLocaleString('vi-VN')} câu hỏi
          có lời giải. Nội dung bám Chương trình giáo dục phổ thông 2018.
        </p>
      </header>

      {subjects.length === 0 ? (
        <p className="text-muted-foreground">
          Nội dung khối này đang được biên soạn. Mời bạn xem{' '}
          <Link href="/on-tap" className="font-medium text-primary hover:underline">các khối khác</Link>.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {subjects.map((s) => (
            <li key={s}>
              <Link
                href={`/on-tap/${g.slug}/${s}`}
                className="block rounded-lg border border-foreground/15 p-4 transition-colors hover:bg-foreground/5"
              >
                <span className="font-medium">{subjectLabel(s)}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {bySubject.get(s)} bài · {questionsBySubject.get(s)} câu
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-muted-foreground">
        Muốn học theo lộ trình có nhiệm vụ và điểm thưởng? Vào{' '}
        <Link href={`/school?domain=${g.domain}`} className="font-medium text-primary hover:underline">
          trường ảo {g.levelShort}
        </Link>
        .
      </p>
    </div>
  );
}
