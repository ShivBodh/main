
import type { Metadata } from 'next';
import PuriClient from '@/components/peethams/PuriClient';

export const metadata: Metadata = {
  title: 'Govardhana Peetham, Puri | Sanatana Peethams Portal',
  description: 'Explore the Govardhana Peetham in Puri, the eastern seat of Advaita Vedanta. Learn about its deep connection with Lord Jagannath, its teachings, media, and more.',
};

export default function PuriPeethamPage() {
    return <PuriClient />;
}
