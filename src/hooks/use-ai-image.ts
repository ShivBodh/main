
'use client';

import { useState, useEffect } from 'react';
import { generateImage, ImageGeneratorInput } from '@/ai/flows/image-generator-flow';
import { getCachedImage, setCachedImage } from '@/lib/idb';

const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function useAiImage(input: ImageGeneratorInput | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // A flag to prevent setting state on unmounted component
    let isMounted = true;

    async function fetchImage() {
      if (!input) return;

      const cacheKey = `ai_image_cache_${input.prompt}_${input.width}x${input.height}`;
      
      try {
        const cachedItem = await getCachedImage(cacheKey);
        if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION_MS) {
          if (isMounted) {
            setImageUrl(cachedItem.url);
          }
          return; // Use cached image and skip generation
        }
      } catch (e) {
        console.error("Failed to read from IndexedDB", e);
      }

      if (isMounted) {
        setIsLoading(true);
        setError(null);
        setImageUrl(null);
      }
      
      try {
        const result = await generateImage(input);
        if (isMounted) {
          setImageUrl(result.imageUrl);
        }
        try {
          await setCachedImage(cacheKey, result.imageUrl);
        } catch (e) {
           console.error("Failed to write to IndexedDB", e);
        }
      } catch (err) {
        console.error("AI Image Generation Error:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An unknown error occurred.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [input ? JSON.stringify(input) : null]); // Re-run when input changes

  return { imageUrl, isLoading, error };
}
