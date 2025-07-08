
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { format, isSameDay } from 'date-fns';
import { allCalendarItems, UnifiedCalendarItem, CalendarEventItem, CalendarPhotoItem, CalendarVideoItem } from '@/lib/calendar-data';
import { peethamBadgeColors, peethamDotColors, Peetham, peethamFilterCards } from '@/lib/events-data';
import { Gem, Camera, Video, Calendar as CalendarIcon, BookOpenText, RefreshCw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PhotoCard } from '@/components/media/PhotoCard';
import { VideoCard } from '@/components/media/VideoCard';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Calendar } from '@/components/ui/calendar';
import type { DayProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const EventCard = ({ event }: { event: CalendarEventItem }) => (
    <Card className="border-l-4" style={{ borderColor: peethamDotColors[event.peetham] }}>
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


export default function EventsClient() {
    const [allItems, setAllItems] = useState<UnifiedCalendarItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<Record<Peetham, boolean>>({
        Sringeri: true,
        Dwaraka: true,
        Puri: true,
        Jyotirmath: true,
    });
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const fetchScrapedMedia = useCallback(async () => {
        setIsLoading(true);
        let firestoreItems: UnifiedCalendarItem[] = [];
        if (db) {
            try {
                const mediaCollection = collection(db, 'media');
                const q = query(mediaCollection, orderBy('date', 'desc'));
                const querySnapshot = await getDocs(q);
                
                firestoreItems = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        date: data.date, 
                        peetham: data.peetham,
                        type: data.type,
                        title: data.title,
                        description: data.description,
                        imageUrl: data.imageUrl,
                        thumbnailUrl: data.thumbnailUrl,
                        aiHint: data.aiHint,
                    } as CalendarPhotoItem;
                });
            } catch (error) {
                console.error("Error fetching media from Firestore:", error);
            }
        } else {
             console.log("Firestore not configured, using only static data.");
        }
        
        const combinedItems = [...firestoreItems, ...allCalendarItems]
            .sort((a, b) => new Date(b.date.replace(/-/g, '/')).getTime() - new Date(a.date.replace(/-/g, '/')).getTime());
        
        setAllItems(combinedItems);
        
        if (combinedItems.length > 0 && !selectedDate) {
            setSelectedDate(new Date(combinedItems[0].date.replace(/-/g, '/')));
        } else if (combinedItems.length > 0 && selectedDate) {
             // Keep existing selected date
        } else {
            setSelectedDate(new Date()); // Default to today if no items
        }

        setIsLoading(false);
    }, [selectedDate]);

    useEffect(() => {
        fetchScrapedMedia();
    }, [fetchScrapedMedia]);
    
    const handleFilterChange = (peetham: Peetham, checked: boolean) => {
        setFilters(prev => ({ ...prev, [peetham]: checked }));
    };

    const filteredItems = useMemo(() => {
        const activePeethams = (Object.keys(filters) as Peetham[]).filter(p => filters[p]);
        return allItems.filter(item => activePeethams.includes(item.peetham));
    }, [filters, allItems]);

    const latestItems = useMemo(() => {
        return filteredItems.filter(item => item.type === 'photo' || item.type === 'video').slice(0, 5)
    }, [filteredItems]);

    const peethamsByDate = useMemo(() => {
        const map = new Map<string, Set<Peetham>>();
        filteredItems.forEach(item => {
            const dateStr = item.date; // The date is already in 'YYYY-MM-DD' format
            if (!map.has(dateStr)) {
                map.set(dateStr, new Set());
            }
            map.get(dateStr)!.add(item.peetham);
        });
        return map;
    }, [filteredItems]);

    const itemsForSelectedDate = useMemo(() => {
        if (!selectedDate) return [];
        return filteredItems.filter(item => isSameDay(new Date(item.date.replace(/-/g, '/')), selectedDate));
    }, [selectedDate, filteredItems]);

    function DayContent(props: DayProps) {
        const peethamsOnDay = peethamsByDate.get(format(props.date, 'yyyy-MM-dd'));
        const dayPeethams = peethamsOnDay ? Array.from(peethamsOnDay) : [];
        
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <p>{format(props.date, 'd')}</p>
            {dayPeethams.length > 0 && (
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-px">
                {dayPeethams.slice(0, 4).map(p => (
                  <span
                    key={p}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: peethamDotColors[p] }}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }

    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight flex items-center justify-center gap-4">
                    <Gem className="h-10 w-10" />
                    Bodha Calendar
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    A living encyclopedia of daily events, discourses, and media from the four cardinal Peethams.
                </p>
                <Button onClick={fetchScrapedMedia} variant="outline" className="mt-6">
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh Content
                </Button>
            </div>

            {isLoading && (
                <div className="space-y-12">
                    <Skeleton className="h-64 w-full" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2"><Skeleton className="h-96 w-full" /></div>
                        <div className="md:col-span-1"><Skeleton className="h-96 w-full" /></div>
                    </div>
                </div>
            )}
            
            {!isLoading && allItems.length === 0 && (
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Content Found in Firestore</AlertTitle>
                    <AlertDescription>
                        <p>The calendar is empty. This is expected if you haven't run the content scraper yet.</p>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Open a terminal in your project root.</li>
                          <li>Run the command: <code className="font-mono bg-muted px-1.5 py-0.5 rounded">npm run scrape</code></li>
                          <li>Once it completes, come back here and click the "Refresh Content" button.</li>
                        </ol>
                    </AlertDescription>
                </Alert>
            )}

            {!isLoading && allItems.length > 0 && (
                <>
                <section className="mb-16">
                    <h2 className="text-2xl font-headline font-bold text-center mb-8">Latest Media Updates</h2>
                    {latestItems.length > 0 ? (
                        <Carousel
                          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                          className="w-full"
                          opts={{ loop: latestItems.length > 1, align: 'start' }}
                        >
                            <CarouselContent className="-ml-4">
                                {latestItems.map((item) => (
                                     <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1 h-full">
                                            {item.type === 'photo' && <PhotoCard item={item as CalendarPhotoItem} />}
                                            {item.type === 'video' && <VideoCard item={item as CalendarVideoItem} />}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden sm:flex" />
                            <CarouselNext className="hidden sm:flex" />
                        </Carousel>
                    ) : (
                        <p className="text-center text-muted-foreground">No recent media found for the selected Peethams.</p>
                    )}
                </section>
                
                <section className="mb-16">
                    <h2 className="text-2xl font-headline font-bold text-center mb-8">Explore by Peetham</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {peethamFilterCards.map(p => (
                            <Card key={p.peetham} className={cn("flex items-center p-4 transition-all duration-300", filters[p.peetham] ? p.colorClasses : 'bg-card border-border')}>
                                 <div className="p-3 rounded-full mr-4" style={{backgroundColor: peethamDotColors[p.peetham]}}>
                                    <p.icon className="h-6 w-6 text-white"/>
                                </div>
                                <div className="flex-grow">
                                    <Label htmlFor={`filter-${p.peetham}`} className="font-bold text-lg">{p.peetham}</Label>
                                    <p className="text-xs">{p.veda}</p>
                                </div>
                                <Switch
                                    id={`filter-${p.peetham}`}
                                    checked={filters[p.peetham]}
                                    onCheckedChange={(checked) => handleFilterChange(p.peetham, checked)}
                                />
                            </Card>
                        ))}
                    </div>
                </section>
                
                <section>
                     <h2 className="text-2xl font-headline font-bold text-center mb-8">Daily Activity</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3">
                            <Card>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    components={{ Day: DayContent }}
                                    className="p-4"
                                    footer={
                                        <div className="flex justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-4 border-t flex-wrap">
                                            {peethamFilterCards.map(p => (
                                                <div key={p.peetham} className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full" style={{backgroundColor: peethamDotColors[p.peetham]}}></span>
                                                    {p.peetham}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                />
                            </Card>
                        </div>
                        <div className="lg:col-span-2">
                            <h3 className="font-headline text-xl mb-4">
                                Activities for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '...'}
                            </h3>
                            <ScrollArea className="h-[60vh] pr-4">
                                <div className="space-y-4">
                                    {itemsForSelectedDate.length > 0 ? itemsForSelectedDate.map(item => (
                                        <div key={item.id}>
                                             {item.type === 'photo' && <PhotoCard item={item as CalendarPhotoItem} />}
                                             {item.type === 'video' && <VideoCard item={item as CalendarVideoItem} />}
                                             {item.type === 'event' && <EventCard event={item as CalendarEventItem} />}
                                        </div>
                                    )) : (
                                        <Card className="flex items-center justify-center h-48 border-dashed">
                                            <p className="text-muted-foreground text-center">No activities found for this day. <br/> Select another date on the calendar.</p>
                                        </Card>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </section>
                </>
            )}
        </div>
    );
}
