
'use client';

import { featuresData } from '@/lib/features-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeatureShowcase() {
    const bubbleStyles = [
        // More, smaller bubbles with varied colors and delays
        { size: 'w-8 h-8', position: 'top-1/4 left-1/4', delay: '0s', color: 'bg-primary/20' },
        { size: 'w-12 h-12', position: 'top-1/2 right-1/4', delay: '2s', color: 'bg-accent/20' },
        { size: 'w-16 h-16', position: 'bottom-1/4 left-1/3', delay: '4s', color: 'bg-secondary/20' },
        { size: 'w-10 h-10', position: 'top-10 right-10', delay: '1s', color: 'bg-primary/20' },
        { size: 'w-20 h-20', position: 'bottom-10 left-10', delay: '3s', color: 'bg-accent/20' },
        { size: 'w-24 h-24', position: 'bottom-1/3 right-1/3', delay: '5s', color: 'bg-secondary/20' },
        { size: 'w-14 h-14', position: 'top-20 left-1/2', delay: '6s', color: 'bg-primary/20' },
        { size: 'w-10 h-10', position: 'bottom-20 right-1/2', delay: '7s', color: 'bg-accent/20' },
        { size: 'w-28 h-28', position: 'top-1/3 left-1/3', delay: '8s', color: 'bg-secondary/20' },
        { size: 'w-12 h-12', position: 'bottom-10 right-1/4', delay: '9s', color: 'bg-primary/20' },
        { size: 'w-6 h-6', position: 'top-1/3 right-1/2', delay: '10s', color: 'bg-accent/20' },
        { size: 'w-10 h-10', position: 'bottom-1/3 left-1/4', delay: '11s', color: 'bg-secondary/20' },
        { size: 'w-14 h-14', position: 'top-1/2 left-10', delay: '12s', color: 'bg-primary/20' },
        { size: 'w-18 h-18', position: 'bottom-1/2 right-10', delay: '13s', color: 'bg-accent/20' },
        { size: 'w-22 h-22', position: 'top-10 left-1/3', delay: '14s', color: 'bg-secondary/20' },
        { size: 'w-5 h-5', position: 'top-3/4 right-1/3', delay: '15s', color: 'bg-primary/20' },
    ];

    return (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                {bubbleStyles.map((bubble, index) => (
                    <div
                        key={index}
                        className={cn(
                            'absolute rounded-full blur-xl animate-bubble-rise',
                            bubble.size,
                            bubble.position,
                            bubble.color,
                        )}
                        style={{ animationDelay: bubble.delay }}
                    />
                ))}
            </div>
            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Portal Features & Tools</h2>
                    <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                        Explore the rich collection of resources designed to support your spiritual journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                    {featuresData.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                             <div key={index} className="relative pt-10 transition-all duration-300 hover:-translate-y-2 group">
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg border-4 border-background z-10`}>
                                     <Icon className="h-10 w-10 text-white/90" strokeWidth={1.5} />
                                </div>
                                <div className="bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg rounded-[28px] overflow-hidden flex flex-col h-full">
                                    <div className="pt-14 p-6 flex flex-col flex-grow text-center">
                                        <h3 className="font-headline text-xl font-bold text-foreground/90">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-2 flex-grow">{feature.description}</p>
                                        <Button asChild size="sm" className={`w-full mt-6 text-white ${feature.buttonColor}`}>
                                            <Link href={feature.link}>
                                                Explore <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
