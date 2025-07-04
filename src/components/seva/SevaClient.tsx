
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Landmark } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Approximate coordinates for the Peethams on the SVG map below.
// This data is specific to the visual representation on this page.
const peethamLocations = [
    { name: 'Sringeri Sharada Peetham', link: '/peethams/sringeri', x: '46%', y: '78%' },
    { name: 'Dwaraka Sharada Peetham', link: '/peethams/dwaraka', x: '18%', y: '58%' },
    { name: 'Govardhana Peetham, Puri', link: '/peethams/puri', x: '78%', y: '65%' },
    { name: 'Jyotirmath Peetham, Badrinath', link: '/peethams/jyotirmath', x: '58%', y: '20%' }
];

const PeethamMarker = ({ location }: { location: typeof peethamLocations[0] }) => (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={location.link} className="absolute z-10" style={{ top: location.y, left: location.x }}>
                    <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute h-5 w-5 rounded-full bg-primary/50 animate-pulse"></div>
                        <div className="relative h-3 w-3 rounded-full bg-primary border-2 border-primary-foreground"></div>
                    </div>
                </Link>
            </TooltipTrigger>
            <TooltipContent>
                <p>{location.name}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default function SevaClient() {
    return (
        <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
            <div className="text-center mb-16">
                <Landmark className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Connect with the Peethams
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                   A visual journey to the four cardinal centers of Sanatana Dharma. Hover over a point to see the name, and click to explore its history, teachings, and contact information.
                </p>
            </div>

            <Card>
                <CardContent className="p-2 sm:p-6 relative w-full aspect-square md:aspect-[4/3] overflow-hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 800 900"
                        className="absolute inset-0 w-full h-full"
                        aria-hidden="true"
                    >
                        <path
                            d="M 285,100 C 275,120 270,140 260,180 C 240,240 210,300 210,350 C 210,400 230,450 250,480 C 270,510 300,530 330,550 C 360,570 390,580 420,580 C 450,580 480,570 510,550 C 540,530 570,510 590,480 C 610,450 630,400 630,350 C 630,300 610,250 590,200 C 570,150 540,110 510,80 C 480,50 440,30 400,20 C 360,10 320,10 290,40 C 280,50 275,70 285,100 Z"
                            fill="hsl(var(--muted))"
                            stroke="hsl(var(--border))"
                            strokeWidth="1"
                        />
                    </svg>

                    {peethamLocations.map((location) => (
                        <PeethamMarker key={location.name} location={location} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
