'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mail, Twitter, Facebook, Podcast, Gem } from 'lucide-react';

const navLinks = [
  { href: '/peethams', label: 'Peethams' },
  { href: '/events', label: 'Events Calendar' },
  { href: '/panchanga', label: 'Panchanga' },
  { href: '/sadhana', label: 'Sadhana' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/chess', label: 'Chess AI' },
  { href: '/kids', label: 'Kids Corner' },
  { href: '/seva', label: 'Seva Hub' },
  { href: '/philosophy', label: 'Our Philosophy' },
  { href: '/mission', label: 'Our Mission' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-primary sm:text-lg">Sanatana Peethams Portal</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="https://twitter.com/shivabodha_org" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61560464994999" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="https://open.spotify.com/show/2junC5HBTu63wvAULgujbR" target="_blank" rel="noopener noreferrer" aria-label="Spotify Podcast">
            <Podcast className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="/contact" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent">
            <Mail className="h-5 w-5" />
            <span className="hidden lg:inline">Connect with Us</span>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-6">
                <Link href="/" className="mb-2 flex items-center space-x-2">
                    <Gem className="h-7 w-7 text-primary" />
                    <span className="font-bold font-headline text-primary text-lg">Sanatana Peethams Portal</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-lg font-medium transition-colors hover:text-accent">
                        {link.label}
                      </Link>
                    ))}
                </nav>
                <div className="border-t pt-6 space-y-4">
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
