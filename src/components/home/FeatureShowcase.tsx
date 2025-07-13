
'use client';

import { featuresData } from '@/lib/features-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeatureShowcase() {
    const bubbleStyles = [
        { size: 'w-40 h-40', position: 'top-1/4 left-1/4', delay: 'animation-delay-0', color: 'bg-primary/20' },
        { size: 'w-24 h-24', position: 'top-1/2 right-1/4', delay: 'animation-delay-2s', color: 'bg-accent/20' },
        { size: 'w-16 h-16', position: 'bottom-1/4 left-1/3', delay: 'animation-delay-4s', color: 'bg-secondary/20' },
        { size: 'w-32 h-32', position: 'top-10 right-10', delay: 'animation-delay-1s', color: 'bg-primary/10' },
        { size: 'w-20 h-20', position: 'bottom-10 left-10', delay: 'animation-delay-3s', color: 'bg-accent/10' },
        { size: 'w-48 h-48', position: 'bottom-1/3 right-1/3', delay: 'animation-delay-5s', color: 'bg-secondary/10' },
    ];

    return (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                {bubbleStyles.map((bubble, index) => (
                    <div
                        key={index}
                        className={cn(
                            'absolute rounded-full blur-2xl animate-bubble-rise',
                            bubble.size,
                            bubble.position,
                            bubble.color,
                        )}
                        style={{ animationDelay: bubble.delay.split('-')[2] }}
                    />
                ))}
            </div>
            <div className="container mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Portal Features & Tools</h2>
                    <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                        Explore the rich collection of resources designed to support your spiritual journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresData.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="overflow-hidden rounded-xl bg-card/60 backdrop-blur-sm border-border/50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 flex flex-col">
                                <div className={`h-40 flex items-center justify-center bg-gradient-to-br ${feature.gradient}`}>
                                    <Icon className="h-20 w-20 text-white/90" strokeWidth={1.5} />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-headline text-xl font-bold text-foreground/90">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-2 flex-grow">{feature.description}</p>
                                    <Button asChild size="sm" className={`w-full mt-6 text-white ${feature.buttonColor}`}>
                                        <Link href={feature.link}>
                                            Explore <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
