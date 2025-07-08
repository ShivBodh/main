
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { CalendarPhotoItem } from '@/lib/calendar-data';
import { peethamBadgeColors } from '@/lib/events-data';

export function PhotoCard({ item }: { item: CalendarPhotoItem }) {
  // NOTE: The Dialog wrapper has been temporarily removed to debug image rendering.
  // It can be re-added once the basic display is confirmed to be working.
  return (
    <Card className="overflow-hidden border-border/50 group">
      <div className="relative aspect-video bg-muted">
        <Image
          src={item.thumbnailUrl || item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={item.aiHint}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="font-headline text-lg leading-snug group-hover:text-primary transition-colors">
            {item.title}
          </CardTitle>
          <Badge variant="outline" className={`flex-shrink-0 ${peethamBadgeColors[item.peetham]}`}>
            {item.peetham}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground pt-1">{format(new Date(item.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-foreground/80 text-sm line-clamp-3">{item.description}</p>
      </CardContent>
    </Card>
  );
}
