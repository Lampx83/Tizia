// Câu phản hồi cố định trong lịch sử chat khi yêu cầu xong (LF/113).
const VERDICT_CHAT = {
  draft: (t) => `Ban điều hành đã làm xong và đăng bản xem trước cho ${t}. Bạn mở phần xem trước để kiểm tra nhé.`,
  retry: (t) => `Lượt này Ban chưa làm được ${t}. Bạn có thể bấm «Thử cách khác» để Ban thử hướng khác.`,
  handoff: (t) => `Ban đã thử hai lượt cho ${t} nhưng chưa ổn — đã chuyển quản trị viên xem giúp.`,
  admin: (t) => `Ban chưa làm xong ${t} ở lượt này; quản trị viên sẽ xem và phản hồi tiếp.`,
};

export function verdictThreadMessage(kind, title) {
  const build = VERDICT_CHAT[kind];
  return build ? build(`«${String(title || '').slice(0, 120)}»`) : null;
}

/** Thêm tin kết quả vào lịch sử chat; bỏ qua nếu tin cuối đã đúng câu đó (cùng kết quả báo lại). */
export async function appendVerdictMessage({ requestId, kind, title, listMessages, addMessage }) {
  const text = verdictThreadMessage(kind, title);
  if (!text) return null;
  const last = (await listMessages(requestId)).at(-1);
  if (last && last.role === 'ai' && last.body === text) return null;
  return addMessage({ request_id: requestId, role: 'ai', author_name: 'Ban điều hành AI', body: text, attachments: null });
}
