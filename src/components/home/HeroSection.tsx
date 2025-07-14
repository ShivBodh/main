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
import Image from 'next/image';

const heroSlides = [
  {
    title: 'Sanatan Social: The Global Hub for Sanatanis',
    description: 'Connect, share, and grow with a community of believers on a platform built for Dharma. Create your profile and start a campaign today.',
    buttonText: 'Join the Community',
    buttonLink: '/social'
  },
  {
    title: 'The Shankaracharya Encyclopedia',
    description: 'Explore the timeless wisdom of the four Peethams. A searchable, structured knowledge base on the life and teachings of the great Acharyas.',
    buttonText: 'Explore the Peethams',
    buttonLink: '/peethams'
  },
    {
    title: 'Your Daily Spiritual Companion',
    description: 'Access the daily Panchanga, read sacred texts in the Reading Room, and use tools to support your Sādhanā.',
    buttonText: 'View Daily Panchanga',
    buttonLink: '/panchanga'
  },
  {
    title: 'Build the Future of Dharma',
    description: 'Start campaigns, join discussions, and contribute to a unified digital home for Sanatana Dharma.',
    buttonText: 'Start a Campaign',
    buttonLink: '/social?tab=campaigns'
  }
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden bg-background">
      <Image
        src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru-hero-banner-1-scaled.png"
        alt="Adi Shankaracharya meditating"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
       <div className="absolute inset-0 flex items-center justify-center z-20">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 opacity-20 animate-diamond-spin">
              <g className="animate-diamond-light-up">
                  <path d="M50 2 L98 50 L50 98 L2 50 Z" strokeWidth="0.5" fill="none" />
                  <path d="M50 2 L50 98" strokeWidth="0.25" fill="none" />
                  <path d="M2 50 L98 50" strokeWidth="0.25" fill="none" />
                  <path d="M25 25 L75 75" strokeWidth="0.1" fill="none" />
                  <path d="M75 25 L25 75" strokeWidth="0.1" fill="none" />
                  <path d="M50 15 L85 50 L50 85 L15 50 Z" strokeWidth="0.5" fill="none" />
                  <path d="M50 2 L50 15" strokeWidth="0.25" fill="none" />
                  <path d="M2 50 L15 50" strokeWidth="0.25" fill="none" />
                  <path d="M98 50 L85 50" strokeWidth="0.25" fill="none" />
                  <path d="M50 98 L50 85" strokeWidth="0.25" fill="none" />
                  <path d="M15 50 L25 25 L50 15 L75 25 L85 50 L75 75 L50 85 L25 75 Z" strokeWidth="0.25" fill="none" />
              </g>
          </svg>
       </div>
      <div className="container mx-auto text-center px-4 relative z-30">
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
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter text-shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-700">
                      {slide.title}
                    </h1>
                    <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-foreground/90 text-shadow-md animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
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
