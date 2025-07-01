'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { wisdomQuotes, Wisdom } from '@/lib/wisdom-data';

export default function DailyWisdomPage() {
  const [currentWisdom, setCurrentWisdom] = useState<Wisdom | null>(null);

  const getNewWisdom = () => {
    const randomIndex = Math.floor(Math.random() * wisdomQuotes.length);
    setCurrentWisdom(wisdomQuotes[randomIndex]);
  };

  useEffect(() => {
    getNewWisdom();
  }, []);

  if (!currentWisdom) {
    return (
        <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 flex justify-center">
            <p>Loading wisdom...</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Daily Wisdom
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          A pearl of wisdom from the great Acharyas for your daily contemplation.
        </p>
      </div>

      <Card className="w-full text-center shadow-lg">
        <CardContent className="p-8">
          <blockquote className="text-2xl italic text-foreground/90 leading-relaxed">
            "{currentWisdom.quote}"
          </blockquote>
          <p className="mt-6 text-lg font-semibold text-muted-foreground">
            — {currentWisdom.author}
          </p>
        </CardContent>
        <CardFooter className="justify-center p-6 bg-muted/50">
          <Button onClick={getNewWisdom}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Get New Wisdom
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
