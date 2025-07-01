'use server';

/**
 * @fileOverview An AI agent that selects a relevant 'Quote of the Day' from the 'Wisdom Snippets' collection.
 *
 * - selectWisdomSnippet - A function that selects a quote and attributes it to one of the four Peethams.
 * - SelectWisdomSnippetInput - The input type for the selectWisdomSnippet function.
 * - SelectWisdomSnippetOutput - The return type for the selectWisdomSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectWisdomSnippetInputSchema = z.object({
  date: z.string().describe('The current date in ISO format.'),
});
export type SelectWisdomSnippetInput = z.infer<typeof SelectWisdomSnippetInputSchema>;

const SelectWisdomSnippetOutputSchema = z.object({
  quote: z.string().describe('The selected quote of the day.'),
  author: z.string().describe('The author of the quote.'),
  peetham: z.string().describe('The Peetham to which the quote is attributed.'),
});
export type SelectWisdomSnippetOutput = z.infer<typeof SelectWisdomSnippetOutputSchema>;

export async function selectWisdomSnippet(input: SelectWisdomSnippetInput): Promise<SelectWisdomSnippetOutput> {
  return selectWisdomSnippetFlow(input);
}

const wisdomSnippets = [
  {
    quote: 'The key to happiness is reducing desires.',
    author: 'Adi Shankaracharya',
    peetham: 'Govardhana Peetham',
  },
  {
    quote: 'Self-realization is the highest goal of human life.',
    author: 'Swami Sivananda',
    peetham: 'Sringeri Sharada Peetham',
  },
  {
    quote: 'The world is an illusion; Brahman is the only truth.',
    author: 'Ramana Maharshi',
    peetham: 'Dwarka Sharada Peetham',
  },
  {
    quote: 'Serve all beings as manifestations of the Divine.',
    author: 'Mata Amritanandamayi',
    peetham: 'Jyotirmath Peetham',
  },
];

const prompt = ai.definePrompt({
  name: 'selectWisdomSnippetPrompt',
  input: {schema: SelectWisdomSnippetInputSchema},
  output: {schema: SelectWisdomSnippetOutputSchema},
  prompt: `Given the current date: {{{date}}}, select a relevant quote from the following wisdom snippets, attributing it to one of the four Peethams. Return the quote, author, and Peetham. Make sure the quote is inspirational and appropriate for daily reflection.

Wisdom Snippets:
{{#each wisdomSnippets}}
- Quote: {{{this.quote}}}, Author: {{{this.author}}}, Peetham: {{{this.peetham}}}
{{/each}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const selectWisdomSnippetFlow = ai.defineFlow(
  {
    name: 'selectWisdomSnippetFlow',
    inputSchema: SelectWisdomSnippetInputSchema,
    outputSchema: SelectWisdomSnippetOutputSchema,
  },
  async input => {
    // Pass the wisdomSnippets array to the prompt input
    const {output} = await prompt({...input, wisdomSnippets});
    return output!;
  }
);
