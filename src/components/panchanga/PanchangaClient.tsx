
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { panchangaData, Panchanga, PanchangaRegion } from '@/lib/panchanga-data';
import { Sunrise, Sunset, Moon, Star, SunMoon, Download, Atom, HandHeart, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { InstallPWA } from '@/components/pwa/InstallPWA';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const regionOrder: PanchangaRegion[] = ['North', 'South', 'East', 'West'];

const promotionalMessages = [
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: 'Join Sanatan Social!',
    description: 'Connect with a global community of devotees on our new platform.',
    link: '/social',
    cta: 'Join Now'
  },
  {
    icon: <HandHeart className="h-5 w-5 text-green-600" />,
    title: 'Start a Dharmic Campaign',
    description: 'Have a cause you believe in? Rally support from the community.',
    link: '/social?tab=campaigns',
    cta: 'Create Campaign'
  },
];

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

export default function PanchangaClient() {
    const [isClient, setIsClient] = useState(false);
    const { toast } = useToast();
    
    useEffect(() => {
        setIsClient(true);
        
        // Setup a timer to periodically show promotional toasts
        const intervalId = setInterval(() => {
            // Only show a toast some of the time to be less intrusive
            if (Math.random() > 0.6) { // 40% chance to show a toast
                const randomMessage = promotionalMessages[Math.floor(Math.random() * promotionalMessages.length)];
                toast({
                  description: (
                    <div className="flex items-center gap-3">
                        {randomMessage.icon}
                        <div>
                            <p className="font-bold">{randomMessage.title}</p>
                            <p className="text-sm">{randomMessage.description}</p>
                        </div>
                    </div>
                  ),
                  action: (
                    <Button asChild size="sm">
                      <Link href={randomMessage.link}>{randomMessage.cta}</Link>
                    </Button>
                  ),
                  duration: 8000, // 8 seconds
                });
            }
        }, 20000); // Check every 20 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [toast]);

    return (
        <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Daily Panchanga
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Today's astrological details based on traditional Hindu timekeeping, presented for the four cardinal regions.
                </p>
                <div className="mt-6">
                    {isClient && <InstallPWA />}
                </div>
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
