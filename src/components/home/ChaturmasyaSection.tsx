
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

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
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/20 via-sky-50/10 to-transparent">
            <div className="container mx-auto text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Chaturmasya Vrata 2025</h2>
                 <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                    Authentic program details for the sacred Chaturmasya period from the four cardinal Peethams.
                 </p>
                 {/* SEO Keywords */}
                 <div className="hidden">
                    Chaturmasya 2025, Shankaracharya Programs, Sringeri, Dwaraka, Puri, Jyotirmath, Vedic teachings, Sanatana Dharma events, spiritual discourses.
                 </div>
            </div>
            
            <div className="relative w-full overflow-hidden group">
                <div className="flex space-x-16 animate-autoscroll group-hover:[animation-play-state:paused]">
                    {/* We need to duplicate the items for a seamless loop */}
                    {[...chaturmasyaData, ...chaturmasyaData].map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-80 flex flex-col items-center text-center">
                            <div className="relative h-80 w-80">
                                <Image
                                    src={item.imageUrl}
                                    alt={`Image of ${item.acharya}`}
                                    width={320}
                                    height={320}
                                    className="object-contain w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                                    data-ai-hint="acharya portrait"
                                />
                            </div>
                            <div className="mt-4 px-4">
                                <h3 className="text-lg font-headline font-bold text-primary">{item.acharya}</h3>
                                <p className="text-sm font-semibold text-accent">{item.peetham}</p>
                                <Link href={item.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground mt-2 hover:text-primary transition-colors">
                                    <MapPin className="h-3 w-3" />
                                    {item.location}
                                </Link>
                                <p className="text-sm text-foreground/80 mt-2">{item.discourses}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent via-50% to-background pointer-events-none"></div>
            </div>
        </section>
    );
}
