
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Redo } from 'lucide-react';

const PeethamSymbol = ({
  position,
  animationDelay,
  name,
  icon,
}: {
  position: string;
  animationDelay: string;
  name: string;
  icon: React.ReactNode;
}) => (
  <div
    className={cn(
      'peetham-symbol absolute flex h-24 w-24 flex-col items-center justify-center rounded-full border-[1.5px] border-black/15 bg-white/95 p-2 text-center opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 animate-in fade-in zoom-in',
      position
    )}
    style={{ animationDelay }}
  >
    <div className="flex h-full w-full max-w-12 items-center justify-center">
      {icon}
    </div>
    <div className="mt-1 text-[0.75rem] font-medium uppercase tracking-wider text-gray-700">
      {name}
    </div>
  </div>
);

export function ShankaraStoryCanvas() {
  const [key, setKey] = useState(0);

  const restartAnimation = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      key={key}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-blue-950 text-white"
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Image
          src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/india-map-shivbodh.info--scaled.png"
          alt="India Map Sketch"
          width={800}
          height={800}
          className="h-auto w-[90%] max-w-[800px] animate-fade-in opacity-10 drop-shadow-lg"
        />
      </div>

      <div className="absolute inset-0 z-20">
        <Image
          src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru-hero-banner-1-scaled.png"
          alt="Adi Shankaracharya"
          fill
          className="animate-fade-in-slow object-cover opacity-20 mix-blend-luminosity"
        />
      </div>

      <div className="relative z-40 text-center">
        <h1 className="animate-fade-in-down text-4xl font-bold tracking-tight text-primary text-shadow-lg md:text-6xl">
          The Eternal Journey
        </h1>
        <p
          className="mx-auto mt-4 max-w-3xl animate-fade-in-down text-lg text-foreground/90 text-shadow-md md:text-xl"
          style={{ animationDelay: '0.5s' }}
        >
          Witness the path of Adi Shankaracharya as he established the four
          sacred Peethams, the pillars of Sanatana Dharma.
        </p>
      </div>

      <div className="absolute inset-0 z-30">
        {/* Journey Paths */}
        <div
          className="path-line absolute left-[48%] top-[80%] w-0 -rotate-[130deg] animate-path-draw"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="path-line absolute left-[20%] top-[55%] w-0 rotate-[50deg] animate-path-draw"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="path-line absolute left-[55%] top-[25%] w-0 rotate-[110deg] animate-path-draw"
          style={{ animationDelay: '8s' }}
        />

        {/* Peetham Symbols */}
        <PeethamSymbol
          position="left-[48%] top-[80%]"
          animationDelay="3s"
          name="Sringeri"
          icon={
            <svg
              viewBox="0 0 100 100"
              className="h-10 w-10"
              fill="currentColor"
            >
              <path d="M50 0 L0 50 L50 100 L100 50 Z" />
            </svg>
          }
        />
        <PeethamSymbol
          position="left-[20%] top-[55%]"
          animationDelay="6s"
          name="Dwaraka"
          icon={
            <svg
              viewBox="0 0 100 100"
              className="h-10 w-10"
              fill="currentColor"
            >
              <path d="M80 50 C80 20 20 20 20 50 C20 80 80 80 80 50 Z" />
            </svg>
          }
        />
        <PeethamSymbol
          position="left-[55%] top-[25%]"
          animationDelay="10s"
          name="Jyotirmath"
          icon={
            <svg
              viewBox="0 0 100 100"
              className="h-10 w-10"
              fill="currentColor"
            >
              <path d="M50 10 L10 90 L90 90 Z" />
            </svg>
          }
        />
        <PeethamSymbol
          position="left-[80%] top-[50%]"
          animationDelay="12s"
          name="Puri"
          icon={
            <svg
              viewBox="0 0 100 100"
              className="h-10 w-10"
              fill="currentColor"
            >
              <circle cx="50" cy="50" r="25" />
            </svg>
          }
        />
      </div>

      <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2">
        <Button
          variant="ghost"
          size="sm"
          onClick={restartAnimation}
          className="text-white/50 hover:bg-white/10 hover:text-white"
        >
          <Redo className="mr-2 h-4 w-4" />
          Replay Journey
        </Button>
      </div>
    </div>
  );
}
