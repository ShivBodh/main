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
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const sringeriSeva = allSevaOpportunities.filter(o => o.peetham === 'Sringeri');
const peethamInfo = peethams.find(p => p.name.includes('Sringeri'))!;

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

export default function SringeriClient() {
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
            const q = query(mediaCollection, where("peetham", "==", "Sringeri"), orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UnifiedCalendarItem));
            setMedia(items);
        } catch (err) {
            console.error("Error fetching Sringeri media from Firestore:", err);
            setError("Could not fetch media from Firestore. Please check connection and security rules.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const sringeriPhotos = useMemo(() => media.filter((item): item is CalendarPhotoItem => item.type === 'photo'), [media]);
    const sringeriVideos = useMemo(() => media.filter((item): item is CalendarVideoItem => item.type === 'video'), [media]);
    const sringeriEvents = useMemo(() => media.filter((item): item is CalendarEventItem => item.type === 'event'), [media]);

    const renderMediaTabContent = (items: UnifiedCalendarItem[], type: 'photo' | 'video' | 'event') => {
        if (isLoading) return <MediaGridSkeleton />;
        if (error) return <p className="text-center text-destructive py-8">{error}</p>;
        if (items.length === 0) return <EmptyMediaState peethamName="Sringeri" />;
        
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
                            <Calendar className="h-6 w-6" /> Recent & Upcoming Events
                        </CardTitle>
                        <CardDescription>
                            Key events for the Sringeri Acharyas.
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
                <Image
                  src={peethamInfo.acharyaImage}
                  data-ai-hint={peethamInfo.acharyaAiHint}
                  alt={`Jagadguru Shankaracharya of ${peethamInfo.name}`}
                  fill
                  className="rounded-lg shadow-lg object-cover"
                />
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
              {peethamInfo.name}
            </h1>
            <p className="text-lg text-foreground/80 mb-2">
              The Southern Āmnāya Pīṭham, established by Sri Adi Shankaracharya.
            </p>
            <div className="text-md text-foreground/90 mb-4">
              <p><span className="font-semibold">Current Acharyas:</span> Jagadguru Shankaracharya Sri Sri Bharathi Tirtha Mahaswamiji & Sri Sri Vidhushekhara Bharati Mahaswamiji</p>
              <p><span className="font-semibold">Associated Veda:</span> Yajur Veda</p>
              <p><span className="font-semibold">Mahāvākya:</span> Aham Brahmāsmi</p>
            </div>
            <Button asChild variant="outline">
              <Link href="https://www.sringeri.net/" target="_blank">
                Official Website <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <Tabs defaultValue="about" className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <TabsList className="mb-8 inline-flex w-max">
                <TabsTrigger value="about">About the Acharyas</TabsTrigger>
                <TabsTrigger value="teachings">Teachings</TabsTrigger>
                <TabsTrigger value="lineage">Lineage</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="gallery">Photos</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="seva">Seva</TabsTrigger>
              </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="about" className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
            <h2 className="font-headline text-primary">Dakṣiṇāmnāya Śrī Śāradā Pīṭham, Sringeri: The Southern Seat</h2>
            <p>The Sringeri Sharada Peetham, the first and foremost Maṭha established by Adi Shankaracharya, is renowned for its unbroken lineage of realized masters and its profound contributions to Vedic scholarship. It is associated with the Kṛṣṇa Yajur Veda and the Mahāvākya, Ahaṃ Brahmāsmi ("I am Brahman").</p>
            
            <h3 className="font-headline text-primary/90">A Note on the Dual Leadership: The Guru-Shishya Parampara in Practice</h3>
            <p>The Sringeri Peetham currently operates under a unique dual-leadership model, embodying the living tradition of the Guru-Shishya Paramparā (master-disciple lineage). The senior pontiff, Jagadguru Shankaracharya Sri Sri Bharathi Tirtha Mahaswamiji, is referred to as "Mahasannidhanam." He is assisted in all duties by his chosen successor-designate, Jagadguru Shankaracharya Sri Sri Vidhushekhara Bharati Mahaswamiji, who is referred to as "Sannidhanam". This arrangement ensures a seamless transition and continuity of the sacred tradition.</p>

            <h3 className="font-headline text-primary/90">The Reigning Pontiff: Jagadguru Shankaracharya Sri Sri Bharathi Tirtha Mahaswamiji (36th Acharya)</h3>
            <p>The 36th Jagadguru of the Sringeri Sharada Peetham, Sri Bharathi Tirtha Mahaswamiji, was born as Seetharama Anjaneyalu on April 11, 1951, in Machilipatnam, Andhra Pradesh. From a young age, he displayed a deep religious inclination and a prodigious intellect. He was a devoted worshipper of Lord Shiva and showed remarkable proficiency in Sanskrit and the Vedas, which he learned from his father. In 1966, at the age of 15, he approached the 35th Jagadguru, Sri Abhinava Vidyatirtha Mahaswamiji, seeking spiritual guidance. The senior Acharya recognized his potential and accepted him as a disciple. On November 11, 1974, the young Brahmachari was initiated into the holy order of sannyāsa and given the monastic name Bharathi Tirtha. He formally ascended the Vyakhyana Simhasana (throne of wisdom) as the 36th Jagadguru on October 19, 1989, following the mahāsamādhi of his Guru. He is widely revered as a sage of the highest order, with extraordinary knowledge of Vedanta, the Shastras, and multiple languages.</p>

            <h3 className="font-headline text-primary/90">The Successor-Designate: Jagadguru Shankaracharya Sri Sri Vidhushekhara Bharati Mahaswamiji</h3>
            <p>The successor-designate, Sri Vidhushekhara Bharati Mahaswamiji, was born as Sri Kuppa Venkateshwara Prasada Sharma on July 24, 1993, in the holy town of Tirupati, Andhra Pradesh. Born into a family of Vedic scholars, his spiritual education began early. His upanayana (sacred thread ceremony) was performed at the tender age of five, after which he began his formal study of the Kṛṣṇa Yajur Veda, which he quickly mastered. A pivotal moment in his life occurred in 2006, when as a teenager he had his first darśana (audience) with Sri Bharathi Tirtha Mahaswamiji. In 2009, he returned to Sringeri and expressed his deep desire to study the Shastras directly at the feet of the Jagadguru. Impressed by his sincerity and sharp intellect, the Mahasannidhanam took him under his personal tutelage. On January 23, 2015, Sri Bharathi Tirtha Mahaswamiji initiated him into sannyāsa, bestowing upon him the monastic name Vidhushekhara Bharati and anointing him as his successor.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Propagating Advaita Vedanta</CardTitle>
                    <CardDescription>The core philosophy of the Sringeri Peetham, rooted in the Mahāvākya "Aham Brahmāsmi" (I am Brahman).</CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>Since his initiation, Sri Vidhushekhara Bharati has devoutly assisted his Guru in all the affairs of the Maṭha, undertaking extensive Vijaya Yatras and delivering discourses (anugraha bhāṣaṇam). His teachings are deeply rooted in the philosophy of Advaita Vedanta, focusing on its core tenets. He expounds upon the non-difference between the jīva (the individual self) and Brahman (the ultimate reality), the nature of māyā (the cosmic illusion), and the concept of mithyā (the transactional or dependent reality of the phenomenal world). He consistently emphasizes the importance of ātma-vicāra (self-enquiry) and deep contemplation on the teachings of the Upanishads and the Bhagavad Gita as the path to liberation (mokṣa).</p>
                    <p>The Sringeri Peetham, under the guidance of both Acharyas, has effectively blended ancient tradition with modern technology to propagate these teachings globally. This is evident in their sophisticated digital ecosystem, which includes a comprehensive official website (sringeri.net), an active YouTube channel for livestreaming events, and dedicated online portals for booking sevas and making donations.</p>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="lineage">
             <h3 className="font-headline text-2xl text-primary mb-6 flex items-center gap-2"><Landmark className="h-6 w-6" /> Guru Parampara</h3>
             {peethamInfo.lineage && <LineageTimeline lineage={peethamInfo.lineage} />}
          </TabsContent>
          
          <TabsContent value="events">
            {renderMediaTabContent(sringeriEvents, 'event')}
          </TabsContent>

          <TabsContent value="gallery">
            <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
            {renderMediaTabContent(sringeriPhotos, 'photo')}
          </TabsContent>

           <TabsContent value="videos">
             <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Gallery</h3>
             {renderMediaTabContent(sringeriVideos, 'video')}
             <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/events">View Full Bodha Calendar</Link>
                </Button>
             </div>
          </TabsContent>

          <TabsContent value="seva">
            <h3 className="font-headline text-2xl text-primary mb-6">Seva Opportunities at Sringeri</h3>
            {sringeriSeva.length > 0 ? (
                <div className="space-y-4">
                    {sringeriSeva.map(opp => (
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
                <p className="text-muted-foreground">There are currently no specific Seva opportunities listed for Sringeri. Please check the main <Link href="/seva" className="text-accent underline">Seva Hub</Link> for remote opportunities or contact the Peetham directly.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
