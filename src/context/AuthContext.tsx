'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignInSuccess = (providerName: string) => {
    toast({
        title: 'Successfully Signed In',
        description: `Welcome back! You are now signed in with ${providerName}.`,
    });
    router.push('/dashboard');
  }

  const handleSignInError = (error: any, providerName: string) => {
     console.error(`Error signing in with ${providerName}`, error);
     toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: `Could not sign in with ${providerName}. Please try again.`,
    });
  }

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      handleSignInSuccess('Google');
    } catch (error) {
      handleSignInError(error, 'Google');
    } finally {
        setLoading(false);
    }
  };
  
  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, facebookProvider);
      handleSignInSuccess('Facebook');
    } catch (error) {
      handleSignInError(error, 'Facebook');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
      router.push('/');
    } catch (error) {
      console.error("Error signing out", error);
      toast({
        variant: 'destructive',
        title: 'Sign Out Failed',
        description: 'There was an issue signing out. Please try again.',
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithFacebook, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
