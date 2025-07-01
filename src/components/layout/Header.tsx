
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
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
      </div>
    </header>
  );
}
