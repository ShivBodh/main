
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
        link.download = `panchanga-widget-${style.name.toLowerCase().replace(/\s+/g, '-')}-${format(date, 'yyyy-MM-dd')}.png`;
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

  const styleClasses: { [key: string]: string } = {
    'Vintage Scroll': 'rounded-lg',
    'Digital Squircle': 'rounded-[2.5rem]',
    'Living Ember': 'rounded-lg animate-breath',
    'Temple Calendar': 'rounded-lg border-4 border-stone-300 shadow-md',
    'Celestial Dial': 'rounded-full'
  };

  const isCalendarStyle = style.name === 'Temple Calendar';

  return (
    <Card className="bg-card/5 border-border/20">
      <CardHeader>
        <CardTitle className="text-gray-200">{style.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          ref={ref} 
          className={cn(
            "p-6 shadow-lg overflow-hidden relative h-96 flex flex-col",
            style.textColor || 'text-white',
            style.bgClass,
            styleClasses[style.name as keyof typeof styleClasses]
          )}
        >
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
                     <Gem className="h-8 w-8 opacity-80"/>
                </div>
                <div className="space-y-2 mt-auto w-full">
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
                        <span className="truncate">{value}</span>
                      </div>
                    )
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
    <div className="bg-gray-950">
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                Downloadable Panchanga Widgets
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Choose a style and download today's Panchanga as an image. Perfect for your phone's home screen or sharing with friends and family.
                </p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-[550px] w-full bg-gray-800" />)}
                </div>
            ) : panchanga ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {widgetStyles.map(style => (
                    <WidgetCard key={style.name} panchanga={panchanga} style={style} date={new Date()} />
                ))}
                </div>
            ) : (
                <p className="text-center text-red-400">Could not load Panchanga data.</p>
            )}
        </div>
    </div>
  );
}
