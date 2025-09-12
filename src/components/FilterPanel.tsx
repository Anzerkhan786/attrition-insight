import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Filter } from "lucide-react";

export const FilterPanel = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Global Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department" className="text-sm text-muted-foreground">Department</Label>
          <Select>
            <SelectTrigger className="bg-analytics-surface border-analytics-border">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm text-muted-foreground">Job Role</Label>
          <Select>
            <SelectTrigger className="bg-analytics-surface border-analytics-border">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="mid">Mid-level</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenure" className="text-sm text-muted-foreground">Tenure Range</Label>
          <Select>
            <SelectTrigger className="bg-analytics-surface border-analytics-border">
              <SelectValue placeholder="All Tenure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tenure</SelectItem>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="risk" className="text-sm text-muted-foreground">Risk Level</Label>
          <Select>
            <SelectTrigger className="bg-analytics-surface border-analytics-border">
              <SelectValue placeholder="All Risk Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-analytics-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm text-muted-foreground">Date Range</Label>
          </div>
          <Input 
            type="date" 
            className="bg-analytics-surface border-analytics-border w-40" 
            defaultValue="2024-01-01"
          />
          <span className="text-muted-foreground">to</span>
          <Input 
            type="date" 
            className="bg-analytics-surface border-analytics-border w-40" 
            defaultValue="2024-12-31"
          />
        </div>
      </div>
    </div>
  );
};