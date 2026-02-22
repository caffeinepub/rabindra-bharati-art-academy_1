import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import MessageComposer from '../components/teacher/MessageComposer';

function TeacherMessagesContent() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Messages & Homework</h1>

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Send Message to Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MessageComposer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TeacherMessagesPage() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherMessagesContent />
    </ProtectedRoute>
  );
}
