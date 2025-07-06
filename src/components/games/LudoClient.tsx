
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Dices, RefreshCw, BrainCircuit, User, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { getBodhiMove } from '@/ai/flows/bodhi-ai-move-flow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '../ui/skeleton';

// --- SUB-COMPONENTS ---

const Pawn = ({ color, isPlayer }: { color: string, isPlayer?: boolean }) => (
    <div className={cn(
        "h-6 w-6 rounded-full flex items-center justify-center border-2 border-black/20 shadow-md",
        color,
        isPlayer ? 'cursor-pointer hover:scale-110 transition-transform' : ''
    )}>
        <div className="h-2 w-2 rounded-full bg-white/50" />
    </div>
);

const HomeBase = ({ color, borderColor, pawns }: { color: string, borderColor: string, pawns: number }) => (
    <div className={cn("w-full h-full p-2 grid place-items-center", borderColor)}>
        <div className={cn("w-full h-full rounded-full flex items-center justify-center p-2", color)}>
             <div className="w-full h-full bg-white/30 rounded-full grid grid-cols-2 grid-rows-2 gap-1 p-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                        {i < pawns && <Pawn color={color} />}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const PathSquare = ({ color, children, isSafe }: { color?: string, children?: React.ReactNode, isSafe?: boolean }) => (
    <div className={cn("w-full h-full border border-black/20 flex items-center justify-center relative", color || 'bg-white')}>
        {isSafe && <Star className="absolute h-4 w-4 text-black/20" />}
        {children}
    </div>
);

const HomeTriangle = () => (
    <div className="w-full h-full relative">
        <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)', backgroundColor: '#22c55e' }}></div>
        <div className="absolute inset-0" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)', backgroundColor: '#ef4444' }}></div>
        <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)', backgroundColor: '#3b82f6' }}></div>
        <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)', backgroundColor: '#facc15' }}></div>
    </div>
);

const Dice = ({ value, isRolling, onRoll }: { value: number | null, isRolling: boolean, onRoll: () => void}) => {
    const faces: Record<number, React.ReactNode> = {
        1: <div className="h-3 w-3 rounded-full bg-black" />,
        2: <div className="flex flex-col justify-between h-full w-full p-1"><div className="h-3 w-3 self-start rounded-full bg-black" /><div className="h-3 w-3 self-end rounded-full bg-black" /></div>,
        3: <div className="flex flex-col justify-between h-full w-full p-1"><div className="h-3 w-3 self-start rounded-full bg-black" /><div className="h-3 w-3 self-center rounded-full bg-black" /><div className="h-3 w-3 self-end rounded-full bg-black" /></div>,
        4: <div className="grid grid-cols-2 gap-1 p-1"><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /></div>,
        5: <div className="grid grid-cols-3 grid-rows-3 h-full w-full p-1"><div className="h-3 w-3 rounded-full bg-black col-start-1 row-start-1" /><div className="h-3 w-3 rounded-full bg-black col-start-3 row-start-1" /><div className="h-3 w-3 rounded-full bg-black col-start-2 row-start-2" /><div className="h-3 w-3 rounded-full bg-black col-start-1 row-start-3" /><div className="h-3 w-3 rounded-full bg-black col-start-3 row-start-3" /></div>,
        6: <div className="grid grid-cols-2 gap-1 p-1"><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /></div>,
    }

    return (
        <button onClick={onRoll} disabled={isRolling} className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95">
             {isRolling ? <Dices className="h-8 w-8 animate-spin" /> : (
                <div className="w-12 h-12 flex items-center justify-center p-1">
                   {value ? faces[value] : <Dices className="h-8 w-8" />}
                </div>
             )}
        </button>
    )
}

// --- MAIN COMPONENT ---

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
        setStatus(`You rolled a ${roll}! Bodhi is suggesting a move...`);
        const move = `User rolled a ${roll}`;
        const currentHistory = [...history, { actor: 'user' as const, move }];
        setHistory(currentHistory);

        try {
            const gameState = `Ludo game state: ${currentHistory.map(h => `${h.actor}: ${h.move}`).join(', ')}. Based on my roll of ${roll}, what is my best move?`;
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
    
    // This is a simplified representation. A real game would need a full mapping of all 52 squares.
    const boardLayout = useMemo(() => Array.from({ length: 15 * 15 }).map((_, i) => {
        const row = Math.floor(i / 15);
        const col = i % 15;

        // Home bases
        if (row < 6 && col < 6) return { type: 'base', color: 'yellow', pawns: 4 };
        if (row < 6 && col > 8) return { type: 'base', color: 'green', pawns: 3 };
        if (row > 8 && col < 6) return { type: 'base', color: 'blue', pawns: 2 };
        if (row > 8 && col > 8) return { type: 'base', color: 'red', pawns: 4 };

        // Home Triangle
        if (row >= 6 && row < 9 && col >= 6 && col < 9) return { type: 'home' };

        // Paths (simplified)
        if (row === 7 && col < 6) return { type: 'path', color: 'yellow' };
        if (col === 7 && row < 6) return { type: 'path', color: 'green' };
        if (row === 7 && col > 8) return { type: 'path', color: 'red' };
        if (col === 7 && row > 8) return { type: 'path', color: 'blue' };

        if ((row >= 6 && row < 9) || (col >= 6 && col < 9)) return { type: 'path', color: 'white' };

        return { type: 'blank' };
    }), []);

    const pathColors = {
        'yellow': 'bg-yellow-400',
        'green': 'bg-green-500',
        'blue': 'bg-blue-500',
        'red': 'bg-red-500',
        'white': 'bg-white'
    }

    const borderColors = {
        'yellow': 'bg-yellow-300 border-2 border-yellow-600',
        'green': 'bg-green-400 border-2 border-green-700',
        'blue': 'bg-blue-400 border-2 border-blue-700',
        'red': 'bg-red-400 border-2 border-red-700',
    }
    
    return (
        <div className="container mx-auto max-w-7xl py-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <main className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Ludo vs. Bodhi AI</CardTitle>
                            <CardDescription>{status}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="aspect-square w-full max-w-lg mx-auto p-4 bg-gray-400">
                                <div className="grid h-full w-full" style={{ gridTemplateColumns: 'repeat(15, 1fr)', gridTemplateRows: 'repeat(15, 1fr)'}}>
                                    {/* Home Bases */}
                                    <div className="col-start-1 col-span-6 row-start-1 row-span-6"><HomeBase color="bg-yellow-400" borderColor="border-yellow-600" pawns={4}/></div>
                                    <div className="col-start-10 col-span-6 row-start-1 row-span-6"><HomeBase color="bg-green-500" borderColor="border-green-700" pawns={4}/></div>
                                    <div className="col-start-1 col-span-6 row-start-10 row-span-6"><HomeBase color="bg-blue-500" borderColor="border-blue-700" pawns={4}/></div>
                                    <div className="col-start-10 col-span-6 row-start-10 row-span-6"><HomeBase color="bg-red-500" borderColor="border-red-700" pawns={4}/></div>
                                    
                                    {/* Center Home */}
                                    <div className="col-start-7 col-span-3 row-start-7 row-span-3"><HomeTriangle /></div>

                                    {/* Paths */}
                                    {/* Top Path */}
                                    <div className="col-start-7 row-start-2"><PathSquare color="bg-green-500" isSafe><Pawn color="bg-green-500"/></PathSquare></div>
                                    <div className="col-start-8 row-start-2"><PathSquare color="bg-green-500" /></div>
                                    <div className="col-start-9 row-start-2"><PathSquare color="bg-green-500" /></div>
                                    <div className="col-start-10 row-start-2"><PathSquare /></div>
                                    <div className="col-start-11 row-start-2"><PathSquare /></div>
                                    <div className="col-start-12 row-start-2"><PathSquare /></div>
                                    {/* Right Path */}
                                    <div className="col-start-14 row-start-7"><PathSquare color="bg-red-500" isSafe/></div>
                                    <div className="col-start-14 row-start-8"><PathSquare color="bg-red-500" /></div>
                                    <div className="col-start-14 row-start-9"><PathSquare color="bg-red-500" /></div>
                                    {/* Bottom Path */}
                                     <div className="col-start-4 row-start-14"><PathSquare /></div>
                                     <div className="col-start-5 row-start-14"><PathSquare /></div>
                                     <div className="col-start-6 row-start-14"><PathSquare /></div>
                                     <div className="col-start-7 row-start-14"><PathSquare color="bg-blue-500" /></div>
                                     <div className="col-start-8 row-start-14"><PathSquare color="bg-blue-500" /></div>
                                     <div className="col-start-9 row-start-14"><PathSquare color="bg-blue-500" isSafe/></div>
                                    {/* Left Path */}
                                     <div className="col-start-2 row-start-4"><PathSquare /></div>
                                     <div className="col-start-2 row-start-5"><PathSquare /></div>
                                     <div className="col-start-2 row-start-6"><PathSquare /></div>
                                     <div className="col-start-2 row-start-7"><PathSquare color="bg-yellow-400" /></div>
                                     <div className="col-start-2 row-start-8"><PathSquare color="bg-yellow-400" /></div>
                                     <div className="col-start-2 row-start-9"><PathSquare color="bg-yellow-400" isSafe/></div>
                                    
                                     {/* Main track simplified */}
                                     {Array.from({length: 6}).map((_, i) => <div key={`t${i}`} className={`col-start-${7+i} row-start-1`}><PathSquare /></div>)}
                                     {Array.from({length: 6}).map((_, i) => <div key={`r${i}`} className={`col-start-15 row-start-${1+i}`}><PathSquare /></div>)}
                                     {Array.from({length: 6}).map((_, i) => <div key={`b${i}`} className={`col-start-${9-i} row-start-15`}><PathSquare /></div>)}
                                     {Array.from({length: 6}).map((_, i) => <div key={`l${i}`} className={`col-start-1 row-start-${9-i}`}><PathSquare /></div>)}

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
                                <Avatar className="h-12 w-12 border-2 border-red-500"><AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} /><AvatarFallback className="bg-muted">{getInitials(user?.displayName)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-bold text-red-600">{user?.displayName || 'Player'}</p>
                                    <p className="text-sm text-muted-foreground">Red</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-blue-500"><AvatarFallback className="bg-muted"><Bot className="text-blue-600"/></AvatarFallback></Avatar>
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
                        <CardContent className="space-y-4 flex flex-col items-center">
                            <Dice value={diceValue} isRolling={isLoading} onRoll={handleRollDice} />
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
                                    {isLoading && <div className="flex gap-2"><div className="flex-shrink-0 mt-1"><BrainCircuit className="h-4 w-4 text-accent animate-pulse" /></div><Skeleton className="h-6 w-3/4" /></div>}
                                     {history.length === 0 && !isLoading && <p className="text-sm text-center text-muted-foreground py-4">The game has just begun. Roll the dice!</p>}
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
