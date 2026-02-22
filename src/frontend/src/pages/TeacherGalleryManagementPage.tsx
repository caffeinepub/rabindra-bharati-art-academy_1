import ProtectedRoute from '../components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from 'lucide-react';
import ArtworkUploadForm from '../components/teacher/ArtworkUploadForm';

function TeacherGalleryManagementContent() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Gallery Management</h1>

        <Card className="border-2 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Upload Artwork
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ArtworkUploadForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TeacherGalleryManagementPage() {
  return (
    <ProtectedRoute requireAdmin>
      <TeacherGalleryManagementContent />
    </ProtectedRoute>
  );
}
