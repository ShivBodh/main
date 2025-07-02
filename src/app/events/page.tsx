
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { allCalendarItems, UnifiedCalendarItem, CalendarEventItem, CalendarYouTubeItem, CalendarFacebookItem, CalendarPhotoItem } from '@/lib/calendar-data';
import { peethamBadgeColors, peethamDotColors, Peetham } from '@/lib/events-data';
import { VenetianMask, Video, Facebook, PlayCircle, Camera } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const EventCard = ({ event }: { event: CalendarEventItem }) => (
    <Card key={event.id} className="border-l-4" style={{ borderColor: peethamDotColors[event.peetham] }}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                <Badge variant="outline" className={`${peethamBadgeColors[event.peetham]}`}>
                    {event.peetham}
                </Badge>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{event.category}</p>
        </CardHeader>
        <CardContent>
            <p className="text-foreground/80 mb-4">{event.description}</p>
            {(event.story || (event.references && event.references.length > 0)) && (
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`event-${event.id}`} className="border-b-0">
                        <AccordionTrigger className="text-sm p-0 hover:no-underline text-accent">
                            Learn More
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 text-sm text-foreground/80 prose prose-sm max-w-none">
                            {event.story && <p className="mb-4">{event.story}</p>}
                            {event.references && event.references.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-foreground/90 not-prose">References:</h4>
                                    <ul className="list-disc list-inside mt-1">
                                        {event.references.map((ref, index) => (
                                            <li key={index}>{ref}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </CardContent>
    </Card>
);

const MediaCard = ({ item }: { item: CalendarYouTubeItem | CalendarFacebookItem }) => {
    const isYoutube = item.type === 'youtube';
    const videoId = isYoutube ? (item as CalendarYouTubeItem).videoId : '';
    const facebookUrl = !isYoutube ? (item as CalendarFacebookItem).url : '';
    const youtubeUrl = isYoutube ? `https://www.youtube.com/watch?v=${videoId}` : '';

    return (
        <Card key={item.id} className="border-l-4" style={{ borderColor: peethamDotColors[item.peetham] }}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                    <Badge variant="outline" className={`${peethamBadgeColors[item.peetham]}`}>
                        {item.peetham}
                    </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    {isYoutube ? <Video className="h-4 w-4 text-accent" /> : <Facebook className="h-4 w-4 text-accent" />}
                    {isYoutube ? 'YouTube Video' : 'Facebook Post'}
                </p>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/80 mb-4">{item.description}</p>
                {isYoutube ? (
                     <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video rounded-lg overflow-hidden group bg-secondary">
                        <Image src={`https://placehold.co/800x450.png`} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={`${item.peetham.toLowerCase()} monastery`} />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <PlayCircle className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                    </a>
                ) : (
                    <Button asChild>
                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                            <Facebook className="mr-2 h-4 w-4" /> View on Facebook
                        </a>
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

const PhotoCard = ({ item }: { item: CalendarPhotoItem }) => (
    <Card key={item.id} className="border-l-4" style={{ borderColor: peethamDotColors[item.peetham] }}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                <Badge variant="outline" className={`${peethamBadgeColors[item.peetham]}`}>
                    {item.peetham}
                </Badge>
            </div>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Camera className="h-4 w-4 text-accent" />
                Photo from Gallery
            </p>
        </CardHeader>
        <CardContent>
             <div className="relative aspect-video rounded-lg overflow-hidden group bg-secondary">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
            </div>
            <p className="text-foreground/80 mt-4">{item.description}</p>
        </CardContent>
    </Card>
);


export default function EventsPage() {
    const [date, setDate] = useState<Date | undefined>();
    const [isClient, setIsClient] = useState(false);
    const [filters, setFilters] = useState<Record<Peetham, boolean>>({
        Sringeri: true,
        Dwaraka: true,
        Puri: true,
        Jyotirmath: true,
    });

    useEffect(() => {
        // Set initial date only on the client
        setDate(new Date());
        setIsClient(true);
    }, []);

    const handleFilterChange = (peetham: Peetham) => {
        setFilters(prev => ({ ...prev, [peetham]: !prev[peetham] }));
    };
    
    const selectedDateItems = useMemo(() => {
        if (!date) return [];
        const selectedDateString = format(date, 'yyyy-MM-dd');
        return allCalendarItems.filter(item =>
            item.date === selectedDateString && filters[item.peetham]
        );
    }, [date, filters]);

    const calendarDayItems = useMemo(() => {
        const itemsByDate: Record<string, Peetham[]> = {};
        allCalendarItems.forEach(item => {
            if (filters[item.peetham]) {
                if (!itemsByDate[item.date]) {
                    itemsByDate[item.date] = [];
                }
                if (!itemsByDate[item.date].includes(item.peetham)) {
                    itemsByDate[item.date].push(item.peetham);
                }
            }
        });
        return itemsByDate;
    }, [filters]);

    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Bodha Calendar
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Explore a living calendar of daily events, discourses, and media from the four cardinal Peethams. Select a date to discover the sacred activities and teachings from that day.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Filter by Peetham</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(Object.keys(filters) as Peetham[]).map((peetham) => (
                                <div key={peetham} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={peetham}
                                        checked={filters[peetham]}
                                        onCheckedChange={() => handleFilterChange(peetham)}
                                    />
                                    <Label htmlFor={peetham} className="text-base font-medium">
                                        {peetham}
                                    </Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="flex justify-center p-2">
                       {isClient ? (
                           <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="p-0"
                                components={{
                                    DayContent: ({ date: dayDate }) => {
                                        const dateString = format(dayDate, 'yyyy-MM-dd');
                                        const peethamsOnDay = calendarDayItems[dateString] || [];
                                        
                                        return (
                                            <div className='relative h-full w-full flex items-center justify-center'>
                                                <span>{dayDate.getDate()}</span>
                                                {peethamsOnDay.length > 0 && (
                                                    <div className="absolute bottom-1 flex space-x-0.5">
                                                        {peethamsOnDay.map(p => (
                                                            <div key={p} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: peethamDotColors[p] }}></div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                }}
                            />
                       ) : (
                           <div className="p-3">
                                <div className="flex justify-center pt-1 relative items-center mb-4">
                                    <Skeleton className="h-6 w-28" />
                                </div>
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex space-x-1">
                                            {[...Array(7)].map((_, j) => (
                                                <Skeleton key={j} className="h-9 w-9" />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                           </div>
                       )}
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card className="min-h-[600px]">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">
                                {isClient && date ? `Content for: ${format(date, 'MMMM d, yyyy')}` : <Skeleton className="h-8 w-48" />}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isClient && date ? (
                                selectedDateItems.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedDateItems.map(item => {
                                            switch (item.type) {
                                                case 'event':
                                                    return <EventCard key={item.id} event={item as CalendarEventItem} />;
                                                case 'youtube':
                                                case 'facebook':
                                                    return <MediaCard key={item.id} item={item as CalendarYouTubeItem | CalendarFacebookItem} />;
                                                case 'photo':
                                                    return <PhotoCard key={item.id} item={item as CalendarPhotoItem} />;
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-16">
                                        <VenetianMask className="h-16 w-16 mb-4 text-primary" />
                                        <p className="text-lg font-semibold">No events or media for this day.</p>
                                        <p>Please select another date on the calendar.</p>
                                    </div>
                                )
                            ) : (
                               <div className="space-y-4">
                                 <Skeleton className="h-40 w-full" />
                                 <Skeleton className="h-40 w-full" />
                                 <Skeleton className="h-40 w-full" />
                               </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
