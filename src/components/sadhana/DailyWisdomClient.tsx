'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { getDailyWisdom, DailyWisdomOutput } from '@/ai/flows/daily-wisdom-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

function WisdomCard({ wisdom }: { wisdom: DailyWisdomOutput | null }) {
    if (!wisdom) {
        return (
            <Card className="w-full text-center shadow-lg">
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                        <Skeleton className="h-6 w-1/2 mx-auto" />
                    </div>
                    <Skeleton className="h-4 w-1/4 mx-auto" />
                    <Separator className="my-6" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                         <Skeleton className="h-6 w-1/2 mx-auto" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card className="w-full text-center shadow-lg animate-in fade-in duration-500">
            <CardContent className="p-8">
                <blockquote className="text-2xl italic text-foreground/90 leading-relaxed">
                    "{wisdom.quote}"
                </blockquote>
                <p className="mt-6 text-lg font-semibold text-muted-foreground">
                    — {wisdom.author}
                </p>
                <Separator className="my-6" />
                <blockquote className="text-2xl italic text-foreground/90 leading-relaxed font-headline" lang="hi">
                    "{wisdom.translation}"
                </blockquote>
            </CardContent>
        </Card>
    );
}

export default function DailyWisdomClient() {
  const [currentWisdom, setCurrentWisdom] = useState<DailyWisdomOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWisdom = async () => {
    setIsLoading(true);
    setCurrentWisdom(null); // Clear old wisdom to show skeleton
    try {
        const wisdom = await getDailyWisdom();
        setCurrentWisdom(wisdom);
    } catch (error) {
        console.error("Failed to fetch wisdom:", error);
        // Provide a graceful fallback in case of an API error
        setCurrentWisdom({
            quote: "The Self is not to be known by the study of the scriptures, nor by the intellect, nor by much hearing.",
            author: "Katha Upanishad",
            translation: "आत्मा न तो प्रवचन से, न बुद्धि से, और न बहुत सुनने से ही जाना जा सकता है।"
        });
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWisdom();
  }, []);
  
  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Daily Wisdom
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          A daily pearl of wisdom from the great Acharyas, with its Hindi translation, to inspire your day.
        </p>
      </div>

      <WisdomCard wisdom={currentWisdom} />
      
      <div className="mt-8">
          <Button onClick={fetchWisdom} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Get New Wisdom
          </Button>
      </div>
    </div>
  );
}
