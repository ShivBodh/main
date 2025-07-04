
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateDharmaArt } from '@/ai/flows/dharma-art-flow';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

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
          description: `Could not generate the image for "${prompt}".`,
        });
      } finally {
        setIsLoading(false);
      }
    };
    createArt();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  return (
    <Card className="aspect-square w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
    </Card>
  );
}
