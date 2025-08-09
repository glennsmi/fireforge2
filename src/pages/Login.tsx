import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-sm w-full border rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to FireForge</h1>
        <button onClick={() => signInWithGoogle()} className="w-full bg-white border rounded px-4 py-2 hover:bg-gray-50">
          Continue with Google
        </button>
      </div>
    </div>
  );
}


