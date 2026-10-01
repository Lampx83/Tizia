import { createHash } from 'node:crypto';
import { validateArchive } from './archive.js';

export class RunnerError extends Error {
  constructor(status, code, phase, message = code) {
    super(message);
    Object.assign(this, { status, code, phase });
  }
}

const RUN_ID = /^[A-Za-z0-9_-]{8,64}$/;
const ACTIVE = new Set(['creating', 'ready', 'destroying']);
const CLEANUP_ATTEMPTS = 3;

const safeRelative = (path) => typeof path === 'string' && path.length > 0 && path.length <= 512
  && !path.startsWith('/') && !path.includes('\\') && !path.includes('\0')
  && path.split('/').every((part) => part && part !== '.' && part !== '..');
const exactKeys = (value, allowed, phase) => {
  if (value === null || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some((key) => !allowed.includes(key))) {
    throw new RunnerError(400, 'invalid_request', phase);
  }
};

/** Run lifecycle on top of a sandbox backend. All limits come from policy, never from the caller. */
export function createRuns({ policy, backend, store, now = Date.now, alert = () => {}, report = () => {}, runnerId, runnerVersion = 'dev' }) {
  let data = { runs: {} };
  let unhealthy = null;
  let admission = Promise.resolve();
  const running = new Set(); // run ids with an exec in flight

  const active = () => Object.values(data.runs).filter((run) => ACTIVE.has(run.state)).length;
  const save = () => store.save(data);
  const view = (run) => ({
    run_id: run.run_id, state: run.state, lease_expires_at: run.lease_expires_at, expires_at: run.expires_at, policy_hash: policy.hash,
  });
  const markUnhealthy = (reason, runId) => {
    if (!unhealthy) alert({ event: reason, run_id: runId });
    unhealthy ??= reason;
  };

  function find(runId, phase) {
    const run = data.runs[runId];
    if (!run) throw new RunnerError(404, 'run_not_found', phase);
    return run;
  }
  function live(runId, phase) {
    const run = find(runId, phase);
    if (run.state !== 'ready') throw new RunnerError(409, 'run_closed', phase);
    if (now() >= run.lease_expires_at || now() >= run.expires_at) throw new RunnerError(409, 'run_closed', phase);
    return run;
  }

  /** Destroy the sandbox with bounded retries. True only once the backend confirms it is gone. */
  async function cleanup(run) {
    for (let attempt = 0; attempt < CLEANUP_ATTEMPTS; attempt += 1) {
      try { if (await backend.destroy(run.sandbox)) return true; } catch { /* retry */ }
    }
    return false;
  }
  async function close(run, state) {
    run.state = 'destroying';
    save();
    if (!(await cleanup(run))) {
      markUnhealthy('cleanup_unconfirmed', run.run_id);
      return false;
    }
    run.state = state;
    save();
    return true;
  }

  function create(request) {
    const result = admission.then(() => doCreate(request));
    admission = result.catch(() => {});
    return result;
  }

  async function doCreate(request) {
    exactKeys(request, ['run_id', 'manifest'], 'provision');
    const runId = request.run_id;
    if (typeof runId !== 'string' || !RUN_ID.test(runId)) throw new RunnerError(400, 'invalid_run_id', 'provision');
    const manifest = request.manifest ?? [];
    const names = new Set();
    if (!Array.isArray(manifest) || manifest.length > 16 || manifest.some((item) => {
      exactKeys(item, ['name', 'path'], 'provision');
      const bad = typeof item.name !== 'string' || !/^[\w.-]{1,64}$/.test(item.name) || names.has(item.name) || !safeRelative(item.path);
      names.add(item.name);
      return bad;
    })) throw new RunnerError(400, 'invalid_manifest', 'provision');

    const existing = data.runs[runId];
    if (existing) {
      if (ACTIVE.has(existing.state)) return view(existing);
      throw new RunnerError(409, 'run_id_reused', 'provision');
    }
    if (unhealthy) throw new RunnerError(503, 'runner_unhealthy', 'provision');
    if (active() >= policy.concurrency) {
      throw new RunnerError(429, 'busy', 'provision');
    }

    const t = now();
    const run = {
      run_id: runId, state: 'creating', sandbox: `sandbox-${runId}`, manifest, artifacts: {},
      created_at: t, lease_expires_at: t + policy.vm.lease_s * 1000, expires_at: t + policy.vm.ttl_s * 1000,
    };
    data.runs[runId] = run;
    save(); // recorded before the VM exists so an uncertain create is always cleanable
    try {
      await backend.create({
        name: run.sandbox, image: policy.guest_image, vm: { cpus: policy.vm.cpus, memory_mib: policy.vm.memory_mib, disk_mib: policy.vm.disk_mib },
        egress: policy.egress, env: policy.guest_env, ttl_s: policy.vm.ttl_s, workdir: policy.exec.workdir,
        labels: { run_id: runId, runner_id: runnerId, runner_version: runnerVersion },
      });
    } catch (error) {
      report('create_failed', runId, error);
      await close(run, 'failed');
      throw new RunnerError(502, 'create_failed', 'provision');
    }
    if (run.state !== 'creating') { // destroyed (or expired) while booting: the VM that just came up must not outlive that
      if (!(await cleanup(run))) markUnhealthy('cleanup_unconfirmed', runId);
      throw new RunnerError(409, 'run_closed', 'provision');
    }
    // the lease and TTL start when the VM is up, not before: the first create can spend a minute pulling the image
    const booted = now();
    run.lease_expires_at = booted + policy.vm.lease_s * 1000;
    run.expires_at = booted + policy.vm.ttl_s * 1000;
    run.state = 'ready';
    save();
    return view(run);
  }

  async function upload(runId, bytes) {
    const run = live(runId, 'upload');
    try {
      validateArchive(bytes, policy.archive);
    } catch (error) {
      report('archive_rejected', runId, error);
      throw new RunnerError(400, error.code || 'archive_rejected', 'upload', error.message);
    }
    try { await backend.putArchive(run.sandbox, bytes, policy.exec.workdir); } catch (error) {
      report('upload_failed', runId, error);
      await close(run, 'indeterminate');
      throw new RunnerError(502, 'upload_failed', 'upload');
    }
    return { run_id: runId };
  }

  async function exec(runId, request) {
    const run = live(runId, 'exec');
    exactKeys(request, ['argv'], 'exec');
    const { argv } = request;
    if (!Array.isArray(argv) || argv.length < 1 || argv.length > 64
      || argv.some((arg) => typeof arg !== 'string' || arg.length > 4096 || arg.includes('\0'))) {
      throw new RunnerError(400, 'invalid_request', 'exec');
    }
    if (running.has(runId)) throw new RunnerError(409, 'exec_in_progress', 'exec');
    running.add(runId);
    try {
      return await backend.exec(run.sandbox, {
        argv, cwd: policy.exec.workdir, env: policy.guest_env, timeout_s: policy.exec.timeout_s,
        max_stdout_bytes: policy.exec.max_stdout_bytes, max_stderr_bytes: policy.exec.max_stderr_bytes,
      });
    } catch (error) {
      report('exec_ambiguous', runId, error);
      // completion unknown: never replay, end the run
      await close(run, 'indeterminate');
      throw new RunnerError(502, 'exec_ambiguous', 'exec');
    } finally {
      running.delete(runId);
    }
  }

  async function download(runId, name) {
    const run = live(runId, 'download');
    const item = run.manifest.find((entry) => entry.name === name);
    if (!item) throw new RunnerError(404, 'artifact_not_registered', 'download');
    let bytes;
    try { bytes = await backend.readFile(run.sandbox, `${policy.exec.workdir}/${item.path}`, policy.artifacts.max_file_bytes, policy.exec.workdir); } catch (error) {
      if (error.code === 'too_large') throw new RunnerError(413, 'artifact_too_large', 'download');
      report('artifact_missing', runId, error);
      throw new RunnerError(404, 'artifact_missing', 'download');
    }
    const others = Object.entries(run.artifacts).filter(([key]) => key !== name).reduce((sum, [, meta]) => sum + meta.size, 0);
    if (others + bytes.length > policy.artifacts.max_total_bytes) throw new RunnerError(413, 'artifact_total_too_large', 'download');
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    run.artifacts[name] = { size: bytes.length, sha256 };
    save();
    return { bytes, sha256, size: bytes.length };
  }

  async function renew(runId) {
    const run = live(runId, 'renew');
    run.lease_expires_at = Math.min(now() + policy.vm.lease_s * 1000, run.expires_at);
    save();
    return view(run);
  }

  async function destroy(runId) {
    const run = find(runId, 'destroy');
    if (run.state === 'destroyed' || run.state === 'expired' || run.state === 'indeterminate' || run.state === 'failed') {
      return { run_id: runId, state: run.state };
    }
    if (!(await close(run, 'destroyed'))) throw new RunnerError(502, 'cleanup_unconfirmed', 'destroy');
    return { run_id: runId, state: 'destroyed' };
  }

  async function sweep() {
    for (const run of Object.values(data.runs)) {
      if (run.state === 'ready' && (now() >= run.lease_expires_at || now() >= run.expires_at)) await close(run, 'expired');
    }
  }

  /** Startup: close everything left over, then remove runner-owned orphan sandboxes. Never infer safety from missing data. */
  async function reconcile() {
    try { data = { runs: {}, ...store.load() }; } catch {
      data = { runs: {} };
      markUnhealthy('metadata_corrupt');
    }
    for (const run of Object.values(data.runs)) {
      if (ACTIVE.has(run.state)) run.state = 'indeterminate';
    }
    let sandboxes;
    try { sandboxes = await backend.list(); } catch { markUnhealthy('reconcile_failed'); return; }
    for (const sandbox of sandboxes) {
      if (sandbox.labels?.runner_id !== runnerId) continue;
      if (!(await cleanup({ sandbox: sandbox.name }))) markUnhealthy('cleanup_unconfirmed', sandbox.labels.run_id);
    }
    save();
  }

  return {
    create, upload, exec, download, renew, destroy, sweep, reconcile,
    status: async (runId) => view(find(runId, 'status')),
    health: () => ({ healthy: !unhealthy, reason: unhealthy }),
    active,
  };
}
