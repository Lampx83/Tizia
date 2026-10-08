import test from 'node:test';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';

import { validateArchive } from '../src/archive.js';

const LIMITS = { max_bytes: 10_000, max_expanded_bytes: 5_000, max_files: 5 };

function entry({ name, type = '0', body = '', linkname = '' }) {
  const header = Buffer.alloc(512);
  header.write(name, 0, 100);
  header.write('0000644\0', 100);
  header.write(`${Buffer.byteLength(body).toString(8).padStart(11, '0')}\0`, 124);
  header.write(type, 156);
  header.write(linkname, 157, 100);
  header.write('ustar\0', 257);
  header.fill(0x20, 148, 156);
  const sum = header.reduce((a, b) => a + b, 0);
  header.write(`${sum.toString(8).padStart(6, '0')}\0 `, 148);
  const data = Buffer.alloc(Math.ceil(Buffer.byteLength(body) / 512) * 512);
  data.write(body);
  return Buffer.concat([header, data]);
}
function pax(...pairs) { // "<len> key=value\n" records, len counting itself
  return pairs.map(([key, value]) => {
    const rest = ` ${key}=${value}\n`;
    let len = Buffer.byteLength(rest);
    while (String(len).length + Buffer.byteLength(rest) !== len) len = String(len).length + Buffer.byteLength(rest);
    return `${len}${rest}`;
  }).join('');
}
const tgz = (...entries) => gzipSync(Buffer.concat([...entries.map(entry), Buffer.alloc(1024)]));
const check = (...entries) => validateArchive(tgz(...entries), LIMITS);

test('a plain workspace archive passes and reports its totals', () => {
  const stats = check({ name: 'src/', type: '5' }, { name: 'src/a.js', body: 'x'.repeat(100) }, { name: 'package.json', body: '{}' });
  assert.deepEqual(stats, { files: 2, expanded_bytes: 102 });
});

test('pax and GNU long names are honoured and still validated', () => {
  assert.deepEqual(check({ name: 'p', type: 'x', body: pax(['path', 'tên/tệp-dài.js']) }, { name: 'short', body: 'hi' }), { files: 1, expanded_bytes: 2 });
  const long = `${'d/'.repeat(60)}f.js` + String.fromCharCode(0);
  assert.deepEqual(check({ name: 'L', type: 'L', body: long }, { name: 'trunc', body: 'hi' }), { files: 1, expanded_bytes: 2 });
});

test('entries prefixed with ./ (tar -C dir .) are accepted', () => {
  const stats = check({ name: './', type: '5' }, { name: './a.txt', body: 'hi' }, { name: './d/', type: '5' }, { name: './d/b.txt', body: 'yo' });
  assert.deepEqual(stats, { files: 2, expanded_bytes: 4 });
  assert.throws(() => check({ name: './../x', body: 'x' }), { code: 'archive_rejected' });
});

const rejected = {
  'absolute path': [{ name: '/etc/passwd', body: 'x' }],
  'parent traversal': [{ name: 'a/../../x', body: 'x' }],
  'backslash path': [{ name: 'a\\b', body: 'x' }],
  'symlink': [{ name: 'l', type: '2', linkname: '/etc' }],
  'hard link': [{ name: 'l', type: '1', linkname: 'a' }],
  'device node': [{ name: 'd', type: '3' }],
  'fifo': [{ name: 'f', type: '6' }],
  'pax header with an unsafe path': [{ name: 'p', type: 'x', body: pax(['path', '../../etc/passwd']) }, { name: 'ok', body: 'x' }],
  'pax header with a second path that extractors would honour': [{ name: 'p', type: 'x', body: pax(['path', 'ok.txt'], ['path', 'a/../../x']) }, { name: 'ok', body: 'x' }],
  'pax header overriding the entry size': [{ name: 'p', type: 'x', body: pax(['path', 'ok.txt'], ['size', '99999']) }, { name: 'ok', body: 'x' }],
  'pax header with a wrong record length': [{ name: 'p', type: 'x', body: '5 path=ok.txt\n' }, { name: 'ok', body: 'x' }],
  'stacked metadata headers': [{ name: 'p', type: 'x', body: pax(['path', 'a']) }, { name: 'p', type: 'x', body: pax(['path', 'b']) }, { name: 'ok', body: 'x' }],
  'gnu long name with traversal': [{ name: 'L', type: 'L', body: '../escape\0' }, { name: 'ok', body: 'x' }],
  'git directory': [{ name: '.git/config', body: 'x' }],
  'credential env file': [{ name: 'app/.env', body: 'SECRET=1' }],
  'env variant': [{ name: '.env.production', body: 'x' }],
  'expanded size over the limit': [{ name: 'big', body: 'x'.repeat(6000) }],
  'too many files': Array.from({ length: 6 }, (_, i) => ({ name: `f${i}`, body: 'x' })),
};
for (const [name, entries] of Object.entries(rejected)) {
  test(`archive rejects ${name}`, () => {
    assert.throws(() => check(...entries), { code: 'archive_rejected' });
  });
}

test('archive rejects data that is not gzip, a gzip bomb and an oversize upload', () => {
  assert.throws(() => validateArchive(Buffer.from('not a tarball'), LIMITS), { code: 'archive_rejected' });
  const bomb = gzipSync(Buffer.alloc(5_000_000));
  assert.throws(() => validateArchive(bomb, LIMITS), { code: 'archive_rejected' });
  assert.throws(() => validateArchive(Buffer.alloc(10_001), LIMITS), { code: 'archive_rejected' });
});

test('archive rejects a corrupt header checksum', () => {
  const good = Buffer.concat([entry({ name: 'a', body: 'x' }), Buffer.alloc(1024)]);
  good[0] ^= 0xff;
  assert.throws(() => validateArchive(gzipSync(good), LIMITS), { code: 'archive_rejected' });
});
