// Nguồn seed collection 'reading-en' — bài ĐỌC HIỂU tiếng Anh chuyên ngành CNTT
// (req #82, SV Duc anh). Mỗi phần tử = 1 bài đọc: đoạn văn + câu hỏi trắc nghiệm,
// đáp án đúng, và giải thích (tiếng Việt) hiện SAU khi người học nộp bài.
// Trang public/doc-hieu-tieng-anh.html fetch qua /api/content/reading-en.
// Đoạn văn ~150 từ, mức A2–B1, chủ đề công nghệ, viết chuẩn để tự học.

export const READING_EN = [
  {
    id: 'cloud',
    topic: 'cntt',
    level: 'A2–B1',
    title: 'What Is Cloud Computing?',
    passage:
      "Cloud computing means using computers and storage over the internet instead of on your own machine. " +
      "In the past, a company had to buy physical servers, keep them in a room, and pay for electricity and repairs. " +
      "Today, companies can rent computing power from providers such as Amazon, Microsoft, or Google, and pay only for what they use. " +
      "This is cheaper and much more flexible: if a website suddenly gets millions of visitors, the company can add more power in minutes and remove it later. " +
      "People also use the cloud every day without noticing. When you save a photo to Google Photos or send a file through Dropbox, that data lives on servers in large data centres, not only on your phone. " +
      "Because the data is online, you can open it from any device, anywhere, as long as you have a connection.",
    questions: [
      { q: 'What is the main idea of the passage?', o: ['How to build a physical server room', 'Using computers and storage over the internet', 'Why photos are expensive to store', 'How to repair broken computers'], a: 1,
        ex: 'Ý chính cả bài: điện toán đám mây = dùng máy tính và lưu trữ QUA INTERNET thay vì trên máy của mình. Các phương án khác chỉ là chi tiết nhỏ.' },
      { q: 'In the past, what did a company have to do?', o: ['Rent power by the minute', 'Buy physical servers and pay for electricity', 'Use only mobile phones', 'Delete all its data'], a: 1,
        ex: '"In the past, a company had to buy physical servers... and pay for electricity and repairs." → mua máy chủ vật lý + trả tiền điện.' },
      { q: 'According to the passage, one big advantage of the cloud is that it is', o: ['slower', 'more flexible', 'only for photos', 'impossible to scale'], a: 1,
        ex: '"much more flexible" — thêm/bớt tài nguyên trong vài phút. "flexible" = linh hoạt.' },
      { q: 'Why can you open your cloud files from any device?', o: ['Because the data is stored online', 'Because phones never break', 'Because the files are printed', 'Because the internet is free'], a: 0,
        ex: '"Because the data is online, you can open it from any device, anywhere" — dữ liệu nằm trực tuyến nên mở được ở bất kỳ thiết bị nào.' },
    ],
  },
  {
    id: 'ml',
    topic: 'cntt',
    level: 'B1',
    title: 'How Machine Learning Works',
    passage:
      "Traditional software follows exact rules written by a programmer. Machine learning is different: instead of being told every rule, the computer learns patterns from examples. " +
      "For instance, to build a program that recognises cats in photos, engineers show the system thousands of pictures already labelled 'cat' or 'not cat'. " +
      "The system slowly adjusts itself until it can tell the difference on its own, even for photos it has never seen before. " +
      "The quality of the result depends heavily on the data. If the examples are limited or biased, the model will make poor or unfair predictions. " +
      "That is why engineers spend a lot of time collecting and cleaning data before training a model. " +
      "Machine learning is now used in many everyday tools: email spam filters, product recommendations, voice assistants, and translation apps all rely on it.",
    questions: [
      { q: 'How is machine learning different from traditional software?', o: ['It needs no computer', 'It learns patterns from examples instead of fixed rules', 'It is always written in one language', 'It never makes mistakes'], a: 1,
        ex: '"instead of being told every rule, the computer learns patterns from examples" — học từ ví dụ thay vì quy tắc cố định do người viết sẵn.' },
      { q: 'To recognise cats, engineers first', o: ['write one long rule', 'show the system many labelled pictures', 'ask users to draw cats', 'delete all photos'], a: 1,
        ex: '"engineers show the system thousands of pictures already labelled" — cho hệ thống xem hàng nghìn ảnh đã gán nhãn.' },
      { q: 'The quality of the result depends heavily on', o: ['the colour of the screen', 'the data', 'the price of the computer', 'the time of day'], a: 1,
        ex: '"The quality of the result depends heavily on the data." → phụ thuộc nhiều vào dữ liệu.' },
      { q: 'What happens if the training examples are biased?', o: ['The model becomes faster', 'The model makes poor or unfair predictions', 'Nothing changes', 'The data cleans itself'], a: 1,
        ex: '"If the examples are limited or biased, the model will make poor or unfair predictions." → dự đoán kém hoặc thiếu công bằng.' },
    ],
  },
  {
    id: 'security',
    topic: 'cntt',
    level: 'B1',
    title: 'Staying Safe Online',
    passage:
      "Every day, criminals try to steal personal information such as passwords and bank details. One of the most common attacks is called phishing. " +
      "In a phishing attack, a fake email or message pretends to come from a trusted company and asks you to click a link or enter your password. " +
      "The message often creates a sense of urgency, for example warning that your account will be closed unless you act immediately. " +
      "To stay safe, never click links from unknown senders, and check the real web address before typing any password. " +
      "Experts also recommend using a different, strong password for each account, and turning on two-factor authentication. " +
      "With two-factor authentication, even if someone steals your password, they still cannot log in without a second code sent to your phone. " +
      "Good security habits are usually simple, but they protect you from most common attacks.",
    questions: [
      { q: 'What is phishing?', o: ['A type of strong password', 'A fake message that tries to steal your information', 'A safe web browser', 'A second security code'], a: 1,
        ex: '"a fake email or message pretends to come from a trusted company and asks you to... enter your password" — tin nhắn giả mạo để lừa lấy thông tin.' },
      { q: 'Phishing messages often create a sense of', o: ['humour', 'urgency', 'boredom', 'friendship'], a: 1,
        ex: '"The message often creates a sense of urgency" — tạo cảm giác GẤP GÁP để nạn nhân hành động vội.' },
      { q: 'What should you do before typing a password?', o: ['Turn off the computer', 'Check the real web address', 'Share it with a friend', 'Click every link'], a: 1,
        ex: '"check the real web address before typing any password" — kiểm tra địa chỉ web thật trước khi nhập mật khẩu.' },
      { q: 'Why is two-factor authentication useful?', o: ['It makes passwords longer', 'A thief still needs a second code to log in', 'It deletes phishing emails', 'It hides your screen'], a: 1,
        ex: '"even if someone steals your password, they still cannot log in without a second code" — dù lộ mật khẩu, kẻ gian vẫn cần mã thứ hai gửi về điện thoại.' },
    ],
  },
];
