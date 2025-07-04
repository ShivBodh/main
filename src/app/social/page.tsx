
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Rocket, Heart, MessageCircle, Share2, Image as ImageIcon, Video } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sanatan Social | Sanatana Peethams Portal',
  description: 'A secure, family-friendly social media platform for the global Hindu community to connect, share, and grow together.',
};

const placeholderPosts = [
    {
        id: 1,
        author: {
            name: 'Sringeri Peetham',
            handle: '@sringeri_matham',
            avatar: 'https://placehold.co/48x48.png'
        },
        content: "The annual Sharada Sharannavaratri Mahotsava begins today. Join us in celebrating the Divine Mother. Watch the live stream on our YouTube channel.",
        image: 'https://placehold.co/600x300.png',
        aiHint: 'festival procession',
        likes: 1200,
        comments: 88
    },
    {
        id: 2,
        author: {
            name: 'Gita Devotee',
            handle: '@gita_seeker',
            avatar: 'https://placehold.co/48x48.png'
        },
        content: "Just finished reading Chapter 2 of the Bhagavad Gita. The concept of the eternal, indestructible nature of the Atman is truly profound. 'nainam chindanti shastrani...'",
        image: null,
        likes: 256,
        comments: 42
    }
]

export default function SocialPage() {
  return (
    <div className="container mx-auto max-w-7xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Sanatan Social
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            A safe and respectful space for the global Sanatani community to connect, share, and grow together in Dharma.
        </p>
      </div>

       <Alert className="mb-12 border-primary bg-primary/5 text-primary-foreground">
            <Rocket className="h-5 w-5 text-primary" />
            <AlertTitle className="font-headline text-lg text-primary">Coming Soon: Mobile Apps!</AlertTitle>
            <AlertDescription className="text-primary/80">
                Our dedicated iOS and Android apps are under development to bring the community even closer. Get ready for a seamless mobile experience!
            </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-primary">
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">Guest User</p>
                        <p className="text-sm text-muted-foreground">Log in to create your profile</p>
                        <Button asChild className="mt-4 w-full">
                            <Link href="/login">Login / Sign Up</Link>
                        </Button>
                    </CardContent>
                </Card>
            </aside>

            {/* Main Feed */}
            <main className="lg:col-span-2">
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
                                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
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
            </main>

            {/* Right Sidebar */}
             <aside className="hidden lg:block lg:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Trending Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       <p className="text-sm text-muted-foreground p-4 text-center">Trending topics feature is under construction.</p>
                    </CardContent>
                </Card>
            </aside>
        </div>

    </div>
  );
}
