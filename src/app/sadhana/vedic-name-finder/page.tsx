
import type { Metadata } from 'next';
import VedicNameFinderClient from '@/components/sadhana/VedicNameFinderClient';

export const metadata: Metadata = {
  title: 'Vedic Baby Name Finder | Sanatana Peethams Portal',
  description: 'Find auspicious baby names based on Vedic astrology principles, including Rashi (Moon Sign) and Nakshatra Pada (Lunar Mansion).',
};

export default function VedicNameFinderPage() {
  return <VedicNameFinderClient />;
}
