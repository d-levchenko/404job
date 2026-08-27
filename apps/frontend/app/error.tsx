'use client';

// apps/frontend/app/error.tsx
// Глобальний error boundary — обов'язково client component (вимога Next.js App Router).
// Кольори взято з макету Figma (Color/Curious Blue).

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // логуємо помилку для діагностики
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-medium text-[#3498db]">Помилка</p>
      <h1 className="text-3xl font-bold text-black md:text-4xl">
        Щось пішло не так
      </h1>
      <p className="max-w-md text-base text-gray-600">
        Виникла непередбачена помилка. Спробуй ще раз або повернись пізніше.
      </p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded-md bg-[#3498db] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2b82c0]">
        Спробувати ще раз
      </button>
    </div>
  );
}
