"use client";

import { useState, type ReactNode } from 'react';
import { BookOpenText, BrainCircuit, Flame, Repeat, ScrollText, Waves } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type PracticeType = 'Japa' | 'Scripture Reading' | 'Meditation' | 'Chanting';

interface Practice {
  id: number;
  name: PracticeType;
  icon: ReactNode;
  completed: boolean;
  streak: number;
  time?: number; 
}

const initialPractices: Practice[] = [
  { id: 1, name: 'Japa', icon: <Repeat className="w-5 h-5 text-accent" />, completed: true, streak: 12, time: 20 },
  { id: 2, name: 'Scripture Reading', icon: <BookOpenText className="w-5 h-5 text-accent" />, completed: false, streak: 3, time: 30 },
  { id: 3, name: 'Meditation', icon: <BrainCircuit className="w-5 h-5 text-accent" />, completed: true, streak: 28, time: 15 },
  { id: 4, name: 'Chanting', icon: <Waves className="w-5 h-5 text-accent" />, completed: false, streak: 0, time: 10 },
];

export function DailyPracticeWidget() {
  const [practices, setPractices] = useState<Practice[]>(initialPractices);

  const handleToggleCompletion = (id: number) => {
    // In a real app, you would update this in Firestore.
    setPractices(practices.map(p => {
      if (p.id === id) {
        const wasCompleted = p.completed;
        const isCompleted = !wasCompleted;
        // A simple streak logic: increments on completion, decrements on un-checking.
        const streak = isCompleted ? p.streak + 1 : (p.streak > 0 ? p.streak - 1 : 0);
        return { ...p, completed: isCompleted, streak: streak };
      }
      return p;
    }));
  };

  const handleTimeChange = (id: number, value: string) => {
    // In a real app, you would update this in Firestore.
    const time = parseInt(value, 10);
    if (!isNaN(time) && time >= 0) {
      setPractices(practices.map(p => (p.id === id ? { ...p, time } : p)));
    } else if (value === '') {
      setPractices(practices.map(p => (p.id === id ? { ...p, time: undefined } : p)));
    }
  };

  const completedCount = practices.filter(p => p.completed).length;
  const progressPercentage = (completedCount / practices.length) * 100;

  return (
    <WidgetCard title="My Daily Practice" icon={<ScrollText className="w-5 h-5" />}>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Daily Progress</span>
            <span className="text-sm font-bold text-primary">{completedCount} / {practices.length} Completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <div className="space-y-3">
          {practices.map((practice) => (
            <div key={practice.id} className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-muted/80 transition-colors duration-200 border">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`practice-${practice.id}`}
                  checked={practice.completed}
                  onCheckedChange={() => handleToggleCompletion(practice.id)}
                  aria-label={`Mark ${practice.name} as complete`}
                />
                {practice.icon}
                <label htmlFor={`practice-${practice.id}`} className="font-medium cursor-pointer">{practice.name}</label>
              </div>
              <div className="flex items-center gap-4">
                {(practice.time !== undefined) && (
                  <div className="flex items-center gap-1.5 w-28">
                    <Input
                      type="number"
                      value={practice.time}
                      onChange={(e) => handleTimeChange(practice.id, e.target.value)}
                      className="h-8 w-16 text-center"
                      aria-label={`${practice.name} time in minutes`}
                      min="0"
                    />
                    <span className="text-xs text-muted-foreground">min</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 w-12" title={`${practice.streak} day streak`}>
                  <Flame className={cn("w-5 h-5 transition-colors", practice.streak > 0 ? "text-primary" : "text-muted-foreground/50")} />
                  <span className="font-bold text-sm w-6 text-center">{practice.streak}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
