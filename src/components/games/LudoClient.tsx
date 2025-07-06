
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Dices, RefreshCw, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { getBodhiMove } from '@/ai/flows/bodhi-ai-move-flow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '../ui/skeleton';

const LudoPath = ({ index }: { index: number }) => (
    <div className="w-full h-full bg-stone-200 border border-stone-300 flex items-center justify-center">
    </div>
);

const HomeBase = ({ color }: { color: string }) => (
    <div className={cn("w-full h-full flex items-center justify-center p-2", color)}>
        <div className="w-full h-full bg-white/50 rounded-md grid grid-cols-2 grid-rows-2 gap-1 p-1">
            <div className="flex items-center justify-center"><div className={cn("w-4 h-4 rounded-full", color)}></div></div>
            <div className="flex items-center justify-center"><div className={cn("w-4 h-4 rounded-full", color)}></div></div>
            <div className="flex items-center justify-center"><div className={cn("w-4 h-4 rounded-full", color)}></div></div>
            <div className="flex items-center justify-center"><div className={cn("w-4 h-4 rounded-full", color)}></div></div>
        </div>
    </div>
);

type HistoryItem = {
    actor: 'user' | 'bodhi';
    move: string;
    commentary?: string;
}

export default function LudoClient() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [diceValue, setDiceValue] = useState<number | null>(null);
    const [status, setStatus] = useState("Your turn to roll the dice!");
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const handleRollDice = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(roll);
        setStatus(`You rolled a ${roll}! Bodhi is thinking...`);
        const move = `User rolled a ${roll}`;
        const currentHistory = [...history, { actor: 'user' as const, move }];
        setHistory(currentHistory);

        try {
            const gameState = `Move history: ${currentHistory.map(h => `${h.actor}: ${h.move}`).join(', ')}. Your turn.`;
            const response = await getBodhiMove({ game: 'ludo', gameState });
            setHistory(prev => [...prev, { actor: 'bodhi', ...response }]);
            setStatus(`Bodhi suggests: ${response.move}. Your turn to roll again!`);
        } catch (error) {
            console.error("Error getting AI move:", error);
            toast({
                variant: 'destructive',
                title: 'Bodhi is Confused',
                description: 'The AI could not process the move. Please try again.'
            });
            setStatus('An error occurred. Please try your move again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setDiceValue(null);
        setStatus("Your turn to roll the dice!");
        setIsLoading(false);
        setHistory([]);
    }
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) return names[0][0] + names[names.length - 1][0];
        return names[0][0];
    };

    return (
        <div className="container mx-auto max-w-6xl py-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <main className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Ludo vs. Bodhi AI</CardTitle>
                            <CardDescription>{status}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-square w-full max-w-lg mx-auto border-4 border-stone-600 bg-stone-300 shadow-lg">
                                <div className="grid grid-cols-15 grid-rows-15 h-full w-full">
                                    {/* Simplified Ludo board representation */}
                                    <div className="col-span-6 row-span-6"><HomeBase color="bg-red-500" /></div>
                                    <div className="col-span-3 row-span-6 grid grid-cols-3">
                                        {[...Array(18)].map((_, i) => <LudoPath key={i} index={i} />)}
                                    </div>
                                    <div className="col-span-6 row-span-6"><HomeBase color="bg-blue-500" /></div>

                                    <div className="col-span-6 row-span-3 grid grid-rows-3">
                                        {[...Array(18)].map((_, i) => <LudoPath key={i} index={i} />)}
                                    </div>
                                    <div className="col-span-3 row-span-3 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 flex items-center justify-center text-white font-bold">HOME</div>
                                    <div className="col-span-6 row-span-3 grid grid-rows-3">
                                        {[...Array(18)].map((_, i) => <LudoPath key={i} index={i} />)}
                                    </div>

                                    <div className="col-span-6 row-span-6"><HomeBase color="bg-yellow-500" /></div>
                                    <div className="col-span-3 row-span-6 grid grid-cols-3">
                                        {[...Array(18)].map((_, i) => <LudoPath key={i} index={i} />)}
                                    </div>
                                    <div className="col-span-6 row-span-6"><HomeBase color="bg-green-500" /></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
                <aside className="lg:col-span-1 space-y-6 sticky top-24">
                     <Card>
                        <CardHeader>
                            <CardTitle>Players</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-primary"><AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} /><AvatarFallback className="bg-muted">{getInitials(user?.displayName)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-bold text-red-600">{user?.displayName || 'Player'}</p>
                                    <p className="text-sm text-muted-foreground">Red</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-accent"><AvatarFallback className="bg-muted"><Bot /></AvatarFallback></Avatar>
                                <div>
                                    <p className="font-bold text-blue-600">Bodhi AI</p>
                                    <p className="text-sm text-muted-foreground">Blue</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Game Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">You Rolled</p>
                                <p className="text-7xl font-bold font-mono text-primary">
                                    {diceValue || '-'}
                                </p>
                            </div>
                            <Button className="w-full" onClick={handleRollDice} disabled={isLoading}><Dices className="mr-2"/> Roll Dice</Button>
                        </CardContent>
                         <CardFooter className="flex-col gap-2">
                             <ScrollArea className="h-40 w-full pr-4">
                                <div className="space-y-3">
                                    {history.map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="flex-shrink-0 mt-1">
                                                {item.actor === 'user' ? <User className="h-4 w-4 text-primary" /> : <BrainCircuit className="h-4 w-4 text-accent" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-xs">{item.actor === 'user' ? 'You' : 'Bodhi'}: <span className="font-mono">{item.move}</span></p>
                                                {item.commentary && <p className="text-xs text-muted-foreground italic">"{item.commentary}"</p>}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && !diceValue && <div className="flex gap-2"><div className="flex-shrink-0 mt-1"><BrainCircuit className="h-4 w-4 text-accent animate-pulse" /></div><Skeleton className="h-6 w-3/4" /></div>}
                                </div>
                           </ScrollArea>
                            <Button className="w-full" variant="outline" onClick={handleReset}><RefreshCw className="mr-2"/> New Game</Button>
                         </CardFooter>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
