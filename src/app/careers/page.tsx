'use client';

import { useLanguage } from "@/contexts/LanguageContext";

export default function CareersPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{t('careers.title')}</h1>
      <p className="text-lg mb-8">{t('careers.description')}</p>
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{t('careers.noOpenings')}</h2>
          <p className="text-gray-600">{t('careers.checkBack')}</p>
        </div>
      </div>
    </div>
  );
} 