import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useGetCallerUserProfile } from '../hooks/useUserProfile';
import { useGetStudent } from '../hooks/useStudentData';
import { Loader2, BookOpen, MessageSquare, Video, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MessagesPanel from '../components/student/MessagesPanel';
import HomeworkPanel from '../components/student/HomeworkPanel';
import LiveClassEmbed from '../components/student/LiveClassEmbed';

function StudentDashboardContent() {
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: student, isLoading: studentLoading } = useGetStudent(userProfile?.studentId || '');

  if (profileLoading || studentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Profile Not Found</h2>
          <p className="text-gray-600">
            Your student profile is being set up. Please contact the academy for assistance.
          </p>
        </div>
      </div>
    );
  }

  const levelDisplay = student.level.replace('Year', 'Year ');

  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="/assets/generated/dashboard-welcome.dim_600x400.png"
              alt="Welcome"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {student.name}!</h1>
              <p className="text-white/90 text-lg">Ready to create something amazing today?</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Profile</span>
              <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg px-4 py-1">
                <Award className="w-4 h-4 mr-2" />
                {levelDisplay}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold text-gray-800">{student.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guardian</p>
                <p className="font-semibold text-gray-800">{student.guardian}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="font-semibold text-gray-800">{levelDisplay}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Exams Completed</p>
                <p className="font-semibold text-gray-800">{student.exams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Messages */}
          <Card className="border-2 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-pink-500" />
                Messages & Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MessagesPanel messages={student.messages} />
            </CardContent>
          </Card>

          {/* Homework */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500" />
                Homework & Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HomeworkPanel />
            </CardContent>
          </Card>
        </div>

        {/* Live Class */}
        <Card className="mt-8 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-500" />
              Live Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LiveClassEmbed />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <ProtectedRoute>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}
