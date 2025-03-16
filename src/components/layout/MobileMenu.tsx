"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Session } from "next-auth";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigation: Array<{ name: string; href: string }>;
  session: Session | null;
}

export default function MobileMenu({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  navigation,
  session 
}: MobileMenuProps) {
  const { t } = useLanguage();
  
  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50 lg:hidden" 
        onClose={setMobileMenuOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-background py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <div className="flex space-x-4">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">{t('nav.close')}</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-6 flow-root px-6">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6 space-y-2">
                    {session ? (
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                      >
                        <UserIcon className="h-6 w-6 mr-2" />
                        {t('nav.dashboard')}
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                      >
                        {t('user.login')}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 