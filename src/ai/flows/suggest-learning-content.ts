'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting related learning content based on a user's viewing history.
 *
 * - suggestLearningContent - A function that takes a user's viewing history and returns a list of suggested content.
 * - SuggestLearningContentInput - The input type for the suggestLearningContent function.
 * - SuggestLearningContentOutput - The return type for the suggestLearningContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLearningContentInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of content titles or descriptions the user has viewed.'),
});
export type SuggestLearningContentInput = z.infer<
  typeof SuggestLearningContentInputSchema
>;

const SuggestedContentSchema = z.object({
  title: z.string().describe('The title of the suggested content.'),
  url: z.string().describe('The URL of the suggested content.'),
  reason: z.string().describe('The reason why this content is suggested.'),
});

const SuggestLearningContentOutputSchema = z.object({
  suggestions: z
    .array(SuggestedContentSchema)
    .describe('An array of suggested content items.'),
});
export type SuggestLearningContentOutput = z.infer<
  typeof SuggestLearningContentOutputSchema
>;

export async function suggestLearningContent(
  input: SuggestLearningContentInput
): Promise<SuggestLearningContentOutput> {
  return suggestLearningContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningContentPrompt',
  input: {schema: SuggestLearningContentInputSchema},
  output: {schema: SuggestLearningContentOutputSchema},
  prompt: `You are an expert in Sanatana Dharma and have a deep understanding of various learning resources like articles, videos, and discourses.

  Based on the user's viewing history, suggest 2-3 new, related pieces of content that would help them deepen their understanding. Provide a title, url, and a brief reason for each suggestion.

  Viewing History:
  {{#each viewingHistory}}
  - {{{this}}}
  {{/each}}
  `,
});

const suggestLearningContentFlow = ai.defineFlow(
  {
    name: 'suggestLearningContentFlow',
    inputSchema: SuggestLearningContentInputSchema,
    outputSchema: SuggestLearningContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
