// Port từ dự án mã nguồn mở VNSign (https://github.com/) — module nhận diện biển
// báo bằng model vtsr-yolov8n-int8.onnx (YOLOv8n, 56 lớp, license model gốc
// AGPL-3.0 — xem ghi chú ở public/models/THIRD_PARTY_NOTICES.md). Giữ nguyên
// toàn bộ logic hậu xử lý (ngưỡng theo từng lớp, NMS, quét chi tiết ảnh lớn,
// xác minh biển tốc độ) — đây là phần đã được tinh chỉnh kỹ theo dữ liệu ảnh
// thực tế, KHÔNG viết lại. Chỉ thay nguồn tra cứu danh mục biển (TRAFFIC_SIGNS
// → tham số `catalog` lấy từ collection 'gplx-bien-bao') và định nghĩa type
// Detection cục bộ thay vì import từ '@/types' của VNSign.
import type { InferenceSession, Tensor as OrtTensor } from 'onnxruntime-web';
import { VTSR_LABELS } from './vtsrLabels';
import { analyzeSpeedLimitCandidate } from './speedLimitRecognition';

export interface Detection {
  bbox: [number, number, number, number];
  class: string;
  code?: string;
  confidence: number;
  signId?: string;
  speedLimitKmh?: number;
}

// Shape tối thiểu cần để tra cứu tên biển từ collection 'gplx-bien-bao'.
export interface CatalogLookupItem {
  id: string;
  code: string;
  name: string;
}

export interface ProcessedImage {
  canvas: HTMLCanvasElement;
  detections: Detection[];
  width: number;
  height: number;
}

interface LetterboxTransform {
  scale: number;
  padX: number;
  padY: number;
  sourceX: number;
  sourceY: number;
}

interface RawDetection {
  bbox: [number, number, number, number];
  classIndex: number;
  confidence: number;
  requiresSpeedVerification?: boolean;
  verifiedSpeedLimit?: boolean;
  speedLimitKmh?: number;
}

interface SourceRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RuntimeSession {
  ort: typeof import('onnxruntime-web/wasm');
  session: InferenceSession;
}

export interface DetectionProgress {
  stage: 'full' | 'detail';
  current: number;
  total: number;
}

export interface DetectionOptions {
  maxDetections?: number;
  onProgress?: (progress: DetectionProgress) => void;
  detailedScan?: boolean;
}

const MODEL_URL = '/models/vtsr-yolov8n-int8.onnx?v=20260815-tizia-port';
export const DETECTION_MODEL_VERSION = 'vtsr-yolov8n-int8-tizia-port-20260815';
const MODEL_INPUT_SIZE = 640;
const MODEL_CHANNELS = 4 + VTSR_LABELS.length;
// Ngưỡng 0.25 trước đây cho nhiều false positive trên ảnh đường phố đông đúc.
// Chỉ giữ dự đoán model tự tin — bỏ sót 1 biển yếu còn an toàn hơn gọi sai tên.
const CONFIDENCE_THRESHOLD = 0.42;
const SPEED_LIMIT_CLASS_INDEX = VTSR_LABELS.findIndex(
  (label) => label.catalogCode === 'P.127',
);
const SPEED_LIMIT_CANDIDATE_THRESHOLD = 0.2;
const MAX_SPEED_LIMIT_CANDIDATES_PER_REGION = 12;
const CLASS_CONFIDENCE_THRESHOLDS: Readonly<Record<string, number>> = {
  // Các lớp dễ nhầm nhất trên ảnh thực tế — cần độ tự tin cao hơn.
  'P.115': 0.5,
  'P.117': 0.5,
  'P.127': 0.46,
  'W.245a': 0.6,
};
const SPEED_LIMIT_CONFUSER_CODES = new Set([
  'P.106b',
  'P.115',
  'P.117',
  'P.124a',
  'P.124b',
  'P.124c',
  'P.128',
  'P.130',
  'P.131a',
  'W.245a',
]);
const NMS_IOU_THRESHOLD = 0.45;
const CROSS_CLASS_DUPLICATE_IOU_THRESHOLD = 0.55;
const SAME_CLASS_CONTAINMENT_THRESHOLD = 0.55;
const CROSS_CLASS_CONTAINMENT_THRESHOLD = 0.65;
const SAME_CLASS_CENTER_DISTANCE_THRESHOLD = 0.35;
const CROSS_CLASS_CENTER_DISTANCE_THRESHOLD = 0.3;
const DETAILED_SCAN_TRIGGER_COUNT = 5;
const DETAILED_SCAN_MIN_LONG_SIDE = MODEL_INPUT_SIZE;
const DETAILED_SCAN_ALWAYS_LONG_SIDE = 960;
const DETAILED_SCAN_ASPECT_RATIO = 1.5;
const DETAILED_SCAN_TILE_RATIO = 0.6;
const DEFAULT_MAX_DETECTIONS = 25;
const MAX_OUTPUT_DIMENSION = 1280;
const MAX_IMAGE_PIXELS = 40_000_000;

let runtimeSessionPromise: Promise<RuntimeSession> | null = null;

function getRuntimeSession(): Promise<RuntimeSession> {
  if (!runtimeSessionPromise) {
    runtimeSessionPromise = (async () => {
      const ort = await import('onnxruntime-web/wasm');
      ort.env.wasm.numThreads = 1;
      ort.env.wasm.proxy = false;

      const session = await ort.InferenceSession.create(MODEL_URL, {
        executionProviders: ['wasm'],
        graphOptimizationLevel: 'all',
      });

      const inputMetadata = session.inputMetadata[0];
      const outputMetadata = session.outputMetadata[0];
      const inputShape = inputMetadata?.isTensor ? inputMetadata.shape : [];
      const outputShape = outputMetadata?.isTensor ? outputMetadata.shape : [];

      const validInput =
        inputShape.length === 4 &&
        Number(inputShape[0]) === 1 &&
        Number(inputShape[1]) === 3 &&
        Number(inputShape[2]) === MODEL_INPUT_SIZE &&
        Number(inputShape[3]) === MODEL_INPUT_SIZE;
      const validOutput =
        outputShape.length === 3 &&
        Number(outputShape[0]) === 1 &&
        (Number(outputShape[1]) === MODEL_CHANNELS ||
          Number(outputShape[2]) === MODEL_CHANNELS);

      if (!validInput || !validOutput) {
        await session.release();
        throw new Error(
          `Model nhận diện không tương thích (input ${inputShape.join('×')}, output ${outputShape.join('×')}).`,
        );
      }

      return { ort, session };
    })().catch((error) => {
      runtimeSessionPromise = null;
      throw error;
    });
  }

  return runtimeSessionPromise;
}

function createLetterboxedInput(
  image: HTMLImageElement,
  region: SourceRegion,
): {
  tensorData: Float32Array;
  transform: LetterboxTransform;
} {
  const scale = Math.min(
    MODEL_INPUT_SIZE / region.width,
    MODEL_INPUT_SIZE / region.height,
  );
  const resizedWidth = Math.max(1, Math.round(region.width * scale));
  const resizedHeight = Math.max(1, Math.round(region.height * scale));
  const padX = Math.floor((MODEL_INPUT_SIZE - resizedWidth) / 2);
  const padY = Math.floor((MODEL_INPUT_SIZE - resizedHeight) / 2);

  const canvas = document.createElement('canvas');
  canvas.width = MODEL_INPUT_SIZE;
  canvas.height = MODEL_INPUT_SIZE;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Trình duyệt không hỗ trợ xử lý ảnh bằng canvas.');

  context.fillStyle = 'rgb(114, 114, 114)';
  context.fillRect(0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(
    image,
    region.x,
    region.y,
    region.width,
    region.height,
    padX,
    padY,
    resizedWidth,
    resizedHeight,
  );

  let imageData: ImageData;
  try {
    imageData = context.getImageData(0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);
  } catch {
    throw new Error('Không thể đọc dữ liệu ảnh. Hãy tải ảnh từ thiết bị của bạn.');
  }

  const planeSize = MODEL_INPUT_SIZE * MODEL_INPUT_SIZE;
  const tensorData = new Float32Array(planeSize * 3);

  for (let pixelIndex = 0; pixelIndex < planeSize; pixelIndex += 1) {
    const sourceIndex = pixelIndex * 4;
    tensorData[pixelIndex] = imageData.data[sourceIndex] / 255;
    tensorData[planeSize + pixelIndex] = imageData.data[sourceIndex + 1] / 255;
    tensorData[planeSize * 2 + pixelIndex] = imageData.data[sourceIndex + 2] / 255;
  }

  return {
    tensorData,
    transform: {
      scale,
      padX,
      padY,
      sourceX: region.x,
      sourceY: region.y,
    },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getClassConfidenceThreshold(classIndex: number): number {
  const catalogCode = VTSR_LABELS[classIndex]?.catalogCode;
  return catalogCode
    ? CLASS_CONFIDENCE_THRESHOLDS[catalogCode] ?? CONFIDENCE_THRESHOLD
    : CONFIDENCE_THRESHOLD;
}

function parseModelOutput(
  output: OrtTensor,
  imageWidth: number,
  imageHeight: number,
  transform: LetterboxTransform,
): RawDetection[] {
  const dimensions = output.dims.map(Number);
  if (
    dimensions.length !== 3 ||
    dimensions[0] !== 1 ||
    (dimensions[1] !== MODEL_CHANNELS && dimensions[2] !== MODEL_CHANNELS)
  ) {
    throw new Error(`Đầu ra model không hợp lệ: ${dimensions.join('×')}.`);
  }

  if (!(output.data instanceof Float32Array)) {
    throw new Error('Model trả về kiểu dữ liệu không được hỗ trợ.');
  }

  const channelsFirst = dimensions[1] === MODEL_CHANNELS;
  const candidateCount = channelsFirst ? dimensions[2] : dimensions[1];
  const data = output.data;
  const getValue = (candidateIndex: number, channelIndex: number) =>
    channelsFirst
      ? data[channelIndex * candidateCount + candidateIndex]
      : data[candidateIndex * MODEL_CHANNELS + channelIndex];

  const candidates: RawDetection[] = [];
  const speedLimitCandidates: RawDetection[] = [];

  for (let candidateIndex = 0; candidateIndex < candidateCount; candidateIndex += 1) {
    let classIndex = -1;
    let confidence = -Infinity;

    for (let index = 0; index < VTSR_LABELS.length; index += 1) {
      const score = getValue(candidateIndex, index + 4);
      if (score > confidence) {
        confidence = score;
        classIndex = index;
      }
    }

    const speedLimitConfidence =
      SPEED_LIMIT_CLASS_INDEX >= 0
        ? getValue(candidateIndex, SPEED_LIMIT_CLASS_INDEX + 4)
        : -Infinity;
    const keepPrimaryCandidate =
      classIndex >= 0 &&
      Number.isFinite(confidence) &&
      confidence >= getClassConfidenceThreshold(classIndex);
    const keepSpeedLimitCandidate =
      Number.isFinite(speedLimitConfidence) &&
      speedLimitConfidence >= SPEED_LIMIT_CANDIDATE_THRESHOLD;

    if (!keepPrimaryCandidate && !keepSpeedLimitCandidate) {
      continue;
    }

    const centerX = getValue(candidateIndex, 0);
    const centerY = getValue(candidateIndex, 1);
    const boxWidth = getValue(candidateIndex, 2);
    const boxHeight = getValue(candidateIndex, 3);

    if (
      ![centerX, centerY, boxWidth, boxHeight].every(Number.isFinite) ||
      boxWidth <= 0 ||
      boxHeight <= 0
    ) {
      continue;
    }

    const x1 = clamp(
      (centerX - boxWidth / 2 - transform.padX) / transform.scale +
        transform.sourceX,
      0,
      imageWidth,
    );
    const y1 = clamp(
      (centerY - boxHeight / 2 - transform.padY) / transform.scale +
        transform.sourceY,
      0,
      imageHeight,
    );
    const x2 = clamp(
      (centerX + boxWidth / 2 - transform.padX) / transform.scale +
        transform.sourceX,
      0,
      imageWidth,
    );
    const y2 = clamp(
      (centerY + boxHeight / 2 - transform.padY) / transform.scale +
        transform.sourceY,
      0,
      imageHeight,
    );
    const width = x2 - x1;
    const height = y2 - y1;

    if (width < 2 || height < 2) continue;

    const bbox: RawDetection['bbox'] = [x1, y1, width, height];

    if (keepPrimaryCandidate) {
      candidates.push({
        bbox,
        classIndex,
        confidence,
      });
    }

    const speedLimitAspectRatio = width / height;
    if (
      keepSpeedLimitCandidate &&
      (
        !keepPrimaryCandidate ||
        classIndex !== SPEED_LIMIT_CLASS_INDEX
      ) &&
      speedLimitAspectRatio >= 0.55 &&
      speedLimitAspectRatio <= 1.45
    ) {
      speedLimitCandidates.push({
        bbox,
        classIndex: SPEED_LIMIT_CLASS_INDEX,
        confidence: speedLimitConfidence,
        requiresSpeedVerification: true,
      });
    }
  }

  return [
    ...candidates,
    ...speedLimitCandidates
      .sort((first, second) => second.confidence - first.confidence)
      .slice(0, MAX_SPEED_LIMIT_CANDIDATES_PER_REGION),
  ];
}

function refineSpeedLimitCandidates(
  image: HTMLImageElement,
  candidates: RawDetection[],
): RawDetection[] {
  const refined: RawDetection[] = [];

  for (const candidate of candidates) {
    if (candidate.classIndex !== SPEED_LIMIT_CLASS_INDEX) {
      refined.push(candidate);
      continue;
    }

    let visualResult: ReturnType<typeof analyzeSpeedLimitCandidate>;
    try {
      visualResult = analyzeSpeedLimitCandidate(image, candidate.bbox);
    } catch {
      if (!candidate.requiresSpeedVerification) {
        refined.push(candidate);
      }
      continue;
    }

    if (!visualResult.isSpeedLimit) {
      if (!candidate.requiresSpeedVerification) {
        refined.push(candidate);
      }
      continue;
    }

    const fusedConfidence = clamp(
      Math.max(
        candidate.confidence,
        0.5 +
          visualResult.visualConfidence * 0.32 +
          Math.min(candidate.confidence, 0.12),
      ),
      0,
      0.95,
    );
    refined.push({
      ...candidate,
      confidence: fusedConfidence,
      requiresSpeedVerification: false,
      verifiedSpeedLimit: true,
      speedLimitKmh: visualResult.speedLimitKmh,
    });
  }

  return refined;
}

function calculateOverlapMetrics(
  first: [number, number, number, number],
  second: [number, number, number, number],
): {
  iou: number;
  intersectionOverSmaller: number;
  normalizedCenterDistance: number;
} {
  const [firstX, firstY, firstWidth, firstHeight] = first;
  const [secondX, secondY, secondWidth, secondHeight] = second;
  const intersectionLeft = Math.max(firstX, secondX);
  const intersectionTop = Math.max(firstY, secondY);
  const intersectionRight = Math.min(firstX + firstWidth, secondX + secondWidth);
  const intersectionBottom = Math.min(firstY + firstHeight, secondY + secondHeight);
  const intersectionWidth = Math.max(0, intersectionRight - intersectionLeft);
  const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);
  const intersectionArea = intersectionWidth * intersectionHeight;
  const firstArea = firstWidth * firstHeight;
  const secondArea = secondWidth * secondHeight;
  const unionArea =
    firstArea +
    secondArea -
    intersectionArea;
  const firstCenterX = firstX + firstWidth / 2;
  const firstCenterY = firstY + firstHeight / 2;
  const secondCenterX = secondX + secondWidth / 2;
  const secondCenterY = secondY + secondHeight / 2;
  const centerDistance = Math.hypot(
    firstCenterX - secondCenterX,
    firstCenterY - secondCenterY,
  );
  const smallerDiagonal = Math.min(
    Math.hypot(firstWidth, firstHeight),
    Math.hypot(secondWidth, secondHeight),
  );

  return {
    iou: unionArea > 0 ? intersectionArea / unionArea : 0,
    intersectionOverSmaller:
      Math.min(firstArea, secondArea) > 0
        ? intersectionArea / Math.min(firstArea, secondArea)
        : 0,
    normalizedCenterDistance:
      smallerDiagonal > 0 ? centerDistance / smallerDiagonal : Infinity,
  };
}

function suppressVerifiedSpeedLimitConfusers(
  candidates: RawDetection[],
): RawDetection[] {
  const verifiedSpeedLimits = candidates.filter(
    (candidate) =>
      candidate.classIndex === SPEED_LIMIT_CLASS_INDEX &&
      candidate.verifiedSpeedLimit,
  );
  if (verifiedSpeedLimits.length === 0) return candidates;

  return candidates.filter((candidate) => {
    if (candidate.classIndex === SPEED_LIMIT_CLASS_INDEX) return true;
    const catalogCode = VTSR_LABELS[candidate.classIndex]?.catalogCode;
    if (!catalogCode || !SPEED_LIMIT_CONFUSER_CODES.has(catalogCode)) {
      return true;
    }

    return !verifiedSpeedLimits.some((speedLimit) => {
      const overlap = calculateOverlapMetrics(
        speedLimit.bbox,
        candidate.bbox,
      );
      return (
        overlap.iou >= 0.45 ||
        (
          overlap.intersectionOverSmaller >= 0.65 &&
          overlap.normalizedCenterDistance <= 0.3
        )
      );
    });
  });
}

function nonMaximumSuppression(
  candidates: RawDetection[],
  maxDetections: number,
): RawDetection[] {
  const remaining = [...suppressVerifiedSpeedLimitConfusers(candidates)]
    .sort((a, b) => b.confidence - a.confidence);
  const selected: RawDetection[] = [];

  while (remaining.length > 0 && selected.length < maxDetections) {
    const best = remaining.shift();
    if (!best) break;
    selected.push(best);

    for (let index = remaining.length - 1; index >= 0; index -= 1) {
      const candidate = remaining[index];
      const overlap = calculateOverlapMetrics(best.bbox, candidate.bbox);
      const isSameClassDuplicate =
        best.classIndex === candidate.classIndex &&
        (
          overlap.iou >= NMS_IOU_THRESHOLD ||
          (
            overlap.intersectionOverSmaller >=
              SAME_CLASS_CONTAINMENT_THRESHOLD &&
            overlap.normalizedCenterDistance <=
              SAME_CLASS_CENTER_DISTANCE_THRESHOLD
          )
        );
      const isNearIdenticalCrossClassDuplicate =
        best.classIndex !== candidate.classIndex &&
        (
          overlap.iou >= CROSS_CLASS_DUPLICATE_IOU_THRESHOLD ||
          (
            overlap.intersectionOverSmaller >=
              CROSS_CLASS_CONTAINMENT_THRESHOLD &&
            overlap.normalizedCenterDistance <=
              CROSS_CLASS_CENTER_DISTANCE_THRESHOLD
          )
        );

      if (isSameClassDuplicate || isNearIdenticalCrossClassDuplicate) {
        remaining.splice(index, 1);
      }
    }
  }

  return selected;
}

function createDetailedScanRegions(
  imageWidth: number,
  imageHeight: number,
): SourceRegion[] {
  const aspectRatio = imageWidth / imageHeight;
  const tileWidth = Math.max(
    1,
    Math.min(imageWidth, Math.round(imageWidth * DETAILED_SCAN_TILE_RATIO)),
  );
  const tileHeight = Math.max(
    1,
    Math.min(imageHeight, Math.round(imageHeight * DETAILED_SCAN_TILE_RATIO)),
  );
  const xPositions = tileWidth < imageWidth ? [0, imageWidth - tileWidth] : [0];
  const yPositions = tileHeight < imageHeight ? [0, imageHeight - tileHeight] : [0];

  if (aspectRatio >= DETAILED_SCAN_ASPECT_RATIO) {
    return xPositions.map((x) => ({
      x,
      y: 0,
      width: tileWidth,
      height: imageHeight,
    }));
  }

  if (aspectRatio <= 1 / DETAILED_SCAN_ASPECT_RATIO) {
    return yPositions.map((y) => ({
      x: 0,
      y,
      width: imageWidth,
      height: tileHeight,
    }));
  }

  return yPositions.flatMap((y) =>
    xPositions.map((x) => ({
      x,
      y,
      width: tileWidth,
      height: tileHeight,
    })),
  );
}

async function runInferenceForRegion(
  runtime: RuntimeSession,
  imageSource: HTMLImageElement,
  imageWidth: number,
  imageHeight: number,
  region: SourceRegion,
): Promise<RawDetection[]> {
  const { tensorData, transform } = createLetterboxedInput(imageSource, region);
  const input = new runtime.ort.Tensor(
    'float32',
    tensorData,
    [1, 3, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE],
  );
  const outputs = await runtime.session.run({
    [runtime.session.inputNames[0]]: input,
  });
  const output = outputs[runtime.session.outputNames[0]];

  if (!output || !(output instanceof runtime.ort.Tensor)) {
    throw new Error('Model không trả về tensor kết quả.');
  }

  return refineSpeedLimitCandidates(
    imageSource,
    parseModelOutput(
      output,
      imageWidth,
      imageHeight,
      transform,
    ),
  );
}

function createOutputCanvas(
  image: HTMLImageElement,
): { canvas: HTMLCanvasElement; scale: number } {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const scale = Math.min(1, MAX_OUTPUT_DIMENSION / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Trình duyệt không hỗ trợ tạo ảnh kết quả.');
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, 0, 0, width, height);
  return { canvas, scale };
}

function mapDetectionsToCatalog(
  detections: RawDetection[],
  outputScale: number,
  catalog: CatalogLookupItem[],
): Detection[] {
  return detections.map((detection) => {
    const label = VTSR_LABELS[detection.classIndex];
    const sign = catalog.find((candidate) => candidate.code === label.catalogCode);
    const [x, y, width, height] = detection.bbox;

    return {
      bbox: [
        x * outputScale,
        y * outputScale,
        width * outputScale,
        height * outputScale,
      ],
      class: sign?.name ?? label.description,
      code: sign?.code ?? label.catalogCode,
      confidence: detection.confidence,
      signId: sign?.id,
      speedLimitKmh: detection.speedLimitKmh,
    };
  });
}

export async function detectTrafficSigns(
  imageSource: HTMLImageElement,
  catalog: CatalogLookupItem[],
  options: DetectionOptions = {},
): Promise<ProcessedImage> {
  const {
    maxDetections = DEFAULT_MAX_DETECTIONS,
    onProgress,
    detailedScan = true,
  } = options;
  const imageWidth = imageSource.naturalWidth || imageSource.width;
  const imageHeight = imageSource.naturalHeight || imageSource.height;

  if (imageWidth <= 0 || imageHeight <= 0) {
    throw new Error('Ảnh không có kích thước hợp lệ.');
  }

  if (imageWidth * imageHeight > MAX_IMAGE_PIXELS) {
    throw new Error('Ảnh có độ phân giải quá lớn. Vui lòng chọn ảnh dưới 40 megapixel.');
  }

  try {
    const runtime = await getRuntimeSession();
    const fullRegion: SourceRegion = {
      x: 0,
      y: 0,
      width: imageWidth,
      height: imageHeight,
    };
    onProgress?.({ stage: 'full', current: 1, total: 1 });
    const rawDetections = await runInferenceForRegion(
      runtime,
      imageSource,
      imageWidth,
      imageHeight,
      fullRegion,
    );
    let selected = nonMaximumSuppression(rawDetections, maxDetections);

    const longSide = Math.max(imageWidth, imageHeight);
    const aspectRatio = imageWidth / imageHeight;
    const shouldRunDetailedScan =
      detailedScan &&
      longSide >= DETAILED_SCAN_MIN_LONG_SIDE &&
      (
        longSide >= DETAILED_SCAN_ALWAYS_LONG_SIDE ||
        aspectRatio >= DETAILED_SCAN_ASPECT_RATIO ||
        aspectRatio <= 1 / DETAILED_SCAN_ASPECT_RATIO ||
        selected.length < DETAILED_SCAN_TRIGGER_COUNT
      );

    if (shouldRunDetailedScan) {
      const detailedRegions = createDetailedScanRegions(imageWidth, imageHeight);
      const combinedDetections = [...rawDetections];

      for (let index = 0; index < detailedRegions.length; index += 1) {
        onProgress?.({
          stage: 'detail',
          current: index + 1,
          total: detailedRegions.length,
        });
        const regionDetections = await runInferenceForRegion(
          runtime,
          imageSource,
          imageWidth,
          imageHeight,
          detailedRegions[index],
        );
        combinedDetections.push(...regionDetections);
        selected = nonMaximumSuppression(combinedDetections, maxDetections);
      }
    }

    const { canvas, scale } = createOutputCanvas(imageSource);
    const detections = mapDetectionsToCatalog(selected, scale, catalog);

    return {
      canvas,
      detections,
      width: canvas.width,
      height: canvas.height,
    };
  } catch (error) {
    console.error('Traffic-sign inference failed:', error);
    const message = error instanceof Error ? error.message : '';
    if (
      message.includes('Model') ||
      message.includes('model') ||
      message.includes('tensor') ||
      message.includes('ảnh') ||
      message.includes('canvas')
    ) {
      throw error;
    }
    throw new Error(
      'Không thể khởi động model nhận diện. Hãy kiểm tra kết nối và tải lại trang.',
    );
  }
}

export function drawDetections(
  sourceCanvas: HTMLCanvasElement,
  detections: Detection[],
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = sourceCanvas.width;
  canvas.height = sourceCanvas.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Trình duyệt không hỗ trợ vẽ kết quả nhận diện.');
  context.drawImage(sourceCanvas, 0, 0);

  for (const detection of detections) {
    const [x, y, width, height] = detection.bbox;
    const color =
      detection.confidence >= 0.75
        ? '#16a34a'
        : detection.confidence >= 0.5
          ? '#d97706'
          : '#dc2626';

    context.lineWidth = Math.max(2, canvas.width / 320);
    context.strokeStyle = color;
    context.strokeRect(x, y, width, height);

    const codePrefix = detection.code ? `${detection.code} · ` : '';
    const resultName =
      detection.speedLimitKmh !== undefined
        ? `${detection.speedLimitKmh} km/h`
        : detection.class;
    const label = `${codePrefix}${resultName} ${(detection.confidence * 100).toFixed(0)}%`;
    const fontSize = Math.max(12, Math.min(24, canvas.width / 45));
    const labelHeight = fontSize + 10;
    const labelTop = y >= labelHeight ? y - labelHeight : y;

    context.font = `600 ${fontSize}px sans-serif`;
    const measuredWidth = context.measureText(label).width;
    const labelWidth = Math.min(canvas.width - x, measuredWidth + 12);
    context.fillStyle = color;
    context.fillRect(x, labelTop, labelWidth, labelHeight);
    context.save();
    context.beginPath();
    context.rect(x, labelTop, labelWidth, labelHeight);
    context.clip();
    context.fillStyle = '#fff';
    context.textBaseline = 'middle';
    context.fillText(label, x + 6, labelTop + labelHeight / 2);
    context.restore();
  }

  return canvas;
}
