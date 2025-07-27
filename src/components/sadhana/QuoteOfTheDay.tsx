
'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function QuoteOfTheDay() {
  const [wisdom, setWisdom] = useState<{ quote: string; author: string; translation: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWisdom() {
      setIsLoading(true);
      // Set a fallback quote on error
      setWisdom({
        quote: "True knowledge is that which liberates.",
        author: "Upanishads",
        translation: "सा विद्या या विमुक्तये।"
      });
      setIsLoading(false);
    }
    fetchWisdom();
  }, []);

  if (isLoading || !wisdom) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-4 w-1/4" />
        <Separator />
         <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <blockquote className="text-base italic text-foreground/90">
        "{wisdom.quote}"
      </blockquote>
      <p className="text-sm font-semibold text-muted-foreground">— {wisdom.author}</p>
      <Separator />
      <blockquote className="text-base italic text-foreground/90 font-headline" lang="hi">
        "{wisdom.translation}"
      </blockquote>
    </div>
  );
}
