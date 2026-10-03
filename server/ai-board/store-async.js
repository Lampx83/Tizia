// Async AI board store on the db contract (db/index.js): one code path for SQLite and PostgreSQL.
// Port of store.js (the sync store stays the default until AI_BOARD_DB=postgres is wired): same checks, errors,
// events and state transitions; parity tests in test/ai-board-async-*.test.js compare final board state per feature.
import { randomBytes } from 'node:crypto';
import { CAPABILITY_CATALOG, isSelfEditable, PlanGuardrailError, validatePlan } from './policy.js';
import { registerRelease } from './releases-async.js';
import { repeatedQuestion } from './clarity-rules.js';
import {
  ACTIVE_ONLY, AI_BRANCH, ANY_QUEUE, CLAIM_INTENTS, CLARIFYING_NOTE, CLARIFY_AUTHOR, CONTRACT, DAY_MS, EVENT_TYPES,
  IDEMPOTENCY_KEY as KEY, LEASE_MS, LIMITS, MAX_BUDGET_EXTENSION, MAX_BUDGET_EXTENSIONS, MAX_BUDGET_LIMIT, MAX_TRACE_BATCH,
  PHASES, PLAN_QUEUE, PR_BASE, PR_URL, REQUEST_TYPES, ROLLBACK_OUTCOMES, RUN_TRIGGERS, RequestValidationError, SELF_TAG,
  SELF_USER, SHA, SPEC_AUTHOR, WORKER_MODES, WorkerContractError, assertConfirmed, cleanAttachments, cleanModelCall,
  parseAttachments, parseJson, progressDetail, runProgress, scaledLimit, summarizeCalls, triggerFor, validateCandidate,
  validatePrePrVerdict,
} from './store.js';

export { PlanGuardrailError };

export function createAsyncAiBoardStore(db, hooks = {}) {
  // Dialect-specific SQL fragments (json access) built from the contract.
  const ownerGpuS = (owner) => `(SELECT COALESCE(SUM(${db.jsonNum('g.evidence_json', 'budget_units')}), 0)
    FROM ai_gate_traces g JOIN ai_runs gr ON gr.id = g.run_id JOIN ai_tickets gt ON gt.id = gr.ticket_id
    JOIN requests grq ON grq.id = gt.source_request_id
    WHERE g.status = 'model_call' AND g.created_at > ? AND grq.owner_user_id = ${owner})`;
  const OWNER_GPU_S = ownerGpuS('r.owner_user_id');
  const FAIR_ORDER = `r.type = 'self' ASC, t.priority DESC,
    COALESCE((SELECT MAX(se.created_at) FROM ai_events se JOIN ai_tickets st ON st.id = se.ticket_id
      JOIN requests sq ON sq.id = st.source_request_id
      WHERE se.transition = 'queued->running' AND sq.owner_user_id = r.owner_user_id), 0) ASC,
    t.created_at ASC, t.id ASC`;
  const findRetry = `
    SELECT r.id AS request_id, t.id AS root_ticket_id
    FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
    WHERE r.owner_user_id = ? AND r.idempotency_key = ?
  `;
  const insertRequest = `
    INSERT INTO requests (
      domain, type, title, detail, student, status, votes, created_at, updated_at,
      attachments, owner_user_id, owner_domain, idempotency_key, owner_state, folder_id
    ) VALUES (?, ?, ?, ?, ?, 'pending', 1, ?, ?, ?, ?, ?, ?, 'verified', ?)
  `;
  const insertRoot = `
    INSERT INTO ai_tickets (
      source_request_id, sequence, kind, title, description, status, phase,
      priority, public_note, internal_reason, created_at, updated_at
    ) VALUES (?, 0, 'root', ?, ?, 'queued', ?, 0, ?, NULL, ?, ?)
  `;
  const insertTag = 'INSERT INTO ai_ticket_tags(ticket_id, tag) VALUES (?, ?) ON CONFLICT DO NOTHING';
  const insertEvent = `
    INSERT INTO ai_events (
      ticket_id, event_type, actor_type, actor_id, transition,
      public_message, internal_detail, idempotency_key, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Đưa root sang trạng thái mới và nhả lease: worker đang giữ sẽ gặp stale_lease ở heartbeat/verdict kế tiếp rồi dừng.
  // reason bỏ trống = giữ internal_reason cũ; onlyOpen: root đã 'cancelled' thì không ghi đè; event ghi 1 lần theo idem.
  async function closeRoot(root, { status, phase, note, reason, onlyOpen = false, event, now }) {
    await db.run(`
      UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?,
        lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=?
      WHERE id=?${onlyOpen ? " AND status != 'cancelled'" : ''}
    `, [status, phase, note, reason === undefined ? root.internal_reason : reason, now, root.id]);
    await db.run(`UPDATE ai_workers SET status='idle', current_ticket_id=NULL, updated_at=? WHERE current_ticket_id=?`, [now, root.id]);
    if (!await db.get('SELECT 1 FROM ai_events WHERE ticket_id=? AND idempotency_key=?', [root.id, event.idem])) {
      await db.run(insertEvent, [root.id, event.type, event.actorType, String(event.actorId), `${root.status}->${status}`,
        note, event.detail ?? null, event.idem, now]);
    }
  }

  const createRequestTransaction = (input) => db.tx(async () => {
    const retry = await db.get(findRetry, [input.ownerUserId, input.idempotencyKey]);
    if (retry) return { ...retry, created: false };
    const now = input.now ?? Date.now();
    const folderId = await folderForRequest(input, now);
    const requestId = await db.insert(insertRequest, [
      input.ownerDomain,
      input.selfTarget ? 'self' : REQUEST_TYPES.has(input.type) ? input.type : 'other',
      String(input.title).trim().slice(0, 200),
      input.detail ? String(input.detail).slice(0, 10000) : null,
      String(input.ownerDisplayName || input.ownerUserId).slice(0, 60),
      now, now, cleanAttachments(input.attachments), input.ownerUserId, input.ownerDomain, input.idempotencyKey, folderId,
    ]);
    await hooks.afterRequestInserted?.({ requestId, input });
    // clarifying: chưa vào hàng đợi worker cho tới khi người gửi xác nhận spec.
    const rootTicketId = await db.insert(insertRoot, [
      requestId, input.title, input.detail || null, input.clarifying ? 'clarifying' : 'intake',
      input.clarifying ? CLARIFYING_NOTE : 'Yêu cầu đã được ghi nhận và đang chờ xử lý.', now, now,
    ]);
    await db.run(insertTag, [rootTicketId, 'request']);
    await db.run(insertTag, [rootTicketId, `domain:${input.ownerDomain}`]);
    await db.run(insertEvent, [rootTicketId, 'request_created', 'requester', String(input.ownerUserId),
      'created->queued', 'Yêu cầu đã được ghi nhận.', null,
      `request-created:${input.idempotencyKey}`, now,]);
    if (folderId) await db.run(insertTag, [rootTicketId, `folder:${folderId}`]);
    if (input.selfTarget) await db.run(insertTag, [rootTicketId, `${SELF_TAG}${input.selfTarget}`]);
    return { request_id: requestId, root_ticket_id: rootTicketId, folder_id: folderId, created: true };
  });

  // ── Folder chức năng ──
  const OPEN_FOLDER_STATES = "('draft', 'active', 'awaiting_merge')";

  /** Folder của yêu cầu mới: gắn vào folder của chính người gửi, hoặc loại 'feature' thì tạo folder mới. */
  async function folderForRequest(input, now) {
    if (input.folderId) {
      const folder = await db.get('SELECT * FROM ai_feature_folders WHERE id=?', [Number(input.folderId)]);
      if (!folder || folder.owner_user_id !== input.ownerUserId || folder.state === 'archived') {
        throw new RequestValidationError('Không tìm thấy chức năng này trong danh sách của bạn.');
      }
      await db.run('UPDATE ai_feature_folders SET last_activity_at=?, updated_at=? WHERE id=?', [now, now, folder.id]);
      return folder.id;
    }
    if (input.type !== 'feature') return null;
    const cap = LIMITS.open_folders_per_user.value;
    const open = (await db.get(`SELECT COUNT(*) AS n FROM ai_feature_folders WHERE owner_user_id=? AND state IN ${OPEN_FOLDER_STATES}`, [input.ownerUserId])).n;
    if (open >= cap) {
      throw new RequestValidationError(`Bạn đang có ${cap} chức năng chưa xong. Lưu trữ bớt một chức năng rồi tạo mới nhé.`);
    }
    const title = String(input.title).trim().slice(0, 120);
    return await db.insert(`
      INSERT INTO ai_feature_folders (slug, title, owner_user_id, domain, state, created_at, updated_at, last_activity_at)
      VALUES (?, ?, ?, ?, 'draft', ?, ?, ?)
    `, [await uniqueSlug(title), title, input.ownerUserId, input.ownerDomain, now, now, now]);
  }

  async function uniqueSlug(title) {
    const base = String(title).normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/gi, 'd').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/, '') || 'chuc-nang';
    const taken = 'SELECT 1 FROM ai_feature_folders WHERE slug=?';
    let slug = base;
    for (let i = 2; await db.get(taken, [slug]); i += 1) slug = `${base}-${i}`;
    return slug;
  }

  const folderRow = (f) => f && ({ id: f.id, slug: f.slug, title: f.title, domain: f.domain, state: f.state,
    approved: !!f.approved_at, owner_user_id: f.owner_user_id, requests: f.requests ?? 0, votes: f.votes ?? 0,
    has_change: !!f.branch, cycle: f.cycle ?? 1, created_at: f.created_at, last_activity_at: f.last_activity_at });
  const FOLDER_COLUMNS = `f.*,
    (SELECT COUNT(*) FROM requests fr WHERE fr.folder_id = f.id) AS requests,
    (SELECT COUNT(*) FROM ai_feature_folder_votes fv WHERE fv.folder_id = f.id) AS votes`;

  /** Folder của 1 người (FAB "Chức năng của bạn") + folder người khác cùng trường (chỉ xem, vote). */
  async function listFolders(userId, domain) {
    await archiveStaleFolders();
    const rows = await db.all(`
      SELECT ${FOLDER_COLUMNS},
        EXISTS(SELECT 1 FROM ai_feature_folder_votes v WHERE v.folder_id = f.id AND v.user_id = ?) AS voted
      FROM ai_feature_folders f WHERE f.domain = ? AND (f.state <> 'archived' OR f.owner_user_id = ?)
      ORDER BY f.state = 'archived', f.last_activity_at DESC LIMIT 100
    `, [Number(userId), String(domain || ''), Number(userId)]);
    const mine = [];
    const school = [];
    for (const f of rows) (f.owner_user_id === Number(userId) ? mine : school).push({ ...folderRow(f), voted: !!f.voted });
    return { mine, school: school.map(({ owner_user_id: _owner, ...f }) => f) };
  }

  async function voteFolder(folderId, userId, now = Date.now()) {
    const folder = await db.get('SELECT * FROM ai_feature_folders WHERE id=?', [Number(folderId)]);
    if (!folder || folder.state === 'archived') throw new WorkerContractError('folder not found', 404, 'folder_not_found');
    if (folder.owner_user_id === Number(userId)) throw new WorkerContractError('cannot vote own folder', 409, 'own_folder');
    await db.run('INSERT INTO ai_feature_folder_votes(folder_id, user_id, created_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING', [folder.id, Number(userId), now]);
    return { ok: true, voted: true, votes: (await db.get('SELECT COUNT(*) AS n FROM ai_feature_folder_votes WHERE folder_id=?', [folder.id])).n };
  }

  async function unvoteFolder(folderId, userId) {
    const folder = await db.get('SELECT id FROM ai_feature_folders WHERE id=?', [Number(folderId)]);
    if (!folder) throw new WorkerContractError('folder not found', 404, 'folder_not_found');
    await db.run('DELETE FROM ai_feature_folder_votes WHERE folder_id=? AND user_id=?', [folder.id, Number(userId)]);
    return { ok: true, voted: false, votes: (await db.get('SELECT COUNT(*) AS n FROM ai_feature_folder_votes WHERE folder_id=?', [folder.id])).n };
  }

  /** Admin: mọi folder (tab "Chức năng"): trạng thái, số yêu cầu, GPU-s đã dùng, trace của root mới nhất. */
  async function listAdminFolders(limit = 200) {
    await archiveStaleFolders();
    const folders = await db.all(`
      SELECT ${FOLDER_COLUMNS}, u.display_name AS owner_name,
        (SELECT COALESCE(SUM(${db.jsonNum('g.evidence_json', 'budget_units')}), 0)
          FROM ai_gate_traces g JOIN ai_runs gr ON gr.id = g.run_id JOIN ai_tickets gt ON gt.id = gr.ticket_id
          JOIN requests gq ON gq.id = gt.source_request_id WHERE g.status = 'model_call' AND gq.folder_id = f.id) AS gpu_s,
        (SELECT t.id FROM ai_tickets t JOIN requests q ON q.id = t.source_request_id
          WHERE q.folder_id = f.id AND t.parent_id IS NULL ORDER BY t.id DESC LIMIT 1) AS latest_root_id
      FROM ai_feature_folders f LEFT JOIN users u ON u.id = f.owner_user_id
      ORDER BY f.last_activity_at DESC LIMIT ?
    `, [Math.min(Math.max(Number(limit) || 200, 1), 500)]);
    const out = [];
    for (const f of folders) {
      out.push({ ...folderRow(f), owner_name: f.owner_name,
        gpu_s: Math.round(f.gpu_s),
        // Chu kỳ đang mở: nhánh/đỉnh/PR của folder; chưa có thì trace của root mới nhất.
        trace_ref: f.branch ? { branch: f.branch, head_sha: f.head_sha, pr_number: f.pr_number, pr_url: f.pr_url }
          : f.latest_root_id ? await traceRef(f.latest_root_id) : null });
    }
    return out;
  }

  /** Admin duyệt folder 1 lần: plan đang chờ CHỈ vì folder chưa duyệt được cho phép luôn; lượt sau tự chạy. */
  const approveFolderTransaction = (folderId, adminUserId, now) => db.tx(async () => {
    const folder = await db.get('SELECT * FROM ai_feature_folders WHERE id=?', [Number(folderId)]);
    if (!folder) throw new WorkerContractError('folder not found', 404, 'folder_not_found');
    await db.run(`UPDATE ai_feature_folders SET approved_by=?, approved_at=?, updated_at=?,
      state=CASE WHEN state='draft' THEN 'active' ELSE state END WHERE id=?`, [Number(adminUserId), now, now, folder.id]);
    await registerRelease(db, folder, adminUserId, now); // cờ phát hành, mặc định chỉ người tạo
    const waiting = await db.all(`
      SELECT t.id, t.plan_hash FROM ai_tickets t JOIN requests q ON q.id = t.source_request_id
      WHERE q.folder_id = ? AND t.parent_id IS NULL AND t.status = 'waiting_authorization'
        AND t.internal_reason = 'folder_not_approved'
    `, [folder.id]);
    for (const root of waiting) await authorizePlanTransaction(root.id, root.plan_hash, adminUserId, now);
    return { ok: true, authorized: waiting.length };
  });

  async function approveFolder(folderId, adminUserId) {
    return await approveFolderTransaction(folderId, adminUserId, Date.now());
  }

  /** Bản mô tả chức năng tính lúc đọc từ DB, không lưu riêng nên không lệch thực tế:
      L1 = mục đích/luồng (2 câu trả lời đầu của lượt làm rõ đầu tiên), Đã làm (lượt đạt), Đang yêu cầu (còn mở),
      file sở hữu (file trong candidate đạt); L3 = 2 yêu cầu gần nhất nguyên văn. Trần: contract.json limits.context.
      ponytail: vượt trần thì bỏ mục cũ nhất (tất định); gộp bằng model nhỏ khi folder dài thật sự. */
  async function folderBrief(folderId) {
    const cap = LIMITS.context;
    const folder = await db.get('SELECT id, title, slug FROM ai_feature_folders WHERE id=?', [Number(folderId)]);
    if (!folder) return null;
    const rows = await db.all(`
      SELECT q.id, q.title, q.detail, q.clarified_spec, t.status, t.id AS root_id,
        (SELECT ar.evidence_json FROM ai_runs ar WHERE ar.ticket_id = t.id AND ar.outcome IN ('ready_for_pr', 'needs_review')
          ORDER BY ar.id DESC LIMIT 1) AS passed
      FROM requests q JOIN ai_tickets t ON t.source_request_id = q.id AND t.parent_id IS NULL
      WHERE q.folder_id = ? ORDER BY q.id
    `, [folder.id]);
    const clip = (s, n) => { const t = String(s ?? '').replace(/\s+/g, ' ').trim(); return t.length > n ? `${t.slice(0, n - 1)}…` : t; };
    const answers = rows.length ? (await db.all(`
      SELECT body FROM request_messages WHERE request_id = ? AND role = 'student'
        AND id > COALESCE((SELECT MIN(id) FROM request_messages WHERE request_id = ? AND role = 'ai'), 1e18)
      ORDER BY id LIMIT 2
    `, [rows[0].id, rows[0].id])).map((m) => m.body) : [];
    const done = [];
    const requested = [];
    const files = new Set();
    for (const row of rows) {
      const candidate = parseJson(row.passed)?.verdict?.candidate;
      if (candidate) {
        done.push(clip(row.title, 120));
        for (const commit of candidate.commits || []) {
          for (const file of commit.files || []) if (!/^tests?\//.test(file)) files.add(file);
        }
      } else if (!['cancelled', 'done'].includes(row.status)) requested.push(clip(row.title, 120));
    }
    // Trang = slug folder: cờ phát hành mở/ẩn đúng /<slug>.html, module ở js/features/<slug>/.
    const lines = [`Chức năng: ${clip(folder.title, 120)} · trang: public/${folder.slug}.html · module: public/js/features/${folder.slug}/index.js`];
    if (answers[0]) lines.push(`Mục đích: ${clip(answers[0], 300)}`);
    if (answers[1]) lines.push(`Luồng người dùng: ${clip(answers[1], 300)}`);
    const owned = [...files].slice(-cap.owned_files);
    if (owned.length) lines.push(`File sở hữu: ${owned.join(', ')}`);
    if (requested.length) lines.push('Đang yêu cầu:', ...requested.map((r) => `- ${r}`));
    // Đã làm: mới nhất trước; vượt trần thì bỏ mục cũ nhất, ghi số đã bỏ.
    const doneLines = done.reverse().map((d) => `- ${d}`);
    let text = lines.join('\n');
    let kept = 0;
    const RESERVE = 40; // chỗ cho dòng "(+N việc cũ hơn đã làm)"
    while (kept < doneLines.length
      && `${text}\nĐã làm (mới nhất trước):\n${doneLines.slice(0, kept + 1).join('\n')}`.length <= cap.brief_chars - RESERVE) {
      kept += 1;
    }
    if (kept) text += `\nĐã làm (mới nhất trước):\n${doneLines.slice(0, kept).join('\n')}`;
    if (kept < doneLines.length) text += `\n(+${doneLines.length - kept} việc cũ hơn đã làm)`;
    const recent = rows.slice(-2).map((r) => `[#${r.id}] ${clip(r.title, 150)}: ${clip(r.clarified_spec || r.detail, 330)}`)
      .join('\n').slice(0, cap.recent_chars);
    return { text: text.slice(0, cap.brief_chars), recent, owned_files: owned };
  }

  // ── Vòng đời folder: draft → active → awaiting_merge → released → archived; mở lại → chu kỳ mới ──
  /** Đóng chu kỳ + lưu trữ; nhánh chưa merge ghi vào event để dọn trên GitHub.
      ponytail: xoá nhánh remote do người/cron làm theo event folder_archived; worker chưa có job dọn. */
  async function archiveFolderRow(folder, reason, actorId, now) {
    await db.run(`UPDATE ai_feature_folders SET state='archived', branch=NULL, head_sha=NULL, pr_number=NULL, pr_url=NULL,
      cycle=CASE WHEN branch IS NULL THEN cycle ELSE cycle + 1 END, updated_at=? WHERE id=?`, [now, folder.id]);
    const root = await db.get(`SELECT t.id FROM ai_tickets t JOIN requests q ON q.id = t.source_request_id
      WHERE q.folder_id = ? AND t.parent_id IS NULL ORDER BY t.id DESC LIMIT 1`, [folder.id]);
    if (root) {
      await db.run(insertEvent, [root.id, 'folder_archived', actorId ? 'requester' : 'system', String(actorId ?? 'lifecycle'),
        `${folder.state}->archived`, 'Chức năng đã được lưu trữ.',
        JSON.stringify({ folder_id: folder.id, reason, unmerged_branch: folder.branch, pr_number: folder.pr_number }),
        `folder-archived:${folder.id}:${now}`, now]);
    }
  }

  /** Lưu trữ folder im lặng quá limits.folder_archive_days. Gọi lúc đọc danh sách: tất định, không cần cron. */
  async function archiveStaleFolders(now = Date.now()) {
    const cutoff = now - LIMITS.folder_archive_days.value * DAY_MS;
    const stale = await db.all(`SELECT * FROM ai_feature_folders WHERE state <> 'archived' AND last_activity_at < ?`, [cutoff]);
    for (const folder of stale) await archiveFolderRow(folder, 'inactive', null, now);
    return stale.length;
  }

  async function archiveFolder(folderId, ownerUserId, now = Date.now()) {
    const folder = await db.get('SELECT * FROM ai_feature_folders WHERE id=?', [Number(folderId)]);
    if (!folder || folder.owner_user_id !== Number(ownerUserId)) throw new WorkerContractError('folder not found', 404, 'folder_not_found');
    if (folder.state !== 'archived') await archiveFolderRow(folder, 'owner', ownerUserId, now);
    return { ok: true, state: 'archived' };
  }

  /** Mở lại folder đã lưu trữ/đã phát hành: chu kỳ mới (nhánh mới từ dev khi có lượt đạt), giữ lịch sử + brief. */
  async function reopenFolder(folderId, ownerUserId, now = Date.now()) {
    const folder = await db.get('SELECT * FROM ai_feature_folders WHERE id=?', [Number(folderId)]);
    if (!folder || folder.owner_user_id !== Number(ownerUserId)) throw new WorkerContractError('folder not found', 404, 'folder_not_found');
    if (!['archived', 'released'].includes(folder.state)) return { ok: true, state: folder.state };
    const open = (await db.get(`SELECT COUNT(*) AS n FROM ai_feature_folders WHERE owner_user_id=? AND state IN ${OPEN_FOLDER_STATES}`, [folder.owner_user_id])).n;
    if (open >= LIMITS.open_folders_per_user.value) {
      throw new WorkerContractError('too many open folders', 409, 'folder_limit');
    }
    const state = folder.approved_at ? 'active' : 'draft';
    await db.run('UPDATE ai_feature_folders SET state=?, last_activity_at=?, updated_at=? WHERE id=?', [state, now, now, folder.id]);
    return { ok: true, state };
  }

  /** Người tạo bấm "Xong": chu kỳ này chờ con người merge PR (gate 6, không tự động). */
  async function markFolderDone(folderId, ownerUserId, now = Date.now()) {
    const folder = await db.get('SELECT * FROM ai_feature_folders WHERE id=?', [Number(folderId)]);
    if (!folder || folder.owner_user_id !== Number(ownerUserId)) throw new WorkerContractError('folder not found', 404, 'folder_not_found');
    if (!folder.branch) throw new WorkerContractError('folder has no change yet', 409, 'nothing_to_merge');
    await db.run("UPDATE ai_feature_folders SET state='awaiting_merge', updated_at=?, last_activity_at=? WHERE id=?", [now, now, folder.id]);
    return { ok: true, state: 'awaiting_merge' };
  }

  /** Admin xác nhận PR của chu kỳ đã merge: phát hành; yêu cầu sau mở chu kỳ mới (nhánh mới từ dev, giữ lịch sử).
      ponytail: admin bấm tay; tự nhận merge qua GitHub khi worker có token (Candidates.merged). */
  async function markFolderReleased(folderId, now = Date.now()) {
    const changed = (await db.run(`UPDATE ai_feature_folders SET state='released', branch=NULL, head_sha=NULL, pr_number=NULL,
      pr_url=NULL, cycle=cycle+1, updated_at=? WHERE id=? AND branch IS NOT NULL`, [now, Number(folderId)])).changes;
    if (!changed) throw new WorkerContractError('folder has no open cycle', 409, 'nothing_to_release');
    return { ok: true, state: 'released' };
  }

  /** Thu hồi: các plan sau của folder lại chờ admin. Việc đang chạy không bị cắt. */
  async function revokeFolder(folderId, now = Date.now()) {
    const changed = (await db.run('UPDATE ai_feature_folders SET approved_by=NULL, approved_at=NULL, updated_at=? WHERE id=?', [now, Number(folderId)])).changes;
    if (!changed) throw new WorkerContractError('folder not found', 404, 'folder_not_found');
    return { ok: true };
  }

  async function createRequestWithRoot(input) {
    if (!Number.isInteger(Number(input.ownerUserId)) || Number(input.ownerUserId) <= 0) throw new RequestValidationError('ownerUserId is required');
    const domain = String(input.ownerDomain || '').trim();
    if (!domain) throw new RequestValidationError('ownerDomain is required');
    const title = String(input.title || '').trim();
    if (title.length < 4) throw new RequestValidationError('title is too short');
    const idempotencyKey = String(input.idempotencyKey || '').trim();
    if (!KEY.test(idempotencyKey)) throw new RequestValidationError('invalid idempotency key');
    return await createRequestTransaction({
      ...input,
      ownerUserId: Number(input.ownerUserId),
      ownerDomain: domain.slice(0, 40),
      title,
      idempotencyKey,
    });
  }

  /** Người dùng hệ thống `ai-board` (tạo lần đầu, không đăng nhập được). Tên đã thuộc tài khoản thật → 409. */
  async function selfUserId() {
    const user = await db.get('SELECT id, role FROM users WHERE username = ?', [SELF_USER]);
    if (user && user.role !== 'system') {
      throw new WorkerContractError(`username ${SELF_USER} belongs to a real account`, 409, 'self_user_conflict');
    }
    return user?.id ?? Number(await db.insert(`INSERT INTO users(username, display_name, password_hash, role, created_at)
      VALUES (?, 'Ban điều hành AI', '!', 'system', ?)`, [SELF_USER, Date.now()]));
  }

  /** Worker tạo yêu cầu self (board tự sửa 1 file trong vùng cho phép). File ngoài vùng → 422. */
  const createSelfRequest = ({ title, detail, targetFile, idempotencyKey }) => db.tx(async () => {
    const target = String(targetFile ?? '').trim();
    if (!isSelfEditable(target)) {
      throw new WorkerContractError(`target file outside the self-edit area: ${target.slice(0, 200)}`, 422,
        'self_target_outside_area');
    }
    return await createRequestWithRoot({ ownerUserId: await selfUserId(), ownerDomain: SELF_USER, ownerDisplayName: SELF_USER,
      idempotencyKey, title, detail, selfTarget: target });
  });

  async function listRequestsForOwner(ownerUserId, domain, limit = 50) {
    const rows = await db.all(`
      SELECT r.id, r.domain, r.type, r.title, r.detail, r.student, r.status, r.votes,
             r.admin_note, r.created_at, r.updated_at, r.attachments,
             t.id AS root_ticket_id, t.status AS workflow_status, t.phase,
             t.public_note,
             (SELECT ar.outcome FROM ai_runs ar WHERE ar.ticket_id=t.id AND ar.outcome IS NOT NULL ORDER BY ar.id DESC LIMIT 1) AS pre_pr_verdict,
             (SELECT ar.gate FROM ai_runs ar WHERE ar.ticket_id=t.id AND ar.outcome IS NOT NULL ORDER BY ar.id DESC LIMIT 1) AS pre_pr_gate
      FROM requests r
      LEFT JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
      WHERE r.owner_user_id = ? AND r.domain = ?
      ORDER BY r.updated_at DESC LIMIT ?
    `, [Number(ownerUserId), String(domain || ''), Math.min(Math.max(Number(limit) || 50, 1), 200)]);
    const queue = await queueInfo(ownerUserId);
    const out = [];
    for (const row of rows) {
      out.push({ ...row, attachments: parseAttachments(row.attachments),
        status_label: (await requestWorkflow(row.id))?.status_label ?? null,
        queue: row.workflow_status === 'queued' ? queue.get(row.root_ticket_id) ?? null : null });
    }
    return out;
  }

  /** Map rootId → {position, eta_s, deferred} cho root đang chờ của 1 người, theo đúng thứ tự FAIR_ORDER của claim. */
  async function requestWorkflow(requestId) {
    const root = await db.get('SELECT status, phase, public_note FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL', [Number(requestId)]);
    if (!root) return null;
    return { workflow_status: root.status, phase: root.phase, public_note: root.public_note,
      status_label: root.status === 'waiting_authorization' ? 'chờ quản trị viên cho phép'
        : PHASES[root.phase]?.label ?? root.public_note ?? null };
  }

  async function queueInfo(ownerUserId, now = Date.now()) {
    const waiting = await db.all(`
      SELECT t.id, t.priority, t.created_at, r.owner_user_id,
        COALESCE((SELECT MAX(se.created_at) FROM ai_events se JOIN ai_tickets st ON st.id = se.ticket_id
          JOIN requests sq ON sq.id = st.source_request_id
          WHERE se.transition = 'queued->running' AND sq.owner_user_id = r.owner_user_id), 0) AS served
      FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
      WHERE t.kind = 'root' AND t.status = 'queued' AND t.phase <> 'clarifying' AND r.owner_state = 'verified'
        AND r.type <> 'self'
    `);
    // Mô phỏng các lượt claim liên tiếp theo FAIR_ORDER: người vừa được phục vụ xuống cuối vòng.
    // ponytail: O(n²) trên hàng đợi; đủ cho vài trăm root đang chờ.
    const served = new Map(waiting.map((w) => [w.owner_user_id, w.served]));
    const order = [];
    let tick = now;
    while (waiting.length) {
      waiting.sort((a, b) => b.priority - a.priority || served.get(a.owner_user_id) - served.get(b.owner_user_id)
        || a.created_at - b.created_at || a.id - b.id);
      const next = waiting.shift();
      order.push(next);
      served.set(next.owner_user_id, (tick += 1));
    }
    // Thời lượng trung bình 20 lượt gần nhất (tường), tối thiểu 60 s khi chưa có dữ liệu.
    const avg = (await db.get(`
      SELECT AVG(updated_at - created_at) AS ms FROM (
        SELECT updated_at, created_at FROM ai_runs WHERE outcome IS NOT NULL ORDER BY id DESC LIMIT 20) recent
    `))?.ms;
    const runS = Math.max(Math.round((avg || 0) / 1000), 60);
    const used = (await db.get(`SELECT ${ownerGpuS('?')} AS s`, [now - DAY_MS, Number(ownerUserId)])).s;
    const deferred = used >= LIMITS.gpu_s_per_user_day.loose;
    const workerReady = !!await db.get(`SELECT 1 FROM ai_workers WHERE mode='active'
      AND status IN ('idle', 'running') AND last_seen_at > ? LIMIT 1`, [now - 120_000]);
    const out = new Map();
    order.forEach((row, i) => {
      if (row.owner_user_id === Number(ownerUserId)) out.set(row.id, {
        position: i + 1, eta_s: workerReady ? (i + 1) * runS : null, deferred, worker_ready: workerReady,
      });
    });
    return out;
  }

  /** Số root chưa xong của 1 người (đang chờ làm rõ, xếp hàng hoặc đang chạy): trần limits.pending_roots_per_user.
      Gửi lại cùng Idempotency-Key → 0 (store sẽ trả yêu cầu cũ, không tạo mới). */
  async function countPendingRoots(ownerUserId, idempotencyKey = null) {
    if (idempotencyKey && await db.get(findRetry, [Number(ownerUserId), String(idempotencyKey).trim()])) return 0;
    return (await db.get(`
      SELECT COUNT(*) AS n FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
      WHERE t.kind = 'root' AND r.owner_user_id = ? AND t.status IN ('queued', 'running')
    `, [Number(ownerUserId)])).n;
  }

  // Admin reject = cancel the whole root, like cancelRequestTransaction; every statement is a no-op on repeat.
  async function closeRootForAdmin(root, actorId, note, now) {
    await closeRoot(root, {
      status: 'cancelled', phase: 'admin_rejected', note: note || 'Quản trị viên đã từ chối yêu cầu.', reason: 'admin_rejected',
      onlyOpen: true, now,
      event: { type: 'request_rejected', actorType: 'admin', actorId, detail: 'admin_rejected', idem: `request-rejected:${root.id}` },
    });
    await db.run(`
      UPDATE ai_tickets SET status='cancelled', internal_reason='admin_rejected', updated_at=?
      WHERE parent_id=? AND status NOT IN ('done', 'failed', 'invalidated', 'cancelled')
    `, [now, root.id]);
    await db.run(`UPDATE ai_alerts SET status='resolved', updated_at=? WHERE ticket_id=? AND status='open'`, [now, root.id]);
  }

  // requests.status/admin_note are derived by trigger ai_root_request_status (migration 017)
  // from the root ticket, so an admin action only writes the root and its audit event.
  const adminRequestTransaction = (requestId, rejecting, note, actorId) => db.tx(async () => {
    const root = await db.get('SELECT id, status FROM ai_tickets WHERE source_request_id = ? AND parent_id IS NULL', [requestId]);
    if (!root) return false;
    const now = Date.now();
    // Random suffix: two admin posts in the same millisecond must not collide on the unique key.
    await db.run(insertEvent, [root.id, 'request_status_changed', 'admin', String(actorId), null,
      note, rejecting ? 'request rejected' : 'request noted', `status:${requestId}:${now}:${randomBytes(4).toString('hex')}`, now,]);
    if (rejecting) await closeRootForAdmin(root, actorId, note, now);
    else await db.run('UPDATE ai_tickets SET public_note=COALESCE(?, public_note), updated_at=? WHERE id=?', [note, now, root.id]); // An admin note does not complete a worker run.
    return true;
  });

  const adminNote = (note) => (note ? String(note).slice(0, 500) : null);
  const rejectRequest = async (requestId, note, actorId) => await adminRequestTransaction(Number(requestId), true, adminNote(note), actorId);
  const noteRequest = async (requestId, note, actorId) => await adminRequestTransaction(Number(requestId), false, adminNote(note), actorId);

  async function listAdminQueue(limit = 100) {
    const queue = await db.all(`
      SELECT t.id, t.source_request_id, t.title, t.status, t.phase, t.priority,
             t.public_note, t.internal_reason, t.lease_owner, t.lease_expires_at,
             t.cumulative_budget, t.budget_limit,
             (SELECT COUNT(*) FROM ai_alerts a WHERE a.ticket_id=t.id AND a.status='open') AS open_alerts,
             r.domain, r.owner_user_id, r.owner_state, r.created_at
      FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
      WHERE t.parent_id IS NULL
      ORDER BY t.priority DESC, t.created_at ASC LIMIT ?
    `, [Math.min(Math.max(Number(limit) || 100, 1), 500)]);
    const out = [];
    for (const t of queue) out.push({ ...t, trace_ref: await traceRef(t.id) });
    return out;
  }

  // Read-time only: a dead worker never writes its own exit, and nothing else may write ai_workers for it.
  async function listWorkers({ now = Date.now(), leaseMs = LEASE_MS } = {}) {
    return (await db.all(`
      SELECT worker_id, version, mode, status, current_ticket_id, last_seen_at, updated_at
      FROM ai_workers ORDER BY last_seen_at DESC, worker_id
    `)).map((w) => (w.status === 'running' && now - w.last_seen_at > leaseMs ? { ...w, status: 'stale' } : w));
  }

  async function assertLease(ticketId, workerId, leaseToken, now = Date.now()) {
    const ticket = await db.get(`
      SELECT * FROM ai_tickets WHERE id = ? AND kind = 'root'
    `, [Number(ticketId)]);
    if (!ticket) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
    if (!workerId || ticket.lease_owner !== workerId || !leaseToken || ticket.lease_token !== leaseToken) {
      throw new WorkerContractError('lease does not belong to worker', 409, 'stale_lease');
    }
    if (!ticket.lease_expires_at || ticket.lease_expires_at <= now) {
      throw new WorkerContractError('lease expired', 409, 'stale_lease');
    }
    return ticket;
  }

  const claimTransaction = ({ workerId, version, mode, intent, now, leaseMs, yieldNew }) => db.tx(async () => {
    if (!WORKER_MODES.has(mode)) throw new WorkerContractError('invalid worker mode');
    if (!CLAIM_INTENTS.has(intent)) throw new WorkerContractError('invalid claim intent');
    await db.run(`
      INSERT INTO ai_workers(worker_id, version, mode, status, current_ticket_id, last_seen_at, updated_at)
      VALUES (?, ?, ?, ?, NULL, ?, ?)
      ON CONFLICT(worker_id) DO UPDATE SET
        version=excluded.version, mode=excluded.mode, status=excluded.status,
        last_seen_at=excluded.last_seen_at, updated_at=excluded.updated_at
    `, [workerId, version, mode, mode === 'off' ? 'stopped' : 'idle', now, now]);
    if (mode === 'off') return null;

    const current = await db.get(`
      SELECT id, lease_token, lease_expires_at, status, phase
      FROM ai_tickets
      WHERE kind='root' AND lease_owner=? AND lease_expires_at>?
      ORDER BY updated_at DESC LIMIT 1
    `, [workerId, now]);
    if (current) return { ...current, trigger: triggerFor(current.phase, intent) };
    if (yieldNew) return null; // có người đang chat: không nhận ticket mới, việc đang giữ vẫn trả về ở trên

    const candidate = await db.get(`
      SELECT t.id, t.phase
      FROM ai_tickets t JOIN requests r ON r.id=t.source_request_id
      WHERE t.kind='root' AND r.owner_state='verified'
        -- lease_expires_at trên hàng 'queued' (bình thường NULL) đóng vai "không nhận trước giờ này": tự chạy
        -- lại sau lỗi hạ tầng thoáng qua (transient_retry) dời nó tới tương lai thay vì cho nhận ngay.
        AND ((t.status='queued' AND (t.lease_expires_at IS NULL OR t.lease_expires_at<=?) AND (
              t.phase IN (${ANY_QUEUE})
              OR (CAST(? AS TEXT) = 'plan' AND t.phase IN (${PLAN_QUEUE}))
            ))
          OR (t.status='running' AND t.lease_expires_at<=?)
          OR (CAST(? AS TEXT) = 'plan' AND t.lease_token IS NOT NULL AND t.lease_expires_at<=?))
        -- Chạy plan đã duyệt và hoàn tác chỉ worker 'active' làm được, kể cả khi cứu lease hết hạn.
        AND (CAST(? AS TEXT) = 'active' OR t.phase NOT IN (${ACTIVE_ONLY}))
        -- 1 request = 1 phiên worker từ đầu đến cuối: root quay lại hàng đợi chỉ về worker cũ, trừ khi
        -- worker đó đã quá 1 lease không liên lạc. Root mất lease giữa chừng thì worker nào cũng cứu được.
        AND (t.status <> 'queued' OR NOT EXISTS (
          SELECT 1 FROM ai_runs ar JOIN ai_workers aw ON aw.worker_id = ar.worker_id
          WHERE ar.id = (SELECT MAX(id) FROM ai_runs WHERE ticket_id = t.id AND trigger <> 'shadow_precheck')
            AND ar.worker_id <> ? AND aw.last_seen_at > ?))
        -- Trần GPU-s/người/24h: lượt mới chờ; lease đang chạy hết hạn vẫn được cứu (không cắt việc đang làm).
        -- Việc tự sửa của board không tính trần học viên (ngân sách đêm riêng).
        AND (t.status <> 'queued' OR r.type = 'self' OR ${OWNER_GPU_S} < ?)
        ORDER BY ${FAIR_ORDER} LIMIT 1${db.lockQueue('t')}
    `, [now, intent, now, intent, now, mode, workerId, now - leaseMs, now - DAY_MS, LIMITS.gpu_s_per_user_day.loose]);
    if (!candidate) return null;
    const token = randomBytes(24).toString('hex');
    const expires = now + leaseMs;
    // 'executing': plan đã duyệt, bỏ qua lập plan. 'rolling_back': hoàn tác thay đổi đã giữ lại.
    const phase = PHASES[candidate.phase]?.lease || (intent === 'plan' ? 'planning' : 'shadow_precheck');
    await db.run(`
      UPDATE ai_tickets SET status='running', phase=?, lease_owner=?,
        lease_token=?, lease_expires_at=?, lease_mode=?, updated_at=? WHERE id=?
    `, [phase, workerId, token, expires, mode, now, candidate.id]);
    await db.run(`
      UPDATE ai_workers SET status='running', current_ticket_id=?, last_seen_at=?, updated_at=?
      WHERE worker_id=?
    `, [candidate.id, now, now, workerId]);
    await db.run(insertEvent, [candidate.id, 'heartbeat', 'worker', workerId, 'queued->running',
      null, 'worker claimed root ticket', `claim:${workerId}:${candidate.id}:${token}`, now,]);
    return { id: candidate.id, lease_token: token, lease_expires_at: expires, status: 'running', phase,
      trigger: triggerFor(phase, intent) };
  });

  async function claimNext({ workerId, version = 'unknown', mode = 'off', intent = 'precheck', now = Date.now(), leaseMs = LEASE_MS,
    yieldNew = false }) {
    workerId = String(workerId || '').trim();
    if (!/^[A-Za-z0-9._:-]{2,80}$/.test(workerId)) throw new WorkerContractError('invalid worker id');
    return await claimTransaction({ workerId, version: String(version).slice(0, 80), mode, intent, now, leaseMs, yieldNew });
  }

  // Nhánh candidate của verdict qua kiểm tra gần nhất (thứ admin có thể hoàn tác).
  async function latestCandidate(rootId) {
    const row = await db.get(`
      SELECT evidence_json FROM ai_runs WHERE ticket_id=? AND outcome IN ('ready_for_pr', 'needs_review')
      ORDER BY id DESC LIMIT 1
    `, [rootId]);
    return parseJson(row?.evidence_json)?.verdict?.candidate ?? null;
  }

  /** Chỉ cho API admin: nhánh · commit · PR của root để trace; null khi AI Board chưa tạo thay đổi. */
  async function traceRef(rootId) {
    const candidate = await latestCandidate(rootId);
    const pr = await latestPullRequest(rootId);
    if (!candidate && !pr) return null;
    return { branch: pr?.branch || candidate?.branch || null, head_sha: pr?.head_sha || candidate?.head_sha || null,
      pr_number: pr?.number ?? null, pr_url: pr?.url ?? null };
  }

  // ── Làm rõ yêu cầu với người gửi ──
  // Yêu cầu của chính người gửi đang ở phase clarifying + các lượt hỏi đáp. Không phải của mình → 404 (không lộ tồn tại).
  async function getClarification(requestId, ownerUserId) {
    const request = await db.get(`
      SELECT r.id, r.title, r.detail, r.student, r.domain, t.id AS root_id, t.phase
      FROM requests r JOIN ai_tickets t ON t.source_request_id=r.id AND t.parent_id IS NULL
      WHERE r.id=? AND r.owner_user_id=?
    `, [Number(requestId), Number(ownerUserId)]);
    if (!request) throw new WorkerContractError('request not found', 404, 'request_not_found');
    if (request.phase !== 'clarifying') throw new WorkerContractError('request is not being clarified', 409, 'not_clarifying');
    const turns = (await db.all(`
      SELECT role, author_name, body, created_at FROM request_messages WHERE request_id=? ORDER BY created_at, id
    `, [request.id])).map((m) => ({
      kind: m.author_name === CLARIFY_AUTHOR ? 'question' : m.author_name === SPEC_AUTHOR ? 'summary' : 'answer',
      text: m.body, at: m.created_at,
    }));
    return { request, turns, asked: turns.filter((t) => t.kind === 'question').length };
  }

  async function addClarifyTurn(requestId, { kind, text, author, now = Date.now() }) {
    if (kind === 'question') {
      const previous = await db.all('SELECT body FROM request_messages WHERE request_id=? AND author_name=?', [Number(requestId), CLARIFY_AUTHOR]);
      if (previous.length >= 2 || repeatedQuestion(text, previous.map((m) => m.body))) {
        throw new WorkerContractError('clarification limit reached', 409, 'clarification_limit');
      }
    }
    const name = kind === 'question' ? CLARIFY_AUTHOR : kind === 'summary' ? SPEC_AUTHOR : String(author || 'Học viên');
    await db.run(`
      INSERT INTO request_messages(request_id, role, author_name, body, attachments, created_at)
      VALUES (?, ?, ?, ?, NULL, ?)
    `, [Number(requestId), kind === 'answer' ? 'student' : 'ai', name.slice(0, 60), String(text).slice(0, 4000), now]);
  }

  /** Số lượt model (câu hỏi + tóm tắt) người này đã dùng từ `since` — trần mỗi ngày. */
  async function countClarifyTurns(ownerUserId, since) {
    return (await db.get(`
      SELECT COUNT(*) AS n FROM request_messages m JOIN requests r ON r.id=m.request_id
      WHERE r.owner_user_id=? AND m.author_name IN (?, ?) AND m.created_at >= ?
    `, [Number(ownerUserId), CLARIFY_AUTHOR, SPEC_AUTHOR, since])).n;
  }

  /** Yêu cầu đang chờ người gửi trả lời (lượt cuối là của Ban điều hành) — FAB nhấp nháy + banner. */
  async function listPendingClarifications(ownerUserId) {
    return await db.all(`
      SELECT r.id, r.title, r.domain FROM requests r
      JOIN ai_tickets t ON t.source_request_id=r.id AND t.parent_id IS NULL AND t.phase='clarifying'
      WHERE r.owner_user_id=? ORDER BY r.updated_at DESC LIMIT 5
    `, [Number(ownerUserId)]);
  }

  /** Người gửi xác nhận spec → root vào hàng đợi worker. complete=false: chưa đủ rõ, gắn cờ cho cổng 2.5. */
  const confirmClarificationTransaction = (requestId, ownerUserId, spec, complete, now) => db.tx(async () => {
    const { request } = await getClarification(requestId, ownerUserId);
    const hasSummary = await db.get('SELECT id FROM request_messages WHERE request_id=? AND author_name=? ORDER BY id DESC LIMIT 1', [request.id, SPEC_AUTHOR]);
    if (!hasSummary) throw new WorkerContractError('no summary to confirm yet', 409, 'no_summary');
    await db.run('UPDATE requests SET clarified_spec=?, updated_at=? WHERE id=?', [spec, now, request.id]);
    const note = 'Yêu cầu đã được làm rõ và đang chờ xử lý.';
    await db.run(`UPDATE ai_tickets SET phase='intake', public_note=?, updated_at=? WHERE id=?`, [note, now, request.root_id]);
    if (!complete) await db.run(insertTag, [request.root_id, 'needs_clarification']);
    await db.run(insertEvent, [request.root_id, 'request_clarified', 'requester', String(ownerUserId), 'clarifying->intake',
      note, JSON.stringify({ complete }), `request-clarified:${request.root_id}:${hasSummary.id}`, now]);
    return { ok: true, status: 'queued', complete };
  });

  async function confirmClarification(requestId, ownerUserId, { spec, complete }) {
    const text = String(spec ?? '').trim();
    if (text.length < 10 || text.length > 4000) throw new RequestValidationError('spec must be 10–4000 characters');
    return await confirmClarificationTransaction(requestId, ownerUserId, text, complete !== false, Date.now());
  }

  const handoffClarification = (requestId, ownerUserId, reason) => db.tx(async () => {
    const { request } = await getClarification(requestId, ownerUserId);
    const root = await db.get('SELECT * FROM ai_tickets WHERE id=?', [request.root_id]);
    const note = 'Yêu cầu đã chuyển quản trị viên làm rõ; bạn không cần trả lời thêm câu hỏi tự động.';
    await closeRoot(root, { status: 'waiting_admin', phase: 'clarification_limit', note, reason, now: Date.now(),
      event: { type: 'plan_blocked', actorType: 'system', actorId: 'clarification', idem: `clarification-limit:${root.id}` } });
    return { status: 'waiting_admin', public_note: note };
  });

  // Gate 2.5 stores the question and releases its lease atomically into the existing requester flow.
  const workerClarificationTransaction = (ticketId, input) => db.tx(async () => {
    const prior = await db.get('SELECT actor_id, run_id FROM ai_events WHERE ticket_id=? AND idempotency_key=?', [Number(ticketId), input.idempotencyKey]);
    if (prior) {
      if (prior.actor_id !== input.workerId || Number(prior.run_id) !== Number(input.runId)) {
        throw new WorkerContractError('idempotency key belongs to another run', 409, 'idempotency_conflict');
      }
      return { status: 'duplicate', duplicate: true };
    }
    const root = await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const run = await db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const request = await db.get('SELECT id, title, domain, student FROM requests WHERE id=?', [root.source_request_id]);
    const asked = (await db.get('SELECT COUNT(*) n FROM request_messages WHERE request_id=? AND author_name=?', [request.id, CLARIFY_AUTHOR])).n;
    const questions = (await db.all('SELECT body FROM request_messages WHERE request_id=? AND author_name=?', [request.id, CLARIFY_AUTHOR])).map((m) => m.body);
    const repeated = repeatedQuestion(input.question, questions);
    const escalate = input.escalateReason || asked >= Math.min(2, input.maxQuestions) || repeated;
    const now = input.now;
    const status = escalate ? 'waiting_admin' : 'queued';
    const phase = escalate ? 'plan_blocked' : 'clarifying';
    const note = escalate ? 'Kế hoạch cần quản trị viên kiểm tra trước khi tiếp tục.' : CLARIFYING_NOTE;
    const eventType = escalate ? 'plan_blocked' : 'request_clarification';
    const detail = input.escalateReason || (repeated ? 'repeated_answered_question' : escalate ? 'requester_clarification_limit_reached'
      : JSON.stringify({ gate: 2.5, asked: asked + 1 }));
    if (escalate) {
      await db.run(`
        INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
        VALUES (?, 2.5, 'blocked', ?, ?, ?)
      `, [run.id, note, detail, now]);
    } else {
      await db.run(`
        INSERT INTO request_messages(request_id, role, author_name, body, attachments, created_at)
        VALUES (?, 'ai', ?, ?, NULL, ?)
      `, [request.id, CLARIFY_AUTHOR, input.question, now]);
      await db.run('UPDATE requests SET updated_at=? WHERE id=?', [now, request.id]);
    }
    await db.run(`
      UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?,
        lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?
    `, [status, phase, note, detail, now, Number(ticketId)]);
    await db.run(`UPDATE ai_workers SET status='idle', current_ticket_id=NULL, last_seen_at=?, updated_at=? WHERE worker_id=?`, [now, now, input.workerId]);
    await db.run(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, ?, 'worker', ?, ?, ?, ?, ?, ?)
    `, [Number(ticketId), run.id, eventType, input.workerId,
      `running->${status}${escalate ? '' : ':clarifying'}`, note, detail, input.idempotencyKey, now]);
    return { status: escalate ? status : phase, requestId: request.id, title: request.title,
      domain: request.domain, student: request.student };
  });

  async function requestWorkerClarification(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    if (!Number.isInteger(input.maxQuestions) || input.maxQuestions < 1 || input.maxQuestions > 10) {
      throw new WorkerContractError('invalid clarification limit');
    }
    const question = String(input.question || '').trim();
    const escalateReason = String(input.escalateReason || '').slice(0, 200);
    if (!escalateReason && (!question || question.length > 500)) {
      throw new WorkerContractError('invalid clarification question');
    }
    return await workerClarificationTransaction(Number(ticketId), { ...input, question, escalateReason,
      idempotencyKey, now: input.now ?? Date.now() });
  }

  // Onboarding cho giọng văn của worker: không kèm tên hay id người gửi.
  async function requesterProfile(userId) {
    const row = await db.get('SELECT role, tech_level, domain_expertise FROM ai_board_profile WHERE user_id=?', [userId]);
    return row ? { role: row.role, tech_level: row.tech_level, domain_expertise: parseJson(row.domain_expertise) ?? [] } : null;
  }

  // PR của root (mở gần nhất); worker không mở PR thứ hai khi đã có.
  async function latestPullRequest(rootId) {
    const row = await db.get(`
      SELECT evidence_json FROM ai_runs WHERE ticket_id=? AND evidence_json LIKE '%"pull_request"%'
      ORDER BY id DESC LIMIT 1
    `, [rootId]);
    return parseJson(row?.evidence_json)?.pull_request ?? null;
  }

  const recordPullRequestTransaction = (ticketId, input, pr) => db.tx(async () => {
    const root = await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const run = await db.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), root.id]);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const verdict = parseJson(run.evidence_json)?.verdict;
    if (!['ready_for_pr', 'needs_review'].includes(run.outcome) || !verdict?.candidate) {
      throw new WorkerContractError('a PR needs a passing verdict with its candidate');
    }
    if (pr.branch !== verdict.candidate.branch || pr.head_sha !== verdict.candidate.head_sha
      || pr.base_sha !== verdict.candidate.base_sha) {
      throw new WorkerContractError('PR does not match the verified candidate');
    }
    const existing = await latestPullRequest(root.id);
    if (existing && existing.number === pr.number) return existing;
    if (existing) throw new WorkerContractError('root already has an open PR', 409, 'pr_already_open');
    const evidence = JSON.stringify({ ...parseJson(run.evidence_json), pull_request: pr });
    await db.run('UPDATE ai_runs SET evidence_json=?, updated_at=? WHERE id=?', [evidence, input.now, run.id]);
    const note = 'Thay đổi đang chờ người duyệt.';
    await db.run(`UPDATE ai_tickets SET phase='pr_open', public_note=?, updated_at=? WHERE id=?`, [note, input.now, root.id]);
    // 1 PR draft cho cả chu kỳ folder: các lượt sau đẩy tiếp lên cùng nhánh, GitHub cập nhật PR đó.
    await db.run('UPDATE ai_feature_folders SET pr_number=?, pr_url=?, updated_at=? WHERE id=(SELECT folder_id FROM requests WHERE id=?)', [pr.number, pr.url, input.now, root.source_request_id]);
    await db.run(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, 'pull_request_opened', 'worker', ?, ?, ?, ?, ?, ?)
    `, [root.id, run.id, input.workerId, `${root.phase}->pr_open`, note, JSON.stringify(pr),
      input.idempotencyKey, input.now]);
    return pr;
  });

  async function recordPullRequest(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const value = input.pullRequest || {};
    const match = PR_URL.exec(String(value.url || ''));
    if (!match || Number(match[1]) !== Number(value.number)) throw new WorkerContractError('invalid PR url');
    if (value.base !== PR_BASE) throw new WorkerContractError(`PR must target ${PR_BASE}`);
    if (!AI_BRANCH.test(String(value.branch)) || !SHA.test(String(value.head_sha)) || !SHA.test(String(value.base_sha))) {
      throw new WorkerContractError('invalid PR branch or sha');
    }
    const pr = { number: Number(value.number), url: value.url, branch: value.branch, base: PR_BASE,
      base_sha: value.base_sha, head_sha: value.head_sha };
    return await recordPullRequestTransaction(Number(ticketId), { ...input, idempotencyKey, now: input.now ?? Date.now() }, pr);
  }

  async function getLeasedSnapshot(ticketId, workerId, leaseToken, now = Date.now()) {
    const ticket = await assertLease(ticketId, workerId, leaseToken, now);
    const request = await db.get(`
      SELECT id, domain, type, title, detail, student, status, owner_user_id,
             owner_domain, owner_state, created_at, updated_at, attachments, clarified_spec
      FROM requests WHERE id=?
    `, [ticket.source_request_id]);
    const thread = (await db.all(`
      SELECT id, role, author_name, body, attachments, created_at
      FROM request_messages WHERE request_id=? ORDER BY created_at, id
    `, [ticket.source_request_id])).map((row) => ({ ...row, attachments: parseAttachments(row.attachments) }));
    return {
      ticket: { ...ticket, lease_token: undefined }, request: { ...request, attachments: parseAttachments(request.attachments) },
      thread, capability_policy: CAPABILITY_CATALOG, pull_request: await latestPullRequest(ticket.id),
      requester_profile: await requesterProfile(request.owner_user_id),
      // Spec chưa đủ rõ: cổng 2.5 / tier xử lý kỹ hơn.
      clarification_incomplete: !!await db.get("SELECT 1 FROM ai_ticket_tags WHERE ticket_id=? AND tag='needs_clarification'", [ticket.id]),
      ...(ticket.phase === 'rolling_back' ? { rollback_candidate: await latestCandidate(ticket.id) } : {}),
      // Folder: worker dựng code từ đỉnh nhánh chu kỳ này thay cho dev; brief = tầng L1/L3.
      folder: await withBrief(await db.get(`SELECT f.id, f.slug, f.title, f.branch, f.head_sha, f.pr_number, f.pr_url, f.cycle
        FROM requests q JOIN ai_feature_folders f ON f.id = q.folder_id WHERE q.id = ?`, [ticket.source_request_id])),
    };
  }

  const withBrief = async (folder) => (folder ? { ...folder, brief: await folderBrief(folder.id) } : null);

  async function heartbeat(ticketId, workerId, leaseToken, { now = Date.now(), leaseMs = LEASE_MS } = {}) {
    await assertLease(ticketId, workerId, leaseToken, now);
    const expires = now + leaseMs;
    await db.run('UPDATE ai_tickets SET lease_expires_at=?, updated_at=? WHERE id=?', [expires, now, Number(ticketId)]);
    await db.run(`UPDATE ai_workers SET status='running', current_ticket_id=?, last_seen_at=?, updated_at=? WHERE worker_id=?`, [Number(ticketId), now, now, workerId]);
    return { lease_expires_at: expires };
  }

  const createRunTransaction = (ticketId, input) => db.tx(async () => {
    await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (!RUN_TRIGGERS.has(input.trigger)) throw new WorkerContractError('invalid run trigger');
    const existing = await db.get('SELECT * FROM ai_runs WHERE ticket_id=? AND idempotency_key=?', [Number(ticketId), input.idempotencyKey]);
    if (existing) return existing;
    const attempt = (await db.get('SELECT COUNT(*) n FROM ai_runs WHERE ticket_id=?', [Number(ticketId)])).n + 1;
    const info = await db.insert(`
      INSERT INTO ai_runs(ticket_id, attempt, trigger, outcome, worker_id, idempotency_key, created_at, updated_at)
      VALUES (?, ?, ?, NULL, ?, ?, ?, ?)
    `, [Number(ticketId), attempt, input.trigger, input.workerId, input.idempotencyKey, input.now, input.now]);
    return await db.get('SELECT * FROM ai_runs WHERE id=?', [info]);
  });

  async function createRun(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    return await createRunTransaction(ticketId, { ...input, idempotencyKey, now: input.now ?? Date.now() });
  }

  const recordWorkerEventTransaction = (ticketId, input) => db.tx(async () => {
    await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (!EVENT_TYPES.has(input.eventType)) throw new WorkerContractError('invalid event type');
    const internalDetail = input.eventType === 'gate_started' ? progressDetail(input) : input.internalDetail;
    const existing = await db.get('SELECT * FROM ai_events WHERE ticket_id=? AND idempotency_key=?', [Number(ticketId), input.idempotencyKey]);
    if (existing) return existing;
    if (input.runId) {
      const run = await db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
      if (!run) throw new WorkerContractError('run does not belong to ticket');
    }
    const info = await db.insert(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, ?, 'worker', ?, NULL, ?, ?, ?, ?)
    `, [Number(ticketId), input.runId ? Number(input.runId) : null, input.eventType, input.workerId,
      input.publicMessage || null, internalDetail || null, input.idempotencyKey, input.now,]);
    return await db.get('SELECT * FROM ai_events WHERE id=?', [info]);
  });

  async function recordWorkerEvent(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    return await recordWorkerEventTransaction(ticketId, { ...input, idempotencyKey, now: input.now ?? Date.now() });
  }

  const releaseTransaction = (ticketId, input) => db.tx(async () => {
    const priorRelease = await db.get(`
      SELECT worker_id, status, phase FROM ai_release_receipts
      WHERE ticket_id=? AND idempotency_key=?
    `, [Number(ticketId), input.idempotencyKey]);
    if (priorRelease) {
      if (priorRelease.worker_id !== input.workerId) throw new WorkerContractError('release key belongs to another worker', 409, 'idempotency_conflict');
      return { status: priorRelease.status, phase: priorRelease.phase, duplicate: true };
    }
    const current = await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const states = {
      shadow_ok: ['queued', 'shadow_checked', 'Đã qua kiểm tra ban đầu; đang chờ lập kế hoạch.'],
      waiting: ['waiting', 'precheck_blocked', 'Yêu cầu đang chờ quản trị viên xem xét.'],
      failed: ['waiting', 'precheck_failed', 'Kiểm tra ban đầu chưa đạt.'],
    };
    const plannedStatuses = new Set(['planned', 'waiting_authorization', 'human_owned', 'waiting_admin']);
    const next = input.outcome === 'planned' && plannedStatuses.has(current.status)
      ? [current.status, current.phase, current.public_note]
      : states[input.outcome];
    if (!next) throw new WorkerContractError('invalid release outcome');
    await db.run(`
      UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?,
        lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?
    `, [next[0], next[1], next[2],
      // A planned release keeps the verdict's reason (e.g. the critical violation) unless the worker adds one.
      input.internalDetail || (input.outcome === 'planned' ? current.internal_reason : null), input.now, Number(ticketId)]);
    if (input.outcome === 'waiting' || input.outcome === 'failed') {
      // The precheck gate that stopped the run gets its own gate row: the admin sees the step and can rerun it.
      let detail = null;
      try { detail = JSON.parse(input.internalDetail || 'null'); } catch { /* plain-text reason */ }
      const gate = Number(detail?.gate);
      const run = await db.get('SELECT id FROM ai_runs WHERE ticket_id=? ORDER BY id DESC LIMIT 1', [Number(ticketId)]);
      if (run && CONTRACT.gates.plan.includes(gate)
          && !await db.get(`SELECT 1 FROM ai_gate_traces WHERE run_id=? AND gate=? AND status IN ('passed', 'blocked')`, [run.id, gate])) {
        await db.run(`INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
          VALUES (?, ?, 'blocked', ?, ?, ?)`, [run.id, gate, next[2], String(detail?.reason ?? input.internalDetail).slice(0, 1000), input.now]);
      }
    }
    await db.run(`UPDATE ai_workers SET status='idle', current_ticket_id=NULL, last_seen_at=?, updated_at=? WHERE worker_id=?`, [input.now, input.now, input.workerId]);
    await db.run(`INSERT INTO ai_release_receipts(ticket_id, idempotency_key, worker_id, status, phase, created_at) VALUES (?, ?, ?, ?, ?, ?)`, [Number(ticketId), input.idempotencyKey, input.workerId, next[0], next[1], input.now]);
    await db.run(insertEvent, [Number(ticketId), 'lease_released', 'worker', input.workerId, `running->${next[0]}`,
      next[2], input.internalDetail || null, input.idempotencyKey, input.now,]);
    return { status: next[0], phase: next[1] };
  });

  async function releaseLease(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    return await releaseTransaction(ticketId, { ...input, idempotencyKey, now: input.now ?? Date.now() });
  }

  async function planChildren(rootTicketId, revision) {
    return await db.all(`
      SELECT id, parent_id, source_request_id, sequence, kind, title, description,
             status, phase, tier, plan_revision
      FROM ai_tickets WHERE parent_id=? AND plan_revision=? ORDER BY sequence
    `, [Number(rootTicketId), Number(revision)]);
  }

  const recordPlanBlockTransaction = (ticketId, input, error) => db.tx(async () => {
    const now = input.now ?? Date.now();
    const eventKey = `plan-block:${input.idempotencyKey}`;
    const existing = await db.get('SELECT * FROM ai_events WHERE ticket_id=? AND idempotency_key=?', [Number(ticketId), eventKey]);
    if (existing) return existing;
    await assertLease(ticketId, input.workerId, input.leaseToken, now);
    await db.run(`
      UPDATE ai_tickets SET status='waiting', phase='plan_blocked', public_note=?,
        internal_reason=?, updated_at=? WHERE id=?
    `, [error.publicMessage, error.internalReason, now, Number(ticketId)]);
    if (input.runId) {
      const run = await db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
      if (run) await db.run(`
        INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
        VALUES (?, 2.5, 'blocked', ?, ?, ?)
      `, [run.id, error.publicMessage, error.internalReason, now]);
    }
    await db.run(insertEvent, [Number(ticketId), 'plan_blocked', 'worker', input.workerId, 'running->waiting',
      error.publicMessage, error.internalReason, eventKey, now,]);
    return true;
  });

  async function recordPlanBlock(ticketId, input, error) {
    return await recordPlanBlockTransaction(ticketId, input, error);
  }

  const submitPlanTransaction = (ticketId, input, checked) => db.tx(async () => {
    const now = input.now;
    const root = await assertLease(ticketId, input.workerId, input.leaseToken, now);
    const request = await db.get('SELECT domain FROM requests WHERE id=?', [root.source_request_id]);
    if (request.domain !== checked.plan.domain) throw new PlanGuardrailError('domain_mismatch', 'request domain changed during plan submission');
    const run = await db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const planRun = await db.get('SELECT evidence_json FROM ai_runs WHERE id=?', [run.id]);
    // Sổ ngân sách của lượt: phần lập plan ghi lên run, verdict cùng lượt cộng vào rồi so với trần.
    await db.run('UPDATE ai_runs SET evidence_json=? WHERE id=?',
      [JSON.stringify({ ...(parseJson(planRun.evidence_json) ?? {}), plan_budget: input.budgetUsed }), run.id]);

    const existing = await db.get(`
      SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status='valid'
    `, [Number(ticketId), checked.planHash]);
    if (existing) {
      const sameSubmission = await db.get(`
        SELECT 1 FROM ai_events WHERE ticket_id=? AND idempotency_key=?
      `, [Number(ticketId), `plan-valid:${input.idempotencyKey}`]);
      const authorized = !!await db.get(`
        SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
      `, [Number(ticketId), existing.plan_hash, existing.revision]);
      const plannedStatus = existing.tier === 'surface' ? 'planned'
        : existing.tier === 'protected' && authorized ? 'planned'
          : existing.tier === 'protected' ? 'waiting_authorization' : 'human_owned';
      if (!sameSubmission) {
        const rounds = root.auto_rounds; // resuming an identical valid plan (worker restart) is not a new automatic round
        const budget = root.cumulative_budget + input.budgetUsed;
        if (rounds > 2 || input.budgetUsed > root.budget_limit) { // budget_limit là trần MỖI lượt, không phải cả ticket
          const reason = rounds > 2 ? 'automatic_round_limit' : 'run_budget_exhausted';
          await db.run(`
            UPDATE ai_tickets SET status='waiting_admin', phase='budget_exhausted',
              public_note='Yêu cầu đang chờ quản trị viên xem xét.', internal_reason=?,
              auto_rounds=?, cumulative_budget=?, updated_at=? WHERE id=?
          `, [reason, rounds, budget, now, Number(ticketId)]);
          await db.run(insertEvent, [Number(ticketId), 'plan_validated', 'worker', input.workerId, 'running->waiting_admin',
            'Yêu cầu đang chờ quản trị viên xem xét.', reason,
            `plan-valid:${input.idempotencyKey}`, now,]);
          return {
            plan_hash: existing.plan_hash, tier: existing.tier, status: 'waiting_admin',
            reason, children: await planChildren(ticketId, existing.revision), duplicate: true,
          };
        }
        await db.run(`
          UPDATE ai_tickets SET status=?, phase='ticketized', auto_rounds=?,
            cumulative_budget=?, updated_at=? WHERE id=?
        `, [plannedStatus, rounds, budget, now, Number(ticketId)]);
        await db.run(insertEvent, [Number(ticketId), 'plan_validated', 'worker', input.workerId, `running->${plannedStatus}`,
          root.public_note, 'resumed existing validated plan',
          `plan-valid:${input.idempotencyKey}`, now,]);
      }
      const duplicateStatus = ['planned', 'waiting_authorization', 'human_owned', 'waiting_admin'].includes(root.status)
        ? root.status : plannedStatus;
      await db.run(`UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?`, [existing.plan_hash, existing.revision, now, run.id]);
      const traced = new Set((await db.all(`
        SELECT gate FROM ai_gate_traces WHERE run_id=? AND status='passed' AND gate IN (1, 2, 2.5)
      `, [run.id])).map((row) => Number(row.gate)));
      const insertTrace = `
        INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
        VALUES (?, ?, 'passed', NULL, NULL, ?)
      `;
      for (const gate of [1, 2, 2.5]) {
        if (!traced.has(gate)) await db.run(insertTrace, [run.id, gate, now]);
      }
      return {
        plan_hash: existing.plan_hash,
        capability_policy_hash: existing.capability_policy_hash,
        tier: existing.tier,
        status: duplicateStatus,
        children: await planChildren(ticketId, existing.revision),
        duplicate: true,
      };
    }

    const rounds = root.auto_rounds + 1;
    const budget = root.cumulative_budget + input.budgetUsed;
    if (rounds > 2 || input.budgetUsed > root.budget_limit) { // budget_limit là trần MỖI lượt, không phải cả ticket
      const reason = rounds > 2 ? 'automatic_round_limit' : 'run_budget_exhausted';
      await db.run(`
        UPDATE ai_tickets SET status='waiting_admin', phase='budget_exhausted',
          public_note='Yêu cầu đang chờ quản trị viên xem xét.', internal_reason=?,
          auto_rounds=?, cumulative_budget=?, updated_at=? WHERE id=?
      `, [reason, rounds, budget, now, Number(ticketId)]);
      return { plan_hash: checked.planHash, tier: checked.tier, status: 'waiting_admin', reason, children: [] };
    }

    // Folder chức năng chưa được admin duyệt: plan mặt bằng cũng phải chờ. Đã duyệt → tier như thường.
    const folder = await db.get(`SELECT f.approved_at FROM requests q JOIN ai_feature_folders f ON f.id = q.folder_id
      WHERE q.id = ?`, [root.source_request_id]);
    const folderGate = !!folder && !folder.approved_at && checked.tier === 'surface';
    if (folderGate) checked = { ...checked, tier: 'protected' };
    const revision = root.plan_revision + 1;
    const authorized = !!await db.get(`
      SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
    `, [Number(ticketId), checked.planHash, revision]);
    let rootStatus = 'planned';
    let childStatus = 'queued';
    let publicNote = 'Kế hoạch đã được kiểm tra và chia thành các việc theo thứ tự.';
    let internalReason = null;
    if (checked.tier === 'protected' && !authorized) {
      rootStatus = childStatus = 'waiting_authorization';
      publicNote = 'Kế hoạch đang chờ quản trị viên cho phép trước khi triển khai.';
      internalReason = folderGate ? 'folder_not_approved' : 'protected capability requires explicit admin authorization';
    } else if (checked.tier === 'core') {
      rootStatus = childStatus = 'human_owned';
      publicNote = 'Yêu cầu chạm phần lõi và đã được chuyển cho con người xử lý.';
      internalReason = 'core capability cannot be auto-implemented';
    }
    await db.run(`
      INSERT INTO ai_plans(root_ticket_id, revision, plan_hash, plan_json, status, tier,
        capability_policy_hash, public_reason, internal_reason, created_at)
      VALUES (?, ?, ?, ?, 'valid', ?, ?, ?, ?, ?)
    `, [Number(ticketId), revision, checked.planHash, checked.planJson, checked.tier,
      checked.policyHash, publicNote, internalReason, now]);
    // Trần lượt thực thi theo số bước của plan; không bao giờ hạ trần admin đã nới.
    const runLimit = Math.max(root.budget_limit, scaledLimit('units', checked.plan.steps.length));
    await db.run(`
      UPDATE ai_tickets SET status=?, phase='ticketized', public_note=?, internal_reason=?,
        tier=?, plan_hash=?, plan_revision=?, auto_rounds=?, cumulative_budget=?, budget_limit=?, updated_at=?
      WHERE id=?
    `, [rootStatus, publicNote, internalReason, checked.tier, checked.planHash, revision, rounds, budget, runLimit, now,
      Number(ticketId)]);
    await db.run(`UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?`, [checked.planHash, revision, now, run.id]);

    const insertChild = `
      INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title, description,
        status, phase, priority, public_note, internal_reason, tier, plan_revision, created_at, updated_at)
      VALUES (?, ?, ?, 'implementation', ?, ?, ?, 'ticketized', ?, ?, ?, ?, ?, ?, ?)
    `;
    for (const step of checked.plan.steps) {
      const info = await db.insert(insertChild, [Number(ticketId), root.source_request_id, step.order, step.title,
        JSON.stringify({
          description: step.description, allowed_scope: step.allowed_scope,
          acceptance: step.acceptance, tests: step.tests, risk: step.risk, non_goals: step.non_goals,
        }),
        childStatus, checked.plan.steps.length - step.order, publicNote, internalReason,
        checked.tier, revision, now, now,]);
      const childId = info;
      await db.run(insertTag, [childId, 'implementation']);
      await db.run(insertTag, [childId, `capability:${step.capability}`]);
    }
    const trace = `
      INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
      VALUES (?, ?, 'passed', NULL, NULL, ?)
    `;
    for (const gate of [1, 2, 2.5]) await db.run(trace, [run.id, gate, now]);
    await db.run(insertEvent, [Number(ticketId), 'plan_validated', 'worker', input.workerId, `running->${rootStatus}`,
      publicNote, internalReason, `plan-valid:${input.idempotencyKey}`, now,]);
    return {
      plan_hash: checked.planHash,
      capability_policy_hash: checked.policyHash,
      tier: checked.tier,
      status: rootStatus,
      children: await planChildren(ticketId, revision),
      duplicate: false,
    };
  });

  async function submitPlan(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const budgetUsed = Number(input.budgetUsed ?? 0);
    if (!Number.isFinite(budgetUsed) || budgetUsed < 0) throw new WorkerContractError('invalid budget');
    const now = input.now ?? Date.now();
    const root = await assertLease(ticketId, input.workerId, input.leaseToken, now);
    const request = await db.get('SELECT domain, type FROM requests WHERE id=?', [root.source_request_id]);
    const selfTarget = request.type === 'self'
      ? (await db.get('SELECT tag FROM ai_ticket_tags WHERE ticket_id=? AND tag LIKE ?', [root.id, `${SELF_TAG}%`]))?.tag?.slice(SELF_TAG.length) ?? '' // thiếu tag → '' khớp không file nào
      : null;
    let checked;
    try {
      checked = validatePlan(input.plan, request.domain, selfTarget);
    } catch (error) {
      if (!(error instanceof PlanGuardrailError)) throw error;
      await recordPlanBlock(ticketId, { ...input, idempotencyKey, now }, error);
      throw error;
    }
    return await submitPlanTransaction(Number(ticketId), { ...input, idempotencyKey, budgetUsed, now }, checked);
  }

  const submitPrePrVerdictTransaction = (ticketId, input, verdict) => db.tx(async () => {
    const root = await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (root.lease_mode !== 'active') {
      throw new WorkerContractError('pre-PR verdict requires active worker mode', 409, 'active_worker_required');
    }
    const run = await db.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const plan = root.plan_hash && await db.get(`
      SELECT * FROM ai_plans
      WHERE root_ticket_id=? AND plan_hash=? AND revision=? AND status='valid'
    `, [root.id, root.plan_hash, root.plan_revision]);
    if (!plan || root.status !== 'planned') {
      throw new WorkerContractError('pre-PR verdict requires the current accepted plan', 409, 'plan_required');
    }
    if (run.plan_hash !== plan.plan_hash || Number(run.plan_revision) !== Number(plan.revision)) {
      throw new WorkerContractError('run belongs to a different plan revision', 409, 'plan_run_mismatch');
    }
    if (plan.tier === 'core') {
      throw new WorkerContractError('core plan remains human-owned', 409, 'core_human_owned');
    }
    if (plan.tier === 'protected' && !await db.get(`
      SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
    `, [root.id, plan.plan_hash, plan.revision])) {
      throw new WorkerContractError('protected plan requires authorization', 409, 'authorization_required');
    }
    // Any run of this plan revision: an authorized protected plan executes in a later run than it was planned in.
    const precheckGates = new Set((await db.all(`
      SELECT g.gate FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
      WHERE r.ticket_id=? AND r.plan_hash=? AND r.plan_revision=? AND g.status='passed' AND g.gate IN (1, 2, 2.5)
    `, [root.id, plan.plan_hash, plan.revision])).map((row) => Number(row.gate)));
    if (![1, 2, 2.5].every((gate) => precheckGates.has(gate))) {
      throw new WorkerContractError('pre-PR verdict requires plan guardrail traces', 409, 'plan_trace_required');
    }
    const existing = await db.get('SELECT id, event_type FROM ai_events WHERE ticket_id=? AND idempotency_key=?', [Number(ticketId), input.idempotencyKey]);
    if (existing) {
      if (existing.event_type !== 'pre_pr_verdict' || !run.outcome) {
        throw new WorkerContractError('idempotency key already used', 409, 'idempotency_conflict');
      }
      if (run.outcome !== verdict.outcome || Number(run.gate) !== verdict.gate_reached) {
        throw new WorkerContractError('run already has a different verdict', 409, 'idempotency_conflict');
      }
      return JSON.parse(run.evidence_json).verdict;
    }
    if (run.outcome) throw new WorkerContractError('run already has a verdict', 409, 'idempotency_conflict');
    const cumulativeBudget = root.cumulative_budget + verdict.budget_used;
    const runEvidence = parseJson(run.evidence_json) ?? {};
    // Trần MỖI lượt = lập plan + thực hiện của cùng run; verdict.budget_used chỉ là phần thực hiện.
    if (verdict.budget_used + (Number(runEvidence.plan_budget) || 0) > root.budget_limit) {
      throw new WorkerContractError('run budget exhausted', 409, 'run_budget_exhausted');
    }
    const evidence = JSON.stringify({ ...runEvidence, verdict });
    await db.run(`UPDATE ai_runs SET outcome=?, gate=?, cumulative_budget=?, evidence_json=?, failure_reason=?, updated_at=? WHERE id=?`, [verdict.outcome, verdict.gate_reached, cumulativeBudget, evidence, verdict.reason, input.now, run.id]);
    // Folder chức năng: lượt đạt → đỉnh nhánh chu kỳ tiến lên commit vừa kiểm; lượt sau nối tiếp từ đó.
    if (verdict.candidate) {
      await db.run(`UPDATE ai_feature_folders SET branch=?, head_sha=?, last_activity_at=?, updated_at=?
        WHERE id=(SELECT folder_id FROM requests WHERE id=?)`, [verdict.candidate.branch, verdict.candidate.head_sha, input.now, input.now, root.source_request_id]);
    }
    const trace = `
      INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
      VALUES (?, ?, ?, ?, NULL, ?, ?)
    `;
    for (const gate of verdict.gates) {
      await db.run(trace, [run.id, gate.gate, gate.blocked ? 'blocked' : 'passed', gate.reason,
        JSON.stringify(gate), input.now]);
    }
    let status = root.status;
    let phase = verdict.outcome === 'ready_for_pr' ? 'pre_pr_ready'
      : verdict.outcome === 'needs_review' ? 'pre_pr_review' : 'pre_pr_blocked';
    let note = verdict.outcome === 'ready_for_pr' ? 'Thay đổi đã qua kiểm tra trước PR.'
      : verdict.outcome === 'needs_review' ? 'Thay đổi cần con người xem xét trước PR.'
        : 'Thay đổi chưa qua kiểm tra trước PR.';
    let leaseExpiresAt = null; // non-null chỉ khi transient_retry bật: dời deadline lease để claimTransaction tự cứu
    if (verdict.failure_class === 'critical') {
      status = 'waiting_admin';
      phase = 'critical_violation';
      note = 'Thay đổi vi phạm ranh giới an toàn; đã dừng và chờ quản trị viên.';
      await db.run(`
        INSERT INTO ai_alerts(ticket_id, severity, category, status, public_message, internal_detail, created_at, updated_at)
        VALUES (?, 'critical', 'boundary_violation', 'open', ?, ?, ?, ?)
      `, [root.id, note, verdict.reason, input.now, input.now]);
    } else if (verdict.failure_class === 'budget') {
      status = 'waiting_admin';
      phase = 'budget_exhausted';
      note = 'Yêu cầu đang chờ quản trị viên xem xét.';
    } else if (verdict.failure_class === 'plan') {
      // The accepted plan cannot be carried out as written: admin clarifies, rejects or hands it to a human.
      status = 'waiting_admin';
      phase = 'plan_unfit';
      note = 'Yêu cầu đang chờ quản trị viên xem xét.';
    } else if (verdict.failure_class === 'transient') {
      // Lỗi hạ tầng thoáng qua, backoff gọi model đã hết mà vẫn hỏng (main.py MODEL_RETRY_BACKOFF_S). Plan vẫn
      // hợp lệ (chỉ hạ tầng hỏng, không phải plan sai) nên dùng lại đúng đường "đã duyệt, chờ worker" của một
      // plan protected vừa được cho phép: status='queued', phase='authorized' → claimTransaction (nhánh
      // PLAN_QUEUE) tự nhận lại, worker thực hiện lại từ cổng 3 như một lượt execute mới.
      // Bật limits.transient_retry: lease_expires_at dời tới tương lai retry_after_ms — hàng 'queued' không
      // được nhận trước giờ đó (xem WHERE của claimTransaction). Tắt (mặc định): waiting_admin/transient_blocked,
      // admin tự xem Grafana rồi bấm "Chạy lại ngay" (retryTransientTicket) lúc rảnh GPU.
      const retryState = await db.get('SELECT enabled FROM ai_transient_retry_state WHERE id=1');
      const retryEnabled = retryState ? !!retryState.enabled : CONTRACT.limits.transient_retry.enabled;
      if (retryEnabled) {
        status = 'queued';
        phase = 'authorized';
        leaseExpiresAt = input.now + CONTRACT.limits.transient_retry.retry_after_ms;
        note = `Lỗi hạ tầng thoáng qua; tự chạy lại sau ${Math.round(CONTRACT.limits.transient_retry.retry_after_ms / 60000)} phút.`;
      } else {
        status = 'waiting_admin';
        phase = 'transient_blocked';
        note = 'Lỗi hạ tầng thoáng qua; chờ admin bấm "Chạy lại ngay" lúc GPU rảnh.';
      }
    }
    const repairSequence = (await db.get(`
      SELECT COALESCE(MAX(sequence), 0) + 1 AS nxt FROM ai_tickets WHERE parent_id=? AND plan_revision=?
    `, [root.id, plan.revision])).nxt;
    for (const [index, repair] of verdict.repairs.entries()) {
      const child = await db.insert(`
        INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title, description,
          status, phase, public_note, internal_reason, tier, plan_revision, created_at, updated_at)
        VALUES (?, ?, ?, 'review_fix', ?, ?, ?, 'pre_pr_repair', ?, ?, ?, ?, ?, ?)
      `, [root.id, root.source_request_id, repairSequence + index, `Sửa lỗi cổng ${repair.gate}`,
        JSON.stringify(repair), verdict.outcome === 'blocked' ? 'failed' : 'done',
        'Đã tự sửa một lần sau khi kiểm tra trước PR chưa đạt.', repair.reason, plan.tier, plan.revision,
        input.now, input.now]);
      await db.run(insertTag, [child, 'repair']);
    }
    if (leaseExpiresAt != null) {
      // Về hàng đợi (không ai giữ): xoá lease_owner/token cũ, lease_expires_at dùng làm "không nhận trước giờ này".
      await db.run(`UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?, cumulative_budget=?,
          lease_owner=NULL, lease_token=NULL, lease_expires_at=?, updated_at=? WHERE id=?`, [status, phase, note, verdict.reason, cumulativeBudget, leaseExpiresAt, input.now, root.id]);
    } else {
      await db.run('UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?, cumulative_budget=?, updated_at=? WHERE id=?', [status, phase, note, verdict.reason, cumulativeBudget, input.now, root.id]);
    }
    await db.run(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, 'pre_pr_verdict', 'worker', ?, ?, ?, ?, ?, ?)
    `, [root.id, run.id, input.workerId, `running->${phase}`, note, verdict.reason,
      input.idempotencyKey, input.now]);
    return verdict;
  });

  async function submitPrePrVerdict(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const selfRequest = (await db.get(`SELECT r.type FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
      WHERE t.id=?`, [Number(ticketId)]))?.type === 'self';
    const verdict = validatePrePrVerdict(input.verdict, selfRequest);
    return await submitPrePrVerdictTransaction(Number(ticketId), {
      ...input, idempotencyKey, now: input.now ?? Date.now(),
    }, verdict);
  }

  const extendBudgetTransaction = (rootTicketId, amount, reason, adminUserId, now) => db.tx(async () => {
    const root = await db.get(`SELECT * FROM ai_tickets WHERE id=? AND kind='root'`, [Number(rootTicketId)]);
    if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
    if (root.status !== 'waiting_admin' || root.phase !== 'budget_exhausted') {
      throw new WorkerContractError('ticket is not waiting on an exhausted budget', 409, 'not_budget_exhausted');
    }
    const limit = root.budget_limit + amount;
    const extensions = (await db.get(`SELECT COUNT(*) AS n FROM ai_events WHERE ticket_id=? AND event_type='budget_extended'`, [root.id])).n;
    const ceiling = extensions >= MAX_BUDGET_EXTENSIONS ? 'extension_count_ceiling'
      : limit > MAX_BUDGET_LIMIT ? 'budget_limit_ceiling' : null;
    if (ceiling) {
      // Permanent: phase budget_ceiling is never requeued (see invalidatePlanTransaction); a retry needs a new request.
      await db.run(`
        UPDATE ai_tickets SET status='human_owned', phase='budget_ceiling',
          public_note='Yêu cầu đã được chuyển cho con người xử lý.', internal_reason=?, updated_at=? WHERE id=?
      `, [ceiling, now, root.id]);
      await db.run(insertEvent, [root.id, 'budget_ceiling', 'admin', String(adminUserId), 'waiting_admin->human_owned',
        'Yêu cầu đã được chuyển cho con người xử lý.', JSON.stringify({ amount, reason, ceiling }),
        `budget-ceiling:${root.id}`, now,]);
      return { ok: false, status: 'human_owned', budget_limit: root.budget_limit, reason: ceiling };
    }
    const liftedLimit = root.internal_reason === 'automatic_round_limit' ? 'automatic_round_limit' : 'run_budget_exhausted';
    // The admin grants one more automatic round with the extra budget; the limits stay enforced.
    await requeueForReplan(root.id, { publicNote: 'Quản trị viên đã gia hạn ngân sách; yêu cầu sẽ được xử lý tiếp.', budgetLimit: limit }, now);
    await db.run(insertEvent, [root.id, 'budget_extended', 'admin', String(adminUserId), 'waiting_admin->queued',
      'Quản trị viên đã gia hạn ngân sách.', JSON.stringify({ amount, reason, relaxed: liftedLimit }),
      `budget-extended:${root.id}:${extensions + 1}`, now,]);
    return { ok: true, status: 'queued', budget_limit: limit };
  });

  async function extendBudget(rootTicketId, { amount, reason, adminUserId }) {
    const value = Number(amount);
    if (!Number.isInteger(value) || value < 1 || value > MAX_BUDGET_EXTENSION) {
      throw new WorkerContractError(`amount must be an integer from 1 to ${MAX_BUDGET_EXTENSION}`);
    }
    const why = String(reason || '').trim();
    if (why.length < 10) throw new WorkerContractError('a reason of at least 10 characters is required');
    return await extendBudgetTransaction(rootTicketId, value, why.slice(0, 500), Number(adminUserId), Date.now());
  }

  const cancelRequestTransaction = (requestId, ownerUserId, now) => db.tx(async () => {
    const request = await db.get('SELECT id, status, owner_user_id FROM requests WHERE id=?', [Number(requestId)]);
    // Someone else's request looks the same as a missing one.
    if (!request || request.owner_user_id !== Number(ownerUserId)) {
      throw new WorkerContractError('request not found', 404, 'request_not_found');
    }
    if (request.status === 'cancelled') return { ok: true, request_id: request.id, status: 'cancelled', duplicate: true };
    if (['done', 'rejected'].includes(request.status)) {
      throw new WorkerContractError('request is already closed', 409, 'request_closed');
    }
    const root = await db.get('SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL', [request.id]);
    if (root) {
      await closeRoot(root, {
        status: 'cancelled', phase: 'requester_cancelled', note: 'Người gửi đã hủy yêu cầu.', now,
        event: { type: 'request_cancelled', actorType: 'requester', actorId: ownerUserId, idem: `request-cancelled:${root.id}` },
      });
      await db.run(`
        UPDATE ai_tickets SET status='cancelled', updated_at=?
        WHERE parent_id=? AND status NOT IN ('done', 'failed', 'invalidated', 'cancelled')
      `, [now, root.id]);
    } else { // Legacy request, no root: the status trigger has nothing to derive from, write the row itself.
      await db.run(`UPDATE requests SET status='cancelled', updated_at=? WHERE id=?`, [now, request.id]);
    }
    return { ok: true, request_id: request.id, status: 'cancelled' };
  });

  async function cancelRequest(requestId, { ownerUserId, now = Date.now() }) {
    return await cancelRequestTransaction(requestId, ownerUserId, now);
  }

  const requestRollbackTransaction = (requestId, adminUserId, now) => db.tx(async () => {
    const root = await db.get('SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL', [requestId]);
    if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
    if (PHASES[root.phase]?.rollback) return { ok: true, status: root.status, phase: root.phase, duplicate: true };
    // Status stays 'planned' while gates 3→5.5 run, so a live lease is what means "working".
    if (root.lease_token && root.lease_expires_at > now) {
      throw new WorkerContractError('AI Board is working on this request; cancel it to stop the work', 409, 'ticket_busy');
    }
    const candidate = await latestCandidate(root.id);
    if (!candidate) throw new WorkerContractError('no kept change to roll back', 409, 'nothing_to_rollback');
    const attempt = (await db.get(`SELECT COUNT(*) n FROM ai_events WHERE ticket_id=? AND event_type='rollback_requested'`, [root.id])).n;
    await closeRoot(root, {
      status: 'queued', phase: 'rollback', note: 'Quản trị viên yêu cầu hoàn tác thay đổi; đang chờ AI Board.', reason: null, now,
      event: { type: 'rollback_requested', actorType: 'admin', actorId: adminUserId, idem: `rollback-requested:${root.id}:${attempt + 1}`,
        detail: JSON.stringify({ branch: candidate.branch, head_sha: candidate.head_sha }) },
    });
    return { ok: true, status: 'queued', phase: 'rollback', branch: candidate.branch };
  });

  async function requestRollback(requestId, { adminUserId, confirm, now = Date.now() }) {
    assertConfirmed(requestId, confirm);
    return await requestRollbackTransaction(Number(requestId), adminUserId, now);
  }

  const submitRollbackTransaction = (ticketId, input) => db.tx(async () => {
    const root = await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (root.phase !== 'rolling_back') throw new WorkerContractError('ticket is not rolling back', 409, 'not_rolling_back');
    const run = await db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), root.id]);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const next = ROLLBACK_OUTCOMES[input.outcome];
    if (!next) throw new WorkerContractError('invalid rollback outcome');
    const revert = input.outcome === 'revert_ready' ? validateCandidate(input.revert) : null;
    const detail = String(input.detail || '').slice(0, 1000) || null;
    const [status, phase, note] = next;
    await db.run('UPDATE ai_runs SET evidence_json=?, failure_reason=?, updated_at=? WHERE id=?', [JSON.stringify({ rollback: { outcome: input.outcome, revert, detail } }),
        input.outcome === 'failed' ? detail : null, input.now, run.id]);
    await closeRoot(root, {
      status, phase, note, reason: detail, now: input.now,
      event: { type: 'rollback_done', actorType: 'worker', actorId: input.workerId, idem: `rollback-done:${run.id}`,
        detail: JSON.stringify({ outcome: input.outcome, branch: revert?.branch ?? null, detail }) },
    });
    return { status, phase, outcome: input.outcome, revert };
  });

  async function submitRollback(ticketId, input) {
    return await submitRollbackTransaction(Number(ticketId), { ...input, now: input.now ?? Date.now() });
  }

  // One ai_gate_traces row per model call: status='model_call', internal_reason=call_id (idempotency key per run).
  const recordModelCallsTransaction = (ticketId, input) => db.tx(async () => {
    await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const run = await db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    if (!Array.isArray(input.calls) || input.calls.length > MAX_TRACE_BATCH) {
      throw new WorkerContractError(`calls must be an array of at most ${MAX_TRACE_BATCH}`, 400, 'invalid_trace');
    }
    const clean = input.calls.map(cleanModelCall);
    const seen = `SELECT 1 FROM ai_gate_traces WHERE run_id=? AND status='model_call' AND internal_reason=?`;
    const insert = `
      INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
      VALUES (?, ?, 'model_call', NULL, ?, ?, ?)
    `;
    let stored = 0;
    for (const call of clean) {
      if (await db.get(seen, [run.id, call.call_id])) continue;
      await db.run(insert, [run.id, call.gate, call.call_id, JSON.stringify(call), call.at ?? input.now]);
      stored += 1;
    }
    return { stored, duplicates: clean.length - stored };
  });

  async function recordModelCalls(ticketId, input) {
    return await recordModelCallsTransaction(ticketId, { ...input, now: input.now ?? Date.now() });
  }

  async function getRequestTrace(requestId) {
    const root = await db.get(`
      SELECT id, status, phase, cumulative_budget, budget_limit, public_note, internal_reason, plan_hash,
             lease_owner, lease_expires_at
      FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL
    `, [Number(requestId)]);
    if (!root) return null;
    root.live = !!root.lease_owner && root.lease_expires_at > Date.now(); // 1 worker đang giữ lease = đang xử lý
    root.phase_label = PHASES[root.phase]?.label ?? root.phase;
    const children = await db.all(`
      SELECT id, title, status, sequence AS "order", plan_revision FROM ai_tickets
      WHERE parent_id=? ORDER BY plan_revision, sequence, id
    `, [root.id]);
    const traces = await db.all(`
      SELECT g.id, g.run_id, g.gate, g.status, g.public_reason, g.internal_reason, g.evidence_json, g.created_at
      FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
      WHERE r.ticket_id=? ORDER BY g.created_at, g.id
    `, [root.id]);
    const events = await db.all(`
      SELECT e.ticket_id, e.run_id, e.event_type, e.actor_type, e.actor_id, e.transition,
             e.public_message, e.internal_detail, e.created_at
      FROM ai_events e JOIN ai_tickets t ON t.id = e.ticket_id
      WHERE t.id=? OR t.parent_id=? ORDER BY e.created_at, e.id
    `, [root.id, root.id]);
    const allCalls = [];
    // ai_runs has no status column; the verdict outcome (null until one lands) is the run's status.
    const runRows = await db.all(`
      SELECT r.id, r.attempt, r.trigger, r.outcome AS status, r.gate, r.created_at, r.updated_at, r.worker_id, r.evidence_json,
             w.mode AS worker_mode, w.version AS worker_version, w.last_seen_at AS worker_last_seen
      FROM ai_runs r LEFT JOIN ai_workers w ON w.worker_id = r.worker_id
      WHERE r.ticket_id=? ORDER BY r.created_at, r.id
    `, [root.id]);
    const runs = runRows.map(({ evidence_json: runEvidence, ...run }, i) => {
      const gates = [];
      const calls = [];
      for (const { run_id: runId, evidence_json: json, ...row } of traces) {
        if (runId !== run.id) continue;
        const item = { ...row, evidence: parseJson(json) };
        if (row.status === 'model_call') calls.push(item); else gates.push(item);
      }
      allCalls.push(...calls);
      // Ngân sách tính theo lượt: mỗi run có trần budget_limit riêng.
      const budgetUsed = calls.reduce((sum, c) => sum + (Number(c.evidence?.budget_units) || 0), 0);
      const rollback = parseJson(runEvidence)?.rollback ?? null;
      const live = root.live && i === runRows.length - 1 && !run.status && !rollback;
      const produced = parseJson(runEvidence)?.verdict?.candidate; // commit của chính lượt này (trace admin)
      return { ...run, rollback, gates, calls, totals: summarizeCalls(calls.map((c) => c.evidence)),
        commit: produced ? { branch: produced.branch, head_sha: produced.head_sha } : null,
        budget_used: budgetUsed, budget_limit: root.budget_limit,
        progress: runProgress({ ...run, gates, calls }, events, live) };
    });
    const evidences = allCalls.map((c) => c.evidence);
    const byModel = {};
    for (const e of evidences) (byModel[e?.model || 'unknown'] ??= []).push(e);
    const onlyApi = evidences.length > 0 && evidences.every((e) => e?.provider === 'api');
    const current = root.plan_hash && await db.get(`
      SELECT plan_hash, revision, tier, status, plan_json FROM ai_plans WHERE root_ticket_id=? AND plan_hash=?
      ORDER BY revision DESC LIMIT 1
    `, [root.id, root.plan_hash]);
    const plan = current ? {
      plan_hash: current.plan_hash, revision: current.revision, tier: current.tier, status: current.status,
      plan: parseJson(current.plan_json),
      authorized: !!await db.get('SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?', [root.id, current.plan_hash, current.revision]),
    } : null;
    const candidate = await latestCandidate(root.id);
    root.can_rollback = !!candidate && !PHASES[root.phase]?.rollback;
    root.rerun_stage = await rerunStage(root); // 'plan' | 'execute' | null: which failed stage the admin may rerun now
    return {
      root, plan, children, runs, events, candidate, pull_request: await latestPullRequest(root.id), trace_ref: await traceRef(root.id),
      gate_names: CONTRACT.gates.names,
      totals: {
        ...summarizeCalls(evidences),
        by_model: Object.fromEntries(Object.entries(byModel).map(([model, list]) => [model, summarizeCalls(list)])),
        budget_used: root.cumulative_budget, // tổng tích lũy mọi lượt, chỉ để báo cáo
        budget_limit: root.budget_limit, // trần MỖI lượt
        budget_unit: onlyApi ? 'k_tokens' : 'gpu_s',
      },
    };
  }

  const authorizePlanTransaction = (rootTicketId, planHash, adminUserId, now) => db.tx(async () => {
    const plan = await db.get('SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status=?', [Number(rootTicketId), String(planHash), 'valid']);
    if (!plan) throw new WorkerContractError('plan not found', 404, 'plan_not_found');
    if (plan.tier === 'core') throw new WorkerContractError('core work remains human-owned', 409, 'core_human_owned');
    const root = await db.get('SELECT phase FROM ai_tickets WHERE id=?', [Number(rootTicketId)]);
    if (root?.phase === 'budget_ceiling') {
      throw new WorkerContractError('ticket passed the budget ceiling; a new request is required', 409, 'budget_ceiling');
    }
    await db.run(`INSERT INTO ai_authorizations(root_ticket_id, plan_hash, plan_revision, admin_user_id, created_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING`, [Number(rootTicketId), String(planHash), Number(plan.revision), Number(adminUserId), now]);
    if (plan.tier === 'protected') {
      await db.run(`UPDATE ai_tickets SET status='queued', phase='authorized', public_note='Kế hoạch đã được cho phép; đang chờ thực hiện.', internal_reason=NULL, updated_at=? WHERE id=?`, [now, Number(rootTicketId)]);
      await db.run(`UPDATE ai_tickets SET status='queued', public_note='Kế hoạch đã được cho phép.', internal_reason=NULL, updated_at=? WHERE parent_id=? AND plan_revision=?`, [now, Number(rootTicketId), plan.revision]);
    }
    return { ok: true };
  });

  const resumeAuthorizedPlanTransaction = (ticketId, input) => db.tx(async () => {
    const root = await assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const run = await db.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const plan = root.plan_hash && await db.get(`
      SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND revision=? AND status='valid'
    `, [root.id, root.plan_hash, root.plan_revision]);
    const authorized = plan && (plan.tier === 'surface' || !!await db.get(`
      SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
    `, [root.id, plan.plan_hash, plan.revision]));
    const resumed = root.status === 'planned' && run.plan_hash === plan?.plan_hash;
    if (!plan || !authorized || plan.tier === 'core' || (root.phase !== 'executing' && !resumed)) {
      throw new WorkerContractError('no authorized plan waiting for execution', 409, 'not_authorized_execution');
    }
    if (!resumed) {
      await db.run(`UPDATE ai_tickets SET status='planned', phase='ticketized', updated_at=? WHERE id=?`, [input.now, root.id]);
      await db.run(`UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?`, [plan.plan_hash, plan.revision, input.now, run.id]);
      await db.run(insertEvent, [root.id, 'plan_resumed', 'worker', input.workerId, 'running->planned',
        'Đang thực hiện kế hoạch đã được cho phép.', `run ${run.id} executes plan revision ${plan.revision}`,
        `plan-resumed:${run.id}`, input.now]);
    }
    return {
      status: 'planned', tier: plan.tier, plan_hash: plan.plan_hash,
      capability_policy_hash: plan.capability_policy_hash, plan: JSON.parse(plan.plan_json),
      children: await planChildren(root.id, plan.revision), duplicate: resumed,
    };
  });

  async function resumeAuthorizedPlan(ticketId, input) {
    return await resumeAuthorizedPlanTransaction(Number(ticketId), { ...input, now: input.now ?? Date.now() });
  }

  async function authorizePlan(rootTicketId, planHash, adminUserId) {
    return await authorizePlanTransaction(rootTicketId, planHash, adminUserId, Date.now());
  }

  // The one writer of the needs_replan transition: drops plan and lease, optionally grants budget.
  async function requeueForReplan(rootId, { publicNote, internalReason = null, budgetLimit = null }, now) {
    await db.run(`
      UPDATE ai_tickets SET status='queued', phase='needs_replan', public_note=?, internal_reason=?,
        plan_hash=NULL, lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL,
        budget_limit=COALESCE(CAST(? AS BIGINT), budget_limit),
        auto_rounds=CASE WHEN CAST(? AS BIGINT) IS NULL THEN auto_rounds WHEN auto_rounds > 0 THEN auto_rounds - 1 ELSE 0 END,
        updated_at=? WHERE id=?
    `, [publicNote, internalReason, budgetLimit, budgetLimit, now, rootId]);
  }

  async function invalidateCurrentPlan(root, now) {
    await db.run(`UPDATE ai_plans SET status='invalidated', invalidated_at=? WHERE root_ticket_id=? AND plan_hash=? AND status='valid'`, [now, root.id, root.plan_hash]);
    await db.run(`UPDATE ai_tickets SET status='invalidated', phase='clarification_received', updated_at=? WHERE parent_id=? AND plan_revision=?`, [now, root.id, root.plan_revision]);
  }

  const invalidatePlanTransaction = (requestId, reason, now) => db.tx(async () => {
    const root = await db.get(`SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL`, [Number(requestId)]);
    if (!root || !root.plan_hash || PHASES[root.phase]?.terminal) return false;
    await invalidateCurrentPlan(root, now);
    await requeueForReplan(root.id, {
      publicNote: 'Thông tin mới đã được ghi nhận; kế hoạch sẽ được làm lại.',
      internalReason: String(reason || 'requester clarification').slice(0, 500),
    }, now);
    return true;
  });

  async function invalidatePlanForRequest(requestId, reason) {
    return await invalidatePlanTransaction(requestId, reason, Date.now());
  }

  // Admin reruns the gate that failed, from that gate's own row. Planning (gates 1-2.5) is one unit and restarts from
  // gate 1; the pre-PR gates (3-5.5) are one unit on the approved plan and restart from gate 3.
  const PLAN_BLOCKED_PHASES = ['clarification_limit', 'plan_blocked', 'precheck_blocked'];
  // plan_unfit is not rerunnable: the plan cannot be carried out as written, repeating gates 3-5 fails the same way.
  const EXEC_BLOCKED_PHASES = ['transient_blocked', 'pre_pr_blocked'];
  const gateStage = (gate) => ([1, 2, 2.5].includes(gate) ? 'plan' : [3, 4, 5, 5.5].includes(gate) ? 'execute' : null);

  /** Which stage an admin may rerun right now: 'plan' | 'execute' | null (live, leased, terminal, or a change already exists). */
  async function rerunStage(root) {
    if (!root || root.parent_id != null || root.lease_owner || await latestCandidate(root.id)) return null;
    if (PLAN_BLOCKED_PHASES.includes(root.phase)) return 'plan';
    return EXEC_BLOCKED_PHASES.includes(root.phase) ? 'execute' : null;
  }

  const rerunGateTransaction = (requestId, gate, adminUserId, now) => db.tx(async () => {
    const stage = gateStage(gate);
    if (!stage) throw new WorkerContractError('unknown gate', 400, 'invalid_gate');
    const root = await db.get('SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL', [requestId]);
    if (await rerunStage(root) !== stage) {
      throw new WorkerContractError('this gate cannot be rerun in the current state of the request', 409, 'not_rerunnable');
    }
    const key = `gate-rerun:${root.id}:${now}:${randomBytes(4).toString('hex')}`;
    if (stage === 'plan') {
      if (root.plan_hash) await invalidateCurrentPlan(root, now);
      // Passing the current limit makes requeueForReplan hand back one automatic round: a manual rerun is not an automatic one.
      await requeueForReplan(root.id, { publicNote: 'Quản trị viên chạy lại việc lập kế hoạch.', budgetLimit: root.budget_limit }, now);
      await db.run(insertEvent, [root.id, 'gate_rerun', 'admin', String(adminUserId), `${root.status}->queued`,
        'Quản trị viên chạy lại việc lập kế hoạch.', `admin rerun of gate ${gate}; planning restarts at gate 1`, key, now]);
      return { ok: true, status: 'queued', phase: 'needs_replan', from_gate: 1 };
    }
    await db.run(`UPDATE ai_tickets SET status='queued', phase='authorized', public_note=?,
        lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?`, ['Quản trị viên chạy lại các bước kiểm tra trước PR.', now, root.id]);
    await db.run(insertEvent, [root.id, 'gate_rerun', 'admin', String(adminUserId), `${root.status}->queued`,
      'Quản trị viên chạy lại các bước kiểm tra trước PR.', `admin rerun of gate ${gate}; pre-PR gates restart at gate 3`, key, now]);
    return { ok: true, status: 'queued', phase: 'authorized', from_gate: 3 };
  });

  async function rerunGate(requestId, gate, adminUserId) {
    return await rerunGateTransaction(Number(requestId), Number(gate), Number(adminUserId), Date.now());
  }

  return {
    db,
    queryGet: (sql, params = []) => db.get(sql, params),
    queryAll: (sql, params = []) => db.all(sql, params),
    rerunGate,
    rerunStage,
    // A request with a root ticket takes its status from the root (trigger 017): only a legacy request may be reopened directly.
    hasRoot: async (requestId) => !!await db.get('SELECT 1 FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL', [Number(requestId)]),
    createRequestWithRoot,
    createSelfRequest,
    listRequestsForOwner,
    countPendingRoots,
    rejectRequest,
    noteRequest,
    listAdminQueue,
    listFolders,
    voteFolder,
    unvoteFolder,
    listAdminFolders,
    approveFolder,
    revokeFolder,
    markFolderDone,
    markFolderReleased,
    archiveFolder,
    reopenFolder,
    archiveStaleFolders,
    folderBrief,
    listWorkers,
    cancelRequest,
    requestRollback,
    submitRollback,
    recordModelCalls,
    getRequestTrace,
    claimNext,
    assertLease, // drafts.js: route ảnh bản nháp kiểm lease như các route worker khác
    getLeasedSnapshot,
    heartbeat,
    createRun,
    recordWorkerEvent,
    releaseLease,
    submitPlan,
    submitPrePrVerdict,
    recordPullRequest,
    getClarification,
    addClarifyTurn,
    requestWorkflow,
    countClarifyTurns,
    listPendingClarifications,
    confirmClarification,
    handoffClarification,
    requestWorkerClarification,
    authorizePlan,
    resumeAuthorizedPlan,
    extendBudget,
    invalidatePlanForRequest,
  };
}

