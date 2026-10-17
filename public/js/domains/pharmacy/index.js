// ============================================================
// Pharmacy domain — Barrel export
// ============================================================
// Một file để import gọn:
//   import { MODULES, SUBJECTS, ACHIEVEMENTS, DOMAIN } from './js/domains/pharmacy/index.js';
// ============================================================

export { MODULES } from './modules.js';
export { SUBJECTS, getSubject } from './subjects.js';
export { ACHIEVEMENTS } from './achievements.js';
export { getExperiencesFor, listModulesWithExperiences } from './experiences.js';

/** @type {import('../../engine/types.js').DomainConfig} */
export const DOMAIN = {
  id: 'pharmacy',
  name: 'Trường Dược',
  shortName: 'Dược',
  icon: '💊',
  yearsTotal: 5,
  yearLabels: [
    'Năm 1: HỌC (Tutorial)',
    'Năm 2: TẬP (Guided Practice)',
    'Năm 3: ÁP DỤNG (Independent)',
    'Năm 4: TÍCH HỢP (Case-based)',
    'Năm 5: THỰC HÀNH (OSCE / Portfolio)',
  ],
  tagline: 'Từ nhóm chức Hoá hữu cơ đến OSCE 10 trạm, qua 102 module, 85+ scenarios, hỗ trợ 2D · 3D · VR · XR · Metaverse',
};
