
import type { Metadata } from 'next';
import JapaCounterClient from '@/components/sadhana/JapaCounterClient';

export const metadata: Metadata = {
  title: 'Japa Counter | Sanatana Peethams Portal',
  description: 'A simple digital Japa mala to assist you in your daily mantra recitation practice. Keep track of your count with ease.',
};

export default function JapaCounterPage() {
  return <JapaCounterClient />;
}
