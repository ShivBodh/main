
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

const peethamInfo = peethams.find(p => p.name.includes('Dwaraka'))!;

export default function DwarakaClient() {

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <Image
              src={peethamInfo.acharyaImage}
              data-ai-hint={peethamInfo.acharyaAiHint}
              alt="Jagadguru Shankaracharya of Dwaraka Sharada Peetham"
              width={800}
              height={600}
              className="rounded-lg shadow-lg object-cover aspect-[4/3]"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-4">
              Dwaraka Sharada Peetham
            </h1>
            <p className="text-lg text-foreground/80 mb-2">
              The Western Āmnāya Pīṭham, overlooking the Arabian Sea.
            </p>
            <div className="text-md text-foreground/90 mb-4">
              <p><span className="font-semibold">Current Acharya:</span> Jagadguru Shankaracharya Sri Sri Sadananda Saraswatiji Maharaj</p>
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
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="teachings">Teachings</TabsTrigger>
                <TabsTrigger value="lineage">Lineage</TabsTrigger>
              </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          <TabsContent value="about" className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 leading-relaxed">
            <h2 className="font-headline text-primary">History and Significance</h2>
            <p>
              The Dwaraka Sharada Peetham, also known as the Kalika Matha, is the western cardinal peetham established by Sri Adi Shankaracharya. Located in the sacred city of Dwaraka, Gujarat, it holds immense significance as a centre for the preservation of the Sama Veda. The Peetham's mission is to uphold the tenets of Advaita Vedanta and guide devotees on the path of Dharma.
            </p>
            <p>
              The city of Dwaraka itself is famously associated with Lord Krishna, making the Peetham a site of great spiritual power and pilgrimage. The lineage of Shankaracharyas at Dwaraka has been responsible for the spiritual welfare of Western India for centuries, fostering a deep-rooted culture of devotion and knowledge.
            </p>
            <h3 className="font-headline text-primary/90">Main Ashram Details</h3>
            <p>
              Shree Sharada Peeth,
              <br />
              Near Iskon Gate, Dwarka,
              <br />
              Gujarat - 361335, India.
            </p>
             <p className="text-sm mt-4 text-muted-foreground">This page focuses on the history, teachings, and lineage of the Peetham. For photos, videos, and events, please visit the main <Link href="/gallery" className="text-accent underline">Gallery</Link> and <Link href="/events" className="text-accent underline">Bodha Calendar</Link> sections.</p>
          </TabsContent>

          <TabsContent value="teachings">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-primary flex items-center gap-2"><BookOpen className="h-6 w-6" /> Core Philosophy</CardTitle>
                    <CardDescription>The foundational teachings of the Peetham, rooted in the Mahāvākya "Tat Tvam Asi" (That Thou Art).</CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none text-foreground/90">
                    <p>
                       The Dwaraka Peetham is a bastion of the Sama Veda and the Mahāvākya "Tat Tvam Asi" (That Thou Art). The teachings focus on guiding the seeker to realize the inherent identity between the individual consciousness and the universal consciousness. The philosophy emphasizes Bhakti (devotion) as a powerful means to purify the mind, making it receptive to the ultimate truth of non-duality.
                    </p>
                </CardContent>
             </Card>
             <h3 className="font-headline text-2xl text-primary mt-8 mb-4">Wisdom from the Lineage</h3>
             <div className="space-y-4">
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "Realize that you are not the body, but the eternal, blissful consciousness that witnesses all." - A Teaching from the Dwaraka Lineage
                </blockquote>
                <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                "Service to humanity is service to God. See the divine in every being and act with compassion." - A Teaching from the Dwaraka Lineage
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
