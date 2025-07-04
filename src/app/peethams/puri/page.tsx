
import type { Metadata } from 'next';
import PuriClient from '@/components/peethams/PuriClient';

export const metadata: Metadata = {
  title: 'Govardhana Peetham, Puri',
  description: "Explore the eastern seat (Pūrva Āmnāya Pīṭha) of Advaita Vedanta. Learn about its connection to Lord Jagannath, the Rig Veda, and the Mahāvākya 'Prajñānam Brahma'.",
};

export default function PuriPeethamPage() {
    return <PuriClient />;
}
