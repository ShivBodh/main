
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image/Animation */}
      <Image
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHU2a2w2Z3RtamhxcjQ2ZDE0djMybDVxZ3h5d3J0aXh4aWViOTZqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7SYIm3aJeA_i6Y/giphy.gif"
        alt="Abstract light GIF"
        layout="fill"
        objectFit="cover"
        unoptimized
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-shadow-lg">
          Sanatana Peethams Portal
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-shadow-md">
          A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya.
        </p>
        <Button asChild size="lg" className="mt-8">
            <Link href="/peethams">
                Explore the Lineage <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
        </Button>
      </div>
    </section>
  );
}
