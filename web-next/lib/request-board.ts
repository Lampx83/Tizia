// ─────────────────────────────────────────────────────────────────────────
// Helpers dùng chung cho bộ widget "Ban điều hành AI" bản React
// (SuggestionFab + RequestThread + NotificationsBell) — port từ vanilla
// public/js/{suggestion-fab,request-thread}.js. Vanilla vẫn tồn tại cho các
// trang legacy do Express phục vụ; bản Next dùng bộ React này.
// ─────────────────────────────────────────────────────────────────────────

export type Attachment = { url: string; name: string; mime?: string; size?: number; kind?: string };

export type RequestItem = {
  id: number | string;
  title: string;
  type?: string;
  status?: string;
  student?: string;
  admin_note?: string | null;
  attachments?: Attachment[];
  created_at?: number;
  updated_at?: number;
};

export type ThreadMessage = {
  role: 'student' | 'ai' | 'admin';
  author_name?: string;
  body: string;
  attachments?: Attachment[];
  created_at?: number;
};

export const REQUEST_TYPES = [
  { v: 'game', icon: '🎮', label: 'Thêm trò chơi / mini-game' },
  { v: 'theory', icon: '📖', label: 'Thêm lý thuyết / học liệu' },
  { v: 'lab', icon: '🧪', label: 'Cải thiện phòng thí nghiệm / thực hành' },
  { v: 'skill', icon: '🎯', label: 'Luyện kỹ năng' },
  { v: 'other', icon: '💬', label: 'Góp ý / báo lỗi / khác' },
] as const;

export const REQUEST_STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Chờ duyệt', cls: 'pending' },
  reviewing: { label: 'Đang làm', cls: 'reviewing' },
  awaiting_user: { label: '⏳ Chờ bạn bổ sung', cls: 'awaiting' },
  done: { label: '✓ Hoàn thành', cls: 'done' },
  rejected: { label: 'Chưa thực hiện', cls: 'rejected' },
};

export function fmtTime(t?: number): string {
  if (!t) return '';
  const d = Date.now() - t;
  const mm = Math.floor(d / 60_000);
  if (mm < 1) return 'vừa xong';
  if (mm < 60) return `${mm} phút trước`;
  const hh = Math.floor(mm / 60);
  if (hh < 24) return `${hh} giờ trước`;
  const dd = Math.floor(hh / 24);
  if (dd < 30) return `${dd} ngày trước`;
  try {
    return new Date(t).toLocaleDateString('vi-VN');
  } catch {
    return '';
  }
}

// Tên hiển thị của người chơi — cùng key localStorage với bản vanilla
// (public/js/engine/storage.js: prefix 'tizia:'). Server lấy tên thật từ
// session; giá trị này chỉ dùng lọc "yêu cầu của tôi" phía client.
export function getPlayerName(): string {
  try {
    return localStorage.getItem('tizia:playerName') || '';
  } catch {
    return '';
  }
}

// ── "Trường đang vào" — cùng quy tắc + key sessionStorage với bản vanilla ──
// Nút Ban điều hành AI thuộc TỪNG trường: chỉ hiện khi đang ở trong một trường,
// đề nghị gắn đúng domain trường đó. Xem chi tiết ở public/js/suggestion-fab.js.
const SCHOOL_KEY = 'tizia_school_domain';

function rememberSchool(d: string) {
  try {
    if (d) sessionStorage.setItem(SCHOOL_KEY, d);
  } catch {}
}
function recallSchool(): string | null {
  try {
    return sessionStorage.getItem(SCHOOL_KEY) || null;
  } catch {
    return null;
  }
}
function forgetSchool() {
  try {
    sessionStorage.removeItem(SCHOOL_KEY);
  } catch {}
}

const GLOBAL_PATHS = new Set([
  '/', '/',
  '/kham-pha', '/kham-pha',
  '/league', '/league',
  '/leaderboard', '/leaderboard.html',
  '/pricing', '/pricing',
  '/login', '/login',
  '/register', '/register',
  '/complete-profile', '/complete-profile',
  '/dashboard', '/dashboard.html',
]);

function domainByPath(p: string): string | null {
  if (/(^|\/)(it-|playground|cipher|sql|algo|code-lab|web-playground)/.test(p)) return 'it';
  if (
    /(pharmacy|pharma|nha-thuoc|compounding|sac-ky|dispense|antibiogram|ps\d|bao-che|herb-garden|titration|pediatric|iv-infusion|gmp|patient-sim|gc\d|calibration-curve|pk-curve|bp-measure|dilution|3d-shelf|2d-arcade|grapher|l[12]-)/.test(p)
  )
    return 'pharmacy';
  if (/(luat-giao-thong|bien-bao-giao-thong|driving)/.test(p)) return 'driving';
  return null;
}

/** Domain trường hiện tại, hoặc null nếu KHÔNG ở trong trường nào (→ ẩn nút). */
export function resolveSchoolDomain(pathname: string, domainParam?: string | null): string | null {
  // 1) Trang ép domain
  if (typeof window !== 'undefined' && (window as unknown as { SUGGESTION_DOMAIN?: string }).SUGGESTION_DOMAIN) {
    const d = String((window as unknown as { SUGGESTION_DOMAIN?: string }).SUGGESTION_DOMAIN);
    rememberSchool(d);
    return d;
  }
  // 2) ?domain= (trang campus) → vào trường, ghi nhớ
  if (domainParam) {
    rememberSchool(domainParam);
    return domainParam;
  }
  let p = (pathname || '/').toLowerCase().replace(/\/+$/, '');
  if (p === '') p = '/';
  // 3) Trang toàn cục → rời trường
  if (GLOBAL_PATHS.has(p)) {
    forgetSchool();
    return null;
  }
  // 4) Nhận diện trường qua đường dẫn hoạt động
  const byPath = domainByPath(p);
  if (byPath) {
    rememberSchool(byPath);
    return byPath;
  }
  // 5) Kế thừa trường đã vào trong phiên
  return recallSchool();
}
