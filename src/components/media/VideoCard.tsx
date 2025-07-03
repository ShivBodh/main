
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Facebook, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarYouTubeItem, CalendarFacebookItem } from '@/lib/calendar-data';

const VideoPlayer = ({ video }: { video: CalendarYouTubeItem | CalendarFacebookItem }) => {
    const isYoutube = video.type === 'youtube';
    const embedUrl = isYoutube
        ? `https://www.youtube.com/embed/${(video as CalendarYouTubeItem).videoId}?autoplay=1&rel=0`
        : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent((video as CalendarFacebookItem).url)}&show_text=0&width=auto&autoplay=1&appId`;

    return (
        <iframe
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
        ></iframe>
    );
};

export function VideoCard({ video }: { video: CalendarYouTubeItem | CalendarFacebookItem }) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    
    const Icon = video.type === 'youtube' ? PlayCircle : Facebook;

    return (
        <>
            <Card className="transition-shadow hover:shadow-lg flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">{video.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{format(new Date(video.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                    <div 
                        className="block relative aspect-video rounded-lg overflow-hidden group bg-secondary cursor-pointer"
                        onClick={() => setDialogOpen(true)}
                    >
                        <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="youtube thumbnail"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Icon className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                    </div>
                    {video.description && <p className="mt-4 text-foreground/80 text-sm">{video.description}</p>}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-4xl p-0 border-0 bg-transparent shadow-none" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogTitle className="sr-only">{video.title}</DialogTitle>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        {isDialogOpen && <VideoPlayer video={video} />}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
