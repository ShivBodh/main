
import type { Metadata } from 'next';
import SevaClient from '@/components/seva/SevaClient';

export const metadata: Metadata = {
  title: 'Connect with the Peethams | Sanatana Peethams Portal',
  description: 'An interactive map to the four cardinal Peethams established by Adi Shankaracharya. Discover the location and explore the history of Sringeri, Dwaraka, Puri, and Jyotirmath.',
};

export default function SevaPage() {
    return <SevaClient />;
}
