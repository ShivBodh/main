
'use client';

import { useState, useEffect } from 'react';
import { getDailyPanchanga, PanchangaDetails } from '@/lib/panchanga-data';
import { widgetStyles, WidgetStyle } from '@/lib/widget-data';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Gem, Sunrise, Sunset, Moon, Star, SunMoon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const IconMapping: { [key: string]: React.ElementType } = {
  Tithi: Moon,
  Nakshatra: Star,
  Yoga: SunMoon,
  Sunrise: Sunrise,
  Sunset: Sunset
};

function WidgetPreview({ panchanga, style, date }: { panchanga: PanchangaDetails, style: WidgetStyle, date: Date }) {
  const styleClasses: { [key: string]: string } = {
    'Vintage Scroll': 'rounded-lg',
    'Digital Squircle': 'rounded-[2.5rem]',
    'Living Ember': 'rounded-lg animate-breath',
    'Temple Calendar': 'rounded-lg border-4 border-stone-300 shadow-md',
    'Celestial Dial': 'rounded-full'
  };

  const isCalendarStyle = style.name === 'Temple Calendar';

  return (
    <div className={cn(
        "p-6 text-white shadow-lg overflow-hidden relative w-72 h-96 flex flex-col shrink-0", 
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
  );
}


export function PanchangaWidgetPreview() {
  const [panchanga, setPanchanga] = useState<PanchangaDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const data = getDailyPanchanga(today, 'North').data;
    setPanchanga(data);
    setIsLoading(false);
  }, []);

  if (isLoading || !panchanga) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
          </div>
          <div className="flex space-x-8">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-96 w-72" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Daily Panchanga Widgets</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Get today's Panchanga on your phone. Download beautiful, shareable widgets in a style that suits you.
          </p>
        </div>

        <div className="relative w-full overflow-hidden group">
          <div className="flex space-x-8 animate-autoscroll group-hover:[animation-play-state:paused]">
            {/* We need to duplicate the items for a seamless loop */}
            {[...widgetStyles, ...widgetStyles].map((style, index) => (
              <WidgetPreview key={`${style.name}-${index}`} panchanga={panchanga} style={style} date={new Date()} />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent via-50% to-background pointer-events-none"></div>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/panchanga/widgets">
              View All Widget Styles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
