import { gunzipSync } from 'node:zlib';

export class ArchiveError extends Error {
  constructor(reason) { super(reason); this.code = 'archive_rejected'; }
}

const BLOCK = 512;
const FILE = new Set(['0', '\0']);
const MAX_NAME = 1024;

const cstr = (buf, from, len) => buf.toString('utf8', from, from + len).split('\0')[0];

function unsafePath(raw) {
  const name = raw === './' ? 'x' : raw.replace(/^\.\//, ''); // `tar -C dir .` prefixes entries with ./
  if (!name || name.length > MAX_NAME || name.includes('\\') || name.startsWith('/')) return true;
  const parts = name.replace(/\/$/, '').split('/');
  if (parts.some((part) => part === '..' || part === '' || part === '.')) return true;
  // ponytail: reject every .env* and .git; a reviewed allowlist exception (e.g. .env.example) is a policy change, not a filename guess
  return parts[0] === '.git' || parts.some((part) => part === '.env' || part.startsWith('.env.'));
}

/** Validate an uploaded tar.gz without extracting it. Return {files, expanded_bytes} or throw ArchiveError. */
export function validateArchive(bytes, limits) {
  if (bytes.length > limits.max_bytes) throw new ArchiveError('upload too large');
  let tar;
  try {
    // bound inflation: expanded payload plus header/padding slack per file
    tar = gunzipSync(bytes, { maxOutputLength: limits.max_expanded_bytes + (limits.max_files + 4) * 2 * BLOCK });
  } catch { throw new ArchiveError('not a bounded gzip stream'); }

  let offset = 0;
  let files = 0;
  let expanded = 0;
  while (offset + BLOCK <= tar.length) {
    const header = tar.subarray(offset, offset + BLOCK);
    if (header.every((byte) => byte === 0)) return { files, expanded_bytes: expanded };
    const stored = parseInt(cstr(header, 148, 8).trim(), 8);
    const sum = header.reduce((acc, byte, i) => acc + (i >= 148 && i < 156 ? 0x20 : byte), 0);
    if (stored !== sum) throw new ArchiveError('corrupt header');
    const type = String.fromCharCode(header[156]);
    const name = (cstr(header, 345, 155) ? `${cstr(header, 345, 155)}/` : '') + cstr(header, 0, 100);
    if (unsafePath(name)) throw new ArchiveError('unsafe path');
    const size = parseInt(cstr(header, 124, 12).trim() || '0', 8);
    if (type === '5') {
      offset += BLOCK;
      continue;
    }
    if (!FILE.has(type)) throw new ArchiveError('unsupported entry type');
    if (!Number.isInteger(size) || size < 0) throw new ArchiveError('corrupt size');
    files += 1;
    expanded += size;
    if (files > limits.max_files) throw new ArchiveError('too many files');
    if (expanded > limits.max_expanded_bytes) throw new ArchiveError('expanded size too large');
    offset += BLOCK + Math.ceil(size / BLOCK) * BLOCK;
  }
  throw new ArchiveError('missing end of archive');
}
