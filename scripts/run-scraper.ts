/**
 * @fileoverview An AI-Powered Content Scraper and Processor (TypeScript Version).
 *
 * This script demonstrates a complete, self-contained pipeline:
 * 1.  It loads the project's environment variables to access the AI API key.
 * 2.  It imports structured data directly from a local data source file.
 * 3.  It directly calls a Genkit AI flow (`processScrapedContent`) to process the text.
 * 4.  It saves the combined, structured data to a Firebase Firestore collection.
 *
 * =============================================================================
 *  IMPORTANT: How to Use This Tool
 * =============================================================================
 * This tool is now self-contained and no longer requires the Next.js server to be running.
 *
 * 1.  **Run the Scraper Script:**
 *     `npm run scrape`
 *
 *     The script will read local data, process it with the AI, and save the
 *     results directly to your Firestore database.
 */

import { processScrapedContent } from '@/ai/flows/content-processor-flow';
import { db } from '@/lib/firebase-script';
import { collection, addDoc } from 'firebase/firestore';
import { scrapingSourceData } from '@/lib/scraping-source-data'; // Import data directly

// The .env file is now loaded by the `npm run scrape` command via the `--env-file` flag.

/**
 * The main processing function.
 */
async function runProcessor() {
  console.log('[INFO] Starting content processor.');

  if (!db) {
    console.error("[ERROR] Firestore is not initialized. Please check your Firebase configuration in .env and ensure you've set up a Firestore database in your project.");
    return;
  }

  const postsToProcess = scrapingSourceData;
  console.log(`[SCRAPER] Found ${postsToProcess.length} posts in the local data source.`);
  
  if (postsToProcess.length === 0) {
    console.log('[INFO] No posts found to process. Exiting script.');
    return;
  }
  
  const mediaCollection = collection(db, 'media');
  let processedCount = 0;

  for (const post of postsToProcess) {
    console.log(`\n--- Processing post for ${post.peetham} ---`);
    try {
        console.log('[AI] Calling Genkit flow to process description...');
        const aiContent = await processScrapedContent({ rawContent: post.description });

        if (aiContent) {
            console.log('[AI] Success. Received structured data.');
            const mediaData = {
                date: new Date().toISOString().split('T')[0],
                peetham: post.peetham,
                type: 'photo',
                title: aiContent.title,
                description: post.description,
                imageUrl: post.imageUrl,
                thumbnailUrl: post.imageUrl.replace('600x400', '400x300'), // Simple thumbnail logic for placeholders
                aiHint: aiContent.keywords,
            };
            await addDoc(mediaCollection, mediaData);
            console.log(`[FIRESTORE] Successfully saved post for ${post.peetham} to 'media' collection.`);
            processedCount++;
        } else {
             console.log(`[WARN] AI processing did not return content for ${post.peetham}. Skipping this post.`);
        }
    } catch(error: any) {
        console.error(`[ERROR] An error occurred while processing post for ${post.peetham}.`);
        console.error("Error details:", error.message);
    }
  }
  
  console.log(`\n[COMPLETE] Processing finished. ${processedCount} records saved to Firestore.`);
  console.log(`[ACTION] Refresh the Bodha Calendar page in your browser to see the new content.`);
}

runProcessor().catch(console.error);
