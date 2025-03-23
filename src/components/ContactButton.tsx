'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function ContactButton() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center bg-primary/90 dark:bg-primary/80 text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary hover:dark:bg-primary transition-colors duration-200"
      aria-label="Contact Us"
    >
      <MessageCircle className="w-6 h-6" />
    </Link>
  );
} 