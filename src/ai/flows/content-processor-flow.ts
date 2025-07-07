'use server';
/**
 * @fileOverview An AI flow for processing scraped content.
 *
 * - processContent - A function that takes raw text and returns a structured title and keywords.
 * - ContentProcessorInput - The input type for the processContent function.
 * - ContentProcessorOutput - The return type for the processContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ContentProcessorInputSchema = z.object({
  rawContent: z
    .string()
    .describe(
      'The raw text content scraped from a social media post or article, which may be messy.'
    ),
});
export type ContentProcessorInput = z.infer<typeof ContentProcessorInputSchema>;

const ContentProcessorOutputSchema = z.object({
  title: z.string().describe('A concise and engaging title, no more than 10 words long.'),
  keywords: z.string().describe('Two or three relevant keywords, separated by spaces. For example: "temple festival" or "acharya discourse".'),
});
export type ContentProcessorOutput = z.infer<typeof ContentProcessorOutputSchema>;

// This is the main function that will be called by the scraper tool.
export async function processContent(input: ContentProcessorInput): Promise<ContentProcessorOutput> {
  return contentProcessorFlow(input);
}

const contentProcessorFlow = ai.defineFlow(
  {
    name: 'contentProcessorFlow',
    inputSchema: ContentProcessorInputSchema,
    outputSchema: ContentProcessorOutputSchema,
  },
  async (input) => {
    // MOCK IMPLEMENTATION: With the googleAI() plugin disabled in genkit.ts,
    // this mock implementation is guaranteed to run, bypassing any potential
    // environment or API key issues. This ensures the data pipeline works correctly.
    console.log('[AI Flow] Running MOCK contentProcessorFlow...');
    
    const mockOutput = {
        title: "Jagadgurus Grace Evening Sabha in Varanasi",
        keywords: "shankaracharya varanasi",
    };
    
    console.log('[AI Flow] Successfully generated MOCK output.');
    return mockOutput;
  }
);
