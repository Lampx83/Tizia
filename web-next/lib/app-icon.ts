/* ICON CHO THẺ APP — một nguồn dùng chung cho /apps, /portal-apps và khung /app/<alias>.
 *
 * Tizia vẽ icon bằng emoji (render như text). App đóng gói theo chuẩn AI Portal lại đặt
 * `icon` là TÊN icon Lucide ("FileText", "Sigma") — đổ thẳng ra màn hình thì thành một
 * cục chữ 34px đè lên tên app. Nên:
 *   1. icon đã là emoji  → dùng luôn;
 *   2. là tên Lucide     → đổi sang emoji gần nghĩa nhất;
 *   3. không nhận ra     → 🧩 (thẻ vẫn cân, không vỡ layout).
 *
 * ALIAS_ICON là lối thoát cho vài app mà tên Lucide dịch sang emoji bị lệch nghĩa
 * (qrcode khai "Bot" → 🤖 thì sai hẳn). Ưu tiên cao nhất.
 */

const ALIAS_ICON: Record<string, string> = {
  qrcode: '🔳',
  'library-search': '📚',
  annota: '🗂️',
  quantis: '📊',
  bibliomap: '🗺️',
  scorum: '🎓',
  convertum: '🧮',
};

const LUCIDE_EMOJI: Record<string, string> = {
  // tài liệu & thư viện
  filetext: '📄', filesearch: '🔍', file: '📄', files: '🗂️', folder: '📁',
  book: '📕', bookopen: '📖', bookmarked: '🔖', library: '📚', newspaper: '📰',
  // dữ liệu & phân tích
  sigma: '📊', barchart: '📊', barchart3: '📊', linechart: '📈', piechart: '🥧',
  database: '🗄️', table: '📋', calculator: '🧮', activity: '📈',
  // bản đồ & mạng lưới
  map: '🗺️', mappin: '📍', globe: '🌐', network: '🕸️', share2: '🔗',
  // tìm kiếm & nghiên cứu
  search: '🔎', microscope: '🔬', flask: '🧪', flaskconical: '🧪', atom: '⚛️',
  // học tập
  graduationcap: '🎓', school: '🏫', pencil: '✏️', pentool: '🖊️', notebook: '📓',
  clipboardlist: '📋', checksquare: '✅', target: '🎯', trophy: '🏆', brain: '🧠',
  // công cụ
  bot: '🤖', code: '💻', terminal: '⌨️', settings: '⚙️', wrench: '🔧',
  qrcode: '🔳', image: '🖼️', camera: '📷', video: '🎬', music: '🎵',
  palette: '🎨', timer: '⏱️', clock: '🕐', calendar: '📅', zap: '⚡',
  // giao tiếp & tiền
  mail: '✉️', messagesquare: '💬', users: '👥', user: '👤', bell: '🔔',
  circledollarsign: '💰', wallet: '👛', shoppingcart: '🛒',
};

/** Emoji để vẽ trên thẻ app. Truyền alias để dùng được bảng ưu tiên theo app. */
export function appIcon(raw?: string | null, alias?: string | null): string {
  const byAlias = alias && ALIAS_ICON[alias.trim().toLowerCase()];
  if (byAlias) return byAlias;

  const s = (raw || '').trim();
  if (!s) return '🧩';
  // Không có chữ/số ⇒ đã là emoji hoặc ký hiệu.
  if (!/[A-Za-z0-9]/.test(s)) return s;

  return LUCIDE_EMOJI[s.toLowerCase().replace(/[^a-z0-9]/g, '')] || '🧩';
}
