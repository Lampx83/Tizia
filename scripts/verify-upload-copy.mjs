#!/usr/bin/env node
// Compare frozen local uploads only; pg_dump does not include file bytes.
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, readdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const unchanged = (a, b) => a.dev === b.dev && a.ino === b.ino &&
  a.size === b.size && a.mtimeNs === b.mtimeNs && a.ctimeNs === b.ctimeNs;

export async function uploadManifest(directory) {
  const absolute = path.resolve(directory);
  if (!(await lstat(absolute)).isDirectory() || await realpath(absolute) !== absolute) {
    throw new Error('upload_root_must_be_real_directory');
  }
  const entries = [];
  async function visit(relative) {
    const full = path.join(absolute, relative);
    const before = await lstat(full, { bigint: true });
    if (before.isDirectory()) {
      const names = (await readdir(full)).sort();
      entries.push([relative.split(path.sep).join('/'), 'directory']);
      for (const name of names) await visit(path.join(relative, name));
      if (!unchanged(before, await lstat(full, { bigint: true }))) throw new Error('uploads_changed_during_read');
    } else if (before.isFile()) {
      const hash = createHash('sha256');
      for await (const chunk of createReadStream(full)) hash.update(chunk);
      if (!unchanged(before, await lstat(full, { bigint: true }))) throw new Error('uploads_changed_during_read');
      entries.push([relative.split(path.sep).join('/'), 'file', before.size.toString(), hash.digest('hex')]);
    } else throw new Error('uploads_contain_link_or_special_file');
  }
  await visit('');
  return {
    files: entries.filter(row => row[1] === 'file').length,
    directories: entries.filter(row => row[1] === 'directory').length,
    bytes: entries.reduce((sum, row) => sum + (row[1] === 'file' ? BigInt(row[2]) : 0n), 0n).toString(),
    sha256: createHash('sha256').update(JSON.stringify(entries)).digest('hex'),
  };
}

export async function verifyUploadCopy(source, destination) {
  const original = await uploadManifest(source);
  const copied = await uploadManifest(destination);
  // Source writers must remain stopped throughout copy and verification.
  const final = await uploadManifest(source);
  return { source: original, destination: copied,
    sourceStable: original.sha256 === final.sha256,
    matched: original.sha256 === copied.sha256 && original.sha256 === final.sha256 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    if (process.argv.length !== 4) throw new Error('usage');
    const result = await verifyUploadCopy(process.argv[2], process.argv[3]);
    console.log(JSON.stringify(result));
    if (!result.matched) process.exitCode = 1;
  } catch {
    console.error(JSON.stringify({ error: 'upload_copy_unverified' }));
    process.exitCode = 1;
  }
}
