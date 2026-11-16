'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { EmptyState } from '@/components/ui/empty-state';
import { Button, buttonVariants } from '@/components/ui/button';

// Lỗi khi dựng trang: báo ngắn gọn bằng tiếng Việt + thử lại, thay cho trang lỗi mặc định của Next.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="py-12">
      <EmptyState
        tone="error"
        icon="⚠️"
        title="Trang gặp sự cố khi tải"
        description="Có thể do mạng chập chờn hoặc máy chủ đang bận. Bạn thử lại, nếu vẫn lỗi hãy gửi Đề nghị để Ban điều hành xử lý."
        action={<>
          <Button onClick={reset}>Thử lại</Button>
          <Link href="/" className={buttonVariants({ variant: 'outline' })}>Về trang chủ</Link>
        </>}
      />
      {error.digest ? <p className="mt-3 text-center text-xs text-muted-foreground">Mã lỗi: {error.digest}</p> : null}
    </div>
  );
}
