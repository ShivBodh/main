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
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a photorealistic image of: ${prompt}. Ensure the image is aesthetically pleasing, high quality, and suitable for a spiritual website.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
        throw new Error('Image generation failed to return an image.');
    }

    return {imageUrl: media.url};
  }
);
