
'use client';

import { useState, useEffect } from 'react';
import { generateImage } from '@/ai/flows/image-generator-flow';

export function useAIImage(prompt: string, fallbackUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(fallbackUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      // Only generate if there is a prompt.
      if (!prompt) {
        return;
      }
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
            setError('Could not generate image. The AI may be offline.');
            setImageUrl(fallbackUrl); // Revert to fallback on error
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    generate();

    return () => {
      isMounted = false;
    };
  }, [prompt, fallbackUrl]);

  return { imageUrl, isLoading, error };
}
