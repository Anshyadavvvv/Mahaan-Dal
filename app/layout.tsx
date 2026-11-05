import type { Metadata, Viewport } from 'next';
import { Mukta, Poppins, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';

const mukta = Mukta({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap'
});

const noto = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hindi',
  display: 'swap'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ea580c' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ]
};

export const metadata: Metadata = {
  title: 'महान दल | Mahan Dal — आधिकारिक पोर्टल',
  description: 'हक़, अधिकार और न्याय के लिए समर्पित जन आंदोलन — महान दल का आधिकारिक डिजिटल पोर्टल।',
  icons: {
    icon: '/mahan-dal-logo.png'
  },
  openGraph: {
    title: 'महान दल | Mahan Dal',
    description: 'जय महान !! हक़, अधिकार और न्याय का सशक्त मंच',
    type: 'website'
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mahandal.org')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body className={`${mukta.variable} ${noto.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
