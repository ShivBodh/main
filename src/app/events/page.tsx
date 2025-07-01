'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Define a type for our events for better type safety
type Peetham = 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath';

type Event = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  peetham: Peetham;
  description: string;
  category: string;
};

// Placeholder data simulating a database of events
const allEvents: Event[] = [
    { id: 1, title: 'Sharada Sharannavaratri', date: '2024-10-03', peetham: 'Sringeri', description: 'The grand nine-night festival dedicated to Goddess Sharada, featuring elaborate pujas, cultural performances, and discourses.', category: 'Festival' },
    { id: 2, title: 'Chaturmasya Vrata Anushtanam Begins', date: '2024-07-21', peetham: 'Sringeri', description: 'The commencement of the four-month spiritual retreat observed by the Jagadguru.', category: 'Observance' },
    { id: 3, title: 'Janmashtami Mahotsav', date: '2024-08-26', peetham: 'Dwaraka', description: 'Grand celebrations for Sri Krishna Janmashtami at his sacred city.', category: 'Festival' },
    { id: 4, title: 'Shankara Jayanti', date: '2024-05-12', peetham: 'Dwaraka', description: 'Celebrating the birth of Adi Shankaracharya with special lectures on Advaita Vedanta.', category: 'Jayanti' },
    { id: 5, title: 'Ratha Yatra', date: '2024-07-07', peetham: 'Puri', description: 'The world-famous chariot festival of Lord Jagannath.', category: 'Festival' },
    { id: 6, title: 'Vedanta Sammelan', date: '2024-12-20', peetham: 'Puri', description: 'An annual conference of scholars discussing Vedanta philosophy.', category: 'Sammelan' },
    { id: 7, title: 'Badrinath Temple Opening Ceremony', date: '2024-05-10', peetham: 'Jyotirmath', description: 'The ceremonial opening of the Badrinath shrine after the winter closure.', category: 'Ceremony' },
    { id: 8, title: 'Summer Meditation Retreat', date: '2024-06-15', peetham: 'Jyotirmath', description: 'A guided retreat for seekers focusing on intensive meditation.', category: 'Retreat' },
    { id: 9, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Sringeri', description: 'Special pujas to honor the Guru Parampara.', category: 'Festival' },
    { id: 10, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Dwaraka', description: 'Devotees gather to offer respects to the Jagadguru.', category: 'Festival' },
    { id: 11, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Puri', description: 'Observance of the sacred day dedicated to the Guru.', category: 'Festival' },
    { id: 12, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Jyotirmath', description: 'Paying homage to the lineage of spiritual masters.', category: 'Festival' },
];

const peethamBadgeColors: Record<Peetham, string> = {
    Sringeri: 'bg-primary/10 text-primary border-primary/20',
    Dwaraka: 'bg-accent/10 text-accent border-accent/20',
    Puri: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    Jyotirmath: 'bg-muted text-muted-foreground border-border',
};

const peethamDotColors: Record<Peetham, string> = {
    Sringeri: 'hsl(var(--primary))',
    Dwaraka: 'hsl(var(--accent))',
    Puri: 'hsl(var(--secondary-foreground))',
    Jyotirmath: 'hsl(var(--muted-foreground))',
};

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
                    Events Calendar
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    A unified calendar of spiritual and cultural events from the four cardinal Peethams.
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
                                    <p className="text-lg">No events scheduled for this day.</p>
                                    <p>Please select another date on the calendar.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
