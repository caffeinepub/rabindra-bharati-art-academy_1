import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'rabindra-bharati-art-academy'
  );

  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rabindra Bharati Art Academy</h3>
            <p className="text-white/90 mb-4">
              Nurturing young artists with creativity, passion, and excellence in traditional and
              contemporary art forms.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="text-white/90">Kolkata, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span className="text-white/90">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span className="text-white/90">info@rbartacademy.edu</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <SiFacebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <SiInstagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <SiYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/90">
          <p>
            © {currentYear} Rabindra Bharati Art Academy. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart size={16} className="text-red-300 fill-red-300" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
