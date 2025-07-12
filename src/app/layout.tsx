
import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { Alegreya } from 'next/font/google';

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shivala.info'),
  title: {
    default: 'Sanatana Peethams Portal',
    template: '%s | Sanatana Peethams Portal',
  },
  description: 'A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya. Connecting devotees worldwide.',
  openGraph: {
    title: 'Sanatana Peethams Portal',
    description: 'A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams.',
    url: 'https://shivala.info',
    siteName: 'Sanatana Peethams Portal',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1698064312159-4c2885141e6e?q=80&w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'An artistic representation of a Hindu temple.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanatana Peethams Portal',
    description: 'A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams.',
    creator: '@shivabodha_org',
    images: ['https://images.unsplash.com/photo-1698064312159-4c2885141e6e?q=80&w=1200&h=600&fit=crop'],
    alt: 'An artistic representation of a Hindu temple.',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${alegreya.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F89VPW7ZMF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-F89VPW7ZMF');
          `}
        </Script>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23800000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><style>@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } g { transform-origin: center; animation: spin 4s linear infinite; }</style><g><path d='M6 3h12l4 6-10 13L2 9z' /><path d='M12 22V9' /><path d='M2 9h20' /></g></svg>" type="image/svg+xml" />
        <meta name="theme-color" content="#800000" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
