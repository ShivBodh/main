
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Feature Moved | Sanatana Peethams Portal',
  description: 'The Dainandini (Diary) feature has been integrated into the new Sanatan Social hub.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeprecatedDiaryPage() {
    return (
    <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 flex justify-center">
      <Card className="w-full text-center">
        <CardHeader>
          <Users className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="font-headline text-3xl mt-4">This Feature Has Moved</CardTitle>
          <CardDescription>
            Your Dainandini is now a dedicated tab within the new Sanatan Social platform.
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
