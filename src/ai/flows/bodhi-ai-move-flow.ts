
'use server';
/**
 * @fileOverview An AI flow for generating game moves for Ludo.
 *
 * - getBodhiMove - A function that returns a suggested move from the AI.
 */

import {ai} from '@/ai/genkit';
import {z}from 'zod';

const GameMoveInputSchema = z.object({
  game: z.enum(['ludo']),
  gameState: z.string().describe('The current state of the game board, e.g., a description of the last move.'),
});
export type GameMoveInput = z.infer<typeof GameMoveInputSchema>;

const GameMoveOutputSchema = z.object({
  move: z.string().describe('The suggested move from the AI.'),
  commentary: z.string().describe("Bodhi's commentary on the move."),
});
export type GameMoveOutput = z.infer<typeof GameMoveOutputSchema>;

export async function getBodhiMove(input: GameMoveInput): Promise<GameMoveOutput> {
  return bodhiMoveFlow(input);
}

const bodhiMoveFlow = ai.defineFlow(
  {
    name: 'bodhiMoveFlow',
    inputSchema: GameMoveInputSchema,
    outputSchema: GameMoveOutputSchema,
  },
  async (input) => {
    // MOCK IMPLEMENTATION: This avoids a hard dependency on the AI model for now.
    return {
      move: "Move pawn from B4 to B5.",
      commentary: "A wise step forward, just as a seeker moves steadily on the path of knowledge."
    };
  }
);
