import { Video } from 'lucide-react';

export default function LiveClassEmbed() {
  return (
    <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Video className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">No Live Class Right Now</h3>
      <p className="text-gray-600">
        Your teacher will start a live class soon. Check back later!
      </p>
    </div>
  );
}
