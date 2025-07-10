
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAIImage } from '@/hooks/use-ai-image';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function DharmaArtFrame() {
  const [prompt, setPrompt] = useState('A painting of a sadhu meditating in the Himalayas, style of Raja Ravi Varma');
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  // We pass an empty string initially so the hook doesn't run on page load
  const { imageUrl, isLoading, error } = useAIImage(submittedPrompt, 'https://images.unsplash.com/photo-1620058866387-a3c39a04a52c?q=80&w=512&h=512&fit=crop');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPrompt(prompt);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A painting of Krishna advising Arjuna..."
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate Art'}
        </Button>
      </form>
      <div className="flex justify-center">
        {isLoading ? (
            <Skeleton className="w-full h-auto aspect-square max-w-[512px] rounded-lg" />
        ) : (
            <Image
                src={imageUrl}
                alt={submittedPrompt || "A painting of a wise sage studying sacred texts"}
                width={512}
                height={512}
                className="rounded-lg shadow-lg border object-cover"
                unoptimized // Necessary for external URLs that are not in next.config.ts
            />
        )}
      </div>
       {error && <p className="text-center text-destructive">{error}</p>}
    </div>
  );
}
