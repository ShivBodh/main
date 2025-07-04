
export type Peetham = 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath';

export type Event = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  peetham: Peetham;
  description: string;
  category: string;
  story?: string;
  references?: string[];
};

export const allEvents: Event[] = [];

export const peethamBadgeColors: Record<Peetham, string> = {
    Sringeri: 'bg-primary/10 text-primary border-primary/20',
    Dwaraka: 'bg-accent/10 text-accent border-accent/20',
    Puri: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    Jyotirmath: 'bg-muted text-muted-foreground border-border',
};

export const peethamDotColors: Record<Peetham, string> = {
    Sringeri: 'hsl(var(--primary))',
    Dwaraka: 'hsl(var(--accent))',
    Puri: 'hsl(var(--secondary-foreground))',
    Jyotirmath: 'hsl(var(--muted-foreground))',
};
