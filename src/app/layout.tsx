import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/seo";

const description =
  "R Furniture Upholstery Dubai — expert sofa repair, leather upholstery, headboard upholstery, curtains & blinds. Premium fabrics, custom finishes. Call +971 56 769 2414 or email rfurnitureupholstery7@gmail.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Sofa Repair & Custom Upholstery Dubai`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "furniture upholstery dubai",
    "sofa repair dubai",
    "sofa reupholstery dubai",
    "headboard upholstery dubai",
    "leather sofa upholstery dubai",
    "chair repair reupholstery dubai",
    "curtains and blinds dubai",
    "hotel upholstery dubai",
    "office chair upholstery dubai",
    "custom upholstery dubai",
    "R furniture upholstery",
    "تنجيد الاثاث دبي",
    "تصليح الكنب دبي",
    "تنجيد اريكة جلدية دبي",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      ar: SITE_URL,
    },
  },
  openGraph: {
    title: `${SITE_NAME} — We Repair, Restore & Reinvent Comfort`,
    description,
    type: "website",
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "R Furniture Upholstery Dubai — luxury furniture restoration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} Dubai`,
    description,
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Home Services",
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai International City",
    "contact:phone_number": CONTACT_PHONE_DISPLAY,
    "contact:email": CONTACT_EMAIL,
  },
};

export const viewport: Viewport = {
  themeColor: "#3D2314",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
