/** In-memory stand-in for the microsandbox adapter; tests flip `fail.*` to inject faults. */
export function fakeBackend() {
  const vms = new Map();
  const calls = [];
  const fail = {};
  const record = (op, name, extra) => { calls.push({ op, name, ...extra }); };
  const maybeFail = (op) => { if (fail[op]) throw new Error(`injected ${op} failure`); };
  return {
    vms, calls, fail,
    async create(spec) {
      record('create', spec.name, { spec });
      maybeFail('create');
      vms.set(spec.name, { labels: spec.labels, files: {}, extracted: null, status: 'running' });
    },
    async putArchive(name, bytes) { record('putArchive', name, { size: bytes.length }); maybeFail('putArchive'); vms.get(name).extracted = bytes.length; },
    async exec(name, request) {
      record('exec', name, { request });
      maybeFail('exec');
      return fail.timeout
        ? { code: null, stdout: '', stderr: '', timed_out: true, truncated: false }
        : { code: 0, stdout: 'ok', stderr: '', timed_out: false, truncated: false };
    },
    async readFile(name, path, maxBytes) {
      record('readFile', name, { path });
      const file = vms.get(name)?.files[path];
      if (!file) throw Object.assign(new Error('missing'), { code: 'not_found' });
      if (file.length > maxBytes) throw Object.assign(new Error('too big'), { code: 'too_large' });
      return file;
    },
    async destroy(name) {
      record('destroy', name);
      if (fail.destroy) return false;
      vms.delete(name);
      return true;
    },
    async list() { return [...vms.entries()].map(([name, vm]) => ({ name, labels: vm.labels })); },
  };
}

export function memoryStore(initial = {}) {
  let data = structuredClone(initial);
  return { load: () => structuredClone(data), save: (next) => { data = structuredClone(next); }, peek: () => data };
}
