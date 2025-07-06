
'use client';

import { useState, useEffect, useMemo, Suspense, ChangeEvent, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, LogOut, Mail, BookMarked, BookOpen, HandHeart, Users, NotebookText, Megaphone, PlusCircle, Image as ImageIcon, Video, Heart, MessageCircle, Share2, Lock, Globe, Bell, Sunrise, Sunset, Moon, Star, SunMoon, Atom, Pencil, Brush, Eraser, Download, Trash, Flag, UserPlus, UserX, Award, Gamepad2, Puzzle, Dice5, Gem, ShieldCheck, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { panchangaData, PanchangaDetails } from '@/lib/panchanga-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { badges, Badge as BadgeType } from '@/lib/badge-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


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
interface Mitra {
    name: string;
    handle: string;
    avatar?: string;
}
interface Notification {
    id: string;
    type: 'mitra_request' | 'campaign_support' | 'post_like';
    actor: { name: string; avatar?: string; };
    message: string;
    timestamp: Date;
    isRead: boolean;
}
interface Campaign {
    id: string;
    author: { name: string; handle: string; avatar?: string; };
    title: string;
    description: string;
    image: string | null;
    aiHint?: string;
    supporters: number;
    greenFlags: number;
    redFlags: number;
    isPublic: boolean;
    timestamp: Date;
    userHasSupported?: boolean;
    userFlagged?: 'green' | 'red' | null;
}
interface Task { id: string; text: string; completed: boolean; }
interface DayEntry { notes: string; tasks: Task[]; sketchData?: string; }
type DrawingTool = 'pencil' | 'brush' | 'eraser';

// --- HELPERS ---
const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) return names[0][0] + names[names.length - 1][0];
    return names[0][0];
};

// --- DEMO & PLACEHOLDER DATA ---
// The feed and campaigns are now empty, to be populated by user actions.
// Mitra and notification data remains to demonstrate connection features.
const placeholderPosts: Post[] = [];

const placeholderMitras: Mitra[] = [
    { name: 'Ravi Sharma', handle: '@rsharma', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Priya Patel', handle: '@priya_p', avatar: 'https://placehold.co/40x40.png' },
];

const placeholderNotifications: Notification[] = [
    {
        id: 'notif-1',
        type: 'mitra_request',
        actor: { name: 'Arjun Das', avatar: 'https://placehold.co/40x40.png' },
        message: 'sent you a Mitra request.',
        timestamp: new Date(),
        isRead: false
    },
    {
        id: 'notif-2',
        type: 'campaign_support',
        actor: { name: 'Sita Iyer', avatar: 'https://placehold.co/40x40.png' },
        message: 'raised a green flag on your campaign "Preserve Local Temple Murals".',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
        isRead: true
    }
];

const placeholderCampaigns: Campaign[] = [];

// New data for suggestions to simulate AI matching
const suggestedMitras: Mitra[] = [
    { name: 'Sita Iyer', handle: '@sita_iyer', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Krishna Rao', handle: '@k_rao', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Gauri Desai', handle: '@gauridesai', avatar: 'https://placehold.co/40x40.png' },
];

const dashboardLinks = [
    { title: "Sādhanā Suite", description: "Tools for japa, meditation, and daily wisdom.", href: "/sadhana", icon: Atom },
    { title: "Knowledge Quiz", description: "Test your knowledge on the four Peethams.", href: "/quiz", icon: BookMarked },
    { title: "Reading Room", description: "Read foundational texts from great masters.", href: "/reading", icon: BookOpen },
    { title: "Seva Hub", description: "Find meaningful volunteer opportunities.", href: "/seva", icon: HandHeart },
];

const socialFeatures = [
    {
        icon: Users,
        title: "Connect & Share",
        description: "Join a feed of devotees, share your spiritual journey, and discuss dharmic topics.",
        gradient: "bg-[linear-gradient(170deg,_#01E4F8_0%,_#1D3EDE_100%)]",
    },
    {
        icon: Megaphone,
        title: "Support Causes",
        description: "Create or support campaigns that matter to the Sanatana Dharma community.",
        gradient: "bg-[linear-gradient(170deg,_#B4EC51_0%,_#429321_100%)]",
    },
    {
        icon: NotebookText,
        title: "Private Dainandini",
        description: "A secure, personal diary for your daily notes, tasks, and reflections, saved only on your device.",
        gradient: "bg-[linear-gradient(170deg,_#C86DD7_0%,_#3023AE_100%)]",
    }
];


// --- SUB-COMPONENTS ---

function PostCard({ post }: { post: Post }) {
    return (
        <Card>
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
    );
}

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
            <CardHeader>
                <CardTitle>Create a Post</CardTitle>
                <CardDescription>Share your spiritual insights, experiences, or announcements with the community.</CardDescription>
            </CardHeader>
            <CardContent>
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

function EmptyFeedState() {
    return (
        <Card className="text-center py-16 px-6">
            <CardHeader>
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle className="mt-4 text-2xl font-headline">Your Feed is Quiet</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This is your community feed. Start by creating a post, or connect with suggested Mitras to see their updates here.
                </p>
            </CardContent>
        </Card>
    )
}

function MitraSuggestions() {
    const { toast } = useToast();
    const handleAddMitra = (name: string) => {
        toast({
            title: "Mitra Request Sent",
            description: `Your request has been sent to ${name}.`
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mitra Suggestions</CardTitle>
                <CardDescription>Connect with others on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {suggestedMitras.map(mitra => (
                        <li key={mitra.handle} className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={mitra.avatar} />
                                <AvatarFallback>{getInitials(mitra.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{mitra.name}</p>
                                <p className="text-sm text-muted-foreground">{mitra.handle}</p>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleAddMitra(mitra.name)}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <main className="lg:col-span-2 space-y-6">
                <CreatePost onCreatePost={handleCreatePost} user={user} />
                {posts.length > 0 ? (
                    posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <EmptyFeedState />
                )}
            </main>
            <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                <MitraSuggestions />
            </aside>
        </div>
    );
}

function BadgeDisplay({ badge }: { badge: BadgeType }) {
    const Icon = badge.icon;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50 border border-transparent hover:border-accent transition-colors">
                        <Icon className="h-10 w-10 text-primary" />
                        <p className="text-xs font-semibold text-center">{badge.name}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{badge.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function ProfileTab() {
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const [quizScore, setQuizScore] = useState<number | null>(null);

    useEffect(() => {
        if (user) {
            const scoreStr = localStorage.getItem(`quizScore_${user.uid}`);
            if (scoreStr) {
                setQuizScore(parseInt(scoreStr, 10));
            }
        }
    }, [user]);

    if (!user) return null;

    const handleSendRequest = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const emailInput = form.elements.namedItem('email') as HTMLInputElement;
        const email = emailInput.value;
        if (!email) return;
        toast({
            title: 'Mitra Request Sent',
            description: `Your request has been sent to ${email}.`,
        });
        form.reset();
    };
    
    // Mock data for badge conditions
    const earnedBadges = badges.filter(badge => {
        if (badge.id === 'quiz-master') return badge.condition(quizScore || 0);
        if (badge.id === 'campaign-starter') return badge.condition(placeholderCampaigns.length);
        if (badge.id === 'socialist') return badge.condition(placeholderMitras.length);
        if (badge.id === 'very-active') return badge.condition(placeholderPosts.length);
        if (badge.id === 'humankind') return badge.condition(1); // Mock: Assume user supported 1 campaign
        return false;
    });

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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {dashboardLinks.map(link => { const Icon = link.icon; return (<Link href={link.href} key={link.href} className="block group"><Card className="h-full flex flex-col items-start p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50"><Icon className="h-8 w-8 text-primary mb-4" /><CardTitle className="font-headline text-xl group-hover:text-accent transition-colors">{link.title}</CardTitle><CardDescription className="mt-2 text-foreground/80 flex-grow">{link.description}</CardDescription></Card></Link>); })}
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Gamepad2 className="h-6 w-6"/> Bodhi's Game Room</CardTitle>
                    <CardDescription>Challenge our resident AI, Bodhi, to a game of strategy and wisdom.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <Link href="/games/ludo" className="block group">
                        <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors">
                            <Dice5 className="h-8 w-8 text-primary group-hover:text-accent-foreground" />
                            <div>
                                <h3 className="font-semibold">Play Ludo</h3>
                                <p className="text-sm text-muted-foreground group-hover:text-accent-foreground">A fun game of chance and tactics.</p>
                            </div>
                        </div>
                    </Link>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Award className="h-6 w-6"/> Achievements</CardTitle>
                    <CardDescription>Your points and badges earned across the portal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold">Quiz Points</h3>
                        <p className="text-4xl font-bold text-primary">{quizScore ?? 0} <span className="text-base font-normal text-muted-foreground">points</span></p>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold">Badges</h3>
                        {earnedBadges.length > 0 ? (
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-2">
                                {earnedBadges.map(badge => <BadgeDisplay key={badge.id} badge={badge} />)}
                            </div>
                        ) : (
                            <p className="text-muted-foreground mt-2">No badges earned yet. Participate in quizzes and community activities to earn them!</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Find Mitras</CardTitle>
                        <CardDescription>Connect with others on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSendRequest} className="flex gap-2">
                            <Input name="email" type="email" placeholder="Enter user's email" required />
                            <Button type="submit">Send Request</Button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>My Mitras ({placeholderMitras.length})</CardTitle>
                        <CardDescription>Your list of connected friends.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {placeholderMitras.map(mitra => (
                                <li key={mitra.handle} className="flex items-center gap-3">
                                    <Avatar><AvatarImage src={mitra.avatar} /><AvatarFallback>{getInitials(mitra.name)}</AvatarFallback></Avatar>
                                    <div>
                                        <p className="font-semibold">{mitra.name}</p>
                                        <p className="text-sm text-muted-foreground">{mitra.handle}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
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

const colors = ['#000000', '#ef4444', '#3b82f6', '#22c55e', '#facc15', '#a855f7', '#ffffff'];

function DrawingCanvas({ initialData, onSave, tool, brushSize, color, onClearRequest }: {
    initialData: string | null;
    onSave: (dataUrl: string) => void;
    tool: DrawingTool;
    brushSize: number;
    color: string;
    onClearRequest: () => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        if (initialData) {
            const image = new Image();
            image.onload = () => {
                context.drawImage(image, 0, 0);
            };
            image.src = initialData;
        }
    }, [initialData]);

    const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context) return;
        const { x, y } = getCoords(e);
        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context) return;

        context.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        context.lineCap = tool === 'brush' ? 'round' : 'square';
        
        const { x, y } = getCoords(e);
        context.lineTo(x, y);
        context.stroke();
    };

    const stopDrawing = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context) return;
        context.closePath();
        setIsDrawing(false);
        onSave(canvas.toDataURL());
    };
    
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const link = document.createElement('a');
        link.download = `dainandini-sketch-${new Date().toISOString()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="bg-stone-50 border border-stone-200 rounded-md w-full aspect-[4/3] cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
            <div className='flex gap-2'>
                <Button onClick={handleDownload} variant="outline" size="sm"><Download className="mr-2"/> Download</Button>
                <Button onClick={onClearRequest} variant="destructive" size="sm"><Trash className="mr-2"/> Clear Canvas</Button>
            </div>
        </div>
    );
}

function DainandiniClientContent() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date>();
    // Journal state
    const [notes, setNotes] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');
    // Sketchpad state
    const [sketchData, setSketchData] = useState<string | null>(null);
    const [tool, setTool] = useState<DrawingTool>('pencil');
    const [brushSize, setBrushSize] = useState(5);
    const [color, setColor] = useState('#000000');
    
    const todayPanchang = useMemo(() => panchangaData.find(p => p.region === 'North')?.data, []);

    const saveDayEntry = (data: Partial<DayEntry>) => {
        if (!user || !selectedDate) return;
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        const existingDataRaw = localStorage.getItem(`dainandini_${user.uid}_${dateKey}`);
        const existingData = existingDataRaw ? JSON.parse(existingDataRaw) : {};
        const dataToSave: DayEntry = {
            notes: data.notes ?? existingData.notes ?? '',
            tasks: data.tasks ?? existingData.tasks ?? [],
            sketchData: data.sketchData ?? existingData.sketchData ?? null,
        };
        localStorage.setItem(`dainandini_${user.uid}_${dateKey}`, JSON.stringify(dataToSave));
    };

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
            setSketchData(parsedData.sketchData || null);
        } else {
            setNotes('');
            setTasks([]);
            setSketchData(null);
        }
    }, [selectedDate, user]);

    useEffect(() => {
        if (!user || !selectedDate) return;
        const handler = setTimeout(() => saveDayEntry({ notes, tasks }), 500);
        return () => clearTimeout(handler);
    }, [notes, tasks, selectedDate, user]);

    const handleSaveSketch = (dataUrl: string) => {
        setSketchData(dataUrl);
        saveDayEntry({ sketchData: dataUrl });
    };

    const handleClearSketch = () => {
        setSketchData(null);
        saveDayEntry({ sketchData: null });
    }

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
                        <CardHeader className="border-b">
                             <h2 className="text-2xl font-bold font-headline text-primary">{selectedDate ? format(selectedDate, 'EEEE, do MMMM yyyy') : 'Select a date'}</h2>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6">
                            <Tabs defaultValue="journal" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="journal"><Pencil className="mr-2"/>Journal</TabsTrigger>
                                    <TabsTrigger value="sketchpad"><Brush className="mr-2"/>Sketchpad</TabsTrigger>
                                </TabsList>
                                <TabsContent value="journal" className="mt-6">
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Notes</h3>
                                            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Your reflections..." className="h-[400px] text-lg resize-none transition-all duration-300 bg-stone-50 border-stone-200 font-serif leading-[2.1rem] bg-repeat-y bg-[linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[length:100%_2.1rem]" rows={15} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold tracking-wider text-muted-foreground uppercase">Tasks</h3>
                                            <form onSubmit={handleAddTask} className="flex gap-2"><Input value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} placeholder="Add a new task" /><Button type="submit" size="icon" variant="outline"><Plus className="h-4 w-4" /></Button></form>
                                            <div className="space-y-3 pt-2 h-[350px] overflow-y-auto">
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
                                </TabsContent>
                                <TabsContent value="sketchpad" className="mt-6">
                                     <div className="flex flex-col md:flex-row gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Label>Tool:</Label>
                                            <Button onClick={() => setTool('pencil')} variant={tool === 'pencil' ? 'default' : 'outline'} size="icon"><Pencil/></Button>
                                            <Button onClick={() => setTool('brush')} variant={tool === 'brush' ? 'default' : 'outline'} size="icon"><Brush/></Button>
                                            <Button onClick={() => setTool('eraser')} variant={tool === 'eraser' ? 'default' : 'outline'} size="icon"><Eraser/></Button>
                                        </div>
                                        <div className="flex-1">
                                            <Label>Size: {brushSize}px</Label>
                                            <Slider min={1} max={50} step={1} value={[brushSize]} onValueChange={(v) => setBrushSize(v[0])} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Label>Color:</Label>
                                        <div className="flex gap-1">
                                        {colors.map(c => <button key={c} onClick={() => setColor(c)} style={{ backgroundColor: c }} className={`h-8 w-8 rounded-full border-2 ${color === c ? 'border-primary' : 'border-muted'}`} />)}
                                        </div>
                                    </div>
                                    <DrawingCanvas initialData={sketchData} onSave={handleSaveSketch} tool={tool} brushSize={brushSize} color={color} onClearRequest={handleClearSketch} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
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

function CreateCampaign({ onCreateCampaign }: { onCreateCampaign: (data: { title: string, description: string, image: string | null, isPublic: boolean }) => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
        if (!title.trim() || !description.trim()) return;
        onCreateCampaign({ title, description, image, isPublic });
        setTitle('');
        setDescription('');
        setImage(null);
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Start a New Campaign</CardTitle>
                <CardDescription>Rally support for a dharmic cause you believe in. Raise awareness, gather support for community initiatives, or call for action.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2"><Label htmlFor="campaign-title">Campaign Title</Label><Input id="campaign-title" placeholder="e.g., Preserve Local Temple Murals" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="campaign-desc">Description</Label><Textarea id="campaign-desc" placeholder="Explain the purpose and importance of your campaign and what action you are proposing." value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                <div className="space-y-2">
                    <Label htmlFor="campaign-image">Attach an Image (Optional)</Label>
                    <Input id="campaign-image" type="file" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="Campaign preview" className="rounded-lg border max-h-60 w-auto mt-2" />}
                </div>
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
    const [campaigns, setCampaigns] = useState<Campaign[]>(placeholderCampaigns);

    const handleCreateCampaign = (newCampaignData: { title: string; description: string; image: string | null; isPublic: boolean }) => {
        const newCampaign: Campaign = {
            id: new Date().toISOString(),
            author: { name: user?.displayName || 'Anonymous', handle: `@${user?.email?.split('@')[0] || 'user'}`, avatar: user?.photoURL || undefined },
            title: newCampaignData.title,
            description: newCampaignData.description,
            image: newCampaignData.image,
            aiHint: 'campaign image',
            supporters: 0,
            greenFlags: 0,
            redFlags: 0,
            isPublic: newCampaignData.isPublic,
            timestamp: new Date(),
            userHasSupported: false,
            userFlagged: null,
        };
        setCampaigns(prev => [newCampaign, ...prev]);
    };

    const handleFlag = (campaignId: string, flag: 'green' | 'red') => {
        setCampaigns(campaigns.map(c => {
            if (c.id === campaignId) {
                const alreadyFlaggedGreen = c.userFlagged === 'green';
                const alreadyFlaggedRed = c.userFlagged === 'red';

                let newGreenFlags = c.greenFlags;
                let newRedFlags = c.redFlags;
                let newUserFlagged: 'green' | 'red' | null = c.userFlagged;
                
                if (flag === 'green') {
                    if (alreadyFlaggedGreen) { // un-flag green
                        newGreenFlags--;
                        newUserFlagged = null;
                    } else { // flag green
                        newGreenFlags++;
                        if (alreadyFlaggedRed) newRedFlags--; // remove red flag if present
                        newUserFlagged = 'green';
                    }
                } else { // flag === 'red'
                    if (alreadyFlaggedRed) { // un-flag red
                        newRedFlags--;
                        newUserFlagged = null;
                    } else { // flag red
                        newRedFlags++;
                        if (alreadyFlaggedGreen) newGreenFlags--; // remove green flag if present
                        newUserFlagged = 'red';
                    }
                }

                return { ...c, greenFlags: newGreenFlags, redFlags: newRedFlags, userFlagged: newUserFlagged };
            }
            return c;
        }))
    }

    return (
        <div className="space-y-8">
            <CreateCampaign onCreateCampaign={handleCreateCampaign} />
            {campaigns.length === 0 ? (
                <Card className="text-center py-16 px-6">
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
                                {campaign.image && (
                                    <img src={campaign.image} alt="Campaign image" className="rounded-lg border w-full object-cover aspect-video mb-4" data-ai-hint={campaign.aiHint || ''} />
                                )}
                                <div className="flex items-center gap-2 text-primary font-semibold">
                                    <Users className="h-5 w-5" />
                                    <span>{campaign.supporters.toLocaleString()} Supporters</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <Button onClick={() => {}} variant={campaign.userHasSupported ? 'secondary' : 'default'}>
                                    <Heart className="mr-2" />
                                    {campaign.userHasSupported ? 'Supported' : 'Show Support'}
                                </Button>
                                 <div className="flex items-center gap-4">
                                    <Button onClick={() => handleFlag(campaign.id, 'green')} variant="outline" className={cn("gap-2", campaign.userFlagged === 'green' ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200" : "text-gray-500 hover:bg-green-50")}>
                                        <Flag className="text-green-600"/>
                                        <span>{campaign.greenFlags}</span>
                                    </Button>
                                    <Button onClick={() => handleFlag(campaign.id, 'red')} variant="outline" className={cn("gap-2", campaign.userFlagged === 'red' ? "bg-red-100 text-red-700 border-red-300 hover:bg-red-200" : "text-gray-500 hover:bg-red-50")}>
                                        <Flag className="text-red-600 transform -scale-y-100" />
                                        <span>{campaign.redFlags}</span>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

function NotificationsTab() {
    const [notifications, setNotifications] = useState(placeholderNotifications);
    const { toast } = useToast();

    const handleRequest = (id: string, accepted: boolean) => {
        const notification = notifications.find(n => n.id === id);
        if (!notification) return;

        toast({
            title: `Request ${accepted ? 'Accepted' : 'Declined'}`,
            description: `You have ${accepted ? 'accepted' : 'declined'} the mitra request from ${notification.actor.name}.${accepted ? ' They are now in your Mitra list.' : ''}`
        });

        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Your recent activity and requests.</CardDescription>
            </CardHeader>
            <CardContent>
                {notifications.length > 0 ? (
                    <ul className="space-y-4">
                        {notifications.map(notif => (
                            <li key={notif.id} className={cn("flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border", !notif.isRead && "bg-primary/5")}>
                                <Avatar><AvatarImage src={notif.actor.avatar} /><AvatarFallback>{getInitials(notif.actor.name)}</AvatarFallback></Avatar>
                                <div className="flex-grow">
                                    <p><span className="font-semibold">{notif.actor.name}</span> {notif.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{format(notif.timestamp, 'MMM d, yyyy HH:mm')}</p>
                                </div>
                                {notif.type === 'mitra_request' && (
                                    <div className="flex gap-2 self-center sm:self-auto shrink-0">
                                        <Button size="sm" onClick={() => handleRequest(notif.id, true)} variant="outline" className="border-green-600 text-green-600 hover:bg-green-100 hover:text-green-700">
                                            <Flag className="mr-2 text-green-600" /> Accept
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => handleRequest(notif.id, false)} className="border-red-600 text-red-600 hover:bg-red-100 hover:text-red-700">
                                            <Flag className="mr-2 text-red-600 transform -scale-y-100" /> Decline
                                        </Button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground text-center py-8">No new notifications.</p>
                )}
            </CardContent>
        </Card>
    );
}

// --- NEW COMPONENT FOR UNAUTHENTICATED USERS ---

function SocialLandingPage() {
    return (
        <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4 text-center">
             <Gem className="mx-auto h-16 w-16 text-primary animate-in fade-in-0 slide-in-from-bottom-5 duration-500" />
            <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
                A Sacred Space for Sanatanis
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-5 duration-500 delay-200">
                Sanatan Social is a private, secure platform for devotees and seekers to connect, share knowledge, and support dharmic causes.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {socialFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={feature.title} className="group relative min-h-[220px] rounded-xl shadow-lg text-white p-6 flex flex-col justify-between overflow-hidden animate-in fade-in-0 slide-in-from-bottom-10 duration-500" style={{animationDelay: `${200 + index * 100}ms`}}>
                             <div className={cn("absolute inset-0 transition-transform duration-500 group-hover:scale-105", feature.gradient)} />
                             <Icon className="absolute -right-8 -bottom-8 h-40 w-40 text-white/10 transition-all duration-500 group-hover:scale-125 group-hover:text-white/20" />
                             
                             <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                                <h2 className="text-2xl font-bold uppercase font-headline">{feature.title}</h2>
                                <p className="mt-2 text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{feature.description}</p>
                             </div>

                             <Link href="/login" className="relative z-10 font-semibold uppercase flex items-center gap-2 self-start transition-transform duration-500 group-hover:-translate-y-1">
                                Join to Access
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                             </Link>
                        </div>
                    )
                })}
            </div>

            <div className="mt-20 animate-in fade-in-0 slide-in-from-bottom-10 duration-700 delay-[800ms]">
                <Button asChild size="lg" className="text-lg py-7 px-10">
                    <Link href="/login">Join the Community to Enter</Link>
                </Button>
            </div>
        </div>
    );
}


// --- MAIN ROUTER ---

function SocialPageRouter() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'feed';

    if (loading) {
        return (
            <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-[70vh] w-full rounded-lg" />
                </div>
            </div>
        );
    }

    if (!user) {
        return <SocialLandingPage />;
    }
    
    return (
      <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight flex items-center justify-center gap-3">
              <Users className="h-10 w-10" />
              Sanatan Social
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">Your hub for community, personal growth, and dharmic action.</p>
        </div>
        <Tabs defaultValue={tab} onValueChange={(t) => router.push(`/social?tab=${t}`)} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <TabsList className="grid w-max grid-cols-5 mb-8">
                    <TabsTrigger value="feed">Feed</TabsTrigger>
                    <TabsTrigger value="profile">My Profile</TabsTrigger>
                    <TabsTrigger value="dainandini">Dainandini</TabsTrigger>
                    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                 <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="feed"><FeedTab user={user} /></TabsContent>
            <TabsContent value="profile"><ProfileTab /></TabsContent>
            <TabsContent value="dainandini"><DainandiniTab /></TabsContent>
            <TabsContent value="campaigns"><CampaignsTab user={user} /></TabsContent>
            <TabsContent value="notifications"><NotificationsTab /></TabsContent>
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

    