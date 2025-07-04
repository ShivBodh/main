
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
     console.error(`Error signing in with ${providerName}:`, error);
     let description = `Could not sign in with ${providerName}. Please try again.`;

     // Provide more specific feedback for common errors.
     switch (error.code) {
        case 'auth/account-exists-with-different-credential':
            description = 'An account with this email already exists using a different sign-in method. Please use your original login provider.';
            break;
        case 'auth/popup-closed-by-user':
            description = 'The sign-in popup was closed before completing the process. Please try again.';
            break;
        case 'auth/cancelled-popup-request':
            description = 'The sign-in process was cancelled. Please try again.';
            break;
        case 'auth/operation-not-allowed':
             description = `Sign-in with ${providerName} is not enabled. Please enable it in your Firebase project's Authentication settings.`;
             break;
        default:
            description = `An unknown error occurred. (${error.code || 'UNKNOWN_ERROR'})`;
            break;
     }

     toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: description,
    });
  }

  const signInWithGoogle = async () => {
    if (!auth) return;
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
    if (!auth) return;
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
    if (!auth) return;
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
