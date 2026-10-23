import { readFileSync } from 'node:fs';

const { clock: { tz: TZ } } = JSON.parse(readFileSync(new URL('./contract.json', import.meta.url), 'utf8'));

const parts = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'longOffset',
});

let source = () => Date.now();

/** Epoch ms từ nguồn đồng hồ hiện tại. */
export const nowMs = () => source();

/** Thay nguồn đồng hồ (test). Trả về hàm cũ để khôi phục. */
export function setClockSource(fn) {
  const old = source;
  source = fn;
  return old;
}

/** Epoch ms → 'YYYY-MM-DD HH:mm:ss +07:00'. */
export function fmt(ts) {
  const p = Object.fromEntries(parts.formatToParts(Number(ts)).map(x => [x.type, x.value]));
  const off = p.timeZoneName.replace('GMT', '') || '+00:00';
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second} ${off}`;
}
