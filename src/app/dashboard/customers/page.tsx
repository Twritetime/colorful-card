import { Metadata } from "next";

export const metadata: Metadata = {
  title: "客户管理",
  description: "查看和管理客户信息",
};

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">客户管理</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">添加客户</button>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">客户列表</h3>
            <p className="text-sm text-muted-foreground">
              查看和管理客户信息
            </p>
          </div>
          <div className="p-6">
            <div className="border rounded-md p-4 flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-center mb-4">
                演示模式下暂无客户数据
              </p>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-100">添加演示数据</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 