import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { usePromoteStudent } from '../../hooks/usePromoteStudent';
import { ExamLevel, type StudentView } from '../../backend';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PromoteStudentModalProps {
  student: StudentView;
  open: boolean;
  onClose: () => void;
}

export default function PromoteStudentModal({ student, open, onClose }: PromoteStudentModalProps) {
  const [newLevel, setNewLevel] = useState<ExamLevel | ''>('');
  const promoteStudent = usePromoteStudent();

  const handlePromote = async () => {
    if (!newLevel) return;

    try {
      await promoteStudent.mutateAsync({
        studentId: student.id,
        newLevel: newLevel as ExamLevel,
      });
      toast.success(`${student.name} has been promoted to ${newLevel.replace('Year', 'Year ')}!`);
      onClose();
    } catch (error) {
      toast.error('Failed to promote student');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Promote Student</DialogTitle>
          <DialogDescription>
            Promote {student.name} to a new exam level
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Current Level</Label>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {student.level.replace('Year', 'Year ')}
            </p>
          </div>

          <div>
            <Label htmlFor="newLevel">New Level</Label>
            <Select value={newLevel} onValueChange={(value) => setNewLevel(value as ExamLevel)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select new level" />
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handlePromote}
            disabled={!newLevel || promoteStudent.isPending}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {promoteStudent.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Promoting...
              </>
            ) : (
              'Promote'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
