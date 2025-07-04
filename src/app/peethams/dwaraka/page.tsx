
import type { Metadata } from 'next';
import DwarakaClient from '@/components/peethams/DwarakaClient';

export const metadata: Metadata = {
  title: 'Dwaraka Sharada Peetham',
  description: "Explore the western seat (Paścima Āmnāya Pīṭha) of Advaita Vedanta in Lord Krishna's sacred city. Discover its history, association with the Sama Veda, and the Mahāvākya 'Tat Tvam Asi'.",
};

export default function DwarakaPeethamPage() {
    return <DwarakaClient />;
}
