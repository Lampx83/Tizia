// Context-owned migrations: additive, idempotent .sql files the AI Board admin gate approved; run on every boot.
import fs from 'node:fs';

const SQL_FILE = /^[a-z0-9][a-z0-9._-]*\.sql$/;

/** Exec each <dir>/*.sql in name order; return file names. Missing dir = nothing to run. */
export async function runContextMigrations(db, dir) {
  const folder = new URL(String(dir).endsWith('/') ? String(dir) : `${dir}/`);
  if (!fs.existsSync(folder)) return [];
  const files = fs.readdirSync(folder).filter((name) => SQL_FILE.test(name)).sort();
  for (const name of files) await db.exec(fs.readFileSync(new URL(name, folder), 'utf8'));
  return files;
}
