// Câu ghi nhận cố định khi nhận yêu cầu, theo cách xử lý (LF/113).
export function acknowledgementNote(executionMode) {
  return executionMode === 'queue'
    ? 'Đã nhận yêu cầu và xếp vào hàng đợi xử lý tay bằng cloud model. Bạn sẽ nhận thông báo khi hoàn tất.'
    : 'Đã nhận yêu cầu. Ban điều hành đang xử lý ngay bằng model nội bộ; bạn sẽ thấy kết quả trong mục trao đổi khi xong.';
}
