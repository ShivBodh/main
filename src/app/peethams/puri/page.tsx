import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Calendar, Video, Camera } from 'lucide-react';

export default function PuriPeethamPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Govardhana Peetham, Puri"
            width={800}
            height={600}
            className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
            data-ai-hint="puri temple"
          />
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="teachings">Teachings</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
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
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2"><Calendar className="h-5 w-5" /> Ratha Yatra</CardTitle>
                        <p className="text-sm text-muted-foreground">July 7, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>The world-famous chariot festival of Lord Jagannath, where the Shankaracharya of Puri holds a traditional, prominent role.</p>
                    </CardContent>
                </Card>
                <Card>
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
             <div className="space-y-12">
                <div>
                    <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Camera className="h-6 w-6" /> Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 1" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="jagannath temple" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 2" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="ratha yatra" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 3" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="shankaracharya giving speech" />
                        <Image src="https://placehold.co/400x300.png" alt="Gallery Image 4" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="spiritual gathering" />
                    </div>
                </div>
                <div>
                    <h3 className="font-headline text-2xl text-primary mb-4 flex items-center gap-2"><Video className="h-6 w-6" /> Video Archive</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">Significance of the Rig Veda</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Video Placeholder</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">Jagannath Culture & Advaita</CardTitle>
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
