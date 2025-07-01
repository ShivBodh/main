
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { allEvents, peethamBadgeColors, peethamDotColors, Peetham } from '@/lib/events-data';

export default function EventsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [filters, setFilters] = useState<Record<Peetham, boolean>>({
        Sringeri: true,
        Dwaraka: true,
        Puri: true,
        Jyotirmath: true,
    });

    const handleFilterChange = (peetham: Peetham) => {
        setFilters(prev => ({ ...prev, [peetham]: !prev[peetham] }));
    };
    
    const selectedDateEvents = useMemo(() => {
        if (!date) return [];
        const selectedDateString = format(date, 'yyyy-MM-dd');
        return allEvents.filter(event =>
            event.date === selectedDateString && filters[event.peetham]
        );
    }, [date, filters]);

    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Unified Events Calendar
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Discover a comprehensive calendar of spiritual and cultural events from the four cardinal Peethams. Stay connected with the sacred traditions and festivities happening across the country.
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
                       <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="p-0"
                            components={{
                                DayContent: ({ date }) => {
                                    const dayEvents = allEvents.filter(e => format(new Date(e.date + 'T00:00:00'), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && filters[e.peetham]);
                                    const peethamsOnDay = [...new Set(dayEvents.map(e => e.peetham))];
                                    
                                    return (
                                        <div className='relative h-full w-full flex items-center justify-center'>
                                            <span>{date.getDate()}</span>
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
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card className="min-h-[600px]">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">
                                Events on: {date ? format(date, 'MMMM d, yyyy') : 'No date selected'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {selectedDateEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedDateEvents.map(event => (
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
                                                <p className="text-foreground/80">{event.description}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-16">
                                    <p className="text-lg font-semibold">No events scheduled for this day.</p>
                                    <p>Please select another date on the calendar to view upcoming events.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
