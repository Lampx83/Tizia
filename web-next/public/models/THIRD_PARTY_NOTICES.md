# Ghi chú bản quyền bên thứ 3 — model nhận diện biển báo

## VTSR YOLOv8n model

Tizia dùng nguyên vẹn artifact `vtsr_int8.onnx` từ
[`liamxdev/vtsr`](https://huggingface.co/liamxdev/vtsr) trên HuggingFace,
đổi tên thành `vtsr-yolov8n-int8.onnx`. Copy qua từ dự án mã nguồn mở
[VNSign](https://github.com/) (`public/models/vtsr-yolov8n-int8.onnx`, đã
verify SHA-256 khớp).

- Kiến trúc: YOLOv8n
- 56 lớp biển báo giao thông Việt Nam (xem `web-next/lib/vtsrLabels.ts`)
- **License model gốc: AGPL-3.0**
- SHA-256: `08586B55E8761BA257035A4C1FCD12AEEC5AE5206EB737F4FE16029E64C01854`

Model huấn luyện từ Vietnam Traffic Sign Dataset v3 — theo model card gốc,
metadata dataset theo license CC BY 4.0.

**⚠️ Lưu ý pháp lý:** AGPL-3.0 có điều khoản "network use" — dịch vụ mạng
tương tác với phần mềm AGPL phải cung cấp mã nguồn tương ứng cho người dùng
khi được yêu cầu. Quyết định nhúng model này vào tizia.vn (sản phẩm public)
đã được xác nhận bởi chủ dự án ngày 2026-08-15, chấp nhận rủi ro tuân thủ
giấy phép nói trên. Code logic nhận diện (`web-next/lib/yoloDetection.ts`,
`web-next/lib/speedLimitRecognition.ts`, `web-next/components/CameraCapture.tsx`)
cũng port từ VNSign.

## Xử lý ảnh biển hạn chế tốc độ

`web-next/lib/speedLimitRecognition.ts` — thuật toán tự viết (nhận diện hình
tròn viền đỏ + so khớp chữ số bằng template), không phụ thuộc thư viện ngoài.

## ONNX Runtime Web

Chạy inference trên trình duyệt qua
[`onnxruntime-web`](https://onnxruntime.ai/docs/tutorials/web/) (Microsoft),
license MIT.
