// Layer-count decisions for rebuild-guest.sh. Pure, no docker calls.
//   node scripts/guest-layers.mjs layers       < inspect.json   print RootFS layer count
//   node scripts/guest-layers.mjs flatten <n> <max>             exit 0 if n > max
//   node scripts/guest-layers.mjs changes      < inspect.json   one docker --change per line
//   node scripts/guest-layers.mjs tag <sha256:digest>           print pin-<12 hex> tag
//   node scripts/guest-layers.mjs plan <symlinks.txt> [top-level names] < du.txt > plan.json   group `du -abx /` into layers
//   node scripts/guest-layers.mjs split-dirs plan.json          directories the plan split, one per line
//   node scripts/guest-layers.mjs dockerfile <base> plan.json modes.txt changes.txt   split-layer Dockerfile
//   node scripts/guest-layers.mjs oversize < history.txt        exit 0 if a layer exceeds the byte budget

import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const PIN_PREFIX = 'pin-';
const TAG_HEX = 12;
const GiB = 2 ** 30;
// Microsandbox refuses a layer above 10 GiB extracted, 1M entries, or a 5 GiB file; keep a margin under each.
export const LAYER_LIMITS = { maxBytes: 8 * GiB, maxEntries: 800_000, maxFileBytes: 4.5 * GiB, maxGroups: 20 };

// The measuring container has it; the image does not, so COPY --from would fail on it.
const RUNTIME_MARKER = '/.dockerenv';
const parentOf = (path) => path.slice(0, path.lastIndexOf('/')) || '/';

export function planLayers(duText, limits = LAYER_LIMITS, topLevel = [], symlinks = []) {
  const bytes = new Map();
  for (const line of duText.split('\n')) {
    const tab = line.indexOf('\t');
    if (tab > 0) bytes.set(line.slice(tab + 1), Number(line.slice(0, tab)));
  }
  for (const name of topLevel) if (!bytes.has(`/${name}`)) bytes.set(`/${name}`, 0);
  bytes.delete(RUNTIME_MARKER);
  const children = new Map();
  for (const path of bytes.keys()) {
    if (path === '/') continue;
    const parent = parentOf(path);
    if (!children.has(parent)) children.set(parent, []);
    children.get(parent).push(path);
  }
  for (const [path, size] of bytes) {
    if (!children.has(path) && size > limits.maxFileBytes) throw new Error(`file over the per-file layer limit: ${path}`);
  }
  const entries = new Map();
  const count = (path) => {
    if (!entries.has(path)) entries.set(path, 1 + (children.get(path) ?? []).reduce((n, c) => n + count(c), 0));
    return entries.get(path);
  };
  const linkSet = new Set(symlinks);
  const units = [];
  const links = [];
  const splitDirs = ['/'];
  const visit = (path) => {
    const big = bytes.get(path) > limits.maxBytes || count(path) > limits.maxEntries;
    if (linkSet.has(path)) return links.push(path);
    if (!big) return units.push(path);
    if (!children.has(path)) throw new Error(`entry over the layer limits: ${path}`);
    splitDirs.push(path);
    children.get(path).forEach(visit);
  };
  (children.get('/') ?? []).forEach(visit);

  const groups = [];
  for (const unit of units.sort((a, b) => bytes.get(b) - bytes.get(a) || a.localeCompare(b))) {
    const fit = groups.find((g) => g.bytes + bytes.get(unit) <= limits.maxBytes && g.entries + count(unit) <= limits.maxEntries);
    if (fit) { fit.paths.push(unit); fit.bytes += bytes.get(unit); fit.entries += count(unit); }
    else groups.push({ paths: [unit], bytes: bytes.get(unit), entries: count(unit) });
  }
  if (groups.length > limits.maxGroups) throw new Error(`${groups.length} layer groups, more than ${limits.maxGroups}`);
  return { groups: groups.map((g) => g.paths.sort()), bytes: groups.map((g) => g.bytes), splitDirs: splitDirs.sort(), links: links.sort() };
}

const SAFE_PATH = /^\/[\w./+@-]*$/;
const MODE_LINE = /^(\d{3,4}) (\d+) (\d+) (\/[\w./+@-]*)$/;

export function splitDockerfile(base, groups, modeLines, changes, links = []) {
  for (const path of links) if (!SAFE_PATH.test(path)) throw new Error(`bad link path: ${path}`);
  const restore = modeLines.map((line) => {
    const m = MODE_LINE.exec(line);
    if (!m) throw new Error(`bad mode line: ${line}`);
    return `chown ${m[2]}:${m[3]} '${m[4]}' && chmod ${m[1]} '${m[4]}'`;
  });
  return [
    `FROM ${base} AS src`,
    // A symlink as COPY source is followed (and fails when dangling); cp -a keeps it a link, and /bin, /lib64 must
    // exist before any RUN can start a binary.
    // tar keeps links as links; GNU cp --parents fails on a nested link path such as /var/lock
    ...(links.length ? ['FROM src AS links', `RUN mkdir /.relayer-links && tar -C / -cf - ${links.map((l) => `'${l.replace(/^\/+/, '')}'`).join(' ')} | tar -C /.relayer-links -xpf -`] : []),
    'FROM scratch',
    // COPY --parents keeps each path under its own parents; the parents themselves come out 0755 root, hence the RUN.
    ...groups.map((paths) => `COPY --parents --from=src ${JSON.stringify([...paths, '/'])}`),
    ...(links.length ? ['COPY --from=links /.relayer-links/ /'] : []),
    ...(restore.length ? [`RUN ${restore.join(' && ')}`] : []),
    ...changes,
  ].join('\n') + '\n';
}

export function oversizeLayers(historyText, maxBytes = LAYER_LIMITS.maxBytes) {
  return historyText.split('\n').filter(Boolean).map(Number).filter((size) => size > maxBytes);
}

export function imageConfig(inspect) {
  const img = Array.isArray(inspect) ? inspect[0] : inspect;
  if (!img || typeof img !== 'object') throw new Error('docker image inspect: empty result');
  return img;
}

export function layerCount(inspect) {
  const layers = imageConfig(inspect).RootFS?.Layers;
  if (!Array.isArray(layers)) throw new Error('docker image inspect: no RootFS.Layers');
  return layers.length;
}

export function needsFlatten(count, max) {
  return count > max;
}

export function changeFlags(inspect) {
  const cfg = imageConfig(inspect).Config ?? {};
  const out = [];
  for (const kv of cfg.Env ?? []) out.push(`ENV ${kv}`);
  if (cfg.Entrypoint?.length) out.push(`ENTRYPOINT ${JSON.stringify(cfg.Entrypoint)}`);
  if (cfg.Cmd?.length) out.push(`CMD ${JSON.stringify(cfg.Cmd)}`);
  if (cfg.WorkingDir) out.push(`WORKDIR ${cfg.WorkingDir}`);
  if (cfg.User) out.push(`USER ${cfg.User}`);
  return out;
}

export function pinTag(digest) {
  const hex = /^sha256:([0-9a-f]{64})$/.exec(digest ?? '');
  if (!hex) throw new Error(`not a sha256 digest: ${digest}`);
  return PIN_PREFIX + hex[1].slice(0, TAG_HEX);
}

async function readStdin() {
  let s = '';
  for await (const chunk of process.stdin) s += chunk;
  return s;
}

async function main([cmd, ...args]) {
  if (cmd === 'layers') return String(layerCount(JSON.parse(await readStdin())));
  if (cmd === 'changes') return changeFlags(JSON.parse(await readStdin())).join('\n');
  if (cmd === 'flatten') {
    const [n, max] = args.map(Number);
    if (!Number.isFinite(n) || !Number.isFinite(max)) throw new Error('usage: flatten <n> <max>');
    process.exitCode = needsFlatten(n, max) ? 0 : 1;
    return '';
  }
  if (cmd === 'tag') return pinTag(args[0]);
  if (cmd === 'plan') {
    const [linkFile, ...top] = args;
    const links = readFileSync(linkFile, 'utf8').split('\n').filter(Boolean);
    return JSON.stringify(planLayers(await readStdin(), LAYER_LIMITS, top, links));
  }
  if (cmd === 'split-dirs') return JSON.parse(readFileSync(args[0], 'utf8')).splitDirs.join('\n');
  if (cmd === 'dockerfile') {
    const [base, plan, modes, changes] = args;
    const lines = (file) => readFileSync(file, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
    const { groups, links } = JSON.parse(readFileSync(plan, 'utf8'));
    return splitDockerfile(base, groups, lines(modes), lines(changes), links).trimEnd();
  }
  if (cmd === 'oversize') {
    const over = oversizeLayers(await readStdin());
    process.exitCode = over.length ? 0 : 1;
    return over.join('\n');
  }
  throw new Error('usage: layers | changes | flatten <n> <max> | tag <digest> | plan | split-dirs | dockerfile | oversize');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).then(
    (out) => { if (out) process.stdout.write(out + '\n'); },
    (err) => { process.stderr.write(String(err.message ?? err) + '\n'); process.exitCode = 2; },
  );
}
