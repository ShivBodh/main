
/**
 * @fileoverview This file is the source of truth for the content processing script.
 *
 * To populate your Bodha Calendar with content, add objects to the array below.
 * Each object should represent a piece of media you want to process and display.
 *
 * Each object requires:
 * - date: "YYYY-MM-DD" format.
 * - peetham: 'Sringeri', 'Dwaraka', 'Puri', or 'Jyotirmath'.
 * - imageUrl: A direct link to a high-quality image.
 * - aiHint: One or two keywords for the image (e.g., "hindu temple").
 * - description: The text content to be processed by the AI for a title.
 *
 * After adding your data, run the following command in your terminal:
 * npm run scrape
 *
 * Then, go to the Bodha Calendar page and click "Refresh Content".
 */

export const scrapingSourceData = [
  // {
  //   date: '2025-07-25',
  //   peetham: 'Sringeri',
  //   imageUrl: 'https://images.unsplash.com/your-image-url-here',
  //   aiHint: 'your hint',
  //   description: 'Your description here for the AI to process.',
  // },
];
