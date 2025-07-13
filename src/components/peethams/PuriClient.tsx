
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Landmark, Calendar, Camera, Video, ArrowRight, MapPin, Globe } from 'lucide-react';
import { peethams } from '@/lib/peethams-data';
import { LineageTimeline } from '@/components/peethams/LineageTimeline';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { UnifiedCalendarItem, CalendarEventItem, CalendarPhotoItem, CalendarVideoItem } from '@/lib/calendar-data';
import { format, parseISO } from 'date-fns';
import { PhotoCard } from '@/components/media/PhotoCard';
import { VideoCard } from '@/components/media/VideoCard';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const puriSeva = allSevaOpportunities.filter(o => o.peetham === 'Puri');
const peethamInfo = peethams.find(p => p.name.includes('Puri'))!;

const MediaGridSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-80 w-full" />)}
    </div>
);

const EmptyMediaState = ({ peethamName }: { peethamName: string }) => (
    <Card className="flex flex-col items-center justify-center min-h-[24rem] border-dashed text-center p-6">
        <CardTitle className="text-2xl font-headline">This Gallery is Empty</CardTitle>
        <CardContent className="p-0 mt-4 max-w-lg mx-auto">
            <p className="text-muted-foreground">
                Media for {peethamName} is managed in the Firestore database. When content is available, it will appear here.
            </p>
        </CardContent>
    </Card>
);

const literaryWorks = [
    { category: 'Philosophy & Vedanta', works: 'Veda Vimarsha, Srimad Bhagavad Gita Saptashati, Dharma Darshan, Bauddh Siddhant aur Vedant' },
    { category: 'Mathematics', works: 'Elementary Vedic Arithmetic, Swastik Mathematics' },
    { category: 'Social & National Issues', works: 'Vyuharachana (Strategy to Foil Conspiracy Against Hinduism), Desh ki Dasha aur Apekshit Disha (Country\'s Condition and Expected Direction)' },
    { category: 'Biographical', works: 'Divyanubhuti (Biography of Swami Nischalanand Saraswati), Sri Shivavatar Bhagavatpada Shankaracharya' },
];

export default function PuriClient() {
    const [media, setMedia] = useState<UnifiedCalendarItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        if (!db) {
            setError("Firebase is not configured.");
            setIsLoading(false);
            return;
        }

        try {
            const mediaCollection = collection(db, 'media');
            const q = query(mediaCollection, where("peetham", "==", "Puri"), orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UnifiedCalendarItem));
            setMedia(items);
        } catch (err) {
            console.error("Error fetching Puri media from Firestore:", err);
            setError("Could not fetch media from Firestore. Please check connection and security rules.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const puriPhotos = useMemo(() => media.filter((item): item is CalendarPhotoItem => item.type === 'photo'), [media]);
    const puriVideos = useMemo(() => media.filter((item): item is CalendarVideoItem => item.type === 'video'), [media]);
    const puriEvents = useMemo(() => media.filter((item): item is CalendarEventItem => item.type === 'event'), [media]);
    
    const renderMediaTabContent = (items: UnifiedCalendarItem[], type: 'photo' | 'video' | 'event') => {
        if (isLoading) return <MediaGridSkeleton />;
        if (error) return <p className="text-center text-destructive py-8">{error}</p>;
        if (items.length === 0) return <EmptyMediaState peethamName="Puri" />;
        
        if (type === 'photo') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => <PhotoCard key={item.id} item={item as CalendarPhotoItem} />)}
                </div>
            );
        }
        if (type === 'video') {
             return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => <VideoCard key={item.id} item={item as CalendarVideoItem} />)}
                </div>
            );
        }
        if (type === 'event') {
             return (
                 <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-primary flex items-center gap-2">
                          <Calendar className="h-6 w-6" /> Upcoming Events
                      </CardTitle>
                      <CardDescription>
                          Key upcoming events for the Govardhana Peetham.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-4">
                            {items.map(event => (
                                <li key={event.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-md border bg-muted/20">
                                    <div>
                                        <p className="font-semibold text-foreground/90">{event.title}</p>
                                        <p className="text-sm text-muted-foreground">{format(new Date(event.date.replace(/-/g, '/')), 'MMMM d, yyyy')}</p>
                                    </div>
                                    <p className="text-sm font-medium text-primary mt-2 sm:mt-0">{(event as CalendarEventItem).category}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                          <Link href="/events">
                              View Full Bodha Calendar <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                    </CardFooter>
                 </Card>
            );
        }
        return null;
    }

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-[3/4] w-full">
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHU2a2w2Z3RtamhxcjQ2ZDE0djMybDVxZ3h5d3J0aXh4aWViOTZqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7SYIm3aJeA_i6Y/giphy.gif"
                  alt="Abstract light GIF"
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
              {peethamInfo.name}
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
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <TabsList className="mb-8 inline-flex w-max">
                <TabsTrigger value="about">About the Acharya</TabsTrigger>
                <TabsTrigger value="teachings">Teachings & Works</TabsTrigger>
                <TabsTrigger value="lineage">Lineage</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="gallery">Photos</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="seva">Seva</TabsTrigger>
              </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          <TabsContent value="about" className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
            <h2 className="font-headline text-primary">The 145th Pontiff: Jagadguru Shankaracharya Swami Nischalananda Saraswati</h2>
            <p>Swami Nischalananda Saraswati is the 145th Shankaracharya in the lineage of the Govardhana Peetham, having ascended the seat on February 9, 1992. His pre-monastic (purvāśrama) name was Nilambar Jha. He was born on June 30, 1943, in Haripur Bakshi Tol, a village in the Madhubani district of Bihar, into a distinguished Maithil Brahmin family. His father, Pandit Lalvamshi Jha, was a highly respected Sanskrit scholar who held the prestigious position of Rāja-Paṇḍita (royal court scholar) in the Darbhanga Kingdom.</p>
            <p>Displaying a studious nature from childhood, he left home at the age of 17 to embark on a spiritual quest. He undertook rigorous study of the Vedas and various Shastras in holy cities across India. He became a devoted disciple of the renowned sage Dharma Samrat Swami Karpatriji Maharaj. As a young man, he was deeply involved in social causes, most notably the cow protection movement, for which he was imprisoned in Delhi's Tihar Jail for 52 days in 1966.</p>
            <p>On April 18, 1974, he was initiated into the order of sannyāsa in Haridwar by Swami Karpatriji himself, who gave him the monastic name Nischalananda Saraswati. His profound scholarship and unwavering dedication impressed the then Shankaracharya of Puri, Swami Niranjanadev Tirtha, who anointed him as his successor.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Philosophical Teachings and Literary Contributions</CardTitle>
                    <CardDescription>Rooted in the Mahāvākya "Prajñānam Brahma" (Consciousness is Brahman).</CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>As the Shankaracharya of Puri, Swami Nischalananda Saraswati travels extensively. His teachings often address contemporary national issues such as the unity of India, cow protection, women's empowerment, and environmental concerns, all viewed through the lens of Sanatana Dharma. To further these objectives, he has established two organizations, Aditya Vahini and Ananda Vahini.</p>
                    <p>He is a prolific author, credited with writing over 130 books on diverse subjects. He is also an authority on Vedic Mathematics and has authored several acclaimed books on the subject, including Swastik Mathematics.</p>
                     <div className="not-prose my-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Selected Works</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {literaryWorks.map((item) => (
                                    <TableRow key={item.category}>
                                        <TableCell className="font-medium">{item.category}</TableCell>
                                        <TableCell>{item.works}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <h4 className="font-headline">Public Stance and Controversies</h4>
                    <p>Swami Nischalananda Saraswati is known for his assertive and often controversial public statements, rooted in the traditionalist and orthodox positions of his guru, Swami Karpatriji. He has been a vocal critic on matters of temple rituals and other national issues, reflecting a consistent philosophical lineage.</p>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="lineage">
             <h3 className="font-headline text-2xl text-primary mb-6 flex items-center gap-2"><Landmark className="h-6 w-6" /> Guru Parampara</h3>
             {peethamInfo.lineage && <LineageTimeline lineage={peethamInfo.lineage} />}
          </TabsContent>
          
          <TabsContent value="events">
            {renderMediaTabContent(puriEvents, 'event')}
          </TabsContent>
          
          <TabsContent value="gallery">
            <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
            {renderMediaTabContent(puriPhotos, 'photo')}
          </TabsContent>

            <TabsContent value="videos">
             <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Gallery</h3>
             {renderMediaTabContent(puriVideos, 'video')}
             <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/events">View Full Bodha Calendar</Link>
                </Button>
             </div>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
