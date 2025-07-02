
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { recentItems, actionItems } from '@/lib/home-page-data';
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanatana Peethams Portal | Home',
  description: 'A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya. Connecting devotees worldwide.',
};


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
            {actionItems.map((item) => (
                <Button asChild size="lg" key={item.title}>
                  <Link href={item.href}>{item.title}</Link>
                </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-12">
            The Four Pillars of Sanatana Dharma
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {peethams.map((peetham) => (
              <Card key={peetham.name} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
                <div className="relative w-full h-48 bg-secondary/20">
                    <Image 
                      src={peetham.image} 
                      alt={peetham.name} 
                      width={600} 
                      height={400} 
                      className={`w-full h-full ${peetham.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                      {...(peetham.aiHint && { 'data-ai-hint': peetham.aiHint })}
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
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-12">
            Dharma in Action: Latest Events & Discourses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentItems.map((item) => (
              <Link href={item.link} key={item.title} className="block group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
                    <CardHeader>
                        <span className="text-sm font-semibold text-accent">{item.type.toUpperCase()}</span>
                        <CardTitle className="font-headline text-xl mt-1 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/80">{item.description}</p>
                    </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-6">
                Our Sacred Vow (Sankalpa)
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
                In a world of scattered information, our mission is to serve as a humble, unified, and trusted resource for all followers of Sanatana Dharma. We are dedicated to meticulously curating and presenting verified knowledge from the official sources of the four Peethams, ensuring the timeless wisdom of Adi Shankaracharya is accessible to all.
            </p>
        </div>
      </section>
    </div>
  );
}
