// ============================================================
// Ngân hàng 12 bài Thực hành Bào chế — bám giáo trình DUOC 04 (CĐ Y tế Hà Nội, 2022).
// Schema v2: form/method/formula/components/quality/steps(+purpose/standard).
// Seed vào collection 'baoche-lessons' (server/scripts/seed-content.mjs).
// KHÔNG hardcode ở FE — đọc qua /api/content/baoche-lessons. Sửa nóng qua admin.
// ============================================================
export const BAOCHE_LESSONS = [
  {
    "id": "nhu-tuong-dau-parafin",
    "lesson": 1,
    "lessonTitle": "Bào chế nhũ tương thuốc",
    "name": "Nhũ tương dầu parafin",
    "short": "Nhũ tương nhuận tràng D/N",
    "icon": "🧴",
    "form": "nhu-tuong",
    "method": "keo-uot",
    "methodName": "Phương pháp keo ướt.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Nhũ tương có màu trắng đục như sữa."
    ],
    "formula": [
      {
        "name": "Dầu parafin",
        "amount": "35,00",
        "unit": "g"
      },
      {
        "name": "Tween 80",
        "amount": "4,32",
        "unit": "g"
      },
      {
        "name": "Span 80",
        "amount": "1,68",
        "unit": "g"
      },
      {
        "name": "Nước tinh khiết vđ",
        "amount": "100,00",
        "unit": "ml"
      }
    ],
    "equipment": [
      "Nồi đun cách thủy",
      "Máy đồng nhất hóa"
    ],
    "components": [
      {
        "name": "Dầu parafin",
        "characteristic": "Chất lỏng sánh, không màu, không tan trong nước, tỷ trọng nhỏ hơn nước",
        "role": "Pha dầu (tướng nội) đồng thời là dược chất nhuận tràng cơ học"
      },
      {
        "name": "Tween 80",
        "characteristic": "Chất diện hoạt không ion hóa thân nước, HLB ~15",
        "role": "Chất nhũ hóa chính, tạo nhũ tương kiểu Dầu/Nước"
      },
      {
        "name": "Span 80",
        "characteristic": "Chất diện hoạt không ion hóa thân dầu, HLB ~4,3",
        "role": "Chất đồng nhũ hóa, phối hợp với Tween 80 để đạt HLB yêu cầu, tăng độ bền nhũ tương"
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Dung môi phân cực",
        "role": "Pha nước (môi trường phân tán), dung môi vừa đủ thể tích chế phẩm"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân, đong các thành phần trong công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Cân, đong chính xác, đúng kỹ thuật. Cân dầu parafin trong cốc có mỏ, cân span 80 và tween 80 trên kính đồng hồ, đong 29ml nước bằng ống đong.",
        "params": {}
      },
      {
        "n": 3,
        "action": "dissolve",
        "label": "Hòa tan Span 80 vào cốc dầu parafin (cốc 1).",
        "purpose": "Tạo pha dầu.",
        "standard": "Dung dịch trong suốt, màu vàng, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 4,
        "action": "heat",
        "label": "Đun nóng pha dầu trong nồi đun cách thủy.",
        "purpose": "Làm nóng pha dầu.",
        "standard": "Nhiệt độ khoảng 60 - 70°C.",
        "params": {
          "tempMin": 60,
          "tempMax": 70
        }
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Đổ nước vào cốc có mỏ, cho tween 80 vào hòa tan (cốc 2).",
        "purpose": "Tạo pha nước.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 6,
        "action": "heat",
        "label": "Đun nóng pha nước trong nồi đun cách thủy.",
        "purpose": "Làm nóng pha nước.",
        "standard": "Nhiệt độ khoảng 60 - 70°C.",
        "params": {
          "tempMin": 60,
          "tempMax": 70
        }
      },
      {
        "n": 7,
        "action": "emulsify",
        "label": "Rót cốc 2 vào cốc 1 khuấy đều, dùng lực phân tán để tạo thành nhũ tương.",
        "purpose": "Tạo nhũ tương.",
        "standard": "Nhũ tương đồng nhất màu trắng đục.",
        "params": {}
      },
      {
        "n": 8,
        "action": "adjust-volume",
        "label": "Rót sang ống đong, thêm nước vừa đủ 50 ml, khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Điều chỉnh đúng 50ml trong ống đong. Nhũ tương có màu trắng đục như sữa.",
        "params": {}
      },
      {
        "n": 9,
        "action": "fill-bottle",
        "label": "Đóng vào lọ rộng miệng hoặc tuýp, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định, có thêm dòng chữ “Lắc đều trước khi dùng”.",
        "params": {}
      },
      {
        "n": 10,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Nhũ tương uống nhuận tràng, làm mềm phân."
  },
  {
    "id": "nhu-tuong-giam-dau",
    "lesson": 1,
    "lessonTitle": "Bào chế nhũ tương thuốc",
    "name": "Nhũ tương giảm đau",
    "short": "Nhũ tương xoa giảm đau",
    "icon": "💆",
    "form": "nhu-tuong",
    "method": "keo-uot",
    "methodName": "Phương pháp keo ướt.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Nhũ tương lỏng sánh, đục trắng như sữa, có mùi đặc trưng."
    ],
    "formula": [
      {
        "name": "Methyl salicylat",
        "amount": "15,0",
        "unit": "g"
      },
      {
        "name": "Menthol",
        "amount": "2,0",
        "unit": "g"
      },
      {
        "name": "Camphor",
        "amount": "5,0",
        "unit": "g"
      },
      {
        "name": "Cloral hydrat",
        "amount": "4,0",
        "unit": "g"
      },
      {
        "name": "Propylen glycol",
        "amount": "10,0",
        "unit": "ml"
      },
      {
        "name": "Tween 80",
        "amount": "3,8",
        "unit": "g"
      },
      {
        "name": "Acid stearic",
        "amount": "1,0",
        "unit": "g"
      },
      {
        "name": "Triethanolamin",
        "amount": "1,0",
        "unit": "g"
      },
      {
        "name": "Dầu vừng",
        "amount": "15,0",
        "unit": "ml"
      },
      {
        "name": "Nước tinh khiết vđ",
        "amount": "100,0",
        "unit": "ml"
      }
    ],
    "equipment": [
      "Nồi đun cách thủy",
      "Cối chày",
      "Máy đồng nhất hóa"
    ],
    "components": [
      {
        "name": "Methyl salicylat",
        "characteristic": "Chất lỏng sánh, mùi đặc trưng, ít tan trong nước, tan trong dầu",
        "role": "Dược chất giảm đau, chống viêm dùng ngoài; thuộc pha dầu"
      },
      {
        "name": "Menthol",
        "characteristic": "Tinh thể trắng, dễ thăng hoa, tạo cảm giác mát",
        "role": "Dược chất giảm đau, gây tê tại chỗ, tạo cảm giác mát"
      },
      {
        "name": "Camphor",
        "characteristic": "Tinh thể trắng, mùi thơm, dễ thăng hoa",
        "role": "Dược chất giảm đau, kích thích tuần hoàn tại chỗ"
      },
      {
        "name": "Cloral hydrat",
        "characteristic": "Tinh thể; khi nghiền chung với menthol, camphor tạo hỗn hợp eutecti chảy lỏng",
        "role": "Tạo hỗn hợp eutecti giúp hóa lỏng/hòa tan dược chất, đồng thời có tác dụng giảm đau"
      },
      {
        "name": "Propylen glycol",
        "characteristic": "Chất lỏng sánh, đồng tan với nước",
        "role": "Đồng dung môi thân nước, thuộc pha nước"
      },
      {
        "name": "Tween 80",
        "characteristic": "Chất diện hoạt thân nước, HLB ~15",
        "role": "Chất nhũ hóa tạo nhũ tương kiểu Dầu/Nước"
      },
      {
        "name": "Acid stearic",
        "characteristic": "Acid béo rắn, tan trong dầu; phản ứng với triethanolamin tạo xà phòng",
        "role": "Cùng triethanolamin tạo triethanolamin stearat làm chất nhũ hóa"
      },
      {
        "name": "Triethanolamin",
        "characteristic": "Chất lỏng sánh, tính kiềm yếu",
        "role": "Phản ứng với acid stearic tạo xà phòng (triethanolamin stearat) làm chất nhũ hóa D/N"
      },
      {
        "name": "Dầu vừng",
        "characteristic": "Dầu thực vật, không tan trong nước",
        "role": "Pha dầu, dung môi hòa tan dược chất thân dầu"
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Dung môi phân cực",
        "role": "Pha nước (môi trường phân tán), dung môi vừa đủ thể tích"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "- Các thành phần được cân chính xác, đúng kỹ thuật. - Methyl salicylat cân trên cốc có mỏ. - Triethanolamin, tween 80, cloral hydrat cân trên kính đồng hồ.",
        "params": {}
      },
      {
        "n": 3,
        "action": "melt",
        "label": "Cho acid stearic và dầu vừng vào cốc có nắp đậy kín đun chảy cách thủy (cốc 1).",
        "purpose": "Tạo dung môi pha dầu.",
        "standard": "- Nhiệt độ khoảng 65-70°C. - Dung dịch trong suốt, màu vàng, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "tempMin": 65,
          "tempMax": 70
        }
      },
      {
        "n": 4,
        "action": "grind",
        "label": "Cho menthol, camphor, cloral hydrat vào cối nghiền chảy lỏng, thêm methyl salicylat vào hòa tan.",
        "purpose": "Tạo dung dịch dược chất.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 5,
        "action": "mix",
        "label": "Cho cốc 1 vào cối, trộn đều đến tan hoàn toàn.",
        "purpose": "Tạo pha dầu.",
        "standard": "Dung dịch trong suốt, màu vàng, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 6,
        "action": "dissolve",
        "label": "Hòa tan propylen glycol, tween 80, triethanolamin vào khoảng 30ml nước trong cốc có mỏ, đun cách thủy.",
        "purpose": "Tạo pha nước.",
        "standard": "- Nhiệt độ khoảng 65-70°C -Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "tempMin": 65,
          "tempMax": 70
        }
      },
      {
        "n": 7,
        "action": "emulsify",
        "label": "Phối hợp 2 pha trong cối, dùng lực gây phân tán để tạo thành nhũ tương.",
        "purpose": "Tạo nhũ tương thuốc.",
        "standard": "Nhũ tương đồng nhất màu trắng đục.",
        "params": {}
      },
      {
        "n": 8,
        "action": "adjust-volume",
        "label": "Rót sang ống đong, thêm nước tinh khiết vừa đủ. Khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Điều chỉnh đúng 100ml trong ống đong. Nhũ tương lỏng sánh, đục trắng như sữa, có mùi đặc trưng.",
        "params": {}
      },
      {
        "n": 9,
        "action": "fill-bottle",
        "label": "Đóng lọ, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định, nhãn có thêm dòng chữ “Lắc đều trước khi dùng”.",
        "params": {}
      },
      {
        "n": 10,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Nhũ tương dùng ngoài xoa bóp giảm đau cơ, khớp."
  },
  {
    "id": "hon-dich-antacid",
    "lesson": 2,
    "lessonTitle": "Bào chế hỗn dịch thuốc",
    "name": "Hỗn dịch antacid",
    "short": "Hỗn dịch kháng acid dạ dày",
    "icon": "🧪",
    "form": "hon-dich",
    "method": "phan-tan",
    "methodName": "Phương pháp phân tán.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Hỗn dịch sánh, đục trắng, đồng nhất."
    ],
    "formula": [
      {
        "name": "Nhôm hydroxyd gel khô",
        "amount": "4,00",
        "unit": "g"
      },
      {
        "name": "Magnesi hydroxyd gel khô",
        "amount": "4,00",
        "unit": "g"
      },
      {
        "name": "Gôm xanthan",
        "amount": "0,25",
        "unit": "g"
      },
      {
        "name": "Natri saccarin",
        "amount": "0,05",
        "unit": "g"
      },
      {
        "name": "Natri benzoat",
        "amount": "0,50",
        "unit": "g"
      },
      {
        "name": "Dung dịch sorbitol 70%",
        "amount": "70,00",
        "unit": "g"
      },
      {
        "name": "Vanilin",
        "amount": "vđ",
        "unit": ""
      },
      {
        "name": "Nước tinh khiết vđ",
        "amount": "100,00",
        "unit": "ml"
      }
    ],
    "equipment": [
      "Cối chày",
      "Nồi đun cách thủy"
    ],
    "components": [
      {
        "name": "Nhôm hydroxyd gel khô",
        "characteristic": "Bột trắng, không tan trong nước, trung hòa acid chậm và kéo dài",
        "role": "Dược chất kháng acid (antacid)"
      },
      {
        "name": "Magnesi hydroxyd gel khô",
        "characteristic": "Bột trắng, không tan trong nước, trung hòa acid nhanh",
        "role": "Dược chất kháng acid (antacid), phối hợp bù trừ tác dụng phụ với nhôm hydroxyd"
      },
      {
        "name": "Gôm xanthan",
        "characteristic": "Polymer thân nước, trương nở trong nước tạo gel nhớt",
        "role": "Chất gây treo, ổn định và làm chậm sự lắng của hỗn dịch"
      },
      {
        "name": "Natri saccarin",
        "characteristic": "Bột trắng, vị ngọt mạnh",
        "role": "Chất điều vị (tạo ngọt)"
      },
      {
        "name": "Natri benzoat",
        "characteristic": "Bột trắng, tan trong nước, có hoạt tính ở môi trường acid–trung tính",
        "role": "Chất bảo quản chống nấm mốc, vi khuẩn"
      },
      {
        "name": "Dung dịch sorbitol 70%",
        "characteristic": "Chất lỏng sánh, vị ngọt, giữ ẩm",
        "role": "Chất điều vị, giữ ẩm và tăng độ nhớt/độ sánh"
      },
      {
        "name": "Vanilin",
        "characteristic": "Bột kết tinh, mùi thơm vani",
        "role": "Chất tạo mùi thơm (điều hương)"
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Dung môi phân cực",
        "role": "Môi trường phân tán, dung môi vừa đủ thể tích"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "- Các thành phần được cân chính xác, đúng kỹ thuật. - Dung dịch sorbitol cân trên cốc có mỏ.",
        "params": {}
      },
      {
        "n": 3,
        "action": "dissolve",
        "label": "Ngâm gôm xanthan với khoảng 5ml nước trong cốc có mỏ.",
        "purpose": "Trương nở chất nhũ hóa.",
        "standard": "Gôm xanthan trương nở hoàn toàn.",
        "params": {}
      },
      {
        "n": 4,
        "action": "grind",
        "label": "Nghiền mịn riêng nhôm hydroxyd, magnesi hydroxyd, trộn 2 dược chất với nhau.",
        "purpose": "Tạo hỗn hợp bột kép.",
        "standard": "Bột kép đồng nhất.",
        "params": {}
      },
      {
        "n": 5,
        "action": "grind",
        "label": "Cho gôm xanthan đã ngâm trương nở vào cối, nghiền trộn đều.",
        "purpose": "Tạo bột nhão đặc.",
        "standard": "Bột nhão đồng nhất.",
        "params": {}
      },
      {
        "n": 6,
        "action": "mix",
        "label": "Thêm dần dung dịch sorbitol 70% vào hỗn hợp trên, nghiền trộn đều.",
        "purpose": "Pha loãng bột nhão đặc.",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 7,
        "action": "dissolve",
        "label": "Hòa tan natri benzoat bằng 5ml nước nóng trong cốc có mỏ, thêm natri saccarin vào hòa tan.",
        "purpose": "Hòa tan chất điều vị và chất bảo quản.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 8,
        "action": "disperse",
        "label": "Phối hợp dung dịch trên vào hỗn dịch trong cối chày, thêm vanilin, khuấy đều.",
        "purpose": "Phân tán các thành phần còn lại.",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 9,
        "action": "adjust-volume",
        "label": "Chuyển sang ống đong, thêm nước tinh khiết vừa đủ 100ml, khuấy đều.",
        "purpose": "Đạt yêu cầu thể tích.",
        "standard": "Điều chỉnh đúng 100ml trong ống đong. Hỗn dịch sánh, đục trắng, đồng nhất.",
        "params": {}
      },
      {
        "n": 10,
        "action": "fill-bottle",
        "label": "Đóng lọ, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định, nhãn có thêm dòng chữ “Lắc đều trước khi dùng”.",
        "params": {}
      },
      {
        "n": 11,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Hỗn dịch uống kháng acid, điều trị viêm loét dạ dày - tá tràng, ợ nóng."
  },
  {
    "id": "hon-dich-ho-nuoc",
    "lesson": 2,
    "lessonTitle": "Bào chế hỗn dịch thuốc",
    "name": "Hỗn dịch hồ nước",
    "short": "Hồ nước bôi ngoài da",
    "icon": "🩹",
    "form": "hon-dich",
    "method": "phan-tan",
    "methodName": "Phương pháp phân tán.",
    "finalVolume": 100,
    "finalUnit": "g",
    "quality": [
      "Hỗn hợp bột nhão mịn đồng nhất, màu trắng đục."
    ],
    "formula": [
      {
        "name": "Kẽm ocid",
        "amount": "25",
        "unit": "g"
      },
      {
        "name": "Calci carbonat",
        "amount": "25",
        "unit": "g"
      },
      {
        "name": "Glycerin",
        "amount": "25",
        "unit": "g"
      },
      {
        "name": "Nước tinh khiết",
        "amount": "25",
        "unit": "g"
      }
    ],
    "equipment": [
      "Cối chày",
      "Rây 350"
    ],
    "components": [
      {
        "name": "Kẽm ocid",
        "characteristic": "Bột trắng mịn, không tan trong nước",
        "role": "Dược chất làm se, bảo vệ da, sát khuẩn nhẹ (pha rắn phân tán)"
      },
      {
        "name": "Calci carbonat",
        "characteristic": "Bột trắng, không tan trong nước",
        "role": "Dược chất/tá dược hút, làm dịu và che phủ da (pha rắn phân tán)"
      },
      {
        "name": "Glycerin",
        "characteristic": "Chất lỏng sánh, hút ẩm, đồng tan với nước",
        "role": "Chất gây thấm làm dịu da, giữ ẩm, thuộc môi trường phân tán"
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Dung môi phân cực",
        "role": "Môi trường phân tán"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "sieve",
        "label": "Nghiền mịn riêng calci carbonat, kẽm ocid, rây qua rây 350.",
        "purpose": "Tạo bột có độ mịn đạt yêu cầu.",
        "standard": "Bột thu được qua rây 350.",
        "params": {
          "mesh": 350
        }
      },
      {
        "n": 3,
        "action": "weigh",
        "label": "Cân kẽm ocid, calci carbonat và glycerin (trong cốc có mỏ), đong nước tinh khiết.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân, đong chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 4,
        "action": "mix",
        "label": "Trộn calci carbonat và kẽm ocid trong cối.",
        "purpose": "Tạo hỗn hợp bột kép.",
        "standard": "Hỗn hợp bột kép đồng nhất.",
        "params": {}
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Hòa tan glycerin và nước tinh khiết trong cốc mỏ.",
        "purpose": "Hòa tan dung môi.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 6,
        "action": "disperse",
        "label": "Cho hỗn hợp glycerin và nước vào cối, nghiền trộn đều.",
        "purpose": "Tạo hỗn dịch.",
        "standard": "Hỗn hợp bột nhão mịn đồng nhất, màu trắng đục.",
        "params": {}
      },
      {
        "n": 7,
        "action": "fill-bottle",
        "label": "Đóng lọ rộng miệng hoặc tuýp kim loại, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định, nhãn có ghi thêm dòng chữ “Lắc đều trước khi dùng”.",
        "params": {}
      },
      {
        "n": 8,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Hồ nước bôi ngoài da làm dịu, làm se, chống viêm trong viêm da, hăm, rôm sảy."
  },
  {
    "id": "thuoc-tiem-lidocain",
    "lesson": 3,
    "lessonTitle": "Bào chế thuốc tiêm",
    "name": "Thuốc tiêm lidocain hydroclorid",
    "short": "Thuốc tiêm gây tê",
    "icon": "💉",
    "form": "thuoc-tiem",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan hoàn toàn.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Ống thuốc được hàn kín.",
      "Dung dịch thuốc tiêm trong suốt, không màu."
    ],
    "formula": [
      {
        "name": "Lidocain hydroclorid",
        "amount": "2,000",
        "unit": "g"
      },
      {
        "name": "Dinatri hydrophosphat khan",
        "amount": "0,087",
        "unit": "g"
      },
      {
        "name": "Natri dihydrophosphat khan",
        "amount": "0,019",
        "unit": "g"
      },
      {
        "name": "Natri clorid",
        "amount": "0,400",
        "unit": "g"
      },
      {
        "name": "Nước pha tiêm vđ",
        "amount": "100,000",
        "unit": "ml"
      }
    ],
    "equipment": [
      "Máy đo pH",
      "Máy lọc hút chân không",
      "Màng lọc",
      "Nồi hấp tiệt trùng",
      "Máy đóng thuốc tiêm"
    ],
    "components": [
      {
        "name": "Lidocain hydroclorid",
        "characteristic": "Bột kết tinh trắng, tan tốt trong nước",
        "role": "Dược chất chính - thuốc tê tại chỗ nhóm amid"
      },
      {
        "name": "Dinatri hydrophosphat khan",
        "characteristic": "Muối phosphat kiềm",
        "role": "Thành phần hệ đệm phosphat, ổn định pH dung dịch tiêm"
      },
      {
        "name": "Natri dihydrophosphat khan",
        "characteristic": "Muối phosphat acid",
        "role": "Thành phần hệ đệm phosphat, ổn định pH dung dịch tiêm"
      },
      {
        "name": "Natri clorid",
        "characteristic": "Bột kết tinh trắng, tan trong nước",
        "role": "Chất đẳng trương hóa dung dịch tiêm"
      },
      {
        "name": "Nước pha tiêm",
        "characteristic": "Nước tinh khiết vô khuẩn, không chí nhiệt tố",
        "role": "Dung môi pha tiêm, vừa đủ thể tích"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 3,
        "action": "dissolve",
        "label": "Hòa tan dinatri hydrophosphat, natri dihydrophosphat và natri clorid vào khoảng 30ml nước pha tiêm trong cốc chân.",
        "purpose": "Hòa tan các chất phụ.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 4,
        "action": "dissolve",
        "label": "Hòa tan lidocain hydroclorid vào dung dịch trên.",
        "purpose": "Hòa tan dược chất.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 5,
        "action": "adjust-ph",
        "label": "Đo pH và điều chỉnh pH bằng dung dịch: NaOH 1M hoặc HCl 1M.",
        "purpose": "Tạo pH phù hợp.",
        "standard": "pH dung dịch có giá trị từ 5,0 -7,0.",
        "params": {}
      },
      {
        "n": 6,
        "action": "adjust-volume",
        "label": "Chuyển sang ống đong, thêm nước vừa đủ, khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Điều chỉnh đúng 100ml trong ống đong.",
        "params": {}
      },
      {
        "n": 7,
        "action": "filter",
        "label": "Lọc dung dịch qua màng lọc kích thước 0,2 mcm.",
        "purpose": "Làm trong dung dịch thuốc tiêm.",
        "standard": "Dung dịch trong suốt, không màu.",
        "params": {
          "pore": "0,2mcm"
        }
      },
      {
        "n": 8,
        "action": "seal-ampoule",
        "label": "Đóng, hàn ống thủy tinh 2ml.",
        "purpose": "Đóng ống.",
        "standard": "Ống được hàn kín.",
        "params": {}
      },
      {
        "n": 9,
        "action": "autoclave",
        "label": "Hấp tiệt khuẩn ở 121°C trong 15 phút.",
        "purpose": "Tiệt khuẩn thuốc.",
        "standard": "Ống thuốc được tiệt khuẩn.",
        "params": {
          "temp": 121,
          "time": 15
        }
      },
      {
        "n": 10,
        "action": "inspect",
        "label": "Soi kiểm tra độ trong, loại bỏ các ống hở, vẩn đục.",
        "purpose": "Loại bỏ những ống thuốc không đạt tiêu chuẩn.",
        "standard": "Không có ống hở, vẩn đục.",
        "params": {}
      },
      {
        "n": 11,
        "action": "label",
        "label": "Dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 12,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Thuốc tiêm gây tê tại chỗ, chống loạn nhịp tim."
  },
  {
    "id": "thuoc-tiem-vitamin-c",
    "lesson": 3,
    "lessonTitle": "Bào chế thuốc tiêm",
    "name": "Thuốc tiêm vitamin C",
    "short": "Thuốc tiêm acid ascorbic",
    "icon": "💉",
    "form": "thuoc-tiem",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan hoàn toàn.",
    "finalVolume": 200,
    "finalUnit": "mL",
    "quality": [
      "Đóng ống thuốc trong bầu khí trơ.",
      "Dung dịch thuốc tiêm trong suốt, không màu."
    ],
    "formula": [
      {
        "name": "Acid ascorbic",
        "amount": "20,00",
        "unit": "g"
      },
      {
        "name": "Natri clorid",
        "amount": "1,10",
        "unit": "g"
      },
      {
        "name": "Propylen glycol",
        "amount": "20,00",
        "unit": "ml"
      },
      {
        "name": "Dinatri edetat",
        "amount": "0,04",
        "unit": "g"
      },
      {
        "name": "Natri metabisulfit",
        "amount": "0,02",
        "unit": "g"
      },
      {
        "name": "Natri hydroxyd",
        "amount": "4,60",
        "unit": "g"
      },
      {
        "name": "Nước pha tiêm vđ",
        "amount": "200,00",
        "unit": "ml"
      }
    ],
    "equipment": [
      "Máy đo pH",
      "Màng lọc",
      "Nồi hấp tiệt trùng",
      "Máy đóng thuốc tiêm"
    ],
    "components": [
      {
        "name": "Acid ascorbic",
        "characteristic": "Bột kết tinh trắng, tan trong nước, rất dễ bị oxy hóa",
        "role": "Dược chất chính (vitamin C)"
      },
      {
        "name": "Natri clorid",
        "characteristic": "Bột kết tinh trắng, tan trong nước",
        "role": "Chất đẳng trương hóa dung dịch tiêm"
      },
      {
        "name": "Propylen glycol",
        "characteristic": "Chất lỏng sánh, đồng tan với nước",
        "role": "Đồng dung môi, góp phần ổn định dược chất"
      },
      {
        "name": "Dinatri edetat",
        "characteristic": "Tác nhân tạo phức càng (chelat) với ion kim loại",
        "role": "Chất hiệp đồng chống oxy hóa, khóa ion kim loại xúc tác phản ứng oxy hóa"
      },
      {
        "name": "Natri metabisulfit",
        "characteristic": "Muối có tính khử mạnh",
        "role": "Chất chống oxy hóa bảo vệ acid ascorbic"
      },
      {
        "name": "Natri hydroxyd",
        "characteristic": "Base mạnh, tan trong nước tỏa nhiệt",
        "role": "Trung hòa bớt acid ascorbic (tạo natri ascorbat), điều chỉnh pH về khoảng dung nạp được"
      },
      {
        "name": "Nước pha tiêm",
        "characteristic": "Nước tinh khiết vô khuẩn, không chí nhiệt tố",
        "role": "Dung môi pha tiêm, vừa đủ thể tích"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "degas",
        "label": "Sục N₂ vào nước pha tiêm 15 phút để đuổi oxy hòa tan.",
        "purpose": "Loại bỏ oxy hòa tan trong nước pha tiêm.",
        "standard": "Nước pha tiêm đã loại bỏ khí oxy.",
        "params": {}
      },
      {
        "n": 3,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 4,
        "action": "dissolve",
        "label": "Hòa tan natri clorid, natri edetat với 25ml nước trong cốc chân.",
        "purpose": "Hòa tan chất đẳng trường và chất trợ chống oxy hóa.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Thêm acid ascorbic vào dung dịch trên, hòa tan.",
        "purpose": "Hòa tan dược chất.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 6,
        "action": "dissolve",
        "label": "Hòa tan NaOH vào khoảng 10ml nước trong cốc mỏ.",
        "purpose": "Hòa tan NaOH.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 7,
        "action": "dissolve",
        "label": "Phối hợp dung dịch trên vào dung dịch acid ascorbic, khuấy đều, cho natri metabisulfit hòa tan, thêm propylen glycol, khuấy đều.",
        "purpose": "Hòa tan các thành phần còn lại.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 8,
        "action": "adjust-ph",
        "label": "Đo pH và điều chỉnh pH bằng dung dịch: NaOH 1M hoặc HCl 1M (nếu cần).",
        "purpose": "Tạo pH phù hợp.",
        "standard": "pH dung dịch có giá trị từ 5,0 -6,5",
        "params": {}
      },
      {
        "n": 9,
        "action": "adjust-volume",
        "label": "Rót sang ống đong, thêm nước vừa đủ, khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Thể tích dung dịch đúng 100 ml trong ống đong.",
        "params": {}
      },
      {
        "n": 10,
        "action": "filter",
        "label": "Lọc qua màng lọc kích thước lỗ lọc 0,2mcm",
        "purpose": "Làm trong dung dịch thuốc.",
        "standard": "Dung dịch trong suốt, không màu.",
        "params": {
          "pore": "0,2mcm"
        }
      },
      {
        "n": 11,
        "action": "seal-ampoule",
        "label": "Đóng ống thủy tinh trung tính, thể tích 5ml, kết hợp sục khí N₂ trong quá trình đóng và hàn ống.",
        "purpose": "Đóng ống trong bầu khí trơ.",
        "standard": "Ống không có oxy hòa tan và được hàn kín.",
        "params": {}
      },
      {
        "n": 12,
        "action": "autoclave",
        "label": "Tiệt khuẩn ở 100°C trong 15 phút.",
        "purpose": "Tiệt khuẩn thuốc.",
        "standard": "Ống thuốc được tiệt khuẩn đúng quy định.",
        "params": {
          "temp": 100,
          "time": 15
        }
      },
      {
        "n": 13,
        "action": "inspect",
        "label": "Soi kiểm tra độ trong, loại bỏ các ống hở, vẩn đục.",
        "purpose": "Loại bỏ ống thuốc không đạt tiêu chuẩn.",
        "standard": "Không có ống hở, vẩn đục.",
        "params": {}
      },
      {
        "n": 14,
        "action": "label",
        "label": "Dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 15,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Thuốc tiêm bổ sung vitamin C, chống thiếu/khiếm khuyết vitamin C."
  },
  {
    "id": "nho-mat-cloramphenicol",
    "lesson": 4,
    "lessonTitle": "Bào chế thuốc nhỏ mắt",
    "name": "Thuốc nhỏ mắt cloramphenicol",
    "short": "Dung dịch nhỏ mắt kháng sinh cloramphenicol 0,4%",
    "icon": "👁️",
    "form": "nho-mat",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan hoàn toàn.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Đóng vào lọ chất dẻo 5ml. Dung dịch trong suốt, không màu."
    ],
    "formula": [
      {
        "name": "Cloramphenicol",
        "amount": "0,400",
        "unit": "g"
      },
      {
        "name": "Acid boric",
        "amount": "1,100",
        "unit": "g"
      },
      {
        "name": "Natri tetraborat",
        "amount": "0,200",
        "unit": "g"
      },
      {
        "name": "Natri clorid",
        "amount": "0,200",
        "unit": "g"
      },
      {
        "name": "Thủy ngân phenyl borat",
        "amount": "0,002",
        "unit": "g"
      },
      {
        "name": "Nước pha tiêm vừa đủ",
        "amount": "100,000",
        "unit": "mL"
      }
    ],
    "equipment": [
      "Máy lọc hút chân không",
      "Màng lọc 0,2 mcm",
      "Máy đo pH",
      "Nồi đun cách thủy",
      "Cối chày",
      "Lọ chất dẻo 5ml có bộ phận nhỏ giọt"
    ],
    "components": [
      {
        "name": "Cloramphenicol",
        "characteristic": "Bột kết tinh trắng hoặc trắng ngà, vị đắng, tan ít trong nước lạnh nhưng tan tốt hơn trong nước ấm.",
        "role": "Dược chất, kháng sinh phổ rộng điều trị nhiễm khuẩn tại mắt."
      },
      {
        "name": "Acid boric",
        "characteristic": "Bột kết tinh trắng, tan trong nước, có tính acid yếu và sát khuẩn nhẹ.",
        "role": "Thành phần hệ đệm borat (cùng natri tetraborat) điều chỉnh pH và ổn định chế phẩm."
      },
      {
        "name": "Natri tetraborat",
        "characteristic": "Tinh thể không màu (borax), tan trong nước cho môi trường kiềm nhẹ.",
        "role": "Thành phần hệ đệm borat, phối hợp acid boric duy trì pH thích hợp cho mắt."
      },
      {
        "name": "Natri clorid",
        "characteristic": "Tinh thể trắng, tan tốt trong nước.",
        "role": "Chất đẳng trương, điều chỉnh áp suất thẩm thấu của dung dịch gần với dịch nước mắt."
      },
      {
        "name": "Thủy ngân phenyl borat",
        "characteristic": "Chất rắn tan ít trong nước, hoạt tính diệt khuẩn ở nồng độ thấp.",
        "role": "Chất sát khuẩn/bảo quản chống nhiễm khuẩn cho thuốc nhỏ mắt đa liều."
      },
      {
        "name": "Nước pha tiêm",
        "characteristic": "Nước tinh khiết vô khuẩn, không có chí nhiệt tố.",
        "role": "Dung môi hòa tan các thành phần và làm môi trường phân tán."
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 3,
        "action": "heat",
        "label": "Đun sôi 100ml nước tinh khiết, để nguội đến 70⁰C.",
        "purpose": "Loại bỏ khí oxy hòa tan trong nước, tạo điều kiện để hòa tan.",
        "standard": "Nước được đun sôi, để nguội đạt 70⁰C trong cốc mỏ.",
        "params": {
          "tempMax": 70,
          "unit": "°C"
        }
      },
      {
        "n": 4,
        "action": "dissolve",
        "label": "Hòa tan acid boric với khoảng 30ml nước 70⁰C trong cốc mỏ.",
        "purpose": "Hòa tan acid boric.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Acid boric"
        }
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Cho tiếp natri borat, natri clorid vào cốc mỏ hòa tan.",
        "purpose": "Hòa tan natri borat và natri clorid.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 6,
        "action": "dissolve",
        "label": "Để nguội dung dịch đến khoảng 60⁰C, cho cloramphenicol vào hòa tan.",
        "purpose": "Hòa tan cloramphenicol.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Cloramphenicol",
          "tempMax": 60,
          "unit": "°C"
        }
      },
      {
        "n": 7,
        "action": "dissolve",
        "label": "Thêm thủy ngân phenyl borat vào hòa tan tiếp.",
        "purpose": "Hòa tan chất sát khuẩn.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Thủy ngân phenyl borat"
        }
      },
      {
        "n": 8,
        "action": "adjust-ph",
        "label": "Đo pH và điều chỉnh pH bằng dung dịch: NaOH 1M hoặc HCl 1M (nếu cần).",
        "purpose": "Tạo pH phù hợp.",
        "standard": "pH dung dịch có giá trị từ 5,0 -7,",
        "params": {
          "phMin": 5,
          "phMax": 7
        }
      },
      {
        "n": 9,
        "action": "adjust-volume",
        "label": "Chuyển sang ống đong, thêm nước vừa đủ, khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Điều chỉnh đúng 100ml trong ống đong.",
        "params": {
          "target": 100,
          "unit": "mL"
        }
      },
      {
        "n": 10,
        "action": "filter",
        "label": "Lọc dung dịch qua màng lọc 0,2 mcm.",
        "purpose": "Làm trong dung dịch.",
        "standard": "Dung dịch trong suốt, không màu.",
        "params": {
          "pore": 0.2,
          "unit": "mcm"
        }
      },
      {
        "n": 11,
        "action": "fill-bottle",
        "label": "Đóng lọ chất dẻo 5ml, có bộ phận nhỏ giọt.",
        "purpose": "Đóng lọ.",
        "standard": "Đóng vào lọ chất dẻo 5ml đúng kỹ thuật.",
        "params": {
          "volume": 5,
          "unit": "mL"
        }
      },
      {
        "n": 12,
        "action": "inspect",
        "label": "Soi kiểm tra độ trong.",
        "purpose": "Loại ống thuốc không đạt tiêu chuẩn.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 13,
        "action": "label",
        "label": "Dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 14,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Điều trị nhiễm khuẩn tại mắt (viêm kết mạc, viêm mi mắt do vi khuẩn nhạy cảm)."
  },
  {
    "id": "nho-mat-natri-diclofenac",
    "lesson": 4,
    "lessonTitle": "Bào chế thuốc nhỏ mắt",
    "name": "Thuốc nhỏ mắt natri diclofenac",
    "short": "Dung dịch nhỏ mắt kháng viêm natri diclofenac 0,1%",
    "icon": "💧",
    "form": "nho-mat",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan hoàn toàn.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Đóng lọ chất dẻo 5ml có bộ phận nhỏ giọt. Dung dịch trong suốt, không màu."
    ],
    "formula": [
      {
        "name": "Natri diclofenac",
        "amount": "0,10",
        "unit": "g"
      },
      {
        "name": "Dinatri edetat",
        "amount": "0,05",
        "unit": "g"
      },
      {
        "name": "Dinatri hydrophosphat khan",
        "amount": "0,30",
        "unit": "g"
      },
      {
        "name": "Natri clorid",
        "amount": "0,45",
        "unit": "g"
      },
      {
        "name": "Benzalkonium clorid",
        "amount": "0,005",
        "unit": "g"
      },
      {
        "name": "Nước pha tiêm vđ",
        "amount": "100,00",
        "unit": "mL"
      }
    ],
    "equipment": [
      "Máy lọc hút chân không",
      "Màng lọc 0,20 mcm",
      "Máy đo pH",
      "Nồi đun cách thủy",
      "Lọ chất dẻo 5ml có bộ phận nhỏ giọt"
    ],
    "components": [
      {
        "name": "Natri diclofenac",
        "characteristic": "Bột kết tinh trắng đến hơi vàng, tan trong nước, nhạy cảm với ánh sáng.",
        "role": "Dược chất, thuốc chống viêm không steroid (NSAID) dùng tại mắt."
      },
      {
        "name": "Dinatri edetat",
        "characteristic": "Bột trắng tan trong nước, tạo phức với ion kim loại.",
        "role": "Chất tạo phức (chelat) chống oxy hóa gián tiếp, ổn định dược chất và tăng hiệu lực bảo quản."
      },
      {
        "name": "Dinatri hydrophosphat khan",
        "characteristic": "Bột trắng tan trong nước, môi trường kiềm nhẹ.",
        "role": "Thành phần hệ đệm phosphat điều chỉnh và ổn định pH của dung dịch."
      },
      {
        "name": "Natri clorid",
        "characteristic": "Tinh thể trắng, tan tốt trong nước.",
        "role": "Chất đẳng trương, điều chỉnh áp suất thẩm thấu gần với dịch nước mắt."
      },
      {
        "name": "Benzalkonium clorid",
        "characteristic": "Chất diện hoạt cation, tan trong nước, hoạt tính diệt khuẩn mạnh.",
        "role": "Chất sát khuẩn/bảo quản cho thuốc nhỏ mắt đa liều."
      },
      {
        "name": "Nước pha tiêm",
        "characteristic": "Nước tinh khiết vô khuẩn, không có chí nhiệt tố.",
        "role": "Dung môi hòa tan các thành phần và làm môi trường phân tán."
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 3,
        "action": "heat",
        "label": "Đun sôi khoảng 100ml nước cất pha tiêm trong cốc có mỏ, để nguội đến 40⁰C.",
        "purpose": "Loại bỏ khí oxy hòa tan trong nước.",
        "standard": "Nước được đun sôi, để nguội đến 40⁰C.",
        "params": {
          "tempMax": 40,
          "unit": "°C"
        }
      },
      {
        "n": 4,
        "action": "dissolve",
        "label": "Hòa tan dinatri edetat, natri clorid, dinatri hydrophosphat vào khoảng 35ml nước cất pha tiêm trong cốc chân.",
        "purpose": "Hòa tan chất phụ.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Hòa tan natri diclofenac vào dung dịch trên.",
        "purpose": "Hòa tan dược chất.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Natri diclofenac"
        }
      },
      {
        "n": 6,
        "action": "dissolve",
        "label": "Thêm benzalkonium clorid vào dung dịch trên, hòa tan.",
        "purpose": "Hòa tan chất sát khuẩn.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Benzalkonium clorid"
        }
      },
      {
        "n": 7,
        "action": "adjust-ph",
        "label": "Đo pH và điều chỉnh pH bằng dung dịch: NaOH 1M hoặc HCl 1M (nếu cần).",
        "purpose": "Tạo pH phù hợp.",
        "standard": "pH dung dịch có giá trị từ 7,0-8,0.",
        "params": {
          "phMin": 7,
          "phMax": 8
        }
      },
      {
        "n": 8,
        "action": "adjust-volume",
        "label": "Rót sang ống đong, thêm nước vừa đủ, khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Điều chỉnh đúng 100ml trong ống đong.",
        "params": {
          "target": 100,
          "unit": "mL"
        }
      },
      {
        "n": 9,
        "action": "filter",
        "label": "Lọc dung dịch qua màng lọc kích thước lỗ lọc 0,20mcm.",
        "purpose": "Làm trong dung dịch thuốc.",
        "standard": "Dung dịch trong suốt, không màu.",
        "params": {
          "pore": 0.2,
          "unit": "mcm"
        }
      },
      {
        "n": 10,
        "action": "inspect",
        "label": "Soi dịch lọc để kiểm tra độ trong.",
        "purpose": "Loại ống thuốc không đạt tiêu chuẩn.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 11,
        "action": "fill-bottle",
        "label": "Đóng lọ chất dẻo 5ml có bộ phận nhỏ giọt.",
        "purpose": "Đóng lọ.",
        "standard": "Đúng quy định.",
        "params": {
          "volume": 5,
          "unit": "mL"
        }
      },
      {
        "n": 12,
        "action": "label",
        "label": "Dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 13,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Chống viêm, giảm đau tại mắt (ức chế viêm sau phẫu thuật, viêm kết mạc)."
  },
  {
    "id": "thuoc-mo-kem-cloramphenicol",
    "lesson": 5,
    "lessonTitle": "Bào chế thuốc mỡ",
    "name": "Kem cloramphenicol 1%",
    "short": "Kem bôi da kháng sinh cloramphenicol cấu trúc nhũ tương",
    "icon": "🧴",
    "form": "thuoc-mo",
    "method": "nhu-hoa-truc-tiep",
    "methodName": "Phương pháp nhũ hóa trực tiếp.",
    "finalVolume": 100,
    "finalUnit": "g",
    "quality": [
      "Kem có cấu trúc nhũ tương (có màu trắng, mịn, đồng nhất)."
    ],
    "formula": [
      {
        "name": "Cloramphenicol",
        "amount": "1,00",
        "unit": "g"
      },
      {
        "name": "Alcol cetylic",
        "amount": "6,00",
        "unit": "g"
      },
      {
        "name": "Acid stearic",
        "amount": "6,00",
        "unit": "g"
      },
      {
        "name": "Dầu parafin",
        "amount": "8,00",
        "unit": "g"
      },
      {
        "name": "Triethanolamin",
        "amount": "4,00",
        "unit": "g"
      },
      {
        "name": "Nipagin",
        "amount": "0,18",
        "unit": "g"
      },
      {
        "name": "Nipasol",
        "amount": "0,02",
        "unit": "g"
      },
      {
        "name": "Propylenglycol",
        "amount": "10,00",
        "unit": "g"
      },
      {
        "name": "Nước tinh khiết vđ",
        "amount": "100,00",
        "unit": "g"
      }
    ],
    "equipment": [
      "Bát sứ",
      "Cối chày",
      "Nồi đun cách thủy",
      "Đèn cồn",
      "Phiến kính"
    ],
    "components": [
      {
        "name": "Cloramphenicol",
        "characteristic": "Bột kết tinh trắng, ít tan trong nước, tan tốt trong propylen glycol.",
        "role": "Dược chất, kháng sinh điều trị nhiễm khuẩn ngoài da."
      },
      {
        "name": "Alcol cetylic",
        "characteristic": "Sáp rắn trắng, nóng chảy khoảng 49-56⁰C, không tan trong nước.",
        "role": "Tá dược pha dầu, tăng độ đặc và ổn định cấu trúc nhũ tương của kem."
      },
      {
        "name": "Acid stearic",
        "characteristic": "Sáp rắn trắng, nóng chảy khoảng 55-70⁰C, không tan trong nước.",
        "role": "Tá dược pha dầu; phản ứng với triethanolamin tạo xà phòng triethanolamin stearat làm chất nhũ hóa tại chỗ (nhũ hóa trực tiếp)."
      },
      {
        "name": "Dầu parafin",
        "characteristic": "Chất lỏng dầu trong suốt, không màu, không tan trong nước.",
        "role": "Tá dược pha dầu, làm mềm da và điều chỉnh độ đặc của kem."
      },
      {
        "name": "Triethanolamin",
        "characteristic": "Chất lỏng sánh, kiềm nhẹ, tan trong nước.",
        "role": "Phản ứng với acid stearic tạo xà phòng làm chất nhũ hóa cho hệ nhũ tương dầu/nước."
      },
      {
        "name": "Nipagin, nipasol",
        "characteristic": "Bột trắng (methylparaben, propylparaben), ít tan trong nước, tan trong propylen glycol.",
        "role": "Cặp chất bảo quản chống nấm mốc, vi khuẩn cho pha nước của kem."
      },
      {
        "name": "Propylen glycol",
        "characteristic": "Chất lỏng sánh, hút ẩm, tan trong nước.",
        "role": "Dung môi hòa tan cloramphenicol và các paraben, đồng thời giữ ẩm cho kem."
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Nước tinh khiết, không màu, không mùi.",
        "role": "Pha nước của nhũ tương, dung môi phân tán các thành phần."
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật. Cân dầu parafin trong bát sứ. Cân propylenglycol trong cốc mỏ. Triethanolamin trên mặt kính đồng hồ.",
        "params": {}
      },
      {
        "n": 3,
        "action": "melt",
        "label": "Trong một bát sứ, đun chảy cách thủy acid stearic và alcol cetylic, cho dầu parafin vào trộn đều, duy trì nhiệt độ 60-65⁰C.",
        "purpose": "Tạo pha dầu.",
        "standard": "Dung dịch trong suốt, màu vàng, không có tiểu phân quan sát được bằng mắt thường, nhiệt độ khoảng 60-65⁰C.",
        "params": {
          "tempMin": 60,
          "tempMax": 65,
          "unit": "°C"
        }
      },
      {
        "n": 4,
        "action": "heat",
        "label": "Trong một cốc thủy tinh, hòa tan triethanolamin vào nước, đun ở nhiệt độ 65 - 70℃.",
        "purpose": "Tạo pha nước.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường, nhiệt độ khoảng 65-70⁰C.",
        "params": {
          "tempMin": 65,
          "tempMax": 70,
          "unit": "°C"
        }
      },
      {
        "n": 5,
        "action": "emulsify",
        "label": "Trong một cối sứ khô và nóng, phối hợp pha dầu vào pha nước, dùng chày đánh nhanh và mạnh một chiều trong khoảng 2-3 phút để thu được tá dược nhũ tương mịn màng, đồng nhất.",
        "purpose": "Bào chế tá dược nhũ tương.",
        "standard": "Nhũ tương đậm đặc có màu trắng đục, đồng nhất.",
        "params": {}
      },
      {
        "n": 6,
        "action": "dissolve",
        "label": "Đun nóng propylen glycol trong cốc có mỏ tới khoảng 60℃, hòa tan nipagin, nipasol và cloramphenicol.",
        "purpose": "Hòa tan nipagin, nipasol và cloramphenicol.",
        "standard": "Dung dịch trong suốt, màu vàng nhạt, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "tempMax": 60,
          "unit": "°C"
        }
      },
      {
        "n": 7,
        "action": "mix",
        "label": "Phối hợp dung dịch thu được với tá dược nhũ tương (thu được ở bước 5) trong cối, trộn nhẹ nhàng đến khi thu được kem mịn màng, đồng nhất.",
        "purpose": "Bào chế kem hoàn chỉnh.",
        "standard": "Kem có màu trắng, mịn, đồng nhất.",
        "params": {}
      },
      {
        "n": 8,
        "action": "fill-bottle",
        "label": "Đóng thuốc vào tuýp nhôm hoặc hộp rộng miệng, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 9,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Điều trị nhiễm khuẩn ngoài da do vi khuẩn nhạy cảm với cloramphenicol."
  },
  {
    "id": "thuoc-mo-gel-lidocain",
    "lesson": 5,
    "lessonTitle": "Bào chế thuốc mỡ",
    "name": "Gel lidocain",
    "short": "Gel bôi gây tê tại chỗ lidocain, cấu trúc đồng thể",
    "icon": "💠",
    "form": "thuoc-mo",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan.",
    "finalVolume": 100,
    "finalUnit": "g",
    "quality": [
      "Gel có cấu trúc đồng thể (mềm, trong suốt, không màu)."
    ],
    "formula": [
      {
        "name": "Lidocain hydroclorid",
        "amount": "3,00",
        "unit": "g"
      },
      {
        "name": "Nipagin",
        "amount": "0,18",
        "unit": "g"
      },
      {
        "name": "Nipasol",
        "amount": "0,02",
        "unit": "g"
      },
      {
        "name": "Ethanol 90%",
        "amount": "2,00",
        "unit": "g"
      },
      {
        "name": "Glycerin",
        "amount": "10,00",
        "unit": "g"
      },
      {
        "name": "Carboxymethyl cellulose",
        "amount": "4,00",
        "unit": "g"
      },
      {
        "name": "Nước tinh khiết vđ",
        "amount": "100,00",
        "unit": "g"
      }
    ],
    "equipment": [
      "Cốc mỏ 100ml",
      "Cối chày",
      "Nồi đun cách thủy",
      "Đèn cồn",
      "Phiến kính"
    ],
    "components": [
      {
        "name": "Lidocain hydroclorid",
        "characteristic": "Bột kết tinh trắng, tan tốt trong nước, gây tê tại chỗ.",
        "role": "Dược chất, thuốc gây tê tại chỗ nhóm amid."
      },
      {
        "name": "Nipagin, nipasol",
        "characteristic": "Bột trắng (methyl- và propylparaben), ít tan trong nước, tan trong ethanol.",
        "role": "Cặp chất bảo quản chống nấm mốc, vi khuẩn cho gel."
      },
      {
        "name": "Ethanol 90⁰",
        "characteristic": "Chất lỏng không màu, dễ bay hơi, đồng tan với nước.",
        "role": "Dung môi trung gian hòa tan nipagin, nipasol trước khi phối hợp vào gel."
      },
      {
        "name": "Glycerin",
        "characteristic": "Chất lỏng sánh, hút ẩm, tan trong nước.",
        "role": "Chất giữ ẩm và chất hóa dẻo, giúp gel mềm mại, chống khô nứt."
      },
      {
        "name": "Carboxymethyl cellulose",
        "characteristic": "Bột trắng, trương nở trong nước tạo dịch keo nhớt.",
        "role": "Tá dược tạo gel (chất tạo khung gel thân nước) cho cấu trúc đồng thể."
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Nước tinh khiết, không màu, không mùi.",
        "role": "Dung môi hòa tan dược chất và môi trường trương nở tá dược tạo gel."
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân và đong các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân, đong chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 3,
        "action": "dissolve",
        "label": "Trong cốc có mỏ, hòa tan lidocain hydroclorid trong nước.",
        "purpose": "Hòa tan dược chất.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Lidocain hydroclorid"
        }
      },
      {
        "n": 4,
        "action": "disperse",
        "label": "Cho từ từ carboxy methyl cellulose vào trong dung dịch dược chất, ngâm cho trương nở.",
        "purpose": "Trương nở tá dược tạo gel.",
        "standard": "CMC trương nở hoàn toàn, trong suốt.",
        "params": {
          "reagent": "Carboxymethyl cellulose"
        }
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Trong cốc mỏ khác, hòa tan nipagin, nipasol vào ethanol sau đó thêm glycerin, khuấy đều.",
        "purpose": "Tạo chất bảo quản và glycerin.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 6,
        "action": "mix",
        "label": "Rót từ từ dung dịch chất bảo quản vào gel kết hợp trộn nhẹ nhàng đến đồng nhất.",
        "purpose": "Bào chế gel lidocain.",
        "standard": "Gel mềm, trong suốt, không màu.",
        "params": {}
      },
      {
        "n": 7,
        "action": "fill-bottle",
        "label": "Đóng thuốc vào hộp chất dẻo rộng miệng hoặc tuýp kim loại, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Đóng thuốc, dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 8,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Gây tê bề mặt tại chỗ (giảm đau da, niêm mạc trước thủ thuật)."
  },
  {
    "id": "thuoc-dat-truc-trang-paracetamol",
    "lesson": 6,
    "lessonTitle": "Bào chế thuốc đặt",
    "name": "Thuốc đặt trực tràng paracetamol",
    "short": "Viên đặt hậu môn paracetamol 0,125g, tá dược bơ cacao",
    "icon": "💊",
    "form": "thuoc-dat",
    "method": "dun-chay-do-khuon",
    "methodName": "Phương pháp đun chảy đổ khuôn.",
    "finalVolume": 1,
    "finalUnit": "g",
    "quality": [
      "Viên đặt đều, màu vàng, không có bọt khí và không nứt gãy."
    ],
    "formula": [
      {
        "name": "Paracetamol",
        "amount": "0,125",
        "unit": "g"
      },
      {
        "name": "Suppocire hoặc bơ cacao",
        "amount": "vđ 01 viên",
        "unit": "g"
      }
    ],
    "equipment": [
      "Khuôn đạn",
      "Nồi đun cách thủy",
      "Cối chày",
      "Bát sứ"
    ],
    "components": [
      {
        "name": "Paracetamol",
        "characteristic": "Bột kết tinh trắng, ít tan trong nước, vị đắng.",
        "role": "Dược chất, thuốc hạ sốt - giảm đau; dùng đường trực tràng khi không uống được."
      },
      {
        "name": "Bơ cacao hoặc Suppocire",
        "characteristic": "Tá dược thể chất rắn ở nhiệt độ phòng, nóng chảy ở khoảng 30-36⁰C (thân dầu).",
        "role": "Tá dược đun chảy đổ khuôn thân dầu, chảy lỏng ở thân nhiệt để giải phóng dược chất tại trực tràng."
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "clean",
        "label": "Khuôn: rửa sạch, sấy khô, sát khuẩn bằng ethanol 90%, bôi trơn bằng dung dịch xà phòng trong ethanol, lắp và úp ngược khuôn.",
        "purpose": "Chuẩn bị khuôn thuốc đặt đạt yêu cầu.",
        "standard": "Khuôn đã được tiệt khuẩn và bôi trơn.",
        "params": {}
      },
      {
        "n": 3,
        "action": "weigh",
        "label": "Cân paracetamol và bơ cacao theo khối lượng tính được.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 4,
        "action": "melt",
        "label": "Đun chảy cách thủy bơ cacao trong bát sứ.",
        "purpose": "Đun chảy tá dược.",
        "standard": "Bơ cacao chảy lỏng hoàn toàn.",
        "params": {
          "reagent": "Bơ cacao"
        }
      },
      {
        "n": 5,
        "action": "grind",
        "label": "Nghiền mịn paracetamol trong cối.",
        "purpose": "Làm mịn paracetamol.",
        "standard": "Paracetamol được nghiền mịn.",
        "params": {
          "reagent": "Paracetamol"
        }
      },
      {
        "n": 6,
        "action": "mix",
        "label": "Thêm đồng lượng tá dược bơ cacao đã đun chảy vào nghiền thành bột nhão đồng nhất.",
        "purpose": "Tạo bột nhão 1:1",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 7,
        "action": "disperse",
        "label": "Phân tán bột nhão thu được vào phần tá dược bơ cacao đã đun chảy còn lại.",
        "purpose": "Tạo hỗn dịch.",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 8,
        "action": "mold",
        "label": "Để nguội đến gần nhiệt độ đông đặc, đổ khuôn, đổ đầy trên mặt khuôn.",
        "purpose": "Đổ thuốc vào khuôn.",
        "standard": "Thuốc được đổ liên tục, tràn viên, không có bọt khí.",
        "params": {}
      },
      {
        "n": 9,
        "action": "cool",
        "label": "Để khuôn thuốc ở nhiệt độ 5-10⁰C trong 15 phút cho thuốc đông rắn.",
        "purpose": "Tạo hình dạng cho viên thuốc.",
        "standard": "Thuốc trong khuôn đông rắn.",
        "params": {
          "tempMin": 5,
          "tempMax": 10,
          "unit": "°C",
          "minutes": 15
        }
      },
      {
        "n": 10,
        "action": "press",
        "label": "Dùng dao cắt phần thuốc thừa trên mặt khuôn, tháo khuôn lấy thuốc.",
        "purpose": "Lấy thuốc khỏi khuôn.",
        "standard": "Viên đặt đều, màu vàng, không có bọt khí và không nứt gãy.",
        "params": {}
      },
      {
        "n": 11,
        "action": "label",
        "label": "Đóng gói sản phẩm, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 12,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Hạ sốt, giảm đau đường trực tràng (làm 03 viên; tính dư 50% bù hư hao; HSTT E=1,5)."
  },
  {
    "id": "thuoc-dat-phu-khoa-cloramphenicol",
    "lesson": 6,
    "lessonTitle": "Bào chế thuốc đặt",
    "name": "Thuốc đặt phụ khoa cloramphenicol",
    "short": "Viên đặt âm đạo cloramphenicol, tá dược gelatin - glycerin",
    "icon": "🥚",
    "form": "thuoc-dat",
    "method": "dun-chay-do-khuon",
    "methodName": "Phương pháp đun chảy đổ khuôn.",
    "finalVolume": 3,
    "finalUnit": "g",
    "quality": [
      "Viên đặt hình trứng, màu vàng trong và không có bọt khí."
    ],
    "formula": [
      {
        "name": "Cloramphenicol",
        "amount": "0,25",
        "unit": "g"
      },
      {
        "name": "Tá dược gelatin - glycerin vđ",
        "amount": "3,00",
        "unit": "g"
      },
      {
        "name": "Gelatin (trong tá dược)",
        "amount": "10",
        "unit": "%"
      },
      {
        "name": "Glycerin (trong tá dược)",
        "amount": "60",
        "unit": "%"
      },
      {
        "name": "Nước tinh khiết (trong tá dược)",
        "amount": "30",
        "unit": "%"
      }
    ],
    "equipment": [
      "Khuôn trứng",
      "Nồi đun cách thủy",
      "Cối chày",
      "Bát sứ"
    ],
    "components": [
      {
        "name": "Cloramphenicol",
        "characteristic": "Bột kết tinh trắng đến trắng ngà, ít tan trong nước, vị đắng.",
        "role": "Dược chất, kháng sinh điều trị nhiễm khuẩn tại chỗ đường âm đạo."
      },
      {
        "name": "Gelatin",
        "characteristic": "Bột hoặc mảnh trong mờ, trương nở rồi tan trong nước nóng tạo gel thuận nghịch.",
        "role": "Tá dược tạo khung của tá dược đặt thân nước gelatin - glycerin."
      },
      {
        "name": "Glycerin",
        "characteristic": "Chất lỏng sánh, hút ẩm, đồng tan với nước.",
        "role": "Thành phần chính của tá dược thân nước, hóa dẻo và giữ ẩm cho viên đặt."
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Nước tinh khiết, không màu, không mùi.",
        "role": "Dung môi làm trương nở gelatin và tạo thể chất cho tá dược."
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "clean",
        "label": "Khuôn: rửa sạch, sấy khô, sát khuẩn bằng ethanol 90%, bôi trơn bằng dầu parafin, lắp và úp ngược khuôn.",
        "purpose": "Chuẩn bị khuôn thuốc đặt đạt yêu cầu.",
        "standard": "Khuôn đã được tiệt khuẩn và bôi trơn.",
        "params": {}
      },
      {
        "n": 3,
        "action": "weigh",
        "label": "Cân cloramphenicol và tá dược gelatin - glycerin theo khối lượng tính được.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật",
        "params": {}
      },
      {
        "n": 4,
        "action": "disperse",
        "label": "Cho gelatin vào 1ml nước ngâm trong cốc có mỏ.",
        "purpose": "Trương nở gelatin.",
        "standard": "Gelatin trong suốt.",
        "params": {
          "reagent": "Gelatin"
        }
      },
      {
        "n": 5,
        "action": "grind",
        "label": "Nghiền mịn clorocid trong cối, rồi trộn đều với đồng lượng glycerin (hỗn hợp 1).",
        "purpose": "Tạo bột nhão đặc.",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 6,
        "action": "melt",
        "label": "Đun trên cách thuỷ glycerin còn lại ở 60 – 70⁰C, đổ gelatin đã ngâm ở trên vào khuấy trộn đều cho tới khi gelatin tan hoàn toàn (hỗn hợp 2).",
        "purpose": "Tạo hỗn hợp tá dược.",
        "standard": "Dung dịch trong suốt, màu vàng, không có bọt khí.",
        "params": {
          "tempMin": 60,
          "tempMax": 70,
          "unit": "°C"
        }
      },
      {
        "n": 7,
        "action": "mix",
        "label": "Cho tiếp hỗn hợp 2 vào hỗn hợp 1 trộn đều thành hỗn hợp đồng nhất.",
        "purpose": "Tạo hỗn dịch.",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 8,
        "action": "mold",
        "label": "Đổ hỗn hợp trên vào khuôn ở nhiệt độ khoảng 45⁰C (đổ đầy trên mặt khuôn).",
        "purpose": "Đổ thuốc vào khuôn.",
        "standard": "Thuốc được đổ liên tục, tràn viên, không có bọt khí.",
        "params": {
          "temp": 45,
          "unit": "°C"
        }
      },
      {
        "n": 9,
        "action": "cool",
        "label": "Để khuôn thuốc ở nhiệt độ 5-10⁰C trong 15 phút cho thuốc đông rắn.",
        "purpose": "Tạo hình dạng cho viên thuốc.",
        "standard": "Thuốc trong khuôn đông rắn",
        "params": {
          "tempMin": 5,
          "tempMax": 10,
          "unit": "°C",
          "minutes": 15
        }
      },
      {
        "n": 10,
        "action": "press",
        "label": "Dùng dao cắt phần thuốc thừa trên mặt khuôn, tháo khuôn lấy thuốc.",
        "purpose": "Lấy thuốc khỏi khuôn.",
        "standard": "Viên đặt hình trứng, màu vàng trong và không có bọt khí.",
        "params": {}
      },
      {
        "n": 11,
        "action": "label",
        "label": "Đóng gói, dãn nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 12,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Điều trị nhiễm khuẩn phụ khoa (làm 03 viên; tính dư 10% bù hư hao; HSTT E=1,0)."
  },
  {
    "id": "dung-dich-pvp-iod-10",
    "lesson": 7,
    "lessonTitle": "Bào chế dung dịch thuốc",
    "name": "Dung dịch PVP – Iod 10%",
    "short": "Dung dịch sát khuẩn PVP – Iod 10% màu nâu",
    "icon": "🟤",
    "form": "dung-dich",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan hoàn toàn.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Dung dịch trong suốt, có màu nâu."
    ],
    "formula": [
      {
        "name": "PVP – Iod",
        "amount": "10,00",
        "unit": "g"
      },
      {
        "name": "Natri lauryl sulfat",
        "amount": "0,02",
        "unit": "g"
      },
      {
        "name": "Natri dihydrophosphat khan",
        "amount": "0,14",
        "unit": "g"
      },
      {
        "name": "Natri citrat dihydrat",
        "amount": "0,04",
        "unit": "g"
      },
      {
        "name": "Glycerin",
        "amount": "1,00",
        "unit": "g"
      },
      {
        "name": "Nước tinh khiết vđ",
        "amount": "100,00",
        "unit": "mL"
      }
    ],
    "equipment": [
      "Cốc chân 100ml",
      "Máy đo pH",
      "Màng lọc",
      "Máy lọc hút chân không"
    ],
    "components": [
      {
        "name": "PVP – Iod",
        "characteristic": "Bột hoặc phức hợp màu nâu, tan trong nước, giải phóng iod tự do từ từ",
        "role": "Dược chất chính – sát khuẩn, khử khuẩn tại chỗ"
      },
      {
        "name": "Natri lauryl sulfat",
        "characteristic": "Chất diện hoạt anion, tạo bọt, giảm sức căng bề mặt",
        "role": "Chất diện hoạt – tăng thấm ướt và ổn định dung dịch"
      },
      {
        "name": "Natri dihydrophosphat khan",
        "characteristic": "Muối acid, tan trong nước",
        "role": "Thành phần hệ đệm phosphat – điều chỉnh và ổn định pH"
      },
      {
        "name": "Natri citrat dihydrat",
        "characteristic": "Muối kiềm yếu, tan trong nước",
        "role": "Thành phần hệ đệm citrat – ổn định pH, tạo phức ion kim loại"
      },
      {
        "name": "Glycerin",
        "characteristic": "Chất lỏng sánh, không màu, hút ẩm, tan trong nước",
        "role": "Chất giữ ẩm, ổn định, tăng độ nhớt"
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Chất lỏng trong suốt, không màu",
        "role": "Dung môi hòa tan"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ",
        "purpose": "Làm sạch dụng cụ dùng cho bào chế sản phẩm.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật. - Cân glycerin trên kính đồng hồ.",
        "params": {}
      },
      {
        "n": 3,
        "action": "dissolve",
        "label": "Hòa tan 0,02g natri lauryl sulfat bằng 70 ml nước trong cốc chân.",
        "purpose": "Hòa tan natri lauryl sulfat.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Natri lauryl sulfat",
          "target": 0.02,
          "unit": "g"
        }
      },
      {
        "n": 4,
        "action": "dissolve",
        "label": "Hòa tan tiếp 0,14g natri dihydrophosphat và 0,04g natri citrat vào cốc chân trên.",
        "purpose": "Hòa tan natri dihydrophosphat và natri citrat.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Thêm từ từ PVP - Iod vào dung dịch trên rồi khuấy cho đến khi tan hết.",
        "purpose": "Hòa tan PVP - Iod.",
        "standard": "Dung dịch trong suốt, màu nâu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "PVP – Iod",
          "target": 10,
          "unit": "g"
        }
      },
      {
        "n": 6,
        "action": "dissolve",
        "label": "Thêm glycerin vào dung dịch trên, khuấy đều.",
        "purpose": "Hòa tan glycerin.",
        "standard": "Dung dịch được hòa tan hoàn toàn, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 7,
        "action": "adjust-ph",
        "label": "Đo và điều chỉnh pH dung dịch bằng dung dịch: NaOH 10% hoặc HCl 10%.",
        "purpose": "Tạo pH thích hợp.",
        "standard": "pH dung dịch có giá trị từ 4,0 -4,5.",
        "params": {}
      },
      {
        "n": 8,
        "action": "adjust-volume",
        "label": "Chuyển dung dịch trên sang ống đong, thêm nước vừa đủ 100ml, khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Điều chỉnh đúng 100ml trong ống đong.",
        "params": {
          "target": 100,
          "unit": "mL"
        }
      },
      {
        "n": 9,
        "action": "filter",
        "label": "Lọc qua màng lọc có kích thước lỗ lọc 0,45-1mcm.",
        "purpose": "Làm trong dung dịch thuốc.",
        "standard": "Dung dịch trong suốt, có màu nâu.",
        "params": {
          "pore": "0,45-1 mcm"
        }
      },
      {
        "n": 10,
        "action": "fill-bottle",
        "label": "Đóng lọ màu, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 11,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Dung dịch sát khuẩn ngoài da, niêm mạc; sát trùng vết thương."
  },
  {
    "id": "dung-dich-dau-xoa",
    "lesson": 7,
    "lessonTitle": "Bào chế dung dịch thuốc",
    "name": "Dung dịch dầu xoa",
    "short": "Dầu xoa giảm đau màu xanh nhạt, mùi đặc trưng",
    "icon": "🌿",
    "form": "dung-dich",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan hoàn toàn.",
    "finalVolume": 100,
    "finalUnit": "g",
    "quality": [
      "Dung dịch trong suốt, màu xanh nhạt có mùi đặc trưng."
    ],
    "formula": [
      {
        "name": "Menthol",
        "amount": "14,50",
        "unit": "g"
      },
      {
        "name": "Methyl salicylat",
        "amount": "30,00",
        "unit": "g"
      },
      {
        "name": "Camphor",
        "amount": "2,00",
        "unit": "g"
      },
      {
        "name": "Tinh dầu quế",
        "amount": "2,00",
        "unit": "g"
      },
      {
        "name": "Clorophyl",
        "amount": "0,02",
        "unit": "g"
      },
      {
        "name": "Dầu parafin vđ",
        "amount": "100,00",
        "unit": "g"
      }
    ],
    "equipment": [
      "Cối chày",
      "Màng lọc"
    ],
    "components": [
      {
        "name": "Menthol",
        "characteristic": "Tinh thể trắng, mùi bạc hà; tạo hỗn hợp eutectic chảy lỏng khi nghiền với camphor",
        "role": "Dược chất – giảm đau, gây mát tại chỗ; tạo hỗn hợp chảy lỏng"
      },
      {
        "name": "Methyl salicylat",
        "characteristic": "Chất lỏng dầu, mùi đặc trưng, thân dầu",
        "role": "Dược chất – giảm đau, chống viêm tại chỗ; đồng thời là dung môi"
      },
      {
        "name": "Camphor",
        "characteristic": "Tinh thể trắng, thăng hoa; cùng menthol tạo hỗn hợp eutectic",
        "role": "Dược chất – giảm đau, kích ứng nhẹ gây nóng ấm tại chỗ"
      },
      {
        "name": "Tinh dầu quế",
        "characteristic": "Chất lỏng, mùi thơm đặc trưng, thân dầu",
        "role": "Dược chất/hương liệu – làm ấm, tạo mùi đặc trưng"
      },
      {
        "name": "Clorophyl",
        "characteristic": "Chất màu xanh lục, tan trong dầu",
        "role": "Chất màu – tạo màu xanh nhạt cho chế phẩm"
      },
      {
        "name": "Dầu parafin",
        "characteristic": "Chất lỏng dầu khoáng, trơ, không màu",
        "role": "Dung môi/tá dược dầu – vừa đủ thể tích"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần trong công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "- Các thành phần được cân chính xác, đúng kỹ thuật. - Cân methyl salicylat, dầu parafin trong cốc mỏ, cân menthol, tinh dầu quế, clorophyl trên kính đồng hồ).",
        "params": {}
      },
      {
        "n": 3,
        "action": "grind",
        "label": "Cho 14,5g methol và 2,0g camphor vào cối nghiền.",
        "purpose": "Tạo hỗn hợp chảy lỏng.",
        "standard": "Dung dịch trong suốt.",
        "params": {}
      },
      {
        "n": 4,
        "action": "dissolve",
        "label": "Thêm 30,0g methyl salicylat vào hỗn hợp trong cối.",
        "purpose": "Hòa tan methyl salicylat.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Methyl salicylat",
          "target": 30,
          "unit": "g"
        }
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Cho tinh dầu quế vào hỗn hợp trên, hòa tan.",
        "purpose": "Hòa tan tinh dầu quế.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {}
      },
      {
        "n": 6,
        "action": "adjust-volume",
        "label": "Cho vừa đủ dầu parafin vào hỗn hợp trên khuấy đều.",
        "purpose": "Hòa tan dung môi.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "target": 100,
          "unit": "g"
        }
      },
      {
        "n": 7,
        "action": "dissolve",
        "label": "Thêm 0,02g clorophyl vào hỗn hợp trên, khuấy đều.",
        "purpose": "Hòa tan chất màu.",
        "standard": "Dung dịch trong suốt, màu xanh nhạt, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Clorophyl",
          "target": 0.02,
          "unit": "g"
        }
      },
      {
        "n": 8,
        "action": "filter",
        "label": "Lọc dung dịch trên qua màng lọc (kích thước lỗ lọc 5 mcm).",
        "purpose": "Làm trong dung dịch thuốc.",
        "standard": "Dung dịch trong suốt, màu xanh nhạt có mùi đặc trưng.",
        "params": {
          "pore": "5 mcm"
        }
      },
      {
        "n": 9,
        "action": "fill-bottle",
        "label": "Đóng dung dịch trên vào lọ thủy tinh, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 10,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Xoa bóp giảm đau cơ, khớp, cảm lạnh; làm ấm tại chỗ."
  },
  {
    "id": "siro-dextromethorphan",
    "lesson": 8,
    "lessonTitle": "Bào chế siro thuốc – Elixir",
    "name": "Siro dextromethorphan",
    "short": "Siro giảm ho dextromethorphan màu vàng nhạt",
    "icon": "🍯",
    "form": "siro",
    "method": "hoa-tan",
    "methodName": "Phương pháp hòa tan hoàn toàn.",
    "finalVolume": 100,
    "finalUnit": "mL",
    "quality": [
      "Dung dịch trong suốt, có màu vàng nhạt."
    ],
    "formula": [
      {
        "name": "Dextromethophan HBr",
        "amount": "0,30",
        "unit": "g"
      },
      {
        "name": "Natri benzoat",
        "amount": "0,25",
        "unit": "g"
      },
      {
        "name": "Natri citrat dihydrat",
        "amount": "0,25",
        "unit": "g"
      },
      {
        "name": "Acid citric monohydrat",
        "amount": "0,10",
        "unit": "g"
      },
      {
        "name": "Glucose",
        "amount": "60,00",
        "unit": "g"
      },
      {
        "name": "Nước tinh khiết vđ",
        "amount": "100,00",
        "unit": "mL"
      }
    ],
    "equipment": [
      "Nồi đun cách thủy",
      "Cốc chân 100ml",
      "Máy đo pH",
      "Màng lọc"
    ],
    "components": [
      {
        "name": "Dextromethophan hydrobromid",
        "characteristic": "Bột kết tinh trắng, tan trong nước, dẫn xuất morphinan",
        "role": "Dược chất chính – giảm ho (ức chế trung tâm ho)"
      },
      {
        "name": "Natri benzoat",
        "characteristic": "Bột trắng, tan trong nước, kháng khuẩn/nấm ở pH acid",
        "role": "Chất bảo quản chống nấm mốc, vi khuẩn"
      },
      {
        "name": "Natri citrat dihydrat",
        "characteristic": "Muối kiềm yếu, tan trong nước",
        "role": "Thành phần hệ đệm citrat – điều chỉnh, ổn định pH"
      },
      {
        "name": "Acid citric monohydrat",
        "characteristic": "Tinh thể acid yếu, tan trong nước, vị chua",
        "role": "Thành phần hệ đệm citrat, điều chỉnh pH và vị"
      },
      {
        "name": "Glucose",
        "characteristic": "Đường khử, tan nhiều trong nước, tạo dung dịch sánh",
        "role": "Chất tạo ngọt và tạo độ nhớt/thể chất siro"
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Chất lỏng trong suốt, không màu",
        "role": "Dung môi hòa tan"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "- Cân chính xác, đúng kỹ thuật. - Glycerin cân trên kính đồng hồ.",
        "params": {}
      },
      {
        "n": 3,
        "action": "dissolve",
        "label": "Hòa tan nóng 60g glucose với khoảng 30ml nước trong cốc có mỏ đến khi tan hoàn toàn.",
        "purpose": "Hòa tan glucose.",
        "standard": "Dung dịch sánh trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Glucose",
          "target": 60,
          "unit": "g"
        }
      },
      {
        "n": 4,
        "action": "dissolve",
        "label": "Hòa tan lần lượt natri benzoat, natri citrat, acid citric vào cốc có mỏ trên rồi để nguội đến khoảng 50-60°C.",
        "purpose": "Hòa tan các chất phụ.",
        "standard": "Dung dịch trong suốt, màu nâu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "tempMin": 50,
          "tempMax": 60
        }
      },
      {
        "n": 5,
        "action": "dissolve",
        "label": "Hòa tan tiếp dextromethorphan hydrobromid vào cốc có mỏ trên.",
        "purpose": "Hòa tan dược chất.",
        "standard": "Dung dịch trong suốt, màu vàng nhạt, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "reagent": "Dextromethophan HBr",
          "target": 0.3,
          "unit": "g"
        }
      },
      {
        "n": 6,
        "action": "adjust-ph",
        "label": "Đo và điều chỉnh pH dung dịch trên bằng dung dịch: NaOH 10% hoặc HCl 10%.",
        "purpose": "Tạo pH thích hợp.",
        "standard": "pH dung dịch có giá trị từ 4,5 - 5,5.",
        "params": {}
      },
      {
        "n": 7,
        "action": "adjust-volume",
        "label": "Chuyển dung dịch trên sang ống đong, thêm nước vừa đủ 100ml, khuấy đều.",
        "purpose": "Đạt thể tích yêu cầu.",
        "standard": "Điều chỉnh đúng 100ml trong ống đong.",
        "params": {
          "target": 100,
          "unit": "mL"
        }
      },
      {
        "n": 8,
        "action": "filter",
        "label": "Lọc dung dịch trên qua màng lọc có kích thước lỗ lọc 5 mcm.",
        "purpose": "Làm trong dung dịch.",
        "standard": "Dung dịch trong suốt, có màu vàng nhạt.",
        "params": {
          "pore": "5 mcm"
        }
      },
      {
        "n": 9,
        "action": "fill-bottle",
        "label": "Đóng lọ, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 10,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Điều trị ho khan; siro giảm ho dùng đường uống."
  },
  {
    "id": "thuoc-mo-benzosali",
    "lesson": 9,
    "lessonTitle": "Bào chế thuốc mỡ 1",
    "name": "Thuốc mỡ benzosali",
    "short": "Thuốc mỡ kháng khuẩn – bạt sừng, tá dược nhũ hóa",
    "icon": "🧴",
    "form": "thuoc-mo",
    "method": "tron-deu",
    "methodName": "Phương pháp trộn đều đơn giản.",
    "finalVolume": 100,
    "finalUnit": "g",
    "quality": [
      "Thuốc mỡ có cấu trúc hỗn dịch (đồng nhất, có thể chất mềm, màu trắng đục)."
    ],
    "formula": [
      {
        "name": "Acid benzoic (bột mịn)",
        "amount": "6,0",
        "unit": "g"
      },
      {
        "name": "Acid salicylic (bột mịn)",
        "amount": "3,0",
        "unit": "g"
      },
      {
        "name": "Tá dược nhũ hóa vđ",
        "amount": "100,0",
        "unit": "g"
      },
      {
        "name": "Tá dược nhũ hóa – Sáp nhũ hóa",
        "amount": "30,0",
        "unit": "g"
      },
      {
        "name": "Tá dược nhũ hóa – Vaselin",
        "amount": "35,0",
        "unit": "g"
      },
      {
        "name": "Tá dược nhũ hóa – Dầu parafin",
        "amount": "35,0",
        "unit": "g"
      },
      {
        "name": "Sáp nhũ hóa – Alcol cetostearylic",
        "amount": "27,0",
        "unit": "g"
      },
      {
        "name": "Sáp nhũ hóa – Natri laurylsulfat",
        "amount": "3,0",
        "unit": "g"
      },
      {
        "name": "Sáp nhũ hóa – Nước tinh khiết",
        "amount": "1,2",
        "unit": "g"
      }
    ],
    "equipment": [
      "Bát sứ",
      "Cối chày",
      "Nồi đun cách thủy",
      "Đèn cồn",
      "Phiến kính"
    ],
    "components": [
      {
        "name": "Acid benzoic",
        "characteristic": "Bột kết tinh trắng, ít tan trong nước, tan trong dầu/cồn",
        "role": "Dược chất – kháng khuẩn, chống nấm"
      },
      {
        "name": "Acid salicylic",
        "characteristic": "Bột kết tinh trắng, ít tan trong nước",
        "role": "Dược chất – bạt sừng (tiêu sừng), chống nấm"
      },
      {
        "name": "Natri lauryl sulfat",
        "characteristic": "Chất diện hoạt anion, tạo bọt",
        "role": "Chất nhũ hóa (thành phần sáp nhũ hóa)"
      },
      {
        "name": "Alcol cetostearylic",
        "characteristic": "Sáp rắn, thân dầu, nóng chảy khoảng 50°C",
        "role": "Chất nhũ hóa đồng thời tạo thể chất, ổn định nhũ tương"
      },
      {
        "name": "Vaselin",
        "characteristic": "Khối mềm dẻo, thân dầu, trơ",
        "role": "Tá dược mỡ thân dầu – nền thuốc mỡ"
      },
      {
        "name": "Dầu parafin",
        "characteristic": "Chất lỏng dầu khoáng, trơ",
        "role": "Tá dược dầu – điều chỉnh thể chất mềm"
      },
      {
        "name": "Nước tinh khiết",
        "characteristic": "Chất lỏng trong suốt, không màu",
        "role": "Pha nước của tá dược nhũ hóa"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Cân và đong thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần của sáp nhũ hóa.",
        "standard": "Các thành phần được cân, đong chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 3,
        "action": "melt",
        "label": "Đun chảy alcol cetostearylic trong bát sứ ở nhiệt độ 95-100°C.",
        "purpose": "Chuyển tá dược từ thể rắn sang thể lỏng.",
        "standard": "Alcol cetostearylic được đun chảy hoàn toàn.",
        "params": {
          "tempMin": 95,
          "tempMax": 100
        }
      },
      {
        "n": 4,
        "action": "emulsify",
        "label": "Thêm natri laurylsulfat, khuấy đều, đun nóng tới 115°C. Thêm nước, khuấy mạnh đến khi hết bọt.",
        "purpose": "Tạo sáp nhũ hóa.",
        "standard": "Dung dịch trong suốt, không màu, không có tiểu phân quan sát được bằng mắt thường.",
        "params": {
          "tempMin": 115,
          "tempMax": 115
        }
      },
      {
        "n": 5,
        "action": "cool",
        "label": "Làm lạnh nhanh trong nước đá, khuấy trộn trong quá trình làm lạnh.",
        "purpose": "Chuyển sáp nhũ hóa sang thể mềm.",
        "standard": "Sáp thu được có thể chất mềm, mịn, đồng nhất.",
        "params": {}
      },
      {
        "n": 6,
        "action": "weigh",
        "label": "Cân sáp nhũ hóa, dầu parafin và vaselin.",
        "purpose": "Chuẩn bị bị đủ các thành phần của tá dược nhũ hóa.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 7,
        "action": "melt",
        "label": "Đun chảy sáp nhũ hóa trong bát sứ, cho vaselin và dầu parafin vào trộn đều để nguội.",
        "purpose": "Bào chế tá dược nhũ hóa.",
        "standard": "Hỗn hợp tá dược đồng nhất.",
        "params": {}
      },
      {
        "n": 8,
        "action": "weigh",
        "label": "Cân acid benzoic, acid salicylic và tá dược nhũ hóa.",
        "purpose": "Chuẩn bị đủ dược chất và tá dược nhũ hóa.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 9,
        "action": "grind",
        "label": "Nghiền mịn acid benzoic và acid salicylic trong cối, trộn thành bột kép đồng nhất.",
        "purpose": "Tạo hỗn hợp bột kép.",
        "standard": "Hỗn hợp bột kép đồng nhất.",
        "params": {}
      },
      {
        "n": 10,
        "action": "mix",
        "label": "Phối hợp tá dược còn lại theo nguyên tắc đồng lượng, trộn đều cho tới khi thu được thuốc mỡ mịn, đồng nhất.",
        "purpose": "Bào chế thuốc mỡ.",
        "standard": "Thuốc mỡ đồng nhất, có thể chất mềm, màu trắng đục.",
        "params": {}
      },
      {
        "n": 11,
        "action": "inspect",
        "label": "Kiểm tra độ mịn của thuốc mỡ.",
        "purpose": "Đánh giá độ mịn của thuốc mỡ.",
        "standard": "Thuốc mỡ đạt tiêu chuẩn độ mịn.",
        "params": {}
      },
      {
        "n": 12,
        "action": "fill-bottle",
        "label": "Đóng thuốc vào lọ rộng miệng hoặc tuýp kim loại, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ được dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 13,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Bôi ngoài da điều trị nấm da, bạt sừng, sát khuẩn (hắc lào, lang ben)."
  },
  {
    "id": "mo-tra-mat-tetracyclin-hydroclorid",
    "lesson": 9,
    "lessonTitle": "Bào chế thuốc mỡ 1",
    "name": "Mỡ tra mắt tetracyclin hydroclorid",
    "short": "Mỡ tra mắt kháng sinh tetracyclin, vô khuẩn, màu vàng",
    "icon": "👁️",
    "form": "thuoc-mo",
    "method": "tron-deu",
    "methodName": "Phương pháp trộn đều đơn giản.",
    "finalVolume": 1000,
    "finalUnit": "g",
    "quality": [
      "Thuốc mỡ có cấu trúc hỗn dịch (có màu vàng, mịn, đồng nhất)."
    ],
    "formula": [
      {
        "name": "Tetracyclin hydroclorid",
        "amount": "10,0",
        "unit": "g"
      },
      {
        "name": "Lanolin khan",
        "amount": "70,0",
        "unit": "g"
      },
      {
        "name": "Parafin",
        "amount": "30,0",
        "unit": "g"
      },
      {
        "name": "Vaselin",
        "amount": "890,0",
        "unit": "g"
      },
      {
        "name": "Làm 1/30 công thức",
        "amount": "",
        "unit": ""
      }
    ],
    "equipment": [
      "Bát sứ",
      "Cối chày",
      "Rây 125",
      "Nồi đun cách thủy"
    ],
    "components": [
      {
        "name": "Tetracyclin hydroclorid",
        "characteristic": "Bột kết tinh màu vàng, kháng sinh phổ rộng, ít bền, phân tán dạng hỗn dịch",
        "role": "Dược chất chính – kháng sinh điều trị nhiễm khuẩn mắt"
      },
      {
        "name": "Lanolin khan",
        "characteristic": "Tá dược mỡ thân dầu, có khả năng hút nước cao",
        "role": "Tá dược mỡ – tăng khả năng thấm và nhũ hóa, giữ dược chất"
      },
      {
        "name": "Parafin",
        "characteristic": "Sáp rắn thân dầu, nóng chảy cao",
        "role": "Tá dược tạo thể chất – tăng độ cứng/độ đặc cho mỡ"
      },
      {
        "name": "Vaselin",
        "characteristic": "Khối mềm dẻo, thân dầu, trơ, chịu tiệt khuẩn nhiệt",
        "role": "Tá dược mỡ thân dầu – nền thuốc mỡ tra mắt"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "weigh",
        "label": "Dùng bát sứ cân lanolin khan, parafin và vaselin.",
        "purpose": "Chuẩn bị đủ tá dược thuốc mỡ.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 3,
        "action": "melt",
        "label": "Đun nóng chảy các tá dược trên bát sứ, khuấy đều. Duy trì nhiệt độ 160℃ trong 1h để tiệt khuẩn.",
        "purpose": "Bào chế tá dược thuốc mỡ vô khuẩn.",
        "standard": "Hỗn hợp tá dược đồng nhất, vô khuẩn.",
        "params": {
          "tempMin": 160,
          "tempMax": 160
        }
      },
      {
        "n": 4,
        "action": "cool",
        "label": "Hỗn hợp tá dược được để nguội trở lại trong điều kiện vô khuẩn.",
        "purpose": "Hạ nhiệt độ của tá dược.",
        "standard": "Nhiệt độ đạt 50-60°C.",
        "params": {
          "tempMin": 50,
          "tempMax": 60
        }
      },
      {
        "n": 5,
        "action": "sieve",
        "label": "Nghiền mịn tetracyclin hydroclorid rây qua rây 125, cân lại khối lượng theo công thức.",
        "purpose": "Làm mịn bột tetracyclin theo yêu cầu.",
        "standard": "Tetracyclin có khối lượng và kích thước đạt yêu cầu.",
        "params": {
          "mesh": 125
        }
      },
      {
        "n": 6,
        "action": "disperse",
        "label": "Cho tetracyclin hydroclorid đã nghiền mịn vào trong cối, thêm hỗn hợp tá dược đã chảy lỏng vào cối trộn đều theo nguyên tắc đẳng lượng.",
        "purpose": "Phân tán dược chất vào hỗn hợp tá dược.",
        "standard": "Thuốc mỡ có màu vàng, mịn, đồng nhất.",
        "params": {}
      },
      {
        "n": 7,
        "action": "inspect",
        "label": "Kiểm tra độ mịn của thuốc mỡ.",
        "purpose": "Đánh giá độ mịn thuốc mỡ.",
        "standard": "Thuốc mỡ đạt tiêu chuẩn về độ mịn.",
        "params": {}
      },
      {
        "n": 8,
        "action": "fill-bottle",
        "label": "Đóng thuốc vào tuýp kim loại, dãn nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dãn nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 9,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Tra mắt điều trị nhiễm khuẩn mắt (viêm kết mạc, đau mắt hột)."
  },
  {
    "id": "thuoc-bot-pha-hon-dich-amoxicillin",
    "lesson": 10,
    "lessonTitle": "Bào chế thuốc bột - thuốc cốm",
    "name": "Thuốc bột pha hỗn dịch amoxicillin",
    "short": "Bột kháng sinh amoxicillin pha hỗn dịch uống cho trẻ em",
    "icon": "💊",
    "form": "thuoc-bot",
    "method": "tron-dang-luong",
    "methodName": "Phương pháp trộn đều theo nguyên tắc đẳng lượng.",
    "finalVolume": 1,
    "finalUnit": "chai",
    "quality": [
      "Bột khô tơi, không bị ẩm, vón, màu trắng hoặc trắng ngà, mùi thơm."
    ],
    "formula": [
      {
        "name": "Amoxicillin trihydrat",
        "amount": "1,72",
        "unit": "g"
      },
      {
        "name": "Gôm xanthan",
        "amount": "0,15",
        "unit": "g"
      },
      {
        "name": "Natri citrat",
        "amount": "0,28",
        "unit": "g"
      },
      {
        "name": "Natri benzoat",
        "amount": "0,18",
        "unit": "g"
      },
      {
        "name": "Natri croscarmelose",
        "amount": "0,60",
        "unit": "g"
      },
      {
        "name": "Vanilin",
        "amount": "0,05",
        "unit": "g"
      },
      {
        "name": "Aerosil",
        "amount": "0,18",
        "unit": "g"
      },
      {
        "name": "Bột đường",
        "amount": "22,40",
        "unit": "g"
      }
    ],
    "equipment": [
      "Rây 250",
      "Rây 355",
      "Cối chày",
      "Cân kỹ thuật",
      "Cân xác định hàm ẩm",
      "Chai chất dẻo 100ml có vạch 60ml"
    ],
    "components": [
      {
        "name": "Amoxicillin trihydrat",
        "characteristic": "Bột kết tinh màu trắng hoặc gần trắng, ít tan trong nước, kém bền trong môi trường ẩm và dung dịch nước.",
        "role": "Dược chất - kháng sinh nhóm beta-lactam"
      },
      {
        "name": "Gôm xanthan",
        "characteristic": "Bột màu trắng ngà, trương nở và tạo dung dịch keo có độ nhớt cao trong nước.",
        "role": "Tá dược treo (tạo và ổn định hỗn dịch khi pha)"
      },
      {
        "name": "Natri citrat",
        "characteristic": "Bột kết tinh trắng, dễ tan trong nước, có tính đệm.",
        "role": "Tá dược đệm - ổn định pH, tăng độ ổn định của amoxicillin"
      },
      {
        "name": "Natri benzoat",
        "characteristic": "Bột hoặc hạt trắng, dễ tan trong nước, có tác dụng kháng khuẩn trong môi trường acid.",
        "role": "Chất bảo quản chống nấm mốc, vi khuẩn"
      },
      {
        "name": "Natri croscarmelose",
        "characteristic": "Bột màu trắng, trương nở mạnh khi gặp nước.",
        "role": "Tá dược rã - giúp bột phân tán nhanh khi pha hỗn dịch"
      },
      {
        "name": "Vanilin",
        "characteristic": "Tinh thể hoặc bột trắng đến vàng nhạt, mùi thơm vani đặc trưng.",
        "role": "Tá dược điều hương (tạo mùi thơm)"
      },
      {
        "name": "Aerosil (silica keo khan)",
        "characteristic": "Bột rất mịn, nhẹ, màu trắng, diện tích bề mặt lớn, hút ẩm.",
        "role": "Tá dược trơn chảy và hút ẩm, chống vón"
      },
      {
        "name": "Bột đường (saccarose)",
        "characteristic": "Bột kết tinh trắng, vị ngọt, dễ tan trong nước.",
        "role": "Tá dược độn và tạo ngọt (điều vị)"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "grind",
        "label": "Nghiền đường trắng thành bột, rây qua rây 250.",
        "purpose": "Làm mịn đường theo yêu cẩu.",
        "standard": "Đường rây qua được rây 250.",
        "params": {
          "mesh": 250
        }
      },
      {
        "n": 3,
        "action": "weigh",
        "label": "Cân các nguyên liệu theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 4,
        "action": "mix",
        "label": "Trộn bột kép lần lượt: vanilin, gôm xanthan, natri benzoat, aerosil, natri citrat, natri croscarmelose, đường theo nguyên tắc đẳng lượng.",
        "purpose": "Tạo hỗn hợp tá dược.",
        "standard": "Hỗn hợp bột kép đồng nhất.",
        "params": {}
      },
      {
        "n": 5,
        "action": "mix",
        "label": "Trộn hỗn hợp bột với amoxicilin.",
        "purpose": "Trộn đều dược chất với tá dược.",
        "standard": "Hỗn hợp bột kép đồng nhất.",
        "params": {}
      },
      {
        "n": 6,
        "action": "sieve",
        "label": "Rây hỗn hợp bột qua rây 355.",
        "purpose": "Làm đồng đều bột.",
        "standard": "Bột được rây hết qua rây 355.",
        "params": {
          "mesh": 355
        }
      },
      {
        "n": 7,
        "action": "fill-bottle",
        "label": "Đóng bột thuốc vào chai chất dẻo dung tích khoảng 100ml, có vạch 60ml.",
        "purpose": "Phân liều.",
        "standard": "Bột khô tơi, không bị ẩm, vón, màu trắng hoặc trắng ngà, mùi thơm.",
        "params": {}
      },
      {
        "n": 8,
        "action": "label",
        "label": "Dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 9,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Là kháng sinh nhóm beta lactam, điều trị các bệnh nhiễm khuẩn. Dạng thuốc dùng cho trẻ em. Khi dùng thêm nước đun sôi để nguội đến vạch 60ml, lắc kỹ, 5ml hỗn dịch chứa 125 mg amoxicilin."
  },
  {
    "id": "thuoc-com-sui-bot-paracetamol",
    "lesson": 10,
    "lessonTitle": "Bào chế thuốc bột - thuốc cốm",
    "name": "Thuốc cốm sủi bọt paracetamol",
    "short": "Cốm sủi bọt paracetamol hạ sốt, giảm đau cho trẻ em",
    "icon": "🫧",
    "form": "thuoc-com",
    "method": "xat-hat-uot",
    "methodName": "Phương pháp xát hạt ướt.",
    "finalVolume": 5,
    "finalUnit": "gói",
    "quality": [
      "Thuốc cốm màu trắng, không bị vón, hạt đồng đều."
    ],
    "formula": [
      {
        "name": "Paracetamol",
        "amount": "0,15",
        "unit": "g"
      },
      {
        "name": "Acid citric khan",
        "amount": "0,12",
        "unit": "g"
      },
      {
        "name": "Natri hydrocarbonat",
        "amount": "0,20",
        "unit": "g"
      },
      {
        "name": "Natri carbonat",
        "amount": "0,10",
        "unit": "g"
      },
      {
        "name": "Natri saccarin",
        "amount": "0,002",
        "unit": "g"
      },
      {
        "name": "Natri benzoat",
        "amount": "0,20",
        "unit": "g"
      },
      {
        "name": "Sorbitol",
        "amount": "0,21",
        "unit": "g"
      },
      {
        "name": "Dung dịch PVP 5%",
        "amount": "vđ",
        "unit": ""
      }
    ],
    "equipment": [
      "Rây 250",
      "Rây 600",
      "Rây 800",
      "Cối chày",
      "Tủ sấy",
      "Cân xác định hàm ẩm",
      "Túi chống ẩm"
    ],
    "components": [
      {
        "name": "Paracetamol",
        "characteristic": "Bột kết tinh trắng, không mùi, ít tan trong nước lạnh, tan hơn trong nước nóng.",
        "role": "Dược chất - hạ sốt, giảm đau"
      },
      {
        "name": "Acid citric khan",
        "characteristic": "Tinh thể hoặc bột trắng, vị chua, dễ tan trong nước.",
        "role": "Thành phần acid của hệ sủi bọt (phản ứng với muối carbonat sinh CO2)"
      },
      {
        "name": "Natri hydrocarbonat",
        "characteristic": "Bột kết tinh trắng, tan trong nước, giải phóng CO2 khi gặp acid.",
        "role": "Thành phần base của hệ sủi bọt (nguồn sinh khí CO2)"
      },
      {
        "name": "Natri carbonat",
        "characteristic": "Bột trắng, kiềm, tan trong nước.",
        "role": "Thành phần base hỗ trợ hệ sủi bọt và điều chỉnh phản ứng sinh khí"
      },
      {
        "name": "Natri saccarin",
        "characteristic": "Bột kết tinh trắng, vị ngọt gấp nhiều lần đường, dễ tan trong nước.",
        "role": "Tá dược tạo ngọt (chất làm ngọt nhân tạo)"
      },
      {
        "name": "Natri benzoat",
        "characteristic": "Bột hoặc hạt trắng, dễ tan trong nước.",
        "role": "Chất bảo quản"
      },
      {
        "name": "Sorbitol",
        "characteristic": "Bột kết tinh trắng, vị ngọt mát, tan tốt trong nước.",
        "role": "Tá dược độn và tạo ngọt (điều vị)"
      },
      {
        "name": "Dung dịch PVP 5%",
        "characteristic": "Dung dịch polyvinylpyrrolidon trong dung môi thích hợp, có độ dính.",
        "role": "Tá dược dính lỏng - tạo khối ẩm để xát hạt"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định",
        "params": {}
      },
      {
        "n": 2,
        "action": "grind",
        "label": "Nghiền các thành phần trong công thức, rây qua rây 250.",
        "purpose": "Làm mịn dược chất và tá dược theo yêu cầu.",
        "standard": "Các thành phần được nghiền mịn qua rây 250",
        "params": {
          "mesh": 250
        }
      },
      {
        "n": 3,
        "action": "weigh",
        "label": "Cân các thành phần theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 4,
        "action": "mix",
        "label": "Trộn bột kép các thành phần theo nguyên tắc đẳng lượng.",
        "purpose": "Tạo hỗn bột kép.",
        "standard": "Hỗn hợp bột kép đồng nhất.",
        "params": {}
      },
      {
        "n": 5,
        "action": "mix",
        "label": "Trộn hỗn hợp bột với dung dịch PVP, nhào vừa đủ ẩm.",
        "purpose": "Tạo khối ẩm.",
        "standard": "Khối ẩm đồng nhất.",
        "params": {}
      },
      {
        "n": 6,
        "action": "granulate",
        "label": "Xát hạt qua rây 600.",
        "purpose": "Tạo hạt cốm.",
        "standard": "Hạt thu được qua rây.",
        "params": {
          "mesh": 600
        }
      },
      {
        "n": 7,
        "action": "dry",
        "label": "Sấy hạt ở t° < 50°C tới hàm ẩm < 1%.",
        "purpose": "Làm khô cốm.",
        "standard": "Hạt cốm có hàm ẩm < 1%.",
        "params": {
          "tempMax": 50
        }
      },
      {
        "n": 8,
        "action": "sieve",
        "label": "Sửa cốm qua rây 800.",
        "purpose": "Làm đều cốm.",
        "standard": "Thuốc cốm màu trắng, không bị vón, hạt đồng đều.",
        "params": {
          "mesh": 800
        }
      },
      {
        "n": 9,
        "action": "fill-bottle",
        "label": "Đóng cốm thuốc vào túi chống ẩm có kích thước phù hợp.",
        "purpose": "Phân liều.",
        "standard": "Túi kín và có kích thước phù hợp.",
        "params": {}
      },
      {
        "n": 10,
        "action": "label",
        "label": "Dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 11,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định.",
        "params": {}
      }
    ],
    "indication": "Dùng để hạ sốt và giảm đau cho trẻ em. Khi dùng pha một gói cốm với khoảng 20ml nước đun sôi để nguội."
  },
  {
    "id": "thuoc-nang-cung-tetracyclin",
    "lesson": 11,
    "lessonTitle": "Bào chế thuốc nang cứng",
    "name": "Thuốc viên nang cứng tetracyclin",
    "short": "Nang cứng số 0 chứa tetracyclin hydroclorid",
    "icon": "💊",
    "form": "nang-cung",
    "method": "tron-dang-luong",
    "methodName": "Trộn đều theo nguyên tắc đẳng lượng, đóng nang số 0.",
    "finalVolume": 300,
    "finalUnit": "viên",
    "quality": [
      "Thuốc được đóng vào nang, đạt độ đồng đều khối lượng."
    ],
    "formula": [
      {
        "name": "Tetracyclin hydroclorid",
        "amount": "0,50",
        "unit": "g"
      },
      {
        "name": "Lycatab",
        "amount": "vđ",
        "unit": ""
      }
    ],
    "equipment": [
      "Máy đóng nang",
      "Máy xác định tỷ trọng (khối lượng riêng biểu kiến) thuốc bột",
      "Vỏ nang số 0",
      "Rây 250",
      "Rây 355",
      "Cối chày",
      "Cân kỹ thuật"
    ],
    "components": [
      {
        "name": "Tetracyclin hydroclorid",
        "characteristic": "Bột kết tinh màu vàng, tan trong nước, nhạy cảm với ánh sáng và ẩm.",
        "role": "Dược chất - kháng sinh phổ rộng nhóm tetracyclin"
      },
      {
        "name": "Lycatab",
        "characteristic": "Tinh bột biến tính dạng bột trắng, trơn chảy tốt, chịu nén.",
        "role": "Tá dược độn (pha loãng) và điều hòa sự chảy, làm đầy nang"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "grind",
        "label": "Nghiền tetracyclin hydroclorid thành bột mịn, rây qua rây 250.",
        "purpose": "Tạo bột tetracyclin hydroclorid có độ mịn đạt yêu cầu.",
        "standard": "Dược chất được nghiền mịn qua rây 250.",
        "params": {
          "mesh": 250
        }
      },
      {
        "n": 3,
        "action": "measure",
        "label": "Cho 1,0g tetracyclin HCl vào máy xác định khối lượng riêng biểu kiến, gõ 30 lần, đọc thể tích. Tính d(biểu kiến) = m/V",
        "purpose": "Xác định khối lượng riêng biểu kiến của tetracyclin HCl.",
        "standard": "d(biểu kiến) =",
        "params": {
          "reagent": "Tetracyclin hydroclorid",
          "target": 1,
          "unit": "g"
        }
      },
      {
        "n": 4,
        "action": "measure",
        "label": "Tính v(dược chất) = 0,5/ d(biểu kiến)",
        "purpose": "Xác định v(dược chất).",
        "standard": "v(dược chất)",
        "params": {}
      },
      {
        "n": 5,
        "action": "measure",
        "label": "Cho 1,0g lycatab vào máy xác định khối lượng riêng biểu kiến, gõ 30 lần, đọc thể tích. Tính d(tá dược) = m/V",
        "purpose": "Xác định khối lượng riêng biểu kiến của lycatab.",
        "standard": "d(tá dược) =",
        "params": {
          "reagent": "Lycatab",
          "target": 1,
          "unit": "g"
        }
      },
      {
        "n": 6,
        "action": "measure",
        "label": "Tính lượng tá dược m(tá dược) = (V(nang) – V(dược chất)) *d(tá dược)",
        "purpose": "Xác định khối lượng tá dược.",
        "standard": "m(tá dược) =",
        "params": {}
      },
      {
        "n": 7,
        "action": "weigh",
        "label": "Cân các nguyên liệu theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật.",
        "params": {}
      },
      {
        "n": 8,
        "action": "mix",
        "label": "Trộn tetracyclin hydroclorid và lycatab theo nguyên tắc đồng lượng.",
        "purpose": "Tạo hỗn hợp bột kép.",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 9,
        "action": "sieve",
        "label": "Rây hỗn hợp bột qua rây 355.",
        "purpose": "Làm đồng nhất khối bột.",
        "standard": "Hỗn hợp được trộn đều qua rây.",
        "params": {
          "mesh": 355
        }
      },
      {
        "n": 10,
        "action": "fill-capsule",
        "label": "Đóng nang theo 3 bước: mở vỏ, đóng thuốc, đậy nắp nang.",
        "purpose": "Đóng thuốc vào nang.",
        "standard": "Thuốc được đóng vào nang.",
        "params": {
          "capsuleSize": 0
        }
      },
      {
        "n": 11,
        "action": "inspect",
        "label": "Lau nang, kiểm tra độ đồng đều khối lượng.",
        "purpose": "Xác định đồng đều khối lượng.",
        "standard": "Đạt độ đồng đều khối lượng.",
        "params": {}
      },
      {
        "n": 12,
        "action": "label",
        "label": "Đóng lọ, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định.",
        "params": {}
      },
      {
        "n": 13,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch đúng quy định",
        "params": {}
      }
    ],
    "indication": "Điều trị loét dạ dày do nhiễm Helico bacter pylori."
  },
  {
    "id": "thuoc-vien-nen-paracetamol",
    "lesson": 12,
    "lessonTitle": "Bào chế thuốc viên nén",
    "name": "Thuốc viên nén paracetamol",
    "short": "Viên nén paracetamol 325mg xát hạt ướt, dập viên",
    "icon": "⚪",
    "form": "vien-nen",
    "method": "xat-hat-uot",
    "methodName": "Phương pháp xát hạt ướt.",
    "finalVolume": 50,
    "finalUnit": "viên",
    "quality": [
      "Viên màu trắng, nhẵn, bóng, đạt độ cứng"
    ],
    "formula": [
      {
        "name": "Paracetamol",
        "amount": "325,0",
        "unit": "mg"
      },
      {
        "name": "Cellulose vi tinh thể (Avicel PH 102)",
        "amount": "80,0",
        "unit": "mg"
      },
      {
        "name": "Tinh bột mì",
        "amount": "80,0",
        "unit": "mg"
      },
      {
        "name": "Hồ tinh bột sắn 10%",
        "amount": "vđ",
        "unit": ""
      },
      {
        "name": "Talc",
        "amount": "12,5",
        "unit": "mg"
      },
      {
        "name": "Magnesi stearat",
        "amount": "1,5",
        "unit": "mg"
      }
    ],
    "equipment": [
      "Máy dập viên (cối chày Ø12mm)",
      "Máy đo độ cứng",
      "Rây 180",
      "Rây 250",
      "Rây 800",
      "Rây 1000",
      "Tủ sấy",
      "Cân xác định hàm ẩm",
      "Cối chày"
    ],
    "components": [
      {
        "name": "Paracetamol",
        "characteristic": "Bột kết tinh trắng, không mùi, chịu nén kém, dễ dính chày cối.",
        "role": "Dược chất - hạ sốt, giảm đau"
      },
      {
        "name": "Cellulose vi tinh thể (Avicel PH 102)",
        "characteristic": "Bột trắng, trơn chảy tốt, khả năng chịu nén và liên kết cao.",
        "role": "Tá dược độn kiêm dính khô, cải thiện độ chịu nén của viên"
      },
      {
        "name": "Tinh bột mì",
        "characteristic": "Bột trắng mịn, hút ẩm, trương nở trong nước.",
        "role": "Tá dược độn kiêm tá dược rã"
      },
      {
        "name": "Hồ tinh bột sắn 10%",
        "characteristic": "Dịch hồ tinh bột sánh, có độ dính cao.",
        "role": "Tá dược dính lỏng - tạo khối ẩm để xát hạt"
      },
      {
        "name": "Talc",
        "characteristic": "Bột mịn màu trắng, trơn nhờn, không tan trong nước.",
        "role": "Tá dược trơn - điều hòa sự chảy, chống dính"
      },
      {
        "name": "Magnesi stearat",
        "characteristic": "Bột mịn nhẹ màu trắng, sờ nhờn, kỵ nước.",
        "role": "Tá dược trơn bôi trơn - chống ma sát chày cối khi dập viên"
      }
    ],
    "steps": [
      {
        "n": 1,
        "action": "sterilize",
        "label": "Tiệt khuẩn dụng cụ.",
        "purpose": "Vô khuẩn dụng cụ.",
        "standard": "Dụng cụ được tiệt khuẩn đúng quy định.",
        "params": {}
      },
      {
        "n": 2,
        "action": "grind",
        "label": "Nghiền mịn paracetamol, tinh bột mì, rây qua rây 250.",
        "purpose": "Làm mịn dược chất và tá dược độn.",
        "standard": "Các thành phần qua được rây 250.",
        "params": {
          "mesh": 250
        }
      },
      {
        "n": 3,
        "action": "grind",
        "label": "Nghiền mịn talc và magnesi stearat rây qua rây 180.",
        "purpose": "Làm mịn tá dược trơn.",
        "standard": "Các thành phần qua được rây 180.",
        "params": {
          "mesh": 180
        }
      },
      {
        "n": 4,
        "action": "weigh",
        "label": "Cân các nguyên liệu theo công thức.",
        "purpose": "Chuẩn bị đủ các thành phần.",
        "standard": "Các thành phần được cân chính xác, đúng kỹ thuật",
        "params": {}
      },
      {
        "n": 5,
        "action": "mix",
        "label": "Trộn bột kép paracetamol, tinh bột mì, cellulose vi tinh thể theo nguyên tắc đẳng lượng trong cối.",
        "purpose": "Tạo bột kép.",
        "standard": "Hỗn hợp bột kép đồng nhất.",
        "params": {}
      },
      {
        "n": 6,
        "action": "mix",
        "label": "Thêm từ từ hồ tinh bột 10% vào khối bột trên, nhào cho vừa đủ ẩm.",
        "purpose": "Tạo khối ẩm.",
        "standard": "Khối ẩm đồng nhất.",
        "params": {}
      },
      {
        "n": 7,
        "action": "granulate",
        "label": "Xát hạt qua rây 1000, sấy hạt ở 60-70°C cho tới khi hàm ẩm 2-3%.",
        "purpose": "Tạo hạt cốm có hàm ẩm đạt yêu cầu.",
        "standard": "Hạt cốm có hàm ẩm từ 2-3%.",
        "params": {
          "mesh": 1000,
          "tempMin": 60,
          "tempMax": 70
        }
      },
      {
        "n": 8,
        "action": "sieve",
        "label": "Sửa cốm qua rây 800.",
        "purpose": "Làm đều cốm.",
        "standard": "Cốm được làm đều qua rây 800.",
        "params": {
          "mesh": 800
        }
      },
      {
        "n": 9,
        "action": "mix",
        "label": "Trộn cốm với tá dược trơn.",
        "purpose": "Chống dính, chống ma sát khi rập viên, viên thuốc bóng nhắn",
        "standard": "Hỗn hợp đồng nhất.",
        "params": {}
      },
      {
        "n": 10,
        "action": "press",
        "label": "Dập viên với bộ cối chày đường kính 12mm, lực gây vỡ viên 8-10kP.",
        "purpose": "Tạo hình viên thuốc.",
        "standard": "Viên màu trắng, nhẵn, bóng, đạt độ cứng.",
        "params": {
          "diameter": "12mm",
          "hardness": "8-10kP"
        }
      },
      {
        "n": 11,
        "action": "inspect",
        "label": "Kiểm tra khối lượng trung bình viên.",
        "purpose": "Xác định độ đồng đều khối lượng.",
        "standard": "Đạt độ đồng đều khối lượng",
        "params": {}
      },
      {
        "n": 12,
        "action": "label",
        "label": "Đóng lọ, dán nhãn đúng quy chế.",
        "purpose": "Hoàn chỉnh sản phẩm.",
        "standard": "Lọ dán nhãn đúng quy định",
        "params": {}
      },
      {
        "n": 13,
        "action": "clean",
        "label": "Vệ sinh dụng cụ.",
        "purpose": "Làm sạch dụng cụ.",
        "standard": "Dụng cụ được rửa sạch.",
        "params": {}
      }
    ],
    "indication": "Dùng để hạ sốt và giảm đau."
  }
];
