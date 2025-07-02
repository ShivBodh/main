
import KidsCornerClient from '@/components/kids/KidsCornerClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kids Corner | Sanatana Peethams Portal',
  description: 'A fun and creative space for young devotees. Enjoy our digital scratch-to-reveal activity featuring sacred figures.',
};

export default function KidsCornerPage() {
  return <KidsCornerClient />;
}
