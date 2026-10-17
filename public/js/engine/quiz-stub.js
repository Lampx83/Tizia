// ============================================================
// Quiz stub — fallback cho module chưa có quiz thật
// ============================================================
// Mục tiêu: mọi module trong path luôn có 1 quiz để click vào.
// Khi không tìm thấy scenario thật, sinh stub 1 câu placeholder.
//
// Stubs được track trong `window.__missingQuizzes` để dev biết
// cần viết tiếp.
// ============================================================

const missing = new Set();

if (typeof window !== 'undefined') {
  window.__missingQuizzes = missing;
}

/**
 * Tạo scenario quiz stub cho 1 module.
 * @param {import('./types.js').CourseModule} mod
 * @returns {object} quiz scenario
 */
export function makeQuizStub(mod) {
  missing.add(mod.id);
  return {
    id: `quiz-stub-${mod.id}`,
    title: `${mod.id} · ${mod.title}: Quiz (đang phát triển)`,
    kind: 'quiz',
    yearLevel: mod.yearLevel,
    subject: mod.subject,
    difficulty: mod.difficulty ?? 1,
    skillsTrained: mod.tags ?? [],
    description: mod.description ?? 'Quiz cho module này đang được hoàn thiện. Tạm thời 1 câu giới thiệu.',
    questions: [
      {
        stem: `Module này là về: ${mod.title}. Bạn đã sẵn sàng học?`,
        choices: [
          'Sẵn sàng: chờ nội dung quiz đầy đủ',
          'Tôi muốn xem các phiên bản trải nghiệm trước (2D/3D/VR…)',
          'Cần đọc tài liệu trước',
          'Quay lại lộ trình',
        ],
        answer: 0,
        explanation: `Quiz đầy đủ cho ${mod.id} đang được biên soạn. Trong lúc chờ, bạn có thể trải nghiệm các phiên bản 2D/3D/VR nếu module có.`,
      },
    ],
    isStub: true,
  };
}

/**
 * Resolve quiz scenario của 1 module:
 *  - Ưu tiên `mod.knowledgeQuiz` (scenario ID đã khai báo)
 *  - Fallback: scenario đầu tiên trong scenarioIds[] có kind='quiz'
 *  - Cuối cùng: makeQuizStub(mod)
 *
 * @param {import('./types.js').CourseModule} mod
 * @param {Record<string, any>} allScenarios  - ALL_SCENARIOS map
 */
export function resolveModuleQuiz(mod, allScenarios) {
  // 1. Explicit knowledgeQuiz
  if (mod.knowledgeQuiz && allScenarios[mod.knowledgeQuiz]) {
    return allScenarios[mod.knowledgeQuiz];
  }
  // 2. First quiz-kind scenario in scenarioIds
  for (const sid of (mod.scenarioIds || [])) {
    const s = allScenarios[sid];
    if (s?.kind === 'quiz') return s;
  }
  // 3. Stub
  return makeQuizStub(mod);
}

/** Danh sách module chưa có quiz thật (sau khi đã resolve qua hệ thống). */
export function getMissingQuizzes() {
  return [...missing];
}
