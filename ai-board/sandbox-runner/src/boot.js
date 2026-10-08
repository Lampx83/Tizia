import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { Sandbox } from 'microsandbox';

export const PROBE_IMAGE = 'alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc';

const runtime = () => `microsandbox@${JSON.parse(readFileSync(new URL('../package.json', import.meta.url))).dependencies.microsandbox}`;

/** Boot a throwaway microVM, run `true`, destroy it. Throw on any failure. Return pinned versions. */
export async function bootProbe({ image = PROBE_IMAGE } = {}) {
  const name = `probe-${randomBytes(4).toString('hex')}`;
  const sandbox = await Sandbox.builder(name).image(image).cpus(1).memory(256).maxDuration(60).create();
  try {
    const out = await sandbox.exec('true', []);
    if (!out.success) throw new Error(`probe exec exited ${out.code}`);
  } finally {
    await sandbox.stop();
    await Sandbox.remove(name);
  }
  return { runtime: runtime(), image };
}
