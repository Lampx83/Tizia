// ============================================================
// IT domain — Barrel
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

/** @type {import('../../engine/types.js').DomainConfig} */
export const DOMAIN = {
  id: 'it',
  name: 'Trường Công nghệ thông tin',
  shortName: 'CNTT',
  icon: '💻',
  yearsTotal: 4,
  yearLabels: [
    'Năm 1: Đại cương',
    'Năm 2: Cơ sở ngành',
    'Năm 3: Chuyên ngành',
    'Năm 4: Tích hợp + Khoá luận',
  ],
  tagline: 'Cử nhân CNTT · từ Python đến Machine Learning · CTF · Hackathon · Cloud',
};
