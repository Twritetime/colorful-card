'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义语言类型
export type Language = 'zh' | 'en';

// 定义上下文类型
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译数据
const translations = {
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.dashboard': '控制台',
    'nav.language': '语言',
    'nav.close': '关闭菜单',

    // 首页
    'home.hero.title': '高品质卡片与礼品解决方案，服务全球商务',
    'home.hero.description': '彩卡有限公司为全球企业提供高质量定制卡片、包装和礼品解决方案。',
    'home.hero.browse': '浏览产品',
    'home.hero.contact': '联系我们',

    // 产品
    'products.title': '我们的产品',
    'products.search': '搜索产品...',
    'products.empty': '没有找到匹配的产品',
    'products.loading': '加载中...',
    'products.stock': '库存',
    'products.all': '全部',
    'products.category.business': '名片',
    'products.category.greeting': '贺卡',
    'products.category.gift': '礼品卡',
    'products.category.invitation': '邀请卡',
    
    // 产品详情
    'product.features': '产品特点',
    'product.specs': '产品规格',
    'product.related': '相关产品',
    'product.customize': '定制您的订单',
    'product.stock.status': '库存状态',
    'product.stock.available': '有货',
    'product.stock.unavailable': '缺货',
    'product.getQuote': '获取报价',
    'product.contact': '联系我们',
    'product.back': '返回产品列表',
    
    // 用户
    'user.login': '登录',
    'user.logout': '退出登录',
    'user.profile': '个人资料',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.language': 'Language',
    'nav.close': 'Close menu',

    // Home
    'home.hero.title': 'Premium Card & Gift Solutions for Global Business',
    'home.hero.description': 'Colorful Card Co., Ltd. delivers high-quality customized cards, packaging, and gift solutions for businesses worldwide.',
    'home.hero.browse': 'Explore Products',
    'home.hero.contact': 'Contact Us',

    // Products
    'products.title': 'Our Products',
    'products.search': 'Search products...',
    'products.empty': 'No products found matching your criteria',
    'products.loading': 'Loading...',
    'products.stock': 'Stock',
    'products.all': 'All',
    'products.category.business': 'Business Cards',
    'products.category.greeting': 'Greeting Cards',
    'products.category.gift': 'Gift Cards',
    'products.category.invitation': 'Invitation Cards',
    
    // Product Detail
    'product.features': 'Product Features',
    'product.specs': 'Specifications',
    'product.related': 'Related Products',
    'product.customize': 'Customize Your Order',
    'product.stock.status': 'Stock Status',
    'product.stock.available': 'In Stock',
    'product.stock.unavailable': 'Out of Stock',
    'product.getQuote': 'Get a Quote',
    'product.contact': 'Contact Us',
    'product.back': 'Back to Products',
    
    // User
    'user.login': 'Login',
    'user.logout': 'Logout',
    'user.profile': 'Profile',
  }
};

// 语言提供者组件
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 首先尝试从本地存储获取语言设置，默认为中文
  const [language, setLanguage] = useState<Language>('zh');

  // 组件挂载时从本地存储加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 保存语言设置到本地存储
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // 翻译函数
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义钩子，用于在组件中访问语言上下文
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 