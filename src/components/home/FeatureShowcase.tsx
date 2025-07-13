
'use client';

import { featuresData } from '@/lib/features-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeatureShowcase() {
    const colorClasses: Record<string, { border: string; bg: string; text: string; button: string }> = {
        blue: {
            border: 'border-feature-blue',
            bg: 'bg-feature-blue',
            text: 'text-feature-blue',
            button: 'bg-feature-blue hover:bg-feature-blue/90',
        },
        pink: {
            border: 'border-feature-pink',
            bg: 'bg-feature-pink',
            text: 'text-feature-pink',
            button: 'bg-feature-pink hover:bg-feature-pink/90',
        },
        green: {
            border: 'border-feature-green',
            bg: 'bg-feature-green',
            text: 'text-feature-green',
            button: 'bg-feature-green hover:bg-feature-green/90',
        },
        orange: {
            border: 'border-feature-orange',
            bg: 'bg-feature-orange',
            text: 'text-feature-orange',
            button: 'bg-feature-orange hover:bg-feature-orange/90',
        },
        purple: {
            border: 'border-feature-purple',
            bg: 'bg-feature-purple',
            text: 'text-feature-purple',
            button: 'bg-feature-purple hover:bg-feature-purple/90',
        },
        cyan: {
            border: 'border-feature-cyan',
            bg: 'bg-feature-cyan',
            text: 'text-feature-cyan',
            button: 'bg-feature-cyan hover:bg-feature-cyan/90',
        },
        yellow: {
            border: 'border-feature-yellow',
            bg: 'bg-feature-yellow',
            text: 'text-feature-yellow',
            button: 'bg-feature-yellow hover:bg-feature-yellow/90',
        },
    };
    
    const getColors = (colorName: string) => colorClasses[colorName] || colorClasses.blue;

    return (
        <section className="py-16 md:py-24 bg-[#1a1a1a]">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Portal Features & Tools</h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                        Explore the rich collection of resources designed to support your spiritual journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {featuresData.map((feature, index) => {
                        const Icon = feature.icon;
                        const colors = getColors(feature.accentColor);
                        return (
                            <div key={index} className={cn("relative group bg-[#2e2e2e] p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2", colors.border)}>
                                <div className={cn("absolute -top-6 left-6 h-16 w-16 flex items-center justify-center rounded-xl", colors.bg)}>
                                    <Icon className="h-8 w-8 text-white" />
                                </div>
                                <div className="mt-12 text-left">
                                    <h3 className="font-headline text-xl font-bold text-white uppercase">{feature.title}</h3>
                                    <p className="text-sm text-gray-400 mt-2 h-20">{feature.description}</p>
                                    <Button asChild size="sm" className={cn("w-full mt-4 text-white", colors.button)}>
                                        <Link href={feature.link}>
                                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
