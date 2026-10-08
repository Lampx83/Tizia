import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

/** Run metadata on the runner-only volume (run_id, state, expiry, sandbox, cleanup state; never source or artifacts). */
export function fileStore(path) {
  return {
    load() {
      let text;
      try { text = readFileSync(path, 'utf8'); } catch (error) {
        if (error.code === 'ENOENT') return { runs: {} };
        throw error;
      }
      return JSON.parse(text); // corrupt file throws: reconcile then refuses to infer a safe state
    },
    save(data) {
      mkdirSync(dirname(path), { recursive: true });
      const tmp = `${path}.tmp`;
      writeFileSync(tmp, JSON.stringify(data));
      renameSync(tmp, path);
    },
  };
}
