import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Repeat, Timer, BookOpen } from 'lucide-react';
import Link from 'next/link';

const sadhanaTools = [
  {
    title: 'Japa Counter',
    description: 'A digital mala to help you keep count of your mantra recitations.',
    icon: <Repeat className="h-10 w-10 text-primary" />,
    link: '#',
    aiHint: 'prayer beads'
  },
  {
    title: 'Meditation Timer',
    description: 'A simple, configurable timer for your meditation practice, with gentle chimes.',
    icon: <Timer className="h-10 w-10 text-primary" />,
    link: '#',
    aiHint: 'zen garden'
  },
  {
    title: 'Daily Wisdom',
    description: 'Receive a daily quote or teaching from the great Acharyas for reflection.',
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    link: '#',
    aiHint: 'ancient book'
  },
];

export default function SadhanaPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                Sādhanā Suite
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                Digital tools to support your daily spiritual practice and bring ancient traditions into your modern life.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sadhanaTools.map((tool) => (
              <Link href={tool.link} key={tool.title} className="block group">
                <Card className="h-full flex flex-col text-center items-center justify-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50">
                    <CardHeader className="p-0 items-center">
                        {tool.icon}
                        <CardTitle className="font-headline text-2xl mt-4 group-hover:text-primary transition-colors">
                            {tool.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4 flex-grow">
                        <p className="text-foreground/80">{tool.description}</p>
                    </CardContent>
                </Card>
              </Link>
            ))}
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto p-8 bg-card rounded-lg border">
            <h2 className="text-2xl font-headline font-bold text-primary">A Note on Practice</h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                These tools are offered as aids (upāyas) to your spiritual journey. They are designed to assist, not replace, the core tenets of practice: sincerity, consistency, and devotion. May they serve you well on your path to self-discovery and inner peace.
            </p>
        </div>

      </div>
    </div>
  );
}
