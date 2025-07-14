
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, SunMoon, Atom, Users, Megaphone, NotebookText, TestTube2, Laptop, Smartphone } from 'lucide-react';
import { PanchangaWidgetPreview } from '@/components/home/PanchangaWidgetPreview';
import Image from 'next/image';
import { FeatureShowcase } from '@/components/home/FeatureShowcase';
import { HeroSection } from '@/components/home/HeroSection';
import { ChaturmasyaSection } from '@/components/home/ChaturmasyaSection';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Chaturmasya Section */}
      <ChaturmasyaSection />

      {/* Peethams Section */}
      <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
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
               <div className="flex justify-center items-center md:order-1">
                 <div className="relative w-full max-w-[600px] aspect-[3/2]">
                  <Image
                      src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru-from-shivbodha-.png"
                      alt="An artistic representation of Adi Shankaracharya"
                      width={600}
                      height={400}
                      className="rounded-lg object-contain shadow-lg"
                  />
                  </div>
                </div>
          </div>
      </section>

      {/* Social Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center">
             <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                 <Image
                    src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/shivala-social-icon.gif"
                    alt="Sanatan Social Animated Logo"
                    width={300}
                    height={300}
                    unoptimized
                    className="rounded-full"
                 />
             </div>
            </div>
            <div>
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
            <div className="md:order-2">
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
            <div className="flex justify-center items-center md:order-1">
              <div className="relative w-full max-w-md aspect-square group bg-background/50 rounded-2xl shadow-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-8 text-center">
                  <div className="flex items-center justify-center space-x-4 text-primary/80">
                      <BookOpen className="h-16 w-16 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" style={{animationDelay: '0s'}} />
                      <Smartphone className="h-20 w-20 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" style={{animationDelay: '0.2s'}} />
                      <Laptop className="h-16 w-16 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" style={{animationDelay: '0.4s'}} />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mt-6 text-primary">A New Way to Learn</h3>
                  <p className="text-muted-foreground mt-2">Interactive courses and learning modules.</p>
                  <Badge variant="secondary" className="mt-4">Launching Soon</Badge>
              </div>
            </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <FeatureShowcase />
      
      {/* Panchanga Widgets Section */}
      <PanchangaWidgetPreview />
    </>
  );
}
