import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';

function TeacherLiveStreamContent() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Live Streaming</h1>

        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Stream Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600">
                Live streaming functionality will be integrated soon. You'll be able to broadcast
                high-quality art classes directly to your students.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TeacherLiveStreamPage() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherLiveStreamContent />
    </ProtectedRoute>
  );
}
