
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

const dailyWisdomFlow = ai.defineFlow(
  {
    name: 'dailyWisdomFlow',
    outputSchema: DailyWisdomOutputSchema,
  },
  async () => {
    // MOCK IMPLEMENTATION: This avoids a hard dependency on the AI model for now.
    return {
      quote: "The Self is not to be known by the study of the scriptures, nor by the intellect, nor by much hearing.",
      author: "Katha Upanishad",
      translation: "आत्मा न तो प्रवचन से, न बुद्धि से, और न बहुत सुनने से ही जाना जा सकता है।"
    };
  }
);
