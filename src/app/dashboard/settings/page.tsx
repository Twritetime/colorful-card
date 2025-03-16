import { Metadata } from "next";

export const metadata: Metadata = {
  title: "系统设置",
  description: "管理网站设置和配置",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">系统设置</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">保存更改</button>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">网站设置</h3>
            <p className="text-sm text-muted-foreground">
              管理网站的基本设置和配置
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">维护模式</h3>
                <p className="text-sm text-muted-foreground">
                  开启后网站将显示维护页面
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">允许注册</h3>
                <p className="text-sm text-muted-foreground">
                  允许用户注册新账户
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">发送系统通知</h3>
                <p className="text-sm text-muted-foreground">
                  接收系统更新和安全通知
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">账户设置</h3>
            <p className="text-sm text-muted-foreground">
              管理您的账户设置和安全选项
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">管理员邮箱</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="admin@example.com"
                  disabled
                />
                <p className="text-sm text-muted-foreground">
                  在演示模式下不可更改
                </p>
              </div>
              
              <button className="w-full px-4 py-2 border rounded-md hover:bg-gray-100">
                更改密码
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 