import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: string;
  changeType?: "increase" | "decrease";
}

export default function DashboardCard({
  title,
  value,
  icon,
  change,
  changeType = "increase",
}: DashboardCardProps) {
  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-primary/10 rounded-md">
          <div className="text-primary">{icon}</div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}
              >
                {changeType === "increase" ? (
                  <ArrowUpIcon
                    className="h-4 w-4 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="h-4 w-4 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {changeType === "increase" ? "Increased" : "Decreased"} by
                </span>
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 