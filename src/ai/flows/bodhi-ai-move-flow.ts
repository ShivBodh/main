
'use server';
/**
 * @fileOverview An AI flow for generating game moves for Chess and Ludo.
 *
 * - getBodhiMove - A function that returns a suggested move from the AI.
 */

import {ai} from '@/ai/genkit';
import {z}from 'zod';

const GameMoveInputSchema = z.object({
  game: z.enum(['chess', 'ludo']),
  gameState: z.string().describe('The current state of the game board, e.g., in FEN notation for chess, or a description of the last move.'),
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

const prompt = ai.definePrompt({
  name: 'bodhiMovePrompt',
  input: {schema: GameMoveInputSchema},
  output: {schema: GameMoveOutputSchema},
  prompt: `You are Bodhi, a wise and friendly AI who is an expert at classic board games.
You are playing {{game}} against a user.

The current game state is:
{{gameState}}

Analyze the board and suggest your next move. Also provide some brief, encouraging, and wise commentary on your move.
Keep your commentary friendly and insightful, perhaps relating the move to a concept in Dharma.
`,
});

const bodhiMoveFlow = ai.defineFlow(
  {
    name: 'bodhiMoveFlow',
    inputSchema: GameMoveInputSchema,
    outputSchema: GameMoveOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input, { model: 'googleai/gemini-2.0-flash' });
    return output!;
  }
);
