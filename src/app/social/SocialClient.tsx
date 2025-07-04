
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, LogOut, Mail, Brain, BookMarked, BookOpen, HandHeart, Users, NotebookText, Megaphone, PlusCircle, Image as ImageIcon, Video, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


// Dainandini-specific types and functions
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface DayEntry {
  notes: string;
  tasks: Task[];
}

const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length-1][0];
    }
    return names[0][0];
};

const placeholderPosts = [
    {
        id: 1,
        author: {
            name: 'Sringeri Peetham',
            handle: '@sringeri_matham',
        },
        content: "The annual Sharada Sharannavaratri Mahotsava begins today. Join us in celebrating the Divine Mother. Watch the live stream on our YouTube channel.",
        image: 'https://images.unsplash.com/photo-1617478324403-56272b3a9e33?q=80&w=600&h=300&fit=crop',
        aiHint: 'festival procession',
        likes: 1200,
        comments: 88
    },
    {
        id: 2,
        author: {
            name: 'Gita Devotee',
            handle: '@gita_seeker',
        },
        content: "Just finished reading Chapter 2 of the Bhagavad Gita. The concept of the eternal, indestructible nature of the Atman is truly profound. 'nainam chindanti shastrani...'",
        image: null,
        likes: 256,
        comments: 42
    }
];

const dashboardLinks = [
    {
        title: "Sādhanā Suite",
        description: "Tools for japa, meditation, and daily wisdom.",
        href: "/sadhana",
        icon: Brain,
    },
    {
        title: "Knowledge Quiz",
        description: "Test your knowledge on the four Peethams.",
        href: "/quiz",
        icon: BookMarked,
    },
    {
        title: "Reading Room",
        description: "Read foundational texts from great masters.",
        href: "/reading",
        icon: BookOpen,
    },
    {
        title: "Seva Hub",
        description: "Find meaningful volunteer opportunities.",
        href: "/seva",
        icon: HandHeart,
    },
];

function FeedTab() {
  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card>
          <CardContent className="p-4">
              <div className="flex gap-4">
                  <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                      <Input placeholder="Share your thoughts on Dharma..." className="w-full h-12" disabled />
                      <div className="flex justify-end gap-4 mt-2">
                          <Button variant="ghost" size="icon" disabled><ImageIcon className="h-5 w-5"/></Button>
                          <Button variant="ghost" size="icon" disabled><Video className="h-5 w-5"/></Button>
                          <Button className="w-24" disabled>Post</Button>
                      </div>
                  </div>
              </div>
          </CardContent>
      </Card>

      {/* Placeholder Feed */}
      {placeholderPosts.map(post => (
      <Card key={post.id}>
          <CardHeader>
              <div className="flex gap-3">
                  <Avatar>
                      <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                      <p className="font-bold">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">{post.author.handle}</p>
                  </div>
              </div>
          </CardHeader>
          <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.image && (
                    <img src={post.image} alt="Post image" className="rounded-lg border w-full object-cover aspect-video" data-ai-hint={post.aiHint || ''} />
              )}
          </CardContent>
            <CardFooter className="flex justify-between text-muted-foreground">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Share
              </Button>
          </CardFooter>
      </Card>
      ))}
    </div>
  );
}

function ProfileTab() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User Avatar'} />
                    <AvatarFallback className="text-3xl bg-muted">{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                        Welcome, {user.displayName || 'Devotee'}
                    </h2>
                    <p className="mt-2 text-lg text-muted-foreground flex items-center gap-2">
                        <Mail className="h-5 w-5" /> {user.email}
                    </p>
                </div>
                <div className="ml-auto">
                    <Button onClick={logout} variant="outline">
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dashboardLinks.map(link => {
                    const Icon = link.icon;
                    return (
                        <Link href={link.href} key={link.href} className="block group">
                            <Card className="h-full flex flex-col items-start p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
                                <Icon className="h-8 w-8 text-primary mb-4" />
                                <CardTitle className="font-headline text-xl group-hover:text-accent transition-colors">
                                    {link.title}
                                </CardTitle>
                                <CardDescription className="mt-2 text-foreground/80 flex-grow">
                                    {link.description}
                                </CardDescription>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function DainandiniTab() {
  const { user, loading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isClient, setIsClient] = useState(false);
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    setIsClient(true);
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    if (!user || !isClient || !selectedDate) return;
    
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

  useEffect(() => {
    if (!user || !isClient || !selectedDate) return;
    
    const handler = setTimeout(() => {
      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const dataToSave: DayEntry = { notes, tasks };
      localStorage.setItem(`dainandini_${user.uid}_${dateKey}`, JSON.stringify(dataToSave));
    }, 500); 

    return () => clearTimeout(handler);
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
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };
  
  if (!isClient || loading) {
    return <Skeleton className="h-[80vh] w-full" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-24">
            <Card>
                <CardContent className="p-0"><Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="p-3" /></CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="shadow-lg">
                <div className="flex bg-white rounded-lg">
                    <div className="w-16 bg-gray-100 p-4 flex flex-col justify-around items-center border-r border-gray-200">
                        {[...Array(6)].map((_, i) => (<div key={i} className="w-8 h-8 rounded-full bg-gray-300 shadow-inner ring-1 ring-gray-400/50" />))}
                    </div>
                    <div className="flex-1 p-6 sm:p-8">
                        <header className="border-b pb-4 mb-6">
                            <h2 className="text-2xl font-bold font-headline text-primary">{selectedDate ? format(selectedDate, 'EEEE, do MMMM yyyy') : 'Select a date'}</h2>
                        </header>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Notes</h3>
                                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Your reflections..." className="h-96 text-base" rows={20} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Tasks</h3>
                                <form onSubmit={handleAddTask} className="flex gap-2">
                                    <Input value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} placeholder="Add a new task" />
                                    <Button type="submit" size="icon" variant="outline"><Plus className="h-4 w-4" /></Button>
                                </form>
                                <div className="space-y-3 pt-2">
                                    {tasks.length > 0 ? tasks.map(task => (
                                        <div key={task.id} className="flex items-center gap-3 group">
                                            <Checkbox id={task.id} checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} className="h-5 w-5" />
                                            <label htmlFor={task.id} className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.text}</label>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteTask(task.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    )) : <p className="text-sm text-muted-foreground text-center pt-4">No tasks for today.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}

function CampaignsTab() {
  const campaigns: any[] = []; // Placeholder

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">Dharma Campaigns</h2>
          <p className="mt-2 text-lg text-foreground/80 max-w-2xl">Raise awareness and rally support for causes that uphold Sanatana Dharma.</p>
        </div>
        <Button asChild size="lg">
          <Link href="/campaigns/create"><PlusCircle className="mr-2" />Start a Campaign</Link>
        </Button>
      </div>

      <div>
        {campaigns.length === 0 ? (
          <Card className="text-center py-16">
            <CardHeader>
              <Megaphone className="mx-auto h-12 w-12 text-muted-foreground" />
              <CardTitle className="mt-4 text-2xl font-headline">No Active Campaigns Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Be the first to start a movement for a cause you believe in.</p>
              <Button asChild><Link href="/campaigns/create">Start Your Campaign</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{/* Campaign cards will be mapped here */}</div>
        )}
      </div>
    </div>
  );
}

function SocialPageRouter() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'feed';

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-[70vh] w-full rounded-lg" />
                </div>
            </div>
        );
    }
    
    return (
      <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                Sanatan Social
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                Your hub for community, personal growth, and dharmic action.
            </p>
        </div>

        <Tabs defaultValue={tab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="profile">My Profile</TabsTrigger>
                <TabsTrigger value="dainandini">Dainandini</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>

            <TabsContent value="feed"><FeedTab /></TabsContent>
            <TabsContent value="profile"><ProfileTab /></TabsContent>
            <TabsContent value="dainandini"><DainandiniTab /></TabsContent>
            <TabsContent value="campaigns"><CampaignsTab /></TabsContent>
        </Tabs>
      </div>
    );
}

export default function SocialClient() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SocialPageRouter />
        </Suspense>
    )
}
