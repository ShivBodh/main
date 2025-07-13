
'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
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

// --- TYPES & CONSTANTS ---
type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';
type PawnState = { pos: number; state: 'home' | 'safe' | 'active' | 'finished' };
type PlayerState = { pawns: PawnState[]; color: PlayerColor; name: string; isAI: boolean };
type GameState = Record<PlayerColor, PlayerState>;
type HistoryItem = { actor: string; move: string; commentary?: string; };

const colors = {
    red: { bg: 'bg-red-500', border: 'border-red-700' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-700' },
    green: { bg: 'bg-green-500', border: 'border-green-700' },
    yellow: { bg: 'bg-yellow-400', border: 'border-yellow-600' },
};
const safeSpots = [1, 9, 14, 22, 27, 35, 40, 48];
const startSpots: Record<PlayerColor, number> = { red: 1, green: 14, yellow: 27, blue: 40 };

const boardPath = [
    [6,1],[6,2],[6,3],[6,4],[6,5],
    [5,6],[4,6],[3,6],[2,6],[1,6],[0,6],
    [0,7],
    [0,8],[1,8],[2,8],[3,8],[4,8],[5,8],
    [6,9],[6,10],[6,11],[6,12],[6,13],
    [7,14],[8,14],
    [8,13],[8,12],[8,11],[8,10],[8,9],
    [9,8],[10,8],[11,8],[12,8],[13,8],[14,8],
    [14,7],
    [14,6],[13,6],[12,6],[11,6],[10,6],[9,6],
    [8,5],[8,4],[8,3],[8,2],[8,1],
    [7,0],
];

const homePaths: Record<PlayerColor, number[][]> = {
    red: [[7,1], [7,2], [7,3], [7,4], [7,5], [7,6]],
    green: [[1,7], [2,7], [3,7], [4,7], [5,7], [6,7]],
    yellow: [[7,13], [7,12], [7,11], [7,10], [7,9], [7,8]],
    blue: [[13,7], [12,7], [11,7], [10,7], [9,7], [8,7]],
};

const playerColors: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];

// --- SUB-COMPONENTS ---
const Pawn = ({ color }: { color: PlayerColor }) => (
    <div className={cn("h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center border-2 border-black/20 shadow-md shrink-0", colors[color].bg)}>
        <div className="h-1 w-1 sm:h-2 sm:w-2 rounded-full bg-white/50" />
    </div>
);

const HomeBase = ({ color, pawns }: { color: PlayerColor, pawns: PawnState[] }) => {
    const homePawnsCount = pawns.filter(p => p.state === 'home').length;
    return (
        <div className={cn("w-full h-full p-1 sm:p-2 grid place-items-center rounded-lg", colors[color].bg, "bg-opacity-70")}>
            <div className="w-full h-full bg-background/50 rounded-md grid grid-cols-2 grid-rows-2 gap-1 p-1">
                {Array.from({ length: homePawnsCount }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                        <Pawn color={color} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const PathSquare = ({ children, color, isSafe, isStart }: { children?: React.ReactNode; color?: string; isSafe?: boolean, isStart?: boolean }) => (
    <div className={cn("w-full h-full border border-black/10 flex items-center justify-center relative p-0.5 bg-background", color, isStart && color)}>
        {isSafe && !isStart && <Star className="absolute h-3 w-3 sm:h-4 sm:w-4 text-black/20" />}
        {isStart && <Star className="absolute h-full w-full p-1 text-white/70" />}
        <div className="z-10 flex flex-wrap items-center justify-center gap-0.5">{children}</div>
    </div>
);

const HomeTriangle = () => (
    <div className="w-full h-full relative">
        <div className={cn("absolute inset-0", colors.green.bg)} style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }} />
        <div className={cn("absolute inset-0", colors.blue.bg)} style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }} />
        <div className={cn("absolute inset-0", colors.red.bg)} style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }} />
        <div className={cn("absolute inset-0", colors.yellow.bg)} style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }} />
    </div>
);

const Dice = ({ value, isRolling, onRoll, disabled }: { value: number | null, isRolling: boolean, onRoll: () => void, disabled: boolean }) => {
    return (
        <button onClick={onRoll} disabled={isRolling || disabled} className="w-20 h-20 bg-background rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            {isRolling ? <Dices className="h-10 w-10 animate-spin text-primary" /> : <div className="text-4xl font-bold">{value || '?'}</div>}
        </button>
    );
};

const LudoBoard = ({ gameState, onPawnClick }: { gameState: GameState, onPawnClick: (color: PlayerColor, pawnIndex: number) => void }) => {
  const pawnsOnBoard = useMemo(() => {
    const pawnMap = new Map<string, {color: PlayerColor, index: number}[]>();
    Object.values(gameState).forEach(player => {
      player.pawns.forEach((pawn, pawnIndex) => {
        let key = '';
        if (pawn.state === 'active' || pawn.state === 'safe') {
          const [row, col] = boardPath[pawn.pos];
          key = `${row}-${col}`;
        } else if (pawn.state === 'finished') {
          const path = homePaths[player.color];
          if(pawn.pos >= 0 && pawn.pos < path.length) {
            const [row, col] = path[pawn.pos];
            key = `${row}-${col}`;
          }
        }
        if (key) {
            if (!pawnMap.has(key)) pawnMap.set(key, []);
            pawnMap.get(key)!.push({color: player.color, index: pawnIndex});
        }
      });
    });
    return pawnMap;
  }, [gameState]);

  const renderPawns = (row: number, col: number) => {
    const key = `${row}-${col}`;
    const pawns = pawnsOnBoard.get(key);
    if (!pawns) return null;
    return pawns.map(({color, index}) => <button key={`${color}-${index}`} onClick={() => onPawnClick(color, index)}><Pawn color={color} /></button>);
  };

  return (
    <div className="grid grid-cols-15 grid-rows-15 aspect-square w-full max-w-2xl mx-auto p-2 sm:p-4 bg-muted rounded-lg shadow-inner">
        <div className="col-start-1 col-span-6 row-start-1 row-span-6"><HomeBase color="red" pawns={gameState.red.pawns} /></div>
        <div className="col-start-10 col-span-6 row-start-1 row-span-6"><HomeBase color="green" pawns={gameState.green.pawns} /></div>
        <div className="col-start-1 col-span-6 row-start-10 row-span-6"><HomeBase color="blue" pawns={gameState.blue.pawns} /></div>
        <div className="col-start-10 col-span-6 row-start-10 row-span-6"><HomeBase color="yellow" pawns={gameState.yellow.pawns} /></div>
        <div className="col-start-7 col-span-3 row-start-7 row-span-3"><HomeTriangle /></div>
        {boardPath.map(([row, col], i) => {
            const startColor = Object.keys(startSpots).find(c => startSpots[c as PlayerColor] === i) as PlayerColor | undefined;
            return (
                <div key={`path-${i}`} style={{ gridRow: row + 1, gridColumn: col + 1 }}>
                    <PathSquare isSafe={safeSpots.includes(i)} isStart={!!startColor} color={startColor ? colors[startColor].bg : undefined}>
                        {renderPawns(row, col)}
                    </PathSquare>
                </div>
            )
        })}
        {Object.entries(homePaths).map(([color, path]) => (
            path.map(([row, col], i) => (
            <div key={`${color}-home-${i}`} style={{ gridRow: row + 1, gridColumn: col + 1 }}>
                <PathSquare color={cn(colors[color as PlayerColor].bg, "bg-opacity-50")}>
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
    const [gameState, setGameState] = useState<GameState>(createInitialState());
    const [diceValue, setDiceValue] = useState<number | null>(null);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [status, setStatus] = useState("Your turn to roll the dice!");
    const [winner, setWinner] = useState<PlayerColor | null>(null);

    const currentPlayerColor = playerColors[currentPlayerIndex];
    const isMyTurn = !gameState[currentPlayerColor].isAI;

    function createInitialState(): GameState {
        return {
          red: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'red', name: user?.displayName || 'Player 1', isAI: false },
          green: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'green', name: 'Bodhi AI', isAI: true },
          yellow: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'yellow', name: 'Bodhi AI 2', isAI: true },
          blue: { pawns: Array(4).fill({ pos: -1, state: 'home' }), color: 'blue', name: 'Bodhi AI 3', isAI: true },
        };
    }

    const addHistory = useCallback((actor: string, move: string, commentary?: string) => {
        setHistory(prev => [{ actor, move, commentary }, ...prev]);
    }, []);

    const nextTurn = useCallback((lastDiceRoll: number) => {
        setDiceValue(null);
        if (lastDiceRoll !== 6 && !winner) {
            setCurrentPlayerIndex(prev => (prev + 1) % 4);
        } else {
            addHistory(gameState[currentPlayerColor].name, 'gets another turn.');
        }
    }, [winner, gameState, currentPlayerColor, addHistory]);

    const getValidMoves = (currentState: GameState, color: PlayerColor, roll: number): number[] => {
        const player = currentState[color];
        const validPawnIndices: number[] = [];
        player.pawns.forEach((pawn, index) => {
            if (pawn.state === 'home' && roll === 6) {
                validPawnIndices.push(index);
            } else if (pawn.state === 'active' || pawn.state === 'safe') {
                const homeEntryPos = (startSpots[color] + 50) % 52;
                let stepsToHomeEntry = (homeEntryPos - pawn.pos + 52) % 52;
                if(pawn.pos < startSpots[color]) stepsToHomeEntry = (homeEntryPos - pawn.pos + 52) % 52;
                else stepsToHomeEntry = homeEntryPos - pawn.pos;
                if(pawn.pos > homeEntryPos) stepsToHomeEntry = 52 - pawn.pos + homeEntryPos;

                if (stepsToHomeEntry < roll) { // moving into home path
                    const homePathSteps = roll - stepsToHomeEntry - 1;
                    if(homePathSteps < 6) validPawnIndices.push(index);
                } else {
                    validPawnIndices.push(index);
                }
            } else if (pawn.state === 'finished') {
                if (pawn.pos + roll < 6) {
                    validPawnIndices.push(index);
                }
            }
        });
        return validPawnIndices;
    }

    const handlePawnClick = useCallback((color: PlayerColor, pawnIndex: number) => {
        if(winner || color !== currentPlayerColor || diceValue === null) return;
        
        const validMoves = getValidMoves(gameState, color, diceValue);
        if (!validMoves.includes(pawnIndex)) {
            toast({ variant: 'destructive', title: 'Invalid Move' });
            return;
        }

        setGameState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const pawn = newState[color].pawns[pawnIndex];
            
            if (pawn.state === 'home' && diceValue === 6) {
                pawn.state = 'safe'; // Start spot is always safe
                pawn.pos = startSpots[color];
            } else if (pawn.state === 'finished') {
                pawn.pos += diceValue;
            } else { // active or safe
                const homeEntryPos = (startSpots[color] + 50) % 52;
                 let stepsToHomeEntry = (homeEntryPos - pawn.pos + 52) % 52;
                 if(pawn.pos > homeEntryPos && pawn.pos < startSpots[color]) { // complex wrap around logic
                    stepsToHomeEntry = 52 - pawn.pos + homeEntryPos
                 }
                 else if (pawn.pos <= homeEntryPos) {
                     stepsToHomeEntry = homeEntryPos-pawn.pos
                 }
                
                if (stepsToHomeEntry < diceValue) {
                     pawn.state = 'finished';
                     pawn.pos = diceValue - stepsToHomeEntry - 1;
                } else {
                    pawn.pos = (pawn.pos + diceValue) % 52;
                    pawn.state = safeSpots.includes(pawn.pos) ? 'safe' : 'active';
                }
            }
            
            // Capture logic
            if(pawn.state === 'active'){
                Object.entries(newState).forEach(([otherColor, playerState]) => {
                    if (otherColor !== color) {
                        (playerState as PlayerState).pawns.forEach(otherPawn => {
                            if (otherPawn.pos === pawn.pos && otherPawn.state === 'active') {
                                otherPawn.pos = -1;
                                otherPawn.state = 'home';
                                addHistory(gameState[color].name, `captured ${otherColor} pawn!`);
                            }
                        });
                    }
                });
            }

            if (newState[color].pawns.every(p => p.state === 'finished' && p.pos === 5)) {
                setWinner(color);
                addHistory('System', `${gameState[color].name} has won the game!`);
            }
            
            return newState;
        });

        setTimeout(() => nextTurn(diceValue), 500);

    }, [winner, currentPlayerColor, diceValue, gameState, addHistory, nextTurn, toast]);

    const handleRollDice = useCallback(async () => {
        if (isRolling || winner) return;
        setIsRolling(true);
        addHistory(gameState[currentPlayerColor].name, 'is rolling...');
        const roll = Math.floor(Math.random() * 6) + 1;
        await new Promise(res => setTimeout(res, 500));
        setDiceValue(roll);
        setIsRolling(false);
        addHistory(gameState[currentPlayerColor].name, `rolled a ${roll}.`);
        
        // Check for valid moves
        const validMoves = getValidMoves(gameState, currentPlayerColor, roll);
        if (validMoves.length === 0) {
            addHistory(gameState[currentPlayerColor].name, 'has no valid moves.');
            setTimeout(() => nextTurn(roll), 1000);
        } else {
             setStatus('Select a pawn to move.');
             if (gameState[currentPlayerColor].isAI) {
                 setTimeout(() => handlePawnClick(currentPlayerColor, validMoves[0]), 1000);
             }
        }
    }, [isRolling, winner, gameState, currentPlayerColor, addHistory, nextTurn, handlePawnClick]);

    const handleReset = useCallback(() => {
        setGameState(createInitialState());
        setDiceValue(null);
        setCurrentPlayerIndex(0);
        setIsRolling(false);
        setHistory([]);
        setStatus("Your turn to roll the dice!");
        setWinner(null);
        addHistory('System', 'Game has been reset.');
    }, [addHistory, user]);

    useEffect(() => {
        if(winner) {
            setStatus(`${gameState[winner].name} wins!`);
            return;
        }

        const player = gameState[currentPlayerColor];
        setStatus(`${player.name}'s turn.`);

        if(player.isAI && diceValue === null) {
            setTimeout(() => {
                if (!isRolling) handleRollDice();
            }, 1000);
        }
    }, [currentPlayerIndex, diceValue, gameState, winner, isRolling]);


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
                            <CardTitle className="font-headline text-3xl">Pasha vs. Bodhi AI</CardTitle>
                            <CardDescription>{status}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LudoBoard gameState={gameState} onPawnClick={handlePawnClick} />
                        </CardContent>
                    </Card>
                </main>
                <aside className="lg:col-span-1 space-y-6 sticky top-24">
                     <Card>
                        <CardHeader><CardTitle>Players</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           {Object.values(gameState).map(p => (
                               <div key={p.color} className={cn("flex items-center gap-3 p-2 rounded-lg border", `bg-${p.color}-500/10 border-${p.color}-500/20`, currentPlayerColor === p.color && 'ring-2 ring-primary')}>
                                    <Avatar className={cn("h-12 w-12 border-2", `border-${p.color}-500`)}><AvatarImage src={p.isAI ? '' : user?.photoURL || ''} /><AvatarFallback className="bg-muted">{p.isAI ? <Bot/> : getInitials(user?.displayName)}</AvatarFallback></Avatar>
                                    <div><p className="font-bold">{p.name}</p><p className="text-sm text-muted-foreground capitalize">{p.color}</p></div>
                                </div>
                           ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Game Info</CardTitle></CardHeader>
                        <CardContent className="space-y-4 flex flex-col items-center">
                            <Dice value={diceValue} isRolling={isRolling} onRoll={handleRollDice} disabled={!isMyTurn} />
                        </CardContent>
                         <CardFooter className="flex-col gap-2">
                             <ScrollArea className="h-48 w-full pr-4">
                                <div className="space-y-4 text-sm">
                                    {history.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                {item.actor === (user?.displayName || 'Player 1') ? <Avatar className="h-6 w-6"><AvatarImage src={user?.photoURL || ''} /><AvatarFallback className="text-xs bg-red-200">{getInitials(user?.displayName)}</AvatarFallback></Avatar> : <Avatar className="h-6 w-6"><AvatarFallback className="text-xs bg-blue-200"><Bot/></AvatarFallback></Avatar>}
                                            </div>
                                            <div>
                                                <p><span className="font-medium">{item.actor}</span>: {item.move}</p>
                                                {item.commentary && <p className="text-xs text-muted-foreground italic mt-1">"{item.commentary}"</p>}
                                            </div>
                                        </div>
                                    ))}
                                    {isRolling && <div className="flex gap-3"><div className="flex-shrink-0 mt-1"><BrainCircuit className="h-5 w-5 text-accent animate-pulse" /></div><Skeleton className="h-8 w-3/4" /></div>}
                                    {history.length === 0 && !isRolling && <p className="text-sm text-center text-muted-foreground py-4">The game has just begun. Roll the dice!</p>}
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

