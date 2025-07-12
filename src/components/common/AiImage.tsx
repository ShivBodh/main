
'use client';

import Image, { ImageProps } from 'next/image';
import { useAiImage } from '@/hooks/use-ai-image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface AiImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string;
  alt?: string;
  'data-ai-hint': string;
}

export function AiImage({ src, alt, 'data-ai-hint': aiHint, width, height, className, ...props }: AiImageProps) {
  const shouldGenerate = !src;
  const imageInput = shouldGenerate ? { prompt: aiHint, width: Number(width), height: Number(height) } : null;
  const { imageUrl, isLoading, error } = useAiImage(imageInput);

  const finalSrc = src || imageUrl;
  const finalAlt = alt || aiHint;

  if (isLoading) {
    return <Skeleton className={cn("w-full h-full", className)} style={{ width: `${width}px`, height: `${height}px` }} />;
  }

  if (error) {
    return (
      <div className={cn("w-full h-full bg-destructive/10 flex flex-col items-center justify-center text-destructive text-xs p-2", className)} style={{ width: `${width}px`, height: `${height}px` }}>
        <AlertCircle className="h-6 w-6 mb-2" />
        <p>Image Error</p>
      </div>
    );
  }

  if (!finalSrc) {
     return <Skeleton className={cn("w-full h-full", className)} style={{ width: `${width}px`, height: `${height}px` }} />;
  }

  return (
    <Image
      src={finalSrc}
      alt={finalAlt}
      width={Number(width)}
      height={Number(height)}
      className={className}
      data-ai-hint={aiHint}
      {...props}
    />
  );
}
