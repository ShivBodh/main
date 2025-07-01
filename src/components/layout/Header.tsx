
import Link from 'next/link';
import { Mail, Twitter, Facebook, Podcast } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-primary sm:text-lg">Sanatana Peethams Portal</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/peethams" className="transition-colors hover:text-accent">Peethams</Link>
            <Link href="/events" className="transition-colors hover:text-accent">Events Calendar</Link>
            <Link href="/sadhana" className="transition-colors hover:text-accent">Sadhana</Link>
            <Link href="/seva" className="transition-colors hover:text-accent">Seva Hub</Link>
            <Link href="/philosophy" className="transition-colors hover:text-accent">Our Philosophy</Link>
            <Link href="/mission" className="transition-colors hover:text-accent">Our Mission</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="https://twitter.com/shivabodha_org" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61560464994999" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </Link>
          <Link href="https://open.spotify.com/show/2junC5HBTu63wvAULgujbR" target="_blank" rel="noopener noreferrer">
            <Podcast className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </Link>
          <Link href="/contact" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-accent">
            <Mail className="h-6 w-6" />
            <span>Connect with Us</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
