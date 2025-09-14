import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Play, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";

interface ScenarioInputs {
  salaryIncrease: number;
  overtime: boolean;
  businessTravel: string;
  trainingHours: number;
  managerChange: boolean;
  workFromHome: number;
  jobSatisfaction: number;
}

export default function Simulator() {
  const [inputs, setInputs] = useState<ScenarioInputs>({
    salaryIncrease: 0,
    overtime: false,
    businessTravel: "rarely",
    trainingHours: 40,
    managerChange: false,
    workFromHome: 2,
    jobSatisfaction: 3
  });

  const [baselineRisk] = useState(72); // Base risk score
  const [isRunning, setIsRunning] = useState(false);

  // Calculate predicted risk based on inputs
  const calculatePredictedRisk = () => {
    let risk = baselineRisk;
    
    // Salary increase effect
    risk -= inputs.salaryIncrease * 0.5;
    
    // Overtime effect
    if (inputs.overtime) risk += 8;
    
    // Business travel effect
    const travelImpact = { 
      "never": -2, 
      "rarely": 0, 
      "frequently": 5, 
      "non-travel": -3 
    };
    risk += travelImpact[inputs.businessTravel as keyof typeof travelImpact] || 0;
    
    // Training hours effect
    risk -= (inputs.trainingHours - 40) * 0.1;
    
    // Manager change effect
    if (inputs.managerChange) risk += 12;
    
    // Work from home effect
    risk -= inputs.workFromHome * 2;
    
    // Job satisfaction effect
    risk -= (inputs.jobSatisfaction - 3) * 8;
    
    return Math.max(0, Math.min(100, risk));
  };

  const predictedRisk = calculatePredictedRisk();
  const riskDelta = predictedRisk - baselineRisk;

  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const resetScenario = () => {
    setInputs({
      salaryIncrease: 0,
      overtime: false,
      businessTravel: "rarely",
      trainingHours: 40,
      managerChange: false,
      workFromHome: 2,
      jobSatisfaction: 3
    });
  };

  const getImpactFactors = () => {
    const factors = [];
    
    if (inputs.salaryIncrease > 0) {
      factors.push({ factor: "Salary Increase", impact: -inputs.salaryIncrease * 0.5, positive: true });
    }
    if (inputs.overtime) {
      factors.push({ factor: "Overtime Required", impact: 8, positive: false });
    }
    if (inputs.businessTravel === "frequently") {
      factors.push({ factor: "Frequent Travel", impact: 5, positive: false });
    }
    if (inputs.managerChange) {
      factors.push({ factor: "Manager Change", impact: 12, positive: false });
    }
    if (inputs.workFromHome > 2) {
      factors.push({ factor: "Work From Home", impact: -(inputs.workFromHome - 2) * 2, positive: true });
    }
    if (inputs.jobSatisfaction !== 3) {
      const impact = (inputs.jobSatisfaction - 3) * 8;
      factors.push({ 
        factor: "Job Satisfaction Change", 
        impact, 
        positive: impact < 0 ? false : true 
      });
    }
    
    return factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Scenario Simulator</h1>
          <p className="text-muted-foreground">Test different HR interventions and see real-time impact predictions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={resetScenario}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={runSimulation} disabled={isRunning} className="analytics-button">
            {isRunning ? (
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isRunning ? "Running..." : "Run Simulation"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Scenario Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Salary Increase */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Salary Increase (%)</Label>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">0%</span>
                    <span className="text-sm font-medium text-foreground">{inputs.salaryIncrease}%</span>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <Slider
                    value={[inputs.salaryIncrease]}
                    onValueChange={(value) => setInputs({ ...inputs, salaryIncrease: value[0] })}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Training Hours */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Annual Training Hours</Label>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">0h</span>
                    <span className="text-sm font-medium text-foreground">{inputs.trainingHours}h</span>
                    <span className="text-sm text-muted-foreground">120h</span>
                  </div>
                  <Slider
                    value={[inputs.trainingHours]}
                    onValueChange={(value) => setInputs({ ...inputs, trainingHours: value[0] })}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Work From Home Days */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Work From Home (days/week)</Label>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">0</span>
                    <span className="text-sm font-medium text-foreground">{inputs.workFromHome}</span>
                    <span className="text-sm text-muted-foreground">5</span>
                  </div>
                  <Slider
                    value={[inputs.workFromHome]}
                    onValueChange={(value) => setInputs({ ...inputs, workFromHome: value[0] })}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Job Satisfaction */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Job Satisfaction Level</Label>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">1</span>
                    <span className="text-sm font-medium text-foreground">{inputs.jobSatisfaction}</span>
                    <span className="text-sm text-muted-foreground">5</span>
                  </div>
                  <Slider
                    value={[inputs.jobSatisfaction]}
                    onValueChange={(value) => setInputs({ ...inputs, jobSatisfaction: value[0] })}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Binary Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Overtime Required</Label>
                  <Switch
                    checked={inputs.overtime}
                    onCheckedChange={(checked) => setInputs({ ...inputs, overtime: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Manager Change</Label>
                  <Switch
                    checked={inputs.managerChange}
                    onCheckedChange={(checked) => setInputs({ ...inputs, managerChange: checked })}
                  />
                </div>
              </div>

              {/* Business Travel */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Business Travel Frequency</Label>
                <Select value={inputs.businessTravel} onValueChange={(value) => setInputs({ ...inputs, businessTravel: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                    <SelectItem value="frequently">Frequently</SelectItem>
                    <SelectItem value="non-travel">Non-Travel Role</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Risk Comparison */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Risk Prediction</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Baseline Risk</span>
                  <span className="text-lg font-semibold text-foreground">{baselineRisk}%</span>
                </div>
                <Progress value={baselineRisk} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Predicted Risk</span>
                  <span className="text-lg font-semibold text-foreground">{predictedRisk.toFixed(1)}%</span>
                </div>
                <Progress value={predictedRisk} className="h-2" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Risk Change</span>
                <div className="flex items-center gap-2">
                  {riskDelta > 0 ? (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  <Badge className={riskDelta > 0 ? "status-high-risk" : "status-low-risk"}>
                    {riskDelta > 0 ? '+' : ''}{riskDelta.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Impact Factors */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Impact Factors</h3>
            
            <div className="space-y-3">
              {getImpactFactors().length > 0 ? (
                getImpactFactors().map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{factor.factor}</span>
                    <div className="flex items-center gap-2">
                      {factor.positive ? (
                        <TrendingDown className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingUp className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-sm ${factor.positive ? 'text-green-500' : 'text-red-500'}`}>
                        {factor.impact > 0 ? '+' : ''}{factor.impact.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No changes from baseline scenario</p>
              )}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recommendations</h3>
            
            <div className="space-y-3 text-sm">
              {predictedRisk > baselineRisk ? (
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-red-500 font-medium mb-2">⚠ Risk Increased</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Consider reducing negative factors</li>
                    <li>• Implement retention strategies</li>
                    <li>• Monitor closely for early warning signs</li>
                  </ul>
                </div>
              ) : (
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-500 font-medium mb-2">✓ Risk Reduced</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Positive interventions are effective</li>
                    <li>• Continue with planned changes</li>
                    <li>• Consider implementing similar strategies</li>
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}