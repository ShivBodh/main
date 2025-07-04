
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

const peethamInfo = peethams.find(p => p.name.includes('Sringeri'))!;

export default function SringeriClient() {

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <Image
              src={peethamInfo.acharyaImage}
              data-ai-hint={peethamInfo.acharyaAiHint}
              alt="Jagadguru Shankaracharya of Sringeri Sharada Peetham"
              width={800}
              height={600}
              className="rounded-lg shadow-lg object-cover aspect-[4/3]"
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
              <p><span className="font-semibold">Current Acharya:</span> Jagadguru Shankaracharya Sri Sri Vidhushekhara Bharati Mahaswamiji</p>
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
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="teachings">Teachings</TabsTrigger>
                <TabsTrigger value="lineage">Lineage</TabsTrigger>
              </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

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
            <p className="text-sm mt-4 text-muted-foreground">This page focuses on the history, teachings, and lineage of the Peetham. For photos, videos, and events, please visit the main <Link href="/gallery" className="text-accent underline">Gallery</Link> and <Link href="/events" className="text-accent underline">Bodha Calendar</Link> sections.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                    <CardDescription>The foundational teachings of the Peetham, rooted in the Mahāvākya "Aham Brahmāsmi" (I am Brahman).</CardDescription>
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

          <TabsContent value="lineage">
             <h3 className="font-headline text-2xl text-primary mb-6 flex items-center gap-2"><Landmark className="h-6 w-6" /> Guru Parampara</h3>
             {peethamInfo.lineage && <LineageTimeline lineage={peethamInfo.lineage} />}
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
}
