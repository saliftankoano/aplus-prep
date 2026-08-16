import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A+ Prep - Practice Tests",
  description: "Prepare for the CompTIA A+ 220-1201 Core 1 and 220-1202 Core 2 exams with source-labelled practice-test decks.",
  keywords: ["CompTIA A+", "220-1201", "220-1202", "Core 1", "Core 2", "practice tests", "IT certification", "exam prep"],
  authors: [{ name: "Salif Tankoano" }],
  creator: "Salif Tankoano",
  publisher: "aplus-prep.com",
  icons: {
    icon: '/shield-icon.svg',
    shortcut: '/shield-icon.svg',
    apple: '/shield-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
