import { useState } from 'react';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useSearchStudents } from '../hooks/useSearchStudents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Users } from 'lucide-react';
import StudentCard from '../components/teacher/StudentCard';

function TeacherStudentManagementContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: students, isLoading } = useSearchStudents(searchTerm);

  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Student Management</h1>

        <Card className="mb-8 border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading students...</p>
            </div>
          </div>
        ) : !students || students.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Students Found</h3>
            <p className="text-gray-600">
              {searchTerm
                ? 'No students match your search criteria.'
                : 'No students have been enrolled yet.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeacherStudentManagementPage() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherStudentManagementContent />
    </ProtectedRoute>
  );
}
