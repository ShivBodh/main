
import type { Metadata } from 'next';
import ReadingClient from '@/components/reading/ReadingClient';

export const metadata: Metadata = {
  title: 'Reading Room',
  description: 'A digital library of foundational Advaita Vedanta texts by masters like Adi Shankaracharya. Download PDFs of Vivekachudamani, Atma Bodha, and more sacred scriptures (grantha).',
};

export default function ReadingPage() {
  return <ReadingClient />;
}
