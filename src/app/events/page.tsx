
import EventsClient from '@/components/events/EventsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bodha Calendar | Sanatana Peethams Portal',
  description: 'Explore a living archive of daily events, discourses, and media from the four cardinal Peethams. Filter by date and Peetham to follow the latest updates.',
};

export default function EventsPage() {
  return <EventsClient />;
}
