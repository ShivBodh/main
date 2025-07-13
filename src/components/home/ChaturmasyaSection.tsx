
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const chaturmasyaData = [
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Sadananda Saraswati Ji Maharaj",
        peetham: "Dwaraka Sharada Peetham",
        location: "Paramhansi Ganga Ashram, Narsinghpur, MP",
        discourses: "Discourses on Mundaka Upanishad & Valmiki Ramayana.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/dwarakapeetha-shankaracharya.png",
        bgColor: "from-blue-900 to-blue-700"
    },
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Avimukteshwaranand Saraswati Ji Maharaj",
        peetham: "Jyotirmath Peetham",
        location: "Vazhira Ganesh Mandir, Borivali, Mumbai",
        discourses: "Daily Abhishek of 108 Shivlings, Vedanta classes, evening discourses, and a grand Go Pratishtha Mahayagya.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/jyotishpeetha-shankarachaarya-.png",
        bgColor: "from-purple-900 to-purple-700"
    },
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Nischalananda Saraswati Ji Maharaj",
        peetham: "Govardhana Peetham, Puri",
        location: "Govardhan Math, Puri",
        discourses: "Begins July 3rd with Vyasa Pujan. Daily study of Vedas, Vedanta, Upanishads, and discourses on the Bhagavata.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/puri-peetha-shankaracharya-.png",
        bgColor: "from-red-900 to-red-700"
    },
    {
        acharya: "Jagadguru Sri Sri Bharati Tirtha & Sri Sri Vidhushekhara Bharati Mahaswamiji",
        peetham: "Sringeri Sharada Peetham",
        location: "Sringeri Sharada Peetham",
        discourses: "Vrata begins July 10th. Multilingual discourses from the Puranas streamed daily on YouTube & Facebook.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/sringeri-shankaracharya-.png",
        bgColor: "from-orange-900 to-orange-700"
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {chaturmasyaData.map((item, index) => (
                        <Card key={index} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            <CardHeader className="p-0 relative h-64">
                                <Image
                                    src={item.imageUrl}
                                    alt={`Image of ${item.acharya}`}
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    data-ai-hint="acharya portrait"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${item.bgColor} opacity-60 group-hover:opacity-40 transition-opacity`}></div>
                            </CardHeader>
                            <CardContent className="p-6 flex flex-col flex-grow bg-card">
                                <h3 className="text-lg font-headline font-bold text-primary">{item.acharya}</h3>
                                <p className="text-sm font-semibold text-accent">{item.peetham}</p>
                                <p className="text-sm text-foreground/80 mt-4 flex-grow">{item.discourses}</p>
                                <p className="text-xs font-bold text-muted-foreground mt-4 border-t pt-2">{item.location}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
