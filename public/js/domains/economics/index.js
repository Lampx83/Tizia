// ============================================================
// Economics domain — Barrel
// ============================================================

import { MODULES as RAW_MODULES } from './modules.js';
import { getExperiencesFor } from './experiences.js';

function augment(m) {
  const exp = getExperiencesFor(m.id);
  return exp.length ? { ...m, experiences: exp } : m;
}

/** @type {import('../../engine/types.js').CourseModule[]} */
export const MODULES = RAW_MODULES.map(augment);

export { SUBJECTS, getSubject } from './subjects.js';
export { ACHIEVEMENTS } from './achievements.js';
export { getExperiencesFor, listModulesWithExperiences } from './experiences.js';

/**
 * Trạng thái triển khai của Trường Kinh tế.
 *   'preview' = đã có skeleton (modules/subjects/experiences/achievements)
 *               nhưng CHƯA được wire vào space.html / campus-proto. Giữ lại
 *               để chuẩn bị khi có Trường Kinh tế trong tương lai.
 * Engine + FE nên đọc cờ này (cùng với DOMAIN_META.enabled) để quyết định
 * có hiển thị/cho vào hay không.
 */
export const DOMAIN_STATUS = 'preview';

/** @type {import('../../engine/types.js').DomainConfig} */
export const DOMAIN = {
  id: 'economics',
  name: 'Trường Kinh tế',
  shortName: 'Kinh tế',
  icon: '💼',
  yearsTotal: 4,
  yearLabels: [
    'Năm 1: Đại cương',
    'Năm 2: Cơ sở ngành',
    'Năm 3: Chuyên ngành',
    'Năm 4: Tích hợp + Khoá luận',
  ],
  tagline: 'Cử nhân Kinh tế · từ Kinh tế Vi mô đến Khoá luận · mô phỏng doanh nghiệp · stock sim · pitch battle',
  status: DOMAIN_STATUS,
  enabled: false,
};
