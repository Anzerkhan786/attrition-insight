import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Filter } from "lucide-react";

const mockEmployees = [
  {
    id: "EMP001",
    name: "Sarah Chen",
    department: "Engineering",
    role: "Senior Developer",
    riskScore: 85,
    topDrivers: ["Job Satisfaction", "Work-Life Balance"],
    lastUpdated: "2024-01-15",
    age: 29,
    tenure: 3.2,
    satisfaction: 2.1
  },
  {
    id: "EMP002", 
    name: "Mike Johnson",
    department: "Sales",
    role: "Account Manager",
    riskScore: 62,
    topDrivers: ["Compensation", "Career Growth"],
    lastUpdated: "2024-01-15",
    age: 34,
    tenure: 5.1,
    satisfaction: 3.4
  },
  {
    id: "EMP003",
    name: "Emily Davis",
    department: "Marketing",
    role: "Marketing Specialist",
    riskScore: 78,
    topDrivers: ["Manager Quality", "Workload"],
    lastUpdated: "2024-01-14",
    age: 26,
    tenure: 1.8,
    satisfaction: 2.8
  },
  {
    id: "EMP004",
    name: "Alex Kim",
    department: "Finance",
    role: "Financial Analyst",
    riskScore: 45,
    topDrivers: ["Career Growth", "Training"],
    lastUpdated: "2024-01-15",
    age: 31,
    tenure: 4.2,
    satisfaction: 3.8
  }
];

export default function Explorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredEmployees = mockEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter;
    const matchesRisk = riskFilter === "all" || 
                       (riskFilter === "high" && emp.riskScore >= 70) ||
                       (riskFilter === "medium" && emp.riskScore >= 40 && emp.riskScore < 70) ||
                       (riskFilter === "low" && emp.riskScore < 40);
    
    return matchesSearch && matchesDepartment && matchesRisk;
  });

  const getRiskBadgeClass = (score: number) => {
    if (score >= 70) return "status-high-risk";
    if (score >= 40) return "status-medium-risk";
    return "status-low-risk";
  };

  const EmployeeDetailModal = ({ employee }: { employee: typeof mockEmployees[0] }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{employee.name} - Risk Analysis</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Employee Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold text-foreground mb-2">Employee Details</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">ID:</span> {employee.id}</div>
              <div><span className="text-muted-foreground">Department:</span> {employee.department}</div>
              <div><span className="text-muted-foreground">Role:</span> {employee.role}</div>
              <div><span className="text-muted-foreground">Age:</span> {employee.age}</div>
              <div><span className="text-muted-foreground">Tenure:</span> {employee.tenure} years</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-semibold text-foreground mb-2">Risk Assessment</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Score</span>
                <Badge className={getRiskBadgeClass(employee.riskScore)}>
                  {employee.riskScore}%
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                  style={{ width: `${employee.riskScore}%` }}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* SHAP Values */}
        <Card className="p-4">
          <h4 className="font-semibold text-foreground mb-4">Feature Impact (SHAP Values)</h4>
          <div className="space-y-3">
            {[
              { feature: "Job Satisfaction", impact: -0.23, value: employee.satisfaction },
              { feature: "Age", impact: 0.15, value: employee.age },
              { feature: "Tenure", impact: -0.12, value: employee.tenure },
              { feature: "Department", impact: 0.08, value: employee.department },
              { feature: "Work-Life Balance", impact: -0.18, value: "Poor" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm w-32 text-foreground">{item.feature}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-24 h-4 bg-muted rounded relative">
                    <div 
                      className={`absolute h-4 rounded ${item.impact > 0 ? 'bg-red-500 left-1/2' : 'bg-green-500 right-1/2'}`}
                      style={{ width: `${Math.abs(item.impact) * 100}px` }}
                    />
                  </div>
                  <span className={`text-xs ${item.impact > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {item.impact > 0 ? '+' : ''}{item.impact.toFixed(2)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground w-20">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-4">
          <h4 className="font-semibold text-foreground mb-3">Recommendations</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Schedule one-on-one meeting to discuss job satisfaction concerns</li>
            <li>• Consider flexible work arrangements to improve work-life balance</li>
            <li>• Explore career development opportunities and training programs</li>
            <li>• Review compensation package against market standards</li>
          </ul>
        </Card>
      </div>
    </DialogContent>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Explorer</h1>
          <p className="text-muted-foreground">Search and analyze individual employee risk profiles</p>
        </div>
        <Button className="analytics-button">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Employee Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Top Risk Drivers</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{employee.name}</div>
                    <div className="text-sm text-muted-foreground">{employee.id}</div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{employee.department}</TableCell>
                <TableCell className="text-foreground">{employee.role}</TableCell>
                <TableCell>
                  <Badge className={getRiskBadgeClass(employee.riskScore)}>
                    {employee.riskScore}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {employee.topDrivers.map((driver, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {driver}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{employee.lastUpdated}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <EmployeeDetailModal employee={employee} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}