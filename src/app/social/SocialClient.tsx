
'use client';

import { useState, useEffect, useMemo, Suspense, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, LogOut, Mail, Brain, BookMarked, BookOpen, HandHeart, Users, NotebookText, Megaphone, PlusCircle, Image as ImageIcon, Video, Heart, MessageCircle, Share2, Lock, Globe, Bell, Sunrise, Sunset, Moon, Star, SunMoon, Atom } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { panchangaData, PanchangaDetails } from '@/lib/panchanga-data';
import { Badge } from '@/components/ui/badge';


// --- TYPES ---
interface Post {
    id: string;
    author: { name: string; handle: string; avatar?: string; };
    content: string;
    image: string | null;
    aiHint?: string;
    likes: number;
    comments: number;
    isPublic: boolean;
    timestamp: Date;
}
interface Campaign {
    id: string;
    author: { name: string; handle: string; avatar?: string; };
    title: string;
    description: string;
    goal: number;
    current: number;
    isPublic: boolean;
    timestamp: Date;
}
interface Task { id: string; text: string; completed: boolean; }
interface DayEntry { notes: string; tasks: Task[]; }

// --- HELPERS ---
const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) return names[0][0] + names[names.length - 1][0];
    return names[0][0];
};

const placeholderPosts: Post[] = [
    {
        id: "placeholder-1",
        author: { name: 'Sringeri Peetham', handle: '@sringeri_matham' },
        content: "The annual Sharada Sharannavaratri Mahotsava begins today. Join us in celebrating the Divine Mother. Watch the live stream on our YouTube channel.",
        image: 'https://images.unsplash.com/photo-1617478324403-56272b3a9e33?q=80&w=600&h=300&fit=crop',
        aiHint: 'festival procession',
        likes: 1200,
        comments: 88,
        isPublic: true,
        timestamp: new Date()
    },
    {
        id: "placeholder-2",
        author: { name: 'Gita Devotee', handle: '@gita_seeker' },
        content: "Just finished reading Chapter 2 of the Bhagavad Gita. The concept of the eternal, indestructible nature of the Atman is truly profound. 'nainam chindanti shastrani...'",
        image: null,
        likes: 256,
        comments: 42,
        isPublic: true,
        timestamp: new Date()
    }
];

const dashboardLinks = [
    { title: "Sādhanā Suite", description: "Tools for japa, meditation, and daily wisdom.", href: "/sadhana", icon: Brain },
    { title: "Knowledge Quiz", description: "Test your knowledge on the four Peethams.", href: "/quiz", icon: BookMarked },
    { title: "Reading Room", description: "Read foundational texts from great masters.", href: "/reading", icon: BookOpen },
    { title: "Seva Hub", description: "Find meaningful volunteer opportunities.", href: "/seva", icon: HandHeart },
];

// --- SUB-COMPONENTS ---

function CreatePost({ onCreatePost, user }: { onCreatePost: (data: { content: string, image: string | null, isPublic: boolean }) => void, user: any }) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isPublic, setIsPublic] = useState(true);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!content.trim()) return;
        onCreatePost({ content, image, isPublic });
        setContent('');
        setImage(null);
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <Avatar><AvatarImage src={user.photoURL || ''} /><AvatarFallback>{getInitials(user.displayName)}</AvatarFallback></Avatar>
                    <div className="w-full space-y-3">
                        <Textarea placeholder="Share your thoughts on Dharma..." value={content} onChange={(e) => setContent(e.target.value)} />
                        {image && <img src={image} alt="Preview" className="rounded-lg border max-h-60 w-auto" />}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <Button asChild variant="ghost" size="icon" className="relative cursor-pointer">
                                    <label htmlFor="post-image-upload"><ImageIcon className="h-5 w-5 text-muted-foreground" /></label>
                                </Button>
                                <input id="post-image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Switch id="post-privacy" checked={isPublic} onCheckedChange={setIsPublic} />
                                    <Label htmlFor="post-privacy" className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        {isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                                        {isPublic ? 'Public' : 'Personal'}
                                    </Label>
                                </div>
                                <Button onClick={handleSubmit} disabled={!content.trim()}>Post</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function FeedTab({ user }: { user: any }) {
    const [posts, setPosts] = useState<Post[]>(placeholderPosts);

    const handleCreatePost = (newPostData: { content: string; image: string | null; isPublic: boolean }) => {
        const newPost: Post = {
            id: new Date().toISOString(),
            author: {
                name: user?.displayName || 'Anonymous',
                handle: `@${user?.email?.split('@')[0] || 'user'}`,
                avatar: user?.photoURL || undefined,
            },
            content: newPostData.content,
            image: newPostData.image,
            likes: 0,
            comments: 0,
            isPublic: newPostData.isPublic,
            timestamp: new Date(),
        };
        setPosts(prev => [newPost, ...prev]);
    };

    return (
        <div className="space-y-6">
            <CreatePost onCreatePost={handleCreatePost} user={user} />
            {posts.map(post => (
                <Card key={post.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <Avatar>
                                    <AvatarImage src={post.author.avatar} />
                                    <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{post.author.name}</p>
                                    <p className="text-sm text-muted-foreground">{post.author.handle} &middot; {format(post.timestamp, 'MMM d')}</p>
                                </div>
                            </div>
                             <Badge variant={post.isPublic ? "outline" : "secondary"} className="flex items-center gap-1.5">
                                {post.isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                {post.isPublic ? 'Public' : 'Personal'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
                        {post.image && (
                            <img src={post.image} alt="Post image" className="rounded-lg border w-full object-cover aspect-video" data-ai-hint={post.aiHint || ''} />
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between text-muted-foreground">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Heart className="h-4 w-4" /> {post.likes}</Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> {post.comments}</Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="h-4 w-4" /> Share</Button>
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
                <Avatar className="h-24 w-24 border-4 border-primary shadow-lg"><AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} /><AvatarFallback className="text-3xl bg-muted">{getInitials(user.displayName)}</AvatarFallback></Avatar>
                <div>
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Welcome, {user.displayName || 'Devotee'}</h2>
                    <p className="mt-2 text-lg text-muted-foreground flex items-center gap-2"><Mail className="h-5 w-5" /> {user.email}</p>
                </div>
                <div className="ml-auto"><Button onClick={logout} variant="outline"><LogOut className="mr-2 h-4 w-4" /> Sign Out</Button></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dashboardLinks.map(link => { const Icon = link.icon; return (<Link href={link.href} key={link.href} className="block group"><Card className="h-full flex flex-col items-start p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50"><Icon className="h-8 w-8 text-primary mb-4" /><CardTitle className="font-headline text-xl group-hover:text-accent transition-colors">{link.title}</CardTitle><CardDescription className="mt-2 text-foreground/80 flex-grow">{link.description}</CardDescription></Card></Link>); })}
            </div>
        </div>
    );
}

function PanchangaHeader({ data }: { data: PanchangaDetails }) {
    if (!data) return null;
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="text-lg font-headline">Today's Panchanga</CardTitle>
                <CardDescription>{format(new Date(), 'EEEE, MMMM d, yyyy')}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm">
                <div className="flex items-center gap-2"><Sunrise className="h-5 w-5 text-accent" /><p><strong>Sunrise:</strong> {data.sunrise}</p></div>
                <div className="flex items-center gap-2"><Sunset className="h-5 w-5 text-accent" /><p><strong>Sunset:</strong> {data.sunset}</p></div>
                <div className="flex items-center gap-2"><Moon className="h-5 w-5 text-accent" /><p><strong>Tithi:</strong> {data.tithi.name}</p></div>
                <div className="flex items-center gap-2"><Star className="h-5 w-5 text-accent" /><p><strong>Nakshatra:</strong> {data.nakshatra.name}</p></div>
                <div className="flex items-center gap-2 text-destructive"><p><strong>Rahu Kalam:</strong> {data.rahuKalam}</p></div>
            </CardContent>
        </Card>
    );
}

function DainandiniClientContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [notes, setNotes] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');
    const todayPanchang = useMemo(() => panchangaData.find(p => p.region === 'North')?.data, []);

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    useEffect(() => {
        if (!user || !selectedDate) return;
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
    }, [selectedDate, user]);

    useEffect(() => {
        if (!user || !selectedDate) return;
        const handler = setTimeout(() => {
            const dateKey = format(selectedDate, 'yyyy-MM-dd');
            const dataToSave: DayEntry = { notes, tasks };
            localStorage.setItem(`dainandini_${user.uid}_${dateKey}`, JSON.stringify(dataToSave));
        }, 500);
        return () => clearTimeout(handler);
    }, [notes, tasks, selectedDate, user]);

    const handleAddTask = (e: React.FormEvent) => { e.preventDefault(); if (newTaskText.trim() === '') return; setTasks(prev => [...prev, { id: new Date().toISOString(), text: newTaskText.trim(), completed: false }]); setNewTaskText(''); };
    const handleToggleTask = (taskId: string) => { setTasks(prev => prev.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task)); };
    const handleDeleteTask = (taskId: string) => { setTasks(prev => prev.filter(task => task.id !== taskId)); };
    const handleSetReminder = (taskText: string) => { toast({ title: "Reminder Set", description: `You will be notified for: "${taskText}" (Feature in development).` }); };

    return (
        <div>
            {todayPanchang && <PanchangaHeader data={todayPanchang} />}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 lg:sticky lg:top-24"><Card><CardContent className="p-0"><Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="p-3" /></CardContent></Card></div>
                <div className="lg:col-span-2">
                    <Card className="shadow-lg">
                        <div className="flex bg-white rounded-lg">
                            <div className="w-16 bg-gray-100 p-4 flex flex-col justify-around items-center border-r border-gray-200">{[...Array(6)].map((_, i) => (<div key={i} className="w-8 h-8 rounded-full bg-gray-300 shadow-inner ring-1 ring-gray-400/50" />))}</div>
                            <div className="flex-1 p-6 sm:p-8">
                                <header className="border-b pb-4 mb-6"><h2 className="text-2xl font-bold font-headline text-primary">{selectedDate ? format(selectedDate, 'EEEE, do MMMM yyyy') : 'Select a date'}</h2></header>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    <div className="space-y-2"><h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Notes</h3><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Your reflections..." className="h-96 text-base" rows={20} /></div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Tasks</h3><form onSubmit={handleAddTask} className="flex gap-2"><Input value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} placeholder="Add a new task" /><Button type="submit" size="icon" variant="outline"><Plus className="h-4 w-4" /></Button></form>
                                        <div className="space-y-3 pt-2">
                                            {tasks.length > 0 ? tasks.map(task => (
                                                <div key={task.id} className="flex items-center gap-3 group">
                                                    <Checkbox id={task.id} checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} className="h-5 w-5" />
                                                    <label htmlFor={task.id} className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.text}</label>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary" onClick={() => handleSetReminder(task.text)}><Bell className="h-4 w-4" /></Button>
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
        </div>
    );
}

function DainandiniTab() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    if (!isClient) {
        return (
            <div>
                <Skeleton className="h-28 w-full mb-4" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 lg:sticky lg:top-24"><Card><CardContent className="p-0"><Skeleton className="m-3 h-[290px] w-[280px]" /></CardContent></Card></div>
                    <div className="lg:col-span-2"><Skeleton className="h-[80vh] w-full" /></div>
                </div>
            </div>
        );
    }
    return <DainandiniClientContent />;
}

function CreateCampaign({ onCreateCampaign }: { onCreateCampaign: (data: { title: string, description: string, goal: number, isPublic: boolean }) => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState(10000);
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) return;
        onCreateCampaign({ title, description, goal, isPublic });
        setTitle('');
        setDescription('');
    };

    return (
        <Card className="mb-6">
            <CardHeader><CardTitle>Start a New Campaign</CardTitle><CardDescription>Rally support for a cause you believe in.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2"><Label htmlFor="campaign-title">Campaign Title</Label><Input id="campaign-title" placeholder="e.g., Fund for Goshala Maintenance" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="campaign-desc">Description</Label><Textarea id="campaign-desc" placeholder="Explain the purpose and importance of your campaign." value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="campaign-goal">Fundraising Goal (₹)</Label><Input id="campaign-goal" type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} /></div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <div className="flex items-center space-x-2">
                    <Switch id="campaign-privacy" checked={isPublic} onCheckedChange={setIsPublic} />
                    <Label htmlFor="campaign-privacy" className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        {isPublic ? 'Public' : 'Personal'}
                    </Label>
                </div>
                <Button onClick={handleSubmit} disabled={!title.trim() || !description.trim()}><PlusCircle className="mr-2" />Create Campaign</Button>
            </CardFooter>
        </Card>
    );
}

function CampaignsTab({ user }: { user: any }) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    const handleCreateCampaign = (newCampaignData: { title: string; description: string; goal: number; isPublic: boolean }) => {
        const newCampaign: Campaign = {
            id: new Date().toISOString(),
            author: { name: user?.displayName || 'Anonymous', handle: `@${user?.email?.split('@')[0] || 'user'}`, avatar: user?.photoURL || undefined },
            title: newCampaignData.title,
            description: newCampaignData.description,
            goal: newCampaignData.goal,
            current: Math.floor(Math.random() * newCampaignData.goal * 0.1), // Seed with some initial random funds
            isPublic: newCampaignData.isPublic,
            timestamp: new Date(),
        };
        setCampaigns(prev => [newCampaign, ...prev]);
    };

    return (
        <div className="space-y-8">
            <CreateCampaign onCreateCampaign={handleCreateCampaign} />
            {campaigns.length === 0 ? (
                <Card className="text-center py-16">
                    <CardHeader><Megaphone className="mx-auto h-12 w-12 text-muted-foreground" /><CardTitle className="mt-4 text-2xl font-headline">No Active Campaigns Yet</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground mb-6">Be the first to start a movement for a cause you believe in.</p></CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {campaigns.map(campaign => (
                        <Card key={campaign.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{campaign.title}</CardTitle>
                                    <Badge variant={campaign.isPublic ? "outline" : "secondary"} className="flex items-center gap-1.5">
                                        {campaign.isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                        {campaign.isPublic ? 'Public' : 'Personal'}
                                    </Badge>
                                </div>
                                <CardDescription>by {campaign.author.name} on {format(campaign.timestamp, 'MMM d, yyyy')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">{campaign.description}</p>
                                <Progress value={(campaign.current / campaign.goal) * 100} className="w-full" />
                                <p className="text-sm text-muted-foreground mt-2 text-right">₹{campaign.current.toLocaleString()} / ₹{campaign.goal.toLocaleString()} raised</p>
                            </CardContent>
                            <CardFooter>
                                <Button>Donate Now</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}


// --- MAIN ROUTER ---

function SocialPageRouter() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'feed';

    useEffect(() => {
        if (!loading && !user) router.push('/login');
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">Sanatan Social</h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">Your hub for community, personal growth, and dharmic action.</p>
        </div>
        <Tabs defaultValue={tab} onValueChange={(t) => router.push(`/social?tab=${t}`)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="profile">My Profile</TabsTrigger>
                <TabsTrigger value="dainandini">Dainandini</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>
            <TabsContent value="feed"><FeedTab user={user} /></TabsContent>
            <TabsContent value="profile"><ProfileTab /></TabsContent>
            <TabsContent value="dainandini"><DainandiniTab /></TabsContent>
            <TabsContent value="campaigns"><CampaignsTab user={user} /></TabsContent>
        </Tabs>
      </div>
    );
}

export default function SocialClient() {
    return (
        <Suspense fallback={<div className="container mx-auto max-w-5xl py-16 md:py-24 px-4"><Skeleton className="h-screen w-full" /></div>}>
            <SocialPageRouter />
        </Suspense>
    )
}
