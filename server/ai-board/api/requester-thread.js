// Requester-facing extras of one request: the exchange thread and its votes. Shared by the web app and the
// board-only entry so both read the same store (LF/122); the board mounts it behind the signed identity.
import { LIMITS } from '../repositories/store-contract.js';
import { checkLanguage } from '../language-guard.js';
import { checkIntake } from '../security/intake-guard.js';
import { checkGibberish } from '../gibberish.js';
import { checkContentSafety } from '../../contexts/safety/profanity-vi.js';

export function attachRequesterThread(router, { requests, store, db, requireAuth }) {
  // GET trả { request, messages }. messages[0] = tin mở đầu dựng từ chính nội dung yêu cầu (không lưu lặp).
  // Yêu cầu cũ có admin_note nhưng chưa có message → bù 1 tin AI ảo để không mất phản hồi.
  router.get('/api/requests/:id/thread', requireAuth, async (req, res) => {
    const reqRow = await requests.getRequestById(req.params.id);
    if (!reqRow) return res.status(404).json({ error: 'not_found' });
    if (req.user.role !== 'admin' && reqRow.owner_user_id !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    const msgs = await requests.listRequestMessages(reqRow.id);
    const hasBoardMsg = msgs.some((m) => m.role === 'ai' || m.role === 'admin');
    const thread = [{
      id: 0, request_id: reqRow.id, role: 'student', author_name: reqRow.student,
      body: reqRow.detail || reqRow.title, attachments: reqRow.attachments,
      created_at: reqRow.created_at,
    }];
    if (reqRow.admin_note && !hasBoardMsg) {
      thread.push({
        id: -1, request_id: reqRow.id, role: 'ai', author_name: 'Ban điều hành AI',
        body: reqRow.admin_note, attachments: [], created_at: reqRow.created_at,
      });
    }
    thread.push(...msgs);
    res.json({
      request: {
        id: reqRow.id, domain: reqRow.domain, type: reqRow.type, title: reqRow.title,
        status: reqRow.status, student: reqRow.student, votes: reqRow.votes,
        execution_mode: reqRow.execution_mode || null,
        ...(await store.requestWorkflow(reqRow.id)),
        created_at: reqRow.created_at, updated_at: reqRow.updated_at,
      },
      messages: thread,
    });
  });

  // Chủ yêu cầu hoặc admin gửi tin tiếp theo. Yêu cầu đã đóng (legacy, không có root) tự mở lại 'reviewing';
  // yêu cầu có root giữ trạng thái của root. KHÔNG gọi LLM — Ban điều hành AI trả lời bất đồng bộ.
  router.post('/api/requests/:id/messages', requireAuth, async (req, res) => {
    const reqRow = await requests.getRequestById(req.params.id);
    if (!reqRow) return res.status(404).json({ error: 'not_found' });
    const me = req.user.display_name || req.user.displayName;
    const isAdmin = req.user.role === 'admin';
    const isOwner = reqRow.owner_state === 'verified' && reqRow.owner_user_id === req.user.id;
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'forbidden' });
    const body = String(req.body?.body || '').trim();
    if (!body) return res.status(400).json({ error: 'empty' });
    const attachments = Array.isArray(req.body?.attachments) ? req.body.attachments : null;
    const role = isOwner ? 'student' : 'admin';
    if (role === 'student') {
      const language = checkLanguage(body);
      if (language.block) return res.status(422).json({ error: 'unsupported_language', message: language.message });
      const intake = checkIntake('', body);
      if (intake.block) return res.status(422).json({ error: 'request_rejected', message: intake.message });
      if (checkContentSafety(body).safe === false) {
        return res.status(422).json({ error: 'request_rejected',
          message: 'Nội dung có phần chưa phù hợp hoặc chứa thông tin cá nhân — bạn viết lại giúp Ban nhé.' });
      }
      const gibberish = checkGibberish(body);
      if (gibberish) return res.status(422).json({ error: 'request_unclear', message: gibberish });
      const recent = Number((await db.get(
        "SELECT COUNT(*) AS n FROM request_messages WHERE role='student' AND created_at >= ?",
        [Date.now() - 60_000]))?.n || 0);
      if (recent >= LIMITS.global_rate.messages_per_minute) {
        return res.status(429).json({ error: 'rate_limited',
          message: 'Bạn đang gửi khá nhanh. Chờ khoảng một phút rồi trao đổi tiếp nhé.' });
      }
    }
    const msg = await requests.addRequestMessage({ request_id: reqRow.id, role, author_name: me, body, attachments });
    if (role === 'student') await store.invalidatePlanForRequest(reqRow.id, 'requester clarification');
    const reopened = role === 'student' && !(await store.hasRoot(reqRow.id)) ? await requests.reopenRequestIfClosed(reqRow.id) : false;
    res.json({ ok: true, message_id: msg.id, reopened });
  });

  router.post('/api/requests/:id/vote', async (req, res) => {
    res.json({ ok: await requests.voteRequest(req.params.id) });
  });
}
