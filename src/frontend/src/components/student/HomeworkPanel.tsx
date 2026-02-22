import { BookOpen } from 'lucide-react';

export default function HomeworkPanel() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-purple-500" />
      </div>
      <p className="text-gray-600">No homework assignments yet</p>
      <p className="text-sm text-gray-500 mt-2">Check back later for new assignments</p>
    </div>
  );
}
