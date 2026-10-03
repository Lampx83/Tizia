// One place that decides which AI board stack runs, from AI_BOARD_DB (default sqlite).
//   sqlite   : sync store + sync helper modules on the app's better-sqlite3 handle (the long-standing stack).
//   postgres : async store + async twins on a PostgreSQL pool; `requests`, `request_messages` and a `users` projection
//              live there too (see decision note in db/index.js). Nothing else in the app talks to that pool.
// Consumers (routes, contexts, index.js) only see { store, aux, requests, releases, db, ... } and always `await`.
import { createAiBoardStore } from './store.js';
import { createAsyncAiBoardStore } from './store-async.js';
import * as syncAux from './aux-sync.js';
import * as asyncAux from './aux-async.js';
import * as syncReleases from './releases.js';
import * as asyncReleases from './releases-async.js';
import { createRequestsPort } from './requests-port.js';
import { aiBoardBackend, applyMigrations, applyPgBaseSchema, createSqliteDb, openAiBoardDb } from './db/index.js';

/** Default stack, synchronous to build (also the fallback for contexts mounted without index.js, e.g. tests). */
export function createSqliteServices(sqlite, hooks = {}) {
  return {
    backend: 'sqlite',
    store: createAiBoardStore(sqlite, hooks),
    aux: syncAux,
    releases: syncReleases,
    requests: createRequestsPort(createSqliteDb(sqlite)),
    db: sqlite, // what aux/releases modules take: the raw better-sqlite3 handle
    projectUser: null,
    close: async () => {},
  };
}

/** Upserts the app user into the board database (users stay authoritative in SQLite; ids are shared). */
function userProjector(pg) {
  const seen = new Map();
  return async function projectUser(user) {
    if (!user?.id) return;
    const row = [Number(user.id), String(user.username || `user-${user.id}`), String(user.display_name || user.username || `user-${user.id}`),
      String(user.role || 'student'), user.enrolled_domain ?? null];
    const key = JSON.stringify(row);
    if (seen.get(row[0]) === key) return;
    await pg.run(`
      INSERT INTO users(id, username, display_name, role, enrolled_domain, created_at) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET username=excluded.username, display_name=excluded.display_name, role=excluded.role,
        enrolled_domain=excluded.enrolled_domain
    `, [...row, Date.now()]);
    seen.set(row[0], key);
  };
}

/** Express middleware: keeps the projection fresh for the signed-in user before any board route runs. */
export const projectUserMiddleware = (projectUser) => (req, _res, next) => {
  Promise.resolve(req.user ? projectUser(req.user) : null).then(() => next(), next);
};

export async function createAiBoardServices({ env = process.env, sqlite, hooks = {} } = {}) {
  if (aiBoardBackend(env) === 'sqlite') return createSqliteServices(sqlite, hooks);
  const pg = openAiBoardDb({ env });
  await applyPgBaseSchema(pg);
  await applyMigrations(pg);
  return {
    backend: 'postgres',
    store: createAsyncAiBoardStore(pg, hooks),
    aux: asyncAux,
    releases: asyncReleases,
    requests: createRequestsPort(pg),
    db: pg,
    projectUser: userProjector(pg),
    close: () => pg.close(),
  };
}
