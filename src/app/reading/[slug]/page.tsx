
import { readingList } from '@/lib/reading-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          {book.title}
        </h1>
        <p className="mt-2 text-lg font-semibold text-muted-foreground">
          by {book.author}
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>About this Text</CardTitle>
            <CardDescription>{book.description}</CardDescription>
        </CardHeader>
        <CardContent>
            {book.content.map((verse, index) => (
                <div key={verse.number}>
                    <div className="my-8">
                        <div className="text-center mb-4">
                            <p className="text-2xl font-headline leading-relaxed" lang="sa">
                                {verse.sanskrit.map((line, i) => (
                                    <span key={i} className="block">{line}</span>
                                ))}
                            </p>
                            <p className="mt-2 font-bold text-primary">Verse {verse.number}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-center md:text-left">
                            <div>
                                <h3 className="font-semibold text-lg text-foreground/90 mb-1">Hindi Meaning</h3>
                                <p className="text-foreground/80" lang="hi">{verse.hindi}</p>
                            </div>
                             <div>
                                <h3 className="font-semibold text-lg text-foreground/90 mb-1">English Meaning</h3>
                                <p className="text-foreground/80">{verse.english}</p>
                            </div>
                        </div>
                    </div>
                    {index < book.content!.length - 1 && <Separator />}
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
    return readingList.map((book) => ({
      slug: book.id,
    }));
}
