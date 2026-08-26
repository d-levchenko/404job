import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/providers/TanStackProvider';
import '@blossom-carousel/react/style.css';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'JobSpace',
  description: 'Пошук роботи та вакансій',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="uk" className={`${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <TanStackProvider>{children}</TanStackProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
