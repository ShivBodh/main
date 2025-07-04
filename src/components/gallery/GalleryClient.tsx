
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { allCalendarItems, CalendarPhotoItem } from '@/lib/calendar-data';
import { Peetham } from '@/lib/events-data';
import { ImageOff, Camera } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PhotoCard } from '@/components/media/PhotoCard';

const groupItemsByDate = (items: CalendarPhotoItem[]): Record<string, CalendarPhotoItem[]> => {
    return items.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, CalendarPhotoItem[]>);
};

export default function GalleryClient() {
    const [isClient, setIsClient] = useState(false);
    const [filters, setFilters] = useState<Record<Peetham, boolean>>({
        Sringeri: true,
        Dwaraka: true,
        Puri: true,
        Jyotirmath: true,
    });
    const [jumpToDate, setJumpToDate] = useState<Date | undefined>();

    useEffect(() => {
        setIsClient(true);
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
        return allCalendarItems
            .filter((item): item is CalendarPhotoItem => item.type === 'photo')
            .filter(item => filters[item.peetham]);
    }, [filters]);

    const groupedItems = useMemo(() => groupItemsByDate(filteredItems), [filteredItems]);
    const sortedDates = useMemo(() => Object.keys(groupedItems).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()), [groupedItems]);
    
    const monthOrder = useMemo(() => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], []);

    const groupedDatesForAccordion = useMemo(() => {
        const groups: Record<string, Record<string, Date[]>> = {};
        const datesWithContent = sortedDates.map(ds => new Date(ds.replace(/-/g, '/')));

        datesWithContent.forEach(date => {
            const year = format(date, 'yyyy');
            const month = format(date, 'MMMM');
            if (!groups[year]) groups[year] = {};
            if (!groups[year][month]) groups[year][month] = [];
            groups[year][month].push(date);
        });
        return groups;
    }, [sortedDates]);


    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
                 <Camera className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Unified Media Gallery
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    A living, chronological archive of photos from the four cardinal Peethams. This gallery is designed to be populated by your own independent media database.
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
                                    <Checkbox id={peetham} checked={filters[peetham]} onCheckedChange={() => handleFilterChange(peetham)} />
                                    <Label htmlFor={peetham} className="text-base font-medium">{peetham}</Label>
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
                                                                    {format(day, 'do')}
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
                    {isClient ? (
                        sortedDates.length > 0 ? (
                            <div className="space-y-8">
                                {sortedDates.map(date => (
                                    <div key={date} id={`date-card-${date}`} className="transition-colors duration-300">
                                        <h2 className="font-headline text-2xl text-primary mb-4 border-b pb-2">
                                            {format(new Date(date.replace(/-/g, '/')), 'EEEE, MMMM d, yyyy')}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {groupedItems[date].map(item => (
                                                <PhotoCard key={item.id} item={item} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-96 text-center text-muted-foreground bg-card rounded-lg">
                                <ImageOff className="h-16 w-16 mb-4 text-primary" />
                                <p className="text-lg font-semibold">No photos found for the selected filters.</p>
                                <p>Try adjusting your filters to see more content.</p>
                            </div>
                        )
                    ) : (
                       <div className="space-y-8">
                            {[...Array(2)].map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="h-8 w-64 mb-4" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Skeleton className="h-80 w-full" />
                                        <Skeleton className="h-80 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
