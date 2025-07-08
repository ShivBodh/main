
/**
 * @fileoverview An AI-Powered Content Scraper and Processor.
 *
 * This script demonstrates a complete pipeline:
 * 1.  It fetches HTML from a local webpage (`/scraping-source`).
 * 2.  It uses `cheerio` to parse the HTML and extract image URLs and descriptions.
 * 3.  It calls a Genkit AI flow to process the extracted text into a structured title.
 * 4.  It saves the combined, structured data to `scraped-data.json`.
 * 5.  The results are viewable on the `/scraper-result` page.
 *
 * =============================================================================
 *  IMPORTANT: How to Use This Tool
 * =============================================================================
 * This tool requires three separate terminal sessions to run correctly.
 *
 * 1.  **Start the Next.js App Server:**
 *     This serves the source page for scraping and the results page.
 *     `npm run dev`
 *
 * 2.  **Start the Genkit AI Server:**
 *     This hosts the AI flow that processes the scraped text.
 *     `npm run genkit:watch`
 *
 * 3.  **Run the Scraper Script:**
 *     Once both servers are running, execute this script to start the process.
 *     `node scripts/run-scraper.js`
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// --- CONFIGURATION ---
const CONFIG = {
  SOURCE_URL: 'http://localhost:3000/scraping-source',
  OUTPUT_FILE: path.join(__dirname, 'scraped-data.json'),
  AI_PROCESSOR_URL: 'http://localhost:4000/api/flows/contentProcessorFlow',
};

// --- HELPER FUNCTIONS ---

/**
 * Fetches the HTML content of the source page.
 * @returns {Promise<string|null>} The HTML content or null on failure.
 */
async function fetchSourcePage() {
  try {
    console.log(`[SCRAPER] Fetching HTML from ${CONFIG.SOURCE_URL}...`);
    const response = await axios.get(CONFIG.SOURCE_URL);
    return response.data;
  } catch (error) {
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
function extractDataFromHtml(html) {
  const $ = cheerio.load(html);
  const posts = [];

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
 * Calls the Genkit AI flow to process raw text content.
 * @param {string} rawContent The raw text scraped from the page.
 * @returns {Promise<{title: string, keywords: string}|null>} A promise that resolves to the structured data or null on failure.
 */
async function processContentWithAI(rawContent) {
  try {
    console.log('[AI] Calling Genkit flow to process description...');
    const response = await axios.post(CONFIG.AI_PROCESSOR_URL, {
      input: { rawContent },
    });

    if (response.data && response.data.output) {
      console.log('[AI] Success. Received structured data.');
      return response.data.output;
    }
    
    console.error('[ERROR] AI flow succeeded but returned no output field.');
    console.error(`[DEBUG] Received from AI flow:`, JSON.stringify(response.data, null, 2));
    return null;
  } catch (error) {
    console.error(`[ERROR] Failed to call AI flow at ${CONFIG.AI_PROCESSOR_URL}.`);
    if (error.code === 'ECONNREFUSED') {
        console.error('[ERROR] Connection refused. Is the Genkit server running? Use `npm run genkit:watch`.');
    } else if (error.response) {
        console.error('[ERROR] The AI flow reported an error. Check the Genkit server terminal for details.');
        console.error(`[DEBUG] Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
    } else {
        console.error('[ERROR] An unexpected error occurred during the request.');
        console.error('Error details:', error.message);
    }
    return null;
  }
}

/**
 * The main processing function.
 */
async function runProcessor() {
  console.log('[INFO] Starting content processor.');
  console.log('[INFO] Make sure all servers are running: `npm run dev` and `npm run genkit:watch`');

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
    const aiContent = await processContentWithAI(post.description);

    if (aiContent) {
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
        console.log(`[WARN] AI processing failed for ${post.peetham}. Skipping this post.`);
    }
  }

  fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(allProcessedData, null, 2));
  
  console.log(`\n[COMPLETE] Processing finished. ${allProcessedData.length} records saved to ${CONFIG.OUTPUT_FILE}`);
  console.log(`[ACTION] Visit http://localhost:3000/scraper-result to see the output.`);
}

runProcessor().catch(console.error);
