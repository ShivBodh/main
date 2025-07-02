'use server';
/**
 * @fileOverview A chess AI agent.
 *
 * - getAiMove - A function that returns the AI's next move.
 * - ChessMoveInput - The input type for the getAiMove function.
 * - ChessMoveOutput - The return type for the getAiMove function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChessMoveInputSchema = z.object({
  fen: z.string().describe('The board state in Forsyth-Edwards Notation (FEN).'),
  history: z.array(z.string()).describe('A list of moves made so far in Standard Algebraic Notation (SAN).'),
});
export type ChessMoveInput = z.infer<typeof ChessMoveInputSchema>;

const ChessMoveOutputSchema = z.object({
  move: z.string().describe('The best next move for the black pieces in Standard Algebraic Notation (e.g., e4, Nf3, O-O).'),
});
export type ChessMoveOutput = z.infer<typeof ChessMoveOutputSchema>;

export async function getAiMove(input: ChessMoveInput): Promise<ChessMoveOutput> {
  return chessAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chessAiPrompt',
  input: {schema: ChessMoveInputSchema},
  output: {schema: ChessMoveOutputSchema},
  prompt: `You are a world-class chess engine. Your name is "Bodhi." You will play as the black pieces.
The current board state is represented by the following FEN string:
{{{fen}}}

The move history of the game so far is:
{{#each history}}
{{this}}
{{/each}}

It is your turn to move. Analyze the position and determine the best possible move for black.
Your response must be only the move in Standard Algebraic Notation (e.g., "e4", "Nf3", "O-O").
Do not include any explanation, commentary, or any other text. Just the move.`,
});

const chessAiFlow = ai.defineFlow(
  {
    name: 'chessAiFlow',
    inputSchema: ChessMoveInputSchema,
    outputSchema: ChessMoveOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
