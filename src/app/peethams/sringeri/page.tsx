
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Camera, MapPin, Mail, Briefcase, Globe, Facebook, PlayCircle } from 'lucide-react';
import { allSevaOpportunities } from '@/lib/seva-data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { sringeriVideoArchive, sringeriPhotoGallery } from '@/lib/sringeri-media';
import { sringeriFacebookVideos } from '@/lib/sringeri-facebook-videos';
import { format } from 'date-fns';
import { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const sringeriSeva = allSevaOpportunities.filter(o => o.peetham === 'Sringeri');

export default function SringeriPeethamPage() {
    const [visibleYoutubeVideos, setVisibleYoutubeVideos] = useState(2);
    const [visibleFacebookVideos, setVisibleFacebookVideos] = useState(2);

    useEffect(() => {
        document.title = 'Sringeri Sharada Peetham | Sanatana Peethams Portal';
    }, []);

    const loadMoreYoutubeVideos = () => {
        setVisibleYoutubeVideos(prev => prev + 2);
    };

    const loadMoreFacebookVideos = () => {
        setVisibleFacebookVideos(prev => prev + 2);
    };

    const sortedYoutubeVideos = useMemo(() => [...sringeriVideoArchive].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);
    const sortedFacebookVideos = useMemo(() => [...sringeriFacebookVideos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);


  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <Image
              src="https://images.unsplash.com/photo-1621453444265-4d7a4c901962?q=80&w=2070&auto=format&fit=crop"
              alt="Sringeri Sharada Peetham"
              width={800}
              height={600}
              className="rounded-lg shadow-lg object-cover aspect-[4/3]"
              data-ai-hint="indian monastery"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
              Sringeri Sharada Peetham
            </h1>
            <p className="text-lg text-foreground/80 mb-2">
              The Southern Āmnāya Pīṭham, established by Sri Adi Shankaracharya.
            </p>
            <div className="text-md text-foreground/90 mb-4">
              <p><span className="font-semibold">Current Acharya:</span> Jagadguru Shankaracharya Sri Sri Bharati Tirtha Mahaswamiji</p>
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
              The Sringeri Sharada Peetham is the first and foremost of the four cardinal peethams established by the revered pontiff Jagadguru Sri Adi Shankaracharya in the 8th century C.E. It is the southern seat of the Advaita Vedanta tradition, located on the serene banks of the river Tunga in Sringeri, Karnataka. The Peetham is dedicated to the propagation of Sanatana Dharma and the philosophy of non-dualism.
            </p>
            <p>
              Sri Shankaracharya installed a sandalwood idol of Goddess Sharada, the goddess of learning and wisdom, which was later replaced with a golden idol by Sri Vidyaranya in the 14th century. The Peetham has been a focal point for spiritual learning and has been blessed by an unbroken lineage of illustrious Jagadgurus who have guided the faithful for over 1200 years.
            </p>
            <h3 className="font-headline text-primary/90">Main Ashram Details</h3>
            <p>
              Sri Sharada Peetham,<br />
              Sringeri,<br />
              Chikkamagaluru District,<br />
              Karnataka - 577139, India.
            </p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>
                        The core teaching of the Sringeri Sharada Peetham is Advaita Vedanta, as expounded by Sri Adi Shankaracharya. It emphasizes the non-duality of the individual soul (Atman) and the ultimate reality (Brahman). The path to liberation (Moksha) is through the attainment of Self-knowledge (Atma-jnana), which dispels the illusion of separation born of ignorance (Avidya).
                    </p>
                </CardContent>
             </Card>
             <h3 className="font-headline text-2xl text-primary mt-8 mb-4">Wisdom from the Lineage</h3>
             <div className="space-y-4">
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "Just as the one sun illumines the whole world, so does the one Atman illumine the whole body." - Sri Adi Shankaracharya
                </blockquote>
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "A mind that is not agitated by desires and is free from cravings is the fittest to receive the knowledge of the Self." - Sri Sri Bharati Tirtha Mahaswamiji
                </blockquote>
             </div>
          </TabsContent>

          <TabsContent value="events">
             <p className="text-center text-muted-foreground mb-8">A filtered view of upcoming and recent events related to the Sringeri Peetham. (This is placeholder data)</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Sharada Sharannavaratri</CardTitle>
                        <p className="text-sm text-muted-foreground">October 3, 2024 - October 12, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>The annual Navaratri festival celebrated with grandeur, featuring daily pujas, cultural events, and discourses by the Jagadguru.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Chaturmasya Vrata Anushtanam</CardTitle>
                        <p className="text-sm text-muted-foreground">July 21, 2024 - September 18, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>The sacred four-month period of spiritual retreat and penance observed by the Jagadguru. Devotees can attend special discourses during this time.</p>
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
                        {sringeriPhotoGallery.map(photo => (
                            <Image key={photo.id} src={photo.src} alt={photo.alt} width={400} height={300} className="rounded-lg object-cover aspect-[4/3]" data-ai-hint={photo.aiHint} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="youtube" className="mt-8">
                    <div className="space-y-6">
                        {sortedYoutubeVideos.slice(0, visibleYoutubeVideos).map(video => (
                           <Card key={video.id}>
                                <CardHeader>
                                    <CardTitle className="font-headline text-lg">{video.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{format(new Date(video.date), 'MMMM d, yyyy')}</p>
                                </CardHeader>
                                <CardContent>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="block relative aspect-video rounded-lg overflow-hidden group bg-secondary cursor-pointer">
                                                <Image src={`https://source.unsplash.com/800x450/?sringeri,video`} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="sringeri video" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <PlayCircle className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                                                </div>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl p-0">
                                            <DialogHeader className="p-4 border-b">
                                                <DialogTitle>{video.title}</DialogTitle>
                                            </DialogHeader>
                                            <div className="aspect-video bg-black">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${video.videoId}`}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    className="w-full h-full"
                                                ></iframe>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <p className="mt-4 text-foreground/80">{video.description}</p>
                                </CardContent>
                            </Card>
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
                        {sortedFacebookVideos.slice(0, visibleFacebookVideos).map(video => {
                            const facebookEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=0`;
                            return (
                                 <Card key={video.id}>
                                    <CardHeader>
                                        <CardTitle className="font-headline text-lg">{video.title}</CardTitle>
                                         <p className="text-sm text-muted-foreground">{format(new Date(video.date), 'MMMM d, yyyy')}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-foreground/80">{video.description}</p>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="block relative aspect-video rounded-lg overflow-hidden group bg-secondary cursor-pointer">
                                                    <Image src={`https://source.unsplash.com/800x450/?sringeri,facebook,video`} alt={video.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="sringeri facebook video" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <Facebook className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                                                    </div>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl p-0">
                                                <DialogHeader className="p-4 border-b">
                                                    <DialogTitle>{video.title}</DialogTitle>
                                                </DialogHeader>
                                                <div className="aspect-video bg-black">
                                                    <iframe
                                                        src={facebookEmbedUrl}
                                                        title={video.title}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                        className="w-full h-full"
                                                    ></iframe>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </CardContent>
                                 </Card>
                             )
                        })}
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
            <h3 className="font-headline text-2xl text-primary mb-6">Seva Opportunities at Sringeri</h3>
            {sringeriSeva.length > 0 ? (
                <div className="space-y-4">
                    {sringeriSeva.map(opp => (
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
                <p className="text-muted-foreground">There are currently no specific Seva opportunities listed for Sringeri. Please check the main <Link href="/seva" className="text-accent underline">Seva Hub</Link> for remote opportunities or contact the Peetham directly.</p>
            )}

            <Separator className="my-12" />

            <h3 className="font-headline text-2xl text-primary mb-6">Main Ashram & Center</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Sri Sharada Peetham</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 shrink-0"/><span>Sringeri, Chikkamagaluru District, Karnataka - 577139, India.</span></p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/><a href="mailto:info@sringeri.net" className="text-accent hover:underline">info@sringeri.net</a></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                     <Image src="https://source.unsplash.com/1200x600/?city,map" alt="Map of Sringeri Peetham" width={1200} height={600} className="rounded-lg object-cover w-full h-full aspect-video" data-ai-hint="city map" />
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
