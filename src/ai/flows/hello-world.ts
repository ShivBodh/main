
'use server';
/**
 * @fileOverview A simple "Hello, World" Genkit flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Define the schema for the flow's output.
export const HelloWorldOutputSchema = z.string();
export type HelloWorldOutput = z.infer<typeof HelloWorldOutputSchema>;

// Define the Genkit flow.
const helloWorldFlow = ai.defineFlow(
  {
    name: 'helloWorldFlow',
    // No input is needed for this simple flow.
    inputSchema: z.object({}),
    outputSchema: HelloWorldOutputSchema,
  },
  async () => {
    const {output} = await ai.generate({
      prompt: 'Tell me a "Hello, World!" joke.',
    });
    return output!;
  }
);

/**
 * An exported wrapper function to call the Genkit flow.
 * This makes it easy to use the flow from other parts of the application.
 * @returns A promise that resolves to the "Hello, world!" string.
 */
export async function getHelloWorld(): Promise<HelloWorldOutput> {
  return helloWorldFlow();
}
