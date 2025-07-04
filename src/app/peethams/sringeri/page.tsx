
import type { Metadata } from 'next';
import SringeriClient from '@/components/peethams/SringeriClient';

export const metadata: Metadata = {
  title: 'Sringeri Sharada Peetham',
  description: "Explore the southern seat (Dakṣiṇa Āmnāya Pīṭha) of Advaita Vedanta established by Adi Shankaracharya. Discover its history, the lineage of Jagadgurus, association with the Yajur Veda, and the Mahāvākya 'Aham Brahmāsmi'.",
};

export default function SringeriPeethamPage() {
    return <SringeriClient />;
}
