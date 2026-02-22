import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import ProfileSetupModal from '../auth/ProfileSetupModal';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ProfileSetupModal />
    </div>
  );
}
