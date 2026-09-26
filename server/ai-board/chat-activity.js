// Phiên chat làm rõ đang stream token cho người thật (feature-folders ticket 03).
// Còn > 0 thì worker không nhận ticket mới: tương tác của người được GPU trước việc chạy nền.
// ponytail: đếm trong RAM của 1 tiến trình Node; chạy nhiều instance server thì chuyển sang bảng DB.
let open = 0;

/** Bắt đầu 1 phiên; trả hàm kết thúc (gọi nhiều lần vẫn chỉ trừ 1). */
export function beginChat() {
  open += 1;
  let ended = false;
  return () => {
    if (ended) return;
    ended = true;
    open -= 1;
  };
}

export const activeChats = () => open;
