
import type { Metadata } from 'next';
import QuizClient from '@/components/quiz/QuizClient';

export const metadata: Metadata = {
  title: 'Peetham Knowledge Quiz | Sanatana Peethams Portal',
  description: 'Test your knowledge about the history, philosophy, and key figures of the four cardinal Peethams established by Adi Shankaracharya.',
};

export default function QuizPage() {
  return <QuizClient />;
}
