
'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Clock, MessageCircle } from "lucide-react";


const chaturmasyaData = [
    {
        acharya: "अनंतश्री विभूषित पश्चिमाम्नाय द्वारकाशारदापीठाधीश्वर जगद्गुरू शंकराचार्य स्वामीश्री सदानन्द सरस्वती जी महाराज",
        location: "परमहंसी गंगा आश्रम श्रीधाम, नरसिंहपुर, मध्यप्रदेश",
        discourses: "मुण्डकोपनिषद्, वाल्मीकि रामायण",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/dwarakapeetha-shankaracharya.png",
        date: { day: '21', month: 'JUL' }
    },
    {
        acharya: "जगदगुरु शंकराचार्य स्वामिश्री: अविमुकेश्वरानंद: सरस्वती जी महाराज",
        location: "वझिरा गणेश मंदिर, बोरीवली, मुंबई",
        discourses: "नित्य वेदांत वर्ग, सायंकालीन प्रवचन, श्री गोप्रतिष्ठा महायज्ञ",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/jyotishpeetha-shankarachaarya-.png",
        date: { day: '09', month: 'JUL' }
    },
    {
        acharya: "अनंत श्री विभूषित गोवर्धन मठ पुरी पीठाधीश्वर जगतगुरु शंकराचार्य स्वामी निश्चलानंद सरस्वती जी महाराज",
        location: "गोवर्धन मठ, पुरी",
        discourses: "वेद वेदांत उपनिषद, भागवत कथा",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/puri-peetha-shankaracharya-.png",
        date: { day: '03', month: 'JUL' }
    },
    {
        acharya: "Jagadguru Shankaracharya Sri Sri Bharati Tirtha Mahaswamiji & Sri Sri Vidhushekhara Bharati Mahaswamiji",
        location: "Sringeri Sharada Peetham",
        discourses: "Multilingual discourses on various topics from the Puranas",
        imageUrl: "https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/sringeri-shankaracharya-.png",
        date: { day: '10', month: 'JUL' }
    }
];

export function ChaturmasyaSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Chaturmasya Vrata 2025</h2>
                     <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                        Authentic news and program details for the sacred Chaturmasya period from the four cardinal Peethams.
                     </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {chaturmasyaData.map((data, index) => (
                             <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                 <div className="swiper-content">
                                    <div className="hero" style={{ backgroundImage: `url(${data.imageUrl})` }}>
                                        <div className="calendar">
                                            <span className="date">{data.date.day}</span>
                                            <span className="month">{data.date.month}</span>
                                        </div>
                                    </div>
                                    <div className="copy">
                                        <h1>{data.acharya}</h1>
                                        <h3>{data.location}</h3>
                                        <p>{data.discourses}</p>
                                        <div className="footer">
                                            <div className="time">
                                            <div><Clock className="h-4 w-4 inline-block mr-1" /> Starts</div>
                                            </div>
                                            <div className="comments">
                                            <div><MessageCircle className="h-4 w-4 inline-block mr-1" /> Discourses</div>
                                            </div>
                                        </div>
                                    </div>
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

