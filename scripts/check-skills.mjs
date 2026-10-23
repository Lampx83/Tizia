/**
 * check-skills.mjs — Kiểm skill triển khai: file, LF, lint server, khóa băm, allowlist image.
 *
 * Chạy:  node scripts/check-skills.mjs
 * Thoát mã 1 nếu lỗi → dùng được trong CI / build.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { lintSkill } from '../server/ai-board/services/skills.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS = 'ai-board/harness/skills';
const LOCK = 'skills.lock.json';

// Skill có trong thư mục nhưng không khoá: harness nạp qua VARIANT_FILES (context.py),
// candidate.relock chỉ quét */SKILL.md nên khoá sẽ bị xoá.
const UNLOCKED = new Set(['proposed/review-two-axes']);

// Format harness (context.py parse_skill), server không lint được. Vẫn kiểm LF, khóa, image.
const HARNESS_FORMAT = new Set(['add-html-section', 'default', 'edit-css-style', 'edit-html-text',
  'fix-js-behavior', 'frontend-design-core', 'implement-one-slice', 'new-feature', 'new-static-page', 'plan-from-request']);

// Dockerfile COPY source → dockerignore dùng khi build image đó.
const IMAGES = [
  { name: 'server', dockerfile: 'Dockerfile', ignore: '.dockerignore', copy: /^COPY\s+ai-board\/harness\/skills\/\s/m },
  { name: 'worker', dockerfile: 'ai-board/worker.Dockerfile', ignore: 'ai-board/worker.Dockerfile.dockerignore', copy: /^COPY\s+ai-board\/\s+ai-board\/\s*$/m },
];

const sha256 = buf => createHash('sha256').update(buf).digest('hex');
const posix = p => p.split(path.sep).join('/');

function listSkillFiles(root) {
  const base = path.join(root, SKILLS);
  const files = [];
  const walk = (dir, rel) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const next = path.join(dir, ent.name), relNext = rel ? `${rel}/${ent.name}` : ent.name;
      if (ent.isDirectory()) walk(next, relNext);
      else files.push(relNext);
    }
  };
  walk(base, '');
  return files;
}

/** Glob dockerignore → RegExp. `**` any depth, `*` one segment. */
function globRe(pattern) {
  let out = '';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === '*' && pattern[i + 1] === '*') {
      if (pattern[i + 2] === '/') { out += '(?:.*/)?'; i += 2; } else { out += '.*'; i += 1; }
    } else if (c === '*') out += '[^/]*';
    else if (c === '?') out += '[^/]';
    else if (c === '[') { const j = pattern.indexOf(']', i); out += pattern.slice(i, j + 1); i = j; }
    else out += c.replace(/[.+^${}()|\\]/g, '\\$&');
  }
  return new RegExp(`^${out}$`);
}

function dockerRules(text) {
  return text.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(line => {
    const neg = line.startsWith('!');
    const body = (neg ? line.slice(1) : line).replace(/^\.\//, '').replace(/\/$/, '');
    return { neg, re: globRe(body) };
  });
}

/** Mô phỏng Docker: file/thư mục cha khớp rule cuối cùng quyết định; mặc định là giữ. */
function dockerIncluded(file, rules) {
  const parts = file.split('/');
  const candidates = parts.map((_, i) => parts.slice(0, i + 1).join('/'));
  let excluded = false;
  for (const rule of rules) if (candidates.some(c => rule.re.test(c))) excluded = !rule.neg;
  return !excluded;
}

function frontmatter(text) {
  return text.startsWith('---\n') ? text.split('---\n')[1] ?? '' : '';
}

export function checkSkills(root = ROOT) {
  const errors = [];
  const info = [];
  const fail = (where, reason) => errors.push(`${where}: ${reason}`);

  let lock;
  try {
    lock = JSON.parse(fs.readFileSync(path.join(root, SKILLS, LOCK), 'utf8'));
  } catch (error) {
    return { errors: [`${SKILLS}/${LOCK}: không đọc được (${error.message})`], info };
  }

  const files = listSkillFiles(root).filter(f => f.endsWith('/SKILL.md') || f === 'SKILL.md');
  const skillRels = files.map(f => f.replace(/\/?SKILL\.md$/, ''));
  const byName = new Map();
  for (const rel of skillRels) {
    const name = rel.split('/').pop();
    if (byName.has(name)) fail(`${SKILLS}/${rel}`, `trùng tên "${name}" với ${byName.get(name)}`);
    byName.set(name, rel);
  }

  for (const rel of skillRels) {
    const where = `${SKILLS}/${rel}/SKILL.md`;
    const name = rel.split('/').pop();
    const buf = fs.readFileSync(path.join(root, SKILLS, rel, 'SKILL.md'));
    const text = buf.toString('utf8');
    if (buf.includes(0x0d)) fail(where, 'có \\r (CRLF), phải LF theo .gitattributes');

    if (UNLOCKED.has(rel)) {
      if (Object.hasOwn(lock, name)) fail(where, 'khai báo ngoài khóa nhưng vẫn có trong skills.lock.json');
      info.push(`${where}: ngoài khóa (lý do trong check-skills.mjs)`);
    } else if (!Object.hasOwn(lock, name)) {
      fail(where, `không có trong ${LOCK} (chạy lock để thêm)`);
    } else if (sha256(buf) !== lock[name]) {
      fail(where, `hash ${sha256(buf).slice(0, 12)} ≠ khóa ${lock[name].slice(0, 12)}; sửa skill mà chưa cập nhật khóa`);
    }

    if (HARNESS_FORMAT.has(name)) {
      info.push(`${where}: bỏ lint server (format harness)`);
      continue;
    }
    const meta = frontmatter(text).split('\n').find(l => l.startsWith('source:'))?.slice(7).trim() ?? 'admin';
    const lint = lintSkill(text, { source: meta, name });
    for (const message of lint.errors) fail(where, `lint: ${message}`);
  }

  for (const name of Object.keys(lock)) {
    if (!byName.has(name)) fail(`${SKILLS}/${LOCK}`, `khóa "${name}" không có file SKILL.md`);
  }

  const expected = new Set([...skillRels.map(rel => `${rel}/SKILL.md`), LOCK]);
  for (const image of IMAGES) {
    const dockerfile = fs.readFileSync(path.join(root, image.dockerfile), 'utf8');
    if (!image.copy.test(dockerfile)) {
      fail(image.dockerfile, `thiếu bước COPY cho ${image.name} (${image.copy})`);
      continue;
    }
    const rules = dockerRules(fs.readFileSync(path.join(root, image.ignore), 'utf8'));
    const inImage = new Set(imageFiles(root, rules).map(p => p.slice(SKILLS.length + 1)));
    for (const f of inImage) if (!expected.has(f)) fail(`${image.name} image`, `thừa ${SKILLS}/${f}, không có trong khóa`);
    for (const f of expected) if (!inImage.has(f)) fail(`${image.name} image`, `thiếu ${SKILLS}/${f}; .dockerignore hoặc COPY loại mất`);
  }
  for (const f of listSkillFiles(root)) if (!expected.has(f)) fail(`${SKILLS}/${f}`, 'file lạ trong thư mục skill, không thuộc khóa');

  return { errors, info };
}

/** Đường dẫn (từ root) của mọi file skill mà build context đưa vào image. */
function imageFiles(root, rules) {
  return listSkillFiles(root).map(f => `${SKILLS}/${f}`).filter(p => dockerIncluded(p, rules));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const { errors, info } = checkSkills();
  for (const line of info) console.log(`  ${line}`);
  if (errors.length) {
    for (const line of errors) console.error(`✗ ${line}`);
    console.error(`\ncheck-skills: ${errors.length} lỗi.`);
    process.exit(1);
  }
  console.log('✅ check-skills: skill, khóa và image khớp.');
}
