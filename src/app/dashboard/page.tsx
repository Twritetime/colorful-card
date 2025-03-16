import { getServerSession } from "next-auth/next";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  // 在实际应用中，这些数据应该从数据库中获取
  const stats = [
    {
      name: "Total Products",
      value: "24",
      icon: <CubeIcon className="h-6 w-6" />,
      change: "+4.75%",
      changeType: "increase",
    },
    {
      name: "Total Orders",
      value: "12",
      icon: <ShoppingBagIcon className="h-6 w-6" />,
      change: "+54.02%",
      changeType: "increase",
    },
    {
      name: "Inquiries",
      value: "8",
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      change: "-1.39%",
      changeType: "decrease",
    },
    {
      name: "Customers",
      value: "6",
      icon: <UsersIcon className="h-6 w-6" />,
      change: "+10.18%",
      changeType: "increase",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name || "Admin"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType as "increase" | "decrease"}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="text-center py-8 text-muted-foreground">
            No orders yet. Orders will appear here when customers place them.
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Inquiries</h2>
          <div className="text-center py-8 text-muted-foreground">
            No inquiries yet. Customer inquiries will appear here.
          </div>
        </div>
      </div>
    </div>
  );
} 