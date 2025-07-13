
import type { Metadata } from 'next';
import LudoPageClient from './LudoPageClient';

export const metadata: Metadata = {
  title: 'Play Pasha | Sanatan Social',
  description: 'Play a game of Pasha against Bodhi AI.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function LudoPage() {
  return <LudoPageClient />;
}
