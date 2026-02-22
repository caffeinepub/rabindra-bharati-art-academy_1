import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp } from 'lucide-react';
import type { StudentView } from '../../backend';
import PromoteStudentModal from './PromoteStudentModal';

interface StudentCardProps {
  student: StudentView;
}

export default function StudentCard({ student }: StudentCardProps) {
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const levelDisplay = student.level.replace('Year', 'Year ');

  return (
    <>
      <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">{student.name}</span>
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
              {levelDisplay}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Guardian</p>
              <p className="font-medium text-gray-800">{student.guardian}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Exams Completed</p>
              <p className="font-medium text-gray-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-500" />
                {student.exams.length}
              </p>
            </div>
            <Button
              onClick={() => setShowPromoteModal(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Promote Student
            </Button>
          </div>
        </CardContent>
      </Card>

      <PromoteStudentModal
        student={student}
        open={showPromoteModal}
        onClose={() => setShowPromoteModal(false)}
      />
    </>
  );
}
