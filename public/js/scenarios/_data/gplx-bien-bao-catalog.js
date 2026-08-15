// DATA seed — Danh mục biển báo giao thông VN cho khối thi GPLX (collection 'gplx-bien-bao').
// Nguồn: catalog biển báo QCVN 41:2019/BGTVT (nhóm P./DP. cấm — R. hiệu lệnh —
// I. chỉ dẫn — S. phụ), phần mức phạt nhóm cấm trích Nghị định 168/2024/NĐ-CP
// (đối chiếu 26/07/2026). Chỉ seed-content.mjs import.
export const GPLX_BIEN_BAO_CATALOG = [
  {
    "id": "cam-p101",
    "code": "P.101",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Đường cấm",
    "image": "/img/gplx-bien-bao/cam/P.101.png",
    "meaning": "Báo tuyến đường cấm các loại phương tiện lưu thông theo cả hai hướng.",
    "rule": "Mọi loại phương tiện không được đi vào, trừ xe ưu tiên theo quy định. Nếu đường hoặc cầu bị tắc và có rào chắn, kể cả xe ưu tiên cũng không được đi vào.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm c khoản 2 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p102",
    "code": "P.102",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm đi ngược chiều",
    "image": "/img/gplx-bien-bao/cam/P.102.png",
    "meaning": "Báo chiều đường mà các loại xe không được phép đi vào.",
    "rule": "Xe cơ giới và xe thô sơ không được đi vào theo chiều đặt biển, trừ xe ưu tiên. Người đi bộ vẫn được đi trên vỉa hè hoặc lề đường.",
    "penalty": {
      "summary": "Mức phạt khác nhau theo loại phương tiện và nơi xảy ra vi phạm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi ngược chiều đường một chiều hoặc đi ngược chiều tại biển P.102.",
          "amount": "18.000.000–20.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm d khoản 9 và điểm b khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi ngược chiều đường một chiều hoặc đi ngược chiều tại biển P.102.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 7 và điểm a khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi ngược chiều đường một chiều hoặc đi ngược chiều tại biển P.102.",
          "amount": "6.000.000–8.000.000 đồng",
          "legalBasis": "Điểm d khoản 7 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi ngược chiều tại biển P.102.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Không chấp hành chỉ dẫn của biển P.102.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi ngược chiều trên đường cao tốc.",
          "amount": "30.000.000–40.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm đ khoản 11 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi ngược chiều gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi ngược chiều gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi ngược chiều gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Không áp dụng ngoại lệ thông thường cho xe ưu tiên, trừ khi xe đang làm nhiệm vụ khẩn cấp theo quy định.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p103a",
    "code": "P.103a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô",
    "image": "/img/gplx-bien-bao/cam/P.103a.png",
    "meaning": "Báo đoạn đường cấm ô tô, kể cả xe máy ba bánh có thùng, đi qua.",
    "rule": "Không áp dụng đối với xe máy hai bánh, xe gắn máy và xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p103b",
    "code": "P.103b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô rẽ phải",
    "image": "/img/gplx-bien-bao/cam/P.103b.png",
    "meaning": "Báo cấm ô tô, kể cả xe máy ba bánh có thùng, rẽ phải tại vị trí đặt biển.",
    "rule": "Xe thuộc phạm vi cấm không được rẽ phải; xe máy hai bánh, xe gắn máy và xe ưu tiên không thuộc phạm vi cấm này.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Rẽ trái hoặc rẽ phải tại nơi có biển cấm hướng rẽ tương ứng.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p103c",
    "code": "P.103c",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô rẽ trái",
    "image": "/img/gplx-bien-bao/cam/P.103c.png",
    "meaning": "Báo cấm ô tô, kể cả xe máy ba bánh có thùng, rẽ trái tại vị trí đặt biển.",
    "rule": "Xe thuộc phạm vi cấm không được rẽ trái; xe máy hai bánh, xe gắn máy và xe ưu tiên không thuộc phạm vi cấm này.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Rẽ trái hoặc rẽ phải tại nơi có biển cấm hướng rẽ tương ứng.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p104",
    "code": "P.104",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe máy",
    "image": "/img/gplx-bien-bao/cam/P.104.png",
    "meaning": "Báo đoạn đường cấm các loại xe máy đi qua.",
    "rule": "Xe máy không được đi vào, trừ xe ưu tiên theo quy định. Người dắt xe máy không bị cấm.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p105",
    "code": "P.105",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô và xe máy",
    "image": "/img/gplx-bien-bao/cam/P.105.png",
    "meaning": "Báo đoạn đường cấm các loại xe cơ giới và xe máy đi qua.",
    "rule": "Các phương tiện thuộc phạm vi cấm không được đi vào, trừ xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p106a",
    "code": "P.106a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô tải",
    "image": "/img/gplx-bien-bao/cam/P.106a.png",
    "meaning": "Báo đoạn đường cấm các loại xe ô tô tải đi vào.",
    "rule": "Xe ô tô tải, máy kéo và xe máy chuyên dùng không được đi vào; xe ưu tiên được miễn theo quy định.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p106b",
    "code": "P.106b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô tải có khối lượng chuyên chở vượt trị số ghi trên biển",
    "image": "/img/gplx-bien-bao/cam/P.106b.png",
    "meaning": "Báo cấm xe tải có khối lượng chuyên chở lớn hơn trị số ghi trên hình xe.",
    "rule": "Khối lượng chuyên chở được xác định theo giấy chứng nhận kiểm định. Lệnh cấm áp dụng cả với máy kéo và xe máy chuyên dùng.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p106c",
    "code": "P.106c",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm các xe chở hàng nguy hiểm",
    "image": "/img/gplx-bien-bao/cam/P.106c.png",
    "meaning": "Báo đoạn đường không dành cho phương tiện đang chở hàng nguy hiểm.",
    "rule": "Phương tiện chở hàng nguy hiểm không được đi vào đoạn đường đặt biển.",
    "penalty": {
      "summary": "Đi vào đường có P.106c là hành vi khác với vi phạm điều kiện vận chuyển hàng hóa nguy hiểm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        },
        {
          "subject": "Người điều khiển ô tô từng chở hàng nguy hiểm",
          "conduct": "Không làm sạch hoặc không bóc, xóa biểu trưng nguy hiểm khi không còn vận chuyển loại hàng đó.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Khoản 1 Điều 23"
        },
        {
          "subject": "Người điều khiển ô tô chở hàng nguy hiểm",
          "conduct": "Không mang hồ sơ vận chuyển hoặc chứng nhận tập huấn an toàn theo quy định.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Khoản 2 Điều 23"
        },
        {
          "subject": "Người điều khiển ô tô chở hàng nguy hiểm",
          "conduct": "Không dán nhãn, biểu trưng hoặc không có đèn, tín hiệu cảnh báo theo quy định.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 3, điểm a khoản 7 Điều 23"
        },
        {
          "subject": "Người điều khiển ô tô chở hàng nguy hiểm",
          "conduct": "Chở chất cháy, nổ thuộc phạm vi cấm qua hầm dài từ 100 mét trở lên.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 4, điểm a khoản 7 Điều 23"
        },
        {
          "subject": "Người điều khiển ô tô chở hàng nguy hiểm",
          "conduct": "Không có, giấy phép đã hết hiệu lực hoặc không thực hiện đúng giấy phép vận chuyển hàng hóa nguy hiểm.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 5, điểm b khoản 7 Điều 23"
        }
      ],
      "note": "Các dòng thuộc Điều 23 là hành vi độc lập, không tự động phát sinh chỉ vì xe đi qua P.106c. Gây ô nhiễm còn có thể bị buộc khắc phục hậu quả.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p107",
    "code": "P.107",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô khách và xe ô tô tải",
    "image": "/img/gplx-bien-bao/cam/P.107.png",
    "meaning": "Báo đoạn đường cấm xe ô tô chở khách và xe ô tô tải đi qua.",
    "rule": "Lệnh cấm áp dụng cả với máy kéo và xe máy chuyên dùng, trừ xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p107a",
    "code": "P.107a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô khách",
    "image": "/img/gplx-bien-bao/cam/P.107a.png",
    "meaning": "Báo đoạn đường cấm ô tô chở khách đi qua.",
    "rule": "Không cấm xe buýt và xe ưu tiên. Nếu biển hoặc biển phụ ghi số chỗ ngồi, phạm vi cấm được xác định theo số chỗ ghi trên đó.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p107b",
    "code": "P.107b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô taxi",
    "image": "/img/gplx-bien-bao/cam/P.107b.png",
    "meaning": "Báo đoạn đường cấm xe ô tô taxi đi lại.",
    "rule": "Taxi không được đi vào. Nếu có biển phụ ghi thời gian, lệnh cấm chỉ áp dụng trong khung giờ được ghi.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p108",
    "code": "P.108",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe kéo rơ-moóc",
    "image": "/img/gplx-bien-bao/cam/P.108.png",
    "meaning": "Báo đoạn đường cấm phương tiện cơ giới kéo theo rơ-moóc.",
    "rule": "Áp dụng cả với xe máy, máy kéo và ô tô khách kéo rơ-moóc; không áp dụng với ô tô sơ-mi rơ-moóc và xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p108a",
    "code": "P.108a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe sơ-mi rơ-moóc",
    "image": "/img/gplx-bien-bao/cam/P.108a.png",
    "meaning": "Báo đoạn đường cấm xe sơ-mi rơ-moóc và xe kéo rơ-moóc.",
    "rule": "Các loại xe này không được đi vào, trừ xe ưu tiên có dạng sơ-mi rơ-moóc hoặc đang kéo rơ-moóc theo quy định.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p109",
    "code": "P.109",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm máy kéo",
    "image": "/img/gplx-bien-bao/cam/P.109.png",
    "meaning": "Báo đoạn đường cấm các loại máy kéo đi qua.",
    "rule": "Máy kéo bánh hơi, máy kéo bánh xích và các loại máy kéo tương tự không được đi vào.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p110a",
    "code": "P.110a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe đạp",
    "image": "/img/gplx-bien-bao/cam/P.110a.png",
    "meaning": "Báo đoạn đường cấm xe đạp đi qua.",
    "rule": "Người điều khiển xe đạp không được đi vào; người dắt xe đạp không bị cấm.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p110b",
    "code": "P.110b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe đạp thồ",
    "image": "/img/gplx-bien-bao/cam/P.110b.png",
    "meaning": "Báo đoạn đường cấm xe đạp thồ đi qua.",
    "rule": "Người điều khiển xe đạp thồ không được đi vào; người dắt loại xe này không bị cấm.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p111a",
    "code": "P.111a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe gắn máy",
    "image": "/img/gplx-bien-bao/cam/P.111a.png",
    "meaning": "Báo đoạn đường cấm xe gắn máy đi qua.",
    "rule": "Xe gắn máy không được đi vào; biển không có giá trị cấm xe đạp.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p111b",
    "code": "P.111b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ba bánh có động cơ (xe lam, xích lô máy)",
    "image": "/img/gplx-bien-bao/cam/P.111b.png",
    "meaning": "Biển dạng P.111b báo cấm xe ba bánh có động cơ, như xe lam hoặc xích lô máy.",
    "rule": "Xe lam, xích lô máy và các xe ba bánh có động cơ cùng dạng không được đi qua.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p111c",
    "code": "P.111c",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ba bánh có động cơ (xe lôi máy)",
    "image": "/img/gplx-bien-bao/cam/P.111c.png",
    "meaning": "Biển dạng P.111c báo cấm xe ba bánh có động cơ, như xe lôi máy.",
    "rule": "Xe lôi máy và các xe ba bánh có động cơ cùng dạng không được đi qua.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p111d",
    "code": "P.111d",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ba bánh loại không có động cơ",
    "image": "/img/gplx-bien-bao/cam/P.111d.png",
    "meaning": "Báo đoạn đường cấm xe ba bánh không có động cơ, như xích lô hoặc xe lôi đạp.",
    "rule": "Các loại xe ba bánh không có động cơ thuộc phạm vi biển báo không được đi qua.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p112",
    "code": "P.112",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm người đi bộ",
    "image": "/img/gplx-bien-bao/cam/P.112.png",
    "meaning": "Báo khu vực hoặc đoạn đường cấm người đi bộ qua lại.",
    "rule": "Người đi bộ không được đi vào phần đường hoặc khu vực có đặt biển.",
    "penalty": {
      "summary": "Biển này áp dụng cho người đi bộ.",
      "entries": [
        {
          "subject": "Người đi bộ",
          "conduct": "Đi vào khu vực hoặc phần đường có biển cấm người đi bộ.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 10"
        }
      ],
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p113",
    "code": "P.113",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe người kéo, đẩy",
    "image": "/img/gplx-bien-bao/cam/P.113.png",
    "meaning": "Báo đoạn đường cấm xe thô sơ chuyển động do người kéo hoặc đẩy.",
    "rule": "Không cấm xe nôi trẻ em và phương tiện chuyên dùng phục vụ việc đi lại của người khuyết tật.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p114",
    "code": "P.114",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe vật nuôi kéo",
    "image": "/img/gplx-bien-bao/cam/P.114.png",
    "meaning": "Báo đoạn đường cấm vật nuôi dùng để chở người, chở hàng hoặc kéo xe đi qua.",
    "rule": "Vật nuôi đang vận tải hàng hóa, hành khách hoặc kéo xe không được đi vào đoạn đường đặt biển.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm c khoản 2 Điều 11"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p115",
    "code": "P.115",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hạn chế trọng tải toàn bộ xe",
    "image": "/img/gplx-bien-bao/cam/P.115.png",
    "meaning": "Giới hạn trọng tải toàn bộ của xe theo trị số tấn ghi trên biển.",
    "rule": "Xe có tổng trọng lượng của bản thân xe, người, hành lý và hàng hóa vượt trị số ghi trên biển không được đi qua; áp dụng cả với xe ưu tiên.",
    "penalty": {
      "summary": "Không có một mức cố định: phải tính tỷ lệ tổng trọng lượng xe vượt tải trọng cho phép của đường.",
      "entries": [
        {
          "subject": "Người điều khiển xe quá tải",
          "conduct": "Tổng trọng lượng xe vượt tải trọng cho phép của đường trên 10% đến 20%, không có giấy phép lưu hành còn giá trị.",
          "amount": "4.000.000–6.000.000 đồng",
          "legalBasis": "Khoản 2 Điều 34"
        },
        {
          "subject": "Người điều khiển xe quá tải",
          "conduct": "Tổng trọng lượng xe vượt tải trọng cho phép của đường trên 20% đến 50%, không có giấy phép lưu hành còn giá trị.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 4 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người điều khiển xe quá tải",
          "conduct": "Tổng trọng lượng xe vượt tải trọng cho phép của đường trên 50%, không có giấy phép lưu hành còn giá trị.",
          "amount": "40.000.000–50.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 5 và điểm c khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Không thực hiện đúng điều kiện trong giấy phép lưu hành, trừ trường hợp đã có khung riêng.",
          "amount": "3.000.000–5.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 1 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Tổng trọng lượng xe vượt mức ghi trong giấy phép hoặc đi sai tuyến đường được phép.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 03 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b, điểm c khoản 4 và điểm b khoản 7 Điều 34"
        }
      ],
      "note": "Đây là mức đối với người điều khiển. Chủ phương tiện có thể bị xử phạt riêng; nếu chủ trực tiếp lái xe thì phải áp dụng quy tắc tại Điều 47, không cộng máy móc hai mức cho cùng một người.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p116",
    "code": "P.116",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hạn chế tải trọng trên trục xe",
    "image": "/img/gplx-bien-bao/cam/P.116.png",
    "meaning": "Giới hạn tải trọng phân bổ trên một trục xe theo trị số ghi trên biển.",
    "rule": "Xe có tải trọng trên bất kỳ trục nào vượt trị số ghi trên biển không được đi qua; áp dụng cả với xe ưu tiên.",
    "penalty": {
      "summary": "Phải tính tỷ lệ tải trọng trục vượt tải trọng cho phép của đường; Nghị định quy định các khung dưới đây.",
      "entries": [
        {
          "subject": "Người điều khiển xe quá tải trục",
          "conduct": "Tải trọng trục vượt tải trọng cho phép của đường trên 20% đến 50%, không có giấy phép lưu hành còn giá trị.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 4 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người điều khiển xe quá tải trục",
          "conduct": "Tải trọng trục vượt tải trọng cho phép của đường trên 50%, không có giấy phép lưu hành còn giá trị.",
          "amount": "40.000.000–50.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 5 và điểm c khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Không thực hiện đúng điều kiện trong giấy phép lưu hành, trừ trường hợp đã có khung riêng.",
          "amount": "3.000.000–5.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 1 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Tải trọng trục vượt mức ghi trong giấy phép hoặc đi sai tuyến đường được phép.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 03 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b, điểm c khoản 4 và điểm b khoản 7 Điều 34"
        }
      ],
      "note": "Nghị định 168 không đặt khung riêng tại Điều 34 cho tải trọng trục vượt đến 20%. Không được tự suy diễn mức phạt nếu chưa có số đo và hồ sơ phương tiện.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p117",
    "code": "P.117",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hạn chế chiều cao",
    "image": "/img/gplx-bien-bao/cam/P.117.png",
    "meaning": "Giới hạn chiều cao tối đa của xe và hàng hóa theo trị số ghi trên biển.",
    "rule": "Xe có chiều cao tính từ mặt đường đến điểm cao nhất của xe hoặc hàng vượt trị số ghi trên biển không được đi qua; áp dụng cả với xe ưu tiên.",
    "penalty": {
      "summary": "Mức phạt phụ thuộc kích thước thực tế và tình trạng giấy phép lưu hành.",
      "entries": [
        {
          "subject": "Người điều khiển xe quá khổ",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn của đường, hoặc vượt kích thước giới hạn xếp hàng, không có giấy phép lưu hành còn giá trị.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c, điểm d khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Không thực hiện đúng quy định trong giấy phép lưu hành, trừ trường hợp có khung riêng.",
          "amount": "3.000.000–5.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 1 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn ghi trong giấy phép lưu hành.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Đi không đúng tuyến đường quy định trong giấy phép lưu hành.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 03 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 4 và điểm b khoản 7 Điều 34"
        }
      ],
      "note": "Đây là mức đối với người điều khiển; có thể kèm buộc dỡ phần hàng quá khổ và khôi phục cầu, đường nếu gây hư hại.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p118",
    "code": "P.118",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hạn chế chiều ngang xe",
    "image": "/img/gplx-bien-bao/cam/P.118.png",
    "meaning": "Giới hạn chiều ngang tối đa của xe và hàng hóa theo trị số ghi trên biển.",
    "rule": "Xe có chiều ngang, kể cả hàng hóa, vượt trị số ghi trên biển không được đi qua; áp dụng cả với xe ưu tiên.",
    "penalty": {
      "summary": "Mức phạt phụ thuộc kích thước thực tế và tình trạng giấy phép lưu hành.",
      "entries": [
        {
          "subject": "Người điều khiển xe quá khổ",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn của đường, hoặc vượt kích thước giới hạn xếp hàng, không có giấy phép lưu hành còn giá trị.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c, điểm d khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Không thực hiện đúng quy định trong giấy phép lưu hành, trừ trường hợp có khung riêng.",
          "amount": "3.000.000–5.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 1 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn ghi trong giấy phép lưu hành.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Đi không đúng tuyến đường quy định trong giấy phép lưu hành.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 03 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 4 và điểm b khoản 7 Điều 34"
        }
      ],
      "note": "Đây là mức đối với người điều khiển; có thể kèm buộc dỡ phần hàng quá khổ và khôi phục cầu, đường nếu gây hư hại.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p119",
    "code": "P.119",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hạn chế chiều dài xe",
    "image": "/img/gplx-bien-bao/cam/P.119.png",
    "meaning": "Giới hạn chiều dài toàn bộ của một xe theo trị số mét ghi trên biển.",
    "rule": "Xe có tổng chiều dài, kể cả hàng hóa, lớn hơn trị số ghi trên biển không được đi qua; áp dụng cả với xe ưu tiên.",
    "penalty": {
      "summary": "Mức phạt phụ thuộc kích thước thực tế và tình trạng giấy phép lưu hành.",
      "entries": [
        {
          "subject": "Người điều khiển xe quá khổ",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn của đường, hoặc vượt kích thước giới hạn xếp hàng, không có giấy phép lưu hành còn giá trị.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c, điểm d khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Không thực hiện đúng quy định trong giấy phép lưu hành, trừ trường hợp có khung riêng.",
          "amount": "3.000.000–5.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 1 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn ghi trong giấy phép lưu hành.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Đi không đúng tuyến đường quy định trong giấy phép lưu hành.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 03 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 4 và điểm b khoản 7 Điều 34"
        }
      ],
      "note": "Đây là mức đối với người điều khiển; có thể kèm buộc dỡ phần hàng quá khổ và khôi phục cầu, đường nếu gây hư hại.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p120",
    "code": "P.120",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hạn chế chiều dài xe cơ giới kéo theo rơ-moóc hoặc sơ-mi rơ-moóc",
    "image": "/img/gplx-bien-bao/cam/P.120.png",
    "meaning": "Giới hạn chiều dài toàn bộ của xe cơ giới kéo rơ-moóc hoặc sơ-mi rơ-moóc.",
    "rule": "Tổ hợp xe, moóc và hàng có tổng chiều dài lớn hơn trị số ghi trên biển không được đi qua; áp dụng cả với xe ưu tiên đang kéo moóc.",
    "penalty": {
      "summary": "Mức phạt phụ thuộc kích thước thực tế và tình trạng giấy phép lưu hành.",
      "entries": [
        {
          "subject": "Người điều khiển xe quá khổ",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn của đường, hoặc vượt kích thước giới hạn xếp hàng, không có giấy phép lưu hành còn giá trị.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c, điểm d khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Không thực hiện đúng quy định trong giấy phép lưu hành, trừ trường hợp có khung riêng.",
          "amount": "3.000.000–5.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Khoản 1 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Xe hoặc hàng vượt khổ giới hạn ghi trong giấy phép lưu hành.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 3 và điểm a khoản 7 Điều 34"
        },
        {
          "subject": "Người có giấy phép lưu hành",
          "conduct": "Đi không đúng tuyến đường quy định trong giấy phép lưu hành.",
          "amount": "13.000.000–15.000.000 đồng",
          "consequence": "Trừ 03 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 4 và điểm b khoản 7 Điều 34"
        }
      ],
      "note": "Đây là mức đối với người điều khiển; có thể kèm buộc dỡ phần hàng quá khổ và khôi phục cầu, đường nếu gây hư hại.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p121",
    "code": "P.121",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cự ly tối thiểu giữa hai xe",
    "image": "/img/gplx-bien-bao/cam/P.121.png",
    "meaning": "Quy định khoảng cách tối thiểu phải giữ giữa hai xe ô tô.",
    "rule": "Xe ô tô, kể cả xe ưu tiên, phải giữ khoảng cách với xe phía trước không nhỏ hơn trị số mét ghi trên biển trong phạm vi tác dụng.",
    "penalty": {
      "summary": "Mức phạt áp dụng khi không giữ khoảng cách theo đúng trị số ghi trên biển.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Không giữ khoảng cách theo biển “Cự ly tối thiểu giữa hai xe”.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm l khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Không giữ khoảng cách theo biển “Cự ly tối thiểu giữa hai xe”.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm i khoản 3 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Không chấp hành trị số khoảng cách trên biển ở đường thông thường.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm a khoản 1 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Không giữ khoảng cách an toàn với xe phía trước khi chạy trên đường cao tốc.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm d khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Không giữ khoảng cách an toàn với xe phía trước khi chạy trên đường cao tốc.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm e khoản 6 Điều 8"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Không giữ khoảng cách gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Không giữ khoảng cách gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p123a",
    "code": "P.123a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm rẽ trái",
    "image": "/img/gplx-bien-bao/cam/P.123a.png",
    "meaning": "Báo cấm các loại xe rẽ trái tại nơi đường giao nhau.",
    "rule": "Không được rẽ trái, trừ xe ưu tiên theo quy định. Biển này không cấm quay đầu xe.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải tại nơi có biển cấm hướng rẽ tương ứng.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p123b",
    "code": "P.123b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm rẽ phải",
    "image": "/img/gplx-bien-bao/cam/P.123b.png",
    "meaning": "Báo cấm các loại xe rẽ phải tại nơi đường giao nhau.",
    "rule": "Không được rẽ phải, trừ xe ưu tiên theo quy định. Biển này không cấm quay đầu xe.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải tại nơi có biển cấm hướng rẽ tương ứng.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p124a",
    "code": "P.124a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm quay đầu xe",
    "image": "/img/gplx-bien-bao/cam/P.124a.png",
    "meaning": "Báo cấm các loại xe quay đầu theo chiều mũi tên thể hiện trên biển.",
    "rule": "Xe cơ giới và xe thô sơ không được quay đầu, trừ xe ưu tiên theo quy định. Biển không cấm rẽ trái sang hướng đường khác.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm k khoản 2 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p124b",
    "code": "P.124b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm ô tô quay đầu xe",
    "image": "/img/gplx-bien-bao/cam/P.124b.png",
    "meaning": "Báo cấm ô tô quay đầu theo chiều mũi tên thể hiện trên biển.",
    "rule": "Ô tô và xe máy ba bánh có thùng không được quay đầu, trừ xe ưu tiên theo quy định. Biển không cấm rẽ trái.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm k khoản 2 Điều 7"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Xe máy ba bánh thuộc phạm vi của biển",
          "conduct": "Quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p124c",
    "code": "P.124c",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm rẽ trái và quay đầu xe",
    "image": "/img/gplx-bien-bao/cam/P.124c.png",
    "meaning": "Báo cấm các loại xe đồng thời rẽ trái và quay đầu.",
    "rule": "Xe không được rẽ trái hoặc quay đầu tại vị trí đặt biển, trừ xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải tại nơi có biển cấm hướng rẽ tương ứng.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm k khoản 2 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p124d",
    "code": "P.124d",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm rẽ phải và quay đầu xe",
    "image": "/img/gplx-bien-bao/cam/P.124d.png",
    "meaning": "Báo cấm các loại xe đồng thời rẽ phải và quay đầu.",
    "rule": "Xe không được rẽ phải hoặc quay đầu tại vị trí đặt biển, trừ xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải tại nơi có biển cấm hướng rẽ tương ứng.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Quay đầu tại nơi có biển cấm quay đầu.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm k khoản 2 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p124e",
    "code": "P.124e",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm ô tô rẽ trái và quay đầu xe",
    "image": "/img/gplx-bien-bao/cam/P.124e.png",
    "meaning": "Báo cấm ô tô đồng thời rẽ trái và quay đầu.",
    "rule": "Ô tô không được rẽ trái hoặc quay đầu tại vị trí đặt biển, trừ xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p124f",
    "code": "P.124f",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm ô tô rẽ phải và quay đầu xe",
    "image": "/img/gplx-bien-bao/cam/P.124f.png",
    "meaning": "Báo cấm ô tô đồng thời rẽ phải và quay đầu.",
    "rule": "Ô tô không được rẽ phải hoặc quay đầu tại vị trí đặt biển, trừ xe ưu tiên theo quy định.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ hoặc quay đầu trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p125",
    "code": "P.125",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm vượt",
    "image": "/img/gplx-bien-bao/cam/P.125.png",
    "meaning": "Báo đoạn đường cấm các loại xe cơ giới vượt nhau.",
    "rule": "Xe cơ giới, kể cả xe ưu tiên, không được vượt xe cơ giới khác nhưng được vượt xe máy hai bánh và xe gắn máy. Lệnh cấm kết thúc tại DP.133 hoặc DP.135.",
    "penalty": {
      "summary": "Biển P.126 chỉ áp dụng cho đúng nhóm ô tô tải ghi trong quy định.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt xe tại đoạn đường có biển cấm vượt đối với phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt xe tại đoạn đường có biển cấm vượt.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm c khoản 4 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt xe không đúng quy định tại đoạn đường có biển cấm vượt.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm d khoản 3 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt xe trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt xe trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt xe trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p126",
    "code": "P.126",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe ô tô tải vượt",
    "image": "/img/gplx-bien-bao/cam/P.126.png",
    "meaning": "Báo đoạn đường cấm xe ô tô tải có khối lượng chuyên chở trên 3.500 kg vượt xe cơ giới khác.",
    "rule": "Xe tải thuộc phạm vi cấm, kể cả xe ưu tiên, vẫn được vượt xe máy hai bánh và xe gắn máy. Xe cơ giới khác được vượt nhau và vượt xe tải; lệnh cấm kết thúc tại DP.133 hoặc DP.135.",
    "penalty": {
      "summary": "Biển P.126 chỉ áp dụng cho đúng nhóm ô tô tải ghi trong quy định.",
      "entries": [
        {
          "subject": "Ô tô tải thuộc phạm vi biển P.126",
          "conduct": "Vượt xe tại đoạn đường có biển cấm vượt đối với phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 5 và điểm a khoản 16 Điều 6"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt xe trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        }
      ],
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p127",
    "code": "P.127",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Tốc độ tối đa cho phép",
    "image": "/img/gplx-bien-bao/cam/P.127.png",
    "meaning": "Quy định tốc độ tối đa cho phép của xe cơ giới, tính bằng km/h.",
    "rule": "Không được chạy vượt trị số ghi trên biển, trừ xe ưu tiên. Người lái vẫn phải chọn tốc độ an toàn theo điều kiện thực tế; giới hạn kết thúc tại DP.134 hoặc DP.135.",
    "penalty": {
      "summary": "Mức phạt được xác định bằng số km/h vượt quá trị số tốc độ đang có hiệu lực.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm đ khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 20 km/h đến 35 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 6 và điểm b khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 35 km/h.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm b khoản 2 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 8 và điểm b khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm a khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Biển theo làn hoặc theo loại xe phải đối chiếu đúng làn đang chạy và biểu tượng phương tiện trên biển.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p127a",
    "code": "P.127a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Tốc độ tối đa cho phép về ban đêm",
    "image": "/img/gplx-bien-bao/cam/P.127a.png",
    "meaning": "Quy định tốc độ tối đa cho phép về ban đêm trong khu đông dân cư.",
    "rule": "Chỉ có hiệu lực trong khung giờ ghi trên biển và đến biển R.421 “Hết khu đông dân cư”; xe không được vượt trị số ghi trên biển, trừ xe ưu tiên. Nếu gặp P.127 thì phải theo P.127.",
    "penalty": {
      "summary": "Mức phạt được xác định bằng số km/h vượt quá trị số tốc độ đang có hiệu lực.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm đ khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 20 km/h đến 35 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 6 và điểm b khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 35 km/h.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm b khoản 2 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 8 và điểm b khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm a khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Biển theo làn hoặc theo loại xe phải đối chiếu đúng làn đang chạy và biểu tượng phương tiện trên biển.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p127b",
    "code": "P.127b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Biển ghép tốc độ tối đa cho phép trên từng làn đường",
    "image": "/img/gplx-bien-bao/cam/P.127b.png",
    "meaning": "Quy định tốc độ tối đa cho phép riêng trên từng làn đường.",
    "rule": "Phương tiện đi ở làn nào phải tuân thủ trị số tốc độ tối đa ghi cho làn đường đó.",
    "penalty": {
      "summary": "Mức phạt được xác định bằng số km/h vượt quá trị số tốc độ đang có hiệu lực.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm đ khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 20 km/h đến 35 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 6 và điểm b khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 35 km/h.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm b khoản 2 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 8 và điểm b khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm a khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Biển theo làn hoặc theo loại xe phải đối chiếu đúng làn đang chạy và biểu tượng phương tiện trên biển.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p127c",
    "code": "P.127c",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Biển ghép tốc độ tối đa cho phép theo phương tiện, trên từng làn đường",
    "image": "/img/gplx-bien-bao/cam/P.127c.png",
    "meaning": "Quy định tốc độ tối đa theo từng loại phương tiện trên từng làn đường.",
    "rule": "Người lái phải đối chiếu đúng biểu tượng loại xe và làn đang đi để tuân thủ trị số tốc độ tương ứng.",
    "penalty": {
      "summary": "Mức phạt được xác định bằng số km/h vượt quá trị số tốc độ đang có hiệu lực.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm đ khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 20 km/h đến 35 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 6 và điểm b khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Vượt trên 35 km/h.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm b khoản 2 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "6.000.000–8.000.000 đồng",
          "consequence": "Trừ 04 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 8 và điểm b khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 05 km/h đến dưới 10 km/h.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt từ 10 km/h đến 20 km/h.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm a khoản 4 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Vượt trên 20 km/h.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm a khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Chạy quá tốc độ gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Biển theo làn hoặc theo loại xe phải đối chiếu đúng làn đang chạy và biểu tượng phương tiện trên biển.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-dp127",
    "code": "DP.127",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Biển hết tốc độ tối đa cho phép theo biển ghép",
    "image": "/img/gplx-bien-bao/cam/DP.127.png",
    "meaning": "Báo kết thúc đoạn áp dụng tốc độ tối đa theo biển ghép.",
    "rule": "Từ vị trí đặt biển, các mức tốc độ theo làn hoặc theo loại phương tiện trên biển ghép trước đó hết hiệu lực.",
    "penalty": {
      "summary": "Biển này báo kết thúc hiệu lực của lệnh cấm trước đó nên không có mức phạt độc lập.",
      "entries": [],
      "note": "Vi phạm xảy ra trước vị trí biển kết thúc vẫn được xử lý theo lệnh cấm đang có hiệu lực tại thời điểm thực hiện hành vi.",
      "noIndependentPenalty": true,
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p128",
    "code": "P.128",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm sử dụng còi",
    "image": "/img/gplx-bien-bao/cam/P.128.png",
    "meaning": "Báo đoạn đường cấm các loại xe sử dụng còi.",
    "rule": "Không được sử dụng còi trong phạm vi ghi trên biển phụ S.501 hoặc cho đến biển DP.135.",
    "penalty": {
      "summary": "Phải xét cách sử dụng còi, thời gian và khu vực xảy ra hành vi.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Sử dụng còi trong phạm vi biển P.128 mà không thuộc hành vi đặc thù khác.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm a khoản 1 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dùng còi từ 22 giờ đến 05 giờ trong khu đông dân cư hoặc khu vực cơ sở khám, chữa bệnh.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm đ khoản 1 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dùng còi hoặc rú ga liên tục; dùng còi hơi trong trường hợp bị cấm.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm b khoản 3 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Sử dụng còi trong phạm vi biển P.128 mà không thuộc hành vi đặc thù khác.",
          "amount": "200.000–400.000 đồng",
          "legalBasis": "Điểm a khoản 1 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Dùng còi từ 22 giờ đến 05 giờ trong khu đông dân cư hoặc khu vực cơ sở khám, chữa bệnh.",
          "amount": "200.000–400.000 đồng",
          "legalBasis": "Điểm i khoản 1 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Dùng còi hoặc rú ga liên tục trong khu đông dân cư hoặc khu vực cơ sở khám, chữa bệnh.",
          "amount": "8.000.000–10.000.000 đồng",
          "consequence": "Tước quyền sử dụng giấy phép lái xe từ 10 đến 12 tháng.",
          "legalBasis": "Điểm k khoản 9 và điểm b khoản 12 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Sử dụng còi trong phạm vi biển P.128 mà không thuộc hành vi đặc thù khác.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm a khoản 1 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Dùng còi hoặc rú ga liên tục; dùng còi hơi trong trường hợp bị cấm.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm b khoản 3 Điều 8"
        }
      ],
      "note": "Không dùng mức “còi liên tục” cho một lần bấm còi đơn lẻ; xe ưu tiên đang làm nhiệm vụ được áp dụng ngoại lệ theo quy định.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p129",
    "code": "P.129",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Kiểm tra",
    "image": "/img/gplx-bien-bao/cam/P.129.png",
    "meaning": "Báo phía trước có trạm kiểm tra hoặc kiểm soát phương tiện.",
    "rule": "Các phương tiện vận tải đi qua phải dừng lại để thực hiện thủ tục kiểm tra, kiểm soát theo quy định.",
    "penalty": {
      "summary": "Cần phân biệt không chấp hành riêng biển P.129 với việc chống lại hiệu lệnh trực tiếp của người thi hành công vụ.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Không chấp hành riêng chỉ dẫn dừng kiểm tra của biển P.129.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm a khoản 1 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Không chấp hành riêng chỉ dẫn dừng kiểm tra của biển P.129.",
          "amount": "200.000–400.000 đồng",
          "legalBasis": "Điểm a khoản 1 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Không chấp hành riêng chỉ dẫn dừng kiểm tra của biển P.129.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm a khoản 1 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Không chấp hành riêng chỉ dẫn dừng kiểm tra của biển P.129.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Cá nhân",
          "conduct": "Không chấp hành yêu cầu kiểm tra, kiểm soát của người thi hành công vụ.",
          "amount": "4.000.000–6.000.000 đồng",
          "legalBasis": "Khoản 10 Điều 12"
        },
        {
          "subject": "Tổ chức",
          "conduct": "Không chấp hành yêu cầu kiểm tra, kiểm soát của người thi hành công vụ.",
          "amount": "8.000.000–12.000.000 đồng",
          "legalBasis": "Khoản 10 Điều 12"
        },
        {
          "subject": "Người điều khiển xe quá tải hoặc quá khổ",
          "conduct": "Không chấp hành yêu cầu kiểm tra tải trọng, khổ giới hạn hoặc dùng thủ đoạn trốn tránh kiểm tra.",
          "amount": "40.000.000–50.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 5 và điểm d khoản 7 Điều 34"
        }
      ],
      "note": "Khoản 10 Điều 12 loại trừ các hành vi đã có khung riêng. Từ chối kiểm tra nồng độ cồn hoặc chất ma túy là hành vi riêng, không được suy ra chỉ từ việc nhìn thấy biển P.129.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p130",
    "code": "P.130",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm dừng xe và đỗ xe",
    "image": "/img/gplx-bien-bao/cam/P.130.png",
    "meaning": "Báo phía đường đặt biển là nơi cấm cả dừng xe và đỗ xe.",
    "rule": "Xe cơ giới không được dừng hoặc đỗ, trừ xe ưu tiên; xe buýt chỉ dừng tại vị trí quy định. Hiệu lực từ biển đến nút giao, điểm kết thúc được chỉ dẫn hoặc DP.135.",
    "penalty": {
      "summary": "Ô tô có hai khung khác nhau cho hành vi dừng và hành vi đỗ.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng xe tại nơi có biển “Cấm dừng xe và đỗ xe”.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm đ khoản 2 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đỗ xe tại nơi có biển “Cấm dừng xe và đỗ xe”.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm e khoản 3 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Dừng hoặc đỗ xe tại nơi có biển “Cấm dừng xe và đỗ xe”.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm e khoản 2 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Dừng hoặc đỗ xe tại nơi có biển “Cấm dừng xe và đỗ xe”.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 2 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trên đường cao tốc không đúng nơi quy định.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây ùn tắc giao thông.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm k khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Trường hợp trên đường cao tốc có khung riêng; không dùng các mức thông thường ở trên.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p131a",
    "code": "P.131a",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm đỗ xe",
    "image": "/img/gplx-bien-bao/cam/P.131a.png",
    "meaning": "Báo phía đường đặt biển là nơi cấm đỗ xe.",
    "rule": "Xe cơ giới không được đỗ ở phía đường có đặt biển, trừ xe ưu tiên. Việc dừng xe vẫn phải tuân thủ các quy định chung.",
    "penalty": {
      "summary": "Biển P.131 chỉ cấm đỗ; dừng xe đúng nghĩa pháp lý không tự động bị phạt theo biển này.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm e khoản 3 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm e khoản 2 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 2 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trên đường cao tốc không đúng nơi quy định.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây ùn tắc giao thông.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm k khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Với P.131b/P.131c, chỉ áp dụng khung này vào đúng ngày lẻ hoặc ngày chẵn mà biển quy định.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p131b",
    "code": "P.131b",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm đỗ xe ngày lẻ",
    "image": "/img/gplx-bien-bao/cam/P.131b.png",
    "meaning": "Báo phía đường đặt biển là nơi cấm đỗ xe vào các ngày lẻ.",
    "rule": "Vào ngày lẻ, xe cơ giới không được đỗ ở phía đường có đặt biển, trừ xe ưu tiên.",
    "penalty": {
      "summary": "Biển P.131 chỉ cấm đỗ; dừng xe đúng nghĩa pháp lý không tự động bị phạt theo biển này.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm e khoản 3 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm e khoản 2 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 2 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trên đường cao tốc không đúng nơi quy định.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây ùn tắc giao thông.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm k khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Với P.131b/P.131c, chỉ áp dụng khung này vào đúng ngày lẻ hoặc ngày chẵn mà biển quy định.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p131c",
    "code": "P.131c",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm đỗ xe ngày chẵn",
    "image": "/img/gplx-bien-bao/cam/P.131c.png",
    "meaning": "Báo phía đường đặt biển là nơi cấm đỗ xe vào các ngày chẵn.",
    "rule": "Vào ngày chẵn, xe cơ giới không được đỗ ở phía đường có đặt biển, trừ xe ưu tiên.",
    "penalty": {
      "summary": "Biển P.131 chỉ cấm đỗ; dừng xe đúng nghĩa pháp lý không tự động bị phạt theo biển này.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm e khoản 3 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm e khoản 2 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đỗ xe trong thời gian hoặc ngày mà biển cấm đỗ đang có hiệu lực.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 2 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trên đường cao tốc không đúng nơi quy định.",
          "amount": "12.000.000–14.000.000 đồng",
          "consequence": "Trừ 06 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 7 và điểm c khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây ùn tắc giao thông.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm k khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Dừng hoặc đỗ xe trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Với P.131b/P.131c, chỉ áp dụng khung này vào đúng ngày lẻ hoặc ngày chẵn mà biển quy định.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p132",
    "code": "P.132",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp",
    "image": "/img/gplx-bien-bao/cam/P.132.png",
    "meaning": "Báo phải nhường đường cho xe cơ giới đi ngược chiều khi qua đoạn đường hoặc cầu hẹp.",
    "rule": "Khi có xe cơ giới đi ngược chiều, xe theo hướng đặt biển phải dừng ở vị trí thích hợp để nhường; áp dụng cả với xe ưu tiên.",
    "penalty": {
      "summary": "Biển yêu cầu nhường xe ngược chiều; mức phạt phụ thuộc loại phương tiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Không nhường đường cho xe đi ngược chiều tại nơi đường hẹp.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm c khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Không nhường đường cho xe đi ngược chiều tại nơi đường hẹp.",
          "amount": "200.000–400.000 đồng",
          "legalBasis": "Điểm h khoản 1 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Không nhường đường cho xe đi ngược chiều tại nơi đường hẹp.",
          "amount": "800.000–1.000.000 đồng",
          "legalBasis": "Điểm d khoản 3 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Không nhường đường trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Không nhường đường trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Không nhường đường trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm d khoản 8 Điều 8"
        }
      ],
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-dp133",
    "code": "DP.133",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hết cấm vượt",
    "image": "/img/gplx-bien-bao/cam/DP.133.png",
    "meaning": "Báo kết thúc đoạn đường đang áp dụng lệnh cấm vượt.",
    "rule": "Từ vị trí đặt biển, lệnh cấm vượt trước đó hết hiệu lực; người lái vẫn chỉ được vượt khi đáp ứng các điều kiện an toàn và quy định chung.",
    "penalty": {
      "summary": "Biển này báo kết thúc hiệu lực của lệnh cấm trước đó nên không có mức phạt độc lập.",
      "entries": [],
      "note": "Vi phạm xảy ra trước vị trí biển kết thúc vẫn được xử lý theo lệnh cấm đang có hiệu lực tại thời điểm thực hiện hành vi.",
      "noIndependentPenalty": true,
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-dp134",
    "code": "DP.134",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hết tốc độ tối đa cho phép",
    "image": "/img/gplx-bien-bao/cam/DP.134.png",
    "meaning": "Báo kết thúc đoạn đường đang áp dụng tốc độ tối đa ghi trên biển trước đó.",
    "rule": "Từ vị trí đặt biển, giới hạn tốc độ trước đó hết hiệu lực; phương tiện tuân theo giới hạn tốc độ chung hoặc biển báo tiếp theo.",
    "penalty": {
      "summary": "Biển này báo kết thúc hiệu lực của lệnh cấm trước đó nên không có mức phạt độc lập.",
      "entries": [],
      "note": "Vi phạm xảy ra trước vị trí biển kết thúc vẫn được xử lý theo lệnh cấm đang có hiệu lực tại thời điểm thực hiện hành vi.",
      "noIndependentPenalty": true,
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-dp135",
    "code": "DP.135",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Hết tất cả các lệnh cấm",
    "image": "/img/gplx-bien-bao/cam/DP.135.png",
    "meaning": "Báo vị trí nhiều lệnh cấm đang cùng áp dụng đều kết thúc.",
    "rule": "Từ vị trí đặt biển, các lệnh cấm có phạm vi kết thúc tại đây hết hiệu lực; người lái tiếp tục tuân thủ quy định chung và các biển báo mới.",
    "penalty": {
      "summary": "Biển này báo kết thúc hiệu lực của lệnh cấm trước đó nên không có mức phạt độc lập.",
      "entries": [],
      "note": "Vi phạm xảy ra trước vị trí biển kết thúc vẫn được xử lý theo lệnh cấm đang có hiệu lực tại thời điểm thực hiện hành vi.",
      "noIndependentPenalty": true,
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p136",
    "code": "P.136",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm đi thẳng",
    "image": "/img/gplx-bien-bao/cam/P.136.png",
    "meaning": "Báo tại nút giao phía trước, các loại xe bị cấm đi thẳng.",
    "rule": "Xe phải chuyển hướng phù hợp, trừ xe ưu tiên. Nếu có biển phụ về thời gian hoặc loại xe, lệnh cấm chỉ áp dụng theo nội dung biển phụ.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm c khoản 2 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p137",
    "code": "P.137",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm rẽ trái, rẽ phải",
    "image": "/img/gplx-bien-bao/cam/P.137.png",
    "meaning": "Báo tại nút giao phía trước, các loại xe bị cấm rẽ cả trái và phải.",
    "rule": "Xe không được rẽ trái hoặc rẽ phải, trừ xe ưu tiên; phải đi theo hướng còn được phép và tuân thủ biển phụ nếu có.",
    "penalty": {
      "summary": "Phải đối chiếu đúng loại xe và hành vi rẽ hoặc quay đầu đã thực hiện.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải tại nơi có biển cấm hướng rẽ tương ứng.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Rẽ theo hướng bị biển cấm.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ trái hoặc rẽ phải trái quy định gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Các mức thông thường trong nhóm này không kèm trừ điểm GPLX; nếu gây tai nạn sẽ áp dụng khung riêng.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p138",
    "code": "P.138",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm đi thẳng, rẽ trái",
    "image": "/img/gplx-bien-bao/cam/P.138.png",
    "meaning": "Báo tại nút giao phía trước, các loại xe bị cấm đi thẳng và rẽ trái.",
    "rule": "Xe không được đi thẳng hoặc rẽ trái; chỉ được rẽ phải, trừ xe ưu tiên. Phạm vi theo thời gian hoặc loại xe được xác định bằng biển phụ nếu có.",
    "penalty": {
      "summary": "Biển cấm hai hành vi; mức phạt đi thẳng và rẽ trái không giống nhau.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ trái theo hướng mà biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ trái theo hướng mà biển cấm.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ trái theo hướng mà biển cấm.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Rẽ trái theo hướng mà biển cấm.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm c khoản 2 Điều 11"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Rẽ trái theo hướng mà biển cấm.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Thực hiện hướng đi bị cấm và gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Thực hiện hướng đi bị cấm và gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Thực hiện hướng đi bị cấm và gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Chỉ chọn dòng đúng với hành vi thực tế; không cộng hai mức nếu người lái chỉ thực hiện một hướng đi.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p139",
    "code": "P.139",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm đi thẳng, rẽ phải",
    "image": "/img/gplx-bien-bao/cam/P.139.png",
    "meaning": "Báo tại nút giao phía trước, các loại xe bị cấm đi thẳng và rẽ phải.",
    "rule": "Xe không được đi thẳng hoặc rẽ phải; chỉ được rẽ trái, trừ xe ưu tiên. Phạm vi theo thời gian hoặc loại xe được xác định bằng biển phụ nếu có.",
    "penalty": {
      "summary": "Biển cấm hai hành vi; mức phạt đi thẳng và rẽ phải không giống nhau.",
      "entries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "4.000.000–6.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm i khoản 5 và điểm a khoản 16 Điều 6"
        },
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Rẽ phải theo hướng mà biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "legalBasis": "Điểm k khoản 4 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "2.000.000–3.000.000 đồng",
          "consequence": "Trừ 02 điểm giấy phép lái xe.",
          "legalBasis": "Điểm b khoản 6 và điểm a khoản 13 Điều 7"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Rẽ phải theo hướng mà biển cấm.",
          "amount": "600.000–800.000 đồng",
          "legalBasis": "Điểm a khoản 3 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Rẽ phải theo hướng mà biển cấm.",
          "amount": "1.000.000–2.000.000 đồng",
          "legalBasis": "Điểm d khoản 4 Điều 8"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "300.000–400.000 đồng",
          "legalBasis": "Điểm c khoản 3 Điều 9"
        },
        {
          "subject": "Xe đạp, xe đạp máy và xe thô sơ",
          "conduct": "Rẽ phải theo hướng mà biển cấm.",
          "amount": "100.000–200.000 đồng",
          "legalBasis": "Điểm c khoản 1 Điều 9"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Đi thẳng vào hướng mà biển cấm.",
          "amount": "400.000–600.000 đồng",
          "legalBasis": "Điểm c khoản 2 Điều 11"
        },
        {
          "subject": "Người điều khiển xe vật nuôi kéo",
          "conduct": "Rẽ phải theo hướng mà biển cấm.",
          "amount": "150.000–250.000 đồng",
          "legalBasis": "Điểm b khoản 1 Điều 11"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Ô tô và xe tương tự ô tô",
          "conduct": "Thực hiện hướng đi bị cấm và gây tai nạn giao thông.",
          "amount": "20.000.000–22.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 16 Điều 6"
        },
        {
          "subject": "Mô tô, xe gắn máy và xe tương tự",
          "conduct": "Thực hiện hướng đi bị cấm và gây tai nạn giao thông.",
          "amount": "10.000.000–14.000.000 đồng",
          "consequence": "Trừ 10 điểm giấy phép lái xe.",
          "legalBasis": "Điểm a khoản 10 và điểm d khoản 13 Điều 7"
        },
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Thực hiện hướng đi bị cấm và gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Chỉ chọn dòng đúng với hành vi thực tế; không cộng hai mức nếu người lái chỉ thực hiện một hướng đi.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "cam-p140",
    "code": "P.140",
    "group": "cam",
    "groupLabel": "Biển cấm",
    "name": "Cấm xe công nông và các loại xe tương tự",
    "image": "/img/gplx-bien-bao/cam/P.140.png",
    "meaning": "Báo đoạn đường cấm xe công nông và các loại xe tương tự đi qua.",
    "rule": "Xe công nông và phương tiện có đặc tính tương tự không được đi vào đoạn đường đặt biển.",
    "penalty": {
      "summary": "Chỉ bị xử phạt khi phương tiện thuộc đúng đối tượng mà biển cấm.",
      "entries": [
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Đi vào đường hoặc khu vực có biển cấm đối với đúng loại phương tiện đang điều khiển.",
          "amount": "3.000.000–5.000.000 đồng",
          "legalBasis": "Điểm d khoản 6 Điều 8"
        }
      ],
      "aggravatedEntries": [
        {
          "subject": "Xe máy chuyên dùng",
          "conduct": "Hành vi đi vào đường cấm gây tai nạn giao thông.",
          "amount": "14.000.000–16.000.000 đồng",
          "legalBasis": "Điểm a khoản 8 Điều 8"
        }
      ],
      "note": "Xe ưu tiên đang làm nhiệm vụ khẩn cấp được áp dụng ngoại lệ khi điều khoản tương ứng cho phép.",
      "verifiedOn": "26/07/2026",
      "sourceLabel": "Nghị định 168/2024/NĐ-CP (toàn văn trên Cổng Thông tin điện tử Chính phủ)",
      "sourceUrl": "https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-dinh-168-2024-nd-cp-quy-dinh-xu-phat-vi-pham-hanh-chinh-ve-trat-tu-atgt-duong-bo-119241231164556785.htm"
    }
  },
  {
    "id": "hieu-lenh-r122",
    "code": "R.122",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Dừng lại",
    "image": "/img/gplx-bien-bao/hieu-lenh/r122.png"
  },
  {
    "id": "hieu-lenh-r301a",
    "code": "R.301a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301a.png"
  },
  {
    "id": "hieu-lenh-r301b",
    "code": "R.301b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301b.png"
  },
  {
    "id": "hieu-lenh-r301c",
    "code": "R.301c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301c.png"
  },
  {
    "id": "hieu-lenh-r301d",
    "code": "R.301d",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301d.png"
  },
  {
    "id": "hieu-lenh-r301e",
    "code": "R.301e",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301e.png"
  },
  {
    "id": "hieu-lenh-r301f",
    "code": "R.301f",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301f.png"
  },
  {
    "id": "hieu-lenh-r301g",
    "code": "R.301g",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301g.png"
  },
  {
    "id": "hieu-lenh-r301h",
    "code": "R.301h",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r301h.png"
  },
  {
    "id": "hieu-lenh-r302a",
    "code": "R.302a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng phải đi vòng chướng ngại vật",
    "image": "/img/gplx-bien-bao/hieu-lenh/r302a.png"
  },
  {
    "id": "hieu-lenh-r302b",
    "code": "R.302b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng phải đi vòng chướng ngại vật",
    "image": "/img/gplx-bien-bao/hieu-lenh/r302b.png"
  },
  {
    "id": "hieu-lenh-r302c",
    "code": "R.302c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng phải đi vòng chướng ngại vật",
    "image": "/img/gplx-bien-bao/hieu-lenh/r302c.png"
  },
  {
    "id": "hieu-lenh-r303",
    "code": "R.303",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Nơi giao nhau chạy theo vòng xuyến",
    "image": "/img/gplx-bien-bao/hieu-lenh/r303.png"
  },
  {
    "id": "hieu-lenh-r304",
    "code": "R.304",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho xe thô sơ",
    "image": "/img/gplx-bien-bao/hieu-lenh/r304.png"
  },
  {
    "id": "hieu-lenh-r305",
    "code": "R.305",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho người đi bộ",
    "image": "/img/gplx-bien-bao/hieu-lenh/r305.png"
  },
  {
    "id": "hieu-lenh-r306",
    "code": "R.306",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Tốc độ tối thiểu cho phép",
    "image": "/img/gplx-bien-bao/hieu-lenh/r306.png"
  },
  {
    "id": "hieu-lenh-r307",
    "code": "R.307",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết tốc độ tối thiểu",
    "image": "/img/gplx-bien-bao/hieu-lenh/r307.png"
  },
  {
    "id": "hieu-lenh-r308a",
    "code": "R.308a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Tuyến đường cầu vượt cắt qua",
    "image": "/img/gplx-bien-bao/hieu-lenh/r308a.png"
  },
  {
    "id": "hieu-lenh-r308b",
    "code": "R.308b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Tuyến đường cầu vượt cắt qua",
    "image": "/img/gplx-bien-bao/hieu-lenh/r308b.png"
  },
  {
    "id": "hieu-lenh-r309",
    "code": "R.309",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Ấn còi",
    "image": "/img/gplx-bien-bao/hieu-lenh/r309.png"
  },
  {
    "id": "hieu-lenh-r310a",
    "code": "R.310a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo cho các xe chở hàng nguy hiểm",
    "image": "/img/gplx-bien-bao/hieu-lenh/r310a.png"
  },
  {
    "id": "hieu-lenh-r310b",
    "code": "R.310b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo cho các xe chở hàng nguy hiểm",
    "image": "/img/gplx-bien-bao/hieu-lenh/r310b.png"
  },
  {
    "id": "hieu-lenh-r310c",
    "code": "R.310c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi phải theo cho các xe chở hàng nguy hiểm",
    "image": "/img/gplx-bien-bao/hieu-lenh/r310c.png"
  },
  {
    "id": "hieu-lenh-r403a",
    "code": "R.403a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho xe ô tô",
    "image": "/img/gplx-bien-bao/hieu-lenh/r403a.png"
  },
  {
    "id": "hieu-lenh-r403b",
    "code": "R.403b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho xe ô tô, xe máy",
    "image": "/img/gplx-bien-bao/hieu-lenh/r403b.png"
  },
  {
    "id": "hieu-lenh-r403c",
    "code": "R.403c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho xe buýt",
    "image": "/img/gplx-bien-bao/hieu-lenh/r403c.png"
  },
  {
    "id": "hieu-lenh-r403d",
    "code": "R.403d",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho xe ô tô con",
    "image": "/img/gplx-bien-bao/hieu-lenh/r403d.png"
  },
  {
    "id": "hieu-lenh-r403e",
    "code": "R.403e",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho xe máy",
    "image": "/img/gplx-bien-bao/hieu-lenh/r403e.png"
  },
  {
    "id": "hieu-lenh-r403f",
    "code": "R.403f",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường dành cho xe máy và xe đạp",
    "image": "/img/gplx-bien-bao/hieu-lenh/r403f.png"
  },
  {
    "id": "hieu-lenh-r404a",
    "code": "R.404a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết đoạn đường dành cho xe ô tô",
    "image": "/img/gplx-bien-bao/hieu-lenh/r404a.png"
  },
  {
    "id": "hieu-lenh-r404b",
    "code": "R.404b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết đoạn đường dành cho xe ô tô, xe máy",
    "image": "/img/gplx-bien-bao/hieu-lenh/r404b.png"
  },
  {
    "id": "hieu-lenh-r404c",
    "code": "R.404c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết đoạn đường dành cho xe buýt",
    "image": "/img/gplx-bien-bao/hieu-lenh/r404c.png"
  },
  {
    "id": "hieu-lenh-r404d",
    "code": "R.404d",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết đoạn đường dành cho xe ô tô con",
    "image": "/img/gplx-bien-bao/hieu-lenh/r404d.png"
  },
  {
    "id": "hieu-lenh-r404e",
    "code": "R.404e",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết đoạn đường dành cho xe máy",
    "image": "/img/gplx-bien-bao/hieu-lenh/r404e.png"
  },
  {
    "id": "hieu-lenh-r404f",
    "code": "R.404f",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết đoạn đường dành cho xe máy và xe đạp",
    "image": "/img/gplx-bien-bao/hieu-lenh/r404f.png"
  },
  {
    "id": "hieu-lenh-r411",
    "code": "R.411",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hướng đi trên mỗi làn đường phải theo",
    "image": "/img/gplx-bien-bao/hieu-lenh/r411.jpg"
  },
  {
    "id": "hieu-lenh-r412a",
    "code": "R.412a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe ô tô khách",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412a.png"
  },
  {
    "id": "hieu-lenh-r412b",
    "code": "R.412b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe ô tô con",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412b.png"
  },
  {
    "id": "hieu-lenh-r412c",
    "code": "R.412c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe ô tô tải",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412c.png"
  },
  {
    "id": "hieu-lenh-r412d",
    "code": "R.412d",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe máy",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412d.png"
  },
  {
    "id": "hieu-lenh-r412e",
    "code": "R.412e",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe buýt",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412e.png"
  },
  {
    "id": "hieu-lenh-r412f",
    "code": "R.412f",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe ô tô",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412f.png"
  },
  {
    "id": "hieu-lenh-r412g",
    "code": "R.412g",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe máy và xe đạp",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412g.png"
  },
  {
    "id": "hieu-lenh-r412h",
    "code": "R.412h",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Làn đường dành cho xe đạp",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412h.png"
  },
  {
    "id": "hieu-lenh-r412i",
    "code": "R.412i",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe ô tô khách",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412i.png"
  },
  {
    "id": "hieu-lenh-r412j",
    "code": "R.412j",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe ô tô con",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412j.png"
  },
  {
    "id": "hieu-lenh-r412k",
    "code": "R.412k",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe ô tô tải",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412k.png"
  },
  {
    "id": "hieu-lenh-r412l",
    "code": "R.412l",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe máy",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412l.png"
  },
  {
    "id": "hieu-lenh-r412m",
    "code": "R.412m",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe buýt",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412m.png"
  },
  {
    "id": "hieu-lenh-r412n",
    "code": "R.412n",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe ô tô",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412n.png"
  },
  {
    "id": "hieu-lenh-r412o",
    "code": "R.412o",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe máy và xe đạp",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412o.png"
  },
  {
    "id": "hieu-lenh-r412p",
    "code": "R.412p",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc làn đường dành cho xe đạp",
    "image": "/img/gplx-bien-bao/hieu-lenh/r412p.png"
  },
  {
    "id": "hieu-lenh-r415",
    "code": "R.415",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Biển gộp làn đường theo phương tiện",
    "image": "/img/gplx-bien-bao/hieu-lenh/r415.png"
  },
  {
    "id": "hieu-lenh-r420",
    "code": "R.420",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Bắt đầu khu đông dân cư",
    "image": "/img/gplx-bien-bao/hieu-lenh/r420.png"
  },
  {
    "id": "hieu-lenh-r421",
    "code": "R.421",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết khu đông dân cư",
    "image": "/img/gplx-bien-bao/hieu-lenh/r421.png"
  },
  {
    "id": "hieu-lenh-re10a",
    "code": "R.E,10a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết cấm đỗ xe trong khu vực",
    "image": "/img/gplx-bien-bao/hieu-lenh/re10a.png"
  },
  {
    "id": "hieu-lenh-re10b",
    "code": "R.E,10b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết cấm đỗ xe theo giờ trong khu vực",
    "image": "/img/gplx-bien-bao/hieu-lenh/re10b.png"
  },
  {
    "id": "hieu-lenh-re10c",
    "code": "R.E,10c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết khu vực đỗ xe",
    "image": "/img/gplx-bien-bao/hieu-lenh/re10c.png"
  },
  {
    "id": "hieu-lenh-re10d",
    "code": "R.E,10d",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Hết tốc độ tối đa trong khu vực",
    "image": "/img/gplx-bien-bao/hieu-lenh/re10d.png"
  },
  {
    "id": "hieu-lenh-re11a",
    "code": "R.E,11a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Đường hầm",
    "image": "/img/gplx-bien-bao/hieu-lenh/re11a.png"
  },
  {
    "id": "hieu-lenh-re11b",
    "code": "R.E,11b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Kết thúc đường hầm",
    "image": "/img/gplx-bien-bao/hieu-lenh/re11b.png"
  },
  {
    "id": "hieu-lenh-re9a",
    "code": "R.E,9a",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Cấm đỗ xe trong khu vực",
    "image": "/img/gplx-bien-bao/hieu-lenh/re9a.png"
  },
  {
    "id": "hieu-lenh-re9b",
    "code": "R.E,9b",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Cấm đỗ xe theo giờ trong khu vực",
    "image": "/img/gplx-bien-bao/hieu-lenh/re9b.png"
  },
  {
    "id": "hieu-lenh-re9c",
    "code": "R.E,9c",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Khu vực đỗ xe",
    "image": "/img/gplx-bien-bao/hieu-lenh/re9c.png"
  },
  {
    "id": "hieu-lenh-re9d",
    "code": "R.E,9d",
    "group": "hieu-lenh",
    "groupLabel": "Biển hiệu lệnh",
    "name": "Tốc độ tối đa trong khu vực",
    "image": "/img/gplx-bien-bao/hieu-lenh/re9d.png"
  },
  {
    "id": "chi-dan-i401",
    "code": "I.401",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Bắt đầu đường ưu tiên",
    "image": "/img/gplx-bien-bao/chi-dan/i401.png"
  },
  {
    "id": "chi-dan-i402",
    "code": "I.402",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Hết đoạn đường ưu tiên",
    "image": "/img/gplx-bien-bao/chi-dan/i402.png"
  },
  {
    "id": "chi-dan-i405a",
    "code": "I.405a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường cụt",
    "image": "/img/gplx-bien-bao/chi-dan/i405a.png"
  },
  {
    "id": "chi-dan-i405b",
    "code": "I.405b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường cụt",
    "image": "/img/gplx-bien-bao/chi-dan/i405b.png"
  },
  {
    "id": "chi-dan-i405c",
    "code": "I.405c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường cụt",
    "image": "/img/gplx-bien-bao/chi-dan/i405c.png"
  },
  {
    "id": "chi-dan-i406",
    "code": "I.406",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Được ưu tiên qua đường hẹp",
    "image": "/img/gplx-bien-bao/chi-dan/i406.jpg"
  },
  {
    "id": "chi-dan-i407a",
    "code": "I.407a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường một chiều",
    "image": "/img/gplx-bien-bao/chi-dan/i407a.png"
  },
  {
    "id": "chi-dan-i407b",
    "code": "I.407b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường một chiều",
    "image": "/img/gplx-bien-bao/chi-dan/i407b.png"
  },
  {
    "id": "chi-dan-i407c",
    "code": "I.407c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường một chiều",
    "image": "/img/gplx-bien-bao/chi-dan/i407c.png"
  },
  {
    "id": "chi-dan-i408",
    "code": "I.408",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Nơi đỗ xe",
    "image": "/img/gplx-bien-bao/chi-dan/i408.jpg"
  },
  {
    "id": "chi-dan-i408a",
    "code": "I.408a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Nơi đỗ xe một phần trên hè phố",
    "image": "/img/gplx-bien-bao/chi-dan/i408a.jpg"
  },
  {
    "id": "chi-dan-i409",
    "code": "I.409",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỗ quay xe",
    "image": "/img/gplx-bien-bao/chi-dan/i409.png"
  },
  {
    "id": "chi-dan-i410",
    "code": "I.410",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Khu vực quay xe",
    "image": "/img/gplx-bien-bao/chi-dan/i410.png"
  },
  {
    "id": "chi-dan-i413a",
    "code": "I.413a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường phía trước có làn đường dành cho ô tô khách",
    "image": "/img/gplx-bien-bao/chi-dan/i413a.png"
  },
  {
    "id": "chi-dan-i413b",
    "code": "I.413b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Rẽ ra đường có làn đường dành cho ô tô khách",
    "image": "/img/gplx-bien-bao/chi-dan/i413b.png"
  },
  {
    "id": "chi-dan-i413c",
    "code": "I.413c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Rẽ ra đường có làn đường dành cho ô tô khách",
    "image": "/img/gplx-bien-bao/chi-dan/i413c.png"
  },
  {
    "id": "chi-dan-i414a",
    "code": "I.414a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ hướng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i414a.png"
  },
  {
    "id": "chi-dan-i414b",
    "code": "I.414b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ hướng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i414b.png"
  },
  {
    "id": "chi-dan-i414c",
    "code": "I.414c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ hướng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i414c.png"
  },
  {
    "id": "chi-dan-i414d",
    "code": "I.414d",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ hướng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i414d.png"
  },
  {
    "id": "chi-dan-i415",
    "code": "I.415",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Mũi tên chỉ hướng đi",
    "image": "/img/gplx-bien-bao/chi-dan/i415.png"
  },
  {
    "id": "chi-dan-i416",
    "code": "I.416",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đường tránh",
    "image": "/img/gplx-bien-bao/chi-dan/i416.png"
  },
  {
    "id": "chi-dan-i417a",
    "code": "I.417a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ hướng đường phải đi cho từng loại xe",
    "image": "/img/gplx-bien-bao/chi-dan/i417a.png"
  },
  {
    "id": "chi-dan-i417b",
    "code": "I.417b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ hướng đường phải đi cho từng loại xe",
    "image": "/img/gplx-bien-bao/chi-dan/i417b.png"
  },
  {
    "id": "chi-dan-i417c",
    "code": "I.417c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ hướng đường phải đi cho từng loại xe",
    "image": "/img/gplx-bien-bao/chi-dan/i417c.png"
  },
  {
    "id": "chi-dan-i418",
    "code": "I.418",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Lối đi ở những vị trí cấm rẽ",
    "image": "/img/gplx-bien-bao/chi-dan/i418.png"
  },
  {
    "id": "chi-dan-i419a",
    "code": "I.419a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ dẫn địa giới",
    "image": "/img/gplx-bien-bao/chi-dan/i419a.png"
  },
  {
    "id": "chi-dan-i419b",
    "code": "I.419b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chỉ dẫn địa giới trên tuyến đường đối ngoại",
    "image": "/img/gplx-bien-bao/chi-dan/i419b.png"
  },
  {
    "id": "chi-dan-i422a",
    "code": "I.422a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Di tích lịch sử",
    "image": "/img/gplx-bien-bao/chi-dan/i422a.png"
  },
  {
    "id": "chi-dan-i422b",
    "code": "I.422b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Di tích lịch sử trên tuyến đường đối ngoại",
    "image": "/img/gplx-bien-bao/chi-dan/i422b.png"
  },
  {
    "id": "chi-dan-i423a",
    "code": "I.423a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Vị trí người đi bộ sang ngang",
    "image": "/img/gplx-bien-bao/chi-dan/i423a.png"
  },
  {
    "id": "chi-dan-i423b",
    "code": "I.423b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Vị trí người đi bộ sang ngang",
    "image": "/img/gplx-bien-bao/chi-dan/i423b.png"
  },
  {
    "id": "chi-dan-i423c",
    "code": "I.423c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Điểm bắt đầu đường đi bộ",
    "image": "/img/gplx-bien-bao/chi-dan/i423c.png"
  },
  {
    "id": "chi-dan-i424a",
    "code": "I.424a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Cầu vượt qua đường cho người đi bộ",
    "image": "/img/gplx-bien-bao/chi-dan/i424a.png"
  },
  {
    "id": "chi-dan-i424b",
    "code": "I.424b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Cầu vượt qua đường cho người đi bộ",
    "image": "/img/gplx-bien-bao/chi-dan/i424b.png"
  },
  {
    "id": "chi-dan-i424c",
    "code": "I.424c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Hầm chui qua đường cho người đi bộ",
    "image": "/img/gplx-bien-bao/chi-dan/i424c.png"
  },
  {
    "id": "chi-dan-i424d",
    "code": "I.424d",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Hầm chui qua đường cho người đi bộ",
    "image": "/img/gplx-bien-bao/chi-dan/i424d.png"
  },
  {
    "id": "chi-dan-i425",
    "code": "I.425",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Bệnh viện",
    "image": "/img/gplx-bien-bao/chi-dan/i425.png"
  },
  {
    "id": "chi-dan-i426",
    "code": "I.426",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Trạm cấp cứu",
    "image": "/img/gplx-bien-bao/chi-dan/i426.png"
  },
  {
    "id": "chi-dan-i427a",
    "code": "I.427a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Trạm sửa chữa",
    "image": "/img/gplx-bien-bao/chi-dan/i427a.jpg"
  },
  {
    "id": "chi-dan-i427b",
    "code": "I.427b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Trạm kiểm tra tải trọng xe",
    "image": "/img/gplx-bien-bao/chi-dan/i427b.jpg"
  },
  {
    "id": "chi-dan-i428",
    "code": "I.428",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Cửa hàng xăng dầu",
    "image": "/img/gplx-bien-bao/chi-dan/i428.jpg"
  },
  {
    "id": "chi-dan-i429",
    "code": "I.429",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Nơi rửa xe",
    "image": "/img/gplx-bien-bao/chi-dan/i429.png"
  },
  {
    "id": "chi-dan-i430",
    "code": "I.430",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Điện thoại",
    "image": "/img/gplx-bien-bao/chi-dan/i430.png"
  },
  {
    "id": "chi-dan-i431",
    "code": "I.431",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Trạm dừng nghỉ",
    "image": "/img/gplx-bien-bao/chi-dan/i431.png"
  },
  {
    "id": "chi-dan-i432",
    "code": "I.432",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Khách sạn",
    "image": "/img/gplx-bien-bao/chi-dan/i432.png"
  },
  {
    "id": "chi-dan-i433a",
    "code": "I.433a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Nơi nghỉ mát",
    "image": "/img/gplx-bien-bao/chi-dan/i433a.png"
  },
  {
    "id": "chi-dan-i433b",
    "code": "I.433b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Báo hiệu nơi cắm trại",
    "image": "/img/gplx-bien-bao/chi-dan/i433b.png"
  },
  {
    "id": "chi-dan-i433c",
    "code": "I.433c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Báo hiệu nhà nghỉ lưu động",
    "image": "/img/gplx-bien-bao/chi-dan/i433c.png"
  },
  {
    "id": "chi-dan-i433d",
    "code": "I.433d",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Báo hiệu nơi cắm trại, nhà nghỉ lưu động",
    "image": "/img/gplx-bien-bao/chi-dan/i433d.png"
  },
  {
    "id": "chi-dan-i433e",
    "code": "I.433e",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Báo hiệu nhà trọ",
    "image": "/img/gplx-bien-bao/chi-dan/i433e.jpg"
  },
  {
    "id": "chi-dan-i434a",
    "code": "I.434a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Bến xe buýt",
    "image": "/img/gplx-bien-bao/chi-dan/i434a.jpg"
  },
  {
    "id": "chi-dan-i434b",
    "code": "I.434b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Bến xe tải",
    "image": "/img/gplx-bien-bao/chi-dan/i434b.png"
  },
  {
    "id": "chi-dan-i435",
    "code": "I.435",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Bến xe điện",
    "image": "/img/gplx-bien-bao/chi-dan/i435.jpg"
  },
  {
    "id": "chi-dan-i436",
    "code": "I.436",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Trạm cảnh sát giao thông",
    "image": "/img/gplx-bien-bao/chi-dan/i436.png"
  },
  {
    "id": "chi-dan-i439",
    "code": "I.439",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Tên cầu",
    "image": "/img/gplx-bien-bao/chi-dan/i439.png"
  },
  {
    "id": "chi-dan-i440",
    "code": "I.440",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Đoạn đường thi công",
    "image": "/img/gplx-bien-bao/chi-dan/i440.jpg"
  },
  {
    "id": "chi-dan-i441a",
    "code": "I.441a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Báo hiệu phía trước có công trường thi công",
    "image": "/img/gplx-bien-bao/chi-dan/i441a.png"
  },
  {
    "id": "chi-dan-i441b",
    "code": "I.441b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Báo hiệu phía trước có công trường thi công",
    "image": "/img/gplx-bien-bao/chi-dan/i441b.png"
  },
  {
    "id": "chi-dan-i441c",
    "code": "I.441c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Báo hiệu phía trước có công trường thi công",
    "image": "/img/gplx-bien-bao/chi-dan/i441c.png"
  },
  {
    "id": "chi-dan-i442",
    "code": "I.442",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Chợ",
    "image": "/img/gplx-bien-bao/chi-dan/i442.png"
  },
  {
    "id": "chi-dan-i443",
    "code": "I.443",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Xe kéo rơ-moóc",
    "image": "/img/gplx-bien-bao/chi-dan/i443.png"
  },
  {
    "id": "chi-dan-i444a",
    "code": "I.444a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444a.png"
  },
  {
    "id": "chi-dan-i444b",
    "code": "I.444b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444b.png"
  },
  {
    "id": "chi-dan-i444c",
    "code": "I.444c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444c.png"
  },
  {
    "id": "chi-dan-i444d",
    "code": "I.444d",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444d.jpg"
  },
  {
    "id": "chi-dan-i444e",
    "code": "I.444e",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444e.jpg"
  },
  {
    "id": "chi-dan-i444f",
    "code": "I.444f",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444f.jpg"
  },
  {
    "id": "chi-dan-i444g",
    "code": "I.444g",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444g.jpg"
  },
  {
    "id": "chi-dan-i444h",
    "code": "I.444h",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444h.jpg"
  },
  {
    "id": "chi-dan-i444i",
    "code": "I.444i",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444i.jpg"
  },
  {
    "id": "chi-dan-i444j",
    "code": "I.444j",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444j.jpg"
  },
  {
    "id": "chi-dan-i444k",
    "code": "I.444k",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444k.png"
  },
  {
    "id": "chi-dan-i444l",
    "code": "I.444l",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444l.jpg"
  },
  {
    "id": "chi-dan-i444m",
    "code": "I.444m",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo chỉ dẫn địa điểm",
    "image": "/img/gplx-bien-bao/chi-dan/i444m.jpg"
  },
  {
    "id": "chi-dan-i445a",
    "code": "I.445a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445a.jpg"
  },
  {
    "id": "chi-dan-i445b",
    "code": "I.445b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445b.jpg"
  },
  {
    "id": "chi-dan-i445c",
    "code": "I.445c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445c.jpg"
  },
  {
    "id": "chi-dan-i445d",
    "code": "I.445d",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445d.jpg"
  },
  {
    "id": "chi-dan-i445e",
    "code": "I.445e",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445e.png"
  },
  {
    "id": "chi-dan-i445f",
    "code": "I.445f",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445f.jpg"
  },
  {
    "id": "chi-dan-i445g",
    "code": "I.445g",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445g.png"
  },
  {
    "id": "chi-dan-i445h",
    "code": "I.445h",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển báo kiểu mô tả tình trạng đường",
    "image": "/img/gplx-bien-bao/chi-dan/i445h.jpg"
  },
  {
    "id": "chi-dan-i446",
    "code": "I.446",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Nơi đỗ xe dành cho người khuyết tật",
    "image": "/img/gplx-bien-bao/chi-dan/i446.png"
  },
  {
    "id": "chi-dan-i447a",
    "code": "I.447a",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "cầu vượt liên thông",
    "image": "/img/gplx-bien-bao/chi-dan/i447a.png"
  },
  {
    "id": "chi-dan-i447b",
    "code": "I.447b",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "cầu vượt liên thông",
    "image": "/img/gplx-bien-bao/chi-dan/i447b.png"
  },
  {
    "id": "chi-dan-i447c",
    "code": "I.447c",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "cầu vượt liên thông",
    "image": "/img/gplx-bien-bao/chi-dan/i447c.png"
  },
  {
    "id": "chi-dan-i447d",
    "code": "I.447d",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "cầu vượt liên thông",
    "image": "/img/gplx-bien-bao/chi-dan/i447d.png"
  },
  {
    "id": "chi-dan-i448",
    "code": "I.448",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Làn đường cứu nạn hay làn thoát xe khẩn cấp",
    "image": "/img/gplx-bien-bao/chi-dan/i448.jpg"
  },
  {
    "id": "chi-dan-i449",
    "code": "I.449",
    "group": "chi-dan",
    "groupLabel": "Biển chỉ dẫn",
    "name": "Biển tên đường",
    "image": "/img/gplx-bien-bao/chi-dan/i449.jpg"
  },
  {
    "id": "phu-s501",
    "code": "S.501",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Phạm vi tác dụng của biển",
    "image": "/img/gplx-bien-bao/phu/s501.jpeg"
  },
  {
    "id": "phu-s502",
    "code": "S.502",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Khoảng cách đến đối tượng báo hiệu",
    "image": "/img/gplx-bien-bao/phu/s502.jpeg"
  },
  {
    "id": "phu-s503as503f",
    "code": "S.503a–S.503f",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Hướng tác dụng của biển",
    "image": "/img/gplx-bien-bao/phu/s503as503f.jpeg"
  },
  {
    "id": "phu-sh3ash3c",
    "code": "S.H,3a–S.H,3c",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Hướng tác dụng theo hiệp định GMS",
    "image": "/img/gplx-bien-bao/phu/sh3ash3c.jpeg"
  },
  {
    "id": "phu-s504",
    "code": "S.504",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Làn đường",
    "image": "/img/gplx-bien-bao/phu/s504.jpeg"
  },
  {
    "id": "phu-s505a",
    "code": "S.505a",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Loại xe",
    "image": "/img/gplx-bien-bao/phu/s505a.jpeg"
  },
  {
    "id": "phu-s505b",
    "code": "S.505b",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Loại xe hạn chế qua cầu",
    "image": "/img/gplx-bien-bao/phu/s505b.jpeg"
  },
  {
    "id": "phu-s505c",
    "code": "S.505c",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Tải trọng trục hạn chế qua cầu",
    "image": "/img/gplx-bien-bao/phu/s505c.jpeg"
  },
  {
    "id": "phu-s506as506b",
    "code": "S.506a–S.506b",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Hướng đường ưu tiên",
    "image": "/img/gplx-bien-bao/phu/s506as506b.jpeg"
  },
  {
    "id": "phu-s507",
    "code": "S.507",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Hướng rẽ",
    "image": "/img/gplx-bien-bao/phu/s507.jpeg"
  },
  {
    "id": "phu-s508as508b",
    "code": "S.508a–S.508b",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Biển báo giờ cấm",
    "image": "/img/gplx-bien-bao/phu/s508as508b.jpeg"
  },
  {
    "id": "phu-s509as509b",
    "code": "S.509a–S.509b",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Thuyết minh biển chính",
    "image": "/img/gplx-bien-bao/phu/s509as509b.jpeg"
  },
  {
    "id": "phu-s510a",
    "code": "S.510a",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Chú ý đường trơn có băng tuyết",
    "image": "/img/gplx-bien-bao/phu/s510a.jpeg"
  },
  {
    "id": "phu-sg7sg8",
    "code": "S.G,7–S.G,8",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Địa điểm cắm trại, nhà trọ",
    "image": "/img/gplx-bien-bao/phu/sg7sg8.jpeg"
  },
  {
    "id": "phu-sg9b",
    "code": "S.G,9b",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Điểm đỗ xe sử dụng phương tiện công cộng",
    "image": "/img/gplx-bien-bao/phu/sg9b.jpeg"
  },
  {
    "id": "phu-sg11asg11c",
    "code": "S.G,11a–S.G,11c",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Số lượng làn và hướng đi cho từng làn",
    "image": "/img/gplx-bien-bao/phu/sg11asg11c.jpeg"
  },
  {
    "id": "phu-sg12asg12b",
    "code": "S.G,12a–S.G,12b",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Làn đường không lưu thông",
    "image": "/img/gplx-bien-bao/phu/sg12asg12b.jpeg"
  },
  {
    "id": "phu-sh6",
    "code": "S.H,6",
    "group": "phu",
    "groupLabel": "Biển phụ",
    "name": "Ngoại lệ",
    "image": "/img/gplx-bien-bao/phu/sh6.jpeg"
  }
];
