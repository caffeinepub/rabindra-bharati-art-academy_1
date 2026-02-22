import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubmitAdmission } from '../hooks/useSubmitAdmission';
import { ExamLevel } from '../backend';
import { Loader2, CheckCircle } from 'lucide-react';
import ArtworkUpload from '../components/forms/ArtworkUpload';

export default function AdmissionFormPage() {
  const navigate = useNavigate();
  const submitAdmission = useSubmitAdmission();
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    level: '' as ExamLevel | '',
  });
  const [artworkBlob, setArtworkBlob] = useState<any>(null);
  const [admissionId, setAdmissionId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artworkBlob || !formData.level) return;

    const id = await submitAdmission.mutateAsync({
      studentName: formData.studentName,
      guardianName: formData.guardianName,
      level: formData.level as ExamLevel,
      artwork: artworkBlob,
    });

    setAdmissionId(id);
  };

  if (admissionId) {
    return (
      <div className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-2 border-green-200">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Application Submitted!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for applying to Rabindra Bharati Art Academy. Your application has been
                received and is pending teacher approval.
              </p>
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Your Application ID:</p>
                <p className="text-2xl font-bold text-orange-600">{admissionId}</p>
              </div>
              <p className="text-gray-600 mb-8">
                Once approved, you will receive your admission number and login credentials to
                access your student dashboard.
              </p>
              <Button
                onClick={() => navigate({ to: '/' })}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="text-3xl">Admission Application</CardTitle>
            <CardDescription>
              Fill out the form below to apply to Rabindra Bharati Art Academy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  type="text"
                  placeholder="Enter student's full name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="guardianName">Guardian Name *</Label>
                <Input
                  id="guardianName"
                  type="text"
                  placeholder="Enter guardian's full name"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="level">Preferred Starting Level *</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value as ExamLevel })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adhya">Adhya (Beginner)</SelectItem>
                    <SelectItem value="Madhya">Madhya (Intermediate)</SelectItem>
                    <SelectItem value="Purna">Purna (Advanced Foundation)</SelectItem>
                    <SelectItem value="Year1">1st Year</SelectItem>
                    <SelectItem value="Year2">2nd Year</SelectItem>
                    <SelectItem value="Year3">3rd Year</SelectItem>
                    <SelectItem value="Year4">4th Year</SelectItem>
                    <SelectItem value="Year5">5th Year</SelectItem>
                    <SelectItem value="Year6">6th Year</SelectItem>
                    <SelectItem value="Year7">7th Year</SelectItem>
                    <SelectItem value="Year8">8th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Artwork Sample *</Label>
                <p className="text-sm text-gray-600 mb-2">
                  Upload a sample of your artwork for evaluation
                </p>
                <ArtworkUpload onUpload={setArtworkBlob} />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                disabled={
                  submitAdmission.isPending ||
                  !formData.studentName ||
                  !formData.guardianName ||
                  !formData.level ||
                  !artworkBlob
                }
              >
                {submitAdmission.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
