
import type { Metadata } from 'next';
import DwarakaClient from '@/components/peethams/DwarakaClient';

export const metadata: Metadata = {
  title: 'Dwaraka Sharada Peetham | Sanatana Peethams Portal',
  description: 'Explore the Dwaraka Sharada Peetham, the western seat of Advaita Vedanta. Discover its history, teachings, media, and Seva opportunities in the sacred city of Dwaraka.',
};

export default function DwarakaPeethamPage() {
    return <DwarakaClient />;
}
