
'use server';
/**
 * @fileOverview An AI flow for generating images from a text prompt.
 *
 * - generateImage - A function that takes a prompt and returns an image data URI.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ImageRequestSchema = z.object({
  prompt: z.string().describe('A text prompt describing the image to generate.'),
});
export type ImageRequest = z.infer<typeof ImageRequestSchema>;

const ImageResponseSchema = z.object({
  imageUrl: z.string().describe('The generated image as a data URI.'),
});
export type ImageResponse = z.infer<typeof ImageResponseSchema>;

export async function generateImage(input: ImageRequest): Promise<ImageResponse> {
  return imageGeneratorFlow(input);
}

const imageGeneratorFlow = ai.defineFlow(
  {
    name: 'imageGeneratorFlow',
    inputSchema: ImageRequestSchema,
    outputSchema: ImageResponseSchema,
  },
  async ({prompt}) => {
    // MOCK IMPLEMENTATION: Returns a placeholder image to avoid dependency on a live AI model.
    console.log(`[AI Flow - Image] Received prompt, returning mock image: ${prompt}`);
    return {
      // This is a data URI for a simple placeholder image.
      imageUrl: 'https://placehold.co/512x512.png',
    };
  }
);
