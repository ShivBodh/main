
'use server';
/**
 * @fileOverview An AI flow for generating a daily wisdom quote with translation.
 *
 * - getDailyWisdom - A function that returns a quote, its author, and a translation.
 * - DailyWisdomOutput - The return type for the getDailyWisdom function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const DailyWisdomOutputSchema = z.object({
  quote: z
    .string()
    .describe(
      'A profound, concise quote from a known Sanatana Dharma teacher or scripture (e.g., Upanishads, Gita).'
    ),
  author: z.string().describe('The author or source of the quote (e.g., "Adi Shankaracharya" or "Katha Upanishad").'),
  translation: z.string().describe('A high-quality Hindi translation of the quote.'),
});
export type DailyWisdomOutput = z.infer<typeof DailyWisdomOutputSchema>;

export async function getDailyWisdom(): Promise<DailyWisdomOutput> {
  // This flow doesn't require any input.
  return dailyWisdomFlow();
}

const dailyWisdomPrompt = ai.definePrompt({
    name: 'dailyWisdomPrompt',
    output: { schema: DailyWisdomOutputSchema },
    model: 'googleai/gemini-1.5-flash-latest',
    prompt: `You are a wise scholar of Sanatana Dharma. Generate a single, profound, and relatively short quote from a recognized Hindu scripture (like the Upanishads, Puranas, or Bhagavad Gita) or a revered sage (like Adi Shankaracharya, Ramakrishna Paramahamsa, or Ramana Maharshi).

    Provide the quote, its source/author, and a high-quality Hindi translation.`
});


const dailyWisdomFlow = ai.defineFlow(
  {
    name: 'dailyWisdomFlow',
    outputSchema: DailyWisdomOutputSchema,
  },
  async () => {
    const { output } = await dailyWisdomPrompt();
    return output!;
  }
);
