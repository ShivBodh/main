
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Dices, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

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

export default function LudoClient() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [diceValue, setDiceValue] = useState<number | null>(null);
    const [status, setStatus] = useState("Your turn to roll the dice!");

    const handleRollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(roll);
        setStatus(`You rolled a ${roll}! (Gameplay in development)`);
        toast({
            title: `You rolled a ${roll}!`,
            description: "Gameplay logic is currently under development."
        })
    };

    const handleReset = () => {
        setDiceValue(null);
        setStatus("Your turn to roll the dice!");
    }
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) return names[0][0] + names[names.length - 1][0];
        return names[0][0];
    };

    return (
        <div className="container mx-auto max-w-5xl py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <main className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Ludo vs. Bodhi AI</CardTitle>
                            <CardDescription>A classic game of chance and tactics. (Feature in Development)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-square w-full max-w-lg mx-auto border-4 border-stone-600 bg-stone-300">
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
                <aside className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader className="text-center pb-2">
                             <Avatar className="h-16 w-16 mx-auto border-4 border-primary shadow-lg"><AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} /><AvatarFallback className="text-2xl bg-muted">{getInitials(user?.displayName)}</AvatarFallback></Avatar>
                             <CardTitle className="text-xl pt-2">{user?.displayName || 'Player'}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-muted-foreground text-sm">vs.</p>
                        </CardContent>
                        <CardFooter className="flex-col text-center pt-2">
                             <Avatar className="h-16 w-16 mx-auto border-4 border-accent shadow-lg"><AvatarFallback className="text-2xl bg-muted"><Bot /></AvatarFallback></Avatar>
                            <p className="font-semibold text-xl pt-2">Bodhi AI</p>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Game Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold">Status</h4>
                                <p className="text-muted-foreground">{status}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">You Rolled</p>
                                <p className="text-6xl font-bold font-mono text-primary">
                                    {diceValue || '-'}
                                </p>
                            </div>
                            <Button className="w-full" onClick={handleRollDice}><Dices className="mr-2"/> Roll Dice</Button>
                            <Button className="w-full" variant="outline" onClick={handleReset}><RefreshCw className="mr-2"/> New Game</Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
