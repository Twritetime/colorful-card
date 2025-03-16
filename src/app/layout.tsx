'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeModeScript } from '@/components/theme-mode-script';
import { Toaster } from '@/components/ui/toaster';
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "彩卡 - 专业卡片与礼品解决方案",
  description: "彩卡有限公司 - 全球B2B市场领先的专业卡片、礼品和包装解决方案制造商",
  keywords: ["卡片", "礼品卡", "包装", "B2B", "名片", "贺卡", "彩卡"],
};

function RootLayoutInner({children}: {children: React.ReactNode}) {
  const { language } = useLanguage();
  
  return (
    <html lang={language} suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <RootLayoutInner>{children}</RootLayoutInner>
    </LanguageProvider>
  );
}
