import { MetricCard } from "@/components/MetricCard";
import { FilterPanel } from "@/components/FilterPanel";
import { AttritionChart } from "@/components/charts/AttritionChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Users,
  Download,
  RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Employee attrition insights and predictions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="analytics-button">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="analytics-button">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <FilterPanel />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Current Attrition Rate"
          value="14.2%"
          change="-2.1% from last month"
          changeType="positive"
          icon={TrendingDown}
        />
        <MetricCard
          title="High-Risk Employees"
          value="47"
          change="+12 from last week"
          changeType="negative"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Average Risk Score"
          value="67.5"
          change="+5.2 from last month"
          changeType="negative"
          icon={Target}
        />
        <MetricCard
          title="Total Employees"
          value="1,234"
          change="+8 new hires"
          changeType="positive"
          icon={Users}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttritionChart />
        <TrendChart />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Risk Factors */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Risk Factors</h3>
          <div className="space-y-3">
            {[
              { factor: "Job Satisfaction", impact: 85, color: "bg-danger" },
              { factor: "Work-Life Balance", impact: 72, color: "bg-warning" },
              { factor: "Career Growth", impact: 68, color: "bg-primary" },
              { factor: "Compensation", impact: 61, color: "bg-success" },
              { factor: "Manager Quality", impact: 54, color: "bg-muted" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(var(--${item.color.replace('bg-', '')}))` }} />
                <span className="text-sm text-foreground flex-1">{item.factor}</span>
                <span className="text-sm text-muted-foreground">{item.impact}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {[
              { employee: "Sarah Chen", risk: "High", department: "Engineering" },
              { employee: "Mike Johnson", risk: "Medium", department: "Sales" },
              { employee: "Emily Davis", risk: "High", department: "Marketing" },
              { employee: "Alex Kim", risk: "Medium", department: "Finance" }
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-analytics-surface rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.employee}</p>
                  <p className="text-xs text-muted-foreground">{alert.department}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.risk === "High" ? "status-high-risk" : "status-medium-risk"
                }`}>
                  {alert.risk} Risk
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Users className="w-4 h-4 mr-2" />
              View High-Risk Employees
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Run Scenario Analysis
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Generate Intervention Report
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Update Risk Models
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}