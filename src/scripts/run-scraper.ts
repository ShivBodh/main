
/**
 * @fileoverview An AI-Powered Content Processor (TypeScript Version).
 *
 * This script is a tool for manually adding content to your portal. It does NOT
 * automatically scrape social media sites. Instead, it provides a simple and
 * powerful pipeline to process content you have gathered yourself.
 *
 * =============================================================================
 *  The Workflow:
 * =============================================================================
 * 1.  **Find Content:** Find a post on a social media page (e.g., Facebook,
 *     Instagram) that you want to feature on your portal.
 *
 * 2.  **Add to Source File:** Open the file `src/lib/scraping-source-data.ts`.
 *     Copy the post's description and the image's direct URL into a new
 *     object in the `scrapingSourceData` array.
 *
 * 3.  **Run this Script:** Execute the command `npm run scrape` in your terminal.
 *
 * =============================================================================
 *  What Happens When You Run the Script:
 * =============================================================================
 * 1.  **Wipe & Replace:** It DELETES all old data from the 'media' collection
 *     in Firestore to ensure a clean slate.
 * 2.  **AI Processing:** For each item you added to the source file, it calls an
 *     AI flow to generate a clean title and relevant keywords.
 * 3.  **Save to Database:** It saves this new, structured content back into
 *     your Firestore 'media' collection.
 *
 * This provides a reliable way to curate and feature real content on your site.
 */

import { processScrapedContent } from '@/ai/flows/content-processor-flow';
import { db } from '@/lib/firebase-script';
import { collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { scrapingSourceData } from '@/lib/scraping-source-data';

// The .env file is loaded by the `npm run scrape` command via the `--env-file` flag.

/**
 * The main processing function.
 */
async function runProcessor() {
  console.log('[INFO] Starting content processor tool.');

  if (!db) {
    console.error("[ERROR] Firestore is not initialized. Please check your Firebase configuration in .env and ensure you've set up a Firestore database in your project.");
    return;
  }

  const postsToProcess = scrapingSourceData;

  if (postsToProcess.length === 0) {
    console.log('\n[INFO] The content source file is empty.');
    console.log('[ACTION] Please add content to `src/lib/scraping-source-data.ts` to be processed.');
    console.log('[INFO] The script will now exit.');
    return;
  }

  const mediaCollection = collection(db, 'media');

  // --- DELETION LOGIC ---
  console.log(`[INFO] Deleting all existing documents from the "media" collection to process the ${postsToProcess.length} new item(s)...`);
  try {
    const existingDocsSnapshot = await getDocs(mediaCollection);
    if (existingDocsSnapshot.size > 0) {
        const deletePromises = existingDocsSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log(`[INFO] Successfully deleted ${existingDocsSnapshot.size} old documents.`);
    } else {
        console.log('[INFO] No old documents to delete.');
    }
  } catch (error: any) {
    console.error("[ERROR] Could not delete existing documents. Please check your Firestore security rules for delete permissions.", error.message);
    return; // Stop if we can't delete
  }
  // --- END DELETION LOGIC ---
  
  let processedCount = 0;

  for (const post of postsToProcess) {
    console.log(`\n--- Processing post for ${post.peetham} from ${post.date} ---`);
    try {
        console.log('[AI] Calling Genkit flow to generate a title and keywords...');
        const aiContent = await processScrapedContent({ rawContent: post.description });

        if (aiContent) {
            console.log('[AI] Success. Received structured data.');
            
            // Smarter thumbnail generation for different URL types
            let thumbnailUrl = post.imageUrl;
            if (post.imageUrl.includes('unsplash.com')) {
                const baseUrl = post.imageUrl.split('?')[0];
                thumbnailUrl = `${baseUrl}?q=80&w=400&h=225&fit=crop`;
            } else if (post.imageUrl.includes('placehold.co')) {
                thumbnailUrl = post.imageUrl.replace(/(\d+)x(\d+)/, '400x225');
            }

            const mediaData = {
                date: post.date,
                peetham: post.peetham,
                type: 'photo',
                title: aiContent.title,
                description: post.description,
                imageUrl: post.imageUrl,
                thumbnailUrl: thumbnailUrl,
                aiHint: aiContent.keywords,
            };
            await addDoc(mediaCollection, mediaData);
            console.log(`[FIRESTORE] Successfully saved post to 'media' collection.`);
            processedCount++;
        } else {
             console.log(`[WARN] AI processing did not return content for this item. Skipping.`);
        }
    } catch(error: any) {
        console.error(`[ERROR] An error occurred while processing this item.`);
        console.error("Error details:", error.message);
    }
  }
  
  console.log(`\n[COMPLETE] Processing finished. ${processedCount} records saved to Firestore.`);
  console.log(`[ACTION] Go to the Bodha Calendar page and click the 'Refresh Content' button to see your updates.`);
}

runProcessor().catch(console.error);
