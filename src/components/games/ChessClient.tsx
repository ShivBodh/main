
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, RefreshCw, Send, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getBodhiMove } from '@/ai/flows/bodhi-ai-move-flow';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const ChessSquare = ({ isLight, piece }: { isLight: boolean; piece: string | null }) => {
    return (
        <div className={cn(
            'w-full h-full flex items-center justify-center text-4xl',
            isLight ? 'bg-stone-200' : 'bg-stone-500'
        )}>
            {/* Simple text representation of pieces */}
            <span className={cn('select-none', piece && piece === piece.toUpperCase() ? 'text-white' : 'text-black')}>
                {piece && {
                    'p': '♟︎', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
                    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
                }[piece.toLowerCase()]}
            </span>
        </div>
    );
};

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

type HistoryItem = {
    actor: 'user' | 'bodhi';
    move: string;
    commentary?: string;
}

export default function ChessClient() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [board, setBoard] = useState<(string|null)[][]>(initialBoard);
    const [status, setStatus] = useState("Your move (e.g., e2e4). Bodhi awaits.");
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = () => {
        setBoard(initialBoard);
        setStatus("Your move (e.g., e2e4). Bodhi awaits.");
        setHistory([]);
        setUserInput('');
        setIsLoading(false);
    }

    const handleUserMove = async () => {
        if (!userInput.trim() || isLoading) return;

        setIsLoading(true);
        setStatus('Bodhi is contemplating the Dharma of the move...');
        const move = userInput.trim();
        const currentHistory = [...history, { actor: 'user' as const, move }];
        setHistory(currentHistory);
        setUserInput('');

        try {
            // For now, the board state isn't changing, so we send the move history.
            const gameState = `Move history: ${currentHistory.map(h => `${h.actor}: ${h.move}`).join(', ')}. Your turn.`;
            const response = await getBodhiMove({ game: 'chess', gameState });

            setHistory(prev => [...prev, { actor: 'bodhi', ...response }]);
            setStatus(`Bodhi played ${response.move}. Your turn.`);
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
                            <CardTitle className="font-headline text-3xl">Chess vs. Bodhi AI</CardTitle>
                            <CardDescription>{status}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-square w-full max-w-lg mx-auto bg-stone-200 border-4 border-stone-600 shadow-lg">
                                <div className="grid grid-cols-8 h-full">
                                    {board.flat().map((piece, index) => {
                                        const row = Math.floor(index / 8);
                                        const col = index % 8;
                                        const isLight = (row + col) % 2 !== 0;
                                        return <ChessSquare key={index} isLight={isLight} piece={piece} />;
                                    })}
                                </div>
                            </div>
                        </CardContent>
                         <CardFooter>
                            <form onSubmit={(e) => { e.preventDefault(); handleUserMove(); }} className="w-full flex gap-2">
                                <Input 
                                    placeholder="Enter your move (e.g., e4)"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    disabled={isLoading}
                                />
                                <Button type="submit" disabled={isLoading}>
                                    <Send className="mr-2 h-4 w-4" />
                                    Play Move
                                </Button>
                            </form>
                         </CardFooter>
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
                                    <p className="font-bold">{user?.displayName || 'Player'}</p>
                                    <p className="text-sm text-muted-foreground">White</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 border-2 border-accent"><AvatarFallback className="bg-muted"><Bot /></AvatarFallback></Avatar>
                                <div>
                                    <p className="font-bold">Bodhi AI</p>
                                    <p className="text-sm text-muted-foreground">Black</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Game History</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ScrollArea className="h-64 w-full pr-4">
                                <div className="space-y-4">
                                    {history.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                {item.actor === 'user' ? <User className="h-4 w-4 text-primary" /> : <BrainCircuit className="h-4 w-4 text-accent" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{item.actor === 'user' ? user?.displayName || 'You' : 'Bodhi'}: <span className="font-mono">{item.move}</span></p>
                                                {item.commentary && <p className="text-xs text-muted-foreground italic">"{item.commentary}"</p>}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && <div className="flex gap-3"><div className="flex-shrink-0 mt-1"><BrainCircuit className="h-4 w-4 text-accent animate-pulse" /></div><Skeleton className="h-8 w-3/4" /></div>}
                                    {history.length === 0 && !isLoading && <p className="text-sm text-center text-muted-foreground py-4">The game has just begun.</p>}
                                </div>
                           </ScrollArea>
                        </CardContent>
                         <CardFooter>
                            <Button className="w-full" variant="outline" onClick={handleReset}><RefreshCw className="mr-2"/> New Game</Button>
                         </CardFooter>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
