# Audit tương phản sáng/tối — 2026-07-20

Công cụ: script đo tương phản WCAG mọi text node (pha trộn alpha nhiều lớp nền,
bỏ chữ gradient-clip, bỏ phần tử nền gradient), chạy qua iframe từng trang trên
dev server. Ngưỡng flag: ratio < 2.2 (chuẩn AA cần ≥ 4.5 cho chữ thường).

## Kết quả

### Trang allowlist (theo lựa chọn sáng/tối) — ✅ SẠCH
13 trang × 2 theme = 0 lỗi sau commit `6d2fe7f` (đã sửa: --primary hai biến
thể, pricing back/save/giá, badge SRS /space).

### Trang trong (ép nền tối) — 87 trang quét, 63 sạch, 24 flag
Lưu ý: các lỗi này CÓ SẴN TỪ TRƯỚC (body vốn luôn tối trước khi có hệ theme) —
không phải hồi quy của hệ theme mới.

**Nặng (chữ gần như vô hình, cần sửa sớm):**
| Trang | Số lỗi | Ratio xấu nhất | Chẩn đoán |
|---|---|---|---|
| /compounding-lab | 43 | 1.03 | ✅ ĐÃ SỬA: panel trắng `#level-modal .lm-card` không chốt màu chữ → thừa kế chữ sáng của trang tối. Fix: thêm `color:#1f2937` vào panel. **Mẫu fix cho các trang cùng bệnh.** |
| /L2-1-titration | 32 | 1.01 | Panel theo dõi (pH, NaOH…) — nghi cùng bệnh panel-không-chốt-màu |
| /PS01-er | 32 | 1.05 | Panel bệnh nhân/triệu chứng (`.symptom`) |
| /PS15-gmp-factory | 25 | 1.01 | Sơ đồ nhà máy, nhãn ISO |
| /lab-hoa-ao | 22 | 1.25 | Nhiệm vụ/phản ứng |
| /3d-shelf | 10 | 1.10 | `wc-title/wc-intro` — welcome card (pattern chung với /metaverse) |
| /sap-xep-hub | 10 | 1.90 | Sao ★★★ `.empty` xám tối trên nền tối |
| /code-quest | 9 | 1.11 | Nhãn lệnh (Đi tiến/Xoay…) |
| /metaverse | 8 | 1.10 | `wc-title/wc-intro` (cùng /3d-shelf) |

**Vừa (vài phần tử):**
- /math-fun (5, r1.29) — "Lớp 2", `.tag`, `.chip`
- /pet-tri-thuc (4, r1.57) — `.ptt-val`
- /devices (4, r2.15) — badge "⚠️ Một phần"
- /nha-thuoc-3d (3) — nút "Gửi" chat (`.btn.primary` dùng `var(--accent)` NGOÀI scope định nghĩa `--accent` cục bộ → nền transparent, r1.01); `scene-loading-title`
- Nhóm lop2 (6 trang, r1.22, CÙNG pattern `.intro`/tương tự): lop2-am-nhac,
  lop2-anh-memory, lop2-dao-duc, lop2-phan-loai-rac, lop2-the-thao, lop2-ghep-van
- /pixel-art-studio (2, r1.22), /history-vn (1, r1.67 `.hv-subj`),
  /do-chu-ghep-van (1, r2.19 `.back`), /negotiation (1, r2.15), /ban-do-vn (1, emoji 🇻🇳)

**Flag giả đã xác nhận:** panel nền gradient (vd modal hướng dẫn giấy vàng
compounding-lab) — audit không đọc background-image; nhìn mắt OK.

## Cách chạy lại audit
Mở trang bất kỳ trên dev (3200), paste helper `__auditDoc/__auditPages` (xem
transcript phiên 2026-07-20 hoặc viết lại từ mô tả trên) rồi
`__auditPages(['/trang1','/trang2'])`.
