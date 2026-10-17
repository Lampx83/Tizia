'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Camera as CameraIcon, Loader2 } from 'lucide-react';
import CameraCapture from '@/components/CameraCapture';
import {
  detectTrafficSigns,
  drawDetections,
  type Detection,
  type DetectionProgress,
  type CatalogLookupItem,
} from '@/lib/yoloDetection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type PenaltyEntry = {
  subject: string;
  conduct: string;
  amount: string;
  consequence?: string;
  legalBasis: string;
};

type PenaltyInfo = {
  summary: string;
  entries: PenaltyEntry[];
  noIndependentPenalty?: boolean;
};

// Shape 1 biển từ collection 'gplx-bien-bao' — dùng để tra tên + ý nghĩa cho
// kết quả nhận diện (mở rộng CatalogLookupItem tối thiểu của yoloDetection.ts).
export type CatalogItem = CatalogLookupItem & {
  group: string;
  groupLabel: string;
  image: string | null;
  meaning?: string;
  rule?: string;
  penalty?: PenaltyInfo;
};

type Phase = 'idle' | 'loading-image' | 'processing' | 'done' | 'error';

const SUPPORTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default function RecognizePanel({ catalog }: { catalog: CatalogItem[] }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState('');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [progress, setProgress] = useState<DetectionProgress | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runDetection = useCallback(
    async (file: File) => {
      if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
        setError('Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.');
        setPhase('error');
        return;
      }

      setError('');
      setPhase('loading-image');
      setResultUrl(null);
      setDetections([]);
      setProgress(null);

      const objectUrl = URL.createObjectURL(file);
      try {
        const img = new Image();
        const loaded = new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Không đọc được ảnh này. Hãy thử ảnh khác.'));
        });
        img.src = objectUrl;
        await loaded;

        setPhase('processing');
        const result = await detectTrafficSigns(img, catalog, { onProgress: setProgress });
        const annotated = drawDetections(result.canvas, result.detections);
        setResultUrl(annotated.toDataURL('image/jpeg', 0.92));
        setDetections(result.detections);
        setPhase('done');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nhận diện thất bại. Vui lòng thử lại.');
        setPhase('error');
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    },
    [catalog],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) void runDetection(file);
  };

  const reset = () => {
    setPhase('idle');
    setResultUrl(null);
    setDetections([]);
    setError('');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">📷 Nhận diện biển báo bằng AI</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Chụp ảnh hoặc tải ảnh lên — model chạy ngay trên trình duyệt của bạn, ảnh KHÔNG gửi lên máy chủ.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Muốn tra cứu đầy đủ danh mục biển thay vì chụp ảnh? Xem{' '}
        <Link href="/tra-cuu-bien-bao-gplx" className="text-primary hover:underline">
          danh mục biển báo →
        </Link>
      </p>

      {phase === 'idle' && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium hover:bg-muted"
          >
            <Upload className="h-5 w-5" /> Tải ảnh lên
          </button>
          <button
            onClick={() => setCameraOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <CameraIcon className="h-5 w-5" /> Dùng camera
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {(phase === 'loading-image' || phase === 'processing') && (
        <div className="mt-8 flex flex-col items-center gap-3 py-10 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {phase === 'loading-image'
              ? 'Đang đọc ảnh…'
              : progress?.stage === 'detail'
                ? `Đang quét chi tiết (${progress.current}/${progress.total})…`
                : 'Đang nhận diện…'}
          </p>
        </div>
      )}

      {phase === 'error' && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
          <button onClick={reset} className="mt-2 block text-sm font-medium underline">
            Thử lại
          </button>
        </div>
      )}

      {phase === 'done' && resultUrl && (
        <div className="mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resultUrl} alt="Kết quả nhận diện" className="w-full rounded-xl border" />
          <button onClick={reset} className="mt-3 rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted">
            🔁 Thử ảnh khác
          </button>

          <div className="mt-4">
            <p className="text-sm font-semibold">
              {detections.length > 0
                ? `Nhận diện được ${detections.length} biển:`
                : 'Không nhận diện được biển báo nào trong ảnh này.'}
            </p>
            <div className="mt-2 space-y-2">
              {detections.map((d, i) => {
                const full = d.code ? catalog.find((c) => c.code === d.code) : undefined;
                return (
                  <Card key={i}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">
                          {d.code ? `${d.code} · ` : ''}
                          {d.speedLimitKmh !== undefined ? `${d.speedLimitKmh} km/h` : d.class}
                        </p>
                        <Badge variant="secondary">{(d.confidence * 100).toFixed(0)}%</Badge>
                      </div>
                      {full?.meaning && <p className="mt-1 text-xs text-muted-foreground">{full.meaning}</p>}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <p className="mt-8 border-t pt-4 text-xs text-muted-foreground">
        Model nhận diện <code>vtsr-yolov8n-int8.onnx</code> (YOLOv8n, 56 lớp) — nguồn{' '}
        <a href="https://huggingface.co/liamxdev/vtsr" target="_blank" rel="noreferrer" className="underline">
          liamxdev/vtsr
        </a>{' '}
        trên HuggingFace, huấn luyện từ Vietnam Traffic Sign Dataset v3 (CC BY 4.0). Model gốc theo license
        AGPL-3.0. Kết quả chỉ mang tính hỗ trợ học tập, không thay thế phán đoán khi lái xe thực tế.
      </p>

      <CameraCapture open={cameraOpen} onClose={() => setCameraOpen(false)} onCapture={(file) => void runDetection(file)} />
    </div>
  );
}
