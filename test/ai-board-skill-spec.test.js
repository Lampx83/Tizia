import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { specErrors, lintSkill } from '../server/ai-board/services/skills.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GOOD = 'name: a-b\ndescription: "Do X. Use when Y now."\nmetadata:\n  version: "1"\n';
const GOOD_TEXT = `---\n${GOOD}---\nbody\n`;
// Mirror of CASES in ai-board/harness/tests/test_skill_frontmatter_spec.py; same good/bad verdicts.
const CASES = {
  ok: [GOOD_TEXT, 'a-b', []],
  uppercase_name: [GOOD_TEXT.replace('a-b', 'A-b'), 'A-b', ['name']],
  name_not_folder: [GOOD_TEXT, 'other', ['folder']],
  name_too_long: [GOOD_TEXT.replace('a-b', 'a'.repeat(65)), 'a'.repeat(65), ['name']],
  no_use_when: [GOOD_TEXT.replace('Use when', 'Apply to'), 'a-b', ['Use when']],
  description_too_long: [GOOD_TEXT.replace('Do X.', `${'X'.repeat(1020)}.`), 'a-b', ['description']],
  knob_at_top_level: [GOOD_TEXT.replace('metadata:\n  version: "1"\n', 'version: "1"\n'), 'a-b', ['non-spec']],
  unquoted_metadata: [GOOD_TEXT.replace('"1"', '1'), 'a-b', ['quoted']],
  missing_description: [GOOD_TEXT.replace('description: "Do X. Use when Y now."\n', ''), 'a-b', ['description']],
  crlf: [GOOD_TEXT.replace(/\n/g, '\r\n'), 'a-b', ['LF']],
  duplicate_key: [GOOD_TEXT.replace('name: a-b\n', 'name: a-b\nname: a-b\n'), 'a-b', ['duplicate']],
};

for (const [name, [text, folder, expect]] of Object.entries(CASES)) {
  test(`specErrors ${name}`, () => {
    const errors = specErrors(text, folder);
    if (!expect.length) assert.deepEqual(errors, []);
    else assert.ok(errors.length && expect.every(word => errors.some(e => e.includes(word))), errors.join('\n'));
  });
}

test('specErrors accepts every repo skill file', () => {
  const dirs = ['ai-board/harness/skills', 'ai-board/harness/skills/proposed'];
  const files = dirs.flatMap(d => fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })
    .filter(e => e.isDirectory()).map(e => path.join(ROOT, d, e.name, 'SKILL.md')))
    .filter(f => fs.existsSync(f));
  assert.ok(files.length >= 20, `found ${files.length}`);
  for (const file of files) {
    const folder = path.basename(path.dirname(file));
    assert.deepEqual(specErrors(fs.readFileSync(file, 'utf8'), folder), [], file);
  }
});

test('lintSkill returns spec reasons and refuses flat knobs', () => {
  const flat = '---\nname: a-b\ndescription: "Do X. Use when Y now."\ntask_type: [backend]\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Step.\n';
  const out = lintSkill(flat, { name: 'a-b' });
  assert.equal(out.ok, false);
  assert.ok(out.errors.some(e => e.includes('non-spec')), out.errors.join('\n'));
});
