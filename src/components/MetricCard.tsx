import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  className 
}: MetricCardProps) => {
  const changeColorMap = {
    positive: "text-success",
    negative: "text-danger", 
    neutral: "text-muted-foreground"
  };

  return (
    <div className={cn("metric-card", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn("text-sm font-medium", changeColorMap[changeType])}>
                {change}
              </p>
            )}
          </div>
        </div>
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};