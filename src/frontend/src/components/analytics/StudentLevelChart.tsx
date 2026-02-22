import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StudentLevelChartProps {
  levelCounts: Record<string, number>;
}

const COLORS = [
  '#f97316', // orange
  '#ec4899', // pink
  '#a855f7', // purple
  '#3b82f6', // blue
  '#14b8a6', // teal
  '#22c55e', // green
  '#eab308', // yellow
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#f59e0b', // amber
];

export default function StudentLevelChart({ levelCounts }: StudentLevelChartProps) {
  const data = Object.entries(levelCounts).map(([level, count]) => ({
    level: level.replace('Year', 'Year '),
    count,
  }));

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        No student data available yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="level" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
