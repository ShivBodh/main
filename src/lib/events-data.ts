
import { BookOpen, Shell, Flag, Mountain } from 'lucide-react';

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
    Puri: 'bg-red-500/10 text-red-600 border-red-500/20',
    Jyotirmath: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
};

export const peethamDotColors: Record<Peetham, string> = {
    Sringeri: 'hsl(var(--primary))',
    Dwaraka: 'hsl(var(--accent))',
    Puri: '#dc2626', // red-600
    Jyotirmath: '#3b82f6', // blue-500
};

export const peethamFilterCards = [
    {
        peetham: 'Sringeri' as Peetham,
        icon: BookOpen,
        veda: 'Yajur Veda',
        colorClasses: 'bg-primary/10 border-primary/20 text-primary-foreground',
    },
    {
        peetham: 'Dwaraka' as Peetham,
        icon: Shell,
        veda: 'Sama Veda',
        colorClasses: 'bg-accent/10 border-accent/20 text-accent-foreground',
    },
    {
        peetham: 'Puri' as Peetham,
        icon: Flag,
        veda: 'Rig Veda',
        colorClasses: 'bg-red-500/10 border-red-500/20 text-red-900',
    },
    {
        peetham: 'Jyotirmath' as Peetham,
        icon: Mountain,
        veda: 'Atharva Veda',
        colorClasses: 'bg-blue-500/10 border-blue-500/20 text-blue-900',
    }
]
