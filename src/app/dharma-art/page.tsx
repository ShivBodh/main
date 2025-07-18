
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brush, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Content Creation Tools',
  description: 'Tools to create and enhance content for the portal.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function DharmaArtPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight flex items-center justify-center gap-3">
            <Brush className="h-10 w-10" />
            Content Creation Hub
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          A space for creating content. This feature is currently being rebuilt.
        </p>
      </div>

      <Card>
        <CardHeader className="items-center text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
            <CardTitle>Feature Under Construction</CardTitle>
            <CardDescription>
                The creation tools have been temporarily disabled for a system upgrade.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-center text-muted-foreground">
                We are building a new, more powerful content creation system. Thank you for your patience.
            </p>
        </CardContent>
      </Card>
      
    </div>
  );
}
