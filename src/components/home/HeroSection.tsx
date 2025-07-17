
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { peethams } from '@/lib/peethams-data';
import React from 'react';

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden bg-gray-900">
      <Image
        src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru-from-shivbodha-.png"
        alt="Adi Shankaracharya meditating"
        fill
        style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
        className="z-10 opacity-60 pointer-events-none"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20"></div>

      <div className="relative z-30 flex flex-col items-center justify-center w-full h-full">
        {/* Content */}
        <div className="relative z-40 mt-auto mb-16 sm:mb-24 px-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-shadow-lg animate-in fade-in-down duration-1000">
                Sanatana Peethams Portal
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-shadow-md animate-in fade-in-down duration-1000 delay-300">
                A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya.
            </p>
            <Button asChild size="lg" className="mt-8 animate-in fade-in-down duration-1000 delay-600">
                <Link href="/mission">
                    Discover Our Mission <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
