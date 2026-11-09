#!/usr/bin/env node
// Kiểm tra TĨNH mọi câu SQL trong server/ với schema Postgres thật: sinh ra lệnh PREPARE (Postgres phân tích và
// kiểm tra kiểu nhưng KHÔNG thực thi), bọc trong transaction READ ONLY rồi ROLLBACK. Bắt được cả lớp lỗi SQLite còn sót
// mà chỉ lộ khi có người gọi tới, ví dụ `CASE WHEN correct` với cột bigint hay `min(a, b)`.
// Không bắt được SQL ghép chuỗi lúc chạy (phần có ${...}) — các câu đó được liệt kê riêng.
//
// Cách dùng:
//   node scripts/check-sql.mjs --emit > /tmp/check.sql      # chỉ sinh SQL
//   psql "$DATABASE_URL" -f /tmp/check.sql 2>&1 | node scripts/check-sql.mjs --report
//   node scripts/check-sql.mjs --report --baseline scripts/check-sql.baseline.txt < output   # CI: chỉ fail khi có lỗi mới
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.js')) out.push(p);
  }
  return out;
}

// Cùng quy tắc với convert() trong server/pg.js: ? và @name → $n, bỏ qua chuỗi và comment.
export function toPg(raw) {
  let sql = raw.replace(/\s+COLLATE\s+NOCASE/gi, '');
  let conflict = false;
  sql = sql.replace(/INSERT\s+OR\s+IGNORE/gi, () => { conflict = true; return 'INSERT'; });
  let out = '', n = 0;
  const named = new Map();
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'" || ch === '"') {
      out += ch; i++;
      while (i < sql.length) { out += sql[i]; if (sql[i] === ch) { if (sql[i + 1] === ch) { out += sql[++i]; } else break; } i++; }
      continue;
    }
    if (ch === '-' && sql[i + 1] === '-') { while (i < sql.length && sql[i] !== '\n') i++; out += '\n'; continue; }
    if (ch === '?') { n++; out += '$' + n; continue; }
    if (ch === '@') {
      const m = /^@([A-Za-z_]\w*)/.exec(sql.slice(i));
      if (m) { n++; out += '$' + n; named.set(m[1], n); i += m[0].length - 1; continue; }
    }
    out += ch;
  }
  if (conflict && !/ON\s+CONFLICT/i.test(out)) {
    const r = out.search(/\bRETURNING\b/i);
    out = r >= 0 ? out.slice(0, r) + ' ON CONFLICT DO NOTHING ' + out.slice(r) : out.replace(/\s*;?\s*$/, '') + ' ON CONFLICT DO NOTHING';
  }
  return out.replace(/\s*;\s*$/, '');
}

export function extract() {
  const items = [], dynamic = [];
  const re = /\b(?:db|tx|conn|client)\.prepare\(\s*(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g;
  for (const file of walk(path.join(ROOT, 'server'))) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(re)) {
      const line = src.slice(0, m.index).split('\n').length;
      const where = `${path.relative(ROOT, file)}:${line}`;
      const lit = m[1];
      const body = lit.slice(1, -1);
      if (lit[0] === '`' && body.includes('${')) { dynamic.push(where); continue; }
      items.push({ where, sql: toPg(body.replace(/\\(['"`])/g, '$1')) });
    }
  }
  return { items, dynamic };
}

function emit() {
  const { items } = extract();
  const lines = ['\\set ON_ERROR_STOP off', '\\set VERBOSITY terse', 'BEGIN READ ONLY;'];
  items.forEach((it, i) => {
    lines.push(`\\echo @@ ${it.where}`, 'SAVEPOINT s;', `PREPARE chk${i} AS ${it.sql};`, 'ROLLBACK TO s;');
  });
  lines.push('ROLLBACK;');
  console.log(lines.join('\n'));
}

function report() {
  const baselineIdx = process.argv.indexOf('--baseline');
  const baseline = baselineIdx > 0 && fs.existsSync(process.argv[baselineIdx + 1])
    ? new Set(fs.readFileSync(process.argv[baselineIdx + 1], 'utf8').split('\n').filter(Boolean)) : new Set();
  const text = fs.readFileSync(0, 'utf8');
  let cur = '';
  const errs = [];
  for (const l of text.split('\n')) {
    if (l.startsWith('@@ ')) { cur = l.slice(3).trim(); continue; }
    const m = /ERROR:\s+(.*)$/.exec(l);
    if (m && !/current transaction is aborted/.test(m[1])) {
      // Postgres không suy được kiểu tham số thì đó là giới hạn của phép kiểm tra, không phải lỗi trong SQL.
      const kind = /could not determine data type of parameter|inconsistent types deduced/.test(m[1]) ? 'note' : 'error';
      errs.push({ where: cur, msg: m[1].replace(/ at character \d+$/, ''), kind });
    }
  }
  const real = errs.filter(e => e.kind === 'error');
  const key = e => `${e.where.replace(/:\d+$/, '')} | ${e.msg}`;
  const fresh = real.filter(e => !baseline.has(key(e)));
  const { items, dynamic } = extract();
  console.log(`Đã kiểm tra ${items.length} câu SQL tĩnh; ${dynamic.length} câu có ghép chuỗi chưa kiểm tra được.`);
  console.log(`Lỗi: ${real.length} (mới so với baseline: ${fresh.length}); không suy được kiểu tham số: ${errs.length - real.length}.`);
  for (const e of fresh) console.log(`  ${e.where}  ${e.msg}`);
  if (process.argv.includes('--write-baseline')) console.error(real.map(key).join('\n'));
  process.exit(fresh.length ? 1 : 0);
}

if (process.argv.includes('--report')) report();
else if (process.argv.includes('--emit')) emit();
