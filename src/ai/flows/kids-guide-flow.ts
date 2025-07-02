'use server';
/**
 * @fileOverview An AI guide for the Kids Corner scratch activity.
 *
 * - getKidsGuide - A function that generates a friendly guide for the scratch activity.
 * - KidsGuideInput - The input type for the getKidsGuide function.
 * - KidsGuideOutput - The return type for the getKidsGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KidsGuideInputSchema = z.object({
  figureName: z.string().describe('The name of the spiritual figure in the hidden image.'),
});
export type KidsGuideInput = z.infer<typeof KidsGuideInputSchema>;

const KidsGuideOutputSchema = z.object({
  guideText: z.string().describe("The friendly, kid-oriented instructional text."),
});
export type KidsGuideOutput = z.infer<typeof KidsGuideOutputSchema>;

export async function getKidsGuide(input: KidsGuideInput): Promise<KidsGuideOutput> {
  return kidsGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'kidsGuidePrompt',
  input: {schema: KidsGuideInputSchema},
  output: {schema: KidsGuideOutputSchema},
  prompt: `You are a friendly and encouraging guide for a kids' coloring app. Your audience is young children (ages 1-8).

Generate a short, simple, and exciting message (2-3 sentences) explaining how to use a digital 'scratch pad'. They need to use their mouse or finger to scratch away a gray box to reveal a hidden picture of {{figureName}}.

Use very simple words and an enthusiastic, encouraging tone. For example: "Wow! Are you ready for a surprise?"`,
});

const kidsGuideFlow = ai.defineFlow(
  {
    name: 'kidsGuideFlow',
    inputSchema: KidsGuideInputSchema,
    outputSchema: KidsGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
