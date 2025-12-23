import { Geist, Geist_Mono } from "next/font/google";
import ErrorBoundary from "@/app/components/error-boundary";
import "@/app/styles/globals.css";
import "@/app/styles/index.scss";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lim & Yutatco-Sze Law Firm",
  description: "The Law firm represents both corporate and individual clients in different courts and administrative agencies in the country.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
