#!/usr/bin/env node
// scripts/dump-config.mjs — tương đương `dsh --dump-config` (ticket 08).
// Boot server thật (đúng 1 lần mount, tái dùng nguyên server/index.js — không
// nhân bản logic wiring ra 1 bản thứ hai), rồi in registry.dumpConfig() và
// thoát. Không chạy song song với `npm run dev`/container thật — PORT=0 (OS tự
// cấp cổng rảnh) để không đụng tiến trình khác đang chiếm PORT mặc định.
process.env.PORT = process.env.PORT || '0';

const [{ dumpConfig }] = await Promise.all([
  import('../server/contexts/registry.js'),
  import('../server/index.js'),
]);

// mount*Plugins() chạy đồng bộ trong lúc import server/index.js, xong TRƯỚC
// httpServer.listen() — registry đã đủ trạng thái ngay khi import resolve.
console.log(JSON.stringify(dumpConfig(), null, 2));
process.exit(0);
