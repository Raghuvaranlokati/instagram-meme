import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Millions Move - Move with Purpose. Grow with Discipline.",
  description: "Millions Move is more than a page — it's a mindset. We inspire the next generation of builders, dreamers, and doers through movement over motivation, action over excuses, and discipline over hype.",
  keywords: "motivation, discipline, personal growth, mindset, self improvement, action, movement, consistency",
  authors: [{ name: "Millions Move" }],
  creator: "Millions Move",
  publisher: "Millions Move",
  robots: "index, follow",
  openGraph: {
    title: "Millions Move - Move with Purpose. Grow with Discipline.",
    description: "Inspiring millions to break their limits, take action, and design a life they are proud of.",
    url: "https://millionsmove.com",
    siteName: "Millions Move",
    images: [
      {
        url: "/insta.png",
        width: 1200,
        height: 630,
        alt: "Millions Move - Move with Purpose",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Millions Move - Move with Purpose. Grow with Discipline.",
    description: "Inspiring millions to break their limits, take action, and design a life they are proud of.",
    images: ["/insta.png"],
    creator: "@millionsmove",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/insta.png",
    shortcut: "/insta.png",
    apple: "/insta.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
