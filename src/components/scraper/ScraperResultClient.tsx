
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TestTube2 } from 'lucide-react';
import Image from 'next/image';

interface ScrapedItem {
    id: string;
    date: string;
    peetham: string;
    type: string;
    title: string;
    description: string;
    imageUrl: string;
    thumbnailUrl: string;
    aiHint: string;
}

export default function ScraperResultClient() {
    const [data, setData] = useState<ScrapedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);
            try {
                // The import path needs to be relative to the final built file in the .next directory,
                // which makes direct fetching of a local JSON file tricky in Next.js App Router.
                // A robust way is to use fetch with a cache-busting parameter.
                const response = await fetch(`/scraped-data.json?t=${new Date().getTime()}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch scraped data. Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err: any) {
                console.error("Error fetching scraped data:", err);
                setError("Could not load scraped data. The file might be empty or missing. Run the scraper script: `node scripts/run-scraper.js`");
                setData([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const refreshData = () => {
         // This is a bit of a trick. In a real app, you might use revalidation.
         // Here, we just re-run the fetch.
         window.location.reload();
    }


    if (isLoading) {
        return (
             <div className="container mx-auto max-w-4xl py-12 px-4">
                <div className="text-center mb-12">
                     <Skeleton className="h-10 w-3/4 mx-auto" />
                     <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
             </div>
        )
    }

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                    Scraper Tool Results
                </h1>
                <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                    This page displays the content scraped and processed by our independent tool.
                </p>
                 <Button onClick={refreshData} className="mt-4">Refresh Results</Button>
            </div>
            
            {error && (
                 <Card className="bg-destructive/10 border-destructive/20 text-center p-8">
                     <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
                     <CardTitle className="text-destructive font-bold text-xl">Error Loading Data</CardTitle>
                     <CardContent className="p-0 mt-2">
                        <p>{error}</p>
                     </CardContent>
                 </Card>
            )}

            {!error && data.length === 0 && (
                 <Card className="bg-amber-500/10 border-amber-500/20 text-center p-8">
                     <TestTube2 className="mx-auto h-12 w-12 text-amber-600 mb-4" />
                     <CardTitle className="text-amber-700 font-bold text-xl">Scraped Data is Empty</CardTitle>
                     <CardContent className="p-0 mt-2">
                        <p>Run the scraper script to populate this page:</p>
                        <code className="mt-2 inline-block bg-muted px-2 py-1 rounded-md font-mono">node scripts/run-scraper.js</code>
                     </CardContent>
                 </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map(item => (
                    <Card key={item.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                                <Badge>{item.peetham}</Badge>
                            </div>
                            <CardDescription>AI-generated title and keywords.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={600}
                                height={400}
                                className="rounded-lg border w-full aspect-video object-cover"
                            />
                            <p className="mt-4 text-sm text-foreground/80">{item.description}</p>
                        </CardContent>
                         <CardFooter>
                            <p className="text-xs text-muted-foreground">AI Keywords: {item.aiHint}</p>
                         </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
