import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { readingList } from '@/lib/reading-data';
import { BookOpen, Download } from 'lucide-react';

export default function ReadingPage() {
  return (
    <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Reading Room
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          A curated library of foundational texts by Jagadguru Adi Shankaracharya. Immerse yourself in the timeless wisdom of Advaita Vedanta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {readingList.map((book) => (
          <Card key={book.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-64 w-full">
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                className="object-cover"
                data-ai-hint={book.aiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground/80">{book.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  View PDF
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="mt-16 text-center max-w-3xl mx-auto p-8 bg-card rounded-lg border">
            <h2 className="text-2xl font-headline font-bold text-primary flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6" /> A Note to the Reader
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                The texts provided here are for educational and spiritual enrichment. For a deeper understanding, it is always recommended to study these sacred works under the guidance of a qualified Guru. The links currently point to placeholder documents.
            </p>
        </div>
    </div>
  );
}
