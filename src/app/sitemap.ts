
import { MetadataRoute } from 'next';
import { peethams } from '@/lib/peethams-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://shivala.info';

  const staticPages = [
    '/',
    '/mission',
    '/philosophy',
    '/peethams',
    '/social',
    '/events',
    '/gallery',
    '/reading',
    '/sadhana',
    '/sadhana/japa-counter',
    '/sadhana/meditation-timer',
    '/sadhana/daily-wisdom',
    '/panchanga',
    '/quiz',
    '/chess',
    '/kids',
    '/seva',
    '/donate',
    '/contact',
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

  return [...staticPages, ...peethamPages];
}
