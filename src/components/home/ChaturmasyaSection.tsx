
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const chaturmasyaData = [
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Sadananda Saraswati Ji Maharaj",
        peetham: "Dwaraka Sharada Peetham",
        location: "Paramhansi Ganga Ashram, Narsinghpur, MP",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Paramhansi+Ganga+Ashram,+Narsinghpur,+MP",
        discourses: "Discourses on Mundaka Upanishad & Valmiki Ramayana.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/dwarakapeetha-shankaracharya.png",
    },
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Avimukteshwaranand Saraswati Ji Maharaj",
        peetham: "Jyotirmath Peetham",
        location: "Vazhira Ganesh Mandir, Borivali, Mumbai",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Vazhira+Ganesh+Mandir,+Borivali,+Mumbai",
        discourses: "Daily Abhishek of 108 Shivlings, Vedanta classes, evening discourses, and a grand Go Pratishtha Mahayagya.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/jyotishpeetha-shankarachaarya-.png",
    },
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Nischalananda Saraswati Ji Maharaj",
        peetham: "Govardhana Peetham, Puri",
        location: "Govardhan Math, Puri",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Govardhan+Math,+Puri",
        discourses: "Begins July 3rd with Vyasa Pujan. Daily study of Vedas, Vedanta, Upanishads, and discourses on the Bhagavata.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/puri-peetha-shankaracharya-.png",
    },
    {
        acharya: "Jagadguru Sri Sri Bharati Tirtha & Sri Sri Vidhushekhara Bharati Mahaswamiji",
        peetham: "Sringeri Sharada Peetham",
        location: "Sringeri Sharada Peetham",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Sringeri+Sharada+Peetham",
        discourses: "Vrata begins July 10th. Multilingual discourses from the Puranas streamed daily on YouTube & Facebook.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/sringeri-shankaracharya-.png",
    }
];

export function ChaturmasyaSection() {
    return (
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="container mx-auto">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Chaturmasya Vrata 2025</h2>
                    <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                        Authentic program details for the sacred Chaturmasya period from the four cardinal Peethams.
                    </p>
                    {/* SEO Keywords */}
                    <div className="hidden">
                        Chaturmasya 2025, Shankaracharya Programs, Sringeri, Dwaraka, Puri, Jyotirmath, Vedic teachings, Sanatana Dharma events, spiritual discourses.
                    </div>
                </div>
                
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-sm sm:max-w-xl md:max-w-4xl lg:max-w-6xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {chaturmasyaData.map((item, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="flex flex-col h-[450px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                        <CardHeader className="bg-primary p-4 h-28 relative rounded-t-xl"></CardHeader>
                                        <CardContent className="flex flex-col items-center text-center p-6 pt-0 relative flex-grow">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={`Image of ${item.acharya}`}
                                                    width={128}
                                                    height={128}
                                                    className="rounded-full border-4 border-background bg-background object-contain w-32 h-32 shadow-lg"
                                                    data-ai-hint="acharya portrait"
                                                />
                                            </div>
                                            <div className="mt-16 text-center">
                                                <h3 className="text-lg font-headline font-bold text-primary">{item.acharya}</h3>
                                                <p className="text-sm font-semibold text-accent">{item.peetham}</p>
                                            </div>
                                            <p className="text-sm text-foreground/80 mt-3 flex-grow">{item.discourses}</p>
                                            <div className="w-full mt-auto">
                                                <Link href={item.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground mt-4 hover:text-primary transition-colors">
                                                    <MapPin className="h-3 w-3" />
                                                    {item.location}
                                                </Link>
                                                <Button asChild variant="outline" size="sm" className="w-full mt-4">
                                                    <Link href="/events">View More</Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>
    );
}
