import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={disabled}
      className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
        isAuthenticated
          ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loginStatus === 'logging-in' ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span className="hidden sm:inline">Logging in...</span>
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </>
      ) : (
        <>
          <LogIn size={18} />
          <span className="hidden sm:inline">Login</span>
        </>
      )}
    </button>
  );
}
