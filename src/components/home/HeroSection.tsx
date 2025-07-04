'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const heroSlides = [
  {
    title: 'The Eternal Lineage, Unified',
    description: 'Explore the authentic teachings and rich history of the four cardinal Peethams established by Adi Shankaracharya.',
    buttonText: 'Explore the Peethams',
    buttonLink: '/peethams'
  },
  {
    title: 'Connect with the Community',
    description: 'Join Sanatan Social, our dedicated platform to connect with devotees, share your journey, and support dharmic causes.',
    buttonText: 'Enter Sanatan Social',
    buttonLink: '/social'
  },
  {
    title: 'A Living Archive of Dharma',
    description: 'Discover daily events, discourses, and media from the four Peethams in the comprehensive Bodha Calendar.',
    buttonText: 'View Bodha Calendar',
    buttonLink: '/events'
  },
  {
    title: 'Tools for Your Spiritual Practice',
    description: 'Enhance your daily Sādhanā with our suite of tools, including a Japa Counter, Meditation Timer, and Daily Wisdom.',
    buttonText: 'Visit Sādhanā Suite',
    buttonLink: '/sadhana'
  }
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-muted/30 bg-[length:200%_200%] animate-gradient-pan z-0"></div>
      <div className="container mx-auto text-center px-4 relative z-10">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center justify-center min-h-[30vh] md:min-h-[40vh]">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter animate-in fade-in slide-in-from-bottom-10 duration-700">
                      {slide.title}
                    </h1>
                    <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-foreground/80 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                      {slide.description}
                    </p>
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                      <Button asChild size="lg">
                        <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
