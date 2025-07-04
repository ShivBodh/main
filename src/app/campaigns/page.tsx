
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, PlusCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Campaigns | Sanatana Peethams Portal',
  description: 'Start and support campaigns for issues important to Sanatana Dharma. Make your voice heard.',
};

export default function CampaignsPage() {
  // Placeholder for campaigns data
  const campaigns: any[] = [];

  return (
    <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
            Dharma Campaigns
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl">
            A platform for the community to raise awareness and rally support for causes that uphold and protect Sanatana Dharma.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/campaigns/create">
            <PlusCircle className="mr-2" />
            Start a Campaign
          </Link>
        </Button>
      </div>

      <div>
        <h2 className="text-3xl font-headline font-bold text-primary mb-8">Active Campaigns</h2>
        {campaigns.length === 0 ? (
          <Card className="text-center py-16">
            <CardHeader>
              <Megaphone className="mx-auto h-12 w-12 text-muted-foreground" />
              <CardTitle className="mt-4 text-2xl font-headline">No Active Campaigns Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Be the first to start a movement for a cause you believe in.</p>
              <Button asChild>
                <Link href="/campaigns/create">Start Your Campaign</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Campaign cards will be mapped here */}
          </div>
        )}
      </div>
    </div>
  );
}
