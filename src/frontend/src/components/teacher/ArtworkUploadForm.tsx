import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useUploadArtwork } from '../../hooks/useUploadArtwork';
import { useSearchStudents } from '../../hooks/useSearchStudents';
import { ExamLevel } from '../../backend';
import { Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import ArtworkUpload from '../forms/ArtworkUpload';

export default function ArtworkUploadForm() {
  const { data: students } = useSearchStudents('');
  const uploadArtwork = useUploadArtwork();
  const [formData, setFormData] = useState({
    title: '',
    artistId: '',
    level: '' as ExamLevel | '',
    isPublic: true,
  });
  const [artworkBlob, setArtworkBlob] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artworkBlob || !formData.level || !formData.artistId) return;

    try {
      await uploadArtwork.mutateAsync({
        title: formData.title,
        artistId: formData.artistId,
        level: formData.level as ExamLevel,
        isPublic: formData.isPublic,
        image: artworkBlob,
      });
      toast.success('Artwork uploaded successfully!');
      setFormData({ title: '', artistId: '', level: '', isPublic: true });
      setArtworkBlob(null);
    } catch (error) {
      toast.error('Failed to upload artwork');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Artwork Title *</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter artwork title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="artist">Artist (Student) *</Label>
        <Select
          value={formData.artistId}
          onValueChange={(value) => setFormData({ ...formData, artistId: value })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select student" />
          </SelectTrigger>
          <SelectContent>
            {students?.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="level">Level *</Label>
        <Select
          value={formData.level}
          onValueChange={(value) => setFormData({ ...formData, level: value as ExamLevel })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Adhya">Adhya</SelectItem>
            <SelectItem value="Madhya">Madhya</SelectItem>
            <SelectItem value="Purna">Purna</SelectItem>
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

      <div className="flex items-center justify-between">
        <Label htmlFor="isPublic">Make Public</Label>
        <Switch
          id="isPublic"
          checked={formData.isPublic}
          onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
        />
      </div>

      <div>
        <Label>Artwork Image *</Label>
        <ArtworkUpload onUpload={setArtworkBlob} />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        disabled={
          uploadArtwork.isPending ||
          !formData.title ||
          !formData.artistId ||
          !formData.level ||
          !artworkBlob
        }
      >
        {uploadArtwork.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Artwork
          </>
        )}
      </Button>
    </form>
  );
}
