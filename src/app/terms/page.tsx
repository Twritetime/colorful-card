'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CareersPage() {
  const { language } = useLanguage();

  const title = language === 'en' ? 'Careers' : '招聘信息';
  const subtitle = language === 'en' ? 'Join Our Team' : '加入我们的团队';
  const comingSoon = language === 'en' ? 'Coming Soon' : '即将推出';
  const description = language === 'en' 
    ? 'Our careers page is currently under development. Check back soon for job opportunities at Colorful Card.'
    : '我们的招聘页面正在开发中。请稍后查看彩卡公司的工作机会。';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
      <h2 className="text-xl text-center text-gray-600 mb-8">{subtitle}</h2>
      
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">{comingSoon}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
} 