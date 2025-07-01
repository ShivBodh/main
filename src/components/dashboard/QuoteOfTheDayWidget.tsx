import * as React from 'react';
import { Quote } from 'lucide-react';
import { selectWisdomSnippet } from '@/ai/flows/select-wisdom-snippet';
import { WidgetCard } from './WidgetCard';
import { Skeleton } from '@/components/ui/skeleton';

async function QuoteContent() {
  try {
    const { quote, author, peetham } = await selectWisdomSnippet({
      date: new Date().toISOString(),
    });

    return (
      <div className="space-y-4">
        <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/90">
          "{quote}"
        </blockquote>
        <div className="text-right">
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{peetham}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching wisdom snippet:', error);
    return <p className="text-destructive text-sm">Could not load the quote of the day. Please try again later.</p>;
  }
}

export function QuoteOfTheDayWidget() {
  return (
    <WidgetCard title="Quote of the Day" icon={<Quote className="w-5 h-5" />}>
      <React.Suspense fallback={<QuoteSkeleton />}>
        <QuoteContent />
      </React.Suspense>
    </WidgetCard>
  );
}

function QuoteSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex flex-col items-end space-y-2 mt-4">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  );
}
