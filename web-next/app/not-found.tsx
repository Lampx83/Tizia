import Link from 'next/link';
import type { Metadata } from 'next';
import { EmptyState } from '@/components/ui/empty-state';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Không tìm thấy trang', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="py-12">
      <EmptyState
        icon="🧭"
        title="Không tìm thấy trang này"
        description="Đường dẫn có thể đã đổi hoặc trang đã được gộp vào nơi khác."
        action={<>
          <Link href="/" className={buttonVariants()}>Về trang chủ</Link>
          <Link href="/kham-pha" className={buttonVariants({ variant: 'outline' })}>Khám phá Tizia</Link>
        </>}
      />
    </div>
  );
}
