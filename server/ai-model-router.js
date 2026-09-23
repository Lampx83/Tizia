import { AsyncLocalStorage } from 'node:async_hooks';

const modelContext = new AsyncLocalStorage();

function routeVariable(endpoint) {
  const route = String(endpoint || 'default').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '').toUpperCase();
  return `TIZIA_MODEL_${route || 'DEFAULT'}`;
}

export function resolveAIModel(endpoint, env = process.env) {
  return String(
    env[routeVariable(endpoint)]
      || env.TIZIA_MODEL_DEFAULT
      || env.OLLAMA_MODEL
      || env.GATE1_MODEL
      || '',
  ).trim();
}

export function currentAIModel(fallback = '') {
  return modelContext.getStore() || fallback;
}

export function runWithAIModel(model, callback) {
  return modelContext.run(String(model || ''), callback);
}
