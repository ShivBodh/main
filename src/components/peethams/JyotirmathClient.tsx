
'use client';

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
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const jyotirmathSeva = allSevaOpportunities.filter(o => o.peetham === 'Jyotirmath');
const peethamInfo = peethams.find(p => p.name.includes('Jyotirmath'))!;

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

export default function JyotirmathClient() {
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
            const q = query(mediaCollection, where("peetham", "==", "Jyotirmath"), orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UnifiedCalendarItem));
            setMedia(items);
        } catch (err) {
            console.error("Error fetching Jyotirmath media from Firestore:", err);
            setError("Could not fetch media from Firestore. Please check connection and security rules.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const jyotirmathPhotos = useMemo(() => media.filter((item): item is CalendarPhotoItem => item.type === 'photo'), [media]);
    const jyotirmathVideos = useMemo(() => media.filter((item): item is CalendarVideoItem => item.type === 'video'), [media]);
    const jyotirmathEvents = useMemo(() => media.filter((item): item is CalendarEventItem => item.type === 'event'), [media]);
    
    const renderMediaTabContent = (items: UnifiedCalendarItem[], type: 'photo' | 'video' | 'event') => {
        if (isLoading) return <MediaGridSkeleton />;
        if (error) return <p className="text-center text-destructive py-8">{error}</p>;
        if (items.length === 0) return <EmptyMediaState peethamName="Jyotirmath" />;
        
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
                    <CardContent className="pt-6">
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
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <TabsList className="mb-8 inline-flex w-max">
                <TabsTrigger value="about">About the Acharya</TabsTrigger>
                <TabsTrigger value="teachings">Teachings &amp; Stances</TabsTrigger>
                <TabsTrigger value="lineage">Lineage &amp; Succession</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="gallery">Photos</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="seva">Seva</TabsTrigger>
              </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          <TabsContent value="about" className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
            <h2 className="font-headline text-primary">The 46th Pontiff: Jagadguru Shankaracharya Swami Avimukteshwarananda Saraswati</h2>
            <p>Swami Avimukteshwarananda Saraswati was born as Umashankar Upadhyay on August 15, 1969, in Brahmanpur village, Uttar Pradesh. His spiritual inclinations were shaped by the teachings of Swami Karpatriji Maharaj. He pursued higher education in Sanskrit studies at the Sampurnanand Sanskrit University in Varanasi, earning both Shastri and Acharya degrees. During his time at the university, he was actively involved in student politics and was elected president of the student union in 1994.</p>
            <p>He received his formal monastic initiation (dīkṣā) from Swami Swaroopanand Saraswati in 2006. Following his initiation, he became a key aide and was entrusted with supervising the religious and administrative activities of the Jyotir Math.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Teachings on Dharma, Seva, and National Issues</CardTitle>
                    <CardDescription>Rooted in the Mahāvākya "Ayam Ātmā Brahma" (This Self is Brahman).</CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>Swami Avimukteshwarananda's teachings emphasize that Dharma is not merely personal piety but encompasses one's duties to society, God, and all of creation. He advocates for a life of service (sevā), humility, and compassion, and has been a proponent of environmental causes, particularly the cleanup of the river Ganga.</p>
                    <p>He is an outspoken figure who frequently comments on national, political, and social issues:</p>
                    <ul>
                        <li>He is a staunch advocate for cow protection, demanding that the cow be declared Rāṣṭra Mātā (National Mother).</li>
                        <li>He has recently supported the call for a review of the words "secular" and "socialist" in the Preamble to the Indian Constitution.</li>
                        <li>He has been at the center of several public controversies, including his decision to decline the invitation to the Ram Mandir consecration ceremony and his criticism of a replica Kedarnath temple being built in Delhi.</li>
                    </ul>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="lineage">
            <h3 className="font-headline text-2xl text-primary mb-6 flex items-center gap-2"><Landmark className="h-6 w-6" /> The Contested Succession</h3>
            <div className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
                <p>The appointment of Swami Avimukteshwarananda as the Shankaracharya of Jyotir Peetham is mired in a complex crisis stemming from a confluence of historical, institutional, and legal factors.</p>
                <ul>
                    <li><strong>Historical Precedent:</strong> The Jyotir Peetham itself was dormant for a period of 165 years before its revival in 1941. This long vacancy broke the traditional chain of direct Guru-Shishya succession.</li>
                    <li><strong>Dual Headship Anomaly:</strong> His predecessor, Swami Swaroopanand Saraswati, held the unique position of being the Shankaracharya of two cardinal Peethams—Dwaraka and Jyotir Math—simultaneously. His will designated two separate successors, creating a complex dual succession that deviates from the traditional single-lineage model.</li>
                    <li><strong>Legal and Peer Intervention:</strong> In October 2022, the Supreme Court of India issued a stay on the coronation of Swami Avimukteshwarananda. This was prompted by an affidavit filed by the Shankaracharya of Puri. The succession is further complicated by claims from other disciples, transforming an internal religious matter into a public legal battle.</li>
                </ul>
            </div>
             <h3 className="font-headline text-2xl text-primary mt-8 mb-6 flex items-center gap-2"><Landmark className="h-6 w-6" /> Guru Parampara</h3>
             {peethamInfo.lineage && <LineageTimeline lineage={peethamInfo.lineage} />}
          </TabsContent>
          
           <TabsContent value="events">
                <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Calendar className="h-6 w-6" /> Events</h3>
                {renderMediaTabContent(jyotirmathEvents, 'event')}
                <div className="text-center mt-8">
                    <Button asChild>
                        <Link href="/events">View Full Bodha Calendar</Link>
                    </Button>
                </div>
          </TabsContent>
          
          <TabsContent value="gallery">
            <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
            {renderMediaTabContent(jyotirmathPhotos, 'photo')}
          </TabsContent>

           <TabsContent value="videos">
             <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Gallery</h3>
             {renderMediaTabContent(jyotirmathVideos, 'video')}
             <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/events">View Full Bodha Calendar</Link>
                </Button>
             </div>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
