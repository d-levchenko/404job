import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@blossom-carousel/react/style.css';
import './globals.css';
import TanStackProvider from '@/providers/TanStackProvider';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jobscape.vercel.app'),

  title: 'JobScape',
  description: 'JobScape - Знайди роботу своєї мріії',
  applicationName: 'JobScape',

  openGraph: {
    title: 'JobScape',
    description: 'JobScape - Знайди роботу своєї мріії',
    siteName: 'JobScape',
    locale: 'uk-UA',
    type: 'website',
    url: 'https://jobscape.vercel.app',
    images: [
      {
        url: '/images/og-image.png',
        width: 800,
        height: 600,
        alt: 'JobScape - Знайди роботу своєї мріії',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'JobScape',
    description: 'JobScape - Знайди роботу своєї мріії',
    images: [
      {
        url: '/images/og-image.png',
        width: 800,
        height: 600,
        alt: 'JobScape - Знайди роботу своєї мріії',
      },
    ],
  },
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
