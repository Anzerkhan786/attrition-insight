import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Shield, Bell, Database, Users, Info } from "lucide-react";

export default function Settings() {
  const [riskThreshold, setRiskThreshold] = useState(70);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoRetraining, setAutoRetraining] = useState(false);
  const [dataRetention, setDataRetention] = useState("24");

  const saveSettings = () => {
    // In a real app, this would save to backend
    console.log("Saving settings...");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and security settings</p>
        </div>
        <Button onClick={saveSettings} className="analytics-button">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Risk Thresholds */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Risk Thresholds</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">High Risk Threshold (%)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={riskThreshold}
                    onChange={(e) => setRiskThreshold(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">
                    Employees with risk scores above {riskThreshold}% will be flagged as high risk
                  </span>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-lg font-semibold text-green-500">Low Risk</div>
                  <div className="text-sm text-muted-foreground">0% - 39%</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-semibold text-yellow-500">Medium Risk</div>
                  <div className="text-sm text-muted-foreground">40% - {riskThreshold - 1}%</div>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="text-lg font-semibold text-red-500">High Risk</div>
                  <div className="text-sm text-muted-foreground">{riskThreshold}% - 100%</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Model Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Model Configuration</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Default Model</Label>
                <Select defaultValue="xgboost">
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logistic">Logistic Regression</SelectItem>
                    <SelectItem value="random_forest">Random Forest</SelectItem>
                    <SelectItem value="xgboost">XGBoost</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Automatic Model Retraining</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically retrain models when new data is uploaded
                  </p>
                </div>
                <Switch
                  checked={autoRetraining}
                  onCheckedChange={setAutoRetraining}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Retraining Schedule</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          {/* Alert Configuration */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Alert Configuration</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Enable Risk Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send alerts when employees enter high-risk categories
                  </p>
                </div>
                <Switch
                  checked={alertsEnabled}
                  onCheckedChange={setAlertsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for important alerts
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Alert Recipients</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">HR Manager</div>
                      <div className="text-sm text-muted-foreground">hr.manager@company.com</div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Department Head</div>
                      <div className="text-sm text-muted-foreground">dept.head@company.com</div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">Add Recipient</Button>
              </div>
            </div>
          </Card>

          {/* Alert Types */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Alert Types</h3>
            
            <div className="space-y-4">
              {[
                { type: "High Risk Employee", description: "When an employee's risk score exceeds threshold", enabled: true },
                { type: "Risk Score Change", description: "When risk score changes significantly", enabled: true },
                { type: "Model Performance", description: "When model accuracy drops below threshold", enabled: false },
                { type: "Data Quality Issues", description: "When data validation errors are detected", enabled: true }
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{alert.type}</div>
                    <div className="text-sm text-muted-foreground">{alert.description}</div>
                  </div>
                  <Switch defaultChecked={alert.enabled} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">User Management</h3>
              </div>
              <Button variant="outline" size="sm">Add User</Button>
            </div>

            <div className="space-y-4">
              {[
                { name: "John Smith", email: "john.smith@company.com", role: "Admin", status: "Active" },
                { name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Analyst", status: "Active" },
                { name: "Mike Chen", email: "mike.chen@company.com", role: "Viewer", status: "Inactive" }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{user.role}</Badge>
                    <Badge className={user.status === "Active" ? "status-low-risk" : "status-medium-risk"}>
                      {user.status}
                    </Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Role Permissions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Role Permissions</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-foreground">Permission</th>
                    <th className="text-center p-2 text-foreground">Admin</th>
                    <th className="text-center p-2 text-foreground">Analyst</th>
                    <th className="text-center p-2 text-foreground">Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { permission: "View Dashboard", admin: true, analyst: true, viewer: true },
                    { permission: "Export Data", admin: true, analyst: true, viewer: false },
                    { permission: "Upload Data", admin: true, analyst: true, viewer: false },
                    { permission: "Manage Models", admin: true, analyst: false, viewer: false },
                    { permission: "User Management", admin: true, analyst: false, viewer: false },
                    { permission: "System Settings", admin: true, analyst: false, viewer: false }
                  ].map((perm, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 text-foreground">{perm.permission}</td>
                      <td className="text-center p-2">
                        {perm.admin ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
                      </td>
                      <td className="text-center p-2">
                        {perm.analyst ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
                      </td>
                      <td className="text-center p-2">
                        {perm.viewer ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {/* System Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Data Retention Period (months)</Label>
                <Select value={dataRetention} onValueChange={setDataRetention}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="60">60 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">API Rate Limiting</Label>
                <div className="flex items-center gap-4">
                  <Input type="number" defaultValue="1000" className="w-32" />
                  <span className="text-sm text-muted-foreground">requests per hour</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Session Timeout</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* System Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">System Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Application Version</span>
                  <span className="text-sm text-foreground">v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Database Version</span>
                  <span className="text-sm text-foreground">PostgreSQL 14.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Backup</span>
                  <span className="text-sm text-foreground">2024-01-15 03:00 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm text-foreground">15 days, 4 hours</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="text-sm text-foreground">2.4 GB / 10 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">API Calls Today</span>
                  <span className="text-sm text-foreground">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="text-sm text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">System Status</span>
                  <Badge className="status-low-risk">Healthy</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Maintenance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Maintenance Actions</h3>
            
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Maintenance actions may temporarily affect system performance. Schedule during off-peak hours.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4 flex-wrap">
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline">Rebuild Indexes</Button>
                <Button variant="outline">Export System Logs</Button>
                <Button variant="outline">Run Health Check</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}