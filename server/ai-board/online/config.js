import { readFileSync } from 'node:fs';
import { createHttpAdapter } from './adapter.js';
import { createRunnerClient } from './runner-client.js';
import { environment } from '../settings.js';

/** Host-held integration config. AI_BOARD_ONLINE_ADAPTERS = JSON {name:{url, credential_var?, header?}}. Absent = no adapters. */
export function adaptersFromEnv(vars = environment()) {
  const spec = vars.AI_BOARD_ONLINE_ADAPTERS ? JSON.parse(vars.AI_BOARD_ONLINE_ADAPTERS) : {};
  return Object.fromEntries(Object.entries(spec).map(([name, c]) => [name,
    createHttpAdapter({ url: c.url, credential: c.credential_var ? vars[c.credential_var] : undefined, header: c.header })]));
}

/** Generated `sh` backends (zero-egress microVM) are OFF unless AI_BOARD_ONLINE_BACKEND_SCRIPTS=true. Default path = declarative UI -> approved operation -> broker, no VM. */
export const backendScriptsEnabled = (vars = environment()) => vars.AI_BOARD_ONLINE_BACKEND_SCRIPTS === 'true';

/** Runner for the zero-egress online profile. Absent config = backend route answers 503. */
export function runnerFromEnv(vars = environment()) {
  if (!vars.ONLINE_RUNNER_URL || !vars.ONLINE_RUNNER_TOKEN_FILE) return null;
  return createRunnerClient({ url: vars.ONLINE_RUNNER_URL, token: readFileSync(vars.ONLINE_RUNNER_TOKEN_FILE, 'utf8').trim() });
}
