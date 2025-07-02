'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Facebook, PlayCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { generateThumbnail } from '@/ai/flows/thumbnail-generator-flow';
import { Skeleton } from '@/components/ui/skeleton';

// Define a unified type for video data from different sources
export type VideoCardData = {
    id: string;
    title: string;
    date: string | Date;
    description?: string;
    thumbnailUrl: string;
    // One of these should be present
    videoId?: string; // for YouTube
    url?: string; // for Facebook
};

export function VideoCard({ video }: { video: VideoCardData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [aiThumbnail, setAiThumbnail] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    
    const isYoutube = !!video.videoId;
    const embedUrl = isYoutube
        ? `https://www.youtube.com/embed/${video.videoId}`
        : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url || '')}&show_text=0`;
    
    const Icon = isYoutube ? PlayCircle : Facebook;

    useEffect(() => {
        const generateAiThumbnail = async () => {
            if (video.thumbnailUrl.includes('placehold.co')) {
                setIsGenerating(true);
                try {
                    const result = await generateThumbnail({ title: video.title, description: video.description || '' });
                    setAiThumbnail(result.imageDataUri);
                } catch (error) {
                    console.error('AI thumbnail generation failed:', error);
                    // Keep the placeholder if generation fails
                    setAiThumbnail(null);
                } finally {
                    setIsGenerating(false);
                }
            }
        };

        generateAiThumbnail();
    }, [video.thumbnailUrl, video.title, video.description]);

    const finalThumbnailUrl = aiThumbnail || video.thumbnailUrl;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">{video.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{format(new Date(video.date), 'MMMM d, yyyy')}</p>
            </CardHeader>
            <CardContent>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <div className="block relative aspect-video rounded-lg overflow-hidden group bg-secondary cursor-pointer">
                            {isGenerating ? (
                                <Skeleton className="w-full h-full" />
                            ) : (
                                <Image
                                    src={finalThumbnailUrl}
                                    alt={video.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint="youtube thumbnail"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                {isGenerating ? (
                                    <Loader2 className="h-12 w-12 text-white/80 animate-spin" />
                                ) : (
                                    <Icon className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                                )}
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{video.title}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video bg-black">
                            {isOpen && (
                                <iframe
                                    src={embedUrl}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
                {video.description && <p className="mt-4 text-foreground/80">{video.description}</p>}
            </CardContent>
        </Card>
    );
}
