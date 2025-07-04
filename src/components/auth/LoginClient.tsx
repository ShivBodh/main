'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Chrome, Facebook, Fingerprint, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { isFirebaseConfigured } from '@/lib/firebase';
import Link from 'next/link';

const FirebaseWarning = () => (
    <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Firebase Not Configured</AlertTitle>
        <AlertDescription>
            Authentication is currently disabled because the app is running in demo mode. To enable login, you must provide your own Firebase project credentials in the 
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">.env</code> 
            file.
            <br/><br/>
            Please refer to the project's README or Firebase documentation for instructions on obtaining your credentials.
        </AlertDescription>
    </Alert>
);

export default function LoginClient() {
  const { user, signInWithGoogle, signInWithFacebook, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  const handlePasskeySignIn = () => {
    toast({
        title: 'Feature In Progress',
        description: 'Passkey sign-in (WebAuthn) is being configured. Please use Google or Facebook for now.',
    });
  };

  if (loading || user) {
    return (
        <div className="container mx-auto flex items-center justify-center min-h-[80vh] py-12">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-full mx-auto mt-2" />
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Join the Community</CardTitle>
          <CardDescription>Sign in to access your dashboard and personal features.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {!isFirebaseConfigured ? <FirebaseWarning /> : (
            <>
              <Button onClick={signInWithGoogle} className="w-full" size="lg" variant="outline">
                <Chrome className="mr-2 h-5 w-5" /> Sign in with Google
              </Button>
              <Button onClick={signInWithFacebook} className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white" size="lg">
                <Facebook className="mr-2 h-5 w-5" /> Sign in with Facebook
              </Button>
              <Button onClick={handlePasskeySignIn} className="w-full" size="lg" variant="outline">
                <Fingerprint className="mr-2 h-5 w-5" /> Sign in with a Passkey
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
