import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, User } from 'firebase/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingRedirect, setCheckingRedirect] = useState(true);

  useEffect(() => {
    // Check for redirect result first
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log('User signed in via redirect:', result.user.email);
        }
      })
      .catch((error) => {
        console.error('Redirect sign-in error:', error);
      })
      .finally(() => {
        setCheckingRedirect(false);
      });

    // Set up auth state listener
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        try { window.history.replaceState({}, '', '/'); } catch {}
      }
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    
    console.log('Starting Google sign-in...');
    console.log('Auth instance:', auth);
    console.log('Auth domain:', auth.app.options.authDomain);
    
    // Try popup first (better UX when it works)
    try {
      console.log('Attempting signInWithPopup...');
      await signInWithPopup(auth, provider);
      console.log('Popup sign-in successful');
    } catch (err: any) {
      const code = err?.code as string | undefined;
      console.error('Popup sign-in failed:', { code, message: err?.message, error: err });
      
      // Handle various popup errors
      if (code === 'auth/cancelled-popup-request' || code === 'auth/popup-closed-by-user') {
        console.log('Popup cancelled by user');
        return;
      }
      
      // If popup is blocked or COOP error occurs, use redirect
      if (code === 'auth/popup-blocked' || 
          code === 'auth/unauthorized-domain' ||
          err?.message?.includes('Cross-Origin-Opener-Policy')) {
        console.log('Popup blocked or COOP error, using redirect flow');
        await signInWithRedirect(auth, provider);
        return;
      }
      
      // For any other error, also try redirect as fallback
      console.error('Auth error, falling back to redirect:', err);
      await signInWithRedirect(auth, provider);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const value = useMemo(() => ({ user, loading, signInWithGoogle, signOutUser }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


