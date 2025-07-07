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

const prompt = ai.definePrompt({
  name: 'contentProcessorPrompt',
  input: {schema: ContentProcessorInputSchema},
  output: {schema: ContentProcessorOutputSchema},
  prompt: `You are an expert content curator for a spiritual website. Your task is to process raw text scraped from a social media post and extract a clean, concise title and relevant keywords.

The raw text is:
{{{rawContent}}}

Based on this text, generate a suitable title and keywords. The title should be short and descriptive. The keywords will be used for image search hints, so they should be simple and visual.
`,
});

const contentProcessorFlow = ai.defineFlow(
  {
    name: 'contentProcessorFlow',
    inputSchema: ContentProcessorInputSchema,
    outputSchema: ContentProcessorOutputSchema,
  },
  async (input) => {
    // By explicitly selecting a powerful model like Gemini Flash, we ensure
    // it can handle the structured output request reliably.
    const {output} = await prompt(input, { model: 'googleai/gemini-2.0-flash' });

    // We add a check to ensure the AI returns a valid output.
    if (!output) {
      console.error("AI content processor failed to generate a valid output.");
      // The calling script will handle this and use fallback data.
      throw new Error("AI processing returned no output.");
    }
    
    return output;
  }
);
