
'use client';

import { useState, useEffect } from 'react';
import { generateImage, ImageGeneratorInput } from '@/ai/flows/image-generator-flow';

const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function useAiImage(input: ImageGeneratorInput | null) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      if (!input) return;

      const cacheKey = `ai_image_cache_${input.prompt}_${input.width}x${input.height}`;
      
      try {
        const cachedItem = localStorage.getItem(cacheKey);
        if (cachedItem) {
          const { url, timestamp } = JSON.parse(cachedItem);
          if (Date.now() - timestamp < CACHE_DURATION_MS) {
            setImageUrl(url);
            return; // Use cached image and skip generation
          }
        }
      } catch (e) {
        console.error("Failed to read from localStorage", e);
      }

      setIsLoading(true);
      setError(null);
      setImageUrl(null);
      
      try {
        const result = await generateImage(input);
        setImageUrl(result.imageUrl);
        try {
          const cacheItem = {
            url: result.imageUrl,
            timestamp: Date.now()
          };
          localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
        } catch (e) {
           console.error("Failed to write to localStorage", e);
        }
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
