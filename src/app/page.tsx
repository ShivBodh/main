
import { HeroSection } from '@/components/home/HeroSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, SunMoon, Atom, Users, Megaphone, NotebookText } from 'lucide-react';
import type { Metadata } from 'next';
import { PanchangaWidgetPreview } from '@/components/home/PanchangaWidgetPreview';

export const metadata: Metadata = {
  // The title and description will be inherited from the RootLayout,
  // which is appropriate for the main homepage.
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Peethams Section */}
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
                            Explore the Peethams <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative w-full max-w-[600px]">
                    <img 
                        src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru-from-shivbodha-.png"
                        alt="An artistic representation of Jagadguru Adi Shankaracharya."
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-lg w-full h-auto"
                    />
                </div>
              </div>
          </div>
      </section>

      {/* Social Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center order-last md:order-first">
             <div className="relative w-full max-w-[600px]">
              <Image 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&h=400&fit=crop"
                  alt="A diverse group of people collaborating and connecting."
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                  data-ai-hint="community spiritual"
              />
              </div>
            </div>
            <div className="md:order-last">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Sanatan Social: A Community for Dharma</h2>
                <p className="mt-4 text-lg text-foreground/80">
                    Join a private, secure platform for devotees to connect, share knowledge, and support dharmic causes. Create your profile, write in your personal Dainandini (diary), and launch campaigns that matter.
                </p>
                <ul className="mt-4 space-y-2 text-foreground/80">
                    <li className="flex items-center gap-3"><Users className="h-5 w-5 text-accent"/><span>Community Feed & Mitra Connections</span></li>
                    <li className="flex items-center gap-3"><Megaphone className="h-5 w-5 text-accent"/><span>Dharmic Campaign Support</span></li>
                    <li className="flex items-center gap-3"><NotebookText className="h-5 w-5 text-accent"/><span>Private Digital Diary (Dainandini)</span></li>
                </ul>
                 <Button asChild size="lg" className="mt-8">
                      <Link href="/social">
                          Join the Community <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
            </div>
        </div>
      </section>

      {/* Bodha Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Bodha: Your Knowledge & Sādhanā Suite</h2>
                <p className="mt-4 text-lg text-foreground/80">
                    Deepen your understanding and support your daily spiritual practice with our integrated suite of tools and resources. Everything you need for learning and practice, all in one place.
                </p>
                <ul className="mt-4 space-y-2 text-foreground/80">
                    <li className="flex items-center gap-3"><Calendar className="h-5 w-5 text-accent"/><span>Unified Bodha Calendar of Events & Media</span></li>
                    <li className="flex items-center gap-3"><SunMoon className="h-5 w-5 text-accent"/><span>Daily Regional Panchanga</span></li>
                    <li className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-accent"/><span>Library of Sacred Texts</span></li>
                    <li className="flex items-center gap-3"><Atom className="h-5 w-5 text-accent"/><span>Japa Counter & Meditation Timer</span></li>
                </ul>
                 <Button asChild size="lg" className="mt-8">
                      <Link href="/events">
                          Explore Bodha <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[600px]">
              <Image 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&h=400&fit=crop"
                  alt="A library of ancient books representing spiritual knowledge."
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                  data-ai-hint="spiritual knowledge"
              />
              </div>
            </div>
        </div>
      </section>
      
      {/* Panchanga Widgets Section */}
      <PanchangaWidgetPreview />
    </>
  );
}
