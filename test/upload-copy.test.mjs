import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, cp, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { verifyUploadCopy, uploadManifest } from '../scripts/verify-upload-copy.mjs';

test('frozen uploads preserve nested bytes, paths and empty folders; differences fail', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'tizia-upload-proof-'));
  try {
    const source = path.join(root, 'source'), target = path.join(root, 'target');
    await mkdir(path.join(source, 'requests', 'empty'), { recursive: true });
    await writeFile(path.join(source, 'requests', 'test.png'), Buffer.from([137, 80, 78, 71, 0, 255]));
    await cp(source, target, { recursive: true });
    const result = await verifyUploadCopy(source, target);
    assert.equal(result.matched, true);
    assert.equal(result.source.files, 1);
    assert.equal(result.source.bytes, '6');
    await writeFile(path.join(target, 'requests', 'test.png'), Buffer.from([137, 80, 78, 71, 0, 254]));
    assert.equal((await verifyUploadCopy(source, target)).matched, false);
    await cp(source, target, { recursive: true });
    await rm(path.join(target, 'requests', 'empty'), { recursive: true });
    assert.equal((await verifyUploadCopy(source, target)).matched, false);
    await assert.rejects(uploadManifest(path.join(root, 'missing')));
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('links cannot stand in for backed-up file bytes', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'tizia-upload-link-'));
  try {
    await writeFile(path.join(root, 'file'), 'public fixture');
    await symlink('file', path.join(root, 'link'));
    await assert.rejects(uploadManifest(root), /link_or_special/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
