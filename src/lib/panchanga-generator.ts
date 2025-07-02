import { addMonths, getYear, getMonth } from 'date-fns';

export interface CalendarEvent {
  title: string;
  description: string;
  start: [number, number, number, number, number]; // [year, month, day, hour, minute]
  duration: { hours: number };
}

/**
 * Generates a list of placeholder Panchanga events for the next 12 months.
 * Note: This is for demonstration purposes and uses simplified date logic.
 * A real implementation would require a proper astrological engine.
 */
export function generateYearlyPanchangaEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const futureDate = addMonths(now, i);
    const year = getYear(futureDate);
    const month = getMonth(futureDate) + 1; // ics library months are 1-indexed

    // Add a placeholder 'Ekadashi' event around the 11th of each month
    events.push({
      title: 'Ekadashi Vrata',
      description: 'A day for fasting and spiritual practices. Please verify the exact date with a detailed Panchanga.',
      start: [year, month, 11, 6, 0], // Y, M, D, H, M (local time)
      duration: { hours: 24 },
    });

    // Add a placeholder 'Purnima' event around the 15th of each month
    events.push({
      title: 'Purnima - Full Moon',
      description: 'Full moon day, auspicious for special pujas. Please verify the exact date with a detailed Panchanga.',
      start: [year, month, 15, 6, 0],
      duration: { hours: 24 },
    });
  }

  return events;
}
