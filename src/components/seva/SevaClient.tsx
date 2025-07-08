
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Landmark, ExternalLink } from 'lucide-react';

export default function SevaClient() {
    const mapUrl = "https://mcp-maps-3d-540744813374.us-west1.run.app?key=AIzaSyAqWV5SY9xlbqgd15uKAh9fhYzcaB1tIOc";

    return (
        <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
            <div className="text-center mb-16">
                <Landmark className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Explore the Sacred Geography
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                   Embark on an interactive 3D journey to the four cardinal Peethams established by Adi Shankaracharya. Click the button below to launch the map in a new window.
                </p>
            </div>

            <Card>
                <CardContent className="p-0 relative w-full aspect-video overflow-hidden rounded-lg border shadow-lg group">
                    <Image
                        src="https://images.unsplash.com/photo-1588206941151-fe202b857a22?q=80&w=1200&h=675&fit=crop"
                        alt="Interactive 3D Map Preview"
                        data-ai-hint="india map"
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                         <Button asChild size="lg" className="text-lg">
                            <Link href={mapUrl} target="_blank" rel="noopener noreferrer">
                                Launch Interactive Map
                                <ExternalLink className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <p className="text-white/80 mt-4 text-sm">Opens in a new tab</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
