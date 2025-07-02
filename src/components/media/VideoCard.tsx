
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Facebook, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';
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
    
    const isYoutube = !!video.videoId;
    const embedUrl = isYoutube
        ? `https://www.youtube.com/embed/${video.videoId}?autoplay=1`
        : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url || '')}&show_text=false&width=560`;
    
    const Icon = isYoutube ? PlayCircle : Facebook;

    return (
        <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-lg">{video.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{format(new Date(video.date), 'MMMM d, yyyy')}</p>
            </CardHeader>
            <CardContent>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <div className="block relative aspect-video rounded-lg overflow-hidden group bg-secondary cursor-pointer">
                            <Image
                                src={video.thumbnailUrl}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="youtube thumbnail"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Icon className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{video.title}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video bg-black">
                            {/* By removing the `isOpen` check here, we let the Dialog component manage the iframe's lifecycle, which is more reliable. */}
                            <iframe
                                src={embedUrl}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
                {video.description && <p className="mt-4 text-foreground/80">{video.description}</p>}
            </CardContent>
        </Card>
    );
}
