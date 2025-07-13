import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, Sun, Infinity } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Philosophy: Shivbodh | Sanatana Peethams Portal',
  description: 'Learn about our guiding philosophy, Shivbodh: The Journey from Shunya to Purna, a modern interpretation of the timeless journey of self-realization rooted in Advaita Vedanta.',
};

const keyConcepts = [
    {
        icon: <Circle className="h-8 w-8 text-primary" />,
        title: 'Shunya (The Void)',
        description: 'Represents the starting point for many seekers: a sense of emptiness, confusion, or spiritual longing amidst the noise of modern life. It is the perceived separation from our true nature.'
    },
    {
        icon: <Sun className="h-8 w-8 text-primary" />,
        title: 'Purna (The Fullness)',
        description: 'The state of completeness, wholeness, and non-duality. It is the realization of the Atman as Brahman—the ultimate reality. It is not an attainment, but an awakening to what already is.'
    },
    {
        icon: <Infinity className="h-8 w-8 text-primary" />,
        title: 'Advaita (Non-Duality)',
        description: 'The core philosophical tenet that there is no fundamental separation between the individual self (Atman) and the ultimate reality (Brahman). All is one.'
    }
];

export default function PhilosophyPage() {
    return (
      <div className="bg-background text-foreground">
        <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
              Shivbodh: The Journey from Shunya to Purna
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Our guiding philosophy is a modern interpretation of the timeless journey of self-realization, rooted in the supreme wisdom of Advaita Vedanta.
            </p>
          </div>
  
          <article className="prose prose-lg lg:prose-xl max-w-none mx-auto text-foreground/90 leading-relaxed space-y-6 prose-h2:font-headline prose-h2:text-primary/90 prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4">
            <section>
              <h2>The Modern Seeker's Dilemma</h2>
              <p>
                In the vast, echoing chambers of the digital age, we are surrounded by an unprecedented volume of information. Voices clamor for our attention, offering endless streams of data, opinions, and spiritual 'hacks'. Yet, for the earnest seeker of truth, this digital deluge often leads not to clarity, but to a profound sense of fragmentation and a quiet, persistent void—a state we call <strong>Shunya</strong>. The path to true, timeless wisdom becomes obscured, and the soul yearns for a clear, unified beacon to guide it home.
              </p>
            </section>
  
            <section>
              <h2>Redefining Advaita for Today: From 0 to 1</h2>
              <p>
                The supreme teaching of <strong>Advaita Vedanta</strong> is not a static doctrine to be merely studied, but a dynamic, living truth to be realized. It is the ultimate understanding that the individual self (Atman) is non-different from the ultimate reality (Brahman). 
              </p>
              <p>
                We see this as the journey from '0' (Shunya)—the perceived emptiness of a life rooted in material seeking and intellectual confusion—to '1' (<strong>Purna</strong>)—the recognition of the wholeness, the fullness, the completeness of the Self. It is the profound realization that you are not <em>becoming</em> something new; you are simply <em>awakening</em> to the 'everything' you already are. This isn't a transformation from nothing to something, but the stripping away of illusion to reveal the ever-present reality.
              </p>
            </section>

            <section>
                <h2>Key Concepts</h2>
                <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {keyConcepts.map(concept => (
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
              <h2>The Portal as a Path to a Beautiful Future</h2>
              <p>
                This portal is the practical application of that journey. We take the '0' of countless disconnected articles and scattered schedules, and through reverent curation, we transform it into the '1'—a single, integrated, and trustworthy platform. 
              </p>
              <p>
                Every event on the calendar and every teaching shared is a data point on the sacred map from Shunya to Purna. This platform is more than a seva and a tool in our collective work to build a more beautiful, conscious, and connected world. It is our hope that by providing a clear, accessible path to the authentic lineage, we empower you to not only start your own redefinition of reality but also to become a beacon of light for the future.
              </p>
            </section>
          </article>
        </div>
      </div>
    );
  }
