
'use client';

import Image from 'next/image';
import { Clock, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Peetham } from '@/lib/peethams-data';
import { Skeleton } from '@/components/ui/skeleton';

interface AcharyaCardProps {
  acharya: Peetham['acharyaDetails'];
}

export function AcharyaCard({ acharya }: AcharyaCardProps) {
  return (
    <div className="w-full h-[500px] bg-card shadow-lg rounded-lg overflow-hidden">
      {/* Hero Image Section */}
      <div className="group relative w-full h-[175px] bg-secondary/20">
        <Image
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHU2a2w2Z3RtamhxcjQ2ZDE0djMybDVxZ3h5d3J0aXh4aWViOTZqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7SYIm3aJeA_i6Y/giphy.gif"
          alt={`An artistic painting related to ${acharya.peetham}`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute right-4 top-4 w-16 h-16 bg-primary rounded-full text-primary-foreground flex flex-col justify-center items-center font-headline shadow-md">
          <span className="text-xl font-bold leading-tight">2025</span>
          <span className="text-xs font-semibold">Cāturmāsya</span>
        </div>
        
        {/* Photo Gallery Hover Effect */}
        <div className="absolute bottom-0 left-0 h-10 w-28 bg-primary text-primary-foreground text-lg font-bold flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out group-hover:w-full group-hover:h-full">
          <span className="group-hover:hidden">Photos</span>
          <div className="hidden group-hover:flex w-full h-full p-1 flex-col gap-1">
             {[...Array(3)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex w-full h-1/3 gap-1">
                  {[...Array(3)].map((_, colIndex) => (
                    <div key={colIndex} className="relative w-1/3 h-full bg-black/20 opacity-70 hover:opacity-100 transition-opacity">
                       <Image
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHU2a2w2Z3RtamhxcjQ2ZDE0djMybDVxZ3h5d3J0aXh4aWViOTZqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7SYIm3aJeA_i6Y/giphy.gif"
                        alt={`Abstract light GIF ${rowIndex * 3 + colIndex + 1}`}
                        fill
                        unoptimized
                        sizes="10vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col h-[calc(500px-175px)]">
        <h2 className="text-xl font-bold font-headline text-primary">{acharya.name}</h2>
        <h3 className="text-md font-semibold text-accent mb-3">{acharya.peetham}</h3>
        <p className="flex-grow text-sm text-foreground/80 leading-relaxed overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <strong>Appointment:</strong> {acharya.appointment} <br/>
          <strong>Focus:</strong> {acharya.focus}
        </p>
        <div className="flex justify-between text-xs text-muted-foreground pt-4 border-t mt-auto">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Updates for 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>Official Announcements</span>
          </div>
        </div>
      </div>
    </div>
  );
}
