
import EventsClient from '@/components/events/EventsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bodha Calendar',
  description: 'A living archive of daily events, discourses (pravachan), festivals, and pujas from the four cardinal Peethams of Sanatana Dharma. Follow the latest updates from Sringeri, Dwaraka, Puri, and Jyotirmath.',
};

export default function EventsPage() {
  return <EventsClient />;
}
