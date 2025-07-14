
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Redo, BookOpen, Shell, Mountain, Flag } from 'lucide-react';

const PeethamSymbol = ({
  position,
  name,
  icon,
}: {
  position: string;
  name: string;
  icon: React.ReactNode;
}) => (
  <div
    className={cn(
      'absolute flex flex-col items-center justify-center rounded-full bg-white/95 p-2 text-center shadow-lg',
      position,
      'w-[90px] h-[90px] md:w-[100px] md:h-[100px]',
      'border-[1.5px] border-black/15'
    )}
  >
    <div className="flex h-full max-h-[50px] w-full max-w-[50px] items-center justify-center text-primary">
      {icon}
    </div>
    <div className="mt-1 text-[0.6rem] md:text-[0.75rem] font-medium uppercase tracking-wider text-gray-700">
      {name}
    </div>
  </div>
);


export function ShankaraStoryCanvas() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-slate-800">
        
       <div className="z-40 pt-16 text-center">
        <h1 className="animate-fade-in-down text-4xl font-bold tracking-tight text-primary text-shadow-lg md:text-5xl">
          Sanatana Peethams Portal
        </h1>
        <p
          className="mx-auto mt-4 max-w-2xl animate-fade-in-down text-base text-foreground/80 text-shadow-md md:text-lg"
          style={{ animationDelay: '0.5s' }}
        >
          We are the world's first platform to provide authentic Shankaracharya media, books, and speeches in an organized way for our worldwide Sanatana community.
        </p>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/india-map-shivbodh.info--scaled.png"
          alt="India Map Sketch"
          width={800}
          height={800}
          unoptimized
          className="h-auto w-[90%] max-w-[800px] opacity-20 drop-shadow-lg"
        />
      </div>

      <div className="absolute inset-0 z-0">
        <Image
          src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru-hero-banner-1-scaled.png"
          alt="Adi Shankaracharya"
          fill
          className="object-cover opacity-5 mix-blend-luminosity"
        />
      </div>
      
      <div className="absolute inset-0 z-30">
        <PeethamSymbol
          position="top-[65%] left-[35%]"
          name="Sringeri"
          icon={<BookOpen className="h-10 w-10" />}
        />
        <PeethamSymbol
          position="top-[40%] left-[25%]"
          name="Dwaraka"
          icon={<Shell className="h-10 w-10" />}
        />
        <PeethamSymbol
          position="top-[25%] left-[45%]"
          name="Jyotirmath"
          icon={<Mountain className="h-10 w-10" />}
        />
        <PeethamSymbol
          position="top-[45%] left-[55%]"
          name="Puri"
          icon={<Flag className="h-10 w-10" />}
        />
      </div>
    </div>
  );
}
