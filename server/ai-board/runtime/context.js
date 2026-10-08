// Process-wide handle on the AI board services (services.js). index.js sets it once at startup, before any context mounts;
// contexts that cannot take it as an argument (admin, ai-agent) read it lazily inside their handlers.
import { createAiBoardServices } from '../services/composition.js';

let current = null;
const fallbacks = new WeakMap();

export const setAiBoardServices = (services) => { current = services; };

/** The running services, or (tests / scripts that mount a context alone) the stack on `appDb`, built once. */
export function aiBoardServices(appDb) {
  if (current) return current;
  if (!fallbacks.has(appDb)) fallbacks.set(appDb, createAiBoardServices({ appDb }));
  return fallbacks.get(appDb);
}
