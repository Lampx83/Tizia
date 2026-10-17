// ============================================================
// Kiểm quyền truy cập dữ liệu người học (AN TOÀN DỮ LIỆU 17/10/2026).
// ============================================================
// Lưu ý: ai cũng tự đăng ký được vai 'teacher' (identity/auth.js), nên vai trò
// KHÔNG đủ để cho xem dữ liệu học sinh. Giáo viên chỉ xem được lớp DO CHÍNH MÌNH
// TẠO (classes.creator_user_id) và người học có lượt làm bài trong lớp đó.
// ============================================================
import { isPlayerInCreatorClass } from '../../db.js';

export const isAdminUser = (u) => u?.role === 'admin';

/** Người dùng có quyền quản lý lớp không: admin, hoặc là người tạo lớp. */
export function ownsClass(user, cls) {
  if (!user || !cls) return false;
  if (isAdminUser(user)) return true;
  return cls.creator_user_id != null && Number(cls.creator_user_id) === Number(user.id);
}

/** Xem dữ liệu theo player_name: chính mình, admin, hoặc người tạo lớp mà
 *  player đó có làm bài. (player_name = display_name — không duy nhất; xem báo cáo.) */
export async function canViewPlayer(user, playerName) {
  if (!user) return false;
  if (isAdminUser(user)) return true;
  const name = String(playerName || '');
  if (name && name === user.display_name) return true;
  return name ? isPlayerInCreatorClass(user.id, name) : false;
}

export function requireAdminRole(req, res, next) {
  if (!isAdminUser(req.user)) return res.status(403).json({ error: 'forbidden', message: 'Cần quyền quản trị.' });
  next();
}

/** Bỏ trường nội bộ trước khi trả thông tin lớp. */
export function publicClass(cls) {
  if (!cls) return cls;
  const { creator_user_id, ...rest } = cls;
  return rest;
}
