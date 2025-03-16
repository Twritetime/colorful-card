'use client';

import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-sm focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span>{t('nav.language')}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${
                language === 'zh' ? 'bg-primary/10 text-primary' : 'text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => handleSetLanguage('zh')}
              role="menuitem"
            >
              中文
            </button>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${
                language === 'en' ? 'bg-primary/10 text-primary' : 'text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => handleSetLanguage('en')}
              role="menuitem"
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 