'use client';

import React, { useEffect, useState } from 'react';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePathname, useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 在客户端渲染后设置mounted为true
  useEffect(() => {
    setMounted(true);
  }, []);

  // 如果尚未挂载，则显示一个空的按钮，避免hydration不匹配错误
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 px-0 opacity-0"
        aria-hidden="true"
      >
        <Globe className="h-4 w-4" />
      </Button>
    );
  }

  // 处理语言切换
  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    setOpen(false);
    console.log(`[LanguageSwitcher] Language changed to: ${value}`);
    // 通过强制刷新来确保整个应用程序都使用新的语言
    router.refresh();
  };

  // 查找当前语言的标签
  const currentLanguageLabel = languages.find(lang => lang.value === language)?.label || 'Language';

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 px-0"
                  aria-label="Select language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">切换语言</span>
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{language === 'en' ? 'Change language' : '切换语言'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={language === 'en' ? 'Search language...' : '搜索语言...'} />
            <CommandEmpty>{language === 'en' ? 'No language found.' : '未找到语言。'}</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  key={lang.value}
                  onSelect={() => handleLanguageChange(lang.value as Language)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      language === lang.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {lang.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
} 