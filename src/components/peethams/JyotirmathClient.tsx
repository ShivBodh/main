
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Camera, MapPin, Mail, Briefcase, Globe, Mountain, ArrowRight } from 'lucide-react';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { jyotirmathPhotoGallery } from '@/lib/jyotirmath-media';
import { useState, useMemo } from 'react';
import { VideoCard } from '@/components/media/VideoCard';
import { allCalendarItems, CalendarEventItem } from '@/lib/calendar-data';
import { format } from 'date-fns';

const jyotirmathSeva = allSevaOpportunities.filter(o => o.peetham === 'Jyotirmath');

export default function JyotirmathClient() {
    const [visibleYoutubeVideos, setVisibleYoutubeVideos] = useState(2);
    const [visibleFacebookVideos, setVisibleFacebookVideos] = useState(2);

    const loadMoreYoutubeVideos = () => {
        setVisibleYoutubeVideos(prev => prev + 2);
    };

    const loadMoreFacebookVideos = () => {
        setVisibleFacebookVideos(prev => prev + 2);
    };

    const jyotirmathMedia = useMemo(() => allCalendarItems.filter(item => item.peetham === 'Jyotirmath'), []);
    const jyotirmathYoutube = useMemo(() => jyotirmathMedia.filter(item => item.type === 'youtube'), [jyotirmathMedia]);
    const jyotirmathFacebook = useMemo(() => jyotirmathMedia.filter(item => item.type === 'facebook'), [jyotirmathMedia]);
    const jyotirmathEvents = useMemo(() => jyotirmathMedia.filter((item): item is CalendarEventItem => item.type === 'event').slice(0, 3), [jyotirmathMedia]);

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
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2">
                        <Calendar className="h-6 w-6" /> Recent & Upcoming Events
                    </CardTitle>
                    <CardDescription>
                        The latest happenings connected to the Jyotirmath Peetham.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {jyotirmathEvents.length > 0 ? (
                        <ul className="space-y-4">
                            {jyotirmathEvents.map(event => (
                                <li key={event.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-md border bg-muted/20">
                                    <div>
                                        <p className="font-semibold text-foreground/90">{event.title}</p>
                                        <p className="text-sm text-muted-foreground">{format(new Date(event.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
                                    </div>
                                    <p className="text-sm font-medium text-primary mt-2 sm:mt-0">{event.category}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-center p-4">
                            No specific events found. Check the main Bodha Calendar for all activities.
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/events">
                            View Full Bodha Calendar <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
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
                        {jyotirmathYoutube.slice(0, visibleYoutubeVideos).map(video => (
                           <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                    {visibleYoutubeVideos < jyotirmathYoutube.length && (
                        <div className="text-center mt-8">
                            <Button onClick={loadMoreYoutubeVideos}>Load More Videos</Button>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="facebook" className="mt-8">
                    <div className="space-y-6">
                        {jyotirmathFacebook.slice(0, visibleFacebookVideos).map(video => (
                           <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                    {visibleFacebookVideos < jyotirmathFacebook.length && (
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
