// ============================================================
// Pharmacy domain — Experience registry
// ============================================================
// Mapping moduleId → ExperienceMode[]. Mỗi entry mô tả một
// "phiên bản trải nghiệm" (2D / 3D / VR / XR / Meta / Native)
// đã có file HTML thật, hoặc đánh dấu Sắp có.
//
// MODULES sẽ tra registry này qua attachExperiences(modules)
// trong domains/pharmacy/modules.js để bơm field `experiences[]`.
//
// Thêm experience mới: chỉ cần push entry. Không cần sửa UI.
// ============================================================

/** @typedef {import('../../engine/types.js').ExperienceMode} ExperienceMode */

/**
 * Catalog HTML pages dùng chung — viết một lần, gắn nhiều module.
 * key = symbolic ID (không phải URL).
 */
const PAGES = {
  // Sắp xếp thuốc theo nhóm ATC
  'shelf-3d':  { mode: '3d',   icon: '🥽', label: '3D Realistic',  tech: 'Three.js · WebGL',           url: '3d-shelf.html',
                 desc: 'Three.js full 3D scene với carton mở được, snap-to-slot, hover halo.',
                 specs: ['ok:Đẹp · Realistic', 'Desktop tốt nhất', 'Touch OK', 'bad:Mobile yếu chậm'] },
  'shelf-vr':  { mode: 'vr',   icon: '🕹️', label: 'VR / XR Web',    tech: 'Three.js · WebXR · Hand tracking', url: '3d-shelf.html#vr',
                 desc: 'Vào kính Meta Quest browser bấm Enter VR để chơi bằng tay (hand tracking native).',
                 specs: ['ok:VR thật trên Quest', 'ok:Hand tracking native', 'Desktop OK', 'Snap-to-slot'] },
  'shelf-2d':  { mode: '2d',   icon: '📱', label: '2D Arcade',      tech: 'Canvas 2D · MediaPipe · Mouse', url: '2d-arcade.html',
                 desc: 'Side-view game. Pinch mở thùng → thuốc bay ra → kéo vào kệ đúng nhóm. Mobile-first.',
                 specs: ['ok:Mobile mượt', 'MediaPipe · Mouse', '🔊 SFX', 'bad:Không VR'] },
  'shelf-quiz': { mode: 'quiz', icon: '🧠', label: 'Quiz MCQ',       tech: 'HTML + JS · Quiz', url: 'quiz.html',
                 desc: '10 câu MCQ phân loại 16 thuốc theo nhóm điều trị. 15s/câu, streak bonus.',
                 specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết', 'ok:Ai cũng chơi'] },
  'shelf-meta':{ mode: 'meta', icon: '🌐', label: 'Metaverse',      tech: 'Three.js + WebSocket · Multiplayer', url: 'metaverse.html',
                 desc: 'Phòng dược 3D realtime multiplayer, avatar real-time, chat, leaderboard.',
                 specs: ['ok:Multiplayer', 'ok:Chat & avatar', 'Desktop · Mobile', 'Realtime sync'] },
  'shelf-time':{ mode: 'native', icon: '⚡', label: 'Time Attack',    tech: 'Canvas 2D · Survival', url: 'time-attack.html',
                 desc: 'Survival: mỗi wave thêm 1 thuốc, sai -5s. Endless leaderboard.',
                 specs: ['ok:Endless', 'Escalating', 'bad:Sai -5s', 'Wave-based'] },

  // Bào chế GMP
  'compound-3d': { mode: '3d', icon: '🥽', label: 'Phòng Lab 3D',   tech: 'Three.js · MediaPipe · 2 tay', url: 'compounding-lab.html',
                 desc: 'Three.js scene cân điện tử + ống đong + cốc thuỷ tinh. Free-form 2 tay phối hợp.',
                 specs: ['ok:Sẵn sàng', 'ok:2 tay MediaPipe', 'Free-form', 'Desktop tốt nhất'] },

  // Sắc ký TLC
  'sacky-3d':  { mode: '3d', icon: '🥽', label: '3D Three.js',     tech: 'Three.js · WebGL', url: 'sac-ky-3d.html',
                 desc: 'Full 3D scene với glass material, shadow, lighting. Camera orbit. Đẹp nhất trên desktop.',
                 specs: ['~150 KB', 'Desktop tốt nhất', 'Touch OK', 'bad:Mobile yếu chậm'] },
  'sacky-vr':  { mode: 'vr', icon: '🕹️', label: 'VR / XR Web',     tech: 'A-Frame · WebXR', url: 'sac-ky-vr-web.html',
                 desc: 'Declarative HTML + WebXR. Quest browser bấm Enter VR. Cũng chạy desktop với gaze pointer.',
                 specs: ['~250 KB', 'ok:VR thật trên Quest', 'Desktop OK', 'Hand tracking native'] },
  'sacky-2d':  { mode: '2d', icon: '📱', label: '2D Canvas',       tech: 'Canvas 2D · Vanilla JS', url: 'sac-ky-2d.html',
                 desc: 'Side-view minimalist: pure Canvas, không cần library. ~5KB, mượt trên mọi máy.',
                 specs: ['ok:~5 KB', 'Click chuột', 'Mobile OK', 'bad:Không VR'] },
  'sacky-quiz':{ mode: 'quiz', icon: '🧠', label: 'Quiz MCQ',      tech: 'HTML + JS · Quiz', url: 'sac-ky-quiz.html',
                 desc: '10 câu về quy trình, công thức Rf, ứng dụng dược, an toàn. 15s/câu.',
                 specs: ['ok:~3 KB', 'Mobile-first', 'Lý thuyết', 'ok:Ai cũng chơi'] },
  'sacky-meta':{ mode: 'meta', icon: '🌐', label: 'Metaverse',     tech: 'Three.js + WebSocket · Multiplayer', url: 'sac-ky-meta.html',
                 desc: 'Phòng lab 3D realtime multiplayer, avatar, chat, mỗi SV có bàn lab riêng.',
                 specs: ['ok:Multiplayer', '~200 KB', 'ok:Chat & avatar', 'Desktop · Mobile'] },
  'sacky-unity': { mode: 'native', icon: '📦', label: 'Unity native', tech: 'Unity · Meta XR SDK · Quest APK', url: 'https://github.com/minhquang2k4/VR-Sac-Ky',
                 status: 'external',
                 desc: 'App native Quest: đồ hoạ tốt nhất, hand-tracking chuẩn Meta XR SDK, PhysX. Cần build Unity.',
                 specs: ['~50 MB APK', 'ok:VR cao nhất', 'bad:Chỉ Meta Quest', 'Cần Unity build'] },

  // Standalone 3D module pages
  'titration-3d':  { mode: '3d', icon: '🥽', label: '3D Chuẩn độ',  tech: 'Three.js · pH curve', url: 'L2-1-titration.html',
                 desc: 'Buret + Erlenmeyer + máy khuấy từ · pH curve real-time · phenolphthalein endpoint.',
                 specs: ['ok:Chemistry chuẩn', 'pH curve real-time', 'Desktop tốt nhất'] },
  'tuong-tac':     { mode: 'quiz', icon: '🧠', label: 'Engine v2',  tech: 'Quiz + Drag-match', url: 'L3-3-tuong-tac.html',
                 desc: '5 câu MCQ + drag-match warfarin × macrolide, statin × CYP3A4, clopidogrel × PPI.',
                 specs: ['Dược lý', 'CYP450', 'Drag + Quiz'] },
  'er-3d':         { mode: '3d', icon: '🚨', label: '3D ER',        tech: 'Three.js · Vital signs', url: 'PS01-er.html',
                 desc: 'Mô phỏng ER 3D · BN sốc phản vệ · ADRENALIN 0.5mg IM · monitor sinh hiệu động.',
                 specs: ['ok:🆕', 'BYT 51/2017', 'Năm 5', 'Critical care'] },
  'gmp-factory':   { mode: '3d', icon: '🏭', label: '3D Tour',      tech: 'Three.js · Walk-through', url: 'PS15-gmp-factory.html',
                 desc: 'Tour 3D 4 phòng ISO 5/7/8/9 · V-mixer, tablet press, coating pan, isolator · 12 challenges.',
                 specs: ['ok:🆕', 'EU GMP Annex 1', 'ICH Q7', 'Industrial'] },
  'osce-champion': { mode: '3d', icon: '🏆', label: 'OSCE 10 trạm', tech: 'Three.js · Capstone exam', url: 'GC07-osce-championship.html',
                 desc: '10 station × 5-10 phút · timer + scoring + chứng chỉ in được · pass ≥ 60đ.',
                 specs: ['ok:🆕 🏆', 'Capstone', 'Cert', 'Năm 5'] },
  'metaverse':     { mode: 'meta', icon: '🌐', label: 'Phòng học chung', tech: 'Three.js · WebXR · WebSocket', url: 'metaverse.html',
                 desc: 'WebXR multiplayer · học cùng nhau qua avatar · WebSocket sync · Quest + Vision Pro.',
                 specs: ['ok:Multiplayer', 'XR', 'Real-time', 'Quest · Vision Pro'] },
};

/**
 * Map moduleId → array of PAGE keys.
 * Một module có thể chia sẻ HTML page với module khác (vd. shelf-* dùng cho L3.1).
 */
const MODULE_PAGES = {
  // Năm 1
  // (chưa có HTML page riêng)

  // Năm 2
  'L2.1':  ['titration-3d'],
  'L2.6':  ['sacky-3d', 'sacky-vr', 'sacky-2d', 'sacky-quiz', 'sacky-meta', 'sacky-unity'],

  // Năm 3
  'L3.1':  ['shelf-3d', 'shelf-vr', 'shelf-2d', 'shelf-quiz', 'shelf-meta', 'shelf-time'],
  'L3.3':  ['tuong-tac'],
  'L3.6':  ['compound-3d'],

  // Năm 5
  'L5.7':  ['osce-champion'],

  // Practice sites
  'PS01':  ['er-3d'],
  'PS15':  ['gmp-factory'],

  // Skill / Game
  'GC07':  ['osce-champion'],
  'GC08':  ['metaverse'],
};

/**
 * Lấy danh sách ExperienceMode cho 1 module.
 * @param {string} moduleId
 * @returns {ExperienceMode[]}
 */
export function getExperiencesFor(moduleId) {
  const keys = MODULE_PAGES[moduleId];
  if (!keys) return [];
  return keys.map(k => ({ ...PAGES[k] })).filter(Boolean);
}

/** Tất cả module ID có experience đã đăng ký */
export function listModulesWithExperiences() {
  return Object.keys(MODULE_PAGES);
}
