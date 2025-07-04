
import type { Metadata } from 'next';
import DainandiniClient from '@/components/diary/DainandiniClient';

export const metadata: Metadata = {
  title: 'Dainandini - Personal Diary',
  description: 'Your personal space for spiritual reflection, journaling, and tracking your journey. A private feature for logged-in users of the Sanatana Peethams Portal.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DiaryPage() {
  return <DainandiniClient />;
}
