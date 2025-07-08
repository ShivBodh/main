
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Scraping Source Page',
  description: 'A sample page designed to be scraped by our tool.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ScrapingSourcePage() {
  const posts = [
    {
      peetham: 'Sringeri',
      image: 'https://images.unsplash.com/photo-1617664693373-57c2a5315579?q=80&w=600&h=400&fit=crop',
      aiHint: 'hindu temple night',
      description: 'The main temple of Goddess Sharadamba beautifully illuminated for the Navaratri festival, attracting thousands of devotees.',
    },
    {
      peetham: 'Dwaraka',
      image: 'https://images.unsplash.com/photo-1599321683993-274744743e49?q=80&w=600&h=400&fit=crop',
      aiHint: 'hindu ritual aarti',
      description: 'The Shankaracharya of Dwaraka performing the evening Aarti at the main Dwarkadhish temple during Janmashtami celebrations.',
    },
    {
      peetham: 'Puri',
      image: 'https://images.unsplash.com/photo-1589283733839-845778a36b32?q=80&w=600&h=400&fit=crop',
      aiHint: 'hindu chariot festival',
      description: 'Volunteers and artisans giving final touches to the grand chariots for the annual Rath Yatra festival.',
    },
    {
      peetham: 'Jyotirmath',
      image: 'https://images.unsplash.com/photo-1565448343270-36a5a9018443?q=80&w=600&h=400&fit=crop',
      aiHint: 'himalayan monastery snow',
      description: 'A breathtaking view of the Jyotirmath premises covered in a thick blanket of snow during the winter months.',
    }
  ];

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto max-w-2xl py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Scraping Source Page</h1>
          <p className="text-muted-foreground">This page is the target for our web scraper tool.</p>
        </div>
        <div className="space-y-6">
          {posts.map(post => (
            <Card key={post.peetham} className="peetham-post" data-peetham={post.peetham}>
              <CardHeader>
                <CardTitle>{post.peetham} Peetham - Sample Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Image
                  src={post.image}
                  alt={`A post from ${post.peetham}`}
                  width={600}
                  height={400}
                  className="rounded-lg border"
                  data-ai-hint={post.aiHint}
                />
                <p className="description text-foreground/80">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
