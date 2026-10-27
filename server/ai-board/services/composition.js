// The AI board stack on the app's PostgreSQL: async store + async helper modules + the requests port, all on the app db
// handle (db.js). Consumers (routes, contexts, index.js) only see { store, aux, requests, releases, db } and always `await`.
import { createAsyncAiBoardStore } from '../repositories/store.js';
import * as asyncAux from './aux-service.js';
import * as asyncReleases from './releases.js';
import { createRequestsPort } from '../repositories/requests.js';

/** appDb (web) or d (board-only handle); migrations already ran before this call. */
export function createAiBoardServices({ appDb, d = null, hooks = {} } = {}) {
  const handle = appDb ?? (d && d.dialect === 'postgres' ? { dialect: d.dialect, d } : null);
  if (handle?.dialect !== 'postgres') throw new Error('createAiBoardServices: a PostgreSQL handle is required');
  return {
    backend: 'postgres',
    store: createAsyncAiBoardStore(handle.d, hooks),
    aux: asyncAux,
    releases: asyncReleases,
    requests: createRequestsPort(handle.d),
    db: handle.d,
    close: async () => {},
  };
}
