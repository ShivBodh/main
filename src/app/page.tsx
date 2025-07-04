import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarDays, Sparkles, BookOpen, Smile, MoonStar, Users, Landmark } from 'lucide-react';
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import { allCalendarItems, CalendarPhotoItem, CalendarVideoItem } from '@/lib/calendar-data';
import { PhotoCard } from '@/components/media/PhotoCard';
import { VideoCard } from '@/components/media/VideoCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LineageTimeline } from '@/components/peethams/LineageTimeline';

export const metadata: Metadata = {
  title: 'Home',
  description: 'A single, trusted digital beacon for the timeless wisdom of the four cardinal Peethams established by Adi Shankaracharya. Connecting devotees worldwide.',
};

export default function HomePage() {
  const featuredMedia = allCalendarItems
    .filter((item): item is CalendarPhotoItem | CalendarVideoItem => item.type === 'photo' || item.type === 'video')
    .slice(0, 9);

  const features = [
    {
      icon: CalendarDays,
      title: 'Bodha Calendar',
      description: 'A living archive of events, discourses, and media from the Peethams.',
      href: '/events',
    },
     {
      icon: Users,
      title: 'Sanatan Social',
      description: 'A safe platform for the global Hindu community to connect and share.',
      href: '/social',
    },
    {
      icon: Sparkles,
      title: 'Sādhanā Suite',
      description: 'Digital tools for japa, meditation, and daily wisdom to support your practice.',
      href: '/sadhana',
    },
    {
      icon: BookOpen,
      title: 'Reading Room',
      description: 'A curated library of foundational texts by great masters of the lineage.',
      href: '/reading',
    },
    {
      icon: Smile,
      title: 'Kids Corner',
      description: 'A fun and creative space for young devotees with interactive activities.',
      href: '/kids',
    },
    {
      icon: MoonStar,
      title: 'Daily Panchanga',
      description: 'View daily astrological details including Tithi, Nakshatra, and auspicious timings.',
      href: '/panchanga',
    },
  ];

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
              A glimpse into the unbroken lineage of spiritual masters who have guided each Peetham for centuries. Click a Peetham to reveal its timeline.
            </p>
          </div>
          <Accordion type="single" collapsible defaultValue="sringeri" className="w-full max-w-4xl mx-auto">
            {peethams.map((peetham) => {
              const shortName = peetham.link.split('/').pop()!;
              return (
                <AccordionItem key={shortName} value={shortName} className="border-b-2 border-primary/10">
                  <AccordionTrigger className="text-2xl font-headline hover:text-primary py-6 text-primary/80 data-[state=open]:text-primary">
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
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary mb-12">
            Dharma in Action: Latest from the Peethams
          </h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredMedia.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    {item.type === 'photo' ? (
                       <Link href="/gallery" className="block group h-full">
                        <PhotoCard item={item} />
                       </Link>
                    ) : (
                       <VideoCard item={item} />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
           <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                    <Link href="/events">
                        View Full Bodha Calendar <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-card">
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
