import { Lightbulb, ExternalLink } from 'lucide-react';
import { suggestLearningContent } from '@/ai/flows/suggest-learning-content';
import { WidgetCard } from './WidgetCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import * as React from 'react';

const viewingHistory = [
    'Introduction to Vedanta', 
    'The Concept of Dharma',
    'Karma Yoga in the Bhagavad Gita'
];

async function SuggestionsContent() {
  try {
    const { suggestions } = await suggestLearningContent({ viewingHistory });
    
    if (!suggestions || suggestions.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">No learning suggestions available right now.</p>;
    }

    return (
      <div className="space-y-4">
        {suggestions.map((item, index) => (
          <div key={index} className="p-3 rounded-lg bg-background hover:bg-muted/80 transition-colors duration-200">
            <Link href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold group flex items-center gap-2 text-accent-foreground/80 hover:text-primary">
              {item.title}
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching learning suggestions:', error);
    return <p className="text-destructive">Could not load suggestions.</p>;
  }
}

export function ContinueLearningWidget() {
  return (
    <WidgetCard title="Continue Learning" icon={<Lightbulb className="w-5 h-5" />}>
      <p className="text-sm text-muted-foreground -mt-4 mb-4">Based on your viewing history.</p>
      <React.Suspense fallback={<LearningSkeleton />}>
        <SuggestionsContent />
      </React.Suspense>
    </WidgetCard>
  );
}

function LearningSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2 p-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                </div>
            ))}
        </div>
    );
}
