
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, FileSignature } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sanatani Petition Platform',
  description: 'A platform to raise awareness and support for dharmic causes.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function PetitionsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight flex items-center justify-center gap-3">
            <FileSignature className="h-10 w-10" />
            Sanatani Petition Platform
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          A space for raising awareness and gathering support for important dharmic causes.
        </p>
      </div>

      <Card>
        <CardHeader className="items-center text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
            <CardTitle>Feature Coming Soon</CardTitle>
            <CardDescription>
                This feature is currently under construction.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-center text-muted-foreground">
                We are building a dedicated platform for the community to create and support petitions. Thank you for your patience.
            </p>
        </CardContent>
      </Card>
      
    </div>
  );
}
