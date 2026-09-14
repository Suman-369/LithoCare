import { cn } from "@/lib/utils";
import { ClockIcon, CheckCircle2Icon, AlertCircleIcon, XCircleIcon, WrenchIcon } from "lucide-react";
import { BatteryServiceStatus } from "@/types/battery-service";

interface RequestStatusBadgeProps {
  status: BatteryServiceStatus;
  className?: string;
}

export function RequestStatusBadge({ status, className }: RequestStatusBadgeProps) {
  const getStatusConfig = (s: BatteryServiceStatus) => {
    switch (s) {
      case "pending":
        return {
          label: "Pending",
          icon: ClockIcon,
          className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        };
      case "processing":
        return {
          label: "Working",
          icon: WrenchIcon,
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "completed":
        return {
          label: "Completed",
          icon: CheckCircle2Icon,
          className: "bg-green-50 text-green-700 border-green-200",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          icon: XCircleIcon,
          className: "bg-red-50 text-red-700 border-red-200",
        };
      default:
        return {
          label: "Unknown",
          icon: AlertCircleIcon,
          className: "bg-gray-50 text-gray-700 border-gray-200",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
