// Layer-count decisions for rebuild-guest.sh. Pure, no docker calls.
//   node scripts/guest-layers.mjs layers       < inspect.json   print RootFS layer count
//   node scripts/guest-layers.mjs flatten <n> <max>             exit 0 if n > max
//   node scripts/guest-layers.mjs changes      < inspect.json   one docker --change per line
//   node scripts/guest-layers.mjs tag <sha256:digest>           print pin-<12 hex> tag

import { pathToFileURL } from 'node:url';

const PIN_PREFIX = 'pin-';
const TAG_HEX = 12;

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
  throw new Error('usage: layers | changes | flatten <n> <max> | tag <digest>');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).then(
    (out) => { if (out) process.stdout.write(out + '\n'); },
    (err) => { process.stderr.write(String(err.message ?? err) + '\n'); process.exitCode = 2; },
  );
}
