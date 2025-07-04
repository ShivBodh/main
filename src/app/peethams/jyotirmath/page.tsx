
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, Landmark } from 'lucide-react';
import { peethams } from '@/lib/peethams-data';
import { LineageTimeline } from '@/components/peethams/LineageTimeline';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const peethamInfo = peethams.find(p => p.name.includes('Jyotirmath'))!;

export default function JyotirmathClient() {

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <Image
              src={peethamInfo.acharyaImage}
              data-ai-hint={peethamInfo.acharyaAiHint}
              alt="Jagadguru Shankaracharya of Jyotirmath Peetham"
              width={800}
              height={600}
              className="rounded-lg shadow-lg object-cover aspect-[4/3]"
            />
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
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <TabsList className="mb-8 inline-flex w-max">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="teachings">Teachings</TabsTrigger>
                <TabsTrigger value="lineage">Lineage</TabsTrigger>
              </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
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
             <p className="text-sm mt-4 text-muted-foreground">This page focuses on the history, teachings, and lineage of the Peetham. For photos, videos, and events, please visit the main <Link href="/gallery" className="text-accent underline">Gallery</Link> and <Link href="/events" className="text-accent underline">Bodha Calendar</Link> sections.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                    <CardDescription>The foundational teachings of the Peetham, rooted in the Mahāvākya "Ayam Ātmā Brahma" (This Self is Brahman).</CardDescription>
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

          <TabsContent value="lineage">
             <h3 className="font-headline text-2xl text-primary mb-6 flex items-center gap-2"><Landmark className="h-6 w-6" /> Guru Parampara</h3>
             {peethamInfo.lineage && <LineageTimeline lineage={peethamInfo.lineage} />}
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
}
