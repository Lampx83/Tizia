// =====================================================================
// Rubric chung OTC_AI_v1.0 — chấm kỹ năng giao tiếp bán thuốc KHÔNG KÊ ĐƠN
// (req #173, ThS Phạm Thị Hương Lý, 20/09/2026). Nguồn: file
// "Huong_dan_AI_cham_ky_nang_ban_thuoc_khong_ke_don_1-5.docx".
//
// 21 tiêu chí × mức 1–5, dùng chung cho mọi tình huống OTC; đáp án riêng từng
// tình huống chỉ cung cấp nội dung chuyên môn. Khác bộ A1–E5 (0–4) cũ ở chỗ:
//   • có trạng thái N/A (không áp dụng — không vào mẫu số) và N/O (thiếu dữ liệu);
//   • mỗi điểm phải kèm bằng chứng (mã lượt hội thoại / mã thao tác / trích dẫn);
//   • có cờ lỗi an toàn riêng; không hạ điểm dây chuyền.
// `source`: 'conversation' | 'combined' (cần nhật ký thao tác 3D) | 'audio'
// (cần ghi âm — phần mềm chưa thu âm nên luôn N/O).
// Dùng CHUNG: server chấm & lưu, client hiển thị.
// =====================================================================

export const OTC_RUBRIC_VERSION = 'OTC_AI_v1.0';
export const OTC_MAX_PER_CRITERION = 5;

export const OTC_GROUPS = {
  A: 'Thiết lập và kết nối cuộc gặp',
  B: 'Khai thác thông tin',
  C: 'Hợp tác và cung cấp thông tin',
  D: 'Thể hiện quan tâm và đồng cảm',
  E: 'Giao tiếp chuyên nghiệp',
};

export const OTC_SAFETY_FLAGS = [
  'Bán/giao thuốc chống chỉ định, sai đối tượng hoặc có nguy cơ gây hại rõ ràng.',
  'Bỏ qua dấu hiệu cảnh báo cần đi khám/chuyển cấp cứu và vẫn khuyến nghị tự điều trị.',
  'Hướng dẫn sai liều, sai đường dùng, sai tần suất/thời gian có nguy cơ mất an toàn.',
  'Không khai thác dị ứng/thuốc đang dùng khi tình huống chứa nguy cơ tương tác hoặc dị ứng trọng yếu.',
  'Lấy/giao nhầm hoạt chất, hàm lượng/nồng độ, dạng bào chế hoặc thuốc hết hạn/hư hỏng.',
];

// Nguyên tắc chấm bắt buộc — đưa nguyên văn vào prompt của AI.
export const OTC_PRINCIPLES = [
  'Chấm theo bằng chứng quan sát được, không suy đoán ý định hoặc kiến thức chưa thể hiện.',
  'Thông tin ẩn chỉ được tính là sinh viên đã khai thác khi khách hàng đã nói ra sau câu hỏi phù hợp hoặc sinh viên đã xác nhận lại.',
  'Nếu khách hàng tự tiết lộ dữ kiện mà sinh viên không hỏi, B1–B3 chỉ ghi nhận một phần khi sinh viên xác nhận và sử dụng dữ kiện đó.',
  'C2, C3 và C6 chỉ chấm từ nhật ký thao tác hoặc lời nói thể hiện rõ hành động; transcript đơn thuần không đủ để suy diễn.',
  'N/A: tiêu chí không áp dụng do quyết định đúng là không bán thuốc (hoặc kịch bản không tạo cơ hội thực hiện). N/O: tiêu chí có áp dụng nhưng dữ liệu đầu vào không đủ để quan sát.',
  'Không hạ điểm dây chuyền: sai ở C1 không tự động làm các tiêu chí sau bằng 1; chỉ hạ khi chính hành vi ở tiêu chí đó sai/không an toàn.',
  'Nếu thuốc lựa chọn sai nhưng C4/C5 về thuốc đó vẫn đúng kỹ thuật thì C4/C5 tối đa 3; nếu giao thuốc sai/không an toàn thì C8 = 1.',
  'Thuốc sai/không an toàn: C1 = 1 và ghi lỗi nghiêm trọng. Thuốc đúng một phần, thiếu quan trọng: C1 = 2 (nếu vẫn đủ an toàn, có tác dụng cơ bản có thể 3). Thiếu thuốc chỉ bổ trợ: không mặc định trừ điểm, C1 có thể 4–5.',
  'Không bán thuốc và chuyển khám đúng: C1 có thể 5; C2, C3, C4, C6 thường N/A; C5, C7, C8 vẫn chấm theo tư vấn/theo dõi/kết thúc thực tế.',
  'Mỗi điểm phải kèm ít nhất một bằng chứng: mã lượt hội thoại, trích dẫn ngắn hoặc mã sự kiện thao tác.',
];

export const OTC_RUBRIC = [
  {
    "code": "A1",
    "group": "A",
    "source": "conversation",
    "name": "Chào hỏi và giới thiệu bản thân",
    "focus": "Chào hỏi, xưng hô phù hợp; giới thiệu tên và vai trò.",
    "evidence": "Hội thoại",
    "levels": [
      "Không chào hỏi, không giới thiệu; xưng hô thiếu tôn trọng hoặc mở đầu làm khách hàng khó chịu.",
      "Chỉ chào hỏi hoặc chỉ giới thiệu; xưng hô/vai trò chưa phù hợp, lời mở đầu rời rạc.",
      "Chào hỏi phù hợp và cho khách hàng biết mình là người tư vấn/bán thuốc, nhưng tên hoặc vai trò còn thiếu hay máy móc.",
      "Chào hỏi, xưng hô phù hợp; giới thiệu rõ tên và vai trò; tạo được không khí lịch sự, cởi mở. Chỉ còn thiếu sót nhỏ.",
      "Mở đầu đầy đủ, tự nhiên và tôn trọng; giới thiệu rõ tên, vai trò và thể hiện sự sẵn sàng hỗ trợ, giúp khách hàng dễ hợp tác."
    ]
  },
  {
    "code": "A2",
    "group": "A",
    "source": "conversation",
    "name": "Xác định mục đích",
    "focus": "Dùng câu hỏi mở đầu để xác định mục đích và nhu cầu của khách hàng.",
    "evidence": "Hội thoại",
    "levels": [
      "Không hỏi mục đích; tự suy đoán sai nhu cầu hoặc bắt đầu bán thuốc khi chưa biết khách hàng cần gì.",
      "Chỉ hỏi về một loại nhu cầu bằng câu hỏi đóng hoặc dẫn dắt; mặc định khách hàng đến mua thuốc hoặc chỉ cần tư vấn. “Anh/chị mua thuốc phải không?”; “Anh/chị cần tư vấn gì không ạ?”",
      "Đặt câu hỏi mở nhưng còn chung chung; hoặc chỉ hỏi rõ một trong hai nhu cầu: mua thuốc hoặc tư vấn/hỗ trợ. “Anh/chị cần gì ạ?”; “Anh/chị cần mua thuốc gì ạ?”; “Anh/chị cần tư vấn vấn đề gì ạ?”",
      "Đề cập được cả hai nhu cầu: mua thuốc và tư vấn/hỗ trợ, nhưng sử dụng câu hỏi đóng “Anh/chị đến mua thuốc hay cần tư vấn ạ?”; “Anh/chị muốn mua thuốc hay muốn được hỗ trợ ạ?”",
      "Hỏi rõ cả hai nhu cầu bằng câu hỏi mở, trung lập và lịch sự; tạo điều kiện để khách hàng trình bày cụ thể nhu cầu mua thuốc hoặc vấn đề sức khỏe cần tư vấn/hỗ trợ. “Anh/chị cần mua thuốc gì hay cần em tư vấn, hỗ trợ vấn đề sức khỏe gì ạ?”"
    ]
  },
  {
    "code": "A3",
    "group": "A",
    "source": "conversation",
    "name": "Lập kế hoạch tư vấn",
    "focus": "Giải thích ngắn gọn lý do cần khai thác thông tin trước khi bán thuốc.",
    "evidence": "Hội thoại",
    "levels": [
      "Không giải thích và hỏi đột ngột thông tin riêng tư; hoặc giải thích sai mục đích, gây mất tin tưởng.",
      "Chỉ nói sẽ hỏi vài câu nhưng không nêu lý do; chưa tạo được sự hợp tác của khách hàng. Ví dụ: “Trước khi bán thuốc, Em cần hỏi một số thông tin ạ”",
      "Có thông báo cần hỏi thêm trước khi bán thuốc nhưng lý do còn chung chung, chưa gắn với lựa chọn thuốc an toàn/phù hợp. Ví dụ” Để tư vấn cho mình em cần hỏi một số thông tin ạ”",
      "Giải thích ngắn gọn rằng việc hỏi nhằm lựa chọn thuốc phù hợp và bảo đảm an toàn; đề nghị khách hàng phối hợp. VD: “Để đảm bảo việc dùng thuốc/tư vấn an toàn hiệu quả nhất cho mình, em cần hỏi một số thông tin “",
      "Giải thích rõ, súc tích và phù hợp với tình huống; nêu lợi ích đối với người bệnh, nhận được sự hợp tác và chuyển tiếp tự nhiên. VD: “Để đảm bảo việc dùng thuốc/tư vấn an toàn hiệu quả nhất cho mình, em xin phép được một số thông tin ạ“"
    ]
  },
  {
    "code": "B1",
    "group": "B",
    "source": "conversation",
    "name": "Khai thác thông tin người sử dụng thuốc",
    "focus": "Hỏi và xác định đối tượng sử dụng thuốc, đặc điểm của người sử dụng thuốc trong trường hợp là trẻ em, đối tượng đặc biệt",
    "evidence": "Hội thoại.",
    "levels": [
      "Không xác định ai là người dùng thuốc; suy đoán sai hoặc bỏ qua đặc điểm người dùng làm phát sinh nguy cơ rõ ràng.",
      "Chỉ hỏi ai dùng thuốc hoặc một đặc điểm rất cơ bản; bỏ sót tuổi/cân nặng/ thai kỳ/cho con bú hay đặc điểm quan trọng đã được tình huống gợi ý.",
      "Xác định đúng người dùng và một số đặc điểm cơ bản nhưng chưa làm rõ đầy đủ yếu tố quan trọng đối với lựa chọn thuốc.",
      "Xác định đúng người dùng; hỏi đủ tuổi, cân nặng và tình trạng đặc biệt có liên quan; chỉ còn thiếu sót nhỏ không ảnh hưởng đáng kể.",
      "Khai thác có hệ thống nhưng ngắn gọn; chỉ hỏi các đặc điểm cần thiết cho tình huống, xác nhận lại dữ kiện trọng yếu và không hỏi thừa."
    ]
  },
  {
    "code": "B2",
    "group": "B",
    "source": "conversation",
    "name": "Khai thác thông tin bệnh/triệu chứng",
    "focus": "Khai thác đầy đủ thông tin về bệnh/triệu chứng hiện tại. Hỏi về mức độ, thời gian, diễn biến và yếu tố liên quan của bệnh/ triệu chứng",
    "evidence": "Hội thoại",
    "levels": [
      "Không khai thác triệu chứng hoặc hỏi những triệu chứng đúng",
      "Chỉ hỏi một triệu chứng",
      "Có khai thác nhưng bỏ qua những triệu chứng quan trọng",
      "Khai thác đầy đủ gần hết triệu chứng, chỉ còn 1 thiếu sót nhỏ",
      "Khai thác đầy đủ tất các các thông tin về bênh/triệu chứng bệnh"
    ]
  },
  {
    "code": "B3",
    "group": "B",
    "source": "conversation",
    "name": "Khai thác tiền sử và yếu tố liên quan",
    "focus": "Dị ứng; bệnh mắc kèm; thuốc/thực phẩm bổ sung đang dùng; lối sống, ăn uống, nghề nghiệp khi liên quan.",
    "evidence": "Hội thoại",
    "levels": [
      "Không khai thác tiền sử và yếu tố liên quan",
      "Chỉ khai thác 1 yếu tố rất sơ sài",
      "Hỏi được một số yếu tố chính nhưng thiếu yếu tố tiền sử quan trọng",
      "Khai thác đầy đủ các lĩnh vực, chỉ có thiêu sót nhỏ",
      "Khai thác có hệ thống nhưng súc tích; ưu tiên nguy cơ, làm rõ tên thuốc, liều/thời gian dùng hoặc đặc điểm dị ứng và các yếu tố thực sự liên quan."
    ]
  },
  {
    "code": "C1",
    "group": "C",
    "source": "conversation",
    "name": "Lựa chọn và tư vấn thuốc phù hợp",
    "focus": "Lựa chọn thuốc phù hợp với đối tượng sử dụng, triệu chứng và thông tin đã khai thác. Khi việc sử dụng thuốc không phù hợp: từ chối bán, giải thích rõ lý do và hướng dẫn khách hàng đi khám",
    "evidence": "Hội thoại, thao tác trên phần mềm 3D nếu có liên hệ với dược sĩ chuyên môn",
    "levels": [
      "Lựa chọn sai/không an toàn; thuốc chống chỉ định hoặc không phù hợp người dùng; bỏ sót điều trị thiết yếu; không từ chối bán/chuyển khám khi có dấu hiệu cảnh báo.",
      "Phương án chỉ đúng một phần, thiếu thành phần/biện pháp quan trọng hoặc có lựa chọn kém phù hợp làm giảm rõ hiệu quả; cần sửa đáng kể nhưng chưa tạo nguy cơ nghiêm trọng tức thời.",
      "Phương án cơ bản chấp nhận được và an toàn nhưng chưa đầy đủ/tối ưu; thiếu nội dung tương đối quan trọng hoặc giải thích lựa chọn còn hạn chế.",
      "Lựa chọn phù hợp, an toàn và tương đối đầy đủ; xử lý đúng việc bán hoặc không bán/chuyển khám, chỉ còn thiếu sót nhỏ không ảnh hưởng đáng kể.",
      "Lựa chọn đủ, hợp lý, tối giản và cá thể hóa theo dữ kiện; giải thích rõ; không lạm dụng thuốc. Khi không nên tự điều trị, từ chối bán đúng, nêu lý do và hướng dẫn đi khám phù hợp."
    ]
  },
  {
    "code": "C2",
    "group": "C",
    "source": "combined",
    "name": "Lấy thuốc và kiểm tra thuốc",
    "focus": "Lấy đúng tên thuốc, hoạt chất, hàm lượng/nồng độ và dạng bào chế. Lấy đúng số lượng và kiểm tra hạn dùng",
    "evidence": "Hội thoại, Nhật ký thao tác lấy thuốc/kiểm tra; lời nói chỉ được dùng khi thể hiện rõ thao tác.",
    "levels": [
      "Lấy/giao nhầm sản phẩm, hoạt chất, hàm lượng/nồng độ hoặc dạng bào chế; lấy thuốc hết hạn/hư hỏng mà không phát hiện và sửa.",
      "Bỏ sót nhiều bước kiểm tra hoặc phải được nhắc mới sửa một sai lệch quan trọng; chưa bảo đảm thuốc cuối cùng chính xác.",
      "Lấy đúng tên/hoạt chất và hàm lượng nhưng không kiểm tra số lượng, hạn dùng, bao bì hoặc một nội dung quan trọng khác.",
      "Lấy đúng và kiểm tra hầu hết nội dung; sản phẩm, số lượng và hạn dùng chính xác, chỉ còn thiếu sót nhỏ trong cách đối chiếu.",
      "Lấy đúng hoàn toàn; chủ động đối chiếu sản phẩm đã quyết định bán và kiểm tra tên/hoạt chất, hàm lượng, dạng bào chế, số lượng, hạn dùng, bao bì/chất lượng trước khi giao."
    ]
  },
  {
    "code": "C3",
    "group": "C",
    "source": "combined",
    "name": "Xuất hóa đơn và thanh toán",
    "focus": "Xuất hóa đơn, thu tiền đúng giá niêm yết và xác nhận thanh toán.",
    "evidence": "Nhật ký xuất hóa đơn/thanh toán và lời xác nhận trong hội thoại.",
    "levels": [
      "Không thực hiện xuất hóa đơn, thanh toán",
      "Có thực hiện nhưng sai sốt hoặc thiếu thuốc, thiếu tiền",
      "Tính và thu đúng tổng số tiền nhưng chưa thông báo rõ, chưa xuất hóa đơn/chứng từ hoặc chưa xác nhận đã khách hàng đã thanh toán.",
      "Thông báo giá, xuất hóa đơn/chứng từ, thu tiền và xác nhận thanh toán đúng; chỉ còn thiếu một chi tiết nhỏ không gây nhầm lẫn.",
      "Thực hiện chính xác, minh bạch và có trình tự; thông báo rõ số tiền, xử lý tiền thừa/chuyển khoản, giao hóa đơn/chứng từ và xác nhận hoàn tất."
    ]
  },
  {
    "code": "C4",
    "group": "C",
    "source": "conversation",
    "name": "Hướng dẫn sử dụng thuốc",
    "focus": "Công dụng; liều, đường/cách dùng, thời điểm, thời gian dùng; kỹ thuật với dạng bào chế đặc biệt.",
    "evidence": "Hội thoại",
    "levels": [
      "Không hướng dẫn hoặc hướng dẫn sai liều, đường dùng, tần suất/thời gian dùng có thể gây mất hiệu quả hay mất an toàn.",
      "Hướng dẫn rất ít, bỏ sót nhiều nội dung thiết yếu; có ít nhất một thông tin quan trọng không chính xác nhưng chưa đến mức nguy hiểm tức thời.",
      "Hướng dẫn đúng nội dung cốt lõi về liều và cách dùng, nhưng thiếu công dụng, thời điểm/thời gian dùng hoặc kỹ thuật sử dụng cần thiết.",
      "Hướng dẫn chính xác, tương đối đầy đủ cho từng thuốc; còn thiếu một chi tiết nhỏ không ảnh hưởng đáng kể đến việc sử dụng.",
      "Hướng dẫn đầy đủ, chính xác, có cấu trúc theo từng thuốc; cá thể hóa và minh họa/kiểm tra thao tác đối với dạng bào chế đặc biệt khi áp dụng."
    ]
  },
  {
    "code": "C5",
    "group": "C",
    "source": "conversation",
    "name": "Tư vấn an toàn, theo dõi và bảo quản",
    "focus": "Tư vấn tác dụng không mong muốn thường gặp và cách xử trí phù hợp.Tư vấn tương tác thuốc–thuốc, thuốc–thực phẩm có liên quan, nếu có. Tư vấn biện pháp không dùng thuốc và lời khuyên về lối sống phù hợp. Hướng dẫn bảo quản thuốc.",
    "evidence": "Hội thoại",
    "levels": [
      "Không nêu cảnh báo thiết yếu hoặc đưa lời khuyên sai; không hướng dẫn xử trí/chuyển khám khi bắt buộc.",
      "Tư vấn rất chung, thiếu nhiều nội dung an toàn quan trọng; hoặc liệt kê thông tin lan man/sai khiến khách hàng dễ hiểu nhầm.",
      "Nêu được một số ADR/cách theo dõi và bảo quản cơ bản, nhưng còn thiếu cảnh báo, tương tác, xử trí hoặc lời khuyên lối sống có liên quan.",
      "Bao quát các nội dung an toàn quan trọng và phù hợp tình huống; hướng dẫn theo dõi, xử trí và bảo quản đúng, chỉ thiếu chi tiết nhỏ.",
      "Ưu tiên đúng các nguy cơ cần biết, tư vấn cụ thể và có thể thực hiện; phân biệt khi nào tự theo dõi, liên hệ dược sĩ hay đi khám; bổ sung tương tác, lối sống và bảo quản khi liên quan."
    ]
  },
  {
    "code": "C6",
    "group": "C",
    "source": "combined",
    "name": "Đóng gói và ghi hướng dẫn sử dụng",
    "focus": "Đựng thuốc trong bao bì ra lẻ phù hợp. Ghi đầy đủ, chính xác và dễ đọc cách dùng, liều dùng, thời điểm dùng trên nhãn hoặc bao bì.",
    "evidence": "Nhật ký thao tác đóng gói/ghi nhãn và dữ liệu nhãn do sinh viên nhập.",
    "levels": [
      "Không thực hiện hoặc thực hiện sai toàn bộ",
      "Đóng gói hoặc ghi nhãn chỉ thực hiện rất ít; thiếu từ hai thông tin thiết yếu trở lên, chữ khó đọc hoặc có nguy cơ gây nhầm.",
      "Bao bì phù hợp và thông tin cốt lõi nhìn chung đúng, nhưng còn thiếu một nội dung quan trọng như liều, thời điểm, thời gian dùng hoặc cách phân biệt thuốc.",
      "Đóng gói phù hợp; ghi đúng, rõ hầu hết thông tin cần thiết, chỉ còn một thiếu sót nhỏ không gây nhầm lẫn.",
      "Đóng gói riêng, an toàn và phù hợp từng thuốc; nhãn/hướng dẫn đầy đủ, chính xác, dễ đọc; chủ động đối chiếu lại với lựa chọn và lời tư vấn trước khi giao."
    ]
  },
  {
    "code": "C7",
    "group": "C",
    "source": "conversation",
    "name": "Đánh giá hiểu biết",
    "focus": "Xác nhận khách hàng không còn thắc mắc. Kiểm tra sự hiểu biết về việc sử dụng thuốc của KH.",
    "evidence": "Hội thoại",
    "levels": [
      "Không kiểm tra hiểu biết, không cho khách hàng nêu thắc mắc;",
      "Chỉ hỏi câu đóng như “đã hiểu chưa?”, “còn thắc mắc gì không” rồi kết thúc",
      "Hỏi rõ nội dung khách hàng cần thắc mắc “Anh/chị còn thắc mắc gì về cách dùng và những lưu ý khi sử dụng thuốc không ạ” nhưng chưa xác minh lại sự hiểu biết của khách hàng",
      "Hỏi rõ nội dung khách hàng cần thắc mắc và yêu cầu khách hàng nhắc lại/cụ thể hóa các điểm chính về cách dùng; phát hiện và sửa phần chưa đúng, còn thiếu một chi tiết nhỏ.",
      "Dùng teach-back phù hợp để kiểm tra liều/cách dùng và cảnh báo trọng yếu; sửa sai tôn trọng, kiểm tra lại sau khi giải thích và xác nhận không còn thắc mắc."
    ]
  },
  {
    "code": "C8",
    "group": "C",
    "source": "conversation",
    "name": "Giao thuốc và kết thúc quy trình",
    "focus": "Giao đúng từng loại thuốc; nói rõ số lượng và hạn dùng khi giao. Cung cấp thông tin liên hệ khi có thắc mắc sau khi về nhà. Nhắc nhở trường hợp cần liên hệ lại dược sĩ hoặc đến khám tại cơ sở y tế. Chào tạm biệt và cám ơn khách hàng",
    "evidence": "Hội thoại",
    "levels": [
      "Không giao thuốc, không dặn dò hướng dẫn bệnh nhân liên hệ với bác sĩ dược sĩ, không hướng dẫn bảo quản",
      "Giao thuốc nhưng không nói rõ từng loại/số lượng, không nhắc theo dõi hay cách liên hệ và không kết thúc phù hợp.",
      "Giao đúng thuốc và có kết thúc cơ bản, nhưng thiếu từ hai nội dung: số lượng/hạn dùng, thông tin liên hệ, dấu hiệu đi khám hoặc lời cảm ơn.",
      "Bàn giao đúng, nói rõ các thông tin chính và nhắc trường hợp cần liên hệ/đi khám; kết thúc lịch sự, chỉ còn một thiếu sót nhỏ.",
      "Bàn giao có hệ thống từng thuốc, xác nhận số lượng/hạn dùng khi cần; cung cấp cách liên hệ, nhắc rõ dấu hiệu đi khám và kết thúc tự nhiên, tôn trọng."
    ]
  },
  {
    "code": "D1",
    "group": "D",
    "source": "conversation",
    "name": "Nhận diện và xử lý cảm xúc",
    "focus": "Lắng nghe và ghi nhận lo lắng, kỳ vọng của KH. Sử dụng ngôn ngữ tích cực",
    "evidence": "Hội thoại",
    "levels": [
      "Phớt lờ, phủ nhận, phán xét hoặc làm tăng lo lắng; ngắt lời khi khách hàng đang trình bày cảm xúc/vấn đề.",
      "Có nghe nhưng không ghi nhận tín hiệu cảm xúc; không phản hồi, tiêu cực hoặc không phù hợp với mối lo của khách hàng.",
      "Nhận ra và ghi nhận chung rằng khách hàng lo lắng/kỳ vọng, nhưng phản hồi còn chung chung và chưa điều chỉnh cách tư vấn.",
      "Lắng nghe, ghi nhận đúng mối lo/kỳ vọng cụ thể; dùng ngôn ngữ tích cực, thực tế và điều chỉnh nhịp tư vấn phù hợp.",
      "Nhận diện chính xác cả nội dung và mức độ cảm xúc; xác nhận mối quan tâm, đáp ứng phù hợp mà không trấn an quá mức, giúp khách hàng hợp tác."
    ]
  },
  {
    "code": "D2",
    "group": "D",
    "source": "conversation",
    "name": "Phản hồi phù hợp với cảm xúc",
    "focus": "Thể hiện thấu hiểu và động viên/hỗ trợ phù hợp.",
    "evidence": "Hội thoại xuất hiện câu đồng cảm/động viên gắn với cảm xúc đã xuất hiện.",
    "levels": [
      "Chê trách, chế giễu, đổ lỗi hoặc phản hồi trái ngược với cảm xúc; làm khách hàng căng thẳng hơn.",
      "Không phản hồi mà tiếp tục tư vấn Vd: Em hiểu chị đang rất lo lắng/khó chịu",
      "Có câu thể hiện đồng cảm hoặc động viên và quan tâm đến khách hàng nhưng còn chung chung, ít gắn với khó khăn cụ thể của khách hàng. VD: Em hiểu chị đang rất lo lắng",
      "Thể hiện thấu hiểu cụ thể và đưa lời động viên/hỗ trợ phù hợp, chân thực; không hứa hẹn quá mức. VD: Vâng, em hiểu với tình trạng bệnh này có thể chị sẽ thấy rất khó chịu nhưng chị càn bình tĩnh đừng lo lắng quá ạ",
      "Phản hồi đồng cảm tự nhiên, xác nhận khó khăn và kết nối ngay với hỗ trợ/giải pháp phù hợp, duy trì được sự tin tưởng. VD: Vâng, em hiểu với tình trạng bệnh này có thể chị sẽ thấy rất khó chịu nhưng chị đừng lo lắng quá, em sẽ hỗ trợ và tư vấn giúp mình ạ"
    ]
  },
  {
    "code": "E1",
    "group": "E",
    "source": "conversation",
    "name": "Duy trì quan hệ",
    "focus": "Tôn trọng người bệnh. Khuyến khích KH đặt câu hỏi, kiểm tra sự hiểu biết của KH trong quá trình tư vấn. Xử lý phù hợp khi khách hàng thắc mắc, không hợp tác hoặc khi cần hỗ trợ từ dược sĩ phụ trách chuyên môn",
    "evidence": "Toàn bộ hội thoại, nhất là khi khách hàng phản đối, vội hoặc đặt câu hỏi.",
    "levels": [
      "Thiếu tôn trọng, tranh cãi/đổ lỗi; bỏ qua thắc mắc hoặc tự xử lý vấn đề vượt thẩm quyền gây mất an toàn.",
      "Lịch sự; thường xuyên ngắt lời/phòng thủ, ít khuyến khích câu hỏi và xử lý khó khăn chưa phù hợp.",
      "Giữ thái độ lịch sự, trả lời được câu hỏi cơ bản nhưng chưa chủ động duy trì hợp tác hoặc xử lý bất đồng còn lúng túng.",
      "Tôn trọng, khuyến khích trao đổi; xử lý thắc mắc bình tĩnh và chủ động tìm hỗ trợ khi cần, chỉ còn thiếu sót nhỏ.",
      "Duy trì quan hệ hợp tác xuyên suốt, kể cả khi khách hàng vội/nghi ngờ/không hợp tác; minh bạch giới hạn và phối hợp hỗ trợ đúng lúc."
    ]
  },
  {
    "code": "E2",
    "group": "E",
    "source": "conversation",
    "name": "Đặt câu hỏi hiệu quả",
    "focus": "Kết hợp câu hỏi mở/đóng; trình tự logic; một ý mỗi câu; không hỏi dồn dập.",
    "evidence": "Toàn bộ các lượt hỏi của sinh viên và trình tự khai thác.",
    "levels": [
      "Không đặt câu hỏi hoặc chỉ đặt 1-2 câu ban đầu để xác định nhu cầu",
      "Chủ yếu hỏi đóng và dồn dập; trình tự rời rạc, thường ghép nhiều ý trong một câu làm khách hàng khó trả lời.",
      "Có kết hợp câu hỏi mở và đóng nhưng chưa đều; trình tự chưa logic, còn lặp hoặc có một số câu nhiều ý.",
      "Mở đầu bằng câu hỏi mở rồi dùng câu hỏi đóng để làm rõ; sắp xếp logic, ngắn gọn, vẫn còn câu hỏi nhiều ý",
      "Mở đầu bằng câu hỏi mở rồi dùng câu hỏi đóng để làm rõ; sắp xếp logic, ngắn gọn, rõ ràng, câu hỏi chỉ có 1 ý"
    ]
  },
  {
    "code": "E3",
    "group": "E",
    "source": "audio",
    "name": "Diễn đạt bằng lời nói",
    "focus": "Giọng rõ; âm lượng phù hợp; tốc độ vừa phải.",
    "evidence": "Âm thanh hoặc chỉ số giọng nói; không suy ra âm lượng/tốc độ từ transcript.",
    "levels": [
      "Phần lớn lời nói khó nghe/khó hiểu do phát âm, âm lượng hoặc tốc độ; khách hàng không tiếp nhận được thông tin.",
      "Nhiều đoạn nói quá nhỏ/lớn, quá nhanh/chậm hoặc không rõ; thường phải yêu cầu nhắc lại.",
      "Nhìn chung nghe được nhưng giọng, tốc độ hoặc âm lượng chưa ổn định; một số thông tin thuốc chưa được nói rõ.",
      "Nói rõ ràng, âm lượng và tốc độ phù hợp; chỉ có vài lỗi nhỏ không ảnh hưởng đến việc hiểu.",
      "Duy trì giọng rõ, tốc độ/âm lượng phù hợp; ngắt nghỉ và nhấn đúng tên thuốc, liều dùng và cảnh báo quan trọng."
    ]
  },
  {
    "code": "E4",
    "group": "E",
    "source": "conversation",
    "name": "Ngôn ngữ phù hợp trình độ hiểu biết",
    "focus": "Từ ngữ dễ hiểu; hạn chế/giải thích thuật ngữ chuyên môn.",
    "evidence": "Từ ngữ và cấu trúc câu trong toàn bộ hội thoại.",
    "levels": [
      "Dùng thuật ngữ, từ viết tắt hoặc diễn đạt mơ hồ làm khách hàng hiểu sai nội dung quan trọng.",
      "Dùng nhiều từ chuyên môn không giải thích; câu dài/phức tạp, không điều chỉnh khi khách hàng tỏ ra không hiểu.",
      "Phần lớn dùng từ dễ hiểu nhưng vẫn còn một số thuật ngữ/cách diễn đạt phức tạp hoặc chưa phù hợp khách hàng.",
      "Ngôn ngữ đơn giản, chính xác; thuật ngữ cần thiết được giải thích, nội dung phù hợp trình độ hiểu biết; chỉ còn lỗi nhỏ.",
      "Diễn đạt ngắn gọn, dễ nhớ và phù hợp riêng với khách hàng; dùng ví dụ/cách gọi quen thuộc khi cần nhưng vẫn chính xác chuyên môn."
    ]
  },
  {
    "code": "E5",
    "group": "E",
    "source": "conversation",
    "name": "Tự tin và mạch lạc",
    "focus": "Trình bày thông tin rõ ràng, mạch lạc không ngắt quãng",
    "evidence": "Trình tự hội thoại; âm thanh nếu có; các lần kiểm tra/tự sửa hoặc xin hỗ trợ.",
    "levels": [
      "Không thể duy trì cuộc tư vấn, trình bày hỗn loạn/đứt quãng nghiêm trọng; hoặc tỏ ra chắc chắn khi chưa rõ mà không kiểm tra, gây nguy cơ.",
      "Ngập ngừng thường xuyên, nội dung rời rạc và cần nhiều gợi ý/hỗ trợ mới tiếp tục; khó kiểm soát tiến trình.",
      "Hoàn thành được tư vấn nhưng còn một số đoạn ngập ngừng, lặp hoặc sắp xếp chưa hợp lý; khách hàng vẫn hiểu nội dung chính.",
      "Bình tĩnh, tương đối tự tin và mạch lạc; có thể dừng hợp lý để kiểm tra thông tin, chỉ còn vài do dự nhỏ.",
      "Tự tin, bình tĩnh và có cấu trúc xuyên suốt; nhận biết giới hạn, chủ động kiểm tra/tự sửa hoặc xin hỗ trợ đúng lúc mà vẫn duy trì tin cậy."
    ]
  }
];

export const OTC_MAX_TOTAL = OTC_RUBRIC.length * OTC_MAX_PER_CRITERION;
