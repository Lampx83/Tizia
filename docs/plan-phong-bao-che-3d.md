# Kế hoạch nâng cấp Phòng Bào chế 3D — bám giáo trình DUOC 04

> Nguồn: *Giáo trình Thực hành Bào chế* (CĐ Y tế Hà Nội, mã mô đun DUOC 04, 2022) — 12 bài thực hành.
> Phạm vi đã chốt với chủ đầu tư: **mô phỏng 3D đầy đủ** cho **cả 12 bài**.
> Ngày lập: 2026-07-08.

---

## A. Mục tiêu

Biến `compounding-lab.html` từ "bàn pha loãng dung dịch" (hiện chỉ 4 thao tác: cân → đong → đổ → đóng chai) thành **một phòng bào chế mô phỏng đúng 12 dạng thuốc** của giáo trình, sao cho mỗi bài tái hiện được **đúng phương pháp bào chế**, **đúng quy trình các bước**, kèm 2 trục sư phạm của giáo trình: *phân tích vai trò thành phần* và *kiểm tra yêu cầu chất lượng thành phẩm*.

Nguyên tắc:
1. **Bám giáo trình** — công thức, phương pháp, quy trình, tiêu chuẩn lấy nguyên từ tài liệu; không tự chế công thức.
2. **Content ở DB** — mọi công thức/quy trình nạp qua `/api/content/lab-recipes`, sửa nóng qua admin (giữ đúng kiến trúc hiện có, không hardcode vào .html).
3. **Tái sử dụng engine** — mở rộng "step engine" hiện có thay vì viết lại; mỗi thao tác mới là một "trạm" (station) trong cùng cảnh Three.js.

---

## B. Hiện trạng (đối chiếu)

| Thành phần | Hiện tại |
|---|---|
| Hub | `public/bao-che-hub.html` — 8 đơn, trỏ `compounding-lab.html?recipe=` |
| Cảnh 3D | `public/compounding-lab.html` (~4500 dòng, Three.js, multiplayer, chấm điểm) |
| Dữ liệu | `/api/content/lab-recipes` + `lab-reagents` (seed `public/js/lab-recipes.js`: **30 recipe, ~55 reagent**) |
| Backend | `server/contexts/content/index.js` (GET công khai, PUT/DELETE admin); seed `server/scripts/seed-content.mjs` |
| Action engine | Chỉ 4: `place-on-balance`, `pour`, `transfer`, `bottle` |

**Khoảng trống chính:** 30 recipe hiện có — kể cả các recipe *đặt tên* là "viên đặt", "cream", "cốm", "hỗn dịch" — đều quy về đúng vòng lặp cân/đong/đổ/đóng chai. Không có: đun cách thủy, nghiền cối chày, nhũ hóa, lọc màng, tiệt khuẩn/hấp, hàn ống, đun chảy tá dược, đổ khuôn, rây, tạo hạt, đóng nang, dập viên. Cũng thiếu hoàn toàn phần *phân tích thành phần* và *kiểm tra chất lượng*.

---

## C. Bản đồ Phương pháp → Trạm thao tác → Bài

Giáo trình dùng 8 phương pháp bào chế. Quy về **10 trạm thao tác 3D mới** (bổ sung cho 4 action cũ vẫn giữ):

| Phương pháp (giáo trình) | Bài áp dụng | Trạm/Action mới cần dựng |
|---|---|---|
| Keo ướt (nhũ tương) | 1 | `heat` (nồi cách thủy 60–70°C) + `emulsify` (máy đồng nhất hóa) |
| Nhũ hóa trực tiếp (mỡ nhũ tương) | 5 (Mỡ 2) | `melt` + `emulsify` |
| Phân tán (hỗn dịch) | 2 | `grind` (cối chày) + `disperse` |
| Hòa tan hoàn toàn (dung dịch, siro, elixir, nhỏ mắt, tiêm) | 3,4,7,8 | `dissolve` (khuấy tan, có thể nóng) + `filter` (lọc màng) |
| — vô khuẩn (tiêm, nhỏ mắt) | 3,4 | `sterilize` (hấp/tiệt khuẩn) + `seal-ampoule` (hàn ống) + `inspect-clarity` (soi độ trong) |
| Đun chảy đổ khuôn (thuốc đặt) | 6 | `melt` (đun chảy tá dược) + `mold` (đổ khuôn + làm nguội) |
| Trộn đều đơn giản / đẳng lượng (bột) | 10 | `sieve` (rây) + `mix-geometric` (trộn đẳng lượng) |
| Xát hạt ướt (cốm, viên nén, nang) | 10,11,12 | `granulate` (nhào–xát hạt) + `dry` (sấy) + `press` (dập viên) / `fill-capsule` (đóng nang) |

**12 bài ↔ trạm:**
1. Nhũ tương — heat, emulsify, bottle
2. Hỗn dịch — grind, disperse, bottle (nhãn "lắc trước khi dùng")
3. Thuốc tiêm — dissolve, filter, sterilize, seal-ampoule, inspect-clarity
4. Thuốc nhỏ mắt — dissolve, filter, sterilize (nhỏ giọt vô khuẩn)
5. Thuốc mỡ 2 — melt, emulsify, đóng tuýp
6. Thuốc đặt — melt, mold, làm nguội, tháo khuôn
7. Dung dịch — dissolve, filter, bottle
8. Siro–Elixir — dissolve (nóng), filter, bottle
9. Thuốc mỡ 1 — melt, levigate (nghiền mịn trên phiến kính), đóng tuýp
10. Bột–Cốm — sieve, mix-geometric, granulate, dry
11. Nang cứng — sieve, mix, fill-capsule
12. Viên nén — granulate, dry, press

---

## D. Kiến trúc dữ liệu — Recipe schema v2

Mở rộng schema recipe (giữ tương thích ngược với 30 recipe cũ — trường mới đều optional):

```js
{
  id, name, short, icon, level, desc, finalVolume, finalUnit, finalColor, indication,
  lesson: 1,                       // MỚI: số bài trong giáo trình
  method: 'keo-uot',               // MỚI: mã phương pháp bào chế
  formula: [                       // MỚI: công thức chuẩn (hiển thị nguyên văn giáo trình)
    { name: 'Dầu parafin', amount: '35,00', unit: 'g' }, ...
  ],
  components: [                    // MỚI: phân tích vai trò (trục sư phạm 1)
    { name: 'Tween 80', role: 'Chất nhũ hóa (HĐBM ưa nước)' }, ...
  ],
  quality: [                      // MỚI: tiêu chuẩn thành phẩm (trục sư phạm 2)
    'Nhũ tương màu trắng đục như sữa', 'Đồng nhất, không tách lớp', ...
  ],
  steps: [
    // Action cũ giữ nguyên + action mới, mỗi step thêm:
    { action: 'heat', target: 65, tolerance: 5, unit: '°C',
      label: 'Đun pha dầu cách thủy tới 60–70°C',
      purpose: 'Làm nóng pha dầu',           // MỚI: cột "ý nghĩa"
      standard: 'Nhiệt độ khoảng 60–70°C' }, // MỚI: cột "tiêu chuẩn đạt được"
    ...
  ],
  distractors: [...]
}
```

Reagents/dụng cụ mới cần thêm vào `REAGENTS` + danh mục thiết bị: nồi đun cách thủy, cối chày, máy đồng nhất hóa, màng lọc + phễu Buchner, nồi hấp/autoclave, ống tiêm + máy hàn, khuôn thuốc đặt, phiến kính (levigation), rây, máy trộn, tủ sấy, máy đóng nang, máy dập viên.

---

## E. Engine — thiết kế station/action

Trong `compounding-lab.html`, phần `renderStep()` + vòng xử lý click hiện phân nhánh theo `s.action`. Chuẩn hóa thành **bảng handler** để dễ mở rộng:

- Mỗi action mới = 1 module: `{ setup(scene), onEnter(state), onInteract(target), meter(state), isComplete(state) }`.
- Điều kiện đạt (gate) đa dạng: nhiệt độ (`heat`), thời gian giữ (`grind`, `emulsify`), số lần thao tác, trạng thái vô khuẩn (`sterilize` phải chạy trước khi `bottle` với recipe vô khuẩn), thứ tự (trộn đẳng lượng phải từ lượng nhỏ→lớn).
- Thanh tiến độ (`meter`) tái dùng UI hiện có, chỉ đổi nhãn/đơn vị (°C, phút, số vòng…).
- Vi phạm quy trình (VD đóng chai thuốc tiêm khi chưa tiệt khuẩn/lọc) → trừ điểm + toast cảnh báo, đúng tinh thần "tiêu chuẩn đạt được".

---

## F. Trục sư phạm (đặc thù giáo trình, engine hiện KHÔNG có)

1. **Phân tích công thức (trước khi pha):** màn kéo–thả ghép *thành phần ↔ vai trò* (dữ liệu từ `components[]`). Bắt buộc đạt mới mở khóa thao tác — phản ánh mục tiêu "phân tích được vai trò các thành phần".
2. **Kiểm tra chất lượng (sau khi pha):** bước cuối "soi thành phẩm" — người học đối chiếu `quality[]` (màu, độ trong, đồng nhất, thể chất…) qua checklist/quan sát 3D; tính vào điểm nộp bài.

---

## G. Hub & điều hướng

- `bao-che-hub.html`: đổi từ "8 đơn" → **12 bài đúng thứ tự giáo trình**, mỗi card mở tài liệu bài (mục tiêu, công thức, phương pháp, quy trình) cạnh nút "Vào phòng 3D".
- Giữ multiplayer + chấm điểm hiện có.

---

## H. Lộ trình & mốc bàn giao

**Đợt 0 — Nền dữ liệu (1–2 ngày).** Số hóa trọn 12 bài từ .docx sang schema v2 (formula/components/quality/steps + purpose/standard). Seed DB + kiểm định nội dung bằng sub-agent (bám memory `feedback_content_accuracy`). Chưa cần engine mới — dùng lại 4 action cũ cho các bài dạng lỏng để có bản chạy sớm.

**Đợt 1 — Refactor engine sang bảng handler (2–3 ngày).** Tách action ra module, không đổi hành vi 30 recipe cũ (regression). Đây là điều kiện tiên quyết cho mọi trạm mới.

**Đợt 2 — Nhóm LỎNG hoàn thiện: bài 1,2,7,8 (3–4 ngày).** Trạm `heat`, `grind/disperse`, `dissolve`, `filter`, `emulsify`. Có sản phẩm demo 4 bài chạy 3D thật.

**Đợt 3 — Nhóm VÔ KHUẨN: bài 3,4 (3–4 ngày).** Trạm `sterilize`, `seal-ampoule`, `inspect-clarity`; cơ chế gate vô khuẩn.

**Đợt 4 — Nhóm BÁN RẮN: bài 5,6,9 (3–4 ngày).** Trạm `melt`, `mold`, `levigate`; đóng tuýp.

**Đợt 5 — Nhóm RẮN: bài 10,11,12 (4–5 ngày).** Trạm `sieve`, `mix-geometric`, `granulate`, `dry`, `fill-capsule`, `press`.

**Đợt 6 — Trục sư phạm + Hub + đánh bóng (2–3 ngày).** Màn phân tích thành phần, kiểm tra chất lượng, đổi hub 12 bài, rubric điểm, verify từng bài.

*Tổng ước tính ~3–4 tuần công.* Sau mỗi đợt đều có bản chạy được để chủ đầu tư duyệt (làm theo chu kỳ tự rà soát — memory `feedback_tizia_workstyle`).

---

## I. Asset & kỹ thuật 3D

- Ưu tiên dựng bằng primitive Three.js + shader sẵn có (nồi cách thủy, cối chày, khuôn, máy dập) để tránh phụ thuộc model ngoài; three.js đã vendor sẵn (memo migration Next.js).
- Animation: đun (hạt nhiệt + hơi + đổi màu chất lỏng), nghiền (chuyển động chày + bột mịn dần), nhũ hóa (2 pha trộn → đục), đổ khuôn (chất lỏng đông đặc), dập viên (piston + viên rơi).
- Hiệu năng: gộp geometry, tái dùng vật liệu; test mobile (memo `bao-che-hub` nêu hỗ trợ mobile/VR).

---

## J. Rủi ro & điểm cần quyết tiếp

1. **Ảnh/khoa học chính xác:** một số quy trình (hàn ống tiêm, dập viên) cần đúng tuần tự an toàn — sẽ nhờ sub-agent đối chiếu Dược điển trước khi seed.
2. **Độ lớn file `compounding-lab.html`** (đã 4500 dòng) — Đợt 1 nên tách JS ra `public/js/pharmacy/compounding/` để dễ bảo trì.
3. **Cache-bust `?v=`** khi đổi asset — bám bài học memo `project_pharmacy_3d` (đồng bộ 4 nơi).
4. **Cần chốt:** dùng lại phòng multiplayer chung cho tất cả bài, hay tách phòng theo bài? (đề xuất: chung, lọc theo recipe).

---

## K. Việc làm ngay khi được duyệt

1. Trích trọn 12 bài .docx → JSON schema v2 (Đợt 0).
2. Sub-agent kiểm định nội dung khoa học.
3. Refactor engine sang bảng handler (Đợt 1) + tách JS.
4. Demo Đợt 2 (4 bài lỏng chạy 3D) để chủ đầu tư duyệt cơ chế trước khi nhân rộng.
