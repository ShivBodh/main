
'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getKidsGuide } from '@/ai/flows/kids-guide-flow';

const ScratchImage = ({ imageUrl, width, height }: { imageUrl: string; width: number; height: number; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Fill the canvas with a solid color
    context.fillStyle = '#d1d5db'; // A neutral gray color
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'destination-out';

  }, [width, height]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    if (e.buttons !== 1) return; // only draw when mouse is clicked

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.arc(x, y, 25, 0, 2 * Math.PI); // Increased radius for easier scratching
    context.fill();
  };
  
    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    context.beginPath();
    context.arc(x, y, 25, 0, 2 * Math.PI);
    context.fill();
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = '#d1d5db';
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'destination-out';
  }

  return (
    <div className="relative flex justify-center items-center w-full" style={{ maxWidth: `${width}px`}}>
      <div className="aspect-w-3 aspect-h-2 w-full">
        <Image
          src={imageUrl}
          alt="Hidden spiritual image"
          fill
          className="absolute top-0 left-0 z-0 rounded-lg object-cover"
          data-ai-hint="Adi Shankaracharya"
        />
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="relative z-10 cursor-pointer rounded-lg w-full h-full"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        />
      </div>
      <Button onClick={resetCanvas} className="absolute bottom-4 z-20">Reset</Button>
    </div>
  );
};


export default function KidsCornerPage() {
    const [guideText, setGuideText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGuide = async () => {
            setIsLoading(true);
            try {
                const result = await getKidsGuide({ figureName: 'Adi Shankaracharya' });
                setGuideText(result.guideText);
            } catch (error) {
                console.error("Failed to fetch AI guide:", error);
                setGuideText("Click and drag your mouse (or use your finger on touch screens) over the gray box to reveal the sacred image hidden beneath!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGuide();
    }, []);

  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Kids Corner
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          A fun and creative space for young devotees to explore spirituality.
        </p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <Paintbrush className="mx-auto h-10 w-10 text-accent" />
          <CardTitle className="font-headline text-2xl mt-4">Scratch to Reveal!</CardTitle>
           {isLoading ? (
            <div className="space-y-2 mt-2 px-4">
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          ) : (
            <p className="text-muted-foreground px-4">{guideText}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <ScratchImage
              imageUrl="https://source.unsplash.com/random/600x400/?hindu,acharya,philosopher"
              width={600}
              height={400}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
