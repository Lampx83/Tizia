// Drop guest images the dev policy no longer pins: the runner's cached copies (msb image rm) and the registry's old
// manifests (then blob garbage collection). Every pin change leaves a 3+ GiB image behind in each place otherwise.
//   node scripts/gc-guest-images.mjs [--dry-run]   (dev stack up; containers tizia-sandbox-runner, tizia-image-registry)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIGEST = /^sha256:[0-9a-f]{64}$/;
const GUEST_REF = /^image-registry:5000\/gate5@(sha256:[0-9a-f]{64})$/;

function requirePinned(pinned) {
  if (!DIGEST.test(pinned || '')) throw new Error('a well-formed pinned digest (sha256:<64 hex>) is required');
}

/** `msb image ls` output + pinned digest -> cached gate5 guest references that are not the pinned one. */
export function staleGuestRefs(lsOutput, pinned) {
  requirePinned(pinned);
  return lsOutput.split('\n').map((line) => line.trim().split(/\s+/)[0])
    .filter((ref) => GUEST_REF.test(ref) && GUEST_REF.exec(ref)[1] !== pinned);
}

/** Digests a manifest list / OCI index points at (platform image, attestation); a plain image manifest has none. */
export function childDigests(manifest) {
  return (Array.isArray(manifest?.manifests) ? manifest.manifests : []).map((m) => m.digest).filter((d) => DIGEST.test(d || ''));
}

/** Hex digests of the registry's gate5 manifests + pinned digest (+ its children) -> sha256:... digests to delete.
 *  docker push of a BuildKit image uploads an index whose children are separate manifests; deleting one breaks the pin. */
export function staleManifests(hexDigests, pinned, keep = []) {
  requirePinned(pinned);
  const kept = new Set([pinned, ...keep]);
  return hexDigests.map((hex) => `sha256:${hex}`).filter((digest) => !kept.has(digest));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dry = process.argv.includes('--dry-run');
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const policy = fs.readFileSync(path.join(root, 'ai-board/sandbox-runner/sandbox-policy.dev.yaml'), 'utf8');
  const pinned = /^guest_image: .*@(sha256:[0-9a-f]{64})\r?$/m.exec(policy)?.[1];
  const docker = (...args) => execFileSync('docker', args, { encoding: 'utf8', env: { ...process.env, MSYS_NO_PATHCONV: '1' } });
  const runner = 'tizia-sandbox-runner';
  const msb = '/app/node_modules/.bin/msb';
  for (const ref of staleGuestRefs(docker('exec', runner, msb, 'image', 'ls'), pinned)) {
    console.log(`${dry ? 'would remove' : 'remove'} cached ${ref}`);
    if (!dry) docker('exec', runner, msb, 'image', 'rm', ref);
  }
  const registry = 'tizia-image-registry';
  const revisions = '/var/lib/registry/docker/registry/v2/repositories/gate5/_manifests/revisions/sha256';
  const hex = docker('exec', registry, 'ls', revisions).split(/\s+/).filter(Boolean);
  const accept = 'application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.list.v2+json, application/vnd.oci.image.manifest.v1+json, application/vnd.docker.distribution.manifest.v2+json';
  const pinnedManifest = JSON.parse(docker('exec', runner, 'node', '-e', `fetch('http://image-registry:5000/v2/gate5/manifests/${pinned}', { headers: { accept: ${JSON.stringify(accept)} } })
    .then((r) => { if (!r.ok) throw new Error('registry answered ' + r.status + ' for the pinned manifest'); return r.text(); })
    .then((t) => process.stdout.write(t)).catch((e) => { console.error(e.message); process.exit(1); })`));
  for (const digest of staleManifests(hex, pinned, childDigests(pinnedManifest))) {
    console.log(`${dry ? 'would delete' : 'delete'} registry manifest ${digest}`);
    // the registry image has no curl and its wget cannot send DELETE: use the runner's node (same compose network)
    if (!dry) docker('exec', runner, 'node', '-e', `fetch('http://image-registry:5000/v2/gate5/manifests/${digest}', { method: 'DELETE' })
      .then((r) => { if (r.status !== 202 && r.status !== 404) throw new Error('registry answered ' + r.status + ' (is REGISTRY_STORAGE_DELETE_ENABLED set?)'); })  // 404: a revision link left behind by an earlier delete, already gone
      .catch((e) => { console.error(e.message); process.exit(1); })`);
  }
  if (!dry) console.log(docker('exec', registry, 'registry', 'garbage-collect', '/etc/docker/registry/config.yml').split('\n').slice(-3).join('\n'));
}
