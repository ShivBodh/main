
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, ShieldCheck, Network } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { AiImage } from "@/components/common/AiImage";

export const metadata: Metadata = {
  title: 'Our Mission | Sanatana Peethams Portal',
  description: 'Learn about our mission to build a trusted, unified, and authoritative digital home for the four cardinal Peethams established by Jagadguru Adi Shankaracharya.',
};

const corePrinciples = [
    {
        icon: <BadgeCheck className="h-8 w-8 text-primary" />,
        title: 'Authenticity',
        description: 'We are committed to presenting only verified information sourced directly from the official channels of the four Peethams, ensuring you receive genuine teachings and announcements.'
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: 'Integrity',
        description: 'This platform is a non-profit, volunteer-driven seva. Our sole purpose is to serve the community, free from commercial interests or external influences.'
    },
    {
        icon: <Network className="h-8 w-8 text-primary" />,
        title: 'Unity',
        description: 'We honor and respect the unique traditions of each Peetham while celebrating the unified foundation of Advaita Vedanta that binds them together as the four pillars of Sanatana Dharma.'
    }
];

export default function MissionPage() {
    return (
      <div className="bg-background text-foreground">
        <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
              A Service to Dharma, A Bridge to the Source
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Our mission is to build a trusted, unified, and authoritative digital home for the four cardinal Peethams established by Jagadguru Adi Shankaracharya.
            </p>
          </div>
  
          <article className="prose prose-lg lg:prose-xl max-w-none mx-auto text-foreground/90 leading-relaxed space-y-6 prose-h2:font-headline prose-h2:text-primary/90 prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4">
            <section>
              <h2>The Genesis of Our Seva</h2>
              <p>
                This portal was born from a simple, profound realization: in an age of instant global connection, a trusted, unified, and authoritative source for the teachings, events, and activities of the four cardinal Peethams was conspicuously absent. Devotees and seekers across the world navigated a fragmented landscape of disparate websites, social media channels, and unverified information, yearning for a single point of clarity and connection to the heart of the lineage.
              </p>
            </section>
  
            <section>
              <h2>Our Sacred Commitment</h2>
              <p>
                Our mission is to humbly take up this sacred responsibility. We are dedicated to serving all followers of Sanatana Dharma by meticulously curating and presenting verified information from the official sources of the Sringeri Sharada Peetham, Dwaraka Sharada Peetham, Govardhana Peetham, and Jyotirmath Peetham. We aim to be a bridge—a digital <strong>setu</strong>—connecting you directly to the heart of the four Peethams: their rich history, their profound philosophy, and their vibrant, ongoing legacy.
              </p>
            </section>

            <section>
                <h2>Our Core Principles</h2>
                <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {corePrinciples.map(concept => (
                        <Card key={concept.title}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                {concept.icon}
                                <CardTitle className="font-headline text-xl mt-0">{concept.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base text-foreground/80">{concept.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
  
            <section>
              <h2>The Vision for the Future</h2>
              <p>
                Our work is for the future. We envision this portal evolving into far more than a repository of information. It will become a living archive for future generations, a community hub for shared learning, and a resource for daily practice. Our ultimate vision is to work towards a more beautiful and harmonious future for all, grounded in the timeless principles of Sanatana Dharma. This portal stands as a testament to the enduring power of the Guru-shishya parampara, ensuring the light of the Jagadgurus' wisdom shines brightly for all who seek it.
              </p>
            </section>

            <section>
              <h2 id="policy">Our Stance on Copyright &amp; Sacred Duty</h2>
                <p>
                    We, the ShivBodh Group, are devotees of Sanatana Dharma and hold the Jagadguru Shankaracharyas and the sacred lineage of Adi Shankaracharya in the highest reverence, viewing them as manifestations of the divine.
                </p>
                <p>
                    It is our profound belief that the timeless wisdom originating from Adi Shankaracharya and the four Peethams is a universal treasure, intended for the spiritual upliftment of all humanity. Therefore, we operate under the principle that any online or offline content derived from this sacred source should be free from commercial copyright restrictions when used for the noble purpose of spreading the message of Dharma, enhancing knowledge, and fostering peace and unity.
                </p>
                <p>
                    This portal is a non-commercial Seva (selfless service). Our mission is not to generate profit or engage in any fraudulent activity, but to build a strong, united, and enlightened global community of Sanatanis and seekers of truth. All content is shared here in that spirit.
                </p>
            </section>

            <div className="not-prose text-center mt-16 p-8 bg-card rounded-lg border">
                 <div className="mx-auto mb-4 inline-block relative h-20 w-20">
                    <AiImage
                      data-ai-hint="seva hands painting"
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-headline font-bold text-primary">Join Us in this Seva</h2>
                <p className="mt-4 text-foreground/90 leading-relaxed">
                    This platform is built by the community, for the community. If you have skills in content curation, translation, web development, or simply a heartfelt desire to contribute, we welcome your participation in our shared vision.
                </p>
                <Button asChild size="lg" className="mt-6">
                    <Link href="/seva">
                        Explore Seva Opportunities
                    </Link>
                </Button>
            </div>
          </article>
        </div>
      </div>
    );
  }
