import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

function TeacherAdmissionsContent() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Pending Admissions</h1>

        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Admission Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600">
                Admission approval functionality will be available soon. Applications are being
                collected and stored securely.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TeacherAdmissionsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherAdmissionsContent />
    </ProtectedRoute>
  );
}
