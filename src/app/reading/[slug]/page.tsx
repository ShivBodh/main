
import { readingList } from '@/lib/reading-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BookReaderClient from '@/components/reading/BookReaderClient';

// This is the corrected type definition for the page props.
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

  return <BookReaderClient book={book} />;
}

export async function generateStaticParams() {
    return readingList.map((book) => ({
      slug: book.id,
    }));
}
