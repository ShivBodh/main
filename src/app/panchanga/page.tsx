
import PanchangaClient from '@/components/panchanga/PanchangaClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Panchanga',
  description: "Today's Hindu astrological details for North, South, East, and West India. View Tithi, Nakshatra, Yoga, Karana, Rahu Kalam, and other auspicious and inauspicious timings.",
};

export default function PanchangaPage() {
  return <PanchangaClient />;
}
