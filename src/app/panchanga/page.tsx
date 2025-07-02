
import PanchangaClient from '@/components/panchanga/PanchangaClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Panchanga | Sanatana Peethams Portal',
  description: "View today's astrological details (Panchanga) for the four cardinal regions of India, including Tithi, Nakshatra, Yoga, Karana, and auspicious timings.",
};

export default function PanchangaPage() {
  return <PanchangaClient />;
}
