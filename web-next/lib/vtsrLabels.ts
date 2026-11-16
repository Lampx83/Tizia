export interface VtsrLabel {
  modelCode: string;
  description: string;
  catalogCode: string;
}

// IMPORTANT: this order must stay aligned with the 56 output channels of
// public/models/vtsr-yolov8n-int8.onnx.
export const VTSR_LABELS: readonly VtsrLabel[] = [
  { modelCode: 'DP-135', description: 'Hết tất cả các lệnh cấm', catalogCode: 'DP.135' },
  { modelCode: 'P-102', description: 'Cấm đi ngược chiều', catalogCode: 'P.102' },
  { modelCode: 'P-103a', description: 'Cấm xe ô tô', catalogCode: 'P.103a' },
  { modelCode: 'P-103b', description: 'Cấm xe ô tô rẽ phải', catalogCode: 'P.103b' },
  { modelCode: 'P-103c', description: 'Cấm xe ô tô rẽ trái', catalogCode: 'P.103c' },
  { modelCode: 'P-104', description: 'Cấm xe máy', catalogCode: 'P.104' },
  { modelCode: 'P-106a', description: 'Cấm xe ô tô tải', catalogCode: 'P.106a' },
  {
    modelCode: 'P-106b',
    description: 'Cấm xe ô tô tải có khối lượng chuyên chở lớn hơn quy định',
    catalogCode: 'P.106b',
  },
  { modelCode: 'P-107a', description: 'Cấm xe ô tô khách', catalogCode: 'P.107a' },
  { modelCode: 'P-112', description: 'Cấm người đi bộ', catalogCode: 'P.112' },
  { modelCode: 'P-115', description: 'Hạn chế tải trọng toàn bộ xe', catalogCode: 'P.115' },
  { modelCode: 'P-117', description: 'Hạn chế chiều cao', catalogCode: 'P.117' },
  { modelCode: 'P-123a', description: 'Cấm rẽ trái', catalogCode: 'P.123a' },
  { modelCode: 'P-123b', description: 'Cấm rẽ phải', catalogCode: 'P.123b' },
  { modelCode: 'P-124a', description: 'Cấm quay đầu xe', catalogCode: 'P.124a' },
  { modelCode: 'P-124b', description: 'Cấm ô tô quay đầu xe', catalogCode: 'P.124b' },
  { modelCode: 'P-124c', description: 'Cấm rẽ trái và quay đầu xe', catalogCode: 'P.124c' },
  { modelCode: 'P-127', description: 'Tốc độ tối đa cho phép', catalogCode: 'P.127' },
  { modelCode: 'P-128', description: 'Cấm bóp còi', catalogCode: 'P.128' },
  { modelCode: 'P-130', description: 'Cấm dừng xe và đỗ xe', catalogCode: 'P.130' },
  { modelCode: 'P-131a', description: 'Cấm đỗ xe', catalogCode: 'P.131a' },
  { modelCode: 'P-137', description: 'Cấm rẽ trái, rẽ phải', catalogCode: 'P.137' },
  {
    modelCode: 'P-245a',
    description: 'Đi chậm (mã biển cũ)',
    catalogCode: 'W.245a',
  },
  { modelCode: 'R-301c', description: 'Các xe chỉ được rẽ trái', catalogCode: 'R.301c' },
  { modelCode: 'R-301d', description: 'Các xe chỉ được rẽ phải', catalogCode: 'R.301d' },
  {
    modelCode: 'R-301e',
    description: 'Các xe chỉ được rẽ trái và đi thẳng',
    catalogCode: 'R.301e',
  },
  {
    modelCode: 'R-302a',
    description: 'Hướng phải đi vòng chướng ngại vật sang phải',
    catalogCode: 'R.302a',
  },
  {
    modelCode: 'R-302b',
    description: 'Hướng phải đi vòng chướng ngại vật sang trái',
    catalogCode: 'R.302b',
  },
  {
    modelCode: 'R-303',
    description: 'Nơi giao nhau chạy theo vòng xuyến',
    catalogCode: 'R.303',
  },
  { modelCode: 'R-407a', description: 'Đường một chiều', catalogCode: 'I.407a' },
  { modelCode: 'R-409', description: 'Chỗ quay xe', catalogCode: 'I.409' },
  { modelCode: 'R-425', description: 'Bệnh viện', catalogCode: 'I.425' },
  { modelCode: 'R-434', description: 'Bến xe buýt', catalogCode: 'I.434a' },
  {
    modelCode: 'S-509a',
    description: 'Chiều cao an toàn (biển phụ thuyết minh)',
    catalogCode: 'S.509a–S.509b',
  },
  {
    modelCode: 'W-201a',
    description: 'Chỗ ngoặt nguy hiểm vòng bên trái',
    catalogCode: 'W.201a',
  },
  {
    modelCode: 'W-201b',
    description: 'Chỗ ngoặt nguy hiểm vòng bên phải',
    catalogCode: 'W.201b',
  },
  {
    modelCode: 'W-202a',
    description: 'Nhiều chỗ ngoặt nguy hiểm liên tiếp vòng bên trái',
    catalogCode: 'W.202a',
  },
  {
    modelCode: 'W-202b',
    description: 'Nhiều chỗ ngoặt nguy hiểm liên tiếp vòng bên phải',
    catalogCode: 'W.202b',
  },
  {
    modelCode: 'W-203b',
    description: 'Đường bị thu hẹp về phía trái',
    catalogCode: 'W.203b',
  },
  {
    modelCode: 'W-203c',
    description: 'Đường bị thu hẹp về phía phải',
    catalogCode: 'W.203c',
  },
  {
    modelCode: 'W-205a',
    description: 'Đường giao nhau cùng cấp phía bên trái',
    catalogCode: 'W.205a',
  },
  {
    modelCode: 'W-205b',
    description: 'Đường giao nhau cùng cấp phía bên phải',
    catalogCode: 'W.205b',
  },
  {
    modelCode: 'W-205d',
    description: 'Đường giao nhau cùng cấp có dải trung tâm',
    catalogCode: 'W.205d',
  },
  {
    modelCode: 'W-207a',
    description: 'Giao nhau với đường không ưu tiên (phía trước)',
    catalogCode: 'W.207a',
  },
  {
    modelCode: 'W-207b',
    description: 'Giao nhau với đường không ưu tiên (phía bên phải)',
    catalogCode: 'W.207b',
  },
  {
    modelCode: 'W-207c',
    description: 'Giao nhau với đường không ưu tiên (phía bên trái)',
    catalogCode: 'W.207c',
  },
  {
    modelCode: 'W-208',
    description: 'Giao nhau với đường ưu tiên',
    catalogCode: 'W.208',
  },
  {
    modelCode: 'W-209',
    description: 'Giao nhau có tín hiệu đèn',
    catalogCode: 'W.209',
  },
  {
    modelCode: 'W-210',
    description: 'Giao nhau với đường sắt có rào chắn',
    catalogCode: 'W.210',
  },
  { modelCode: 'W-219', description: 'Dốc xuống nguy hiểm', catalogCode: 'W.219' },
  {
    modelCode: 'W-224',
    description: 'Đường người đi bộ cắt ngang',
    catalogCode: 'W.224',
  },
  { modelCode: 'W-225', description: 'Trẻ em', catalogCode: 'W.225' },
  { modelCode: 'W-227', description: 'Công trường', catalogCode: 'W.227' },
  { modelCode: 'W-233', description: 'Nguy hiểm khác', catalogCode: 'W.233' },
  { modelCode: 'W-235', description: 'Đường đôi', catalogCode: 'W.235' },
  { modelCode: 'W-245a', description: 'Đi chậm', catalogCode: 'W.245a' },
] as const;

