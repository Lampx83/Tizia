// Process-wide handle on the AI board services (services.js). index.js sets it once at startup, before any context mounts;
// contexts that cannot take it as an argument (admin, ai-agent) read it lazily inside their handlers.
import { createSqliteServices } from './services.js';

let current = null;
const fallbacks = new WeakMap();

export const setAiBoardServices = (services) => { current = services; };

/** The running services, or (tests / scripts that mount a context alone) the sync SQLite stack on `sqlite`, built once. */
export function aiBoardServices(sqlite) {
  if (current) return current;
  if (!fallbacks.has(sqlite)) fallbacks.set(sqlite, createSqliteServices(sqlite.raw ?? sqlite));
  return fallbacks.get(sqlite);
}
