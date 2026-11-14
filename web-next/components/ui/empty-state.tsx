import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

/** Khối "không có gì để hiện" thống nhất: chưa có dữ liệu, chưa đăng nhập, lỗi tải. */
export function EmptyState({
  icon, title, description, action, tone = 'default', className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  tone?: 'default' | 'error';
  className?: string;
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      className={cn(
        'mx-auto w-full max-w-lg rounded-2xl border border-dashed bg-card/60 px-6 py-10 text-center',
        tone === 'error' ? 'border-destructive/50' : 'border-border',
        className,
      )}
    >
      {icon ? <div className="mb-3 text-4xl leading-none" aria-hidden>{icon}</div> : null}
      <h2 className="text-lg font-semibold">{title}</h2>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-5 flex flex-wrap justify-center gap-2">{action}</div> : null}
    </div>
  );
}

/** Mời đăng nhập rồi quay lại đúng trang đang xem (returnTo là đường dẫn nội bộ). */
export function LoginRequired({
  returnTo, title = 'Bạn cần đăng nhập', description, className,
}: {
  returnTo: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <EmptyState
      icon="🔐"
      title={title}
      description={description}
      className={className}
      action={
        <Link href={`/login?return=${encodeURIComponent(returnTo)}`} className={buttonVariants()}>
          Đăng nhập
        </Link>
      }
    />
  );
}
