
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Camera, MapPin, Mail, Briefcase, Globe, Flag, ArrowRight } from 'lucide-react';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useMemo } from 'react';
import { allCalendarItems, CalendarEventItem, CalendarPhotoItem } from '@/lib/calendar-data';
import { format } from 'date-fns';
import { PhotoCard } from '@/components/media/PhotoCard';

const puriSeva = allSevaOpportunities.filter(o => o.peetham === 'Puri');

export default function PuriClient() {

    const puriMedia = useMemo(() => allCalendarItems.filter(item => item.peetham === 'Puri'), []);
    const puriPhotos = useMemo(() => puriMedia.filter((item): item is CalendarPhotoItem => item.type === 'photo'), [puriMedia]);
    const puriEvents = useMemo(() => puriMedia.filter((item): item is CalendarEventItem => item.type === 'event').slice(0, 3), [puriMedia]);

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
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2">
                        <Calendar className="h-6 w-6" /> Recent & Upcoming Events
                    </CardTitle>
                    <CardDescription>
                        The latest happenings connected to the Govardhana Peetham.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {puriEvents.length > 0 ? (
                        <ul className="space-y-4">
                            {puriEvents.map(event => (
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
            <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
            {puriPhotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {puriPhotos.map(photo => (
                       <PhotoCard key={photo.id} item={photo} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-8">No photos available.</p>
            )}
             <div className="text-center mt-8">
                <Button asChild>
                    <Link href="/gallery">View Full Chronological Gallery</Link>
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
