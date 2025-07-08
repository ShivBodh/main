'use server';
/**
 * @fileOverview An AI flow for processing scraped content.
 *
 * This file defines the `contentProcessorFlow`, which takes raw text
 * and returns a structured title and keywords.
 *
 * - processScrapedContent - A function that handles the content processing.
 * - ContentProcessorInput - The input type for the contentProcessorFlow.
 * - ContentProcessorOutput - The return type for the contentProcessorFlow.
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

/**
 * This is the primary exported function. The scraper script imports and calls this directly.
 * @param input The raw content to be processed by the AI.
 * @returns A promise that resolves to the structured data (title and keywords).
 */
export async function processScrapedContent(input: ContentProcessorInput): Promise<ContentProcessorOutput> {
  // We call the internally defined flow. This allows us to keep the core AI logic
  // separate from its execution context.
  return contentProcessorFlow(input);
}


const contentProcessorPrompt = ai.definePrompt({
  name: 'contentProcessorPrompt',
  input: { schema: ContentProcessorInputSchema },
  output: { schema: ContentProcessorOutputSchema },
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert content editor for a spiritual website. Your task is to analyze the following raw text from a social media post and extract a concise title and a few relevant keywords.

Raw Content:
{{{rawContent}}}
`,
});

// This flow is defined internally and is NOT exported.
// It is called by the `processScrapedContent` wrapper function.
const contentProcessorFlow = ai.defineFlow(
  {
    name: 'contentProcessorFlow',
    inputSchema: ContentProcessorInputSchema,
    outputSchema: ContentProcessorOutputSchema,
  },
  async (input) => {
    const { output } = await contentProcessorPrompt(input);
    return output!;
  }
);
