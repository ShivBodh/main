'use server';
/**
 * @fileOverview An AI flow for generating artistic representations of Dharma symbols.
 *
 * - generateDharmaArt - A function that creates an image based on a prompt.
 * - DharmaArtInput - The input type for the generateDharmaArt function.
 * - DharmaArtOutput - The return type for the generateDharmaArt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const DharmaArtInputSchema = z.object({
  prompt: z.string().describe('A description of the symbol to be generated.'),
});
export type DharmaArtInput = z.infer<typeof DharmaArtInputSchema>;

const DharmaArtOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI."),
});
export type DharmaArtOutput = z.infer<typeof DharmaArtOutputSchema>;

export async function generateDharmaArt(input: DharmaArtInput): Promise<DharmaArtOutput> {
  return dharmaArtFlow(input);
}

const dharmaArtFlow = ai.defineFlow(
  {
    name: 'dharmaArtFlow',
    inputSchema: DharmaArtInputSchema,
    outputSchema: DharmaArtOutputSchema,
  },
  async ({prompt}) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Create a beautiful, artistic painting representing a sacred symbol of Sanatana Dharma. The style should be evocative, spiritual, and artistic, not a simple graphic. The symbol is: '${prompt}'. Do not include any text in the image.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        ],
      },
    });

    if (!media) {
        throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
