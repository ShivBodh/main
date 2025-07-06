
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
import { format, parseISO } from 'date-fns';
import { PhotoCard } from '@/components/media/PhotoCard';
import { VideoCard } from '@/components/media/VideoCard';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';

const dwarakaSeva = allSevaOpportunities.filter(o => o.peetham === 'Dwaraka');
const peethamInfo = peethams.find(p => p.name.includes('Dwaraka'))!;

const dwarakaEvents: CalendarEventItem[] = [
    { id: 'dwaraka-event-1', date: '2025-05-02', peetham: 'Dwaraka', type: 'event', title: "Speaker at Global Festival of Oneness (GFO2025)", description: "Listed as a featured speaker for the Global Festival of Oneness, an online event scheduled to take place from May 2 to June 1, 2025.", category: 'Online Event' },
    { id: 'dwaraka-event-2', date: '2025-07-15', peetham: 'Dwaraka', type: 'event', title: "2025 Chaturmasya Vrata", description: "The 2025 Chaturmasyavratanushthan will be observed at the Paramhansi Ganga Ashram, Shridham, in Narsinghpur, Madhya Pradesh.", category: 'Vrata' },
];

export default function DwarakaClient() {

    const dwarakaMedia = useMemo(() => allCalendarItems.filter(item => item.peetham === 'Dwaraka'), []);
    const dwarakaPhotos = useMemo(() => dwarakaMedia.filter((item): item is CalendarPhotoItem => item.type === 'photo'), [dwarakaMedia]);
    const dwarakaVideos = useMemo(() => dwarakaMedia.filter((item): item is CalendarVideoItem => item.type === 'video'), [dwarakaMedia]);

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
              The Western Āmnāya Pīṭham, overlooking the Arabian Sea.
            </p>
            <div className="text-md text-foreground/90 mb-4">
              <p><span className="font-semibold">Current Acharya:</span> Jagadguru Shankaracharya Swami Sri Sadananda Saraswatiji Maharaj</p>
              <p><span className="font-semibold">Associated Veda:</span> Sama Veda</p>
              <p><span className="font-semibold">Mahāvākya:</span> Tat Tvam Asi</p>
            </div>
            <Button asChild variant="outline">
              <Link href="https://shreesharadapithmathdwarka.org/" target="_blank">
                Official Website <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <Tabs defaultValue="about" className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <TabsList className="mb-8 inline-flex w-max">
                <TabsTrigger value="about">About the Acharya</TabsTrigger>
                <TabsTrigger value="teachings">Teachings & Activities</TabsTrigger>
                <TabsTrigger value="lineage">Lineage</TabsTrigger>
                 <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="gallery">Photos</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="seva">Seva</TabsTrigger>
              </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          <TabsContent value="about" className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
            <h2 className="font-headline text-primary">The Present Pontiff: Jagadguru Shankaracharya Swami Sadananda Saraswati</h2>
            <p>Swami Sadananda Saraswati is the current Shankaracharya of the Dwarka Sharada Peetham. He was appointed to the position in September 2022 following the passing of his predecessor, Swami Swaroopanand Saraswati, who had held the titles for both the Dwarka and Jyotir Peethams. His anointment ceremony took place on September 12, 2022, at the Paramhansi Ganga Ashram in Narsinghpur, Madhya Pradesh. Prior to his elevation, he was known as Dandi Swami Sadanand Maharaj and served as the "second-in-command" to Swami Swaroopanand Saraswati.</p>
            <p>There is a significant scarcity of publicly available information regarding Swami Sadananda Saraswati's purvāśrama (pre-monastic life), including his birth name, family, and early education. It is important to note that the name "Swami Sadananda" has been held by other notable monastic figures in Hindu history, and care must be taken not to confuse the current Shankaracharya of Dwaraka with these other historical personalities.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Recent Activities and Public Statements</CardTitle>
                    <CardDescription>The foundational teachings of the Peetham are rooted in the Mahāvākya "Tat Tvam Asi" (That Thou Art).</CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>Since his anointment, Swami Sadananda Saraswati has engaged in several public activities:</p>
                    <ul>
                        <li>In August 2024, he voiced grave concern over the safety and security of the Hindu minority in Bangladesh following political unrest there.</li>
                        <li>In January 2024, the Dwarka Peetham issued a formal statement clarifying that it was not opposed to the Pran Pratishtha (consecration) ceremony of the Ram Mandir in Ayodhya.</li>
                        <li>In July 2024, he, along with Swami Avimukteshwaranand Saraswati, graced the Aashirwad (blessing) ceremony for the wedding of Anant Ambani and Radhika Merchant in Mumbai.</li>
                        <li>In May 2025, he visited the Tapobhoomi Gurupeeth in Goa, where he participated in religious ceremonies, including a tree plantation drive.</li>
                        <li>He also undertook a visit to Sringeri in April-May 2024, where he met with both the senior and junior Shankaracharyas of the Sharada Peetham.</li>
                    </ul>
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
                        Key upcoming events for the Dwaraka Shankaracharya.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {dwarakaEvents.length > 0 ? (
                        <ul className="space-y-4">
                            {dwarakaEvents.map(event => (
                                <li key={event.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-3 rounded-md border bg-muted/20">
                                    <div>
                                        <p className="font-semibold text-foreground/90">{event.title}</p>
                                        <p className="text-sm text-muted-foreground">{format(parseISO(event.date), 'MMMM d, yyyy')}</p>
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
             <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
             {dwarakaPhotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dwarakaPhotos.map(photo => (
                       <PhotoCard key={photo.id} item={photo} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-8">No photos available for this Peetham.</p>
            )}
          </TabsContent>

           <TabsContent value="videos">
             <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Gallery</h3>
             {dwarakaVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dwarakaVideos.map(video => (
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
            <h3 className="font-headline text-2xl text-primary mb-6">Seva Opportunities at Dwaraka</h3>
            {dwarakaSeva.length > 0 ? (
                <div className="space-y-4">
                    {dwarakaSeva.map(opp => (
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
                <p className="text-muted-foreground">There are currently no specific Seva opportunities listed for Dwaraka. Please check the main <Link href="/seva" className="text-accent underline">Seva Hub</Link> for remote opportunities or contact the Peetham directly.</p>
            )}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
