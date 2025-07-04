
import type { Metadata } from 'next';
import JyotirmathClient from '@/components/peethams/JyotirmathClient';

export const metadata: Metadata = {
  title: 'Jyotirmath Peetham, Badrinath',
  description: "Explore the northern seat (Uttara Āmnāya Pīṭha) of Advaita Vedanta in the Himalayas. Discover its history, association with the Atharva Veda, and the Mahāvākya 'Ayam Ātmā Brahma'.",
};

export default function JyotirmathPeethamPage() {
    return <JyotirmathClient />;
}
