import * as React from 'react';
import { cn } from '@/lib/utils';

/** Tiêu đề trang chuẩn của các trang ứng dụng: biểu tượng + tiêu đề + mô tả + vùng phụ (nút, huy hiệu).
 *  Dùng thay cho mỗi trang tự viết <h1> với cỡ chữ riêng. */
export function PageHeader({
  icon, title, description, actions, children, className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** nút/điều khiển canh phải cạnh tiêu đề */
  actions?: React.ReactNode;
  /** nội dung phụ bên dưới mô tả (huy hiệu, bộ lọc…) */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('space-y-1.5', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
          {icon ? <span aria-hidden>{icon}</span> : null}
          <span>{title}</span>
        </h1>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      {description ? <p className="max-w-3xl text-sm text-muted-foreground">{description}</p> : null}
      {children ? <div className="pt-1.5">{children}</div> : null}
    </header>
  );
}
