"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CubeIcon,
  ShoppingBagIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Products", href: "/dashboard/products", icon: CubeIcon },
  { name: "Categories", href: "/dashboard/categories", icon: TagIcon },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBagIcon },
  { name: "Inquiries", href: "/dashboard/inquiries", icon: ChatBubbleLeftRightIcon },
  { name: "Customers", href: "/dashboard/customers", icon: UsersIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  // 导航项目名称翻译映射
  const getNavName = (name: string) => {
    switch (name) {
      case "Dashboard": return t('nav.dashboard');
      case "Products": return "产品管理";
      case "Categories": return "类目管理";
      case "Orders": return "订单管理";
      case "Inquiries": return "询盘管理";
      case "Customers": return "客户管理";
      case "Settings": return "系统设置";
      default: return name;
    }
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-background border-r transition duration-300 ease-in-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold mr-2">CC</div>
              <span className="font-bold text-lg text-primary">Colorful Card</span>
            </div>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                    aria-hidden="true"
                  />
                  {getNavName(item.name)}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex-shrink-0 group block w-full"
            >
              <div className="flex items-center">
                <div>
                  <ArrowLeftOnRectangleIcon className="inline-block h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                    退出登录
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-background border-b border-border lg:hidden">
        <button
          type="button"
          className="px-4 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-background border-b border-border">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold mr-2">CC</div>
                <span className="font-bold text-lg text-primary">Colorful Card</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                      aria-hidden="true"
                    />
                    {getNavName(item.name)}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-border p-4">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div>
                    <ArrowLeftOnRectangleIcon className="inline-block h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                      退出登录
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 