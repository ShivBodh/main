
import { readingList } from '@/lib/reading-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Gem } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = readingList.find((p) => p.id === params.slug);

  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} | Reading Room`,
    description: `Read ${book.title} by ${book.author}. ${book.description}`,
  };
}

export default function BookReaderPage({ params }: Props) {
  const book = readingList.find((b) => b.id === params.slug);

  if (!book || !book.content) {
    notFound();
  }

  return (
    <div className="bg-muted/30">
      <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
        <div className="bg-card p-8 sm:p-12 md:p-16 rounded-lg shadow-2xl border animate-in fade-in duration-500">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
              {book.title}
            </h1>
            <p className="mt-2 text-lg font-semibold text-muted-foreground">
              by {book.author}
            </p>
            <Separator className="my-6 max-w-sm mx-auto" />
            <p className="text-base text-foreground/80 max-w-2xl mx-auto">{book.description}</p>
          </header>

          <main>
            {book.content.map((verse, index) => (
                <div key={verse.number} className="mb-12">
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
                    {index < book.content!.length - 1 && <Separator className="my-12" />}
                </div>
            ))}
          </main>

          <footer className="mt-16 text-center border-t pt-8">
                <Gem className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                    A Seva by the ShivBodh Group
                </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return readingList.map((book) => ({
      slug: book.id,
    }));
}
