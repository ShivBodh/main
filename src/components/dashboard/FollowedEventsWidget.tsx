import { CalendarDays, ArrowRight } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import Link from 'next/link';

const followedEvents = [
  { id: 1, title: 'Gita Jayanti Celebration', date: '2024-12-22', location: 'Sringeri Sharada Peetham', url: '#' },
  { id: 2, title: 'Monthly Rudra Homa', date: '2024-12-30', location: 'Dwarka Sharada Peetham', url: '#' },
  { id: 3, title: 'Discourse on Advaita Vedanta', date: '2025-01-05', location: 'Online', url: '#' },
];

export function FollowedEventsWidget() {
  return (
    <WidgetCard title="My Followed Events" icon={<CalendarDays className="w-5 h-5" />}>
      <div className="space-y-3">
        {followedEvents.map((event) => (
          <Link href={event.url} key={event.id} className="block group">
            <div className="flex justify-between items-center p-3 rounded-lg bg-background hover:bg-muted/80 transition-colors duration-200 border">
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} &bull; {event.location}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
        {followedEvents.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">You are not following any upcoming events.</p>
        )}
      </div>
    </WidgetCard>
  );
}
