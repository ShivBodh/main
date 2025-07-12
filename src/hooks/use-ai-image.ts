
'use client';

import { useState, useEffect } from 'react';
import { generateImage, ImageGeneratorInput } from '@/ai/flows/image-generator-flow';

export function useAiImage(input: ImageGeneratorInput | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      if (!input) return;
      
      setIsLoading(true);
      setError(null);
      setImageUrl(null);
      
      try {
        const result = await generateImage(input);
        setImageUrl(result.imageUrl);
      } catch (err) {
        console.error("AI Image Generation Error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchImage();
  }, [input ? JSON.stringify(input) : null]); // Re-run when input changes

  return { imageUrl, isLoading, error };
}
