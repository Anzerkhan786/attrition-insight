import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", actual: 12, predicted: 14 },
  { month: "Feb", actual: 15, predicted: 16 },
  { month: "Mar", actual: 18, predicted: 17 },
  { month: "Apr", actual: 14, predicted: 15 },
  { month: "May", actual: 22, predicted: 21 },
  { month: "Jun", actual: 19, predicted: 20 },
  { month: "Jul", actual: 16, predicted: 18 },
  { month: "Aug", actual: 21, predicted: 22 },
];

export const TrendChart = () => {
  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Attrition Trend Analysis</h3>
        <p className="text-sm text-muted-foreground">Monthly actual vs predicted attrition</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--analytics-border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--analytics-surface))",
              border: "1px solid hsl(var(--analytics-border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))"
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            name="Actual Attrition"
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="hsl(var(--warning))" 
            strokeWidth={3}
            strokeDasharray="5 5"
            name="Predicted Attrition"
            dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};