
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarVideoItem } from '@/lib/calendar-data';
import { peethamBadgeColors } from '@/lib/events-data';
import { format } from 'date-fns';

export function VideoCard({ item }: { item: CalendarVideoItem }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden border-border/50 group h-full cursor-pointer">
           <div className="relative aspect-video w-full">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={item.aiHint || 'video thumbnail'}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle className="h-16 w-16 text-white/80" />
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start gap-2">
                <CardTitle className="font-headline text-lg leading-snug">{item.title}</CardTitle>
                <Badge variant="outline" className={`flex-shrink-0 ${peethamBadgeColors[item.peetham]}`}>
                    {item.peetham}
                </Badge>
            </div>
              <p className="text-sm text-muted-foreground pt-1">{format(new Date(item.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
              <p className="text-foreground/80 text-sm line-clamp-3 mt-2">{item.description}</p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 border-0 bg-background">
          <DialogHeader className="sr-only">
              <DialogTitle>{item.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={item.url}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
      </DialogContent>
    </Dialog>
  );
}

    