
'use server';
/**
 * @fileOverview An AI flow for generating images based on a prompt.
 *
 * - generateImage - A function that returns a Data URI for a generated image.
 * - ImageGeneratorInput - The input type for the generateImage function.
 * - ImageGeneratorOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ImageGeneratorInputSchema = z.object({
  prompt: z.string().describe('A detailed prompt describing the desired image.'),
  width: z.number().optional().describe('The width of the image to generate.'),
  height: z.number().optional().describe('The height of the image to generate.'),
});
export type ImageGeneratorInput = z.infer<typeof ImageGeneratorInputSchema>;

const ImageGeneratorOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI."),
});
export type ImageGeneratorOutput = z.infer<typeof ImageGeneratorOutputSchema>;

export async function generateImage(input: ImageGeneratorInput): Promise<ImageGeneratorOutput> {
  return imageGeneratorFlow(input);
}

const imageGeneratorFlow = ai.defineFlow(
  {
    name: 'imageGeneratorFlow',
    inputSchema: ImageGeneratorInputSchema,
    outputSchema: ImageGeneratorOutputSchema,
  },
  async (input) => {
    
    const fullPrompt = `Create a creative, symbolic artwork representing '${input.prompt}'. The piece should be in the style of Indian spiritual art, suitable for a website about Sanatan Dharma.`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: fullPrompt,
      width: input.width,
      height: input.height,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed to produce a result.');
    }

    return { imageUrl: media.url };
  }
);
