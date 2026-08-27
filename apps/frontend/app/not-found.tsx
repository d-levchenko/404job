// apps/frontend/app/not-found.tsx
// Сторінка для маршрутів, яких не існує — конвенція Next.js App Router.
// Кольори взято з макету Figma (Color/Curious Blue).

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-medium text-[#3498db]">404</p>
      <h1 className="text-3xl font-bold text-black md:text-4xl">
        Сторінку не знайдено
      </h1>
      <p className="max-w-md text-base text-gray-600">
        Схоже, такої сторінки не існує або її було переміщено.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md bg-[#3498db] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2b82c0]">
        На головну
      </Link>
    </div>
  );
}
