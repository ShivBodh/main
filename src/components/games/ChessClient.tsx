
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChessSquare = ({ isLight, piece }: { isLight: boolean; piece: string | null }) => {
    return (
        <div className={cn(
            'w-full h-full flex items-center justify-center text-4xl',
            isLight ? 'bg-stone-200' : 'bg-stone-500'
        )}>
            {/* Simple text representation of pieces */}
            <span className={cn(piece && piece === piece.toUpperCase() ? 'text-white' : 'text-black')}>
                {piece && {
                    'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
                    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
                }[piece.toLowerCase()]}
            </span>
        </div>
    );
};

// Initial board setup
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


export default function ChessClient() {
    const { user } = useAuth();
    const [board, setBoard] = useState<(string|null)[][]>(initialBoard);
    const [status, setStatus] = useState("Your move. Play as White.");
    const [history, setHistory] = useState<string[]>([]);

    const handleReset = () => {
        setBoard(initialBoard);
        setStatus("Your move. Play as White.");
        setHistory([]);
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
                            <CardTitle className="font-headline text-3xl">Chess vs. Bodhi AI</CardTitle>
                            <CardDescription>A game of strategy and foresight. (Feature in Development)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-square w-full max-w-lg mx-auto bg-stone-200 border-4 border-stone-600">
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
                            <Button className="w-full" onClick={handleReset}><RefreshCw className="mr-2"/> New Game</Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
