
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
             <Alert variant="destructive" className="text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Authentication Not Configured</AlertTitle>
                <AlertDescription>
                   <p className="mb-2">The Google Sign-In is currently disabled because the Firebase API key is missing.</p>
                   <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Open the <code className="font-mono bg-destructive/20 px-1 py-0.5 rounded">.env</code> file in the project's root directory.</li>
                        <li>Find your Firebase web app's <code className="font-mono bg-destructive/20 px-1 py-0.5 rounded">apiKey</code>.</li>
                        <li>Add it to the file: <code className="font-mono bg-destructive/20 px-1 py-0.5 rounded">NEXT_PUBLIC_FIREBASE_API_KEY=...</code></li>
                        <li className="font-bold">You must restart the development server for the change to take effect.</li>
                   </ol>
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
