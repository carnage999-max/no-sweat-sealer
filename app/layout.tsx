import type { Metadata, Viewport } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import Script from "next/script";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SITE } from "@/content/site";
import { getSiteUrl } from "@/lib/config";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-archivo",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "No Sweat® | The end of cup sweat",
    template: "%s | No Sweat®",
  },
  description: SITE.description,
  applicationName: "No Sweat®",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "No Sweat®",
    title: "No Sweat® | The end of cup sweat",
    description: SITE.description,
    url: siteUrl,
    images: [
      {
        url: "/new-des/new-logo.jpeg",
        width: 1536,
        height: 1024,
        alt: "No Sweat® logo over a condensation-covered tumbler and ice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "No Sweat® | The end of cup sweat",
    description: SITE.description,
    images: ["/new-des/new-logo.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080d",
  colorScheme: "dark",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "No Sweat",
  url: siteUrl,
  logo: `${siteUrl}/new-des/new-logo.jpeg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "PO Box 52",
    addressLocality: "Detroit",
    addressRegion: "ME",
    postalCode: "04929",
    addressCountry: "US",
  },
  telephone: SITE.contact.phone,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${archivo.variable} ${publicSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-[10px] focus:bg-cyan focus:px-4 focus:py-3 focus:font-semibold focus:text-void"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />

        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}

        <Script
          src="https://d3qiklq6xff0my.cloudfront.net/popup.js"
          data-site="nosweatsealer.com"
          data-theme="light"
          data-delay="2000"
          strategy="lazyOnload"
        />
        <Script
          src="https://now-hiring-eta.vercel.app/widget.js"
          data-icon="Droplets"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
