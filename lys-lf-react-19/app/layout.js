import { Geist, Geist_Mono } from "next/font/google";
import "@/app/styles/globals.css";
import "@/app/styles/index.scss";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
