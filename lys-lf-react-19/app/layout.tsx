import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import ErrorBoundary from "@/app/components/error-boundary";
import "@/app/styles/globals.css";
import "@/app/styles/index.scss";
import React from "react";
import { siteConfig } from "@/app/assets/data/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://lys-lf.com";

export const metadata: Metadata = {
  title: {
    default: siteConfig.firmName,
    template: `%s | ${siteConfig.firmShortName}`,
  },
  description: `${siteConfig.firmName} (${siteConfig.firmShortName}) is a full-service law office established in ${siteConfig.establishedYear}. Specializing in corporate, labor, and tax law in the Philippines.`,
  keywords: [
    "law firm",
    "Philippines",
    "corporate law",
    "labor law",
    "tax law",
    "Muntinlupa",
    "Alabang",
    "legal services",
    siteConfig.firmName,
    siteConfig.firmShortName,
  ],
  authors: [{ name: siteConfig.firmName }],
  creator: siteConfig.firmName,
  publisher: siteConfig.firmName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: siteConfig.firmName,
    title: siteConfig.firmName,
    description: `Full-service law office in ${siteConfig.location.address.city}, Philippines. Specializing in corporate, labor, and tax law since ${siteConfig.establishedYear}.`,
    images: [
      {
        url: "/images/optimized/LYS-29.webp",
        width: 1200,
        height: 630,
        alt: `${siteConfig.firmName} Office`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.firmName,
    description: `Full-service law office in ${siteConfig.location.address.city}, Philippines. Specializing in corporate, labor, and tax law.`,
    images: ["/images/optimized/LYS-29.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "geo.region": "PH-00",
    "geo.placename": siteConfig.location.address.city,
    "geo.position": `${siteConfig.location.coordinates.lat};${siteConfig.location.coordinates.lng}`,
    "ICBM": `${siteConfig.location.coordinates.lat}, ${siteConfig.location.coordinates.lng}`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: siteConfig.firmName,
  alternateName: siteConfig.firmShortName,
  description: `Full-service law office established in ${siteConfig.establishedYear}, specializing in corporate, labor, and tax law.`,
  url: siteUrl,
  logo: `${siteUrl}/images/optimized/lys-logo.webp`,
  image: `${siteUrl}/images/optimized/LYS-29.webp`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  foundingDate: siteConfig.establishedYear.toString(),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.location.address.line1}, ${siteConfig.location.address.line2}`,
    addressLocality: siteConfig.location.address.line3,
    addressRegion: siteConfig.location.address.city,
    postalCode: siteConfig.location.address.postalCode,
    addressCountry: "PH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.location.coordinates.lat,
    longitude: siteConfig.location.coordinates.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Philippines",
  },
  serviceType: ["Corporate Law", "Labor Law", "Tax Law", "Litigation"],
  sameAs: siteConfig.socialLinks.facebook ? [siteConfig.socialLinks.facebook] : [],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component for the application
 * Wraps all pages with ErrorBoundary for error handling
 * Applies global fonts and styles
 *
 * @param props - The layout props
 * @param props.children - The child pages to render
 * @returns The root layout JSX
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
