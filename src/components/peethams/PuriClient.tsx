
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
import { useMemo } from 'react';
import { allCalendarItems, CalendarEventItem, CalendarPhotoItem, CalendarVideoItem } from '@/lib/calendar-data';
import { format } from 'date-fns';
import { PhotoCard } from '@/components/media/PhotoCard';
import { VideoCard } from '@/components/media/VideoCard';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const puriSeva = allSevaOpportunities.filter(o => o.peetham === 'Puri');
const peethamInfo = peethams.find(p => p.name.includes('Puri'))!;

const literaryWorks = [
    { category: 'Philosophy & Vedanta', works: 'Veda Vimarsha, Srimad Bhagavad Gita Saptashati, Dharma Darshan, Bauddh Siddhant aur Vedant' },
    { category: 'Mathematics', works: 'Elementary Vedic Arithmetic, Swastik Mathematics' },
    { category: 'Social & National Issues', works: 'Vyuharachana (Strategy to Foil Conspiracy Against Hinduism), Desh ki Dasha aur Apekshit Disha (Country\'s Condition and Expected Direction)' },
    { category: 'Biographical', works: 'Divyanubhuti (Biography of Swami Nischalanand Saraswati), Sri Shivavatar Bhagavatpada Shankaracharya' },
];

export default function PuriClient() {

    const puriMedia = useMemo(() => allCalendarItems.filter(item => item.peetham === 'Puri'), []);
    const puriPhotos = useMemo(() => puriMedia.filter((item): item is CalendarPhotoItem => item.type === 'photo'), [puriMedia]);
    const puriVideos = useMemo(() => puriMedia.filter((item): item is CalendarVideoItem => item.type === 'video'), [puriMedia]);
    const puriEvents = useMemo(() => puriMedia.filter((item): item is CalendarEventItem => item.type === 'event').slice(0, 3), [puriMedia]);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <Image
              src={peethamInfo.acharyaImage}
              data-ai-hint={peethamInfo.acharyaAiHint}
              alt={`Jagadguru Shankaracharya of ${peethamInfo.name}`}
              width={800}
              height={600}
              className="rounded-lg shadow-lg object-cover aspect-[4/3]"
            />
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
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2">
                        <Calendar className="h-6 w-6" /> Upcoming Events (2025)
                    </CardTitle>
                    <CardDescription>
                        The latest happenings connected to the Govardhana Peetham.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center p-4">
                        Information regarding the 2025 Chaturmasya program for Swami Nischalananda Saraswati is not yet publicly available. Devotees are advised to consult the official Govardhan Math website for announcements.
                    </p>
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
            <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
            {puriPhotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {puriPhotos.map(photo => (
                       <PhotoCard key={photo.id} item={photo} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-8">No photos available for this Peetham.</p>
            )}
          </TabsContent>

            <TabsContent value="videos">
             <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Gallery</h3>
             {puriVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {puriVideos.map(video => (
                       <VideoCard key={video.id} item={video} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-8">No videos available for this Peetham.</p>
            )}
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
