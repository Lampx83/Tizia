// Harness-owned fixture; run only against Gate 5's disposable database.
import Database from 'better-sqlite3';
import { randomBytes } from 'node:crypto';
import { createAiBoardStore } from '/app/server/ai-board/store.js';
const db = new Database('/data/tizia.db');
const now = Date.now();
const stage = process.argv[2];
if (stage === 'seed') {
  db.prepare(`INSERT INTO users(username,display_name,password_hash,role,enrolled_domain,major,created_at)
    VALUES ('verify-queue','Queue Verify','!','student','it','it',?)
    ON CONFLICT(username) DO UPDATE SET major='it',enrolled_domain='it'`).run(now);
  const {id} = db.prepare("SELECT id FROM users WHERE username='verify-queue'").get();
  const token = randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES (?,?,?,?)').run(token,id,now,now+120000);
  const request = createAiBoardStore(db).createRequestWithRoot({ownerUserId:Number(id),ownerDomain:'it',
    ownerDisplayName:'Queue Verify',title:'Ẩn ETA khi worker tắt',detail:'Functional probe',idempotencyKey:'verify-queue-request-001'});
  db.prepare(`INSERT OR REPLACE INTO ai_workers(worker_id,version,mode,status,last_seen_at,updated_at)
    VALUES ('verify-queue','probe','off','idle',?,?)`).run(now,now);
  console.log(JSON.stringify({token,request_id:request.request_id}));
} else {
  db.prepare('UPDATE ai_workers SET mode=?,status=?,last_seen_at=?,updated_at=? WHERE worker_id=?')
    .run(stage === 'offline' ? 'off' : 'active',stage === 'busy' ? 'running' : 'idle',
      stage === 'stale' ? now-180000 : now,now,'verify-queue');
}
db.close();
