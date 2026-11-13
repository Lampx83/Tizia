#!/usr/bin/env node
// Offline: tỷ lệ bước skill gốc còn trong skill mặc định. Usage: node scripts/skill-essence-audit.mjs <source.md> <default.md> [--min 0.8]
import fs from 'node:fs';
import { essenceStepRatio } from '../server/ai-board/security/essence.js';

const args = process.argv.slice(2);
const flag = args.indexOf('--min');
const min = flag >= 0 ? Number(args.splice(flag, 2)[1]) : 0;
const [source, def] = args;
if (!source || !def || Number.isNaN(min)) {
  console.error('Usage: node scripts/skill-essence-audit.mjs <source.md> <default.md> [--min 0.8]');
  process.exit(2);
}
const { total, kept, ratio, lost } = essenceStepRatio(fs.readFileSync(source, 'utf8'), fs.readFileSync(def, 'utf8'));
console.log(`steps kept ${kept}/${total} (${(ratio * 100).toFixed(1)}%)`);
for (const step of lost) console.log(`- lost: ${step}`);
process.exit(ratio < min ? 1 : 0);
