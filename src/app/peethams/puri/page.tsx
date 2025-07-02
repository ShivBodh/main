
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Camera, MapPin, Mail, Briefcase, Globe, Flag } from 'lucide-react';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { puriVideoArchive, puriPhotoGallery } from '@/lib/puri-media';
import { puriFacebookVideos } from '@/lib/puri-facebook-videos';
import { useState, useMemo } from 'react';
import type { Metadata } from 'next';
import { VideoCard } from '@/components/media/VideoCard';

export const metadata: Metadata = {
  title: 'Govardhana Peetham, Puri | Sanatana Peethams Portal',
  description: 'Explore the Govardhana Peetham in Puri, the eastern seat of Advaita Vedanta. Learn about its deep connection with Lord Jagannath, its teachings, media, and more.',
};

const puriSeva = allSevaOpportunities.filter(o => o.peetham === 'Puri');

export default function PuriPeethamPage() {
    const [visibleYoutubeVideos, setVisibleYoutubeVideos] = useState(2);
    const [visibleFacebookVideos, setVisibleFacebookVideos] = useState(2);

    const loadMoreYoutubeVideos = () => {
        setVisibleYoutubeVideos(prev => prev + 2);
    };

    const loadMoreFacebookVideos = () => {
        setVisibleFacebookVideos(prev => prev + 2);
    };

    const sortedYoutubeVideos = useMemo(() => [...puriVideoArchive].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);
    const sortedFacebookVideos = useMemo(() => [...puriFacebookVideos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3 flex items-center justify-center">
            <Flag className="w-48 h-48 text-primary/30" />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
              Govardhana Peetham, Puri
            </h1>
            <p className="text-lg text-foreground/80 mb-2">
              The Eastern Āmnāya Pīṭham, the custodian of the Rig Veda.
            </p>
            <div className="text-md text-foreground/90 mb-4">
              <p><span className="font-semibold">Current Acharya:</span> Jagadguru Shankaracharya Swami Sri Nischalananda Saraswatiji Maharaj</p>
              <p><span className="font-semibold">Associated Veda:</span> Rig Veda</p>
              <p><span className="font-semibold">Mahāvākya:</span> Prajñānam Brahma</p>
            </div>
            <Button asChild variant="outline">
              <Link href="https://govardhanpeeth.org/en/" target="_blank">
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
              The Govardhana Peetham, located in the sacred coastal city of Puri, Odisha, is the eastern cardinal peetham established by Sri Adi Shankaracharya. It is intrinsically linked with the famous Jagannath Temple and is the traditional custodian of the Rig Veda. The primary deity is Lord Jagannath (a form of Vishnu/Krishna) and Vimala Devi.
            </p>
            <p>
              This Peetham plays a crucial role in the spiritual and cultural life of Eastern India. The Shankaracharyas of Puri have historically been consulted on all religious matters pertaining to the Jagannath tradition. The matha stands as a powerful center for the propagation of Advaita Vedanta and the rich spiritual heritage of the region.
            </p>
            <h3 className="font-headline text-primary/90">Main Ashram Details</h3>
            <p>
              Govardhan Math,
              <br />
              Puri,
              <br />
              Odisha - 752001, India.
            </p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>
                      The philosophical foundation of the Govardhana Peetham is "Prajñānam Brahma" (Consciousness is Brahman). The teachings emphasize that the ultimate reality is pure, undifferentiated consciousness. The path involves rigorous scriptural study, contemplation, and meditation to realize this truth. The Peetham also integrates the deep devotional traditions of Lord Jagannath within the framework of Advaita.
                    </p>
                </CardContent>
             </Card>
             <h3 className="font-headline text-2xl text-primary mt-8 mb-4">Wisdom from the Lineage</h3>
             <div className="space-y-4">
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "Pure consciousness is the substratum of the entire universe. Realizing this is the ultimate goal of human life." - Swami Sri Nischalananda Saraswatiji Maharaj
                </blockquote>
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "Dharma is not a set of rules, but the very law that sustains existence. To live in harmony with Dharma is to live in harmony with the cosmos." - A Teaching from the Puri Lineage
                </blockquote>
             </div>
          </TabsContent>

          <TabsContent value="events">
             <p className="text-center text-muted-foreground mb-8">A filtered view of upcoming and recent events related to the Puri Peetham. (This is placeholder data)</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="transition-shadow hover:shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Ratha Yatra</CardTitle>
                        <p className="text-sm text-muted-foreground">July 7, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>The world-famous chariot festival of Lord Jagannath, where the Shankaracharya of Puri holds a traditional, prominent role.</p>
                    </CardContent>
                </Card>
                <Card className="transition-shadow hover:shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Vedanta Sammelan</CardTitle>
                        <p className="text-sm text-muted-foreground">December 20-22, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>An annual conference of scholars and saints to discuss the intricacies of Vedanta philosophy and its relevance today.</p>
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
                        {puriPhotoGallery.map(photo => (
                            <Image key={photo.id} src={photo.src} alt={photo.alt} width={400} height={300} className="rounded-lg object-cover aspect-[4/3]" data-ai-hint={photo.aiHint}/>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="youtube" className="mt-8">
                    <div className="space-y-6">
                        {sortedYoutubeVideos.slice(0, visibleYoutubeVideos).map(video => (
                            <VideoCard key={video.id} video={video} />
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
                            <VideoCard key={video.id} video={video} />
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
            <h3 className="font-headline text-2xl text-primary mb-6">Seva Opportunities at Puri</h3>
            {puriSeva.length > 0 ? (
                <div className="space-y-4">
                    {puriSeva.map(opp => (
                        <Card key={opp.id} className="transition-all duration-300 hover:shadow-lg">
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
                <p className="text-muted-foreground">There are currently no specific Seva opportunities listed for Puri. Please check the main <Link href="/seva" className="text-accent underline">Seva Hub</Link> for remote opportunities or contact the Peetham directly.</p>
            )}

            <Separator className="my-12" />

            <h3 className="font-headline text-2xl text-primary mb-6">Main Ashram & Center</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Govardhan Math</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 shrink-0"/><span>Govardhan Math, Puri, Odisha - 752001, India.</span></p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/><a href="mailto:info.puri@example.com" className="text-accent hover:underline">info.puri@example.com</a></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                     <Image src="https://placehold.co/1200x600.png" alt="Map of Puri Peetham" width={1200} height={600} className="rounded-lg object-cover w-full h-full aspect-video" data-ai-hint="map location" />
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
