
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface JapaSession {
    timestamp: number;
    count: number;
}

export default function JapaCounterClient() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const saveAndReset = () => {
    if (count > 0 && user) {
        const session: JapaSession = {
            timestamp: Date.now(),
            count: count
        };
        const key = `japaHistory_${user.uid}`;
        const rawHistory = localStorage.getItem(key);
        const existingHistory: JapaSession[] = rawHistory ? JSON.parse(rawHistory) : [];
        localStorage.setItem(key, JSON.stringify([...existingHistory, session]));

        toast({
            title: "Japa Session Saved",
            description: `Your session of ${count} malas has been logged in your Bodha Calendar.`,
        });
    }
    setCount(0);
  };

  return (
    <div className="container mx-auto max-w-2xl py-16 md:py-24 px-4 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Japa Counter
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Use this digital mala for your mantra recitation practice. Each session is logged to your personal Bodha Calendar.
        </p>
      </div>

      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Current Malas</CardTitle>
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
            onClick={saveAndReset}
            variant="outline"
            className="w-full"
            aria-label="Save and Reset count"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Save & Reset Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

    