// Per-profile test resources: own loopback port, own temp dir, own PostgreSQL schema.
// Two test profiles (two processes at once) must never share any of them.
import { mkdtempSync } from 'node:fs';
import net from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';

/** One ephemeral loopback port from the OS. Probe, not a reservation: bind it at once. */
export function freePort(host = '127.0.0.1') {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, host, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

/** Fresh temp dir named after the profile; `HOME`/`DATA_DIR`/uploads for one run live under it. */
export function profileTempDir(profile) {
  const tag = String(profile).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || 'test';
  return mkdtempSync(path.join(tmpdir(), `tizia-${tag}-`));
}
