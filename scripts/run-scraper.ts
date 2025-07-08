
/**
 * @fileoverview An AI-Powered Content Scraper and Processor (TypeScript Version).
 *
 * This script demonstrates a complete, self-contained pipeline:
 * 1.  It loads the project's environment variables to access the AI API key.
 * 2.  It fetches HTML from a local webpage (`/scraping-source`).
 * 3.  It uses `cheerio` to parse the HTML and extract image URLs and descriptions.
 * 4.  It directly calls a Genkit AI flow (`processScrapedContent`) to process the text.
 * 5.  It saves the combined, structured data to `scraped-data.json`.
 *
 * =============================================================================
 *  IMPORTANT: How to Use This Tool
 * =============================================================================
 * This tool now requires only two terminal sessions to run correctly.
 *
 * 1.  **Start the Next.js App Server:**
 *     This serves the source page for scraping and the results page.
 *     `npm run dev`
 *
 * 2.  **Run the Scraper Script:**
 *     Once the Next.js server is running, execute this script to start the process.
 *     `npm run scrape`
 *
 *     (There is no longer a need to run a separate `genkit:watch` server).
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import { processScrapedContent } from '@/ai/flows/content-processor-flow';

// --- CONFIGURATION ---
// Manually load the environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const CONFIG = {
  SOURCE_URL: 'http://localhost:3000/scraping-source',
  OUTPUT_FILE: path.join(__dirname, 'scraped-data.json'),
};

// --- HELPER FUNCTIONS ---

/**
 * Fetches the HTML content of the source page.
 * @returns {Promise<string|null>} The HTML content or null on failure.
 */
async function fetchSourcePage(): Promise<string | null> {
  try {
    console.log(`[SCRAPER] Fetching HTML from ${CONFIG.SOURCE_URL}...`);
    const response = await axios.get(CONFIG.SOURCE_URL);
    return response.data;
  } catch (error: any) {
    console.error(`[ERROR] Failed to fetch source page at ${CONFIG.SOURCE_URL}.`);
    if (error.code === 'ECONNREFUSED') {
      console.error('[ERROR] Connection refused. Is the Next.js server running? Use `npm run dev`.');
    } else {
      console.error('Error details:', error.message);
    }
    return null;
  }
}

/**
 * Parses the HTML to extract post data.
 * @param {string} html The HTML content of the page.
 * @returns {{imageUrl: string, description: string, peetham: string}[]} An array of extracted post data.
 */
function extractDataFromHtml(html: string): { imageUrl: string; description: string; peetham: string }[] {
  const $ = cheerio.load(html);
  const posts: { imageUrl: string; description: string; peetham: string }[] = [];

  $('.peetham-post').each((_i, el) => {
    const peetham = $(el).data('peetham');
    const imageUrl = $(el).find('img').attr('src');
    const description = $(el).find('p').text().trim();
    if (peetham && imageUrl && description) {
      posts.push({ peetham, imageUrl, description });
    }
  });

  console.log(`[SCRAPER] Found ${posts.length} posts on the source page.`);
  return posts;
}

/**
 * The main processing function.
 */
async function runProcessor() {
  console.log('[INFO] Starting content processor.');
  console.log('[INFO] Make sure the Next.js dev server is running: `npm run dev`');

  const html = await fetchSourcePage();
  if (!html) {
    console.log('[INFO] Could not fetch source page. Exiting script.');
    return;
  }

  const extractedPosts = extractDataFromHtml(html);
  if (extractedPosts.length === 0) {
    console.log('[INFO] No posts found to process. Exiting script.');
    return;
  }
  
  const allProcessedData = [];

  for (const post of extractedPosts) {
    console.log(`\n--- Processing post for ${post.peetham} ---`);
    try {
        console.log('[AI] Calling Genkit flow to process description...');
        const aiContent = await processScrapedContent({ rawContent: post.description });

        if (aiContent) {
            console.log('[AI] Success. Received structured data.');
            const mediaDoc = {
                id: `scraped-${post.peetham.toLowerCase()}-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                peetham: post.peetham,
                type: 'photo',
                title: aiContent.title,
                description: post.description,
                imageUrl: post.imageUrl,
                thumbnailUrl: post.imageUrl.replace('600x400', '400x300'), // Simple thumbnail logic for placeholders
                aiHint: aiContent.keywords,
            };
            allProcessedData.push(mediaDoc);
        } else {
             console.log(`[WARN] AI processing did not return content for ${post.peetham}. Skipping this post.`);
        }
    } catch(error: any) {
        console.error(`[ERROR] An error occurred while processing post for ${post.peetham}.`);
        console.error("Error details:", error.message);
    }
  }

  fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(allProcessedData, null, 2));
  
  console.log(`\n[COMPLETE] Processing finished. ${allProcessedData.length} records saved to ${CONFIG.OUTPUT_FILE}`);
  console.log(`[ACTION] Visit http://localhost:3000/scraper-result to see the output.`);
}

runProcessor().catch(console.error);
