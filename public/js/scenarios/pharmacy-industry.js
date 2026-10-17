// ============================================================
// Pharmacy Industry Practice — 4 quizzes (40 questions)
// PS17 QA/Audit · PS18 Regulatory CTD · PS19 Đấu thầu BV · PS20 Pharmacovigilance
// ============================================================
// Sources: ICH Q7/Q9/Q10/Q11, EU GMP Annex 11, ISO 19011:2018,
// ASEAN CTD v2, Thông tư 32/2018 (đăng ký thuốc BYT VN),
// Thông tư 15/2019 (đấu thầu thuốc), Thông tư 09/2023 (đấu thầu),
// WHO-UMC causality scale, EMA GVP Module I/VI/IX, ICH E2A/E2D/E2E.
// ============================================================

export const PS17_QUIZ = {
  id: 'PS17-quiz-01',
  title: 'PS17 · Phòng QA — Audit & SOP',
  kind: 'quiz', yearLevel: 5, subject: 'quality-assurance', difficulty: 4,
  skillsTrained: ['gmp-qa', 'audit', 'sop-writing', 'capa', 'data-integrity'],
  questions: [
    {
      stem: 'Khác biệt cốt lõi giữa QC (Quality Control) và QA (Quality Assurance) trong nhà máy dược?',
      choices: [
        'QC kiểm tra sản phẩm cuối; QA viết SOP — cả hai độc lập với sản xuất',
        'QC là các hoạt động kiểm tra/đo lường để phát hiện lỗi; QA là hệ thống phòng ngừa toàn diện bảo đảm chất lượng được tích hợp vào mọi giai đoạn — QA bao gồm QC',
        'QC chịu trách nhiệm thu hồi; QA chịu trách nhiệm sản xuất',
        'Hai khái niệm đồng nghĩa trong GMP hiện đại'
      ],
      answer: 1,
      explanation: 'ICH Q10: QC = kiểm thử, đo lường phát hiện lỗi (thử nghiệm IPC, release); QA = hệ thống tổng thể bảo đảm chất lượng bằng thiết kế và phòng ngừa (gồm GMP, GDP, GCP). QA bao gồm QC. Phòng QA phê duyệt batch record, quản lý deviation, audit, CAPA. EU GMP Part I Ch. 1.'
    },
    {
      stem: 'Audit nội bộ (internal audit) theo GMP phải được thực hiện bởi ai?',
      choices: [
        'Chỉ GMP inspector từ Bộ Y tế',
        'Nhân viên độc lập với bộ phận được kiểm tra — có thể là người trong công ty hoặc bên ngoài, quan trọng là độc lập và có năng lực',
        'Trưởng bộ phận sản xuất tự kiểm tra bộ phận mình',
        'Chỉ QC lab technician'
      ],
      answer: 1,
      explanation: 'EU GMP Part I Ch. 9 (Self-inspection): audit do đội độc lập với hoạt động được kiểm tra, có đủ năng lực chuyên môn. Không nhất thiết là bên ngoài — nhân viên QA nội bộ có thể audit bộ phận sản xuất nếu đảm bảo độc lập. ISO 19011:2018 hướng dẫn nguyên tắc audit. Kết quả và CAPA ghi nhận đầy đủ.'
    },
    {
      stem: 'Một SOP có hiệu lực đang dùng cần thay đổi nhỏ (bổ sung 1 bước an toàn). Quy trình đúng GMP?',
      choices: [
        'Ghi tay vào bản gốc, ký tên',
        'Dùng máy tính sửa trực tiếp file, lưu đè lên phiên bản cũ',
        'Khởi tạo Change Control, soạn phiên bản mới, review đa phòng ban, phê duyệt QA, phân phối, đào tạo nhân viên, lưu trữ phiên bản cũ theo chính sách retention',
        'Gửi email thông báo thay đổi cho nhân viên là đủ'
      ],
      answer: 2,
      explanation: 'ICH Q10 Change Management: mọi thay đổi SOP đều qua Change Control chính thức — đánh giá tác động, phê duyệt đa phòng (QA, sản xuất, nếu cần regulatory), version mới phát hành có số hiệu tăng, đào tạo nhân viên (ghi nhận chữ ký), bản cũ rút khỏi lưu hành và lưu trữ. Sửa tay hoặc lưu đè vi phạm data integrity (ALCOA — Original).'
    },
    {
      stem: 'OOS (Out-of-Specification) investigation: bước nào KHÔNG thuộc Phase 1 (Laboratory investigation)?',
      choices: [
        'Xem xét lại tính toán, cân mẫu, pha loãng',
        'Kiểm tra thiết bị, hiệu chuẩn, thuốc thử, chất chuẩn',
        'Retest toàn bộ batch bởi phòng thứ 3',
        'Kiểm tra kỹ năng analyst và phương pháp thực hiện'
      ],
      answer: 2,
      explanation: 'FDA 2006 OOS guideline và EU GMP Ch. 6: Phase 1 = lab investigation (tìm assignable cause: tính toán, thiết bị, thuốc thử, analyst error, thủ tục). Nếu Phase 1 tìm ra assignable cause → invalidate, retest hợp lệ. Nếu không tìm được → Phase 2 (production investigation, full batch retest tối đa 2 lần). Retest bởi phòng thứ 3 không phải Phase 1.'
    },
    {
      stem: 'Nguyên tắc ALCOA+ trong data integrity — "Contemporaneous" có nghĩa là?',
      choices: [
        'Dữ liệu đọc được (legible)',
        'Dữ liệu ghi ngay tại thời điểm hoạt động xảy ra, không ghi lại sau',
        'Dữ liệu được bảo tồn lâu dài',
        'Dữ liệu được quy về người thực hiện'
      ],
      answer: 1,
      explanation: 'ALCOA+: Attributable (ai ghi?), Legible (đọc được?), Contemporaneous (ghi ngay lúc làm, không hồi ký), Original (bản gốc/bản sao đúng quy định), Accurate (chính xác). "+" = Complete, Consistent, Enduring, Available. Ghi nhật ký phòng sạch sau ca, điền batch record cuối ngày → vi phạm Contemporaneous. FDA, MHRA, WHO đều điều tra trường hợp này.'
    },
    {
      stem: 'Batch Record Review (BRR) trước khi QA phê duyệt release. Điều nào KHÔNG ổn?',
      choices: [
        'IPC kết quả nằm trong specification đã được phê duyệt',
        'Deviation nhỏ đã được ghi nhận, điều tra và đóng với CAPA hợp lý',
        'Một IPC pH = 5.9 (spec 6.0–7.0) được QA bỏ qua vì "gần đạt"',
        'Yield tính toán nằm trong phạm vi expected yield đã validate'
      ],
      answer: 2,
      explanation: 'BRR phải hoàn chỉnh và nghiêm ngặt. IPC ngoài spec = OOS — không được QA "bỏ qua"; phải mở deviation, điều tra, quyết định disposition (reject/reprocess/rework) đúng quy trình. pH 5.9 < 6.0 là ngoài spec — batch cần đánh giá đầy đủ. EU GMP Ch. 4 và 6.'
    },
    {
      stem: 'Risk assessment theo ICH Q9: công cụ nào phù hợp nhất để phân tích FAILURE MODES và hậu quả trong quy trình đông khô (lyophilization)?',
      choices: [
        'Fishbone diagram (Ishikawa) — phân tích nguyên nhân gốc rễ',
        'FMEA (Failure Mode and Effects Analysis) — xác định failure modes, tác động, khả năng phát hiện; tính RPN để ưu tiên CAPA',
        'Control chart (Shewhart) — theo dõi thống kê quá trình',
        'Decision tree — phân loại nguy cơ đơn giản'
      ],
      answer: 1,
      explanation: 'ICH Q9: FMEA đặc biệt hữu ích cho quy trình phức tạp — liệt kê từng failure mode (VD: shelf temp không đạt target, áp suất buồng lỗi), tác động lên CQA (hoạt tính, moisture content), khả năng xảy ra/phát hiện, tính RPN (Risk Priority Number) để ưu tiên. HAZOP phù hợp thiết bị/quy trình liên tục. Fishbone = RCA, không dùng để xác định failure modes tiên lượng.'
    },
    {
      stem: 'Supplier qualification cho nguyên liệu hoạt chất API mới. Thứ tự đúng?',
      choices: [
        'Mua thử 1 kg → nếu pass QC thì dùng luôn',
        'Quality questionnaire → audit tại nhà máy supplier (nếu critical) → mẫu thử nghiệm so sánh specs → qualification batch (min 3) → phê duyệt AVL → monitoring định kỳ',
        'Chỉ cần CoA từ supplier kèm CoO',
        'Audit bởi bên thứ 3 là đủ, không cần tự audit'
      ],
      answer: 1,
      explanation: 'EU GMP Ch. 5 & 7, ICH Q7 API GMP: supplier qualification đầy đủ gồm: questionnaire → risk assessment → audit (onsite nếu critical/high risk) → analytical comparison (3 batch) → đưa vào Approved Vendor List (AVL) → periodic re-qualification (thường 1–3 năm hoặc khi có thay đổi). CoA cần nhưng không đủ — phải verify bằng thử nghiệm của mình ít nhất lần đầu.'
    },
    {
      stem: 'Sau audit bên ngoài (customer audit), nhà máy nhận 1 critical finding và 3 major findings. Timeline CAPA hợp lý?',
      choices: [
        'Gửi CAPA plan trong 5 năm là chấp nhận được',
        'Critical: corrective action ngay lập tức (24–72h tùy mức độ), CAPA plan 15–30 ngày; Major: CAPA plan 30–60 ngày; effectiveness check sau khi implement',
        'Chỉ fix trước khi inspection tiếp theo',
        'Critical và major xử lý cùng timeline 6 tháng'
      ],
      answer: 1,
      explanation: 'GMP convention: Critical finding = nguy cơ trực tiếp đến an toàn bệnh nhân → immediate action và notification; CAPA plan 15–30 ngày. Major = vi phạm GMP đáng kể → CAPA 30–60 ngày. Effectiveness check (verify CAPA thực sự giải quyết vấn đề) sau 3–6 tháng implement. Không phê duyệt CAPA mà không có effectiveness verification. EU GMP inspection terminology.'
    },
    {
      stem: 'Phòng sạch Grade B, Annex 1 2022: hoạt động nào KHÔNG được phép?',
      choices: [
        'Mặc gown vô trùng trước khi vào',
        'Chạy ra vào nhiều lần để lấy dụng cụ quên',
        'Thực hiện aseptic transfer vào và ra Grade A isolator',
        'Đứng quan sát quá trình filling khi mặc full gown'
      ],
      answer: 1,
      explanation: 'Annex 1 2022: Grade A/B — số người tối thiểu, di chuyển chậm và có kiểm soát, không ra vào nhiều lần (mỗi lần ra vào phá vỡ air barrier, tăng particulate và microbial load). Quy trình cần hoạch định đầy đủ dụng cụ trước khi vào. Behavior in cleanroom là CCP (Critical Control Point) cho contamination control strategy (CCS).'
    }
  ]
};

export const PS18_QUIZ = {
  id: 'PS18-quiz-01',
  title: 'PS18 · Đăng ký thuốc — Dossier CTD',
  kind: 'quiz', yearLevel: 5, subject: 'regulatory', difficulty: 4,
  skillsTrained: ['regulatory-affairs', 'ctd-dossier', 'clinical-data', 'stability', 'bioequivalence'],
  questions: [
    {
      stem: 'CTD (Common Technical Document) có mấy Module và Module nào không bị "region-specific" (giống nhau ở mọi thị trường)?',
      choices: [
        '3 Modules; M2–M3 toàn cầu, M1 khu vực',
        '5 Modules; M2–M5 giống nhau toàn cầu — M1 (Administrative) thay đổi theo từng nước/khu vực',
        '5 Modules; M1–M3 giống nhau, M4–M5 khu vực',
        '4 Modules; tất cả toàn cầu'
      ],
      answer: 1,
      explanation: 'ICH M4 CTD: 5 modules — M1 (Administrative & Prescribing Info, regional-specific), M2 (Summaries: QOS, nonclinical/clinical overview), M3 (Quality — CMC), M4 (Nonclinical), M5 (Clinical). M2–M5 harmonized toàn cầu. ASEAN CTD (ACTD) có cấu trúc tương tự: P1 (Administrative, regional) + P2–P5. BYT VN TT 32/2018 yêu cầu nộp ACTD cho thuốc generic mới đăng ký.'
    },
    {
      stem: 'Bioequivalence (BE) study để đăng ký generic drug tại Việt Nam — khi nào được miễn (waiver) thử BE in vivo?',
      choices: [
        'Khi sản phẩm generic có giá rẻ hơn brand ≥ 30%',
        'Waiver được chấp nhận theo tiêu chí Biopharmaceutics Classification System (BCS): thuốc thuộc BCS class I (high solubility, high permeability) với điều kiện bào chế rapid dissolution; một số BCS class III nhất định; hoặc product được chứng minh có tỷ lệ hòa tan tương tự "dissolution profile comparison" (f2 ≥ 50)',
        'Khi nhà sản xuất generic đã đăng ký tại EU hoặc FDA',
        'Khi sản phẩm là dạng dung dịch uống'
      ],
      answer: 1,
      explanation: 'WHO TRS 937 / EMA BE guideline / BYT hướng dẫn BE: BCS-based biowaivers chấp nhận cho class I (high sol + high perm) khi rapid dissolution (≥ 85% hòa tan trong 30 min ở pH 1.2, 4.5, 6.8). Class III có thể waive nếu dissolution rất nhanh. Dung dịch uống cũng thường waived. Parenteral IV không cần BE. Waiver cần hồ sơ dissolution profile đầy đủ.'
    },
    {
      stem: 'Module 3 (Quality) của CTD — phần 3.2.P (Drug Product) không bao gồm mục nào sau đây?',
      choices: [
        '3.2.P.1 — Description and Composition',
        '3.2.P.2 — Pharmaceutical Development',
        '3.2.P.8 — Stability',
        '3.2.A.1 — Facilities and Equipment'
      ],
      answer: 3,
      explanation: 'CTD M3 structure: 3.2.P (Drug Product) gồm P.1–P.8 (composition, dev, manufacture, controls, reference standards, container closure, stability). 3.2.A là Appendices (facilities, adventitious agents, novel excipients). 3.2.S là Drug Substance (API). Phần 3.2.A.1 (Facilities & Equipment) thuộc Appendices, không thuộc 3.2.P. Phân biệt cấu trúc CTD là kỹ năng RA cơ bản.'
    },
    {
      stem: 'Stability study theo ICH Q1A(R2) cho thuốc "Intermediate climatic zone" (Zone II: 25°C/60%RH). Long-term testing cần bao lâu để đăng ký lần đầu?',
      choices: [
        '6 tháng là đủ để nộp hồ sơ',
        '12 tháng data long-term + 6 tháng accelerated (40°C/75%RH) tối thiểu khi nộp; long-term tiếp tục đến hết shelf-life đề xuất',
        '36 tháng đầy đủ trước khi nộp',
        'Chỉ accelerated study 6 tháng là đủ'
      ],
      answer: 1,
      explanation: 'ICH Q1A(R2): khi nộp NDA/MAA, cần ≥ 12 tháng long-term (25°C/60%RH, Zone II) + 6 tháng accelerated (40°C/75%RH). Shelf-life được đề xuất không quá gấp đôi dữ liệu có tại thời điểm nộp (thường 24 tháng nếu có 12 tháng data + trend tốt). Study tiếp tục post-approval để confirm. Zone IVb (VN, ASEAN) = 30°C/75%RH long-term.'
    },
    {
      stem: 'Post-approval variation: thay đổi nhà sản xuất API từ nhà cung cấp đã đăng ký sang nhà cung cấp mới chưa đăng ký. Theo EMA, đây là loại variation gì?',
      choices: [
        'Type IA — không cần thông báo',
        'Type IB — thông báo sau 12 tháng',
        'Type II — phê duyệt trước khi thực hiện (major variation) do tác động tiềm năng đến chất lượng/an toàn',
        'Annual report — chỉ ghi nhận định kỳ'
      ],
      answer: 2,
      explanation: 'EMA Variation Regulation (EC 1234/2008): thay đổi nhà sản xuất API sang nguồn mới chưa đăng ký = thay đổi quan trọng về chất lượng (CMC change) → Type II major variation, phải nộp trước (prior approval, review 60–90 ngày) với full supplier qualification package + comparative data. Type IA/IB = minor. Tại VN (TT 08/2022), gọi là "thay đổi lớn" — cần nộp bổ sung và được phê duyệt trước khi sử dụng.'
    },
    {
      stem: 'Regulatory Affairs VN: thuốc generic mới đăng ký lần đầu tại Việt Nam cần nộp hồ sơ theo cơ sở dữ liệu/format nào?',
      choices: [
        'Hồ sơ tự do, không có quy định cụ thể',
        'CTD format (M1–M5), với M1 theo mẫu BYT/Cục Quản lý Dược (DAV); nếu generic đã có MAA/NDA tại ICH region (EU/US/JP/Canada/Australia) hoặc WHO PQ thì được xem xét theo fast-track',
        'Chỉ cần nộp CoA và phiếu kiểm nghiệm',
        'ACTD không cần số đăng ký (số SĐK) nếu đã có EMA approval'
      ],
      answer: 1,
      explanation: 'Thông tư 32/2018/TT-BYT và văn bản cập nhật: thuốc generic nộp hồ sơ ACTD (ASEAN CTD) đối với sản phẩm mới. M1 theo mẫu DAV (đơn đăng ký, tóm tắt, PI tiếng Việt). Sản phẩm đã có approval từ Stringent Regulatory Authority (ICH members/WHO PQ) được ưu tiên xem xét rút gọn. Sau khi cấp SĐK, thuốc mới được nhập/sản xuất trong nước.'
    },
    {
      stem: 'IND (Investigational New Drug) application — tài liệu nào KHÔNG bắt buộc trong IND initial submission (theo FDA 21 CFR Part 312)?',
      choices: [
        'Investigator Brochure (IB)',
        'Phase 1 protocol và Informed Consent Form mẫu',
        'CMC information (drug composition, manufacturer)',
        'Full clinical trial results từ Phase 3 (pivotal trials)'
      ],
      answer: 3,
      explanation: 'IND initial = trước khi bắt đầu Phase 1 ở người. Cần: IB (preclinical + clinical data tóm tắt), protocol, ICF template, CMC (composition, manufacture, quality control), nonclinical pharmacology/toxicology. Phase 3 pivotal data rõ ràng chưa có ở giai đoạn IND. Phase 3 data nộp cùng NDA/BLA sau khi hoàn thành clinical development.'
    },
    {
      stem: 'Accelerated approval pathway (EMA: Conditional Marketing Authorization) được áp dụng khi?',
      choices: [
        'Công ty muốn tung sản phẩm nhanh hơn đối thủ',
        'Sản phẩm giải quyết unmet medical need nặng; benefit/risk ratio dương tính dù dữ liệu chưa đầy đủ (comprehensive); yêu cầu cung cấp comprehensive data sau approval trong thời gian xác định',
        'Sản phẩm OTC không cần prescription',
        'Generic drug đã có BE data'
      ],
      answer: 1,
      explanation: 'EMA Conditional MA (Regulation EC 726/2004): dành cho sản phẩm điều trị bệnh nặng/đe dọa tính mạng, unmet need, benefit > risk dù data chưa đủ (thường thiếu long-term OS data). Điều kiện: sponsor cam kết nộp comprehensive data trong thời hạn. Annually renewable cho đến khi data đầy đủ → chuyển sang full MA. FDA tương tự: Accelerated Approval (Subpart H/E). VD: nhiều ung thư học.'
    },
    {
      stem: 'Specification của thuốc thành phẩm (drug product): mục nào KHÔNG bao giờ vắng mặt trong release specification thuốc viên nén?',
      choices: [
        'Thử nghiệm vi sinh (microbial limits)',
        'Appearance, identification, assay (định lượng), related substances/impurities, dissolution, uniformity of dosage units',
        'Sterility test',
        'Endotoxin/pyrogen test'
      ],
      answer: 1,
      explanation: 'ICH Q6A release specification cho thuốc viên nén không vô trùng: appearance, identification, assay, impurities/related substances, dissolution/disintegration, uniformity of dosage units (UDU theo BP/Ph.Eur/USP). Microbial limits (not sterility — viên nén không phải sterile) thường trong specification nhưng có thể periodic. Sterility và endotoxin KHÔNG yêu cầu cho viên nén thường — chỉ cho sản phẩm tiêm/nhãn khoa vô trùng.'
    },
    {
      stem: 'Shelf-life của thuốc được đề xuất là 24 tháng. Dữ liệu tối thiểu cần để cơ quan quản lý chấp nhận shelf-life này theo ICH Q1A?',
      choices: [
        '6 tháng long-term',
        '24 tháng long-term đầy đủ',
        '12 tháng long-term + 6 tháng accelerated, trending hợp lệ — hoặc 18 tháng nếu đề xuất 36 tháng',
        'Chỉ cần in-use stability 7 ngày'
      ],
      answer: 2,
      explanation: 'ICH Q1E (evaluation of stability data): shelf-life đề xuất thường không vượt quá 2× thời gian long-term có thực tế, tối đa không có extrapolation. Để shelf-life 24 tháng: cần 12 tháng long-term data + regression/trend analysis + 6 tháng accelerated (để phát hiện degradation nhanh). Nếu muốn 36 tháng: cần 18 tháng. Study tiếp tục post-approval đến 24 tháng (confirm). Extrapolation phải justified bằng data và kinetics.'
    }
  ]
};

export const PS19_QUIZ = {
  id: 'PS19-quiz-01',
  title: 'PS19 · Đấu thầu BV — Bid Preparation',
  kind: 'quiz', yearLevel: 5, subject: 'tender', difficulty: 4,
  skillsTrained: ['hospital-tender', 'bid-document', 'drug-procurement', 'pricing', 'regulatory-vn'],
  questions: [
    {
      stem: 'Theo Thông tư 15/2019/TT-BYT (hướng dẫn mua sắm tập trung cấp quốc gia), nhóm thuốc nào được đấu thầu tập trung cấp quốc gia bắt buộc?',
      choices: [
        'Tất cả các thuốc biệt dược gốc',
        'Thuốc generic và biệt dược gốc trong danh mục Bộ Y tế ban hành hàng năm — thuốc sử dụng số lượng lớn, nhiều cơ sở sử dụng, có thể tập trung để đàm phán giá tốt hơn',
        'Chỉ vaccin và sinh phẩm',
        'Chỉ thuốc gây nghiện và hướng thần'
      ],
      answer: 1,
      explanation: 'TT 15/2019 và Nghị định 07/2017/NĐ-CP (đấu thầu thuốc): BYT ban hành danh mục đấu thầu tập trung cấp quốc gia (thuốc generic + một số biệt dược gốc) qua Trung tâm Mua sắm Tập trung thuốc Quốc gia (CPPC). Các BV sử dụng kết quả đấu thầu này. Đấu thầu cấp địa phương: do Sở Y tế tổ chức; đấu thầu cấp cơ sở: BV tự tổ chức cho các thuốc không có trong danh mục tập trung.'
    },
    {
      stem: 'Trong hồ sơ mời thầu thuốc tại BV, tiêu chí "kỹ thuật" để đánh giá thuốc generic thường gồm những gì?',
      choices: [
        'Chỉ giá, chọn giá thấp nhất',
        'Số đăng ký còn hiệu lực, GMP đạt chuẩn (BYT VN hoặc tương đương WHO PQ/EU/US), bioequivalence (nếu yêu cầu), hạn sử dụng còn lại ≥ 12 tháng, chất lượng nguồn gốc xuất xứ',
        'Chỉ cần CoA từ nhà sản xuất',
        'Thương hiệu được biết đến rộng rãi'
      ],
      answer: 1,
      explanation: 'Thông tư 14/2020/TT-BYT (tiêu chí kỹ thuật đấu thầu thuốc): nhóm 1–5 theo nguồn gốc sản xuất/GMP: nhóm 1 (thuốc generic sản xuất tại EU/US/JP/WHO PQ), nhóm 2 (Hàn, Úc, Canada), nhóm 3 (BV sản xuất VN đạt EU/US/WHO PQ), nhóm 4 (generic VN đạt GMP-WHO), nhóm 5 (generic VN/ASEAN chưa đạt nhóm trên). Điểm kỹ thuật ảnh hưởng đến gói thầu được xét. Nhóm 1–2 ưu tiên hơn về điểm kỹ thuật dù giá cao hơn nhóm khác.'
    },
    {
      stem: 'Bảo lãnh dự thầu (bid security) trong đấu thầu thuốc theo Luật Đấu thầu 2023 — mục đích chính là gì?',
      choices: [
        'Đóng phí để được mua hồ sơ mời thầu',
        'Đảm bảo nhà thầu sẽ không rút hồ sơ sau khi nộp và sẽ ký hợp đồng nếu trúng thầu trong thời gian hiệu lực',
        'Thanh toán trước cho BV',
        'Dùng để chi phí đấu thầu khi không trúng'
      ],
      answer: 1,
      explanation: 'Luật Đấu thầu 43/2013/QH13 (sửa đổi 2023): bảo lãnh dự thầu (thường 1–3% giá trị gói thầu) đảm bảo nhà thầu: (1) không rút hồ sơ trong thời hạn hiệu lực, (2) ký hợp đồng nếu trúng, (3) nộp bảo lãnh thực hiện hợp đồng đúng hạn. Vi phạm → tịch thu bảo lãnh dự thầu. Bảo lãnh thực hiện hợp đồng khác (thường 3–10%, sau khi trúng thầu).'
    },
    {
      stem: 'Nhà thầu nộp hồ sơ dự thầu thuốc tại BV. Hồ sơ kỹ thuật thiếu CoA (Certificate of Analysis) của lô đăng ký. Hội đồng đánh giá xử lý như thế nào?',
      choices: [
        'Cho phép bổ sung sau khi mở thầu bất kỳ lúc nào',
        'Hồ sơ được chấp nhận vì CoA là tài liệu phụ',
        'Hồ sơ kỹ thuật không đáp ứng yêu cầu tối thiểu (nếu CoA là tài liệu bắt buộc trong HSMT) → đánh giá không đạt kỹ thuật; không thể bổ sung sau khi mở thầu cho tài liệu chứng minh năng lực kỹ thuật',
        'Được phép bổ sung trong 24h sau khi mở thầu'
      ],
      answer: 2,
      explanation: 'Nghị định 24/2024/NĐ-CP và Thông tư 15/2019: tài liệu chứng minh năng lực kỹ thuật/hồ sơ đề xuất kỹ thuật phải đầy đủ tại thời điểm nộp thầu. Tài liệu còn thiếu sau khi mở thầu KHÔNG được bổ sung (nguyên tắc đấu thầu công bằng — tránh lợi thế bất chính). Ngoại lệ: giấy tờ hành chính, lỗi số học nhỏ có thể làm rõ nhưng không thay đổi nội dung cốt lõi.'
    },
    {
      stem: 'Giá trúng thầu thuốc generic — điều gì ĐÚNG về "kết quả đàm phán giá" thuốc biệt dược gốc tại Việt Nam?',
      choices: [
        'Không có cơ chế đàm phán giá, chỉ đấu thầu cạnh tranh',
        'Biệt dược gốc (brand-name drug, patent-protected hoặc single-source) được đàm phán giá với nhà sản xuất qua Hội đồng Đàm phán Giá thuốc Quốc gia, giá đàm phán được áp dụng tại các cơ sở KCB BHYT',
        'Biệt dược gốc không được thanh toán BHYT',
        'Giá biệt dược do BV tự quyết định không cần phê duyệt'
      ],
      answer: 1,
      explanation: 'Nghị định 07/2017 và Luật BHYT: thuốc biệt dược gốc, thuốc không có nhiều nguồn cung cấp → thực hiện đàm phán giá thay vì đấu thầu cạnh tranh (không thể cạnh tranh khi chỉ 1 nhà cung cấp). Hội đồng Đàm phán Giá thuốc quốc gia (BYT, BYT/BHXH) đàm phán với nhà sản xuất dựa trên giá tham chiếu quốc tế và lợi ích BHYT. Kết quả đàm phán có hiệu lực toàn quốc.'
    },
    {
      stem: 'Một BV muốn mua thuốc ngoài danh mục trúng thầu vì thiếu hàng. Cơ chế nào được phép theo quy định?',
      choices: [
        'BV tự mua trực tiếp từ bất kỳ nhà phân phối nào',
        'Chỉ cần giám đốc BV ký phê duyệt nội bộ',
        'Mua sắm đặc biệt/trực tiếp (chỉ định thầu rút gọn) khi có lý do cấp thiết được phê duyệt bởi người có thẩm quyền theo Luật Đấu thầu 2023; hoặc báo cáo thiếu hàng để được cấp có thẩm quyền cho phép mua thêm từ đơn vị khác',
        'Không thể mua thêm trong bất kỳ trường hợp nào'
      ],
      answer: 2,
      explanation: 'Luật Đấu thầu 2023 và Nghị định 24/2024: chỉ định thầu rút gọn được áp dụng khi "trường hợp cấp bách" (thiên tai, dịch bệnh, tình trạng khẩn cấp) hoặc gói thầu quy mô nhỏ theo ngưỡng. BV phải báo cáo Sở Y tế / Bộ và được phê duyệt. Trong điều kiện bình thường, mua ngoài kết quả thầu là vi phạm. Thuốc hiếm/đặc trị có thể qua cơ chế riêng.'
    },
    {
      stem: 'Hồ sơ mời thầu thuốc generic yêu cầu "nhà thầu cung cấp bằng chứng tham chiếu giá". Tài liệu nào phù hợp nhất?',
      choices: [
        'Tờ quảng cáo của nhà sản xuất',
        'Giá trúng thầu gần nhất tại 3–5 cơ sở y tế khác, hoặc giá kết quả đấu thầu quốc gia/địa phương tương đồng — được xác nhận bởi cơ quan có thẩm quyền hoặc đăng trên cổng thông tin đấu thầu quốc gia',
        'Giá nhập khẩu gốc từ nhà sản xuất nước ngoài (chưa có VAT và chi phí VN)',
        'Giá niêm yết tại nhà thuốc lẻ'
      ],
      answer: 1,
      explanation: 'TT 15/2019 và quy định đấu thầu: tham chiếu giá nên là giá trúng thầu tại cơ sở y tế cùng tuyến, cùng gói thầu, gần nhất (không quá 12 tháng). Cổng thông tin Đấu thầu quốc gia (muasamcong.mpi.gov.vn) công khai giá trúng thầu. Hội đồng xét thầu dùng để kiểm tra giá đề xuất có bất thường không. Giá nhà thuốc lẻ không phải chuẩn tham chiếu cho đấu thầu.'
    },
    {
      stem: 'Đơn vị trúng thầu cung cấp thuốc nhưng muốn thay đổi số lô (batch number) — điều này ảnh hưởng thế nào?',
      choices: [
        'Hoàn toàn bình thường, số lô chỉ là thông tin phụ',
        'Cần thông báo cho BV và cung cấp CoA của lô mới; thuốc phải cùng SĐK và đạt tiêu chuẩn; không thay đổi các điều khoản hợp đồng khác',
        'Phải đấu thầu lại toàn bộ gói',
        'Không được phép thay đổi số lô trong bất kỳ trường hợp nào'
      ],
      answer: 1,
      explanation: 'Hợp đồng cung cấp thuốc BV: thay đổi số lô là bình thường trong cung ứng (sản xuất theo batch). Điều quan trọng: (1) cùng SĐK đã trúng thầu, (2) cùng nhà sản xuất, (3) CoA của lô mới đạt tiêu chuẩn, (4) hạn sử dụng còn đủ theo HĐ. BV có thể yêu cầu kiểm tra chất lượng lô mới trước khi nhập kho. Thay đổi nhà sản xuất/SĐK → cần sửa đổi hợp đồng hoặc đấu thầu lại.'
    },
    {
      stem: 'Thuốc đã trúng thầu, đang cung cấp cho BV. Nhà thầu phát hiện lô đang cung cấp có nghi ngờ chất lượng (OOS so sánh nội bộ). Phải làm gì?',
      choices: [
        'Tiếp tục cung cấp, chờ BV phát hiện',
        'Ngừng cung cấp lô đó, thông báo ngay cho BV và cơ quan quản lý dược (Cục Quản lý Dược), thực hiện thu hồi (recall) theo quy trình, phối hợp điều tra nguyên nhân',
        'Tự kiểm tra lại và nếu kết quả tốt hơn thì tiếp tục',
        'Chờ hết hợp đồng rồi mới xử lý'
      ],
      answer: 1,
      explanation: 'Thông tư 11/2018/TT-BYT (thu hồi thuốc): nhà sản xuất/phân phối phát hiện chất lượng nghi ngờ phải ngưng cung cấp và thu hồi (voluntary recall) ngay, báo cáo DAV trong 24h (Class I) hoặc 3 ngày (Class II/III). BV phải được thông báo để ngừng sử dụng và cách ly lô đó. Tiếp tục cung cấp thuốc nghi ngờ OOS = vi phạm nghiêm trọng — có thể tước giấy phép kinh doanh.'
    },
    {
      stem: 'Phân biệt đấu thầu thuốc "nhóm 1" và "nhóm 5" trong phân nhóm kỹ thuật TT 15/2019 — ý nghĩa thực tiễn với cơ sở y tế là gì?',
      choices: [
        'Chỉ là phân loại thủ tục, không ảnh hưởng đến điều trị',
        'Nhóm 1 (EU/US/JP/WHO PQ) và nhóm 5 (VN generic chưa đạt nhóm trên) KHÔNG thể xét trong cùng một gói thầu; nhóm 1 được ưu tiên kỹ thuật hơn; phân nhóm đảm bảo thuốc chất lượng cao được ưu tiên, đồng thời cạnh tranh giá trong cùng phân nhóm',
        'Nhóm 5 luôn bị loại, không được xét thầu',
        'Nhóm phân loại chỉ áp dụng cho thuốc nhập khẩu'
      ],
      answer: 1,
      explanation: 'TT 14/2020 phân nhóm kỹ thuật thuốc generic: nhóm 1–5 theo GMP source. Mỗi gói thầu chỉ xét 1 nhóm (nhóm ưu tiên nhất có hàng); nếu không có nhóm 1 mới xét nhóm 2, v.v. Mục tiêu: đảm bảo thuốc chất lượng cao được ưu tiên, nhóm cao hơn không cạnh tranh trực tiếp với nhóm thấp (tránh race to the bottom về giá). Thực tế: BV hàng đầu thường ưu tiên nhóm 1–2; BV tuyến thấp chấp nhận nhóm 3–4 để đủ nguồn cung.'
    }
  ]
};

export const PS20_QUIZ = {
  id: 'PS20-quiz-01',
  title: 'PS20 · Pharmacovigilance — Báo cáo ADR',
  kind: 'quiz', yearLevel: 5, subject: 'pharmacovig', difficulty: 4,
  skillsTrained: ['pharmacovigilance', 'adr-reporting', 'causality-assessment', 'signal-detection', 'risk-management'],
  questions: [
    {
      stem: 'ADR (Adverse Drug Reaction) — định nghĩa chính thức theo WHO phân biệt với AE (Adverse Event) ở điểm nào?',
      choices: [
        'ADR và AE là đồng nghĩa',
        'ADR là phản ứng có hại xảy ra ở liều thông thường và có mối quan hệ nhân quả với thuốc; AE là bất kỳ biến cố bất lợi nào xảy ra trong quá trình dùng thuốc, chưa xác định quan hệ nhân quả',
        'ADR chỉ áp dụng cho phản ứng ≥ Grade 3 theo CTCAE',
        'AE nhẹ hơn ADR về mức độ'
      ],
      answer: 1,
      explanation: 'WHO 1972: ADR = "A response to a drug which is noxious and unintended and which occurs at doses normally used... for the prevention, diagnosis, or treatment of disease". Quan hệ nhân quả là yếu tố phân biệt. AE = bất kỳ biến cố bất lợi nào trong quá trình điều trị — chưa được xác định là do thuốc. Trong clinical trial, tất cả gọi là AE; ADR là subset được xác định có causality. ICH E2A.'
    },
    {
      stem: 'Phân loại ADR theo cơ chế (Edwards & Aronson 2000) — ADR loại B (Bizarre) có đặc điểm gì?',
      choices: [
        'Phụ thuộc liều, có thể dự đoán từ dược lý thuốc',
        'Không liên quan đến liều, không thể dự đoán từ tác dụng dược lý thông thường, thường liên quan đến cơ địa (immunological hoặc genetic), thường nặng và hiếm gặp — VD: anaphylaxis, agranulocytosis thuốc',
        'Xảy ra sau ngưng thuốc đột ngột',
        'Chỉ xảy ra ở trẻ em'
      ],
      answer: 1,
      explanation: 'Phân loại DoTS/ABCDE: Type A (Augmented) = tác dụng phụ phụ thuộc liều, dự đoán được, thường gặp (VD: bradycardia với propranolol). Type B (Bizarre) = không phụ thuộc liều, cơ địa/dị ứng/dị ứng gen, khó dự đoán, hiếm nhưng nặng (VD: Stevens-Johnson, anaphylaxis penicillin, aplastic anemia chloramphenicol). Type C (Chronic), D (Delayed), E (End of use), F (Failure of therapy).'
    },
    {
      stem: 'Thang đánh giá quan hệ nhân quả WHO-UMC — "Probable" có nghĩa là?',
      choices: [
        'Chắc chắn do thuốc (Certain)',
        'Chuỗi sự kiện hợp lý về thời gian; không có nguyên nhân khác hợp lý; có phản ứng khi dùng lại (rechallenge) hợp lý hoặc không; nhưng chưa được xác nhận rechallenge thực sự hay lab — hơn "Possible" nhưng kém "Certain"',
        'Không đủ dữ liệu để đánh giá',
        'Nguyên nhân khác có thể giải thích đồng đều'
      ],
      answer: 1,
      explanation: 'WHO-UMC causality: Certain (rechallenge dương, không có giải thích khác) → Probable (chuỗi thời gian hợp lý, rechallenge không cần thiết, không có giải thích khác rõ ràng) → Possible (chuỗi thời gian ok, nhưng có giải thích khác) → Unlikely → Conditional → Unassessable. Naranjo algorithm (10 câu hỏi, điểm 0–13) cũng phổ biến trong clinical setting. WHO-UMC dùng nhiều trong PV reporting.'
    },
    {
      stem: 'SUSAR (Suspected Unexpected Serious Adverse Reaction) trong clinical trial — timeline báo cáo là?',
      choices: [
        '6 tháng sau khi phát hiện',
        'Fatal/life-threatening: 7 ngày (expedited) sau khi sponsor biết, với follow-up trong 8 ngày tiếp theo; non-fatal unexpected serious: 15 ngày — gửi cho cơ quan quản lý và IEC/IRB',
        'Chỉ báo cáo ở cuối thử nghiệm',
        '30 ngày cho mọi SUSAR'
      ],
      answer: 1,
      explanation: 'ICH E2A và GCP: SUSAR fatal/life-threatening: 7-day expedited report + 8-day follow-up (= 15 ngày tổng). Non-fatal unexpected serious: 15 ngày. Gửi tới: cơ quan quản lý (FDA, EMA, BYT), IEC/IRB, và investigator sites. "Unexpected" = không có trong Investigator Brochure. "Serious" = fatal, life-threatening, hospitalization, disability, congenital anomaly, medically significant. BYT VN TT 29/2018 (thử nghiệm lâm sàng) yêu cầu tương tự.'
    },
    {
      stem: 'Signal detection trong pharmacovigilance sử dụng PRR (Proportional Reporting Ratio). PRR = 2.0 với CI 95% không bao gồm 1 và N ≥ 3 trường hợp — có nghĩa là?',
      choices: [
        'Sự kết hợp này là hoàn toàn không đáng kể',
        'Sự kết hợp thuốc-ADR được báo cáo gấp 2 lần so với dự đoán trên nền tổng thể database — đây là tín hiệu tiềm năng (potential signal) cần đánh giá chuyên sâu (not = causation)',
        'Thuốc chắc chắn gây ADR này',
        'Cần thêm 100 báo cáo trước khi xét'
      ],
      answer: 1,
      explanation: 'PRR = (cặp thuốc-ADR trong DB / tất cả ADR của thuốc) ÷ (cặp thuốc-ADR trong DB trừ thuốc này / tất cả ADR trừ thuốc này). Evans 2001 criteria: PRR ≥ 2, Chi² ≥ 4, ≥ 3 ca = signal. Đây chỉ là statistical signal — cần clinical evaluation, biological plausibility, literature review, time-trend analysis để đánh giá. VigiBase (WHO PIDM), FDA FAERS, EMA EudraVigilance dùng disproportionality analysis.'
    },
    {
      stem: 'PSUR (Periodic Safety Update Report) — mục đích chính là gì và nộp cho ai?',
      choices: [
        'Báo cáo doanh số bán thuốc cho Bộ Y tế',
        'Báo cáo tóm tắt toàn bộ thông tin an toàn tích lũy của thuốc từ sau khi được cấp phép đến thời điểm báo cáo; đánh giá benefit-risk ratio; nộp cho cơ quan quản lý (EMA/FDA/DAV) theo lịch (6 tháng/năm đầu, sau đó 3 năm/lần hoặc khi có yêu cầu)',
        'Báo cáo nội bộ không cần nộp cho cơ quan quản lý',
        'Chỉ cần làm khi có signal mới'
      ],
      answer: 1,
      explanation: 'ICH E2C(R2) PSUR (EMA gọi là PBRER): tóm tắt safety information trong IBD (International Birth Date) đến data lock point — global exposure, ADR line listing, cumulative summary tabulation, signal evaluation, benefit-risk analysis. Nộp cho cơ quan phê duyệt theo Single Assessment Procedure (EMA) hoặc FDA. VN: TT 32/2018 yêu cầu PSUR định kỳ cho thuốc nhập khẩu trong lưu hành.'
    },
    {
      stem: 'ADR severity theo Hartwig & Siegel scale — mức độ "Severe" (level 7) là?',
      choices: [
        'Cần thay đổi liều thuốc',
        'Gây tử vong trực tiếp (contributing factor) hoặc gây tàn tật vĩnh viễn/khuyết tật bẩm sinh',
        'Cần nhập viện ≥ 1 đêm',
        'Cần thêm thuốc điều trị ADR'
      ],
      answer: 1,
      explanation: 'Hartwig & Siegel 7-level: Level 1 (không ảnh hưởng), Level 2 (thay đổi, thêm thuốc), Level 3 (nhập viện hoặc kéo dài nằm viện), Level 4 (ICU/life-threatening), Level 5 (tử vong do nguyên nhân khác nhưng góp phần), Level 6 (tử vong trực tiếp), Level 7 (tàn tật vĩnh viễn). "Serious" (ICH E2A) không đồng nghĩa "severe" — serious = fatal/life-threatening/hospitalization/disability/congenital anomaly; severe = cường độ cao (có thể ≥ Grade 3 CTCAE).'
    },
    {
      stem: 'Risk Management Plan (RMP) — khi nào bắt buộc phải có theo EMA?',
      choices: [
        'Chỉ khi có ADR nghiêm trọng đã được báo cáo',
        'Tất cả thuốc mới (new active substance), thuốc generic với concern về ADE, thuốc có điều kiện đặc biệt (conditional MA, exceptional circumstances), biologicals, và khi có new safety concern phát hiện post-approval',
        'Chỉ cho thuốc ung thư',
        'Không bắt buộc trong EU — chỉ tự nguyện'
      ],
      answer: 1,
      explanation: 'EU GVP Module V: RMP bắt buộc cho NAS (new active substance), biologicals, drugs with conditional MA/exceptional circumstances, và khi requested bởi EMA Committee (CHMP/PRAC). RMP bao gồm: safety specification (known risks, potential risks, missing info), pharmacovigilance plan (routine + additional), risk minimisation (routine như PIL/SmPC + additional như DHCP letter, pregnancy prevention programme). RMP update khi có new information.'
    },
    {
      stem: 'Dược sĩ nhà thuốc nhận thông tin từ bệnh nhân về phản ứng nghi ngờ do thuốc (rối loạn tiêu hóa sau dùng amoxicillin). Vai trò của dược sĩ trong pharmacovigilance?',
      choices: [
        'Không liên quan — chỉ bác sĩ mới báo cáo ADR',
        'Khuyến khích bệnh nhân mua thêm thuốc chống nôn',
        'Đánh giá sơ bộ (causality, severity, seriousness), ghi nhận đầy đủ thông tin (patient, drug, reaction, outcome), báo cáo tới Trung tâm Quốc gia về Thông tin thuốc và Theo dõi ADR (tại VN) hoặc hệ thống spontaneous reporting quốc gia — dược sĩ là frontline reporter PV',
        'Chỉ báo cáo nếu ADR gây tử vong'
      ],
      answer: 2,
      explanation: 'WHO GVP Module VI: spontaneous reporting từ healthcare professionals (HCP) kể cả dược sĩ là nền tảng pharmacovigilance. Tại VN: Trung tâm Quốc gia (Bệnh viện Bạch Mai) và Trung tâm Khu vực (BV Chợ Rẫy) nhận báo cáo online (canhgiacduoc.org.vn). Dược sĩ nhà thuốc được đào tạo nhận diện, ghi nhận (4W: Who, What, When, With what outcome) và báo cáo ADR — kể cả ADR nhẹ vì tích lũy thông tin dưới-ngưỡng xây dựng safety database.'
    },
    {
      stem: 'Phản ứng nghi ngờ xảy ra với thuốc vaccine COVID-19. Tính "seriousness" khác gì so với ADR thuốc thông thường?',
      choices: [
        'Giống hệt nhau',
        'Vaccine safety sử dụng hệ thống riêng (AEFI — Adverse Event Following Immunization); seriousness dựa trên WHO AEFI criteria tương tự ICH E2A nhưng với quan tâm đặc biệt đến cluster (nhiều ca cùng lô), tín hiệu mới trong bối cảnh mass vaccination, và vaccine-product-related vs vaccination error vs coincidental event',
        'Vaccine không cần báo cáo vì là sinh phẩm',
        'Chỉ báo cáo khi xảy ra ở trẻ em'
      ],
      answer: 1,
      explanation: 'WHO AEFI classification (2012): (1) vaccine product-related, (2) vaccine quality defect-related, (3) immunisation error-related, (4) immunisation anxiety-related, (5) coincidental. AEFI serious = nhập viện/tử vong/disability. Điều tra cluster quan trọng vì cùng lô. Mass vaccination tạo "background rate" cần tách biệt khỏi vaccine causality — Brighton Collaboration cung cấp case definitions chuẩn. VN: TCMR báo cáo AEFI lên BYT và WHO.'
    }
  ]
};

export const PHARMACY_INDUSTRY_SCENARIOS = {
  [PS17_QUIZ.id]: PS17_QUIZ,
  [PS18_QUIZ.id]: PS18_QUIZ,
  [PS19_QUIZ.id]: PS19_QUIZ,
  [PS20_QUIZ.id]: PS20_QUIZ,
};
