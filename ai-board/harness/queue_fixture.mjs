// Harness-owned fixture; run only against Gate 5's disposable database (DATABASE_URL of the candidate container).
import { randomBytes } from 'node:crypto';
import { createPgDb } from '/app/server/ai-board/db/index.js';
import { createAsyncAiBoardStore } from '/app/server/ai-board/store-async.js';
const db = createPgDb({ url: process.env.DATABASE_URL, max: 1 });
const now = Date.now();
const stage = process.argv[2];
async function seedUser() {
  const { id } = await db.get(`INSERT INTO users(username,display_name,password_hash,role,enrolled_domain,major,created_at)
    VALUES ('verify-queue','Queue Verify','!','student','it','it',?)
    ON CONFLICT(lower(username)) DO UPDATE SET major='it',enrolled_domain='it' RETURNING id`, [now]);
  const token = randomBytes(32).toString('hex');
  await db.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES (?,?,?,?)', [token, id, now, now + 900000]);
  return { token, id };
}
try {
  if (stage === 'session') {
    console.log(JSON.stringify({ token: (await seedUser()).token }));
  } else if (stage === 'seed') {
    const { token, id } = await seedUser();
    const request = await createAsyncAiBoardStore(db).createRequestWithRoot({ ownerUserId: Number(id), ownerDomain: 'it',
      ownerDisplayName: 'Queue Verify', title: 'Ẩn ETA khi worker tắt', detail: 'Functional probe', idempotencyKey: 'verify-queue-request-001' });
    await db.run(`INSERT INTO ai_workers(worker_id,version,mode,status,last_seen_at,updated_at)
      VALUES ('verify-queue','probe','off','idle',?,?)
      ON CONFLICT(worker_id) DO UPDATE SET version=excluded.version, mode=excluded.mode, status=excluded.status,
        last_seen_at=excluded.last_seen_at, updated_at=excluded.updated_at`, [now, now]);
    console.log(JSON.stringify({ token, request_id: request.request_id }));
  } else if (stage === 'thread') {
    const { token, id } = await seedUser();
    const aiBody = ['Chào bạn,', 'Đã xem yêu cầu & sẽ <làm> sớm.', '- bước 1', '- bước 2'].join('\n');
    const requestId = await db.insert(`INSERT INTO requests(domain,type,title,detail,student,status,votes,created_at,updated_at,owner_user_id,owner_domain)
      VALUES ('it','other','Hỏi thử','Cho em hỏi một câu','Queue Verify','reviewing',1,?,?,?,'it')`, [now, now, id]);
    await db.run("INSERT INTO request_messages(request_id,role,author_name,body,created_at) VALUES (?,'ai','Ban điều hành AI',?,?)",
      [requestId, aiBody, now + 1]);
    console.log(JSON.stringify({ token, request_id: Number(requestId), student: 'Queue Verify',
      student_body: 'Cho em hỏi một câu', ai_body: aiBody }));
  } else {
    await db.run('UPDATE ai_workers SET mode=?,status=?,last_seen_at=?,updated_at=? WHERE worker_id=?',
      [stage === 'offline' ? 'off' : 'active', stage === 'busy' ? 'running' : 'idle',
        stage === 'stale' ? now - 180000 : now, now, 'verify-queue']);
  }
} finally {
  await db.close();
}
