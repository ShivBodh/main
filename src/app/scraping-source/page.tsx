
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import Image from 'next/image';
import { scrapingSourceData } from '@/lib/scraping-source-data';

export const metadata: Metadata = {
  title: 'Scraping Source Page',
  description: 'A sample page designed to be scraped by our tool.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ScrapingSourcePage() {
  const posts = scrapingSourceData;

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
                  src={post.imageUrl}
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
