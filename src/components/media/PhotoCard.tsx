
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { CalendarPhotoItem } from '@/lib/calendar-data';
import { peethamBadgeColors } from '@/lib/events-data';

export function PhotoCard({ item }: { item: CalendarPhotoItem }) {
  return (
    <Card className="overflow-hidden border-border/50 group h-full flex flex-col">
      <div className="relative aspect-video w-full">
        <Image
          src={item.thumbnailUrl || item.imageUrl}
          alt={item.title}
          width={400}
          height={225}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={item.aiHint}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="font-headline text-lg leading-snug group-hover:text-primary transition-colors">
            {item.title}
          </CardTitle>
          <Badge variant="outline" className={`flex-shrink-0 ${peethamBadgeColors[item.peetham]}`}>
            {item.peetham}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground pt-1">{format(new Date(item.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
        <p className="text-foreground/80 text-sm line-clamp-3 mt-2 flex-grow">{item.description}</p>
      </div>
    </Card>
  );
}
