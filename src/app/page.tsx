
import { HeroSection } from '@/components/home/HeroSection';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Calendar, Atom } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // The title and description will be inherited from the RootLayout,
  // which is appropriate for the main homepage.
};

const mainFeatures = [
    {
        icon: Users,
        title: "Sanatan Social",
        description: "A private, secure platform for devotees to connect, share knowledge, and support dharmic causes.",
        href: "/social"
    },
    {
        icon: Calendar,
        title: "Bodha Calendar",
        description: "A living archive of events, media, and discourses from the four cardinal Peethams.",
        href: "/events"
    },
    {
        icon: Atom,
        title: "Sādhanā Suite",
        description: "A suite of digital tools including a Japa counter and meditation timer to support your daily spiritual practice.",
        href: "/sadhana"
    }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">A Unified Platform for Dharma</h2>
                <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
                    All the tools and community features you need, integrated into a single, trusted source.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mainFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={feature.title} className="text-center flex flex-col">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 p-4 rounded-full w-max">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl mt-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="secondary" className="w-full">
                                    <Link href={feature.href}>
                                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">The Shankaracharya Encyclopedia</h2>
                  <p className="mt-4 text-lg text-foreground/80">
                      Dive deep into the life, teachings, and lineage of the great Acharyas. Our portal provides a structured, searchable, and authoritative knowledge base, making timeless wisdom accessible to all.
                  </p>
                  <p className="mt-4 text-lg text-foreground/80">
                      Explore detailed profiles, browse media galleries, and stay updated on the latest events from all four cardinal Peethams.
                  </p>
                   <Button asChild size="lg" className="mt-8">
                        <Link href="/peethams">
                            Explore the Peethams
                        </Link>
                    </Button>
              </div>
              <div className="relative aspect-video rounded-lg shadow-lg">
                <Image 
                    src="https://images.unsplash.com/photo-1598493132219-4591a2790938?q=80&w=600&h=400&fit=crop" 
                    alt="Ancient texts and scriptures"
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint="ancient scripture book"
                />
              </div>
          </div>
      </section>
    </>
  );
}
