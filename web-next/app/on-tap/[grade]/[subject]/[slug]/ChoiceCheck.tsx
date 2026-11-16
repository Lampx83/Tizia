'use client';

import { useState } from 'react';

// Các lựa chọn bấm được: chọn xong thì tô đúng/sai và mở phần "Xem đáp án" ngay dưới.
// Chữ của từng lựa chọn vẫn render sẵn ở server nên máy tìm kiếm đọc được như trước.
export default function ChoiceCheck({ choices, answer }: { choices: string[]; answer: number }) {
  const [picked, setPicked] = useState<number | null>(null);

  function pick(j: number, el: HTMLElement) {
    setPicked(j);
    const details = el.closest('li[data-q]')?.querySelector('details');
    if (details) details.open = true;
  }

  return (
    <ul className="mt-3 space-y-1.5 text-sm">
      {choices.map((c, j) => {
        const state = picked === null ? '' : j === answer ? 'right' : j === picked ? 'wrong' : '';
        return (
          <li key={j}>
            <button
              type="button"
              disabled={picked !== null}
              onClick={(e) => pick(j, e.currentTarget)}
              aria-pressed={picked === j}
              className={
                'flex w-full gap-2 rounded-md border px-3 py-2 text-left transition-colors ' +
                (state === 'right'
                  ? 'border-green-600 bg-green-600/10'
                  : state === 'wrong'
                    ? 'border-red-600 bg-red-600/10'
                    : 'border-transparent hover:border-foreground/20 hover:bg-foreground/5')
              }
            >
              <span className="text-muted-foreground">{String.fromCharCode(65 + j)}.</span>
              <span>{c}</span>
              {state === 'right' && <span className="ml-auto text-green-700">✓ Đúng</span>}
              {state === 'wrong' && <span className="ml-auto text-red-700">✗ Chưa đúng</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
