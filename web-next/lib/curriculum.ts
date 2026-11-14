// ─────────────────────────────────────────────────────────────────────────
// Thư viện ôn tập công khai (/on-tap) — biến nội dung học trong DB thành
// TRANG RIÊNG cho từng bài, để Google đọc được.
//
// Vì sao cần: ~5.000 bài (khối × môn × tuần) đang sống trong bảng
// curriculum_content và chỉ hiện ra khi người học bấm vào trong ứng dụng. Với
// công cụ tìm kiếm thì chúng vô hình — không URL riêng, không chữ trong HTML.
// Bốn trang dưới đây (hub → khối → môn → bài) mở đúng kho nội dung đó ra.
//
// ⚠️ KHÔNG chép nội dung vào code: mọi thứ fetch từ API (xem
// [[feedback_content_in_db_not_code]]). File này chỉ giữ nhãn hiển thị và
// ánh xạ đường dẫn.
// ─────────────────────────────────────────────────────────────────────────

const BACKEND_URL =
  process.env.BACKEND_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:8042' : 'http://localhost:8041');

export type GradeInfo = {
  slug: string;      // đoạn URL: 'lop-6'
  domain: string;    // cấp học trong DB: 'secondary'
  grade: number;     // khối trong DB
  label: string;     // 'Lớp 6'
  level: string;     // 'Trung học cơ sở'
  levelShort: string;
};

export const GRADES: GradeInfo[] = [
  { slug: 'mam-non', domain: 'preschool', grade: 0, label: 'Mầm non', level: 'Giáo dục mầm non', levelShort: 'Mầm non' },
  ...[1, 2, 3, 4, 5].map((g) => ({
    slug: `lop-${g}`, domain: 'primary', grade: g,
    label: `Lớp ${g}`, level: 'Tiểu học', levelShort: 'Tiểu học',
  })),
  ...[6, 7, 8, 9].map((g) => ({
    slug: `lop-${g}`, domain: 'secondary', grade: g,
    label: `Lớp ${g}`, level: 'Trung học cơ sở', levelShort: 'THCS',
  })),
  ...[10, 11, 12].map((g) => ({
    slug: `lop-${g}`, domain: 'highschool', grade: g,
    label: `Lớp ${g}`, level: 'Trung học phổ thông', levelShort: 'THPT',
  })),
];

export function findGrade(slug: string): GradeInfo | undefined {
  return GRADES.find((g) => g.slug === slug);
}

// Tên môn hiển thị. Mã môn do dữ liệu quy định (public/js/scenarios/lop*/).
const SUBJECT_LABEL: Record<string, string> = {
  toan: 'Toán',
  'tieng-viet': 'Tiếng Việt',
  'ngu-van': 'Ngữ văn',
  'tieng-anh': 'Tiếng Anh',
  tnxh: 'Tự nhiên và Xã hội',
  'khoa-hoc': 'Khoa học',
  khtn: 'Khoa học tự nhiên',
  'lich-su-dia-ly': 'Lịch sử và Địa lí',
  'lich-su-dia': 'Lịch sử và Địa lí',
  'lich-su': 'Lịch sử',
  'dia-ly': 'Địa lí',
  'vat-ly': 'Vật lí',
  'hoa-hoc': 'Hoá học',
  'sinh-hoc': 'Sinh học',
  'dao-duc': 'Đạo đức',
  gdcd: 'Giáo dục công dân',
  gdktpl: 'Giáo dục kinh tế và pháp luật',
  gdqp: 'Giáo dục quốc phòng và an ninh',
  gdtc: 'Giáo dục thể chất',
  'cong-nghe': 'Công nghệ',
  'tin-hoc': 'Tin học',
  'am-nhac': 'Âm nhạc',
  'my-thuat': 'Mĩ thuật',
  'nghe-thuat': 'Nghệ thuật',
  hdtn: 'Hoạt động trải nghiệm',
  'gd-dia-phuong': 'Giáo dục địa phương',
  'lam-quen-toan': 'Làm quen với Toán',
};

export function subjectLabel(code: string): string {
  return SUBJECT_LABEL[code] || code.replace(/-/g, ' ');
}

// Bỏ dấu tiếng Việt → chuỗi URL sạch. Dùng để dựng đường dẫn từ tiêu đề bài.
export function slugify(input: string): string {
  return String(input)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export type LessonIndexItem = {
  id: string;
  subject: string;
  title: string;
  chapter: string | null;
  yearLevel: number | null;
  boss: boolean;
  questionCount: number;
  slug: string;
};

export type Question = {
  stem: string;
  choices: string[];
  answer: number;
  explanation?: string;
};

export type Scenario = {
  id: string;
  title: string;
  subject?: string;
  chapter?: string;
  lesson?: string;
  boss?: boolean;
  questions?: Question[];
};

// Content công khai và ít đổi → cache 1 giờ ở tầng Next thay vì gọi API mỗi lượt.
const REVALIDATE = 3600;

async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Chỉ mục bài của một khối — chỉ metadata, không kèm câu hỏi. */
export async function getLessonIndex(g: GradeInfo): Promise<LessonIndexItem[]> {
  const data = await apiGet<{ ok: boolean; items: Omit<LessonIndexItem, 'slug'>[] }>(
    `/api/curriculum/index/${g.domain}/${g.grade}`,
  );
  if (!data?.items) return [];
  // Hai bài trùng tiêu đề trong cùng một môn → thêm hậu tố để URL luôn duy nhất.
  const seen = new Map<string, number>();
  return data.items.map((it) => {
    const base = slugify(it.title || it.id) || slugify(it.id);
    const key = `${it.subject}/${base}`;
    const n = (seen.get(key) || 0) + 1;
    seen.set(key, n);
    return { ...it, slug: n === 1 ? base : `${base}-${n}` };
  });
}

/** Nội dung đầy đủ của một bài (kèm câu hỏi + lời giải). */
export async function getScenario(id: string): Promise<Scenario | null> {
  const data = await apiGet<{ ok: boolean; item: Scenario }>(
    `/api/curriculum/${encodeURIComponent(id)}`,
  );
  return data?.item ?? null;
}

/** Gom bài theo chương, giữ thứ tự xuất hiện. */
export function groupByChapter(items: LessonIndexItem[]): Array<[string, LessonIndexItem[]]> {
  const map = new Map<string, LessonIndexItem[]>();
  for (const it of items) {
    const key = it.chapter || 'Nội dung khác';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(it);
  }
  return [...map.entries()];
}
