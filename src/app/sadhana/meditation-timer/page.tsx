
import type { Metadata } from 'next';
import MeditationTimerClient from '@/components/sadhana/MeditationTimerClient';

export const metadata: Metadata = {
  title: 'Meditation Timer | Sanatana Peethams Portal',
  description: 'A configurable timer to support your meditation practice. Set a duration, find your focus, and begin your session.',
};

export default function MeditationTimerPage() {
  return <MeditationTimerClient />;
}
