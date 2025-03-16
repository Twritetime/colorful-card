import { Metadata } from "next";

export const metadata: Metadata = {
  title: "添加新客户",
  description: "创建一个新客户",
};

export default function NewCustomerPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">添加新客户</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">保存客户</button>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold">客户信息</h3>
            <p className="text-sm text-muted-foreground">
              填写客户的基本信息
            </p>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">公司名称</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="输入公司名称"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="contact" className="text-sm font-medium">联系人</label>
                  <input
                    id="contact"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="输入联系人姓名"
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">电子邮箱</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="输入电子邮箱"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium">电话号码</label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="输入电话号码"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="address" className="text-sm font-medium">地址</label>
                <textarea
                  id="address"
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                  placeholder="输入详细地址"
                ></textarea>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="notes" className="text-sm font-medium">备注</label>
                <textarea
                  id="notes"
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                  placeholder="输入客户备注信息"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="vip" className="mr-2" />
                <label htmlFor="vip" className="text-sm font-medium">VIP客户</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 