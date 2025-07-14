import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panchanga Widgets | Sanatana Peethams Portal',
  description: 'Download beautiful, shareable widgets of today\'s Panchanga for your mobile device.',
};

export default function PanchangaWidgetsPage() {
  return (
    <div className="bg-gray-950">
      <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
            Panchanga Widget Gallery
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Select a beautifully designed widget to keep the day's Panchanga on your phone.
            </p>
        </div>

        <Card className="bg-background">
          <CardHeader className="items-center text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500" />
              <CardTitle>Feature Under Maintenance</CardTitle>
              <CardDescription>
                  The widget download feature is temporarily unavailable.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <p className="text-center text-muted-foreground">
                  We are performing an essential upgrade to improve the reliability of widget generation. This feature will be back online shortly. Thank you for your patience.
              </p>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}