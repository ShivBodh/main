
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Camera, MapPin, Mail, Briefcase, Globe, Facebook, PlayCircle, ScrollText, Mountain } from 'lucide-react';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { jyotirmathVideoArchive, jyotirmathPhotoGallery } from '@/lib/jyotirmath-media';
import { jyotirmathFacebookVideos, type FacebookVideo } from '@/lib/jyotirmath-facebook-videos';
import { format } from 'date-fns';
import { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { VideoArchiveItem } from '@/lib/sringeri-media';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jyotirmath Peetham, Badrinath | Sanatana Peethams Portal',
  description: 'Explore the Jyotirmath Peetham, the northern Himalayan seat of Advaita Vedanta. Discover its history, teachings, and the serene spiritual environment of Badrinath.',
};

const jyotirmathSeva = allSevaOpportunities.filter(o => o.peetham === 'Jyotirmath');

const VideoCard = ({ video, type }: { video: VideoArchiveItem | FacebookVideo, type: 'youtube' | 'facebook' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const embedUrl = type === 'youtube'
        ? `https://www.youtube.com/embed/${(video as VideoArchiveItem).videoId}`
        : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=0`;
    
    const Icon = type === 'youtube' ? PlayCircle : Facebook;

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
                            <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="youtube thumbnail"/>
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
                <p className="mt-4 text-foreground/80">{video.description}</p>
            </CardContent>
        </Card>
    );
};

export default function JyotirmathPeethamPage() {
    const [visibleYoutubeVideos, setVisibleYoutubeVideos] = useState(2);
    const [visibleFacebookVideos, setVisibleFacebookVideos] = useState(2);

    const loadMoreYoutubeVideos = () => {
        setVisibleYoutubeVideos(prev => prev + 2);
    };

    const loadMoreFacebookVideos = () => {
        setVisibleFacebookVideos(prev => prev + 2);
    };

    const sortedYoutubeVideos = useMemo(() => [...jyotirmathVideoArchive].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);
    const sortedFacebookVideos = useMemo(() => [...jyotirmathFacebookVideos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3 flex items-center justify-center">
             <Mountain className="w-48 h-48 text-primary/30" />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
              Jyotirmath Peetham, Badrinath
            </h1>
            <p className="text-lg text-foreground/80 mb-2">
              The Northern Āmnāya Pīṭham, nestled in the Himalayas.
            </p>
            <div className="text-md text-foreground/90 mb-4">
              <p><span className="font-semibold">Current Acharya:</span> Jagadguru Shankaracharya Swami Sri Avimukteshwaranand Saraswati ji Maharaj</p>
              <p><span className="font-semibold">Associated Veda:</span> Atharva Veda</p>
              <p><span className="font-semibold">Mahāvākya:</span> Ayam Ātmā Brahma</p>
            </div>
            <Button asChild variant="outline">
              <Link href="https://shreejyotirmathah.org/" target="_blank">
                Official Website <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="teachings">Teachings</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
            <TabsTrigger value="seva">Community & Seva</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
            <h2 className="font-headline text-primary">History and Significance</h2>
            <p>
              Jyotirmath, also known as the 'Uttaramnaya Matha', is the northern cardinal peetham established by Sri Adi Shankaracharya in the pristine Himalayas, near the sacred shrine of Badrinath in Uttarakhand. This Peetham holds the responsibility for the Atharva Veda. The location itself, deep in the mountains revered as the abode of sages, gives Jyotirmath a unique spiritual aura.
            </p>
            <p>
              After a period of dormancy, the seat was revived in the 20th century, and it continues to be a vital center for Vedic learning and spiritual practice for seekers and ascetics who brave the harsh climate for profound sadhana. The Peetham's motto is "Ayam Ātmā Brahma," emphasizing the truth that the individual Self is indeed Brahman.
            </p>
            <h3 className="font-headline text-primary/90">Main Ashram Details</h3>
            <p>
              Jyotirmath,
              <br />
              Chamoli District,
              <br />
              Uttarakhand - 246443, India.
            </p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>
                      The philosophical essence of Jyotirmath is encapsulated in the Mahāvākya "Ayam Ātmā Brahma" (This Self is Brahman). The teachings here guide the seeker to look inward and recognize the divine nature of their own consciousness. Given its Himalayan location, the teachings often emphasize vairagya (dispassion), dhyana (meditation), and tapas (austerity) as key practices for realizing this ultimate truth.
                    </p>
                </CardContent>
             </Card>
             <h3 className="font-headline text-2xl text-primary mt-8 mb-4">Wisdom from the Lineage</h3>
             <div className="space-y-4">
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "The silence of the Himalayas is not empty; it is full of the voice of the Self. Listen to it." - A Teaching from the Jyotirmath Lineage
                </blockquote>
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "True renunciation is not of the world, but of the ego that claims ownership of it." - A Teaching from the Jyotirmath Lineage
                </blockquote>
             </div>
          </TabsContent>

          <TabsContent value="events">
             <p className="text-center text-muted-foreground mb-8">A filtered view of upcoming and recent events related to the Jyotirmath Peetham. (This is placeholder data)</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Badrinath Temple Opening</CardTitle>
                        <p className="text-sm text-muted-foreground">April-May (Annual)</p>
                    </CardHeader>
                    <CardContent>
                        <p>The Shankaracharya of Jyotirmath plays a key role in the ceremonial opening of the Badrinath shrine after the winter season.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Special Meditational Retreats</CardTitle>
                        <p className="text-sm text-muted-foreground">Summer Months</p>
                    </CardHeader>
                    <CardContent>
                        <p>Guided retreats for advanced seekers, focusing on intensive meditation and study of the Upanishads.</p>
                    </CardContent>
                </Card>
             </div>
          </TabsContent>
          
          <TabsContent value="gallery">
             <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="youtube">YouTube</TabsTrigger>
                    <TabsTrigger value="facebook">Facebook</TabsTrigger>
                </TabsList>
                <TabsContent value="photos" className="mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {jyotirmathPhotoGallery.map(photo => (
                            <Image key={photo.id} src={photo.src} alt={photo.alt} width={400} height={300} className="rounded-lg object-cover aspect-[4/3]" data-ai-hint={photo.aiHint}/>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="youtube" className="mt-8">
                    <div className="space-y-6">
                        {sortedYoutubeVideos.slice(0, visibleYoutubeVideos).map(video => (
                           <VideoCard key={video.id} video={video} type="youtube" />
                        ))}
                    </div>
                    {visibleYoutubeVideos < sortedYoutubeVideos.length && (
                        <div className="text-center mt-8">
                            <Button onClick={loadMoreYoutubeVideos}>Load More Videos</Button>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="facebook" className="mt-8">
                    <div className="space-y-6">
                        {sortedFacebookVideos.slice(0, visibleFacebookVideos).map(video => (
                           <VideoCard key={video.id} video={video} type="facebook" />
                        ))}
                    </div>
                    {visibleFacebookVideos < sortedFacebookVideos.length && (
                        <div className="text-center mt-8">
                            <Button onClick={loadMoreFacebookVideos}>Load More Videos</Button>
                        </div>
                    )}
                </TabsContent>
             </Tabs>
          </TabsContent>
           <TabsContent value="seva">
            <h3 className="font-headline text-2xl text-primary mb-6">Seva Opportunities at Jyotirmath</h3>
            {jyotirmathSeva.length > 0 ? (
                <div className="space-y-4">
                    {jyotirmathSeva.map(opp => (
                        <Card key={opp.id}>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">{opp.title}</CardTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                                    <span className="flex items-center gap-1.5">{opp.locationType === 'On-site' ? <MapPin className="h-4 w-4" /> : <Globe className="h-4 w-4" />} {opp.cityRegion}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80 mb-4">{opp.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {opp.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                </div>
                                <Button asChild size="sm">
                                    <a href={opp.applicationLink === '#' ? `mailto:${opp.contactEmail}` : opp.applicationLink} target="_blank" rel="noopener noreferrer">I'm Interested</a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">There are currently no specific Seva opportunities listed for Jyotirmath. Please check the main <Link href="/seva" className="text-accent underline">Seva Hub</Link> for remote opportunities or contact the Peetham directly.</p>
            )}

            <Separator className="my-12" />

            <h3 className="font-headline text-2xl text-primary mb-6">Main Ashram & Center</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Jyotirmath</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 shrink-0"/><span>Jyotirmath, Chamoli District, Uttarakhand - 246443, India.</span></p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/><a href="mailto:info.jyotirmath@example.com" className="text-accent hover:underline">info.jyotirmath@example.com</a></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                     <Image src="https://placehold.co/1200x600.png" alt="Map of Jyotirmath Peetham" width={1200} height={600} className="rounded-lg object-cover w-full h-full aspect-video" data-ai-hint="map location"/>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
