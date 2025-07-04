
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

const peethamInfo = peethams.find(p => p.name.includes('Puri'))!;

export default function PuriClient() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <Image
              src={peethamInfo.acharyaImage}
              data-ai-hint={peethamInfo.acharyaAiHint}
              alt="Jagadguru Shankaracharya of Govardhana Peetham"
              width={800}
              height={600}
              className="rounded-lg shadow-lg object-cover aspect-[4/3]"
            />
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
             <p className="text-sm mt-4 text-muted-foreground">This page focuses on the history, teachings, and lineage of the Peetham. For photos, videos, and events, please visit the main <Link href="/gallery" className="text-accent underline">Gallery</Link> and <Link href="/events" className="text-accent underline">Bodha Calendar</Link> sections.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                    <CardDescription>The foundational teachings of the Peetham, rooted in the Mahāvākya "Prajñānam Brahma" (Consciousness is Brahman).</CardDescription>
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

          <TabsContent value="lineage">
             <h3 className="font-headline text-2xl text-primary mb-6 flex items-center gap-2"><Landmark className="h-6 w-6" /> Guru Parampara</h3>
             {peethamInfo.lineage && <LineageTimeline lineage={peethamInfo.lineage} />}
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
}
