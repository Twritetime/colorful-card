import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ContactButton from '@/components/ContactButton';
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Colorful Card - Professional Card & Gift Solutions",
  description: "Colorful Card Co., Ltd. - Leading professional card, gift and packaging solution manufacturer for the global B2B market",
  keywords: ["cards", "gift cards", "packaging", "B2B", "business cards", "greeting cards", "colorful card"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <LanguageProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <ContactButton />
              </div>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
