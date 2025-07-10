
import type { Metadata } from 'next';
import DharmaArtFrame from '@/components/home/DharmaArtFrame';

export const metadata: Metadata = {
  title: 'Dharma Art Generator',
  description: 'Create beautiful, AI-powered art inspired by the concepts of Sanatana Dharma.',
};

export default function DharmaArtPage() {
  return <DharmaArtFrame />;
}
