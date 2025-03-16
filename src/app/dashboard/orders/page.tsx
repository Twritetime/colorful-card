import { Metadata } from "next";

export const metadata: Metadata = {
  title: "订单管理",
  description: "查看和管理客户订单",
};

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">订单管理</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100">导出订单</button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">添加订单</button>
        </div>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">订单列表</h3>
            <p className="text-sm text-muted-foreground">
              查看和管理客户订单
            </p>
          </div>
          <div className="p-6">
            <div className="border rounded-md p-4 flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-center mb-4">
                演示模式下暂无订单数据
              </p>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-100">添加演示数据</button>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">订单统计</h3>
            <p className="text-sm text-muted-foreground">
              查看订单统计数据
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 text-center">
                <p className="text-muted-foreground">总订单数</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="border rounded-md p-4 text-center">
                <p className="text-muted-foreground">待处理订单</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="border rounded-md p-4 text-center">
                <p className="text-muted-foreground">已完成订单</p>
                <p className="text-3xl font-bold">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 