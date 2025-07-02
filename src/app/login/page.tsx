'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Chrome, Facebook } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithFacebook, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.title = 'Login | Sanatana Peethams Portal';
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
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
          <Button onClick={signInWithGoogle} className="w-full" size="lg" variant="outline">
            <Chrome className="mr-2 h-5 w-5" /> Sign in with Google
          </Button>
          <Button onClick={signInWithFacebook} className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white" size="lg">
            <Facebook className="mr-2 h-5 w-5" /> Sign in with Facebook
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
