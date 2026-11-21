import test from 'node:test';
import assert from 'node:assert/strict';
import { CONTRACT } from '../server/ai-board/repositories/store-contract.js';
import { ALLOWED_DOMAINS, ALLOWED_KEYS } from '../server/contexts/campus/layout-schema.js';

const schema = () => {
  const kind = Object.values(CONTRACT.data_kinds.kinds).find((k) => k.schema?.properties?.kind?.const === 'campus_layout');
  return kind.schema.properties;
};

test('contract campus_layout domain enum equals layout-schema domains', () => {
  assert.deepEqual([...schema().domain.enum].sort(), [...ALLOWED_DOMAINS].sort());
});

test('contract campus_layout keys equal layout-schema keys', () => {
  assert.deepEqual(Object.keys(schema().layout.properties).sort(), [...ALLOWED_KEYS].sort());
});
