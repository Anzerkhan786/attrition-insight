import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle 
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Advanced ML models predict employee attrition with 95% accuracy"
  },
  {
    icon: Brain,
    title: "AI Explainability",
    description: "SHAP analysis reveals why employees are at risk of leaving"
  },
  {
    icon: TrendingUp,
    title: "Real-time Insights",
    description: "Live dashboard tracks attrition trends and risk factors"
  },
  {
    icon: Shield,
    title: "Risk Prevention",
    description: "Proactive recommendations to retain high-value employees"
  }
];

const benefits = [
  "Reduce employee turnover by up to 40%",
  "Identify at-risk employees 6 months in advance",
  "Optimize retention strategies with data-driven insights",
  "Save $50K+ per prevented departure"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-analytics-surface" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6 animate-pulse-glow">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Employee Attrition
              <br />
              <span className="text-primary">Prediction Platform</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Leverage behavioral data and machine learning to predict, understand, and prevent employee attrition. 
              Transform your HR strategy with actionable insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="analytics-button bg-gradient-primary text-lg px-8 py-6 h-auto"
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  Open Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="analytics-button border-analytics-border bg-analytics-surface/50 text-lg px-8 py-6 h-auto"
              >
                <Link to="/upload" className="flex items-center gap-2">
                  Upload Data
                  <Users className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced analytics meets human insight to create the most comprehensive employee retention solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="metric-card text-center animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Measurable Impact on Your Business
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-surface p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">40%</div>
                  <div className="text-sm text-muted-foreground">Turnover Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">6</div>
                  <div className="text-sm text-muted-foreground">Months Early Warning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$50K</div>
                  <div className="text-sm text-muted-foreground">Saved per Employee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 via-analytics-surface to-primary/10 py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your HR Strategy?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join industry leaders who trust our platform to predict and prevent employee attrition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="analytics-button bg-gradient-primary text-lg px-8 py-6 h-auto"
            >
              <Link to="/dashboard">
                Start Free Trial
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="analytics-button border-analytics-border bg-analytics-surface/50 text-lg px-8 py-6 h-auto"
            >
              <Link to="/upload">
                Schedule Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}