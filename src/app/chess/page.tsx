
import type { Metadata } from 'next';
import ChessClient from '@/components/chess/ChessClient';

export const metadata: Metadata = {
  title: 'Chess AI | Sanatana Peethams Portal',
  description: 'Challenge "Bodhi," our custom-trained chess AI. Play as white and test your strategic skills against the machine.',
};

export default function ChessPage() {
  return <ChessClient />;
}
