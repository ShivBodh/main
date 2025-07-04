
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// New data structure for a single day's entry
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface DayEntry {
  notes: string;
  tasks: Task[];
}

// Client-side implementation for the Dainandini
export default function DainandiniClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isClient, setIsClient] = useState(false);
  
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // This effect ensures browser-specific logic runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect for handling auth state
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // Effect to load data when the selected date or user changes
  useEffect(() => {
    if (!user || !isClient) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const data = localStorage.getItem(`dainandini_${user.uid}_${dateKey}`);
    if (data) {
      const parsedData: DayEntry = JSON.parse(data);
      setNotes(parsedData.notes || '');
      setTasks(parsedData.tasks || []);
    } else {
      setNotes('');
      setTasks([]);
    }
  }, [selectedDate, user, isClient]);

  // Effect for auto-saving data to localStorage on change
  useEffect(() => {
    if (!user || !isClient) return;
    
    const handler = setTimeout(() => {
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const dataToSave: DayEntry = { notes, tasks };
      localStorage.setItem(`dainandini_${user.uid}_${dateKey}`, JSON.stringify(dataToSave));
    }, 500); // Debounce saving

    return () => {
      clearTimeout(handler);
    };
  }, [notes, tasks, selectedDate, user, isClient]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: new Date().toISOString(),
      text: newTaskText.trim(),
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  };
  
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  if (!isClient || loading) {
    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
             <Skeleton className="h-12 w-64 mb-12" />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Skeleton className="h-80 w-full" />
                </div>
                <div className="md:col-span-2">
                    <Skeleton className="h-[70vh] w-full" />
                </div>
             </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
      <div className="text-left mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
            My Dainandini
          </h1>
          <p className="mt-2 text-lg text-foreground/80 max-w-2xl">
            Your personal planner for notes and tasks. Select a date to begin.
          </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left column: Calendar */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
            <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="p-3"
                    />
                </CardContent>
            </Card>
            <p className="text-xs text-muted-foreground mt-4 text-center">I've redesigned the diary into this planner style based on your vision. Advanced features like different pens and colors can be added next!</p>
        </div>

        {/* Right column: Journal Page */}
        <div className="lg:col-span-2">
            <Card className="shadow-2xl border-gray-300">
                <div className="flex bg-white rounded-lg">
                    {/* Binder Holes */}
                    <div className="w-16 bg-gray-100 p-4 flex flex-col justify-around items-center border-r border-gray-200">
                        {[...Array(6)].map((_, i) => (
                           <div key={i} className="w-8 h-8 rounded-full bg-gray-300 shadow-inner ring-1 ring-gray-400/50" />
                        ))}
                    </div>

                    {/* Page Content */}
                    <div className="flex-1 p-6 sm:p-8">
                        {/* Header */}
                        <header className="border-b pb-4 mb-6">
                            <h2 className="text-2xl font-bold font-headline text-primary">
                                {format(selectedDate, 'EEEE, do MMMM yyyy')}
                            </h2>
                        </header>

                        {/* Body */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {/* Notes Section */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Notes</h3>
                                <Textarea
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Your reflections, memories, and thoughts for the day..."
                                  className="h-96 text-base leading-relaxed border-gray-200 focus:border-primary resize-none"
                                  rows={20}
                                />
                            </div>

                            {/* Tasks Section */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Tasks</h3>
                                <form onSubmit={handleAddTask} className="flex gap-2">
                                    <Input 
                                      value={newTaskText}
                                      onChange={(e) => setNewTaskText(e.target.value)}
                                      placeholder="Add a new task"
                                    />
                                    <Button type="submit" size="icon" variant="outline">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </form>
                                <div className="space-y-3 pt-2">
                                    {tasks.length > 0 ? tasks.map(task => (
                                        <div key={task.id} className="flex items-center gap-3 group">
                                            <Checkbox
                                                id={task.id}
                                                checked={task.completed}
                                                onCheckedChange={() => handleToggleTask(task.id)}
                                                className="h-5 w-5"
                                            />
                                            <label htmlFor={task.id} className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                {task.text}
                                            </label>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                                              onClick={() => handleDeleteTask(task.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-muted-foreground text-center pt-4">No tasks for today.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
