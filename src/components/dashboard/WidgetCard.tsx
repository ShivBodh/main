import { type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function WidgetCard({ title, icon, children, className }: WidgetCardProps) {
  return (
    <Card className={cn('shadow-md hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card/70', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline text-primary">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
