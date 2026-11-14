import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper cn() chuẩn shadcn/ui — gộp class Tailwind gọn gàng.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
