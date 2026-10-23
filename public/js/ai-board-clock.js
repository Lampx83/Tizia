// Twin của server/ai-board/clock.js. TZ phải khớp contract.json clock.tz (test kiểm tra).
export const TZ = 'Asia/Ho_Chi_Minh';

const parts = new Intl.DateTimeFormat('en-US', {
  timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'longOffset',
});

let source = () => Date.now();

export const nowMs = () => source();

export function setClockSource(fn) {
  const old = source;
  source = fn;
  return old;
}

export function fmt(ts) {
  const p = Object.fromEntries(parts.formatToParts(Number(ts)).map(x => [x.type, x.value]));
  const off = p.timeZoneName.replace('GMT', '') || '+00:00';
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second} ${off}`;
}
