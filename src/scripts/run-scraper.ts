/**
 * @fileoverview An AI-Powered Content Processor (TypeScript Version).
 *
 * This script demonstrates a complete, self-contained pipeline:
 * 1.  It loads the project's environment variables to access the AI API key.
 * 2.  It imports structured data directly from `src/lib/scraping-source-data.ts`.
 * 3.  It directly calls a Genkit AI flow (`processScrapedContent`) to process the text.
 * 4.  It DELETES all old data and saves the new, combined data to a Firebase Firestore collection.
 *
 * =============================================================================
 *  IMPORTANT: How to Use This Tool
 * =============================================================================
 * This tool is now self-contained and no longer requires the Next.js server to be running.
 *
 * 1.  **Add Your Content:** Open the file `src/lib/scraping-source-data.ts` and add
 *     the image URLs and descriptions you want to process.
 * 
 * 2.  **Run the Script:**
 *     `npm run scrape`
 *
 *     The script will wipe the 'media' collection and re-populate it with your new data.
 */

import { processScrapedContent } from '@/ai/flows/content-processor-flow';
import { db } from '@/lib/firebase-script';
import { collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
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

  if (postsToProcess.length === 0) {
    console.log('\n[INFO] The scraping source file is empty.');
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
    console.log(`\n--- Processing post for ${post.peetham} ---`);
    try {
        console.log('[AI] Calling Genkit flow to process description...');
        const aiContent = await processScrapedContent({ rawContent: post.description });

        if (aiContent) {
            console.log('[AI] Success. Received structured data.');
            
            // Smarter thumbnail generation for different URL types
            let thumbnailUrl = post.imageUrl;
            if (post.imageUrl.includes('unsplash.com')) {
                const baseUrl = post.imageUrl.split('?')[0];
                thumbnailUrl = `${baseUrl}?q=80&w=400&h=225&fit=crop`;
            } else if (post.imageUrl.includes('placehold.co')) {
                thumbnailUrl = post.imageUrl.replace('600x400', '400x225');
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
            console.log(`[FIRESTORE] Successfully saved post for ${post.peetham} for date ${post.date} to 'media' collection.`);
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
  console.log(`[ACTION] Go to the Bodha Calendar page and click the 'Refresh Content' button to see your updates.`);
}

runProcessor().catch(console.error);
