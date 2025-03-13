import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "管理后台 - Colorful Card",
  description: "Colorful Card 管理后台",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 顶部导航 */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold text-xl inline-block">Colorful Card</span>
              <span className="text-sm text-muted-foreground">管理后台</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                返回前台
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              退出登录
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* 侧边栏 */}
        <aside className="w-64 border-r bg-muted/30 hidden md:block">
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">主要功能</h3>
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  控制面板
                </Link>
                <Link
                  href="/dashboard/products"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  产品管理
                </Link>
                <Link
                  href="/dashboard/categories"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  分类管理
                </Link>
                <Link
                  href="/dashboard/inquiries"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  询盘管理
                </Link>
              </nav>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">内容管理</h3>
              <nav className="space-y-1">
                <Link
                  href="/dashboard/pages"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  页面管理
                </Link>
                <Link
                  href="/dashboard/company"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  公司信息
                </Link>
              </nav>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">系统设置</h3>
              <nav className="space-y-1">
                <Link
                  href="/dashboard/users"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  用户管理
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-3 py-2 rounded-md hover:bg-muted text-sm font-medium"
                >
                  系统设置
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 