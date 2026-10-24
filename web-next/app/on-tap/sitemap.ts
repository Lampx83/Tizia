import type { MetadataRoute } from 'next';
import { SITE_URL, xmlSafeUrl } from '@/lib/seo';
import { GRADES, getLessonIndex } from '@/lib/curriculum';

// Sitemap riêng cho thư viện ôn tập — vài nghìn URL bài học, tách khỏi
// /sitemap.xml để file chính vẫn nhẹ và hai file cập nhật theo nhịp khác nhau.
// Next phục vụ file này tại /on-tap/sitemap.xml (đã khai báo trong app/robots.ts).
//
// force-dynamic: sinh lúc CÓ YÊU CẦU, không bake lúc build — lúc build (trong
// Docker) chưa gọi được Express nên sẽ ra file rỗng. Bot lấy sitemap rất thưa
// nên chi phí không đáng kể.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [
    { url: xmlSafeUrl(`${SITE_URL}/on-tap`), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  for (const g of GRADES) {
    out.push({
      url: xmlSafeUrl(`${SITE_URL}/on-tap/${g.slug}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    const items = await getLessonIndex(g);
    const subjects = new Set(items.map((it) => it.subject));
    for (const s of subjects) {
      out.push({
        url: xmlSafeUrl(`${SITE_URL}/on-tap/${g.slug}/${s}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
    for (const it of items) {
      out.push({
        url: xmlSafeUrl(`${SITE_URL}/on-tap/${g.slug}/${it.subject}/${it.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return out;
}
