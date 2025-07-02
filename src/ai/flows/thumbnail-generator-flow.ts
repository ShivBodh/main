'use server';
/**
 * @fileOverview An AI thumbnail generator for videos.
 *
 * - generateThumbnail - A function that creates a thumbnail image based on video details.
 * - ThumbnailInput - The input type for the generateThumbnail function.
 * - ThumbnailOutput - The return type for the generateThumbnail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ThumbnailInputSchema = z.object({
  title: z.string().describe('The title of the video.'),
  description: z.string().describe('The description of the video.'),
});
export type ThumbnailInput = z.infer<typeof ThumbnailInputSchema>;

const ThumbnailOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type ThumbnailOutput = z.infer<typeof ThumbnailOutputSchema>;

export async function generateThumbnail(input: ThumbnailInput): Promise<ThumbnailOutput> {
  return thumbnailGeneratorFlow(input);
}

const thumbnailGeneratorFlow = ai.defineFlow(
  {
    name: 'thumbnailGeneratorFlow',
    inputSchema: ThumbnailInputSchema,
    outputSchema: ThumbnailOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Create a visually compelling and spiritually resonant thumbnail image for a video.
      The image should be abstract, symbolic, and beautiful, suitable for a YouTube thumbnail on a channel about Sanatana Dharma.
      DO NOT INCLUDE ANY TEXT in the image.
      The image should be inspired by the following video details:
      - Title: "${input.title}"
      - Description: "${input.description}"

      Think about concepts like divine light, ancient temple architecture, sacred geometry, serene nature, or abstract representations of consciousness. The style should be elegant and respectful.
      `,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed.');
    }

    return { imageDataUri: media.url };
  }
);
