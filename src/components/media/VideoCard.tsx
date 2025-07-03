'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Facebook, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarYouTubeItem, CalendarFacebookItem } from '@/lib/calendar-data';

// A dedicated component for the player to ensure it mounts cleanly.
const VideoPlayer = ({ video }: { video: CalendarYouTubeItem | CalendarFacebookItem }) => {
    const isYoutube = video.type === 'youtube';

    // Construct the correct embed URL for each platform.
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
        <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-lg">{video.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{format(new Date(video.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
            </CardHeader>
            <CardContent>
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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
                    {/* The onOpenAutoFocus prop prevents the dialog from stealing focus, which allows autoplay to work more reliably. */}
                    <DialogContent className="max-w-4xl p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>{video.title}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video bg-black">
                            {/* Crucially, we only render the Player component when the dialog is open. */}
                            {isDialogOpen && <VideoPlayer video={video} />}
                        </div>
                    </DialogContent>
                </Dialog>
                {video.description && <p className="mt-4 text-foreground/80">{video.description}</p>}
            </CardContent>
        </Card>
    );
}
