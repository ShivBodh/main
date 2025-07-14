
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Redo } from 'lucide-react';

const peethamData = [
    { id: 'south', name: 'Sringeri', color: 'text-green-400', top: '80%', left: '48%' },
    { id: 'west', name: 'Dwaraka', color: 'text-red-400', top: '55%', left: '20%' },
    { id: 'east', name: 'Puri', color: 'text-yellow-400', top: '50%', left: '80%' },
    { id: 'north', name: 'Jyotirmath', color: 'text-blue-400', top: '25%', left: '55%' }
];

const pathSegments = [
    { id: 'segment-1', delay: 1, duration: 3, top: '68%', left: '34%', transform: 'rotate(130deg) scaleX(1.3)' },
    { id: 'segment-2', delay: 4, duration: 4, top: '38%', left: '38%', transform: 'rotate(50deg) scaleX(1.1)' },
    { id: 'segment-3', delay: 8, duration: 4, top: '40%', left: '68%', transform: 'rotate(110deg) scaleX(0.8)' }
];

export function ShankaraStoryCanvas() {
    const [animationState, setAnimationState] = useState(0);

    const restartAnimation = () => {
        setAnimationState(prev => prev + 1);
    };

    useEffect(() => {
        // This effect can be used to automatically restart the animation or for other side effects.
    }, [animationState]);

    return (
        <div key={animationState} className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-blue-950 flex flex-col justify-center items-center text-white">
            <div className="absolute inset-0 z-0">
                {/* Particles */}
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-amber-200/50 animate-particle"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${Math.random() * 10 + 10}s`
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 z-10">
                <Image
                    src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/india-map-sketch.svg"
                    alt="India Map Sketch"
                    layout="fill"
                    objectFit="contain"
                    className="opacity-10 animate-fade-in"
                />
            </div>
            
             <div className="absolute inset-0 z-20">
                <Image
                    src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru-hero-banner-1-scaled.png"
                    alt="Adi Shankaracharya"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20 animate-fade-in-slow mix-blend-luminosity"
                />
             </div>

            <div className="relative z-30 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter text-shadow-lg animate-fade-in-down">
                    The Eternal Journey
                </h1>
                <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-foreground/90 text-shadow-md animate-fade-in-down" style={{animationDelay: '0.5s'}}>
                    Witness the path of Adi Shankaracharya as he established the four sacred Peethams, the pillars of Sanatana Dharma.
                </p>
                <div className="mt-8 animate-fade-in-down" style={{animationDelay: '1s'}}>
                    <Button asChild size="lg">
                        <Link href="/peethams">Explore the Peethams</Link>
                    </Button>
                </div>
            </div>

            <div className="absolute inset-0 z-20">
                {pathSegments.map(seg => (
                    <div
                        key={seg.id}
                        className="absolute h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent animate-path-draw"
                        style={{ 
                            top: seg.top, 
                            left: seg.left,
                            transform: seg.transform,
                            width: '25%', 
                            animationDelay: `${seg.delay}s`,
                            animationDuration: `${seg.duration}s`
                        }}
                    />
                ))}

                {peethamData.map((peetham, index) => (
                    <div
                        key={peetham.id}
                        className="absolute animate-symbol-glow"
                        style={{ 
                            top: peetham.top, 
                            left: peetham.left,
                            animationDelay: `${index * 3 + 3}s`
                        }}
                    >
                        <div className={cn("text-5xl font-bold opacity-80", peetham.color)}>•</div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap">{peetham.name}</div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                <Button variant="ghost" size="sm" onClick={restartAnimation} className="text-white/50 hover:text-white hover:bg-white/10">
                    <Redo className="mr-2 h-4 w-4"/>
                    Replay Journey
                </Button>
            </div>
        </div>
    );
}
