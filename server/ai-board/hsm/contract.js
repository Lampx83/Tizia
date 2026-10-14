import fs from 'node:fs';
import { createHash } from 'node:crypto';

export const CONTRACT = JSON.parse(fs.readFileSync(new URL('./contract.json', import.meta.url), 'utf8'));
export const CONTRACT_HASH = createHash('sha256').update(JSON.stringify(CONTRACT)).digest('hex');
export const statePath = state => [...CONTRACT.parent, state];
export function diagram() {
  return ['stateDiagram-v2', 'state EXECUTION {', '  state Gate4 {', `    [*] --> ${CONTRACT.initial}`,
    ...CONTRACT.transitions.map(t => `    ${t.from} --> ${t.to} : ${t.event}`), '  }', '}'].join('\n');
}
export const publicContract = () => ({...CONTRACT, hash:CONTRACT_HASH, diagram:diagram()});
