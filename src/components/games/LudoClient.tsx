
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

// --- TYPES & MOCK DATA ---
type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';
type PawnState = { pos: number; state: 'home' | 'safe' | 'active' | 'finished' };
type PlayerState = { pawns: PawnState[]; color: PlayerColor; name: string; isAI: boolean };
type GameState = Record<PlayerColor, PlayerState>;
type HistoryItem = { actor: 'user' | 'bodhi'; move: string; commentary?: string; };

const initialGameState: GameState = {
  red: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'red', name: 'Player', isAI: false },
  blue: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'blue', name: 'Bodhi AI', isAI: true },
  green: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'green', name: 'Player 2', isAI: true },
  yellow: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'yellow', name: 'Player 3', isAI: true },
};
// Add some pawns to the board for visual testing
initialGameState.red.pawns[0] = { pos: 4, state: 'active' };
initialGameState.blue.pawns[0] = { pos: 20, state: 'active' };
initialGameState.green.pawns[0] = { pos: 32, state: 'active' };
initialGameState.yellow.pawns[1] = { pos: 45, state: 'active' };
initialGameState.red.pawns[1] = { pos: 56, state: 'finished' }; // Home path
initialGameState.red.pawns[2] = { pos: 1, state: 'safe' }; // Safe spot

const colors = {
    red: { bg: 'bg-red-500', border: 'border-red-700' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-700' },
    green: { bg: 'bg-green-500', border: 'border-green-700' },
    yellow: { bg: 'bg-yellow-400', border: 'border-yellow-600' },
};
const safeSpots = [1, 9, 14, 22, 27, 35, 40, 48];
const startSpots: Record<PlayerColor, number> = { red: 27, green: 1, yellow: 40, blue: 14 };

const boardPath = [
    [6,1], [6,2], [6,3], [6,4], [6,5],
    [5,6], [4,6], [3,6], [2,6], [1,6], [0,6],
    [0,7], [0,8],
    [1,8], [2,8], [3,8], [4,8], [5,8],
    [6,9], [6,10], [6,11], [6,12], [6,13], [6,14],
    [7,14], [8,14],
    [8,13], [8,12], [8,11], [8,10], [8,9],
    [9,8], [10,8], [11,8], [12,8], [13,8], [14,8],
    [14,7], [14,6],
    [13,6], [12,6], [11,6], [10,6], [9,6],
    [8,5], [8,4], [8,3], [8,2], [8,1], [8,0],
    [7,0], [6,0],
];

const homePaths = {
    green: [[1,7], [2,7], [3,7], [4,7], [5,7]], // Corrected green path
    red: [[13,7], [12,7], [11,7], [10,7], [9,7]], // Corrected red path
    blue: [[7,1], [7,2], [7,3], [7,4], [7,5]], // Corrected blue path
    yellow: [[7,13], [7,12], [7,11], [7,10], [7,9]], // Corrected yellow path
};

// --- SUB-COMPONENTS ---

const Pawn = ({ color }: { color: PlayerColor }) => (
    <div className={cn("h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center border-2 border-black/20 shadow-md shrink-0", colors[color].bg)}>
        <div className="h-1 w-1 sm:h-2 sm:w-2 rounded-full bg-white/50" />
    </div>
);

const HomeBase = ({ color, pawns }: { color: PlayerColor, pawns: PawnState[] }) => {
    const homePawns = pawns.filter(p => p.state === 'home').length;
    return (
        <div className={cn("w-full h-full p-1 sm:p-2 grid place-items-center", colors[color].bg)}>
            <div className="w-full h-full bg-background/50 rounded-lg grid grid-cols-2 grid-rows-2 gap-1 p-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                        {i < homePawns && <Pawn color={color} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

const PathSquare = ({ children, color, isSafe, isStart }: { children?: React.ReactNode; color?: string; isSafe?: boolean, isStart?: boolean }) => (
    <div className={cn("w-full h-full border border-black/10 flex items-center justify-center relative p-0.5", color || 'bg-background', isStart && color)}>
        {isSafe && <Star className="absolute h-3 w-3 sm:h-4 sm:w-4 text-black/20" />}
        <div className="z-10 flex flex-wrap items-center justify-center gap-0.5">{children}</div>
    </div>
);

const HomeTriangle = () => (
    <div className="w-full h-full relative">
        <div className={cn("absolute inset-0", colors.green.bg)} style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }} />
        <div className={cn("absolute inset-0", colors.red.bg)} style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }} />
        <div className={cn("absolute inset-0", colors.blue.bg)} style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }} />
        <div className={cn("absolute inset-0", colors.yellow.bg)} style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }} />
    </div>
);

const Dice = ({ value, isRolling, onRoll }: { value: number | null, isRolling: boolean, onRoll: () => void }) => {
    const faces: Record<number, React.ReactNode> = { 1: <div className="h-3 w-3 rounded-full bg-black" />, 2: <><div className="h-3 w-3 self-start rounded-full bg-black" /><div className="h-3 w-3 self-end rounded-full bg-black" /></>, 3: <><div className="h-3 w-3 self-start rounded-full bg-black" /><div className="h-3 w-3 self-center rounded-full bg-black" /><div className="h-3 w-3 self-end rounded-full bg-black" /></>, 4: <><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /></>, 5: <><div className="h-3 w-3 rounded-full bg-black col-start-1 row-start-1" /><div className="h-3 w-3 rounded-full bg-black col-start-3 row-start-1" /><div className="h-3 w-3 rounded-full bg-black col-start-2 row-start-2" /><div className="h-3 w-3 rounded-full bg-black col-start-1 row-start-3" /><div className="h-3 w-3 rounded-full bg-black col-start-3 row-start-3" /></>, 6: <><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /><div className="h-3 w-3 rounded-full bg-black" /></> };
    return (
        <button onClick={onRoll} disabled={isRolling} className="w-20 h-20 bg-background rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95">
            {isRolling ? <Dices className="h-10 w-10 animate-spin text-primary" /> : (
                <div className={cn("w-14 h-14 flex items-center justify-center p-1", value === 2 ? "flex-col justify-between" : "grid", value === 3 ? "flex-col" : "", value === 4 ? "grid-cols-2" : "grid-cols-3", value === 5 && "grid-rows-3", value === 6 && "grid-cols-2")}>
                   {value ? faces[value] : <Dices className="h-10 w-10 text-muted-foreground" />}
                </div>
            )}
        </button>
    );
};

const LudoBoard = ({ gameState }: { gameState: GameState }) => {
  const pawnsOnBoard = useMemo(() => {
    const pawnMap = new Map<string, PlayerColor[]>();
    Object.values(gameState).forEach(player => {
      player.pawns.forEach(pawn => {
        let key = '';
        if (pawn.state === 'active' || pawn.state === 'safe') {
          const [row, col] = boardPath[pawn.pos];
          key = `${row}-${col}`;
        } else if (pawn.state === 'finished') {
          const path = homePaths[player.color];
          const [row, col] = path[pawn.pos - 52];
          key = `${row}-${col}`;
        }
        if (key) {
            if (!pawnMap.has(key)) pawnMap.set(key, []);
            pawnMap.get(key)!.push(player.color);
        }
      });
    });
    return pawnMap;
  }, [gameState]);

  const renderPawns = (row: number, col: number) => {
    const key = `${row}-${col}`;
    const pawns = pawnsOnBoard.get(key);
    if (!pawns) return null;
    return pawns.map((color, i) => <Pawn key={`${color}-${i}`} color={color} />);
  };

  return (
    <div className="grid grid-cols-15 grid-rows-15 aspect-square w-full max-w-2xl mx-auto p-2 sm:p-4 bg-muted rounded-lg shadow-inner">
      {/* Bases */}
      <div className="col-start-1 col-span-6 row-start-1 row-span-6">
        <HomeBase color="yellow" pawns={gameState.yellow.pawns} />
      </div>
      <div className="col-start-10 col-span-6 row-start-1 row-span-6">
        <HomeBase color="green" pawns={gameState.green.pawns} />
      </div>
      <div className="col-start-1 col-span-6 row-start-10 row-span-6">
        <HomeBase color="blue" pawns={gameState.blue.pawns} />
      </div>
      <div className="col-start-10 col-span-6 row-start-10 row-span-6">
        <HomeBase color="red" pawns={gameState.red.pawns} />
      </div>

      {/* Center Home Triangle */}
      <div className="col-start-7 col-span-3 row-start-7 row-span-3">
        <HomeTriangle />
      </div>
      
      {/* Main Path */}
      {boardPath.map(([row, col], i) => {
        const startColor = Object.keys(startSpots).find(c => startSpots[c as PlayerColor] === i+1) as PlayerColor | undefined;
        return (
            <div key={`path-${i}`} style={{ gridRow: row + 1, gridColumn: col + 1 }}>
                <PathSquare isSafe={safeSpots.includes(i + 1)} isStart={!!startColor} color={startColor ? colors[startColor].bg : undefined}>
                    {renderPawns(row, col)}
                </PathSquare>
            </div>
        )
      })}
      
      {/* Home Paths */}
      {Object.entries(homePaths).map(([color, path]) => (
        path.map(([row, col], i) => (
          <div key={`${color}-home-${i}`} style={{ gridRow: row + 1, gridColumn: col + 1 }}>
            <PathSquare color={colors[color as PlayerColor].bg}>
              {renderPawns(row, col)}
            </PathSquare>
          </div>
        ))
      ))}
    </div>
  );
};


// --- MAIN COMPONENT ---
export default function LudoClient() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [diceValue, setDiceValue] = useState<number | null>(null);
    const [status, setStatus] = useState("Your turn to roll the dice!");
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const handleRollDice = async () => {
        if (isLoading) return;
        setIsLoading(true);
        const roll = Math.floor(Math.random() * 6) + 1;
        await new Promise(res => setTimeout(res, 500)); // Animate dice
        setDiceValue(roll);
        setStatus(`You rolled a ${roll}! Bodhi is suggesting a move...`);
        const move = `User rolled a ${roll}`;
        const currentHistory = [...history, { actor: 'user' as const, move }];
        setHistory(currentHistory);
        try {
            const gameStateString = `Current Ludo state: Red has pawns at ${JSON.stringify(gameState.red.pawns)}, Blue at ${JSON.stringify(gameState.blue.pawns)}. You (Red) rolled a ${roll}. What is the best move?`;
            const response = await getBodhiMove({ game: 'ludo', gameState: gameStateString });
            setHistory(prev => [...prev, { actor: 'bodhi', ...response }]);
            setStatus(`Bodhi suggests: ${response.move}. Your turn to roll again!`);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Bodhi is Confused', description: 'The AI could not process the move. Please try again.' });
            setStatus('An error occurred. Please try your move again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setGameState(initialGameState);
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
        <div className="container mx-auto max-w-7xl py-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <main className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Ludo vs. Bodhi AI</CardTitle>
                            <CardDescription>{status}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LudoBoard gameState={gameState} />
                        </CardContent>
                    </Card>
                </main>
                <aside className="lg:col-span-1 space-y-6 sticky top-24">
                     <Card>
                        <CardHeader><CardTitle>Players</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                                <Avatar className="h-12 w-12 border-2 border-red-500"><AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} /><AvatarFallback className="bg-muted">{getInitials(user?.displayName)}</AvatarFallback></Avatar>
                                <div><p className="font-bold text-red-600">{user?.displayName || 'Player 1 (You)'}</p><p className="text-sm text-muted-foreground">Red</p></div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <Avatar className="h-12 w-12 border-2 border-blue-500"><AvatarFallback className="bg-muted"><Bot className="text-blue-600"/></AvatarFallback></Avatar>
                                <div><p className="font-bold text-blue-600">Bodhi AI</p><p className="text-sm text-muted-foreground">Blue</p></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Game Info</CardTitle></CardHeader>
                        <CardContent className="space-y-4 flex flex-col items-center">
                            <Dice value={diceValue} isRolling={isLoading} onRoll={handleRollDice} />
                        </CardContent>
                         <CardFooter className="flex-col gap-2">
                             <ScrollArea className="h-48 w-full pr-4">
                                <div className="space-y-4 text-sm">
                                    {history.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                {item.actor === 'user' ? <Avatar className="h-6 w-6"><AvatarImage src={user?.photoURL || ''} /><AvatarFallback className="text-xs bg-red-200">{getInitials(user?.displayName)}</AvatarFallback></Avatar> : <Avatar className="h-6 w-6"><AvatarFallback className="text-xs bg-blue-200"><Bot/></AvatarFallback></Avatar>}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.actor === 'user' ? 'You' : 'Bodhi'}: <span className="font-mono bg-muted px-1.5 py-0.5 rounded-sm text-xs">{item.move}</span></p>
                                                {item.commentary && <p className="text-xs text-muted-foreground italic mt-1">"{item.commentary}"</p>}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && <div className="flex gap-3"><div className="flex-shrink-0 mt-1"><BrainCircuit className="h-5 w-5 text-accent animate-pulse" /></div><Skeleton className="h-8 w-3/4" /></div>}
                                    {history.length === 0 && !isLoading && <p className="text-sm text-center text-muted-foreground py-4">The game has just begun. Roll the dice!</p>}
                                </div>
                           </ScrollArea>
                            <Button className="w-full mt-4" variant="outline" onClick={handleReset}><RefreshCw className="mr-2"/> New Game</Button>
                         </CardFooter>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
