
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Landmark, Map } from 'lucide-react';
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeroSection } from '@/components/home/HeroSection';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Home',
  description: 'A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya. Connecting devotees worldwide.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />

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
        <div className="container mx-auto px-4 text-center">
          <Map className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mt-4 mb-6">
              Explore the Sacred Geography
          </h2>
           <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
             Embark on an interactive 3D journey to the four cardinal Peethams established by Adi Shankaracharya. Discover their locations and explore the sacred landscapes.
            </p>
          <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/seva">Launch Interactive Map</Link>
                </Button>
            </div>
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
