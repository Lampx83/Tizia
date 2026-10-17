// ============================================================
// Trường CNTT — Scenarios Năm 3, phần 2/4: I3.3 + I3.4
// ============================================================

// ─── I3.3 · Trí tuệ nhân tạo ────────────────────────────────
export const I33_QUIZ = {
  id: 'I3.3-ai-quiz',
  title: 'I3.3 · Trí tuệ nhân tạo — Search, Logic, Planning, Expert Systems',
  kind: 'quiz',
  yearLevel: 3, subject: 'tri-tue-nhan-tao', difficulty: 3,
  skillsTrained: ['search-algorithms', 'knowledge-representation', 'planning', 'nlp-basics'],
  questions: [
    {
      stem: 'Thuật toán A* (A-Star) ưu việt hơn Dijkstra ở điểm nào?',
      choices: [
        'A* không cần đồ thị có trọng số',
        'A* dùng heuristic function h(n) để ước tính chi phí còn lại → tìm đường nhanh hơn khi heuristic tốt',
        'A* đảm bảo tìm đường ngắn nhất còn Dijkstra thì không',
        'A* không cần bộ nhớ để lưu visited nodes',
      ],
      answer: 1,
      explanation: 'Dijkstra: khám phá theo chi phí thực g(n) từ nguồn → tìm shortest path tối ưu nhưng mở rộng theo mọi hướng. A*: f(n) = g(n) + h(n) — g là chi phí thực đã đi, h là heuristic ước tính chi phí còn lại đến đích. Nếu h là admissible (không over-estimate), A* đảm bảo tối ưu và nhanh hơn Dijkstra vì ưu tiên hướng đến đích. Heuristic Manhattan distance cho grid map, Euclidean distance cho không gian. Greedy Best-First: chỉ dùng h(n) → nhanh nhưng không optimal. IDA*: A* tiết kiệm bộ nhớ.',
    },
    {
      stem: 'Trong AI, "Minimax" algorithm được dùng trong loại bài toán nào?',
      choices: [
        'Phân loại ảnh bằng deep learning',
        'Tối ưu hoá hyperparameter của neural network',
        'Game hai người đối kháng (zero-sum game) — tối đa hoá điểm của mình, tối thiểu hoá điểm đối thủ',
        'Nhận dạng giọng nói',
      ],
      answer: 2,
      explanation: 'Minimax: dùng cho game hai người zero-sum (cờ vua, cờ caro, tic-tac-toe). MAX player (ta) chọn nước đi maximize điểm; MIN player (đối thủ) chọn minimize. Duyệt cây game đệ quy đến terminal state hoặc depth limit → evaluation function. Alpha-Beta Pruning: tối ưu Minimax — bỏ qua nhánh không ảnh hưởng kết quả → giảm từ O(b^d) xuống O(b^(d/2)). Monte Carlo Tree Search (MCTS): dùng trong AlphaGo — thống kê ngẫu nhiên thay vì duyệt đầy đủ. Expectimax: mở rộng cho game ngẫu nhiên (bài, súc sắc).',
    },
    {
      stem: 'Propositional Logic (Logic mệnh đề) — mệnh đề nào tương đương với "Nếu P thì Q" (P → Q)?',
      choices: ['¬P ∧ Q', '¬P ∨ Q', 'P ∧ ¬Q', '¬Q → ¬P only'],
      answer: 1,
      explanation: 'P → Q = ¬P ∨ Q (tương đương định nghĩa implication). Bảng chân lý: chỉ sai khi P=T và Q=F. Contrapositive: ¬Q → ¬P (tương đương với P → Q). Inverse: ¬P → ¬Q (KHÔNG tương đương). Converse: Q → P (KHÔNG tương đương). Modus Ponens: {P→Q, P} ⊢ Q (quy tắc suy luận cơ bản). Resolution (trong DPLL/SAT solver): {P∨Q, ¬P∨R} ⊢ Q∨R. First-Order Logic (FOL): mạnh hơn propositional — có ∀ (forall), ∃ (exists), predicate, variable. Knowledge Base trong AI dùng FOL để biểu diễn tri thức.',
    },
    {
      stem: 'Natural Language Processing (NLP) — kỹ thuật "tokenization" là gì?',
      choices: [
        'Dịch tự động văn bản từ ngôn ngữ này sang ngôn ngữ khác',
        'Phân tích tình cảm (sentiment) của đoạn văn bản',
        'Chia văn bản thành các đơn vị nhỏ hơn (token): từ, ký tự hoặc subword',
        'Tóm tắt văn bản dài thành đoạn ngắn',
      ],
      answer: 2,
      explanation: 'NLP Pipeline: 1) Tokenization (tách thành token/từ), 2) Stop word removal, 3) Stemming/Lemmatization (đưa về dạng gốc), 4) POS Tagging (gán từ loại: N, V, Adj…), 5) Named Entity Recognition (NER: người, địa danh, tổ chức), 6) Parsing (phân tích cú pháp), 7) Semantic analysis. Tokenization tiếng Việt phức tạp hơn (từ đa âm tiết). Subword tokenization (BPE — Byte Pair Encoding): dùng trong GPT, BERT — cân bằng giữa từ điển nhỏ và phủ sóng từ hiếm. Word2Vec/GloVe: biểu diễn từ bằng vector (word embeddings).',
    },
    {
      stem: 'Expert System (Hệ chuyên gia) gồm các thành phần chính nào?',
      choices: [
        'Neural network + training data + GPU',
        'Knowledge Base (tri thức domain) + Inference Engine (suy luận) + User Interface',
        'Database + Web server + Frontend',
        'Sensors + Actuators + Control system',
      ],
      answer: 1,
      explanation: 'Expert System: hệ thống bắt chước chuyên gia domain. Thành phần: 1) Knowledge Base (KB) — tri thức dạng if-then rules hoặc frames, do knowledge engineer mã hoá từ domain expert; 2) Inference Engine — Forward Chaining (data-driven: từ facts suy ra conclusions, dùng khi muốn tìm mọi kết luận) hoặc Backward Chaining (goal-driven: từ goal ngược về facts, dùng khi có mục tiêu cụ thể); 3) UI — giải thích reasoning. Ví dụ: MYCIN (chẩn đoán bệnh), DENDRAL (hóa học). Hạn chế: Knowledge Acquisition Bottleneck, không tự học. ML/Deep Learning khắc phục bằng cách học tự động từ data.',
    },
    {
      stem: 'Turing Test kiểm tra điều gì trong AI?',
      choices: [
        'Tốc độ xử lý của máy tính so với não người',
        'Khả năng máy tính thể hiện hành vi thông minh không thể phân biệt với người thật qua hội thoại văn bản',
        'Khả năng robot di chuyển trong môi trường thực',
        'Độ chính xác của thuật toán phân loại ảnh',
      ],
      answer: 1,
      explanation: 'Turing Test (Alan Turing 1950, "Computing Machinery and Intelligence"): interrogator chat với người và máy qua văn bản — nếu không phân biệt được → máy "thông minh". Imitation Game. Phê phán: Chinese Room Argument (John Searle) — máy có thể pass test nhưng không thực sự "hiểu" (syntactic manipulation, không semantic understanding). ELIZA (1966): chatbot đầu tiên giả PASS Turing Test. Hiện tại: LLMs (GPT-4, Claude) pass nhiều biến thể Turing Test nhưng debate về consciousness vẫn còn. Strong AI vs Weak AI: strong AI có consciousness thật; weak AI giỏi task cụ thể.',
    },
    {
      stem: 'Constraint Satisfaction Problem (CSP) ví dụ điển hình là:',
      choices: [
        'Tìm đường ngắn nhất trong đồ thị',
        'Tô màu bản đồ sao cho không có hai vùng kề nhau cùng màu',
        'Sắp xếp một mảng số theo thứ tự tăng dần',
        'Nhân ma trận để huấn luyện neural network',
      ],
      answer: 1,
      explanation: 'CSP: variables + domains + constraints. Tô màu bản đồ: variable = vùng, domain = màu sắc, constraint = 2 vùng kề nhau khác màu. Giải CSP: Backtracking Search + pruning. Arc Consistency (AC-3): loại bỏ giá trị không thoả arc constraint → thu nhỏ domain. Heuristics: MRV (Minimum Remaining Values — chọn variable ít lựa chọn nhất), Degree Heuristic, Least Constraining Value. Ứng dụng: sudoku, xếp lịch thi, n-queens, circuit board design. 4-Color Theorem: mọi bản đồ phẳng chỉ cần 4 màu (chứng minh 1976 bằng máy tính).',
    },
    {
      stem: 'Trong AI Planning, STRIPS (Stanford Research Institute Problem Solver) biểu diễn action bằng:',
      choices: [
        'Hàm xác suất Bayesian',
        'Preconditions (điều kiện trước) + Add list (effects thêm) + Delete list (effects xóa)',
        'Neural network với reinforcement learning',
        'Cây quyết định phân nhánh theo thông tin gain',
      ],
      answer: 1,
      explanation: 'STRIPS: mỗi action có Preconditions (facts phải true để execute), Add List (facts trở thành true sau action), Delete List (facts trở thành false sau action). Ví dụ: MoveBlock(A, B, C): Pre: On(A,B), Clear(A), Clear(C); Add: On(A,C), Clear(B); Delete: On(A,B), Clear(C). Forward planning: từ initial state, áp dụng actions đến goal. Backward planning: từ goal ngược về. PDDL (Planning Domain Definition Language): chuẩn hoá STRIPS hiện đại. Heuristic Planning: FastDownward, FF planner. Ứng dụng: robotics, logistics, game AI.',
    },
    {
      stem: "Bayes' Theorem ứng dụng trong AI — spam filter hoạt động theo nguyên lý nào?",
      choices: [
        'Tìm kiếm từ khoá cố định trong email',
        'Tính xác suất email là spam P(spam|words) dựa trên tần suất từ trong email spam/ham đã biết',
        'Dùng deep learning phân loại ảnh đính kèm',
        'Kiểm tra địa chỉ IP gửi trong blacklist',
      ],
      answer: 1,
      explanation: 'Naive Bayes Classifier: P(spam|w1,w2,...,wn) ∝ P(spam) × ∏P(wi|spam). "Naive" vì giả định các từ độc lập có điều kiện (thực tế không đúng nhưng vẫn hoạt động tốt). Huấn luyện: đếm tần suất từ trong email spam và ham. Smoothing (Laplace): cộng 1 vào count để tránh zero probability cho từ chưa gặp. Ưu điểm: cực nhanh train + test, tốt với text, ít data. Nhược: giả định independence thường sai. Bayes: P(A|B) = P(B|A)×P(A)/P(B). Prior P(spam) ≈ 0.5; update liên tục khi có data mới → Bayesian learning.',
    },
    {
      stem: 'Reinforcement Learning (RL) khác Supervised Learning ở điểm cơ bản nào?',
      choices: [
        'RL cần nhiều data labeled hơn Supervised Learning',
        'RL học qua tương tác với môi trường và nhận reward/penalty, không cần data labeled sẵn',
        'RL chỉ dùng cho game, Supervised Learning dùng cho mọi bài toán',
        'RL nhanh hơn Supervised Learning vì không cần huấn luyện',
      ],
      answer: 1,
      explanation: 'RL: Agent → Action → Environment → State + Reward → Agent. Học policy π: state → action để maximize cumulative reward. Không cần human-labeled data. Thành phần: Policy (chiến lược), Value Function (ước tính reward tương lai), Q-Function Q(s,a), Model (tùy chọn). Q-Learning: off-policy, học Q-table. Deep Q-Network (DQN): neural network xấp xỉ Q-function (DeepMind Atari 2013). Policy Gradient (REINFORCE, PPO, A3C): học trực tiếp policy. AlphaGo: kết hợp MCTS + RL + Supervised. Ứng dụng: robotics, game (OpenAI Five), autonomous driving, recommendation systems, AlphaFold.',
    },
  ],
};

// ─── I3.4 · Machine Learning ────────────────────────────────
export const I34_QUIZ = {
  id: 'I3.4-ml-quiz',
  title: 'I3.4 · Machine Learning — Regression, Classification, Clustering, Neural Nets',
  kind: 'quiz',
  yearLevel: 3, subject: 'machine-learning', difficulty: 3,
  skillsTrained: ['supervised-learning', 'unsupervised', 'neural-networks', 'evaluation', 'feature-engineering'],
  questions: [
    {
      stem: 'Overfitting trong Machine Learning xảy ra khi:',
      choices: [
        'Mô hình có quá ít tham số để học được pattern từ data',
        'Mô hình học thuộc data huấn luyện (kể cả noise) nhưng generalize kém trên data mới',
        'Training data có quá nhiều mẫu',
        'Learning rate quá nhỏ nên model không hội tụ',
      ],
      answer: 1,
      explanation: 'Overfitting (high variance): model quá phức tạp → memorize training data → train accuracy cao nhưng validation/test accuracy thấp. Underfitting (high bias): model quá đơn giản → không học được pattern → accuracy thấp cả train lẫn test. Phát hiện: learning curves (train loss giảm nhưng validation loss tăng). Giải pháp overfitting: Regularization (L1/Lasso, L2/Ridge), Dropout (NN), Early Stopping, More data, Data Augmentation, Cross-Validation, Simpler model. Bias-Variance Tradeoff: giảm bias thường tăng variance và ngược lại.',
    },
    {
      stem: 'Thuật toán K-Means Clustering thuộc loại học nào?',
      choices: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Semi-supervised Learning'],
      answer: 1,
      explanation: 'K-Means: Unsupervised — không có label. Thuật toán: 1) Chọn K centroid ngẫu nhiên; 2) Gán mỗi điểm vào cluster gần nhất (Euclidean distance); 3) Tính lại centroid = mean của cluster; 4) Lặp đến hội tụ. Chọn K: Elbow Method (plot inertia vs K, tìm "khuỷu tay"). Nhược: nhạy cảm với initialization (dùng K-Means++ để khắc phục), giả định cluster hình cầu bằng nhau, K phải biết trước. Hierarchical Clustering: không cần K trước, tạo dendrogram. DBSCAN: phát hiện cluster hình dạng bất kỳ + noise points. Gaussian Mixture Models (GMM): soft assignment, dùng EM algorithm.',
    },
    {
      stem: 'Trong Neural Network, hàm Sigmoid có nhược điểm gì khiến ReLU được ưa chuộng hơn ở hidden layers?',
      choices: [
        'Sigmoid tính toán chậm hơn ReLU',
        'Sigmoid gây Vanishing Gradient problem — gradient gần 0 ở vùng bão hoà, học chậm ở layers sâu',
        'Sigmoid chỉ hoạt động với binary classification',
        'Sigmoid không có đạo hàm',
      ],
      answer: 1,
      explanation: 'Sigmoid: f(x) = 1/(1+e^(-x)), output [0,1]. Vanishing Gradient: ở vùng x>>0 hoặc x<<0, đạo hàm sigmoid ≈ 0 → gradient lan truyền qua nhiều layers → nhỏ dần → layers đầu học rất chậm. ReLU: f(x) = max(0,x) — đạo hàm = 1 khi x>0 → không vanish. Dying ReLU: node chết (luôn output 0) khi input luôn âm. Leaky ReLU, ELU, GELU khắc phục. Tanh: [-1,1], vẫn vanish nhưng symmetric hơn sigmoid. Batch Normalization cũng giảm vanishing gradient. Residual connections (ResNet) giải quyết cho mạng rất sâu.',
    },
    {
      stem: 'Cross-Validation (k-fold) được dùng để làm gì?',
      choices: [
        'Tăng tốc quá trình training bằng cách chia data thành nhiều batch',
        'Đánh giá model tổng quát hơn bằng cách train+validate trên k tập con khác nhau của data, giảm variance trong ước lượng',
        'Tự động chọn kiến trúc neural network tối ưu',
        'Mã hoá dữ liệu trước khi đưa vào model',
      ],
      answer: 1,
      explanation: 'k-Fold CV: chia data thành k phần bằng nhau; k lần: dùng 1 fold làm validation, k-1 fold làm train → trung bình k điểm accuracy. k=5 hoặc k=10 phổ biến. Lợi ích: mọi điểm đều được dùng cho cả train và validate → ước lượng ổn định hơn train/test split đơn giản. Stratified k-Fold: giữ tỉ lệ class trong mỗi fold (quan trọng với imbalanced data). Leave-One-Out (LOO): k=n, chậm nhưng ít bias nhất. Dùng CV để: chọn hyperparameter (model selection), ước lượng generalization error. Không leak test set vào quá trình chọn model.',
    },
    {
      stem: 'Precision và Recall trong bài toán phân loại — F1-score kết hợp chúng như thế nào?',
      choices: [
        'F1 = (Precision + Recall) / 2 (trung bình số học)',
        'F1 = 2 × Precision × Recall / (Precision + Recall) (trung bình điều hoà)',
        'F1 = Precision × Recall (tích)',
        'F1 = max(Precision, Recall)',
      ],
      answer: 1,
      explanation: 'Confusion Matrix: TP/FP/TN/FN. Precision = TP/(TP+FP) — trong các predicted positive, bao nhiêu % đúng (ưu tiên khi FP costly: spam filter — không muốn block email hợp lệ). Recall = TP/(TP+FN) — trong các actual positive, detect được bao nhiêu % (ưu tiên khi FN costly: ung thư — không muốn bỏ sót). F1 = harmonic mean của Precision + Recall → phạt nặng khi một trong hai thấp. F-beta: Fβ = (1+β²)×P×R/(β²P+R), β>1 ưu tiên Recall, β<1 ưu tiên Precision. ROC-AUC: đánh giá tổng thể ở mọi threshold.',
    },
    {
      stem: 'Gradient Descent cập nhật tham số θ theo công thức nào?',
      choices: [
        'θ = θ + α × ∇J(θ)',
        'θ = θ - α × ∇J(θ)',
        'θ = θ × (1 - α × ∇J(θ))',
        'θ = ∇J(θ) / α',
      ],
      answer: 1,
      explanation: 'θ = θ - α × ∇J(θ): trừ gradient nhân learning rate α để di chuyển về phía giảm cost J. α (learning rate): quá nhỏ → chậm hội tụ; quá lớn → dao động, phân kỳ. Batch GD: tính gradient trên toàn dataset — ổn định nhưng chậm. SGD: gradient trên 1 mẫu — nhanh, noisy. Mini-batch GD: k mẫu — cân bằng tốt nhất. Momentum: thêm "quán tính" tránh dao động. Adam (Adaptive Moment Estimation): kết hợp Momentum + RMSprop, tự điều chỉnh lr per-parameter → phổ biến nhất hiện tại. Learning rate scheduler: giảm lr theo thời gian. Local minimum vs Global minimum — thực tế DL có nhiều saddle points hơn local min.',
    },
    {
      stem: 'Transfer Learning (học chuyển giao) là gì và khi nào nên dùng?',
      choices: [
        'Copy model từ paper và chạy lại từ đầu với data của mình',
        'Tái sử dụng model đã train trên task lớn (pretrain), fine-tune trên task nhỏ/domain cụ thể — tiết kiệm data và compute',
        'Chuyển đổi model giữa các ngôn ngữ lập trình khác nhau',
        'Dùng khi không có GPU và cần train trên CPU',
      ],
      answer: 1,
      explanation: 'Transfer Learning: pretrain trên large dataset (ImageNet cho vision, C4/WebText cho NLP) → fine-tune trên task mục tiêu với ít data. Tại sao hoạt động: layers đầu học features chung (edges, shapes, ngữ pháp) → layers cuối học task-specific. Strategies: Feature Extraction (freeze pretrained, chỉ train classifier head), Fine-Tuning (unfreeze + train với lr nhỏ). Ví dụ: ResNet pretrained ImageNet → fine-tune nhận dạng bệnh từ X-ray (chỉ cần vài nghìn ảnh). NLP: BERT, GPT fine-tune → sentiment analysis, NER, Q&A. Foundation Models (GPT-4, Claude): pretrain cực lớn, few-shot/zero-shot adaption.',
    },
    {
      stem: 'Feature Engineering — "Feature Scaling" (chuẩn hoá đặc trưng) quan trọng nhất với thuật toán nào?',
      choices: [
        'Decision Tree và Random Forest — rất nhạy cảm với scale',
        'Linear Regression, SVM, KNN, Neural Networks — dùng distance hoặc gradient nên cần cùng scale',
        'K-Means không cần vì dùng centroid',
        'Naive Bayes — xác suất tự động chuẩn hoá',
      ],
      answer: 1,
      explanation: 'Feature Scaling cần thiết khi thuật toán: dùng distance (KNN, SVM, K-Means), gradient descent (Linear/Logistic Regression, NN — converge nhanh hơn), hoặc regularization (L1/L2 — penalize mọi feature bằng nhau). Phương pháp: Min-Max Normalization: [0,1] = (x-min)/(max-min) — nhạy với outlier. Z-score Standardization: (x-μ)/σ — phổ biến hơn, xử lý outlier tốt hơn. Decision Tree/Random Forest: split theo threshold → không cần scaling. Naive Bayes: feature conditional probability — không bị ảnh hưởng scale. Feature Selection: loại bỏ redundant features (correlation, mutual information). PCA: giảm chiều, kết hợp features.',
    },
    {
      stem: 'Random Forest là gì và nó giải quyết hạn chế nào của Decision Tree?',
      choices: [
        'Phiên bản nhỏ hơn của Decision Tree dùng cho mobile',
        'Ensemble nhiều Decision Trees độc lập (bootstrap samples + random features), vote majority → giảm overfitting so với single tree',
        'Decision Tree được train trên GPU để chạy nhanh hơn',
        'Decision Tree với max depth = 1 (stump)',
      ],
      answer: 1,
      explanation: 'Decision Tree: dễ overfit (cây sâu memorize training), nhạy với data changes. Random Forest: Bagging (Bootstrap Aggregating) + Feature Randomness. Mỗi tree: train trên bootstrap sample (sampling with replacement) và chỉ xét subset ngẫu nhiên features ở mỗi split → trees độc lập, khác nhau. Prediction: vote (classification) hoặc average (regression). Lợi ích: giảm variance → ít overfit, robust, parallel training, feature importance. Nhược: không interpretable như single tree. Gradient Boosting (XGBoost, LightGBM): sequential trees, mỗi tree fix errors của trước → giảm bias → thường outperform Random Forest trên tabular data.',
    },
    {
      stem: 'Convolutional Neural Network (CNN) dùng đặc biệt hiệu quả cho:',
      choices: [
        'Xử lý chuỗi văn bản theo thứ tự thời gian',
        'Dữ liệu dạng lưới có tính cục bộ (spatial locality) như ảnh — phát hiện đặc trưng cục bộ (edges, textures)',
        'Bài toán Q&A dạng hội thoại',
        'Dự báo chuỗi thời gian tài chính',
      ],
      answer: 1,
      explanation: 'CNN: được lấy cảm hứng từ visual cortex. Convolution layer: filter/kernel trượt trên ảnh → feature map, phát hiện patterns cục bộ (edges, corners, textures). Weight sharing: cùng filter áp dụng toàn ảnh → ít tham số hơn FC. Pooling (Max/Average): giảm spatial dimensions, translation invariance. Kiến trúc điển hình: Conv → ReLU → Pool → [repeat] → Flatten → FC → Softmax. LeNet, AlexNet (2012 ImageNet breakthrough), VGG, ResNet (skip connections, 152 layers), EfficientNet. CNN cũng dùng cho NLP (1D conv), audio. Vision Transformer (ViT): patch-based attention — cạnh tranh CNN trên large data.',
    },
  ],
};
