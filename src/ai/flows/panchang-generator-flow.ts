
'use server';
/**
 * @fileOverview An AI flow for generating Panchang data.
 *
 * - getPanchangDetails - A function that returns detailed Panchang information for a given date and location.
 */

import {ai} from '@/ai/genkit';
import {getDailyPanchanga} from '@/lib/panchanga-data';
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

export async function getPanchangDetails(
  input: PanchangInput
): Promise<PanchangOutput> {
  // MOCK IMPLEMENTATION: This uses the simulated data for now.
  // In a real implementation, this would call the Gemini API with a detailed prompt.
  const simulatedData = getDailyPanchanga(
    new Date(input.date),
    'North'
  ).data;

  return {
    date: input.date,
    location: input.location,
    tithi: simulatedData.tithi,
    nakshatra: simulatedData.nakshatra,
    yoga: simulatedData.yoga,
    karana: simulatedData.karana,
    sunrise: simulatedData.sunrise,
    sunset: simulatedData.sunset,
    moonrise: '07:00 AM', // Placeholder
    moonset: '07:30 PM', // Placeholder
    auspiciousTimings: [
      {name: 'Abhijit Muhurat', start: '11:55 AM', end: '12:45 PM'},
    ],
    inauspiciousTimings: [
      {
        name: 'Rahu Kalam',
        start: simulatedData.rahuKalam.split(' - ')[0],
        end: simulatedData.rahuKalam.split(' - ')[1],
      },
      {
        name: 'Yamaganda',
        start: simulatedData.yamagandaKalam.split(' - ')[0],
        end: simulatedData.yamagandaKalam.split(' - ')[1],
      },
    ],
    specialDays: [
      {
        name: 'Ekadashi Vrata',
        description:
          'A day for fasting and spiritual practices. Please verify the exact date with a detailed Panchanga.',
      },
    ],
  };
}
