
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
    title: 'Sanatan Social: A New Digital Home for Dharma',
    description: 'Introducing the first social media platform built exclusively for followers of Sanatana Dharma. Connect, share, and grow with a global community of believers.',
    buttonText: 'Join the Community',
    buttonLink: '/social'
  },
  {
    title: 'Your Personal Dainandini: A Digital Diary for the Soul',
    description: 'Privately record your daily thoughts, tasks, and spiritual reflections. A modern tool for the ancient practice of self-observation.',
    buttonText: 'Start Your Diary',
    buttonLink: '/social?tab=dainandini'
  },
    {
    title: 'Launch Dharmic Campaigns: Be a Catalyst for Change',
    description: 'Start movements for causes that matter. Rally support for temple restoration, cow protection, or spreading Vedic knowledge in your community.',
    buttonText: 'Start a Campaign',
    buttonLink: '/social?tab=campaigns'
  },
  {
    title: 'A Living Archive of Dharma',
    description: 'Discover daily events, discourses, and media from the four Peethams in the comprehensive Bodha Calendar.',
    buttonText: 'View Bodha Calendar',
    buttonLink: '/events'
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
