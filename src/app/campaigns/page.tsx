
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Feature Moved | Sanatana Peethams Portal',
  description: 'The Campaigns feature has been integrated into the new Sanatan Social hub.',
};

export default function DeprecatedCampaignsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 flex justify-center">
      <Card className="w-full text-center">
        <CardHeader>
          <Users className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="font-headline text-3xl mt-4">This Feature Has Moved</CardTitle>
          <CardDescription>
            The Campaigns Hub is now part of the new Sanatan Social platform, your central place for community action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg">
            <Link href="/social">Go to Sanatan Social</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
