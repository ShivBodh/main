import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser } from 'lucide-react';

interface Acharya {
  name: string;
  period: string;
  description: string;
}

interface LineageTimelineProps {
  lineage: Acharya[];
}

export function LineageTimeline({ lineage }: LineageTimelineProps) {
  if (!lineage || lineage.length === 0) {
    return <p className="text-muted-foreground">Lineage information is not available.</p>;
  }

  return (
    <div className="relative pl-8 before:absolute before:inset-y-0 before:w-px before:bg-border before:left-0">
      {lineage.map((acharya, index) => (
        <div key={index} className="relative mb-8">
          <div className="absolute top-0 -left-[3.2rem] flex h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-primary">
            <BookUser className="h-4 w-4 text-primary" />
          </div>
          <Card className="ml-4 border-l-4 border-primary/50">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{acharya.name}</CardTitle>
              <p className="text-sm font-semibold text-muted-foreground">{acharya.period}</p>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{acharya.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
