/* NHÓM APP theo trường học — dùng cho trang Ứng dụng.
 *
 * App builtin mang sẵn `domain` (trường nào dùng); app cài qua zip thì không có →
 * dồn vào nhóm "Cộng đồng". Thứ tự nhóm đi theo bậc học, để người học lướt từ nhỏ
 * đến lớn rồi mới tới nhóm dùng chung.
 */

export const DOMAIN_ORDER = [
  'preschool',
  'primary',
  'secondary',
  'highschool',
  'it',
  'pharmacy',
  'language',
  'driving',
  'general',
  'community',
] as const;

export const DOMAIN_LABEL: Record<string, string> = {
  preschool: '🍼 Mầm non',
  primary: '🎒 Tiểu học',
  secondary: '📚 Trung học cơ sở',
  highschool: '🎓 Trung học phổ thông',
  it: '💻 Công nghệ thông tin',
  pharmacy: '💊 Dược',
  language: '🌍 Ngoại ngữ',
  driving: '🚗 Lái xe',
  general: '🛠️ Dùng chung',
  community: '🧩 Cộng đồng đóng góp',
};

export type GroupableApp = { domain?: string | null; name: string };

/** Gom app theo domain, giữ đúng thứ tự DOMAIN_ORDER; nhóm rỗng bị bỏ. */
export function groupByDomain<T extends GroupableApp>(
  apps: T[],
): { key: string; label: string; apps: T[] }[] {
  const buckets = new Map<string, T[]>();
  for (const app of apps) {
    const key = app.domain && DOMAIN_LABEL[app.domain] ? app.domain : 'community';
    const list = buckets.get(key);
    if (list) list.push(app);
    else buckets.set(key, [app]);
  }
  return DOMAIN_ORDER.filter((k) => buckets.get(k)?.length).map((k) => ({
    key: k,
    label: DOMAIN_LABEL[k],
    apps: buckets.get(k)!.sort((a, b) => a.name.localeCompare(b.name, 'vi')),
  }));
}
