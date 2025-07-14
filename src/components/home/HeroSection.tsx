
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 z-0 bg-aurora-gradient opacity-30 animate-aurora"></div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 opacity-30 animate-diamond-spin">
          <g className="animate-diamond-light-up">
            <path d="M50 2 L98 50 L50 98 L2 50 Z" strokeWidth="0.5" fill="none" />
            <path d="M50 2 L50 98" strokeWidth="0.25" fill="none" />
            <path d="M2 50 L98 50" strokeWidth="0.25" fill="none" />
            <path d="M25 25 L75 75" strokeWidth="0.1" fill="none" />
            <path d="M75 25 L25 75" strokeWidth="0.1" fill="none" />
            <path d="M50 15 L85 50 L50 85 L15 50 Z" strokeWidth="0.5" fill="none" />
            <path d="M50 2 L50 15" strokeWidth="0.25" fill="none" />
            <path d="M2 50 L15 50" strokeWidth="0.25" fill="none" />
            <path d="M98 50 L85 50" strokeWidth="0.25" fill="none" />
            <path d="M50 98 L50 85" strokeWidth="0.25" fill="none" />
            <path d="M15 50 L25 25 L50 15 L75 25 L85 50 L75 75 L50 85 L25 75 Z" strokeWidth="0.25" fill="none" />
          </g>
        </svg>
      </div>
      
      <div className="container mx-auto text-center px-4 relative z-20">
        <div className="flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh]">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter text-shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-700">
            Sanatana Peethams Portal
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-foreground/90 text-shadow-md animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya.
          </p>
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button asChild size="lg">
              <Link href="/peethams">Explore the Peethams</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
