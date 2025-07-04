
'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getKidsGuide } from '@/ai/flows/kids-guide-flow';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const scratchableImages = [
    { id: 1, name: 'Adi Shankaracharya', imageUrl: 'https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru.png', aiHint: 'acharya portrait' },
    { id: 2, name: 'A Wise Sage', imageUrl: 'https://images.unsplash.com/photo-1547787344-9d1a3c64f434?w=600&h=400&fit=crop', aiHint: 'wise sage' },
    { id: 3, name: 'Goddess Sharada', imageUrl: 'https://images.unsplash.com/photo-1599422037748-0051b8581048?w=600&h=400&fit=crop', aiHint: 'goddess statue' },
];

const ScratchImage = ({ imageUrl, width, height, brushSize, aiHint }: { imageUrl: string; width: number; height: number; brushSize: number; aiHint: string; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = '#d1d5db'; 
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'destination-out';

  }, [width, height]);

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if ('buttons' in e && e.buttons !== 1) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      e.preventDefault();
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    context.beginPath();
    context.arc(x, y, brushSize * scaleX, 0, 2 * Math.PI); 
    context.fill();
  }

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
      <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt="Hidden spiritual image"
          data-ai-hint={aiHint}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="absolute top-0 left-0 z-10 cursor-pointer w-full h-full"
          onMouseMove={draw}
          onTouchMove={draw}
        />
      </div>
      <Button onClick={resetCanvas} className="absolute bottom-4 z-20">Reset</Button>
    </div>
  );
};


export default function KidsCornerClient() {
    const [selectedImage, setSelectedImage] = useState(scratchableImages[0]);
    const [brushSize, setBrushSize] = useState(25);
    const [guideText, setGuideText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGuide = async () => {
            setIsLoading(true);
            try {
                const result = await getKidsGuide({ figureName: selectedImage.name });
                setGuideText(result.guideText);
            } catch (error) {
                console.error("Failed to fetch AI guide:", error);
                setGuideText("Click and drag your mouse (or use your finger on touch screens) over the gray box to reveal the sacred image hidden beneath!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGuide();
    }, [selectedImage]);

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
              key={selectedImage.id}
              imageUrl={selectedImage.imageUrl}
              width={600}
              height={400}
              brushSize={brushSize}
              aiHint={selectedImage.aiHint}
            />
          </div>
        </CardContent>
      </Card>
      
       <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Choose an Image</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {scratchableImages.map(image => (
                    <button key={image.id} onClick={() => setSelectedImage(image)} className={`rounded-lg overflow-hidden border-4 ${selectedImage.id === image.id ? 'border-primary' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-ring`}>
                         <Image src={image.imageUrl} alt={image.name} width={200} height={150} className="w-full h-20 object-cover" data-ai-hint={image.aiHint} />
                        <p className="p-2 text-xs font-medium bg-muted/50 truncate">{image.name}</p>
                    </button>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <div>
                    <Label htmlFor="brush-size" className="text-base">Brush Size: {brushSize}px</Label>
                    <Slider
                        id="brush-size"
                        min={5}
                        max={50}
                        step={1}
                        value={[brushSize]}
                        onValueChange={(value) => setBrushSize(value[0])}
                        className="mt-2"
                    />
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
