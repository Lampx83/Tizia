// ============================================================
// Helper soạn quiz tuần cho Lớp 1, tránh lặp boilerplate.
// ============================================================

export const Q = (stem, choices, answer, explanation, choiceFeedback) =>
  ({ stem, choices, answer, explanation, choiceFeedback });

/**
 * Tạo 1 scenario tuần cho Lớp 1.
 * - modulePrefix: "P1", "P1TV", "P1TA", …
 * - subjectKey:   "toan", "tieng-viet", …
 * - n:            1–35 (lớp 1 có 35 tuần; HK1 18 / HK2 17, T22 nghỉ Tết)
 */
export const W = (modulePrefix, subjectKey, n, title, questions, opts = {}) => {
  const week = String(n).padStart(2, '0');
  return {
    id:           `${modulePrefix}-w${week}-quiz`,
    title:        `Tuần ${n}: ${title}`,
    kind:         opts.kind ?? 'quiz',
    yearLevel:    1,
    subject:      subjectKey,
    difficulty:   opts.difficulty ?? (n <= 18 ? 1 : 1),
    description:  opts.description ?? title,
    questions,
    semester:     n <= 18 ? 1 : 2,
    week:         n,
  };
};

export const indexBy = (arr) => Object.fromEntries(arr.map(s => [s.id, s]));
