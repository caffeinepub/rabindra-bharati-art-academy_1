import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useSearchStudents } from '../hooks/useSearchStudents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, TrendingUp, Award } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import StatsCard from '../components/analytics/StatsCard';
import StudentLevelChart from '../components/analytics/StudentLevelChart';

function TeacherAnalyticsContent() {
  const { data: students, isLoading } = useSearchStudents('');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const totalStudents = students?.length || 0;
  const levelCounts = students?.reduce((acc, student) => {
    const level = student.level;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Analytics Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={totalStudents}
            icon={Users}
            color="from-orange-400 to-pink-500"
          />
          <StatsCard
            title="Active Levels"
            value={Object.keys(levelCounts).length}
            icon={Award}
            color="from-purple-400 to-blue-500"
          />
          <StatsCard
            title="Avg per Level"
            value={totalStudents > 0 ? Math.round(totalStudents / Math.max(Object.keys(levelCounts).length, 1)) : 0}
            icon={TrendingUp}
            color="from-green-400 to-teal-500"
          />
        </div>

        {/* Charts */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Students by Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StudentLevelChart levelCounts={levelCounts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TeacherAnalyticsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherAnalyticsContent />
    </ProtectedRoute>
  );
}
