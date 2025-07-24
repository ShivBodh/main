
'use server';
/**
 * @fileOverview An AI flow for generating a daily wisdom quote.
 *
 * - getDailyWisdom - A function that returns a quote from an Acharya.
 * - DailyWisdomOutput - The return type for the getDailyWisdom function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const DailyWisdomOutputSchema = z.object({
  quote: z.string().describe('A profound and authentic quote from a revered Acharya of one of the four Peethams (Sringeri, Dwaraka, Puri, Jyotirmath). The quote should be in English.'),
  author: z.string().describe('The name of the Acharya or the Upanishad from which the quote is sourced.'),
  translation: z.string().describe('The Hindi translation of the quote.'),
});
export type DailyWisdomOutput = z.infer<typeof DailyWisdomOutputSchema>;

export async function getDailyWisdom(): Promise<DailyWisdomOutput> {
  return getDailyWisdomFlow();
}

const dailyWisdomPrompt = ai.definePrompt({
  name: 'dailyWisdomPrompt',
  input: { schema: z.void() },
  output: { schema: DailyWisdomOutputSchema },
  prompt: `You are a wise scholar of Vedanta philosophy, steeped in the teachings of the four cardinal Peethams established by Adi Shankaracharya.

Generate a single, profound, and authentic quote for a "Quote of the Day" widget. The quote must be from one of the following sources:
1.  A Jagadguru Shankaracharya from the Sringeri, Dwaraka, Puri, or Jyotirmath lineage.
2.  An Upanishad (e.g., Katha Upanishad, Isha Upanishad).
3.  A foundational Advaita Vedanta text (e.g., Vivekachudamani, Atma Bodha).

Provide the quote in English, attribute it correctly to its source (e.g., "Sri Adi Shankaracharya" or "Katha Upanishad"), and provide a beautiful, accurate Hindi translation.
`,
});

const getDailyWisdomFlow = ai.defineFlow(
  {
    name: 'getDailyWisdomFlow',
    outputSchema: DailyWisdomOutputSchema,
  },
  async () => {
    const {output} = await dailyWisdomPrompt();
    return output!;
  }
);
