// Copy toàn bộ dữ liệu từ SQLite (tizia.db) sang Postgres.
//   SQLITE_PATH   — file nguồn (mặc định ./data/tizia.db)
//   TARGET_URL    — Postgres đích, PHẢI là superuser (cần SET session_replication_role
//                   để tắt FK khi bulk-load). vd postgres://postgres@127.0.0.1:5433/tizia
//
// Idempotent: TRUNCATE ... RESTART IDENTITY CASCADE trước khi nạp. Giữ nguyên id.
// Sau khi nạp, reset các identity sequence về MAX(id) để INSERT mới không đụng id cũ.
//
// Schema PHẢI đã tồn tại ở đích (chạy server/schema.sql trước, hoặc initSchema()).
import Database from 'better-sqlite3';
import pg from 'pg';

const SQLITE_PATH = process.env.SQLITE_PATH || './data/tizia.db';
const TARGET_URL = process.env.TARGET_URL || process.env.DATABASE_URL;
if (!TARGET_URL) { console.error('Thiếu TARGET_URL/DATABASE_URL'); process.exit(1); }

const src = new Database(SQLITE_PATH, { readonly: true });
const client = new pg.Client({ connectionString: TARGET_URL });

const qid = (s) => '"' + String(s).replace(/"/g, '""') + '"';

async function main() {
  await client.connect();

  // Bảng có ở CẢ nguồn (SQLite) lẫn đích (Postgres). Bỏ bảng không có ở đích.
  const srcTables = src.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  ).all().map(r => r.name);
  const pgTables = new Set((await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
  )).rows.map(r => r.table_name));
  const tables = srcTables.filter(t => pgTables.has(t));
  const skipped = srcTables.filter(t => !pgTables.has(t));
  if (skipped.length) console.warn('[migrate] bỏ qua bảng không có ở đích:', skipped.join(', '));

  // Tắt FK trong suốt phiên nạp (order bảng nhờ vậy không quan trọng).
  await client.query('SET session_replication_role = replica');

  // Xoá sạch đích để chạy lại được (giữ thứ tự nào cũng được vì CASCADE + FK off).
  await client.query(`TRUNCATE ${tables.map(qid).join(', ')} RESTART IDENTITY CASCADE`);

  const report = [];
  for (const table of tables) {
    const rows = src.prepare(`SELECT * FROM ${qid(table)}`).all();
    if (!rows.length) { report.push([table, 0]); continue; }
    const cols = Object.keys(rows[0]);
    const colList = cols.map(qid).join(', ');
    // Chunk theo giới hạn 65535 param của pg.
    const perChunk = Math.max(1, Math.floor(60000 / cols.length));
    let inserted = 0;
    for (let i = 0; i < rows.length; i += perChunk) {
      const chunk = rows.slice(i, i + perChunk);
      const params = [];
      const tuples = chunk.map((row) => {
        const ph = cols.map((c) => { params.push(row[c]); return '$' + params.length; });
        return '(' + ph.join(', ') + ')';
      });
      await client.query(
        `INSERT INTO ${qid(table)} (${colList}) VALUES ${tuples.join(', ')}`,
        params
      );
      inserted += chunk.length;
    }
    report.push([table, inserted]);
  }

  await client.query('SET session_replication_role = DEFAULT');

  // Reset identity sequence cho các bảng có cột id identity.
  const idTables = (await client.query(`
    SELECT table_name FROM information_schema.columns
    WHERE table_schema='public' AND is_identity='YES' AND column_name='id'
  `)).rows.map(r => r.table_name).filter(t => tables.includes(t));
  for (const t of idTables) {
    await client.query(
      `SELECT setval(pg_get_serial_sequence($1,'id'), GREATEST((SELECT COALESCE(MAX(id),0) FROM ${qid(t)}), 1))`,
      [t]
    );
  }

  // Verify: đếm khớp giữa nguồn và đích.
  let mismatch = 0;
  for (const [table, n] of report) {
    const pgN = Number((await client.query(`SELECT COUNT(*) c FROM ${qid(table)}`)).rows[0].c);
    if (pgN !== n) { console.error(`  MISMATCH ${table}: src=${n} pg=${pgN}`); mismatch++; }
  }

  const total = report.reduce((a, [, n]) => a + n, 0);
  console.log(`[migrate] ${tables.length} bảng, ${total} dòng, ${idTables.length} sequence reset, ${mismatch} mismatch`);
  report.filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, 12)
    .forEach(([t, n]) => console.log(`  ${String(n).padStart(6)}  ${t}`));

  await client.end();
  src.close();
  process.exit(mismatch ? 1 : 0);
}

main().catch((e) => { console.error('[migrate] FAILED:', e.message); process.exit(1); });
