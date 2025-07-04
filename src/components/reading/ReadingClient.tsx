'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { readingList, Book } from '@/lib/reading-data';
import { BookOpen, Download, UploadCloud } from 'lucide-react';
import { generateThumbnail } from '@/ai/flows/thumbnail-generator-flow';

interface BookWithLoading extends Book {
  isLoading: boolean;
}

export default function ReadingClient() {
  const [books, setBooks] = useState<BookWithLoading[]>(
    readingList.map(book => ({ ...book, imageUrl: book.imageUrl || '', isLoading: !book.imageUrl }))
  );

  useEffect(() => {
    const generateCovers = async () => {
      for (const book of books) {
        if (!book.imageUrl) {
          try {
            const result = await generateThumbnail({ prompt: book.aiHint });
            setBooks(prevBooks =>
              prevBooks.map(b =>
                b.id === book.id ? { ...b, imageUrl: result.imageUrl, isLoading: false } : b
              )
            );
          } catch (error) {
            console.error(`Failed to generate cover for ${book.title}:`, error);
            // Use a placeholder if generation fails and stop loading
            setBooks(prevBooks =>
              prevBooks.map(b =>
                b.id === book.id ? { ...b, imageUrl: 'https://placehold.co/400x600.png', isLoading: false } : b
              )
            );
          }
        }
      }
    };

    generateCovers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div className="relative aspect-[2/3] w-full bg-card">
              {book.isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <Image
                  src={book.imageUrl}
                  alt={`Cover for ${book.title}`}
                  fill
                  className="object-cover"
                />
              )}
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
                  <Button asChild className="w-full" size="sm">
                    <Link href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      View PDF
                    </Link>
                  </Button>
                </CardFooter>
            </div>
          </Card>
        ))}
      </div>
       <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-card rounded-lg border flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-headline font-bold text-primary flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6" /> A Note on These Texts
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                The sacred works listed here are foundational to Advaita Vedanta. For a complete understanding, it is always recommended to study them under the guidance of a qualified Guru.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
                Please note: The "View PDF" links are placeholders. You will need to replace these links with your own PDF files.
            </p>
        </div>
        <div className="p-8 bg-card rounded-lg border flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-headline font-bold text-primary flex items-center justify-center gap-2">
                <UploadCloud className="h-6 w-6" /> Contribute to the Library
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                Help us grow this sacred library. If you have a PDF of a book by an Acharya of the Shankara lineage, you can submit it for review.
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
