import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // 模拟数据
  const stats = [
    { label: "产品总数", value: "24" },
    { label: "分类总数", value: "6" },
    { label: "未处理询盘", value: "12" },
    { label: "本月访问量", value: "1,234" },
  ];

  const recentInquiries = [
    {
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
      company: "ABC公司",
      subject: "RFID卡询价",
      date: "2023-03-10",
      status: "未处理",
    },
    {
      id: "2",
      name: "李四",
      email: "lisi@example.com",
      company: "XYZ有限公司",
      subject: "定制PVC卡询盘",
      date: "2023-03-09",
      status: "已回复",
    },
    {
      id: "3",
      name: "王五",
      email: "wangwu@example.com",
      company: "123科技",
      subject: "NFC标签合作意向",
      date: "2023-03-08",
      status: "已关闭",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">控制面板</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            刷新数据
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-background border rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 快速操作 */}
      <div className="bg-background border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">快速操作</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/products/new">
            <Button variant="outline" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              添加产品
            </Button>
          </Link>
          <Link href="/dashboard/categories/new">
            <Button variant="outline" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              添加分类
            </Button>
          </Link>
          <Link href="/dashboard/inquiries">
            <Button variant="outline" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              查看询盘
            </Button>
          </Link>
          <Link href="/dashboard/pages/new">
            <Button variant="outline" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              添加页面
            </Button>
          </Link>
        </div>
      </div>

      {/* 最近询盘 */}
      <div className="bg-background border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">最近询盘</h2>
          <Link href="/dashboard/inquiries">
            <Button variant="ghost" size="sm">
              查看全部
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">询盘人</th>
                <th className="text-left py-3 px-4 font-medium">公司</th>
                <th className="text-left py-3 px-4 font-medium">主题</th>
                <th className="text-left py-3 px-4 font-medium">日期</th>
                <th className="text-left py-3 px-4 font-medium">状态</th>
                <th className="text-right py-3 px-4 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b">
                  <td className="py-3 px-4">
                    <div>
                      <div>{inquiry.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {inquiry.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{inquiry.company}</td>
                  <td className="py-3 px-4">{inquiry.subject}</td>
                  <td className="py-3 px-4">{inquiry.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        inquiry.status === "未处理"
                          ? "bg-red-100 text-red-800"
                          : inquiry.status === "已回复"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/dashboard/inquiries/${inquiry.id}`}>
                      <Button variant="ghost" size="sm">
                        查看
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 