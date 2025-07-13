
'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, isSameDay, addMonths } from 'date-fns';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { UnifiedCalendarItem, CalendarEventItem, CalendarPhotoItem, CalendarVideoItem } from '@/lib/calendar-data';
import { peethamBadgeColors, peethamDotColors, Peetham, peethamFilterCards } from '@/lib/events-data';
import { Gem, Camera, Video, Calendar as CalendarIcon, BookOpenText, RefreshCw, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PhotoCard } from '@/components/media/PhotoCard';
import { VideoCard } from '@/components/media/VideoCard';
import { Calendar } from '@/components/ui/calendar';
import type { DayProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSwipeable } from 'react-swipeable';

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
    const [isLoading, setIsLoading] = useState(true);
    const [calendarItems, setCalendarItems] = useState<UnifiedCalendarItem[]>([]);
    const [filters, setFilters] = useState<Record<Peetham, boolean>>({
        Sringeri: true,
        Dwaraka: true,
        Puri: true,
        Jyotirmath: true,
    });
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);
    const [flashKey, setFlashKey] = useState(0);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        if (!db) {
            setError("Firebase is not configured. Please add your API keys to the .env file.");
            setIsLoading(false);
            return;
        }

        try {
            const mediaCollection = collection(db, 'media');
            const q = query(mediaCollection, orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UnifiedCalendarItem));
            setCalendarItems(items);
        } catch (err) {
            console.error("Error fetching from Firestore:", err);
            setError("Could not fetch data from Firestore. Ensure your project's security rules allow reads from the 'media' collection.");
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = (peetham: Peetham, checked: boolean) => {
        setFilters(prev => ({ ...prev, [peetham]: checked }));
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
          setCurrentMonth(date);
          setFlashKey(prev => prev + 1); // Trigger re-render with flash animation
        }
    }

    const filteredItems = useMemo(() => {
        const activePeethams = (Object.keys(filters) as Peetham[]).filter(p => filters[p]);
        return calendarItems.filter(item => activePeethams.includes(item.peetham));
    }, [filters, calendarItems]);

    const peethamsByDate = useMemo(() => {
        const map = new Map<string, Set<Peetham>>();
        filteredItems.forEach(item => {
            const dateStr = format(new Date(item.date.replace(/-/g, '/')), 'yyyy-MM-dd');
            if (!map.has(dateStr)) {
                map.set(dateStr, new Set());
            }
            map.get(dateStr)!.add(item.peetham);
        });
        return map;
    }, [filteredItems]);

    const itemsForSelectedDate = useMemo(() => {
        if (!selectedDate) return [];
        return filteredItems.filter(item => {
            try {
                // Add robust date parsing
                const itemDate = new Date(item.date.replace(/-/g, '/'));
                return isSameDay(itemDate, selectedDate);
            } catch (e) {
                console.warn("Invalid date format for item:", item);
                return false;
            }
        });
    }, [selectedDate, filteredItems]);
    
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setCurrentMonth(prev => addMonths(prev, 1)),
        onSwipedRight: () => setCurrentMonth(prev => addMonths(prev, -1)),
        trackMouse: true
    });

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
    
    const getAnimationClass = (peetham: Peetham) => {
        switch (peetham) {
            case 'Sringeri': return 'animate-book-flip';
            case 'Dwaraka': return 'animate-spin';
            case 'Puri': return 'animate-flag-wave';
            case 'Jyotirmath': return 'animate-sun-cycle';
            default: return '';
        }
    };


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
                <Button onClick={fetchData} disabled={isLoading} className="mt-6">
                    <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
                    Refresh Content
                </Button>
            </div>

            {error && (
                <Card className="bg-destructive/10 border-destructive/20 text-center p-8 max-w-2xl mx-auto">
                     <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
                     <CardTitle className="text-destructive font-bold text-xl">Error Loading Data</CardTitle>
                     <CardContent className="p-0 mt-2 text-destructive/90">
                        <p>{error}</p>
                     </CardContent>
                 </Card>
            )}

            {isLoading && (
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2"><Skeleton className="h-96 w-full" /></div>
                        <div className="md:col-span-1"><Skeleton className="h-96 w-full" /></div>
                    </div>
                </div>
            )}
            
            {!isLoading && !error && calendarItems.length === 0 && (
                <Card className="flex flex-col items-center justify-center h-64 border-dashed text-center p-6">
                    <CardTitle className="text-2xl font-headline">Your Calendar is Empty</CardTitle>
                    <CardContent className="p-0 mt-4 max-w-lg mx-auto">
                        <p className="text-muted-foreground">
                            This is where media and events from the Peethams will appear. To populate it, you will need to add content to your database.
                        </p>
                    </CardContent>
                </Card>
            )}

            {!isLoading && !error && calendarItems.length > 0 && (
                <>
                <section className="mb-16">
                    <h2 className="text-2xl font-headline font-bold text-center mb-8">Explore by Peetham</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {peethamFilterCards.map(p => (
                            <Card key={p.peetham} className={cn("flex items-center p-4 transition-all duration-300", filters[p.peetham] ? p.colorClasses : 'bg-card border-border')}>
                                 <div className={cn("p-3 rounded-full mr-4 transition-all duration-500", getAnimationClass(p.peetham))} style={{backgroundColor: peethamDotColors[p.peetham]}}>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">
                        <div className="md:col-span-1 xl:col-span-3" {...swipeHandlers}>
                            <Card>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={handleDateSelect}
                                    month={currentMonth}
                                    onMonthChange={setCurrentMonth}
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
                        <div className="md:col-span-1 xl:col-span-2">
                             <h3 className="font-headline text-xl mb-4">
                                {selectedDate ? `Activities for ${format(selectedDate, 'MMMM d, yyyy')}` : 'Select a date to view activities'}
                            </h3>
                            <ScrollArea key={flashKey} className={cn("h-[60vh] pr-4 rounded-lg", selectedDate && 'flash-highlight')}>
                                <div className="space-y-4">
                                    {selectedDate && itemsForSelectedDate.length > 0 ? itemsForSelectedDate.map(item => (
                                        <div key={item.id}>
                                             {item.type === 'photo' && <PhotoCard item={item as CalendarPhotoItem} />}
                                             {item.type === 'video' && <VideoCard item={item as CalendarVideoItem} />}
                                             {item.type === 'event' && <EventCard event={item as CalendarEventItem} />}
                                        </div>
                                    )) : (
                                        <Card className="flex items-center justify-center h-48 border-dashed">
                                            <p className="text-muted-foreground text-center">
                                                {selectedDate ? 'No activities found for this day.' : 'Please select a date on the calendar.'}
                                            </p>
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
