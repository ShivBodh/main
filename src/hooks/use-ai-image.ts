'use client';

import { useState, useEffect } from 'react';
import { generateImage } from '@/ai/flows/image-generator-flow';

export function useAIImage(prompt: string, fallbackUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(fallbackUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await generateImage({ prompt });
        if (isMounted) {
          setImageUrl(response.imageUrl);
        }
      } catch (err) {
        console.error(`Failed to generate image for prompt: "${prompt}"`, err);
        if (isMounted) {
            setError('Could not generate image.');
            // On error, we will just use the fallbackUrl which is already set
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (prompt) {
      generate();
    } else {
        setIsLoading(false);
    }


    return () => {
      isMounted = false;
    };
  }, [prompt]);

  return { imageUrl, isLoading, error };
}
