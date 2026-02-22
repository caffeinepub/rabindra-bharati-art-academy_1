import { Link } from '@tanstack/react-router';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, MessageSquare, Image, BarChart, Video, BookOpen } from 'lucide-react';

function TeacherDashboardContent() {
  const menuItems = [
    {
      title: 'Student Management',
      description: 'View and manage all students',
      icon: Users,
      link: '/teacher/students',
      color: 'from-orange-400 to-pink-500',
    },
    {
      title: 'Admissions',
      description: 'Review pending applications',
      icon: UserCheck,
      link: '/teacher/admissions',
      color: 'from-pink-400 to-purple-500',
    },
    {
      title: 'Messages & Homework',
      description: 'Send notices and assignments',
      icon: MessageSquare,
      link: '/teacher/messages',
      color: 'from-purple-400 to-blue-500',
    },
    {
      title: 'Teaching Resources',
      description: 'Upload reference materials',
      icon: BookOpen,
      link: '/teacher/resources',
      color: 'from-blue-400 to-teal-500',
    },
    {
      title: 'Live Streaming',
      description: 'Start and manage live classes',
      icon: Video,
      link: '/teacher/stream',
      color: 'from-teal-400 to-green-500',
    },
    {
      title: 'Gallery Management',
      description: 'Upload and manage artwork',
      icon: Image,
      link: '/teacher/gallery',
      color: 'from-green-400 to-yellow-500',
    },
    {
      title: 'Analytics',
      description: 'View student statistics',
      icon: BarChart,
      link: '/teacher/analytics',
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <img
            src="/assets/generated/teacher-panel-header.dim_800x300.png"
            alt="Teacher Panel"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Teacher Dashboard
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Manage your academy, students, and classes all in one place
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="border-2 border-gray-200 hover:border-orange-400 transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mb-4`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherDashboardContent />
    </ProtectedRoute>
  );
}
