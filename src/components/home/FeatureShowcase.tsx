
'use client';

import { featuresData } from '@/lib/features-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FeatureShowcase() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto">
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
                            <Card key={index} className="overflow-hidden rounded-xl shadow-lg border-border/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
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
