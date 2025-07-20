
'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, isSameDay, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import type { UnifiedCalendarItem, CalendarPhotoItem, CalendarVideoItem } from '@/lib/calendar-data';
import { Peetham } from '@/lib/events-data';
import { ChevronLeft, ChevronRight, Video, Camera } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useSwipeable } from 'react-swipeable';

type EventByDate = {
  [key: string]: UnifiedCalendarItem[];
};

export default function EventsClient() {
    const [allEvents, setAllEvents] = useState<UnifiedCalendarItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        if (!db) {
            setError("Firebase is not configured.");
            setIsLoading(false);
            return;
        }

        try {
            const mediaCollection = collection(db, 'media');
            const q = query(mediaCollection, orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UnifiedCalendarItem));
            setAllEvents(items);
        } catch (err) {
            console.error("Error fetching from Firestore:", err);
            setError("Could not fetch data from Firestore.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const eventsByDate = useMemo(() => {
        return allEvents.reduce((acc, event) => {
            const dateStr = format(new Date(event.date.replace(/-/g, '/')), 'yyyy-MM-dd');
            if (!acc[dateStr]) {
                acc[dateStr] = [];
            }
            acc[dateStr].push(event);
            return acc;
        }, {} as EventByDate);
    }, [allEvents]);

    const calendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
        const startingDayIndex = getDay(monthStart);
        // Explicitly type the array to handle mixed content (Date | null)
        const emptyDays: { key: string; date: null }[] = Array.from({ length: startingDayIndex }, (_, i) => ({ key: `empty-${i}`, date: null }));
        const monthDays: { key: string; date: Date }[] = days.map(day => ({ key: day.toISOString(), date: day }));
        return [...emptyDays, ...monthDays];
    }, [currentMonth]);
    
    const changeMonth = (amount: number) => {
        setCurrentMonth(current => addMonths(current, amount));
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => changeMonth(1),
        onSwipedRight: () => changeMonth(-1),
        trackMouse: true,
    });

    const EventItem = ({ item }: { item: UnifiedCalendarItem }) => (
        <div className="flex items-center gap-3">
             <div className="flex-shrink-0 text-primary">
                {item.type === 'photo' ? <Camera className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </div>
            <div className="flex-grow">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{item.title}</p>
                 <p className="text-xs text-muted-foreground">{item.peetham}</p>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col" {...swipeHandlers}>
             {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground">Bodha Calendar</h1>
                <div className="flex items-center gap-4">
                     <h2 className="text-xl font-semibold text-foreground">{format(currentMonth, 'MMMM yyyy')}</h2>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)}><ChevronLeft className="h-5 w-5" /></Button>
                        <Button variant="ghost" onClick={() => setCurrentMonth(new Date())} className="text-sm">Today</Button>
                        <Button variant="ghost" size="icon" onClick={() => changeMonth(1)}><ChevronRight className="h-5 w-5" /></Button>
                    </div>
                </div>
            </div>

             {/* Calendar Grid */}
             <div className="flex-grow grid grid-cols-7 grid-rows-6 gap-px bg-sidebar-border/50 border border-sidebar-border/50 rounded-lg overflow-hidden">
                {/* Day Headers */}
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                    <div key={day} className="p-2 text-xs font-semibold text-center text-muted-foreground bg-sidebar-background/50">
                        {day}
                    </div>
                ))}
                
                 {/* Day Cells */}
                {calendarDays.map(({ key, date }) => {
                    if (!date) return <div key={key} className="bg-sidebar-background/50"></div>;
                    const dateStr = format(date, 'yyyy-MM-dd');
                    const dayEvents = eventsByDate[dateStr] || [];
                    const isCurrentDay = isClient && isToday(date);
                    
                    return (
                        <div key={key} className={cn("bg-sidebar-background p-2 flex flex-col gap-1.5 overflow-hidden", isCurrentDay && "bg-sidebar-accent/50 relative")}>
                             <p className={cn("font-semibold text-xs", isCurrentDay ? "text-primary" : "text-muted-foreground")}>{format(date, 'd')}</p>
                             {isCurrentDay && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></div>}
                            <div className="space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border">
                                {dayEvents.map(event => (
                                    <EventItem key={event.id} item={event} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
