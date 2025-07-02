
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Mail, Twitter, Facebook, Podcast, Gem, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const navLinks = [
    { href: "/peethams", label: "Peethams" },
    { href: "/events", label: "Bodha Calendar" },
    { href: "/panchanga", label: "Panchanga" },
    { href: "/reading", label: "Reading" },
    { href: "/sadhana", label: "Sadhana" },
    { href: "/quiz", label: "Quiz" },
    { href: "/chess", label: "Chess AI" },
    { href: "/kids", label: "Kids Corner" },
    { href: "/seva", label: "Seva Hub" },
    { href: "/donate", label: "Donate" },
    { href: "/philosophy", label: "Our Philosophy" },
    { href: "/mission", label: "Our Mission" }
];

const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length-1][0];
    }
    return names[0][0];
}

const AuthNav = () => {
    const { user, loading, logout } = useAuth();

    if (loading) {
        return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-primary/50">
                            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
         <Button asChild>
            <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
            </Link>
        </Button>
    );
};

export function Header() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-primary sm:text-lg">Sanatana Peethams Portal</span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.slice(0, 5).map(link => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-accent">{link.label}</Link>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="https://twitter.com/shivabodha_org" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61560464994999" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="https://open.spotify.com/show/2junC5HBTu63wvAULgujbR" target="_blank" rel="noopener noreferrer" aria-label="Spotify Podcast">
            <Podcast className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <AuthNav />
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6">
                <Link href="/" className="mb-2 flex items-center space-x-2">
                    <Gem className="h-7 w-7 text-primary" />
                    <span className="font-bold font-headline text-primary text-lg">Sanatana Peethams Portal</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                    {navLinks.map(link => (
                      <SheetClose asChild key={link.href}>
                       <Link href={link.href} className="text-lg font-medium transition-colors hover:text-accent">{link.label}</Link>
                      </SheetClose>
                    ))}
                </nav>
                <div className="border-t pt-6 space-y-4">
                  {loading ? <Skeleton className="h-10 w-full" /> : user ? (
                    <>
                      <SheetClose asChild>
                        <Link href="/dashboard" className="flex items-center space-x-2 text-lg font-medium transition-colors hover:text-accent">
                          <LayoutDashboard className="h-6 w-6" />
                          <span>Dashboard</span>
                        </Link>
                      </SheetClose>
                       <SheetClose asChild>
                        <button onClick={logout} className="w-full flex items-center space-x-2 text-lg font-medium transition-colors hover:text-accent text-destructive">
                          <LogOut className="h-6 w-6" />
                          <span>Logout</span>
                        </button>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link href="/login" className="flex items-center space-x-2 text-lg font-medium transition-colors hover:text-accent">
                        <LogIn className="h-6 w-6" />
                        <span>Login</span>
                      </Link>
                    </SheetClose>
                  )}
                  <Separator />
                   <Link href="/contact" className="flex items-center space-x-2 text-lg font-medium transition-colors hover:text-accent">
                    <Mail className="h-6 w-6" />
                    <span>Connect with Us</span>
                  </Link>
                  <div className="flex items-center space-x-4">
                    <Link href="https://twitter.com/shivabodha_org" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61560464994999" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                    </Link>
                    <Link href="https://open.spotify.com/show/2junC5HBTu63wvAULgujbR" target="_blank" rel="noopener noreferrer" aria-label="Spotify Podcast">
                        <Podcast className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
