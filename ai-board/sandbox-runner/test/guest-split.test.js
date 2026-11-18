import test from 'node:test';
import assert from 'node:assert/strict';

import { oversizeLayers, planLayers, splitDockerfile } from '../scripts/guest-layers.mjs';

const GiB = 2 ** 30;
const du = (rows) => rows.map(([bytes, path]) => `${bytes}\t${path}`).join('\n');
const LIMITS = { maxBytes: 8 * GiB, maxEntries: 800_000, maxFileBytes: 5 * GiB, maxGroups: 20 };

// Shape of the real guest: one big warm-cache tree under /var/lib/docker/vfs/dir.
const vfs = Array.from({ length: 40 }, (_, i) => [0.3 * GiB, `/var/lib/docker/vfs/dir/l${i}`]);
const GUEST = du([
  ...vfs,
  [12 * GiB, '/var/lib/docker/vfs/dir'], [12 * GiB, '/var/lib/docker/vfs'], [12 * GiB, '/var/lib/docker'],
  [1024, '/var/lib/apt'], [12 * GiB, '/var/lib'], [10, '/var/log'], [12 * GiB, '/var'],
  [1 * GiB, '/usr'], [7, '/bin'], [0.5 * GiB, '/opt'], [13.5 * GiB, '/'],
]);

test('a tree over the layer budget is split at directory level and packed under the limits', () => {
  const plan = planLayers(GUEST, LIMITS, ['proc', 'sys']);
  const units = plan.groups.flat();
  assert.ok(units.includes('/var/lib/docker/vfs/dir/l0') && !units.includes('/var/lib/docker'));
  assert.ok(['/usr', '/bin', '/opt', '/var/log', '/var/lib/apt', '/proc', '/sys'].every((p) => units.includes(p)));
  assert.equal(new Set(units).size, units.length);
  assert.deepEqual(plan.splitDirs, ['/', '/var', '/var/lib', '/var/lib/docker', '/var/lib/docker/vfs', '/var/lib/docker/vfs/dir']);
  assert.ok(plan.groups.length >= 2 && plan.groups.length <= LIMITS.maxGroups);
  for (const g of plan.bytes) assert.ok(g <= LIMITS.maxBytes);
});

test('a small tree stays one unit per top-level entry', () => {
  const plan = planLayers(du([[5, '/etc/x'], [9, '/etc'], [3, '/bin'], [12, '/']]), LIMITS, []);
  assert.deepEqual(plan.groups, [['/bin', '/etc']]);
  assert.deepEqual(plan.splitDirs, ['/']);
});

test('the runtime /.dockerenv marker is never copied: the image has no such file', () => {
  const plan = planLayers(du([[0, '/.dockerenv'], [3, '/bin'], [3, '/']]), LIMITS, ['.dockerenv', 'bin', 'proc']);
  assert.deepEqual(plan.groups, [['/bin', '/proc']]);
});

test('unit symlinks leave the COPY groups: COPY follows a symlink source and fails on a dangling one', () => {
  const plan = planLayers(du([[7, '/bin'], [3, '/usr/bin'], [3, '/usr'], [10, '/']]), LIMITS, [], ['/bin', '/usr/bin/x']);
  assert.deepEqual(plan.groups, [['/usr']]);
  assert.deepEqual(plan.links, ['/bin']);
});

test('the entry budget splits a directory even when its bytes fit', () => {
  const files = Array.from({ length: 6 }, (_, i) => [1, `/data/f${i}`]);
  const plan = planLayers(du([...files, [6, '/data'], [6, '/']]), { ...LIMITS, maxEntries: 4 }, []);
  assert.ok(plan.splitDirs.includes('/data'));
  for (const g of plan.groups) assert.ok(g.length <= 4);
});

test('one file over the per-file limit cannot be split and is refused', () => {
  assert.throws(() => planLayers(du([[6 * GiB, '/big.img'], [6 * GiB, '/']]), LIMITS, []), /\/big.img/);
});

test('more groups than allowed are refused', () => {
  assert.throws(() => planLayers(GUEST, { ...LIMITS, maxGroups: 1 }), /groups/);
});

test('dockerfile copies each group as one layer and restores split directory modes', () => {
  const text = splitDockerfile('reg/gate5@sha256:abc', [['/opt', '/var/lib/a b'], ['/usr']],
    ['711 0 0 /var/lib/docker', '755 0 0 /'], ['ENV LANG=C.UTF-8', 'CMD ["python3"]']);
  const lines = text.trim().split('\n');
  assert.equal(lines[0], 'FROM reg/gate5@sha256:abc AS src');
  assert.equal(lines[1], 'FROM scratch');
  assert.equal(lines[2], 'COPY --parents --from=src ["/opt","/var/lib/a b","/"]');
  assert.equal(lines[3], 'COPY --parents --from=src ["/usr","/"]');
  assert.match(lines[4], /^RUN chown 0:0 '\/var\/lib\/docker' && chmod 711 '\/var\/lib\/docker' && chown 0:0 '\/' && chmod 755 '\/'$/);
  assert.deepEqual(lines.slice(5), ['ENV LANG=C.UTF-8', 'CMD ["python3"]']);
  assert.throws(() => splitDockerfile('b', [['/x']], ["755 0 0 /it's"], []), /mode line/);
});

test('unit symlinks are copied as links from a side stage before anything runs', () => {
  const lines = splitDockerfile('base', [['/usr']], ['755 0 0 /'], [], ['/bin', '/lib64', '/var/lock']).trim().split('\n');
  assert.deepEqual(lines.slice(0, 6), [
    'FROM base AS src',
    'FROM src AS links',
    "RUN mkdir /.relayer-links && tar -C / -cf - 'bin' 'lib64' 'var/lock' | tar -C /.relayer-links -xpf -",
    'FROM scratch',
    'COPY --parents --from=src ["/usr","/"]',
    'COPY --from=links /.relayer-links/ /',
  ]);
  assert.match(lines[6], /^RUN chown/);
  assert.throws(() => splitDockerfile('base', [], [], [], ["/it's"]), /link path/);
});

test('history sizes over the layer budget are reported', () => {
  assert.deepEqual(oversizeLayers('0\n13100000000\n512\n', 8 * GiB), [13100000000]);
  assert.deepEqual(oversizeLayers('0\n512\n', 8 * GiB), []);
});
