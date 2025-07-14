
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Redo, BookOpen, Shell, Mountain, Flag } from 'lucide-react';

const PeethamSymbol = ({
  position,
  animationKey,
  name,
  icon,
}: {
  position: string;
  animationKey: string;
  name: string;
  icon: React.ReactNode;
}) => (
  <div
    key={animationKey}
    className={cn(
      'peetham-symbol absolute flex flex-col items-center justify-center rounded-full bg-white/95 p-2 text-center shadow-lg',
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

const PathLine = ({ animationKey, position, rotation }: { animationKey: string; position: string; rotation: string }) => (
    <div
        key={animationKey}
        className={cn(
            'path-line absolute h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent',
            position,
            rotation
        )}
    ></div>
);

export function ShankaraStoryCanvas() {
  const [animationKey, setAnimationKey] = useState(0);

  const restartAnimation = () => {
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-slate-800">
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
      
      <div key={animationKey} className="absolute inset-0 z-30">
        <PathLine animationKey={`path-1-${animationKey}`} position="top-[65%] left-[35%] w-[180px] -rotate-45" rotation="path-1" />
        <PathLine animationKey={`path-2-${animationKey}`} position="top-[40%] left-[25%] w-[180px] rotate-[60deg]" rotation="path-2" />
        <PathLine animationKey={`path-3-${animationKey}`} position="top-[25%] left-[45%] w-[180px] -rotate-30" rotation="path-3" />

        <PeethamSymbol
          animationKey={`sringeri-${animationKey}`}
          position="top-[65%] left-[35%] sringeri-icon"
          name="Sringeri"
          icon={
            <BookOpen className="h-10 w-10" />
          }
        />
        <PeethamSymbol
          animationKey={`dwaraka-${animationKey}`}
          position="top-[40%] left-[25%] dwaraka-icon"
          name="Dwaraka"
          icon={
            <Shell className="h-10 w-10" />
          }
        />
        <PeethamSymbol
          animationKey={`jyotirmath-${animationKey}`}
          position="top-[25%] left-[45%] jyotirmath-icon"
          name="Jyotirmath"
          icon={
            <Mountain className="h-10 w-10" />
          }
        />
        <PeethamSymbol
          animationKey={`puri-${animationKey}`}
          position="top-[45%] left-[55%] puri-icon"
          name="Puri"
          icon={
            <Flag className="h-10 w-10" />
          }
        />
      </div>

      <div className="absolute z-40 p-4 top-[20%] text-center">
        <h1 className="animate-fade-in-down text-4xl font-bold tracking-tight text-primary text-shadow-lg md:text-5xl">
          Sanatana Peethams Portal
        </h1>
        <p
          className="typing-animation mx-auto mt-4 max-w-2xl animate-fade-in-down text-base text-foreground/80 text-shadow-md md:text-lg"
          style={{ animationDelay: '0.5s' }}
        >
          We are the world's first platform to provide authentic Shankaracharya media, books, and speeches in an organized way for our worldwide Sanatana community.
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2">
        <Button
          variant="ghost"
          size="sm"
          onClick={restartAnimation}
          className="text-slate-600/50 hover:bg-slate-900/5 hover:text-slate-900"
        >
          <Redo className="mr-2 h-4 w-4" />
          Replay Journey
        </Button>
      </div>
    </div>
  );
}
