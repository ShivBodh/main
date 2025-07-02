'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { panchangaData, Panchanga, PanchangaRegion } from '@/lib/panchanga-data';
import { Sunrise, Sunset, Moon, Star, SunMoon, Download, Atom } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import * as ics from 'ics';
import { generateYearlyPanchangaEvents } from '@/lib/panchanga-generator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Panchanga | Sanatana Peethams Portal',
  description: "View today's astrological details (Panchanga) for the four cardinal regions of India, including Tithi, Nakshatra, Yoga, Karana, and auspicious timings.",
};

const regionOrder: PanchangaRegion[] = ['North', 'South', 'East', 'West'];

function PanchangaDetail({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
    return (
        <div className="flex items-start justify-between py-3 border-b border-border/50">
            <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground/90">{label}</span>
            </div>
            <span className="text-right text-foreground/80">{value}</span>
        </div>
    );
}

function InauspiciousTime({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-md">
            <span className="font-semibold text-destructive">{label}</span>
            <span className="font-mono text-destructive">{value}</span>
        </div>
    )
}

export default function PanchangaPage() {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleDownload = () => {
        const panchangEvents = generateYearlyPanchangaEvents();

        const { error, value } = ics.createEvents(panchangEvents);

        if (error) {
            console.error("Could not create .ics file:", error);
            alert("Sorry, there was an error generating the calendar file.");
            return;
        }

        if (value) {
            const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Sanatana_Panchanga.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Daily Panchanga
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Today's astrological details based on traditional Hindu timekeeping, presented for the four cardinal regions.
                </p>
                <Button onClick={handleDownload} className="mt-6" disabled={!isClient}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Yearly Calendar (.ics)
                </Button>
            </div>

            <Tabs defaultValue="North" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                    {regionOrder.map(region => (
                         <TabsTrigger key={region} value={region}>{region}</TabsTrigger>
                    ))}
                </TabsList>
                
                {isClient ? (
                     <p className="text-center text-lg font-semibold text-muted-foreground mb-6">
                        {format(new Date(), 'EEEE, MMMM d, yyyy')}
                    </p>
                ) : (
                    <div className="flex justify-center mb-6">
                        <Skeleton className="h-7 w-56" />
                    </div>
                )}
               

                {panchangaData.map(item => (
                    <TabsContent key={item.region} value={item.region}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl text-center text-primary">
                                    {item.peetham} Peetham ({item.region})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                    <PanchangaDetail icon={Sunrise} label="Sunrise" value={item.data.sunrise} />
                                    <PanchangaDetail icon={Sunset} label="Sunset" value={item.data.sunset} />
                                </div>
                                <PanchangaDetail icon={Moon} label="Tithi" value={`${item.data.tithi.name} (until ${item.data.tithi.endTime})`} />
                                <PanchangaDetail icon={Star} label="Nakshatra" value={`${item.data.nakshatra.name} (until ${item.data.nakshatra.endTime})`} />
                                <PanchangaDetail icon={SunMoon} label="Yoga" value={`${item.data.yoga.name} (until ${item.data.yoga.endTime})`} />
                                <PanchangaDetail icon={Atom} label="Karana" value={`${item.data.karana.name} (until ${item.data.karana.endTime})`} />

                                <div className="pt-6">
                                     <h3 className="font-headline text-lg text-center text-primary mb-4">Inauspicious Timings</h3>
                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <InauspiciousTime label="Rahu Kalam" value={item.data.rahuKalam} />
                                        <InauspiciousTime label="Gulika Kalam" value={item.data.gulikaKalam} />
                                        <InauspiciousTime label="Yamaganda" value={item.data.yamagandaKalam} />
                                     </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
