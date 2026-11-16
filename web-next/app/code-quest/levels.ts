// ============================================================
// Code Quest — dữ liệu game (khối lệnh + 10 level puzzle).
// ⚠️ Đây là CONTENT nghiệp vụ (bài học lập trình kéo-thả). Bản vanilla
// gốc hardcode nguyên khối này trong inline <script> và KHÔNG có API nào
// phục vụ nó (không có /js/code-quest.js để import runtime). Vì vậy tạm
// giữ nguyên tại đây để bảo toàn hành vi 1:1; xem `risks` — cần seed vào
// DB + tạo /api/... để không hardcode content trong code.
// ============================================================

export type BlockDef = {
  label: string;
  ic: string;
  cls: string;
  cat: string;
  hasNum?: boolean;
  defNum?: number;
  isContainer?: boolean;
};

// Thứ tự khai báo = thứ tự hiển thị trong thư viện khối.
export const BLOCKS: Record<string, BlockDef> = {
  move: { label: 'Đi tiến 1 ô', ic: '⬆️', cls: 'b-move', cat: 'move' },
  turn_left: { label: 'Xoay trái 90°', ic: '⟲', cls: 'b-turn', cat: 'turn' },
  turn_right: { label: 'Xoay phải 90°', ic: '⟳', cls: 'b-turn', cat: 'turn' },
  repeat: { label: 'Lặp N lần', ic: '🔁', cls: 'b-loop', cat: 'loop', hasNum: true, defNum: 3, isContainer: true },
  if_gold: { label: 'Nếu trước mặt có ⭐', ic: '❓', cls: 'b-cond', cat: 'cond', isContainer: true },
  if_clear: { label: 'Nếu trước mặt trống', ic: '🟢', cls: 'b-cond', cat: 'cond', isContainer: true },
  pick: { label: 'Nhặt vật phẩm', ic: '🤏', cls: 'b-action', cat: 'action' },
  at_goal: { label: 'Nếu đứng trên 🚩', ic: '🎯', cls: 'b-cond', cat: 'cond', isContainer: true },
  end: { label: 'Kết thúc', ic: '🛑', cls: 'b-end', cat: 'end' },
  wait: { label: 'Chờ 1 giây', ic: '⏱', cls: 'b-wait', cat: 'wait' },
};

export type Level = {
  id: number;
  name: string;
  grid: string[];
  desc: string;
  hint: string[];
};

// 10 level puzzle ĐÃ chuyển vào DB (content_datasets, collection 'code-quest-levels').
// FE fetch runtime qua endpoint generic — KHÔNG hardcode content trong code nữa.
// grid 8x8, ký tự: . = trống, # = tường, G = đích, S = sao, R/U/L/D = robot & hướng.
export async function fetchLevels(): Promise<Level[]> {
  const res = await fetch('/api/content/code-quest-levels', { credentials: 'same-origin' });
  if (!res.ok) throw new Error(`content fetch ${res.status}`);
  const data = (await res.json()) as { ok?: boolean; items?: Level[] };
  const items = Array.isArray(data.items) ? data.items : [];
  // Đảm bảo thứ tự level tăng dần theo id (không phụ thuộc thứ tự trả về).
  return [...items].sort((a, b) => a.id - b.id);
}
