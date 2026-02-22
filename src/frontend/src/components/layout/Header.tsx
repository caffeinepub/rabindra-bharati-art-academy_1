import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Palette } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useUserProfile';
import { useGetCallerUserRole } from '../../hooks/useUserRole';
import LoginButton from '../auth/LoginButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: userRole } = useGetCallerUserRole();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isTeacher = userRole === 'admin';
  const isStudent = userRole === 'user';

  const handleDashboardClick = () => {
    if (isTeacher) {
      navigate({ to: '/teacher' });
    } else if (isStudent) {
      navigate({ to: '/student' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800 leading-tight">
                Rabindra Bharati
              </h1>
              <p className="text-sm text-gray-600">Art Academy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/admissions"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Admissions
            </Link>
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Gallery
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleDashboardClick}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Dashboard
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated && userProfile && (
              <span className="hidden md:block text-sm text-gray-700 font-medium">
                Hello, {userProfile.name}!
              </span>
            )}
            <LoginButton />
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t pt-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/admissions"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admissions
            </Link>
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleDashboardClick}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors py-2 text-left"
              >
                Dashboard
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
