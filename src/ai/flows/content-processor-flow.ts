
'use server';
/**
 * @fileOverview An AI flow for processing raw text into a structured format.
 *
 * - processScrapedContent - Takes raw text and returns a title and keywords.
 * - RawContentInput - The input type for the flow.
 * - ProcessedContentOutput - The return type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Define the schema for the input (the raw text).
const RawContentInputSchema = z.object({
  rawContent: z.string().describe('The full, raw text content of a social media post or article.'),
});
export type RawContentInput = z.infer<typeof RawContentInputSchema>;

// Define the schema for the output (the structured data).
const ProcessedContentOutputSchema = z.object({
  title: z
    .string()
    .describe('A concise, engaging title (max 10 words) that summarizes the content. Do not use quotes.'),
  keywords: z
    .string()
    .describe(
      'A one or two-word hint for an AI image generator, summarizing the visual essence (e.g., "acharya painting", "temple festival").'
    ),
});
export type ProcessedContentOutput = z.infer<typeof ProcessedContentOutputSchema>;

export async function processScrapedContent(input: RawContentInput): Promise<ProcessedContentOutput> {
  return contentProcessorFlow(input);
}

// Define the AI prompt that will perform the processing.
const contentProcessorPrompt = ai.definePrompt({
  name: 'contentProcessorPrompt',
  input: {schema: RawContentInputSchema},
  output: {schema: ProcessedContentOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `Analyze the following text content. Your task is to extract a short, compelling title and a 1-2 word hint for an AI image generator.

Text Content:
"{{{rawContent}}}"

Generate a title that captures the main theme or event described.
For the keywords, think about the most important visual element described. For example, if the post is about a festival at a temple, use "temple festival". If it's about a specific person, use their title and "painting" (e.g., "acharya painting").`,
});

// Define the Genkit flow that orchestrates the call to the prompt.
const contentProcessorFlow = ai.defineFlow(
  {
    name: 'contentProcessorFlow',
    inputSchema: RawContentInputSchema,
    outputSchema: ProcessedContentOutputSchema,
  },
  async (input) => {
    console.log('[AI Flow] Received raw content, calling prompt...');
    const { output } = await contentProcessorPrompt(input);
    return output!;
  }
);
