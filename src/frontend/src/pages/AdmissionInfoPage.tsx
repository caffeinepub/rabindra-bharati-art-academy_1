import { Link } from '@tanstack/react-router';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdmissionInfoPage() {
  const examLevels = [
    { name: 'Adhya', description: 'Foundation level - Introduction to basic art concepts' },
    { name: 'Madhya', description: 'Intermediate level - Building core skills' },
    { name: 'Purna', description: 'Advanced foundation - Mastering fundamentals' },
    { name: '1st Year', description: 'First year of formal training' },
    { name: '2nd Year', description: 'Second year - Expanding techniques' },
    { name: '3rd Year', description: 'Third year - Developing personal style' },
    { name: '4th Year', description: 'Fourth year - Advanced composition' },
    { name: '5th Year', description: 'Fifth year - Professional techniques' },
    { name: '6th Year', description: 'Sixth year - Specialization begins' },
    { name: '7th Year', description: 'Seventh year - Portfolio development' },
    { name: '8th Year', description: 'Final year - Mastery and certification' },
  ];

  return (
    <div className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Admissions Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our vibrant community of young artists and embark on a structured journey of
            artistic excellence
          </p>
        </div>

        {/* Admission Process */}
        <Card className="mb-12 border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl">Admission Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  1
                </div>
                <h3 className="font-bold mb-2">Submit Application</h3>
                <p className="text-sm text-gray-600">
                  Fill out the online admission form with your details
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  2
                </div>
                <h3 className="font-bold mb-2">Upload Artwork</h3>
                <p className="text-sm text-gray-600">
                  Share a sample of your artwork for evaluation
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  3
                </div>
                <h3 className="font-bold mb-2">Teacher Review</h3>
                <p className="text-sm text-gray-600">
                  Our teachers will review your application
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  4
                </div>
                <h3 className="font-bold mb-2">Get Started</h3>
                <p className="text-sm text-gray-600">
                  Receive your admission number and login credentials
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam System */}
        <Card className="mb-12 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl">Our Exam Level System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Our structured curriculum consists of 11 progressive levels, ensuring students master
              each stage before advancing. Students take one exam per year and are promoted by
              their teachers based on their progress and performance.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examLevels.map((level, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">{level.name}</h4>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="mb-12 border-2 border-pink-200">
          <CardHeader>
            <CardTitle className="text-2xl">Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Age: Open to students of all ages (children, teens, and adults)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Passion for art and willingness to learn
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Sample artwork for initial level assessment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">
                  Guardian contact information (for students under 18)
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <img
            src="/assets/generated/art-supplies-illustration.dim_800x600.png"
            alt="Art Supplies"
            className="w-full max-w-md mx-auto rounded-2xl shadow-xl mb-8"
          />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your application today and join our community of passionate young artists!
          </p>
          <Link to="/apply">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg"
            >
              Apply Now <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
