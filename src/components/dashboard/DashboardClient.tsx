
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Mail, Brain, BookMarked, BookOpen, HandHeart, Users, NotebookText } from 'lucide-react';
import Link from 'next/link';

const dashboardLinks = [
    {
        title: "My Dainandini",
        description: "Access your personal diary for reflections.",
        href: "/diary",
        icon: NotebookText,
    },
    {
        title: "Sādhanā Suite",
        description: "Tools for japa, meditation, and daily wisdom.",
        href: "/sadhana",
        icon: Brain,
    },
    {
        title: "Knowledge Quiz",
        description: "Test your knowledge on the four Peethams.",
        href: "/quiz",
        icon: BookMarked,
    },
    {
        title: "Reading Room",
        description: "Read foundational texts from great masters.",
        href: "/reading",
        icon: BookOpen,
    },
    {
        title: "Seva Hub",
        description: "Find meaningful volunteer opportunities.",
        href: "/seva",
        icon: HandHeart,
    },
    {
        title: "Sanatan Social",
        description: "Connect with the global community.",
        href: "/social",
        icon: Users,
    }
];

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
      
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dashboardLinks.map(link => {
                const Icon = link.icon;
                return (
                    <Link href={link.href} key={link.href} className="block group">
                        <Card className="h-full flex flex-col items-start p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
                            <Icon className="h-8 w-8 text-primary mb-4" />
                            <CardTitle className="font-headline text-xl group-hover:text-accent transition-colors">
                                {link.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-foreground/80 flex-grow">
                                {link.description}
                            </CardDescription>
                        </Card>
                    </Link>
                );
            })}
        </div>
    </div>
  );
}
