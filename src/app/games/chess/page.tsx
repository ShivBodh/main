
import type { Metadata } from 'next';
import ChessClient from '@/components/games/ChessClient';

export const metadata: Metadata = {
  title: 'Play Chess | Sanatan Social',
  description: 'Play a game of chess against Bodhi AI.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ChessPage() {
  return <ChessClient />;
}
