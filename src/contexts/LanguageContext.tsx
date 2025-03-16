'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/translations/translations';

// 支持的语言类型
export type Language = 'en' | 'zh';

// 语言上下文类型
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供者组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  // 首先尝试从本地存储获取语言设置，默认为英语
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // 只在客户端执行localStorage操作
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // 设置语言并保存到本地存储
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      console.log(`[LanguageContext] Language set to: ${lang}`);
    }
  };

  // 翻译函数，支持HTML标签
  const t = (key: string) => {
    // 如果找不到翻译，返回键名
    if (!translations[language][key]) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translations[language][key];
  };

  // 如果在服务器端或尚未挂载，使用默认语言
  const contextValue = {
    language,
    setLanguage,
    t,
  };

  // 使用useEffect来确保我们在客户端渲染时，语言状态已从localStorage正确加载
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// 使用语言上下文的钩子
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 