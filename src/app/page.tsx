import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Users, Landmark } from 'lucide-react';
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LineageTimeline } from '@/components/peethams/LineageTimeline';
import { DharmaArtFrame } from '@/components/home/DharmaArtFrame';
import { InteractiveWallpaperGenerator } from '@/components/home/InteractiveWallpaperGenerator';

export const metadata: Metadata = {
  title: 'Home',
  description: 'A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya. Connecting devotees worldwide.',
};

const dharmaSymbols = [
    {
        prompt: 'Aum (ॐ), the primordial sound of the universe',
        aiHint: 'aum symbol'
    },
    {
        prompt: 'The Padma (lotus flower), symbolizing purity and enlightenment',
        aiHint: 'lotus flower'
    },
    {
        prompt: 'The cosmic dance of Shiva (Nataraja) within a ring of fire',
        aiHint: 'dancing shiva'
    },
    {
        prompt: 'A swastika, an ancient symbol of well-being and good fortune',
        aiHint: 'swastika symbol'
    }
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 bg-card">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter">
            The Eternal Lineage, Unified for a Digital Age
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-foreground/80">
            Connecting devotees worldwide to the authentic teachings, live events, and profound wisdom of the four cardinal Peethams established by Adi Shankaracharya. This portal is a seva—a selfless service to strengthen the eternal chain of wisdom.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/peethams">Explore the Peethams</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">View Bodha Calendar</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-12">
            The Four Pillars of Sanatana Dharma
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {peethams.map((peetham: any) => (
              <Card key={peetham.name} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
                <div className="relative w-full h-48 bg-secondary/20 flex items-center justify-center">
                  <Image
                    src={peetham.image}
                    alt={peetham.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{peetham.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">{peetham.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 text-accent h-auto hover:text-accent/80">
                    <Link href={peetham.link}>
                      Discover {peetham.name.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary flex items-center justify-center gap-3">
              <Landmark className="h-8 w-8" />
              The Great Guru Parampara
            </h2>
            <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
             From one great root, four branches of wisdom grew. Explore the sacred, unbroken lineage of spiritual masters who have guided each Peetham for centuries.
            </p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto mt-16">
            {/* Trunk Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />

            {/* Root Node: Adi Shankaracharya */}
            <div className="pl-20 relative mb-12">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-primary ring-8 ring-card z-10" />
                <h3 className="text-3xl font-headline font-bold text-primary">Jagadguru Adi Shankaracharya</h3>
                <p className="text-foreground/80">The Fountainhead of the Lineage</p>
            </div>

            {/* Accordion for Peethams (Branches) */}
            <Accordion type="single" collapsible defaultValue="sringeri" className="w-full">
              {peethams.map((peetham) => {
                const shortName = peetham.link.split('/').pop()!;
                return (
                  <AccordionItem key={shortName} value={shortName} className="border-b-0 pl-20 relative">
                    {/* Branch Node */}
                    <div className="absolute left-6 top-8 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-primary/50 ring-8 ring-card z-10" />
                    {/* Branch Line */}
                    <div className="absolute left-6 top-8 w-14 h-0.5 bg-primary/20" />
                    
                    <AccordionTrigger className="text-2xl font-headline hover:text-primary py-6 text-primary/80 data-[state=open]:text-primary text-left">
                      {peetham.name}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-8">
                      <LineageTimeline lineage={peetham.lineage} />
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Sparkles className="h-10 w-10 text-primary mx-auto" />
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mt-4">
                    Dharma Art Wallpapers
                </h2>
                <p className="mt-2 text-lg text-foreground/80 max-w-3xl mx-auto">
                    A scrolling filmstrip of AI-generated wallpapers. Hover over the art to pause the animation and download.
                </p>
            </div>

            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mb-16">
                <ul className="flex items-center justify-center md:justify-start space-x-8 animate-autoscroll hover:[animation-play-state:paused]">
                    {dharmaSymbols.map((symbol, index) => (
                        <li key={`${symbol.prompt}-${index}-1`} className="w-64 flex-shrink-0">
                            <DharmaArtFrame prompt={symbol.prompt} aiHint={symbol.aiHint} />
                        </li>
                    ))}
                </ul>
                <ul className="flex items-center justify-center md:justify-start space-x-8 animate-autoscroll hover:[animation-play-state:paused]" aria-hidden="true">
                     {dharmaSymbols.map((symbol, index) => (
                        <li key={`${symbol.prompt}-${index}-2`} className="w-64 flex-shrink-0">
                            <DharmaArtFrame prompt={symbol.prompt} aiHint={symbol.aiHint} />
                        </li>
                    ))}
                </ul>
            </div>

             <InteractiveWallpaperGenerator />
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto max-w-4xl text-center px-4">
            <Users className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mt-4 mb-6">
                Join Our Global Community: Sanatan Social
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
                Sanatan Social is our dedicated, secure social media platform for all Sanatanis worldwide. Connect with fellow devotees, share your spiritual journey, start campaigns for dharmic causes, and maintain a personal diary. This is a space built for our community, by our community.
            </p>
            <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/social">Enter Sanatan Social</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
