
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { format, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Scroll, Timer, BookOpen, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type JapaSession } from '@/components/sadhana/JapaCounterClient';
import { type MeditationSession } from '@/components/sadhana/MeditationTimerClient';
import { type DayEntry } from '@/lib/social-types';

// --- TYPES ---

interface LoggedData {
    japa: JapaSession[];
    meditation: MeditationSession[];
    dainandini: DayEntry | null;
}

// --- SUB-COMPONENTS ---

function JapaHistoryCard({ sessions }: { sessions: JapaSession[] }) {
    if (sessions.length === 0) {
        return (
             <Card>
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Scroll className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Japa History</CardTitle>
                        <CardDescription>No Japa sessions logged for this day.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        );
    }

    const totalCount = sessions.reduce((acc, s) => acc + s.count, 0);

    return (
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Scroll className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Japa History</CardTitle>
                    <CardDescription>
                        {sessions.length} session(s) logged. Total Malas: {totalCount}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {sessions.map(session => (
                        <li key={session.timestamp} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                            <span>{format(new Date(session.timestamp), 'hh:mm a')}</span>
                            <span className="font-semibold">{session.count} Malas</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

function MeditationHistoryCard({ sessions }: { sessions: MeditationSession[] }) {
    if (sessions.length === 0) {
        return (
            <Card>
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Timer className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Meditation History</CardTitle>
                        <CardDescription>No meditation sessions logged for this day.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        );
    }
    
    const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);

    return (
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Timer className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Meditation History</CardTitle>
                    <CardDescription>{sessions.length} session(s) logged. Total Time: {totalMinutes} min</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {sessions.map(session => (
                        <li key={session.timestamp} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                            <span>{format(new Date(session.timestamp), 'hh:mm a')}</span>
                            <span className="font-semibold">{session.duration} minutes</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

function DainandiniCard({ entry, onSave, selectedDate, user }: { entry: DayEntry | null, onSave: (notes: string) => void, selectedDate: Date, user: any }) {
    const [notes, setNotes] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        setNotes(entry?.notes || '');
    }, [entry]);

    const handleSave = () => {
        onSave(notes);
        toast({
            title: 'Notes Saved',
            description: `Your thoughts for ${format(selectedDate, 'do MMMM yyyy')} have been saved.`,
        });
    };
    
    return (
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Dainandini (Daily Diary)</CardTitle>
                    <CardDescription>Your personal notes and reflections for the day.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                 <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Your reflections..." className="h-48 text-base resize-none transition-all duration-300 bg-stone-50 border-stone-200 font-serif leading-[2.1rem] bg-repeat-y bg-[linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[length:100%_2.1rem]" />
            </CardContent>
            <CardFooter>
                <Button onClick={handleSave} className="ml-auto">
                    <Check className="mr-2 h-4 w-4" /> Save Notes
                </Button>
            </CardFooter>
        </Card>
    );
}

// --- MAIN CLIENT COMPONENT ---

export default function BodhaCalendarClient() {
    const { user, loading } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [loggedData, setLoggedData] = useState<LoggedData>({ japa: [], meditation: [], dainandini: null });

    const fetchLogsForDate = useCallback((date: Date, uid: string) => {
        // Japa Logs
        const japaKey = `japaHistory_${uid}`;
        const allJapaSessions: JapaSession[] = JSON.parse(localStorage.getItem(japaKey) || '[]');
        const dayJapa = allJapaSessions.filter(s => isSameDay(new Date(s.timestamp), date));

        // Meditation Logs
        const medKey = `meditationHistory_${uid}`;
        const allMeditationSessions: MeditationSession[] = JSON.parse(localStorage.getItem(medKey) || '[]');
        const dayMeditation = allMeditationSessions.filter(s => isSameDay(new Date(s.timestamp), date));

        // Dainandini Log
        const dainandiniKey = `dainandini_${uid}_${format(date, 'yyyy-MM-dd')}`;
        const dainandiniData = localStorage.getItem(dainandiniKey);
        const dayDainandini = dainandiniData ? JSON.parse(dainandiniData) : null;
        
        setLoggedData({ japa: dayJapa, meditation: dayMeditation, dainandini: dayDainandini });
    }, []);

    useEffect(() => {
        setIsClient(true);
        if (user) {
            fetchLogsForDate(selectedDate, user.uid);
        }
    }, [user, selectedDate, fetchLogsForDate]);
    
    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
        }
    }
    
     const handleSaveDainandini = (notes: string) => {
        if (!user) return;
        const dateKey = `dainandini_${user.uid}_${format(selectedDate, 'yyyy-MM-dd')}`;
        const existingDataRaw = localStorage.getItem(dateKey);
        const existingData = existingDataRaw ? JSON.parse(existingDataRaw) : {};
        const dataToSave: DayEntry = {
            ...existingData,
            notes: notes,
        };
        localStorage.setItem(dateKey, JSON.stringify(dataToSave));
        // Refetch to update UI
        fetchLogsForDate(selectedDate, user.uid);
    };

    if (loading || !isClient) {
        return <div className="container mx-auto max-w-7xl py-12 px-4"><Skeleton className="h-[80vh] w-full" /></div>
    }

    if (!user) {
        return (
             <div className="container mx-auto max-w-3xl py-16 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold">Please Log In</h1>
                <p className="mt-2 text-muted-foreground">The Bodha Calendar is a personal log of your spiritual activities. You must be logged in to view it.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-7xl py-12 px-4">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    My Bodha Calendar
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Your personal Sādhanā log. Track and reflect on your spiritual journey.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 lg:sticky lg:top-24">
                    <Card>
                        <CardContent className="p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                className="p-3"
                            />
                        </CardContent>
                    </Card>
                </div>
                <main className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold font-headline text-primary">
                        Activities for {format(selectedDate, 'do MMMM yyyy')}
                    </h2>
                    <JapaHistoryCard sessions={loggedData.japa} />
                    <MeditationHistoryCard sessions={loggedData.meditation} />
                    <DainandiniCard entry={loggedData.dainandini} onSave={handleSaveDainandini} selectedDate={selectedDate} user={user} />
                </main>
            </div>
        </div>
    );
}
