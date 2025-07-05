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

const prompt = ai.definePrompt({
  name: 'dailyWisdomPrompt',
  output: {schema: DailyWisdomOutputSchema},
  prompt: `You are a wise scholar of Sanatana Dharma. Your task is to provide a single, profound, and relatively short quote appropriate for daily contemplation. The quote should be from a well-known Acharya (like Adi Shankaracharya or a recent Jagadguru) or a major scripture (like the Upanishads or Bhagavad Gita).

You must provide the quote, its source or author, and a high-quality Hindi translation of the quote.

Do not add any extra commentary or explanation. Only provide the data required by the output schema.`,
});

const dailyWisdomFlow = ai.defineFlow(
  {
    name: 'dailyWisdomFlow',
    outputSchema: DailyWisdomOutputSchema,
  },
  async () => {
    const {output} = await prompt({}, { model: 'googleai/gemini-2.0-flash' });
    return output!;
  }
);
