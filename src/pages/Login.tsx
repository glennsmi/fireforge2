import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const [pending, setPending] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);
  const [error, setError] = React.useState<string | null>(null);
  
  const handleSignIn = async () => {
    setPending(true);
    setError(null);
    try {
      await signInWithGoogle();
      // If using redirect, the page will navigate away
      // Show a message in case redirect is happening
      setPending(true);
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err?.message || 'Failed to sign in. Please try again.');
      setPending(false);
    }
  };
  
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="card w-full max-w-md p-8 text-center space-y-6">
        <div>
          <img alt="FireForge" src="/logo/fireforge-logo.svg" className="mx-auto h-10 dark:hidden" />
          <img alt="FireForge" src="/logo/fireforge-logo-dark.svg" className="mx-auto h-10 hidden dark:block" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Sign in to FireForge</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Use your Google account to continue</p>
        </div>
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        )}
        <button
          disabled={pending}
          onClick={handleSignIn}
          className={`btn-primary w-full ${pending ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {pending ? 'Signing in…' : 'Continue with Google'}
        </button>
        {pending && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            If the popup was blocked, you'll be redirected to Google…
          </p>
        )}
      </div>
    </div>
  );
}


