
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { CalendarPhotoItem } from '@/lib/calendar-data';
import { peethamBadgeColors } from '@/lib/events-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function PhotoCard({ item }: { item: CalendarPhotoItem }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 cursor-pointer group">
          <div className="relative aspect-video bg-secondary/20">
            <Image
              src={item.thumbnailUrl || item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              data-ai-hint={item.aiHint}
            />
          </div>
          <div className="flex flex-col flex-grow p-4">
              <CardHeader className="p-0">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="font-headline text-lg leading-snug flex-grow">{item.title}</CardTitle>
                  <Badge variant="outline" className={`flex-shrink-0 ${peethamBadgeColors[item.peetham]}`}>
                    {item.peetham}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground pt-1">{format(new Date(item.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
              </CardHeader>
              <CardContent className="p-0 pt-3 flex-grow">
                <p className="text-foreground/80 text-sm line-clamp-3">{item.description}</p>
              </CardContent>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 border-0 bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={1200}
          height={800}
          className="w-full h-auto object-contain rounded-lg"
          data-ai-hint={item.aiHint}
        />
      </DialogContent>
    </Dialog>
  );
}
