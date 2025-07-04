import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, icons } from 'lucide-react';
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Four Peethams | Sanatana Peethams Portal',
  description: 'Explore the four cardinal Peethams established by Adi Shankaracharya: Sringeri, Dwaraka, Puri, and Jyotirmath. Learn about their history, teachings, and significance.',
};

// Helper component for dynamic icons
const LucideIcon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  const Icon = icons[name as keyof typeof icons];
  if (!Icon) {
    return null;
  }
  return <Icon {...props} />;
};


export default function PeethamsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
        <div className="text-center mb-16">
          <div className="mb-8">
            <Image
              src="https://lightcoral-echidna-355938.hostingersite.com/wp-content/uploads/2025/07/aadi-guru.png"
              alt="Jagadguru Adi Shankaracharya"
              width={150}
              height={150}
              className="mx-auto object-cover aspect-square rounded-full"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
            The Four Pillars of Sanatana Dharma
          </h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Established by Jagadguru Adi Shankaracharya, these four Peethams serve as the cardinal institutions for the preservation and propagation of Advaita Vedanta. Each stands as a beacon of spiritual wisdom, guiding seekers for over a millennium and upholding the sacred traditions of Sanatana Dharma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {peethams.map((peetham: any) => (
            <Card key={peetham.name} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
              <div className="w-full h-64 bg-secondary/20 flex items-center justify-center">
                {peetham.icon ? (
                  <LucideIcon name={peetham.icon} className="w-32 h-32 text-primary/50" />
                ) : (
                  <Image src={peetham.image} alt={peetham.name} width={600} height={400} className="w-full h-full object-cover" />
                )}
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{peetham.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80">{peetham.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={peetham.link}>
                    Explore {peetham.name.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
