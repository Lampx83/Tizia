// Web and AI board share one process (legacy) or split into two stacks (docs/local/aiboard-stacks.md).
// In the split the board schema belongs to aiboard-server's PostgreSQL, so web code must never read board tables.
const filled = (value) => String(value ?? '').trim() !== '';

/** Both env values the web->board proxy needs; set only when the board runs as a separate service. */
export function boardIsSplit(env = process.env) {
  return filled(env.AI_BOARD_SERVER_URL) && filled(env.AI_BOARD_INTERNAL_SECRET);
}

export const BOARD_SPLIT = boardIsSplit();
