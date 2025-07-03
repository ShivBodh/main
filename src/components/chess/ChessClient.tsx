
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Chess, Square, PieceSymbol } from 'chess.js';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getAiMove } from '@/ai/flows/chess-ai-flow';
import { Crown, BrainCircuit, RotateCcw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const pieceUnicode: Record<string, Record<string, string>> = {
    w: { p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔' },
    b: { p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚' }
};

const Chessboard = ({ board, onSquareClick, selectedSquare, validMoves }: {
    board: ({ square: Square; type: PieceSymbol; color: "b" | "w"; } | null)[][];
    onSquareClick: (square: Square) => void;
    selectedSquare: Square | null;
    validMoves: string[];
}) => {
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const isLightSquare = (row: number, col: number) => (row + col) % 2 !== 0;

    return (
        <div className="grid grid-cols-8 aspect-square border-2 border-primary/20 bg-card">
            {ranks.map((rank, rowIndex) =>
                files.map((file, colIndex) => {
                    const square = `${file}${rank}` as Square;
                    const piece = board[rowIndex][colIndex];
                    const isSelected = square === selectedSquare;
                    const isPossibleMove = validMoves.includes(square);

                    return (
                        <div
                            key={square}
                            onClick={() => onSquareClick(square)}
                            className={`flex justify-center items-center h-full w-full cursor-pointer relative ${
                                isLightSquare(rowIndex, colIndex) ? 'bg-secondary/30' : 'bg-primary/10'
                            } ${isSelected ? 'bg-accent/80' : ''}`}
                        >
                            {piece && (
                                <span className="text-4xl md:text-5xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                    {pieceUnicode[piece.color][piece.type]}
                                </span>
                            )}
                            {isPossibleMove && (
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <div className="h-1/3 w-1/3 rounded-full bg-accent/50"></div>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};


export default function ChessClient() {
    const [game, setGame] = useState<Chess | null>(null);
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [gameOver, setGameOver] = useState<{ status: string, winner?: string } | null>(null);

    useEffect(() => {
        setGame(new Chess());
        setIsClient(true);
    }, []);

    const board = useMemo(() => game?.board() ?? [], [game]);
    const history = useMemo(() => game?.history({ verbose: true }).map(m => m.san) ?? [], [game]);

    const validMoves = useMemo(() => {
        if (!selectedSquare || !game) return [];
        const moves = game.moves({ square: selectedSquare, verbose: true });
        return moves.map(move => move.to);
    }, [selectedSquare, game]);

    const handleSquareClick = (square: Square) => {
        if (!game || gameOver || isAiThinking) return;

        if (game.turn() === 'w') {
            if (selectedSquare) {
                try {
                    const move = game.move({
                        from: selectedSquare,
                        to: square,
                        promotion: 'q' 
                    });
                    
                    if (move) {
                        setGame(new Chess(game.fen())); 
                        checkGameState();
                    }
                } catch (e) {
                    const piece = game.get(square);
                    if (piece && piece.color === 'w') {
                        setSelectedSquare(square);
                    } else {
                        setSelectedSquare(null);
                    }
                    return;
                }
                setSelectedSquare(null);
            } else {
                const piece = game.get(square);
                if (piece && piece.color === 'w') {
                    setSelectedSquare(square);
                }
            }
        }
    };
    
    const checkGameState = () => {
        if (!game) return;
        if (game.isGameOver()) {
            let status = 'Game Over';
            let winner = '';
            if (game.isCheckmate()) {
                status = 'Checkmate';
                winner = game.turn() === 'w' ? 'Black (AI)' : 'White (You)';
            } else if (game.isDraw()) {
                status = 'Draw';
            } else if (game.isStalemate()) {
                status = 'Stalemate';
            } else if (game.isThreefoldRepetition()) {
                status = 'Draw by Threefold Repetition';
            }
            setGameOver({ status, winner });
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (game && game.turn() === 'b' && !gameOver) {
            const makeAiMove = async () => {
                setIsAiThinking(true);
                try {
                    const result = await getAiMove({ fen: game.fen(), history });
                    game.move(result.move);
                    setGame(new Chess(game.fen()));
                    checkGameState();
                } catch (error) {
                    console.error("AI move failed:", error);
                } finally {
                    setIsAiThinking(false);
                }
            };
            setTimeout(makeAiMove, 500);
        }
    }, [game, gameOver, history]);

    const handleReset = () => {
        setGame(new Chess());
        setSelectedSquare(null);
        setGameOver(null);
        setIsAiThinking(false);
    };

    if (!isClient || !game) {
        return (
            <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
                <div className="text-center mb-12">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Skeleton className="aspect-square w-full" />
                    </div>
                    <div className="md:col-span-1 space-y-4">
                       <Skeleton className="h-48 w-full" />
                       <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto max-w-5xl py-16 md:py-24 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight flex items-center justify-center gap-4">
                    <Crown className="h-10 w-10 text-accent" /> Chess AI
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                    Challenge "Bodhi," our chess AI. You are playing as White. Can you outsmart the machine?
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Chessboard 
                        board={board} 
                        onSquareClick={handleSquareClick}
                        selectedSquare={selectedSquare}
                        validMoves={validMoves}
                    />
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {gameOver && (
                         <Alert variant="default" className="border-primary bg-primary/10">
                            <AlertTriangle className="h-4 w-4 text-primary" />
                            <AlertTitle className="font-headline text-lg text-primary">{gameOver.status}</AlertTitle>
                            <AlertDescription>
                                {gameOver.winner ? `Winner: ${gameOver.winner}` : "The game is a draw."}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2">
                                {isAiThinking ? (
                                    <>
                                        <BrainCircuit className="h-6 w-6 animate-pulse text-accent" />
                                        AI is thinking...
                                    </>
                                ) : (
                                    <>
                                    {game.turn() === 'w' ? 'Your Turn (White)' : "AI's Turn (Black)"}
                                    </>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground">Click a piece to select it, then click a highlighted square to move.</p>
                           {game.isCheck() && !gameOver && (
                                <p className="mt-4 text-destructive font-bold">Check!</p>
                           )}
                        </CardContent>
                         <CardFooter>
                            <Button onClick={handleReset} className="w-full">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                New Game
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Move History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-48 overflow-y-auto bg-muted/50 p-2 rounded-md font-mono text-sm space-y-1">
                                {history.length === 0 ? (
                                    <p className="text-muted-foreground">No moves yet.</p>
                                ) : (
                                    <ol className="list-decimal list-inside columns-1 sm:columns-2 gap-x-4">
                                      {history.map((move, index) => (
                                        <li key={index} className="flex gap-2">
                                            {index % 2 === 0 && <span className="w-4 text-right text-muted-foreground">{Math.floor(index/2)+1}.</span>}
                                            <span>{move}</span>
                                        </li>
                                      ))}
                                    </ol>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
