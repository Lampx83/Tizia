/** Loại tác vụ của skill và bước plan: một nguồn cho server, policy và admin upload. */
export const SKILL_TASK_TYPES = Object.freeze(['backend', 'frontend', 'database', 'review', 'test', 'merge', 'all']);

export const isSkillTaskType = (value) => SKILL_TASK_TYPES.includes(value);
