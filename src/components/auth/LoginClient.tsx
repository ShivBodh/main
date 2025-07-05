'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Chrome, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoginClient() {
  const { user, signInWithGoogle, loading, isFirebaseConfigured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/social');
    }
  }, [user, loading, router]);
  
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
          {!isFirebaseConfigured ? (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Authentication Disabled</AlertTitle>
                <AlertDescription>
                   Firebase is not configured. Please add your API key to the .env file to enable login.
                </AlertDescription>
            </Alert>
          ) : (
            <Button onClick={signInWithGoogle} className="w-full" size="lg" variant="outline">
                <Chrome className="mr-2 h-5 w-5" /> Sign in with Google
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
