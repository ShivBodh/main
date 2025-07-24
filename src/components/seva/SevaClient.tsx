
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Landmark, ExternalLink } from 'lucide-react';

export default function SevaClient() {
    const mapUrl = "https://6000-firebase-studio-1751398789728.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev/";

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
                        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHU2a2w2Z3RtamhxcjQ2ZDE0djMybDVxZ3h5d3J0aXh4aWViOTZqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7SYIm3aJeA_i6Y/giphy.gif"
                        alt="Abstract light GIF"
                        width={1200}
                        height={675}
                        unoptimized
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
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
