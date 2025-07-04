
'use client';

import { useState, useMemo } from 'react';
import type { Book, Verse } from '@/lib/reading-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Gem } from 'lucide-react';

const VERSES_PER_PAGE = 3;

export default function BookReaderClient({ book }: { book: Book }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate-page-flip-in');

  const totalPages = useMemo(() => {
    if (!book.content) return 0;
    return Math.ceil(book.content.length / VERSES_PER_PAGE);
  }, [book.content]);

  const currentVerses = useMemo(() => {
    if (!book.content) return [];
    const start = currentPage * VERSES_PER_PAGE;
    const end = start + VERSES_PER_PAGE;
    return book.content.slice(start, end);
  }, [book.content, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return;

    setAnimationClass('animate-page-flip-out');
    setTimeout(() => {
      setCurrentPage(newPage);
      setAnimationClass('animate-page-flip-in');
    }, 300); // Duration should match animation
  };

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
        <Card className="shadow-2xl border w-full animate-in fade-in duration-500">
          <CardHeader className="text-center bg-card rounded-t-lg p-8">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
              {book.title}
            </h1>
            <p className="mt-2 text-lg font-semibold text-muted-foreground">
              by {book.author}
            </p>
          </CardHeader>
          
          <div className="p-8 sm:p-12 md:p-16 bg-background">
            <div className={`transition-all duration-300 ${animationClass}`}>
              {currentVerses.map((verse, index) => (
                <div key={verse.number}>
                  <div className="text-center mb-6">
                    <p className="font-bold text-primary text-xl">Verse {verse.number}</p>
                    <p className="mt-4 text-3xl font-headline leading-relaxed tracking-wide" lang="sa">
                      {verse.sanskrit.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-6">
                    <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary/50">
                      <h3 className="font-semibold text-lg text-primary/90 mb-2 font-headline">Hindi Meaning</h3>
                      <p className="text-foreground/80 leading-relaxed" lang="hi">{verse.hindi}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-accent/50">
                      <h3 className="font-semibold text-lg text-accent/90 mb-2 font-headline">English Meaning</h3>
                      <p className="text-foreground/80 leading-relaxed">{verse.english}</p>
                    </div>
                  </div>
                  {index < currentVerses.length - 1 && <Separator className="my-12" />}
                </div>
              ))}
            </div>
          </div>
          
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between p-6 bg-card rounded-b-lg border-t">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              variant="outline"
            >
              <ArrowLeft className="mr-2" /> Previous Page
            </Button>
            <p className="text-sm text-muted-foreground my-4 sm:my-0">
              Page {currentPage + 1} of {totalPages}
            </p>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              variant="outline"
            >
              Next Page <ArrowRight className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
        
        <footer className="mt-16 text-center border-t pt-8">
          <Gem className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            A Seva by the ShivBodh Group
          </p>
        </footer>
      </div>
    </div>
  );
}
