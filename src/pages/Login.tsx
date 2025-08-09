import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const [pending, setPending] = React.useState(false);
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
        <button
          disabled={pending}
          onClick={async () => { setPending(true); try { await signInWithGoogle(); } finally { setPending(false); } }}
          className={`btn-primary w-full ${pending ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {pending ? 'Opening popup…' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
}


