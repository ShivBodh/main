
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 cursor-pointer group">
          <CardContent className="p-0 relative">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              width={400}
              height={225}
              className="w-full h-auto object-cover aspect-video rounded-t-lg bg-secondary/20"
              data-ai-hint={item.aiHint || 'video thumbnail'}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle className="h-16 w-16 text-white/80" />
            </div>
          </CardContent>
          <CardHeader>
            <div className="flex justify-between items-start gap-2">
                <CardTitle className="font-headline text-lg leading-snug flex-grow">{item.title}</CardTitle>
                <Badge variant="outline" className={`flex-shrink-0 ${peethamBadgeColors[item.peetham]}`}>
                    {item.peetham}
                </Badge>
            </div>
             <p className="text-sm text-muted-foreground pt-1">{format(new Date(item.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
          </CardHeader>
           <CardContent className="flex-grow">
              <p className="text-foreground/80 text-sm line-clamp-3">{item.description}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          <DialogHeader className="sr-only">
             <DialogTitle>{item.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
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
