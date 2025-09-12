import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Brain, 
  Settings, 
  Upload, 
  Target,
  Home 
} from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Employee Explorer", href: "/explorer", icon: Users },
  { name: "Modeling", href: "/modeling", icon: Brain },
  { name: "Scenario Simulator", href: "/simulator", icon: Target },
  { name: "Data Upload", href: "/upload", icon: Upload },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="glass-surface border-r border-analytics-border h-full w-64 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">HR Analytics</h1>
          <p className="text-xs text-muted-foreground">Attrition Insights</p>
        </div>
      </div>

      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                "hover:bg-analytics-hover text-sm font-medium",
                isActive 
                  ? "bg-primary/20 text-primary border border-primary/30" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};