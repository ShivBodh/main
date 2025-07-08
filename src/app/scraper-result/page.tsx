
import type { Metadata } from 'next';
import ScraperResultClient from '@/components/scraper/ScraperResultClient';

export const metadata: Metadata = {
  title: 'Scraper Results',
  description: 'View the data extracted and processed by our independent scraper tool.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ScraperResultPage() {
  return <ScraperResultClient />;
}
