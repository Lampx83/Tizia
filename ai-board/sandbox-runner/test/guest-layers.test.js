import test from 'node:test';
import assert from 'node:assert/strict';

import { changeFlags, layerCount, needsFlatten, pinTag } from '../scripts/guest-layers.mjs';

const INSPECT = [{
  RootFS: { Type: 'layers', Layers: Array.from({ length: 427 }, (_, i) => `sha256:${i}`) },
  Config: {
    Env: ['PATH=/usr/local/bin:/usr/bin', 'LANG=C.UTF-8'],
    Cmd: ['python3'],
    Entrypoint: null,
    WorkingDir: '/opt/ai-board',
    User: '',
  },
}];

test('layer count read from the first inspect entry', () => {
  assert.equal(layerCount(INSPECT), 427);
  assert.throws(() => layerCount([{}]), /RootFS.Layers/);
});

test('flatten only above the threshold', () => {
  assert.equal(needsFlatten(427, 100), true);
  assert.equal(needsFlatten(100, 100), false);
  assert.equal(needsFlatten(1, 100), false);
});

test('change flags rebuild ENV, CMD, WORKDIR and skip empty fields', () => {
  assert.deepEqual(changeFlags(INSPECT), [
    'ENV PATH=/usr/local/bin:/usr/bin',
    'ENV LANG=C.UTF-8',
    'CMD ["python3"]',
    'WORKDIR /opt/ai-board',
  ]);
});

test('entrypoint and user are kept when set', () => {
  const flags = changeFlags([{ RootFS: { Layers: [] }, Config: {
    Entrypoint: ['/usr/bin/tini', '--'], Cmd: null, WorkingDir: '', User: '1000:1000',
  } }]);
  assert.deepEqual(flags, ['ENTRYPOINT ["/usr/bin/tini","--"]', 'USER 1000:1000']);
});

test('pin tag is pin- plus 12 hex chars of the digest', () => {
  const hex = 'abcdef0123456789'.padEnd(64, '0');
  assert.equal(pinTag(`sha256:${hex}`), 'pin-abcdef012345');
  assert.throws(() => pinTag('gate5:overlay'), /not a sha256 digest/);
});
