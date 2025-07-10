
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Image as ImageIcon, Sparkles, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Content Generation Hub',
  description: 'Tools to create and enhance content for the portal using generative AI.',
};

export default function DharmaArtPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10" />
            AI Content Generation Hub
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Tools to create and enhance content for the Sanatana Peethams Portal using generative AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-6 w-6 text-primary" />
                    AI Art Generator
                </CardTitle>
                <CardDescription>
                    Create beautiful, AI-powered art inspired by the concepts of Sanatana Dharma.
                </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="p-8 bg-muted rounded-lg border text-center">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                        This feature is temporarily unavailable while we perform an essential upgrade to the AI model. Thank you for your patience.
                    </p>
                </div>
            </CardContent>
        </Card>
        
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    AI Article & Title Generator
                </CardTitle>
                <CardDescription>
                    Provide a raw text description or article, and the AI will generate a concise, fitting title and relevant keywords. This feature is used by our internal content processing script.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-8 bg-muted rounded-lg border text-center">
                    <p className="text-muted-foreground">
                        This AI capability is integrated into our content pipeline. To use it, add content to <code className="font-mono text-sm bg-background px-1.5 py-1 rounded-md">src/lib/scraping-source-data.ts</code> and run the command <code className="font-mono text-sm bg-background px-1.5 py-1 rounded-md">npm run scrape</code> in your terminal.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
