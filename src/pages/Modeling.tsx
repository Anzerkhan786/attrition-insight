import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BarChart3, Target, Zap, RefreshCw } from "lucide-react";

const modelMetrics = {
  "logistic": { auc: 0.85, precision: 0.78, recall: 0.82, f1: 0.80 },
  "random_forest": { auc: 0.91, precision: 0.84, recall: 0.88, f1: 0.86 },
  "xgboost": { auc: 0.93, precision: 0.89, recall: 0.91, f1: 0.90 }
};

const featureImportance = [
  { feature: "Job Satisfaction", importance: 0.23, shap: 0.18 },
  { feature: "Work-Life Balance", importance: 0.19, shap: 0.21 },
  { feature: "Overtime Hours", importance: 0.16, shap: 0.15 },
  { feature: "Monthly Income", importance: 0.14, shap: 0.13 },
  { feature: "Years at Company", importance: 0.12, shap: 0.12 },
  { feature: "Age", importance: 0.08, shap: 0.11 },
  { feature: "Distance from Home", importance: 0.05, shap: 0.07 },
  { feature: "Training Hours", importance: 0.03, shap: 0.03 }
];

export default function Modeling() {
  const [selectedModel, setSelectedModel] = useState("xgboost");
  const [isTraining, setIsTraining] = useState(false);

  const handleRetrain = () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 3000);
  };

  const metrics = modelMetrics[selectedModel as keyof typeof modelMetrics];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Modeling & Explainability</h1>
          <p className="text-muted-foreground">Train and evaluate attrition prediction models with AI explanations</p>
        </div>
        <Button 
          onClick={handleRetrain} 
          disabled={isTraining}
          className="analytics-button"
        >
          {isTraining ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Brain className="w-4 h-4 mr-2" />
          )}
          {isTraining ? "Training..." : "Retrain Model"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Model Selection</h3>
          <div className="space-y-4">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logistic">Logistic Regression</SelectItem>
                <SelectItem value="random_forest">Random Forest</SelectItem>
                <SelectItem value="xgboost">XGBoost</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Training Status</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Trained
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm text-foreground">2024-01-15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Training Time</span>
                <span className="text-sm text-foreground">2.3 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Size</span>
                <span className="text-sm text-foreground">1,234 records</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ROC-AUC</span>
                <span className="text-lg font-semibold text-foreground">{metrics.auc}</span>
              </div>
              <Progress value={metrics.auc * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Precision</span>
                <span className="text-lg font-semibold text-foreground">{metrics.precision}</span>
              </div>
              <Progress value={metrics.precision * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Recall</span>
                <span className="text-lg font-semibold text-foreground">{metrics.recall}</span>
              </div>
              <Progress value={metrics.recall * 100} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">F1-Score</span>
                <span className="text-lg font-semibold text-foreground">{metrics.f1}</span>
              </div>
              <Progress value={metrics.f1 * 100} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Confusion Matrix */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-4 bg-green-500/10 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-500">892</div>
              <div className="text-xs text-muted-foreground">True Negative</div>
            </div>
            <div className="p-4 bg-red-500/10 rounded border border-red-500/20">
              <div className="text-2xl font-bold text-red-500">23</div>
              <div className="text-xs text-muted-foreground">False Positive</div>
            </div>
            <div className="p-4 bg-red-500/10 rounded border border-red-500/20">
              <div className="text-2xl font-bold text-red-500">18</div>
              <div className="text-xs text-muted-foreground">False Negative</div>
            </div>
            <div className="p-4 bg-green-500/10 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-500">301</div>
              <div className="text-xs text-muted-foreground">True Positive</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Feature Importance & SHAP */}
      <Tabs defaultValue="importance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="importance">Feature Importance</TabsTrigger>
          <TabsTrigger value="shap">SHAP Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="importance">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Feature Importance</h3>
            </div>
            <div className="space-y-4">
              {featureImportance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.feature}</span>
                    <span className="text-sm text-muted-foreground">
                      {(item.importance * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-primary-glow"
                      style={{ width: `${item.importance * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shap">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">SHAP Values</h3>
              <Badge variant="outline" className="ml-auto">
                <Zap className="w-3 h-3 mr-1" />
                AI Explainable
              </Badge>
            </div>
            <div className="space-y-4">
              {featureImportance.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm text-foreground w-32">{item.feature}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-4 relative">
                      <div className="absolute left-1/2 w-0.5 h-4 bg-border" />
                      <div 
                        className="absolute h-4 rounded-full bg-gradient-to-r from-red-500 to-green-500"
                        style={{ 
                          width: `${Math.abs(item.shap) * 200}px`,
                          left: item.shap > 0 ? '50%' : `${50 - Math.abs(item.shap) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-16">
                      {item.shap > 0 ? '+' : ''}{item.shap.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-analytics-surface rounded-lg">
              <p className="text-sm text-muted-foreground">
                SHAP values show how each feature contributes to individual predictions. 
                Positive values increase attrition risk, negative values decrease it.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}