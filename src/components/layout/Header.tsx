"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.products'), href: "/products" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.contact'), href: "/contact" },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{language === 'en' ? 'Colorful Card' : '彩卡'}</span>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold mr-2">CC</div>
              <span className="font-bold text-lg text-primary">{language === 'en' ? 'Colorful Card' : '彩卡'}</span>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">打开菜单</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          
          {session ? (
            <Link href="/dashboard" className="flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              <UserIcon className="h-6 w-6 mr-1" />
              <span>{t('nav.dashboard')}</span>
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-semibold leading-6 text-muted-foreground hover:text-primary transition-colors">
              {t('user.login')} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigation}
        session={session}
      />
    </header>
  );
} 