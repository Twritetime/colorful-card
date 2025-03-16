'use client';

import Link from "next/link";
import { SVGProps } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // 根据当前语言定义导航项
  const navigation = {
    products: [
      { name: language === 'en' ? 'Business Cards' : '商务名片', href: "/products?category=business" },
      { name: language === 'en' ? 'Greeting Cards' : '贺卡', href: "/products?category=greeting" },
      { name: language === 'en' ? 'Gift Cards' : '礼品卡', href: "/products?category=gift" },
      { name: language === 'en' ? 'Invitation Cards' : '邀请卡', href: "/products?category=invitation" },
    ],
    company: [
      { name: t('nav.about'), href: "/about" },
      { name: language === 'en' ? 'Careers' : '加入我们', href: "/careers" },
      { name: language === 'en' ? 'Factory Tour' : '工厂参观', href: "/factory-tour" },
      { name: language === 'en' ? 'Blog' : '博客', href: "/blog" },
    ],
    support: [
      { name: language === 'en' ? 'Help Center' : '帮助中心', href: "/help" },
      { name: t('nav.contact'), href: "/contact" },
      { name: language === 'en' ? 'FAQ' : '常见问题', href: "/faq" },
      { name: language === 'en' ? 'Shipping' : '配送信息', href: "/shipping" },
    ],
    legal: [
      { name: language === 'en' ? 'Privacy' : '隐私政策', href: "/privacy" },
      { name: language === 'en' ? 'Terms' : '服务条款', href: "/terms" },
      { name: language === 'en' ? 'Cookie Policy' : 'Cookie政策', href: "/cookie-policy" },
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://linkedin.com",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Facebook",
        href: "https://facebook.com",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Twitter",
        href: "https://twitter.com",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
      },
    ],
  };
  
  return (
    <footer className="bg-background border-t" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 lg:px-8 lg:pt-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold mr-2">CC</div>
              <span className="font-bold text-lg text-primary">Colorful Card</span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {language === 'en' 
                ? 'Professional card & gift solutions for businesses worldwide since 2010.'
                : '自2010年以来，为全球企业提供专业的卡片和礼品解决方案。'}
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {language === 'en' ? 'Products' : '产品'}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.products.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {language === 'en' ? 'Company' : '公司'}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {language === 'en' ? 'Support' : '支持'}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  {language === 'en' ? 'Legal' : '法律'}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {currentYear} Shenzhen Colorful Card Co., Ltd. {language === 'en' ? 'All rights reserved.' : '版权所有。'}
          </p>
        </div>
      </div>
    </footer>
  );
} 