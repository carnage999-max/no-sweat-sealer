// app/layout.tsx
import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';
import FloatingCartButton from '@/components/FloatingCartButton';
import Script from 'next/script';

const siteUrl = 'https://nosweatsealer.com';

export const metadata: Metadata = {
  // Required for generating absolute URLs in OG tags
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | No Sweat™',
    default: 'No Sweat™ – Stops Condensation',
  },
  description:
    'No Sweat™ is a clear, silica‑based spray that blocks condensation on any cup or tumbler, keeping surfaces clean and dry.',
  keywords: [
    'No Sweat',
    'condensation spray',
    'silica coating',
    'drinkware',
    'anti‑sweat',
  ],
  openGraph: {
    title: 'No Sweat™ – Stops Condensation',
    description:
      'Discover No Sweat™, the clear silica‑based spray that prevents condensation on any cup or tumbler.',
    url: siteUrl,
    siteName: 'No Sweat™',
    images: [
      {
        // point at your OG image in public/
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'No Sweat product illustration',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'No Sweat™ – Stops Condensation',
    description:
      'Prevent cup condensation with No Sweat™, a clear silica‑based micro‑layer spray.',
    images: ['/assets/goodbye_condensation.png'],
  },
  robots: { index: true, follow: true },
};


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
});
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-opensans',
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${montserrat.variable} ${openSans.variable}`}>
      <body className='bg-[#ffffff] text-[#111111] font-[var(--font-opensans)] flex flex-col min-h-screen'>
        <CartProvider>
          <script
            src="https://d3qiklq6xff0my.cloudfront.net/popup.js"
            data-site="nosweatsealer.com"
            data-theme="light"
            data-delay="2000"
            defer
          ></script>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCartButton />
        </CartProvider>
        <Script
          src="https://now-hiring-eta.vercel.app/widget.js"
          data-icon="Droplets"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
