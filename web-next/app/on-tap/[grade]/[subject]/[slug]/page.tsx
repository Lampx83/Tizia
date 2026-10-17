import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMeta, breadcrumbLd, absoluteUrl } from '@/lib/seo';
import {
  findGrade, getLessonIndex, getScenario, subjectLabel, type LessonIndexItem,
} from '@/lib/curriculum';

// ISR: KHÔNG dựng sẵn trang nào lúc build (mảng rỗng — lúc build chưa gọi được
// Express), nhưng trang đã dựng thì được LƯU LẠI và dùng chung cho mọi người
// trong 1 giờ. Thiếu khai báo này Next coi route là "động hoàn toàn" và trả
// Cache-Control: no-store → mỗi lượt xem lại dựng lại từ đầu, chậm và tốn.
export function generateStaticParams() {
  return [];
}
export const dynamicParams = true;
export const revalidate = 3600;

type Params = { params: Promise<{ grade: string; subject: string; slug: string }> };

// Tìm bài theo (khối, môn, slug). Slug dựng từ tiêu đề nên phải tra qua chỉ mục.
async function resolve(grade: string, subject: string, slug: string) {
  const g = findGrade(grade);
  if (!g) return null;
  const all = await getLessonIndex(g);
  const inSubject = all.filter((it) => it.subject === subject);
  const item = inSubject.find((it) => it.slug === slug);
  if (!item) return null;
  const i = inSubject.indexOf(item);
  return {
    g,
    item,
    prev: (i > 0 ? inSubject[i - 1] : null) as LessonIndexItem | null,
    next: (i < inSubject.length - 1 ? inSubject[i + 1] : null) as LessonIndexItem | null,
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { grade, subject, slug } = await params;
  const r = await resolve(grade, subject, slug);
  if (!r) return pageMeta({ title: 'Không tìm thấy bài', description: '', path: '/on-tap', noindex: true });
  const label = subjectLabel(subject);
  return pageMeta({
    title: `${r.item.title} — ${label} ${r.g.label}`,
    description: `${r.item.questionCount} câu hỏi trắc nghiệm về "${r.item.title}" (${label} ${r.g.label}${r.item.chapter ? `, chương ${r.item.chapter}` : ''}), mỗi câu có đáp án kèm giải thích ngắn gọn.`,
    path: `/on-tap/${r.g.slug}/${subject}/${slug}`,
  });
}

export default async function LessonPage({ params }: Params) {
  const { grade, subject, slug } = await params;
  const r = await resolve(grade, subject, slug);
  if (!r) notFound();

  const sc = await getScenario(r.item.id);
  const questions = sc?.questions ?? [];
  const label = subjectLabel(subject);
  const base = `/on-tap/${r.g.slug}/${subject}`;

  return (
    <article className="mx-auto max-w-3xl space-y-6 py-4">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Thư viện ôn tập', path: '/on-tap' },
            { name: r.g.label, path: `/on-tap/${r.g.slug}` },
            { name: label, path: base },
            { name: r.item.title, path: `${base}/${slug}` },
          ]),
          // LearningResource: Google hiểu đây là học liệu cho một khối lớp cụ thể.
          {
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: `${r.item.title} — ${label} ${r.g.label}`,
            url: absoluteUrl(`${base}/${slug}`),
            inLanguage: 'vi-VN',
            learningResourceType: 'Bài ôn tập trắc nghiệm',
            educationalLevel: `${r.g.level} · ${r.g.label}`,
            teaches: r.item.chapter || r.item.title,
            isAccessibleForFree: true,
            provider: { '@type': 'EducationalOrganization', name: 'Tizia' },
          },
        ]}
      />

      <nav className="text-sm text-muted-foreground">
        <Link href="/on-tap" className="hover:text-foreground">Thư viện ôn tập</Link>
        <span className="mx-1.5">›</span>
        <Link href={`/on-tap/${r.g.slug}`} className="hover:text-foreground">{r.g.label}</Link>
        <span className="mx-1.5">›</span>
        <Link href={base} className="hover:text-foreground">{label}</Link>
      </nav>

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{r.item.title}</h1>
        <p className="mt-2 text-muted-foreground">
          {label} {r.g.label}
          {r.item.chapter && <> · Chương: {r.item.chapter}</>}
          {' · '}{questions.length} câu hỏi có lời giải
        </p>
      </header>

      {questions.length === 0 ? (
        <p className="text-muted-foreground">
          Bài này chưa có câu hỏi công khai. Xem{' '}
          <Link href={base} className="font-medium text-primary hover:underline">các bài khác của môn {label}</Link>.
        </p>
      ) : (
        <ol className="space-y-5">
          {questions.map((q, i) => (
            <li key={i} className="rounded-lg border border-foreground/15 p-4">
              <p className="font-medium">
                <span className="mr-1.5 text-muted-foreground">Câu {i + 1}.</span>
                {q.stem}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {q.choices?.map((c, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-muted-foreground">{String.fromCharCode(65 + j)}.</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              {/* <details> để người học tự nghĩ trước khi xem đáp án, nhưng chữ
                  vẫn nằm trong HTML nên công cụ tìm kiếm đọc được đầy đủ. */}
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer font-medium text-primary">Xem đáp án</summary>
                <div className="mt-2 space-y-1 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">
                      Đáp án: {String.fromCharCode(65 + (q.answer ?? 0))}
                      {q.choices?.[q.answer] ? `. ${q.choices[q.answer]}` : ''}
                    </strong>
                  </p>
                  {q.explanation && <p>{q.explanation}</p>}
                </div>
              </details>
            </li>
          ))}
        </ol>
      )}

      <nav className="flex flex-wrap justify-between gap-3 border-t border-foreground/10 pt-5 text-sm">
        {r.prev ? (
          <Link href={`${base}/${r.prev.slug}`} className="font-medium text-primary hover:underline">
            ← {r.prev.title}
          </Link>
        ) : <span />}
        {r.next && (
          <Link href={`${base}/${r.next.slug}`} className="font-medium text-primary hover:underline">
            {r.next.title} →
          </Link>
        )}
      </nav>

      <aside className="rounded-lg border border-foreground/10 p-5 text-sm text-muted-foreground">
        Muốn làm bài có chấm điểm và tính giờ? Vào{' '}
        <Link href={`/school?domain=${r.g.domain}`} className="font-medium text-primary hover:underline">
          trường ảo {r.g.levelShort}
        </Link>{' '}
        để học theo lộ trình, hoặc thử{' '}
        <Link href="/luyen-de" className="font-medium text-primary hover:underline">đề thi thử</Link>.
      </aside>
    </article>
  );
}
