
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { readingList } from '@/lib/reading-data';
import { BookOpen, UploadCloud } from 'lucide-react';
import { AiImage } from '@/components/common/AiImage';

// We can't use generateMetadata in a Client Component,
// but we can manage the title through other means if needed.
// For now, we'll keep a static title for the main library page.

export default function ReadingPage() {
  const book = readingList[0]; // We are focusing on Bhaja Govindam

  return (
    <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Reading Room
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          Immerse yourself in the timeless wisdom of Advaita Vedanta. We begin our collection with the profound hymn, Bhaja Govindam.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <Card key={book.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div className="relative aspect-[2/3] w-full bg-card">
              <AiImage
                data-ai-hint={book.aiHint}
                width={400}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
             <div className="flex flex-col flex-grow p-4">
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-lg group-hover:text-accent transition-colors">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-1">by {book.author}</p>
                </CardHeader>
                <CardContent className="p-0 pt-3 flex-grow">
                  <p className="text-foreground/80 text-sm line-clamp-3">{book.description}</p>
                </CardContent>
                <CardFooter className="p-0 pt-4">
                  <Button asChild className="w-full">
                    <Link href={`/reading/${book.id}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Now
                    </Link>
                  </Button>
                </CardFooter>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-card rounded-lg border flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-headline font-bold text-primary flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6" /> A Note on These Texts
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                The sacred works presented here are foundational to Advaita Vedanta. For a complete understanding, it is always recommended to study them under the guidance of a qualified Guru.
            </p>
        </div>
        <div className="p-8 bg-card rounded-lg border flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-headline font-bold text-primary flex items-center justify-center gap-2">
                <UploadCloud className="h-6 w-6" /> Contribute to the Library
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                Help us grow this sacred library. If you have a PDF or a well-formatted text of a book by an Acharya of the Shankara lineage, you can submit it for review.
            </p>
            <Button asChild className="mt-6">
                <Link href="/reading/upload">
                    Upload a Book
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
