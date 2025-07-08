
/**
 * @fileoverview This is your content source file.
 *
 * To add real content to your portal, follow these steps:
 * 1. Find a post on social media (e.g., from a Peetham's Facebook page).
 * 2. Right-click the image and select "Copy Image Address" or "Copy Image Link".
 * 3. Add a new object to the `scrapingSourceData` array below.
 * 4. Paste the image link into the `imageUrl` field.
 * 5. Copy the post's text and paste it into the `description` field.
 * 6. Set the `date` and `peetham`.
 * 7. Provide a one or two-word `aiHint` for the image.
 *
 * =============================================================================
 *  EXAMPLE:
 * =============================================================================
 *
 * export const scrapingSourceData = [
 *   {
 *     date: '2024-07-21',
 *     peetham: 'Sringeri',
 *     imageUrl: 'https://www.sringeri.net/wp-content/uploads/2024/07/Vardhanti-Mahotsava-July-21-2024-1.jpeg',
 *     aiHint: 'acharya blessing',
 *     description: 'On July 21, 2024, the second day of the 31st Vardhanti Mahotsava of Jagadguru Shankaracharya Sri Sri Vidhushekhara Bharati Sannidhanam, Sahasra Modaka Ganapati Homa was performed.',
 *   },
 *   {
 *     date: '2024-07-20',
 *     peetham: 'Puri',
 *     imageUrl: 'https://govardhanpeeth.org/wp-content/uploads/2024/07/news-20-07-24-1.jpg',
 *     aiHint: 'acharya discourse',
 *     description: 'Discourse by the Shankaracharya of Puri on the topic of Dharma and its application in modern life, delivered to a large gathering of devotees.',
 *   }
 * ];
 *
 * =============================================================================
 *
 * After adding your data, run this command in the terminal:
 *
 * npm run scrape
 *
 */

export const scrapingSourceData: {
  date: string,
  peetham: 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath',
  imageUrl: string,
  aiHint: string,
  description: string,
}[] = [
  // Add your content here
];
