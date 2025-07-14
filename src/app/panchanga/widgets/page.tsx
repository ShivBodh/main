
'use client';

import { useState, useEffect, useRef } from 'react';
import { getDailyPanchanga, PanchangaDetails } from '@/lib/panchanga-data';
import { widgetStyles, WidgetStyle } from '@/lib/widget-data';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Gem, Sunrise, Sunset, Moon, Star, SunMoon, Download, Apple, Smartphone, Laptop, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';


const IconMapping: { [key: string]: React.ElementType } = {
  Tithi: Moon,
  Nakshatra: Star,
  Yoga: SunMoon,
  Sunrise: Sunrise,
  Sunset: Sunset
};

function WidgetCard({ panchanga, style, date, onDownload }: { 
    panchanga: PanchangaDetails, 
    style: WidgetStyle, 
    date: Date, 
    onDownload: (element: HTMLElement) => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const styleClasses: { [key: string]: string } = {
    'Vintage Scroll': 'rounded-lg',
    'Digital Squircle': 'rounded-[2.5rem]',
    'Living Ember': 'rounded-lg animate-breath',
    'Temple Calendar': 'rounded-lg border-4 border-stone-300 shadow-md',
    'Celestial Dial': 'rounded-full'
  };
  const isCalendarStyle = style.name === 'Temple Calendar';

  const [perspectiveStyle, setPerspectiveStyle] = useState({});
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setPerspectiveStyle({
        transform: `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`,
    });
  };
  const handleMouseLeave = () => {
    setPerspectiveStyle({
        transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
    });
  };

  return (
    <Card 
        className="bg-card shadow-lg transition-all duration-300 hover:shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef} 
        style={perspectiveStyle}
        className={cn(
            "p-6 text-white shadow-lg overflow-hidden relative w-full h-96 flex flex-col shrink-0 transition-transform duration-300", 
            style.textColor || 'text-white',
            style.bgClass,
            styleClasses[style.name as keyof typeof styleClasses]
          )}>

        {isCalendarStyle && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 pt-4">
            <div className="w-4 h-4 rounded-full bg-stone-400 border-2 border-stone-500 shadow-inner"></div>
            <div className="w-4 h-4 rounded-full bg-stone-400 border-2 border-stone-500 shadow-inner"></div>
            </div>
        )}

        <div className={cn(
            "z-10 relative flex-grow flex flex-col",
            style.name === 'Celestial Dial' && 'items-center justify-center text-center'
            )}>

            {isCalendarStyle ? (
            <>
                <div className="text-center mt-6">
                <p className="text-7xl font-bold font-mono tracking-tighter text-stone-700">{format(date, 'dd')}</p>
                <p className="font-bold text-red-600 -mt-2">{format(date, 'EEEE')}</p>
                <p className="text-lg font-semibold">{format(date, 'MMMM yyyy')}</p>
                </div>
                <div className="space-y-1 mt-auto w-full">
                {style.details.map(detailKey => {
                    let value = '';
                    if (detailKey === 'Tithi') value = panchanga.tithi.name;
                    else if (detailKey === 'Nakshatra') value = panchanga.nakshatra.name;
                    else if (detailKey === 'Yoga') value = panchanga.yoga.name;
                    else if (detailKey === 'Sunrise') value = panchanga.sunrise;
                    else if (detailKey === 'Sunset') value = panchanga.sunset;
                    
                    return (
                    <div key={detailKey} className="flex items-center justify-between text-sm border-t border-dashed border-stone-400 pt-1">
                        <div className="font-semibold">{detailKey}</div>
                        <span className="truncate font-mono">{value}</span>
                    </div>
                    )
                })}
                </div>
            </>
            ) : (
            <>
                <div className="flex justify-between items-start mb-4 w-full">
                <div>
                    <p className="font-bold text-2xl">{format(date, 'dd')}</p>
                    <p className="font-semibold">{format(date, 'MMM yyyy')}</p>
                    <p className="text-sm opacity-80">{format(date, 'EEEE')}</p>
                </div>
                <Gem className="h-8 w-8 opacity-80" />
                </div>
                <div className="space-y-2 mt-auto w-full">
                {style.details.map(detailKey => {
                    let value = '';
                    if (detailKey === 'Tithi') value = panchanga.tithi.name;
                    else if (detailKey === 'Nakshatra') value = panchanga.nakshatra.name;
                    else if (detailKey === 'Yoga') value = panchanga.yoga.name;
                    else if (detailKey === 'Sunrise') value = panchanga.sunrise;
                    else if (detailKey === 'Sunset') value = panchanga.sunset;
                    const Icon = IconMapping[detailKey];
                    return (
                    <div key={detailKey} className="flex items-center justify-between text-sm backdrop-blur-sm bg-black/10 p-2 rounded-md">
                        <div className="flex items-center gap-2 font-semibold">
                        <Icon className="h-4 w-4" />
                        {detailKey}
                        </div>
                        <span className="truncate">{value}</span>
                    </div>
                    );
                })}
                </div>
            </>
            )}
            <p className={cn(
                "text-xs text-center mt-4 font-semibold w-full",
                isCalendarStyle ? "text-stone-500" : "opacity-70"
            )}>Sanatana Peethams Portal</p>
        </div>
        {style.patternUrl && <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{ backgroundImage: `url(${style.patternUrl})` }} />}
      </div>
      <CardContent className="p-4 bg-muted/50">
        <div className="flex justify-around">
            <Button variant="ghost" size="sm" onClick={() => onDownload(cardRef.current!)}><Apple className="mr-2"/> iOS</Button>
            <Button variant="ghost" size="sm" onClick={() => onDownload(cardRef.current!)}><Smartphone className="mr-2"/> Android</Button>
            <Button variant="ghost" size="sm" onClick={() => onDownload(cardRef.current!)}><Laptop className="mr-2"/> Desktop</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PanchangaWidgetsPage() {
  const [panchanga, setPanchanga] = useState<PanchangaDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date();
    const data = getDailyPanchanga(today, 'North').data;
    setPanchanga(data);
    setIsLoading(false);
  }, []);

  const handleDownload = async (element: HTMLElement) => {
    setIsDownloading(true);
    try {
        const { toPng } = await import('html-to-image');
        const dataUrl = await toPng(element, { 
            cacheBust: true, 
            pixelRatio: 2, // For higher resolution
            style: {
                transform: 'none', // Reset transform before capture
            }
        });
        const link = document.createElement('a');
        link.download = `panchanga-${format(new Date(), 'yyyy-MM-dd')}.png`;
        link.href = dataUrl;
        link.click();
        toast({
            title: 'Download Successful',
            description: 'Your Panchanga widget has been saved.',
        });
    } catch (error) {
        console.error('oops, something went wrong!', error);
        toast({
            variant: 'destructive',
            title: 'Download Failed',
            description: 'Could not generate the widget image. Please try again.',
        });
    } finally {
        setIsDownloading(false);
    }
  };


  if (isLoading || !panchanga) {
    return (
        <div className="container mx-auto max-w-7xl py-16 px-4">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[480px] w-full" />)}
            </div>
        </div>
    );
  }

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto max-w-7xl py-16 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                Panchanga Widget Gallery
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Select a beautifully designed widget to keep the day's Panchanga on your phone. All widgets are free to download and share.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {widgetStyles.map((style) => (
            <WidgetCard 
                key={style.name} 
                panchanga={panchanga} 
                style={style} 
                date={new Date()} 
                onDownload={handleDownload}
            />
          ))}
        </div>

        {isDownloading && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="flex items-center gap-4 bg-background p-4 rounded-lg shadow-lg">
                    <Loader2 className="h-6 w-6 animate-spin text-primary"/>
                    <p className="font-semibold">Generating your widget...</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
