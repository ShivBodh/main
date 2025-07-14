
import type { Metadata } from 'next';
import BodhaCalendarClient from '@/components/sadhana/BodhaCalendarClient';

export const metadata: Metadata = {
  title: 'Bodha Calendar | Sanatana Peethams Portal',
  description: 'Your personal Sādhanā log. Track your Japa, meditation, and diary entries in one place to reflect on your spiritual journey.',
};

export default function BodhaCalendarPage() {
  return <BodhaCalendarClient />;
}
