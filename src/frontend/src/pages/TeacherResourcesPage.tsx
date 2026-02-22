import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

function TeacherResourcesContent() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Teaching Resources</h1>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Upload Reference Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600">
                Resource management functionality will be available soon. You'll be able to upload
                reference paintings, sketch demos, and color guides.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TeacherResourcesPage() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherResourcesContent />
    </ProtectedRoute>
  );
}
