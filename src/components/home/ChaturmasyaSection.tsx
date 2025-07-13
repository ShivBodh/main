
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const chaturmasyaData = [
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Sadananda Saraswati Ji Maharaj",
        peetham: "Dwaraka Sharada Peetham",
        location: "Paramhansi Ganga Ashram, Narsinghpur, MP",
        discourses: "Discourses on Mundaka Upanishad & Valmiki Ramayana.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/dwarakapeetha-shankaracharya.png",
        bgColor: "#003366" // Deep Blue
    },
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Avimukteshwaranand Saraswati Ji Maharaj",
        peetham: "Jyotirmath Peetham",
        location: "Vazhira Ganesh Mandir, Borivali, Mumbai",
        discourses: "Daily Abhishek of 108 Shivlings, Vedanta classes, evening discourses, and a grand Go Pratishtha Mahayagya.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/jyotishpeetha-shankarachaarya-.png",
        bgColor: "#4a148c" // Purple
    },
    {
        acharya: "Jagadguru Shankaracharya Swami Sri Nischalananda Saraswati Ji Maharaj",
        peetham: "Govardhana Peetham, Puri",
        location: "Govardhan Math, Puri",
        discourses: "Begins July 3rd with Vyasa Pujan. Daily study of Vedas, Vedanta, Upanishads, and discourses on the Bhagavata.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/puri-peetha-shankaracharya-.png",
        bgColor: "#b71c1c" // Deep Red
    },
    {
        acharya: "Jagadguru Sri Sri Bharati Tirtha & Sri Sri Vidhushekhara Bharati Mahaswamiji",
        peetham: "Sringeri Sharada Peetham",
        location: "Sringeri Sharada Peetham",
        discourses: "Vrata begins July 10th. Multilingual discourses from the Puranas streamed daily on YouTube & Facebook.",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/sringeri-shankaracharya-.png",
        bgColor: "#e65100" // Orange
    }
];

export function ChaturmasyaSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % chaturmasyaData.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + chaturmasyaData.length) % chaturmasyaData.length);
    };

    return (
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Chaturmasya Vrata 2025</h2>
                     <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                        Authentic program details for the sacred Chaturmasya period from the four cardinal Peethams.
                     </p>
                </div>
                
                <div className="layer-slider relative w-full max-w-4xl mx-auto aspect-[16/9] perspective-[1000px]">
                    <div className="absolute inset-0 transition-all duration-300" style={{ transform: `translateZ(calc(var(--tz) * 1px)) perspective(1000px)` }}>
                    {chaturmasyaData.map((item, index) => {
                        const isActive = index === activeIndex;
                        const classState = isActive ? 'active' : index < activeIndex ? 'prev' : 'next';
                        return (
                            <div 
                                key={index}
                                className={`layer-slider-item absolute inset-0 transition-all duration-700 ease-in-out ${classState}`}
                                style={{ '--bg-color': item.bgColor } as React.CSSProperties}
                            >
                                <div className="layer-slider-bg absolute inset-0 bg-[var(--bg-color)]"></div>
                                <div className="layer-slider-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.imageUrl})`}}></div>
                                <div className="layer-slider-content absolute inset-0 flex flex-col justify-end p-8 text-white bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-2xl lg:text-3xl font-headline font-bold text-shadow-lg">{item.acharya}</h3>
                                    <p className="text-lg font-semibold text-primary-foreground/90 text-shadow-md">{item.peetham}</p>
                                    <p className="mt-2 text-md leading-snug max-w-2xl">{item.discourses}</p>
                                    <p className="mt-1 font-bold text-accent-foreground/80">{item.location}</p>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                     <Button 
                        onClick={handlePrev} 
                        className="layer-slider-prev absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10"
                        variant="secondary"
                        size="icon"
                     >
                        &lt;
                     </Button>
                     <Button 
                        onClick={handleNext}
                        className="layer-slider-next absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10"
                        variant="secondary"
                        size="icon"
                     >
                        &gt;
                     </Button>
                </div>
            </div>
        </section>
    );
}
