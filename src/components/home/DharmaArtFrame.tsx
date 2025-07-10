
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAIImage } from '@/hooks/use-ai-image';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function DharmaArtFrame() {
  const [prompt, setPrompt] = useState('A painting of a sadhu meditating in the Himalayas, style of Raja Ravi Varma');
  const [submittedPrompt, setSubmittedPrompt] = useState(prompt);

  const { imageUrl, isLoading } = useAIImage(submittedPrompt, 'https://placehold.co/512x512.png');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPrompt(prompt);
  };

  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Dharma Art Generator
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Create beautiful, AI-powered art inspired by the concepts of Sanatana Dharma.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Describe Your Vision</CardTitle>
          <CardDescription>Enter a prompt describing the art you wish to create. Be descriptive for best results.</CardDescription>
        </CardHeader>
        <CardContent>
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
          <div className="mt-8 flex justify-center">
            {isLoading ? (
                <Skeleton className="w-[512px] h-[512px] rounded-lg" />
            ) : (
                <Image
                    src={imageUrl}
                    alt={submittedPrompt}
                    width={512}
                    height={512}
                    className="rounded-lg shadow-lg border object-cover"
                />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
