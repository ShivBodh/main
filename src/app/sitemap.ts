import { MetadataRoute } from 'next';
import { peethams } from '@/lib/peethams-data';
import { readingList } from '@/lib/reading-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://shivala.info';

  const staticPages = [
    '/',
    '/mission',
    '/philosophy',
    '/peethams',
    '/social',
    '/events',
    '/reading',
    '/sadhana',
    '/sadhana/japa-counter',
    '/sadhana/meditation-timer',
    '/sadhana/daily-wisdom',
    '/panchanga',
    '/quiz',
    '/seva',
    '/contact',
    '/privacy-policy',
    '/user-agreement',
    '/games/ludo',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const peethamPages = peethams.map((peetham) => ({
    url: `${siteUrl}${peetham.link}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  
  const readingPages = readingList.map((book) => ({
    url: `${siteUrl}/reading/${book.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...peethamPages, ...readingPages];
}
