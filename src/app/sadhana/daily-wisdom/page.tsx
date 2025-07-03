
import type { Metadata } from 'next';
import DailyWisdomClient from '@/components/sadhana/DailyWisdomClient';

export const metadata: Metadata = {
  title: 'Daily Wisdom | Sanatana Peethams Portal',
  description: 'Receive a daily pearl of wisdom from the great Acharyas for your contemplation and spiritual reflection. Part of the Sādhanā Suite.',
};

export default function DailyWisdomPage() {
  return <DailyWisdomClient />;
}
