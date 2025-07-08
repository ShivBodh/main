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

// This is the exported wrapper function for server-side use.
export async function processScrapedContent(input: ContentProcessorInput): Promise<ContentProcessorOutput> {
  return contentProcessorFlow(input);
}


const contentProcessorPrompt = ai.definePrompt({
  name: 'contentProcessorPrompt',
  input: { schema: ContentProcessorInputSchema },
  output: { schema: ContentProcessorOutputSchema },
  prompt: `You are an expert content editor for a spiritual website. Your task is to analyze the following raw text from a social media post and extract a concise title and relevant keywords.

Raw Content:
{{{rawContent}}}
`,
});


// The scraper script calls this flow directly via its HTTP endpoint.
// Exporting the flow makes it available to the Genkit server as an API endpoint.
export const contentProcessorFlow = ai.defineFlow(
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
