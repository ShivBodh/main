'use server';
/**
 * @fileOverview An AI flow for generating book cover thumbnails.
 *
 * - generateThumbnail - A function that creates an image based on a prompt.
 * - ThumbnailGeneratorInput - The input type for the generateThumbnail function.
 * - ThumbnailGeneratorOutput - The return type for the generateThumbnail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ThumbnailGeneratorInputSchema = z.object({
  prompt: z.string().describe('A short description or keywords for the book cover concept.'),
});
export type ThumbnailGeneratorInput = z.infer<typeof ThumbnailGeneratorInputSchema>;

const ThumbnailGeneratorOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI."),
});
export type ThumbnailGeneratorOutput = z.infer<typeof ThumbnailGeneratorOutputSchema>;

export async function generateThumbnail(input: ThumbnailGeneratorInput): Promise<ThumbnailGeneratorOutput> {
  return thumbnailGeneratorFlow(input);
}

const thumbnailGeneratorFlow = ai.defineFlow(
  {
    name: 'thumbnailGeneratorFlow',
    inputSchema: ThumbnailGeneratorInputSchema,
    outputSchema: ThumbnailGeneratorOutputSchema,
  },
  async ({prompt}) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Design an artistic, symbolic, and minimalist book cover for a sacred spiritual text about '${prompt}'. The design should be abstract and evocative, suitable for a classic book on philosophy. Avoid using text. Focus on colors and shapes that convey the essence of the topic.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
        ],
      },
    });

    if (!media) {
        throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
