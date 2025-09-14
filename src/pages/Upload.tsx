import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload as UploadIcon, CheckCircle, XCircle, FileText, Database, Download, Trash2 } from "lucide-react";

const requiredFields = [
  { field: "EmployeeID", description: "Unique employee identifier", required: true },
  { field: "Age", description: "Employee age in years", required: true },
  { field: "Department", description: "Employee department", required: true },
  { field: "JobRole", description: "Employee job role/title", required: true },
  { field: "MonthlyIncome", description: "Monthly salary in local currency", required: true },
  { field: "JobSatisfaction", description: "Job satisfaction score (1-5)", required: true },
  { field: "OverTime", description: "Overtime status (Yes/No or 1/0)", required: true },
  { field: "YearsAtCompany", description: "Years of tenure at company", required: true },
  { field: "Attrition", description: "Attrition status (Yes/No or 1/0)", required: false }
];

const mockUploadedFiles = [
  {
    name: "hr_data_2024.csv",
    size: "2.4 MB",
    records: 1234,
    uploadedDate: "2024-01-15",
    status: "processed",
    validationErrors: 0
  },
  {
    name: "employee_survey.csv", 
    size: "856 KB",
    records: 567,
    uploadedDate: "2024-01-10",
    status: "processing",
    validationErrors: 3
  }
];

export default function Upload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});
  const [validationResults, setValidationResults] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Simulate validation results
          setValidationResults([
            { row: 1, field: "Age", error: "Invalid age value: 'N/A'" },
            { row: 45, field: "MonthlyIncome", error: "Missing required value" },
            { row: 102, field: "JobSatisfaction", error: "Value out of range (1-5)" }
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateSampleData = () => {
    // In a real app, this would trigger sample data generation
    console.log("Generating sample data...");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
          <p className="text-muted-foreground">Upload and manage HR datasets for attrition prediction</p>
        </div>
        <Button onClick={generateSampleData} variant="outline">
          <Database className="w-4 h-4 mr-2" />
          Generate Sample Data
        </Button>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
          <TabsTrigger value="files">Manage Files</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Area */}
          <Card className="p-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <UploadIcon className="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground">Upload HR Dataset</h3>
                <p className="text-muted-foreground">Upload a CSV file with employee data</p>
              </div>

              <div className="max-w-md mx-auto">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-primary/50 transition-colors">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-xs text-muted-foreground">
                        CSV, XLSX files up to 10MB
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              {isUploading && (
                <div className="max-w-md mx-auto space-y-2">
                  <Progress value={uploadProgress} />
                  <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
          </Card>

          {/* Required Fields */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Required Data Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredFields.map((field, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-analytics-surface">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{field.field}</span>
                      {field.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Validation Results */}
          {validationResults.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Validation Results</h3>
              
              <Alert className="mb-4">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Found {validationResults.length} validation errors that need to be fixed before processing.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                {validationResults.map((error, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm text-foreground">
                        Row {error.row}, Field "{error.field}": {error.error}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Map CSV Columns to Required Fields</h3>
            
            <div className="space-y-4">
              {requiredFields.map((field, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <Label className="text-sm font-medium text-foreground">{field.field}</Label>
                    {field.required && (
                      <Badge variant="outline" className="text-xs ml-2">Required</Badge>
                    )}
                  </div>
                  
                  <Select 
                    value={fieldMappings[field.field] || ""} 
                    onValueChange={(value) => setFieldMappings({...fieldMappings, [field.field]: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select CSV column" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee_id">employee_id</SelectItem>
                      <SelectItem value="emp_age">emp_age</SelectItem>
                      <SelectItem value="dept">dept</SelectItem>
                      <SelectItem value="job_title">job_title</SelectItem>
                      <SelectItem value="salary">salary</SelectItem>
                      <SelectItem value="satisfaction">satisfaction</SelectItem>
                      <SelectItem value="overtime_yn">overtime_yn</SelectItem>
                      <SelectItem value="years_company">years_company</SelectItem>
                      <SelectItem value="left_company">left_company</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <p className="text-xs text-muted-foreground">{field.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button className="analytics-button">
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Mapping
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Uploaded Files</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>

            <div className="space-y-4">
              {mockUploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {file.size} • {file.records} records • {file.uploadedDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge className={
                      file.status === "processed" ? "status-low-risk" : 
                      file.status === "processing" ? "status-medium-risk" : 
                      "status-high-risk"
                    }>
                      {file.status}
                    </Badge>
                    
                    {file.validationErrors > 0 && (
                      <Badge variant="outline" className="text-red-500 border-red-500/20">
                        {file.validationErrors} errors
                      </Badge>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}