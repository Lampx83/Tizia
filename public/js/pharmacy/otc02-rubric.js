// =====================================================================
// Đáp án chấm RIÊNG cho tình huống OTC-02 (Bán Alaxan cho anh T đau nhức răng)
// — req #229 (ThS Phạm Thị Hương Lý, 25/09/2026). Nguồn: file
// "Hướng dẫn chấm riêng OTC2_BÁN ALAXAN_24.9.docx".
//
// Chỉ ghi đè mô tả 5 mức của 11 tiêu chí: A3, B1, B2, B3, C1, C4, C5, D1, D2, E2, E4.
// Các tiêu chí còn lại (A1,A2,B4,B5,C2,C3,C6,C7,C8,D3,D4,D5,E1,E3,E5,E6,...) vẫn
// dùng mô tả CHUNG trong otc-rubric.js — cô ghi rõ "các tiêu chí còn lại chấm theo
// hướng dẫn chung cho tất cả các tình huống".
// =====================================================================

export const OTC02_LEVEL_OVERRIDES = {
  "A3": [
    "Không giải thích mà hỏi luôn thông tin",
    "Chỉ nói sẽ hỏi vài câu nhưng không nêu lý do; chưa tạo được sự hợp tác của khách hàng. / Ví dụ: “Trước khi bán thuốc, Em cần hỏi một số thông tin ạ”",
    "Có thông báo cần hỏi thêm trước khi bán thuốc nhưng lý do còn chung chung, chưa gắn với lựa chọn thuốc an toàn/phù hợp. / Ví dụ” Để tư vấn cho mình em cần hỏi một số thông tin ạ”",
    "Giải thích ngắn gọn rằng việc hỏi nhằm lựa chọn thuốc phù hợp và bảo đảm an toàn; đề nghị khách hàng phối hợp. / VD: “Để đảm bảo việc dùng thuốc/tư vấn an toàn hiệu quả nhất cho mình, em cần hỏi anh một số thông tin ạ “",
    "Có sự đồng cảm, Giải thích rõ, súc tích và phù hợp với tình huống; nêu lợi ích đối với người bệnh, nhận được sự hợp tác và chuyển tiếp tự nhiên. / VD: “Em rất hiểu là anh đang vội và bận rộn với công việc của mình.Tuy nhiên thuốc Alaxan sẽ cần có một số lưu ý khi dùng, vì vậy để đảm bảo việc dùng thuốc an toàn hiệu quả nhất cho mình, em xin phép một chút thời gian để hỏi anh một số thông tin ạ“"
  ],
  "B1": [
    "Không hỏi",
    "Anh dùng thuốc này đúng không ạ?",
    "Anh mua thuốc này cho ai",
    "“Anh mua thuốc này cho ai ạ?”",
    "“ Anh mua thuốc này cho anh dùng hay ai dùng ạ?"
  ],
  "B2": [
    "Không khai thác triệu chứng hoặc hỏi những triệu chứng đúng",
    "Chỉ hỏi một thông tin",
    "Có khai thác nhưng bỏ qua những triệu chứng quan trọng",
    "Khai thác đầy đủ gần hết triệu chứng, chỉ còn 1 thiếu sót nhỏ",
    "Khai thác đầy đủ tất các các thông tin về bênh/triệu chứng bệnh sau: / - Anh gặp phải tình trạng gì mà cần dùng Alaxan ạ? / - Anh bị đau nhức răng từ bao giờ? / - Ngoài đau nhức răng anh có bị sưng lợi, đau lợi không ạ? / - Anh có sốt không ạ?"
  ],
  "B3": [
    "Không khai thác tiền sử và yếu tố liên quan",
    "Chỉ khai thác 1 yếu tố rất sơ sài",
    "Hỏi được một số yếu tố chính nhưng thiếu yếu tố tiền sử quan trọng",
    "Khai thác đầy đủ các lĩnh vực, chỉ có thiêu sót nhỏ",
    "Khai thác đầy đủ các thông tin sau: / - Anh đã dùng thuốc Alaxan bao giờ chưa ạ? / - Anh có đang bị đau dạ dày, hay điều trị các bệnh lý gan thận không ạ? / - Anh có đang dùng loại thuốc hay thực phẩm chức năng nào khác ở nhà không ạ? / - Anh đã bao giờ bị dị ứng với thuốc hay thực phẩm nào chưa ạ? / - Anh có hay uống rượu bia không ạ?"
  ],
  "C1": [
    "Lựa chọn sai/không an toàn; thuốc chống chỉ định hoặc không phù hợp người dùng; bỏ sót điều trị thiết yếu; không từ chối bán/chuyển khám khi có dấu hiệu cảnh báo.",
    "Phương án chỉ đúng một phần, thiếu thành phần/biện pháp quan trọng hoặc có lựa chọn kém phù hợp làm giảm rõ hiệu quả; cần sửa đáng kể nhưng chưa tạo nguy cơ nghiêm trọng tức thời.",
    "Chỉ giải thích Alaxan là phù hợp, không khuyên đi khám",
    "Giải thích Alaxan là phù hợp, bán được và khuyên đi khám, không nói rõ lí do Alaxan chỉ dùng điều trị triệu chứng / “Dựa trên thông tin anh cung cấp, Alaxan là phù hợp với tình trạng của anh. Tuy nhiên anh vẫn cần đi khám nha khoa sớm để được kiểm tra và điều trị nguyên nhân”",
    "Dựa trên thông tin anh cung cấp, Alaxan có thể dùng tạm thời để giảm đau răng. Tuy nhiên, thuốc chỉ giúp giảm triệu chứng, không điều trị nguyên nhân gây sưng lợi. Vì anh đã đau hai ngày và có sưng lợi, anh nên đi khám nha khoa sớm để được kiểm tra và điều trị nguyên nhân"
  ],
  "C4": [
    "Không hướng dẫn hoặc hướng dẫn sai liều, đường dùng, tần suất/thời gian dùng có thể gây mất hiệu quả hay mất an toàn.",
    "Hướng dẫn rất ít, bỏ sót nhiều nội dung thiết yếu; có ít nhất một thông tin quan trọng không chính xác nhưng chưa đến mức nguy hiểm tức thời. / “Anh uống thuốc này mỗi lần 1 viên, sau ăn”",
    "Hướng dẫn đúng nội dung cốt lõi về liều và cách dùng, nhưng thiếu công dụng, thời điểm/thời gian dùng hoặc kỹ thuật sử dụng cần thiết. / “Em sẽ hướng dẫn anh cách dùng thuốc ạ. Anh uống thuốc Alaxan này mỗi lần 1 viên khi đau, các lần uống cách nhau ít nhất 6 giờ”",
    "Hướng dẫn chính xác, tương đối đầy đủ cho từng thuốc; còn thiếu một chi tiết nhỏ không ảnh hưởng đáng kể đến việc sử dụng. / “Em sẽ hướng dẫn anh cách dùng thuốc ạ. Alaxan có tác dụng giảm đau, trong đó có đau răng. Anh uống mỗi lần 1 viên khi đau, các lần uống cách nhau ít nhất 6 giờ”",
    "Hướng dẫn đầy đủ, chính xác, có cấu trúc theo từng thuốc; cá thể hóa và minh họa/kiểm tra thao tác đối với dạng bào chế đặc biệt khi áp dụng. / “Em sẽ hướng dẫn anh cách dùng thuốc ạ. Alaxan có tác dụng giảm đau, trong đó có đau răng. Anh uống mỗi lần 1 viên khi đau, các lần uống cách nhau ít nhất 6 giờ, nên uống sau ăn với một cốc nước.”"
  ],
  "C5": [
    "Không nêu cảnh báo thiết yếu hoặc đưa lời khuyên sai; không hướng dẫn xử trí/chuyển khám khi bắt buộc.",
    "Tư vấn rất chung, thiếu nhiều nội dung an toàn quan trọng; hoặc liệt kê thông tin lan man/sai khiến khách hàng dễ hiểu nhầm.",
    "Nêu được một số ADR/cách theo dõi và bảo quản cơ bản, nhưng còn thiếu cảnh báo, tương tác, xử trí hoặc lời khuyên lối sống có liên quan.",
    "Bao quát các nội dung an toàn quan trọng và phù hợp tình huống; hướng dẫn theo dõi, xử trí và bảo quản đúng, chỉ thiếu chi tiết nhỏ.",
    "Ưu tiên đúng các nguy cơ cần biết, tư vấn cụ thể và có thể thực hiện; phân biệt khi nào tự theo dõi, liên hệ dược sĩ hay đi khám; bổ sung tương tác, lối sống và bảo quản khi liên quan. / - Khi dùng thuốc có thể sẽ bị kích ứng dạ dày, để tránh tình trạng này anh nên uống thuốc sauu khi đã ăn no. / - Trong thời gian dùng thuốc anh không nên uống rượu bia vì sẽ làm ảnh hưởng đến gan / - Để tính trạng đau nhức răng lợi đuộc cải thiện nhanh, anh nên vệ sinh răng miệng thường xuyên, tránh thức ăn quá nóng, quá lạnh hoặc quá cứng và đi khám nha khoa sớm"
  ],
  "D1": [
    "Phớt lờ, phủ nhận, phán xét hoặc làm tăng lo lắng; ngắt lời khi khách hàng đang trình bày cảm xúc/vấn đề.",
    "Có nghe nhưng không ghi nhận tín hiệu cảm xúc; không phản hồi, tiêu cực hoặc không phù hợp với mối lo của khách hàng.",
    "Nhận ra và ghi nhận chung rằng khách hàng lo lắng/kỳ vọng, nhưng phản hồi còn chung chung và chưa điều chỉnh cách tư vấn.",
    "Lắng nghe, ghi nhận đúng mối lo/kỳ vọng cụ thể; dùng ngôn ngữ tích cực, thực tế và điều chỉnh nhịp tư vấn phù hợp.",
    "Nhận diện chính xác cả nội dung và mức độ cảm xúc; xác nhận mối quan tâm, đáp ứng phù hợp mà không trấn an quá mức, giúp khách hàng hợp tác."
  ],
  "D2": [
    "Chê trách, chế giễu, đổ lỗi hoặc phản hồi trái ngược với cảm xúc; làm khách hàng căng thẳng hơn.",
    "Không phản hồi mà tiếp tục tư vấn / Vd: Em hiểu chị đang rất lo lắng/khó chịu",
    "Có câu thể hiện đồng cảm hoặc động viên và quan tâm đến khách hàng nhưng còn chung chung, ít gắn với khó khăn cụ thể của khách hàng. / VD: Em hiểu chị đang rất lo lắng",
    "Có sự đồng cảm, quan tâm đến khách hàng nhưng chỉ thực hiện sau khi khách hàng giục nhiều lần, không thực hiện ở bước A3",
    "Có sự đồng cảm ngay ở bước A3, lập kế hoạch tư vấn và xuyên suốt quy trình khi khách hàng giục giã"
  ],
  "E2": [
    "Không đặt câu hỏi hoặc chỉ đặt 1-2 câu ban đầu để xác định nhu cầu",
    "Chủ yếu hỏi đóng và dồn dập; trình tự rời rạc, thường ghép nhiều ý trong một câu làm khách hàng khó trả lời.",
    "Có kết hợp câu hỏi mở và đóng nhưng chưa đều; trình tự chưa logic, còn lặp hoặc có một số câu nhiều ý.",
    "Mở đầu bằng câu hỏi mở rồi dùng câu hỏi đóng để làm rõ; sắp xếp logic, ngắn gọn, vẫn còn câu hỏi nhiều ý",
    "Mở đầu bằng câu hỏi mở rồi dùng câu hỏi đóng để làm rõ; sắp xếp logic, ngắn gọn, rõ ràng, câu hỏi chỉ có 1 hoặc 2 ý. Đặt cầu hỏi theo đúng thứ tự từ hỏi đặc điểm người bệnh, hỏi triệu chứng và hỏi tiền sử"
  ],
  "E4": [
    "Dùng thuật ngữ, từ viết tắt hoặc diễn đạt mơ hồ làm khách hàng hiểu sai nội dung quan trọng.",
    "Dùng nhiều từ chuyên môn không giải thích; câu dài/phức tạp, không điều chỉnh khi khách hàng tỏ ra không hiểu. / sử dụng nhiều lần cụm từ “em sẽ kê đơn cho anh”",
    "Phần lớn dùng từ dễ hiểu nhưng vẫn còn một số thuật ngữ/cách diễn đạt phức tạp hoặc chưa phù hợp khách hàng. / sử dụng cụm từ “em sẽ kê đơn cho anh”",
    "Ngôn ngữ đơn giản, chính xác; thuật ngữ cần thiết được giải thích, nội dung phù hợp trình độ hiểu biết; chỉ còn lỗi nhỏ.",
    "Diễn đạt ngắn gọn, dễ nhớ và phù hợp riêng với khách hàng; dùng ví dụ/cách gọi quen thuộc khi cần nhưng vẫn chính xác chuyên môn."
  ]
};
