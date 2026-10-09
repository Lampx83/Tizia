// Check the online policy pins its guest image by digest with zero egress. --pull also fetches it and confirms the registry serves that exact digest.
// Usage: node scripts/verify-online-guest.mjs [policy.yaml] [--pull]
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { loadPolicy } from '../src/policy.js';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--')) ?? new URL('../sandbox-policy.online.yaml', import.meta.url);
const policy = loadPolicy(readFileSync(file, 'utf8'));
const problems = [];
if (policy.network !== 'none') problems.push('network must be none');
if (policy.egress.length) problems.push('egress must be empty');
if (!/@sha256:[0-9a-f]{64}$/.test(policy.guest_image)) problems.push('guest_image must be pinned by sha256 digest');

if (args.includes('--pull') && !problems.length) {
  const pinned = policy.guest_image.split('@')[1];
  execFileSync('docker', ['pull', policy.guest_image], { stdio: 'inherit' });
  const repoDigests = JSON.parse(execFileSync('docker', ['image', 'inspect', policy.guest_image, '--format', '{{json .RepoDigests}}']).toString());
  if (!repoDigests.some((d) => d.endsWith(`@${pinned}`))) problems.push(`registry digest mismatch: ${repoDigests}`);
  const size = execFileSync('docker', ['image', 'inspect', policy.guest_image, '--format', '{{.Size}}']).toString().trim();
  console.log(`pulled ${policy.guest_image} size=${size} bytes`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`ok ${policy.guest_image} policy_hash=${policy.hash}`);
