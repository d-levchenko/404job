import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@blossom-carousel/react/style.css';
import './globals.css';
import TanStackProvider from '@/providers/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

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
        <TanStackProvider>
          <Header />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 6000,
              style: {
                borderRadius: '16px',
                padding: '14px 18px',
                fontSize: '16px',
                lineHeight: '150%',
                color: 'var(--color-scheme-1-text)',
                background: 'var(--color-white)',
                boxShadow: '4px 8px 24px rgb(0 0 0 / 10%)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--color-curious-blue)',
                  secondary: 'var(--color-white)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#D92D20',
                  secondary: 'var(--color-white)',
                },
              },
            }}
          />
          {children}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
