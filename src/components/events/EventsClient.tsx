
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { allCalendarItems, UnifiedCalendarItem, CalendarEventItem, CalendarPhotoItem } from '@/lib/calendar-data';
import { peethamBadgeColors, peethamDotColors, Peetham } from '@/lib/events-data';
import { Gem, Camera } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PhotoCard } from '@/components/media/PhotoCard';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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

const groupItemsByDate = (items: UnifiedCalendarItem[]): Record<string, UnifiedCalendarItem[]> => {
    return items.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, UnifiedCalendarItem[]>);
};

export default function EventsClient() {
    const [allItems, setAllItems] = useState<UnifiedCalendarItem[]>(allCalendarItems);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<Record<Peetham, boolean>>({
        Sringeri: true,
        Dwaraka: true,
        Puri: true,
        Jyotirmath: true,
    });
    const [jumpToDate, setJumpToDate] = useState<Date | undefined>();

    useEffect(() => {
        async function fetchScrapedMedia() {
            if (!db) {
                console.log("Firestore not configured, using only static data.");
                setAllItems(allCalendarItems);
                setIsLoading(false);
                return;
            }

            try {
                const mediaCollection = collection(db, 'media');
                const q = query(mediaCollection, orderBy('date', 'desc'));
                const querySnapshot = await getDocs(q);
                
                const firestoreItems: UnifiedCalendarItem[] = querySnapshot.docs.map(doc => {
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
                
                const combinedItems = [...firestoreItems, ...allCalendarItems]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                
                setAllItems(combinedItems);

            } catch (error) {
                console.error("Error fetching media from Firestore:", error);
                setAllItems(allCalendarItems);
            } finally {
                setIsLoading(false);
            }
        }

        fetchScrapedMedia();
    }, []);

    useEffect(() => {
        if (jumpToDate) {
            const dateString = format(jumpToDate, 'yyyy-MM-dd');
            const element = document.getElementById(`date-card-${dateString}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.classList.add('flash-highlight');
                const timer = setTimeout(() => {
                    element.classList.remove('flash-highlight');
                }, 1500);

                setJumpToDate(undefined);
                
                return () => clearTimeout(timer);
            } else {
                 setJumpToDate(undefined);
            }
        }
    }, [jumpToDate]);


    const handleFilterChange = (peetham: Peetham) => {
        setFilters(prev => ({ ...prev, [peetham]: !prev[peetham] }));
    };

    const filteredItems = useMemo(() => {
        return allItems.filter(item => filters[item.peetham]);
    }, [filters, allItems]);

    const groupedItems = useMemo(() => groupItemsByDate(filteredItems), [filteredItems]);
    const sortedDates = useMemo(() => Object.keys(groupedItems).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()), [groupedItems]);
    
    const monthOrder = useMemo(() => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], []);

    const groupedDatesForAccordion = useMemo(() => {
        const groups: Record<string, Record<string, Date[]>> = {};
        const datesWithContent = sortedDates.map(ds => new Date(ds.replace(/-/g, '/')));

        datesWithContent.forEach(date => {
            const year = format(date, 'yyyy');
            const month = format(date, 'MMMM');

            if (!groups[year]) {
                groups[year] = {};
            }
            if (!groups[year][month]) {
                groups[year][month] = [];
            }
            groups[year][month].push(date);
        });

        return groups;
    }, [sortedDates]);


    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Bodha Calendar
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Explore a living archive of daily events, discourses, and media from the four cardinal Peethams. Scroll to browse or use the filters to jump to specific content.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <aside className="lg:col-span-1 space-y-8 sticky top-24">
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
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Jump to Date</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {Object.keys(groupedDatesForAccordion).sort((a,b) => parseInt(b) - parseInt(a)).map(year => (
                                    <AccordionItem key={year} value={year}>
                                        <AccordionTrigger>{year}</AccordionTrigger>
                                        <AccordionContent>
                                            <Accordion type="single" collapsible className="w-full pl-2">
                                                {Object.keys(groupedDatesForAccordion[year]).sort((a,b) => monthOrder.indexOf(b) - monthOrder.indexOf(a)).map(month => (
                                                    <AccordionItem key={`${year}-${month}`} value={`${year}-${month}`}>
                                                        <AccordionTrigger>{month}</AccordionTrigger>
                                                        <AccordionContent className="flex flex-col items-start gap-1 pt-2 pl-4">
                                                            {groupedDatesForAccordion[year][month].sort((a, b) => b.getTime() - a.getTime()).map(day => (
                                                                <Button
                                                                    key={format(day, 'yyyy-MM-dd')}
                                                                    variant="link"
                                                                    className="p-0 h-auto text-sm text-muted-foreground hover:text-accent"
                                                                    onClick={() => setJumpToDate(day)}
                                                                >
                                                                    {format(day, 'EEEE, do')}
                                                                </Button>
                                                            ))}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </aside>
                
                <main className="lg:col-span-3">
                    {isLoading ? (
                        <div className="space-y-8">
                             {[...Array(3)].map((_, i) => (
                                <Card key={i}>
                                    <CardHeader className="bg-muted/50 border-b">
                                        <Skeleton className="h-8 w-64" />
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-4">
                                        <Skeleton className="h-40 w-full" />
                                        <Skeleton className="h-40 w-full" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        sortedDates.length > 0 ? (
                            <div className="space-y-8">
                                {sortedDates.map(date => (
                                    <Card key={date} id={`date-card-${date}`} className="overflow-hidden transition-colors duration-300">
                                        <CardHeader className="bg-muted/50 border-b">
                                            <CardTitle className="font-headline text-2xl text-primary">
                                                {format(new Date(date.replace(/-/g, '/')), 'EEEE, MMMM d, yyyy')}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 space-y-4">
                                            {groupedItems[date].map(item => {
                                                switch (item.type) {
                                                    case 'event':
                                                        return <EventCard key={item.id} event={item as CalendarEventItem} />;
                                                    case 'photo':
                                                        return <PhotoCard key={item.id} item={item as CalendarPhotoItem} />;
                                                    default:
                                                        return null;
                                                }
                                            })}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="flex flex-col items-center justify-center h-96 text-center bg-muted/30 border-dashed">
                                <CardHeader>
                                    <div className="mx-auto p-4 bg-primary/10 rounded-full animate-breath">
                                        <Gem className="h-12 w-12 text-primary" />
                                    </div>
                                    <CardTitle className="mt-6 text-2xl font-headline text-primary">
                                        A Sacred Archive is Unfolding
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg text-foreground/80">
                                        Our team is diligently curating a living history of events and media.
                                    </p>
                                    <p className="mt-2 text-muted-foreground">
                                        Please check back soon to witness this sacred space come to life.
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    )}
                </main>
            </div>
        </div>
    );
}
