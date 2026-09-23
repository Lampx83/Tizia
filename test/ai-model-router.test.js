import test from 'node:test';
import assert from 'node:assert/strict';
import { currentAIModel, resolveAIModel, runWithAIModel } from '../server/ai-model-router.js';

test('route-specific model overrides defaults and preserves legacy fallbacks', () => {
  const env = {
    TIZIA_MODEL_TUTOR_CHAT: 'tutor-model',
    TIZIA_MODEL_DEFAULT: 'default-model',
    OLLAMA_MODEL: 'legacy-model',
    GATE1_MODEL: 'gate1-model',
  };

  assert.equal(resolveAIModel('tutor-chat', env), 'tutor-model');
  assert.equal(resolveAIModel('history-chat', env), 'default-model');
  assert.equal(resolveAIModel('history-chat', { OLLAMA_MODEL: 'legacy-model', GATE1_MODEL: 'gate1-model' }), 'legacy-model');
  assert.equal(resolveAIModel('history-chat', { GATE1_MODEL: 'gate1-model' }), 'gate1-model');
  assert.equal(resolveAIModel('history-chat', {}), '');
});

test('keeps concurrent request model selections isolated', async () => {
  const request = (model, delay) => runWithAIModel(model, async () => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return currentAIModel();
  });

  assert.deepEqual(await Promise.all([request('model-a', 10), request('model-b', 1)]), ['model-a', 'model-b']);
  assert.equal(currentAIModel(), '');
});
