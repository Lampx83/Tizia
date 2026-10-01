import { createHash } from 'node:crypto';
import YAML from 'yaml';

export class PolicyError extends Error {
  constructor(message) { super(message); this.code = 'invalid_policy'; }
}

const int = (min, max) => (value, path) => {
  if (!Number.isInteger(value) || value < min || value > max) throw new PolicyError(`${path}: integer ${min}..${max} required`);
  return value;
};
const HOST = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const SECRETISH = /(TOKEN|SECRET|PASSWORD|PASSWD|KEY|CREDENTIAL)/i;

const object = (shape) => (value, path) => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new PolicyError(`${path}: mapping required`);
  const unknown = Object.keys(value).filter((key) => !(key in shape));
  if (unknown.length) throw new PolicyError(`${path}: unknown key ${unknown[0]}`);
  return Object.fromEntries(Object.entries(shape).map(([key, check]) => {
    if (!(key in value)) throw new PolicyError(`${path}.${key}: required`);
    return [key, check(value[key], `${path}.${key}`)];
  }));
};

const SCHEMA = object({
  version: (v, p) => { if (v !== 1) throw new PolicyError(`${p}: must be 1`); return v; },
  vm: object({
    cpus: int(1, 4), memory_mib: int(256, 4096), disk_mib: int(1024, 20480),
    ttl_s: int(60, 1200), lease_s: int(10, 120),
  }),
  concurrency: int(1, 1), // ponytail: one active sandbox is the agreed ceiling; raise with the spec, not by config
  guest_image: (v, p) => {
    if (typeof v !== 'string' || !/^[a-z0-9][a-z0-9._-]*(:\d{1,5})?(\/[a-z0-9._-]+)*@sha256:[0-9a-f]{64}$/.test(v)) {
      throw new PolicyError(`${p}: image must be pinned by sha256 digest`);
    }
    return v;
  },
  egress: (v, p) => {
    if (!Array.isArray(v) || v.length > 64) throw new PolicyError(`${p}: list of at most 64 rules required`);
    return v.map((rule, i) => object({
      host: (h, hp) => { if (typeof h !== 'string' || !HOST.test(h)) throw new PolicyError(`${hp}: exact hostname required`); return h; },
      port: int(1, 65535),
    })(rule, `${p}[${i}]`));
  },
  guest_env: (v, p) => {
    if (v === null || typeof v !== 'object' || Array.isArray(v)) throw new PolicyError(`${p}: mapping required`);
    for (const [key, value] of Object.entries(v)) {
      if (!/^[A-Z_][A-Z0-9_]{0,63}$/.test(key) || SECRETISH.test(key)) throw new PolicyError(`${p}.${key}: not an allowed variable name`);
      if (typeof value !== 'string' || value.length > 256 || /[$`]/.test(value)) throw new PolicyError(`${p}.${key}: plain string value required`);
    }
    return { ...v };
  },
  archive: object({ max_bytes: int(1, 2 ** 30), max_expanded_bytes: int(1, 2 ** 32), max_files: int(1, 200_000) }),
  exec: object({
    timeout_s: int(1, 1200), max_stdout_bytes: int(1, 2 ** 26), max_stderr_bytes: int(1, 2 ** 26),
    workdir: (v, p) => { if (typeof v !== 'string' || !/^\/[\w./-]*$/.test(v) || v.includes('..')) throw new PolicyError(`${p}: absolute path required`); return v; },
  }),
  artifacts: object({ max_file_bytes: int(1, 2 ** 28), max_total_bytes: int(1, 2 ** 30) }),
});

/** Parse + validate sandbox-policy.yaml text. Strict: known keys, bounded values, no tags/interpolation. */
export function loadPolicy(text) {
  const doc = YAML.parseDocument(String(text), { schema: 'core', uniqueKeys: true, strict: true });
  if (doc.errors.length || doc.warnings.length) throw new PolicyError(`yaml: ${(doc.errors[0] || doc.warnings[0]).message}`);
  let data;
  try { data = doc.toJS(); } catch (error) { throw new PolicyError(`yaml: ${error.message}`); }
  const policy = SCHEMA(data, 'policy');
  return { ...policy, hash: createHash('sha256').update(JSON.stringify(policy)).digest('hex') };
}
