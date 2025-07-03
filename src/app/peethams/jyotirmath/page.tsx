
import type { Metadata } from 'next';
import JyotirmathClient from '@/components/peethams/JyotirmathClient';

export const metadata: Metadata = {
  title: 'Jyotirmath Peetham, Badrinath | Sanatana Peethams Portal',
  description: 'Explore the Jyotirmath Peetham, the northern Himalayan seat of Advaita Vedanta. Discover its history, teachings, and the serene spiritual environment of Badrinath.',
};

export default function JyotirmathPeethamPage() {
    return <JyotirmathClient />;
}
