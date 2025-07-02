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
            <div className="relative h-96 w-full bg-card">
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                className="object-contain p-4"
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
                <BookOpen className="h-6 w-6" /> A Note on These Texts
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                The sacred works listed here are foundational to Advaita Vedanta. For a complete understanding, it is always recommended to study them under the guidance of a qualified Guru.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
                Please note: The "View PDF" links are placeholders. As an AI, I cannot provide or host copyrighted documents. You will need to replace these links with your own PDF files.
            </p>
        </div>
    </div>
  );
}
