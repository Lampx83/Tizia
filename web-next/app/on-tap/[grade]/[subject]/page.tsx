import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMeta, breadcrumbLd, courseLd } from '@/lib/seo';
import { findGrade, getLessonIndex, subjectLabel, groupByChapter } from '@/lib/curriculum';

// ISR: KHÔNG dựng sẵn trang nào lúc build (mảng rỗng — lúc build chưa gọi được
// Express), nhưng trang đã dựng thì được LƯU LẠI và dùng chung cho mọi người
// trong 1 giờ. Thiếu khai báo này Next coi route là "động hoàn toàn" và trả
// Cache-Control: no-store → mỗi lượt xem lại dựng lại từ đầu, chậm và tốn.
export function generateStaticParams() {
  return [];
}
export const dynamicParams = true;
export const revalidate = 3600;

type Params = { params: Promise<{ grade: string; subject: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { grade, subject } = await params;
  const g = findGrade(grade);
  if (!g) return pageMeta({ title: 'Không tìm thấy', description: '', path: '/on-tap', noindex: true });
  const label = subjectLabel(subject);
  return pageMeta({
    title: `${label} ${g.label} — Ôn tập theo chương, có lời giải`,
    description: `Toàn bộ bài ôn tập môn ${label} ${g.label} theo Chương trình GDPT 2018: chia theo chương, mỗi bài là một bộ câu hỏi trắc nghiệm kèm giải thích đáp án. Xem miễn phí, không cần đăng ký.`,
    path: `/on-tap/${g.slug}/${subject}`,
    keywords: [`${label.toLowerCase()} ${g.label.toLowerCase()}`, `ôn tập ${label.toLowerCase()}`, 'trắc nghiệm có lời giải'],
  });
}

export default async function SubjectPage({ params }: Params) {
  const { grade, subject } = await params;
  const g = findGrade(grade);
  if (!g) notFound();

  const all = await getLessonIndex(g);
  const items = all.filter((it) => it.subject === subject);
  if (!items.length) notFound();

  const label = subjectLabel(subject);
  const chapters = groupByChapter(items);
  const totalQuestions = items.reduce((n, it) => n + it.questionCount, 0);

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-4">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Thư viện ôn tập', path: '/on-tap' },
            { name: g.label, path: `/on-tap/${g.slug}` },
            { name: label, path: `/on-tap/${g.slug}/${subject}` },
          ]),
          courseLd({
            name: `${label} ${g.label} — Ôn tập`,
            description: `Bài ôn tập môn ${label} ${g.label} theo chương trình chuẩn, có lời giải từng câu.`,
            path: `/on-tap/${g.slug}/${subject}`,
            level: g.level,
          }),
        ]}
      />

      <nav className="text-sm text-muted-foreground">
        <Link href="/on-tap" className="hover:text-foreground">Thư viện ôn tập</Link>
        <span className="mx-1.5">›</span>
        <Link href={`/on-tap/${g.slug}`} className="hover:text-foreground">{g.label}</Link>
        <span className="mx-1.5">›</span>
        <span className="text-foreground">{label}</span>
      </nav>

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{label} {g.label}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          {items.length} bài ôn tập · {totalQuestions} câu hỏi có lời giải · chia theo {chapters.length} chương,
          bám Chương trình giáo dục phổ thông 2018.
        </p>
      </header>

      {chapters.map(([chapter, lessons]) => (
        <section key={chapter} className="space-y-2">
          <h2 className="text-lg font-medium">{chapter}</h2>
          <ul className="divide-y divide-foreground/10 rounded-lg border border-foreground/15">
            {lessons.map((it) => (
              <li key={it.id}>
                <Link
                  href={`/on-tap/${g.slug}/${subject}/${it.slug}`}
                  className="flex items-baseline justify-between gap-4 px-4 py-3 transition-colors hover:bg-foreground/5"
                >
                  <span className="font-medium">
                    {it.boss && <span className="mr-1.5" aria-hidden>👑</span>}
                    {it.title}
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground">{it.questionCount} câu</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
