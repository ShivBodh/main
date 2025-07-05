'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { generateDharmaArt } from '@/ai/flows/dharma-art-flow';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Download, Wand2 } from 'lucide-react';

export function InteractiveWallpaperGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast({
                variant: 'destructive',
                title: 'Prompt is empty',
                description: 'Please enter a concept to generate a wallpaper.',
            });
            return;
        }

        setIsLoading(true);
        setImageUrl(null);

        try {
            const result = await generateDharmaArt({ prompt });
            if (result.imageUrl) {
                setImageUrl(result.imageUrl);
            } else {
                throw new Error("No image URL returned from generation flow.");
            }
        } catch (error) {
            console.error(`Failed to generate art for prompt "${prompt}":`, error);
            toast({
                variant: 'destructive',
                title: 'Art Generation Failed',
                description: 'Could not generate wallpaper. Please ensure your GOOGLE_API_KEY is configured in the .env file.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'shivala.info.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Wand2 className="h-6 w-6 text-primary" />
                    Create Your Own Wallpaper
                </CardTitle>
                <CardDescription>
                    Enter a concept from Sanatana Dharma (e.g., "The Trimurti", "The cosmic dance of Shiva", "Ganesha writing the Mahabharata") to generate a unique wallpaper.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter a concept..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <Button onClick={handleGenerate} disabled={isLoading || !prompt.trim()}>
                        {isLoading ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
                <div className="aspect-[9/16] w-full relative bg-muted/30 rounded-lg flex items-center justify-center">
                    {isLoading && <Skeleton className="h-full w-full" />}
                    {!isLoading && imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={prompt}
                            fill
                            className="object-cover animate-in fade-in duration-500 rounded-lg"
                        />
                    )}
                    {!isLoading && !imageUrl && (
                        <p className="text-muted-foreground text-center p-4">Your generated wallpaper will appear here.</p>
                    )}
                </div>
            </CardContent>
            {imageUrl && !isLoading && (
                <CardFooter>
                    <Button onClick={handleDownload} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Wallpaper
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
