import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { department: "Technology", current: 15, predicted: 18, total: 120 },
  { department: "Sales", current: 22, predicted: 25, total: 80 },
  { department: "HR", current: 8, predicted: 12, total: 45 },
  { department: "Finance", current: 12, predicted: 14, total: 60 },
  { department: "Operations", current: 18, predicted: 20, total: 95 },
];

export const AttritionChart = () => {
  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Attrition by Department</h3>
        <p className="text-sm text-muted-foreground">Current vs predicted attrition rates</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--analytics-border))" />
          <XAxis 
            dataKey="department" 
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
          <Bar 
            dataKey="current" 
            fill="hsl(var(--primary))" 
            name="Current Attrition"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="predicted" 
            fill="hsl(var(--warning))" 
            name="Predicted Attrition"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};