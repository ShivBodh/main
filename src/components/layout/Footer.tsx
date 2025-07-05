import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted/50 text-muted-foreground py-8 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sanatana Peethams Portal. A Seva for Dharma.
        </p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-4">
            <Link href="/events" className="text-sm hover:text-accent">Bodha Calendar</Link>
            <Link href="/social" className="text-sm hover:text-accent">Social</Link>
            <Link href="/panchanga" className="text-sm hover:text-accent">Panchanga</Link>
            <Link href="/reading" className="text-sm hover:text-accent">Reading</Link>
            <Link href="/sadhana" className="text-sm hover:text-accent">Sadhana</Link>
            <Link href="/quiz" className="text-sm hover:text-accent">Quiz</Link>
            <Link href="/seva" className="text-sm hover:text-accent">Seva Hub</Link>
            <Link href="/philosophy" className="text-sm hover:text-accent">Our Philosophy</Link>
            <Link href="/mission" className="text-sm hover:text-accent">Our Mission</Link>
            <Link href="/privacy-policy" className="text-sm hover:text-accent">Privacy Policy</Link>
            <Link href="/user-agreement" className="text-sm hover:text-accent">User Agreement</Link>
        </div>
      </div>
    </footer>
  );
}
