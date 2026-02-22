import { Link } from '@tanstack/react-router';
import { Palette, Users, Award, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to Rabindra Bharati Art Academy
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Where creativity meets excellence. Join us on a colorful journey of artistic discovery!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/apply">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
                    Apply Now <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/gallery">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Gallery
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/assets/generated/hero-banner.dim_1920x600.png"
                alt="Art Academy"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Expert Teachers</h3>
                <p className="text-gray-600">
                  Learn from experienced artists passionate about nurturing young talent
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Small Classes</h3>
                <p className="text-gray-600">
                  Personalized attention in intimate class settings for better learning
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Certified Programs</h3>
                <p className="text-gray-600">
                  Structured curriculum with recognized certifications at each level
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Live Classes</h3>
                <p className="text-gray-600">
                  Interactive online sessions with high-quality streaming technology
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/assets/generated/art-supplies-illustration.dim_800x600.png"
                alt="Art Supplies"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                About Our Academy
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Rabindra Bharati Art Academy has been nurturing young artists for years, providing a
                comprehensive art education that combines traditional techniques with contemporary
                approaches.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our structured program takes students through 11 progressive levels, from Adhya
                (beginner) through 8th Year, ensuring mastery at each stage before advancement.
              </p>
              <Link to="/admissions">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Learn More About Our Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Visit Our Academy
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Located in the heart of Kolkata, our academy welcomes aspiring artists of all ages.
            Come visit us to see our facilities and meet our passionate teachers!
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Contact Information</h3>
            <div className="space-y-3 text-gray-700">
              <p>📍 Kolkata, West Bengal, India</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@rbartacademy.edu</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
