
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { CalendarPhotoItem } from '@/lib/calendar-data';
import { peethamBadgeColors } from '@/lib/events-data';

export function PhotoCard({ item }: { item: CalendarPhotoItem }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
      <CardContent className="p-0">
        <div className="aspect-video w-full bg-secondary/20 overflow-hidden relative">
          <Image
            src={item.thumbnailUrl || item.imageUrl}
            alt={item.title}
            width={400}
            height={225}
            className="w-full h-full object-cover"
            data-ai-hint={item.aiHint}
          />
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
  );
}
