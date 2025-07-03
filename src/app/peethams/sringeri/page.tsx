
import type { Metadata } from 'next';
import SringeriClient from '@/components/peethams/SringeriClient';

export const metadata: Metadata = {
  title: 'Sringeri Sharada Peetham | Sanatana Peethams Portal',
  description: 'Explore the Sringeri Sharada Peetham, the southern seat of Advaita Vedanta established by Adi Shankaracharya. Discover its history, teachings, media, and community initiatives.',
};

export default function SringeriPeethamPage() {
    return <SringeriClient />;
}
