
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Acharya {
  name: string;
  period: string;
  description: string;
}

interface LineageTimelineProps {
  lineage: Acharya[];
}

// This component is being phased out in favor of the new AcharyaCard.
// It is kept for now to avoid breaking the peetham detail pages but can be removed later.
export function LineageTimeline({ lineage }: LineageTimelineProps) {
  if (!lineage || lineage.length === 0) {
    return (
        <Card className="flex items-center justify-center h-48">
            <CardContent className="text-center text-muted-foreground p-6">
                <p>Lineage information is not yet available for this Peetham.</p>
                <p className="text-sm mt-2">This section will be updated with the revered Guru Parampara soon.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="w-full">
        <Carousel
        opts={{
            align: "start",
            loop: false,
        }}
        className="w-full"
        >
        <CarouselContent className="-ml-4">
            {lineage.map((acharya, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="p-1 h-full">
                    <Card className="h-full flex flex-col animate-in fade-in-50 duration-700 fill-mode-both" style={{animationDelay: `${index * 150}ms`}}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
                                <BookUser className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-xl">{acharya.name}</CardTitle>
                                <p className="text-sm font-semibold text-muted-foreground">{acharya.period}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-foreground/80">{acharya.description}</p>
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden sm:flex" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden sm:flex" />
        </Carousel>
    </div>
  );
}
