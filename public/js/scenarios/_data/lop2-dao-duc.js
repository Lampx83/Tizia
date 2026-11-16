// DATA seed — 15 tình huống đạo đức Lớp 2 (tình huống + đúng/sai + lời giải).
// Mỗi phần tử = 1 item = 1 row content_datasets(collection='lop2-dao-duc').
// Chỉ seed-content.mjs import; trang fetch qua GET /api/content/lop2-dao-duc.
export const POOL = [
  { e: '🧓', t: 'Em nhường ghế xe buýt cho cụ già.', ok: true, f: 'Kính trọng người lớn tuổi.' },
  { e: '🗑️', t: 'Em vứt vỏ bánh xuống sân trường.', ok: false, f: 'Phải bỏ rác đúng nơi quy định.' },
  { e: '📚', t: 'Em mượn sách bạn và trả đúng hẹn.', ok: true, f: 'Giữ chữ tín với bạn bè.' },
  { e: '😡', t: 'Em giận bạn và đánh bạn.', ok: false, f: 'Bạo lực là sai — hãy bình tĩnh nói chuyện.' },
  { e: '🙏', t: 'Em chào hỏi thầy cô khi gặp.', ok: true, f: 'Lễ phép với thầy cô.' },
  { e: '🍱', t: 'Em chê cơm mẹ nấu trước mặt mẹ.', ok: false, f: 'Cần biết ơn người lớn nấu cho em.' },
  { e: '🧹', t: 'Em giúp mẹ quét nhà sau khi học bài.', ok: true, f: 'Yêu lao động, giúp đỡ gia đình.' },
  { e: '📵', t: 'Em chơi game của bạn khi bạn không cho phép.', ok: false, f: 'Phải xin phép trước khi dùng đồ của người khác.' },
  { e: '🤝', t: 'Em rủ bạn mới vào chơi cùng nhóm.', ok: true, f: 'Đoàn kết và thân thiện với bạn.' },
  { e: '🏃', t: 'Em chạy xô ngã bạn nhỏ lớp 1 mà không xin lỗi.', ok: false, f: 'Phải biết xin lỗi và đỡ bạn dậy.' },
  { e: '💧', t: 'Em khoá vòi nước sau khi rửa tay xong.', ok: true, f: 'Tiết kiệm nước, bảo vệ môi trường.' },
  { e: '🚦', t: 'Em chạy qua đường khi đèn còn đỏ.', ok: false, f: 'Phải đợi đèn xanh và đi đúng vạch.' },
  { e: '📞', t: 'Em báo bố mẹ khi có người lạ rủ đi theo.', ok: true, f: 'Tự bảo vệ và tin cậy người thân.' },
  { e: '😶', t: 'Em thấy bạn quên cặp mà không nhắc.', ok: false, f: 'Nên nhắc bạn để bạn không bị quên.' },
  { e: '🎁', t: 'Em chia kẹo cho bạn ngồi cạnh.', ok: true, f: 'Biết chia sẻ và quan tâm bạn bè.' },
];
