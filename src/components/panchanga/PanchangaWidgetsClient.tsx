
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDailyPanchanga, PanchangaDetails } from '@/lib/panchanga-data';
import { widgetStyles, WidgetStyle } from '@/lib/widget-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Gem, Sunrise, Sunset, Moon, Star, SunMoon } from 'lucide-react';
import { format } from 'date-fns';
import { toPng } from 'html-to-image';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  panchanga: PanchangaDetails;
  style: WidgetStyle;
  date: Date;
}

function WidgetCard({ panchanga, style, date }: WidgetCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `panchanga-widget-${style.name.toLowerCase().replace(' ', '-')}-${format(date, 'yyyy-MM-dd')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  };

  const IconMapping: { [key: string]: React.ElementType } = {
    Tithi: Moon,
    Nakshatra: Star,
    Yoga: SunMoon,
    Sunrise: Sunrise,
    Sunset: Sunset
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{style.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          ref={ref} 
          className={cn("p-6 rounded-lg text-white shadow-lg overflow-hidden relative", style.bgClass)}
        >
          <div className="z-10 relative">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="font-bold text-2xl">{format(date, 'dd')}</p>
                    <p className="font-semibold">{format(date, 'MMM yyyy')}</p>
                    <p className="text-sm opacity-80">{format(date, 'EEEE')}</p>
                </div>
                 <Gem className="h-8 w-8 opacity-80"/>
            </div>
            <div className="space-y-2">
              {style.details.map(detailKey => {
                const Icon = IconMapping[detailKey];
                let value = '';
                if (detailKey === 'Tithi') value = panchanga.tithi.name;
                else if (detailKey === 'Nakshatra') value = panchanga.nakshatra.name;
                else if (detailKey === 'Yoga') value = panchanga.yoga.name;
                else if (detailKey === 'Sunrise') value = panchanga.sunrise;
                else if (detailKey === 'Sunset') value = panchanga.sunset;

                return (
                  <div key={detailKey} className="flex items-center justify-between text-sm backdrop-blur-sm bg-black/10 p-2 rounded-md">
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon className="h-4 w-4" />
                      {detailKey}
                    </div>
                    <span>{value}</span>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-center mt-4 opacity-70 font-semibold">Sanatana Peethams Portal</p>
          </div>
          {style.patternUrl && <div className="absolute inset-0 bg-repeat bg-center opacity-10" style={{ backgroundImage: `url(${style.patternUrl})` }} />}
        </div>
        <Button onClick={handleDownload} className="w-full mt-4">
          <Download className="mr-2 h-4 w-4" />
          Download Widget
        </Button>
      </CardContent>
    </Card>
  );
}


export default function PanchangaWidgetsClient() {
  const [panchanga, setPanchanga] = useState<PanchangaDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We only need today's data for the widgets
    const today = new Date();
    const data = getDailyPanchanga(today, 'North').data; // Using North as a default
    setPanchanga(data);
    setIsLoading(false);
  }, []);

  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Downloadable Panchanga Widgets
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Choose a style and download today's Panchanga as an image. Perfect for your phone's home screen or sharing with friends and family.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
        </div>
      ) : panchanga ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {widgetStyles.map(style => (
            <WidgetCard key={style.name} panchanga={panchanga} style={style} date={new Date()} />
          ))}
        </div>
      ) : (
        <p className="text-center text-destructive">Could not load Panchanga data.</p>
      )}
    </div>
  );
}
