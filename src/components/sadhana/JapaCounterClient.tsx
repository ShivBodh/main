
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

export default function JapaCounterClient() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Japa Counter
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Use this digital mala for your mantra recitation practice.
        </p>
      </div>

      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Current Count</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-7xl font-bold font-mono text-primary tracking-tighter">
            {count}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={increment}
            className="w-full h-24 text-2xl font-bold rounded-xl shadow-lg"
            size="lg"
            aria-label="Increment count"
          >
            Tap to Count
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="w-full"
            aria-label="Reset count"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
