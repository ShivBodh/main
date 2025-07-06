'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Landmark } from 'lucide-react';

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
                   Embark on an interactive 3D journey to the four cardinal Peethams established by Adi Shankaracharya. Explore the sacred sites and their surroundings in this immersive map experience.
                </p>
            </div>

            <Card>
                <CardContent className="p-0 relative w-full aspect-video overflow-hidden rounded-lg border shadow-lg">
                    <iframe
                        src={mapUrl}
                        className="absolute top-0 left-0 w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        title="Interactive 3D Map of Peethams"
                    ></iframe>
                </CardContent>
            </Card>
        </div>
    );
}
