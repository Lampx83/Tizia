import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMeta, breadcrumbLd, absoluteUrl } from '@/lib/seo';
import { GRADES } from '@/lib/curriculum';

export const metadata: Metadata = pageMeta({
  title: 'Thư viện ôn tập — Câu hỏi và lời giải từ Lớp 1 đến Lớp 12',
  description:
    'Kho câu hỏi ôn tập theo Chương trình GDPT 2018 cho Mầm non và Lớp 1–12: đầy đủ các môn, từng bài có câu hỏi trắc nghiệm kèm lời giải thích. Xem miễn phí, không cần đăng ký.',
  path: '/on-tap',
  keywords: ['ôn tập', 'trắc nghiệm', 'GDPT 2018', 'lời giải', 'lớp 1 đến lớp 12'],
});

export const revalidate = 3600;

// Gom khối theo cấp học để danh sách dễ đọc.
const LEVELS = [
  { name: 'Mầm non', desc: 'Làm quen chữ, số, màu sắc và thế giới xung quanh.' },
  { name: 'Tiểu học', desc: 'Lớp 1 đến Lớp 5 — Toán, Tiếng Việt, Tự nhiên và Xã hội, Tiếng Anh và các môn hoạt động.' },
  { name: 'Trung học cơ sở', desc: 'Lớp 6 đến Lớp 9 — Toán, Ngữ văn, Khoa học tự nhiên, Lịch sử và Địa lí, Tiếng Anh…' },
  { name: 'Trung học phổ thông', desc: 'Lớp 10 đến Lớp 12 — chuẩn bị cho kỳ thi tốt nghiệp và xét tuyển đại học.' },
];

export default function OnTapHub() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-4">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Thư viện ôn tập', path: '/on-tap' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Thư viện ôn tập Tizia',
            url: absoluteUrl('/on-tap'),
            inLanguage: 'vi-VN',
            about: 'Câu hỏi ôn tập theo Chương trình giáo dục phổ thông 2018',
          },
        ]}
      />

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">📚 Thư viện ôn tập Tizia</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Toàn bộ câu hỏi ôn tập của Tizia, sắp theo khối lớp và môn học, bám Chương trình giáo dục
          phổ thông 2018. Mỗi bài có câu hỏi trắc nghiệm kèm lời giải thích ngắn gọn — đọc được ngay,
          không cần tài khoản.
        </p>
      </header>

      {LEVELS.map((lv) => {
        const grades = GRADES.filter((g) => g.level.includes(lv.name) || g.levelShort === lv.name);
        if (!grades.length) return null;
        return (
          <section key={lv.name} className="space-y-3">
            <h2 className="text-lg font-medium">{lv.name}</h2>
            <p className="text-sm text-muted-foreground">{lv.desc}</p>
            <div className="flex flex-wrap gap-2">
              {grades.map((g) => (
                <Link
                  key={g.slug}
                  href={`/on-tap/${g.slug}`}
                  className="rounded-lg border border-foreground/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/5"
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-lg border border-foreground/10 p-5 text-sm text-muted-foreground">
        <h2 className="mb-2 text-base font-medium text-foreground">Học tiếp thế nào?</h2>
        <p>
          Sau khi ôn bằng thư viện này, bạn có thể vào{' '}
          <Link href="/school" className="font-medium text-primary hover:underline">trường ảo</Link>{' '}
          để học theo lộ trình, hoặc làm{' '}
          <Link href="/luyen-de" className="font-medium text-primary hover:underline">đề thi thử có bấm giờ</Link>{' '}
          để tự đánh giá.
        </p>
      </section>
    </div>
  );
}
