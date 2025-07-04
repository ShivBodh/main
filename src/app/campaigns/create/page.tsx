
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { FilePen } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Start a Campaign | Sanatana Peethams Portal',
  description: 'Create a new campaign to rally support for a cause aligned with Sanatana Dharma.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CreateCampaignPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
       <Card>
        <CardHeader className="text-center">
          <FilePen className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl font-headline mt-4">Create Your Campaign</CardTitle>
          <CardDescription className="text-lg">This feature is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            The ability to create petitions and campaigns is an exciting new feature we are actively developing. Soon, you will be able to launch your own initiatives right here. Thank you for your patience and support!
          </p>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full">
                <Link href="/campaigns">Back to Campaigns Hub</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
