import test from 'node:test';
import assert from 'node:assert/strict';

import { staleGuestRefs, staleManifests } from '../scripts/gc-guest-images.mjs';

const A = `sha256:${'a'.repeat(64)}`;
const B = `sha256:${'b'.repeat(64)}`;
const C = `sha256:${'c'.repeat(64)}`;

const LS = `REFERENCE                                                       DIGEST                 SIZE       CREATED
image-registry:5000/gate5@${A}    sha256:abd5f198a41d    3.2 GiB    2026-10-02 12:03:50
image-registry:5000/gate5@${B}    sha256:579e48fb6ea3    3.2 GiB    2026-10-01 17:15:33
alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc    sha256:c64c687cbea9    3.5 MiB    2026-10-01 16:25:12
`;

test('runner cache: every cached gate5 guest except the pinned one is stale; other images are left alone', () => {
  assert.deepEqual(staleGuestRefs(LS, A), [`image-registry:5000/gate5@${B}`]);
  assert.deepEqual(staleGuestRefs(LS, B), [`image-registry:5000/gate5@${A}`]);
  assert.deepEqual(staleGuestRefs('REFERENCE DIGEST SIZE CREATED\n', A), []);
});

test('registry: only manifests other than the pinned digest are stale', () => {
  assert.deepEqual(staleManifests([A.slice(7), B.slice(7), C.slice(7)], A), [B, C]);
  assert.deepEqual(staleManifests([A.slice(7)], A), []);
});

test('refuses to treat anything as stale without a well-formed pinned digest', () => {
  assert.throws(() => staleGuestRefs(LS, 'latest'), /pinned digest/);
  assert.throws(() => staleManifests([B.slice(7)], ''), /pinned digest/);
});
