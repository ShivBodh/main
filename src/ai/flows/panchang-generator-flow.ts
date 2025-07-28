
'use server';
/**
 * @fileOverview An AI flow for generating Panchang data.
 *
 * - getPanchangDetails - A function that returns detailed Panchang information for a given date and location.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const PanchangInputSchema = z.object({
  date: z.string().describe('The date in YYYY-MM-DD format.'),
  location: z
    .string()
    .describe("The location (e.g., 'Ujjain, India') for which to generate the Panchang."),
});
export type PanchangInput = z.infer<typeof PanchangInputSchema>;

export const PanchangOutputSchema = z.object({
  date: z.string(),
  location: z.string(),
  tithi: z.object({name: z.string(), endTime: z.string()}),
  nakshatra: z.object({name: z.string(), endTime: z.string()}),
  yoga: z.object({name: z.string(), endTime: z.string()}),
  karana: z.object({name: z.string(), endTime: z.string()}),
  sunrise: z.string(),
  sunset: z.string(),
  moonrise: z.string(),
  moonset: z.string(),
  auspiciousTimings: z.array(
    z.object({name: z.string(), start: z.string(), end: z.string()})
  ),
  inauspiciousTimings: z.array(
    z.object({name: z.string(), start: z.string(), end: z.string()})
  ),
  specialDays: z.array(
    z.object({name: z.string(), description: z.string()})
  ),
});
export type PanchangOutput = z.infer<typeof PanchangOutputSchema>;

const diagnosePanchangPrompt = ai.definePrompt({
  name: 'diagnosePanchangPrompt',
  input: {schema: PanchangInputSchema},
  output: {schema: PanchangOutputSchema},
  prompt: `You are an expert Vedic astrologer. Generate the Panchang for the given date and location.

Date: {{{date}}}
Location: {{{location}}}
`,
});

const panchangGeneratorFlow = ai.defineFlow(
  {
    name: 'panchangGeneratorFlow',
    inputSchema: PanchangInputSchema,
    outputSchema: PanchangOutputSchema,
  },
  async (input: PanchangInput) => {
    const {output} = await diagnosePanchangPrompt(input);
    return output!;
  }
);


export async function getPanchangDetails(
  input: PanchangInput
): Promise<PanchangOutput> {
  return panchangGeneratorFlow(input);
}
