
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Mail, User as UserIcon, BookOpen, Brain, BookMarked, History } from 'lucide-react';
import Link from 'next/link';
import { DonationDiary } from '@/components/dashboard/DonationDiary';

export default function DashboardClient() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
        router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
            <div className="flex items-center space-x-4 mb-12">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-5 w-80" />
                </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-48 w-full rounded-lg" />
            </div>
             <div className="mt-8">
                <Skeleton className="h-96 w-full rounded-lg" />
            </div>
        </div>
    );
  }
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length-1][0];
    }
    return names[0][0];
  }

  return (
    <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User Avatar'} />
                <AvatarFallback className="text-3xl bg-muted">{getInitials(user.displayName)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                    Welcome, {user.displayName || 'Devotee'}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground flex items-center gap-2">
                    <Mail className="h-5 w-5" /> {user.email}
                </p>
            </div>
             <div className="ml-auto">
                 <Button onClick={logout} variant="outline">
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </div>
        </div>
      
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 space-y-8">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline">Quick Links</CardTitle>
                        <CardDescription>
                            Continue your journey through the portal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2">
                        <Button variant="link" className="justify-start p-0 h-auto text-base" asChild>
                            <Link href="/sadhana" className="flex items-center gap-2">
                                <Brain className="h-4 w-4" />
                                <span>Visit the Sādhanā Suite</span>
                            </Link>
                        </Button>
                        <Button variant="link" className="justify-start p-0 h-auto text-base" asChild>
                            <Link href="/quiz" className="flex items-center gap-2">
                                <BookMarked className="h-4 w-4" />
                                <span>Test Your Knowledge</span>
                            </Link>
                        </Button>
                        <Button variant="link" className="justify-start p-0 h-auto text-base" asChild>
                            <Link href="/reading" className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>Go to the Reading Room</span>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <History className="h-6 w-6 text-accent" />
                            Your Activity
                        </CardTitle>
                        <CardDescription>
                            A log of your recent interactions across the portal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground text-center p-4">
                            Activity feed is being configured and will appear here soon.
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <DonationDiary />
            </div>
        </div>

    </div>
  );
}
