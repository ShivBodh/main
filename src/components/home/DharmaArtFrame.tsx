'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateDharmaArt } from '@/ai/flows/dharma-art-flow';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

export function DharmaArtFrame({ prompt, aiHint }: { prompt: string; aiHint: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const createArt = async () => {
      setIsLoading(true);
      try {
        const result = await generateDharmaArt({ prompt });
        if (result.imageUrl) {
          setImageUrl(result.imageUrl);
        } else {
            throw new Error("No image URL returned from AI flow.");
        }
      } catch (error) {
        console.error(`Failed to generate art for prompt "${prompt}":`, error);
        toast({
          variant: 'destructive',
          title: 'AI Art Generation Failed',
          description: `Could not generate the image.`,
        });
      } finally {
        setIsLoading(false);
      }
    };
    createArt();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'shivala.info.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="flex flex-col w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="aspect-[9/16] w-full relative">
            {isLoading ? (
                <Skeleton className="h-full w-full" />
            ) : (
                imageUrl && (
                    <div className="relative h-full w-full">
                        <Image
                            src={imageUrl}
                            alt={prompt}
                            fill
                            className="object-cover animate-in fade-in duration-1000"
                            data-ai-hint={aiHint}
                        />
                    </div>
                )
            )}
        </div>
        <CardContent className="p-4 bg-muted/50">
            {isLoading ? (
                <Skeleton className="h-10 w-full" />
            ) : (
                imageUrl && (
                    <Button onClick={handleDownload} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                )
            )}
        </CardContent>
    </Card>
  );
}
