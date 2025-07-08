
import PanchangaWidgetsClient from '@/components/panchanga/PanchangaWidgetsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panchanga Widgets | Sanatana Peethams Portal',
  description: 'Download beautiful, shareable widgets of today\'s Panchanga for your mobile device. Four unique styles to choose from.',
};

export default function PanchangaWidgetsPage() {
  return <PanchangaWidgetsClient />;
}
