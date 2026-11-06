import fs from 'node:fs';
import path from 'node:path';

const LEXICON = JSON.parse(fs.readFileSync(new URL('../guard-lexicon.json', import.meta.url), 'utf8'));
const DENY = LEXICON.deny_paths.patterns.map((pattern) => new RegExp(pattern, 'i'));

/** Chuẩn hoá đường dẫn repo; null nếu tuyệt đối, thoát bằng .., hay có ký tự điều khiển. */
export function normalizePath(value) {
  const raw = String(value ?? '');
  if (!raw || /[\u0000-\u001f]/.test(raw)) return null;
  const posix = path.posix.normalize(raw.replaceAll('\\', '/'));
  if (posix.startsWith('/') || /^[A-Za-z]:/.test(posix) || posix === '..' || posix.startsWith('../') || posix === '.') return null;
  return posix;
}

/** {allow, reason} cho path + op ('read' | 'write' | 'pr'); deny theo deny_paths trong guard-lexicon.json. */
export function check(value, op = 'read') {
  const normalized = normalizePath(value);
  if (normalized === null) return { allow: false, reason: `${op}: path không hợp lệ` };
  const hit = DENY.find((re) => re.test(normalized) || re.test(`${normalized}/`));
  return hit ? { allow: false, reason: `${op}: ${normalized} thuộc vùng AI Board/hạ tầng (deny_paths)` } : { allow: true, reason: '' };
}

export const denied = (value, op) => !check(value, op).allow;
