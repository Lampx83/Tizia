#!/usr/bin/env node
// ============================================================
// loadtest-pharmacomm.mjs — req #238: kiểm thử N sinh viên thực hành Pharmacomm ĐỒNG THỜI
//
// Mỗi "sinh viên ảo" (VU) làm đúng luồng của trang /nha-thuoc-3d:
//   1) tạo phiên hội thoại AI bệnh nhân      POST /api/pharmacy/session
//   2) tạo lượt thực hành (session_id riêng) POST /api/pharmacy/practice/session  (tài khoản khách)
//   3) chat T lượt với AI bệnh nhân           POST /api/pharmacy/chat
//      + ghi từng lời vào DB                  POST /api/pharmacy/practice/message
//   4) ghi 1 thao tác 3D                      POST /api/pharmacy/practice/action
//   5) (tuỳ chọn --finish) kết thúc & chấm   POST /api/pharmacy/practice/finish
//   6) đọc lại kết quả và KIỂM TRA: số lời thoại/thao tác đúng như đã gửi, transcript chỉ chứa mã
//      riêng của VU đó (không lẫn của VU khác), (nếu --finish) có điểm.
//
// Mỗi VU gài một mã riêng "KT<n>-<ngẫu nhiên>" vào câu đầu để dò lẫn dữ liệu giữa các phiên.
// Phiên tạo ra là phiên KHÁCH (mã SV = KHACH, lớp = Khách) — xoá sau khi thử:
//   DELETE ... WHERE session_id IN (<danh sách in ra ở cuối>)
//
// CÁCH DÙNG (chạy TRÊN máy chủ prod để không bị giới hạn mạng ngoài):
//   node scripts/loadtest-pharmacomm.mjs --n 3                  # thử nhỏ
//   node scripts/loadtest-pharmacomm.mjs --n 120 --turns 6 --finish
//   --base http://127.0.0.1:8041   --module otc02   --ramp 30 (giây dàn đều lúc bắt đầu)
// ⚠️ N lớn dùng chung máy AI (vLLM) với các hệ thống khác — chỉ chạy khi đã báo trước.
// ============================================================

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => {
  if (x.startsWith('--')) a.push([x.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]);
  return a;
}, []));
const BASE = String(args.base || 'http://127.0.0.1:8041').replace(/\/+$/, '');
const N = Number(args.n || 3), TURNS = Number(args.turns || 4), RAMP = Number(args.ramp || 10) * 1000;
const MODULE = String(args.module || 'otc02'), FINISH = !!args.finish;
// --module mix → chia đều 3 tình huống OTC (OTC-02 có nhiều câu trả lời soạn sẵn nên nhẹ AI hơn hai tình huống kia)
const moduleOf = (n) => MODULE === 'mix' ? ['otc01', 'otc02', 'gpp'][n % 3] : MODULE;

const LINES = [
  'Em chào anh, em là dược sĩ, em có thể giúp gì cho anh ạ?',
  'Em hiểu anh đang vội, em xin phép hỏi nhanh vài câu để dùng thuốc an toàn ạ. Anh mua thuốc cho ai dùng ạ?',
  'Anh bị đau nhức răng từ bao giờ ạ? Có sưng lợi hay sốt không ạ?',
  'Anh có đang dùng thuốc nào khác, có bị dạ dày hay dị ứng thuốc gì không ạ?',
  'Anh có hay uống rượu bia không ạ?',
  'Dạ Alaxan phù hợp với anh, anh uống 1 viên khi đau, cách nhau ít nhất 6 giờ, sau ăn ạ.',
  'Anh còn thắc mắc gì về cách dùng thuốc không ạ?',
  'Em cảm ơn anh, chúc anh mau khỏi ạ.',
];

const lat = { chat: [], write: [] };
let errors = [];
async function call(kind, path, body) {
  const t0 = Date.now();
  const r = await fetch(BASE + path, { method: body ? 'POST' : 'GET', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  const ms = Date.now() - t0;
  (lat[kind] || (lat[kind] = [])).push(ms);
  let d = null; try { d = await r.json(); } catch {}
  if (!r.ok) throw new Error(`${path} → HTTP ${r.status} ${d?.error || ''}`);
  return d;
}

async function vu(n) {
  const tag = `KT${n}-${Math.random().toString(36).slice(2, 7)}`;
  const out = { n, tag, practiceId: null, ok: false, problems: [] };
  try {
    const mod = moduleOf(n);
    const chat = await call('write', '/api/pharmacy/session', { moduleId: mod });
    const chatId = chat.session.id;
    const ps = await call('write', '/api/pharmacy/practice/session', { guest: true, moduleId: mod, chatSessionId: chatId });
    out.practiceId = ps.sessionId;
    let order = 0;
    for (let t = 0; t < TURNS; t++) {
      const text = (t === 0 ? `[${tag}] ` : '') + LINES[t % LINES.length];
      await call('write', '/api/pharmacy/practice/message', { sessionId: out.practiceId, speaker: 'student', content: text, order: order++ });
      const d = await call('chat', '/api/pharmacy/chat', { sessionId: chatId, message: text });
      const reply = d.session.messages[d.session.messages.length - 1]?.content || '';
      await call('write', '/api/pharmacy/practice/message', { sessionId: out.practiceId, speaker: 'patient', content: reply, order: order++ });
    }
    await call('write', '/api/pharmacy/practice/action', { sessionId: out.practiceId, type: 'pick_box', payload: { drugName: 'Alaxan', note: tag }, order: 0, result: 'success' });
    if (FINISH) await call('write', '/api/pharmacy/practice/finish', { sessionId: out.practiceId });

    // kiểm tra dữ liệu của CHÍNH phiên này
    const res = await call('write', `/api/pharmacy/practice/result/${out.practiceId}`);
    const msgs = res.messages || res.session?.messages || [];
    const acts = res.actions || [];
    if (msgs.length !== TURNS * 2) out.problems.push(`lời thoại ${msgs.length}/${TURNS * 2}`);
    if (acts.length !== 1) out.problems.push(`thao tác ${acts.length}/1`);
    const txt = msgs.map((m) => m.content).join('\n');
    if (!txt.includes(tag)) out.problems.push('mất mã riêng của phiên');
    const foreign = txt.match(/KT\d+-[a-z0-9]{5}/g)?.filter((x) => x !== tag);
    if (foreign?.length) out.problems.push('LẪN dữ liệu phiên khác: ' + [...new Set(foreign)].join(','));
    // transcript AI bệnh nhân phải chỉ có lời của chính VU
    const chatTxt = (await call('write', `/api/pharmacy/session/${chatId}`)).session?.messages?.map((m) => m.content).join('\n') || '';
    if (chatTxt && !chatTxt.includes(tag)) out.problems.push('hội thoại AI không phải của phiên này');
    out.ok = !out.problems.length;
  } catch (e) { out.problems.push(e.message); errors.push(e.message); }
  return out;
}

async function waitScores(ids) {
  const t0 = Date.now(), left = new Set(ids);
  while (left.size && Date.now() - t0 < 60 * 60 * 1000) {
    for (const id of [...left]) {
      try {
        const r = await fetch(`${BASE}/api/pharmacy/practice/result/${id}`).then((x) => x.json());
        const st = r.session?.status;
        if (st === 'completed' || st === 'scoring_failed') { left.delete(id); scoreState[id] = { st, scores: (r.scores || []).length, t: Date.now() - t0 }; }
      } catch {}
    }
    if (left.size) { process.stdout.write(`\r… đang chờ chấm: còn ${left.size}/${ids.length} phiên (${Math.round((Date.now() - t0) / 1000)} s)   `); await new Promise((r) => setTimeout(r, 15000)); }
  }
  console.log('');
  return left;
}
const scoreState = {};
const pct = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p / 100 * s.length))]; };

console.log(`▶ ${N} sinh viên ảo · ${TURNS} lượt chat/SV · tình huống ${MODULE} · ${FINISH ? 'có' : 'không'} chấm điểm · ${BASE}`);
const T0 = Date.now();
const results = await Promise.all(Array.from({ length: N }, (_, i) => new Promise((r) => setTimeout(r, (RAMP * i) / Math.max(1, N))).then(() => vu(i + 1))));
const tAll = Date.now() - T0;
const bad = results.filter((r) => !r.ok);
console.log(`\n■ Hội thoại xong sau ${(tAll / 1000).toFixed(1)} s — đạt ${N - bad.length}/${N}`);
console.log(`  AI bệnh nhân trả lời: p50 ${pct(lat.chat, 50)} ms · p95 ${pct(lat.chat, 95)} ms · max ${Math.max(0, ...lat.chat)} ms (${lat.chat.length} lượt)`);
console.log(`  Ghi DB/khác:          p50 ${pct(lat.write, 50)} ms · p95 ${pct(lat.write, 95)} ms`);
for (const b of bad.slice(0, 20)) console.log(`  ✗ VU${b.n} (${b.practiceId || 'chưa có phiên'}): ${b.problems.join('; ')}`);
if (FINISH) {
  const ids = results.map((r) => r.practiceId).filter(Boolean);
  const left = await waitScores(ids);
  const done = Object.values(scoreState);
  console.log(`■ Chấm điểm: xong ${done.filter((x) => x.st === 'completed').length}/${ids.length}, lỗi ${done.filter((x) => x.st === 'scoring_failed').length}, chưa xong ${left.size}`);
  if (done.length) console.log(`  thời gian tới khi có điểm: p50 ${pct(done.map((x) => x.t), 50) / 1000} s · max ${Math.max(...done.map((x) => x.t)) / 1000} s`);
}
console.log('\nPhiên thử (để xoá):', results.map((r) => r.practiceId).filter(Boolean).map((x) => `'${x}'`).join(','));
process.exit(bad.length ? 1 : 0);
