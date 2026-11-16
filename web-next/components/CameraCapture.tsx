'use client';

// Port từ VNSign (src/components/CameraCapture.tsx) — logic vòng đời camera
// (getUserMedia, đổi camera trước/sau, chụp frame → File) giữ nguyên; chỉ đổi
// class Tailwind sang design token của Tizia (shadcn) thay vì token "ink/brand"
// gốc không tồn tại trong theme này.
import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, Camera, CameraIcon, Loader2, RefreshCw, ShieldCheck, X } from 'lucide-react';

interface CameraCaptureProps {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

type CameraStatus = 'idle' | 'requesting' | 'ready';
type FacingMode = 'environment' | 'user';

function getCameraErrorMessage(error: unknown) {
  if (!window.isSecureContext) {
    return 'Camera chỉ hoạt động trên kết nối an toàn HTTPS hoặc localhost.';
  }

  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
      return 'Bạn chưa cấp quyền sử dụng camera. Hãy cho phép Camera trong cài đặt của trình duyệt rồi thử lại.';
    }
    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return 'Không tìm thấy camera trên thiết bị này. Hãy kiểm tra camera đã được kết nối và đang hoạt động.';
    }
    if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      return 'Không thể mở camera vì camera có thể đang được ứng dụng khác sử dụng.';
    }
    if (error.name === 'OverconstrainedError') {
      return 'Thiết bị không có camera phù hợp với lựa chọn hiện tại. Hãy thử đổi camera.';
    }
  }

  return 'Không thể mở camera. Hãy kiểm tra quyền truy cập và thử lại.';
}

export default function CameraCapture({ open, onClose, onCapture }: CameraCaptureProps) {
  const [status, setStatus] = useState<CameraStatus>('idle');
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');
  const [canSwitchCamera, setCanSwitchCamera] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestIdRef = useRef(0);

  const releaseStream = useCallback(() => {
    const stream = streamRef.current;
    streamRef.current = null;
    stream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const stopCamera = useCallback(() => {
    requestIdRef.current += 1;
    releaseStream();
    setStatus('idle');
    setCanSwitchCamera(false);
  }, [releaseStream]);

  const startCamera = useCallback(async (requestedFacingMode: FacingMode) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    releaseStream();
    setStatus('requesting');
    setCanSwitchCamera(false);
    setError('');

    if (!window.isSecureContext) {
      setStatus('idle');
      setError('Camera chỉ hoạt động trên kết nối an toàn HTTPS hoặc localhost.');
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('idle');
      setError('Trình duyệt này không hỗ trợ truy cập camera. Hãy thử Chrome, Edge hoặc Safari phiên bản mới.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: requestedFacingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (requestIdRef.current !== requestId) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) {
        releaseStream();
        setStatus('idle');
        return;
      }

      video.srcObject = stream;
      await video.play();

      if (requestIdRef.current !== requestId) {
        releaseStream();
        return;
      }

      setStatus('ready');

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        if (requestIdRef.current === requestId) {
          setCanSwitchCamera(devices.filter((device) => device.kind === 'videoinput').length > 1);
        }
      } catch {
        // Một số trình duyệt không cho liệt kê thiết bị dù camera vẫn dùng được.
      }
    } catch (cameraError) {
      if (requestIdRef.current !== requestId) return;
      releaseStream();
      setStatus('idle');
      setError(getCameraErrorMessage(cameraError));
    }
  }, [releaseStream]);

  const handleClose = useCallback(() => {
    stopCamera();
    setError('');
    setFacingMode('environment');
    onClose();
  }, [onClose, stopCamera]);

  const handleSwitchCamera = useCallback(() => {
    const nextFacingMode: FacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacingMode);
    void startCamera(nextFacingMode);
  }, [facingMode, startCamera]);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    if (!video || status !== 'ready' || video.videoWidth === 0 || video.videoHeight === 0) {
      setError('Camera chưa sẵn sàng. Vui lòng chờ một chút rồi chụp lại.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (!context) {
      setError('Không thể tạo ảnh từ camera trên trình duyệt này.');
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError('Không thể lưu ảnh vừa chụp. Vui lòng thử lại.');
        return;
      }

      const capturedAt = Date.now();
      const file = new File([blob], `tizia-camera-${capturedAt}.jpg`, {
        type: 'image/jpeg',
        lastModified: capturedAt,
      });

      try {
        onCapture(file);
      } finally {
        handleClose();
      }
    }, 'image/jpeg', 0.92);
  }, [handleClose, onCapture, status]);

  useEffect(() => {
    if (open) void startCamera('environment');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) return;
    stopCamera();
    setError('');
    setFacingMode('environment');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => () => {
    requestIdRef.current += 1;
    releaseStream();
  }, [releaseStream]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [handleClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="camera-capture-title"
        aria-describedby="camera-capture-description"
        className="flex max-h-[100dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:max-w-2xl sm:rounded-3xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 sm:h-11 sm:w-11">
              <Camera className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 id="camera-capture-title" className="text-base font-bold leading-snug sm:text-lg">
                Nhận diện trực tiếp bằng camera
              </h2>
              <p id="camera-capture-description" className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Đặt biển báo rõ nét trong khung hình rồi chụp nhanh.
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Đóng camera"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 overflow-y-auto p-3 sm:p-6">
          <div className="relative aspect-[3/4] max-h-[58dvh] w-full overflow-hidden rounded-2xl bg-black sm:aspect-video sm:max-h-[62dvh]">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`h-full w-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`}
              aria-label="Hình ảnh trực tiếp từ camera"
            />
            {status === 'ready' && (
              <div
                className="pointer-events-none absolute inset-[10%] rounded-3xl border-2 border-dashed border-white/70 shadow-[0_0_0_999px_rgba(15,23,42,0.08)]"
                aria-hidden="true"
              />
            )}

            {status !== 'ready' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                {status === 'requesting' ? (
                  <>
                    <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" aria-hidden="true" />
                    <p className="font-semibold">Đang mở camera…</p>
                    <p className="mt-2 max-w-sm text-sm text-white/70">
                      Hãy chọn Cho phép khi trình duyệt hỏi quyền truy cập.
                    </p>
                  </>
                ) : (
                  <>
                    <CameraIcon className="mb-4 h-12 w-12 text-white/70" aria-hidden="true" />
                    <p className="font-semibold">Camera chưa được bật</p>
                    <p className="mt-2 max-w-sm text-sm text-white/70">
                      Ảnh chỉ xử lý ngay trên trình duyệt của bạn — không gửi lên máy chủ.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {error && (
            <div
              className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
            Camera sẽ dừng ngay khi bạn đóng cửa sổ hoặc chụp ảnh.
          </div>
        </div>

        <footer className="shrink-0 border-t bg-background px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4">
          {status === 'ready' ? (
            <div className="flex items-center justify-center gap-3">
              {canSwitchCamera && (
                <button
                  type="button"
                  onClick={handleSwitchCamera}
                  className="flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium hover:bg-muted"
                  aria-label={facingMode === 'environment' ? 'Chuyển sang camera trước' : 'Chuyển sang camera sau'}
                >
                  <RefreshCw className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Đổi camera</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleCapture}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-10 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:flex-none"
              >
                <Camera className="h-5 w-5" aria-hidden="true" />
                Chụp nhanh
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void startCamera(facingMode)}
              disabled={status === 'requesting'}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'requesting' ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              ) : (
                <Camera className="h-5 w-5" aria-hidden="true" />
              )}
              {status === 'requesting' ? 'Đang xin quyền…' : 'Bật camera'}
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}
