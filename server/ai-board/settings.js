// One place that reads the AI board server env (the Node analogue of ai-board/harness/settings.py). Modules take
// `env` as an argument for tests and default it to environment(); nothing else reads process.env.
const ON = /^(1|true|on|yes)$/i;

const truthy = (raw) => ON.test(String(raw ?? ''));
const text = (env, key, fallback = '') => String(env[key] ?? '').trim() || fallback;

/** The process environment: the single read of process.env in the server. */
export function environment() {
  return process.env;
}

export function getSettings(env = environment()) {
  return {
    multimodal: truthy(env.AI_BOARD_MULTIMODAL),
    classifierModel: text(env, 'AI_BOARD_CLASSIFIER_MODEL'),
    ollamaUrl: text(env, 'OLLAMA_URL'),
    vllmUrl: text(env, 'VLLM_URL'),
    modelRouting: truthy(env.AI_BOARD_MODEL_ROUTING),
    tokenizerFile: text(env, 'AI_BOARD_QWEN_TOKENIZER'),
    workerKey: text(env, 'AI_BOARD_WORKER_KEY'),
    shots: {
      createBucket: text(env, 'AI_BOARD_SHOTS_S3_CREATE_BUCKET') === '1',
      retentionDays: Number(env.AI_BOARD_SHOT_RETENTION_DAYS),
    },
  };
}

/** A classifier is only configured when a model URL and a model name are both set. */
export const classifierConfigured = (env = environment()) => {
  const s = getSettings(env);
  return Boolean((s.ollamaUrl || s.vllmUrl) && s.classifierModel);
};
