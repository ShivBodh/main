import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Video, Camera } from 'lucide-react';

export default function JyotirmathPeethamPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Jyotirmath Peetham, Badrinath"
            width={800}
            height={600}
            className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
            data-ai-hint="himalayan monastery"
          />
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="teachings">Teachings</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
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
             <div className="space-y-12">
                <div>
                    <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 1" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="snowy mountains" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 2" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="badrinath shrine" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 3" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="sadhu meditating" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 4" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="himalayan valley" />
                    </div>
                </div>
                <div>
                    <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Archive</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">Message from the Himalayas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Video Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">The Essence of the Atharva Veda</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Video Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
