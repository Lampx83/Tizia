// The AI board stack on the app's PostgreSQL: async store + async helper modules + the requests port, all on the app db
// handle (db.js). Consumers (routes, contexts, index.js) only see { store, aux, requests, releases, db } and always `await`.
import { createAsyncAiBoardStore } from '../repositories/store.js';
import * as asyncAux from './aux-service.js';
import * as asyncReleases from './releases.js';
import { createRequestsPort } from '../repositories/requests.js';

/** appDb: createAppDb handle (PostgreSQL); migrations already ran in db.js. */
export function createAiBoardServices({ appDb, hooks = {} } = {}) {
  if (appDb?.dialect !== 'postgres') throw new Error('createAiBoardServices: the app PostgreSQL handle (appDb) is required');
  return {
    backend: 'postgres',
    store: createAsyncAiBoardStore(appDb.d, hooks),
    aux: asyncAux,
    releases: asyncReleases,
    requests: createRequestsPort(appDb.d),
    db: appDb.d,
    close: async () => {},
  };
}
