"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Boxes, FolderTree, FileText } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <div className="w-64 bg-card border-r h-screen">
      <div className="p-4 space-y-2">
        <Link
          href="/dashboard/products"
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
            pathname === '/dashboard/products'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <Boxes className="h-4 w-4" />
          {t('dashboard.products')}
        </Link>

        <Link
          href="/dashboard/blog"
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
            pathname === '/dashboard/blog'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <FileText className="h-4 w-4" />
          Blog
        </Link>

        <Link
          href="/dashboard/categories"
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
            pathname === '/dashboard/categories'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <FolderTree className="h-4 w-4" />
          {t('dashboard.categories')}
        </Link>
      </div>
    </div>
  );
} 